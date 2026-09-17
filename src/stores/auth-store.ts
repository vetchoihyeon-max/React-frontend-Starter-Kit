import { create } from "zustand";
import { persist } from "zustand/middleware";

/** 로그인한 사용자 정보 */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

/**
 * 인증 상태 스토어
 * localStorage는 동기적으로 복원되므로 첫 렌더 시점에 이미 로그인 여부를 알 수 있다
 * 실제 프로젝트에서는 login 안에서 인증 API를 호출하고 토큰을 저장하도록 바꾼다
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "app-auth" },
  ),
);

/**
 * 라우트 가드처럼 컴포넌트 밖에서 인증 상태를 읽을 때 사용한다
 * 훅과 달리 구독하지 않고 현재 값만 반환한다
 */
export const authGuard = {
  get user() {
    return useAuthStore.getState().user;
  },
  get isAuthenticated() {
    return useAuthStore.getState().user !== null;
  },
};
