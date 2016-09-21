function populatePlaylistDrop(){
	var select = document.getElementById("playlistselect")
	select.innerHTML = "";
	getListOfPlaylists(function(labels){
		if (labels) {
			for (x in labels){
				var opt = document.createElement("option")
				opt.text = labels[x]
				select.add(opt)
			}
		}
	});
}

function loadPlaylist(){
	var playlistLabel = document.getElementById("playlistselect").value;
	var playlist = document.getElementById("playlist");
	//console.log(playlistLabel)
	$.post("/load-playlist", {label: playlistLabel}, function(response) {
		console.log(response);
		playlist.innerHTML = response;
		populatePlaylistDrop();
	});
}

function getListOfPlaylists(callback){
	$.get("/labels", function (items) {
	  callback(items);
  });
}

function createPlaylist(){
	var label = document.getElementById("playlistlabel").value;
	var playlist = document.getElementById("playlist").innerHTML;
	$.post("/save-playlist", {label: label, playlist: playlist}, function(response) {
		document.getElementById("playlistsaved").innerHTML = "Playlist Saved";
		populatePlaylistDrop();
	});
}


$(document).ready(function() {
  populatePlaylistDrop();
});