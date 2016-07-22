function changeWS_Outline(e) {//changes outline color of watershed boundaries according to basemap
    var mwsSymbol;
    if(WHAFapp.currentMapParams.maskLayer!=2){
        if (e==="gray"||e==="natGeo"){
            mwsSymbol=mwsSymbol_nonSat
        } else{
            mwsSymbol=mwsSymbol_sat
        }
        try{
            DSS_objectives.MajorMaskFL.hide();
            DSS_objectives.MajorMaskFL.setRenderer(new  WHAFapp.SimpleRendererCons(mwsSymbol));
            DSS_objectives.MajorMaskFL.show();
        }catch(err){}
    }
}

function closeDialog() {//closes watershed highlight (on hover)
    try {
        for (var e = 0; e < graphicWSRecord.length; e++) {
            var d=graphicWSRecord[e];
            map.graphics.remove(d);
        }
        graphicWSRecord=[]
    } catch (t) {}
}

function showMe(e) {//follows execution of upstream layer; includes upstream summaries
    WHAFapp.currentMapParams.Upstrm = e.features[0].attributes.CATCH_ID;
    getCatchment();
    UpAU = e.features[0].attributes.Upstr_AU;
    catch_UpAU = addCommas(UpAU);
    catch_type = e.features[0].attributes.CatchTyp;
    catchmentName = e.features[0].attributes.HU_10_NAME;
    CatchTyp = e.features[0].attributes.CatchTyp;
    CatchmentID = e.features[0].attributes.CATCH_ID;
    UpstreamPlaces = e.features[0].attributes.UpstCities;
    if (UpstreamPlaces.length == 0) {
        UpstreamComm = "None"
    } else {
        UpstreamComm = UpstreamPlaces
    }
    UpstAU = e.features[0].attributes.Upstr_AU;
    UpstAreaAcres = e.features[0].attributes.TOT_SHED_A;
    UpAcres = addCommas(UpstAreaAcres);
    UpAgs = e.features[0].attributes.UpsCultiPct;
    UpWater = e.features[0].attributes.UpsOpWatPct;
    UpPerenn = e.features[0].attributes.UpsPerennPct;
    UpOther = e.features[0].attributes.PctOther;
    WHAFapp.currentMapParams.wwScore = e.features[0].attributes.S_Hww;
    content1 = "<strong><br>" + catchmentName + "</strong> (ID: " + CatchmentID + ")";
    content2 = "<br> <br> Upstream Area: " + UpAcres + " Acres" + "<br> <br>" + catch_type + "<br> <br> Animal Units in upstream feedlots: " + catch_UpAU + ".";
    content3 = "Upstream area of DNR catchment: <strong><br>" + catchmentName + "</strong> (ID: " + CatchmentID + ")<br>";
    $("#upStrWW").show();
    try{getWBcharts()}catch(e){};
}

function CtmentZoom() {

    Xmax = DSS_objectives.ctmntFL.graphics[0]._extent.xmax;
    Xmin = DSS_objectives.ctmntFL.graphics[0]._extent.xmin;
    Ymax = DSS_objectives.ctmntFL.graphics[0]._extent.ymax;
    Ymin = DSS_objectives.ctmntFL.graphics[0]._extent.ymin;
    Xbuffer = .3 * (Xmax - Xmin);
    Ybuffer = .2 * (Ymax - Ymin);
    ctmntExtent = new WHAFapp.ExtentCons({
        xmin: Xmin - Xbuffer,
        ymin: Ymin - Ybuffer,
        xmax: Xmax + Xbuffer,
        ymax: Ymax + Ybuffer,
        spatialReference: {
            wkid: 102100
        }
    });
    map.setExtent(ctmntExtent);
}

// function removeWsGraphics(){
//     for (var t = 0; t < graphicHiLiteWSRecord.length; t++) {
//         map.graphics.remove(graphicHiLiteWSRecord[t]);
//         selectedWatershed={};
//     }
//     graphicHiLiteWSRecord=[];
//     $('#selectButTop').text('Major Watershed')

// }

function MajorWatershedSelector(e, noZoom) {
    require(["esri/tasks/query","esri/tasks/QueryTask"],function(Query,QueryTask){

        try{unMaskAll(); console.log("majorselector");}catch(err){};

        try{resetMajorFL()}catch(err){}
        // removeWsGraphics();
        if (noZoom){
            scaleSymbology('major','outline')
        } else{
            zoomToSelectedMajor(e)
            scaleSymbology('major','outline')
        }
        try{DSS_objectives.majorsFL.disableMouseEvents();closeDialog()} catch(err){};
    });
}

// function executeWSqueryNoZoomNoHlight(e) {
//     WS_Selection = e.features[0];
//     var t = WS_Selection.attributes.major_name;
//     var n = WS_Selection.attributes.major;
//     var r = WS_Selection.attributes.HUC_8;
    
//     try{document.getElementById("selectButTop").innerHTML = "Major Watershed: " + t}catch(err){} 
//     document.getElementById("piePlaceTitle").innerHTML = "<h3><strong>" + t + "</strong> (" + n + ")</h3>";

//     var Huc_4 = r.slice(0,4);
//     var i = HUC_4s[Huc_4]
//     try{document.getElementById("basinButtonTop").innerHTML = "Basin: " + i}catch(err){};

//     DSS_objectives.Huc4 = Huc_4;
//     DSS_objectives.major = n;
//     // var i = getHUC4(r);
//     var s = t;
//     var o = WS_Selection.attributes.sq_miles;
//     var l = WS_Selection.attributes.A_I_MEAN;
//     var c = WS_Selection.attributes.A_MIN_IDX;
//     var h = WS_Selection.attributes.H_I_MEAN;
//     var p = WS_Selection.attributes.H_MIN_SCR;
//     var d = WS_Selection.attributes.H_I_PC;
//     var v = WS_Selection.attributes.H_I_IC;
//     var m = WS_Selection.attributes.H_I_WW;
//     var y = WS_Selection.attributes.H_I_LHS;
//     var b = WS_Selection.attributes.H_I_FV;
//     var w = WS_Selection.attributes.G_I_MEAN;
//     var E = WS_Selection.attributes.G_MIN_SCR;
//     var S = WS_Selection.attributes.G_I_SEP;
//     var x = WS_Selection.attributes.G_I_GWCS;
//     var T = WS_Selection.attributes.G_I_CV;
//     var N = WS_Selection.attributes.B_I_MEAN;
//     var C = WS_Selection.attributes.B_MIN_SCR;
//     var k = WS_Selection.attributes.B_I_TH;
//     var L = WS_Selection.attributes.B_I_SSQ;
//     var A = WS_Selection.attributes.B_I_SR;
//     var O = WS_Selection.attributes.B_I_ARSR;
//     var M = WS_Selection.attributes.C_I_MEAN;
//     var _ = WS_Selection.attributes.C_MIN_SCR;
//     var D = WS_Selection.attributes.C_I_TC;
//     var P = WS_Selection.attributes.C_I_AC;
//     var H = WS_Selection.attributes.C_I_RC;
//     var B = WS_Selection.attributes.W_I_MEAN;
//     var j = WS_Selection.attributes.W_MIN_SCR;
//     var F = WS_Selection.attributes.W_I_NPS;
//     var I = WS_Selection.attributes.W_I_PS;
//     var q = WS_Selection.attributes.W_I_WQA;

//     var R = "Basin: " + i + "<br> HUC 8: " + r + "<br> Major Number: " + n + "<br> Total Area: " + addCommas(o);

//     var U = [d, v, m, y, b, S, x, T, k, L, A, O, D, P, H, F, I, q];
//     roseCharter("piePlace", U);
//     Xmax = WS_Selection.geometry.getExtent().xmax;
//     Xmin = WS_Selection.geometry.getExtent().xmin;
//     Ymax = WS_Selection.geometry.getExtent().ymax;
//     Ymin = WS_Selection.geometry.getExtent().ymin;
//     Xbuffer = .3 * (Xmax - Xmin);
//     Ybuffer = .2 * (Ymax - Ymin);
//     newExtent = new  WHAFapp.ExtentCons({
//         xmin: Xmin - Xbuffer,
//         ymin: Ymin - Ybuffer,
//         xmax: Xmax + Xbuffer,
//         ymax: Ymax + Ybuffer,
//         spatialReference: {
//             wkid: 102100
//         }
//     });

//     selectedWatershed = {
//         number: n,
//         name: t,
//         HUC8: r,
//         extent:newExtent
//     };
// }

function getBasinExtent(Huc_4){
    var fromB = Huc_4+'_Xtnt'
    var l=basinWxtentOb[fromB]
    Xbuffer = .1 * (l.XMax - l.XMin);
    Ybuffer = .2 * (l.YMax - l.YMin);

    downExttie = new  WHAFapp.ExtentCons({
        xmin: l.XMin - Xbuffer,
        ymin: l.YMin - Ybuffer,
        xmax: l.XMax + Xbuffer,
        ymax: l.YMax + Ybuffer,
        spatialReference: {
            wkid: 102100
        }
    });
    return downExttie;
}

function zoomDown(){
    if (DSS_objectives.dnPolyFL && DSS_objectives.dnPolyFL!= undefined) {
        r=DSS_objectives.dnPolyFL.graphics[0].geometry.getExtent()
        map.setExtent(r, true);
    } else {
        alert("Please select a location")
    }
}

function zoomUp(){    
    if (DSS_objectives.upPolyFL && DSS_objectives.upPolyFL!= undefined) {
        r=DSS_objectives.upPolyFL.graphics[0].geometry.getExtent()
        map.setExtent(r, true);
    } else {
        alert("Please select a location")
    }
}

function resetMajorFL() {
    try {
        removeAnalyzeCtmnts()
    } catch (e) {}
    if (analyzer) {
        var t = (new Date).getTime();
        var n = t + "=" + t;
        var r = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([100, 100, 100, 1]), .5), new dojo.Color([125, 125, 125, 0]));
        // allMajorsLayer = map.getLayer("allMajorsGraphics");
        DSS_objectives.majorsFL.setDefinitionExpression(n);
        DSS_objectives.majorsFL.setRenderer(new  WHAFapp.SimpleRendererCons(r));
        analyzer = false
    } else {}
}

function subsequentMaskScale(){
    k= WHAFapp.currentMapParams.newMaskLayer;
    shower(k)
    console.log('k is ',k);
    WHAFapp.currentMapParams.maskLayer=k;
    console.log("check that applicable scale still in subsequent function: ", k)
}

function deleteScaleslayers(){
    WHAFapp.currentMapParams.Catchment='';
    WHAFapp.currentMapParams.CatchmentName='';
    WHAFapp.currentMapParams.Dnstrm='';
    WHAFapp.currentMapParams.Upstrm='';
    WHAFapp.currentMapParams.crossHuc4='';
    WHAFapp.currentMapParams.crossmajor='';
    WHAFapp.currentMapParams.wwScore='';

    changeAllScales()

    $('.starrButton').addClass('disabled');
    $('.locationDependent').hide();
    $('.info6Image').removeClass('scaleSho');
}



function scaleRenderer(){
    var scales = ['togglerU','togglerD','togglerMj','togglerBsn']
    var scalenames = ['upstream','downstream','major','basin']
    for (var i=0; i< scales.length; i++){
        var type = WHAFapp.currentMapParams[scales[i]];
        var scale = scalenames[i];
        scaleSymbology(scale, type)
    }
}

function changeAllScales(){}

function scaleReset(){
 
  catShower(1);
  scaleSymbology('upstream', 'none');
  scaleSymbology('downstream', 'none');
  scaleSymbology('major', 'none');
  scaleSymbology('basin', 'none');
  
  WHAFapp.currentMapParams.togglerU = 'none';
  WHAFapp.currentMapParams.togglerD = 'none';
  WHAFapp.currentMapParams.togglerBsn = 'none';
  WHAFapp.currentMapParams.togglerMj = 'none';  
}

function scaleQuer(qWhere){

    var quer = new WHAFapp.QueryCons();
    quer.where=qWhere;
    return quer;
}



function masksLoader(){//loads mask layers for different scales
    console.log("MasksLoader on")
    var i, I, f, m, b, k = WHAFapp.currentMapParams,lYrs=map.getLayersVisibleAtScale(map.getScale()),upMaskLayers=[],dnMaskLayers=[], majMaskLayers=[], bsnMaskLayers=[], t = (new Date).getTime();
    var m=k.Catchment, n=k.crossmajor,o=k.crossHuc4, catSymb, majSymb, BsnSymb, upSymb, upMaskSymb, downSymb, downMaskSymb, sSL=0, aOffset=0;
    //set basin symbology
    if (k.togglerBsn === 'none' || k.togglerBsn === undefined){BsnSymb=noSymb}
    else if (k.togglerBsn === 'outline'){BsnSymb=bsnOutlineSymbol}
    else if (k.togglerBsn === 'mask'){BsnSymb=maskSymbol};

    //set major WS symbology
    if (k.togglerMj === 'none' || k.togglerMj === undefined){majSymb=noSymb}
    else if (k.togglerMj === 'outline'){
        if (map.getBasemap()==="national-geographic" || map.getBasemap()==="gray"){
            majSymb=mwsSymbol_nonSat
        } else{
            majSymb = mwsSymbol_sat
        }
    }
    else if (k.togglerMj === 'mask'){majSymb=maskSymbol};

    //set catchment symbology
    if (k.togglerC === 'none' || k.togglerC === undefined){catSymb=noSymb}
    else if (k.togglerC === 'outline'){catSymb=catOutline}
    else if (k.togglerC === 'fill'){catSymb=blueFill};

    //set upstream symbology
    if(k.togglerU === 'none' || k.togglerU === undefined){upSymb=noSymb; upMaskSymb=noSymb}
    else if (k.togglerU === 'mask'){upSymb=noSymb; upMaskSymb=maskSymbol}
    else if (k.togglerU === 'fill'){upSymb=upFill; upMaskSymb=noSymb}
    else if (k.togglerU === 'outline'){upSymb=upstrOutlineSymbol; upMaskSymb=noSymb};

    //set downstream symbology
    if(k.togglerD === 'none' || k.togglerD === undefined){downSymb=noSymb; downMaskSymb=noSymb}
    else if (k.togglerD === 'mask'){downSymb=noSymb; downMaskSymb=maskSymbol}
    else if (k.togglerD === 'fill'){downSymb=downFill; downMaskSymb=noSymb}
    else if (k.togglerD === 'outline'){downSymb=dnstrOutlineSymbol; downMaskSymb=noSymb};


    console.log("Catchment is: ", m);

    if (k.Catchment && k.Catchment !== undefined){
        // load scale mask and fill features
        loadBsnMask();
        loadWsMask();
        loadDownPoly();     
        loadDnMask();
        loadUpPoly();
        loadUpMask();
        loadCtmentScale();   

    }

    function serialScalesLoader(){

    console.log("Layers of scales loading", sSL);
    var maskLayerList = ['ctmntFL','upMaskFL','dnMaskFL','MajorMaskFL','BsnMaskFL', 'upPolyFL', 'dnPolyFL'];
    
    for (var sSL2=0; sSL2 < maskLayerList.length; sSL2++){
        var h = maskLayerList[sSL2];
        var H = DSS_objectives[h].showing;
    }
    if(sSL===6){
        try{scaleAttrFromUrl()}catch(r){};
    }

    sSL++

    }

    function loadCtmentScale() {
        var e="catch_id='"+m+"'AND " + t + "=" + t, ctmntUrl = assessmentURL + "/70";
        console.log(e)
        var query = scaleQuer(e);
        if(DSS_objectives.ctmntFL === undefined || DSS_objectives.ctmntFL.loaded===false){
            DSS_objectives.ctmntFL = new WHAFapp.FeatureLayerCons(ctmntUrl, {
                maxAllowableOffset: 0,
                mode: WHAFapp.FeatureLayerCons.MODE_SELECTION
                // outFields: ["*"]
            });
            DSS_objectives.ctmntFL.showing=false;
            DSS_objectives.ctmntFL.on('selection-complete',function(){
                DSS_objectives.ctmntFL.showing=true;
            })
            DSS_objectives.ctmntFL.on('load', function(){
                serialScalesLoader();
                addCtment();
            })
            map.addLayer(DSS_objectives.ctmntFL);                    
        }else{
            addCtment()
        }
        function addCtment(){
            DSS_objectives.ctmntFL.setRenderer(new  WHAFapp.SimpleRendererCons(catSymb));
            DSS_objectives.ctmntFL.id = "ctmntGraphic";
            DSS_objectives.ctmntFL.identifier = "ctmntLine";
            try {
                DSS_objectives.ctmntFL.selectFeatures(query,WHAFapp.FeatureLayerCons.SELECTION_NEW);
                DSS_objectives.ctmntFL.currentQuery=query;
            } catch (s) {console.log(("failed to load a scale layer"))}
        };

        if($('#myModal').css('display')!=='none'){try{getWBcharts()}catch(err){}}
    }

    function loadUpMask(){//load upstream mask layer 
        var b="upstmaskof = '" + m + "' AND " + t + "=" + t, upMaskFeature=masksURL+'13';
        var query = scaleQuer(b);
        if(DSS_objectives.upMaskFL === undefined || DSS_objectives.upMaskFL.loaded===false){
            DSS_objectives.upMaskFL = new WHAFapp.FeatureLayerCons(upMaskFeature, {
                maxAllowableOffset: aOffset,
                mode: WHAFapp.FeatureLayerCons.MODE_SELECTION
                // outFields: ["*"]
            });
            DSS_objectives.upMaskFL.showing=false;
            DSS_objectives.upMaskFL.on('selection-complete',function(){
                DSS_objectives.upMaskFL.showing=true;
            })

            DSS_objectives.upMaskFL.on('load', function(){
                serialScalesLoader();
                addUpMask();
            })
            map.addLayer(DSS_objectives.upMaskFL);                    
        }else{
            addUpMask();
        }
        function addUpMask(){
            DSS_objectives.upMaskFL.setRenderer(new  WHAFapp.SimpleRendererCons(upMaskSymb));
            DSS_objectives.upMaskFL.id = "maskUpGraphic";
            DSS_objectives.upMaskFL.identifier = "upMasker";
            try {
                DSS_objectives.upMaskFL.selectFeatures(query,WHAFapp.FeatureLayerCons.SELECTION_NEW);
                DSS_objectives.upMaskFL.currentQuery=query;
            } catch (s) {console.log(("failed to load a scale layer"))}
        };
    } 

    function loadDnMask(){//load downstream mask layer 
        var d="dnmaskof = '" + m + "' AND " + t + "=" + t, downMaskFeature=masksURL+'14';

        var query = scaleQuer(d);
        if(DSS_objectives.dnMaskFL === undefined || DSS_objectives.dnMaskFL.loaded===false){
            console.log("Dn Mask not defined")
            DSS_objectives.dnMaskFL = new WHAFapp.FeatureLayerCons(downMaskFeature, {
                maxAllowableOffset: aOffset,
                mode: WHAFapp.FeatureLayerCons.MODE_SELECTION
                // outFields: ["*"]
            });
            DSS_objectives.dnMaskFL.showing=false;
            DSS_objectives.dnMaskFL.on('selection-complete',function(){
                DSS_objectives.dnMaskFL.showing=true;
            })
            DSS_objectives.dnMaskFL.on('load', function(){
                serialScalesLoader();
                addDnMask();
            })

            map.addLayer(DSS_objectives.dnMaskFL);                    
        }else{
            addDnMask();
        }
        function addDnMask(){
            console.log("Dn Mask IS defined")
            DSS_objectives.dnMaskFL.setRenderer(new  WHAFapp.SimpleRendererCons(downMaskSymb));
            DSS_objectives.dnMaskFL.id = "maskDnGraphic";
            DSS_objectives.dnMaskFL.identifier = "dnMasker";
            try {
                DSS_objectives.dnMaskFL.selectFeatures(query,WHAFapp.FeatureLayerCons.SELECTION_NEW);
                DSS_objectives.dnMaskFL.currentQuery=query;
            } catch (s) {console.log(("failed to load a scale layer"))}
        };
    } 

    function loadWsMask(){
        f="major ="+n+" AND " + t + "=" + t, wsMaskUrl = masksURL+'16';    
        console.log(f)
        var query = scaleQuer(f);
        if(DSS_objectives.MajorMaskFL === undefined || DSS_objectives.MajorMaskFL.loaded===false){
            console.log("starting up WS load")
            DSS_objectives.MajorMaskFL = new WHAFapp.FeatureLayerCons(wsMaskUrl, {
                maxAllowableOffset: aOffset,
                mode: WHAFapp.FeatureLayerCons.MODE_SELECTION
                // outFields: ["*"]
            });
            DSS_objectives.MajorMaskFL.showing=false;
            DSS_objectives.MajorMaskFL.on('selection-complete',function(){
                DSS_objectives.MajorMaskFL.showing=true;
            })
            DSS_objectives.MajorMaskFL.on('load', function(){
                serialScalesLoader();
                addMjMask();
            })

            map.addLayer(DSS_objectives.MajorMaskFL);                    
        }
        else{addMjMask()}
        function addMjMask(){
            console.log("Moving on WS load")
            DSS_objectives.MajorMaskFL.setRenderer(new  WHAFapp.SimpleRendererCons(majSymb));
            DSS_objectives.MajorMaskFL.id = "majorMaskGraphics";
            DSS_objectives.MajorMaskFL.identifier = "majorsGraphics";
            try {
                DSS_objectives.MajorMaskFL.selectFeatures(query,WHAFapp.FeatureLayerCons.SELECTION_NEW);
                DSS_objectives.MajorMaskFL.currentQuery=query;
            } catch (s) {console.log(("failed to load a scale layer"))}
        };
    }

    function loadBsnMask(){
        g="huc4 = '"+o+"' AND " + t + "=" + t, basinMaskFeature=masksURL+'15';    
        var query = scaleQuer(g);
        if(DSS_objectives.BsnMaskFL === undefined || DSS_objectives.BsnMaskFL.loaded===false){
            DSS_objectives.BsnMaskFL = new WHAFapp.FeatureLayerCons(basinMaskFeature, {
                maxAllowableOffset: aOffset,
                mode: WHAFapp.FeatureLayerCons.MODE_SELECTION
                // outFields: ["*"]
            });
            DSS_objectives.BsnMaskFL.showing=false;
            DSS_objectives.BsnMaskFL.on('selection-complete',function(){
                DSS_objectives.BsnMaskFL.showing=true;
            })
            DSS_objectives.BsnMaskFL.on('load', function(){
                serialScalesLoader();
                addBsnMask();
            })
            map.addLayer(DSS_objectives.BsnMaskFL);                    
        }
        else{addBsnMask();}
        function addBsnMask(){
            DSS_objectives.BsnMaskFL.setRenderer(new  WHAFapp.SimpleRendererCons(BsnSymb));
            DSS_objectives.BsnMaskFL.id = "maskBsnGraphic";
            DSS_objectives.BsnMaskFL.identifier = "bsnMasker";
            try {
                DSS_objectives.BsnMaskFL.selectFeatures(query,WHAFapp.FeatureLayerCons.SELECTION_NEW);
                DSS_objectives.BsnMaskFL.currentQuery=query;
            } catch (s) {console.log(("failed to load a scale layer"))}
        };
    }

    function loadUpPoly(){//load upstream polygon layer    
        a="upstof = '" + m + "' AND " + t + "=" + t, upPolyFeature = masksURL+'12';    
        var query = scaleQuer(a);
        if(DSS_objectives.upPolyFL === undefined || DSS_objectives.upPolyFL.loaded===false){
            DSS_objectives.upPolyFL = new WHAFapp.FeatureLayerCons(upPolyFeature, {
                maxAllowableOffset: aOffset,
                mode: WHAFapp.FeatureLayerCons.MODE_SELECTION
                // outFields: ["*"]
            });
            DSS_objectives.upPolyFL.showing=false;
            DSS_objectives.upPolyFL.on('selection-complete',function(){
                DSS_objectives.upPolyFL.showing=true;
            });
            DSS_objectives.upPolyFL.on('load', function(){
                serialScalesLoader();
                addUpFill();
            })

            map.addLayer(DSS_objectives.upPolyFL);                    
        }else{
            addUpFill()            
        }
        function addUpFill(){
            DSS_objectives.upPolyFL.setRenderer(new  WHAFapp.SimpleRendererCons(upSymb));
            DSS_objectives.upPolyFL.id = "polyUpGraphic";
            DSS_objectives.upPolyFL.identifier = "upPoly";
            try {
                DSS_objectives.upPolyFL.selectFeatures(query,WHAFapp.FeatureLayerCons.SELECTION_NEW);
                DSS_objectives.upPolyFL.currentQuery=query;
            } catch (s) {console.log(("failed to load a scale layer"))}
        };
    }

    function loadDownPoly(){//load downstream polygon layer
        c="downstof = '" + m + "' AND " + t + "=" + t, dnPolyFeature = masksURL+'11';   
        var query = scaleQuer(c);
        if(DSS_objectives.dnPolyFL === undefined || DSS_objectives.dnPolyFL.loaded===false){
            DSS_objectives.dnPolyFL = new WHAFapp.FeatureLayerCons(dnPolyFeature, {
                maxAllowableOffset: aOffset,
                mode: WHAFapp.FeatureLayerCons.MODE_SELECTION
                // outFields: ["*"]
            });
            DSS_objectives.dnPolyFL.showing=false;
            DSS_objectives.dnPolyFL.on('selection-complete',function(){
                DSS_objectives.dnPolyFL.showing=true;
            })
            DSS_objectives.dnPolyFL.on('load', function(){
                serialScalesLoader();
                addDnFill();
            })

            map.addLayer(DSS_objectives.dnPolyFL);                    
        }
        else{addDnFill();}
        function addDnFill(){
            DSS_objectives.dnPolyFL.setRenderer(new  WHAFapp.SimpleRendererCons(downSymb));
            DSS_objectives.dnPolyFL.id = "polyDnGraphic";
            DSS_objectives.dnPolyFL.identifier = "dnPoly";
            try {
                DSS_objectives.dnPolyFL.selectFeatures(query,WHAFapp.FeatureLayerCons.SELECTION_NEW);
                DSS_objectives.dnPolyFL.currentQuery=query;
            } catch (s) {console.log(("failed to load a scale layer"))}
        };
    }

    WHAFapp.suspender = false;
    try{starLocation.mainMap.getDojoShape().moveToFront()}catch(e){};
    autoLoaderForScales();

}

function clearScales(){  

  var r=['ctmntFL','upMaskFL','dnMaskFL','MajorMaskFL','BsnMaskFL','upPolyFL','dnPolyFL'];
  for (var i in r){
    if (DSS_objectives[r[i]] && DSS_objectives[r[i]] !== undefined){
        DSS_objectives[r[i]].clear();
        DSS_objectives[r[i]].showing=false;
    }
  }  
}

function offsetCheck(){
    var scale = map.getScale(),y = map.getLayersVisibleAtScale()
    var n = scale/4500, m, oldOffset = WHAFapp.currentMapParams.allowedOffset;
    m = Number(n.toFixed(0));
    WHAFapp.currentMapParams.allowedOffset = 0;  
    if(m<oldOffset){
      console.log("Old offset: ", oldOffset, "; New Offset: ",m)
        for (e in y){
            if(y[e].declaredClass==="esri.layers.FeatureLayer"){
                offsetSetter(y[e])
            }
        } 
    }
    function offsetSetter(layer){
        var query = layer.currentQuery;       
        layer.setMaxAllowableOffset(0)//WHAFapp.currentMapParams.allowedOffset);
            try{layer.selectFeatures(query,WHAFapp.FeatureLayerCons.SELECTION_NEW)}catch(h){};
            try{layer.refresh()}catch(h){}
    }
}

function autoLoaderForScales(){//controls loader symbol after changing map location 
    var ctr=0, r=['ctmntFL','upMaskFL','dnMaskFL','MajorMaskFL','BsnMaskFL','upPolyFL','dnPolyFL'];
    $("#loader").show();
    loadTester();
    function loadTester(){
        ctr++
        var loadedList=[];
        for (var i in r){
            if(DSS_objectives[r[i]].showing===false){
               loadedList.push('Not loaded: ',DSS_objectives[r[i]])
            }
        }        
        if(loadedList.length==0){
            $("#loader").hide();
            if(WHAFapp.mapLoading===0){
                // try{serialSnapper()}catch(r){console.log("Tried updating")}//for serlai snapshot taking                
            } 

        } else {
            if (ctr<10){
                setTimeout(function (){
                    if(ctr===9){
                        console.log("Here is a stubborn layer",loadedList)
                    }
                    loadTester();
                },500)
            } else {masksLoader()}
        }
    }
}


function unMaskAll(){
    var scales=['upMaskFL','dnMaskFL','MajorMaskFL','BsnMaskFL'],
    togglers = ['togglerU','togglerD','togglerMj','togglerBsn'];
    for (scle in scales){
        try{
            var k=DSS_objectives[scales[scle]];
            if (k.scaleSymbol=='mask'){
                k.hide();
                k.setRenderer(new  WHAFapp.SimpleRendererCons(noSymb));
                k.scaleSymbol='none';
                k.show();
            }
        }catch(err){console.log(scales[scle]," is not defined. Fix it.")}
    }
    for (m in togglers){
        if(WHAFapp.currentMapParams[togglers[m]]=='mask'){
            WHAFapp.currentMapParams[togglers[m]]='none';
        }
    }
}

function scaleSymbology(scale, type){
    var noSymbol=noSymb;
    if (type=="mask"){//remove existing mask layer symbology
        unMaskAll()
    }
    $('#maskRemove').fadeIn();
    switch (scale){        
        case 'basin':
            lyr=DSS_objectives.BsnMaskFL, n=3;
            if (type=='mask'){
                lyr.hide()
                lyr.setRenderer(new  WHAFapp.SimpleRendererCons(maskSymbol));
                lyr.scaleSymbol='mask';
                lyr.show();
                $('#maskRemove').fadeIn();
                WHAFapp.currentMapParams.maskLayer=n;
            } else if (type=='outline'){
                lyr.hide()
                lyr.setRenderer(new  WHAFapp.SimpleRendererCons(bsnOutlineSymbol));
                lyr.scaleSymbol='outline';
                lyr.show()
            } else if (type=='none'){
                lyr.hide()
                lyr.setRenderer(new  WHAFapp.SimpleRendererCons(noSymbol));
                lyr.scaleSymbol='none';
                lyr.show()
            }

            break;

        case 'major':
            lyr=DSS_objectives.MajorMaskFL,n=2;
            if (type=='mask'){
                lyr.hide();
                lyr.setRenderer(new  WHAFapp.SimpleRendererCons(maskSymbol));
                lyr.scaleSymbol='mask';
                lyr.show();
                WHAFapp.currentMapParams.maskLayer=n;
                $('#maskRemove').fadeIn();
            } else if (type=='outline'){
                if (map.getBasemap()==="national-geographic" || map.getBasemap()==="gray"){
                    mwsSymbol=mwsSymbol_nonSat
                } else{
                    mwsSymbol = mwsSymbol_sat
                }
                lyr.hide()
                lyr.setRenderer(new  WHAFapp.SimpleRendererCons(mwsSymbol));
                lyr.scaleSymbol='outline';
                lyr.show()
            } else if (type=='none'){
                lyr.hide();
                lyr.setRenderer(new  WHAFapp.SimpleRendererCons(noSymbol));
                lyr.scaleSymbol='none';
                lyr.show();
            }

            break;

        case 'downstream':
            lyr=DSS_objectives.dnMaskFL,n=1;
            if (type=='mask'){
                dnstrSymbol('none');
                lyr.hide();
                lyr.setRenderer(new  WHAFapp.SimpleRendererCons(maskSymbol));
                lyr.scaleSymbol='mask';
                lyr.show();
                WHAFapp.currentMapParams.maskLayer=n;
                $('#maskRemove').fadeIn();
            } else if (type=='outline'){
                dnstrSymbol('none');
                lyr.hide();
                lyr.setRenderer(new  WHAFapp.SimpleRendererCons(dnstrOutlineSymbol));
                lyr.scaleSymbol='outline';
                lyr.show();
            } else if (type=='fill'){
                lyr.hide();
                lyr.setRenderer(new  WHAFapp.SimpleRendererCons(noSymbol));
                lyr.scaleSymbol='fill';
                lyr.show();
                dnstrSymbol('fill');//fills
            } else if (type=='none'){
                lyr.hide();
                lyr.setRenderer(new  WHAFapp.SimpleRendererCons(noSymbol));
                lyr.scaleSymbol='none';
                lyr.show();
                dnstrSymbol('none');
            }
            break;

        case 'upstream':
            lyr1=DSS_objectives.upMaskFL,lyr2=DSS_objectives.upPolyFL,n=0;
            if (type=='mask'){
                lyr2.hide();
                lyr2.setRenderer(new  WHAFapp.SimpleRendererCons(noSymbol));
                lyr2.show();

                lyr1.hide();
                lyr1.setRenderer(new  WHAFapp.SimpleRendererCons(maskSymbol));
                lyr1.scaleSymbol='mask';
                lyr1.show();

                WHAFapp.currentMapParams.maskLayer=n;
                $('#maskRemove').fadeIn();
            } else if (type=='outline'){
                lyr1.hide()
                lyr1.setRenderer(new  WHAFapp.SimpleRendererCons(upstrOutlineSymbol));
                lyr1.scaleSymbol='outline';
                lyr1.show();
               
                lyr2.hide()
                lyr2.setRenderer(new  WHAFapp.SimpleRendererCons(noSymb));
                lyr2.scaleSymbol='none';
                lyr2.show();

            } else if (type=='fill'){
                lyr1.hide();
                lyr1.setRenderer(new  WHAFapp.SimpleRendererCons(noSymbol));
                lyr1.scaleSymbol='fill';
                lyr1.show();

                lyr2.hide();
                lyr2.setRenderer(new  WHAFapp.SimpleRendererCons(upFill));
                lyr2.scaleSymbol='fill';
                lyr2.show();

            } else if (type=='none'){
                lyr2.hide()
                lyr2.setRenderer(new  WHAFapp.SimpleRendererCons(noSymb));
                lyr2.scaleSymbol='none';
                lyr2.show();

                lyr1.hide()
                lyr1.setRenderer(new  WHAFapp.SimpleRendererCons(noSymb));
                lyr1.scaleSymbol='none';
                lyr1.show();
                // upstrSymbol('none');
            }
            WHAFapp.currentMapParams.togglerU=type;
            break;
    }

    function correctMaskRecord(type, n){//sets WHAFapp.currentMapParams.maskLayer to 6 (i.e. no scale layer is masked) if scale changes from mask to something else
        if (type!='mask'&& WHAFapp.currentMapParams.maskLayer===n){
            shower(6);
        }

    }

    function dnstrSymbol(what){
        var symb, lyr2=DSS_objectives.dnPolyFL;
        if (what=='none'){
            symb = noSymbol
        } else {
            symb = downFill
        }
        lyr2.hide();
        lyr2.setRenderer(new  WHAFapp.SimpleRendererCons(symb));
        lyr2.show();
        WHAFapp.currentMapParams.togglerD=type;
    }

    function upstrSymbol_(what){
        var symb, lyr3=DSS_objectives.upPolyFL;
        if (what=='none'){
            symb = noSymbol
        } else {
            symb = upFill
        }
        lyr3.hide();
        lyr3.setRenderer(new  WHAFapp.SimpleRendererCons(symb));
        lyr3.show();
        WHAFapp.currentMapParams.togglerU=type;
    }    
} 

function zoomToSelectedMajor(q){
    if(q=== undefined){q=WHAFapp.currentMapParams.crossmajor}

    function WS_zoomer(){
        if (DSS_objectives.majorsFL && DSS_objectives.majorsFL.graphics.length>0){
            var s=DSS_objectives.majorsFL.graphics;
            for (f in s){
              if(s[f].attributes.major==q){
                var r = s[f].geometry.getExtent();
                if (r && r !== undefined){
                    console.log("extent set")
                    map.setExtent(r, true);                    
                } else {
                    console.log("waiting for geometry to load before zooming")
                    setTimeout(function (){
                        WS_zoomer();
                    },250)
                }
              }
            }
        } else {
            console.log("waiting for watershed layer to load before zooming")
            setTimeout(function (){
                WS_zoomer();
            },750)

        }
    }

    WS_zoomer();//zoom to watershed, if layer already loaded, else wait and try again repeatedly.
}


function CATCH_ID_ByPoint(point){//from map point, gets catchment, major and basin, moves on to masksLoader 
     require(["esri/tasks/query","esri/tasks/QueryTask"],function(Query,QueryTask){
        console.log(point)
        if (point.type == "point"){
            qCatchmentsC = new  WHAFapp.QueryCons;
            qCatchmentsC.returnGeometry = false;
            qCatchmentsC.outFields = ["*"]//"CATCH_ID","MAJOR", "HUC_8"];
            qCatchmentsC.geometry = point;

            qIdtCatchments = new  WHAFapp.QueryTaskCons(assessmentURL + "/70");//watershed boundary drawn from index scores layer
            console.log(qIdtCatchments)
            qIdtCatchments.execute(qCatchmentsC, showMeCID);
        }

        function showMeCID(e) {
            var Huc4, Huc8; 
            console.log("Results: ",e)
            WHAFapp.currentMapParams.Catchment = e.features[0].attributes.catch_id;
            WHAFapp.currentMapParams.crossmajor=e.features[0].attributes.major;
            WHAFapp.currentMapParams.majorname = majorDict[WHAFapp.currentMapParams.crossmajor];
            Huc8=e.features[0].attributes.huc_8;
            WHAFapp.currentMapParams.crossHuc4=Huc8.slice(0,4);
            DSS_objectives.catchment =e;
            setHucNames();
            masksLoader();
            autoLoaderForScales();
            getScores();//changes scores for DSS module
            // try{getWhafIndexField()}catch(t){};
        }
    });
}

function setHucNames(){
    // $("#selectButTop, #selectButTop1").text("Major Watershed: " +WHAFapp.currentMapParams.majorname); 
    $("#selectButTop").text("Major Watershed: " +WHAFapp.currentMapParams.majorname); 
    $("#basinButtonTop").text("Basin: " + HUC_4s[WHAFapp.currentMapParams.crossHuc4]);
}

function resetDrawStar(){
    DSS_StarState=false;
    crosshairCurs('off');
    WHAFapp.suspender=false;
    try{WHAFapp.tb.deactivate()}catch(err){} 
    $('#DssStarImage, #DssStarImage2').removeClass('info5ImageOn btn-warning highlightBorder');
    $('#DssStarImage').addClass('info5Image');
}

function drawStar(){
    try{DSS_objectives.majorsFL.enableMouseEvents()}catch(r){};    
    if (DSS_StarState==false){
        crosshairCurs('on');
        WHAFapp.suspender=true;//suspends identify on click for added layers, if turned on
        $('#DssStarImage').removeClass('info5Image')
        $('#DssStarImage, #DssStarImage2').addClass('info5ImageOn btn-warning')
        DSS_StarState=true;
        DSS_objectives.point={};
        try{DSS_objectives.decisionObjectives.scalesViewed=false}catch(r){};
        deleteScaleslayers();
        activateDssStar(); 
    } else{
        $('#DssStarImage, #DssStarImage2').removeClass('info5ImageOn btn-warning highlightBorder');
        $('#DssStarImage').addClass('info5Image');
        DSS_StarState=false;
        try{WHAFapp.tb.deactivate()}catch(err){}    
        crosshairCurs('off');
        WHAFapp.suspender=false;
        scalesGuideReset();
    }
}    

function activateDssStar(coordsVal, blank){
    var coords ;

    function WS_outlineLoad(){
        
        if (DSS_objectives.MajorMaskFL && DSS_objectives.MajorMaskFL !== undefined){
            console.log("loading watershed outline")
            MajorWatershedSelector(coordsVal)               
        } else{
            console.log("trying again to load watershed outline")
            setTimeout(function (){
                WS_outlineLoad();
            },1000)
        }
        if($('#DssStarImage').hasClass('btn-warning')){//Deactivats star if it was active when drop-down selection was made
            $('#DssStarImage, #DssStarImage2').removeClass('info5ImageOn btn-warning highlightBorder');
            $('#DssStarImage').addClass('info5Image');
            DSS_StarState=false;
            try{WHAFapp.tb.deactivate()}catch(err){}    
            crosshairCurs('off');
            WHAFapp.suspender=false;
        };
    } 


    require(["esri/graphic","esri/geometry/Point"],function(Graphic,Point){

        if (blank==='blank'){ //modification for watershed selection dropdown menu
            coords = pourPoint[coordsVal];
            $('#loader').hide();
        } else{
            coords=coordsVal;    
        }

        // try{map.graphics.remove(starLocation.mainMap);}catch(e){};
        locationMarksRemover();
        clearScales();
        clearPlaceParams();
        $(".locLink").text('Set map location');
        try{setDssStar('remove');}catch(err){};

        if (coords && coords!= undefined){
            var x=coords[0], y=coords[1];
            newPoint(x,y);
            starLocation.mainMap = new Graphic(newPoint(x,y), markerSymbol);
            starLocation.mainMap.WHAFrole = 'locationMark';
            if (blank !== "blank"){map.graphics.add(starLocation.mainMap)};
            DSS_objectives.majorsFL.disableMouseEvents();
            closeDialog();
            $(".locLink").text('Change map location');
            WHAFapp.currentMapParams.Plc=coords;
            CATCH_ID_ByPoint(DSS_objectives.point);//GETS CATCHMENT
                    
            $('.starrButton').removeClass('disabled');
            $('.locationDependent').show();
            $('#DssStarImage').removeClass('info5ImageOn');
            $('#DssStarImage').addClass('info5Image');
            DSS_StarState=false;
            if (blank==='blank'){//wait till masksLoader completed
                WS_outlineLoad()
            };
        } else {
            initToolbar();
        };

        function initToolbar() {
            console.log("initing toolbar")

            WHAFapp.tb = new WHAFapp.DrawCons(map);
            WHAFapp.tb.on("draw-end", addGraphic); 
            WHAFapp.tb.activate('point');
            function addGraphic(evt) {
                closeDialog();
                WHAFapp.tb.deactivate(); 
                crosshairCurs('off');

                if(WHAFapp.watershedZoom){//modification to trigger watershed selection only with click 
                    
                    WHAFapp.currentMapParams.togglerMj='outline'; activateDssStar(WHAFapp.currentMapParams.hoverMajor,'blank')
                    WHAFapp.watershedZoom=false;
                    $(".locLink").text('Change map location');
                    $('.starrButton').removeClass('disabled');
                    $('.locationDependent').show();
                    $('#DssStarImage').removeClass('info5ImageOn');
                    $('#DssStarImage').addClass('info5Image');
                    DSS_StarState=false;
                    try{$('#DssStarImage, #DssStarImage2').removeClass('btn-warning');}catch(err){};                    return;
                }     

                DSS_objectives.place = evt;
                starLocation.mainMap = new Graphic(evt.geometry, markerSymbol)
                starLocation.mainMap.WHAFrole = 'locationMark';
                map.graphics.add(starLocation.mainMap);

                DSS_objectives.point=evt.geometry;

                CATCH_ID_ByPoint(DSS_objectives.point);
                console.log("Point:'",DSS_objectives.point)
                DSS_objectives.majorsFL.disableMouseEvents();

                $(".locLink").text('Change map location');
                // setDssStar(); //SET THE STAR ON ALL MAPS
                $('.starrButton').removeClass('disabled');
                $('.locationDependent').show();
                $('#DssStarImage').removeClass('info5ImageOn');
                $('#DssStarImage').addClass('info5Image');
                DSS_StarState=false;
                try{$('#DssStarImage, #DssStarImage2').removeClass('btn-warning');}catch(err){};
            }
        }
    });
}

function clearPlaceParams(){
    var z = WHAFapp.currentMapParams;
    z.Plc = "";
    z.crossHuc4 = "";
    z.crossmajor = "";
    z.Catchment = "";
    z.catchmentName = "";
    DSS_objectives.point = {};
}
    

function newPoint(x,y){ //creates a point geometry object and sets it as property of DSS_objectives object
    var p;
    require(["esri/geometry/Point"],function(Point){
        var sr=new esri.SpatialReference({ wkid: 102100})
        p=new Point(x, y, sr);
        DSS_objectives.point=p;
    });
    return p;
}

function setDssStar(remove){ //adds or removes location mark, including to additional web maps that may have been created by app (mapRunner)
    var symbol;
    if (remove && remove != undefined ){
        var markerSymbol = new WHAFapp.SimpleMarkerSymbolCons();
        symbol = markerSymbol;
        s=1
        eve=DSS_objectives.place
        while (s<runningMapNumber+1){
            if (s<runningMapNumber){//removes location mark from all maps, if mapRunner created additional web maps. 
                map=DSS_objectives[s].map
                starLocation[s] = new WHAFapp.GraphicCons(eve.geometry, symbol);
                map.graphics.remove(starLocation[s]);    
            }
            else {
                map=mainMap
            }        
            s++
        }

    } else {
        var markerSymbol = new WHAFapp.SimpleMarkerSymbolCons();
        symbol = markerSymbol;
        s=1;
        eve=DSS_objectives.place;
        while (s<runningMapNumber+1){
            if (s<runningMapNumber){//adds location mark from all maps, if mapRunner created additional web maps.
                map=DSS_objectives[s].map
                starLocation[s] = new WHAFapp.GraphicCons(eve.geometry, symbol);
                starLocation[s].origin = "starPlacement"
                map.graphics.add(starLocation[s]);    
            }
            else{
                map=mainMap
            }        
            s++
        };
    }
}

var HUC_4s={
    
    "0401":"Western Lake Superior",
    "0701":"Mississippi Headwaters",
    "0702":"Minnesota",
    "0703":"St. Croix",
    "0704":"Upper Miss. Black Root",
    "0706":"Upper Miss. Maquoketa Plum",
    "0708":"Upper Miss. Iowa Skunk Wapsipinicon",
    "0710":"Des Moines",
    "0902":"Red River",
    "0903":"Rainy River",
    "1017":"Missouri Big Sioux",
    "1023":"Missouri Little Sioux"
}

majorToHUC8 = {
    1 : "04010101",
    2 : "04010102",
    3 : "04010201",
    4 : "04010202",
    5 : "04010301",
    7 : "07010101",
    8 : "07010102",
    9 : "07010103",
    10 : "07010104",
    11 : "07010105",
    12 : "07010106",
    13 : "07010107",
    14 : "07010108",
    15 : "07010201",
    16 : "07010202",
    17 : "07010203",
    18 : "07010204",
    19 : "07010205",
    20 : "07010206",
    21 : "07010207",
    22 : "07020001",
    23 : "07020002",
    24 : "07020003",
    25 : "07020004",
    26 : "07020005",
    27 : "07020006",
    28 : "07020007",
    29 : "07020008",
    30 : "07020009",
    31 : "07020010",
    32 : "07020011",
    33 : "07020012",
    34 : "07030001",
    35 : "07030003",
    36 : "07030004",
    37 : "07030005",
    38 : "07040001",
    39 : "07040002",
    40 : "07040003",
    41 : "07040004",
    42 : "07040006",
    43 : "07040008",
    44 : "07060001",
    46 : "07060002",
    47 : "07080102",
    48 : "07080201",
    49 : "07080202",
    50 : "07080203",
    51 : "07100001",
    52 : "07100002",
    53 : "07100003",
    54 : "09020101",
    55 : "09020102",
    56 : "09020103",
    57 : "09020104",
    58 : "09020106",
    59 : "09020107",
    60 : "09020108",
    61 : "09020301",
    62 : "09020302",
    63 : "09020303",
    65 : "09020304",
    66 : "09020305",
    67 : "09020306",
    68 : "09020309",
    69 : "09020311",
    70 : "09020312",
    71 : "09020314",
    72 : "09030001",
    73 : "09030002",
    74 : "09030003",
    75 : "09030004",
    76 : "09030005",
    77 : "09030006",
    78 : "09030007",
    79 : "09030008",
    80 : "09030009",
    81 : "10170202",
    82 : "10170203",
    83 : "10170204",
    84 : "10230003"
}

function scaleShoRemove(){
    var buttons = ['dnstrmButTop', 'upButtonTop','selectButTop','basinButtonTop'];
    for (button in buttons){
        $('#'+buttons[button]).parent().removeClass('scaleSho')//removes highlight of scale button 
    };
}

function serialMasker(t){
    if(DSS_objectives.point==false||DSS_objectives.point.x==undefined){
        alert("Please select a map location by clicking anywhere on the map. This location can be changed later by clicking the (highlighted) crosshair button.");
        $('#DssStarImage').click().addClass('btn-warning');
    };
    scaleShoRemove();
    
    if(t && t!== undefined){
        // try{$('#'+t).parent().addClass('scaleSho');}catch(err){}
        // g=$('#'+t).parent().find('.maskerI').attr('id');
        // ticker(g,'keepOn');

        switch (t) {
        case "dnstrmButTop":
            serialToggler('downstream')
            break;
        case "upButtonTop":
            serialToggler('upstream')
            break;
        case "ctmntButtonTop":        
            break;
        case "selectButTop"://watershed
            serialToggler('major');
            break;
        case "basinButtonTop":
            serialToggler('basin');
            break;
        }
    }

    function serialToggler(scl){
        var T = $('#'+t).parent();
        if($(T).hasClass( 'scaleNoSho' )){
            $('#dnstrmButGrp, #upButtonGrp, #selectButGrp, #basinButtonGrp').removeClass( 'scaleSho' ).addClass( 'scaleNoSho' );
            $(T).removeClass( 'scaleNoSho' ).addClass( 'scaleSho' );
            scaleSymbology(scl,'mask');
            g=$('#'+t).parent().find('.maskerI').attr('id');
            ticker(g,'keepOn');
        } else{
            $(T).removeClass( 'scaleSho' ).addClass( 'scaleNoSho' );
            scaleSymbology(scl,'none')
        }
    }
}

function maskCheckReset(elem){
    var r,ii,k,f,v='<i class="icon-ok"></i>';
    scaleShoRemove();
    r=$('.maskerI');
    for (z=0; z<r.length; z++){
        ii=r[z].id;
        if(ii!=elem){
            k=$('#'+ii).html();
            f=k.replace(v,'');
            $('#'+ii).html(f);
        }
    }
}

function scaleCheckReset(){
    var r=$('#scaleButtonPlace .icon-ok');
    for (z=0; z<r.length; z++){
      try{$(r[z]).remove()}catch(r){};
    };

    $('#dnstrmButGrp, #upButtonGrp, #selectButGrp, #basinButtonGrp, #ctmntButtonGrp').removeClass( 'scaleSho' ).addClass( 'scaleNoSho' );
}

function shower(a){
    var tg=['togglerU','togglerD','togglerMj','togglerBsn'];
    WHAFapp.currentMapParams.maskLayer=a;
  
    var maskLyrs=["upMasker", "dnMasker","majorsGraphics","bsnMasker"];
    var y=map.getLayersVisibleAtScale();
    var ff=maskLyrs[a];
    var xBut = $('#maskRemove'); 
    if (a<= maskLyrs.length-1){xBut.show()}else{xBut.hide(); scaleShoRemove()}

    for (var i=0; i<tg.length; i++){
        if (i!=a && WHAFapp.currentMapParams[tg[i]]=='mask'){
            WHAFapp.currentMapParams[tg[i]]='none'
        }
    }
}

function catShower(abslt){
    var ss = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([200, 0, 255]), 2), new dojo.Color([125, 125, 125, 0]));
    var xx = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL, new dojo.Color([0, 0, 0, .5]), 0), new dojo.Color([0, 0, 255, .5]));
    if (abslt==1){
        $('#ctmntButtonGrp').removeClass( 'scaleSho' ).addClass( 'scaleNoSho' );
        try{colorCtment(xx);}catch(err){};
        WHAFapp.currentMapParams.togglerC='none'
    } else if(abslt==2){
        $('#ctmntButtonGrp').removeClass( 'scaleNoSho' ).addClass( 'scaleSho' );
        try{colorCtment(catOutline);}catch(err){};
        WHAFapp.currentMapParams.togglerC='outline';
    } else if(abslt==3){
        $('#ctmntButtonGrp').removeClass( 'scaleNoSho' ).addClass( 'scaleSho' );
        try{colorCtment(blueFill);}catch(err){};
        WHAFapp.currentMapParams.togglerC='fill'
    } else if ($('#ctmntButtonGrp').hasClass( 'scaleNoSho' )){
        $('#ctmntButtonGrp').removeClass( 'scaleNoSho' ).addClass( 'scaleSho' );
        try{colorCtment(ss);}catch(err){};
        ticker('ctmntOutliner','tick');
        WHAFapp.currentMapParams.togglerC='outline';
    } else{
        $('#ctmntButtonGrp').removeClass( 'scaleSho' ).addClass( 'scaleNoSho' );
        try{colorCtment(xx);}catch(err){};
        ticker('ctmntNone','tick');
        WHAFapp.currentMapParams.togglerC='none';
    }

    function colorCtment(d){
        DSS_objectives.ctmntFL.hide()
        DSS_objectives.ctmntFL.setRenderer(new  WHAFapp.SimpleRendererCons(d));
        DSS_objectives.ctmntFL.show()
    }
}

function getStarGraphics(){
    var g,x,y,color, locJSON;

    if (map.getBasemap()==="national-geographic" || map.getBasemap()==="gray"){
        color = '[0,0,0,255]';
    } else{
        color = '[255,255,255,255]';
    }

    var jsn = '{"featureCollection":{"layers": [{"layerDefinition":{"name": "locationMark", "geometryType": "esriGeometryPoint"}, "featureSet":{"features": [{"geometry":{"x":'
    jsn2=', "spatialReference":{"wkid": 102100}}, "symbol":{"color": '+color+', "size": 16, "type": "esriSMS", "style": "esriSMSCross", "outline":{"color":'+color+',"width":1}}}]}}]}}'

    g=map.graphics.graphics;
    for (r in g){
        if (g[r].WHAFrole=='locationMark' && g[r].symbol!== undefined){
            x=g[r].geometry.x.toFixed(2);
            y=g[r].geometry.y.toFixed(2);
        }
        locJSON=jsn+x+',"y":'+y+jsn2
    }
    if (x && x!== undefined){ 
        return locJSON;
    }

}

function serverTest(sUrl){
    xhr = new XMLHttpRequest();
    xhr.open('GET', sUrl); 
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {  
            if (xhr.status >= 500 ){  
                $('#mapScalePlace').hide();
                $('#servWarningPlace').show();
            }else{
                $('#mapScalePlace').show();
                $('#servWarningPlace').hide();
            }
        }
    }
}

function changeUpfillDef(){//workaround for server slowness
    setTimeout(function () {
        if(DSS_objectives.upPolyFL.graphics.length===0){
            var t = (new Date).getTime(), m='6202100',a;
            a="UpstOf = '" + m +"'"//" AND " + t + "=" + t;
            DSS_objectives.upPolyFL.setDefinitionExpression(a);
            console.log("Reworking this...");
            changeUpfillDef();
        };
    }, 2000)
}

function reorderMajorsFL(){
    var ff=0,t,d, y=map.getLayersVisibleAtScale(map.getScale()),f=y.length;
    var scaleLists = ['ctmntFL','upMaskFL', 'dnMaskFL','MajorMaskFL','BsnMaskFL','upPolyFL', 'dnPolyFL','majorsFL'];
    for (var w=0; w<scaleLists.length; w++){
      var q=scaleLists.length-w;  
      var sLyr = DSS_objectives[scaleLists[q-1]];
      map.reorderLayer(sLyr,f-q);
    }
}


//scale & extent data

pourPoint={1:[-10116095, 6033046], 2:[-10200276, 5950067], 3:[-10256844, 5901501], 23:[-10695897, 5649581],26:[-10656901, 5611227],7:[-10418131, 5983151],12:[-10502248, 5824844],8:[-10453322, 5991392],11:[-10468002, 5871227],9:[-10418613, 5888559],15:[-10483651, 5715282],13:[-10554772, 5849454],16:[-10483723, 5715129],17:[-10410872, 5660467],19:[-10437532, 5634327],21:[-10396169, 5651558],36:[-10326709, 5752383],10:[-10506506, 5767434],14:[-10532264, 5832443],34:[-10326629, 5752505],35:[-10323566, 5757398],4:[-10304824, 5919486],5:[-10242996, 5894460],73:[-10293005, 6157813],18:[-10410862, 5660275],74:[-10397714, 6208550],75:[-10512514, 6223485],20:[-10331312, 5581781],78:[-10512362, 6222700],37:[-10330940, 5581848],72:[-10258416, 6167634],72:[-10290412, 6159280],76:[-10418129, 6194865],77:[-10432522, 6193216],33:[-10369422, 5605234],79:[-10541108, 6247410],80:[-10569516, 6337324],25:[-10580956, 5552552],29:[-10510124, 5509246],31:[-10478158, 5476327],32:[-10469358, 5485058],38:[-10251130, 5528796],39:[-10303425, 5556514],40:[-10178992, 5465188],43:[-10158244, 5428742],55:[-10755207, 5742839],62:[-10605899, 6100157],65:[-10705539, 6127544],70:[-10815508, 6242983],71:[-10742963, 6274836],51:[-10574280, 5405932],27:[-10585262, 5554161],28:[-10459076, 5523499],41:[-10233315, 5510747],42:[-10157886, 5428683],54:[-10753443, 5822356],24:[-10673419, 5625649],56:[-10753288, 5822823],82:[-10735456, 5453710],22:[-10672082, 5624966],81:[-10736668, 5511921],57:[-10777492, 5956411],58:[-10777424, 5956407],59:[-10782456, 6019154],67:[-10815383, 6186240],68:[-10811795, 6179131],69:[-10823478, 6274925],69:[-10819750, 6274930],69:[-10814763, 6274927],60:[-10779843, 5994128],61:[-10777512, 5954659],63:[-10800276, 6094007],66:[-10718127, 6089244],30:[-10468135, 5490723],83:[-10706755, 5388958],52:[-10564665, 5388673],53:[-10527814, 5388688],84:[-10617179, 5388835],44:[-10158627, 5389309],46:[-10169705, 5389064],47:[-10313582, 5388704],48:[-10351505, 5388504],49:[-10382595, 5388733],50:[-10414764, 5388480]};

basinWxtentOb={

    '0401_Xtnt':{'YMin':5831146, 'YMax':6125604, 'XMin':-10376520, 'XMax':-9962202},
    '0701_Xtnt':{'YMin':5566074, 'YMax':6068950, 'XMin':-10644057, 'XMax':-10326463},
    '0702_Xtnt':{'YMin':5388331, 'YMax':5837082, 'XMin':-10782086, 'XMax':-10362595},
    '0703_Xtnt':{'YMin':5581783, 'YMax':5895914, 'XMin':-10422272, 'XMax':-10273972},
    '0704_Xtnt':{'YMin':5388494, 'YMax':5601023, 'XMin':-10447242, 'XMax':-10157231},
    '0706_Xtnt':{'YMin':5068312, 'YMax':5511646, 'XMin':-10632967, 'XMax':-9696155},
    '0708_Xtnt':{'YMin':4771424, 'YMax':5658093, 'XMin':-11279068, 'XMax':-9405444},
    '0710_Xtnt':{'YMin':4768373, 'YMax':5640971, 'XMin':-11443200, 'XMax':-9569575},
    '0902_Xtnt':{'YMin':5461965, 'YMax':6607909, 'XMin':-11498081, 'XMax':-10091639},
    '0903_Xtnt':{'YMin':6001923, 'YMax':6445258, 'XMin':-10809601, 'XMax':-9872788},
    '1017_Xtnt':{'YMin':5014751, 'YMax':5901421, 'XMin':-11626533, 'XMax':-9752909},
    '1023_Xtnt':{'YMin':5020062, 'YMax':5463397, 'XMin':-11093451, 'XMax':-10156639}
}
