package com.allpass.controller;

import com.allpass.database.Cassandra;
import com.allpass.database.User;
import com.allpass.utils.GSON;
import com.allpass.utils.RESTUtils;
import com.allpass.utils.SecurityUtils;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.datastax.driver.core.Row;
import com.datastax.driver.core.querybuilder.QueryBuilder;
import com.google.common.base.Charsets;
import com.google.common.collect.Lists;
import com.google.common.io.Resources;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import javax.servlet.http.HttpServletRequest;
import java.util.*;

import static org.springframework.web.bind.annotation.RequestMethod.*;

/**
 * Login Controller REST API.
 *
 * @version 2.0
 */
@Log4j2
@RestController
@RequestMapping("/api/admin")
@PropertySource("classpath:application.properties")
@SuppressWarnings("unused")
public class AdminController {

    /**
     * Creates a user in Cassandra
     *
     * @param httpServletRequest the HTTP request
     * @param json               the new user information
     * @return {@link ResponseEntity} with an appropriate response code:
     * 200 OK - the report was successfully saved to Cassandra
     * 500 INTERNAL SERVER ERROR - an error occurred
     * 401 UNAUTHORIZED - request did not meet requirements
     *
     */
    @RequestMapping(method = POST, path = "/createUser")
    public ResponseEntity createUser(HttpServletRequest httpServletRequest, @RequestBody String json) {
        SecurityUtils securityUtils = new SecurityUtils();
        DecodedJWT decodedJWT = RESTUtils.decodeJWT(RESTUtils.findJWT(httpServletRequest));
        if (decodedJWT.getClaim("role").asString().equals("ROLE_ADMIN")) {

            String uuid = UUID.randomUUID().toString();

            //get username from JWT
            String creatorUsername = decodedJWT.getClaim("username").asString();

            JsonParser parser = new JsonParser();
            JsonObject obj = parser.parse(json).getAsJsonObject();

            //check username against existing usernames and return FORBIDDEN if already exists
            if (!checkUsername(obj.get("username").getAsString())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username already exists.");
            }

            if (!obj.get("pass1").getAsString().equals(obj.get("pass2").getAsString())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Passwords do not match.");
            }

            if (obj.get("pass1").getAsString().length() < 8) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password must be at least 8 characters.");
            }

            obj.addProperty("pass", obj.get("pass1").getAsString());
            obj.remove("pass1");
            obj.remove("pass2");

            //create User object from json data
            User user = GSON.gson.fromJson(obj, User.class);

            //set password of user to hashed value of given password
            try {
                user.setPass(securityUtils.getSaltedHash(user.getPass()));
            } catch (Exception e) {
                e.printStackTrace();
            }

            user.setTimestamp(System.currentTimeMillis());
            user.setId(uuid);
            user.setCreator(creatorUsername);
            user.setRole("ROLE_USER");

            if (Cassandra.upsert("users", user)) {
                //return 200 response
                return ResponseEntity.ok().build();
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    /**
     * Returns a list of all users in Cassandra
     *
     * @param httpServletRequest the HTTP request
     * @return {@link ResponseEntity} with an appropriate response code:
     * 200 OK - the report was successfully saved to Cassandra
     * 401 UNAUTHORIZED - request did not meet requirements
     */
    @RequestMapping(method = GET, path = "/getUsers")
    public ResponseEntity getUsers(HttpServletRequest httpServletRequest) {
        DecodedJWT decodedJWT = RESTUtils.decodeJWT(RESTUtils.findJWT(httpServletRequest));
        Set<User> users = new HashSet<>();
        if (decodedJWT.getClaim("role").asString().equals("ROLE_ADMIN")) {
            for (Row row : Cassandra.query("users", Collections.emptyList(), "*")) {
                users.add(GSON.gson.fromJson(row.getObject(0).toString(), User.class));
            }
            for (User user : users) {
                user.setPass("");
            }
            return ResponseEntity.ok(users);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    /**
     * Deletes a specified user from Cassandra
     *
     * @param httpServletRequest the HTTP request
     * @param json               the new user information
     * @return {@link ResponseEntity} with an appropriate response code:
     * 200 OK - the user was successfully deleted from Cassandra
     * 401 UNAUTHORIZED - request did not meet requirements
     */
    @RequestMapping(method = DELETE, path = "/deleteUser")
    public ResponseEntity deleteUser(HttpServletRequest httpServletRequest, @RequestBody String json) {
        DecodedJWT decodedJWT = RESTUtils.decodeJWT(RESTUtils.findJWT(httpServletRequest));

        if (decodedJWT.getClaim("username").equals("admin")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        JsonParser parser = new JsonParser();
        JsonObject obj = parser.parse(json).getAsJsonObject();
        Set<User> users = new HashSet<>();
        if (decodedJWT.getClaim("role").asString().equals("ROLE_ADMIN")) {
            List<Row> row = Cassandra.query("users", Lists.newArrayList(QueryBuilder.eq("id", obj.get("id").getAsString())), "*");
            if (!row.isEmpty() && Cassandra.delete("users", obj.get("id").getAsString())) {
                String result = row.get(0).getString("[json]");
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    /**
     * Edits a specified user in Cassandra
     *
     * @param httpServletRequest the HTTP request
     * @param json               the new user information
     * @return {@link ResponseEntity} with an appropriate response code:
     * 200 OK - the user was successfully deleted from Cassandra
     * 500 INTERNAL SERVER ERROR - an error occurred
     * 401 UNAUTHORIZED - request did not meet requirements
     */
    @RequestMapping(method = POST, path = "/editUser")
    public ResponseEntity editUser(HttpServletRequest httpServletRequest, @RequestBody String json) {
        DecodedJWT decodedJWT = RESTUtils.decodeJWT(RESTUtils.findJWT(httpServletRequest));
        String role = decodedJWT.getClaim("role").asString();

        JsonParser parser = new JsonParser();
        JsonObject obj = parser.parse(json).getAsJsonObject();
        String id = obj.get("id").getAsString();

        try {
            if (role.equals("ROLE_ADMIN")) {
                List<Row> row = Cassandra.query("users", Lists.newArrayList(QueryBuilder.eq("id", obj.get("id").getAsString())), "*");
                if (!row.isEmpty() && Cassandra.upsert("users", obj)) {
                    String result = row.get(0).getString("[json]");
                    User user = GSON.gson.fromJson(result, User.class);
                    return ResponseEntity.ok().build();
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                }

            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            log.error(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Generates an api key to create a new user
     *
     * @param httpServletRequest the HTTP request
     * @return {@link ResponseEntity} with an appropriate response code:
     * 200 OK - the api key was created
     * 500 INTERNAL SERVER ERROR - an error occurred
     * 401 UNAUTHORIZED - request did not meet requirements
     */
    @RequestMapping(method = POST, path = "/generateApiKey")
    public ResponseEntity generateApiKey(HttpServletRequest httpServletRequest) {
        DecodedJWT decodedJWT = RESTUtils.decodeJWT(RESTUtils.findJWT(httpServletRequest));
        String role = decodedJWT.getClaim("role").asString();
        try {
            if (role.equals("ROLE_ADMIN")) {
                String token = JWT.create()
                        .withIssuer("CATSS")
                        .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 /*1 day in milliseconds*/))
                        .sign(Algorithm.HMAC256(Resources.toString(Resources.getResource("newUserJwtSecret.key"), Charsets.UTF_8)));
                return ResponseEntity.ok(token);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            log.error(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public boolean checkUsername(String username) {
        for (Row row : Cassandra.query("users", Collections.emptyList(), "*")) {
            User user = (GSON.gson.fromJson(row.getObject(0).toString(), User.class));
            if (user.getUsername().equals(username)) {
                return false;
            }
        }
        return true;
    }
}
