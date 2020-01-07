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
public class DataTuple {
    @NonNull
    private String id;
    @NonNull
    private String website, pass;
    @NonNull
    private Long timestamp;

}
