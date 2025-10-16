// 登录页面
import { mockLogin, checkLoginStatus } from '../../utils/auth';
import { saveUserInfo } from '../../utils/storage';

const app = getApp<IAppOption>();

Component({
  data: {
    isLoading: false,
    loginError: '',
    isLoggedIn: false
  },

  lifetimes: {
    attached() {
      // 检查是否已登录
      const loggedIn = checkLoginStatus();
      this.setData({
        isLoggedIn: loggedIn
      });

      if (loggedIn) {
        // 如果已登录，跳转到首页
        wx.switchTab({
          url: '/pages/index/index'
        });
      }
    }
  },

  methods: {
    // 微信登录
    async onWechatLogin() {
      if (this.data.isLoading) return;

      this.setData({
        isLoading: true,
        loginError: ''
      });

      try {
        // 获取微信登录code
        const loginRes = await new Promise<WechatMiniprogram.LoginSuccessCallbackResult>((resolve, reject) => {
          wx.login({
            success: resolve,
            fail: reject
          });
        });

        // 调用Mock登录API
        const loginData = await mockLogin(loginRes.code);

        // 保存用户信息到本地存储
        saveUserInfo(loginData.token, loginData.userInfo);

        // 更新全局状态
        app.globalData.isLoggedIn = true;
        app.globalData.token = loginData.token;
        app.globalData.userInfo = loginData.userInfo;

        // 登录成功，跳转到首页
        wx.switchTab({
          url: '/pages/index/index'
        });

      } catch (error) {
        console.error('登录失败:', error);
        this.setData({
          loginError: '登录失败，请重试'
        });
      } finally {
        this.setData({
          isLoading: false
        });
      }
    },

    // 游客模式（跳过登录）
    onGuestMode() {
      // 创建游客用户信息
      const guestUser: UserInfo = {
        nickname: '游客',
        avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        role: 'customer'
      };

      // 保存游客信息
      saveUserInfo('guest-token', guestUser);

      // 更新全局状态
      app.globalData.isLoggedIn = true;
      app.globalData.token = 'guest-token';
      app.globalData.userInfo = guestUser;

      // 跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  }
});