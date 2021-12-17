(function() {
  'use strict';

  window.CellsPolymer.start({
    routes: {
      'feed': '/',
      'post': '/post',
      'movement-detail': '/movement/:id/:label',
      'help': '/help'
    }
  });
}());
