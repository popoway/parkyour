const RequestList = (function() {
  PubSub.subscribe([], "init", {callbackFn: init});

  let requestList;
  function init() {
    requestList = document.getElementById("request-list");
    subscribe();
  }

  function subscribe() {
    PubSub.subscribe(["frontPage"], "provideBtnClicked", {callbackFn: show.bind(this, requestList)} );
    // PubSub.subscribe(["navbar"], "navMenuClicked", { callbackFn: swi.bind(this, requestList)});
    PubSub.subscribe(["navbar"], "navMenuClicked", {callbackFn: switchView} );
  }

  function switchView(event) {
    if (event.target.innerText == "Need") {
      hide(requestList);
    } else if (event.target.innerText == "Provide") {
      show(requestList);
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