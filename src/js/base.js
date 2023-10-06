import { navlinkIndicators, serviceMenuHandler, initSearch } from "./functions.js";
import { getPathName } from "./utils.js";

const commonScripts = () => {
  navlinkIndicators();
  serviceMenuHandler();
  if (getPathName() === "/proyectos") {
    initSearch();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  commonScripts();
});
document.addEventListener("changed-view", () => {
  commonScripts();
});
