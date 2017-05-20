const PlaylistController = function( tribalServer, $location, $scope ) {

  this.removeSong = (uri) => {
    this.playlist.forEach((playlistSong, index) => {
      if (playlistSong.uri === uri) {
        this.playlist.splice(index, 1);
      }
    });

    $scope.$apply();
  };

  this.removeSongButtonHandler = (song) => {
    tribalServer.removeSong(song.uri); 
  };

  this.songAddedHandler = (uri) => {
    this.playlist.push({ uri: uri });
    $scope.$apply();
  }; 
  
  // this.likeButtonHandler = (song) => {
    // if (clicked[song] === undefined)
      // if (!this.clicked) {
      //   song.count.length++;
      //   this.clicked = true;
      // } else {
      //   song.count.length--;
      //   this.clicked = false;
      // };
      // song.count.length++;
    // this.likeButton.push()
    // song.count.length++;

    // var player = JSON.parse( JSON.stringify(this.playlist) );
    // player.count++
    // tribalServer.likeButton(song.count, song._id);
  // };
  
  // tribalServer.registerLikeHandler( );
// };

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

