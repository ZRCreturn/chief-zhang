/// <reference path="./types/index.d.ts" />

// 用户角色类型
type UserRole = 'chef' | 'customer';

// 用户信息接口
interface UserInfo {
  id?: number;
  openid?: string;
  nickname: string;
  avatarUrl: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

// 登录响应接口
interface LoginResponse {
  token: string;
  userInfo: UserInfo;
}

// 应用全局数据类型
interface IAppOption {
  globalData: {
    userInfo?: UserInfo;
    isLoggedIn: boolean;
    token?: string;
  };
  userInfoReadyCallback?: (userInfo: UserInfo) => void;
}

// Mock API 配置
interface MockConfig {
  useMock: boolean;
  mockDelay: number;
}