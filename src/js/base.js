import {
  navlinkIndicators,
  serviceMenuHandler,
  initSearch,
  mobileMenuHandler,
} from "./functions.js";
import { getPathName } from "./utils.js";

const commonScripts = () => {
  navlinkIndicators();
  serviceMenuHandler();
  mobileMenuHandler();
  if (getPathName() === "/proyectos/") {
    initSearch();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  commonScripts();
});
document.addEventListener("changed-view", () => {
  commonScripts();
});
