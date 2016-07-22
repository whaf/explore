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
    try{shifteExtent()}catch(r){};
    try{legendd.refresh()}catch(r){};
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
            geomType = "esriGeometryPolygon";
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
  
    var Y=$('#adHocPlaceHolde1').val();
    var y = $.parseJSON(Y)

    for (var v=0;v<y.length; v++){  
       d = $.parseJSON( y[v] )
       if(d.name && d.name!== undefined){
         storeMapp(d)
       }
    }

    function storeMapp(item){
        var index = bMarkIndex();
        var ff=item;
        var item = ff.name
        var itemId = 'bMark_Map_'+index+'_'+item;
        var kk=JSON.stringify(ff);
        localStorage.setItem(itemId,kk);
        var te = '<li><a onclick="retrieveMap(\''+itemId+'\')" href="#" tabindex="-1"> <i class="bookiIcon icon-remove icon-white pull-right" onclick = "$(this).parent().remove(); localStorage.removeItem(\''+itemId+'\');" ></i>'+item+ '</a></li>'
        $('#bookMarkList').prepend(te);
    }

    // $('#bMarkGetter').hide();
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
    qCatchments.where = "CATCH_ID = '" + e + "'" + " AND " + t + "=" + t;
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

function getflyOver(){
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
        url = WHAFapp.flyOverUrl+'flyOver_'+r+'.kmz'
        addTour(url)
    } else{
        for (var i=0; i<exceptionList[r].length; i++){
            m=r+'_'+exceptionList[r][i];
            url = WHAFapp.flyOverUrl+'flyOver_'+m+'.kmz';
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



function shifteExtent(){//centers map after resizing

    if (WHAFapp.tempCetntPoint && WHAFapp.tempCetntPoint !== false){
        map.centerAt(WHAFapp.tempCetntPoint)
        WHAFapp.tempCetntPoint=false;
    }
}

// function hExpander(){//
//   var d = $('#hExpander a').text()
//   if(d===' (show details)'){
//       $('#mIndexWhy').show()
//       $('#mIndexNotes').attr('rows',1)
//       $('#hExpander a').text(' (hide details)')
//   }else if (d===' (hide details)'){
//       $('#mIndexWhy').hide()
//       $('#mIndexNotes').attr('rows',7)
//       $('#hExpander a').text(' (show details)')    
    
//   }else{
//       $('#mIndexWhy').hide()
//       $('#mIndexNotes').attr('rows',7)
//       $('#hExpander a').text('')
//   }
// }

function mTitler(clss, title){//Sets the title under the tabs in DSS section, and associated functionality
    $('#nextHeadsUp').text("Next")
    $('#backHeadsUp').text("Back")
 
    classList = $('#magicStepTitle').attr('class').split(/\s+/);
    
    for (t in classList){
        $('#magicStepTitle').removeClass(classList[t])
    }  
    
    if (clss==='mStep2'){
        removeFirstLayer(); hideLegend(); $('#indexTitle_slider').hide(); 
        if ($('#charLoopIntro').css('display')==='none'){
            $('#mCtrlAdd, #mCtrlL, #mCtrlR').hide();
        }else{
            $('#mCtrlAdd, #mCtrlL, #mCtrlR').show();
        }
    } else if (clss==='mStep3'){
        if ($('#overViewIntro').css('display')==='none'){
            $('#mCtrlAdd, #mCtrlL').hide();
            $('#mCtrlR').show();            
        }else{
            $('#mCtrlAdd, #mCtrlL, #mCtrlR').hide();
        }
    } else if (clss==='mStep4'){
        resetAux();
        indexScroll('0');//brings back index layer where it was left off
        if ($('#indexLoopIntro').css('display')==='none'){
            $('#mCtrlAdd, #mCtrlL, #mCtrlR').show();
        }else{
            $('#mCtrlAdd, #mCtrlL,#mCtrlR').hide();
        }        
    } else if(clss==='mStep5'){
        $('#mCtrlR,#mCtrlL').show();$('#mCtrlAdd').hide();
    } else if (clss==='mStep1'){
      if ($('#scaleViewingPlace').css('display')==='none'){
           $('#mCtrlAdd, #mCtrlL').hide();
           $('#mCtrlR').show();
      }else{
           $('#mCtrlAdd, #mCtrlL, #mCtrlR').show();
      } 
      
    };

    $('#magicStepTitle').addClass(clss);
    titl='<h5>'+title+'<img onclick="popHelpPop();$(\'#helpPop\').modal(\'toggle\')" class="pull-right" src="./img/svgs/helpSign.svg"></h5>'
    $('#magicStepTitle').html(titl);
    if(clss!=='mStepEdit'){
        DSS_objectives.currentDssSection=clss;
    }
    popHelpPop();
}

function gaugeTitleEffect(){//sets on hover behavior for gauge title elements
  // var CMP=WHAFapp.currentMapParams;
  // var C=CMP.togglerC, Mj=CMP.togglerMj, Bsn=CMP.togglerBsn, U=CMP.togglerU, D=CMP.togglerD;
  
    $('#g1 a').mouseenter(function(){
      $('#g1 a').css({'background-color':'rgba(200,200,200,0.4)'})
    }).mouseout(function(){
      $('#g1 a').css({'background-color':'transparent'})
    })
    
    $('#g2 a').mouseenter(function(){
      $('#g2 a').css({'background-color':'rgba(200,200,200,0.4)'})
    }).mouseout(function(){
      $('#g2 a').css({'background-color':'transparent'})
    })

    $('#g3 a').mouseenter(function(){
      $('#g3 a').css({'background-color':'rgba(200,200,200,0.4)'})
    }).mouseout(function(){
      $('#g3 a').css({'background-color':'transparent'})
    })
        
    $('#g4 a').mouseenter(function(){
      $('#g4 a').css({'background-color':'rgba(200,200,200,0.4)'})
    }).mouseout(function(){
      $('#g4 a').css({'background-color':'transparent'})
    })

            
    $('#g5 a').mouseenter(function(){
      $('#g5 a').css({'background-color':'rgba(200,200,200,0.4)'})
    }).mouseout(function(){
      $('#g5 a').css({'background-color':'transparent'})
    })

}

function gaugesStartUp(){//Creates gauges for the health conditions part of the decision support. Gauges are part of global object and can be set with the .refresh(val) method
    console.log("starting gauges")
    if(! DSS_objectives.gauges.C ){
    DSS_objectives.gauges.C = new JustGage({
      id: "g1",
      value: 0,
      min: 0,
      max: 100,
      gaugeWidthScale: 0.4

    });
    }
    if(! DSS_objectives.gauges.Mj ){
      DSS_objectives.gauges.Mj = new JustGage({
        id: "g2",
        value: 0,
        min: 0,
        max: 100,
        gaugeWidthScale: 0.4
      });
    }
    if(! DSS_objectives.gauges.Bsn ){
      DSS_objectives.gauges.Bsn = new JustGage({
        id: "g3",
        value: 0,
        min: 0,
        max: 100,
        gaugeWidthScale: 0.4
      });
    }
    if(! DSS_objectives.gauges.Up ){
      DSS_objectives.gauges.Up = new JustGage({
        id: "g4",
        value: 0,
        min: 0,
        max: 100,
        gaugeWidthScale: 0.4
      });
    }  
    if(! DSS_objectives.gauges.Dn ){
      DSS_objectives.gauges.Dn = new JustGage({
        id: "g5",
        value: 0,
        min: 0,
        max: 100,
        gaugeWidthScale:0.4
      });
    }  
    $('#gaugeHeader').show()
    // gaugeStartUpAnim();
}

function gaugeStartUpAnim(reset){//animates all gauges such that they are set to 100 and then back to 0
  var scls=["C","Mj","Bsn","Up","Dn"]
  for (i in scls){
    if (reset!=='reset'){
          stutti(scls[i]);
      } else {
          DSS_objectives.gauges[scls[i]].refresh(0);
      }
    
  }
  function stutti(g){
      DSS_objectives.gauges[g].refresh(100);
      setTimeout(function(){
        DSS_objectives.gauges[g].refresh(0)
      },500)
  }
}

function resetIndexScorePage(){//sets gauges result for DSS health conditions section based on currently displayed index
    DSS_objectives.availableObjectives.tempCtr=0
    getWhafIndexField();
    gaugeStartUpAnim('reset');
    getScores();
}

function updateCtmntGauge() {
    var result = "N/A";
    try{result=DSS_objectives.currentScores.catchment[DSS_objectives.availableObjectives.currentIndexField]}catch(u){}
    if (result===null || result === NaN || result === undefined){
        console.log(result)
        result='N/A'
    }
    try{DSS_objectives.gauges.C.refresh(result)}catch(u){};
    return result;  
}

function getCtmntScores(){//queries score values of catchemnt
    console.log("Getting catchment Scores")
        n=70
        var iService = assessmentURL+'/'+n,//DSS_objectives.availableObjectives.currentIndexService,
        // console.log(iService)
        C=WHAFapp.currentMapParams.Catchment, iCtmentQT, n=(new Date).getTime(),r;
        iCtmentQT = new  WHAFapp.QueryTaskCons(iService);
        console.log(iCtmentQT)
        r=new  WHAFapp.QueryCons;
        r.returnGeometry = false;
        r.outFields = ["*"];
        m="CATCH_ID = '" + C +"' AND " + n + "=" + n;
        r.where = m;
        console.log(m)
        try{iCtmentQT.execute(r, saveVals)}catch(u){}//update catchment gauge
        console.log("retrieving catchment vals: ")
        getScoreAtScales()//update all other scale gauges
    
    function saveVals(e){
        DSS_objectives.currentScores.catchment=e.features[0].attributes;
        try{getWhafIndexField()}catch(t){};
    }
}


function getScores(){//get all index scores at all scales for catchment where location mark is set
    var ct,bt,mt,g;
    
    ct = WHAFapp.currentMapParams.Catchment
    bt = WHAFapp.currentMapParams.crossHuc4
    mt = WHAFapp.currentMapParams. crossmajor
    g = "('"+ct+"','"+bt+"','"+String(mt)+"')"

    qScaleScores = new  WHAFapp.QueryCons;
    qScaleScores.returnGeometry = false;
    qScaleScores.outFields = ["*"]
    qScaleScores.where = "wsid in "+g;
    console.log(qScaleScores.where)
    qtScaleScores = new  WHAFapp.QueryTaskCons(scoresByWsidUrl);
    qtScaleScores.execute(qScaleScores, showScores);

  function showScores(e) {
      var r = e.features
      var scoresObj={}
      for (var i=0; i<r.length; i++){
         var m = r[i].attributes.scale;
         scoresObj[m]=r[i].attributes
      }
      console.log(scoresObj)
      DSS_objectives.currentScores=scoresObj;
      getCtmntScores();
      // try{getScoreAtScales()}catch(err){};
  }  
}


function getScoreAtScales(){//update gauges 

    var out={},result,yField, scoresOb;
    try{scoresOb = DSS_objectives.currentScores}catch(u){};
    try{yField = DSS_objectives.availableObjectives.currentIndexField.toLowerCase()+"_mean"}catch(u){};
    
    scaleScoreGet('downstream','Dn');
    scaleScoreGet('upstream','Up');
    scaleScoreGet('major','Mj');
    scaleScoreGet('basin','Bsn');
    function scaleScoreGet(scale,gauge){
        result='N/A';
        try{DSS_objectives.gauges[gauge].refresh(0)}catch(u){};
        try{var scl = scoresOb[scale]}catch(u){};
        try{result = scl[yField]}catch(u){};
        if (result===null || result === NaN || result === undefined){
            result='N/A'
        }
        try{DSS_objectives.gauges[gauge].refresh(result)}catch(u){};  
        try{out[gauge]=result}catch(u){};                     
    }
    try{out.C=updateCtmntGauge()}catch(u){};

    return out;
}

function getWhafIndexField(){//retrieves the field name for the currently displayed index score
    
    var indLayer,n,m=map.getLayersVisibleAtScale(),fieldName;
    DSS_objectives.availableObjectives.currentIndexField='';
    for (t in m){
      if(m[t].indexIdentifier ==='WHAFscore'){
        indLayer=m[t]
      }
    }
    n=indLayer.visibleLayers[0]
    if (! Number(n)){
      console.log('Error, likely no index layer displayed or an extrapolated WHAF index layer') 
      return 
    }
    service = assessmentURL+'/'+n;
    json=service +'?f=json';
    $.getJSON( json, function( data ) {     
      $.each( data, function( key, val ) {
        if(key==='drawingInfo'){
        fieldName = val.renderer.field ;
          DSS_objectives.availableObjectives.currentIndexField=fieldName;

          try{getScoreAtScales()}catch(r){}//gets scores at scales to update gauges 

          DSS_objectives.availableObjectives.currentIndexService=service;
          // console.log(service)
        }
      });
    });
    rememberState();
}


function listScores(){//gets a list of index numbers for layer id's of available index scores at catchment level, excluding extrapolated ones
    var list=[],shortScoreList=[],l;
    for (t in indexdescNewJson){
        if(indexdescNewJson[t].catchmentId && indexdescNewJson[t].catchmentId != ''){
            indexdescNewJson[t].obName=t;
            list.push(indexdescNewJson[t])
        }
        if(indexdescNewJson[t].metrics && indexdescNewJson[t].metrics.length>0){
            var metricList = indexdescNewJson[t].metrics;
            for (var i=0; i<metricList.length; i++){
                metricList[i].obName=t;
                var mm=metricList[i].name;
                if (mm.indexOf("extrapolated")===-1){//excludes etrapolated index layers
                    list.push(metricList[i])         
                }
            }
        }
    }
    
    

   //Exclude certain indices (in indexExclude array)
    for (var ii=0;ii<indexExclude.length; ii++){
      for (var i=0;i<list.length; i++){
       var e = list[i].name;
        if (e===indexExclude[ii]){
         console.log(e)
         //var m = i//list.indexOf(list[i]);
         list.splice(i,1)
        }
      }
    }

    DSS_objectives.availableObjectives.scoresList = list;

    //     for (var i=0; i<DSS_objectives.availableObjectives.scoresList.length; i++){
    //      var n=DSS_objectives.availableObjectives.scoresList[i].name 
    //      if (n.indexOf("extrapolated")===-1){
    //        shortScoreList.push(DSS_objectives.availableObjectives.scoresList[i]) 
    //      }
    //     }
    // var theList=DSS_objectives.availableObjectives.shortScoreList=shortScoreList


  rememberState();
}

function setDssLayout(){//sets the  for the DSS module; reduces map size and recenters it 
    WHAFapp.tempCetntPoint=map.extent.getCenter()
  
    if ($('#DSS_button').hasClass('btn-warning')){
        $('#DSS_button').removeClass('btn-warning');
        $('#DSS_buttonP').fadeOut();

        var o={
            'border': '0px solid grey',
            'border-radius': '0px',
            'width':'100%',
            'margin-top':'0px',
            'padding':'0px'
        }
        $('#map').css(o)
        $('#magicBox').hide()  
        $('#scaleButtonPlace .btn-group').show()
    } else{
        $('#DSS_button').addClass('btn-warning');  
        $('#DSS_buttonP').fadeIn();
        $('#scaleButtonPlace .btn-group').hide()
        try{gaugeTitleEffect()}catch(err){};
        $('#mCtrlR').show();
        var g={
            border: '1px solid grey',
            'border-radius': '4px',
            width:'60%',
            'margin-top':'0px',
            'z-index':100,
            padding:'0px'
        }
        $('#map').css(g)
        resizeElementHeight('map',2)
        $('#magicBox').show();
        $('#mapToolToggle').draggable();
        if (!DSS_objectives.availableObjectives.scoresList || DSS_objectives.availableObjectives.scoresList  === undefined){
            listScores()   
        }
        if($('#HydUl ul').html()===''){//ensures this only happens once
            populateManagementActions()            
        }

    }
}

function magicPageReset(){//resets functionaility triggered by various DSS stages
    if ($('#DssStarImage').hasClass('btn-warning')){
        $('#DssStarImage').click();
    };
}

function magicScroll(op){//'landing function' for next and back arrows on DSS
  var dclass=$('#magicStepTitle').attr('class').split(/\s+/)[0];
  magicPageReset()
  if (dclass ==='mStep4'){
    $('#selectButGrp').hide();
    indexScroll(op)
  } else if (dclass ==='mStep2'){
    $('#selectButGrp').hide();
    addCaracteristic();
     charScroll(op)
  } else if (dclass ==='mStep1'){
    scaleScroll(op)
  } else if(dclass ==='mStep3'){
    healthOverviewScroll(op)
  }
  else if(dclass ==='mStep5'){
    evalScroll(op)
  }
  rememberState();
  loopRefs();
}

function evalScroll(op){
    var n = DSS_objectives.evalStep;
    $('#mCtrlR,#mCtrlL').show();$('#mCtrlAdd').hide()
    if (op==='+'){
        if(n===0){
            DSS_objectives.evalStep=1;
            $('.dMatrixSection').hide();
            $('#manActSel, #manActSelB').show();
            populateManagementActions();
            $('#mFactorsTitle').text('Step 1/3: Select management actions');
            $('#evalStepDesc').text('')
        }
        if(n===1){
            evalManagementActions();
            assessManagementActions_step2();
        }
        if(n===2){
            addManActElement('manActionsSnaps');
            DSS_objectives.evalStep=3;
            $('.dMatrixSection').hide();
            $('#tradeOffs').show();
            $('#mFactorsTitle').text('Step 3/3: Evaluate trade-offs');
            $('#evalStepDesc').show().text('What are the down sides of the selected management actions? (under development)')
        }

    } else if(op==='-'){
        if(n===2){
            DSS_objectives.evalStep=1;
            $('.dMatrixSection').hide();
            $('#manActSel, #manActSelB').show();
            $('#mFactorsTitle').text('Step 1/3: Select management actions');
            $('#evalStepDesc').text('')
        }
        if(n===3){
            DSS_objectives.evalStep=2;
            $('.dMatrixSection').hide();
            $('#targetVerification').show();
            $('#mFactorsTitle').text('Step 2/3: Evaluate trade-offs');
            $('#evalStepDesc').show().text('How do solutions match the problems?')

        }
        if(n===1){
            $('.mBar.mStep4 a').click();
        }
    }
}

function scaleScroll(operator,zoom,skip){

    var zoom = zoom || 'zoom';

    if(operator==='+' && DSS_objectives.displayedScaleStep<3){
        //check if a location mark was set
        if(skip===undefined && DSS_objectives.displayedScaleStep===0 && DSS_objectives.point.type!=='point'){
            d='No location selected'
            f='This can still work, but you will miss important functionality, e.g. setting relevant scales and getting health score values.' 
            $('#mWarningTitle').text(d)
            $('#mWarningText').text(f);
            $('.warnButton').hide()
            $('#mWarningProceedScale, #mWarningSetLocation').show()
            $('#magicWarning').modal('show');
            return
        } else {
            DSS_objectives.displayedScaleStep=DSS_objectives.displayedScaleStep+1;
        }
    } else if(operator==='-' && DSS_objectives.displayedScaleStep>0){
        DSS_objectives.displayedScaleStep=DSS_objectives.displayedScaleStep-1
    }
    
    if (DSS_objectives.displayedScaleStep===0){
        $('#scaleViewingPlace, #mCtrlAdd, #mCtrlL').hide();$('#locationSettingPlace').show();

    }else if (DSS_objectives.displayedScaleStep===1){
        $('#locationSettingPlace').hide();$('#scaleViewingPlace, #mCtrlAdd, #mCtrlL, #mCtrlR').show();   
        if (zoom === 'zoom') {map.setExtent(getBasinExtent(WHAFapp.currentMapParams.crossHuc4))};
        scaleSymbology('basin','mask');scaleSymbology('major','outline');scaleSymbology('upstream','outline');scaleSymbology('downstream','outline');
        DSS_objectives.decisionObjectives.scalesViewed=true;//records that scales were viewed
    }else{
        $('#mCtrlAdd,#mCtrlL,#mCtrlR').show();
        $('.mBar.mStep2 a').click()
    }
    loopRefs();
}

function locationSetWarning(){//allows user to use or change location for DSS module upon startup, if a location is already set. 
    var d,f;
    if(DSS_objectives.point.type && DSS_objectives.point.type ==='point' && $('#DSS_button').hasClass('btn-warning')){
        d='Use selected location?'
        f='Would you like to continue with the location that is currently selected? Alternatively, you may set another placemark on the map or select a major watershed.' 
        $('#mWarningTitle').text(d)
        $('#mWarningText').text(f);
        $('.warnButton').hide()
        $('#mWarningChangeLoc, #mWarningUseCurrentLoc').show()
        $('#magicWarning').modal('show');
    }
}

function getSelectedObjectives(viewSelected){
    var nameList=[],choiceList=[];

    var rows = $('#table1 tbody input')
    for (var n=0;n<rows.length; n++){
        if($(rows[n]).prop('checked')){
           name=$(rows[n]).parent().text();
           nameList.push(name);
        }
    }

    for (var i=0; i<DSS_objectives.availableObjectives.scoresList.length; i++){
       var n=DSS_objectives.availableObjectives.scoresList[i].name 
       if (nameList.indexOf(n)!==-1){
         DSS_objectives.availableObjectives.scoresList[i].displaySelect=true;
         choiceList.push(DSS_objectives.availableObjectives.scoresList[i])
       }else{
        DSS_objectives.availableObjectives.scoresList[i].displaySelect=false;
       }
    }

    if (viewSelected) {
        DSS_objectives.decisionObjectives.viewSelected=true;
    }                            
    DSS_objectives.availableObjectives.ChoiceList=choiceList
}


function healthOverviewScroll(operator){
    var d,f,g,h;
    if(operator==='+'){
        try{addTableElement('tableSnap')}catch(u){}
        d="Review Health Indices" 
        f="The next section will display full maps of the health indices. You may change the maps, add features and write notes before keeping them.<br><br> "
        g="You may view all available health indices, or limit the exploration to only those selected in the overview section" 
        h=f+g
        $('#mWarningTitle').text(d)
        $('#mWarningText').html(h);
        $('#magicWarning').modal('show');
        $('.warnButton').hide()
        $('#mWarningViewSelected, #mWarningViewAll, #mWarningSkipReview').show();
    }
}

function zoomToScale(scale){
    if (scale==='upstream'){
        zoomUp()        
    } else if (scale==='basin'){
        map.setExtent(getBasinExtent(WHAFapp.currentMapParams.crossHuc4))
    } else if (scale==='major'){
        zoomToSelectedMajor()
    } else if (scale==='catchment'){
        CtmentZoom()
    }

}

function indexScroll(operator,keep){// On DSS health conditions section, moves indices
  var showingIndex,progress,prev,next,dis,nextName,progressFloat,theList;
  
    if (operator==='on'){
        DSS_objectives.disaplayedIndex=0;
    }
    if (operator==='all'){
        DSS_objectives.disaplayedIndex=0;
        DSS_objectives.decisionObjectives.viewSelected=false; 
    }

    if(DSS_objectives.disaplayedIndex===-1){
        $('#mCtrlR, #mCtrlL, #mCtrlAdd').hide();
    }else{
        if (!$('#magicStepTitle').hasClass('mStep3')){
            $('#mCtrlR, #mCtrlL, #mCtrlAdd').show();
        }
    }



  if(DSS_objectives.decisionObjectives.viewSelected===true){
      var u=DSS_objectives.availableObjectives.scoresList;
      theList=[];
      for (var i=0;i<u.length; i++){
        if(u[i].displaySelect && u[i].displaySelect!==undefined){
            theList.push(u[i])
        }
      }

  }else{
    theList=DSS_objectives.availableObjectives.scoresList;
  }

  if (operator==='+' && theList.length-1 > DSS_objectives.disaplayedIndex){
    if (!$('#magicStepTitle').hasClass('mStep3')){
        $('#mCtrlR, #mCtrlL, #mCtrlAdd').show();
    }else{
        $('#mCtrlR').show();
    }
    if (keep){
        addObjective('keep')
    }

    DSS_objectives.disaplayedIndex++; 
    console.log("Upping Index") 
  } else if (operator==='-' && DSS_objectives.disaplayedIndex > 0){
    DSS_objectives.disaplayedIndex--;
  } else if(operator==='0'){
    DSS_objectives.disaplayedIndex=DSS_objectives.disaplayedIndex;//just continue
  } else if (operator==='-' && DSS_objectives.disaplayedIndex === 0){
    $('.mBar.mStep2 a').click()//move back to charcterization
  }
  else{
    console.log("end of index list")
    return false
  } 


  showingIndex = theList[DSS_objectives.disaplayedIndex];
  if (showingIndex && showingIndex!== undefined){
      var component =compByLet(showingIndex.obName) 
      progress=String(DSS_objectives.disaplayedIndex+1)+'/'+String(theList.length)+' ('+component+')';
      progressFloat=(DSS_objectives.disaplayedIndex+1)/theList.length;
      respond(showingIndex.catchmentId,showingIndex.name);//loading index score layer

      getWhafIndexField();
      $('#mIndexTitle').text(showingIndex.name)
      $('#mIndexDesc').text(showingIndex.indexSummary)
      $('#indexProgress').text(progress);

      $('#mIndexWhyDesc').val(showingIndex.why)
      //console.log(showingIndex.why)
      $('#mIndexNotes').val('');
      
      DSS_objectives.tempRel=0;

      if(DSS_objectives.disaplayedIndex>0){
          prev="Previous index: "+theList[DSS_objectives.disaplayedIndex-1].name;
      }else{
          prev="Back to context"
      }
      if(DSS_objectives.disaplayedIndex<theList.length-1){
          nextName=theList[DSS_objectives.disaplayedIndex+1].name;
          next="Next index: "+nextName;
          dis="Previous index: "+nextName;

      }else{next=""}
      $('#dismissHeadsUp').text(dis);
      $('#nextHeadsUp').text(next);
      $('#backHeadsUp').text(prev);
  }
  return progressFloat;
}

function compByLet(name){
  var out, list=["Hydrology", "Biology", "Connectivity", "Geomorphology","Water Quality"]
  for (i in list){
    if (name.slice(0,1)==list[i].slice(0,1)){
        out = list[i]
        }
  }
  loopRefs();
  return out
}


function charScroll(ii){//loads successive context layers in DSS context section.s
    var prev,next;

    if(DSS_objectives.displayedContextMap===-1){
        $('#mCtrlR, #mCtrlL, #mCtrlAdd').hide();
    }else{
        $('#mCtrlR, #mCtrlL, #mCtrlAdd').show();
    }

    switch (ii){
        case '+':
            if (DSS_objectives.displayedContextMap>=charLayers.length-1){
                $('.mBar.mStep3 a').click();
                return
            } else{
                $('#charLoopIntro').hide();
                $('#mCtrlR, #mCtrlL, #mCtrlAdd').show();
                DSS_objectives.displayedContextMap++;
            }
            break;
        case '-': 
            if (DSS_objectives.displayedContextMap===0){
                $('.mBar.mStep1 a').click();
                return
            }else{
                DSS_objectives.displayedContextMap--;                
            }
            break;
        case '0':
            DSS_objectives.displayedContextMap=DSS_objectives.displayedContextMap;
            break;

    }
    var i = DSS_objectives.displayedContextMap, j=i+1; 
    var l = charLayers.length,prog =" ("+j+"/"+l+")" ;

    var defaulti = function(){
        var d=WHAFapp.currentMapParams.mapFeatures, out=""  
        for (var i=0; i<d.length; i++){
            out=out+d[i]+',0,0]'
        }
        return out
    }

    if(charLayers[i] && charLayers[i] !== undefined){
        $('#charProgress').text(charLayers[i].section+prog)
        $('#mCharTitle').text(charLayers[i].title)
        $('#mCharDesc').html(charLayers[i].text)
        if (charLayers[i].url && charLayers[i].url.length>0){
            if(i!==0){removeHillShade()}
            auxFeatObjectUrl = {};
            sortableLayerRemover();
            getLayersIn(charLayers[i].url);
        }else{
            if(i!==0){removeHillShade()}
            auxFeatObjectUrl = {};
            sortableLayerRemover();
            getLayersIn(defaulti());      
        }
        try{charLayers[i].check()}catch(e){}
    }

    if(i===3){$('#soilRads').show()}else{$('#soilRads').hide()}//for soil context, show soil type selection


    if(i>0){
      prev="Previous context map: "+charLayers[i-1].title;
    }else{
      prev="Back to scales"
    }
    if(i<charLayers.length-1){
      next="Next index: "+charLayers[i+1].title;
    }else{next="Next: health conditions"}
    $('#nextHeadsUp').text(next);
    $('#backHeadsUp').text(prev);

    loopRefs();

}


function soilsAux(c,i){//switches between different soils auxiliary layers in context section of the DSS 
    var nm,so;
    if(i==='soilSand'){
        nm = 'Soils - Percent Sand'
        so =    '2.12,0,0]1.11,0,0]1.12,0,0]1.13,0,0]1.14,0,0]2.11,0,0]1.53,1,0]1.54,0,0]1.55,0,0]1.56,0,0]'
    }else if (i==='soilSilt'){
        nm = 'Soils - Percent Silt'
        so = '2.12,0,0]1.11,0,0]1.12,0,0]1.13,0,0]1.14,0,0]2.11,0,0]1.53,0,0]1.54,1,0]1.55,0,0]1.56,0,0]'
    }else if (i==='soilClay'){
        nm = 'Soils - Percent Clay'
        so = '2.12,0,0]1.11,0,0]1.12,0,0]1.13,0,0]1.14,0,0]2.11,0,0]1.53,0,0]1.54,0,0]1.55,1,0]1.56,0,0]'
    }else if (i==='soilOrgMatter'){
        nm = 'Soils - Percent Organic Matter'
        so = '2.12,0,0]1.11,0,0]1.12,0,0]1.13,0,0]1.14,0,0]2.11,0,0]1.53,0,0]1.54,0,0]1.55,0,0]1.56,1,0]'  
    } 
    auxFeatObjectUrl = {};
    sortableLayerRemover();
    getLayersIn(so);
    $('#mCharTitle').text(nm);
}

function removeHillShade(){
    $('#hillShadeCheck').prop('checked', true);
    $('#hillShadeCheck').click();
}

function extLyrDem(url){//loads and populates layers from ArcGIS online in DSS context section, especially geared towards demographics layers.  
    var urlJson=url+'?f=pjson', name, description,layerItId;
    $.getJSON( urlJson, function( data ) {
        name = data.name;
        description = data.description;
        $('#mCharTitle').html(name);
        auxFeatObjectUrl = {};
        sortableLayerRemover();
        description = description + "<br><br>Source: Esri (ArcGIS online)";
        $('#mCharDesc').html(description);
        $('#addedLayerName').val(name);
        $('#AddingRestPoint').val(url);
        preProcessRestUrl();
        layerItId = String(layerItemID);
        $('#'+layerItId+' input:checkbox').click();
    })
}

function nameExtLyr(url){

}

function opPop(id){//changes appearance of scale setting option buttons in DSS 'what scale' section (By Location, By Watershed...)
    transformExpression = 'scale(1.1,1.1)';
    origExpression ='scale(1,1)';
    var a = {'transform':origExpression,opacity:0.7};
    var b = {'transform':transformExpression,opacity:1};    
    $('#mScaleOptions btn').css(a);
    $('#'+id).css(b);
}

function majorWatershedLocator(){//temporarily cahnges set location action to select a major watershed instead of setting a location mark 
    WHAFapp.watershedZoom=true;
}

function activateDssStarImage(){//activates the location setter if inactive 
    if(DSS_StarState===false){
        $('#DssStarImage').click()
    }
}

function magicSetter(){//regulates popup and other display settings in DSS panel (executed after 'magic.html' loads)
    var j,k,l,m,n,o,p,q,r;
    setTimeout(function(){
        // $('#mScaleOption1').hover(function(){$('.byLocation').show()},function(){$('.byLocation').hide()});
        // $('#mScaleOption2').hover(function(){$('.byWatershed').show()},function(){$('.byWatershed').hide()});
        // $('#mScaleOption3').hover(function(){$('.byBookmark').show()},function(){$('.byBookmark').hide()});

        j={'color':'#ddd"','margin-top':'50px','font-weight':'lighter','margin-left':'-20px','text-align':'center'}
        k={'text-align':'center','margin-top':'0px'}
        l={'max-width':'300px'}

        $('#scaleOpTitle div h3').css(j)
        $('#scaleOpsSnaps div').css(k)
        $('#scaleOpsSnaps div img').css(l)

        m={'margin':'0px','margin-top':'15px'};
        n={opacity:0.6,color:'#fff'};
        q={opacity:1,color:'#fff'};
        o={'margin-bottom':'1px',cursor:'pointer'};
        p={color:'#fff'};

        $('#gaugesSub,.scalesSub').css(m);
        $('.zoomIcon').parent().css(q);
        $('#gaugesSub a, .scalesSub a, #scaleInqSub a').parent().css(n).hover(function(){$(this).css(q)},function(){$(this).css(n)});
        $('#gaugesSub div, .scalesSub div, #scaleInqSub div').css(o);
        $('#gaugesSub a, .scalesSub a, #scaleInqSub a').css(p);

        r={'pointer-events': 'none',cursor: 'default'};
        $('#relTitle').css(r);

    },5000)
}

function setRel(n){//Temporarily stores relevance value (1-5) set by user in DSS health Conditions section
    // $(n).parent().children().css('font-weight','normal')
    // $(n).css('font-weight','bold')
    // var t=(Number($(n).text()))
    var t=Number($(n).parent().text())
    DSS_objectives.tempRel=t 
}


function addObjective(wh,place,notesSource){//stores map views, notes and weights in DSS module as set by user

console.log("Adding objective")
    var nm,nt,params = showShare('store'), dsc,lDesc, hVals;
    if(place){//holds place on report for editting
        placeId=String(place);
    }else{
        placeId=String(DSS_objectives.decisionObjectivesSerial);
    }

    if(notesSource==='edits'){
        nt = $('#mEditNotes').val();
        nm = $('#mEditTitle').val();
        dsc = '';
        lDesc = '';
    }else{
        nt = $('#mIndexNotes').val();
        nm = $('#mIndexTitle').text();
        dsc = $('#mIndexDesc').text();
        lDesc=$('#mIndexWhyDesc').val();
    }

    var l = DSS_objectives.decisionObjectives.indexScore;

    var gaugeVal = getScoreAtScales();

    var dict={
        id:placeId,
        name:nm,
        notes:nt, 
        params:params,
        printParams:mapJSON({serial:'serial'}),
        gaugeVals:gaugeVal,
        desc:dsc,
        fieldName:DSS_objectives.availableObjectives.currentIndexField,
        indexLayer:healthScoreIndex[WHAFapp.currentMapParams.indexLayer],
        longDesc:lDesc
    };

    console.log(dict)

    if(DSS_objectives.tempRel){
         dict.weight=DSS_objectives.tempRel;
    }

    if(wh==='keep'){
        var set=false;
        for (var i=0;i< l.kept.length; i++){
          if(l.kept[i].id===dict.id){
            l.kept[i]=dict;
            set=true
          }
        } 
        if(set==false){
            l.kept.push(dict);   
        }

        addDssSnap(placeId,'healthMapSnaps')
        try{WhafAlert('add','Map successfully added!','This map view and the notes about it were successfully added to your report. You will be able to view, edit and print them later.',2000)}catch(u){}
    }  
    else if(wh==='overview'){
        l.overviewed.push(dict);
    }          
    else if (wh==='dismiss'){
        l.dismissed.push(dict);
        try{WhafAlert('dismiss','Map dismissed','This map view will not be included in your report',2000)}catch(u){}
    }
    if(!place){
        DSS_objectives.decisionObjectivesSerial++;
    }
    rememberState();
}

function addDssMap(wh,place,notesSource){//stores map views and notes in DSS module as set by user
    var nm,nt,params = showShare('store'),hVals,placeId;
    if(place){//holds place on report for editting
        placeId=String(place);
    }else{
        placeId=String(DSS_objectives.decisionObjectivesSerial);
    }

    if(notesSource==='edits'){
        nt = $('#mEditNotes').val();
        nm = $('#mEditTitle').val();
    }else{
        nt = $('#mScaleNotes').val();
        if (!$('#mScaleName').val() || $('#mScaleName').val()===''){
            nm = 'Map no. '+DSS_objectives.mapNameSerial;
            DSS_objectives.mapNameSerial++;
        } else{
            nm = $('#mScaleName').val();
        }

    }
    var l = DSS_objectives.decisionObjectives.scale;

    var dict={
        id:placeId,
        name:nm,
        notes:nt, 
        params:params,
        printParams:mapJSON({serial:'serial'})

    };

    if(wh==='keep'){
        var set=false;
        for (var i=0;i< l.kept.length; i++){
          if(l.kept[i].id===dict.id){
            l.kept[i]=dict;
            set=true
          }
        } 
        if(set==false){
            l.kept.push(dict);   
        }

        addDssSnap(placeId,'genMapSnaps')
        try{WhafAlert('add','Map successfully added!','This map view and the notes about it were successfully added to your report. You will be able to view, edit and print them later.',2000)}catch(u){}

    }  
    else if (wh==='dismiss'){
        l.dismissed.push(dict);
        try{WhafAlert('dismiss','Map dismissed','This map view will not be included in your report',2000)}catch(u){}
    }
    if (!place){
        DSS_objectives.decisionObjectivesSerial++;
    }
    rememberState();
}

function addCaracteristic(wh,place,notesSource){//stores map views, notes and weights in DSS module as set by user
   
    var lgd,nm,nt,params = showShare('store'), dsc = $('#mCharDesc').text(),placeId;
    var l = DSS_objectives.decisionObjectives.context;
    if(place){//holds place on report for editting
        placeId=String(place);
    }else{
        placeId=String(DSS_objectives.decisionObjectivesSerial);
    }

    if(notesSource==='edits'){
        nt = $('#mEditNotes').val();
        nm = $('#mEditTitle').val();
    }else{
        nt = $('#mCharNotes').val();
        nm = $('#mCharTitle').text();
    }

    lgd=$('#legendAux').clone()
    $(lgd).css('max-height','400px')
    console.log($(lgd).id)

  var dict={
        id:placeId,
        name:nm,
        notes:nt, 
        params:params,
        desc:dsc,
        legendHtml: lgd,
        printParams:mapJSON({serial:'serial'})

    };
    if(wh==='keep'){
        var set=false;
        for (var i=0;i< l.kept.length; i++){
          if(l.kept[i].id===dict.id){
            l.kept[i]=dict;
            set=true
          }
        } 
        if(set===false){
            l.kept.push(dict);   
        }
        addDssSnap(placeId,'charMapSnaps')
        try{WhafAlert('add','Map successfully added!','This map view and the notes about it were successfully added to your report. You will be able to view, edit and print them later.',2000)}catch(u){};
    }      
    else if (wh==='dismiss'){
        l.dismissed.push(dict);
        try{WhafAlert('dismiss','Map dismissed','This map view will not be included in your report',2000)}catch(u){};
    };
    if (!place){
        DSS_objectives.decisionObjectivesSerial++;
    }

    $('#mCharNotes').val('');
    rememberState();

}


function WhafAlert(action,title,text,duration){//indicates an action that took place; if duration added, disappears automatically
    $('#mHelpAlertTitle img').hide()
    if(action==='dismiss'){$('#helpAlertClose').show()}
    else if (action==='add'){$('#helpAlertCheck').show()}
    $('#mAlertInnTitle').text(title);
    $('#mHelpAlertText').text(text);
    $('#helpAlert').fadeIn()
    $('#helpAlert').draggable();
    if (duration){
       setTimeout(function(){$('#helpAlert').fadeOut(4500)},duration) 
    }  
}

function retrieveObjective(type, id){//repopulates notes, gauges and map view for stored objectives based on id. 
  list = DSS_objectives.decisionObjectives.indexScore
  for (f in list){
    if(list[f].id===id){
      setMe(list[f])
    }
  }
  
  function setMe(ob){
    $('#mIndexNotes').val(ob.notes);
    WhafMapConstructor(ob.params);
    
    if(ob.weight){
      $('#relButton'+ob.weight).click()
    }
    for (var key in ob.gaugeVals) {
      DSS_objectives.gauges[key].refresh(ob.gaugeVals[key])
    }
  }
  
  function setGaugeAdHoc(vals){
    for (var key in vals) {
      DSS_objectives.gauges[key].refresh(vals[key])
    }  
  }
}

function gettem(d,poly){//Performs an intersect query and/or a 'where' query logging a list of values for selected features.
                        //Also, optionally, adding features to map
                        //e.g. gets a list of AUID values for streams intersecting a watershed

                        //variables: 
                        //-d should be an object with the followign properties:
                            //-url of the service foe queried features 
                            //-symbol (already constructed esri symbol)
                            //-identifier (optional) to enable later manipulation of graphics on the map
                            //-addToMap (boolean), set to true of features are to be added to map
                            //-valsOut: field name for values that function returns (i.e. AUID)
                            //-where: an optional where clause
                            //e.g. {url:'http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_indexscores/MapServer/39',symbol:catOutline,identifier:'varda',addToMap:true,valsOut:'catch_id',where:"catch_id='1806300'"} 
                        //-poly is a polygon featureLayer, for example DSS_objectives.upPolyFL
  var url=d.url,valList=[],fset;
  var querTask = new WHAFapp.QueryTaskCons(url);
  var query = new WHAFapp.QueryCons();
  query.returnGeometry = true;
  query.outFields = ["*"];
  query.outSpatialReference = {"wkid": 102100};
  if (poly && poly !== undefined){
    query.spatialRelationship = WHAFapp.QueryCons.SPATIAL_REL_INTERSECT;
    query.geometry = poly.graphics[0].geometry;
  }
  if (d.where){
    query.where = d.where
  }
  
  querTask.on("complete",function(evt){
    fset = evt.featureSet;
    var symbol = d.symbol
    var resultFeatures = fset.features;
    var il = resultFeatures.length
    for (var i = 0; i < il; i++) {
      var graphic = resultFeatures[i];
      if(d.identifier){
        graphic.identifier=d.identifier;
      }
      graphic.setSymbol(symbol);
      if (d.addToMap){
        map.graphics.add(graphic);
      }
    }
    
    console.log( fset )
    
    if (d.valsOut){
      
      for (var i=0; i<fset.features.length; i++){
        var q=fset.features[i].attributes[d.valsOut]
        console.log(q)
        valList.push(q)
      }      
    }
    
    console.log(valList)
  })
  
  querTask.execute(query)
}

function setBestWorstOverview(){//an interim function to apply css as well as create tables. 
    var e = {
      'margin-top':'0px',
      'margin-left':'0px',
      'color':'rgb(201,251,201)',
      'text-align':'left',
      padding:'10px'
    }

    var f={
      'margin-top':'2.5em',
      'margin-bottom':'0.5em'
    }

    var g = {
      width:'25px',
      margin:'8px',
      'margin-left':'20px',
      'font-weight':'bold',
      padding:'2px',
      'text-align':'center',
      'border-width':'1px' 
    }
    var h={
      padding:'0px' 
    }

    var j={
      'margin-top':'20px'
    }
    var k={
      'font-size':'12px',
      'color':'rgb(201,251,201)'
    }
    var l = {
      'text-align':'center',
      'font-weight':'normal'//,
     // padding:'8px'
    }

    $('#overviewPlace').css(e)
    $('.mThresholds').css(f)
    $('.mThresholds input').css(g)
    $('.mThresholds btn').css(h)
    $('#mLowT1 input').css('border-color','red')
    $('#mHighT1 input').css('border-color','green')
    $('#overviewTable').css(j)

    var u='<div id="table1Place"><table id="table1" class="table table-bordered table-hover"> </table></div>'
    var p1='<thead> <tr> <th>Index</th><th>Catchment score</th><th>Watershed mean</th><th>Upstream mean</th><th>Basin mean</th></tr></thead>'
    var p2='<tbody>' 
    var p3=''
    var p4='</tbody>'

    v=DSS_objectives.decisionObjectives.indexScore.overviewed
    for (var y=0;y<v.length; y++){
      var k1 = '<tr><td class="scoreName">'

      var k2 = '<a href="#"><label class="checkbox"><input type="checkbox">'+v[y].name+'</label></a>'
      console.log(v[y].name);
      var k5a = '</td><td class="scoreTd cScore">';
      var k5b = '</td><td class="scoreTd mjScore">';
      var k5c = '</td><td class="scoreTd upScore">';
      var k5d = '</td><td class="scoreTd bsnScore">';
      var k6=v[y].gaugeVals.C;
      var k7=Math.round(v[y].gaugeVals.Mj);
      var k8=Math.round(v[y].gaugeVals.Up);
      var k9=Math.round(v[y].gaugeVals.Bsn);
      var k10='</td></tr>';
      var out = k1+k2+k5a+k6+k5b+k7+k5c+k8+k5d+k9+k10;

      p3=p3+out;
    }

    var P = p1+p2+p3+p4

    $('#overviewTable').append(u);
    $('#table1').html('');

    $('#table1').append(P)
    $('#overviewTable, #overviewTable a').css(k)
    $('.scoreTd').css(l);
   
    DSS_objectives.thresholds.low=50;
    setTableColors()

    $('.scoreName').hover(function(){
        tableValShow($(this).text())
    }).click(function(){tableValSretrieve($(this).text())});

    $('#thresholdInput').show().css({'margin-top':'-40px'})
    $('#thresholdInput input').on('change',function(){thresholdColorChanger(); refreshScorsAtScalePerIn()})

    function tableValShow(texti){
      var v=DSS_objectives.decisionObjectives.indexScore.overviewed;
      for (var i=0; i<v.length; i++){
        
        if (v[i].name===texti){
          $('#genOnIndex').html('<strong>'+v[i].desc+'</strong><br>')
          $('#noteOnIndex').html('NOTES: '+v[i].notes)
        }
      }
    }

    function tableValSretrieve(texti){
      var v=DSS_objectives.decisionObjectives.indexScore.overviewed;
      for (var i=0; i<v.length; i++){ 
        if (v[i].name===texti){
          //WhafMapConstructor(v[i].params)
        }
      }  
    }
    rememberState();
}

function thresholdColorChanger(){
    var l=$('#mLowThresVal').val(),h=$('#mHighThresVal').val();
    if(l<h){
        DSS_objectives.thresholds.high=h;
        DSS_objectives.thresholds.low=l;
        setTableColors();          
    }else{
        alert("High threshold must be higher than low threshold. Please try again.")
    $('#mLowThresVal').val(DSS_objectives.thresholds.low);
    $('#mHighThresVal').val(DSS_objectives.thresholds.high);
    }

}

function setTableColors(){//colors background of DSS overview table cells based on threshold values of good and bad (global variables)
      
    var red,green,yellow;

    red = WHAFconfig.tableColors.low;
    green = WHAFconfig.tableColors.high;
    grey = WHAFconfig.tableColors.medium;

    $('#tblLrgL').css({'background-color':red})
    $('#tblLrgM').css({'background-color':grey})
    $('#tblLrgH').css({'background-color':green})

      for (var i=0; i<$('.scoreTd').length; i++){
      var f = $('.scoreTd')[i]
      var z = Number($(f).text()) 
      if(z>=DSS_objectives.thresholds.high){
       $(f).css('background-color',green) 
      }else if(z<=DSS_objectives.thresholds.low){
       $(f).css('background-color',red) 
      } else{
        $(f).css('background-color',grey)//'rgb(255,191,0)')
      }
    }  

    indentMetricRows();
    modNA();
    function indentMetricRows(){//indents some rows if they constitute metrics of another row. 
        var y={'padding-left':'20px'},e
        var r = $('#table1 td.scoreName')
        for (var i=0; i<r.length; i++){
         e = $(r[i]).text()
         if(metricIndent.indexOf(e)!==-1){
            $(r[i]).css(y)
            }
        }
    }
    function modNA(){//applies special case for table cells that have no data
        var y,r,e;
        y={'background-color':'transparent'}
        r = $('#table1 td')
        for (var i=0; i<r.length; i++){
         var e = $(r[i]).text()
         if(e==="NaN" || e==="N/A"){
            $(r[i]).css(y)
            $(r[i]).text('N/A')
            }
        }
    }
}

function setLows(checked){
    if(checked){
        DSS_objectives.worst.show();
    } else{
        DSS_objectives.worst.hide();
    }
}

function setHighs(checked){
    if(checked){
        DSS_objectives.best.show();
    } else{
        DSS_objectives.best.hide();
    }
}

function DSS_bestWorstLayers(){//

  setTimeout(function(){

    var queried={
      url:'http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_indexscores/MapServer/39',//'http://pca-gis02.pca.state.mn.us/arcgis/rest/services/EDA/swedaV2/MapServer/26',
      symbol:blueFill,
      identifier:'best',
      addToMap:false,
      valsOut:'catch_id',
      where:"major="+WHAFapp.currentMapParams.crossmajor,
      scores:{}
    }

    var scoresObject={}
    var scoress = DSS_objectives.decisionObjectives.indexScore.kept
    var bigg={}

    for (var i=0; i<scoress.length; i++){
     bigg[scoress[i].fieldName]=scoress[i].weight 
    }

    queried.scores=bigg

    gettem2(queried)


    function gettem2(d){
      var url=d.url,valList=[],fset;
      var querTask = new WHAFapp.QueryTaskCons(url);
      var query = new WHAFapp.QueryCons();
      query.returnGeometry = false;
      query.outFields = ["*"];
      query.outSpatialReference = {"wkid": 102100};
      query.where = d.where
      
      querTask.on("complete",function(evt){
        fset = evt.featureSet;
        //console.log(fset)
        var symbol = d.symbol
        var resultFeatures = fset.features;
        var il = resultFeatures.length

        if (d.valsOut){  
          for (var i=0; i<fset.features.length; i++){
            var q=fset.features[i].attributes[d.valsOut]
            scoresObject[q]={}
            for (var t in d.scores){
             var index=t
             var score=fset.features[i].attributes[index]
             scoresObject[q][index]=score          
            }
            valList.push(q)
          }      
        }
        
        console.log(scoresObject)
        nextStep(scoresObject)
      })
      querTask.execute(query)
    }

    DSS_objectives.thresholds.high

    function nextStep(sObject){//get calculated score per catchment

      var denominator = 0, r = [], underThreshold=[],aboveThreshold=[];
      for (var i in queried.scores){
        denominator = denominator+queried.scores[i]
      }
      console.log("denominator: ", denominator)

      for (var z in scoresObject){

        var enumerator = 0
        for (var l in queried.scores){
          var val = sObject[z][l]*queried.scores[l]
          enumerator = enumerator+val
        }
        var k = enumerator/denominator
        sObject[z].calculatedVal = Math.round(k)
      }

      for (var r in sObject){

        if(scoresObject[r].calculatedVal<= DSS_objectives.thresholds.low){
          underThreshold.push(r)
        }
        if(scoresObject[r].calculatedVal>= DSS_objectives.thresholds.high){
          aboveThreshold.push(r)
        }

      }

      DSS_objectives["underThreshold"]=underThreshold
      DSS_objectives["aboveThreshold"]=aboveThreshold;
      
      gettem3(queried,DSS_objectives.underThreshold)

    }

    function gettem3(){
      var badList=DSS_objectives.underThreshold, goodList=DSS_objectives.aboveThreshold;
      var q = "catch_id = '"+badList[0]+"'"
      for (var i=1; i<badList.length; i++){
       q=q+" OR catch_id = '"+badList[i]+"'"     
      }

      var x = "catch_id = '"+goodList[0]+"'"
      for (var i=1; i<goodList.length; i++){
       x=x+" OR catch_id = '"+goodList[i]+"'"     
      }

      
      var querTask3 = new WHAFapp.QueryTaskCons('http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_indexscores/MapServer/39');
      var query3 = new WHAFapp.QueryCons();

      var querTask4 = new WHAFapp.QueryTaskCons('http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_indexscores/MapServer/39');
      var query4 = new WHAFapp.QueryCons();
      
      query3.returnGeometry = true;
      query3.outFields = ["catch_id"];
      query3.outSpatialReference = {"wkid": 102100};
      query3.where = q;

      query4.returnGeometry = true;
      query4.outFields = ["catch_id"];
      query4.outSpatialReference = {"wkid": 102100};
      query4.where = x;

      
      
      worstOutline = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 5]), 2), new dojo.Color([1, 225, 25, 0.4]));
      bestOutline = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 200, 5]), 1), new dojo.Color([125, 125, 125, 0]));
      
      loadBest(query4, bestOutline)
      loadWorst(query3, worstOutline)
      
    }


    function loadBest(quer,bestSymb) {
        if(DSS_objectives.best === undefined || DSS_objectives.best.loaded===false){
            DSS_objectives.best = new WHAFapp.FeatureLayerCons(queried.url, {
                maxAllowableOffset: 0,
                mode: WHAFapp.FeatureLayerCons.MODE_SELECTION,
                outFields: ["catch_id"]
            });
            DSS_objectives.best.on('load', function(){
                addCtments();
            })
            map.addLayer(DSS_objectives.best);                    
        }else{
            addCtments()
        }
        function addCtments(){
            DSS_objectives.best.setRenderer(new  WHAFapp.SimpleRendererCons(bestSymb));
            DSS_objectives.best.id = "bestGraphic";
            DSS_objectives.best.identifier = "bestWorstLine";
            try {
                DSS_objectives.best.selectFeatures(quer,WHAFapp.FeatureLayerCons.SELECTION_NEW);
                DSS_objectives.best.currentQuery=quer;
            } catch (s) {console.log(("failed to load 'best' layer"))}
        };
    }

    function loadWorst(quer,worstSymb) {
        if(DSS_objectives.worst === undefined || DSS_objectives.worst.loaded===false){
            DSS_objectives.worst = new WHAFapp.FeatureLayerCons(queried.url, {
                maxAllowableOffset: 0,
                mode: WHAFapp.FeatureLayerCons.MODE_SELECTION,
                outFields: ["catch_id"]
            });
            DSS_objectives.best.on('load', function(){
                addCtments();
            })
            map.addLayer(DSS_objectives.worst);                    
        }else{
            addCtments()
        }
        function addCtments(){
            DSS_objectives.worst.setRenderer(new  WHAFapp.SimpleRendererCons(worstSymb));
            DSS_objectives.worst.id = "worstGraphic";
            DSS_objectives.worst.identifier = "bestWorstLine";
            try {
                DSS_objectives.worst.selectFeatures(quer,WHAFapp.FeatureLayerCons.SELECTION_NEW);
                DSS_objectives.worst.currentQuery=quer;
            } catch (s) {console.log(("failed to load 'worst' layer"))}
        };
    }
  },2000);
  rememberState();
}

//FUNCTIONS SETTING INDEX/SNAPS IN SCALES

function snapPicker(k){  
  var n, l=DSS_objectives.decisionObjectives.indexScore.overviewed;
  for (var i=0;i<l.length;i++){
    if(l[i].name===k){
     var n=l[i].indexLayer;
     $('.snapSection').hide()
     $('#mSnapShotsArea'+n).show()

    }

  } 
  return n;
}

function squaresDssSetter(){

    $('.DSS_section').hide();$('#overviewPlace,#mSnapShotsArea').show()

    $('.scoreName').on('mouseenter',function(){ 
        var k=$(this).text();snapPicker(k);
    })    


    $('#table1 td.scoreTd').on("click",function(){fran1(this)});$('#table1 td.scoreTd').on("mouseenter",function(){fran2(this)});$('#table1').on("mouseout",function(){fran3()})

    function fran1(t){
    }

    function fran2(t){
        var tr=$(t).siblings(),k,r;
        $('#table1 td.scoreTd').css('opacity',0.5)
        $('#table1 td').removeClass('hoverFrame')
        $(t).addClass('hoverFrame').css('opacity',1);
        k=$($(tr)[0]).text();
        r = snapPicker(k);

        if($(t).hasClass('bsnScore')){
            smoothem(r,'basin')
        }else if($(t).hasClass('mjScore')){
            smoothem(r,'major')
        }else if($(t).hasClass('upScore')){
            smoothem(r,'upstream')
        }else if($(t).hasClass('cScore')){
            smoothem(r,'catchment')
        } 
    }

    function fran3(){
        var h={
            opacity:1,
            border:'0px solid grey',
        }
        $('#table1 td.scoreTd').css('opacity',1).removeClass('hoverFrame')
        $('.mapSquare').css(h)
    } 

    function smoothem(r,s){
        var j={
            opacity:1,
            border:'1px solid grey',
            'border-radius':'4px'
        };
        var m = {
            opacity:0.5,
            border:'0px solid #888'  
        };

        $('#sq_major'+r+', #sq_upstream'+r+', #sq_catchment'+r+',#sq_basin'+r).css(m) 
        $('#sq_'+s+r).css(j) 
    }
}

function setSquares(){

    resetAux();
    $('.mBar, .mCtrl').addClass('noMouser');
    if (DSS_objectives.point.type==="point" && WHAFapp.currentMapParams.Catchment===""){
        alert("Please select a location inside Minnesota");
        $('#DssStarImage').click();
        return
    }else if 
        (WHAFapp.currentMapParams.Catchment === undefined || WHAFapp.currentMapParams.Catchment ===""){
        alert("Please select a location");
        $('#DssStarImage').click();
        return
    } else{
        $('#overViewIntro').hide();
        $('#overviewProgPlace').fadeIn();
        // $('#magicControls').hide();

        DSS_objectives.disaplayedIndex=-1;
        indexScroll('+');

        squaresDssSetter()


      var theList = DSS_objectives.availableObjectives.scoresList,sq,mSnapi,h;
     
      
      for (i in theList){

        
        if(healthScoreIndex[theList[i].catchmentId]&& healthScoreIndex[theList[i].catchmentId]!== undefined){
            h=healthScoreIndex[theList[i].catchmentId];

            var mSnapi = '<div id="mSnapShotsArea'+h+'" class="snapShotsAreaStrip snapSection" style="position:relative"></div>'
            z={  
              width:'100%',
              height:'100%',
              'margin-top':'0px',
              position:'relative',
              padding:'5px',
              'background-color':'#000',
              'border-width':'0px',
              'z-index':1000
            }

            y={

              'background-color':'#500',
              position:'absolute',
              width:'45%',
              height:'45%',
              overflow:'hidden' 

            }

            a={  
              'margin-top':'1%',
              'margin-left':'1%'
            }

            b={  
              'margin-top':'1%',
              'margin-left':'52%'
            }

            c={  
              'margin-top':'42%',
              'margin-left':'1%'
            }

            d={  
              'margin-top':'42%',
              'margin-left':'52%'
            }


            $('#mSnapShotsArea').fadeIn()//.draggable()//.html('');
            $('#mSnapShotsArea').append(mSnapi);
            $('#mSnapShotsArea'+h).css(z)



            var list = ['basin','major','upstream','catchment']
            for (var i=0; i<list.length; i++){
              var id = list[i]+h;

              if (i===0){
                var titl="Basin: " + HUC_4s[WHAFapp.currentMapParams.crossHuc4]
                sq = '<div id="sq_'+id+'" class="mapSquare bsnSquare"><div class="sqTitle">'+titl+'</div></div>'      
              console.log(sq)
              } else if (i===1){
                var titl="Major Watershed: " + WHAFapp.currentMapParams.majorname
                sq = '<div id="sq_'+id+'" class="mapSquare mjSquare"><div class="sqTitle">'+titl+'</div></div>'      
           console.log(sq)
              } else if (i===2){
                var titl="Upstream Area"
                sq = '<div id="sq_'+id+'" class="mapSquare upSquare"><div class="sqTitle">'+titl+'</div></div>'            
             console.log(sq)
              } else if (i===3){      
                var titl="DNR-catchment "+WHAFapp.currentMapParams.Catchment
                sq = '<div id="sq_'+id+'" class="mapSquare cSquare"><div class="sqTitle">'+titl+'</div></div>'
              console.log(sq)
              }

              $('#mSnapShotsArea'+h).append(sq)
            }

            $('#sq_basin'+h).css(a)
            $('#sq_major'+h).css(b)
            $('#sq_upstream'+h).css(c)
            $('#sq_catchment'+h).css(d)
          }
        }
      
      $('.mapSquare').css(y);
      getBsn()
    }

}

function getBsn(){
    var ctr=0;
    resetAux();
    setTimeout(function(){
        scaleReset();
        map.setExtent(getBasinExtent(WHAFapp.currentMapParams.crossHuc4));
        $('#BsnMasker').click();
        scaleSymbology('major','outline');
        scaleSymbology('upstream','outline');
        catShower(2);
        snapper()        
    },2500)

    function snapper(){
        var title = ' ('+$('#mIndexTitle').text()+')',e;
        if(DSS_objectives.decisionObjectives.overview==='abort'){
            DSS_objectives.decisionObjectives.overview=false;
            return
        }
        WHAFapp.demikuluName=title
        setTimeout(function(){
            if (map.updating===false){
                var b = String(healthScoreIndex[WHAFapp.currentMapParams.indexLayer]);
                if (b && b !== undefined){
                    console.log("Updated Basin ",b)
                    addOverviewSnap('sq_basin'+b);
                    $('#sq_basin'+b+' .sqTitle').append(title)
                    addObjective('overview');
                };
                e=indexScroll('+');
                if (e===false){
                    getMj();
                }else{
                    snapper(); incProg(1,e)
                }
            }else{ 
                console.log("not updated");
                ctr++;
                if(ctr>35){
                    alert("Sorry, something went wrong. Let's start again.");
                    map.updating=false;
                    getBsn()
                    return
                }else{
                    snapper();                    
                }
            }
        },1500)
    }
}

function getMj(){
    console.log("MOVED TO MAJOR")
    DSS_objectives.disaplayedIndex=-1;
    indexScroll('+');
    scaleReset();
    zoomToSelectedMajor();
    $('#mjMasker').click();
    scaleSymbology('upstream','outline');
    catShower(2);
    snapper()
    function snapper(){
        var title = ' ('+$('#mIndexTitle').text()+')',e;
        console.log(title)
        if(DSS_objectives.decisionObjectives.overview==='abort'){
            DSS_objectives.decisionObjectives.overview=false;
            return
        }
        WHAFapp.demikuluName=title
        setTimeout(function(){
            if (map.updating===false){
                var b = String(healthScoreIndex[WHAFapp.currentMapParams.indexLayer])
                if (b && b !== undefined){
                    console.log("Updated major ",b)
                    addOverviewSnap('sq_major'+b);
                    $('#sq_major'+b+' .sqTitle').append(title)
                }
                e=indexScroll('+');
                if (e===false){
                    getUpstream();
                }else{
                    snapper(); incProg(2,e)
                }
            }else{ 
                console.log("not updated")
                snapper()
            }
        },500)
    }
}

function getUpstream(){
    console.log("MOVED TO UPSTREAM")
    DSS_objectives.disaplayedIndex=-1;
    indexScroll('+');
    scaleReset();
    zoomUp();
    $('#upMaskLink').click();
    scaleSymbology('major','outline');
    catShower(2);
    snapper()
    function snapper(){
        var title = ' ('+$('#mIndexTitle').text()+')',e;
        if(DSS_objectives.decisionObjectives.overview==='abort'){
            DSS_objectives.decisionObjectives.overview=false;
            return
        }
        WHAFapp.demikuluName=title
        setTimeout(function(){
            if (map.updating===false){
                var b = String(healthScoreIndex[WHAFapp.currentMapParams.indexLayer])
                if (b && b !== undefined){
                    console.log("Updated Upstream ",b)
                    addOverviewSnap('sq_upstream'+b);
                    $('#sq_upstream'+b+' .sqTitle').append(title)
                }
                e=indexScroll('+');
                if (e===false){
                    getCatchmentSnap();
                }else{
                    snapper();incProg(3,e); 
                }
            }else{ 
                console.log("not updated")
                snapper()
            }
        },500)
    }

}

function getCatchmentSnap(){
    console.log("MOVED TO CATCHMENT")
    var theList = DSS_objectives.availableObjectives.scoresList, list=[]
    for (i in theList){
        var h = healthScoreIndex[theList[i].catchmentId]
        if(h&& h!== undefined){
            list.push(h)        
        }
    }
    scaleReset();
    CtmentZoom();
    $('#indRemoveBut').click();
    // majors.setOpacity(0) 
    catShower(2);
    snapper()
    function snapper(){
    var title = 'DNR catrchment',e;
    if(DSS_objectives.decisionObjectives.overview==='abort'){
        DSS_objectives.decisionObjectives.overview=false;
        return
    }
    WHAFapp.demikuluName=title    
    setTimeout(function(){
      if (map.updating===false){
        
        for (var i=0;i<list.length; i++){
          addOverviewSnap('sq_catchment'+list[i]);
          console.log("snapping catchment ",i)
          e=(i+1)/list.length;
          incProg(4,e)
        }
        // changeScoreOpacity(WHAFapp.currentMapParams.indOp*100)
      }else{ 
        console.log("not updated")
        snapper()
      }
    },500)
    }

    // setBestWorstOverview();
    // squaresDssSetter();
}


//FUNCTIONS REGULATING BEHAVIOR OF DSS PROGRESS TRACKER 
function progTree(th){
    console.log(th)
  var e = $(th).attr('id');
  if(e[0]==='h'){//for health index ref
    $('#magicInnerBox .mBar.mStep4 a').click()
    $('#indexLoopIntro').fadeOut();$('.scoreLoop').show();$('#gaugesPlace').removeClass('scoreLoopSVG');
    var n=$('#'+e+' a').text();
    for (i in indList){
      if (indList[i].name===n){
       DSS_objectives.disaplayedIndex=i-1;
       indexScroll('+') 
      }
    }
  }
  if (e[0]==='c'){//for context ref
    $('#magicInnerBox .mBar.mStep2 a').click()
    $('#charLoopIntro').hide();$('.charLoop').show()
  }    
  var n=$('#'+e+' a').text();
  for (var i=0;i<charLayers.length; i++){
    if (charLayers[i].title!== undefined && charLayers[i].title===n){
      DSS_objectives.displayedContextMap=i-1;
      charScroll('+')
    }
  }
}

function ref_setLocation(val){//retrieves 'set location' step through DSS progress tracker
    $('.mStep1 a').click();
    DSS_objectives.displayedScaleStep=val;
    scaleScroll('+','noZoom');
}


function resetAux(){//resets all auxiliary layers to initial list (none checked)
    var defaulti = function(){
        var d=WHAFapp.currentMapParams.mapFeatures, out=""  
        for (var i=0; i<d.length; i++){
            out=out+d[i]+',0,0]'
        }
        return out
    }
    removeHillShade();
    auxFeatObjectUrl = {};
    sortableLayerRemover();
    getLayersIn(defaulti());
}

//Functions to set/update status pf DSS progress tracker

function loopRefs(){//Loops through DSS_objectives.decisionObjectives object to set check or cross on items in progress tracker
    var a,b,c,d;
    validateLocation();
    //checks if overview table was created
    if(DSS_objectives.decisionObjectives.overview){
        refCheck('healthOverview_ref','ok')
    }else{
        refCheck('healthOverview_ref','cancel')
    }
    //loop to update context layers
    a=DSS_objectives.decisionObjectives.context.kept
    b=DSS_objectives.decisionObjectives.context.dismissed
    for (var i=0;i<a.length; i++){
        try{
            var dT=a[i].name
            var ttt = dT.replace(/\s/g, '').replace('(','').replace(')','')
            var fff = 'charRef_'+ttt;
            refCheck(fff,'ok')
        }catch(u){} 
    }
    for (var i=0;i<b.length; i++){
        try{
            var dT=b[i].name
            var ttt = dT.replace(/\s/g, '').replace('(','').replace(')','')
            var fff = 'charRef_'+ttt;
            refCheck(fff,'dismiss')
        }catch(u){} 
    }
    //loop to update index score layers
    c=DSS_objectives.decisionObjectives.indexScore.kept
    d=DSS_objectives.decisionObjectives.indexScore.dismissed
    for (var i=0;i<c.length; i++){
        try{
            var dT=c[i].name.replace(/\s/g, '').replace('(','').replace(')','')
            var fff = 'healthRef_'+dT;
            refCheck(fff,'ok')
        }catch(u){} 
    }
    for (var i=0;i<d.length; i++){
        try{
            var dT=d[i].name.replace(/\s/g, '').replace('(','').replace(')','')
            var fff = 'healthRef_'+dT;
            refCheck(fff,'dismiss')
        }catch(u){} 
    }
}


function refCheck(id,sig){ //adds x or check near table item in progress tracker 

    $('#'+id + ' a').addClass('refOn');
    if(sig==='dismiss'){
      $('#'+id + ' .icon-remove').css('display','inline-block').show();$('#'+id + ' .icon-ok').hide()
    } else if (sig==='ok'){
      $('#'+id + ' .icon-remove').hide();$('#'+id + ' .icon-ok').css('display','inline-block').show()
    } else if (sig==='cancel'){
      $('#'+id + ' .icon-remove').hide();$('#'+id + ' .icon-ok').hide();
      $('#'+id + ' a').removeClass('refOn');
    }
}

function validateLocation(){//sets cehck marks of progress tracker for scale items
    if(DSS_objectives.decisionObjectives.scalesViewed){
        refCheck('scaleRef_scales','ok');
        //$('#scaleRef_scales').attr('title','You have viewed some scales relevant for the selected location. Click here to review or cahnge their symbology.')  
    }else{
        refCheck('scaleRef_scales','cancel');
    }
    if (WHAFapp.currentMapParams.Catchment && WHAFapp.currentMapParams.Catchment!==""){
        refCheck('scaleRef_locationSet','ok');
        return true;
    }else{
        refCheck('scaleRef_locationSet','cancel');
        return false;
    }  
}

function setTracker(){
  $('#progressTracker').show()
  var d1 = '<div id="'

  var d2='" class="pT_2" onclick="progTree(this)"'
  var d3='><i class="icon-ok icon-white"></i><i class="icon-remove icon-white"></i><a>'
  var d4='</a></div>'

  $('#context_pT').html('')
  for (i in charLayers){
   var dT = charLayers[i].title;
   var dId;
   if (dT!==""){
     var ttt = dT.replace(/\s/g, '').replace('(','').replace(')','')

     dId="charRef_"+ttt

     var div = d1+dId+d2+d3+dT+d4
     $('#context_pT').append(div)
   }
  }

  indList = DSS_objectives.availableObjectives.scoresList
  $('#health_pT').html('');
  var oViewDiv = '<div id="healthOverview_ref" class="pT_2" title="" onclick="$(\'.mStep3 a\').click()"><i class="icon-ok icon-white"></i><i class="icon-remove icon-white"></i><a>OVERVIEW TABLE</a></div>'
  $('#health_pT').append(oViewDiv);
  for (i in indList){
   var dT = indList[i].name;
   var dW = indList[i].why;
   var dId; 
    // if (indList[i].fieldName && indList[i].fieldName!== ''){
       dId = "healthRef_"+indList[i].name.replace(/\s/g, '').replace('(','').replace(')','')
    // }else{
    //    dId = "healthRef_"+indList[i].obName
    // }
   if (dT!=="" && dT.indexOf("extrapolated")==-1){
     var dTitle = 'title="'+dW+'"'
     var div = d1+dId+d2+dTitle+d3+dT+d4
     $('#health_pT').append(div)
   }

  }
}

function incProg(n,e){//regulates progress bar on DSS overview
  var p,z;

   if(n<4){y=30}else{y=10}
    z=30
    p=(e*y+((n-1)*z))
    
    k=String(p)+'%'
    $('#overviewrProgBar').css('width',k);

    if(p===100){
        $('#overviewProgPlace').hide();
        setBestWorstOverview();
        squaresDssSetter();
        DSS_objectives.decisionObjectives.overview=true;
        scaleSymbology('basin','mask');scaleSymbology('major','outline');scaleSymbology('upstream','outline');scaleSymbology('downstream','outline');
        map.setExtent(getBasinExtent(WHAFapp.currentMapParams.crossHuc4));
        DSS_objectives.disaplayedIndex=-1;
        $('#mIndexTitle, #mIndexDesc,#indexProgress').html('');
        $('.mBar, .mCtrl').removeClass('noMouser');
        rememberState();
    }


}

function popHelpPop(){//modifies title and text on DSS help popup based on active tab in DSS section
    $("#helpPop").draggable();
    var n=$('#magicStepTitle').attr("class"),t,y,txt,title;
    t=n.replace('m','').toLowerCase();
    
    var txt = DSS_helpItems[t].text;
    var title=DSS_helpItems[t].title;
    $('#mHelpTitle span').text(title);
    $('#mHelpText').html(txt);
}

function noScaleNote(){
  if (DSS_objectives.point.type == undefined){
  $('.scaleInq').hide();
  $('#gggNote').show();
  setTimeout(function(){$('#gggNote').fadeOut(2000)},1200);
  }
}

function condSnapAreaShow(){//show #mSnapShotsArea only if it has been created to prevent it 'shadowing' map area 
    if (DSS_objectives.decisionObjectives.overview===true){
        $('#mSnapShotsArea').show();
    }else{
        $('#mSnapShotsArea').hide();
    }
}

function rememberState(){//Saves important properties from DSS_objectives global object to local storage for retrieval 
  var o,f,m,n,t=new Date().toLocaleString();
    o={lastSaved:t}
    if (WHAFapp.curretSessionSerial===undefined){
        sessionIdentify();
        n=WHAFapp.curretSessionSerial;
    }else{
        n=WHAFapp.curretSessionSerial;
    }


  var propList = ["availableObjectives","currentScores","decisionObjectives","decisionObjectivesSerial","name","point","thresholds"]
  for (var i=0;i<propList.length; i++){
    var g = propList[i]; 
    o[g] = DSS_objectives[g]
  }
  try{m = JSON.stringify(o)
      localStorage.setItem("pastDSS_"+n, m);

    //remove items past last ten
        f=localStorage
        for (i in f){
          if (i.indexOf('pastDSS_')!==-1){
             e = i.replace('pastDSS_','');
             c = Number(e);
            if (c<n-9){
             console.log(i)
              localStorage.removeItem(i);
              console.log(c,n)
            }
          }
        }
        return (m)
    }catch(u){}
}

function getOverviewWarning(){

    var d='Getting Health Overview',f;
    $('.warnButton').hide();
    if (DSS_objectives.point.type==="point" && WHAFapp.currentMapParams.Catchment===""){
        f="Please ensure that the selected location is inside Minnesota.";
        $('#mWarningSetLocation, #mWarningBackOverview').show();

    }else if 
        (WHAFapp.currentMapParams.Catchment === undefined || WHAFapp.currentMapParams.Catchment ===""){
        f="Please select a location (with the crosshair button highlighted, click on a map location inside Minnesota).";
        $('#mWarningSetLocation, #mWarningBackOverview').show();
    } else{
        f='Please note: creating the health overview may take up to two minutes, during which you will not be able to use the map.'

        $('#mWarningGoaheadOverview, #mWarningBackOverview').show()
    }

    $('#mWarningTitle').text(d)
    $('#mWarningText').text(f);
    $('#magicWarning').modal('show');
}

function abortOverview(){
    DSS_objectives.decisionObjectives.overview='abort'
    $('#overviewPlace').show()
    DSS_objectives.decisionObjectives.indexScore.overviewed=[];
    $('#overviewrProgBar').css('width',0);
    $('#overviewProgPlace').hide();
    $('#overViewIntro').fadeIn();
    $('#mSnapShotsArea').html('').hide();
    removeFirstLayer(); hideLegend(); $('#indexTitle_slider').hide()
    scaleSymbology('basin','mask');scaleSymbology('major','outline');scaleSymbology('upstream','outline');scaleSymbology('downstream','outline');
    map.setExtent(getBasinExtent(WHAFapp.currentMapParams.crossHuc4));
    rememberState();
}

function setHealthConcernBox(){
  var g = WHAFapp.currentMapParams.indexLayer;
  if (WHAFconfig.healthActions[g]){
      var gc = WHAFconfig.healthActions[g].change;
      var vc = '<li>Direct (change condition) </li>'
      var gm = WHAFconfig.healthActions[g].mitigate;
      var vm = '<li>Indirect (mitigate condition) </li>'

      $('#indexCheckList2').html('').append(vm)
      for (var i=0;i<gm.length;i++){
        var v1='<li><label class="checkbox"><input type="checkbox" value="';
        var v2='';
        var v3='">';
        var v4=gm[i];
        var v5='</label></li>';
        var V = v1+v2+v3+v4+v5;
        $('#indexCheckList2').append(V);   
      }

      $('#indexCheckList1').html('').append(vc)
      for (var i=0;i<gc.length;i++){
        var v1='<li><label class="checkbox"><input type="checkbox" value="';
        var v2='';
        var v3='">';
        var v4=gc[i];
        var v5='</label></li>';
        var V = v1+v2+v3+v4+v5;
        $('#indexCheckList1').append(V);   
      }
  }else{
    $('#indexCheckList1').html('');
    $('#indexCheckList2').html('');
  }
}

function clearhealthBox(){//clears checkboxes, radio buttons and input text on 'health concerns' box
    $('#DSS_indexCheck input:radio').prop('checked',false)
    $('#DSS_indexCheck input:checkbox').prop('checked',false)
    $('#DSS_indexCheck input:text').val('')
    DSS_objectives.tempRel=''
}

function reportViewStart(){//sets the DSS report view


    if($('#DSS_buttonSh').hasClass('btn-warning')){
        $('#DSS_buttonSh').removeClass('btn-warning').addClass('btn-info').text('Show Report');
        reportViewClose();
    }else{
        $('#DSS_buttonSh').removeClass('btn-info').addClass('btn-warning').text('Hide Report')




        var i,d,rr,r,s,r,q,o,m,n,dtc,dmc;
        $('#mSnapShotsArea').hide();
        $('#map_root, #scaleButtonPlace, #menuBox, #StateIcon, #back, .snapMenuItems, #TabOfcontentPlace').hide();
        scaleReportSnaps(0.9);
        i={
            height:'90%'
        }
        $('#dssReportTitle').show();
        $('#dssSnapShotsArea').show().css(i);
        $('#closeReportView').fadeIn();

        d={
            width:'65%'
        }

        $('#dssSnapShotsArea .rMapSnapStrip').css(d)

        $('#dssSnapShotsArea .span8').css('height','auto');

        rr={
            width:'30%',
            'margin-left':'0%'  
        }
        $('.mapSnapSis').css(rr);

        $('#reportToC').html('')

        s = DSS_objectives.decisionObjectives.context.kept;
        r = DSS_objectives.decisionObjectives.indexScore.kept;
        q = DSS_objectives.decisionObjectives.scale.kept;

        o='<ul id="mapsList3" class="nav mapList nav-list"><strong>General maps:</strong></ul>'
        m='<ul id="mapsList2" class="nav mapList nav-list"><strong>Context maps:</strong></ul>'
        n='<ul id="mapsList" class="nav mapList nav-list"><strong>Health indices:</strong></ul>'

        dtc='<ul id="DSS_tableCopy" class="nav mapList nav-list"><strong><a href="#tableSnap">Overview table</a></strong></ul>'
        dmc='<ul id="DSS_manActionsCopy" class="nav mapList nav-list"><strong><a href="#manActionsSnaps">Management Actions</a></strong></ul>'

        $('#reportToC').append(o).show() 
        $('#reportToC').append(m)        
        $('#reportToC').append(n)
        $('#reportToC').append(dtc)
        $('#reportToC').append(dmc)

        if($('#tableSnap').html()===''){
            $('#DSS_tableCopy').hide()
        }

        if($('#manActionsSnaps').html()===''){
            $('#DSS_manActionsCopy').hide()
        }

       
        var ToCC=[]
        for (var i=0;i<s.length; i++){
            var t,snip,name,notes1,o;
            var snip=$('#'+s[i].id+'_sPlace')
            var name = s[i].name;

            var notes1 = s[i].desc+'\n\n'+s[i].notes
            //s[i].notes=notes1//from this point, notes include description 

            $('#sis_'+s[i].id+'_sPlace h3').text(s[i].name);
            $('#sis_'+s[i].id+'_sPlace h4').text('');
            $('#sis_'+s[i].id+'_sPlace textarea').val(notes1);

            $('#sis_'+s[i].id+'_sPlace').append(s[i].legendHtml);
            var o={name:s[i].name,ref:'mapSnapMom_'+s[i].id};
            ToCC.push(o);
            console.log(name);
        }

        for (var i=0;i<ToCC.length;i++){
            var f = ToCC[i].name;
            if(f!=undefined){
                m='<li><a href="#'+ToCC[i].ref+'">'+f+'</a></li>';
                $('#mapsList2').append(m);
            }
        }

        var ToCH=[]
        for (var i=0;i<r.length; i++){
            var snip=$('#'+r[i].id+'_sPlace')
            console.log(snip)
            var name = r[i].name;
            var notes1 = r[i].longDesc+'\n\n'+r[i].notes;
            //r[i].notes=notes1//from this point, notes include description 
            $('#sis_'+r[i].id+'_sPlace h3').text(r[i].name)
            $('#sis_'+r[i].id+'_sPlace h4').text(r[i].desc)
            $('#sis_'+r[i].id+'_sPlace textarea').val(notes1)
            var o={name:r[i].name,ref:'mapSnapMom_'+r[i].id}
            ToCH.push(o)
            console.log(name)
        }

        for (var i=0;i<ToCH.length;i++){
            var f = ToCH[i].name;
            if(f!=undefined){
                m='<li><a href="#'+ToCH[i].ref+'">'+f+'</a></li>';
                $('#mapsList').append(m);
            }
        }

        var ToCS=[]
        for (var i=0;i<q.length; i++){
        var snip=$('#'+q[i].id+'_sPlace')

        console.log(snip)
        var name = q[i].name

        $('#sis_'+q[i].id+'_sPlace h3').text(q[i].name)
        $('#sis_'+q[i].id+'_sPlace h4').text('')
        $('#sis_'+q[i].id+'_sPlace textarea').val(q[i].notes)
        var o={name:q[i].name,ref:'mapSnapMom_'+q[i].id}
        ToCS.push(o)
        console.log(name)
        }

        for (var i=0;i<ToCS.length;i++){
            var f = ToCS[i].name;
            if(f!=undefined){
                m='<li><a href="#'+ToCS[i].ref+'">'+f+'</a></li>';
                $('#mapsList3').append(m);
            }
        }  
    }
}

function snapToTeport(){
    $('#magicControls,#magicSteps').css('visibility','visible')
    var s,c;
    if (WHAFapp.tempPlaceholder){s=WHAFapp.tempPlaceholder}
        else{s=null}

    var dclass=$('#magicStepTitle').attr('class').split(/\s+/)[0];
        if (dclass ==='mStep4'){
        addObjective('keep',s);
    } else if (dclass ==='mStep2'){//context step
        addCaracteristic('keep',s);
        $('#mCharNotes').val('');
    } else if (dclass ==='mStep1'){//scale step
        addDssMap('keep',s);
        $('#mScaleName,#mScaleNotes').val('')
    } else if(dclass ==='mStepEdit'){//back from editing a report map
        c = WHAFapp.tempParams.chapter;
        console.log("chapter: ",c)
        if (c==='indexScore'){
            console.log("Going here")
            addObjective('keep',s,'edits');
        }else if (c === 'scale'){
            addDssMap('keep',s,'edits');
        }else if (c==='context'){
            addCaracteristic('keep',s,'edits');
        }else{
            addDssMap('keep',s,'edits');            
        }

    } 

    WHAFapp.tempPlaceholder=undefined;
}

function dismissFromReport(){

  var dclass=$('#magicStepTitle').attr('class').split(/\s+/)[0];
  if (dclass ==='mStep4'){
    addObjective('dismiss');
    indexScroll('+');
  } else if (dclass ==='mStep2'){//context step
    addCaracteristic('dismiss');
    $('#mCharNotes').val('');
    charScroll('+');
  } else if (dclass ==='mStep1'){//scale step
    addDssMap('dismiss');
  } else if(dclass ==='mStep3'){//overview table

  }
}

function sessionIdentify(){//creates and updates a WHAF session serial to retrieve previous sessions' data 
    var current,last,l=localStorage;
    if(!l.getItem('sessionSerial')){
        current=0;
    }else if (WHAFapp.curretSessionSerial && WHAFapp.curretSessionSerial!== undefined){
      current=WHAFapp.curretSessionSerial;
    }
  else{
       last =  l.getItem('sessionSerial');
       current = Number(last)+1;
    }
    localStorage.setItem('sessionSerial',current)
    WHAFapp.curretSessionSerial=current
    console.log("Session serial: ",current)
}

function trigSessionRestore(){//loads & displays saved past sessions from localStorage 
    function holler(){
        var f,e,c,d,w,y,z,q,p,r,t,L,l=[];
        rememberState()
        f = localStorage;

        w='<li><a href="#"'
        x='</a></li>' 
        y='<ul>'
        z='</ul>'

        for (i in f){
          if (i.indexOf('pastDSS_')!==-1){
             e = i.replace('pastDSS_','');
             c = Number(e);
             l.push(c);
          }
        }
      l.sort();
      L=l.reverse();
      for (var ii=0;ii<L.length; ii++){
        t= 'pastDSS_'+String(L[ii])
             d = $.parseJSON(f[t]);
             if(d.lastSaved && d.lastSaved !== undefined){
               r="'"+t+"'";
               p='onclick="sessRestore('+r+')">';
                 q=w+p+d.lastSaved+x;
                 y=y+q;
            }     
          }     
        return y+z;
    }
    $('#mWarningTitle').text("Restore previous sessions:")
    $('#mWarningText').html(holler())
    $('#magicWarning').modal('show');
    $('#mWarningCancel').show();
}

function sessRestore(r){//a placeholder function at this point
    console.log(r);
    // rememberState();
    // WHAFapp.curretSessionSerial++
    f = localStorage;
    var pastDSS_objectives = $.parseJSON(f[r])

    var propList = ["availableObjectives","currentScores","decisionObjectives","decisionObjectivesSerial","name","point","thresholds"]
    for (var i=0;i<propList.length; i++){
        DSS_objectives[propList[i]] = pastDSS_objectives[propList[i]];
    }
    console.log(pastDSS_objectives) 
}

//FUNCTIONS TO MANIPULATE MAPS FROM REPORT AFTER THEY WERE ALREADY added

function setTempParams(n){
    var list = ['context','indexScore','scale']
    for (i in list){    
        r=DSS_objectives.decisionObjectives[list[i]].kept
        for (var u=0;u<r.length;u++){
            if(String(r[u].id)===String(n)){
                WHAFapp.tempParams=r[u]
                WHAFapp.tempParams.chapter=list[i];
            }
        }
    }
}

function reportViewClose(){
   $('#magicControls,#magicSteps').css('visibility','visible')
   $('#dssSnapShotsArea,#closeReportView,#reportToC,#dssReportTitle').hide()
   $('#map_root, #scaleButtonPlace, #menuBox, #StateIcon, #back, .snapMenuItems, #TabOfcontentPlace').fadeIn(800,function(){console.log("faded");bbackDss()});
   function bbackDss(){
       if (!$('#DSS_button').hasClass('btn-warning')){
           setDssLayout();
       }
   }
}

function closeEdits(){
    snapToTeport(); 
    var g='.mBar.'+DSS_objectives.currentDssSection+' a'
    $(g).click();

    reportViewStart();  
}

function editMap(i){

    var id=String(i),tempNotes;
    setTempParams(i);
    tempNotes='sis_'+WHAFapp.tempParams.id+'_sPlace textarea'
    WHAFapp.tempPlaceholder=id;
    
    var f=WHAFapp.tempParams
    f.notes=$('#'+tempNotes).val();
    WhafMapConstructor(f.params);
    
    $('#mEditTitle').val(f.name);
    $('#mEditNotes').val(f.notes);        

    deleteSnapMap(i)

    reportViewClose();

    $('.DSS_section').hide();
    $('#editingPlace, #editNotes').show();
    

    mTitler('mStepEdit','Edit map from report')

    $('#magicControls,#magicSteps').css('visibility','hidden')
}

function preDeleteSnapMap(n){
    WHAFapp.deletePlaceholder=n;
    var d="Delete map?"
    var f="Are you sure you want to delete this map from the report?"
    $('#mWarningTitle').text(d)
    $('#mWarningText').text(f);
    $('#magicWarning').modal('show');
    $('.warnButton').hide();
    $('#mWarningSnapDelete, #mWarningCancel').show();
}

function deleteSnapMap(n){
    //delete map from mapSnapArea (but keep its div!)
    $('#mapSnapMom_'+n).html('')
    //delete map from DSS_objectives object (but keep item incl. id to maintain order if deletion is for editing) 
    var list = ['context','indexScore','scale']
    for (i in list){    
        r=DSS_objectives.decisionObjectives[list[i]].kept
        for (var u=0;u<r.length;u++){
            if(String(r[u].id)===String(n)){
                WHAFapp.tempParams=r[u]
                WHAFapp.tempParams.chapter=list[i];
                r[u]={id:r[u].id}
            }
        }
    }
    reportViewStart();
    WHAFapp.deletePlaceholder=null
}

//Functions for DSS management actions evaluation
function populateManagementActions(){//populates check boxes on step one of the evaluation
    var actionsIn=[], d, pp, ff= {"HYDROLOGY":"#HydUl","GEOMORPHOLOGY":"#geoUl","BIOLOGY":"#bioUl","CONNECTIVITY":"#connUl","WATER QUALITY":"#wqUl"}  
    function setIndices(m,n){
        var indId = 'manActsFor'+n.replace(/ /g, ''), w, fff,inr;
        inr='<div class="scaleMeans pull-right"><div class="tblLegB lgBsn"></div><div class="tblLegB lgMj"></div><div class="tblLegB lgUp"></div><div class="tblLegB lgC"></div></div>'
        w = '<div id="'+indId+'" class="indUlDiv"><div class="indHead">'+n+'</div><div class="indHeadScorer">'+inr+'</div></div>'
        fff=ff[m] + ' h5'
        if(m===$(fff).text().trim()){
          if (actionsIn.indexOf(n)===-1){
            $(ff[m]).append(w);
            actionsIn.push(n)       
           }
        }    
    }

    function sddToParamsUl(v,n){
      var a = '<label class="checkbox"><input type="checkbox" value="',c = '">',ee ='</label>';
      var res = a+v+c+v+ee  
      var indId = 'manActsFor'+n.replace(/ /g, '')
      $('#'+indId).append(res)
    }

    d = dssParameters
    for ( i in d){//create a list of indices inside list of components
        try{setIndices(d[i].component, d[i].index)}catch(i){}
    }
    for ( i in d){//set each management action under correct index
        try{sddToParamsUl(i,d[i].index)}catch(i){}
    }

    refreshScorsAtScalePerIn();

    if (DSS_objectives.decisionObjectives.overview){
        pp = $('.indHead')
        for (var i=0;i<pp.length; i++){
            tt=$(pp[i]).text();
            var h = '<btn class="btn btn-mini prePickButt" onclick="snapPrePicker(\''+tt+'\', this)">Show</btn>'
            if(fieldNameByIndex[tt] !== undefined){
                $(pp[i]).append(h)
            }
        }

    }
}

function refreshScorsAtScalePerIn(){
    var e = DSS_objectives.availableObjectives.scoresList
    for (var i=0; i<e.length; i++){//get scores per scale
        console.log(e[i].name)
        try{popScoresAtScalePerInd(e[i].name)}catch(u){} 
    }
}

function popScoresAtScalePerInd(n){//adds scores at scale for indices in step 1 of decision matrix

  var cVal, upVal, mjVal, bsnVal, cRes, upRes, mjRes, bsnRes;
  indexField = fieldNameByIndex[n]
    scoresAtScales = {}
    for (item in DSS_objectives.currentScores){
      if(item==="catchment"){
          scoresAtScales[item] = DSS_objectives.currentScores[item][indexField]  
      }else{
        scoresAtScales[item] = DSS_objectives.currentScores[item][indexField+'_mean']
      }
    }

    try{if(String(scoresAtScales.catchment)!=='' && scoresAtScales.catchment !== undefined){(cVal = scoresAtScales.catchment.toFixed())}else{cVal='N/A'}}catch(t){}
    try{if(String(scoresAtScales.upstream)!=='' && scoresAtScales.upstream !== undefined){(upVal = scoresAtScales.upstream.toFixed())}else{upVal='N/A'}}catch(t){}
    try{if(String(scoresAtScales.major)!=='' && scoresAtScales.major !== undefined){(mjVal = scoresAtScales.major.toFixed())}else{mjVal='N/A'}}catch(t){}
    try{if(String(scoresAtScales.basin)!=='' && scoresAtScales.basin !== undefined){(bsnVal = scoresAtScales.basin.toFixed())}else{bsnVal='N/A'}}catch(t){}

    try{cRes=discernVal(cVal)}catch(t){}
    try{upRes = discernVal(upVal)}catch(t){}
    try{mjRes = discernVal(mjVal)}catch(t){}
    try{bsnRes = discernVal(bsnVal)}catch(t){}
      
    var indId = 'manActsFor'+n.replace(/ /g, '')
    var indScId =indId+' .lgBsn'
      
    try{if(bsnVal !== undefined){$('#'+indId +' .lgBsn').css({'background-color':WHAFconfig.tableColors[bsnRes]}).text('Bsn. ('+bsnVal+')')}}catch(t){}
    try{if(mjVal !== undefined){$('#'+indId +' .lgMj').css({'background-color':WHAFconfig.tableColors[mjRes]}).text('Maj. ('+mjVal+')')}}catch(t){}
    try{if(upVal !== undefined){$('#'+indId +' .lgUp').css({'background-color':WHAFconfig.tableColors[upRes]}).text('Upst. ('+upVal+')')}}catch(t){}
    try{if(cVal !== undefined){$('#'+indId +' .lgC').css({'background-color':WHAFconfig.tableColors[cRes]}).text('Ctmnt. ('+cVal+')')}}catch(t){}

    function discernVal(valz){
      var val = Number(valz)
      if(val && val!== undefined){
          var tt = DSS_objectives.thresholds;
          if (val<=tt.low){
            return "low"
          } else if (val>=tt.high){
            return "high"
          }else if (val>tt.low && val<tt.high){
            return "medium"
          }else{
            return "Unknown"
          }
      }else{
        return "Unknown"
      }
    }
}

function getSelectedActions(){//retrieves checked boxes and saves in DSS_objectives object. 
  var e = [], s = $('#manActSel input:checkbox')
  for (var i=0; i<s.length; i++){
    if($(s[i]).prop('checked')){
      e.push($(s[i]).val())
    }
  }
  DSS_objectives["selectedManagementActions"]=e
}

function getDssParamDetails(paramName){//creates and adds 'management action' itemfor DSS evaluation section (part 2)
    var index,compCls,scoresAtScales,action,r,indexField,a,b,d,e,inp,T,cVal,upVal,dnVal,mjRes,bsnRes,cRes,upRes,dnRes,mjRes,bsnRes,idd,ide,dodi,indexTitle,indAtScales,component;
    var l = DSS_objectives["selectedManagementActions"];
    r = dssParameters[paramName];
    index = r.index;
    component = compByIndex[index];
    if(component === undefined){
        component = 'future index'
    }

    if(component === 'HYDROLOGY'){compCls='hydroE'}
    else if(component === 'GEOMORPHOLOGY'){compCls='geomoE'}    
    else if(component === 'BIOLOGY'){compCls='bioloE'}    
    else if(component === 'CONNECTIVITY'){compCls='conneE'}    
    else if(component === 'WATER QUALITY'){compCls='waterE'}    
    else{compCls=''}

    idd = 'manAc_'+WHAFapp.manActionId
    
    ide = String(idd)
    dodi = paramName;   
    action = '<div class="manActionItem well '+compCls+'" id="'+ide+'"><strong>'+dodi+'</strong> for index: '+index+' ('+component+')</div>'
    $('#targetVerification').append(action)

    SetBenefits(paramName,WHAFapp.manActionId);

    WHAFapp.manActionId++;

    function SetBenefits(f,itemId){
      var el='<div class="well manAct" id="impactsBox_'+itemId+'"></div>'
      $('#manAc_'+itemId).append(el)

      b='<p class="pPos">POSITIVE SYSTEM IMPACTS: </p>'
      d='<p class="pNeg">NEGATIVE SYSTEM IMPACTS: </p>'

      inp = '<div><div id="manAcChart_'+itemId+'"></div><textarea id="manActNote_'+itemId+'" class="span12 manActNotes" rows="2" autocomplete="off" placeholder="Notes..."></textarea></div>'

      $('#impactsBox_'+itemId).html(b+d+inp)
      
      var good=[], bad=[];
      var e = dssParameters[f].parameters
      for (var c in e){
        if(Number(e[c])>0){
         good.push(c) 
        }else if(Number(e[c])<0){
         bad.push(c)
        }
      }
      for (var item in good){
       $('#impactsBox_'+itemId+' .pPos').append(good[item])
       if(item<good.length-1){
         $('#impactsBox_'+itemId+' .pPos').append(', ')
       }
      }
      for (var item in bad){
       $('#impactsBox_'+itemId+' .pNeg').append(bad[item])
       if(item<bad.length-1){
         $('#impactsBox_'+itemId+' .pNeg').append(', ')
       }
      }

      setCompChart(itemId)
    }
}

function setCompChart(itemId){
    console.log(itemId)
}


function evalManagementActions(){//prepares evaluation of management actions based on the ones selected.
  getSelectedActions();
  var l = DSS_objectives["selectedManagementActions"];
  if (!l || l.length<1){
      alert("Please select from the list of management actions");
      return
  }
  
  if (DSS_objectives.point.type==="point" && WHAFapp.currentMapParams.Catchment===""){
      alert("Please select a location inside Minnesota");
      $('#DssStarImage').click();
      return
  }else if 
      (WHAFapp.currentMapParams.Catchment === undefined || WHAFapp.currentMapParams.Catchment ===""){
      alert("Please select a location");
      $('#DssStarImage').click();
      return
  }
  
  $('#targetVerification').html('');
  for (i in l){
      getDssParamDetails(l[i])
  }

    // assessManagementActions_step2();  

    DSS_objectives.evalStep=2;
    $('.dMatrixSection').hide();
    $('#targetVerification').show();
    $('#mFactorsTitle').text('Step 2/3: Evaluate trade-offs');
    $('#evalStepDesc').show().text('How do solutions match the problems?')
}

function snapPrePicker(t,thi){
  $('#mSnapShotsArea').hide()
  if($(thi).hasClass('btn-warning')){
     $(thi).removeClass('btn-warning').text('Show');
     $('.prePickButt').removeClass('btn-warning').text('Show');
  }else{
     $('.prePickButt').removeClass('btn-warning').text('Show');
     if( DSS_objectives.decisionObjectives.overview){
       $('#mSnapShotsArea').show()
       snapPicker(t)
       $(thi).addClass('btn-warning').text('Hide')

     }else{
       alert("Maps can only be shown if a health overview was created");
     }
  }
}

function filterListedIndices(c,a){//toggles between viewing management actions for selected or all indices  
  if(c && a === 'manFilter'){
      $('.indUlDiv').hide()
      iList = []
      var n = DSS_objectives.availableObjectives.ChoiceList
      for (var i=0;i<n.length; i++){
        if(iList.indexOf(n[i].name)===-1){
          iList.push(n[i].name) 
          }
      }
      for (t in iList){
        var indId = 'manActsFor'+iList[t].replace(/ /g, '')
        $('#'+indId).show()
      }
  } else if (c && a ==='manAll'){
      $('.indUlDiv').show()    
  }
}

function refreshManActList(){//refreshes list of displayed management actions 
    getSelectedObjectives()
    if($('#manFilter').prop('checked')){
      filterListedIndices(true, 'manFilter')
    }else{
      $('.indUlDiv').show() 
    }
}

function assessManagementActions_step2(){
  //for each of the selected management actions:
  //1. Associates each management action with one or more health components
  //2. For each compoentn, creates lists of positively and negatively affected 'system impacts' by that action
  //3. Creates a google column chart comparing all system impacts across components  

    var l = [],compList=['HYDROLOGY','GEOMORPHOLOGY','BIOLOGY','CONNECTIVITY','WATER QUALITY']
    r = $('.manAct')
    for (var i=0;i<r.length; i++){
    var e = $(r[i]).attr('id').replace('impactsBox_','')     
        l.push(e)
    }

    for (var i in l){
      asoociateManActionWithComp(l[i])
    }

    function asoociateManActionWithComp(itemId){

      var manAction = $('#manAc_'+itemId+' strong').text(), manCompList = {},idd = 'manActNote_'+itemId, posList=[], negList=[]
      for (var ii=0;ii<compList.length; ii++){
        manCompList[compList[ii]] = {pos:[],neg:[]}
      }
      //console.log(manAction)
      paramsOb=dssParameters[manAction].parameters
      for (item in paramsOb){
        if(systemBenefits[item]){
          comps = systemBenefits[item].components
        }

        if(paramsOb[item] ==='-1'){
          for (var iii=0;iii<compList.length; iii++){
            if(comps.indexOf(compList[iii])!==-1){
              if(manCompList[compList[iii]].neg.indexOf(item)==-1){
                manCompList[compList[iii]].neg.push(item)
              }
            }        
          }
        } else if (paramsOb[item] ==='1'){
          //console.log("POSITIVE: ",item, comps)
          for (var iii=0;iii<compList.length; iii++){
            if(comps.indexOf(compList[iii])!==-1){
              if(manCompList[compList[iii]].pos.indexOf(item)==-1){
                manCompList[compList[iii]].pos.push(item)
              }
            }        
          }
        }
      }
      drawCompChart(manCompList,itemId)
    }

    function drawCompChart(inputs,itemId) {

        $('#manAcChart_'+itemId).html('')
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Component');
        data.addColumn('number', '+');
        data.addColumn({type: 'string', role: 'tooltip','p': {'html': true}});
        data.addColumn('number', '-');
        data.addColumn({type: 'string', role: 'tooltip','p': {'html': true}});

        data.addRows([
          [compList[0],inputs[[compList[0]]].pos.length,broom(inputs[[compList[0]]].pos, 'pos'),0-inputs[[compList[0]]].neg.length,broom(inputs[[compList[0]]].neg,'neg')],
          [compList[1],inputs[[compList[1]]].pos.length,broom(inputs[[compList[1]]].pos, 'pos'),0-inputs[[compList[1]]].neg.length,broom(inputs[[compList[1]]].neg,'neg')],
          [compList[2],inputs[[compList[2]]].pos.length,broom(inputs[[compList[2]]].pos, 'pos'),0-inputs[[compList[2]]].neg.length,broom(inputs[[compList[2]]].neg,'neg')],
          [compList[3],inputs[[compList[3]]].pos.length,broom(inputs[[compList[3]]].pos, 'pos'),0-inputs[[compList[3]]].neg.length,broom(inputs[[compList[3]]].neg,'neg')],
          [compList[4],inputs[[compList[4]]].pos.length,broom(inputs[[compList[4]]].pos, 'pos'),0-inputs[[compList[4]]].neg.length,broom(inputs[[compList[4]]].neg,'neg')]
        ]);

        var options = {
          title: 'System impact across components',        
          vAxis: {
            title: '# of system impacts',
            gridlines:{color: '#eee',count: 4 },
            'minValue': 0, 
            'maxValue': 10
          },
          tooltip: {isHtml: true},
          //height:150
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('manAcChart_'+itemId));
        chart.draw(data, options);

        function broom(r,d){
          var e,w;
          if(d==='pos'){e='Positive'}
          else if (d==='neg'){e='Negative'}
          w='<div style="padding:5px"><strong>'+e+' impact on:</strong><br>'
          for (i in r){
            w=w+r[i]+'<br>'
          }
          return w+'</div>'
        }
    }
}


function reportPrintJson(){//generates a JSON string that includes print parameters for DSS report
    var chapter, l=['scale','context','indexScore'],jsons=''
    for (var ii=0;ii<l.length; ii++){
      if (l[ii] === 'scale'){chapter = 'Part 1: scales'}
      else if (l[ii] === 'context'){chapter = 'Part 2: watershed context'}
      else if (l[ii] === 'indexScore'){chapter = 'Part 3: health assessment'}
      
       f=DSS_objectives.decisionObjectives[l[ii]].kept
       for (var i=0; i<f.length; i++){
         console.log(f[i].printParams)
         if (f[i].printParams && f[i].printParams !== undefined){
           // var nm = chapter +' ('+f[i].name+')'
           // f[i].notes="Notes for the map of: "+nm
           // var nts = f[i].notes
           // t=$.parseJSON(f[i].printParams[0])
           // t.layoutOptions.titleText = nm
           // t.layoutOptions.customTextElements[0].WHAF_notes = nts
           // console.log("M: ",m)
           m=f[i].printParams;
           if (jsons==''){jsons=m}
           else{console.log('delim')
             jsons=jsons+'WHAFDELIM2'+m
               }
         }         
       }
    }
    return jsons
}

//getSystemImpactAttrFromArray() and getPramsFromArray() are functions prepared for manipulating csv data into js objects and not for the running of the application
//required parameter is an array of arrays that is the output of the 'factor matrix' csv after converting to JSON array (http://www.convertcsv.com/csv-to-json.htm)

function getSystemImpactAttrFromArray(m){//create an object to include each of the system benefits and asssociate it with one or more components
  var comp,compList=['HYDROLOGY','GEOMORPHOLOGY','BIOLOGY','CONNECTIVITY','WATER QUALITY']
  sysImpacts={}

  impacts = m[0]
  for (var i = 0; i<impacts.length; i++){
    var g = holler(i)
    if(g.length>0){
      var j={"components":g,"desc":""}
      sysImpacts[impacts[i]]=j
    }
  }  
  function holler(n){
    var out=[];
    for (var i=1;i<m.length;i++){
      var c = (m[i][0]);
       if(c[0]==='_'){
        var comp = c.replace('_','')
        if(m[i][n]==='1'){
          out.push(comp)
        }
       }
    }
    return out
  }
  return JSON.stringify(sysImpacts)
}


function getParamsFromArray(m){
  var comp,index,compList=['HYDROLOGY','GEOMORPHOLOGY','BIOLOGY','CONNECTIVITY','WATER QUALITY']

  impactsList = m[0]

  impactsOb={}//direct:{},indirect:{}}

  for (var i=1;i<m.length;i++){
     
    var c = (m[i][0]);
    if(compList.indexOf(c)!==-1){
      comp=c
    } else if(c!=='' && c[0]!=='_'){
      index=c
    }
     var first=m[i][1];//direct
     var second = m[i][2];//indirect
     var third =  m[i][3];//specific action / BMP number
     var r={parameters:{},index:index,component:comp}
     if (third!==''){//'specific action' column gets first priority in naming manaegment action
       
       for(var h = 4;h<m[i].length-1; h++){
         if (m[i][h]!=='' && m[i][h]!=='0'){
           r.parameters[impactsList[h]]=m[i][h]
           var tName
           if(first!==''){
             r.actionType='direct';
             tName = first+' ('+third+')'  
           } else if (second!==''){
             r.actionType='indirect';
             tName = second+' ('+third+')'  
           } else{
             tName=third
           }
           impactsOb[tName]=r;
         }
       }
     }else if (first!==''){
       r.actionType='direct';
       for(var h = 4;h<m[i].length-1; h++){
         if (m[i][h]!==''  && m[i][h]!=='0'){
           r.parameters[impactsList[h]]=m[i][h]
           impactsOb[first]=r;
         }
       }
     } else if (second!==''){
       r.actionType='indirect';
       for(var h = 4;h<m[i].length-1; h++){
         if (m[i][h]!==''  && m[i][h]!=='0'){
           r.parameters[impactsList[h]]=m[i][h]
           impactsOb[second]=r;
         }
       }
     } 
  }
  return JSON.stringify(impactsOb)
}

///

function showDSS_params(){
    var a,b;
    a="The JSON string below is a representation of the selections and parameters from this DSS session:"
    b=rememberState()
    $('#paramAlerter').show();
    $('#paramAlertMessage').text(a)
    $('#paramPlaceString').val(b)
}

function showDSS_reportParams(){
    var a,b;
    a="The JSON string below can be used to print the report:"
    b=reportPrintJson();
    $('#paramAlerter').show();
    $('#paramAlertMessage').text(a)
    $('#paramPlaceString').val(b)
}

function addTableElement(where){// copies DSS overview table to report section
    var tbl,e,idName,c,C,h,H,gr;
    $('#tableSnap').html('')
    e='ovViewTable'
    idName = String(e)+'_sPlace';

    textPlace = 'sis_'+String(e)+'_sPlace';
    c=$('#map').css('width');
    h=$('#map').css('height');
    H=Number(h.replace('px',''))*WHAFapp.snapZoom;
    C=Number(c.replace('px',''))*WHAFapp.snapZoom;
        
    adjustSnaphotAreaPadding();

    var tempStripDiv = '<div id="'+idName+'" class="rMapSnapStrip span8" style="height:'+String(H)+'px, width:'+String(C)+'"><div id="'+idName+'Table" class="snapBounds" href="#"></div></div>'
    var temp2StripDiv = '<h3 class="sisTitle">Overview Table</h3><h4 class="sisSubTitle">This table summarizes the health assessment for the selected location, at different scales, based on the WHAF indices. </h4><div><textarea class="sisText" placeholder="Add notes:" rows="12"></textarea></div>';
    var temp3StripDiv = '<div id="sis_'+idName+'" class="mapSnapSis span3">'+temp2StripDiv+'</div>'
    
    var temp4StripDiv = '<div class="mapSnapMom row" id="mapSnapMom_'+e+'">'+tempStripDiv+temp3StripDiv+'</div>'
    $('#'+where).append(temp4StripDiv);

    tbl=$('#overviewTable').clone()
    tbl[0].id=String(e)+'_'+tbl[0].id;
    
    $('#'+idName+'Table').html(tbl); 

    gr={'pointer-events': 'none'}
    $('#'+idName).css(gr)
    $('#DSS_tableCopy').show();
    try{WhafAlert('add','Overview Table added to the report!','This overview table was successfully added to your report. To modify it at any point, click on the \'Health Overview\' tab, make any changes, and click \'next\'.',2000)}catch(u){}
}



function addManActElement(where){// copies DSS overview table to report section
    var mCh,e,idName,c,C,h,H,gr;
    $('#manActionsSnaps').html('')
    e='manActionCharts'
    idName = String(e)+'_sPlace';

    textPlace = 'sis_'+String(e)+'_sPlace';
    c=$('#map').css('width');
    h=$('#map').css('height');
    H=Number(h.replace('px',''))*WHAFapp.snapZoom;
    C=Number(c.replace('px',''))*WHAFapp.snapZoom;
        
    adjustSnaphotAreaPadding();

    var tempStripDiv = '<div id="'+idName+'" class="rMapSnapStrip span8" style="height:'+String(H)+'px, width:'+String(C)+'"><div id="'+idName+'Charts" class="snapBounds" href="#"></div></div>'
    var temp2StripDiv = '<h3 class="sisTitle">Management Actions</h3><h4 class="sisSubTitle">These charts represent the system impacts, both negative and positive, of each selected management action.</h4><div><textarea class="sisText" placeholder="Add notes:" rows="12"></textarea></div>';
    var temp3StripDiv = '<div id="sis_'+idName+'" class="mapSnapSis span3">'+temp2StripDiv+'</div>'
    
    var temp4StripDiv = '<div class="mapSnapMom row" id="mapSnapMom_'+e+'">'+tempStripDiv+temp3StripDiv+'</div>'
    $('#'+where).append(temp4StripDiv);

    mCh=$('#targetVerification').clone()
    $(mCh).removeClass('dMatrixSection')
    mCh[0].id=String(e)+'_'+mCh[0].id;
    
    $('#'+idName+'Charts').html(mCh); 

    gr={}
    $('#'+idName).css(gr)
    $('#DSS_manActionsCopy').show();
    try{WhafAlert('add','Management Action charts added to the report!','',2000)}catch(u){}
}
