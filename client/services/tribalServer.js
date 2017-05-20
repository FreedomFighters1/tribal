const tribalServer = function( $http ) {

  let socket = io();

  this.test = function() {
    return $http.get( '/test' );
  };

  // get (new or existing) playlist from server
  this.getPlaylist = function( playlistId, callback ) {
    socket.emit( 'playlist', playlistId, callback );
  };

  this.removeSong = function(uri) {
    socket.emit( 'remove song', uri );
  };

  this.registerSongRemovedHandler = (callback) => {
    socket.on('song removed', (uri) => callback(uri)); 
  };

  // request that the server add a song to the playlist
  this.addSong = function( uri ) {
    socket.emit( 'add song', uri );
  };

  this.registerSongAddedHandler = function( callback ) {
    socket.on( 'song added', callback );
  };

  this.likeButton = function(count, song) {
    socket.emit( 'like', count, song );
  };

  this.registerLikeHandler = function ( callback ) {
    socket.on ('like clicked', callback);
  };
  
  this.spotifySearch = function(trackName) {
    return $http.get( '/tracks', {
      params: {
        trackName: trackName,
      }
    });
  };

  this.facebookAuth = function () {
    return $http.get( '/auth/facebook' );
  };
};

angular.module('tribal').service('tribalServer', ['$http', tribalServer]);
