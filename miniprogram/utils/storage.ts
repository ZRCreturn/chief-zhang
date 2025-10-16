// 本地存储管理工具

/**
 * 保存用户登录信息
 * @param token 用户token
 * @param userInfo 用户信息
 */
export const saveUserInfo = (token: string, userInfo: UserInfo): void => {
  wx.setStorageSync('token', token);
  wx.setStorageSync('userInfo', userInfo);
};

/**
 * 获取用户token
 * @returns 用户token
 */
export const getToken = (): string | null => {
  return wx.getStorageSync('token') || null;
};

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const getUserInfo = (): UserInfo | null => {
  return wx.getStorageSync('userInfo') || null;
};

/**
 * 清除用户信息
 */
export const clearUserInfo = (): void => {
  wx.removeStorageSync('token');
  wx.removeStorageSync('userInfo');
};

/**
 * 保存购物车信息
 * @param cart 购物车数据
 */
export const saveCart = (cart: any[]): void => {
  wx.setStorageSync('cart', cart);
};

/**
 * 获取购物车信息
 * @returns 购物车数据
 */
export const getCart = (): any[] => {
  return wx.getStorageSync('cart') || [];
};

/**
 * 清除购物车信息
 */
export const clearCart = (): void => {
  wx.removeStorageSync('cart');
};

/**
 * 保存菜品数据
 * @param dishes 菜品数据
 */
export const saveDishes = (dishes: any[]): void => {
  wx.setStorageSync('dishes', dishes);
};

/**
 * 获取菜品数据
 * @returns 菜品数据
 */
export const getDishes = (): any[] => {
  return wx.getStorageSync('dishes') || [];
};

/**
 * 清除所有应用数据
 */
export const clearAllData = (): void => {
  const keys = ['token', 'userInfo', 'cart', 'dishes', 'orders'];
  keys.forEach(key => {
    wx.removeStorageSync(key);
  });
};