package com.allpass.database;

import com.allpass.utils.GSON;
import com.datastax.driver.core.*;
import com.datastax.driver.core.querybuilder.*;
import com.datastax.driver.core.schemabuilder.SchemaBuilder;
import com.google.common.collect.HashMultimap;
import com.google.common.collect.Multimap;
import lombok.extern.log4j.Log4j2;

import javax.annotation.PostConstruct;
import java.util.*;

/**
 * Cassandra database connector
 *
 * @version 2.0
 */
@Log4j2
public class Cassandra {
    private static Cluster cluster;
    private static Session session;

    /*
     * creates a static persistent Cassandra connection
     * TODO: pull credentials from config file instead of hard coding
     */
    static {
        cluster = Cluster.builder()
                .addContactPoint("127.0.0.1")
//                .addContactPoint("192.168.1.101")
                .withPort(9042).build();
        session = cluster.connect();
        createKeyspace();
        session = cluster.connect("allpass");
        createTables();
        session.getCluster().getConfiguration().getSocketOptions().setReadTimeoutMillis(120000);
    }

    /**
     * Closes the cassandra connection.
     */
    public static void close() {
        session.close();
        cluster.close();
    }

    /**
     * Creates the AllPass keyspace in Cassandra
     */
    private static void createKeyspace() {
        //check if the keyspace already exists
        if (cluster.getMetadata().getKeyspace("allpass") == null) {
            log.warn("Keyspace [{}] does not exist ... attempting to create ...", "allpass");
            Map<String, Object> keyspaceOptions = new HashMap<>();
            keyspaceOptions.put("replication_factor", 1);
            keyspaceOptions.put("class", "SimpleStrategy");
            String keyspace = SchemaBuilder.createKeyspace("allpass")
                    .ifNotExists()
                    .with()
                    .replication(keyspaceOptions)
                    .durableWrites(true)
                    .getQueryString();
            log.trace(keyspace);
            if (session.execute(keyspace).wasApplied()) {
                log.info("Created [{}] keyspace", "allpass");
            } else {
                //allpass cannot run without Cassandra, if it cannot create the keyspace, exit.
                log.fatal("Could not create [{}] keyspace", "allpass");
                close();
                System.exit(1);
            }
        }
    }

    /**
     * Creates all of the Cassandra tables that allpass uses as well as indexes used for filtering
     */
    private static void createTables() {
        Map<String, String> tables = new HashMap<>();
        Multimap<String, String> indexes = HashMultimap.create();
        tables.put("users", SchemaBuilder.createTable("users")
                .ifNotExists()
                .addPartitionKey("id", DataType.text())
                .addColumn("username", DataType.text())
                .addColumn("creator", DataType.text())
                .addColumn("email", DataType.text())
                .addColumn("timestamp", DataType.bigint())
                .addColumn("role", DataType.text())
                .addColumn("fname", DataType.text())
                .addColumn("lname", DataType.text())
                .addColumn("pass", DataType.text())
                .getQueryString());
        tables.put("data", SchemaBuilder.createTable("data")
                .ifNotExists()
                .addPartitionKey("id", DataType.text())
                .addColumn("account", DataType.text())
                .addColumn("user", DataType.text())
                .addColumn("username", DataType.text())
                .addColumn("pass", DataType.text())
                .addColumn("timestamp", DataType.bigint())
                .getQueryString());
        for (String table : tables.keySet()) {
            if (cluster.getMetadata().getKeyspace("allpass").getTable(table) == null) { //check if table exists
                log.warn("Table [{}] does not exist ... attempting to create ...", table);
                log.trace(tables.get(table));
                if (session.execute(tables.get(table)).wasApplied()) {
                    log.info("Created [{}] table", table);
                    if (indexes.containsKey(table)) { // check if there is a matching index key in indexes map
                        for (String index : indexes.get(table)) {
                            if (session.execute(index).wasApplied()) {
                                log.info("Created [{}] table index", table);
                            } else {
                                log.fatal("Could not create [{}] table index", table);
                            }
                        }
                    }
                } else {
                    log.fatal("Could not create [{}] table", table);
                    close();
                    System.exit(1);
                }
            }
        }
    }

    /**
     * Inserts with the capability of updating records into Cassandra.
     * If an row with the existing primary key already exists it does not create a new row, it updates
     * the values of the existing row.
     *
     * @param tableName the table being modified
     * @param object    the object being "upserted" into the table
     * @return a boolean true if the query was applied boolean false if not
     */
    public static boolean upsert(String tableName, Object object) {
        Insert query = QueryBuilder.insertInto(tableName).json(GSON.gson.toJson(object)).defaultUnset();
        log.debug("Inserting {} into [{}] ...", object.getClass().getSimpleName(), tableName);
        log.trace(query.getQueryString());
        return session.execute(query).wasApplied();
    }

    public static Boolean createInitialUser(String id) {
        User user = new User(id, "admin", "God", "root", "ROLE_ADMIN", "",
                "", "gIIcHUGIFRpEQRuwFDNwpboTJ2RkzstMIsmO+sQB3yI=$UYBwN4RqOANkcPJybAq3Lxt6oiHZNhCpEKt9y0Apjss=",
                System.currentTimeMillis());
        return Cassandra.upsert("users", user);
    }

    /**
     * Deletes a row from Cassandra.
     *
     * @param tableName the table being modified
     * @param id        the id of the row being deleted
     * @return a boolean true if the query was applied boolean false if not
     */
    public static boolean delete(String tableName, String id) {
        Delete.Where delete = QueryBuilder.delete().from(tableName).where(QueryBuilder.eq("id", id));
        log.info("Deleting [{}] from [{}]", id, tableName);
        log.trace(delete.getQueryString());
        return session.execute(delete).wasApplied();
    }

    /**
     * Deletes multiple rows from Cassandra.
     *
     * @param tableName the table being modified
     * @param ids        the id of the row being deleted
     * @return a boolean true if the query was applied boolean false if not
     */
    public static boolean deleteRows(String tableName, List<String> ids) {
        Delete.Where delete = QueryBuilder.delete().from(tableName).where(QueryBuilder.in("id", ids));
        log.info("Deleting [{}] from [{}]", ids, tableName);
        log.trace(delete.getQueryString());
        return session.execute(delete).wasApplied();
    }

    public static boolean deleteTableData(String tableName) {
        Truncate delete = QueryBuilder.truncate(tableName);
        log.info("Deleting data from [{}]", tableName);
        log.trace(delete.getQueryString());
        return session.execute(delete).wasApplied();
    }

    /**
     * Queries Cassandra using a list of clauses.
     *
     * @param tableName the table being queried
     * @param clauses   the clauses of the query
     * @param columns   the requested columns to be returned from the query
     * @return {@link List<Row>} of the requested information
     */
    public static List<Row> query(String tableName, List<Clause> clauses, String... columns) {
        Select query;
        if (columns[0].equals("*") && columns.length == 1) { //query for all columns
            query = QueryBuilder.select().all().json().from(tableName);
        } else { //query for explicit columns
            query = QueryBuilder.select(columns).json().from(tableName);
        }
        if (clauses.size() > 0) { //check if there are any clauses, if not, just get the entire table
            for (Clause clause : clauses) {
                query.where().and(clause);
            }
        }
        log.trace(query);
        return session.execute(query.allowFiltering()).all();
    }

    /**
     * Queries Cassandra using a list of clauses, orders by ordering, and limits results.
     *
     * @param tableName the table being queried
     * @param clauses   the clauses of the query
     * @param limit     the max query size
     * @param columns   the requested columns to be returned from the query
     * @return {@link List<Row>} of the requested information
     */
    public static List<Row> query(String tableName, List<Clause> clauses, int limit,
                                  String... columns) {
        Select query;
        if (columns[0].equals("*") && columns.length == 1) { //query for all columns
            query = QueryBuilder.select().all().json().from(tableName);
        } else { //query for explicit columns
            query = QueryBuilder.select(columns).json().from(tableName);
        }
        if (clauses.size() > 0) { //check if there are any clauses, if not, just get the entire table
            for (Clause clause : clauses) {
                query.where().and(clause);
            }
        }
        query.limit(limit);
        log.trace(query);
        return session.execute(query.allowFiltering()).all();
    }

    public static int count(String tableName) {
        return Integer.parseInt(session.execute("SELECT COUNT(*) FROM " + tableName).one().getToken(0).toString());
    }

    /**
     * Truncates (deletes) all rows from all tables.
     * <p>
     * DOES NOT DELETE THE TABLE ITSELF
     */
    public static void truncate() {
        Metadata metadata = cluster.getMetadata();
        Collection<TableMetadata> tableMetadata = metadata.getKeyspace("allpass").getTables();
        for (TableMetadata table : tableMetadata) {
            Truncate truncate = QueryBuilder.truncate(table.getName());
            log.info("Truncating [{}] table ...", table.getName());
            log.trace(truncate);
            if (session.execute(truncate).wasApplied()) {
                log.info("[{}] table truncated", table.getName());
            } else {
                log.error("Could not truncate [{}] table", table.getName());
            }
        }
    }

}
