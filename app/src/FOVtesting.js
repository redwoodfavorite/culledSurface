define(function(require, exports, module) {
    var Engine           = require('famous/core/Engine');
    var Modifier         = require('famous/core/Modifier');
    var Surface          = require('famous/core/Surface');
    var CulledSurface    = require('./CulledSurface');
    var Transform        = require('famous/core/Transform');
    var Easing           = require('famous/transitions/Easing');
    var Transitionable   = require('famous/transitions/Transitionable');

    var context = Engine.createContext();
    context.setPerspective(1000);

    document.body.style.backgroundColor = 'black';

    // This number represents the number of pixels that are added to
    // the side of the culled viewport.  It is negative in this case
    // to illustrate the culling effect.

    var cullingPadding = -150;

    /////////////////////////////////////////////////////
    // INITIALIZE MOVING SURFACES
    /////////////////////////////////////////////////////

    for (var i = 0; i < 50; i++) {
        var surf = new CulledSurface({
            size: [75, 75],
            cullingPadding: cullingPadding,
            properties: {
                backgroundColor: 'lightgreen'
            }
        });
        var mod = new Modifier({
            size: [75, 75],
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
            transform: Transform.translate(0, 0, -500)
        });

        moveRandom(mod, i);

        context.add(mod).add(surf)
    };

    /////////////////////////////////////////////////////
    // FUNCTION FOR CONTINUOS RANDOM MOVEMENT
    /////////////////////////////////////////////////////

    function moveRandom(mod, ind) {
        var randomZ = -Math.random() * 4000;
        var randomX = (Math.random() * 5000) - 2500;
        var randomY = (Math.random() * 5000) - 2500;

        mod.setTransform(Transform.translate(
            randomX, randomY, randomZ),
                {
                    duration: Math.random() * 2000 + 3000
                },
                moveRandom.bind(null, mod, ind)
            );
    }

    /////////////////////////////////////////////////////
    // INITIALIZE RENDER BOX
    /////////////////////////////////////////////////////

    var renderBox = new Surface({
        size: [window.innerWidth + (cullingPadding * 2),
         window.innerHeight + (cullingPadding * 2)],
        properties: {
            color: 'white',
            border: '2px dotted white'
        }
    });
    var renderBoxMod = new Modifier({
        origin: [0.5, 0.5]
    });

    context.add(renderBoxMod).add(renderBox);
});