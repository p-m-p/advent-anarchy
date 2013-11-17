angular.module('AAServices', [])

.factory('GameTiles', function () {
  var TILE_IMAGE_HASHES = [
      'c4ca4238a0b923820dcc509a6f75849b'
    , 'c81e728d9d4c2f636f067f89cc14862c'
    , 'eccbc87e4b5ce2fe28308fd9f2a7baf3'
    , 'a87ff679a2f3e71d9181a67b7542122c'
    , 'e4da3b7fbbce2345d7772b0674a318d5'
    , '1679091c5a880faf6fb5e6087eb1b2dc'
    , '8f14e45fceea167a5a36dedd4bea2543'
    , 'c9f0f895fb98ab9159f51fd0297e236d'
    , '45c48cce2e2d7fbdea1afc51c7c6ad26'
    , 'd3d9446802a44259755d38e6d163e820'
    , '6512bd43d9caa6e02c990b0a82652dca'
    , 'c20ad4d76fe97759aa27a0c99bff6710'
  ];

  function createTiles(count) {
    var index = 0
      , tiles = [];

    do {
      tiles.push({ active: false });
    }
    while ((index += 1) < count)

    return shuffleTiles( pairTiles(tiles) );
  }

  function pairTiles(tiles) {
    var len = tiles.length
      , stopAt = Math.floor( len / 2 )
      , index = 0;

    do {
      // Matching tile ids
      tiles[index].id = tiles[len - 1 - index].id = index;
      // Matching tile image
      tiles[index].img =
      tiles[len - 1 - index].img =
      TILE_IMAGE_HASHES[index] + '.png';
    }
    while ((index += 1) < stopAt)

    return tiles;
  }

  function shuffleTiles(tiles) {
    var counter = tiles.length, temp, index;

    while (counter--) {
      index = Math.floor( Math.random() * counter );

      temp = tiles[counter];
      tiles[counter] = tiles[index];
      tiles[index] = temp;
    }

    return tiles;
  }

  return { create: createTiles };
})

.factory('Score', function () {
  var total = 0;

  return {
    set: function (score) {
      total = score;
      return this.get();
    },

    get: function () {
      return total;
    },

    boost: function (amount, multiplier) {
      total += ( amount * (multiplier || 1) )
      return this.get();
    }
  };
});
