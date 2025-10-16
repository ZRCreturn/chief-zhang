// 个人中心页面
import { mockUpdateUserInfo } from '../../utils/auth';
import { getUserInfo, getToken, clearUserInfo, clearAllData } from '../../utils/storage';

const app = getApp<IAppOption>();

Component({
  data: {
    userInfo: null as UserInfo | null,
    isEditing: false,
    editNickname: '',
    statistics: {
      totalDishes: 0,
      weeklyOrders: 0,
      learningProgress: 0
    },
    popularDishes: [] as any[],
    achievements: [] as string[]
  },

  lifetimes: {
    attached() {
      this.loadUserInfo();
      this.loadStatistics();
    }
  },

  methods: {
    // 加载用户信息
    loadUserInfo() {
      const userInfo = getUserInfo();
      if (userInfo) {
        this.setData({
          userInfo,
          editNickname: userInfo.nickname
        });
      }
    },

    // 加载统计数据（Mock数据）
    loadStatistics() {
      // Mock统计数据
      this.setData({
        statistics: {
          totalDishes: 35,
          weeklyOrders: 5,
          learningProgress: 78
        },
        popularDishes: [
          { name: '红烧肉', count: 22 },
          { name: '番茄鸡蛋', count: 18 },
          { name: '麻婆豆腐', count: 15 }
        ],
        achievements: ['初级厨师', '美食探索者']
      });
    },

    // 开始编辑昵称
    onStartEdit() {
      this.setData({
        isEditing: true
      });
    },

    // 取消编辑
    onCancelEdit() {
      this.setData({
        isEditing: false,
        editNickname: this.data.userInfo?.nickname || ''
      });
    },

    // 保存昵称
    async onSaveNickname() {
      if (!this.data.editNickname.trim()) {
        wx.showToast({
          title: '请输入昵称',
          icon: 'none'
        });
        return;
      }

      try {
        const token = getToken();
        if (!token) {
          throw new Error('未登录');
        }

        // 调用Mock API更新用户信息
        const updatedUser = await mockUpdateUserInfo(token, {
          nickname: this.data.editNickname.trim()
        });

        // 更新本地存储
        const userInfo = getUserInfo();
        if (userInfo) {
          userInfo.nickname = this.data.editNickname.trim();
          wx.setStorageSync('userInfo', userInfo);
        }

        // 更新全局状态
        if (app.globalData.userInfo) {
          app.globalData.userInfo.nickname = this.data.editNickname.trim();
        }

        this.setData({
          userInfo: updatedUser,
          isEditing: false
        });

        wx.showToast({
          title: '更新成功',
          icon: 'success'
        });

      } catch (error) {
        console.error('更新昵称失败:', error);
        wx.showToast({
          title: '更新失败',
          icon: 'none'
        });
      }
    },

    // 昵称输入
    onNicknameInput(e: any) {
      this.setData({
        editNickname: e.detail.value
      });
    },

    // 退出登录
    onLogout() {
      wx.showModal({
        title: '确认退出',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // 清除登录状态
            clearUserInfo();

            // 更新全局状态
            app.globalData.isLoggedIn = false;
            app.globalData.token = undefined;
            app.globalData.userInfo = undefined;

            // 跳转到登录页
            wx.redirectTo({
              url: '/pages/login/login'
            });
          }
        }
      });
    },

    // 清除所有数据（开发用）
    onClearData() {
      wx.showModal({
        title: '清除数据',
        content: '这将清除所有本地数据，确定要继续吗？',
        success: (res) => {
          if (res.confirm) {
            clearAllData();
            wx.showToast({
              title: '数据已清除',
              icon: 'success'
            });
          }
        }
      });
    }
  }
});