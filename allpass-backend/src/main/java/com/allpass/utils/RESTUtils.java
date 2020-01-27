package com.allpass.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.RSAKeyProvider;
import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Objects;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

/**
 * REST Util class for methods used frequently throughout the API
 */
@RestController
@SpringBootApplication
@SuppressWarnings("SpringFacetCodeInspection")
public class RESTUtils {

    /**
     * Finds the JWT in the HTTP request either in the cookie, or the AUTH header.
     *
     * @param httpServletRequest the HTTP request
     * @return the jwtString+
     */
    public static String findJWT(HttpServletRequest httpServletRequest) {
        String authorizationHeader = httpServletRequest.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring("Bearer ".length());
        } else if (httpServletRequest.getCookies() != null) {
            return Objects.requireNonNull(WebUtils.getCookie(httpServletRequest, "jwt")).getValue();
        } else {
            throw new RuntimeException("The HTTP request did not contain a JWT cookie or Bearer Auth Header.");
        }
    }

    /**
     * Decodes JWT.
     *
     * @param jwtString the JWT String representation
     * @return the validated {@link DecodedJWT}
     */
    public static DecodedJWT decodeJWT(String jwtString) {
        try {
            String secret = Resources.toString(Resources.getResource("jwtSecret.key"), Charsets.UTF_8);
            return JWT.require(Algorithm.HMAC256(secret))
                    .withIssuer("CATSS")
                    .build()
                    .verify(jwtString);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Decodes JWT.
     *
     * @param jwtString the JWT String representation
     * @return the validated {@link DecodedJWT}
     */
    public static DecodedJWT decodeNewUserJWT(String jwtString) {
        try {
            String secret = Resources.toString(Resources.getResource("newUserJwtSecret.key"), Charsets.UTF_8);
            return JWT.require(Algorithm.HMAC256(secret))
                    .withIssuer("CATSS")
                    .build()
                    .verify(jwtString);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}