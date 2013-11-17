var AAControllers = angular.module('AAControllers', [])

.controller('GameCtrl', [
    '$scope'
  , '$timeout'
  , 'GameTiles'
  , 'Score'
  , 'GameSounds'
  , function ($scope, $timeout, GameTiles, Score, GameSounds) {
    var gameTiles = GameTiles.create(24)
      , suspended = false
      , totalTries = 0
      , triesBeforeMatch = 0
      , turn = []
      , startTime;

    function setScore() {
      $scope.score = Score.get();
    }

    // Mark matched tiles as done
    function match() {
      angular.forEach(turn, function (tile) {
        tile.done = true;
      });

      triesBeforeMatch = 0;
      Score.boost(10, Math.floor(1000 / totalTries));
      GameSounds.tileMatch();
    }

    function hasWon() {
      var counter = gameTiles.length
        , won = true;

      while (counter--) {
        if (!gameTiles[counter].done) {
          won = false;
          break;
        }
      }

      return won;
    }

    // Mark active tiles inactive and reset turn
    function resetTurn() {
      angular.forEach(turn, function (t) {
        t.active = false;
      });

      // Reset the turn
      turn.length = 0;
      suspended = false;
    }

    // Opens a tile during a turn and checks for a match on second tile
    $scope.open = function (tile) {
      if (suspended || tile.active || tile.done) {
        return;
      }

      if (totalTries === 0) {
        startTime = +new Date;
      }

      turn.push(tile);
      tile.active = true;
      GameSounds.tileSelect();

      // Second tile being opened
      if (turn.length === 2) {
        suspended = true;
        totalTries += 1;
        triesBeforeMatch += 1;

        // Let user see their choice before resetting or matching
        $timeout(function () {
          if (turn[0].id === turn[1].id) {
            match();

            if (hasWon()) {
              // TODO boost score based on time and show finish screen
            }
          }

          setScore();
          resetTurn();
        }, 600);
      }
    }

    $scope.tiles = gameTiles;
    $scope.score = Score.get();
    GameSounds
      .loadMedia()
      .then(function () {
        GameSounds.background();
        $scope.assetsLoaded = true;
      });
  }]);
