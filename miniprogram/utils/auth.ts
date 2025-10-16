// 用户认证相关工具函数

// Mock配置
const mockConfig: MockConfig = {
  useMock: true, // 使用Mock数据
  mockDelay: 500 // Mock请求延迟
};

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock用户数据
const mockUsers: UserInfo[] = [
  {
    id: 1,
    nickname: '宝贝',
    avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    role: 'customer'
  },
  {
    id: 2,
    nickname: '大厨',
    avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    role: 'chef'
  }
];

/**
 * Mock登录API
 * @param code 微信登录code
 * @returns 登录响应
 */
export const mockLogin = async (code: string): Promise<LoginResponse> => {
  if (mockConfig.useMock) {
    await delay(mockConfig.mockDelay);

    // 模拟登录成功
    const user = mockUsers[0]; // 默认使用第一个用户
    return {
      token: 'mock-jwt-token-' + Date.now(),
      userInfo: user
    };
  }

  // 真实API调用（暂未实现）
  throw new Error('真实API暂未实现');
};

/**
 * Mock获取用户信息API
 * @param token 用户token
 * @returns 用户信息
 */
export const mockGetUserInfo = async (token: string): Promise<UserInfo> => {
  if (mockConfig.useMock) {
    await delay(mockConfig.mockDelay);

    // 根据token返回对应用户
    const userIndex = token.includes('1') ? 0 : 1;
    return mockUsers[userIndex];
  }

  // 真实API调用（暂未实现）
  throw new Error('真实API暂未实现');
};

/**
 * Mock更新用户信息API
 * @param token 用户token
 * @param userInfo 更新的用户信息
 * @returns 更新后的用户信息
 */
export const mockUpdateUserInfo = async (token: string, userInfo: Partial<UserInfo>): Promise<UserInfo> => {
  if (mockConfig.useMock) {
    await delay(mockConfig.mockDelay);

    // 模拟更新用户信息
    const currentUser = await mockGetUserInfo(token);
    const updatedUser = { ...currentUser, ...userInfo };

    // 更新Mock数据
    const userIndex = token.includes('1') ? 0 : 1;
    mockUsers[userIndex] = updatedUser;

    return updatedUser;
  }

  // 真实API调用（暂未实现）
  throw new Error('真实API暂未实现');
};

/**
 * 检查登录状态
 * @returns 是否已登录
 */
export const checkLoginStatus = (): boolean => {
  const token = wx.getStorageSync('token');
  const userInfo = wx.getStorageSync('userInfo');
  return !!(token && userInfo);
};

/**
 * 清除登录状态
 */
export const clearLoginStatus = (): void => {
  wx.removeStorageSync('token');
  wx.removeStorageSync('userInfo');
};