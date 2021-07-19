() => {
  const DEBOUNCE_TIME = 500; // ms
  let lastTimeout;
  (fun) => {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(fun, DEBOUNCE_TIME);
  };
};
