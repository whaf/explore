//Many of these functions are used in experimental or unfinished processes. 

function mapRunner(){
    console.log("MAP RUNNER INITIATED")

    if(runningMapNumber==1){
        var mh=$('#map').css('height');
        var mhh=Number(mh.replace('px',''));

        var runningMapsList = [];
        var namy;
        for (var key in indexdescNewJsonX){//populate maps with index scores, in this case only for indices that have catchmentlevel scores.  
          var val = indexdescNewJsonX[key];
          
          if (val.catchmentId){
              console.log(key, val.name, val.catchmentId);
              namy=val.name;
              DSS_objectives[runningMapNumber]={};
              DSS_objectives[runningMapNumber].name=namy;
              DSS_objectives[runningMapNumber].layerId=val.catchmentId;
              runnimgMapCreator(runningMapNumber, DSS_objectives[runningMapNumber].layerId);
              runningMapNumber++;
          }
          if (val.metrics && val.metrics!='undefined'){
            for (var r=0; r<val.metrics.length; r++){
              var mtx = val.metrics[r];
              if (mtx.catchmentId){ 
                console.log(mtx.name, mtx.catchmentId);
                namy=mtx.name;
                DSS_objectives[runningMapNumber]={};
                DSS_objectives[runningMapNumber].name=namy;
                DSS_objectives[runningMapNumber].layerId=mtx.catchmentId;
                runnimgMapCreator(runningMapNumber, DSS_objectives[runningMapNumber].layerId);
                runningMapNumber++;
              }
            }
          }
        }
    }           
    function runnimgMapCreator(nmbi, layerId){
        require(["esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ImageParameters","esri/map"],
        function(ArcGISDynamicMapServiceLayer,ImageParameters,Map){

            mapPlaceID = "map"+layerId;
            hT = '<li id="'+mapPlaceID+'" class = "objectiveMap">'+'<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="$(this).parent().hide()">×</button><div class="centText2"><h4>' +namy +'</h4></div>'+

            '</li>';
            
            $('#mapRunSortable').append(hT);
            $('#'+mapPlaceID).css('height',mhh);
            
            //resizeElementHeight(mapPlaceID);
            DSS_objectives[nmbi].map = new Map(mapPlaceID, {
                basemap: evalBaseMapParam(WHAFapp.currentMapParams.Bsmp),
                extent: initExtent
            });

            var indexLayerRM = Number(layerId)
            imageParameters = new ImageParameters;
            imageParameters.layerIds = [indexLayerRM];
            console.log("layer number: ", indexLayerRM)
            imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
            var runningIndex = new ArcGISDynamicMapServiceLayer(assessmentURL, {
                imageParameters: imageParameters
            });
            runningIndex.setOpacity(1);
            runningIndex.id="DSS_indexLayer"+String(layerId);
            console.log(runningIndex.id)

            DSS_objectives[nmbi].map.addLayer(runningIndex);
            loadWsMaskForMapRunner(DSS_objectives[nmbi].map)

            DSS_objectives[nmbi].map.hideZoomSlider();
        })
    }

    try{setDssStar();}catch(err){};
}
function setDssModeStep1(){
    $('#shareIcB, #bookMarkIc, #refrBIcon').hide();
    $('#HeadBar').css('border-bottom','0px');
    listi = ['menuBox', 'back', 'StateIcon']

    for (itemL in listi){
        moveItDown(listi[itemL], 21)  
    }

    function moveItDown(item, pixels){
        var rr=$('#'+item).css('top');
        var dd=Number(rr.replace('px',''))+pixels;
        var aa=String(dd)+"px";       
        $('#'+item).css('top',aa);
    }
}

function resumeFromDSS_step1(){
    $('#shareIcB, #bookMarkIc, #refrBIcon').show();
    $('#HeadBar').css('border-bottom','1px');
}

function startDss(){
    $('#DSS_title').show();   
    var Dss_text = String(DSS_step+1)+". "+DSS_steps[DSS_step];
    $('#DSS_stepTitle').text(Dss_text);
    DSS_act();
    
}

function DSS_nexter(){
    if(DSS_step<3){
        var ll = DSS_steps.length
        if (DSS_step<ll-1){
            DSS_step=DSS_step+1        
        }
        if (DSS_steps[DSS_step] && DSS_steps[DSS_step]!= undefined){
            var Dss_text = String(DSS_step+1)+". "+DSS_steps[DSS_step];
            $('#DSS_stepTitle').text(Dss_text);        
        }

        DSS_act()
    } else{
        setDssStar();
        try{moveDss('forward')}catch(err){};
    }
}

function DSS_backer(){
    if(DSS_step !=3 || objectiveCurrentView==0){
        if (DSS_step>0){
            DSS_step=DSS_step-1        
        }
        if (DSS_steps[DSS_step] && DSS_steps[DSS_step]!= undefined){
            var Dss_text = String(DSS_step+1)+". "+DSS_steps[DSS_step];
            $('#DSS_stepTitle').text(Dss_text);
        }

        DSS_act()
    } else{
        try{moveDss('backward')}catch(err){}   
    }
}

function actPrimer(){
    $('#scalePlace').html('');
    $('#searchPlace').hide();
    // $('#DssStarImage').tooltip('hide');
    resetDrawStar()  


}
function DSS_act(){
    
    switch(DSS_step){
        case 0:
        actPrimer()
        $('#DSS_backButton').hide();
        $('#DssStarImage').tooltip('hide');
        $('#DSS_backButton').hide();
        $('#scalePlace').load('majorWatershedsDropDown.html', function(){
            resizeElementHeight('dropDownWS', 180);            
        });
        $('#searchPlace').show();
        $('*').tooltip();

        break;

        case 1:
        actPrimer();
        mapRunner();    
        DSS_StarState=false;
        $('#DSS_backButton').show();
        $('#DssStarImage').click();
        $('#DssStarImage').tooltip('show');
        $('*').tooltip();
        break;

        case 2:
        actPrimer();
        $('#DssStarImage').tooltip('hide');
        resetDrawStar();
        $('#scalePlace').load('scaleButtons1.html', function(){
            $('*').tooltip();
            if(DSS_objectives.place && DSS_objectives.place != undefined){
                $('.starrButton').removeClass('disabled');   
            }
        });

        break;

        case 3:
        DSS_objectives.baseExtent=map.extent;
            
 
        $( "#DSS_aSlider" ).slider({
            value: WHAFapp.currentMapParams.indOp*100,
            slide: function (event, ui) {
                DSS_changeScoreOpacity(ui.value);
                $("#DSS_aSlider").slider("value", ui.value);
                try{legendd.refresh();}catch(m){};
            }
        });



    }
    console.log("Executing Step ", DSS_step)
}

function moveDss(where){
    var o=objectiveCurrentView;
    var v=$('#map').css('height');
    var vv=Number(v.replace('px',''));


    if(where=="forward"){
        o=o+1;
        $('#DSS_indexTitlePlace').show();
        var ff=$('#DSS_title').offset().left
        var zz=$('#DSS_title').offset().top
        var hh=$('#DSS_title').css('height')
        var hhh=Number(hh.replace('px',''))
        var tt=zz+hhh+15

        $('#DSS_indexTitlePlace').css('top',tt)
        $('#DSS_indexTitlePlace').css('left',ff)


        var yop =-o*vv;
        $('#mapWrap').animate({ 'margin-top': yop }, 800);
        assignCurrentmap()


    }

    else if (where =="backward"){
        if(o>1){
            $('#DSS_indexTitlePlace').show();
            o=o-1;
            var yop =-o*vv;
            $('#mapWrap').animate({ 'margin-top': yop }, 800);
            assignCurrentmap()
        }
        else if (o==1){
            o=0;
            $('#DSS_indexTitlePlace').hide();
            $('#mapWrap').animate({ 'margin-top': '0px' }, 800);
            assignCurrentmap()


        }

    }

    objectiveCurrentView=o;
    var indexName = DSS_objectives[o].name;
    $('#DSS_drop2').text(indexName)

    function assignCurrentmap(){        
        if (o>0){

            map=DSS_objectives[o].map;
            var currentLayerId = DSS_objectives[o].layerId;
            var CurrentIndexLayerId = "DSS_indexLayer"+currentLayerId;
            DSS_indexlayer=map.getLayer(CurrentIndexLayerId);
            DSS_indexlayer.setOpacity(WHAFapp.currentMapParams.indOp);
        } else{
            map=mainMap;
            DSS_indexlayer={};
        }        
    }
}

function DSS_reset(){
    map=mainMap;
}

function loadWsMaskForMapRunner(xMap){

    if (DSS_objectives.major && DSS_objectives.major !== undefined){

        if(WHAFapp.currentMapParams.maskLayer&&WHAFapp.currentMapParams.maskLayer=="2"){//if main map has already a mask layer

            var t = (new Date).getTime();
            m = "major <>" + DSS_objectives.major + " AND " + t + "=" + t;



            // var maskSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255, 0]), 0), new dojo.Color([0, 0, 0, .7]))
            var noSymbol = noSymb; //new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL, new dojo.Color([255, 255, 255, 0]), 0), new dojo.Color([0, 0, 0, .7]))
            DSS_objectives.MajorMaskFL = new FeatureLayer(assessmentURL + "/1", {
                // maxAllowableOffset: 50,
                mode: FeatureLayer.MODE_ONDEMAND,
                outFields: ["major"]
                });
            DSS_objectives.MajorMaskFL.setDefinitionExpression(m);
            DSS_objectives.MajorMaskFL.setRenderer(new  WHAFapp.SimpleRendererCons(maskSymbol));
            DSS_objectives.MajorMaskFL.id = "majorMaskGraphics";
            DSS_objectives.MajorMaskFL.identifier = "majorsGraphics";
            DSS_objectives.MajorMaskFL.identifierS = "majorsGraphics";// 


            mWrap = masksUrl+'/2';
            wrapperFL= new FeatureLayer(mWrap,{
                // maxAllowableOffset: 50,
                mode: FeatureLayer.MODE_ONDEMAND,
                outFields: ["*"]
                });
            wrapperFL.setRenderer(new  WHAFapp.SimpleRendererCons(maskSymbol));
            wrapperFL.id = "wrapper";
            wrapperFL.identifier = "majorsGraphics";
            

            try {
                xMap.addLayer(DSS_objectives.MajorMaskFL);
                xMap.addLayer(wrapperFL);

            } catch (s) {};
        }
     }
}

function listIndiceMetric(){ //gets all indices and metrics from indexdescNewJson returning object with lists of names and short names of indices and metrics. 
    var moleculeIndiceList = {H:{names:[], shortNames:[]},G:{names:[], shortNames:[]}, B:{names:[], shortNames:[]}, C:{names:[], shortNames:[]},W:{names:[], shortNames:[]}};

    for (var key in indexdescNewJson) {
      var indx = indexdescNewJson[key];
      var comp = key[0];
      nameLister(indx, comp);
    }

    function nameLister(index, comp) {
      var compListi = ['H','B','C','G','W'];

      if (compListi.indexOf(comp) != - 1) {
        var nameLst = moleculeIndiceList[comp].names
        var shortNameLst = moleculeIndiceList[comp].shortNames
        nameLst.push(index.name);
        shortNameLst.push(index.shortName);
        if (index.metrics && index.metrics != 'undefined') {
          var m = index.metrics;
          for (var r = 0; r < m.length; r++) {
            var f = m[r];
            nameLst.push(f.name)
            shortNameLst.push(f.shortName)
          }
        }
      }
    };
    return moleculeIndiceList;
}

function setMoleculeExperimentZTT(){

    DSS_objectives.molecule={"parts":{}};
    var barbar = listIndiceMetric();
    var allShorters=[];
    var compList = ['H','G','B','C','W']; 
    for (var iii=0; iii<compList.length; iii++){
        var lister=barbar[compList[iii]]
        shorList = lister.shortNames
        for (var fff=0; fff<shorList.length; fff++){
            var shoerNamer = shorList[fff] 
            if (shoerNamer!=""){
                allShorters.push(shoerNamer) 
            }
        }
    };
    var bigFactor=1;
    DSS_objectives.molecule.molecular = Raphael('molecule', 1640, 650);
    var d=DSS_objectives.molecule.molecular.ellipse(650,270,600,210);
    d.attr({"opacity":0.1});
    DSS_objectives.molecule.line=d;
    var totL=d.getTotalLength();

    DSS_objectives.molecule.molecular.customAttributes.progress = function (v) {//for animation of elements on ellipse
        var path = DSS_objectives.molecule.line; 
        var len = totL;
        var point = path.getPointAtLength(v * len);
        return {transform: "t" + [point.x, point.y]+"s"+(point.y/2+300)/(300)};
    };
    
    var t=allShorters.length;
    var gap=totL*1/t;
    var bb=0;
    var SUMMER=0;
    var cntr = 0;
    var z=d.getBBox();
    DSS_objectives.molecule.partsIds=[];

            function move(x,dur,callback){
            var n,m;
            m=this.currentPlace;  
            if((m+x)>t){n=(m+x)-t; o=0}
            //console.log("Bigger, ",m,x,t,o)}
            
            else if ((m+x)<0){n=(m+x)+t; o=1}
            //console.log("Smaller, ",m,x,t,o)}
            
            else {n=m+x; o=m/t;}
            //console.log("Zero, ",m,x,t,o);};
            
            
            this.attr("progress", o);
            //console.log("from: ", DSS_objectives.molecule.molecular.customAttributes.progress(o))
            this.animate({ progress: n/t }, dur, callback);
            //console.log("to: ", DSS_objectives.molecule.molecular.customAttributes.progress(n/t))
            this.currentPlace=n;

        };


        function shakeIt(t,dur){
            var r=t, b=this;
            if (r>0 ){//&& cntr==24){
                duR=dur/t;
                b.move(1,duR, function(){
                    r=r-1;
                    b.shakeIt(r,dur);
                });
            }  
            else if (r<0){
                duR=-1*dur/t;
                b.move(-1,duR, function(){
                    r=r+1;
                    b.shakeIt(r,dur);
                });
            };
            //console.log(cntr)
            
        };

    while (cntr<t){
        //if (cntr<t/2){tempVal=tempVal+bb}else{tempVal=tempVal-bb}
        var where = cntr*(gap)
        var pos = d.getPointAtLength(where);
        var ss=((z.y2-pos.y)/z.height-0.5)*120
        var where2 = where+bb
        var pos2 = d.getPointAtLength(where2);
        var rad = 70/((900/(pos.y+150)));
        var mm="s"+rad
        var c=DSS_objectives.molecule.molecular.rect(0,0,20,20);
        var place = [pos2.x,pos2.y];
        //c.transform(mm);
        c.attr({"stroke":"none"});
        c.currentPlace=cntr;
        c.move=move;
        c.shakeIt=shakeIt;
        DSS_objectives.molecule.partsIds.push(c.id);
        var text=allShorters[cntr]
        var tx = DSS_objectives.molecule.molecular.text(0,0, text); 
        //tx.data("mypath", d); 
        tx.currentPlace=cntr;
        tx.move=move;
        tx.shakeIt=shakeIt;


        DSS_objectives.molecule.partsIds.push(tx.id);
        cntr++
        DSS_objectives.molecule.parts[text]={"shape":c,"shortname":tx, "number":cntr};
        DSS_objectives.molecule.parts[text].shortname.shakeIt(1,10);
        DSS_objectives.molecule.parts[text].shape.shakeIt(1,10);
        //console.log(cntr)
        
      ///toSize(tx,c,rad,1)
      
      //DSS_objectives.molecule.parts[text]={"shape":c,"shortname":tx}//, "place":place}
       
      SUMMER=SUMMER+ss
      
    }    
    DSS_objectives.molecule.allNames=allShorters
    function toSize(inT, outB,rad, factor){
      var txS="s"+rad/35
      inT.transform(txS);
      //if (3==3)
      if (stayIn(inT,outB)==true)
      return
      factor=Number(factor)+1;
      if (factor>bigFactor){bigFactor=factor}//console.log(factor)
      
      toSize(inT,outB,rad,factor) 
     
    }
     function stayIn(tz,wrap){
     
     var t = tz.getBBox();
     if (wrap.isPointInside(t.x,t.y)==true &&
         wrap.isPointInside(t.x,t.y2)==true &&
         wrap.isPointInside(t.x2,t.y)==true &&
         wrap.isPointInside(t.x2,t.y2)==true 
        ){
      return true 
     }
    }

    function moveMolecule(num, dur){
        var j=DSS_objectives.molecule.partsIds;
        for (var x=0; x<j.length;x++){
          a=DSS_objectives.molecule.molecular.getById(j[x]);
          a.shakeIt(num,dur)
        };
    }

    DSS_objectives.molecule.moveIt=moveMolecule;
    
    
}

