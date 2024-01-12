import {
  navlinkIndicators,
  serviceMenuHandler,
  initProjectSearch,
  mobileMenuHandler,
  scrollUp,
  scrollDown,
  initSdgInteractiveTables
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
  if (getPathName() === "/ods/") {
    initSdgInteractiveTables()
  }
};

document.addEventListener("DOMContentLoaded", () => {
  commonScripts();
});
document.addEventListener("changed-view", () => {
  commonScripts();
});
