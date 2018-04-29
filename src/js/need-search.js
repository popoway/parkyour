const needSearch = (function() {
  PubSub.subscribe([], "init", {callbackFn: init});

  let needSearchSection;

  function init() {
    needSearchSection = document.getElementById("need-search");
    subscribe();
  }

  function subscribe() {
    PubSub.subscribe(["frontPage"], "needBtnClicked", {callbackFn: show.bind(this, needSearchSection)});
    PubSub.subscribe(["navbar"], "navMenuClicked", {callbackFn: switchView} );
    // PubSub.subscribe(["navbar"], "navMenuClicked", { callbackFn: toggle.bind(this, needSearchSection)});
  }

  function switchView(event) {
    if (event.target.innerText == "Need") {
      show(needSearchSection);
    } else if (event.target.innerText == "Provide") {
      hide(needSearchSection);
    }
  }

  function show(element) {
    element.classList.remove("hide");
  }

  function hide(element) {
    element.classList.add("hide");
  }

  function toggle(element) {
    element.classList.toggle("hide");
  }
})();