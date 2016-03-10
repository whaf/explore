//WORKFLOW FUNCTION

function showLoad(){
    $("#loader").show()
}

function hideLoad(){
    $("#loader").hide()
}

function hideLegend() {
    $('#legend').hide()
}

function resizeElementHeight(e, t) {//resizes height of element to fit window
    var bottomBuffer;
    var d=$('#HeadBar').css('height');
    var k=Number(d.replace('px',''));
    if (t && t!= undefined){
        bottomBuffer=k+t;
    } else{
        bottomBuffer = k;        
    }
    theElement = document.getElementById(e);
    var n = 0;
    var r = window.document.body;
    if (window.innerHeight) {
        n = window.innerHeight
    } else if (r.parentElement.clientHeight) {
        n = r.parentElement.clientHeight
    } else if (r && r.clientHeight) {
        n = r.clientHeight
    }
    theElement.style.height = n - bottomBuffer + "px"
}

function reorderByList(){
    var featureLayersAvailable = [], featureLayersDisplayedByOrder = [],dodo,e,n,d;
    dodo = $("#sortable").children("div").each(function () {

        var zz = $(this).find("input").attr("onclick").split(" ");
        var n = zz[2].length - 3;
        var r = zz[2].substr(1, n);
        var z = zz[3].length - 1;
        var q = String(zz[3].substr(0, z));
        var i = "/";
        var uu = r+i+q;

        featureLayersAvailable.push(uu);
        if ($.inArray(uu, featureLayersDisplayed) != -1) {
            featureLayersDisplayedByOrder.push(uu);
        }
    });
 
    try{
        e = z.getLayersVisibleAtScale(map.getScale());
        n = e.length

        d = featureLayersDisplayedByOrder.reverse()
        for (var r=0; r<d.length; r++){

            var tmpLayer = map.getLayer(d[r])
            if(tmpLayer && tmpLayer !== undefined){
                n = e.length
                map.reorderLayer(tmpLayer, n-r);
            }  
        }
    }catch(r){}
}

function reorderTheseFeatures(){
    var newTheseFeatures = [], c = WHAFapp.currentMapParams.theseFeatures;
    $("#sortable").children("div").each(function(){
      var t=$(this).find("input").context.id;
      for (o in c){
          if (String(c[o].id) === String(t)){
              newTheseFeatures.push(c[o])
          }
      }      
    });
    WHAFapp.currentMapParams.theseFeatures = newTheseFeatures
}

function rightCompColllapsser(cId, ind){//regulates collapse and opening of accordeaon for index layers. 
    var opObList = [$('#collapseOne'),$('#collapseTwo'), $('#collapseThree'), $('#collapseFour'),$('#collapseFive'), $('#collapseSix')]    
    var opList = ['collapseOne','collapseTwo','collapseThree','collapseFour','collapseFive','collapseSix'] 
    var r = $.inArray( cId, opList )    
    for (var f=0; f<opObList.length; f++){
      if (f!=r){
        if (opObList[f].hasClass('in')){
          opObList[f].collapse('toggle');
        }
      }
    }
    if(! ind){
        try{opObList[r].collapse('show')} catch(err){};
    }
}

// called by popoverInit(), generates the html used to create health index score pop-up descriptions. Runs on intial application start-up
function prepPopOver(){

    for (var key in indexdescNewJson){
        var val = indexdescNewJson[key];
        ffer(key, val.indexSummary, val.shortDesc, val.sourceDataDate, val.caveats, val.catchmentId, val.watershedId, val.name, val.metrics)
    }

    function ffer (key, summ, cont, date, cav, cId, wId, indName, metrics){
        o = '#'+key
        var allCont = cont;

        var summDiv;

        if (cId && cId != 'undefined'){
            var scaleW = '<div><input type="radio" value="1" name="radioPureCSS" id="radioPureCSS1'+key+'" onclick = "respond(\''+wId+'\',\''+indName+'\',\''+cId+'\')"><label class ="popTitScaleBox" for="radioPureCSS1'+key+'"><span><span></span></span>Watershed </label></div>'
            var scaleC = '<div><input type="radio" checked="checked" value="2" name="radioPureCSS" id="radioPureCSS2'+key+'" onclick = "respond(\''+cId+'\',\''+indName+'\',\''+cId+'\')"><label class ="popTitScaleBox"  for="radioPureCSS2'+key+'"><span><span></span></span>Catchment</label></div>'
            var closer = '<div class="popTitleBox pull-right " style = "width:10%"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="$(\''+o+'\').popover(\'hide\');"">×</button></div>' 
            var scaleDiv = '<div class="popTitleBox pull-right popTitScaleBox" style = "width:20%"; vertical-align:middle;>'+scaleC+scaleW+'</div>'
            var summi = '<div class="popTitleBox" style = "width:65%"><h5>'+summ+'</h5></div>'

            summDiv = '<div >'+summi+closer+scaleDiv+'</div>';
        } else {
            
            var summi = '<div class="popTitleBox" style = "width:100%"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="$(\''+o+'\').popover(\'hide\');"">×</button><h5>'+summ+'</h5></div>'
            summDiv = '<div >'+summi+'</div>';
        }

        
        if (date && date!='undefined'){
            allCont = allCont+'<p><br><b>Source data date: </b>'+date+'</p>'
        }
        if (cav && cav!='undefined'){
            allCont = allCont+'<p><b>Note: </b>'+cav+'</p>'
        }
        $(o).popover({       
            trigger: 'manual',  
            html : true,
            title: summDiv,
            content: allCont,
            container: 'body',
            placement: 'right'
            });
        if (metrics&&metrics!='undefined'){
            // console.log("METRICS: ",  metrics)
            for (var r=0; r<metrics.length; r++){
                var mtx = metrics[r];
                var idmtx = mtx.catchmentId;
                var hh = '#'+metrics[r].fieldName;
                var h = $(hh).parent();
                var hSumm = metrics[r].indexSummary;
                var hsummi = '<div><div class="popTitleBox" style = "width:100%"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="$(\''+h+'\').popover(\'hide\');"">×</button><h5>'+hSumm+'</h5></div></div>'
                var hCont = metrics[r].shortDesc;
                var hdate = metrics[r].sourceDataDate;
                var hCav = metrics[r].caveats;
                var hAllCont = hCont;
                if (hdate && hdate!='undefined'){
                    hAllCont = hAllCont+'<p><br><b>Source data date: </b>'+hdate+'</p>'
                };
                if (hCav && hCav!='undefined'){
                    hAllCont = hAllCont+'<p><b>Note: </b>'+hCav+'</p>'
                };
                $(hh).popover({       
                    trigger: 'manual',  
                    html : true,
                    title: hsummi,
                    content: hAllCont,
                    container: 'body',
                    placement: 'right'
                });
            }
        }
    }  
}

// create object used to store index score summary descriptions, populates object using prepPopOver() function.
// initiates the pop-up using the .mouseenter() property of the button class.
function popoverInit(){
    $.getJSON(indexdescNewJson, function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
            items.push( val );
        });
        indexDesxObj = items;
    });

    prepPopOver()

    $('.scoreButton').mouseenter(function() {
      $('.popover').hide();
      var ind = '#'+this.id;
      $(ind).popover('show');
      var ggg=$(ind).popover;
    })

    $('.scoreBtn').mouseenter(function() {
      $('.popover').hide();
      var indLi = '#'+this.id;
      $(indLi).children().popover('show');
    })

    $('#map, #indexDescription, .accordion-heading ').mouseenter(function(){
      $('.popover').hide()
    });
}

function tutorialPref(checked){
    if (checked==true){
        localStorage.setItem('showTutorial',false);
        $('#tutorial').modal('hide')
    } else{
        localStorage.setItem('showTutorial',true);
    }
}

function tutorialLoad(){
    var f=false;
    try{f=localStorage.getItem('showTutorial');
        if (f == 'true' || f == null){
                $('#tutorial').modal('show');
            };
    }catch(err){};
    if (f==false){$('#tutorial').modal('show')}; 
}

function setModalElement(e) {
    var t = $("#map").offset();
    e.position({
        top: t.top,
        left: t.left
    });
}

function buttonChanger(e, t) {
    button = $(t).parent().parent();
    if (e) {
        $(button).removeClass("btn-inverse").addClass("btn-warning")
    } else {
        $(button).removeClass("btn-warning").addClass("btn-inverse")
    }
}

function crosshairCurs(status){
    if (status=='off'){
        $('#map_container').css({'cursor':'initial'})
    }
    else if (status = 'on'){
        $('#map_container').css({'cursor':'crosshair'})
    }
}

function ticker(elem, tick){
    var k,t,f,v,u,z,n,r,p, bear
    p=$('#'+elem);
    k=$('#'+elem).html();
    // console.log(k);
    t=$(p).parent().parent();//dropdown menu to uncheck all <li>'s
    f=t.children();//all <li>'s'
    v='<i class="icon-ok"></i>'

    for(var i=0; i<f.length; i++){
      u=(f[i])  ;
      z=($(u).html());
      n=z.replace(v,'');
      $(u).html(n);      
    }
    if(tick == 'tick'){
        if (k.indexOf(v)!=-1){
            r=k.replace(v,'');
            bear=false
        } else{
            r=k+" "+v;
            bear=true;
        };
    } else if (tick=='keepOn'){
        if (k.indexOf(v)!=-1){
            r=k;
        }else{
            r=k+" "+v;
        }
    };
    $('#'+elem).html(r);
    return bear;
}

function guideDrag(){
    $("#guide_title #bookmarkModal").draggable({//workaround for strange jQuery problem when css positioning draggable element to bottom.
        create: function( event, ui ) {
            $(this).css({
                top: $(this).position().top,
                bottom: "auto"
            });
        }
    });
}

function chartDrag(){
    $("#cdlChartPlace").draggable({//workaround for strange jQuery problem when css positioning draggable element to bottom.
        cancel: "#CDL_chart_div",
        create: function( event, ui ) {
            $(this).css({
                top: $(this).position().top,
                bottom: "auto"
            });
        }
    });
    //Locate chart area in app element. jQuery draggable element, are handled from top left, hence workaround 
    var elemW=$('#cdlChartPlace').css('width');
    var globW=$('#cdlChartPlace').parent().css('width');
    var globW1=Number(globW.replace('px',''));
    var elemW1=Number(elemW.replace('px',''));
    var elemH=$('#cdlChartPlace').css('height');
    var globH=$('#cdlChartPlace').parent().css('height');
    var globH1=Number(globH.replace('px',''));
    var elemH1=Number(elemH.replace('px',''));
    var m=-10
    var r=26
    j=String(globH1-elemH1-m)+'px'
    f=String(globW1-elemW1-r)+'px'
    $('#cdlChartPlace').css('top',j);
    $('#cdlChartPlace').css('left',f);
    $('#cdlChartPlace').show();
}

function fixTabsCss(idi){
    var elem=idi;    
    if (elem){
       $('#'+elem).css({'background-color':'rgba(205,205,205,1)', 'border-width': '0px'}); 
    }
    $('.ui-state-active').css({'background-color':'rgba(205,205,205,1)', 'border-width': '0px'});    
}

//PRINTING UTILITIES

function printStartUp(){

    var printInfo = WHAFapp.esriRequestCons({"url": WHAFapp.printUrl,"content": { "f": "json" }});
    printInfo.then(handlePrintInfo, handleError)

}

function setPrintTitle(){
    var titleText=$("#mapTitleInput").val();
    if (titleText || titleText !== ""){
        WHAFapp.template.layoutOptions.titleText=titleText;
    } else {
        WHAFapp.template.layoutOptions.titleText=undefined;
    }
}

function changePrintLayout(tmpl){
    WHAFapp.template.layout = tmpl;
    pInfo();
}

function changePrintFormat(frmt){
    WHAFapp.template.format = frmt;
    pInfo()
}

function pInfo(){
    var f;
    setPrintTitle();
    f='<p>Print Layout: '+WHAFapp.template.layout+'</p><p>Print Format: '+WHAFapp.template.format+'</p><p>Print Title: '+WHAFapp.template.layoutOptions.titleText+'</p>'
    $('#appInfo').html(f)
}

function mapJSON(){
    var mapOptions, operationalLayers, baseMap, exportOptions, layoutOptions, legOps, printJSON, WHAFScore=false,scoreIndex;

    function mOpt(){
        var e= map.extent, xmax, xmin, ymax, ymin,spat;

        xmax=e.xmax.toFixed(2)
        xmin=e.xmin.toFixed(2)
        ymax=e.ymax.toFixed(2)
        ymin=e.ymin.toFixed(2)

        spat = JSON.stringify(e.spatialReference)
        return '"mapOptions":{"extent":{"xmax":'+xmax+',"xmin":'+xmin+',"ymax":'+ymax+',"ymin":'+ymin+',"spatialReference":'+spat+'}}';
    }

    function opLyrs(){
        var opLayers = '"operationalLayers": [', ctr = 0, lCtr=0,r=map.getLayersVisibleAtScale(map.getScale()), locationMark;

        legOps = '"legendOptions":{"operationalLayers":['

        for (f in r){
          var lyrData, name, drawingInfo, defExpPrelim, defExp, fill, line,legItem,lyrTitle;
          clss = r[f].declaredClass;
          id = r[f].id; 
          visibleLayer = r[f].visibleLayers;
          opacity = r[f].opacity;
          url = r[f].url;

          if (clss ==="esri.layers.ArcGISDynamicMapServiceLayer"){
            if(r[f].indexIdentifier==='WHAFscore'){
                lyrTitle='Index Score'
                WHAFScore=true;
                scoreIndex=$('#drop2').text();
            } else{lyrTitle=''}



            if (ctr ==0){
                lyrData = '{"id":"'+id+'","url":"'+url+'","opacity":'+opacity+',"title":"'+lyrTitle+'","visibleLayers":['+visibleLayer+']}';
            } else {
              lyrData = ',{"id":"'+id+'","url":"'+url+'","opacity":'+opacity+',"title":"'+lyrTitle+'","visibleLayers":['+visibleLayer+']}';
            }
            if(lyrTitle!=='Index Score'){
                if (lCtr==0){
                    legItem='{"id":"'+id+'"}';
                    lCtr=lCtr+1
                    console.log("legend item, first: ", id)
                }
                else{
                    legItem=',{"id":"'+id+'"}'
                    lCtr=lCtr+1;
                }
                legOps=legOps+legItem;                

            }

            opLayers=opLayers+lyrData;
            ctr=ctr+1;
          } 



          else if (clss==="esri.layers.FeatureLayer"){   
                var opac;

                fill=r[f].renderer.symbol.style
                line = r[f].renderer.symbol.outline.style
                if(fill  !=='none' || line !=='none'){//filter out feature scale layers that are not displayed

                    // console.log(r[f].id)
                    // console.log(line, fill)
                    
                    name=r[f].name
                    defExpPrelim=r[f]._defnExpr;
                    defExp = defExpPrelim//.replace(/'/g, "\\'")
                    drawingInfo = '{"renderer":'+getFLRenderer(r[f])+'}';

                    if(r[f].renderer.symbol.color.a){
                        opac=r[f].renderer.symbol.color.a;
                        // r[f].renderer.symbol.color.a=1;
                    } else{
                        opac=opacity;
                    }

                    if (ctr ==0){
                        lyrData = '{"url":"'+url+'","title":"'+name+'","opacity":'+opac+',"layerDefinition":{"drawingInfo":'+drawingInfo+',"definitionExpression":"'+defExp+'"}}'
                    } else{
                        lyrData = ',{"url":"'+url+'","title":"'+name+'","opacity":'+opac+',"layerDefinition":{"drawingInfo":'+drawingInfo+',"definitionExpression":"'+defExp+'"}}'
                    }
                    opLayers=opLayers+lyrData;
                }
                
                ctr=ctr+1;

          }        



        };

        locationMark = getStarGraphics();
        if (locationMark!==undefined){
            // console.log("getting Star!")
            opLayers=opLayers+','+locationMark
        };

        legOps = legOps+']}';
        console.log(legOps);
        opLayers=opLayers+']';
        return opLayers;

    }

    function bsMap(){
        var bsMapLyr = "", ctr = 0, title, r=map.getLayersVisibleAtScale(map.getScale());

        for (f in r){
          var lyrData;
          clss = r[f].declaredClass;
          id = r[f].id; 
          visibleLayer = r[f].visibleLayers;
          opacity = r[f].opacity;
          url = r[f].url;
          if (clss ==="esri.layers.ArcGISTiledMapServiceLayer"){
            if (ctr ==0){
                lyrData = '{"url":"'+url+'","opacity":'+opacity+'}'
                
            } else {
                lyrData = ',{"url":"'+url+'","opacity":'+opacity+'}'
            }
            ctr=ctr+1;
            bsMapLyr=bsMapLyr+lyrData
          }          
            if (r[0].layerInfos[0].name){
            title = r[0].layerInfos[0].name}else{title="Basemap"}
        }

        return '"baseMap":{"title":"'+title+'","baseMapLayers":['+bsMapLyr+']}';
    }

    function expOpt(){
        var w,h,ww,hh,dpi=96;    

        w= $('#map').css('width')
        h= $('#map').css('height')
        ww = Number(w.replace('px',''))//*2
        hh = Number(h.replace('px',''))//*2

        return '"exportOptions":{"dpi":'+dpi+',"outputSize":['+ww+','+hh+']}'
    }

    function lOutOpt(){
        var titl, creator, layOutOps = '"layoutOptions":{', dateElem, notes, custElem;

        if ($("#mapTitleInput").val()){
            titl = $("#mapTitleInput").val();
        }else{titl = undefined};

        dateElem= "<dyn type='date' format='MMMM d, yyyy'/>"

        if ($("#mapAuthor").val()){
            creator = $("#mapAuthor").val();
            dateElem = "Created by "+creator+", "+dateElem            
        }else{creator = undefined};

        if ($("#printNotes").val()){
            notes = $("#printNotes").val();
        }else{notes = undefined};

        custElem =  '"customTextElements":[{"WHAF_notes":"'+dateElem+'"}';
        if(notes && notes!== undefined){
            var notesElem = ',{"Service_notes" : "'+notes+'"}';
            custElem=custElem+notesElem;
        }
        if(WHAFScore){
            var scoreTitle=',{"ScoreName" : "'+scoreIndex+'"}';
            custElem=custElem+scoreTitle;
        }

        custElem=custElem+']';


        

        

        if (titl && titl != undefined){
          layOutOps=layOutOps+'"titleText":"'+titl+'",';lOutOpt2();
        } else{lOutOpt2()};

        function lOutOpt2(){
            if (creator && creator!= undefined){
              layOutOps=layOutOps+'"authorText":"'+creator+'",';lOutOpt3();
            }else{lOutOpt3()}
        }

        function lOutOpt3(){
            layOutOps=layOutOps+'"copyrightText":"MN DNR Watershed Health Assessment Framework",'+custElem+','+legOps+'}';
        }
        console.log(layOutOps)
        return layOutOps;
    }

    mapOptions=mOpt();
    operationalLayers=opLyrs();
    baseMap=bsMap();
    exportOptions=expOpt();
    layoutOptions=lOutOpt();

    printJSON='{'+mapOptions+','+operationalLayers+','+baseMap+','+exportOptions+','+layoutOptions+'}';
    return printJSON

}

function getFLRenderer(l){
    var rType, sStyle, sType, sColor, sOutline, oStyle, oColor, oType, oWidth, rendererJSON;
    if(l.type==='Feature Layer'){//get feature layers only

        if(l.renderer.declaredClass==='esri.renderer.SimpleRenderer'){
            rType='"simple"'
        }

        var sSt = l.renderer.symbol.style
        sStyle='"'+l.renderer.symbol._styles[sSt]+'"';

        if (l.renderer.symbol.type==='simplefillsymbol'){
            sType='"esriSFS"'
        }

        var v=l.renderer.symbol.color;
        sColor='['+v.r+',' +v.g+','+ v.b+','+ v.a+']';

        var o = l.renderer.symbol.outline;
        var sOt = o.style
        oStyle = '"'+o._styles[sOt]+'"';
        var v = o.color
        oColor='['+v.r+',' +v.g+','+ v.b+','+ v.a+']';


        if (l.renderer.symbol.outline.type = 'simplelinesymbol'){
            oType = '"esriSLS"'
        }

        oWidth=l.renderer.symbol.outline.width
    }

    rendererJSON = '{ "type":'+rType+',"symbol":{"type":'+sType+',"style":'+sStyle+',"color":'+sColor+',"outline":{"type":'+oType+',"style":'+oStyle+',"color":'+oColor+', "width":'+oWidth+'}}}';
    return rendererJSON

}

function printWHAF(){
        require(["esri/tasks/Geoprocessor"], function(Geoprocessor){ 
        // WHAFapp.printUrl="http://2k8carcasstest:6080/arcgis/rest/services/ WHAF/WHAFprinter/GPServer/Print%20a%20WHAF%20map";
        WHAFapp.printUrlExp="http://arcgis.dnr.state.mn.us/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
        var printGp,json,folder,layout,format,params; 
        try{
            printGp=new Geoprocessor(WHAFapp.printUrlExp)
        }catch(err){console.log("no printing service available")}

        json=mapJSON();
        folder=WHAFapp.printTemplates;
        layout="./templates/"+WHAFapp.template.layout+".mxd"
        params = { 
            "Web_Map_as_JSON": json,
            "Format": WHAFapp.template.format.toLowerCase(),
            "Layout_Template": layout,
            "f": "json"            
        };

        printGp.submitJob(params, statusComplete,statusCallback,errBack);
        // printGp.execute(params, statusComplete,errBack);
                $('#pBtn').hide();
                $("#pMsg").fadeIn();
                $("#pMsg").html("Creating your map..");
        
        
        function statusCallback(jobInfo) {
            var status = jobInfo.jobStatus;
            if (status === "esriJobExecuting"){
                $("#pMsg").fadeIn();
                $("#pMsg").html("Creating your map..");
            }
            else if (status === "esriJobSucceeded") console.log("done")
        }

        function errBack(jobInfo){
            $("#pMsg").hide();
            $("#pErrMsg").fadeIn();
            try{console.log(jobInfo)}catch(err){};

        }

        function statusComplete(jobInfo) {
            if (jobInfo.jobStatus === "esriJobSucceeded") {
                printGp.getResultData(jobInfo.jobId, "Output_File", downloadFile);
            }
        }

    })
}

function downloadFile(outputFile) {
    
    $("#pMsg").addClass('btn-success')
    $("#pMsg").html("Download your map " + "<a onclick='' href='" + outputFile.value.url + "' target='_blank'>Here</a>")
}

function resetPbtn(){
    $("#pMsg").removeClass('btn-success')
    $("#pMsg").hide();
    $("#pErrMsg").hide()
    $('#pBtn').fadeIn();
}

function ts_brighter(id){
  $('#'+id).siblings().removeClass('tsBtnActive')
  $('#'+id).addClass('tsBtnActive')
}

function timeStampIndex(index){
   var impervHtml = '<div class="row show-grid" style="margin-left:0px"> <div id="ts2011" class="span4 tsBtn tsBtnActive text-center" href=\'#\' style="font-weight:bold" title="" onclick="respond(\'Hyd Index - Impervious Cover, 2011\', \'Impervious Cover (catchment scale)\', \'49\', true); ts_brighter(id)">2011</div><div id="ts2006" class="span4 tsBtn text-center" href=\'#\' style="font-weight:bold" title="" onclick="respond(\'Hyd Index - Impervious Cover, 2006\', \'Impervious Cover (catchment scale)\', \'49\', true);ts_brighter(id)">2006</div><div id="ts2001" class="span4 tsBtn text-center" href=\'#\' style="font-weight:bold" title="" onclick="respond(\'Hyd Index - Impervious Cover, 2001\', \'Impervious Cover (catchment scale)\', \'49\', true); ts_brighter(id)">2001</div></div>',
   perennHtml = '<div class="row show-grid" style="margin-left:0px"> <div id="ts2011" class="span4 tsBtn tsBtnActive text-center" href=\'#\' style="font-weight:bold" title="" onclick="respond(\'Hyd Index - Perennial Cover, 2011\', \'Perennial Cover (catchment scale)\', \'31\', true); ts_brighter(id)">2011</div><div id="ts2006" class="span4 tsBtn text-center" href=\'#\' style="font-weight:bold" title="" onclick="respond(\'Hyd Index - Perennial Cover, 2006\', \'Perennial Cover (catchment scale)\', \'31\', true);ts_brighter(id)">2006</div><div id="ts2001" class="span4 tsBtn text-center" href=\'#\' style="font-weight:bold" title="" onclick="respond(\'Hyd Index - Perennial Cover, 2001\', \'Perennial Cover (catchment scale)\', \'31\', true); ts_brighter(id)">2001</div></div>'
    $('#scoreTimeStamp').html('');
    switch(index){
        case 39:
            $('#scoreTimeStamp').html(perennHtml);
            break;
        case 42:
            $('#scoreTimeStamp').html(impervHtml);
            break;
    }    
    $('.tsBtn').css({'min-height':'20px'})
}



//FUNCTIONS TO SHOW OR HIDE SEARCH BAR ON APPLICATION. 
function searchHide(){
    $('#search_input').hide()
    $('.esriGeocoderContainer').animate({'width':'28px'}, 300);  
}

function searchShow(){
    var s = $('.esriGeocoderContainer').css('width');
    if (Number(s.replace('px',''))<100){
        $('.esriGeocoderContainer').animate({'width':'198px'}, 300, function(){
            $('#search_input').show()  
        });          
    }else{
        searchHide()
    }

}

function topWSDD(){
    $('#dropDownWS').scrollTop(0);
}

function WhafMapConstructor(v){//sets the map from url or bookmark from encoded params 
    if (v.indexOf("?xtnt")===0){//if paramString was not encoded
        setMapFromBookmark(v);
        return
    }

    $('#loader').show()
    var ppp = retrieveEncodedParams(v);
    var bm = evalBaseMapParam(ppp), ex = setFromExtentParams(ppp), mm = ppp.auxFtLst;
    map.setBasemap(bm)
    map.setExtent(ex)
    $('#sortable').html('');
    auxFeatObjectUrl={};
    forceRemoveAux();
    WHAFapp.currentMapParams.theseFeatures = []

    try{evalPlace(ppp.Plc)}catch(s){}  

    reorderByList();
    
    evalScales(ppp);

    paramEvaluatorInit(ppp)//sets index layer (health score)

    //evalDrawParams(ppp);// index opacity; hillshade and hillshade opacity; aux features

    try{getLayersIn(mm)}catch(u){};

    try{scaleAttrFromUrl()}catch(r){};//assigns the scale property value on scale layer based on passed parameters

    
}

function retrieveEncodedParams(e){
    var vz,y;
    vz = e.replace('?p=','');//extracts encoded parameters from url parameter
    y=decode(vz);//decodes params
    mapParamObject={};
    for (i = 0; i < mapParamsList.length; i++) {//retrieves parameters based on a predefined list. Where a parameter was passed, populates object.
        if (getBookmarkParameter(mapParamsList[i],y) != "null") {
            mapParamObject[mapParamsList[i]] = getBookmarkParameter(mapParamsList[i],y);
            mapParamObject.params = true;
        } else{
            mapParamObject[mapParamsList[i]] =undefined;
        }
    }
    return mapParamObject;
}

function setMapFromBookmark(bmarkSynt){
    console.log('setting map from bookmark')
    WHAFapp.currentMapParams.urlLoading=1;
    $("#loader").show();

  
    var y=bmarkSynt;
    mapParamObject={};
    for (i = 0; i < mapParamsList.length; i++) {
        if (getBookmarkParameter(mapParamsList[i],y) != "null") {
            mapParamObject[mapParamsList[i]] = getBookmarkParameter(mapParamsList[i],y);
            mapParamObject.params = true;
        }
    }
  
    console.log("mapParamObject: ",mapParamObject)

    var t=mapParamObject;
    map.setExtent(setFromExtentParams(t));
  
    setFromBaseMapParam(t);

    mjStarter=mapParamObject.Mj;

    auxFeatObjectUrl = {}//clear layers in memory 
    sortableLayerRemover()//remove default or existing layers

    paramEvaluatorInit(t);
  
    WHAFapp.currentMapParams.theseFeatures = []

    
    evalDrawParams(t);  
  
    try{getLayersIn(t.auxFtLst)}catch(u){};


    if (mapParamObject.Plc && mapParamObject.Plc !== undefined) {
        evalPlace(mapParamObject.Plc);
        clearScales();
    } else{
        deleteScaleslayers();
        DSS_objectives.point={};
        try{map.graphics.remove(starLocation.mainMap);$(".locLink").text('Set map location');}catch(e){};
        try{setDssStar('remove');}catch(err){};
    };

    if (mapParamObject.Msk && mapParamObject.Msk !==undefined){
        WHAFapp.currentMapParams.MskLoading=1   
    }   
}

function setMapFromBookmark_(bmarkSynt){
    console.log('setting map from bookmark')
    var t=retrieveEncodedParams(bmarkSynt);// an object containing map parameters(mapParamObject)
    WHAFapp.currentMapParams.urlLoading=1;
    $("#loader").show();  


    evalScales(t);
    setFromExtentParams(t);
    setFromBaseMapParam(t);

    mjStarter=mapParamObject.Mj;

    auxFeatObjectUrl = {}//clear layers in memory 
    sortableLayerRemover()//remove default or existing layers
 
    paramEvaluatorInit(t)//sets index layer (health score)
    
    evalDrawParams(t);// index opacity; hillshade and hillshade opacity; aux features

    if (mapParamObject.Plc && mapParamObject.Plc !== undefined) {
        evalPlace(mapParamObject.Plc);
    } else{
        deleteScaleslayers();
        DSS_objectives.point={};
        try{map.graphics.remove(starLocation.mainMap);$(".locLink").text('Set map location');}catch(e){};
        try{setDssStar('remove');}catch(err){};
    };

    if (mapParamObject.Msk && mapParamObject.Msk !==undefined){
        WHAFapp.currentMapParams.MskLoading=1   
    }

    
    
}

function evalScales(mapParamObject){ //converts scale rendering spec in mapParamObject (passed in url text) to WHAFapp.currentMapParams object
    var togL1=['togglerU','togglerD','togglerMj','togglerBsn','togglerC'], 
    togL2=['tU','tD', 'tMj', 'tBsn','tC'];
    for (var i=0; i<togL1.length; i++){
        var w=mapParamObject[togL2[i]];
        if (w && w != undefined){
            WHAFapp.currentMapParams[togL1[i]]=sConverter(w);
        } else{
            WHAFapp.currentMapParams[togL1[i]]='none'
        }
    }
}

function sConverter(s){
    switch (s) {
        case 'o':
            return 'outline';
            break;
        case 'f':
            return 'fill';
            break;
        case 'm':
            return 'mask';
            break;
        case 't':
            return 'outline';//previously: true
            break;
        default:
            return undefined;
        }

}

function completeParamLoad(){
    if(getURLParameter('p') && getURLParameter('p')!== "null"){
        console.log("loading (new) params")
        WhafMapConstructor(getURLParameter('p'))
    } else{//IF PARAMETERS ARE PASSED OLD STYLE, CREATE MAP VIEW
        evalDrawParams(mapParamObject);
        paramEvaluatorInit(mapParamObject);
    }
}