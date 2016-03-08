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
    // try{legendd.refresh()}catch(r){};
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