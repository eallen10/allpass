package com.allpass;

import com.allpass.database.Cassandra;
import com.allpass.utils.SecurityUtils;
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
        try {
            System.out.println(SecurityUtils.getSaltedHash("swbhznk9"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        SpringApplication.run(App.class, args);
    }
}
