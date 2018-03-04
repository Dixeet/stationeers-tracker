(function (window, $) {
    var gridSizeMeter = 2;
    var gridSizePx = 20;
    var WantedMapSideSizeMeter = 500;
    var gridSideCount,
        centerOfGridPx,
        centerOfGridMeter,
        mapSideSizeMeter;
    var $map;
    var baseGridEl = '<div class="grid"></div>';

    $(init);

    function init() {
        calculateDimension();
        constructMap();
        setHome();
        // var coordinates = findCoordinatesMeter(4, 4.472135955, 6);
        // console.log(coordinates);
        // insertGridRelativeToCenterMeter(coordinates.x, coordinates.y, ['red']);
    }

    function calculateDimension() {
        gridSideCount = Math.round(WantedMapSideSizeMeter / gridSizeMeter) % 2 === 0 ?
            Math.round(WantedMapSideSizeMeter / gridSizeMeter) + 1 : Math.round(WantedMapSideSizeMeter / gridSizeMeter);
        centerOfGridPx = gridSideCount * gridSizePx / 2;
        centerOfGridMeter = pxToM(centerOfGridPx);
        mapSideSizeMeter = gridSideCount * gridSizeMeter;
    }

    function relativeToMapMeter(x) {
        return x + centerOfGridMeter;
    }

    function findCoordinatesMeter(originBeacon, northBeacon, eastBeacon) {
        return {
            x: (originBeacon * originBeacon - eastBeacon * eastBeacon + 4) / 4,
            y: (originBeacon * originBeacon - northBeacon * northBeacon + 4) / 4
        }
    }

    function moveCenterTo(x, y) {
        var X = x - $(window).width() / 2;
        var Y = y - $(window).height() / 2;
        window.scrollTo(X, Y);
    }

    function moveCenterToMeter(x , y) {
        moveCenterTo(mToPx(x), mToPx(y));
    }

    function mToPx(meters) {
        return meters * gridSizePx / gridSizeMeter;
    }

    function pxToM(pixels) {
        return pixels * gridSizeMeter / gridSizePx;
    }

    function constructMap() {
        $map = $('#map');
        $map.width(gridSideCount * gridSizePx);
        $map.height(gridSideCount * gridSizePx);
        console.log("Total grids : " + gridSideCount * gridSideCount);
    }

    function setHome() {
        insertGridToPx(centerOfGridPx, centerOfGridPx, ['home']);
        insertGridToPx(centerOfGridPx + gridSizePx, centerOfGridPx, ['beacon']);
        // insertGridToPx(centerOfGridPx, centerOfGridPx - gridSizePx, ['beacon']);
        insertGridRelativeToCenterMeter(0, 2, ['beacon']);
        moveCenterTo(centerOfGridPx, centerOfGridPx);
    }

    function insertGridRelativeToCenterMeter(xMC, yMC, cssClass, gridEl){
        var x = mToPx(relativeToMapMeter(xMC));
        var y = mToPx(relativeToMapMeter(-yMC));
        insertGridToPx(x, y, cssClass, gridEl);
    }

    function insertGridToPx(x, y, cssClass, gridEl) {
        var X = typeof x === 'undefined' ? 0 : Math.floor(x / gridSizePx) * gridSizePx;
        var Y = typeof y === 'undefined' ? 0 : Math.floor(y / gridSizePx) * gridSizePx;
        gridEl = !!gridEl ? gridEl : baseGridEl;
        cssClass = !!cssClass ? cssClass : [];
        $home = $(gridEl);
        $home.css('left', X);
        $home.css('top', Y);
        cssClass.forEach(function(css){
            $home.addClass(css);
        });
        $map.append($home);
    }
})(window, window.jQuery);