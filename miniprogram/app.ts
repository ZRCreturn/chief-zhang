// app.ts
import { checkLoginStatus } from './utils/auth';
import { getUserInfo, getToken } from './utils/storage';

App<IAppOption>({
  globalData: {
    userInfo: undefined,
    isLoggedIn: false,
    token: undefined
  },

  onLaunch() {
    console.log('私厨点餐小程序启动');

    // 检查登录状态
    const isLoggedIn = checkLoginStatus();
    if (isLoggedIn) {
      const userInfo = getUserInfo();
      const token = getToken();

      this.globalData.isLoggedIn = true;
      this.globalData.userInfo = userInfo || undefined;
      this.globalData.token = token || undefined;

      console.log('用户已登录:', userInfo);
    } else {
      console.log('用户未登录，跳转到登录页');
      // 未登录时跳转到登录页
      wx.redirectTo({
        url: '/pages/login/login'
      });
    }

    // 初始化Mock数据（开发用）
    this.initMockData();
  },

  // 初始化Mock数据
  initMockData() {
    // 如果本地没有菜品数据，初始化一些Mock菜品
    const dishes = wx.getStorageSync('dishes');
    if (!dishes || dishes.length === 0) {
      const mockDishes = [
        {
          id: 1,
          name: '红烧肉',
          description: '经典家常菜，肥而不腻',
          category: 'main',
          difficulty: 'medium',
          status: 'available',
          prepTime: 60,
          cookCount: 22,
          averageRating: 4.8,
          ingredients: [
            { name: '五花肉', amount: '500g', category: 'main' },
            { name: '冰糖', amount: '50g', category: 'seasoning' },
            { name: '生抽', amount: '2勺', category: 'seasoning' },
            { name: '老抽', amount: '1勺', category: 'seasoning' },
            { name: '料酒', amount: '2勺', category: 'seasoning' },
            { name: '姜片', amount: '3片', category: 'side' },
            { name: '葱段', amount: '2根', category: 'side' }
          ],
          steps: [
            { description: '五花肉切块，冷水下锅焯水', tip: '焯水时加入料酒去腥' },
            { description: '锅中放油，加入冰糖炒出糖色', tip: '小火慢炒，避免糊锅' },
            { description: '加入五花肉翻炒上色', tip: '翻炒均匀让每块肉都裹上糖色' },
            { description: '加入生抽、老抽、料酒和适量水', tip: '水量要没过五花肉' },
            { description: '小火慢炖40分钟至肉质软烂', tip: '中途可以翻动几次' },
            { description: '大火收汁，装盘撒上葱花', tip: '收汁时要不停翻炒防止粘锅' }
          ],
          createdBy: 'user',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        {
          id: 2,
          name: '番茄鸡蛋',
          description: '简单快手菜，营养美味',
          category: 'main',
          difficulty: 'easy',
          status: 'available',
          prepTime: 15,
          cookCount: 18,
          averageRating: 4.5,
          ingredients: [
            { name: '鸡蛋', amount: '3个', category: 'main' },
            { name: '番茄', amount: '2个', category: 'main' },
            { name: '盐', amount: '适量', category: 'seasoning' },
            { name: '糖', amount: '1勺', category: 'seasoning' },
            { name: '葱花', amount: '适量', category: 'side' }
          ],
          steps: [
            { description: '鸡蛋打散，番茄切块', tip: '番茄可以先用开水烫一下去皮' },
            { description: '锅中放油，倒入鸡蛋液炒熟盛出', tip: '鸡蛋不要炒得太老' },
            { description: '锅中再放油，加入番茄块翻炒', tip: '炒至番茄出汁' },
            { description: '加入炒好的鸡蛋，放盐和糖调味', tip: '糖可以中和番茄的酸味' },
            { description: '翻炒均匀，撒上葱花即可', tip: '喜欢汤汁多的可以加少量水' }
          ],
          createdBy: 'user',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        {
          id: 3,
          name: '麻婆豆腐',
          description: '麻辣鲜香，下饭神器',
          category: 'main',
          difficulty: 'medium',
          status: 'available',
          prepTime: 30,
          cookCount: 15,
          averageRating: 4.7,
          ingredients: [
            { name: '嫩豆腐', amount: '1块', category: 'main' },
            { name: '猪肉末', amount: '100g', category: 'main' },
            { name: '豆瓣酱', amount: '2勺', category: 'seasoning' },
            { name: '花椒粉', amount: '1勺', category: 'seasoning' },
            { name: '辣椒粉', amount: '1勺', category: 'seasoning' },
            { name: '蒜末', amount: '适量', category: 'side' },
            { name: '姜末', amount: '适量', category: 'side' }
          ],
          steps: [
            { description: '豆腐切块，用盐水浸泡10分钟', tip: '盐水浸泡可以让豆腐不易碎' },
            { description: '锅中放油，炒香肉末', tip: '肉末要炒到变色出油' },
            { description: '加入豆瓣酱、蒜末、姜末炒香', tip: '小火炒出红油' },
            { description: '加入适量水，放入豆腐块', tip: '水量要没过豆腐' },
            { description: '煮5分钟后加入花椒粉、辣椒粉', tip: '根据口味调整辣度' },
            { description: '小火煮至汤汁浓稠，勾芡出锅', tip: '勾芡时要轻轻推动' }
          ],
          createdBy: 'user',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        }
      ];
      wx.setStorageSync('dishes', mockDishes);
    }
  }
});