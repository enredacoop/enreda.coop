import { setEventListener, navlinkIndicators, serviceMenuHandler } from "./functions.js";

document.addEventListener("DOMContentLoaded", () => {
  navlinkIndicators();
  serviceMenuHandler();
});
document.addEventListener("changed-view", () => {
  console.log("changed-view!!");
  navlinkIndicators();
  serviceMenuHandler();
});
