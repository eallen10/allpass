package com.allpass;

import com.allpass.database.Cassandra;
import com.datastax.driver.core.Row;
import com.google.common.collect.Lists;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.SpringApplication;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.UUID;

@SpringBootApplication
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

//    @PostConstruct
//    private void init() {
//        Cassandra cassandra = new Cassandra();
//        List<Row> initialRows = Cassandra.query("users", Lists.newArrayList(), "*");
//        if(initialRows.isEmpty()) {
//            Cassandra.createInitialUser(UUID.randomUUID().toString());
//        }
//    }

}
