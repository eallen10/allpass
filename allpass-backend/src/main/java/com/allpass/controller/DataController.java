package com.allpass.controller;

import com.allpass.database.Cassandra;
import com.allpass.database.DataTuple;
import com.allpass.database.User;
import com.allpass.utils.GSON;
import com.allpass.utils.RESTUtils;
import com.allpass.utils.SecurityUtils;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.datastax.driver.core.Row;
import com.datastax.driver.core.querybuilder.Clause;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Login Controller REST API.
 *
 * @version 2.0
 */
@Log4j2
@RestController
@RequestMapping("/api/data")
@PropertySource("classpath:application.properties")
@SuppressWarnings("unused")
public class DataController {

    @RequestMapping(method = GET, value = "/getData")
    public ResponseEntity getData(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        DecodedJWT decodedJWT = RESTUtils.decodeJWT(RESTUtils.findJWT(httpServletRequest));
        String username = decodedJWT.getClaim("username").asString();

        List<Row> initialRows = Cassandra.query("users", Lists.newArrayList(), "*");
        Set<DataTuple> tuples = new HashSet<>();
        for (Row row : Cassandra.query(
                "data",
                Collections.singletonList(QueryBuilder.eq("user", username)),
                "*")) {
            tuples.add(GSON.gson.fromJson(row.getObject(0).toString(), DataTuple.class));
        }
        return ResponseEntity.ok(tuples);
    }
    @RequestMapping(method = DELETE, value = "/deleteData/{id}")
    public ResponseEntity deleteData(HttpServletRequest httpServletRequest, @PathVariable String id) {
        DecodedJWT decodedJWT = RESTUtils.decodeJWT(RESTUtils.findJWT(httpServletRequest));
        String username = decodedJWT.getClaim("username").asString();

        DataTuple tuple = GSON.gson.fromJson(Cassandra.query("data", Collections.singletonList(QueryBuilder.eq("id", id)), "*")
                .get(0).getObject(0).toString(), DataTuple.class);

        if(username.equals(tuple.getUser())) {
            if(Cassandra.delete("data", id)) {
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
