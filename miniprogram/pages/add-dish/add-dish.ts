// 添加菜品页面
import { saveDishes, getDishes } from '../../utils/storage';

Component({
  data: {
    dish: {
      name: '',
      description: '',
      category: 'main' as 'main' | 'soup' | 'dessert' | 'drink' | 'snack',
      difficulty: 'easy' as 'easy' | 'medium' | 'hard',
      prepTime: 30,
      status: 'available' as 'available' | 'learning' | 'paused',
      imageUrl: '',
      ingredients: [] as Array<{ name: string; amount: string; category: 'main' | 'side' | 'seasoning' }>,
      steps: [] as Array<{ description: string; tip: string }>
    },
    newIngredient: { name: '', amount: '', category: 'main' as 'main' | 'side' | 'seasoning' },
    newStep: { description: '', tip: '' }
  },

  methods: {
    // 处理菜品名称输入
    onNameInput(e: any) {
      this.setData({
        'dish.name': e.detail.value
      });
    },

    // 处理描述输入
    onDescriptionInput(e: any) {
      this.setData({
        'dish.description': e.detail.value
      });
    },

    // 选择分类
    onCategoryChange(e: any) {
      this.setData({
        'dish.category': e.detail.value
      });
    },

    // 选择难度
    onDifficultyChange(e: any) {
      this.setData({
        'dish.difficulty': e.detail.value
      });
    },

    // 选择状态
    onStatusChange(e: any) {
      this.setData({
        'dish.status': e.detail.value
      });
    },

    // 处理准备时间输入
    onPrepTimeInput(e: any) {
      this.setData({
        'dish.prepTime': parseInt(e.detail.value) || 30
      });
    },

    // 处理食材名称输入
    onIngredientNameInput(e: any) {
      this.setData({
        'newIngredient.name': e.detail.value
      });
    },

    // 处理食材用量输入
    onIngredientAmountInput(e: any) {
      this.setData({
        'newIngredient.amount': e.detail.value
      });
    },

    // 选择食材分类
    onIngredientCategoryChange(e: any) {
      this.setData({
        'newIngredient.category': e.detail.value
      });
    },

    // 添加食材
    addIngredient() {
      const { name, amount, category } = this.data.newIngredient;
      if (!name.trim()) {
        wx.showToast({
          title: '请输入食材名称',
          icon: 'none'
        });
        return;
      }

      const ingredients = [...this.data.dish.ingredients];
      ingredients.push({ name: name.trim(), amount: amount.trim(), category });

      this.setData({
        'dish.ingredients': ingredients,
        'newIngredient': { name: '', amount: '', category: 'main' }
      });
    },

    // 删除食材
    removeIngredient(e: any) {
      const index = e.currentTarget.dataset.index;
      const ingredients = [...this.data.dish.ingredients];
      ingredients.splice(index, 1);

      this.setData({
        'dish.ingredients': ingredients
      });
    },

    // 处理步骤描述输入
    onStepDescriptionInput(e: any) {
      this.setData({
        'newStep.description': e.detail.value
      });
    },

    // 处理步骤提示输入
    onStepTipInput(e: any) {
      this.setData({
        'newStep.tip': e.detail.value
      });
    },

    // 添加步骤
    addStep() {
      const { description, tip } = this.data.newStep;
      if (!description.trim()) {
        wx.showToast({
          title: '请输入步骤描述',
          icon: 'none'
        });
        return;
      }

      const steps = [...this.data.dish.steps];
      steps.push({ description: description.trim(), tip: tip.trim() });

      this.setData({
        'dish.steps': steps,
        'newStep': { description: '', tip: '' }
      });
    },

    // 删除步骤
    removeStep(e: any) {
      const index = e.currentTarget.dataset.index;
      const steps = [...this.data.dish.steps];
      steps.splice(index, 1);

      this.setData({
        'dish.steps': steps
      });
    },

    // 保存菜品
    saveDish() {
      const { name, category, ingredients, steps } = this.data.dish;

      if (!name.trim()) {
        wx.showToast({
          title: '请输入菜品名称',
          icon: 'none'
        });
        return;
      }

      if (ingredients.length === 0) {
        wx.showToast({
          title: '请至少添加一种食材',
          icon: 'none'
        });
        return;
      }

      if (steps.length === 0) {
        wx.showToast({
          title: '请至少添加一个制作步骤',
          icon: 'none'
        });
        return;
      }

      // 获取现有菜品数据
      const existingDishes = getDishes();

      // 创建新菜品
      const newDish = {
        id: Date.now(),
        ...this.data.dish,
        cookCount: 0,
        averageRating: 0,
        createdBy: 'user', // 暂时使用固定值
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // 添加到菜品列表
      existingDishes.push(newDish);
      saveDishes(existingDishes);

      wx.showToast({
        title: '菜品添加成功',
        icon: 'success',
        success: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    },

    // 取消添加
    cancel() {
      wx.navigateBack();
    }
  }
});