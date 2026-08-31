import { useEffect, useState } from "react";

export const useGoogleAnalytics = (gaMeasurementId?: string) => {
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    const loadScript = () => {
      if (!(window as any).gtag && gaMeasurementId) {
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
        script.async = true;
        document.head.appendChild(script);
        script.onload = () => {
          (window as any).dataLayer = (window as any).dataLayer || [];
          function gtag() {
            (window as any).dataLayer.push(arguments);
          }
          (window as any).gtag = gtag;
          (window as any).gtag("js", new Date());
          (window as any).gtag("config", gaMeasurementId, {
            debug_mode: false,
          });
          setIsInitialized(true);
        };
      } else {
        setIsInitialized(true);
      }
    };
    loadScript();
  }, [gaMeasurementId]);
  return isInitialized;
};
