const CHECK_INTERVAL = 60000; // Check every minute

setInterval(() => {
  postMessage('checkReminders');
}, CHECK_INTERVAL);