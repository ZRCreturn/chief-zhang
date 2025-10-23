// 首页
import { getDishes } from '../../utils/storage';

const app = getApp<IAppOption>();

Component({
  data: {
    userInfo: null as UserInfo | null,
    dishes: [] as any[],
    selectedDishes: [] as any[],
    showCart: false,
    totalPrice: 0
  },

  lifetimes: {
    attached() {
      this.loadUserInfo();
      this.loadDishes();
    }
  },

  pageLifetimes: {
    show() {
      // 页面显示时重新加载用户信息
      this.loadUserInfo();
    }
  },

  methods: {
    // 加载用户信息
    loadUserInfo() {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo
        });
      }
    },

    // 加载菜品数据
    loadDishes() {
      const dishes = getDishes();
      console.log('加载的菜品数据:', dishes);
      this.setData({
        dishes
      });
    },

    // 添加菜品到购物车
    addToCart(e: any) {
      const { dish } = e.currentTarget.dataset;
      const selectedDishes = [...this.data.selectedDishes];

      // 检查是否已存在
      const existingIndex = selectedDishes.findIndex(item => item.id === dish.id);
      if (existingIndex > -1) {
        // 如果已存在，增加数量
        selectedDishes[existingIndex].quantity += 1;
      } else {
        // 如果不存在，添加新菜品
        selectedDishes.push({
          ...dish,
          quantity: 1
        });
      }

      this.setData({
        selectedDishes,
        showCart: true
      });

      this.calculateTotalPrice();

      wx.showToast({
        title: '已添加到菜单',
        icon: 'success'
      });
    },

    // 计算总价
    calculateTotalPrice() {
      // 简单的价格计算（Mock）
      const totalPrice = this.data.selectedDishes.reduce((total, dish) => {
        return total + (dish.prepTime * 2); // 假设每分钟准备时间价值2元
      }, 0);

      this.setData({
        totalPrice
      });
    },

    // 显示/隐藏购物车
    toggleCart() {
      this.setData({
        showCart: !this.data.showCart
      });
    },

    // 确认点餐
    confirmOrder() {
      if (this.data.selectedDishes.length === 0) {
        wx.showToast({
          title: '请先选择菜品',
          icon: 'none'
        });
        return;
      }

      // 保存订单到本地
      const orders = wx.getStorageSync('orders') || [];
      const newOrder = {
        id: Date.now(),
        dishes: this.data.selectedDishes,
        totalPrice: this.data.totalPrice,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      orders.unshift(newOrder);
      wx.setStorageSync('orders', orders);

      // 清空购物车
      this.setData({
        selectedDishes: [],
        showCart: false,
        totalPrice: 0
      });

      wx.showModal({
        title: '点餐成功',
        content: '已收到阳阳宝贝的订单，大厨开始准备啦！',
        showCancel: false,
        success: () => {
          // 可以跳转到订单详情页
        }
      });
    },

    // 跳转到添加菜品页
    goToAddDish() {
      wx.navigateTo({
        url: '/pages/add-dish/add-dish'
      });
    },

    // 查看菜品详情
    viewDishDetail(e: any) {
      const { dish } = e.currentTarget.dataset;
      console.log('点击的菜品数据:', dish);
      console.log('菜品ID:', dish?.id);

      if (!dish || !dish.id) {
        wx.showToast({
          title: '菜品信息错误',
          icon: 'none'
        });
        return;
      }

      wx.navigateTo({
        url: `/pages/dish-detail/dish-detail?id=${dish.id}`
      });
    }
  }
});
