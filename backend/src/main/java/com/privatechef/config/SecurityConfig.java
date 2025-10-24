package com.privatechef.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 禁用CSRF保护，因为这是REST API
            .csrf().disable()
            // 配置会话管理为无状态
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            // 配置授权规则
            .authorizeHttpRequests(auth -> auth
                // 允许公开访问测试端点
                .antMatchers("/api/test/**").permitAll()
                // 允许公开访问健康检查端点
                .antMatchers("/actuator/health").permitAll()
                // 其他所有请求都需要认证
                .anyRequest().authenticated()
            )
            // 配置HTTP Basic认证
            .httpBasic();

        return http.build();
    }
}