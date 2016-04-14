//var t = legendd.layerInfos;w=t[2].layer.layerInfos;var s = t[2].layer.visibleLayers

//for (var i=0; i<s.length; i++){ console.log(w[s[i]].name) }

function loadSelectableLyr(urlId,auxID) {
    // console.log("tryin to retrieve ",auxID)
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
        WHAFapp.selectableLayer[auxID].lyrs[lyrId].on('selection-complete',function(){
            WHAFapp.selectableLayer[auxID].lyrs[lyrId].showing=true;
        })
        WHAFapp.selectableLayer[auxID].lyrs[lyrId].on('load', function(){
            addImpairment();
            WHAFapp.selectableLayer.loadStatus="ready";
            $('#loader').hide();
        });
        WHAFapp.selectableLayer[auxID].lyrs[lyrId].on('graphic-add',function(){
            reorderImpairesLayers();
        });
        var lyrr=WHAFapp.selectableLayer[auxID].lyrs[lyrId]

        console.log(lyrr)
        

       lyrr.layerInfos=[]
       var zz={"name":"An impaired thing"}
       //lyrr.layerInfos.push(zz)
       //lyrr.visibleLayers=[0]


        map.addLayer(lyrr);


        var hLyrr={
            layer:lyrr,
            title:"An impaired Layer"
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
            WHAFapp.selectableLayer[auxID].lyrs[lyrId].selectFeatures(query,WHAFapp.FeatureLayerCons.SELECTION_NEW);
            WHAFapp.selectableLayer[auxID].lyrs[lyrId].currentQuery=query;
        } catch (s) {console.log(("failed to load a scale layer"))}

    };
}