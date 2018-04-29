const RequestList = (function() {
  PubSub.subscribe([], "init", {callbackFn: init});

  let requestList,
      ulList;
  function init() {
    requestList = document.getElementById("request-list");
    ulList = document.getElementById("request-list-items");
    subscribe();
    createItems();
  }

  function subscribe() {
    PubSub.subscribe(["frontPage"], "provideBtnClicked", {callbackFn: show.bind(this, requestList)} );
    PubSub.subscribe(["navbar"], "navMenuClicked", {callbackFn: switchView} );
    PubSub.subscribe(["navbar"], "navLogoClicked", {callbackFn: hide.bind(this, requestList)} );
  }

  function switchView(event) {
    if (event.target.innerText == "Need") {
      hide(requestList);
    } else if (event.target.innerText == "Provide") {
      show(requestList);
    }
  }

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