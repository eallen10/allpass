package com.allpass.database;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

/**
 * User object for storing saved Users in Cassandra
 *
 * @version 2.0
 */
@AllArgsConstructor
@Data
public class User {
    @NonNull
    private String id;
    @NonNull
    private String username, role, fname, lname, pass;
    @NonNull
    private Long timestamp;

}
