-- 私厨点餐系统测试数据初始化

-- 1. 用户表数据
INSERT INTO users (openid, nickname, avatar_url, role, created_at, updated_at) VALUES
('wx_openid_chef_001', '大厨', 'https://example.com/avatar_chef.jpg', 'chef', NOW(), NOW()),
('wx_openid_customer_001', '宝贝', 'https://example.com/avatar_customer.jpg', 'customer', NOW(), NOW());

-- 2. 菜品表数据
INSERT INTO dishes (name, description, image_url, category, difficulty, status, prep_time, cook_count, average_rating, created_by, created_at, updated_at) VALUES
('红烧肉', '经典家常菜，肥而不腻，入口即化', 'https://example.com/hongshaorou.jpg', 'main', 'medium', 'available', 120, 15, 4.8, 1, NOW(), NOW()),
('西红柿鸡蛋', '简单快手菜，酸甜可口', 'https://example.com/tomato_egg.jpg', 'main', 'easy', 'available', 20, 25, 4.5, 1, NOW(), NOW()),
('麻婆豆腐', '川菜经典，麻辣鲜香', 'https://example.com/mapotofu.jpg', 'main', 'medium', 'available', 30, 12, 4.7, 1, NOW(), NOW()),
('清炒西兰花', '健康蔬菜，清淡爽口', 'https://example.com/broccoli.jpg', 'main', 'easy', 'available', 15, 8, 4.2, 1, NOW(), NOW()),
('番茄牛腩汤', '营养汤品，酸甜开胃', 'https://example.com/tomato_beef_soup.jpg', 'soup', 'medium', 'available', 90, 6, 4.6, 1, NOW(), NOW()),
('水果沙拉', '清爽甜点，多种水果搭配', 'https://example.com/fruit_salad.jpg', 'dessert', 'easy', 'available', 10, 18, 4.3, 1, NOW(), NOW());

-- 3. 食材表数据
INSERT INTO dish_ingredients (dish_id, ingredient, amount, category, created_at) VALUES
(1, '五花肉', '500g', 'main', NOW()),
(1, '冰糖', '30g', 'seasoning', NOW()),
(1, '老抽', '2勺', 'seasoning', NOW()),
(1, '料酒', '1勺', 'seasoning', NOW()),
(1, '姜片', '3片', 'seasoning', NOW()),

(2, '西红柿', '3个', 'main', NOW()),
(2, '鸡蛋', '4个', 'main', NOW()),
(2, '糖', '1勺', 'seasoning', NOW()),
(2, '盐', '适量', 'seasoning', NOW()),
(2, '葱花', '适量', 'seasoning', NOW()),

(3, '嫩豆腐', '1块', 'main', NOW()),
(3, '猪肉末', '100g', 'main', NOW()),
(3, '豆瓣酱', '2勺', 'seasoning', NOW()),
(3, '花椒粉', '1勺', 'seasoning', NOW()),
(3, '辣椒粉', '1勺', 'seasoning', NOW()),

(4, '西兰花', '1个', 'main', NOW()),
(4, '蒜末', '2瓣', 'seasoning', NOW()),
(4, '盐', '适量', 'seasoning', NOW()),
(4, '食用油', '1勺', 'seasoning', NOW()),

(5, '牛腩', '500g', 'main', NOW()),
(5, '番茄', '4个', 'main', NOW()),
(5, '土豆', '2个', 'side', NOW()),
(5, '胡萝卜', '1根', 'side', NOW()),
(5, '洋葱', '半个', 'side', NOW()),

(6, '苹果', '1个', 'main', NOW()),
(6, '香蕉', '2根', 'main', NOW()),
(6, '草莓', '100g', 'main', NOW()),
(6, '蓝莓', '50g', 'main', NOW()),
(6, '酸奶', '1杯', 'side', NOW());

-- 4. 制作步骤表数据
INSERT INTO dish_steps (dish_id, step_number, description, tip, created_at) VALUES
(1, 1, '五花肉切块，冷水下锅焯水去腥', '焯水时加入料酒和姜片效果更好', NOW()),
(1, 2, '锅中放油，加入冰糖炒出糖色', '注意火候，不要炒糊了', NOW()),
(1, 3, '加入五花肉翻炒上色', '翻炒均匀让每块肉都裹上糖色', NOW()),
(1, 4, '加入老抽、料酒和适量水，小火慢炖1小时', '炖的时间越长越入味', NOW()),
(1, 5, '大火收汁，装盘即可', '收汁时注意不要烧干', NOW()),

(2, 1, '西红柿洗净切块，鸡蛋打散', '西红柿去皮口感更好', NOW()),
(2, 2, '热锅凉油，倒入鸡蛋液炒熟盛出', '鸡蛋不要炒太老', NOW()),
(2, 3, '锅中留底油，放入西红柿翻炒出汁', '可以加少许糖帮助出汁', NOW()),
(2, 4, '加入炒好的鸡蛋，加盐调味', '轻轻翻炒避免鸡蛋碎掉', NOW()),
(2, 5, '撒上葱花，出锅装盘', '葱花最后放保持香气', NOW()),

(3, 1, '豆腐切块，用盐水浸泡10分钟', '盐水浸泡可以去除豆腥味', NOW()),
(3, 2, '锅中放油，炒香猪肉末', '炒至肉末变色出油', NOW()),
(3, 3, '加入豆瓣酱炒出红油', '小火慢炒避免糊锅', NOW()),
(3, 4, '加入适量水，放入豆腐煮5分钟', '不要频繁翻动，避免豆腐碎掉', NOW()),
(3, 5, '勾芡收汁，撒上花椒粉和辣椒粉', '花椒粉最后放保持麻味', NOW());

-- 5. 订单表数据
INSERT INTO orders (order_number, customer_id, status, total_price, special_notes, created_at, updated_at) VALUES
('PC202410210001', 2, 'completed', 68.50, '少放辣，多放葱花', NOW(), NOW()),
('PC202410210002', 2, 'cooking', 42.00, '米饭多盛一点', NOW(), NOW()),
('PC202410210003', 2, 'pending', 35.50, '打包带走', NOW(), NOW());

-- 6. 订单详情表数据
INSERT INTO order_items (order_id, dish_id, quantity, unit_price, created_at) VALUES
(1, 1, 1, 38.00, NOW()),
(1, 2, 1, 18.00, NOW()),
(1, 4, 1, 12.50, NOW()),
(2, 3, 1, 25.00, NOW()),
(2, 6, 1, 17.00, NOW()),
(3, 2, 2, 18.00, NOW());

-- 7. 菜品评分表数据
INSERT INTO dish_ratings (dish_id, user_id, rating, comment, created_at) VALUES
(1, 2, 5, '太好吃了！肥而不腻，入口即化，大厨手艺真棒！', NOW()),
(2, 2, 4, '酸甜可口，很下饭，就是有点咸了', NOW()),
(3, 2, 5, '麻辣鲜香，正宗川味，超级喜欢！', NOW()),
(4, 2, 4, '清淡健康，很适合减肥吃', NOW()),
(6, 2, 5, '水果很新鲜，搭配酸奶很美味', NOW());