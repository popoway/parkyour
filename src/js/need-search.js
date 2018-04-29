const needSearch = (function() {
  PubSub.subscribe([], "init", {callbackFn: init});

  let needSearchSection,
      datePicker,
      datePickerInstance,
      timePicker,
      timePickerInstance;


  function init() {
    needSearchSection = document.getElementById("need-search");
    datePicker = document.querySelector('.datepicker');
    datePickerInstance = M.Datepicker.init(datePicker);
    timePicker = document.querySelector('.timepicker');
    timePickerInstance = M.Timepicker.init(timePicker);
    subscribe();
  }

  function subscribe() {
    PubSub.subscribe(["frontPage"], "needBtnClicked", {callbackFn: show.bind(this, needSearchSection)});
    PubSub.subscribe(["navbar"], "navMenuClicked", {callbackFn: switchView} );
    PubSub.subscribe(["navbar"], "navLogoClicked", {callbackFn: hide.bind(this, needSearchSection)} );
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
