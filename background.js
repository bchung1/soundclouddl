var CLIENT_ID = ""
chrome.contextMenus.create({
  "id": "soundclouddl",
  "title": "Download SoundCloud Song",
  "contexts": ["link"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  getStreamUrl(info.linkUrl)
});

function getStreamUrl(url){
  request = "http://api.soundcloud.com/resolve.json?url=" + url + "&client_id=" + CLIENT_ID
  $.ajax({
    url: request,
    success: function(data){
      console.log(data)
      downloadSong(data.stream_url)
    }, error: function() {
      alertDownloadError()
    }
  })
}

function downloadSong(stream_url){
  var request = "null"

  if(stream_url.indexOf('?') === -1) {
    request = stream_url + "?client_id=" + CLIENT_ID;
  } else {
    request = stream_url + "&client_id=" + CLIENT_ID;
  }

  chrome.downloads.download({
    url: request,
    saveAs: true
  })
}

function alertDownloadError(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "alert failure"});
});
}
