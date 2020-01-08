package com.allpass.controller;

import com.allpass.database.Cassandra;
import com.allpass.database.User;
import com.allpass.utils.GSON;
import com.allpass.utils.SecurityUtils;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.datastax.driver.core.Row;
import com.datastax.driver.core.querybuilder.QueryBuilder;
import com.google.common.base.Charsets;
import com.google.common.collect.Lists;
import com.google.common.io.Resources;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.StringUtils;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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
public class LoginController {

    /**
     * Login the user.
     * <p>
     * Logs the user into server.
     * User is given a JWT as a response, as well as an added cookie so that
     * the user doesn't have to save the JWT, and it persists between sessions.
     *
     * @param httpServletRequest  the HTTP request (contains user auth)
     * @param httpServletResponse the HTTP response
     * @return {@link ResponseEntity} with JWT, JWT cookie, and an appropriate response code:
     * 200 OK - the login was successful
     * 401 UNAUTHORIZED - the request login information was invalid or missing
     * 500 INTERNAL SERVER ERROR - an error occurred
     */
    @RequestMapping(method = POST, value = "/login")
    public ResponseEntity login(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        //check that the request contains an authorization header with basic auth
        String authorizationHeader = httpServletRequest.getHeader(AUTHORIZATION);
        if (authorizationHeader == null || !authorizationHeader.startsWith("Basic ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        //check if any users exist. If not, create initial admin user and jwt
        List<Row> initialRows = Cassandra.query("users", Lists.newArrayList(), "*");
        if(initialRows.isEmpty()) {
            log.info("No user. Creating root user");
            String id = UUID.randomUUID().toString();
            String initialToken = null;
            Cassandra.createInitialUser(id);
            try {
                initialToken = JWT.create()
                        .withIssuer("CATSS")
                        .withClaim("username", "admin")
                        .withClaim("id", id)
                        .withClaim("role", "ROLE_ADMIN")
                        .withExpiresAt(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000 /*1 day in milliseconds*/))
                        .sign(Algorithm.HMAC256(Resources.toString(Resources.getResource("secret.key"), Charsets.UTF_8)));
            } catch (IOException e) {
                e.printStackTrace();
            }
            return ResponseEntity.status(HttpStatus.OK).body(initialToken);
        }

        //parse the basic auth into username and password
        String[] credentials = StringUtils.newStringUtf8(Base64.decodeBase64(authorizationHeader.substring("Basic ".length()))).split(":");
        String username = credentials[0];
        String password = credentials[1];
        String role = "ROLE_USER";

        //if no users exist with that username, return 'unauthorized'
        List<Row> row = Cassandra.query("users", Lists.newArrayList(QueryBuilder.eq("username", username)), "*");
        if(row.size() == 0) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        //create User object with returned user info from database
        String result = row.get(0).getString("[json]");
        User user = GSON.gson.fromJson(result, User.class);

        //if user is an admin, designate
        if(user.getRole().equals("Administrator")) {
            role = "ROLE_ADMIN";
        }

        try {
            //check the provided password with the salted and hashed stored password
            if (SecurityUtils.check(password, user.getPass())) {
                log.info("user verified, returning jwt");
                String token = null;
                //create jwt with user info
                try {
                    token = JWT.create()
                            .withIssuer("CATSS")
                            .withClaim("username", username)
                            .withClaim("id", user.getId())
                            .withClaim("role", role)
                            .withClaim("fname", user.getFname())
                            .withClaim("lname", user.getLname())
                            .withExpiresAt(new Date(System.currentTimeMillis() + 10000 /*1 day in milliseconds*/))
                            .sign(Algorithm.HMAC256(Resources.toString(Resources.getResource("secret.key"), Charsets.UTF_8)));
                } catch (IOException e) {
                    e.printStackTrace();
                }

                //create cookie with JWT
                Cookie cookie = new Cookie("jwt", token);
                cookie.setPath("/");
                cookie.setMaxAge(24 * 60 * 60/* 1 day in seconds*/);
                //add cookie to response
                httpServletResponse.addCookie(cookie);
                return ResponseEntity.status(HttpStatus.OK).body(token);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
