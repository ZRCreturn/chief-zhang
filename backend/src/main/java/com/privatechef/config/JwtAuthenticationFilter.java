package com.privatechef.config;

import com.privatechef.entity.User;
import com.privatechef.service.UserService;
import com.privatechef.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");

        String openid = null;
        String jwtToken = null;

        // JWT Token格式: "Bearer token"
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                openid = jwtUtil.getOpenidFromToken(jwtToken);
            } catch (Exception e) {
                log.error("无法从JWT token中获取openid: {}", e.getMessage());
            }
        } else {
            log.warn("JWT Token未以Bearer开头");
        }

        // 验证token
        if (openid != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userService.getUserInfo(openid);

            if (user != null && jwtUtil.validateToken(jwtToken)) {
                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(user, null, null);
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
                log.debug("用户认证成功: {}", user.getNickname());
            }
        }

        filterChain.doFilter(request, response);
    }
}