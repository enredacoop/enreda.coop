import {
  navlinkIndicators,
  serviceMenuHandler,
  initProjectSearch,
  mobileMenuHandler,
  scrollUp,
  scrollDown,
} from "./functions.js";
import { getPathName } from "./utils.js";

const commonScripts = () => {
  navlinkIndicators();
  serviceMenuHandler();
  mobileMenuHandler();
  scrollUp();
  scrollDown();
  if (getPathName() === "/proyectos/") {
    initProjectSearch();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  commonScripts();
});
document.addEventListener("changed-view", () => {
  commonScripts();
});
