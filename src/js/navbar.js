const Navbar = (function() {
  PubSub.subscribe([], "init", {callbackFn: init});

  let navMenu,
      navLogo;
  
  function init() {
    navMenu = document.getElementById("nav-mobile");
    navLogo = document.querySelector(".brand-logo");
    addNavmenuListener();
    subscribe();
  }

  function subscribe() {
    
  }

  function addNavmenuListener() {
    navMenu.addEventListener("click", PubSub.publish.bind(PubSub, ["navbar"], "navMenuClicked"));
    navLogo.addEventListener("click", PubSub.publish.bind(PubSub, ["navbar"], "navLogoClicked"));
  }

  function hide(element) {
    element.classList.toggle("hide");
  }
})();