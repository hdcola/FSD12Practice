package org.hdcola.blog.Configs;

import org.hdcola.blog.Handler.LoginFailureHandler;
import org.hdcola.blog.Handler.LoginSucessHandler;
import org.hdcola.blog.Services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private CustomUserDetailsService userDetailsService;

    @Autowired
    public WebSecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(
                    (requests) -> requests
                            .requestMatchers("/settings/**","/article/**").authenticated()
                            .anyRequest().permitAll()
            )

           // Default login page is /login
           //.formLogin(Customizer.withDefaults());

            // Custom login page
            .formLogin(
                    (form) -> form
                            .loginPage("/login")
                            .loginProcessingUrl("/login")
                            .permitAll()
                            .defaultSuccessUrl("/", true)
                            .successHandler(new LoginSucessHandler())
                            .failureHandler(new LoginFailureHandler())

            )
            .logout(
                    (logout) -> logout
                            .logoutUrl("/logout")
                            .permitAll()
                            .logoutSuccessUrl("/")
            );
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

}
