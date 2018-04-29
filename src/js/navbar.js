const Navbar = (function() {
  PubSub.subscribe([], "init", {callbackFn: init});

  let navMenu;
  function init() {
    navMenu = document.getElementById("nav-mobile");
    addNavmenuListener();
    subscribe();
  }

  function subscribe() {
    PubSub.subscribe(["frontPage"], "provideBtnClicked", {callbackFn: hide.bind(this, navMenu)} );
  }

  function addNavmenuListener() {
    navMenu.addEventListener("click", PubSub.publish.bind(PubSub, ["navbar"], "navMenuClicked"));
  }

  function hide(element) {
    element.classList.toggle("hide");
  }
})();