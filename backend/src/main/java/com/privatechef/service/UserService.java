package com.privatechef.service;

import com.privatechef.entity.User;
import com.privatechef.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    /**
     * 根据openid查找用户
     */
    public Optional<User> findByOpenid(String openid) {
        return userRepository.findByOpenid(openid);
    }

    /**
     * 创建新用户
     */
    public User createUser(String openid, String nickname, String avatarUrl, User.UserRole role) {
        User user = new User(openid, nickname, avatarUrl, role);
        User savedUser = userRepository.save(user);
        log.info("创建新用户: {} (角色: {})", nickname, role);
        return savedUser;
    }

    /**
     * 更新用户信息
     */
    public User updateUserInfo(String openid, String nickname, String avatarUrl) {
        Optional<User> userOpt = userRepository.findByOpenid(openid);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setNickname(nickname);
            user.setAvatarUrl(avatarUrl);
            User updatedUser = userRepository.save(user);
            log.info("更新用户信息: {}", nickname);
            return updatedUser;
        }
        return null;
    }

    /**
     * 检查用户是否存在
     */
    public boolean existsByOpenid(String openid) {
        return userRepository.existsByOpenid(openid);
    }

    /**
     * 获取用户信息
     */
    public User getUserInfo(String openid) {
        return userRepository.findByOpenid(openid).orElse(null);
    }
}