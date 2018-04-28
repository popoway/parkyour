const PubSub = (function() {
  const events = {};

  function publish(path, eventName, {callbackFn, context = null}) {
    if (typeof eventName !== "string" || typeof callbackFn !== "function") {
      
    }
    const eventLocation = createEventMap(path);
    addEventToMap(eventLocation, subscription);
  }

  function createEventMap(path) {
    path.reduce((accumulator, currentLocation) => {
      if (events[currentLocation]) {
        
      }
    });
  }

  function subscribe(eventName, callbackFn, ...location) {

  }
  
  function unsubscribe() {

  }

  function handleErrors(callbackFn) {
    return function() {
      try {

      } catch {

      }
    }
  }

  const api = {
    publish: publish,
    subscribe: subscribe,
    unsubscribe: unsubscribe
  }

  return api;
})();