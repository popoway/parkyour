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
    PubSub.subscribe(["frontPage"], "provideBtnClicked", {callbackFn: hide.bind(this, provideBtn, needBtn)});
  }

  function addfrontBtnListener() {
    needBtn.addEventListener("click", PubSub.publish.bind(PubSub, ["frontPage"], "needBtnClicked"));
    provideBtn.addEventListener("click", PubSub.publish.bind(PubSub, ["frontPage"], "provideBtnClicked"));
  }

  function hide(...elements) {
    elements.forEach(element => {
      if (!(element instanceof  Event))
        element.classList.toggle("hide");
    })
  }
})();