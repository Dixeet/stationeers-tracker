(function (window, $) {

    /*
        Script Variable
    */

    var tileSizeMeter = 2;
    var tileSizePx = 20;
    var WantedMapSideSizeMeter = 500;
    var tileSideCount,
        centerOfGridPx,
        centerOfGridMeter,
        mapSideSizeMeter;
    var $map;
    var baseTileEl = '<div class="tile"></div>';
    var colors = {
        origin: '#FF6900',
        beacon: '#FF9830',
        coal: '#5A5A5A',
        copper: '#71FF8B',
        gold: '#FFF300',
        oxite: '#5ebdff',
        volatiles: '#FF5C80',
        water: '#afffec',
        iron: '#8A4200',
        lead: '#1F1F1F',
        nickel: '#be0032',
        silicon: '#FFFFFF',
        silver: '#B9B9B9',
        uranium: '#3DFF11'
    };

    /*
        OnReady
    */

    $(init);

    function init() {
        calculateDimension();
        constructMap();
        setHome();
        // var coordinates = findCoordinatesMeter(4, 4.472135955, 6);
        // insertTileRelativeToCenterMeter(coordinates.x, coordinates.y);
    }

    /*
        Steps
    */

    function calculateDimension() {
        tileSideCount = Math.round(WantedMapSideSizeMeter / tileSizeMeter) % 2 === 0 ?
            Math.round(WantedMapSideSizeMeter / tileSizeMeter) + 1 : Math.round(WantedMapSideSizeMeter / tileSizeMeter);
        centerOfGridPx = tileSideCount * tileSizePx / 2;
        centerOfGridMeter = pxToM(centerOfGridPx);
        mapSideSizeMeter = tileSideCount * tileSizeMeter;
    }

    function constructMap() {
        $map = $('#map');
        $map.width(tileSideCount * tileSizePx);
        $map.height(tileSideCount * tileSizePx);
    }

    function setHome() {
        insertTileRelativeToCenterMeter(0, 0, [colors.origin]);
        insertTileRelativeToCenterMeter(2, 0, [colors.beacon]);
        insertTileRelativeToCenterMeter(0, 2, [colors.beacon]);
        insertTileRelativeToCenterMeter(-4, 2, [colors.water, colors.silver]);
        var i = 0;
        Object.keys(colors).forEach(function (color) {
            if (color != 'origin' && color != 'beacon'){
                insertTileRelativeToCenterMeter(i*2, 6, [colors[color]]);
                i++
            }
        });
        moveCenterToRelativeCenterMeter(0, 0);
    }


    /*
        Functions Interact
    */

    function addOresToPx(x, y, ores) {
        // var X =
    }

    function insertTileToPx(x, y, colors, tileEl) {
        var X = typeof x === 'undefined' ? 0 : Math.floor(x / tileSizePx) * tileSizePx;
        var Y = typeof y === 'undefined' ? 0 : Math.floor(y / tileSizePx) * tileSizePx;
        tileEl = !!tileEl ? tileEl : baseTileEl;
        colors = !!colors ? colors : ['grey'];
        var $home = $(tileEl);
        $home.css('left', X);
        $home.css('top', Y);
        if (colors.length > 0) {
            $home.css('background', repeatingLinearGradientString(colors));
        }
        $map.append($home);
    }

    function insertTileRelativeToCenterMeter(xMC, yMC, cssClass, tileEl){
        var x = mToPx(relativeToMapMeter(xMC));
        var y = mToPx(relativeToMapMeter(-yMC));
        insertTileToPx(x, y, cssClass, tileEl);
    }


    /*
        Functions Moves
    */

    function moveCenterToPx(x, y) {
        var X = x - $(window).width() / 2;
        var Y = y - $(window).height() / 2;
        window.scrollTo(X, Y);
    }

    function moveCenterToRelativeCenterMeter(x , y) {
        moveCenterToPx(mToPx(relativeToMapMeter(x)), mToPx(relativeToMapMeter(y)));
    }

    /*
        Functions Calculs
    */

    function relativeToMapMeter(x) {
        return x + centerOfGridMeter;
    }

    function relativeToCenterMeter(x) {
        return x - centerOfGridMeter;
    }

    function mToPx(meters) {
        return meters * tileSizePx / tileSizeMeter;
    }

    function pxToM(pixels) {
        return pixels * tileSizeMeter / tileSizePx;
    }

    function repeatingLinearGradientString(colors) {
        var str = 'repeating-linear-gradient(45deg';
        var stripeWidth = 5;
        colors.forEach(function (color, index) {
            str += ', ' + color + ' ' + index * stripeWidth + 'px, ' + color  + ' ' + (index + 1) * stripeWidth + 'px';
        });
        str += ')';
        return str;
    }

    function findCoordinatesMeter(originBeacon, northBeacon, eastBeacon) {
        return {
            x: (originBeacon * originBeacon - eastBeacon * eastBeacon + 4) / 4,
            y: (originBeacon * originBeacon - northBeacon * northBeacon + 4) / 4
        }
    }

})(window, window.jQuery);