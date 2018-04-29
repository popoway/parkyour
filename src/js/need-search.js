const needSearch = (function() {
  PubSub.subscribe([], "init", {callbackFn: init});

  let needSearchSection,
      datePicker,
      datePickerInstance,
      timePicker,
      timePickerInstance,
      requestForm;

  function init() {
    requestForm = document.getElementById("request-form");
    addRequestFormListener();
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
  }

  function switchView(event) {
    if (event.target.innerText == "Need") {
      show(needSearchSection);
    } else if (event.target.innerText == "Provide") {
      hide(needSearchSection);
    }
  }

  function addRequestFormListener() {
    requestForm.addEventListener("submit", event => {
     const formData = getFormData(event);
     submitFormData(formData);
    });
  }

  function getFormData(event) {
    const formData = {};
    const elements = requestForm.elements;

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].tagName == "INPUT") {
        formData[elements[i].name] = elements[i].value;
      }
    }
    
    return formData;
  }

//   function submitFormData(formData) {
//     let postData = {
//       method: "POST",
//       headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//       },
//       body: formData
//     };
//     fetch('https://parkyour.herokuapp.com/request', postData)
//     .then(function() {
//       console.log("sucessssss")
//     })
//     .catch(error => {
//       console.log("failllll");
//       });
//   }

  function submitFormData(formData) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "https://parkyour.herokuapp.com/request");
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(xhr.response);
      };
      xhr.send(JSON.stringify(formData)); 
    });
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
