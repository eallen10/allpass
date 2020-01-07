package com.allpass.filter;

import com.allpass.utils.RESTUtils;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Collections;

import static com.allpass.utils.RESTUtils.findJWT;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

/**
 * Authentication filter for Spring Boot using the user's JWT.
 *
 * @version 2.0
 */
public class JwtTokenAuthenticationFilter extends GenericFilterBean {

    @SuppressWarnings({"FieldCanBeLocal", "unused"})
    private RequestMatcher requestMatcher;
    @SuppressWarnings({"FieldCanBeLocal", "unused"})
    private String secretKey;

    /**
     * Explicit Constructor for JwtTokenAuthenticationFilter
     *
     * @param path      the path on which the filter operates
     * @param secretKey the secret key used to encrypt the JWT
     */
    public JwtTokenAuthenticationFilter(String path, String secretKey) {
        this.requestMatcher = new AntPathRequestMatcher(path);
        this.secretKey = secretKey;
    }

    /**
     * Performs a filter on the {@link ServletRequest} to authenticate the user's request.
     *
     * @param servletRequest  the request
     * @param servletResponse the response
     * @param filterChain     the chain of filters to perform after this filter
     * @throws IOException      {@link IOException} thrown on filterChain.doFilter
     * @throws ServletException {@link ServletException} thrown on filterChain.doFilter
     */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;

        //check that the user isn't trying to login, we don't need to inspect someone's JWT before they have a JWT
        System.out.println("header: " + httpServletRequest.getHeader(AUTHORIZATION));
        System.out.println("uri: " + httpServletRequest.getRequestURI());
        if (httpServletRequest.getRequestURI().contains("/login") && httpServletRequest.getHeader(AUTHORIZATION).contains("Basic ")) {
            System.out.println("here");
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        //get JWT from http request
        String jwt = findJWT(httpServletRequest);
        //authenticate
        if (jwt != null) {
            DecodedJWT decodedJWT = RESTUtils.decodeJWT(jwt);
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                    decodedJWT.getClaim("username").asString(), null,
                    Collections.singletonList(new SimpleGrantedAuthority(decodedJWT.getClaim("role").asString()))));
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        }
        SecurityContextHolder.clearContext();
    }
}
