const PubSub = (function() {
  let events = {};

  function publish({ path: path = [] } = {}, eventName, ...data) {
    if (typeof eventName !== "string") {
      return;
    }
    const eventLocation = createEventMap(path);
    if (!Array.isArray(eventLocation[eventName])) {
      eventLocation[eventName] = [];
    }
    eventLocation[eventName].forEach(subscription => {
      subscription.callbackFn.apply(subscription.context, data);
    });
  }

  function createEventMap(path) {
    let previousLocation = events;
    for (let i = 0; i < path.length; i++) {
      let nextLocationName = path[i];
      if (previousLocation[nextLocationName]) {
        previousLocation = previousLocation[nextLocationName];
      } else {
        previousLocation[nextLocationName] = {};
        previousLocation = previousLocation[nextLocationName];
      }
    }
    let finalLocation = previousLocation;
    return finalLocation;
  }

  function subscribe(path = [], eventName, {callbackFn: callbackFn, context: context = null} = {}) {
    if (typeof eventName !== "string" || typeof callbackFn !== "function") {
      return;
    }
    const eventLocation = createEventMap(path);
    if (!Array.isArray(eventLocation[eventName])) {
      eventLocation[eventName] = [];
    }
    const subscription = { callbackFn: callbackFn, context: context };
    eventLocation[eventName].push(subscription);
  }
  
  function unsubscribe(path = [], eventName, callbackFn) {
    if (typeof eventName !== "string" || typeof callbackFn !== "function") {
      return;
    }
    const eventLocation = createEventMap(path);
    if (!Array.isArray(eventLocation[eventName])) {
      return;
    }
    let eventCallbacks = eventLocation[eventName];
    eventLocation[eventName] = removeCallback(eventCallbacks, callbackFn);

    if (eventLocation[eventName].length === 0) {
      delete eventLocation[eventName];
    } 
  }

  function removeCallback(callbacksArray, callbackFn) {
    let callbackFnIndex = callbacksArray.findIndex(hasCallbackFn);
    if (callbackFnIndex === -1) {
      return;
    }
    return callbacksArray.slice(callbackFnIndex, 1);
  }

  function hasCallbackFn(subscription) {
    return subscription.callbackFn === callbackFn;
  }

  const api = {
    publish: publish,
    subscribe: subscribe,
    unsubscribe: unsubscribe
  }
  
  return api;
})();