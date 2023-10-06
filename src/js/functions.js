import { getPathName } from "./utils.js";

export function setEventListener() {
  navigation.addEventListener("navigate", function (event) {
    const toUrl = new URL(event.destination.url);
    event.intercept({
      async handler() {
        const response = await fetch(event.destination.url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const newContent = doc.querySelector("#content").innerHTML;

        document.startViewTransition(() => {
          document.querySelector("#content").innerHTML = newContent;
          document.documentElement.scrollTop = 0;
          console.log("Navigated to " + toUrl.pathname);
          document.dispatchEvent(new Event("changed-view"));
        });
        return true;
      },
    });
  });
}

export function navlinkIndicators() {
  // get url path and add aria-current to the corresponding menu item
  const path = getPathName();
  const menuItems = document.querySelectorAll(".navlink");
  console.log("path", path);
  menuItems.forEach((item) => {
    console.log(item.getAttribute("href"));
    if (item.getAttribute("href") === path) {
      item.setAttribute("aria-current", "page");
    }
    if (item.getAttribute("href") !== path) {
      item.removeAttribute("aria-current");
    }
  });
  resetMenu();
}

export function serviceMenuHandler() {
  const servicesMenu = document.querySelector("#serviceMenu");
  const serviceMenuButton = document.querySelector("#serviceMenuButton");
  // console log to check if serviceMenuButton is checked
  serviceMenuButton.onclick = function () {
    console.log("checked", serviceMenuButton.checked);
    if (serviceMenuButton.checked) {
      servicesMenu.style.display = "block";
      lockScroll();
      setTimeout(() => {
        servicesMenu.style.transform = "translateX(0)";
      }, 10); // Adding a small delay to allow the display property to take effect before transitioning
    }
    if (!serviceMenuButton.checked) {
      servicesMenu.style.transform = "translateX(100%)";
      unlockScroll();
      setTimeout(() => {
        servicesMenu.style.display = "none";
      }, 300); // Adding a small delay to allow the transform property to take effect before hiding the menu
    }
  };
}

export const scrollUp = () => {
  const scrollUpButton = document.querySelector("#scrollUpButton");
  scrollUpButton.onclick = function () {
    document.documentElement.scrollTop = 0;
  };
};

const lockScroll = () => {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
};
const unlockScroll = () => {
  document.body.style.overflow = "auto";
  document.documentElement.style.overflow = "auto";
};
export function mobileMenuHandler() {
  const serviceMenu = document.querySelector("#serviceMenu");
  const mobileMenu = document.querySelector("#mobileMenu");
  const mobileMenuButton = document.querySelector("#mobileMenuButton");
  const mobileServiceMenuButton = document.querySelector("#mobileServiceMenuButton");
  // console log to check if serviceMenuButton is checked
  mobileMenuButton.onclick = function () {
    if (mobileMenuButton.checked) {
      if (mobileServiceMenuButton.checked) {
        mobileServiceMenuButton.checked = false;
        mobileServiceMenuButton.checked = false;
        serviceMenu.style.transform = "translateX(100%)";
        setTimeout(() => {
          serviceMenu.style.display = "none";
        }, 300); // Adding a small delay to allow the transform property to take effect before hiding the menu
      }
      mobileMenu.style.display = "block";
      lockScroll();
      setTimeout(() => {
        mobileMenu.style.transform = "translateX(0)";
      }, 10); // Adding a small delay to allow the display property to take effect before transitioning
    }
    if (!mobileMenuButton.checked) {
      unlockScroll();
      mobileMenu.style.transform = "translateX(100%)";
      setTimeout(() => {
        mobileMenu.style.display = "none";
      }, 300); // Adding a small delay to allow the transform property to take effect before hiding the menu
    }
  };

  mobileServiceMenuButton.onclick = function () {
    console.log("clicked!");
    if (mobileServiceMenuButton.checked) {
      if (mobileMenuButton.checked) {
        mobileMenuButton.checked = false;
        mobileMenu.style.transform = "translateX(100%)";
        setTimeout(() => {
          mobileMenu.style.display = "none";
        }, 300); // Adding a small delay to allow the transform property to take effect before hiding the menu
      }
      serviceMenu.style.display = "block";
      lockScroll();
      setTimeout(() => {
        serviceMenu.style.transform = "translateX(0)";
      }, 10); // Adding a small delay to allow the display property to take effect before transitioning
    }
    if (!mobileServiceMenuButton.checked) {
      serviceMenu.style.transform = "translateX(100%)";
      unlockScroll();
      setTimeout(() => {
        serviceMenu.style.display = "none";
      }, 300); // Adding a small delay to allow the transform property to take effect before hiding the menu
    }
  };
}

function resetMenu() {
  const servicesMenu = document.querySelector("#serviceMenu");
  const serviceMenuButton = document.querySelector("#serviceMenuButton");
  servicesMenu.style.transform = "translateX(100%)";
  unlockScroll();
  setTimeout(() => {
    servicesMenu.style.display = "none";
  }, 300); // Adding a small delay to allow the transform property to take effect before hiding the menu
  serviceMenuButton.checked = false;
}

export async function initSearch() {
  // load the index data into lunr
  const indexData = await requestIndex();
  const idx = lunr.Index.load(indexData.index);

  // search when the user types
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  // searchInput.addEventListener("input", () => {
  //   search(searchInput.value);
  // });
  const urlParams = new URLSearchParams(window.location.search);
  const queryText = urlParams.get("q") || "";
  search(queryText);
  searchInput.value = queryText;
  searchInput.focus();

  function search(query) {
    const results = idx.search(`*${query}*`);
    // clear old results
    searchResults.innerHTML = "";
    const resultList = document.createElement("div");
    results.forEach((result) => {
      const elementID = result.ref;
      const element = indexData.elements[elementID];
      const article = document.createElement("article");
      const title = document.createElement("h2");
      const subtitle = document.createElement("p");
      const link = document.createElement("a");
      title.textContent = element.title;
      subtitle.textContent = element.subtitle;
      link.textContent = "Ver proyecto";
      link.href = element.url;
      article.appendChild(title);
      article.appendChild(subtitle);
      article.appendChild(link);
      resultList.appendChild(article);
    });
    searchResults.appendChild(resultList);
  }

  function requestIndex() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "/js/search_index.json");
      xhr.onload = () => {
        if (xhr.status === 200) {
          const indexData = JSON.parse(xhr.responseText);
          resolve(indexData);
        } else {
          console.error(xhr.statusText);
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => {
        reject(xhr.statusText);
      };
      xhr.send();
    });
  }
}
