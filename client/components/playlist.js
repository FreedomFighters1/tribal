const PlaylistController = function( tribalServer, $location, $scope ) {

  this.songAddedHandler = (uri) => {
    this.playlist.push({ uri: uri });
    $scope.$apply();
  }; 

  //################### remove button ###############
  this.removeSong = (uri) => {
    var found = false;
    this.playlist.forEach((playlistSong, index) => {
      if (playlistSong.uri === uri && !found) {
        this.playlist.splice(index, 1);
        found = true;
      }
    });
    $scope.$apply();
  };

  this.removeSongButtonHandler = (song) => {
    tribalServer.removeSong(song.uri); 
  };
  //#############################################

  //################### like button ###############
  this.likeSong = (uri, userAgent) => {
    var found = false;
    this.playlist.forEach((playlistSong, index) => {
      if (playlistSong.uri === uri && !found) {
        if ( playlistSong.count.indexOf(userAgent) === -1 ) {
          playlistSong.count.push(userAgent);
        } else {
          playlistSong.count.splice(playlistSong.count.indexOf(userAgent),1);
        }
        found = true;
      }
    });
    $scope.$apply();
  }

  this.likeButtonHandler = (song) => {
 
    console.log('song that was clicked:', this.playlist)
    tribalServer.likeSong(song.uri);
  };

  //#############################################

  
  tribalServer.registerLikeHandler( this.likeSong );
  tribalServer.registerSongRemovedHandler( this.removeSong );
  tribalServer.registerSongAddedHandler( this.songAddedHandler );
  tribalServer.getPlaylist( $location.search().playlist, (res) => {
    $location.search( 'playlist', res._id );
    this.playlist = res.songs;
    $scope.$apply();
  });
};

const Playlist = function() {
  return {
    require: '',
    scope: {
      playlist: '<',
      count: '=',
      song: '<'
    },
    restrict: 'E',
    controller: [ 'tribalServer', '$location', '$scope', PlaylistController ],
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/templates/playlist.html'
  };
};

angular.module('tribal').directive('playlist', Playlist);






