export function getPathName() {
  return window.location.pathname.replace(/\/$/, "");
}
