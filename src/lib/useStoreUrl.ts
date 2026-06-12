import { useState, useEffect } from 'react';

const IOS_URL = 'https://apps.apple.com/in/app/famcare/id6761720384';
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.famcare.praja';

export function useStoreUrl(): string {
  const [url, setUrl] = useState(IOS_URL);

  useEffect(() => {
    if (/android/i.test(navigator.userAgent)) {
      setUrl(ANDROID_URL);
    }
  }, []);

  return url;
}
