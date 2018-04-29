const frontPage = (function() {
  PubSub.subscribe([], "init", {callbackFn: init});

  let needBtn,
      provideBtn;
        
  function init() {
    needBtn = document.getElementById("need-btn");
    provideBtn = document.getElementById("provide-btn");
    addfrontBtnListener();
    subscribe();
  }

  function subscribe() {
    PubSub.subscribe(["frontPage"], "needBtnClicked", {callbackFn: hide.bind(this, needBtn, provideBtn)});
    PubSub.subscribe(["frontPage"], "provideBtnClicked", {callbackFn: hide.bind(this, needBtn, provideBtn)});
    PubSub.subscribe(["navbar"], "navMenuClicked", {callbackFn: hide.bind(this, needBtn, provideBtn)} );
    PubSub.subscribe(["navbar"], "navLogoClicked", {callbackFn: show.bind(this, needBtn, provideBtn)} );
  }

  function addfrontBtnListener() {
    needBtn.addEventListener("click", PubSub.publish.bind(PubSub, ["frontPage"], "needBtnClicked"));
    provideBtn.addEventListener("click", PubSub.publish.bind(PubSub, ["frontPage"], "provideBtnClicked"));
    
  }

  function hide(...elements) {
    elements.forEach(element => {
      if (!(element instanceof  Event))
        element.classList.add("hide");
    })
  }

  function show(...elements) {
    elements.forEach(element => {
      if (!(element instanceof  Event))
        element.classList.remove("hide");
    })
  }
})();