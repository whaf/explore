function prev() {
    navToolbar.zoomToPrevExtent()
}

function next() {
    navToolbar.zoomToNextExtent()
}

function stateExtentBuffer(e) {
    Xmin = -10836207;
    Xmax = -10001180;
    Ymin = 5225642;
    Ymax = 6525931;
    Xbuffer = e * (Xmax - Xmin);
    Ybuffer = e * (Ymax - Ymin);
    stateExtent = new WHAFapp.ExtentCons({
        xmin: Xmin - Xbuffer,
        ymin: Ymin - Ybuffer,
        xmax: Xmax + Xbuffer,
        ymax: Ymax + Ybuffer,
        spatialReference: {
            wkid: 102100
        }
    });
    return stateExtent
}

