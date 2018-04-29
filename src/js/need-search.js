const needSearch = (function() {
  PubSub.subscribe([], "init", {callbackFn: init});

  let needSearchSection,
      datePicker,
      datePickerInstance,
      timePicker,
      timePickerInstance,
      requestForm,
      ulList;

  function init() {
    requestForm = document.getElementById("request-form");
    addRequestFormListener();
    needSearchSection = document.getElementById("need-search");
    datePicker = document.querySelector('.datepicker');
    datePickerInstance = M.Datepicker.init(datePicker);
    timePicker = document.querySelector('.timepicker');
    timePickerInstance = M.Timepicker.init(timePicker);
    ulList = document.getElementById("request-list-items");
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

  function submitFormData(formData) {
    let postData = {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };
    fetch('https://parkyour.herokuapp.com/request', postData)
    .then(data => {
      console.log("sucessssss")
      ulList.innerHtml = "";
      getData();      
    })
    .catch(error => {
      console.log("failllll");
      });
  }

  // function submitFormData(formData) {
  //   return new Promise(function(resolve, reject) {
  //     let xhr = new XMLHttpRequest();
  //     xhr.open("POST", "https://parkyour.herokuapp.com/request");
  //     xhr.onload = function () {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function () {
  //       reject(xhr.response);
  //     };
  //     xhr.send(JSON.stringify(formData)); 
  //   });
  //}

  function getData() {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "https://parkyour.herokuapp.com/request");
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(xhr.response);
      };
      xhr.send(); 
    });
  }

  function createItems() {
    let dataPromise = getData();
    dataPromise.then(function(listData) {
      listData = JSON.parse(listData);
      listData.map(function(item) {
        let list = document.createElement("li");
        list.classList.add("collection-item", "avatar");
        let iElement = document.createElement("i");
        iElement.classList.add("material-icons", "circle");
        let spandElement = document.createElement("span");
        spandElement.classList.add("title");
        let pElement = document.createElement("p");
        let aElement = document.createElement("a");
        aElement.classList.add("secondary-content");
        let i2Element = document.createElement("i");
        i2Element.classList.add("material-icons");
        let p2 = document.createElement("p");
        list.appendChild(iElement);
        list.appendChild(spandElement);
        list.appendChild(pElement);
        list.appendChild(p2);
        list.appendChild(aElement);
        aElement.appendChild(i2Element);
        spandElement.innerText = item.parkName;
        pElement.innerText = item.email + " Number of people: " + item.numberOfPeople;
        p2.innerText = item.type;
        ulList.appendChild(list);
      })
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
