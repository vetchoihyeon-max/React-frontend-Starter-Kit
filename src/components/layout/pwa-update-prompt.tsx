import { useRegisterSW } from "virtual:pwa-register/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { logger } from "@/lib/logger";

/** 토스트가 중복으로 뜨지 않도록 고정 식별자를 쓴다 */
const UPDATE_TOAST_ID = "pwa-update";
const OFFLINE_TOAST_ID = "pwa-offline-ready";

/**
 * 서비스 워커를 등록하고 새 버전이 있을 때 갱신을 안내한다
 * 화면을 강제로 새로고침하지 않고 사용자가 시점을 고르게 한다
 */
export function PwaUpdatePrompt() {
  const { t } = useTranslation();
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW: (url) => logger.debug("서비스 워커 등록됨", url),
    onRegisterError: (error) => logger.error("서비스 워커 등록 실패", error),
  });

  useEffect(() => {
    if (!needRefresh) {
      return;
    }

    toast(t("pwa.updateTitle"), {
      id: UPDATE_TOAST_ID,
      description: t("pwa.updateDescription"),
      duration: Number.POSITIVE_INFINITY,
      action: {
        label: t("pwa.update"),
        // true를 넘기면 새 워커가 활성화된 뒤 페이지를 다시 불러온다
        onClick: () => updateServiceWorker(true),
      },
      onDismiss: () => setNeedRefresh(false),
    });
  }, [needRefresh, setNeedRefresh, updateServiceWorker, t]);

  useEffect(() => {
    if (!offlineReady) {
      return;
    }

    toast.success(t("pwa.offlineReady"), { id: OFFLINE_TOAST_ID });
    setOfflineReady(false);
  }, [offlineReady, setOfflineReady, t]);

  return null;
}
