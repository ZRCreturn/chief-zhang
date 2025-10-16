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
          averageRating: 4.8
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
          averageRating: 4.5
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
          averageRating: 4.7
        }
      ];
      wx.setStorageSync('dishes', mockDishes);
    }
  }
});