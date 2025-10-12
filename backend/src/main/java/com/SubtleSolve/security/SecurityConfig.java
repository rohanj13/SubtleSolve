package com.SubtleSolve.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        public static final String ADMIN = "admin";
        public static final String USER = "player";

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .cors(Customizer.withDefaults())
                                .csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(authz -> authz
                                                // Public routes
                                                .requestMatchers(HttpMethod.GET, "/api/dailypuzzle/*").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/history/**").permitAll()

                                                // Protected routes
                                                .requestMatchers(HttpMethod.POST, "/api/user/**").authenticated()
                                                .requestMatchers(HttpMethod.GET, "/api/user/stats").authenticated()

                                                // // Everything else
                                                .anyRequest().permitAll())
                                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .oauth2ResourceServer(oauth2 -> oauth2
                                                .jwt(jwt -> jwt.jwtAuthenticationConverter(
                                                                jwtAuthenticationConverter())));

                return http.build();
        }

        /**
         * Extract roles/permissions from Auth0 JWTs if needed
         */
        private JwtAuthenticationConverter jwtAuthenticationConverter() {
                JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
                // Auth0 typically puts scopes in "scope" claim, and roles/permissions in
                // "permissions"
                grantedAuthoritiesConverter.setAuthoritiesClaimName("permissions");
                grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

                JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
                converter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
                return converter;
        }
}