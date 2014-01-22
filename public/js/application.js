if (!!window.EventSource) {
  console.log("before");
  var source = new EventSource('/readings');
  console.log("after");
} else {
  alert('Not supported');
}

source.addEventListener('message', function(e) {
  if (e.origin != 'http://localhost:4567') {
    alert('bad origin');
    return;
  }
  console.log(e.data);
  $('.value').html(e.data);
}, false);

source.addEventListener('open', function(e) {
  // Connection was opened.
}, false);

source.addEventListener('error', function(e) {
  if (e.readyState == EventSource.CLOSED) {
    // Connection was closed.
  }
}, false);
