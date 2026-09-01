/* Tries to hand off to the installed FamCare app via its custom URL scheme;
   if nothing intercepts it within the fallback window, the tab is still
   foregrounded, so no app is installed and we send the user to the store
   instead. Mirrors the same pattern used on the marketing site's other CTAs. */
const APP_SCHEME = 'famcare://';
const FALLBACK_DELAY_MS = 2500;

export function openAppOrStore(storeUrl: string) {
  const fallback = window.setTimeout(() => {
    window.location.href = storeUrl;
  }, FALLBACK_DELAY_MS);

  const cancel = () => {
    window.clearTimeout(fallback);
    document.removeEventListener('visibilitychange', onLeave);
    window.removeEventListener('blur', onLeave);
    window.removeEventListener('pagehide', onLeave);
  };
  const onLeave = () => {
    if (document.hidden) cancel();
  };
  document.addEventListener('visibilitychange', onLeave);
  window.addEventListener('blur', onLeave);
  window.addEventListener('pagehide', onLeave);

  window.location.href = APP_SCHEME;
}
