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
        console.log(newContent);

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
  console.log(path);
  const menuItems = document.querySelectorAll(".navlink");
  menuItems.forEach((item) => {
    if (item.getAttribute("href") === path) {
      console.log('item.getAttribute("href")');
      console.log(item.getAttribute("href"));
      item.setAttribute("aria-current", "page");
    }
    if (item.getAttribute("href") !== path) {
      item.removeAttribute("aria-current");
    }
  });
}

export function serviceMenuHandler() {
  const servicesMenu = document.querySelector("#serviceMenu");
  const servicesButton = document.querySelector("#serviceMenuButton");
  // console log to check if servicesButton is checked
  servicesButton.addEventListener("click", () => {
    console.log(servicesButton.checked);
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
  });
}
