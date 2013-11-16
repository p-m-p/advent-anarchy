var AAControllers = angular.module('AAControllers', [])

.controller('GameBoardCtrl', ['$scope', '$timeout', 'GameTiles',
  function ($scope, $timeout, GameTiles) {
    var gameTiles = GameTiles.create(24)
      , suspended = false
      , turn = [];

    $scope.tiles = gameTiles;

    // Mark matched tiles as done
    function match() {
      angular.forEach(turn, function (tile) {
        tile.done = true;
      });
    }

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
      if (suspended) {
        return;
      }

      turn.push(tile);
      tile.active = true;

      // Second tile being opened
      if (turn.length === 2) {
        suspended = true;

        $timeout(function () {
          if (turn[0].id === turn[1].id) {
            match();
          }

          resetTurn();
        }, 1000);
      }
    }
  }]);
