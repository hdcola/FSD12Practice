package one.hdcola.DoctorsList;

import org.slf4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    private final Logger logger = org.slf4j.LoggerFactory.getLogger(CorsConfig.class);

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        // config.setAllowCredentials(true);
        config.addAllowedOrigin("*"); // Allow access to all domains, can be modified on request
        config.addAllowedHeader("*"); // Allow access to all header information, can be modified as required
        config.addAllowedMethod("*"); // Allow access to all requested methods, can be modified as required
        source.registerCorsConfiguration("/**", config);
        logger.info("CorsFilter initialized");
        return new CorsFilter(source);
    }
}
