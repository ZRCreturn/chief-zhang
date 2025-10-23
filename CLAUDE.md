# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 项目概述

这是一个情侣专属私厨点餐小程序，作为浪漫生日礼物开发。采用前后端分离架构，前端部署到微信服务器，在微信App中运行。

**产品定位**：解决"今天吃什么"的日常难题，增加生活情趣的亲密工具

## 🏗️ 技术架构

### 🎯 整体架构概览
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   微信小程序     │ ──→│   Spring Boot   │ ──→│    MySQL 数据库  │
│   (前端)        │    │   (后端API)     │    │   (数据存储)    │
│                 │ ←──│                 │ ←──│                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
   微信客户端运行             云服务器部署             云服务器部署
```

### 前端技术栈
- **开发工具**：微信开发者工具（必需）
- **语言**：TypeScript + 严格配置
- **组件框架**：Glass-Easel
- **App ID**：wxc8467abc3abe5b36（试用版）

### 后端技术栈
- **框架**：Spring Boot 2.7.x (兼容 Java 8)
- **语言**：Java 8
- **数据库**：MySQL 8.0
- **构建工具**：Maven
- **部署**：单台云服务器（全栈部署）

### 项目结构
```
miniprogram/              # 微信小程序前端
├── app.ts               # 应用入口 ✅ 已完成
├── app.json             # 应用配置 ✅ 已完成
├── app.wxss             # 全局样式
├── pages/               # 页面组件
│   ├── login/           # 登录页面 ✅ 已完成
│   ├── index/           # 首页（菜品展示+购物车）✅ 已完成
│   ├── profile/         # 个人中心页 ✅ 已完成
│   └── logs/            # 日志页面（模板自带）
└── utils/               # 工具函数
    ├── auth.ts          # 认证工具 ✅ 已完成
    └── storage.ts       # 存储工具 ✅ 已完成

typings/                  # TypeScript类型定义
├── index.d.ts           # 自定义类型定义 ✅ 已完成
└── types/               # 微信API类型定义

backend/                  # Spring Boot后端 ✅ 已完成基础搭建
├── src/main/java/
│   └── com/privatechef/
│       ├── PrivateChefApplication.java  # 应用入口 ✅ 已完成
│       ├── entity/       # 实体类 ✅ 已完成
│       │   ├── User.java
│       │   ├── Dish.java
│       │   ├── DishIngredient.java
│       │   ├── DishStep.java
│       │   ├── Order.java
│       │   ├── OrderItem.java
│       │   └── DishRating.java
│       ├── controller/   # API控制器
│       ├── service/      # 业务逻辑
│       ├── repository/   # 数据访问
│       └── config/       # 配置类
├── src/main/resources/
│   ├── application.yml   # 应用配置 ✅ 已完成
│   ├── schema.sql        # 数据库表结构 ✅ 已完成
│   ├── data.sql          # 测试数据 ✅ 已完成
│   └── static/          # 静态资源
└── pom.xml              # Maven配置 ✅ 已完成
```

## 📱 MVP 产品设计

### 🎯 优化后的页面架构

#### 页面1：首页 - 菜品展示 + 购物车浮层
```
🏠 私厨菜单
┌─────────────────┐
│   🔍 搜索框     │
│   📂 分类标签   │
│                 │
│  🍳 [菜品卡片]   │
│  名称+图片+状态  │
│  [➕ 加入菜单]    │
│                 │
│  🍳 [菜品卡片]   │
│  名称+图片+状态  │
│  [➕ 加入菜单]    │
│                 │
│ ┌─────────────┐ │
│ │ 🛒 购物车(3) │ │ ← 底部固定浮层
│ │ 💰 预估食材: ¥68 │
│ │ [确认点餐]    │ │
│ └─────────────┘ │
└─────────────────┘
```

#### 页面2：添加页 (AddDish) - 菜品管理
```
➕ 添加菜品
┌─────────────────┐
│  📝 基本信息     │
│  名称：_________ │
│  分类：▽ 选择    │
│  图片：📷 上传   │
│                 │
│  🥬 食材清单     │
│  • _________    │
│  • _________    │
│  [添加食材]      │
│                 │
│  👨‍🍳 制作步骤     │
│  1. _________   │
│  2. _________   │
│  [添加步骤]      │
│                 │
│  [保存菜品]      │
└─────────────────┘
```

#### 页面3：个人中心 (Profile) - 数据统计
```
👤 我的私厨
┌─────────────────┐
│  👫 用户信息     │
│  宝贝 & 大厨     │
│                 │
│  📊 核心数据     │
│  • 已掌握：35道  │
│  • 本周点餐：5次 │
│  • 学习进度：78% │
│                 │
│  🏆 热门菜品     │
│  1. 红烧肉(22次) │
│  2. 番茄鸡蛋(18) │
│  3. 麻婆豆腐(15) │
│                 │
│  ⭐ 成就徽章     │
│  🥇 初级厨师     │
│  🥈 美食探索者   │
└─────────────────┘
```

### 🔄 交互流程优化

#### 1. 首页直接点餐
- 每个菜品卡片显示"加入菜单"按钮
- 点击后菜品加入底部购物车
- 购物车实时显示已选数量和预估价格

#### 2. 购物车浮层设计
```
🛒 购物车浮层
┌─────────────────┐
│ 今日菜单(3)      │
│                 │
│  ✅ 红烧肉       │
│  ✅ 西红柿鸡蛋   │
│  ✅ 凉拌黄瓜     │
│                 │
│  🥬 食材清单     │
│  • 猪肉 500g    │
│  • 鸡蛋 4个     │
│  • 西红柿 3个   │
│                 │
│  💰 预估价格     │
│  总计：¥68       │
│                 │
│  [确认点餐]      │
│  [继续添加]      │
└─────────────────┘
```

#### 3. 确认后的反馈
```
🎉 点餐成功！
┌─────────────────┐
│   ✅ 点餐成功    │
│                 │
│  已收到宝贝的订单 │
│  大厨开始准备啦！ │
│                 │
│  🥬 购物清单     │
│  • 猪肉 500g    │
│  • 鸡蛋 4个     │
│  • 西红柿 3个   │
│                 │
│  [分享给大厨]    │
│  [继续浏览]      │
└─────────────────┘
```

### 页面功能说明

#### 1. 首页 (Home) - 菜品展示 + 购物车
- **功能**：菜品分类浏览、搜索、实时购物车
- **特色**：底部购物车浮层，模仿外卖平台交互
- **交互**：直接点击菜品加入购物车，实时显示数量和预估价格

#### 2. 添加页 (AddDish) - 菜品管理
- **功能**：添加新菜品，包含基本信息、食材清单、制作步骤
- **特色**：结构化输入，支持食谱功能
- **分类**：主食/汤类/甜点/饮料/小吃

#### 3. 个人中心 (Profile) - 数据统计
- **功能**：用户信息、核心数据、热门菜品、成就系统
- **特色**：情感化设计，温馨文案，成就激励

### 核心功能特性

#### 🍳 菜品管理
- **菜品状态**：可制作/学习中/暂停供应
- **难度分级**：简单/中等/复杂
- **食谱功能**：食材清单、制作步骤、小贴士
- **使用数据**：制作次数、评分、最后制作时间

#### 🛒 点餐流程
- **一站式点餐**：首页直接完成浏览和点餐
- **智能购物车**：实时显示已选菜品和预估价格
- **食材清单**：自动合并所需食材
- **价格估算**：基于食材的简单价格计算

#### 📊 数据统计
- **对她可见**：已尝试菜品、点餐偏好、互动记录
- **对你可见**：厨艺成长、学习效率、受欢迎度分析
- **情侣互动**：共同成就、美食记忆、探索进度

## 🎨 交互设计原则

### 用户体验
1. **减少页面跳转**：一站式完成核心操作
2. **实时反馈**：操作立即看到效果
3. **情感化设计**：亲密称呼、温馨文案、成就激励

### 技术实现
1. **本地存储优先**：MVP阶段使用微信本地存储
2. **数据驱动**：通过修改数据间接更新界面
3. **组件化开发**：复用现有TypeScript + 小程序框架

## 💾 数据架构设计

### 🗄️ 数据库设计

#### 核心表结构
```sql
-- 用户表
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    openid VARCHAR(100) UNIQUE NOT NULL,     -- 微信openid
    nickname VARCHAR(50),                    -- 昵称
    avatar_url VARCHAR(200),                 -- 头像
    role ENUM('chef', 'customer') NOT NULL,  -- 角色：厨师/顾客
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 菜品表
CREATE TABLE dishes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,              -- 菜品名称
    description TEXT,                        -- 描述
    image_url VARCHAR(200),                  -- 图片URL
    category ENUM('main', 'soup', 'dessert', 'drink', 'snack') NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
    status ENUM('available', 'learning', 'paused') NOT NULL DEFAULT 'available',
    prep_time INT,                           -- 准备时间(分钟)
    cook_count INT DEFAULT 0,                -- 制作次数
    average_rating DECIMAL(3,2),             -- 平均评分
    created_by BIGINT NOT NULL,              -- 创建者
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- 食材表
CREATE TABLE dish_ingredients (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    dish_id BIGINT NOT NULL,
    ingredient VARCHAR(100) NOT NULL,        -- 食材名称
    amount VARCHAR(50),                      -- 用量
    category ENUM('main', 'side', 'seasoning') DEFAULT 'main', -- 分类
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dish_id) REFERENCES dishes(id) ON DELETE CASCADE,
    UNIQUE KEY uk_dish_ingredient (dish_id, ingredient)
);

-- 制作步骤表
CREATE TABLE dish_steps (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    dish_id BIGINT NOT NULL,
    step_number INT NOT NULL,                -- 步骤序号
    description TEXT NOT NULL,               -- 步骤描述
    tip TEXT,                                -- 小贴士
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dish_id) REFERENCES dishes(id) ON DELETE CASCADE,
    UNIQUE KEY uk_dish_step (dish_id, step_number)
);

-- 订单表
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL, -- 订单号
    customer_id BIGINT NOT NULL,             -- 点餐者
    status ENUM('pending', 'confirmed', 'cooking', 'completed', 'cancelled') DEFAULT 'pending',
    total_price DECIMAL(10,2) DEFAULT 0,     -- 总价
    special_notes TEXT,                      -- 特殊要求
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id)
);

-- 订单详情表
CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    dish_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,       -- 单价
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (dish_id) REFERENCES dishes(id),
    UNIQUE KEY uk_order_dish (order_id, dish_id)
);

-- 菜品评分表
CREATE TABLE dish_ratings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    dish_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5), -- 1-5分
    comment TEXT,                            -- 评论
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dish_id) REFERENCES dishes(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY uk_dish_user (dish_id, user_id)
);
```

### 🔗 API 接口设计

#### 认证相关
```
POST   /api/auth/login        # 微信登录
GET    /api/auth/profile      # 获取用户信息
PUT    /api/auth/profile      # 更新用户信息
```

#### 菜品管理
```
GET    /api/dishes            # 获取菜品列表（支持分类、搜索）
GET    /api/dishes/{id}       # 获取菜品详情
POST   /api/dishes            # 添加菜品
PUT    /api/dishes/{id}       # 更新菜品
DELETE /api/dishes/{id}       # 删除菜品
GET    /api/categories        # 获取分类列表
```

#### 点餐功能
```
POST   /api/orders            # 创建订单
GET    /api/orders            # 获取订单列表
GET    /api/orders/{id}       # 获取订单详情
PUT    /api/orders/{id}       # 更新订单状态
DELETE /api/orders/{id}       # 取消订单
```

#### 数据统计
```
GET    /api/statistics/overview      # 数据概览
GET    /api/statistics/dishes        # 菜品统计
GET    /api/statistics/orders        # 订单统计
GET    /api/statistics/learning      # 学习进度
```

### 🔐 安全架构

#### 微信登录流程
```
1. 小程序调用 wx.login() 获取 code
2. 小程序将 code 发送到后端 /api/auth/login
3. 后端调用微信接口换取 openid 和 session_key
4. 后端生成 JWT token 返回给小程序
5. 小程序后续请求携带 JWT token
```

#### Spring Security 配置
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
```

### 🚀 部署架构

#### 单服务器部署方案
```
云服务器 (2核4G 推荐)
├── Nginx (反向代理 + 静态资源)
├── Spring Boot 应用 (端口 8080)
├── MySQL 8.0 (端口 3306)
└── 文件存储 (菜品图片)
```

#### 网络配置
```nginx
# Nginx 配置示例
server {
    listen 80;
    server_name your-domain.com;

    # 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # API 代理
    location /api/ {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # 静态资源
    location /static/ {
        alias /path/to/static/files/;
        expires 30d;
    }
}
```

#### 环境要求
- **服务器**：CentOS 7+/Ubuntu 18.04+
- **Java**：OpenJDK 8
- **MySQL**：8.0+
- **内存**：至少 2GB
- **存储**：至少 20GB SSD

### 📊 性能考虑

#### 并发处理
- **用户量**：2人（极低并发）
- **数据库连接池**：HikariCP (默认配置足够)
- **缓存**：初期不需要Redis，后续可添加

#### 数据备份
```bash
# 每日自动备份
0 2 * * * /usr/bin/mysqldump -u root -p password private_chef > /backup/private_chef_$(date +%Y%m%d).sql
```

### 🔧 监控和维护

#### 健康检查
```java
@RestController
public class HealthController {

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP", "timestamp", Instant.now().toString());
    }
}
```

#### 日志配置
```yaml
# application.yml
logging:
  level:
    com.privatechef: DEBUG
  file:
    name: /var/log/private-chef/app.log
  pattern:
    file: '%d{yyyy-MM-dd HH:mm:ss} - %msg%n'
```

## 🚀 开发优先级

### MVP 核心功能 (P0)

#### 前端开发 (微信小程序)
1. **首页+购物车**：菜品展示、实时购物车 (2.5天)
2. **菜品添加**：完整菜品信息录入 (2天)
3. **个人中心**：数据展示、成就系统 (1.5天)
4. **API集成**：与后端接口对接 (1天)

#### 后端开发 (Spring Boot)
1. **项目搭建**：Spring Boot + MySQL 环境配置 (0.5天)
2. **数据库设计**：创建所有表结构和初始数据 (0.5天)
3. **用户认证**：微信登录、JWT token 管理 (1天)
4. **菜品管理API**：CRUD 操作、图片上传 (1.5天)
5. **点餐功能API**：订单创建、状态管理 (1天)
6. **数据统计API**：基础统计接口 (0.5天)

#### 部署和配置
1. **服务器环境**：Nginx + SSL 证书配置 (0.5天)
2. **数据库部署**：MySQL 安装和配置 (0.5天)
3. **应用部署**：Spring Boot 应用部署和测试 (0.5天)

### 开发时间估算
- **前端**：7天
- **后端**：5.5天
- **部署**：1.5天
- **总计**：约14天（2周）

### 后续迭代 (P1/P2)
- **食谱完善**：步骤图片、语音录入
- **数据可视化**：图表、趋势分析
- **云端同步**：多设备数据同步
- **智能推荐**：季节、天气推荐
- **消息推送**：订单状态通知
- **社交功能**：分享菜品到朋友圈

## ⚙️ 开发配置

### 关键配置文件
- `project.config.json` - 微信开发者工具项目配置
- `tsconfig.json` - TypeScript严格配置
- `miniprogram/app.json` - 小程序页面和窗口配置

### 开发工作流
1. 在微信开发者工具中打开项目
2. 工具自动编译TypeScript和处理构建过程
3. 使用微信开发者工具模拟器进行测试
4. 无需单独构建命令 - 编译由IDE处理

## 📝 重要说明

- 这是试用版小程序 (libVersion: "trial")
- 启用了Skyline渲染以增强性能
- 使用新的Glass-Easel组件框架
- 配置了所需组件的懒加载
- 除了类型定义外没有npm依赖

## 🎯 成功指标

### MVP 验证目标
- ✅ 核心流程完成：添加菜品 → 浏览菜单 → 点餐 → 查看统计
- ✅ 用户体验流畅：主要操作在3步内完成
- ✅ 数据完整性：菜品信息、点餐记录完整存储
- ✅ 情感价值：增强情侣互动，解决日常难题

---

## 🎯 技术架构总结

### 架构优势
1. **技术成熟**：Spring Boot + MySQL 是经过验证的稳定组合
2. **开发效率**：前后端分离，并行开发
3. **部署简单**：单服务器全栈部署，运维成本低
4. **扩展性**：模块化设计，便于后续功能扩展
5. **成本可控**：初期投入低，云服务器费用可控

### 关键技术决策
- **单服务器部署**：适合2人使用的轻量级应用
- **微信生态集成**：利用微信提供的用户体系和支付能力
- **RESTful API**：标准化的前后端通信协议
- **JWT认证**：无状态认证，适合小程序场景

### 风险控制
- **数据备份**：每日自动数据库备份
- **监控告警**：基础的健康检查和日志监控
- **安全防护**：HTTPS加密、SQL注入防护、XSS防护

### 性能预期
- **响应时间**：API响应 < 200ms
- **并发支持**：轻松支持2人同时使用
- **存储需求**：初期 < 1GB，图片使用CDN优化

---

**产品愿景**：从工具到回忆，记录每一道菜背后的故事和情感

**技术目标**：构建稳定、可扩展、易维护的私厨点餐系统

## 📊 当前开发进度

### 🚧 前端框架状态
- [x] **用户认证相关数据类型定义** - 已完成
- [x] **Mock API工具函数** - 已完成
- [x] **登录页面组件** - 已完成
- [x] **用户信息页面组件** - 已完成
- [x] **应用配置和路由更新** - 已完成
- [x] **本地存储管理工具** - 已完成
- [ ] **添加菜品页面** - 待创建
- [ ] **菜品详情页面** - 待创建
- [ ] **订单管理页面** - 待创建

### 🚀 后端开发状态
- [x] **Spring Boot项目搭建** - 已完成
- [x] **MySQL数据库配置** - 已完成
- [x] **实体类设计** - 已完成（7个实体类）
- [x] **数据库表结构** - 已完成（7张表）
- [x] **测试数据初始化** - 已完成
- [x] **应用配置** - 已完成
- [x] **应用启动** - 已完成（端口8080）
- [ ] **Repository接口** - 待开发
- [ ] **Service业务逻辑** - 待开发
- [ ] **Controller API** - 待开发

### 📋 下一步开发计划
1. **后端API开发阶段**
   - 创建Repository数据访问层
   - 实现Service业务逻辑层
   - 开发Controller REST API接口

2. **前端功能完善阶段**
   - 添加菜品页面开发
   - 菜品详情页面开发
   - 订单管理页面开发

3. **前后端集成阶段**
   - API接口对接
   - 数据持久化
   - 用户认证集成

### 🔧 当前代码状态
- 项目目前基于微信小程序TypeScript模板
- 只有基础的index和logs页面
- 需要按照CLAUDE.md规划逐步实现私厨点餐功能
- TypeScript配置和项目结构已就绪，为后续开发提供良好基础

## 🚀 后端开发进展 (2025-10-21)

### ✅ 已完成的后端工作

#### 1. Spring Boot项目搭建
- ✅ **项目结构创建**：完整的Maven项目结构
- ✅ **依赖配置**：pom.xml包含所有必需依赖
  - Spring Boot 2.7.18
  - MySQL Connector 8.0.33
  - MyBatis Plus 3.5.3.1
  - JWT认证
  - Lombok
  - Spring Security

#### 2. 数据库配置
- ✅ **MySQL安装**：MySQL 9.4.0已安装并配置
- ✅ **数据库创建**：private_chef数据库已创建
- ✅ **用户配置**：privatechef用户已创建并授权
- ✅ **连接配置**：application.yml数据库连接配置完成

#### 3. 实体类设计
- ✅ **用户实体** (User) - 支持微信登录和角色管理
- ✅ **菜品实体** (Dish) - 包含分类、难度、状态等
- ✅ **食材实体** (DishIngredient) - 食材用量和分类
- ✅ **步骤实体** (DishStep) - 制作步骤和小贴士
- ✅ **订单实体** (Order) - 订单状态管理
- ✅ **订单详情** (OrderItem) - 订单菜品关联
- ✅ **评分实体** (DishRating) - 用户评分和评论

#### 4. 数据库初始化
- ✅ **表结构创建**：schema.sql包含完整表结构
- ✅ **测试数据**：data.sql包含丰富的测试数据
  - 2个用户（大厨和宝贝）
  - 6道菜品（红烧肉、西红柿鸡蛋等）
  - 完整的食材清单和制作步骤
  - 3个订单记录
  - 用户评分和评论

#### 5. 应用配置
- ✅ **Spring Boot配置**：application.yml完整配置
- ✅ **数据库连接池**：HikariCP配置
- ✅ **JPA配置**：Hibernate自动建表
- ✅ **安全配置**：Spring Security基础配置
- ✅ **日志配置**：文件日志和调试级别

### 🎯 当前运行状态
- **应用状态**：✅ 正常运行在端口8080
- **数据库连接**：✅ 连接正常
- **表结构**：✅ 7张表已创建
- **测试数据**：✅ 完整数据已插入

### 🔄 运行命令
```bash
# 启动应用
cd backend
mvn spring-boot:run

# 检查状态
curl http://localhost:8080/actuator/health

# 停止应用
kill $(lsof -ti:8080)
```

### 📋 下一步开发计划
1. **创建Repository接口** - 数据访问层
2. **实现Service业务逻辑** - 业务处理层
3. **开发Controller API** - REST接口层
4. **前端API集成** - 小程序对接后端

### 🔗 前端连接配置
在前端代码中配置API基础URL：
```typescript
// 在miniprogram/utils/api.ts中
const BASE_URL = 'http://localhost:8080/api';
```