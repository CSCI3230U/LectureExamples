$.support.cors = true;

$(document).ready(function() {
   // Get a google api key here:  https://console.cloud.google.com/apis/dashboard
   key = 'PUT YOUR API KEY HERE';

   $('#searchButton').click(function() {  
      query = $('#query').val();
      url = `https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&q=${query}&key=${key}`;
      maxVideos = 5;

      // clear any previous results
      $('#results ol').html('');
      $('#videos').html('');

      // perform a fresh query
      $.getJSON(url, function(data) {
         $.each(data.items, function(index, item) {

            $('#results ol').append(renderResult(item));
            $('#videos').append(renderVideo(item));
         });
      });
   });
});

function renderResult(item) {
   if (item.id.kind === 'youtube#video') {
      let li = $('<li />');
      let a = $('<a />');
      a.attr('href', 'https://www.youtube.com/watch?v=' + item.id.videoId);
      a.text(item.snippet.title);
      li.append(a);
      return li;
   } else {
      // likely a channel, ignore
      return '';
   }
}

function renderVideo(item) {
   if (item.id.kind === 'youtube#video') {
      return '<div>' +
             ' <embed width="420"' +
             '        height="345"' +
             '        src="https://www.youtube.com/v/' + item.id.videoId + '"' +
             '        type="application/x-shockwave-flash">' +
             ' </embed>' +
             '</div>';
   } else {
      // likely a channel, ignore
      return '';
   }
}
