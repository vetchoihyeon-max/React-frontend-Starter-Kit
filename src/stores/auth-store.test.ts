import { beforeEach, describe, expect, it } from "vitest";
import { type AuthUser, authGuard, useAuthStore } from "@/stores/auth-store";

const testUser: AuthUser = {
  id: "user-1",
  name: "테스터",
  email: "tester@example.com",
};

describe("auth-store", () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null });
  });

  it("초기 상태는 비로그인이다", () => {
    expect(useAuthStore.getState().user).toBeNull();
    expect(authGuard.isAuthenticated).toBe(false);
  });

  it("login은 사용자 정보를 저장한다", () => {
    useAuthStore.getState().login(testUser);

    expect(useAuthStore.getState().user).toEqual(testUser);
    expect(authGuard.isAuthenticated).toBe(true);
    expect(authGuard.user).toEqual(testUser);
  });

  it("logout은 사용자 정보를 지운다", () => {
    useAuthStore.getState().login(testUser);
    useAuthStore.getState().logout();

    expect(useAuthStore.getState().user).toBeNull();
    expect(authGuard.isAuthenticated).toBe(false);
  });

  it("authGuard는 구독 없이 최신 값을 읽는다", () => {
    expect(authGuard.isAuthenticated).toBe(false);

    useAuthStore.setState({ user: testUser });

    expect(authGuard.isAuthenticated).toBe(true);
  });
});
