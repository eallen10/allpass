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
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.StringUtils;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Login Controller REST API.
 *
 * @version 2.0
 */
@Log4j2
@RestController
@RequestMapping("/api")
@PropertySource("classpath:application.properties")
@SuppressWarnings("unused")
public class NewUserController {

    /**
     * Creates a user in Cassandra
     *
     * @param httpServletRequest the HTTP request
     * @param json               the new user information
     * @return {@link ResponseEntity} with an appropriate response code:
     * 200 OK - the user was created successfully
     * 500 INTERNAL SERVER ERROR - an error occurred
     */
    @RequestMapping(method = POST, path = "/createNewUser/{apiKey}")
    public ResponseEntity createNewUser(HttpServletRequest httpServletRequest, @RequestBody String json, @PathVariable String apiKey) {
        System.out.println(json);
        System.out.println(apiKey);

        RESTUtils.decodeNewUserJWT(apiKey);

        SecurityUtils securityUtils = new SecurityUtils();
        String uuid = UUID.randomUUID().toString();

        JsonParser parser = new JsonParser();
        JsonObject obj = parser.parse(json).getAsJsonObject();

        //check username against existing usernames and return FORBIDDEN if already exists
        if (!checkUsername(obj.get("username").getAsString())) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("username already exists");
        }

        if (!obj.get("pass1").getAsString().equals(obj.get("pass2").getAsString())) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("passwords do not match");
        }

        if (obj.get("pass1").getAsString().length() < 8) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("password must have more than 8 characters");
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
        user.setCreator("apiKey");
        user.setRole("ROLE_USER");

        if (Cassandra.upsert("users", user)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    boolean checkUsername(String username) {
        for (Row row : Cassandra.query("users", Collections.emptyList(), "*")) {
            User user = (GSON.gson.fromJson(row.getObject(0).toString(), User.class));
            if (user.getUsername().equals(username)) {
                return false;
            }
        }
        return true;
    }
}