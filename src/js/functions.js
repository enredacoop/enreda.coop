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
        });
        console.log("Navigated to " + toUrl.pathname);
        document.dispatchEvent(new Event("changed-view"));
        return true;
      },
    });
  });
}

export function navlinkIndicators() {
  // get url path and add aria-current to the corresponding menu item
  const path = window.location.pathname.replace(/\/$/, "");
  const menuItems = document.querySelectorAll(".navlink");
  menuItems.forEach((item) => {
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
  const servicesButton = document.querySelector("#serviceMenuButton");
  // console log to check if servicesButton is checked
  servicesButton.onclick = function () {
    console.log("checked", servicesButton.checked);
    if (servicesButton.checked) {
      servicesMenu.style.display = "block";
      setTimeout(() => {
        servicesMenu.style.transform = "translateX(0)";
      }, 10); // Adding a small delay to allow the display property to take effect before transitioning
    }
    if (!servicesButton.checked) {
      servicesMenu.style.transform = "translateX(100%)";
      setTimeout(() => {
        servicesMenu.style.display = "none";
      }, 300); // Adding a small delay to allow the transform property to take effect before hiding the menu
    }
  };
}

function resetMenu() {
  const servicesMenu = document.querySelector("#serviceMenu");
  const servicesButton = document.querySelector("#serviceMenuButton");
  servicesMenu.style.transform = "translateX(100%)";
  setTimeout(() => {
    servicesMenu.style.display = "none";
  }, 300); // Adding a small delay to allow the transform property to take effect before hiding the menu
  servicesButton.checked = false;
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
    searchResults.innerHTML = "";
    results.forEach((result) => {
      const elementID = result.ref;
      const element = indexData.elements[elementID];
      const resultItem = document.createElement("div");
      resultItem.innerHTML = `
        <article>
          <h2>${element.title}</h2>
          <p>${element.subtitle}</p>
          <a href="${element.url}">Ver proyecto</a>
        </article>
      `;
      searchResults.appendChild(resultItem);
    });
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
