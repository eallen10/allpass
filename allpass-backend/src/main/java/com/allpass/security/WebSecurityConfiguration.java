package com.allpass.security;

import com.allpass.filter.JwtTokenAuthenticationFilter;
import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.security.web.session.SessionManagementFilter;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.Filter;

import static org.springframework.http.HttpHeaders.*;
import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

/**
 * Web Security Configuration for Spring Boot REST API
 *
 * @version 2.0
 * @see <a href=https://github.com/SNCF-SIV/spring-security-rest-jwt/blob/master/src/main/java/com/sncf/siv/poc/security/config/WebSecurityConfiguration.java></a>
 */
@Configuration
@PropertySource("classpath:application.properties")
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableTransactionManagement
@SuppressWarnings({"unused", "SpringFacetCodeInspection"})
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    /**
     * Default constructor, calls super
     */
    public WebSecurityConfiguration() {
        /*
         * Ignores the default configuration, useless in our case (session management, etc..)
         */
        super(true);
    }

    /**
     * Sets configuration for JWT filter mapping and other Spring Boot properties
     *
     * @param httpSecurity {@link HttpSecurity}
     * @throws Exception thrown on .anonymous() or Resource.getResource()
     */
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        /* the secret key used to signed the JWT token is known exclusively by the server.
         With Nimbus JOSE implementation, it must be at least 256 characters longs.
         */
        String secret = Resources.toString(Resources.getResource("secret.key"), Charsets.UTF_8);

        httpSecurity
                /*
                Filters are added just after the ExceptionTranslationFilter so that Exceptions are catch by the exceptionHandling()
                 Further information about the order of filters, see FilterComparator
                 */
                .addFilterBefore(corsFilter(),SessionManagementFilter.class)
                .addFilterAfter((Filter) new JwtTokenAuthenticationFilter("/**", secret), ExceptionTranslationFilter.class)
                .addFilterAfter(corsFilter(), ExceptionTranslationFilter.class)
                /*
                 Exception management is handled by the authenticationEntryPoint (for exceptions related to authentications)
                 and by the AccessDeniedHandler (for exceptions related to access rights)
                */
                /*
                  anonymous() consider no authentication as being anonymous instead of null in the security context.
                 */
                .anonymous()
                .and()
                /* No Http session is used to get the security context */
                .sessionManagement().sessionCreationPolicy(STATELESS)
                .and()
                .authorizeRequests()
                /* All access to the authentication service are permitted without authentication (actually as anonymous) */
                .antMatchers("/login/**", "/activation/**").permitAll()

                /* All the other requests need an authentication.
                 Role access is done on Methods using annotations like @PreAuthorize
                 */
                .anyRequest().authenticated();
    }

    /**
     * Cross-Origin Resource Sharing filter for Spring Boot
     *
     * @return {@link CorsFilter}
     */
    private CorsFilter corsFilter() {
        /*
         CORS requests are managed only if headers Origin and Access-Control-Request-Method are available on OPTIONS requests
         (this filter is simply ignored in other cases).

         This filter can be used as a replacement for the @Cors annotation.
        */
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
//        config.addAllowedHeader(ORIGIN);
//        config.addAllowedHeader(CONTENT_TYPE);
//        config.addAllowedHeader(ACCEPT);
//        config.addAllowedHeader(AUTHORIZATION);
        config.addAllowedHeader("*"); //required because many API calls use custom headers, you could explicitly specify if you wnated to
        config.addAllowedMethod(GET);
        config.addAllowedMethod(PUT);
        config.addAllowedMethod(POST);
        config.addAllowedMethod(OPTIONS);
        config.addAllowedMethod(DELETE);
        config.addAllowedMethod(PATCH);
        config.setMaxAge(3600L);

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    /**
     * Indents server output, {@link com.fasterxml.jackson.databind.SerializationFeature#INDENT_OUTPUT}
     *
     * @return {@link Jackson2ObjectMapperBuilder}
     */
    @Bean
    public Jackson2ObjectMapperBuilder jackson2ObjectMapperBuilder() {
        return new Jackson2ObjectMapperBuilder().indentOutput(true);
    }
}
