//URL PARAMETERS

function paramEvaluatorInit(e) {//gets index layer from parameter onto map

    if (e.indexLayer && e.indexLayer != "undefined") {
        if (Number(e.indexLayer)){//deprecated indexLayer params were numbers; current value retrieved with 'oldHealthScoreIndex' object 
            console.log(e.indexLayer)
            var f={};
            f.indexLayer = oldHealthScoreIndex[e.indexLayer];
            paramEvaluatorInit(f)

        } else if(e.indexLayer==='40_39_38' || e.indexLayer==='43_42_41' || e.indexLayer==='47_48_46'){
            console.log(e.indexLayer);
            var f={};
            var a=Number(e.indexLayer.slice(3,5));
            console.log(a);
            f.indexLayer = oldHealthScoreIndex[a]; 
            paramEvaluatorInit(f);
        }

        else{
            var i = mapParamObject.indexLayer
            var l=$('#accordion2 .scoreButton, #accordion2 .scoreBtn')
            for (var n=0; n<l.length; n++){
                var f = $(l[n]).children().attr("onclick")
                if(f.indexOf(i)!==-1){
                    $(l[n]).children().click();
                 }
            }
        }
        // try{legendd.refresh()}catch(r){};
    } else{
        removeFirstLayer(); hideLegend();$('#indexTitle_slider').hide()
    }
}

function getURLParameter(e) {
    return decodeURI((RegExp(e + "=" + "(.+?)(&|$)").exec(location.search) || [, null])[1])
}

function getBookmarkParameter(e,y) {
    return decodeURI((RegExp(e + "=" + "(.+?)(&|$)").exec(y) || [, null])[1])
}


function evalExtentParams(e) {
    if (e.xtnt) {
        console.log(e.xtnt)
        var t = e.xtnt.slice(1, e.xtnt.length - 1);
        t = t.split(",");
        var n = new  WHAFapp.ExtentCons({
            xmin: Number(t[0]),
            ymin: Number(t[1]),
            xmax: Number(t[2]),
            ymax: Number(t[3]),
            spatialReference: {
                wkid: 102100
            }
        });
        initExtent = n
    } else {
        initExtent = stateExtent;
    }
}


function evalDrawParams(e) {
    if (e.opcty) {
        var t = Number(e.opcty);
        changeOpacity(t);
        $("#aSlider").slider({
            value: t
        })
    }

    if (e.HO){
        setHsOpacParam(e.HO)
    } else{
        setHsOpacParam(0)
    }

  if (e.HS == "1"){
        manualHillShadeSet()
    } else {
        manualHillShadeSet('off');
    }
}

function forceRemoveAux(){//removes all layers added to map (that have an 'identifier' property with value 'WHAF_added_layer')
  
if (checkLoad()){//checks that layers are not removed prior to their loading

    console.log("All layers Loaded")
      var k = map.getLayersVisibleAtScale()
      for (i in k){
        d=k[i].identifier
        if (d==='WHAF_added_layer'){
          map.removeLayer(k[i]);
        }  
      }
      $('#sortable').html('');
      identFalser();
      legendd.layerInfos=[];
  }else{
    console.log("Layers Still Loading")
    setTimeout(function(){forceRemoveAux()},100)
  }
}

function checkLoad(){// returns true if all loaded layers are done loading
                     // (layers are pushed to list through modification of 
                     // js.arcgis.com.3.13.js addLayer function.) 
  L=WHAFapp.loadingLyrs;
  for (var i=0; i<L.length; i++){
    if(L[i].loaded){
      var index = L.indexOf(L[i]);
      if (index > -1) {
          L.splice(index, 1);        
      }
    }
  }
  if(L.length>0){
    checkLoad();
  }else{
    return true
  }          
}



function setFromExtentParams_(e) {
    var inExtent;
    if (e.xtnt) {
        var t = e.xtnt.slice(1, e.xtnt.length - 1);
        t = t.split(",");
        var n = new  WHAFapp.ExtentCons({
            xmin: Number(t[0]),
            ymin: Number(t[1]),
            xmax: Number(t[2]),
            ymax: Number(t[3]),
            spatialReference: {
                wkid: 102100
            }
        });
        inExtent = n
    } else {
        inExtent = stateExtent
    }

    map.setExtent(inExtent)
}

function setFromExtentParams(e) {
    var inExtent;
    if (e.xtnt) {
        var t = e.xtnt.slice(1, e.xtnt.length - 1);
        t = t.split(",");
        var n = new  WHAFapp.ExtentCons({
            xmin: Number(t[0]),
            ymin: Number(t[1]),
            xmax: Number(t[2]),
            ymax: Number(t[3]),
            spatialReference: {
                wkid: 102100
            }
        });
        inExtent = n
    } else {
        inExtent = stateExtent
    }
    return inExtent;
}

function evalBaseMapParam(e) {
    var t = e.Bsmp, baseMapCurrent;
    switch (t) {
    case "hyb":
        baseMapCurrent = "hybrid";
        break;
    case "gray":
        baseMapCurrent = "gray";
        break;
    case "NG":
        baseMapCurrent = "national-geographic";
        break;
    case "DG":
        baseMapCurrent = "dark-gray";
        break;
    default:
        baseMapCurrent = "satellite"
    }

    return baseMapCurrent;
}

function setFromBaseMapParam(e) {
    var t = e.Bsmp, baseMapCurrent;
    switch (t) {
    case "hyb":
        baseMapCurrent = "hybrid";
        break;
    case "gray":
        baseMapCurrent = "gray";
        break;
    case "NG":
        baseMapCurrent = "national-geographic";
        break;
    case "DG":
        baseMapCurrent = "dark-gray";
        break;
    default:
        baseMapCurrent = "satellite"
    }
    map.setBasemap(baseMapCurrent)
}

function evalPlace(coordString){
   try{map.graphics.remove(starLocation.mainMap);}catch(e){};
    clearScales();
    clearPlaceParams();

    if (coordString){
      var o=coordString.indexOf(',');
      var l=coordString.length;
      var x=Number(coordString.slice(0,o));
      var y=Number(coordString.slice(o+1,l));
      activateDssStar([x,y]);
      $('.starrButton').removeClass('disabled');
    }
}

function setMode(modeToSet){
    mode = modeToSet;
}


function modesSorter() {
    if (mode == "watershedZoom") {
        // alert("ModeSorter")
        WS_functionality()
    } else if (mode == "showUpstream" || mode == "showCatchment") {
        try {
            DSS_objectives.majorsFL.disableMouseEvents()
        } catch (e) {}
    }
}

// function sorter(e) {
//     if (e == "upStream") {
//         exploreByUpstream()
//     } else if (e == "WaterBudget") {
//         exploreByWaterUseVulnerability()
//     } else if (e == "analysisBestWorst") {
//         analyzeBlock()
//     } else {}
// }

// function exploreByUpstream() {
//     require(["esri/tasks/QueryTask"],function(QueryTask){
//         WHAFapp.suspender = true;
//         mode = "showUpstream";
//         modesSorter();
//         var t = masksURL + "12";
//         qtUpstream = new  WHAFapp.QueryTaskCons(t);      
//     });
// }

function executeClick(e) {
    crosshairCurs('off');
    if (mode == "showUpstream"){
        console.log("Exploring upstream. Fix Function")
    } 
    mode = "watershedZoom";
    try{DSS_objectives.majorsFL.enableMouseEvents()}catch(err){};
}


function WS_functionality() {//starting up the app
    var e = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 0, 0]), 1), new dojo.Color([125, 125, 125, 0]));
    var t = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 2), new dojo.Color([125, 125, 125, 0]));
    var n = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0,0, 0]), .2), new dojo.Color([125, 125, 125, 0]));
    var r = (new Date).getTime();
    var i = "major < " + r, rendererSimp

    require(["esri/renderers/SimpleRenderer","esri/graphic","esri/layers/FeatureLayer","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ImageParameters"],
        function(SimpleRenderer,Graphic,ArcGISDynamicMapServiceLayer,ImageParameters){
        if (DSS_objectives.majorsFL) {
            DSS_objectives.majorsFL.enableMouseEvents();
            }

        DSS_objectives.majorsFL = new WHAFapp.FeatureLayerCons(assessmentURL + "/1", {
            maxAllowableOffset: 10,//WHAFapp.currentMapParams.allowedOffset,
            mode: WHAFapp.FeatureLayerCons.MODE_SNAPSHOT,
            outFields: ["*"]
        });

        rendererSimp=new  WHAFapp.SimpleRendererCons(n)

        DSS_objectives.majorsFL.setDefinitionExpression(i);
        DSS_objectives.majorsFL.setRenderer(rendererSimp);
        DSS_objectives.majorsFL.id = "allMajorsGraphics";

        try {
            map.addLayer(DSS_objectives.majorsFL);
        } catch (s) {
            console.log("unable to add FL")
        }

        dojo.connect(DSS_objectives.majorsFL, "onLoad", function () {
            completeParamLoad();//COMPLETES LOADING OF MAP PARAMATERS AS PASSED BY URL
            var e = map.getLayersVisibleAtScale(map.getScale());
            var t = e.length;
            try {
                reorderMajorsFL();
            } catch (n) {}
        
            DSS_objectives.majorsFL.enableMouseEvents();
            if (mapParamObject.Upstrm && mapParamObject.Upstrm != "undefined") {
                var r = mapParamObject.Upstrm;
                var i = mapParamObject;
                evalUpstr(r, i);
            };
            if (mapParamObject.Dnstrm && mapParamObject.Dnstrm != "undefined") {
                var r = mapParamObject.Dnstrm;
                var i = mapParamObject.dnSymbol;
                evalDnstr(r, i);
            };
        });

        dojo.connect(DSS_objectives.majorsFL, "onMouseOver", function (t)  {
            
            var n = "${major_name}";
            var r = "${major}";
            
            var s = esri.substitute(t.graphic.attributes, r);
            var o = esri.substitute(t.graphic.attributes, n);
            try{document.getElementById("selectButTop").innerHTML = "Major Watershed: " + o + " (" + s + ")"}catch(err){};
            var a = majorToHUC8[s];
            var Huc_4 = a.slice(0,4);
            var f = HUC_4s[Huc_4];
            try{document.getElementById("basinButtonTop").innerHTML = "Basin: " + f}catch(err){};
            if ($('#pieChartModal').css('display')!=='none'){
                var l = esri.substitute(t.graphic.attributes, "${sq_miles}");
                var d = esri.substitute(t.graphic.attributes, "${a_i_mean}");
                var v = esri.substitute(t.graphic.attributes, "${a_min_idx}");
                var m = esri.substitute(t.graphic.attributes, "${h_i_mean}");
                var g = esri.substitute(t.graphic.attributes, "${h_min_scr}");
                var y = esri.substitute(t.graphic.attributes, "${h_i_pc}");
                var b = esri.substitute(t.graphic.attributes, "${h_i_ic}");
                var w = esri.substitute(t.graphic.attributes, "${h_i_ww}");
                var S = esri.substitute(t.graphic.attributes, "${h_i_lhs}");
                var x = esri.substitute(t.graphic.attributes, "${h_i_fv}");
                var T = esri.substitute(t.graphic.attributes, "${g_i_mean}");
                var N = esri.substitute(t.graphic.attributes, "${g_min_scr}");
                var C = esri.substitute(t.graphic.attributes, "${g_i_sep}");
                var k = esri.substitute(t.graphic.attributes, "${g_i_gwcs}");
                var L = esri.substitute(t.graphic.attributes, "${g_i_cv}");
                var A = esri.substitute(t.graphic.attributes, "${b_i_mean}");
                var O = esri.substitute(t.graphic.attributes, "${b_min_scr}");
                var M = esri.substitute(t.graphic.attributes, "${b_i_th}");
                var _ = esri.substitute(t.graphic.attributes, "${b_i_ssq}");
                var D = esri.substitute(t.graphic.attributes, "${b_i_sr}");
                var P = esri.substitute(t.graphic.attributes, "${b_i_arsr}");
                var H = esri.substitute(t.graphic.attributes, "${c_i_mean}");
                var B = esri.substitute(t.graphic.attributes, "${c_min_scr}");
                var j = esri.substitute(t.graphic.attributes, "${c_i_tc}");
                var F = esri.substitute(t.graphic.attributes, "${c_i_ac}");
                var I = esri.substitute(t.graphic.attributes, "${c_i_rc}");
                var q = esri.substitute(t.graphic.attributes, "${w_i_mean}");
                var R = esri.substitute(t.graphic.attributes, "${w_min_scr}");
                var U = esri.substitute(t.graphic.attributes, "${w_i_nps}");
                var z = esri.substitute(t.graphic.attributes, "${w_i_ps}");
                var W = esri.substitute(t.graphic.attributes, "${w_i_wqa}");
                var X = "Basin: " + f + "<br> HUC 8: " + a + "<br> Major Number: " + r + "<br> Total Area: " + addCommas(l) + " Square Miles <br> ";
                var V = [y, b, w, S, x, C, k, L, M, _, D, P, j, F, I, U, z, W];
                roseCharter("piePlace", V);
                document.getElementById("piePlaceTitle").innerHTML = "<h3><strong>" + o + "</strong>" + " (" + s + ")</h3>";                
            };

            highlightGraphic = new Graphic(t.graphic.geometry, e);
            try {
                closeDialog();
                graphicWSRecord.push(highlightGraphic);
                map.graphics.add(highlightGraphic)
            } catch ($) {
                console.log("unable to load graphics")
            }
            highlightedWatershedEvt = t
        });
    });
}

function loadBasins() {
    require(["esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ImageParameters"],
    function(ArcGISDynamicMapServiceLayer,ImageParameters){
        imageParameters1 = new ImageParameters;
        imageParameters1.layerIds = [0];
        imageParameters1.layerOption = ImageParameters.LAYER_OPTION_SHOW;
        BS = new ArcGISDynamicMapServiceLayer(watershedsURL, {
            imageParameters: imageParameters1
        });
        BS.opacity = 1;
        map.addLayer(BS);
    });
}

majorDict={77:"Big Fork River", 81:"Big Sioux-Medary Crk", 82:"Big Sioux-Pipestone", 30:"Blue Earth River", 54:"Bois De Sioux River", 58:"Buffalo River", 39:"Cannon River", 48:"Cedar River", 26:"Chippewa River", 66:"Clearwater River", 4:"Cloquet River", 29:"Cottonwood River", 12:"Crow Wing River", 53:"E Fork Des Moines", 67:"Grand Marais Creek", 35:"Kettle River", 24:"Lac Qui Parle River", 1:"Lake Superior - North", 2:"Lake Superior-South", 80:"Lake of the Woods", 32:"Le Sueur River", 8:"Leech Lake River", 76:"Little Fork River", 84:"Little Sioux River", 14:"Long Prairie River", 59:"Marsh River", 22:"Minn R-Headwaters", 28:"Minn R-Mankato", 33:"Minn R-Shakopee", 25:"Minn R-Yellow Medicine River", 38:"Miss R & L Pepin", 10:"Miss R-Brainerd", 9:"Miss R-Grand Rapids", 7:"Miss R-Headwaters", 42:"Miss R-La Crescent", 44:"Miss R-Reno", 15:"Miss R-Sartell", 17:"Miss R-St. Cloud", 40:"Miss R-Winona", 20:"Mississippi River", 55:"Mustinka River", 5:"Nemadji River", 18:"North Fork Crow R", 56:"Otter Tail River", 11:"Pine River", 23:"Pomme de Terre River", 79:"Rainy R-Baudette", 72:"Rainy R-Headwaters", 74:"Rainy R-Rainy Lake", 75:"Rainy River-Manitou", 78:"Rapid River", 63:"Red Lake River", 57:"Red River of North", 13:"Redeye River", 27:"Redwood River", 83:"Rock River", 43:"Root River", 71:"Roseau River", 21:"Rum River", 61:"Sandhill River", 16:"Sauk River", 49:"Shell Rock River", 68:"Snake River (Red River)", 36:"Snake River (St. Croix)", 19:"South Fork Crow R", 37:"St. Croix R-Stillwtr", 34:"St. Croix R-Upper", 3:"St. Louis River", 69:"Tamarac River", 65:"Thief River", 70:"Two Rivers", 46:"Upper Iowa River", 62:"Upper/Lower Red Lake", 73:"Vermilion River", 51:"W Fork Des Moines-Head", 52:"W Fork Des Moines-Lower", 47:"Wapsipinican River", 31:"Watonwan River", 60:"Wild Rice River", 50:"Winnebago River", 41:"Zumbro River"};


function maskLoadChecker(){
    var B=[], G=['ctmntFL','upMaskFL','dnMaskFL','MajorMaskFL','BsnMaskFL','upPolyFL','dnPolyFL'];
    for (var i=0; i<G.length; i++){
        a= DSS_objectives[G[i]].showing;
      if(a===false){B.push(a)}
    }  
    if (B.length ===0){
        return true
    }
}
