function printMap() {
//    gp = new esri.tasks.Geoprocessor("http://arcgis.dnr.state.mn.us/arcgis/rest/services/LiDARViewer/ExportWebMap/GPServer/Export Web Map");
    var extent = map.extent;
    var spatRef = map.spatialReference.wkid;
    var printLayers = [];
    var visLayers = map.layerIds;
    var waj = {
        "mapOptions": {
            "extent": {
                "xmin": extent.xmin,
                "ymin": extent.ymin,
                "xmax": extent.xmax,
                "ymax": extent.ymax,
                "spatialReference": {
                    "wkid": 102100
                }
            },
            "spatialReference": {
                "wkid": 102100
            }
        },
        "baseMap": {
            "title": "Base Maps",
            "baseMapLayers": []
        },
        "operationalLayers": [],
        "exportOptions": {
            "dpi": 300
        },
        "layoutOptions": {
            "titleText": $("#mapTitle").val()
        }
    };
    for (i = 0; i < visLayers.length; i++)
        if (map.getLayer(visLayers[i]).visible) printLayers.push(visLayers[i]);
    if ($.inArray("BaseMap", printLayers) > -1) waj.baseMap.baseMapLayers.push({
        "id": "BingMap",
        "visibility": true,
        "type": "BingMapsRoad",
        "culture": "en-us",
        "Key": "Amk1WYDKY5Xs8SZQmvouwFi2mFxmhO6ajgipol1Ni7oeTiJJI0inMbsiBuHyy1Nl"
    });
    if ($.inArray("Aerials", printLayers) > -1) waj.baseMap.baseMapLayers.push({
        "id": "BingMapAerial",
        "visibility": true,
        "type": "BingMapsHybrid",
        "culture": "en-us",
        "Key": "Amk1WYDKY5Xs8SZQmvouwFi2mFxmhO6ajgipol1Ni7oeTiJJI0inMbsiBuHyy1Nl"
    });
    if ($.inArray("Terrain", printLayers) > -1) waj.baseMap.baseMapLayers.push({
        "id": "HS",
        "opacity": 1,
        "url": "http://arcgis.dnr.state.mn.us/arcgis/rest/services/elevation/mn_hillshade_web_mercator/MapServer"
    });
    if ($.inArray("HS", printLayers) > -1) waj.baseMap.baseMapLayers.push({
        "id": "HS",
        "opacity": 1,
        "url": "http://arcgis.dnr.state.mn.us/arcgis/rest/services/elevation/mn_hillshade_web_mercator/MapServer"
    });
    if ($.inArray("flood", printLayers) > -1) waj.operationalLayers.push({
        "id": "fema",
        "title": "fema",
        "opacity": map.getLayer("flood").opacity,
        "minScale": 144447.638572,
        "maxScale": 2256.994353,
        "url": "http://arcgis.dnr.state.mn.us/arcgis/rest/services/LiDARViewer/FEMAData/MapServer/",
        "visibleLayers": null,
        "layers": []
    });
    if ($.inArray("Terrain", printLayers) > -1) waj.operationalLayers.push({
        "id": "Terrain",
        "opacity": map.getLayer("Terrain").opacity,
        "url": "http://arcgis.dnr.state.mn.us/arcgis/rest/services/elevation/elevation_mn_1mDEM_cache/MapServer",
        "visibleLayers": null,
        "layers": []
    });
    if ($.inArray("Cont2ft", printLayers) > -1) waj.operationalLayers.push({
        "id": "Cont_2_ft",
        "title": "Cont_2_ft",
        "opacity": 1,
        "minScale": 9027.977411,
        "maxScale": null,
        "url": "http://arcgis.dnr.state.mn.us/arcgis/rest/services/elevation/mndnr_lidarcontours_2ft/MapServer",
        "visibleLayers": null,
        "layers": []
    });
    if ($.inArray("Cont10ft", printLayers) > -1) waj.operationalLayers.push({
        "id": "Cont_10_ft",
        "title": "Cont_10_ft",
        "opacity": 1,
        "minScale": 19E3,
        "maxScale": 4513.988705,
        "url": "http://arcgis.dnr.state.mn.us/arcgis/rest/services/elevation/elevation_mndnr_lidarcontours_10ft/MapServer",
        "visibleLayers": null,
        "layers": []
    });
    if ($.inArray("Cont50ft", printLayers) > -1) waj.operationalLayers.push({
        "id": "Cont_50_ft",
        "title": "Cont_50_ft",
        "opacity": 1,
        "minScale": 72225,
        "maxScale": 9027.977411,
        "url": "http://arcgis.dnr.state.mn.us/arcgis/rest/services/elevation/mndnr_lidarcontours_50ft/MapServer",
        "visibleLayers": null,
        "layers": []
    });
    var params = {
        "Web_Map_as_JSON": JSON.stringify(waj),
        "Format": $("#formatLayout").val(),
        "Layout_Template": $("#printLayout").val(),
        "f": "json"
    };
    gp.submitJob(params, statusComplete,
        statusCallback);
    $("#gpMessage").html("Creating your map..");
    $("#gpMessageDiv").fadeIn();
    $("#gpLoad").fadeIn();

    function statusCallback(jobInfo) {
        var status = jobInfo.jobStatus;
        if (status === "esriJobExecuting");
        else if (status === "esriJobSucceeded") console.log("done")
    }

    function statusComplete(jobInfo) {
        if (jobInfo.jobStatus === "esriJobSucceeded") {
            gp.getResultData(jobInfo.jobId, "Output_File", downloadFile);
            $("#gpLoad").fadeOut()
        }
    }
}

function downloadFile(outputFile) {
    $("#gpMessage").html("Download your map " + "<a onclick='gpClose()' href='" + outputFile.value.url + "' target='_blank'>Here</a>")
}

function gpClose() {
    $("#gpMessageDiv").fadeOut()
};