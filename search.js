// After the API loads, call a function to enable the search box.
var items;

function initSearch() {
  gapi.client.setApiKey("AIzaSyCIzQh1mOHtINTtwcDWPQmmQubIs0Fuklo")
  gapi.client.load('youtube', 'v3', function() {
    handleAPILoaded();
  });
}

function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

function addToPlaylist(item){
  var playlist = document.getElementById("playlist")
  var playlistItem = document.createElement('div');
  playlistItem.id = items[item].id.videoId.toString();
  playlistItem.innerHTML = items[item].snippet.title;
  var button = document.createElement("button");
  button.innerHTML="Remove";
  button.onclick = new Function('removeFromPlay(\''+items[item].id.videoId.toString()+'\');');
  var playbutton = document.createElement("button");
  playbutton.innerHTML="Play";
  playbutton.onclick = new Function('playVideo(\''+items[item].id.videoId.toString()+'\');');
  playlistItem.appendChild(playbutton);
  playlistItem.appendChild(button);
  if (playlist.hasChildNodes() == false){
    playbutton.click()
  }
  playlist.appendChild(playlistItem);
}

function removeFromPlay(id){
  var playlist = document.getElementById("playlist").removeChild(document.getElementById(id));
}


// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults : 20
  });
  request.execute(function(response) {
    items = response.result.items;//[0].id.videoId;
    var str = JSON.stringify(items);
    $('#jsondebug').html('<pre>' + str + '</pre>');
    searchContainer = document.getElementById("search-container");
    searchContainer.innerHTML = "";
    var videoList = document.createElement('div');
    for( var i = 0; i < 20; i++){
      var videoItem = document.createElement('div');
      videoItem.innerHTML = items[i].snippet.title;
      var image = document.createElement("img");
      var button = document.createElement("button");
      button.innerHTML="Add to Playlist";
      button.onclick = new Function('addToPlaylist(\''+i.valueOf()+'\');');
      image.src =  items[i].snippet.thumbnails.medium.url
      videoItem.appendChild(image);
      videoItem.appendChild(button);
      videoList.appendChild(videoItem);
    }
    searchContainer.appendChild(videoList);
  });
}

function playNext(){
    var playlist = document.getElementById("playlist");
    if(playlist.hasChildNodes() == true){
      playlist.removeChild(playlist.childNodes[0])
    }
    if(playlist.hasChildNodes() == true){
      console.log(playlist.childNodes[0].childNodes[1].click());
    }
}