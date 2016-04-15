function buttonGrayer(e, t) {
    if (t == "out") {
        $("#" + e).css("opacity", "0.5")
    } else if (t == "in") {
        $("#" + e).css("opacity", "1")
    }
}

function auxFeaturegrayer() {
    function e(e) {
        this.minScale = e
    }
    auxFeatObject["NLCD_2006_Land_Cover"] = new e(2e6);
    auxFeatObject["NLCD_2006_Imperviousness"] = new e(25e5);
    auxFeatObject["FEMA_Q3"] = new e(25e5);
    auxFeatObject["Nat_Wetl_Inventory"] = new e(15e5);
    auxFeatObject["patches_and_connections"] = new e(25e5);
    auxFeatObject["Marschner"] = new e(2e6);
    auxFeatObject["SSURGO_K"] = new e(5e5);
    auxFeatObject["SSURGO_Drainage"] = new e(5e5);
    auxFeatObject["Feedlots"] = new e(25e5)
}

function getAppInfo(e) {
    refreshMapParams();
    $("#appInfoModal").show();
    var t = featureLayersDisplayed;
    var n = "";
    for (var r = 0; r < WHAFapp.currentMapParams.theseFeatures.length; r++) {
        var i = WHAFapp.currentMapParams.theseFeatures[r];
        n = n + "<strong> Layer ID: </strong>" + i.id + "<br><strong> Title: </strong>" + i.title + " Identify? " + i.identify + "<br><br>"
    }
    $("#appInfo").html(n)
}

function updateTrigger(){//function invoked by map.update-end
    // try{//legendd.refresh()}catch(r){};
    try{serialSnapper()}catch(r){console.log("Tried updating")}
    if(WHAFapp.demikulu===''){//prevent refreshing params on demikulu loading of gallery
        try{refreshMapParams()}catch(r){};
    }
}

function getGeometryType(geom){

    alert("Note geopentry type")//check this function

    var geomType;
    switch (geom){

        case "point":
            geomType="esriGeometryPoint";
            break;

        case "polygon":
            geomType = esriGeometryPolygon

    }

return geomType;

}

function exportBookMarksToJson(){
    var t=[],g,o;
    g=allStorage()
    for (var u=0;u<g.length; u++){
      t.push(localStorage.getItem(g[u]))
    }
    o=JSON.stringify(t);
    return o;
}

function importBookMarksTricks(){
    var u=[], Y=$('#adHocPlaceHolde1').val(),y = $.parseJSON(Y)
    for (var v=0;v<y.length; v++){  
       var d = $.parseJSON( y[v] )
       u.push(d.name)
    }  
    u.sort().reverse();
    for (var i=0; i< u.length; i++){  
        var b = u[i]
        for (var v=0;v<y.length; v++){  
            var d = $.parseJSON( y[v] )
            if(d.name === b && b !== undefined){
                storeMapp(d)
            }
        }
    }

    function storeMapp(ff){
        var index = bMarkIndex();
        var item = ff.name
        var itemId = 'bMark_Map_'+index+'_'+item;
        var kk=JSON.stringify(ff);
        localStorage.setItem(itemId,kk);
        var te = '<li><a onclick="retrieveMap(\''+itemId+'\')" href="#" tabindex="-1"> <i class="bookiIcon icon-remove icon-white pull-right" onclick = "$(this).parent().remove(); localStorage.removeItem(\''+itemId+'\');" ></i>'+item+ '</a></li>'
        $('#bookMarkList').prepend(te);
    }
    $('#adHocMessage').hide();
}


function advMenuSetup(which){
  
  $('#adHocMessageTitle').text('');
  $('#bMarkGetReader').hide();
  $('#fileExporter').hide();
  $('#adHocPlaceHolde1').hide();
  $('#adHocPlaceHolde2').hide();
  $('#bMarkFileGetter').hide();
  $('#adHocPlaceHolder').show();    
  $('#adHocMessage').show();
  
  switch(which){
    case 'expFile':
      $('#adHocMessageTitle').text('Download your list of bookmarks to text file:');
      $('#adHocPlaceHolde2').show().val('');
      $('#bMarkFileGetter').show();    
    break;
    case 'impFile':
        document.getElementById('bMarkFile').addEventListener('change', handleFileSelect, false);
        $('#adHocMessageTitle').text('Browse to your saved WHAF bookmark file');
        $('#bMarkGetReader').show();
        $('#adHocPlaceHolder').hide();    

    break;
  }  
}

function handleFileSelect(evt) {
    var files = evt.target.files, g; // FileList object

    for (var i = 0, f; f = files[i]; i++) {

        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e){ 
                g=e.target.result;
                $('#adHocPlaceHolde1').val(g);
                importBookMarksTricks();
                console.log(g);

            };
        })(f);
        return reader.readAsText(f);
    }
}

function BMdeleter(){
  
  var u=$('#bookMarkList li i')
  if (u.length>0){ 
      u[0].click();
      BMdeleter()
  }  
}

function BMWarner(){
    $('#deleteWarning').modal('show');
}

function snpVwCtrHid(){
    if($('#snapShotsArea .mapSnapStrip').length===1){
        $('#snapViewCtrol').fadeOut();
    }
}

function slideStopper(){//returns false if slides or gallery images reached the end of show 
    var snaps = $('#snapShotsArea .mapSnapStrip'), a=[], f=false;
    for (var r=0;r< snaps.length; r++){
        q=hOverlapper(snaps[r], $('#map'));   
        a.push(q)
    }
    for (var v in a){
        if(a[v]>0){
            f=true;
        }
    }
    return f; 
    function hOverlapper(a,b){
        var relativeY = $(a).offset().left - $(b).offset().left;
        return relativeY
    } 
}

function downloadWhafProject(filename, text) {//creates a text file with list of bookmarks to download 
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


function exportAsFile(){
    var fileName = 'WHAF_bookmarks.txt', d, n;
    var n = $('#adHocPlaceHolde2').val()
    if(n!==''){
       fileName = n+'.txt';
    }
    d=exportBookMarksToJson('download');
    downloadWhafProject(n, d);  
}

function locationMarksRemover(){//error handler - in the event that multiple location stars are drawn
var barraList = [];
r=map.graphics.graphics;
  for (t in r){
    if(r[t].WHAFrole==='locationMark'){
        barraList.push(r[t])
    }
  }
  for (i in barraList){
     map.graphics.remove(barraList[i]) 
  }
}


//WATER BUDGET CHARTS

function getWBcharts(){
    var e=WHAFapp.currentMapParams.Catchment, nameC, idC;
    var t = (new Date).getTime();
    qCatchments = new  WHAFapp.QueryCons;
    qCatchments.returnGeometry = false;
    qCatchments.outFields = ["*"];
    qCatchments.where = "catch_id = '" + e + "'" + " AND " + t + "=" + t;
    qtCatchmentsWB = new  WHAFapp.QueryTaskCons(waterBudgetURL);
    qtCatchmentsWB.execute(qCatchments, showMeWB);
}

function showMeWB(e) {
    function o(e, t, n) {
        this.year = e;
        this.field = t;
        this.val = n;
        this.toolTip = n.toFixed(2)
    }
    WHAFapp.currentMapParams.Upstrm = e.features[0].attributes.CATCH_ID;
    var t = e.features[0].attributes.CATCH_ID;
    var n = {};
    var r = {};
    var i = {};
    var s = {};
    for (var u = 1989; u < 2012; u++) {
        var a = String(u);
        var f = "precipinch_" + a;
        var l = "runoffinch_" + a;
        var c = "totaluseinch_" + a;
        var h = "totusepercro_" + a;
        var p = e.features[0].attributes[f];
        var d = new o(a, f, p);
        n[a] = d;
        var v = e.features[0].attributes[l];
        var m = new o(a, l, v);
        r[a] = m;
        var g = e.features[0].attributes[c];
        var y = new o(a, c, g);
        i[a] = y;
        var b = e.features[0].attributes[h];
        var w = new o(a, h, b);
        s[a] = w;
        var E = n[a];
        var S = r[a];
        var x = i[a];
        var T = s[a]
    }
    drawChartWB(n, r, i, s)
}

function drawChartWB(e, t, n, r, reset) {
    var i = [];
    var s = [];
    var o = [];
    var u = [];
    for (var a = 1989; a < 2012; a++) {
        var f = String(a);
        var l = r[f].val;
        var c = r[f].toolTip;
        var h = [f, l, c];
        i.push(h);
        var p = n[f].val;
        var d = n[f].toolTip;
        var v = [f, p, d];
        s.push(v);
        var m = t[f].val;
        var g = t[f].toolTip;
        var y = [f, m, g];
        o.push(y);
        var b = e[f].val;
        var w = e[f].toolTip;
        var E = [f, b, w];
        u.push(E)
    }
    var S = new google.visualization.DataTable;
    S.addColumn("string", "Year");
    S.addColumn("number", "Value");
    S.addColumn({
        type: "string",
        role: "tooltip"
    });
    S.addRows(i);
    var x = new google.visualization.DataTable;
    x.addColumn("string", "Year");
    x.addColumn("number", "Value");
    x.addColumn({
        type: "string",
        role: "tooltip"
    });
    x.addRows(s);
    var T = new google.visualization.DataTable;
    T.addColumn("string", "Year");
    T.addColumn("number", "Value");
    T.addColumn({
        type: "string",
        role: "tooltip"
    });
    T.addRows(o);
    var N = new google.visualization.DataTable;
    N.addColumn("string", "Year");
    N.addColumn("number", "Value");
    N.addColumn({
        type: "string",
        role: "tooltip"
    });
    N.addRows(u);
    var C = {
        title: "Use as % of Runoff for " + WHAFapp.currentMapParams.Upstrm,
        legend: {
            position: "none"
        },
        width: 350,
        height: 150,
        hAxis: {
            slantedText: "true"
        }
    };
    var k = {
        title: "Used inches annual for " + WHAFapp.currentMapParams.Upstrm,
        legend: {
            position: "none"
        },
        width: 350,
        height: 150,
        hAxis: {
            slantedText: "true"
        }
    };
    var L = {
        title: "Runoff inches annual for " + WHAFapp.currentMapParams.Upstrm,
        legend: {
            position: "none"
        },
        width: 350,
        height: 150,
        hAxis: {
            slantedText: "true"
        }
    };
    var A = {
        title: "Precipitation inches annual for " + WHAFapp.currentMapParams.Upstrm,
        legend: {
            position: "none"
        },
        width: 350,
        height: 150,
        hAxis: {
            slantedText: "true"
        }
    };
    var O = new google.visualization.LineChart(document.getElementById("chart1"));
    var M = new google.visualization.LineChart(document.getElementById("chart2"));
    var _ = new google.visualization.LineChart(document.getElementById("chart3"));
    var D = new google.visualization.LineChart(document.getElementById("chart4"));
    O.draw(S, C);
    M.draw(x, k);
    _.draw(T, L);
    D.draw(N, A);
    $("#chartsBody").show("blind");
    $("#whatsUpOptions").show("slide")


    var nameC = WHAFapp.currentMapParams.CatchmentName;
    var idC= "Catchment ID: " + WHAFapp.currentMapParams.Catchment + ". Score: " + WHAFapp.currentMapParams.wwScore;
    var defau="Please set a map location to view water budget charts for its catchment."

    if(WHAFapp.currentMapParams.CatchmentName && WHAFapp.currentMapParams.CatchmentName != undefined){$('#wwMessage1').text(nameC);}
    if(WHAFapp.currentMapParams.Catchment && WHAFapp.currentMapParams.Catchment != undefined){$('#wwMessage2').text(idC);$('#wbResetBut').text('Reset Map Location')}
    else{$('#wwMessage2').text(defau);$('#wbResetBut').text('Set Map Location')}
}

function wbChartReset(){
    var ht=['chart1','chart2','chart3','chart4','wwMessage2']; 
    for (var c=0; c<ht.length; c++){
        var r=$('#'+ht[c]);
        r.html('  ');  
        $('#wwMessage1').text('Click on the map to set a new location');
    }  
}

function getReportCard(){
    var r,win,url;
    r=String(WHAFapp.currentMapParams.crossmajor)
    url = 'http://files.dnr.state.mn.us/natural_resources/water/watersheds/tool/watersheds/ReportCard_Major_'+r+'.pdf'
    win = window.open(url, '_blank');
    win.focus();
}

function getflyOver(){//initiates fly-over (Google Earth) for major watershed
    $('#flyOverNote').fadeIn();
    $('#tourList').html('');
    $('#tourSample').hide();
  
    r=String(WHAFapp.currentMapParams.crossmajor);
    var exceptionList={//watersheds that have more than one flyover
        25:[1,2],
        38:[1,2,3],
        40:[1,2],
        42:[1,2],
        43:[1,2],
        44:[1,2]
    }
    if (! exceptionList[r] || exceptionList[r]=== undefined){        
        url = WHAFapp.flyOverUrl+'flyover_'+r+'.kmz'
        addTour(url)
    } else{
        for (var i=0; i<exceptionList[r].length; i++){
            m=r+'_'+exceptionList[r][i];
            url = WHAFapp.flyOverUrl+'flyover_'+m+'.kmz';
            addTour(url, i+1);           
        }
    }
    
    function addTour(link, serial){
      var a, text = "Get fly-over file "
      if(serial){text=text+String(serial)}
      
      b='onclick="window.open(\''+link+'\', \'_blank\')"'
      console.log(b)
      
      a='<li><a href="#" '+b+ '>'+text+'</a></li>'
      
      $('#tourList').append(a)
      
    }
}

// ---------------FUNCTIONS RELATED TO QUERY DEFINITION FOR AUXILIARY LAYERS

function aFeatureById(id){// get an item from theseFeature array by id
    var result = WHAFapp.currentMapParams.theseFeatures.filter(function( obj ) {
      return obj.id == id;
    });
    return result[0]
}

function loadSelectableLyr(urlId,auxID) {
    
    var g,R,query=scaleQuer($('#lyrQueryArea').val()), featureP=aFeatureById(auxID);
    var url=WHAFapp.impairments.url+urlId;
    $('#loader').show();

    //assign properties to feature record
    featureP.queryExp=$('#lyrQueryArea').val();
    featureP.impParms = getCheckedParams();

    if(WHAFapp.selectableLayer[auxID].lyrs[lyrId] === undefined || WHAFapp.selectableLayer[auxID].loaded===false){
        var lyrId=WHAFapp.selectableLayer[auxID].lyrSerial;

        WHAFapp.selectableLayer[auxID].lyrs[lyrId] = new WHAFapp.FeatureLayerCons(url, {
            maxAllowableOffset: 0,
            mode: WHAFapp.FeatureLayerCons.MODE_SELECTION
        });
        WHAFapp.selectableLayer[auxID].lyrs[lyrId].showing=false;
        WHAFapp.selectableLayer[auxID].lyrs[lyrId].on('selection-complete',function(e){
            if(e.features.length>0){
                WHAFapp.selectableLayer[auxID].lyrs[lyrId].showing=true;
            }
        })
        WHAFapp.selectableLayer[auxID].lyrs[lyrId].on('load', function(){
            addImpairment();
            WHAFapp.selectableLayer.loadStatus="ready";
            $('#loader').hide();
        });
        WHAFapp.selectableLayer[auxID].lyrs[lyrId].on('graphic-add',function(){
            reorderImpairesLayers();
            $('#loader2').hide()
        });

        WHAFapp.selectableLayer[auxID].lyrs[lyrId].on('error',function(){
            $('#loader2').hide();
            alert("Sorry, we encountered a problem loading this layer. Please try again. ")
        });
        var lyrr=WHAFapp.selectableLayer[auxID].lyrs[lyrId]

        // console.log(WHAFapp.selectableLayer[auxID])
        

       lyrr.layerInfos=[]
       // console.log("SHOW? :",lyrr.showing)
        map.addLayer(lyrr);
        var lyrTitle = WHAFapp.selectableLayer.givenName
        var hLyrr={
            layer:lyrr,
            title:lyrTitle
        }
        
        console.log(lyrr)

        legendd.layerInfos.push(hLyrr);
        try{legendd.refresh()}catch(err){};

    }else{
        addImpairment()
    }
    WHAFapp.selectableLayer[auxID].lyrSerial++;
    function addImpairment(){
        g = WHAFapp.selectableLayer[auxID].lyrs[lyrId].geometryType;
        R = symbStarter(g,auxID);
        WHAFapp.selectableLayer[auxID].lyrs[lyrId].setRenderer(R)
        WHAFapp.selectableLayer[auxID].lyrs[lyrId].identifier = "impLine";
        try {
            WHAFapp.selectableLayer[auxID].lyrs[lyrId].selectFeatures(query,WHAFapp.FeatureLayerCons.SELECTION_NEW, function(r){console.log("DEFERRED: ", r)});
            WHAFapp.selectableLayer[auxID].lyrs[lyrId].currentQuery=query;
        } catch (s) {console.log(("failed to load a scale layer"))}

    };
}


function symbStarter(geometry,auxID){//get renderer from color and size pickers

    var lwidth,pSize,fColor,lcolor,pColor,fillJson,lineJson,pointJson,geometry,r,renderer;
    var featureP = aFeatureById(auxID);

    lColor = $('#lColPicker').val();
    fColor = $('#fColPicker').val();
    pColor = $('#fColPicker').val();
    lWidth = Number($('#lineWidth').val());
    pSize = Number($('#pointSize').val());

    featureP.symbOb = {lColor:lColor,fColor:fColor,pColor:pColor,lWidth:lWidth,pSize:pSize}

    lineJson = {
       "type": "esriSLS",
       "style": "esriSLSSolid",
       "color": rgbaTRans(lColor),
       "width": lWidth,
       "value":"Impi Thing",
       "label":"Impaired Water"
    }

    fillJson = {
        "type": "esriSFS",
        "style": "esriSFSSolid",
        "color": rgbaTRans(fColor),
        "outline": lineJson,
    }

    pointJson =  {
        "color": rgbaTRans(pColor),
        "size": pSize,
        "type": "esriSMS",
        "style": "esriSMSCircle"
    }

   switch(geometry){
        case "esriGeometryPolygon":
            r = new esri.symbol.SimpleFillSymbol(fillJson);
            break;
        case "esriGeometryPolyline":
            r = new esri.symbol.SimpleLineSymbol(lineJson);
            break;        
        case "esriGeometryPoint":
            r = new esri.symbol.SimpleMarkerSymbol(pointJson);
            break;
    }

    r.label="Impaired Water";
    r.value="Impairithingy";

    renderer = new  WHAFapp.SimpleRendererCons(r);
   
console.log("renderer")
    return renderer

    function rgbaTRans(rgba){
        var oute=[],ine=rgba.replace('rgba(','').replace(')',''),fine;
        fine = ine.split(',');
        for (var i=0; i<fine.length; i++){
            var tt = Number(fine[i]);
            if (i===3){
                tt = tt*255;
                tt=Number(tt.toFixed(0)) 
            }
            oute.push(tt)
        }
        return oute
    }    
}

function selectWith(fieldName, exp, valList){//select value that contains an expression, creates a query where string
    l=[],x='',t=valList;
  
    for (n in t){
      if (t[n].indexOf(exp)!=-1){
       l.push(t[n])
      }  
    }
  
    for (var g=0;g<l.length;g++){
        if(g<l.length-1){
            x=x+fieldName+" = '"+l[g]+"' OR  " 
        }else{
            x=x+fieldName+" = '"+l[g]+"'"
        }
    }  
  return x
}

function selectWithFromMultiple(expList, valList){//select value that contains an expression, from a list of expressions
    l=[],t=valList;
    for(ex in expList){
      exp=expList[ex];
      for (n in t){
        if (t[n].indexOf(exp)!=-1){
          if(l.indexOf(t[n])==-1){
             l.push(t[n])            
          }
        }  
      }
    }
    return l  
}


function queAdd(t,delim){
    var j;
    if(delim){
        j=" '"+t+"' ";
    }else{
        j=" "+t+" ";
    }
    insertAtCaret('lyrQueryArea',j)
}

function impQueAdd(t,delim){
    var j;
    if(delim){
        j=" '"+t+"' ";
    }else{
        j=" "+t+" ";
    }
    insertAtCaret('impLyrQueryArea',j)
}

function valSet(it){
    var url=$('#restUrlLyrLink code').text()
    getFieldVals(it, WHAFapp.selectableLayer) 
}

function getFieldVals(field, ob){//get a list of all values of a given field in a rest endpoint of a layer
    var L =[],mrc,flds,ctr=0,grossCtr=0, url=$('#restUrlLyrLink code').text();
    var json=url+'?f=json'; 

    $.getJSON(json, function (e,t) {
        mrc=e.maxRecordCount;
        flds=e.fields;
        for (g in flds){
            if (flds[g].type ==="esriFieldTypeOID"){//ensures that correct name is used for object id field
              var tt=flds[g].name;
              processUrlJson(tt)
            }            
        }
    })

    function processUrlJson(g) {
        var d = url+'/query?where='+g+'>'+ctr+'&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields='+field+'&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json'

        $.getJSON(d, function (f) {
            $.each(f, function (e, t) {
                if (e == "features") {
                    $.each(t,function(i,j){
                        var k=j.attributes[field]
                        grossCtr++;
                        if( L.indexOf(k) ==-1){
                            L.push(k);
                            L.sort()
                        }
                    })
                }
            })
            if(f.exceededTransferLimit){//make sure function loops through all values even if exceeding max record count 
                ctr=ctr+mrc;
                processUrlJson();
            }else{
              obj=ob.fields[field];
              // console.log(obj)
              if(obj){
                try{obj.valList=L}catch(f){};
                applyVals(obj.valList);
                $('#uniqueValsTitle').html('Unique values for field: '+obj.alias+' ('+field+')');
                if(field==='AFFECTED_U'){
                    setAffectedUseValList(obj.valList)
                }
              }else{}
            }
        })
    }
}

function setAffectedUseValList(list){//sets a list of unique values for 'AFFECTED_U' for a waterbody in impairments object
  var q=WHAFapp.impairments[getWaterbody()];
  q.AffectedUseAsUniqueVal=list  
}

function applyVals(valList){
  $('#FieldsValueListUl').html('')
  for (var i=0; i<valList.length; i++){
    var itm = '<li><a href="#" onclick="valSet(\''+valList[i]+'\')" ondblclick="queAdd(\''+valList[i]+'\',1)">'+valList[i]+'</a></li>'    
    $('#FieldsValueListUl').append(itm);
  }
}

function setAU_vals(){
    var w=WHAFapp.impairments[getWaterbody()];
//       console.log("getting unique AU vals")
    url=WHAFapp.impairments.url+w.layerIds[0];
    getlayerFields(url);
    if(w.AffectedUseAsUniqueVal===undefined || w.AffectedUseAsUniqueVal.length===0){

        valSet('AFFECTED_U');
    }
}

function getlayerFields(url){
    $('#restUrlLyrLink code').text(url);
    $('#layerFieldsListUl, #FieldsValueListUl').html('');
    $('#uniqueValsTitle').html('Unique values');
    $('#legLayerName').text('Layer properties');
    WHAFapp.selectableLayer.fields={};
    var json=url+'?f=json';
    $.getJSON(json, function (f) {
        $('#legLayerName').text("Layer: "+f.name);
        $.each(f, function (e, t) {
            if (e == "fields") {
                $.each(t,function(i,j){                  
                    WHAFapp.selectableLayer.fields[j.name]={alias: j.alias, name:j.name}
                })
            }
        })
        gofer()
        // $.done(gofer()); 
    })
}

function gofer(){
    h=WHAFapp.selectableLayer.fields

    $.each(h,function(e,r){
        sto='<li><a href="#" onclick="valSet(\''+r.name+'\')" ondblclick="queAdd(\''+r.name+'\')">'+r.alias+'</a></li>'
        $('#layerFieldsListUl').append(sto)
    })
} 


function insertAtCaret(areaId,text) {
    var txtarea = document.getElementById(areaId);
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
        "ff" : (document.selection ? "ie" : false ) );
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        strPos = range.text.length;
    }
    else if (br == "ff") strPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0,strPos);  
    var back = (txtarea.value).substring(strPos,txtarea.value.length); 
    txtarea.value=front+text+back;
    strPos = strPos + text.length;
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        range.moveStart ('character', strPos);
        range.moveEnd ('character', 0);
        range.select();
    }
    else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
}

function initSymbolSelect(){//initializes color pickers for feature layer selector e.g. impairment layers
    $('#lColPicker').colorpicker({color:'#ff7f7f',format:'rgba'})
    $('#lColPicker').css('background-color',$('#lColPicker').val())
    $('#lColPicker').colorpicker().on('changeColor.colorpicker', function(event){
      $(this).css('background-color',$(this).val())
    });
    $('#fColPicker').colorpicker({color:'#9595cf)',format:'rgba'})
    $('#fColPicker').css('background-color',$('#fColPicker').val())
    $('#fColPicker').colorpicker().on('changeColor.colorpicker', function(event){
      $(this).css('background-color',$(this).val())
    });
    $('#lineWidth').val('2');
    $('#pointSize').val('5');
}

function getImpairVals() {
    var l = ['streams', 'lakes', 'wetlands'];
    for (n in l) {
        var z = WHAFapp.impairments[l[n]];
        var a = z.layerIds;
        var M = z.impParams;
        // console.log("M in getImpairVals: ",M)
        var MM = z.impParamsAsUniqueVal=[];
      
        for (b in a) {
            var u = WHAFapp.impairments.url + a[b]
            getImpairParams(WHAFapp.impairments.impField, u, M,MM);
            if (n==2 && b ==1){//to execute after completion of loop 
                setTimeout(function(){prePopulateImpList()},2000)    
            };
        };
    }

    function getImpairParams(field, url, M,MM) { //get a list of all values of a given field in a rest endpoint of a layer
        var mrc, flds, ctr = 0,
            grossCtr = 0;
        var json = url + '?f=json';
        $.getJSON(json, function(e, t) {
            mrc = e.maxRecordCount;
            flds = e.fields;
            for (g in flds) {
                if (flds[g].type === "esriFieldTypeOID") { //ensures that correct name is used for object id field
                    var tt = flds[g].name;
                    processUrlJson(tt);
                }
            }
        })

        function processUrlJson(g) {
            var d = url + '/query?where=' + g + '>' + ctr + '&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=' + field + '&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json'
            $.getJSON(d, function(f) {
                $.each(f, function(e, t) {
                    if (e == "features") {
                        $.each(t, function(i, j) {
                            var k = j.attributes[field]
                            grossCtr++;
                            if (MM.indexOf(k) == -1) {
                                MM.push(k);
                                MM.sort();
                            }
                        })
                    }
                })
                if (f.exceededTransferLimit) { //make sure function loops through all values even if exceeding max record count 
                    ctr = ctr + mrc;
                    processUrlJson();
                } else {
                    for (r in MM) {
                        var s = MM[r].split(';')
                        for (q in s) {
                            if (M.indexOf(s[q]) == -1) {
                                M.push(s[q])
                            }
                        }
                    }
                }
            })
        }
    }
}

function getWaterbody(){//returns the currently checked water body (streams, lakes, wetlands)
    var l = ['streams', 'lakes', 'wetlands'];
    for (i in l){
        var ch=$('#imp'+l[i][0].toUpperCase()+'Check').prop('checked');
        if(ch){
            return l[i]
        }
    }
}

function prePopulateImpList(){
  if($('#impParamsListUl').html()==''){
    populateImpList();
    }else{
    setTimeout(function(){
      prePopulateImpList()
    },2000)
  }
}

function populateImpList(){
    $('#impForListUl input:checkbox').prop('checked',false);
    var go=0;
    console.log("Go = 0")
    setAU_vals();//set unique values for 'affected use' field in impairment object
  var F = [], l = ['streams', 'lakes', 'wetlands'];
  for (i in l){
   var ch=$('#imp'+l[i][0].toUpperCase()+'Check').prop('checked');
   var lst = WHAFapp.impairments[l[i]].impParams;
    if(ch){
      for (v in lst){
        var V=lst[v].trim()
        if(F.indexOf(V)==-1 && V!==''){
            F.push(V);
            setImpTitle(l[i]);
        }
      }
    }
  }
  F.sort()
  $('#impParamsListUl').html('');
  for (var i=0; i<F.length; i++){
    
    if(i===F.length-1){
        go=1;
        console.log("GO=1")
    }

    setImpParams(F[i],go);
  };
    $('#impParamsListUl label, #impForListUl label').on('click',function(){
        var WBI=impNamer(), plhld = WBI+' (click to rename)'
        $('#impLayerNameBox').attr('placeholder',plhld);
        WHAFapp.selectableLayer.givenName=WBI;
    });
}


// $('#impForListUl label').on('click',function(){
//     var WBI=impNamer(), plhld = WBI+' (click to rename)'
//     $('#impLayerNameBox').attr('placeholder',plhld);
//     WHAFapp.selectableLayer.givenName=WBI;
// });
// function populateApTdmlList(){
//     var go=0;
//     console.log("Go = 0")
//     setAU_vals();//set unique values for 'affected use' field in impairment object
//     var F = [], l = ['streams', 'lakes', 'wetlands'];
//     for (i in l){
//         var ch=$('#imp'+l[i][0].toUpperCase()+'Check2').prop('checked');
//         var lst = WHAFapp.impairments[l[i]].approved_D;
//         if(ch){
//           for (v in lst){
//             var V=lst[v].trim()
//             if(F.indexOf(V)==-1 && V!==''){
//                 F.push(V);
//                 setImpTitle(l[i]);//#######################
//             }
//           }
//         }
//     }
//     F.sort()
//     $('#impParamsListUl2').html('');
//     for (var i=0; i<F.length; i++){
    
//         if(i===F.length-1){
//             go=1;
//             console.log("GO=1")
//         }
//         setImpParams2(F[i],go);//#######################
//     };
    
//     $('#impParamsListUl2 label').on('click',function(){
//         var WBI=impNamer2(), plhld = WBI+' (click to rename)'
//         $('#impLayerNameBox').attr('placeholder',plhld);
//         WHAFapp.selectableLayer.givenName=WBI;
//     });
// }

function setImpTitle(WB){
    var placeholder;
    if ($('#impLayerNameBox').val()===''){
        placeholder='Layer name: Impaired '+WB+' (click to rename)';
        $('#impLayerNameBox').attr('placeholder',placeholder);
        WHAFapp.selectableLayer.name = 'Impaired '+WB;
    }
}

function setImpParams(impP,go){
    var a = '<label class="checkbox"><input type="checkbox" value="',b,c = '">',d,e = '</label>';
    
    b = d = impP;
    res = a+b+c+d+e
    $('#impParamsListUl').append(res);

    if(go===1){
        if (WHAFapp.selectableLayer.loadStatus==="WB"){
            WHAFapp.selectableLayer.loadStatus="popImpLst"
            // console.log("popImpLst")
        }        
    }
}

function setImpParams2(impP,go){
    var a = '<label class="checkbox"><input type="checkbox" value="',b,c = '">',d,e = '</label>';
    
    b = d = impP;
    res = a+b+c+d+e
    $('#impParamsListUl2').append(res);

    if(go===1){
        if (WHAFapp.selectableLayer.loadStatus==="WB"){
            WHAFapp.selectableLayer.loadStatus="popImpLst"
            // console.log("popImpLst")
        }        
    }
}

function impTog(){
    $('#layerSelectionModal').toggle(); 
    initImpairedModule();
}

function initImpairedModule(){
    var dmn = "http://pca-gis02.pca.state.mn.us",g={left: '554px',top:'95px'};
    $('#impLayerNameBox').val('');
    $('#impChangeBut').hide();
    $('#impNextBut, #lyrQueD, #imptabs, #impWaterBodListUl').show();
    if(esri.config.defaults.io.corsEnabledServers.indexOf(dmn)===-1);{
        esri.config.defaults.io.corsEnabledServers.push(dmn)
    };
    $('#impWaterBodListUl input').on("change",function(){populateImpList()});

    $('#layerSelectionModal').css(g);
    initSymbolSelect();
    getImpairVals();
}

function selGetter(){
    var g=$('#impWaterBodListUl').find('input')
    for (i in g){
        if ( $(g[i]).val() && $(g[i]).prop('checked'))
            return $(g[i]).val();
    }
}

function impairSelect(){
    
    var v,r=$('#lyrQueD .tab-pane')
    for (var i=0; i<r.length; i++){
      if ($(r[i]).hasClass('active')){
        v=r[i].id 
      }
    }
    if (v==='basicSel'){
        $('#loader2').show()
      impParamSelect()
    } else if (v === 'affectedUseSel'){
        $('#loader2').show()
      affectedUseSelect()
    } else if (v==='advancedSel'){
        $('#loader').show()
      advancedSelect()
    }
}

function impParamSelect(){
    layerItemID++
    var WB = selGetter(),outQuery,buttonName;
    var impObject=impLyrDetails();
    if($('#impLayerNameBox').val()===''){
        if (WHAFapp.selectableLayer.givenName){
            console.log("given name")
            buttonName=WHAFapp.selectableLayer.givenName;
        } else{
            console.log("name")
            buttonName=WHAFapp.selectableLayer.name;
        }
    } else{
        buttonName=$('#impLayerNameBox').val();
        WHAFapp.selectableLayer.givenName=buttonName;
    }
    var featureP={
        checked:true,
        group:WHAFapp.impairments.url,
        identify:false, 
        layerID:WHAFapp.impairments[WB].layerIds,
        id:layerItemID,
        WB:WB,
        affectedUse:impObject.affectedUse,
        title:buttonName
    };
    WHAFapp.currentMapParams.theseFeatures.push(featureP);

    var G=[],query = '',field = WHAFapp.impairments.impField;0
    // var list = WHAFapp.impairments[WB].impParamsAsUniqueVal;

    $("#impParamsListUl input:checkbox:checked").each(function(){
        G.push($(this).val());
    });
  
    for (var i=0; i<G.length; i++){
        Q=field+" LIKE '%"+G[i]+"%'";
        if (i<G.length-1){
            query = query + Q +" OR ";  
        }else{
            query = query + Q; 
        }
    };

    $('#lyrQueryArea').val(query);
    loadSelFl(featureP.layerID,featureP.title);
    $('#layerSelectionModal').fadeOut();

    $('#customImpBut input').prop('checked',true);

    var fff={
      'padding-top':'3px',
      'padding-bottom':'1px',
      'margin-bottom':'5px',
      'background-color':'#aaaaaa'
    };
    $('#selSortable').css(fff);
    unHushImpairesLayers();
    $('#selSortable1').show();$('#impLyrToggler').text('-');  
}

function affectedUseSelect(){
    layerItemID++
    var WB = selGetter(),outQuery;
    var impObject=impLyrDetails()
    if($('#impLayerNameBox').val()===''){
        if (WHAFapp.selectableLayer.givenName){
            console.log("given name")
            buttonName=WHAFapp.selectableLayer.givenName;
        } else{
            console.log("name")
            buttonName=WHAFapp.selectableLayer.name;
        }
    } else{
        buttonName=$('#impLayerNameBox').val()
    }
    var featureP={
        checked:true,
        group:WHAFapp.impairments.url,
        identify:false, 
        layerID:WHAFapp.impairments[WB].layerIds,
        id:layerItemID,
        WB:WB,
        affectedUse:impObject.affectedUse,
        title:buttonName
    };
    WHAFapp.currentMapParams.theseFeatures.push(featureP);

    var G=impObject.affectedUse,query = '',field='AFFECTED_U';
    for (var i=0; i<G.length; i++){
        Q=field+" LIKE '%"+G[i]+"%'";
        if (i<G.length-1){
            query = query + Q +" OR ";  
        }else{
            query = query + Q; 
        }
    };

    $('#lyrQueryArea').val(query);
    loadSelFl(featureP.layerID,featureP.title);;
    $('#layerSelectionModal').fadeOut();

    $('#customImpBut input').prop('checked',true);

    var fff={
      'padding-top':'3px',
      'padding-bottom':'1px',
      'margin-bottom':'5px',
      'background-color':'#aaaaaa'
    };
    $('#selSortable').css(fff);
    unHushImpairesLayers();
    $('#selSortable1').show();$('#impLyrToggler').text('-');  
}

function advancedSelect(){
    layerItemID++
    var WB = selGetter(),outQuery;
    var impObject=impLyrDetails()
    if($('#impLayerNameBox').val()===''){
        if (WHAFapp.selectableLayer.givenName){
            console.log("given name")
            buttonName=WHAFapp.selectableLayer.givenName;
        } else{
            console.log("name")
            buttonName=WHAFapp.selectableLayer.name;
        }
    } else{
        buttonName=$('#impLayerNameBox').val()
    }
    var featureP={
        checked:true,
        group:WHAFapp.impairments.url,
        identify:false, 
        layerID:WHAFapp.impairments[WB].layerIds,
        id:layerItemID,
        WB:WB,
        affectedUse:impObject.affectedUse,
        title:buttonName
    };
    WHAFapp.currentMapParams.theseFeatures.push(featureP);

    if($('#lyrQueryArea').val() && $('#lyrQueryArea').val()!== ''){
        loadSelFl(featureP.layerID,featureP.title);
        $('#layerSelectionModal').fadeOut();
    } else{
        alert("No query provided")
    }
    $('#customImpBut input').prop('checked',true);

    var fff={
      'padding-top':'3px',
      'padding-bottom':'1px',
      'margin-bottom':'5px',
      'background-color':'#aaaaaa'
    };
    $('#selSortable').css(fff);
    unHushImpairesLayers();
    $('#selSortable1').show();$('#impLyrToggler').text('-');  
}

function loadSelFl(urls,bTitle){
    var buttonVal='',c,cc,h,buttonName,auxID,buttonName=bTitle;
    auxID=layerItemID;
    WHAFapp.selectableLayer[auxID]={lyrSerial:0,lyrs:[]}
    for (ur in urls){// two scale dependent services are queried and loaded
        loadSelectableLyr(urls[ur],auxID);
        buttonVal=auxID;
    }
    impId=layerItemID;
    cc= 'onclick="selFLToggler($(this)) "';
    c = '<input type="checkbox" value=' + buttonVal + ' checked title="" autocomplete="off" '+cc+' ><span>';
    h = '<div class="ui-state-default state-default1" id="'+impId+'"><div class="row-fluid"><label class="checkbox auxFeatCheck offset1 span7">' + c + buttonName + '</span></label><div class="span3"><a class="btn btn-small pull-right" href="#" title = "Set Selection" onclick="impSettingsMod(\''+auxID+'\')"><i class="icon-cog infoTableToggler"></i></a></div><div class="span1"><button onclick = "impLyrRemove('+impId+',this) " class="close" type="button">×</button></div></div></div>';
    $("#selSortable1").prepend(h);
    $('#impLayerNameBox').val('');
}


function impLyrDetails(){
    var impProps={}

    impProps.checked=getImpParams();
    impProps.waterBody=getWB();
    impProps.symbology=getImpSymb();
    impProps.affectedUse =getCheckedAffUse();

    function getImpSymb(){
        var f = {};
        f.lineColor = $('#lColPicker').colorpicker().val()
        f.fillColor = $('#fColPicker').colorpicker().val()
        f.lineWidth = $('#lineWidth').val()
        f.pointSize = $('#pointSize').val()
        return f        
    }
    function getImpParams(){
        return impNamer("list")
    }

    function getCheckedAffUse(){
        var f=$('#impForListUl .checkbox input:checked'),B=[];
        for (var t=0; t<f.length; t++){
            B.push($(f[t]).parent().text())
        }
        return B;
    }

    function getWB(){
      l = ['S','L','W'];
      for (i in l){
       var ch=$('#imp'+l[i]+'Check').prop('checked');
       if(ch){
         return l[i]
       }
      }
    }
    return impProps
}



function selFLToggler(r){//togges visibility for two feature layers (scale dependent, identical features)
    var qq=$(r).prop('checked'),ff,aa,bb;
    ff=$(r).parent().parent().parent().prop('id')
    try{aFeatureById(ff).checked=qq}catch(r){};
    aa=$(r).val();
    bb=WHAFapp.selectableLayer[aa].lyrs;
    for(g in bb){
        if(qq===true){
            // $('#loader').show();
            bb[g].show();
        } else if (qq==false){
            bb[g].hide();
        }
    }
}


function impNamer(list){//returns a string for naming a selected impaired water layer based on checked boxes

    var v,g,r=$('#lyrQueD .tab-pane'),nl=[],x = WHAFapp.selectableLayer.name;
    for (var i=0; i<r.length; i++){
      if ($(r[i]).hasClass('active')){
        v=r[i].id 
      }
    }
    if (v==='basicSel' || list==="list"){
        g=$('#impParamsListUl label input');
        for (var i=0; i<g.length; i++){
            if($(g[i]).prop('checked')){
                d = $(g[i]).val();
              if (nl.length ===0){
                x=x+': '+d;
                nl.push(d)
              } else{
                 x=x+', '+d;
                nl.push(d)
              }
            }
        }
    } else if (v === 'affectedUseSel'){
        g=$('#impForListUl label input');
        for (var i=0; i<g.length; i++){
            if($(g[i]).prop('checked')){
                d = $(g[i]).parent().text();
              if (nl.length ===0){
                x=x+': '+d;
                nl.push(d)
              } else{
                 x=x+', '+d;
                nl.push(d)
              }
            }
        }
    } else if (v==='advancedSel'){
      x='';
    }
    if(list==="list"){
        return nl
    } else{
        return x    
    }
}

// function impNamer2(list){
//   g=$('#impParamsListUl2 label input')
//   var nl=[],x = WHAFapp.selectableLayer.name
//   for (var i=0; i<g.length; i++){
//     if($(g[i]).prop('checked')){
//         d = $(g[i]).val();
//       if (nl.length ===0){
//         x=x+': '+d;
//         nl.push(d)
//       } else{
//          x=x+', '+d;
//         nl.push(d)
//       }
//     }
//   }
//   if(list==="list"){
//     return nl
//   } else{
//     return x    
//   }
// }
function polySymbSetter(lyr){//change renderer and query
    var laYers = WHAFapp.selectableLayer[lyr].lyrs,k;
    var featureP = aFeatureById(lyr);
    console.log(laYers)
    var url, query,lwidth,pSize,fColor,lcolor,pColor,fillJson,lineJson,poinJson,geometry,r;
    url = $('#restUrlLyrLink code').text();
    query = $('#lyrQueryArea').val();
    lColor = $('#lColPicker').val();
    fColor = $('#fColPicker').val();
    pColor = $('#fColPicker').val();
    lWidth = Number($('#lineWidth').val());
    pSize = Number($('#pointSize').val());

    featureP.symbOb = {lColor:lColor,fColor:fColor,pColor:pColor,lWidth:lWidth,pSize:pSize}


    lineJson = {
       "type": "esriSLS",
       "style": "esriSLSSolid",
       "color": rgbaTRans(lColor),
       "width": lWidth
    }

    fillJson = {
        "type": "esriSFS",
        "style": "esriSFSSolid",
        "color": rgbaTRans(fColor),
        "outline": lineJson
    }

    pointJson =  {
        "color": rgbaTRans(pColor),
        "size": pSize,
        "type": "esriSMS",
        "style": "esriSMSCircle"
    }


    for (laYer in laYers){

        geometry = laYers[laYer].geometryType
        switch(geometry){
            case "esriGeometryPolygon":
                r = new esri.symbol.SimpleFillSymbol(fillJson);
                break;
            case "esriGeometryPolyline":
                r = new esri.symbol.SimpleLineSymbol(lineJson);
                break;        
            case "esriGeometryPoint":
                r = new esri.symbol.SimpleMarkerSymbol(pointJson);
                break;
        }

        laYers[laYer].hide()
        laYers[laYer].setRenderer(new  WHAFapp.SimpleRendererCons(r));
        laYers[laYer].show()
    }

    function rgbaTRans(rgba){
        var oute=[],ine=rgba.replace('rgba(','').replace(')',''),fine;
        fine = ine.split(',');
        for (var i=0; i<fine.length; i++){
            var tt = Number(fine[i]);
            if (i===3){
                tt = tt*255;
                tt=Number(tt.toFixed(0)) 
            }
            oute.push(tt)
        }
        return oute
    };

    k=$('#impLayerNameBox').val();
    $('#'+lyr+' label span').text(k);
    aFeatureById(lyr).title=k;//sets title in object that contains layer properties 
}

function impSettingsMod(layer){
    if(!$('#'+layer +' a').hasClass('disabled')){
        var i = layer; 
        $('#impLayerNameBox').val('');        
        $('#layerSelectionModal').fadeIn()
        loadSymbforLyr(layer);
        $('#impChangeBut').show();
        $('#impNextBut, #lyrQueD, #imptabs, #impWaterBodListUl').hide();
        $('#impChangeBut').attr("onclick","polySymbSetter('"+i+"'); $('#layerSelectionModal').fadeOut()");
    }
}

function loadSymbforLyr(auId){//based on auxlayer id, (in theseFeatures), repopulates layer selexction and symbology box with previously set values 
    var d=aFeatureById(auId);
    var lC=d.symbOb.lColor;
    var fC=d.symbOb.fColor;
    var lW=d.symbOb.lWidth;
    var pS=d.symbOb.pSize;

    $('#lColPicker').val(lC).css('background-color',$('#lColPicker').val());
    $('#fColPicker').val(fC).css('background-color',$('#fColPicker').val());
    $('#impLayerNameBox').val(d.title);
    $('#lyrQueryArea').val(d.queryExp);
    $('#lineWidth').val(lW);
    $('#pointSize').val(pS);


}

function hushImpairesLayers(){//reorders the custom impairment layers, to be invoked on drag 
    var orderedList=[],serial=1,n,L,layerList=WHAFapp.selectableLayer,a;
    a=$('#selSortable1').children();
    for (var i=0; i<a.length; i++){
        orderedList.push($(a[i]).attr('id')); 
    }
    n=orderedList.length*2;
    for (var j=0; j<orderedList.length; j++){
        ll=layerList[orderedList[j]].lyrs;
      
          $('#'+orderedList[j] +' input[type=checkbox]').prop("disabled", true);
          $('#'+orderedList[j] +' a').addClass("disabled");
          $('#'+orderedList[j] +' a').unbind('click')
        for (var t in ll){
            ll[t].hide()
            serial++
        }
    }
    $('#selSortable1').children().css('color','#999')  

}


function unHushImpairesLayers(){//reorders the custom impairment layers, to be invoked on drag 
    var orderedList=[],serial=1,n,L,layerList=WHAFapp.selectableLayer,a;
    a=$('#selSortable1').children();
    for (var i=0; i<a.length; i++){
        orderedList.push($(a[i]).attr('id')); 
    }
    n=orderedList.length*2;
    for (var j=0; j<orderedList.length; j++){
        ll=layerList[orderedList[j]].lyrs;
      
      
        $('#'+orderedList[j] +' input[type=checkbox]').prop("disabled", false);
        $('#'+orderedList[j] +' a').removeClass("disabled");
        L=  $('#'+orderedList[j] +' [type="checkbox"]').prop('checked');
        for (var t in ll){
          if(L){
            ll[t].show()
            serial++
          }
        }
    }
    $('#selSortable1').children().css('color','#555555');
}

function impLyrsToggler(N){
    
    var fff={'padding-top':'3px','padding-bottom':'1px','margin-bottom':'5px','background-color':'#aaaaaa'},
    eee={'padding-top':'0px','padding-bottom':'0px','margin-bottom':'0px','background-color':'transparent'};

    if($(N).prop('checked')){
        unHushImpairesLayers();
        $('#selSortable').css(fff);
        if($('#selSortable1').children().length===0){
            $('#layerSelectionModal').show(); 
            initImpairedModule();
        }
    }else{
        hushImpairesLayers();
        $('#selSortable').css(eee);
    }
}

function impLyrsMinizer(){
    if($('#impLyrToggler').text()=='-'){
        $('#selSortable1').hide();
        $('#impLyrToggler').text('+');  
    }else{
        $('#selSortable1').show();  
        $('#impLyrToggler').text('-');  
    }
}

function impLyrRemove(id,th){
    var y=WHAFapp.selectableLayer[id];
    var x=y.lyrs;
    $(th).parent().parent().find('input').prop('checked', true);
    $(th).parent().parent().find('label').click(); 
    for (z in x){
        map.removeLayer(x[z]); 
    }
    $('#'+id).remove();
    delete WHAFapp.selectableLayer[id];
    //Remove object from theseFeatures list
    impObj=aFeatureById(id)
    inf= WHAFapp.currentMapParams.theseFeatures.indexOf(impObj)
    if(inf !==-1){
        WHAFapp.currentMapParams.theseFeatures.splice(inf,1);
    }
}

function getCheckedParams(){
  var f=$('#impParamsListUl .checkbox input:checked'),B=[];
  for (var t=0; t<f.length; t++){
     B.push($(f[t]).val())
  }
  return B
}

function getImpairedList(encoded){//returns an array of objects that include parameters of each customized impaired water layer on the map
    //A. get a list of impaired layers 
    listA=[]
    d=$('#selSortable1').children()
    if(d.length===0){
        return false
    };
    for (var i=0; i<d.length; i++){
     g=$(d[i]).prop('id')
     listA.push(g)
    }
    //B. collect all impaired layers properties in a list so it's ordered. 
    impLyrsList=[];

    for (var i=0; i<listA.length; i++){
        var o={};
        var t = aFeatureById(listA[i]);
        var ts=t.symbOb;
      o.impParams=t.impParms;
      o.title=t.title;
      o.checked=t.checked;
      o.fColor=ts.fColor;
      o.lColor=ts.lColor;
      o.lWidth=ts.lWidth;
      o.pColor=ts.pColor;
      o.pSize=ts.pSize;
      o.wb=t.WB[0];
      o.afU=[];

      if(t.affectedUse.length!==5){//get list of affetced use; if all are chosen, 'all' is the only item in list
        for (d in t.affectedUse){
          var aa = t.affectedUse[d];
          o.afU.push(getInitials(aa))
        }
      }else{
        o.afU.push("all")
      }
      impLyrsList.push(o) 
    }

    if(encoded===true){
        return encode(JSON.stringify(impLyrsList));
    } else if (encoded==='JSON'){
        return JSON.stringify(impLyrsList);
    } else {
        return impLyrsList;
    }
}

function getInitials(string){
   var k='',f=string.split(' ');
   for (a in f){
     k=k+f[a][0]
   }
   return k;
}

function getSharedimp(x){
    $('#loader2').show()

    var yy=$.parseJSON(x);
    WHAFapp.selectableLayer.sharedListParams = yy.reverse();
    WHAFapp.selectableLayer.listSerial=-1;
    getSharedImpaired();
}

function getSharedImpaired(){
    if (WHAFapp.selectableLayer.loadStatus!=="ready" && WHAFapp.genCounter<1000){
    // status is "ready" when series of functions was exeuted for a layer
    //genCounter is a safeguard to stop loop from endlessly executing 
        setTimeout(function(){
        //if function was callled to add a lyaer before previous one completed, wait and try again
            getSharedImpaired();//serial);
            // console.log("REtrying...");
            WHAFapp.genCounter++
        },200);
    } else{

        var Y = WHAFapp.selectableLayer.sharedListParams;
        WHAFapp.selectableLayer.listSerial++
        var ser=WHAFapp.selectableLayer.listSerial;

        if(ser<Y.length){

            WHAFapp.selectableLayer.loadStatus=0
            var U=Y[ser]//U is the object with layer parameters (query items, symbology)
            console.log(U.title);

            //A. set water body. When completes, 
            //changes WHAFapp.selectableLayer.loadStatus to "WB";
            setWB(U.wb);

            //B. retrieve impairment params, 
            //changes WHAFapp.selectableLayer.loadStatus to "popImpLst"
            prePopulateImpList2();

            //C. set 'impaired for' checks
            //changes WHAFapp.selectableLayer.loadStatus to "impForChecked"
            setimpForChecks(U.afU);

            //D. Set symbology & title
            //changes WHAFapp.selectableLayer.loadStatus to "symbAdded"
            preLoadSymbfromParam(U);

            preSetCheckedParams(U.impParams)//,Y,ser+1)

        }

        else{
            $('#loader2').hide()
        }
    }
}

function setCheckedParams(list){//,Y,ser){
    console.log("sort this out")
  f=$('#impParamsListUl .checkbox input');
  if($('#impParamsListUl .checkbox input').length === undefined || $('#impParamsListUl .checkbox input').length ===0){
    setTimeout(function(){setCheckedParams(list)},300)//,Y,ser)},300)
  } else{
    // console.log($('#impParamsListUl .checkbox input').length, list)
      for (var t=0; t<f.length; t++){
    
        if (list.indexOf($(f[t]).val())!==-1){
            // console.log("CHECK OUT::: ", $(f[t]).val())
            $(f[t]).prop('checked',true);
        };

        if(t===f.length-1){
            // console.log("SELECTING IMPAIRMENT")
            impairSelect();
            getSharedImpaired();//ser); 
        }
      }  
    }
}


function preSetCheckedParams(list){//,Y,ser){
    if(WHAFapp.selectableLayer.loadStatus==="symbAdded"){
        setTimeout(function(){
            setCheckedParams(list);//,Y,ser);
        },100);
        ;    
    } else{
        setTimeout(function(){
            preSetCheckedParams(list);//,Y,ser);
        },100);
    }    
}

function preLoadSymbfromParam(d){
    if(WHAFapp.selectableLayer.loadStatus==="impForChecked"){
        loadSymbfromParam(d);    
    } else{
        setTimeout(function(){
            preLoadSymbfromParam(d);
        },100);
    }

}

function loadSymbfromParam(d){//based on stored/shared parameter, repopulates layer selexction and symbology box with previously set values 
    $('#lColPicker').val(d.lColor).css('background-color',$('#lColPicker').val());
    $('#fColPicker').val(d.fColor).css('background-color',$('#fColPicker').val());
    $('#impLayerNameBox').val(d.title);
    $('#lineWidth').val(d.lWidth);
    $('#pointSize').val(d.pSize);
    WHAFapp.selectableLayer.loadStatus="symbAdded"
    console.log(d.title)
}

function prePopulateImpList2(){
    // alert("prePopulateImpList2")
    if(WHAFapp.selectableLayer.loadStatus==="WB"){//ensures only called after water body was set (stream, lake or wetland)
        populateImpList();
    } else{
        setTimeout(function(){
            prePopulateImpList2();
        },100);
    }
}

function setimpForChecks(list){
    console.log(list)
    if(WHAFapp.selectableLayer.loadStatus==="popImpLst"){
    g=$('#impForListUl .checkbox input');
    if(list[0]==="all"){
        for (var i=0; i<g.length; i++){
            $(g[i]).prop('checked',true)     
            if (i===g.length-1){
                setTimeout(function(){WHAFapp.selectableLayer.loadStatus="impForChecked"},300)
            }
        }
        return
    } else {
        for (var i=0; i<g.length; i++){ 
            var j=getInitials($(g[i]).parent().text());
            if (list.indexOf(j)!=-1){
                $(g[i]).prop('checked',true)
            } else{
                $(g[i]).prop('checked',false)
            }
            if (i===g.length-1){
                setTimeout(function(){WHAFapp.selectableLayer.loadStatus="impForChecked"},300)
            }
        }
    }
    } else{
        setTimeout(function(){
            setimpForChecks(list);
        },200);
    }
}

function setWB(v){
  l = ['S','L','W'];
  for (var i=0;i<l.length; i++){
   var ch=$('#imp'+l[i]+'Check').val()[0];
   if(ch===v){
       $('#imp'+l[i]+'Check').prop('checked',true);
   } else{
       $('#imp'+l[i]+'Check').prop('checked',false);
   }
   if(i===2){
    WHAFapp.selectableLayer.loadStatus="WB";
   }
  }
}

function clearImpairLayers(){
    a=$('#selSortable1 .close')
    for (var b=0; b<a.length; b++){
     $(a[b]).click() 
    }
    if($('#impLayerButt').prop('checked')){
      $('#impLayerButt').click();
    } 
}

function resetLyrTitle(){
    WHAFapp.selectableLayer.givenName='';
    var plhld ='Layer name: '+WHAFapp.selectableLayer.name+' (click to rename)';
    $('#impLayerNameBox').attr('placeholder',plhld);

}

//FUNCTIONS REGULATING BEHAVIOR OF INDEX RELATED FEATURES
function indRelatedTabToggle(o){  
  if (o==="on"){
    $('#indRelatedTab').removeClass('disabled');
    $('#noIndexNote').hide();
    $('#adHocLayerListUl2').show();
  } else if (o==="off"){
    $('#indRelatedTab').addClass('disabled');
    $('#noIndexNote').show()
    $('#adHocLayerListUl2').hide();
    $('#indexTitleForLyrs').html('');
  }
}