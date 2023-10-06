import { getPathName, delay } from "./utils.js";

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

        let serviceMenuButtonChecked = document.querySelector("#serviceMenuButton").checked;
        let mobileMenuButtonChecked = document.querySelector("#mobileMenuButton").checked;
        if (serviceMenuButtonChecked || mobileMenuButtonChecked) {
          await resetServicesMenu();
          await resetMobileMenu();
        }

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
}

export function serviceMenuHandler() {
  const servicesMenu = document.querySelector("#serviceMenu");
  const serviceMenuButton = document.querySelector("#serviceMenuButton");
  // console log to check if serviceMenuButton is checked
  serviceMenuButton.onclick = function () {
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

export const scrollDown = () => {
  // swrink header on scroll down
  onscroll = function () {
    if (document.documentElement.scrollTop > 0) {
      document.querySelector("header").classList.add("is-pinned");
    }
    if (document.documentElement.scrollTop <= 0) {
      document.querySelector("header").classList.remove("is-pinned");
    }
  };
};

const lockScroll = () => {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
};
const unlockScroll = () => {
  document.body.removeAttribute("style");
  document.documentElement.removeAttribute("style");
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
async function resetMobileMenu() {
  const mobileMenu = document.querySelector("#mobileMenu");
  const mobileMenuButton = document.querySelector("#mobileMenuButton");
  mobileMenu.style.transform = "translateX(100%)";
  mobileMenuButton.checked = false;
  unlockScroll();
  await new Promise((resolve) =>
    setTimeout(() => {
      mobileMenu.style.display = "none";
      resolve();
    }, 300)
  );
}
async function resetServicesMenu() {
  const servicesMenu = document.querySelector("#serviceMenu");
  const serviceMenuButton = document.querySelector("#serviceMenuButton");
  const mobileServiceMenuButton = document.querySelector("#mobileServiceMenuButton");
  servicesMenu.style.transform = "translateX(100%)";
  serviceMenuButton.checked = false;
  mobileServiceMenuButton.checked = false;
  unlockScroll();
  await new Promise((resolve) =>
    setTimeout(() => {
      servicesMenu.style.display = "none";
      resolve();
    }, 300)
  );
}

export async function initProjectSearch() {
  // search when the user types
  const searchInput = document.getElementById("text-input");
  searchInput.addEventListener("input", () => {
    // get selected category
    const category = document.querySelector('input[name="category"]:checked').value;
    _projectSearch(searchInput.value, category);
  });
  // search when the user selects a category
  const categoryInputs = document.querySelectorAll('input[name="category"]');
  categoryInputs.forEach((input) => {
    input.addEventListener("change", () => {
      console.log(input.value);
      _projectSearch(searchInput.value, input.value);
    });
  });
  const urlParams = new URLSearchParams(window.location.search);
  // const queryText = urlParams.get("q") || "";
  const category = urlParams.get("category") || "";
  if (category) {
    document.querySelector(`input[name="category"][value="${category}"]`).checked = true;
    await _projectSearch("", category);
  }
}

async function _projectSearch(query, category) {
  // load the index data into lunr
  const indexData = await _requestIndex();
  const idx = lunr.Index.load(indexData.index);

  const textSearchResults = idx.query((q) => {
    lunr.tokenizer(query).forEach((token) => {
      q.term(token.toString(), {
        fields: ["title"],
        boost: 10,
        wildcard:
          lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING | lunr.Query.wildcard.NONE,
      });
      q.term(token.toString(), {
        fields: ["subtitle"],
        boost: 5,
        wildcard:
          lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING | lunr.Query.wildcard.NONE,
      });
      q.term(token.toString(), {
        fields: ["client"],
        boost: 6,
        wildcard:
          lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING | lunr.Query.wildcard.NONE,
      });
      q.term(token.toString(), {
        fields: ["content"],
        boost: 5,
        wildcard:
          lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING | lunr.Query.wildcard.NONE,
      });
    });
  });
  // const results = idx.search(`*${query}*`);
  // clear old results
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML = "";
  const resultList = document.createElement("div");
  resultList.classList.add("results");
  textSearchResults.forEach((result) => {
    const elementID = result.ref;
    const element = indexData.elements[elementID];
    // filter by category
    if (category && category !== "all" && !element.categories.includes(category)) {
      return;
    }
    // project-card
    // Create a new anchor element
    var projectCard = document.createElement("a");
    projectCard.classList.add("project-card");
    projectCard.setAttribute("href", element.url);

    // Create the thumbnail div and its child image element
    var thumbnail = document.createElement("div");
    thumbnail.classList.add("thumbnail");
    var image = document.createElement("img");
    image.setAttribute("src", element.image);
    image.setAttribute("alt", "");

    // Append the image to the thumbnail div
    thumbnail.appendChild(image);

    // Create the content div and its child divs and elements
    var content = document.createElement("div");
    content.classList.add("content");

    var contentDiv1 = document.createElement("div");

    var title = document.createElement("h4");
    title.textContent = element.title;

    var subtitle = document.createElement("h5");
    subtitle.textContent = element.subtitle;

    contentDiv1.appendChild(title);
    contentDiv1.appendChild(subtitle);

    var contentDiv2 = document.createElement("div");
    var clientDiv = document.createElement("div");
    clientDiv.classList.add("client");

    var clientLabel = document.createElement("p");
    clientLabel.classList.add("client-label");
    clientLabel.textContent = "Cliente";

    var clientName = document.createElement("p");
    clientName.classList.add("client-name");
    clientName.textContent = element.client;

    clientDiv.appendChild(clientLabel);
    clientDiv.appendChild(clientName);

    var odsDiv = document.createElement("div");
    odsDiv.classList.add("ods");

    for (let i = 0; i < element.ods.length; i++) {
      console.log(element.ods[i]);
      var odsTag = document.createElement("span");
      var odsImg = document.createElement("img");
      odsImg.setAttribute("src", `/assets/img/ods/${element.ods[i]}.png`);
      odsImg.setAttribute("width", "42");
      odsImg.setAttribute("height", "42");
      odsImg.setAttribute("alt", "");
      odsTag.appendChild(odsImg);
      odsDiv.appendChild(odsTag);
    }
    console.log(odsDiv);

    var categoriesDiv = document.createElement("div");
    categoriesDiv.classList.add("categories");

    var actionDiv = document.createElement("div");
    actionDiv.classList.add("action");

    var actionSpan = document.createElement("span");
    actionSpan.textContent = "Ver projecto";

    var arrowImage = document.createElement("img");
    arrowImage.setAttribute("src", "/assets/img/arrow-right.svg");
    arrowImage.setAttribute("width", "64");
    arrowImage.setAttribute("height", "8");
    arrowImage.setAttribute("alt", "");

    actionDiv.appendChild(actionSpan);
    actionDiv.appendChild(arrowImage);

    contentDiv2.appendChild(clientDiv);
    contentDiv2.appendChild(odsDiv);
    contentDiv2.appendChild(categoriesDiv);
    contentDiv2.appendChild(actionDiv);

    content.appendChild(contentDiv1);
    content.appendChild(contentDiv2);

    // Append the thumbnail and content divs to the projectCard anchor element
    projectCard.appendChild(thumbnail);
    projectCard.appendChild(content);

    resultList.appendChild(projectCard);
  });
  searchResults.appendChild(resultList);
}

function _requestIndex() {
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
