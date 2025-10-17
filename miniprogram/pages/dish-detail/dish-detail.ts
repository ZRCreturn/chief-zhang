// 菜品详情页面
import { getDishes, saveDishes } from '../../utils/storage';

Component({
  data: {
    dish: null as any,
    isEditing: false,
    editDish: null as any,
    testDishId: null as string | null
  },

  lifetimes: {
    attached() {
      // 延迟加载，确保页面参数已准备好
      setTimeout(() => {
        this.loadDishDetail();
      }, 100);
    }
  },

  pageLifetimes: {
    show() {
      // 页面显示时重新加载数据
      this.loadDishDetail();
    }
  },

  methods: {
    // 加载菜品详情
    loadDishDetail() {
      try {
        const pages = getCurrentPages();
        if (!pages || pages.length === 0) {
          console.error('无法获取页面栈');
          this.showErrorAndBack('页面信息错误');
          return;
        }

        const currentPage = pages[pages.length - 1];
        if (!currentPage || !currentPage.options) {
          console.error('无法获取页面参数');
          this.showErrorAndBack('页面参数错误');
          return;
        }

        const dishId = currentPage.options.id;
        console.log('获取到的菜品ID:', dishId);

        if (!dishId) {
          this.showErrorAndBack('菜品信息错误');
          return;
        }

        const dishes = getDishes();
        console.log('菜品列表:', dishes);

        const dish = dishes.find((d: any) => d.id == dishId);

        if (!dish) {
          this.showErrorAndBack('菜品不存在');
          return;
        }

        console.log('找到菜品:', dish);
        this.setData({
          dish,
          editDish: { ...dish }
        });
      } catch (error) {
        console.error('加载菜品详情失败:', error);
        this.showErrorAndBack('加载失败');
      }
    },

    // 显示错误并返回
    showErrorAndBack(message: string) {
      wx.showToast({
        title: message,
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    },

    // 开始编辑
    startEdit() {
      this.setData({
        isEditing: true
      });
    },

    // 取消编辑
    cancelEdit() {
      this.setData({
        isEditing: false,
        editDish: { ...this.data.dish }
      });
    },

    // 保存编辑
    saveEdit() {
      const { editDish } = this.data;

      if (!editDish.name.trim()) {
        wx.showToast({
          title: '请输入菜品名称',
          icon: 'none'
        });
        return;
      }

      // 更新菜品数据
      const dishes = getDishes();
      const dishIndex = dishes.findIndex((d: any) => d.id == editDish.id);

      if (dishIndex > -1) {
        dishes[dishIndex] = {
          ...editDish,
          updatedAt: new Date().toISOString()
        };
        saveDishes(dishes);

        this.setData({
          dish: dishes[dishIndex],
          isEditing: false
        });

        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
      }
    },

    // 删除菜品
    deleteDish() {
      wx.showModal({
        title: '确认删除',
        content: '确定要删除这个菜品吗？此操作不可恢复。',
        success: (res) => {
          if (res.confirm) {
            const dishes = getDishes();
            const filteredDishes = dishes.filter((d: any) => d.id != this.data.dish.id);
            saveDishes(filteredDishes);

            wx.showToast({
              title: '删除成功',
              icon: 'success',
              success: () => {
                setTimeout(() => {
                  wx.navigateBack();
                }, 1500);
              }
            });
          }
        }
      });
    },

    // 处理编辑输入
    onEditInput(e: any) {
      const { field } = e.currentTarget.dataset;
      const value = e.detail.value;

      this.setData({
        [`editDish.${field}`]: value
      });
    },

    // 处理分类选择
    onCategoryChange(e: any) {
      const categories = ['main', 'soup', 'dessert', 'drink', 'snack'];
      this.setData({
        'editDish.category': categories[e.detail.value]
      });
    },

    // 处理难度选择
    onDifficultyChange(e: any) {
      const difficulties = ['easy', 'medium', 'hard'];
      this.setData({
        'editDish.difficulty': difficulties[e.detail.value]
      });
    },

    // 处理状态选择
    onStatusChange(e: any) {
      const statuses = ['available', 'learning', 'paused'];
      this.setData({
        'editDish.status': statuses[e.detail.value]
      });
    },

    // 添加菜品到购物车
    addToCart() {
      const app = getApp<IAppOption>();
      if (app.globalData.addToCart) {
        app.globalData.addToCart(this.data.dish);
        wx.showToast({
          title: '已添加到菜单',
          icon: 'success'
        });
      } else {
        wx.showToast({
          title: '功能暂不可用',
          icon: 'none'
        });
      }
    },

    // 测试方法：手动加载菜品
    testLoadDish() {
      const dishes = getDishes();
      console.log('所有菜品:', dishes);

      if (dishes.length > 0) {
        const testDish = dishes[0]; // 使用第一个菜品测试
        console.log('测试菜品:', testDish);
        this.setData({
          dish: testDish,
          editDish: { ...testDish },
          testDishId: testDish.id
        });
      }
    }
  }
});