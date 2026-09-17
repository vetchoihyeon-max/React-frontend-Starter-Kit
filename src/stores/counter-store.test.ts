import { beforeEach, describe, expect, it } from "vitest";
import { useCounterStore } from "@/stores/counter-store";

describe("useCounterStore", () => {
  beforeEach(() => {
    useCounterStore.getState().reset();
  });

  it("초기값은 0이다", () => {
    expect(useCounterStore.getState().count).toBe(0);
  });

  it("increment는 값을 1 증가시킨다", () => {
    useCounterStore.getState().increment();

    expect(useCounterStore.getState().count).toBe(1);
  });

  it("decrement는 값을 1 감소시킨다", () => {
    useCounterStore.getState().decrement();

    expect(useCounterStore.getState().count).toBe(-1);
  });

  it("reset은 값을 0으로 되돌린다", () => {
    useCounterStore.getState().increment();
    useCounterStore.getState().increment();
    useCounterStore.getState().reset();

    expect(useCounterStore.getState().count).toBe(0);
  });
});
