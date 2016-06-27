function respond(j, n, r, timeStampIn) {
  // $('.popover').hide()
  e = healthScoreIndex[j]
  try {
        removeFirstLayer(j,e)
    } catch (i) {}
    $("#legend").show();
    $('#indexTitle_slider').show()
    
    $("#" + r).addClass("btn-info");
    title2HTML = "<h4><strong>" + n + "</strong></h4>";
    var s = "Index: " + n;
    $("#drop2").text(s);
    try {
        $("#displayIndexTitle").text(n)
    } catch (i) {}
    t = "<strong>Watershed: ${MAJNAME} " + n + " Score: ${" + e + "}</strong>"

    if(timeStampIn !== true){
        timeStampIndex(j)
    }

    indRelatedTabToggle('on')
    // $('#flipButtL2').removeClass('disabled').addClass('btn-info').prop('title', 'Include only layers associated with selected health score index')
}

function changeScoreOpacity(e) {
        WHAFapp.currentMapParams.indOp = e / 100; 
        try {
            majors.setOpacity(0 + WHAFapp.currentMapParams.indOp);
            if (dojo.isIE <= 8) {
                majors.refresh()
            }
        } catch (t) {}
        $("img#legend_bar").css({
            opacity: WHAFapp.currentMapParams.indOp
        })
}

// Creates the layer that shows an index score. Changing score changes property of the object, does not remove the layer object.
function setIndexLayer(e) {
    var t;
    require(["esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ImageParameters"],
    function(ArcGISDynamicMapServiceLayer,ImageParameters){
        imageParameters = new ImageParameters;
        imageParameters.layerIds = [e];
        imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
        majors = new ArcGISDynamicMapServiceLayer(assessmentURL, {
            imageParameters: imageParameters
        });
        majors.setOpacity(0 + WHAFapp.currentMapParams.indOp);
        majors.indexIdentifier='WHAFscore';
        scoreLayerID = majors.id;
        try{t= map.layerIds.indexOf(hillShadeLayerServed.id)}catch(e){t=false}    
        try {
            if(t>0){
                map.addLayer(majors, t+1);
            } else{
                map.addLayer(majors);
            }            
            var t = map.getLayersVisibleAtScale(map.getScale());
            var n = t.length
        } catch (r) {
            console.log("error loading majors layer " + r + ".")
        }
        try {
            reorderByList();
        } catch (r) {};
    });
}

function removeFirstLayer(j,e){
    WHAFapp.currentMapParams.indexLayer = j;
    $('.scoreButton').children().removeClass( "btn-info" );
    majors.setVisibleLayers([e]);
    indRelatedTabToggle('off')
    // $('#flipButtL2').addClass('disabled').removeClass('btn-info').prop('title','Available when an index is displayed')

    lyrListToggler()
}

function changeOpacity(op) {
    WHAFapp.currentMapParams.indOp = (op / 100);
    try {
        majors.setOpacity(0 + WHAFapp.currentMapParams.indOp);
        if (dojo.isIE <= 8) {
            majors.refresh();
        }
    } catch(err){};

    $('img#legend_bar')
        .css({
        'opacity': WHAFapp.currentMapParams.indOp
    });
}

// function preLyrListToggler(element){
//     if ($(element).hasClass('disabled')===false){
//         $('.addLayerBox').hide();$('#addLayerBox5').show()
//         lyrListToggler(element)
//     }
// }

function lyrListToggler(){//toggles and updates button to add index related features, based on currently displaying index
    var k = $('#adHocLayerListUl li');
    
    if (WHAFapp.currentMapParams.indexLayer && WHAFapp.currentMapParams.indexLayer !== undefined){
        try{setIndNameInPlace()}catch(err){}
        var key=WHAFapp.currentMapParams.indexLayer[0].toLowerCase()

        var list = getRelList()
        var nameList=[]
        for (var i=0; i<list.length; i++){
            try{nameList.push( availableAuxFeatures[list[i]][0])}catch(err){}
        }

        for (var i=0;i<k.length; i++){
            var t=$(k[i]).text();
            if (nameList.indexOf(t)===-1){
                $(k[i]).hide()
            }
        } 

        t=$('#adHocLayerListUl').html();
        $('#adHocLayerListUl2').html(t); 
        for (var i=0;i<k.length; i++){
            var t=$(k[i]).text();
            $(k[i]).show();
        }        
    }
}

function getRelList(){//gets 'related features' list from indexdescNewJson object based on currently displaying index 
  var n=WHAFapp.currentMapParams.indexLayer,H;
  for (f in indexdescNewJson){

    if(indexdescNewJson[f].catchmentId===n){
      H=indexdescNewJson[f].relatedFeatures
    } else if (indexdescNewJson[f].watershedId===n){
      H=indexdescNewJson[f].relatedFeatures
    }
    else if(indexdescNewJson[f].metrics){
      g=indexdescNewJson[f].metrics;
      for (var i=0;i<g.length; i++){
        if(g[i].catchmentId === n){
          H=g[i].relatedFeatures;
        }
      }
    }
  }
  return H
}

function setIndNameInPlace(){//Sets index name in 'index related layers' box based on currently displaying index 
  var n=WHAFapp.currentMapParams.indexLayer;
  console.log(n)
  for (f in indexdescNewJson){

    if(indexdescNewJson[f].catchmentId===n){
      $('#indexTitleForLyrs').html("Layers related to <strong>"+indexdescNewJson[f].name+"</strong>")
    } else if (indexdescNewJson[f].watershedId===n){
      $('#indexTitleForLyrs').html("Layers related to <strong>"+indexdescNewJson[f].name+"</strong>")
    }
    else if(indexdescNewJson[f].metrics){
      g=indexdescNewJson[f].metrics;
      for (var i=0;i<g.length; i++){
        if(g[i].catchmentId === n){
         $('#indexTitleForLyrs').html("Layers related to <strong>"+g[i].name+"</strong>") 
        }
      }
    }

  }

}


function lyrListToggler2(el){//Manually show index related features (from index popover)
    console.log(el)
    var t,k = $('#adHocLayerListUl li');   
    setIndNameInPlace2(el)
    showSome();    
    $('#adHocLayerListUl li').show();
    $('.popover ').hide();

    function showSome(){
        var list = getRelList2(el)
        var nameList=[]
        for (var i=0; i<list.length; i++){
            try{nameList.push( availableAuxFeatures[list[i]][0])}catch(err){}
        }

        for (var i=0;i<k.length; i++){
            var t=$(k[i]).text();
            if (nameList.indexOf(t)===-1){
                $(k[i]).hide()
            }
        } 
        t=$('#adHocLayerListUl').html();
        $('#adHocLayerListUl2').html(t); 
    }
    $('#menuPlace, #printPlace').hide();$('#featuresPlace').show();
    $('#layersModal').fadeIn();
    $('.addLayerBox').hide();$('#indRelatedTab a').click();
}

function getRelList2(n){
  var H;
  console.log(n)
  if (indexdescNewJson[n]){
    indRelatedTabToggle('on');
    H=indexdescNewJson[n].relatedFeatures;
  }
  else{
    for (f in indexdescNewJson){
      if(indexdescNewJson[f].metrics){
        g=indexdescNewJson[f].metrics;
        for (var i=0;i<g.length; i++){
          if(g[i].fieldName === n){
            indRelatedTabToggle('on');
            H=g[i].relatedFeatures
          }
        }
      }

    }
  }
  return H
}

function setIndNameInPlace2(n){
  console.log(n)
  if (indexdescNewJson[n]){
    indRelatedTabToggle('on')
    $('#indexTitleForLyrs').html("Layers related to <strong>"+indexdescNewJson[n].name+"</strong>")
    console.log(indexdescNewJson[n].name)
  }

  else{
    for (f in indexdescNewJson){

      if(indexdescNewJson[f].metrics){
        g=indexdescNewJson[f].metrics;
        for (var i=0;i<g.length; i++){
          if(g[i].fieldName === n){
           indRelatedTabToggle('on')
           $('#indexTitleForLyrs').html("Layers related to <strong>"+g[i].name+"</strong>") 
          }
        }
      }

    }
  }
}


var relatedFeatures={//deprecated but may still be useful: index related layers per component (prelim list) 
  "h":[1.18,1.22,1.25,1.251,1.252,1.315,1.32,1.40,1.41,1.42,1.451,1.46,1.48,1.49,1.50],
  "g":[1.48,1.49,1.50,1.51,1.53,1.54,1.55,1.56,1.76,1.77],
  "b":[1.311,1.312,1.314,1.34,1.35,1.36,1.37,1.38,1.39,1.391],
  "c":[1.22,,1.25,1.251,1.252,1.26,1.28,1.29,1.30,1.31,1.314,1.34,1.45,1.451,1.46,1.51,1.61,1.62,1.70,1.71,1.72,1.74],
  "w":[1.18,1.20,1.22,1.40,1.41,1.42,,1.43,1.44,1.47,1.52,1.57,1.58,1.59,1.60]
}

healthScoreIndex = {
    "Overall Average (major)" : 1,
    "Overall Minimum (major)" : 2,
    "Hyd - Mean Score (major)" : 3,
    "Hyd - Minimum Score (major)" : 4,
    "Hyd Index - Perennial Cover, 2011 (major)" : 5,
    "Hyd Index - Perennial Cover, 2006 (major)" : 6,
    "Hyd Index - Perennial Cover, 2001 (major)" : 7,
    "Hyd Index - Impervious Cover, 2011 (major)" : 8,
    "Hyd Index - Impervious Cover, 2006 (major)" : 9,
    "Hyd Index - Impervious Cover, 2001 (major)" : 10,
    "Hyd Index - Water Withdrawal (major)" : 11,
    "Hyd Index - Loss of Hydrologic Storage (major)" : 12,
    "Hyd Metric - Loss of Hydrologic Storage, Wetland Loss (major)" : 13,
    "Hyd Metric - Loss of Hydrologic Storage, Altered Watercourse (major)" : 14,
    "Hyd Index - Flow Variability (major)" : 15,
    "Geo - Mean Score (major)" : 16,
    "Geo - Minimum Score (major)" : 17,
    "Geo Index - Soil Erosion Potential (major)" : 18,
    "Geo Index - Groundwater Contamination Susceptibility (major)" : 19,
    "Geo Index - Climate Vulnerability (major)" : 20,
    "Bio - Mean Score (major)" : 21,
    "Bio - Minimum Score (major)" : 22,
    "Bio Index - Terrestrial Habitat Quality (major)" : 23,
    "Bio Index - Stream Species Quality (major)" : 24,
    "Bio Metric - Stream Species Quality, Fish IBI (major)" : 25,
    "Bio Metric - Stream Species Quality, Invertebrate IBI (major)" : 26,
    "Bio Metric - Stream Species Quality, Mussel Score IBI (major)" : 27,
    "Bio Index - Animal Species Richness (major)" : 28,
    "Bio Index - At Risk Species Richness (major)" : 29,
    "Con - Mean Score (major)" : 30,
    "Con - Minnimum Score (major)" : 31,
    "Con Index - Terrestrial Habitat Connectivity (major)" : 32,
    "Con Index - Aquatic Connectivity (major)" : 33,
    "Con Index - Riparian Connectivity (major)" : 34,
    "WQ - Mean Score (major)" : 35,
    "WQ - Minnimum Score (major)" : 36,
    "WQ Index - Non-Point Source (major)" : 37,
    "WQ Metric - Non-Point Source, Phosphorus Risk (major)" : 38,
    "WQ Index - Localized Pollution Sources (major)" : 39,
    "WQ Index - Water Quality Assessments (major)" : 40,
    "WQ Index - Water Quality Assessments, Aquatic Life (major)" : 41,
    "WQ Index - Water Quality Assessments, Aquatic Recreation (major)" : 42,
    "WQ Index - Water Quality Assessments, Aquatic Consumption (major)" : 43,
    "Hyd Index - Perennial Cover, 2011" : 45,
    "Hyd Index - Perennial Cover, 2006" : 46,
    "Hyd Index - Perennial Cover, 2001" : 47,
    "Hyd Index - Impervious Cover, 2011" : 48,
    "Hyd Index - Impervious Cover, 2006" : 49,
    "Hyd Index - Impervious Cover, 2001" : 50,
    "Hyd Index - Water Withdrawal" : 51,
    "Hyd Index - Water Withdrawal, Predicted Vulnerability" : 52,
    "Hyd Index - Loss of Hydrologic Storage" : 53,
    "Hyd Metric - Loss of Hydrologic Storage, Wetland Loss" : 54,
    "Hyd Metric - Loss of Hydrologic Storage, Altered Watercourse" : 55,
    "Geo Index - Soil Erosion Potential" : 56,
    "Bio Index - Terrestrial Habitat Quality" : 57,
    "Bio Metric - Mussel Score Extrapolated": [58, 59, 60],
    "Bio Metric - Mussel Score" : 60,
    "Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI Extrapolated": [63, 61, 62],
    "Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI" : 63,
    "Bio Metric - Stream Species Quality, Fish IBI Extrapolated": [66, 64, 65],
    "Bio Metric - Stream Species Quality, Fish IBI" : 66,
    "Con Index - Aquatic Connectivity" : 67,
    "Con Index - Riparian Connectivity" : 68,
    "WQ Index - Localized Pollution Sources" : 69,
    "WQ Metric - Localized Pollution Sources, Animal Units" : 70,
    "WQ Metric - Localized Pollution Sources, Potential Contaminants" : 71,
    "WQ Metric - Localized Pollution Sources, Septic Systems" : 72,
    "WQ Metric - Localized Pollution Sources, Wastewater Treatment Plants" : 73,
    "WQ Metric - Localized Pollution Sources, Superfund Sites" : 74,
    "WQ Metric - Localized Pollution Sources, Open Pit Mines" : 75,
    "WQ Metric - Non-Point Source, Phosphorus Risk" : 76,
    "WQ Index - Water Quality Assessments, Aquatic Life" : 77,
    "WQ Index - Water Quality Assessments, Aquatic Recreation" : 78,
    "WQ Index - Water Quality Assessments, Aquatic Consumption" : 79
}

oldHealthScoreIndex = {
    1: "Overall Average (major)",
    2: "Overall Minimum (major)",
    3: "Hyd - Mean Score (major)",
    4: "Hyd - Minimum Score (major)",
    5: "Hyd Index - Perennial Cover, 2011 (major)",
    6: "Hyd Index - Impervious Cover, 2011 (major)",
    7: "Hyd Index - Water Withdrawal (major)",
    8: "Hyd Index - Loss of Hydrologic Storage (major)",
    9: "Hyd Index - Flow Variability (major)",
    10: "Geo - Mean Score (major)",
    12: "Geo Index - Soil Erosion Potential (major)",
    13: "Geo Index - Groundwater Contamination Susceptibility (major)",
    14: "Geo Index - Climate Vulnerability (major)",
    15: "Bio - Mean Score (major)",
    17: "Bio Index - Terrestrial Habitat Quality (major)",
    18: "Bio Index - Stream Species Quality (major)",
    19: "Bio Index - Animal Species Richness (major)",
    20: "Bio Index - At Risk Species Richness (major)",
    21: "Con - Mean Score (major)",
    23: "Con Index - Terrestrial Habitat Connectivity (major)",
    24: "Con Index - Aquatic Connectivity (major)",
    25: "Con Index - Riparian Connectivity (major)",
    26: "WQ - Mean Score (major)",
    28: "WQ Index - Non-Point Source (major)",
    29: "WQ Index - Localized Pollution Sources (major)",
    30: "WQ Index - Water Quality Assessments (major)",
    31: "Hyd Index - Perennial Cover, 2011",
    49: "Hyd Index - Impervious Cover, 2011",
    35: "Hyd Index - Water Withdrawal",
    36: "Hyd Index - Water Withdrawal, Predicted Vulnerability",
    37: "Hyd Metric - Loss of Hydrologic Storage, Altered Watercourse",
    32: "Geo Index - Soil Erosion Potential",
    50: "Bio Index - Terrestrial Habitat Quality",
    46: "Bio Metric - Mussel Score Extrapolated Hightlight",
    48: "Bio Metric - Mussel Score Extrapolated",
    47: "Bio Metric - Mussel Score Non Extrapolated",
    41: "Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI Extrapolated Highlight",
    42: "Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI Extrapolated",
    43: "Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI Non Extrapolated",
    38: "Bio Metric - Stream Species Quality, Fish IBI Extrapolated Highlight",
    39: "Bio Metric - Stream Species Quality, Fish IBI Extrapolated",
    40: "Bio Metric - Stream Species Quality, Fish IBI Non Extrapolated",
    33: "Con Index - Aquatic Connectivity",
    34: "Con Index - Riparian Connectivity",
    64: "WQ Index - Localized Pollution Sources",
    44: "WQ Metric - Localized Pollution Sources, Animal Units",
    59: "WQ Metric - Localized Pollution Sources, Potential Contaminants",
    63: "WQ Metric - Localized Pollution Sources, Septic Systems",
    61: "WQ Metric - Localized Pollution Sources, Wastewater Treatment Plants",
    60: "WQ Metric - Localized Pollution Sources, Superfund Sites",
    62: "WQ Metric - Localized Pollution Sources, Open Pit Mines"
}

indexdescNewJson={
    "H_S_MEAN": {
        "name": "Hydrology  Mean",
        "watershedId": "Hyd - Mean Score (major)",
        "catchmentId": "",
        "indexSummary": "Mean of Hydrology index scores",
        "shortDesc": "<h4>Hydrology</h4>Hydrology is the study of inter-relationships and interactions between water and its environment in the hydrological cycle. As water moves within a watershed, it carries sediment, chemicals, heat and biota. (Dunne and Leopold, 5). The movement of water in the hydrologic cycle drives the watershed system and affects all aspects of watershed health. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/component_score.html' target='_blank'>here</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"The Hydrology Component health score combines and averages five health scores that each capture different aspects of the hydrologic cycle.  Quantity of vegetation, amount of impervious surface, water consumption, loss of places that store water and deviation in stream flow patterns tell a story about the overall health of our hydrologic systems that store, use and distribute water.",
        "relatedFeatures":[1.77,1.13,1.25,1.251,1.252,1.26,1.27,1.48,1.49,1.50,1.52]
    },
    "H_S_PC": {
        "name": "Perennial Cover",
        "watershedId": "Hyd Index - Perennial Cover, 2011 (major)",
        "catchmentId": "Hyd Index - Perennial Cover, 2011",
        "indexSummary": "Percent of land with remaining perennial (year-round) vegetation",
        "shortDesc": "<h4>Perennial cover</h4>Perennial cover is permanent vegetation that covers the landscape year-round.  Permanent vegetation is removed from land when it is converted to cropland,  or developed for human use, such as roads, buildings and homes.  This index quanitifies the percent of the landscape that is covered in perennial vegetation as measured by the National Land Cover Database.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/perennial.html' target='_blank'>here.</a>",
        "sourceData": "NLCD",
        "sourceDataDate": "2001-2011",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures":"", 
        "why":"When permanent vegetation is removed it impacts the water cycle directly by removing water storage found in leaves, stems and roots; and eliminating the evapotranspiration of water vapor into the atmosphere.  This loss of storage causes water to leave the landscape and move downstream more quickly.  This effect is often compounded by the land use that replaces lost vegetation with annual row crops or hard surfaces like roads and buildings.",
        "relatedFeatures":[1.25,1.251,1.252]
    }, 
    "H_S_IC": {
        "name": "Impervious Cover",
        "watershedId": "Hyd Index - Impervious Cover, 2011 (major)",
        "catchmentId": "Hyd Index - Impervious Cover, 2011",
        "indexSummary": "Extent of impervious land area, where impervious area of 4% or greater scores 0",
        "shortDesc": "<h4>Impervious cover</h4>Impervious cover refers to hard surfaces that do not allow water to pass through into the soil (i.e. roads, buildings, parking lots).  Hard surfaces cause water to accumulate, carry impurities and fail to recharge groundwater.  This index looks at what percentage of a watershed is covered in hard surfaces.  Each small sub-watershed that is more than 4% impervious surface is considered impacted.  The percentage of impacted subwatersheds within a major watershed was used to create the index.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/impervious.html' target='_blank'>here.</a>",
        "sourceData": "NLCD",
        "sourceDataDate": "2001-2011",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"Impervious surfaces are hard surfaces that affect the water cycle by blocking water from soaking into the ground.  This results in more water flow on the surface that quickly reaches streams and lakes; and less water moving through the soil where contaminants can be filtered and groundwater replenished.",
        "relatedFeatures":[1.26]
    },
    "H_S_WW": {
        "name": "Water Withdrawal",
        "watershedId": "Hyd Index - Water Withdrawal (major)",
        "catchmentId": "Hyd Index - Water Withdrawal",
        "indexSummary": "Ratio of permitted water use to available surface water",
        "shortDesc": "<h4>Water Withdrawal</h4>Surface and ground water is removed by wells or pumps for human needs such as drinking, industrial uses and irrigation. Using water can reduce stream flows and lake levels, lower groundwater aquifers and impact water quality and water temperature. This index calculates the use of water in a given catchment and its upstream catchments as a percent of the surface water runoff.  Water use is measured as the total annual volume of water (surface and groundwater) reported as used  in the DNR's permits database for each catchment and its upstream catchments.  The amount used is then adjusted for consumptive use based on documented consumptive use coefficients.  Surface water runoff is measured as the mean annual discharge for a catchment and its upstream catchments. Mean annual discharge is estimated using observed annual precipitation and predicted annual runoff coefficients.  Scores are based on a mean of the last 5 years for which data exists. Scores are inversely related to the 'water use vulnerability index', i.e. water use as percent of runoff. A score of 100 is given to catchments with 0 water use, and a score of 0 is given to catchments where average water use exceeds runoff. Watersheds scores represent the mean score of all catchments inside them. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/waterwithdraw.html' target='_blank'>here.</a>",
        "sourceData": "2011",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"The removal of water for human use can reduce stream flows and lake levels, lowers groundwater aquifers and impact water quality and water temperature.  Sustainable quantity and quality of groundwater is essential for safe drinking water in the future.",
        "relatedFeatures":[1.52],
        "metrics": [{
            "name": "Predicted Vulnerability",
            "watershedId": "",
            "catchmentId": "Hyd Index - Water Withdrawal, Predicted Vulnerability",
            "indexSummary": "Predicted (five years) ratio of permitted water use/available surface water",
            "shortDesc": "<h4>Water Withdrawal (predicted)</h4>The trend during the last five years in reported use as a percentage of runoff is projected out five years.  Each catchment is scored in s similar fashion as in the water withdrawal index, but on the basis of a five year future projection. While this prediction is inexact, it can be used to identify emerging problem areas in terms of water use. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/waterwithdraw.html' target='_blank'>here.</a>",
            "sourceData": "2011",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"h_i_ww_pv",
            "relatedFeatures":[1.52],
            "why":"While this prediction is inexact, water use trends can be used to identify emerging problem areas in terms of water use and water supply."
        }]
    },
    "H_S_HS": {
        "name": "Hydrologic Storage",
        "watershedId": "Hyd Index - Loss of Hydrologic Storage (major)",
        "catchmentId": "Hyd Index - Loss of Hydrologic Storage",
        "indexSummary": "Loss of wetland surface features, and percent of altered streams",
        "shortDesc": "<h4>Hydrologic Storage</h4>Hydrologic storage refers to  places on the landscape that provide either temporary or permanent water storage.  Examples include lakes, rivers, permanent or seasonal wetlands, and floodplains.  The Hydrologic Storage Index compares the extent of historic wetland features, estimated from soil characteristics, to the extent of current wetland features; and the ratio of natural stream length to channelized stream length for each watershed.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/storage.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "Catchment level scores are available for some of the metrics of this index, and more are under development",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.13,1.48,1.49,1.50],
        "why":"The loss of places that store water means precipitation leaves the landscape more quickly.  This can lead to higher flows during rain events and less stored water during times of drought.  Draining wetlands and straightening streams eliminates important and productive habitats, and reduces plant and animal biodiversity.",
        "metrics": [{
            "name": "Altered Watercourse",
            "watershedId": "Hyd Metric - Loss of Hydrologic Storage, Altered Watercourse (major)",
            "catchmentId": "Hyd Metric - Loss of Hydrologic Storage, Altered Watercourse",
            "indexSummary": "Percent of straightened streams",
            "shortDesc": "<h4>Natural/Altered Watercourse Ratio </h4> This index represents the extent to which natural streams were straightened by human activity, thereby reducing the hydrologic storage of the land.  It is based on the altered watercourses dataset and refers to the length of stream segments that were altered in relation to the length of those that meander naturally.  This index does not represent data on the volume of water stored in these streams.  The score, 0-100, represents the percent of stream length that remains unaltered.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/storage.html' target='_blank'>here.</a>",
            "sourceData": "Altered Watercourse Project",
            "sourceDataDate": "2012",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"h_m_lhs_aw",
            "relatedFeatures":[1.13],
            "why":"Streams are altered to move water more quickly off the land.  Some stream alteration replaces miles of meanders with short, straight stream segments.  Straightened streams have excess energy that creates both headcuts and downstream erosion.   Some stream alteration adds miles of ditches to drain wetlands and bogs for other uses",
        }, {
            "name": "Wetland Loss",
            "watershedId": "Hyd Metric - Loss of Hydrologic Storage, Wetland Loss (major)",
            "catchmentId": "Hyd Metric - Loss of Hydrologic Storage, Wetland Loss",
            "indexSummary": "Loss of wetland surface features, normalized to total watershed area",
            "shortDesc": "<h4>Wetland Loss </h4> This index represents the proportion of the watershed that has been drained and converted out of wetland coverage.  Wetland drainage reduces the upland hydrologic storage capacity and increases rate and magnitude that stream flow after rainfall events.  Less wetland area leads to a greater delivery of contaminants to streams and lakes, and a destabilization of streams and streambanks.  Pre-European settlement wetland coverage is estimated from the proportion of soils that are classified as 'Hydric', current wetland coverage is calculated from the National Wetland Inventory.  A score of 100 means that there has been no net loss of wetlands, a score of 50 means that 50 percent of the watershed area has been converted to non-wetland land uses.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/storage.html' target='_blank'>here.</a>",
            "sourceData": "SSURGO/STATSGO Soils Database, National Wetland Inventory",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"h_m_lhs_wl",
            "relatedFeatures":[1.48,1.49,1.50],
            "why":"Wetland drainage reduces the upland water storage. This increases the rate and magnitude of stream flow after rainfall events, leads to a greater delivery of contaminants to streams and lakes, and destabilizes streams and streambanks"
        }]
    },
    "H_S_FV": {
        "name": "Flow Variability",
        "watershedId": "Hyd Index - Flow Variability (major)",
        "catchmentId": "",
        "indexSummary": "Deviation of stream flow pattern from expected",
        "shortDesc": "<h4>Flow Variability</h4>Water flow rates and variability are basic characteristics of any aquatic system.   The flow regime is the main driver of watershed ecology and can be described by five ecologically important characteristics (Poff et al. 1997).  The Flow Variability Index uses stream gage data to compare the flow characteristics  in each watershed or group of watersheds to an expected flow regime.  A statistical analysis of deviation from expected flow patterns was used to rank and score flow variability.   For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/flowvariability.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.77,1.13,1.25,1.251,1.252,1.27],
        "why":"Stream flow patterns  that deviate from expected rates are responding to alterations that change the water cycle.  Annual, monthly and daily patterns of flow are responses to different types of alteration.  Water cycle imbalances lead to instability in the stream channel, erosion challenges and water supply challenges"
    },
    "G_S_MEAN": {
        "name": "Geomorphology Mean",
        "watershedId": "Geo - Mean Score (major)",
        "catchmentId": "",
        "indexSummary": "Mean of Geomorphology index scores",
        "shortDesc": "<h4>Geomorphology</h4>Geomorphology is the study of landforms; from their origin and evolution to the processes that continue to shape them.  Geomorphologists seek to understand landform history and dynamics, and predict future changes through a combination of field observation, physical experiments, and modeling.For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/geomorphology/component_score.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.76,1.77,1.57,1.58,1.69],
        "why":""
    },
    "G_S_SES": {
        "name": "Soil Erosion Potential",
        "watershedId": "Geo Index - Soil Erosion Potential (major)",
        "catchmentId": "Geo Index - Soil Erosion Potential",
        "indexSummary": "Percent of land area in erodible soil type, scaled by slope",
        "shortDesc": "<h4>Soil Erosion Potential</h4>Soil erosion is the loss of surface material due to water, wind or other natural forces.  Different soil types are more or less erodable due to attributes like  particle size and parent material.  The Soil Erodibility Index calculates the amount of soil present in each watershed classified as an 'erodable' soil type, weighted by the steepness of the slope on which it is found.  The index reflects only soil properties and not the land use or land cover in the watershed.For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/geomorphology/soil_erodibilty.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"Erodible soils on steep slopes are likely to be mobilized, particularly if they are left bare.  Knowing where there is a high level of risk of mobilizing soil can inform other land use choices."
    },
    "G_S_GCS": {
        "name": "Groundwater Contamination Susceptibility",
        "watershedId": "Geo Index - Groundwater Contamination Susceptibility (major)",
        "catchmentId": "",
        "indexSummary": "Area weighted risk for Groundwater Contamination",
        "shortDesc": "<h4>Groundwater Contamination Susceptibility</h4>The susceptibility of groundwater to contamination is the risk that waterborne surface contaminants will reach the groundwater.  This risk was modeled across Minnesota in 1989.  This model quantified the potential for groundwater contamination from surface sources based on data such as subsurface materials and structure, rate of groundwater recharge and soil type.  The Groundwater Contamination Index uses an area weighted summary of the contamination risk for each watershed.  A score of '0 means very high risk and a score of 100' indicates very little risk.For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/geomorphology/gw_contamination.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.57,1.58,1.69],
        "why":"Risk of contamination to groundwater informs other land use decisions that could impact water quality and drinking water supplies."
    },
    "G_S_CV": {
        "name": "Climate Vulnerability",
        "watershedId": "Geo Index - Climate Vulnerability (major)",
        "catchmentId": "",
        "indexSummary": "Deviation from balance of precipitation and evapotranspiration; moisture excess/deficit",
        "shortDesc": "<h4>Climate Vulnerability</h4>The Climate Vulnerability Index uses the balance of precipitation and evapotranspiration across Minnesota as a 'placeholder' indicator of vulnerability to climate change.  Based on 30 years of data, the trend shows a deficit of moisture in western Minnesota, particularly the northwest; and a surplus in the east, increasing toward the southeast.  More frequent extreme events and less predictable precipitation patterns may have greater impact in areas that already trend toward wet or dry conditions.  A more robust index of climate vulnerability is planned.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/geomorphology/climate.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.76,1.77],
        "why":"More frequent extreme events and less predictable precipitation patterns may have greater impact in areas that already trend toward wet or dry conditions."
    },
    "B_S_MEAN": {
        "name": "Biology Mean",
        "watershedId": "Bio - Mean Score (major)",
        "catchmentId": "",
        "indexSummary": "Mean of Biology index scores",
        "shortDesc": "<h4>Biology</h4>Biology is the study of life. The biological systems of a watershed encompass the plant and animal species that are present in the stream, the riparian lands, and the contributing watershed.  These living organisms interact to create a flow of materials and energy that provide numerous ecosystem services. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/component_score.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "relatedFeatures":[1.25,1.251,1.252,1.27,1.35,1.36,1.37,1.38,1.32,1.312,1.311,1.314],
            "fieldName":""
    },
    "B_S_THQ": {
        "name": "Terrestrial Habitat Quality",
        "watershedId": "Bio Index - Terrestrial Habitat Quality (major)",
        "catchmentId": "Bio Index - Terrestrial Habitat Quality",
        "indexSummary": "Percent of land area in high value habitat types",
        "shortDesc": "<h4>Terrestrial Habitat Quality</h4>The quality of terrestrial habitat is based on its size, configuration and cover type.  A computer model of wetland, grassland and forest habitat quality ranks the quality of the natural land cover in each watershed.  This index compares the amount of land that is high quality habitat to the amount of land that is low quality or unsuitable habitat.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/terr_habitat.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.314,1.25,1.251,1.252,1.27],
        "why":"Critical amounts of quality habitat are needed to support continued health of diverse plant and animal communities."
    },
    "B_S_SSQ": {
        "name": "Stream Species Quality",
        "watershedId": "Bio Index - Stream Species Quality (major)",
        "catchmentId": "",
        "indexSummary": "Count of fish, aquatic invertebrate and mussel species / expected count",
        "shortDesc": "<h4>Stream Species Quality</h4>The aquatic species found in streams are often indicators of the condition of the contributing landscape.  For the Stream Species Index, the number of fish and macroinvertebrate species found were compared to the number of species expected each at sampling location.  Freshwater mussel survey data was used to compare the number of species found alive with the number of species found only as dead shells.  These metrics were combined to create the Stream Species index. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/streamspc.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "Sub metrics for this index are available in catchment scale, and provide distinct view of ecological health for fish, aquatic invertebrate and mussel communities",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.35,1.36,1.37,1.38,1.314],
        "why":"The health of aquatic communities found in streams indicates the status of the local aquatic resource as well as reflecting the influence of the contributing landscape on stream health.",
        "metrics": [{
            "name": "Fish Index",
            "watershedId": "Bio Metric - Stream Species Quality, Fish IBI (major)",
            "catchmentId": "Bio Metric - Stream Species Quality, Fish IBI",
            "indexSummary": "Metric scores based on fish IBI (index of biotic integrity)",
            "shortDesc": "<h4>Fish Index (IBI based)</h4> This index is based on the fish IBI (Index of Biotic Integrity) published by the Minnesota Pollution Control Agency. IBI site scores were transformed to a 0-100 scale, whereby the threshold's score value determined by the PCA represents 50; site scores that are lower than the threshold value were transformed to a score between 0-50, while higher scores were transformed to a score between 50 and 100. Catchment scores represent an average of fish IBI scores in a given catchment. <br><br>Fish index scores were extrapolated to some catchments where IBI analysis was not carried out, if those were directly upstream or downstream from a catchment that has IBI sites. In those cases, scores from upstream and downstream catchments were averaged to provide extrapolated scores. Catchments with extrapolated scores are highlighted in the map when zooming in. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/streamspc.html' target='_blank'>here.</a>",
            "sourceData": "Fish IBI (PCA)",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"b_m_ssq_fi",
            "relatedFeatures":[1.35,1.36,1.37,1.38,1.314],
            "why":"The health of aquatic communities in streams reflects local conditions and the influence of the contributing landscape.  Fish community health may be more indicative of the larger landscape, given their mobility and longevity.  Aquatic macroinvertebrates are less mobile and more reflective of local habitat conditions.  Adult mussels are less mobile, but the larval stage is distributed by host fish so mussel communities reflect both local conditions and stream system health.   ‘Dead shell’ records add valuable indicators of species change over time."
        }, {
            "name": "Fish Index (extrapolated)",
            "watershedId": "",
            "catchmentId": ["Bio Metric - Stream Species Quality, Fish IBI", "Bio Metric - Stream Species Quality, Fish IBI Extrapolated", "Bio Metric - Stream Species Quality, Fish IBI Extrapolated Highlight"],
            "indexSummary": "Metric scores based on fish IBI (index of biotic integrity), extrapolated",
            "shortDesc": "<h4>Fish Index (IBI based)</h4> This index is based on the fish IBI (Index of Biotic Integrity) published by the Minnesota Pollution Control Agency. IBI site scores were transformed to a 0-100 scale, whereby the threshold's score value determined by the PCA represents 50; site scores that are lower than the threshold value were transformed to a score between 0-50, while higher scores were transformed to a score between 50 and 100. Catchment scores represent an average of fish IBI scores in a given catchment. <br><br>Fish index scores were extrapolated to some catchments where IBI analysis was not carried out, if those were directly upstream or downstream from a catchment that has IBI sites. In those cases, scores from upstream and downstream catchments were averaged to provide extrapolated scores. Catchments with extrapolated scores are highlighted in the map when zooming in. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/streamspc.html' target='_blank'>here.</a>",
            "sourceData": "Fish IBI (PCA)",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"b_m_ssq_fx",
            "relatedFeatures":[1.35,1.36,1.37,1.38,1.314],
            "why":"The health of aquatic communities in streams reflects local conditions and the influence of the contributing landscape.  Fish community health may be more indicative of the larger landscape, given their mobility and longevity.  Aquatic macroinvertebrates are less mobile and more reflective of local habitat conditions.  Adult mussels are less mobile, but the larval stage is distributed by host fish so mussel communities reflect both local conditions and stream system health.   ‘Dead shell’ records add valuable indicators of species change over time."
        }, {
            "name": "Invertebrate Index",
            "watershedId": "Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI (major)",
            "catchmentId": "Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI",
            "indexSummary": "Metric scores based on invertebrate IBI (index of biotic integrity)",
            "shortDesc": "<h4> Invertebrate Index (IBI based)</h4> This index is based on the Invertebrate IBI (Index of Biotic Integrity) published by the Minnesota Pollution Control Agency. IBI site scores were transformed to a 0-100 scale, whereby the threshold's score value determined by the PCA represents 50; site scores that are lower than the threshold value were transformed to a score between 0-50, while higher scores were transformed to a score between 50 and 100. Catchment scores represent an average of Invertebrate IBI scores in a given catchment. <br><br>Invertebrate index scores were extrapolated to some catchments where IBI analysis was not carried out, if those were directly upstream or downstream from a catchment that has IBI sites. In those cases, scores from upstream and downstream catchments were averaged to provide extrapolated scores. Catchments with extrapolated scores are highlighted in the map when zooming in. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/streamspc.html' target='_blank'>here.</a>",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"b_m_ssq_ii",
            "relatedFeatures":[1.35,1.36,1.37,1.38,1.314],
            "why":"The health of aquatic communities in streams reflects local conditions and the influence of the contributing landscape.  Fish community health may be more indicative of the larger landscape, given their mobility and longevity.  Aquatic macroinvertebrates are less mobile and more reflective of local habitat conditions.  Adult mussels are less mobile, but the larval stage is distributed by host fish so mussel communities reflect both local conditions and stream system health.   ‘Dead shell’ records add valuable indicators of species change over time."
        }, {
            "name": "Invertebrate Index (extrapolated)",
            "watershedId": "",
            "catchmentId": ["Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI", "Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI Extrapolated", "Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI Extrapolated Highlight"],
            "indexSummary": "Metric scores based on invertebrate IBI (index of biotic integrity)",
            "shortDesc": "<h4> Invertebrate Index (IBI based)</h4> This index is based on the Invertebrate IBI (Index of Biotic Integrity) published by the Minnesota Pollution Control Agency. IBI site scores were transformed to a 0-100 scale, whereby the threshold's score value determined by the PCA represents 50; site scores that are lower than the threshold value were transformed to a score between 0-50, while higher scores were transformed to a score between 50 and 100. Catchment scores represent an average of Invertebrate IBI scores in a given catchment. <br><br>Invertebrate index scores were extrapolated to some catchments where IBI analysis was not carried out, if those were directly upstream or downstream from a catchment that has IBI sites. In those cases, scores from upstream and downstream catchments were averaged to provide extrapolated scores. Catchments with extrapolated scores are highlighted in the map when zooming in. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/streamspc.html' target='_blank'>here.</a>",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"b_m_ssq_ix",
            "relatedFeatures":[1.35,1.36,1.37,1.38,1.314],
            "why":"The health of aquatic communities in streams reflects local conditions and the influence of the contributing landscape.  Fish community health may be more indicative of the larger landscape, given their mobility and longevity.  Aquatic macroinvertebrates are less mobile and more reflective of local habitat conditions.  Adult mussels are less mobile, but the larval stage is distributed by host fish so mussel communities reflect both local conditions and stream system health.   ‘Dead shell’ records add valuable indicators of species change over time."
        }, {
            "name": "Mussels Index",
            "watershedId": "Bio Metric - Mussel Score (major)",
            "catchmentId": "Bio Metric - Mussel Score",
            "indexSummary": "Metric scores based on Mussel Quality Survey",
            "shortDesc": "<h4>Mussel Quality Metric</h4>This metric is based on the results of the MN DNR statewide survey of mussels in Minnesota's major streams and rivers.  Each survey site has a site quality score that combines four underlying population measurements. These four measurements are scored on a 0-100 scale: count of live mussels per minute spent searching, recruitment (presence of juvenile mussels), percent sensitive mussel species, and percent of species present found live.  These four metrics are averaged together to create a mussel site quality score.  <br><br> Mussel catchment scores represent an average of the mussel site quality scores within that catchment. Mussel catchment scores were also extrapolated for catchments directly upstream or downstream from a catchment that has mussel survey sites. In those cases, scores from upstream and downstream catchments were averaged to provide extrapolated scores. Catchments with extrapolated scores are highlighted in the map when zooming in. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/streamspc.html' target='_blank'>here.</a>",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"b_m_ssq_ms",
            "relatedFeatures":[1.35,1.36,1.37,1.38,1.314],
            "why":"The health of aquatic communities in streams reflects local conditions and the influence of the contributing landscape.  Fish community health may be more indicative of the larger landscape, given their mobility and longevity.  Aquatic macroinvertebrates are less mobile and more reflective of local habitat conditions.  Adult mussels are less mobile, but the larval stage is distributed by host fish so mussel communities reflect both local conditions and stream system health.   ‘Dead shell’ records add valuable indicators of species change over time."
        }, {
            "name": "Mussels Index (extrapolated)",
            "watershedId": "",
            "catchmentId": ["Bio Metric - Mussel Score Non Extrapolated", "Bio Metric - Mussel Score Extrapolated", "Bio Metric - Mussel Score Extrapolated Hightlight"],
            "indexSummary": "Metric scores based on Mussel Quality Survey",
            "shortDesc": "<h4>Mussel Quality Metric</h4>This metric is based on the results of the MN DNR statewide survey of mussels in Minnesota's major streams and rivers.  Each survey site has a site quality score that combines four underlying population measurements. These four measurements are scored on a 0-100 scale: count of live mussels per minute spent searching, recruitment (presence of juvenile mussels), percent sensitive mussel species, and percent of species present found live.  These four metrics are averaged together to create a mussel site quality score.  <br><br> Mussel catchment scores represent an average of the mussel site quality scores within that catchment. Mussel catchment scores were also extrapolated for catchments directly upstream or downstream from a catchment that has mussel survey sites. In those cases, scores from upstream and downstream catchments were averaged to provide extrapolated scores. Catchments with extrapolated scores are highlighted in the map when zooming in. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/streamspc.html' target='_blank'>here.</a>",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"b_m_ssq_ms_EX",
            "relatedFeatures":[1.35,1.36,1.37,1.38,1.314],
            "why":"The health of aquatic communities in streams reflects local conditions and the influence of the contributing landscape.  Fish community health may be more indicative of the larger landscape, given their mobility and longevity.  Aquatic macroinvertebrates are less mobile and more reflective of local habitat conditions.  Adult mussels are less mobile, but the larval stage is distributed by host fish so mussel communities reflect both local conditions and stream system health.   ‘Dead shell’ records add valuable indicators of species change over time."
        }]
    },
    "B_S_SR": {
        "name": "Animal Species Richness",
        "watershedId": "Bio Index - Animal Species Richness (major)",
        "catchmentId": "",
        "indexSummary": "Rank by count of species (mussels, fish, aquatic invertebrate, birds)",
        "shortDesc": "<h4>Animal Species Richness</h4>Species richness is defined as the total number of different species found within a system, and refers only to the presence of a species but not its abundance.  The Animal Species Richness Index is based on the number of mussels, fish, aquatic invertebrate and bird species that have been found in each watershed.  The highest total number of species found in a watershed was used as the highest score (100) and most desirable condition.  The absence of all animal species is the lowest score (0) and least desirable condition. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/spc_rich.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.312,1.311,1.32,1.314],
        "why":"As a general condition, having a large number of different species within a system creates more resilience to stresses.  Some individual animal communities are healthies with low diversity, but at a watershed scale, overall animal species richness contributes to health and resilience."
    },
    "B_S_ARSR": {
        "name": "At-Risk Animal Spec. Richness",
        "watershedId": "Bio Index - At Risk Species Richness (major)",
        "catchmentId": "",
        "indexSummary": "Rank by count of at risk species (mussels, fish, birds)",
        "shortDesc": "<h4>At-Risk Animal Species Richness</h4>Species richness is defined as the total number of different species found within a system, and refers only to the presence of a species but not its abundance. The At-Risk Animal Species Richness Index is based on the number of mussels, fish, and bird species on Minnesota's Species of Greatest Conservation Need' (SGCN) list that have been found in each watershed.  The highest total number of at-risk animals species found in a watershed was used as the highest score (100) and most desirable condition.  The absence of at-risk animals species is the lowest score (0) and least desirable condition. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/at_risk.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.312,1.311,1.314],
        "why":"As a general condition, having a large number of different animal species within a system creates more resilience to stresses.  The richness of At-Risk Species indicates the presence of species in “greatest conservation need” and may reflect the presence of key habitats necessary to support them."
    },
    "C_S_MEAN": {
        "name": "Connectivity Mean",
        "watershedId": "Con - Mean Score (major)",
        "catchmentId": "",
        "indexSummary": "Mean of Connectivity index scores",
        "shortDesc": "<h4>Connectivity</h4>Connectivity is defined as the maintenance of lateral, longitudinal, and vertical pathways for biological, hydrological, and physical processes (Annear, 2004). It refers to the flow, exchange, and pathways that move organisms, energy, and matter throughout the watershed.For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/connectivity/component_score.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.45,1.46,1.314,1.25,1.251,1.252,1.27,1.11,1.51,1.34],
        "why":""
    },
    "C_S_THC": {
        "name": "Terrestrial Habitat Connectivity",
        "watershedId": "Con Index - Terrestrial Habitat Connectivity (major)",
        "catchmentId": "",
        "indexSummary": "Land area in quality habitat and their potential connectors",
        "shortDesc": "<h4>Terrestrial Habitat Connectivity</h4>The connections between patches of terrestrial habitat add value to the habitat and allow energy and organisms to move across the landscape.  The Terrestrial Habitat Connectivity Index uses a computer model to rank the ability for organisms to move from one habitat patch to another based on the land cover type.  A highway is difficult to cross, a prairie is not.  The amount of land area that provides habitat and habitat connections is compared to the land area that is not suitable habitat.For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/connectivity/terrestrial_conn.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.34,1.314,1.25,1.251,1.252,1.27],
        "why":"Patches of habitat that together create a mosaic across a landscape provide essential connections for travel corridors, places of refuge, and seasonal access to breeding and nesting grounds."
    },
    "C_S_AC": {
        "name": "Aquatic Connectivity",
        "watershedId": "Con Index - Aquatic Connectivity (major)",
        "catchmentId": "Con Index - Aquatic Connectivity",
        "indexSummary": "Density of structures per river mile (bridges, culverts, dams)",
        "shortDesc": "<h4>Aquatic Connectivity</h4>Man-made structures can limit the ability of water, organisms and energy to flow through aquatic systems.  The Aquatic Connectivity Index is based on the density of culverts, bridges and dams in each watershed.  The higher the density of structures limiting the free flow of water, the lower the Aquatic Connectivity score. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/connectivity/aquatic_conn.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.45,1.46],
        "why":"Structures on streams can disconnect stream segments, block fish passage, alter meander patterns, change the slope and width of streams, trap water and sediment,  create upstream head-cuts and downstream erosion.  These changes degrade aquatic habitat and create instability in the stream system."
    },
    "C_S_RC": {
        "name": "Riparian Connectivity",
        "watershedId": "Con Index - Riparian Connectivity (major)",
        "catchmentId": "Con Index - Riparian Connectivity",
        "indexSummary": "Percent of riparian land that is not developed or cultivated",
        "shortDesc": "<h4>Riparian Connectivity</h4>'Riparian' refers to the land immediately adjacent to water features such as lakes and rivers.  Access to this area is important to aquatic and terrestrial species particularly during seasonal high flow or flood events.  Riparian lands are also  important year round as travel corridors and habitat connectors, often providing the only remaining natural land cover in developed landscapes.  The Riparian Connectivity Index compares the amount of cropped or developed land cover to the amount of open land in the riparian area. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/connectivity/riparian_conn.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.25,1.27,1.11,1.51,1.34],
        "why":"Access to the riparian area is important to aquatic and terrestrial species particularly during seasonal high flow or flood events.  Riparian lands are also important year round as travel corridors and habitat connectors, often providing the only remaining natural land cover in developed landscapes."
    },
    "W_S_MEAN": {
        "name": "Water Quality Mean",
        "watershedId": "WQ - Mean Score (major)",
        "catchmentId": "",
        "indexSummary": "Mean of Water Quality index scores",
        "shortDesc": "<h4>Water Quality</h4>Water quality is water's chemical character.  The chemical and physical characteristics of water reflect the geography, climate and land use practices in the surrounding area.  Changes in water quality occur from localized pollution sources, such as effluent from manufacturing plants; or non-point sources, such as nutrient and sediment from agricultural or urban land use.  The degree of impact also reflects the natural vulnerability of the water resource to potential contaminants. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/water_quality/component_score.html'  target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "relatedFeatures":[1.47,1.60,1.315,1.12,1.27,1.43,1.44],
        "fieldName":""
    },
    "W_S_NPS": {
        "name": "Non-Point Pollution Sources",
        "watershedId": "WQ Index - Non-Point Source (major)",
        "catchmentId": "",
        "indexSummary": "Combines 2 metrics:  Rate of chemical and nutrient application and percent impervious in riparian zone",
        "shortDesc": "<h4>Non-Point Source</h4>Distributed sources or potential sources of pollution to surface or groundwater that are not associated with a specific location are referred to as 'non-point sources'.  For example, stormwater runoff carrying contaminants from urban or rural landscapes would be a non-point source.  The Non-Point Source Index measures and combines two metrics:  the rate of chemical application to cropland and the amount of impervious surface in the riparian zone. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/water_quality/non_point.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "This index is under construction. Currently, the methods used to calculate the combined index score differ from the catchment scale metric. When analysis o",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.27,1.43,1.44,1.315],
        "why":"Nonpoint sources of pollution can move off the landscape into waterways which can contaminate drinking water and degrade aquatic communities.",
        "metrics": [{
            "name": "Upland Phosphorus", 
            "watershedID": "WQ Metric - Non-Point Source, Phosphorus Risk (major)",
            "catchmentID": "WQ Metric - Non-Point Source, Phosphorus Risk",
            "indexSummary": "Phosphorus Risk from Upland Sources",
            "shortDesc": "<h4>Upland Phosphorus Metric</h4>Phosphorus is often the limiting nutrient in aquatic systems, as a pollutant phosphorus has a significant potential to offset the natural balance in a system. Increased phosphorus levels can lead to algae blooms in surface waters which can further alter the chemical and physical properties of these waters. This metric models the risk of phosphorus mobilization based on three factors: land use, watershed slope, and soil erodibility. Scores range from 0 (most likely to mobilize phosphorus from uplands) to 100 (least likely to mobilize phosphorus from uplands).",
            "sourceData": "SSURGO Soils Database, LiDAR derived elevation, Crop Data Layer (land cover)",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_nps_pr",
            "relatedFeatures":[1.27,1.43,1.44,1.315],
            "why":"Phosphorus is an essential element for plant life, but the additional phosphorus added as fertilizer can be carried by rainfall into surface water and ground water.  Excess phosphorus levels can lead to algae blooms in surface waters which further alter the chemical and physical properties of these waters."
        }]
    },
    "W_S_PS": {
        "name": "Localized Pollution Sources",
        "watershedId": "WQ Index - Localized Pollution Sources (major)",
        "catchmentId": "WQ Index - Localized Pollution Sources",
        "indexSummary": "Density of localized pollution sources for six pollution source types per land area",
        "shortDesc": "<h4>Localized Pollution Sources</h4>For the Localized Pollution Sources Index, the density of different activities was calculated: animal feedlots, potential water contamination sources (MPCA database), superfund sites, wastewater treatment plants, open pit mines and septic systems (based on presence of a domestic well).  Each poollution source type can be examined for its potential impact by viewing the metric score below.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/water_quality/point.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "The term Localized Pollution Sources refers to a known contaminant risk location. Some of these sources do not discharge to surface water and do not meet the statutory section 502(14) 'point source' definition of the Clean Water Act.",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"",
        "relatedFeatures":[1.47,1.60,1.315],
        "metrics": [{
            "name": "Animal Units",
            "watershedId": "",
            "catchmentId": "WQ Metric - Localized Pollution Sources, Animal Units",
            "indexSummary": "Number of animal units in registered feedlots",
            "shortDesc": "<h4>Animal Units Metric</h4>Higher density of animals on the landscape creates a greater risk of contamination from animal waste.  This metric totals the number of animal units (in registered feedlots) in each catchment.   This value is divided by catchment land area to calculate AU/acre (1 AU = 1000 lb dairy cow equivalent).  Scores are scaled from 0 to 100, with a density of .75 AU/acre or greater = 0; no registered feedlots = 100 (September 2014 data).",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_ps_a",
            "relatedFeatures":[1.47,1.60,1.315],
            "why":"A high density of animals being raised in feedlots creates a greater risk of contamination from animal waste."
        }, {
            "name": "Potential contaminants",
            "watershedId": "",
            "catchmentId": "WQ Metric - Localized Pollution Sources, Potential Contaminants",
            "indexSummary": "Potential contaminant sites, representing a wide range of activity types, present within a catchment",
            "shortDesc": "<h4>Potential Contaminant Sites Metric</h4>Potential contaminants are identified from a database managed by the Minnesota Pollution Control Agency (October 2014 data).  The contaminate types include air pollution sources, hazardous waste producers and disposal sites, petroleum tanks, tank leak sites, solid waste dumps and landfills, contaminated sites that are under remediation, and storm water discharge sites.  The total number of sites is divided by catchment land area.   Scores range from 0 to 100, with a density of 1.87 points/km2 or greater = 0; no sites present = 100.",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_ps_pc",
            "relatedFeatures":[1.47,1.60,1.315],
            "why":"A high density of potential contaminant sites creates a greater risk of contamination from those varied contaminant sources."
        }, {
            "name": "Superfund Sites",
            "watershedId": "",
            "catchmentId": "WQ Metric - Localized Pollution Sources, Superfund Sites",
            "indexSummary": "Density of state and federally listed superfund sites",
            "shortDesc": "<h4>Superfund Sites Metric</h4>This metric uses a combination of federal and state listed superfund sites, including both active and inactive locations.  Total number of sites is divided by catchment land area.  Scores range from 0 to 90; with the 95th percentile density or greater = 0 and a maximum score of 90 if any superfund sites were present in a catchment; no sites present = 100.",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_ps_sf",
            "relatedFeatures":[1.47,1.60,1.315],
            "why":"A presence of superfund sites increases the risk of contamination from former activities at that location."
        }, {
            "name": "Wastewater Treatment Plants",
            "watershedId": "",
            "catchmentId": "WQ Metric - Localized Pollution Sources, Wastewater Treatment Plants",
            "indexSummary": "Nutrient loads discharged from wastewater treatment plants",
            "shortDesc": "<h4>Wastewater Treatment Plants Metric</h4>This metric measures phosphorus, nitrogen and carbonaceous biochemical oxygen demand (CBOD) discharge loads for WWTPs based on NPDES permit reports.  The quantity of the three effluents was summed for each catchment and a metric score was calculated for each of the three effluents. Where WWTPs were present, but no quantity was measured for that particular effluent, the catchment received no score.  The score for each effluent type was based on 0 = the 95th percentile of the load totals; remaining values scaled from 0-100.  A combined WWTP score was calculated by averaging the individual effluent scores together.",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_ps_wtp",
            "relatedFeatures":[1.47,1.60,1.315],
            "why":"Higher concentrations of phosphorus, nitrogen and CBOD in waste water creates a greater level of risk of contamination from those effluents."
        }, {
            "name": "Open Pit Mines",
            "watershedId": "",
            "catchmentId": "WQ Metric - Localized Pollution Sources, Open Pit Mines",
            "indexSummary": "Land disturbed by surface mining activities",
            "shortDesc": "<h4>Open Pit Mines Metric</h4>This metric quantifies the density of surface mines.  The majority of surface mines are heavily concentrated in the Mesabi iron range and data used for this index are only generated for that region. Other surface mining occurs throughout the state including aggregate mines/rock quarries and silica sand mines.  These have different impacts and are not represented in this index.   The index score is based on the amount of land area within a catchment disturbed by mining activity.  Scores range from 0 to 100, with 15% or greater disturbance of land area = 0; no mines present = 100.",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_ps_opm",
            "relatedFeatures":[1.47,1.60,1.315],
            "why":"Open pit mines create a risk of contamination from mineral extraction activities that can create acid mine drainage, airborne mercury, and sulfate leeching."
        }, {
            "name": "Septic Systems",
            "watershedId": "",
            "catchmentId": "WQ Metric - Localized Pollution Sources, Septic Systems",
            "indexSummary": "Density of domestic septic systems",
            "shortDesc": "<h4>Septic Systems Metric</h4>The domestic wells listed in the County Well Index (CWI) were used to approximate septic system location.  Given these data assumptions and lack of historic records, this metric provides a conservative estimate of actual septic system density. The metric score is based on well density per square km of land area in a catchment.  Scores range from 0 to 100, with a density of 15.587 wells/km2 or greater = 0; no wells present = 100.",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_ps_ss",
            "relatedFeatures":[1.47,1.60,1.315],
            "why":"A high density of households with individual water and sewer services increases the risk of septic system failure.  Untreated effluent can carry human disease, nutrients and bacteria into groundwater and contaminate well water, or reach nearby streams or water bodies."
        }]
    },
    "W_S_WQA": {
        "name": "Assessments",
        "watershedId": "WQ Index - Water Quality Assessments (major)",
        "catchmentId": "",
        "indexSummary": "Percent of assessed water bodies found to be impaired",
        "shortDesc": "<h4>Water Quality Assessments</h4>Water quality assessments are done by the Minnesota Pollution Control Agency to determine if the water of lakes, reservoirs and streams meet the standards set in the federal Clean Water Act.  Three designated uses are evaluated:  aquatic consumption, aquatic recreation and aquatic life.  The Water Quality Assessment Index compares and ranks the percentage of water bodies evaluated and found to be impaired in each watershed.   For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/water_quality/assessment.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "This index is currently under development and will be updated soon",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "relatedFeatures":[1.12, 1.35, 1.36, 1.37, 1.38],
        "why":"The number of water bodies assessed and found to be impaired for different human uses shows where surface water systems are being impacted by the different water quality risks factors.",
        "metrics": [{
            "name": "Aquatic Life",
            "watershedId": "",
            "catchmentId": "WQ Metric - Water Quality Assessments, Aquatic Life",
            "indexSummary": "The ability of surface waters to support aquatic life",
            "shortDesc": "<h4>Aquatic Life Metric</h4>",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_wqa_al",
            "relatedFeatures":[1.12, 1.35, 1.36, 1.37, 1.38],
            "why":""
        }, {
            "name": "Aquatic Recreation",
            "watershedId": "",
            "catchmentId": "WQ Metric - Water Quality Assessments, Aquatic Recreation",
            "indexSummary": "The ability of surface waters to support aquatic recreation",
            "shortDesc": "<h4>Aquatic Recreation Metric</h4>",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_wqa_ar",
            "relatedFeatures":[1.12, 1.35, 1.36, 1.37, 1.38],
            "why":""
        }, {
            "name": "Aquatic Consumption",
            "watershedId": "",
            "catchmentId": "WQ Metric - Water Quality Assessments, Aquatic Consumption",
            "indexSummary": "The ability of surface waters to support aquatic consumption",
            "shortDesc": "<h4>Aquatic Consumption Metric</h4>",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_wqa_ac",
            "relatedFeatures":[1.12, 1.35, 1.36, 1.37, 1.38],
            "why":""
        }]
    },
    "A_S_MEAN": {
        "name": "Combined Mean Scores",
        "watershedId": "Overall Average (major)",
        "catchmentId": "",
        "indexSummary": "Combined mean scores (mean of means)",
        "shortDesc": "<h4>Combined Mean Scores</h4>Each watershed receives a mean (average) health ranking. The mean watershed health score is the mean of the 5 component scores calculated for that watershed. For more information, click <a href='http://www.dnr.state.mn.us/whaf/scores/combined/index.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":""
    },
    "A_S_MIN": {
        "name": "Lowest Index Scores",
        "watershedId": "Overall Minimum (major)",
        "catchmentId": "",
        "indexSummary": "Lowest score of all indices for each major watershed",
        "shortDesc": "<h4>Lowest Index Scores</h4>Each watershed receives a minimum health ranking. The minimum watershed health score is the lowest health index score received when comparing all of the health index values for that watershed. For more information, click <a href='http://www.dnr.state.mn.us/whaf/scores/combined/index.html ' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":""
    }
}