package com.privatechef.controller;

import com.privatechef.entity.User;
import com.privatechef.service.UserService;
import com.privatechef.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * 微信登录接口
     * 在实际项目中，这里应该调用微信API验证code并获取openid
     * 这里简化处理，直接使用模拟的openid进行登录
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        log.info("用户登录请求: {}", request.getCode());

        // 在实际项目中，这里应该调用微信API获取openid
        // String openid = wechatService.getOpenid(request.getCode());

        // 模拟获取openid（实际开发中需要替换为真实的微信API调用）
        String openid = "mock_openid_" + System.currentTimeMillis();
        String nickname = request.getNickname() != null ? request.getNickname() : "用户";
        String avatarUrl = request.getAvatarUrl() != null ? request.getAvatarUrl() : "";

        // 检查用户是否存在，不存在则创建
        User user = userService.findByOpenid(openid).orElse(null);
        if (user == null) {
            // 默认角色为顾客，可以根据需要调整
            user = userService.createUser(openid, nickname, avatarUrl, User.UserRole.customer);
        } else {
            // 更新用户信息
            user = userService.updateUserInfo(openid, nickname, avatarUrl);
        }

        // 生成JWT token
        String token = jwtUtil.generateToken(openid);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("token", token);
        response.put("user", createUserResponse(user));

        log.info("用户登录成功: {}", user.getNickname());
        return ResponseEntity.ok(response);
    }

    /**
     * 获取用户信息
     */
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile(@RequestHeader("Authorization") String token) {
        String openid = jwtUtil.getOpenidFromToken(token.substring(7));
        User user = userService.getUserInfo(openid);

        if (user == null) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "用户不存在");
            return ResponseEntity.badRequest().body(response);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("user", createUserResponse(user));

        return ResponseEntity.ok(response);
    }

    /**
     * 更新用户信息
     */
    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(
            @RequestHeader("Authorization") String token,
            @RequestBody UpdateProfileRequest request) {

        String openid = jwtUtil.getOpenidFromToken(token.substring(7));
        User user = userService.updateUserInfo(openid, request.getNickname(), request.getAvatarUrl());

        if (user == null) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "用户不存在");
            return ResponseEntity.badRequest().body(response);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("user", createUserResponse(user));

        log.info("用户信息更新成功: {}", user.getNickname());
        return ResponseEntity.ok(response);
    }

    /**
     * 创建用户响应数据
     */
    private Map<String, Object> createUserResponse(User user) {
        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("id", user.getId());
        userResponse.put("openid", user.getOpenid());
        userResponse.put("nickname", user.getNickname());
        userResponse.put("avatarUrl", user.getAvatarUrl());
        userResponse.put("role", user.getRole());
        userResponse.put("createdAt", user.getCreatedAt());
        return userResponse;
    }

    /**
     * 登录请求DTO
     */
    public static class LoginRequest {
        private String code;
        private String nickname;
        private String avatarUrl;

        public LoginRequest() {
        }

        public LoginRequest(String code, String nickname, String avatarUrl) {
            this.code = code;
            this.nickname = nickname;
            this.avatarUrl = avatarUrl;
        }

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }

        public String getNickname() { return nickname; }
        public void setNickname(String nickname) { this.nickname = nickname; }

        public String getAvatarUrl() { return avatarUrl; }
        public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    }

    /**
     * 更新用户信息请求DTO
     */
    public static class UpdateProfileRequest {
        private String nickname;
        private String avatarUrl;

        public UpdateProfileRequest() {
        }

        public UpdateProfileRequest(String nickname, String avatarUrl) {
            this.nickname = nickname;
            this.avatarUrl = avatarUrl;
        }

        public String getNickname() { return nickname; }
        public void setNickname(String nickname) { this.nickname = nickname; }

        public String getAvatarUrl() { return avatarUrl; }
        public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    }
}