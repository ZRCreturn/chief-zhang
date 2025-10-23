-- 私厨点餐系统数据库初始化脚本

-- 创建数据库
CREATE DATABASE IF NOT EXISTS private_chef DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE private_chef;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    openid VARCHAR(100) UNIQUE NOT NULL COMMENT '微信openid',
    nickname VARCHAR(50) COMMENT '昵称',
    avatar_url VARCHAR(200) COMMENT '头像URL',
    role ENUM('chef', 'customer') NOT NULL DEFAULT 'customer' COMMENT '角色：厨师/顾客',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_openid (openid),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 菜品表
CREATE TABLE IF NOT EXISTS dishes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '菜品名称',
    description TEXT COMMENT '描述',
    image_url VARCHAR(200) COMMENT '图片URL',
    category ENUM('main', 'soup', 'dessert', 'drink', 'snack') NOT NULL COMMENT '分类',
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL DEFAULT 'easy' COMMENT '难度',
    status ENUM('available', 'learning', 'paused') NOT NULL DEFAULT 'available' COMMENT '状态',
    prep_time INT DEFAULT 30 COMMENT '准备时间(分钟)',
    cook_count INT DEFAULT 0 COMMENT '制作次数',
    average_rating DECIMAL(3,2) DEFAULT 0.00 COMMENT '平均评分',
    created_by BIGINT NOT NULL COMMENT '创建者',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_category (category),
    INDEX idx_difficulty (difficulty),
    INDEX idx_status (status),
    INDEX idx_created_by (created_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='菜品表';

-- 食材表
CREATE TABLE IF NOT EXISTS dish_ingredients (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    dish_id BIGINT NOT NULL COMMENT '菜品ID',
    ingredient VARCHAR(100) NOT NULL COMMENT '食材名称',
    amount VARCHAR(50) COMMENT '用量',
    category ENUM('main', 'side', 'seasoning') DEFAULT 'main' COMMENT '分类',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dish_id) REFERENCES dishes(id) ON DELETE CASCADE,
    UNIQUE KEY uk_dish_ingredient (dish_id, ingredient),
    INDEX idx_dish_id (dish_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='食材表';

-- 制作步骤表
CREATE TABLE IF NOT EXISTS dish_steps (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    dish_id BIGINT NOT NULL COMMENT '菜品ID',
    step_number INT NOT NULL COMMENT '步骤序号',
    description TEXT NOT NULL COMMENT '步骤描述',
    tip TEXT COMMENT '小贴士',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dish_id) REFERENCES dishes(id) ON DELETE CASCADE,
    UNIQUE KEY uk_dish_step (dish_id, step_number),
    INDEX idx_dish_id (dish_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='制作步骤表';

-- 订单表
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL COMMENT '订单号',
    customer_id BIGINT NOT NULL COMMENT '点餐者',
    status ENUM('pending', 'confirmed', 'cooking', 'completed', 'cancelled') DEFAULT 'pending' COMMENT '订单状态',
    total_price DECIMAL(10,2) DEFAULT 0 COMMENT '总价',
    special_notes TEXT COMMENT '特殊要求',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id),
    INDEX idx_customer_id (customer_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单表';

-- 订单详情表
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL COMMENT '订单ID',
    dish_id BIGINT NOT NULL COMMENT '菜品ID',
    quantity INT NOT NULL DEFAULT 1 COMMENT '数量',
    unit_price DECIMAL(10,2) NOT NULL COMMENT '单价',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (dish_id) REFERENCES dishes(id),
    UNIQUE KEY uk_order_dish (order_id, dish_id),
    INDEX idx_order_id (order_id),
    INDEX idx_dish_id (dish_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单详情表';

-- 菜品评分表
CREATE TABLE IF NOT EXISTS dish_ratings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    dish_id BIGINT NOT NULL COMMENT '菜品ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5) COMMENT '评分1-5分',
    comment TEXT COMMENT '评论',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dish_id) REFERENCES dishes(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY uk_dish_user (dish_id, user_id),
    INDEX idx_dish_id (dish_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='菜品评分表';

-- 插入初始测试数据
INSERT IGNORE INTO users (id, openid, nickname, avatar_url, role) VALUES
(1, 'test_chef_openid', '大厨', 'https://example.com/avatar_chef.jpg', 'chef'),
(2, 'test_customer_openid', '宝贝', 'https://example.com/avatar_customer.jpg', 'customer');

INSERT IGNORE INTO dishes (id, name, description, category, difficulty, status, prep_time, cook_count, average_rating, created_by) VALUES
(1, '红烧肉', '经典家常菜，肥而不腻', 'main', 'medium', 'available', 60, 22, 4.8, 1),
(2, '番茄鸡蛋', '简单快手菜，营养美味', 'main', 'easy', 'available', 15, 18, 4.5, 1),
(3, '麻婆豆腐', '麻辣鲜香，下饭神器', 'main', 'medium', 'available', 30, 15, 4.7, 1);

INSERT IGNORE INTO dish_ingredients (dish_id, ingredient, amount, category) VALUES
(1, '五花肉', '500g', 'main'),
(1, '冰糖', '50g', 'seasoning'),
(1, '生抽', '2勺', 'seasoning'),
(1, '老抽', '1勺', 'seasoning'),
(1, '料酒', '2勺', 'seasoning'),
(1, '姜片', '3片', 'side'),
(1, '葱段', '2根', 'side'),

(2, '鸡蛋', '3个', 'main'),
(2, '番茄', '2个', 'main'),
(2, '盐', '适量', 'seasoning'),
(2, '糖', '1勺', 'seasoning'),
(2, '葱花', '适量', 'side'),

(3, '嫩豆腐', '1块', 'main'),
(3, '猪肉末', '100g', 'main'),
(3, '豆瓣酱', '2勺', 'seasoning'),
(3, '花椒粉', '1勺', 'seasoning'),
(3, '辣椒粉', '1勺', 'seasoning'),
(3, '蒜末', '适量', 'side'),
(3, '姜末', '适量', 'side');

INSERT IGNORE INTO dish_steps (dish_id, step_number, description, tip) VALUES
(1, 1, '五花肉切块，冷水下锅焯水', '焯水时加入料酒去腥'),
(1, 2, '锅中放油，加入冰糖炒出糖色', '小火慢炒，避免糊锅'),
(1, 3, '加入五花肉翻炒上色', '翻炒均匀让每块肉都裹上糖色'),
(1, 4, '加入生抽、老抽、料酒和适量水', '水量要没过五花肉'),
(1, 5, '小火慢炖40分钟至肉质软烂', '中途可以翻动几次'),
(1, 6, '大火收汁，装盘撒上葱花', '收汁时要不停翻炒防止粘锅'),

(2, 1, '鸡蛋打散，番茄切块', '番茄可以先用开水烫一下去皮'),
(2, 2, '锅中放油，倒入鸡蛋液炒熟盛出', '鸡蛋不要炒得太老'),
(2, 3, '锅中再放油，加入番茄块翻炒', '炒至番茄出汁'),
(2, 4, '加入炒好的鸡蛋，放盐和糖调味', '糖可以中和番茄的酸味'),
(2, 5, '翻炒均匀，撒上葱花即可', '喜欢汤汁多的可以加少量水'),

(3, 1, '豆腐切块，用盐水浸泡10分钟', '盐水浸泡可以让豆腐不易碎'),
(3, 2, '锅中放油，炒香肉末', '肉末要炒到变色出油'),
(3, 3, '加入豆瓣酱、蒜末、姜末炒香', '小火炒出红油'),
(3, 4, '加入适量水，放入豆腐块', '水量要没过豆腐'),
(3, 5, '煮5分钟后加入花椒粉、辣椒粉', '根据口味调整辣度'),
(3, 6, '小火煮至汤汁浓稠，勾芡出锅', '勾芡时要轻轻推动');