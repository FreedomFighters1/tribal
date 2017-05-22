angular.module('tribal')
.controller('SearchController', function(tribalServer, $window) {
  this.searchButtonHandler = (query) => {
    tribalServer.spotifySearch( query )
      .then( (results) => {
        this.searchResultsHandler( results );
      });
  };
  this.voiceSearch = function() {
    console.log(" voice button clicked")
    if ($window.hasOwnProperty('webkitSpeechRecognition')) {
      var recognition = new webkitSpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = function(e) {
        document.getElementById('songSearch').value = e.results[0][0].transcript;
        recognition.stop();
      };
      recognition.onerror = function(e) {
        recognition.stop();
      }
    }
  }
})
.directive('search', function() {
  return {
    scope: {
      searchResultsHandler: '<',
    },
    restrict: 'E',
    controller: 'SearchController',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/templates/search.html'
  };
});

