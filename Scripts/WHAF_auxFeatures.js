function auxFeatureConstructor(displayName, restUrl, layerId, scaleMax, scaleMin, layerType, attributeDisplay, group, checked){
    this.displayName = displayName;
    if(restUrl){this.restUrl=restUrl} else{this.restUrl=auxURL}
    this.restUrlID = layerId;
    this.maxScale = scaleMax;
    this.minScale = scaleMin;
    this.Ltype = layerType;
    this.Dattributes = attributeDisplay
    this.group = group
    if(checked==true){this.show=true}else{this.show=false}
    if(attributeDisplay==true){this.identify=true}else{this.identify=false}


    
    this.implement=function(){//adds layer to list (not necessarily to map view)
        layerItemID++;
        
        var fullRestUrl = this.restUrl+"/"+this.restUrlID;
        var itemID = layerItemID;
        var groupA = this.restUrl;
        var idIt = this.identify;
        var checkIt = this.show;
        processRestUrl (fullRestUrl, this.displayName, checkIt, layerItemID, idIt);
        
        if(! Number(this.group)){//differentiates between auxiliary layers defined by app in availableAuxFeatures object and others
            var layerItem = {id:layerItemID, group:groupA, title:displayName, layerID:layerId, checked:checkIt, identify:idIt}        
        }else{
            var layerItem = {id:layerItemID, group:this.group, title:"", layerID:"", checked:checkIt, identify:idIt};
        }

        WHAFapp.currentMapParams.theseFeatures.push(layerItem);
        // $('#menuPlace, #printPlace').hide();00$('#featuresPlace').show();
        gdrsNoter();
    }



    this.listOptions=function(array){
        array.push(this.displayName);
    }
}

var availableAuxFeatures = {//NOTE: DO NOT CHANGE NAMES (I.E. FLOATS) IN THIS OBJECT WHEN UPDATING OR ADDING FREATURES)

    1.11:["Major Streams", "",0,"", "", "dynamic", "", "general"],
    1.12:["River Basins (HUC4)", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_watersheds/MapServer",0,"" ,"" , "dynamic","" ,"general"],
    1.13:["Altered Watercourses", "", 54,"", "", "dynamic", "", "general"],
    1.14:["Catchments (sub-divided HUC12)","http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_watersheds/MapServer" , 6,"" ,"" , "dynamic", "*","general"],
    1.15:["Catchments by Hydrologic Position", "", 74, "", "", "dynamic", "", "general"],
    2.11:["Water Bodies (PCA)", "http://pca-gis02.pca.state.mn.us/arcgis/rest/services/EDA/swedaV2/MapServer",15,"", "", "dynamic", "", "general"],
    2.12:["Impaired Waters (PCA)", "http://pca-gis02.pca.state.mn.us/arcgis/rest/services/EDA/swedaV2/MapServer",8,"", "", "dynamic", "", "general"],
    2.13:["Ecoregions (PCA)", "http://pca-gis02.pca.state.mn.us/arcgis/rest/services/EDA/swedaV2/MapServer",34,"", "", "dynamic", "", "general"],
    1.151:["DNR Regions", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_auxiliaryfeatures_gdrs/MapServer", 15, "", "", "dynamic", "", "general"],
    1.16:["GWMA - Working Boundaries", "", 17, "", "", "dynamic", "", "general"],

    1.161:["Full River Basins (HUC 4)", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_watersheds/MapServer",1,"", "", "dynamic", "", "Index Related Features"],
    1.17:["DNR Major Watersheds (HUC 8)", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_watersheds/MapServer",5,"", "", "dynamic", "", "Index Related Features"],
    1.18:["HUC10 Watersheds", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_watersheds/MapServer",9,"", "", "dynamic", "", "Index Related Features"],
    1.20:["HUC12 Watersheds", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_watersheds/MapServer",10,"", "", "dynamic", "", "Index Related Features"],
    1.22:["One Watershed, One Plan - Planning Boundaries", "",31,"", "", "dynamic", "", "Index Related Features"],
    1.23:["Historic Aerial Photographs (center point with link to photo - Source: UMN Borchert Map Library)", "",49,"", "", "dynamic", "", "Index Related Features"],    
    1.24:["Marschner Presettlement Vegetation", "",11,"", "", "dynamic", "", "Index Related Features"],
    1.25:["NLCD 2011 - Land Cover", "http://raster.nationalmap.gov/arcgis/rest/services/LandCover/USGS_EROS_LandCover_NLCD/MapServer",6,"", "", "dynamic", "", "Index Related Features"],
    1.251:["NLCD 2006 - Land Cover", "http://raster.nationalmap.gov/arcgis/rest/services/LandCover/USGS_EROS_LandCover_NLCD/MapServer",14,"", "", "dynamic", "", "Index Related Features"],
    1.252:["NLCD 2001 - Land Cover", "http://raster.nationalmap.gov/arcgis/rest/services/LandCover/USGS_EROS_LandCover_NLCD/MapServer",24,"", "", "dynamic", "", "Index Related Features"],
    1.26:["NLCD 2011 - Imperviousness", "",79,"", "", "dynamic", "", "Index Related Features"],
    1.27:["NASS 2014 - Crop Data Layer", "",18,"", "", "dynamic", "", "Index Related Features"],
    1.28:["ECS Provinces of Minnesota", "", 12, "", "", "dynamic", "", "Index Related Features"], 
    1.29:["ECS Sections of Minnesota", "", 13, "", "", "dynamic", "", "Index Related Features"], 
    1.30:["ECS Subsections of Minnesota", "",14,"", "", "dynamic", "", "Index Related Features"],
    1.31:["ECS Land Type Associations of Minnesota", "", 15, "", "", "dynamic", "", "Index Related Features"], 
    1.311:["MN Wildlife Action Plan - Wildlife Action Network", "", 80, "", "", "dynamic", "", "Index Related Features"],
    1.312:["MN Wildlife Action Plan - SGCN Richness Grid", "", 81, "", "", "dynamic", "", "Index Related Features"],
    //1.313:["MN Wildlife Action Plan - Conservation Focus Areas (Draft)", "", 82, "", "", "dynamic", "", "Index Related Features"],
    1.314:["MN Biological Survey - Sites of Biodiversity Significance", "", 84, "", "", "dynamic", "", "Index Related Features"],
    1.315:["MN DNR Hydrography - Lakes of Phosphorus Sensitivity Significance", "", 78, "", "", "dynamic", "", "Index Related Features"],
    1.32:["MN DNR Hydrography - Lakes of Biological Significance", "", 83, "", "", "dynamic", "", "Index Related Features"],
    1.34:["Ecological Patches and Connections", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_auxiliaryfeatures_gdrs/MapServer",13,"", "", "dynamic", "", "Index Related Features"],
    1.35:["Mussel Site Quality Score", "",77,"", "", "dynamic", "", "Index Related Features"],
    1.36:["Fish IBI points", "",8,"", "", "dynamic", "", "Index Related Features"], 
    1.37:["Invert. IBI points", "",9,"", "", "dynamic", "", "Index Related Features"], 
    1.380:["Aquatic Invasive Species Observations - Animals", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_auxiliaryfeatures_gdrs/MapServer",23,"", "", "dynamic", "", "Index Related Features"],
    1.381:["Aquatic Invasive Species Observations - Plants", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_auxiliaryfeatures_gdrs/MapServer",24,"", "", "dynamic", "", "Index Related Features"],
    1.382:["Aquatic Invasive Species Observations - Plants (polygons)", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_auxiliaryfeatures_gdrs/MapServer",25,"", "", "dynamic", "", "Index Related Features"],
    1.39:["Designated Infested Streams", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_auxiliaryfeatures_gdrs/MapServer",21,"", "", "dynamic", "", "Index Related Features"],
    1.391:["Designated Infested Waterbodies", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_auxiliaryfeatures_gdrs/MapServer",22,"", "", "dynamic", "", "Index Related Features"],
    1.40:["Assessed Streams 2012", "",71,"", "", "dynamic", "", "Index Related Features"],
    1.41:["Assessed Wetlands 2010", "",73,"", "", "dynamic", "", "Index Related Features"],
    1.42:["Assessed Lakes 2010", "",72,"", "", "dynamic", "", "Index Related Features"],
    1.43:["SPARROW - Total Phosphorus Incremental Yield from Non-Point Sources (Kg/km^2/year)", "", 61, "", "", "dynamic", "", "Index Related Features"],
    1.44:["SPARROW - Total Nitrogen Incremental Yield from Non-Point Sources (Kg/km^2/year)", "", 62, "", "", "dynamic", "", "Index Related Features"],
    1.45:["Inventory of Dams", "",16,"", "", "dynamic", "", "Index Related Features"],
    1.451:["Dams from GNIS", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_auxiliaryfeatures_gdrs/MapServer", 1,"", "", "dynamic", "", "Index Related Features"],
    1.46:["DOT Bridge and Culvert Inventory", "",75,"", "", "dynamic", "", "Index Related Features"],
    1.47:["Feedlots", "",7,"", "", "dynamic", "", "Index Related Features"],
    //1.48:["National Wetlands Inventory (raster)", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_auxiliaryfeatures_gdrs/MapServer",20,"", "", "dynamic", "", "Index Related Features"],
    1.49:["Restorable Wetland Inventory - Photo Interpreted", "", 63, "", "", "dynamic", "", "Index Related Features"],
    1.50:["Restorable Wetland Inventory (NRRI) - Terrain Analysis", "", 64, "", "", "dynamic", "", "Index Related Features"],
    1.51:["FEMA Q3 Floodways", "",76,"", "", "dynamic", "", "Index Related Features"],
    1.52:["State Water Use Permits", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_auxiliaryfeatures_gdrs/MapServer",0,"", "", "dynamic", "", "Index Related Features"],
    1.53:["Soils - Percent Sand", "",44,"", "", "dynamic", "", "Index Related Features"],
    1.54:["Soils - Percent Silt", "",45,"", "", "dynamic", "", "Index Related Features"],
    1.55:["Soils - Percent Clay", "",46,"", "", "dynamic", "", "Index Related Features"],
    1.56:["Soils - Percent Organic Matter", "",47,"", "", "dynamic", "", "Index Related Features"],
    1.57:["Groundwater Provinces", "",41,"", "", "dynamic", "", "Index Related Features"],
    1.58:["Groundwater Contamination Susceptibility", "",30,"", "", "dynamic", "", "Index Related Features"],
    1.59:["Phosphorus Risk Potential (Root River)", "", 32,"", "", "dynamic", "", "Index Related Features"],
    1.60:["DNR Hydro Mine Pit Features", "",10,"", "", "dynamic", "", "Index Related Features"],
    1.61:["City Boundaries", "",37,"", "", "dynamic", "", "Index Related Features"],
    1.62:["City Boundaries - With Labels", "",38,"", "", "dynamic", "", "Index Related Features"],
    1.63:["County Boundaries", "",39,"", "", "dynamic", "", "Index Related Features"],
    1.64:["County Boundaries - With Labels", "",40,"", "", "dynamic", "", "Index Related Features"],
    1.65:["Minnesota 2012 House Distritcs", "",33,"", "", "dynamic", "", "Index Related Features"],
    1.66:["Minnesota 2012 House Distritcs with Labels", "",34,"", "", "dynamic", "", "Index Related Features"],
    1.67:["Minnesota 2012 Senate Districts", "",35,"", "", "dynamic", "", "Index Related Features"],
    1.68:["Minnesota 2012 Senate Distritcs with Labels", "",36,"", "", "dynamic", "", "Index Related Features"],    
    1.69:["Karst Feature Inventory Points", "",6,"", "", "dynamic", "", "Index Related Features"], 
    1.70:["Population Density 2000 (Census Blocks)", "",19,"", "", "dynamic", "", "Index Related Features"],
    1.71:["Population Density 2010 (Census Blocks)", "",24,"", "", "dynamic", "", "Index Related Features"],
    1.72:["Population Change 2000-2010 (DNR Catchment)", "",29,"", "", "dynamic", "", "Index Related Features"],
    1.74:["State Parks, Rec. Areas", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_auxiliaryfeatures_gdrs/MapServer",16,"", "", "dynamic", "", "Index Related Features"],
    1.75:["Public Ownership by Agency - GAP Stewardship 2008", "",48,"", "", "dynamic", "", "Index Related Features"],
    1.76:["Temperature (mean annual fahrenheit) - 30 year Normal (1981 - 2010)", "",43,"", "", "dynamic", "", "Index Related Features"],
    1.77:["Precipitation (mean annual inches) - 30 year Normal (1981 - 2010)", "",42,"", "", "dynamic", "", "Index Related Features"]

}
// Unintentionally Dropped - need to add back
    // 1.33:["MN Biological Survey - Sites of Biodiversity Significance", "",66,"", "", "dynamic", "", "Index Related Features"],
// Deleted Service Layers
    // 1.73:["MN % Change Population 1990-2000 ", "",35,"", "", "dynamic", "", "Index Related Features"],
    // 1.88:["Average Annual Precipitation 1971-2000", "",30,"", "", "dynamic", "", "Index Related Features"]
    // 1.19:["HUC10 Watersheds - With Labels", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_watersheds/MapServer",58,"", "", "dynamic", "", "Index Related Features"],
    // 1.21:["HUC12 Watersheds - With Labels", "http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_watersheds/MapServer",86,"", "", "dynamic", "", "Index Related Features"],

var availableAuxFeatures2 = [];

function gdrsNoter(){//shows asterix under available features list if it includes a layer that's only visible in DNR network
    var aster = false;
    WHAFapp.currentMapParams.theseFeatures.forEach(function(e){
        var ast = (e.title[e.title.length-1]);
        if(ast=="*"){aster=true;}
    })
    if(aster==true){$("#GDRSnote").show()}else{$("#GDRSnote").hide()};
} 


function restCompR(featObject){
    var title=featObject.title, res, resStr, ch=0, iden=0, featLink = [], rest = featObject.group;
    if (featObject.checked){ch=1};
    if (featObject.identify){iden=1};  
    if(title && title !== undefined){
    
        res = rest.replace("http://","").split("/")
        resStr = ""
        for (i=0;i<res.length; i++){
          if (res[i] == "arcgis"){resStr = resStr+"~aA"}
          else if (res[i] == "rest"){resStr = resStr+"~rR"}
          else if (res[i] == "services"){resStr = resStr+"~sS"}
          else if (res[i] == "MapServer"){resStr = resStr+"~mM"}
          else if (i == 0){resStr = resStr+res[i]}
          else {resStr = resStr+"~"+res[i]} 
        }
        if(!Number(rest)){
            resStr = resStr+"~"+featObject.layerID;
            featLink.push(resStr, title, ch, iden);
        } else{
            featLink.push(resStr, ch, iden);
        }
    }
    else{
      resStr = resStr;
      featLink.push(rest, ch, iden);
    }
    return featLink; 
}

function featObjRebuild(stri){
  var rest,r,id,z,group, featObj2={};
  
  if (! Number (stri[0])){
    rest = compRestRebuild(stri[0]);
    r = rest.split("/");
    id = r[r.length-1];
    z = "/"+id;
    group = rest.replace(z, "")

    featObj2.group = group;
    featObj2.layerID = id;
    featObj2.title = stri[1];
    
  }
  
  else{
    featObj2.group=stri[0];
    featObj2.title = availableAuxFeatures[stri[0]][0];

  }
  
  if(!Number(stri[0])){
      featObj2.checked = false;
      if (stri[2]==1){featObj2.checked = true};
      featObj2.identify = false;
      if (stri[3]==1){featObj2.identify = true}
  } else{
      featObj2.checked = false;
      if (stri[1]==1){featObj2.checked = true};
      featObj2.identify = false;
      if (stri[2]==1){featObj2.identify = true}    
  }
  
  return featObj2;

}


function compRestRebuild(stri){
    
    var z = stri.split("~")
    var reconst = "http:/";
    for (f=0; f<z.length; f++){
        if (z[f] == "aA"){reconst = reconst+"/arcgis"}
        else if (z[f] == "rR"){reconst = reconst+"/rest"}
        else if (z[f] == "sS"){reconst = reconst+"/services"}
        else if (z[f] == "mM"){reconst = reconst+"/MapServer"}
        else {reconst = reconst+"/"+z[f]};
    };
    return reconst;
}


function featObjToUrlString(obj){//returns a list of lists, each compressed feature details from theseFeatures object
    var J=obj,fList=""
    for (var F=0; F<J.length; F++){
            var r = restCompR(J[F]);//creates a shortened string with layer parameters
            fList=fList+r+"]"
    }
    return fList
}

function featUrlStrToImplement(lst){
    for (var g in lst){
        try{
            var url = featObjRebuild(lst[g]); 
            if (url.title && url.title!== undefined){
                auxInitByUrl(url)
            }
        } catch(err){};
    }
    var list=[]
    for (fti in auxFeatObjectUrl){
       list.push(fti) 
    }
    lyrsIn(0)
    function lyrsIn(i){
      setTimeout(function(){  
        if (list[i]){
            auxFeatObjectUrl[list[i]].implement()
            var r = i+1;
            lyrsIn(r);
        }else{
            buildIdTasks();
            try{legendd.refresh()}catch(f){};
        }
      },300)
    }     
}

function getLayersIn(m){
    var oList = []
    var d = m.split("]")
    for (var s=0; s<d.length; s++){
        var c = d[s].split(",");
        if(Number(c[0])){
            c[1] = Number(c[1])
            c[2 ] = Number(c[2])
            if(s<d.length-1){
                oList.push(c)
            }
        }else{
            c[2] = Number(c[2])
            c[3] = Number(c[3])
            if(s<d.length-1){
                oList.push(c)
            }
       }
    }
    try{featUrlStrToImplement(oList)}catch(r){};
    console.log(oList)
    
}

function buildIdTasks() {//BUILDS AN IDENTIFY TASK, DEFINED AS A GLOBAL OBJECT SINCE ONLY ONE IS ALLOWED AT A TIME
    var idUrl, idLid;
    require(["esri/tasks/IdentifyTask","esri/tasks/IdentifyParameters"],function(IdentifyTask,IdentifyParameters){
        $.each(WHAFapp.currentMapParams.theseFeatures, function (e, t) {
            if (t.identify == true) {
                if(!Number(t.group)){ //for auxiliary features not defined in availableAuxFeatures object 
                    idUrl = t.group; 
                    idLid = [t.layerID];
                }else{
                    var sc1=availableAuxFeatures[t.group][1]; 
                    if (sc1 ===""){//for features published in auxUrl service
                        idUrl=auxURL;
                    }else{
                        idUrl=sc1;//for features with other service url specified in object
                    };
                    idLid = [availableAuxFeatures[t.group][2]];
                }
                identifyTask = new IdentifyTask(idUrl);
                identifyParams = new IdentifyParameters;
                identifyParams.tolerance = 3;
                identifyParams.returnGeometry = true;
                identifyParams.layerIds = idLid;
                identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_VISIBLE;
            }
        })
    })
}


function generalImplementation() {
    var f = WHAFapp.currentMapParams.mapFeatures;
    for (var q=0; q<f.length; q++){
        try{
            var y=availableAuxFeatures[f[q]][0];
            auxFeatObjectNew[y].implement();
        }catch(err){}
    }
}


function parametizeLayers() {
    for (var e = 0; e < WHAFapp.currentMapParams.theseFeatures.length; e++) {
        var t = WHAFapp.currentMapParams.theseFeatures[e];
        var n = t.group + "/" + t.layerID;
        var r = t.title;
        var i = t.checked;
        var id = t.identify;
        processRestUrl(n, r, i,n, true)
    }
}

function checkLayerbyID(e, t) {//updates currentMapParams that layer is checked
    console.log(e)
    $.each(WHAFapp.currentMapParams.theseFeatures, function (n, r) {
        if (r.id == t) {
            if (e) {
                r.checked = true;
                $('#'+t+' input').prop('checked',true)// ensures box is checked. 
            } else {
                r.checked = false
            }
        }
    });
}


function preProcessRestUrl() {
    var e = document.getElementById("addedLayerName").value;
    var t = document.getElementById("AddingRestPoint").value;
    var n = t.lastIndexOf("/");
    var r = Number(t.substr(n + 1));
    var i = t.slice(0, n);
    auxFeatureConstructor(e, i, r, "", "", "dynamic", "*", "added");
    layerItemID++;
    processRestUrl(t, e, false, layerItemID);
    var s = layerItemID;
    var o = i;
    var u = {
        id: s,
        group: o,
        title: displayName,
        layerID: r,
        checked: false,
        identify: false
    };
    WHAFapp.currentMapParams.theseFeatures.push(u)
}

function processRestUrl(e, t, n, r, ident) {
    var i = "*",ttt;
    if (e == undefined) {
        var e = document.getElementById("AddingRestPoint").value;
    }
    if (t == undefined) {
        var t = document.getElementById("addedLayerName").value;
    }
    var s = e.lastIndexOf("/");
    var o = Number(e.substr(s + 1));
    var u = e.slice(0, s);
    var a = t;
    var f = "checkLayerbyID(checked, $(this).parent().parent().parent().attr('id'));";
    var l = "removeLayerObjectbyID($(this).parent().parent().parent().attr('id'))";
    if (n) {
        var c = '<input type="checkbox" value=' + o + ' checked title="" autocomplete="off" onclick="'+f+'respondToAddFeatureUrl(checked, \'' + u + "', " + o + ", '" + a + "','" + i + "', $(this).parent().parent())\">";
        respondToAddFeatureUrl(n, u, o, a, i, $(this).parent().parent())
    } else {
        var c = '<input type="checkbox" value=' + o + ' title="" autocomplete="off" onclick="' + f + "respondToAddFeatureUrl(checked, '" + u + "', " + o + ", '" + a + "','" + i + "', $(this).parent().parent())\">"
    }

    var ttt='<a class="btn btn-small pull-right" title = "Select to view feature attributes on click" href="#"><i class="icon-info-sign infoTableToggler" onclick="infoLabelChanger($(this))"></i></a>'

    var h = '<div id ="' + r + '" class="ui-state-default state-default1"><div class="row-fluid"><label class="checkbox auxFeatCheck span8">' + c + a + '</label><div class="span3">'+ttt+'</div><div class="span1"><button onclick = "$(this).parent().parent().find(\'input\').prop(\'checked\', true); $(this).parent().parent().find(\'label\').click(); $(this).parent().parent().parent().remove(); identFalser(); ' + l + '" class="close" type="button">×</button></div></div></div>';

    $("#sortable").append(h)
    
    if(ident){
        identifyLayerbyID("show", e);
        $("#sortable .btn-warning").removeClass("btn-warning infoTableTogglerOn");
        var o = '#'+r
        button = $(o).children().children(':nth-child(2)').children()
        $(button).addClass("btn-warning infoTableTogglerOn")
    }
}

function identifyLayerbyID(e, t) {
    var sc,sc1;
    $.each(WHAFapp.currentMapParams.theseFeatures, function (n, r) {
        // console.log(r.group)
        if(!Number(r.group)){
            sc = r.group+"/"+r.layerID
        } else{
            sc1=availableAuxFeatures[r.group][1];
            // console.log(sc1);
            if (sc1 ===""){
                sc=auxURL+"/"+availableAuxFeatures[r.group][2]
            }else{
                sc=sc1+"/"+availableAuxFeatures[r.group][2]
            }

            // console.log(sc)
        }
        if (sc == t) {
            if (e == "show") {
                r.identify = true
            } else {
                r.identify = false
            }
        } else {
            r.identify = false
        }
    })
}

function processRestUrl2() {
    function n(e) {
        $("#addedLayerName").val(e)
    }
    var e = document.getElementById("AddingRestPoint").value;
    var t = e + "?f=pjson";
    $.getJSON(t, function (e) {
        $.each(e, function (e, t) {
            if (e == "name") {
                n(t)
            }
        })
    })
}

//auxInit1: creates objects from (predetermined) availableFeatures
//auxInit2: creates objects from LandView data sources if they are available to user
//auxInit3: gets the different possible groups of auxiliary features and sets those in drop down menu. 
//auxInit4: adds landView data as option in dropdown menu

function auxInit1() {//Creates an object with all layers listed in s, lists them in app if their 'show' attribute is true
    
    for (var t in availableAuxFeatures) {
        var n = availableAuxFeatures[t];
        var r = n[0];
        auxFeatObjectNew[r] = new auxFeatureConstructor(n[0], n[1], n[2], n[3], n[4], n[5], n[6], t);
    }
}

// auxFeatureConstructor(displayName, restUrl, layerId, scaleMax, scaleMin, layerType, attributeDisplay, group)
function auxInitByUrl(setOfFeatures) {
    var n = setOfFeatures, g=n.group,group,group2,r = n.title;
    if(!Number(g)){
          auxFeatObjectUrl[r] = new auxFeatureConstructor(n.title, n.group, n.layerID, "", "", "dynamic", n.identify, n.group, n.checked);
    }else{
      var title = availableAuxFeatures[n.group][0], layId = availableAuxFeatures[n.group][2], group;
      if(availableAuxFeatures[n.group][1]===""){
        group=auxURL;
        group2=g;
      }else{
        group=availableAuxFeatures[n.group][1];
        group2=g
      }
      auxFeatObjectUrl[r] = new auxFeatureConstructor(title, group, layId, "", "", "dynamic", n.identify, group2, n.checked);
    }
}

function auxInit2() {
    for (var e in availableAuxFeatures2) {
        var t = availableAuxFeatures2[e];
        var n = t[0];
        // console.log(n)
        auxFeatObjectNew2[n] = new auxFeatureConstructor(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7])
    }
}

function refreshMapParams() {
    var r, i, s, features=[], auxi,o;
    if (Object.prototype.toString.call(WHAFapp.currentMapParams.indexLayer) === "[object Array]") {
        var e = String(WHAFapp.currentMapParams.indexLayer[0]);
        for (var t = 1; t < WHAFapp.currentMapParams.indexLayer.length; t++) {
            e = e + "_" + WHAFapp.currentMapParams.indexLayer[t]
        }
        WHAFapp.currentMapParams.indexLayer = e
    } 
    WHAFapp.currentMapParams.opcty = Math.round(WHAFapp.currentMapParams.indOp * 100);
    r = map.extent;
    i = "[" + Math.round(r.xmin) + "," + Math.round(r.ymin) + "," + Math.round(r.xmax) + "," + Math.round(r.ymax) + "]";
    WHAFapp.currentMapParams.xtnt = i;
    s = map.getBasemap();
    if (s == "gray") {
        WHAFapp.currentMapParams.Bsmp = "gray"
    } else if (s == "satellite") {
        WHAFapp.currentMapParams.Bsmp = "sat"
    } else if (s == "hybrid") {
        WHAFapp.currentMapParams.Bsmp = "hyb"
    }else if (s == "hybrid") {
        WHAFapp.currentMapParams.Bsmp = "hyb"
    }else if (s == "national-geographic") {
        WHAFapp.currentMapParams.Bsmp = "NG"
    }else if (s == "dark-gray") {
        WHAFapp.currentMapParams.Bsmp = "DG"
    };

    if (DSS_objectives.point && DSS_objectives.point.type== 'point'){
        WHAFapp.currentMapParams.Plc=[Math.round(DSS_objectives.point.x), Math.round(DSS_objectives.point.y)] 
    };
    if($('#hillShadeCheck').prop('checked')===true){WHAFapp.currentMapParams.HS = 1} else {WHAFapp.currentMapParams.HS = 0}
    
    o=WHAFapp.currentMapParams.theseFeatures
    
    for (var i=0;i<o.length; i++){
        if(o[i].WB===undefined){//filters out impaired water viewer layers
            features.push(o[i])
        } 
    }

    auxi = featObjToUrlString(features);
    WHAFapp.currentMapParams.auxFtLst = auxi;
    WHAFapp.currentMapParams.hillShadeOp;

    WHAFapp.currentMapParams.Mj = selectedWatershed.number;//   REMOVED FEB23
}

function showShare(store) {

    refreshMapParams();

    var e = "xtnt=" + WHAFapp.currentMapParams.xtnt + "&Bsmp=" + WHAFapp.currentMapParams.Bsmp, togL1, togL2;
    if (WHAFapp.currentMapParams.indexLayer &&WHAFapp.currentMapParams.indexLayer != undefined) {
        e = e + "&indexLayer=" + WHAFapp.currentMapParams.indexLayer
    }
    if (WHAFapp.currentMapParams.opcty &&WHAFapp.currentMapParams.opcty != 100) {
        e = e + "&opcty=" + WHAFapp.currentMapParams.opcty
    }
    if (WHAFapp.currentMapParams.auxFtLst && WHAFapp.currentMapParams.auxFtLst != undefined) {
        e = e + "&auxFtLst=" + WHAFapp.currentMapParams.auxFtLst
    }
    if (WHAFapp.currentMapParams.Mj && WHAFapp.currentMapParams.Mj != undefined) {
        e = e + "&Mj=" + WHAFapp.currentMapParams.Mj
    }  
    if (WHAFapp.currentMapParams.hillShadeOp && WHAFapp.currentMapParams.hillShadeOp != 1) {
        e = e + "&HO=" + WHAFapp.currentMapParams.hillShadeOp;
    }
    if (WHAFapp.currentMapParams.HS == 1) {
        e = e + "&HS=" + WHAFapp.currentMapParams.HS
    }
    if (WHAFapp.currentMapParams.Plc != undefined) {
        e = e + "&Plc=" + WHAFapp.currentMapParams.Plc
    }


    togL1=['togglerU','togglerD','togglerMj','togglerBsn','togglerC'];
    togL2=['tU','tD', 'tMj', 'tBsn','tC'];
    for (var i=0; i<togL1.length; i++){
        var w=WHAFapp.currentMapParams[togL1[i]];
        if (w && w !== undefined && w!=='none'){
            var l="&"+togL2[i]+"="+w[0];
            e=e+l;
        }
    }
    console.log(e)
    e="?p="+encode(e)
    console.log(e)

    var urlParts = window.location.protocol + '//'+ window.location.host + window.location.pathname;

    var t = urlParts + e;

    if(store!='store'){
        $("#urlAlerter").show();
        getShortUrl(t);
    } else {return e};    
}

function getShortUrl(url){  
    var e,d, accessToken = WHAFapp.bitly.genAccessKey, 
    urlB = 'https://api-ssl.bitly.com/v3/shorten?access_token=' + accessToken + '&longUrl=' + encodeURIComponent(url);
    $.getJSON( urlB, function( data ){
        e=data.status_code;
        if (e===200){
            d= data.data.url;
            $("#urlPlaceHolde").val(d);
        } else{
            $("#urlPlaceHolde").val(url);
        }
    })  
}

function setHsOpacParam(opac){
    var hillShadeOpLocal = Number(opac)*100
    changeHillOpacity(hillShadeOpLocal)
    $( "#hillSlider" ).slider({value:hillShadeOpLocal})
}

function manualHillShadeSet(off){
    if (off =='off'){
        $('#hillShadeCheck').prop('checked', false);
        respondToAddFeatureUrl(false, hillshadeService, hillshadeLayer, 'Hillshade','*')//, $('#hillshadeButton').parent());        
    }else{
        $('#hillShadeCheck').prop('checked', true);
        respondToAddFeatureUrl(true, hillshadeService, hillshadeLayer, 'Hillshade','*', $('#hillshadeButton').parent());    
    }
}

function encode(str) {
    jQuery.base64=(function($){var _PADCHAR="=",_ALPHA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_VERSION="1.0";function _getbyte64(s,i){var idx=_ALPHA.indexOf(s.charAt(i));if(idx===-1){throw"Cannot decode base64"}return idx}function _decode(s){var pads=0,i,b10,imax=s.length,x=[];s=String(s);if(imax===0){return s}if(imax%4!==0){throw"Cannot decode base64"}if(s.charAt(imax-1)===_PADCHAR){pads=1;if(s.charAt(imax-2)===_PADCHAR){pads=2}imax-=4}for(i=0;i<imax;i+=4){b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12)|(_getbyte64(s,i+2)<<6)|_getbyte64(s,i+3);x.push(String.fromCharCode(b10>>16,(b10>>8)&255,b10&255))}switch(pads){case 1:b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12)|(_getbyte64(s,i+2)<<6);x.push(String.fromCharCode(b10>>16,(b10>>8)&255));break;case 2:b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12);x.push(String.fromCharCode(b10>>16));break}return x.join("")}function _getbyte(s,i){var x=s.charCodeAt(i);if(x>255){throw"INVALID_CHARACTER_ERR: DOM Exception 5"}return x}function _encode(s){if(arguments.length!==1){throw"SyntaxError: exactly one argument required"}s=String(s);var i,b10,x=[],imax=s.length-s.length%3;if(s.length===0){return s}for(i=0;i<imax;i+=3){b10=(_getbyte(s,i)<<16)|(_getbyte(s,i+1)<<8)|_getbyte(s,i+2);x.push(_ALPHA.charAt(b10>>18));x.push(_ALPHA.charAt((b10>>12)&63));x.push(_ALPHA.charAt((b10>>6)&63));x.push(_ALPHA.charAt(b10&63))}switch(s.length-imax){case 1:b10=_getbyte(s,i)<<16;x.push(_ALPHA.charAt(b10>>18)+_ALPHA.charAt((b10>>12)&63)+_PADCHAR+_PADCHAR);break;case 2:b10=(_getbyte(s,i)<<16)|(_getbyte(s,i+1)<<8);x.push(_ALPHA.charAt(b10>>18)+_ALPHA.charAt((b10>>12)&63)+_ALPHA.charAt((b10>>6)&63)+_PADCHAR);break}return x.join("")}return{decode:_decode,encode:_encode,VERSION:_VERSION}}(jQuery));
    return $.base64.encode(RawDeflate.deflate(unescape(encodeURIComponent(str))));
}

function decode(str) {
    jQuery.base64=(function($){var _PADCHAR="=",_ALPHA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_VERSION="1.0";function _getbyte64(s,i){var idx=_ALPHA.indexOf(s.charAt(i));if(idx===-1){throw"Cannot decode base64"}return idx}function _decode(s){var pads=0,i,b10,imax=s.length,x=[];s=String(s);if(imax===0){return s}if(imax%4!==0){throw"Cannot decode base64"}if(s.charAt(imax-1)===_PADCHAR){pads=1;if(s.charAt(imax-2)===_PADCHAR){pads=2}imax-=4}for(i=0;i<imax;i+=4){b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12)|(_getbyte64(s,i+2)<<6)|_getbyte64(s,i+3);x.push(String.fromCharCode(b10>>16,(b10>>8)&255,b10&255))}switch(pads){case 1:b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12)|(_getbyte64(s,i+2)<<6);x.push(String.fromCharCode(b10>>16,(b10>>8)&255));break;case 2:b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12);x.push(String.fromCharCode(b10>>16));break}return x.join("")}function _getbyte(s,i){var x=s.charCodeAt(i);if(x>255){throw"INVALID_CHARACTER_ERR: DOM Exception 5"}return x}function _encode(s){if(arguments.length!==1){throw"SyntaxError: exactly one argument required"}s=String(s);var i,b10,x=[],imax=s.length-s.length%3;if(s.length===0){return s}for(i=0;i<imax;i+=3){b10=(_getbyte(s,i)<<16)|(_getbyte(s,i+1)<<8)|_getbyte(s,i+2);x.push(_ALPHA.charAt(b10>>18));x.push(_ALPHA.charAt((b10>>12)&63));x.push(_ALPHA.charAt((b10>>6)&63));x.push(_ALPHA.charAt(b10&63))}switch(s.length-imax){case 1:b10=_getbyte(s,i)<<16;x.push(_ALPHA.charAt(b10>>18)+_ALPHA.charAt((b10>>12)&63)+_PADCHAR+_PADCHAR);break;case 2:b10=(_getbyte(s,i)<<16)|(_getbyte(s,i+1)<<8);x.push(_ALPHA.charAt(b10>>18)+_ALPHA.charAt((b10>>12)&63)+_ALPHA.charAt((b10>>6)&63)+_PADCHAR);break}return x.join("")}return{decode:_decode,encode:_encode,VERSION:_VERSION}}(jQuery));
    return decodeURIComponent(escape(RawDeflate.inflate($.base64.decode(str))));
}

function changeHillOpacity(e){    
        WHAFapp.currentMapParams.hillShadeOp = e / 100; 
        try {
            hillShadeLayerServed.setOpacity(0 + WHAFapp.currentMapParams.hillShadeOp);
        } catch (t) {}
}

function infoLabelChanger(e) {//enable query added layer
    WHAFapp.suspender = false;
    var button = $(e).parent();
    var t = $(button).parent().parent().find("input").attr("onclick").split(" ");
    var n = t[2].length - 3;
    var r = t[2].substr(1, n);
    var z = t[3].length - 1;
    var q = String(t[3].substr(0, z));
    var i = "/";
    var u = r+i+q;

    if (!button.hasClass("btn-warning")) {
        identifyLayerbyID("show", u);
        console.log(u);
        $("#sortable .btn-warning").removeClass("btn-warning infoTableTogglerOn");
        $(button).addClass("btn-warning infoTableTogglerOn")
    } else {
        var u = $(button).parent().parent().parent().attr("id");
        console.log(u);
        identifyLayerbyID("nope", u);
        $(button).removeClass("btn-warning infoTableTogglerOn");
        identifyTask = false;
        identifyParams = false
    }
    buildIdTasks()
}

function respondToAddFeatureUrl(e, t, n, r, i, s){
  
    var p=[];
    var a = t + "/" + n+"?f=pjson";
    $.getJSON( a, function( data ){
        var sl=data.subLayers;
        for (y in sl){
            p.push(sl[y].id)
        }
        respondToAddFeatureUrl2(e, t, n, r, i, s, p);
    })
}

function respondToAddFeatureUrl2(e, t, n, r, i, s, ooob) {
    
    require(["esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ImageParameters"],
    function(ArcGISDynamicMapServiceLayer,ImageParameters){
        var subLayersll, o = map.getScale(), a=t + "/" + n,mapFeature,f,l,c,h,p,imageParametersFeature;
        mapFeature = {
            id: a,
            title: r,
            position: x
        };
        f = t.split("/");
        l = f.length;
        c = f[l - 2] + n;

        imageParametersFeature = new ImageParameters;
        imageParametersFeature.layerIds = [n];
        for (var sLyr in ooob){
            imageParametersFeature.layerIds.push(ooob[sLyr])
        };
        imageParametersFeature.layerOption = ImageParameters.LAYER_OPTION_SHOW;
        console.log(layerItemID)
        h = new ArcGISDynamicMapServiceLayer(t, {
            imageParameters: imageParametersFeature
        });

        if(t==hillshadeService){
            setHillShadeOpacity(t,h,e);        
        }

        h.id = a;
        h.identifier = "WHAF_added_layer";
        
        var v = {
            layer: h,
            title: r
        };
        var p = map.getLayer(a);
        if (r in auxFeatObject) {
            h.setMinScale(auxFeatObject[r].minScale)
        }
        if (e) {
            var ddd = $(s).parent().attr('id');
            if (Number(ddd)){
                $('#'+ddd+' input').prop('checked',true)//force checking box to fix issue with drag-not-checking
            }
            if(t==hillshadeService){
                var ttt=false;
                try{var ttt = map.layerIds.indexOf(majors.id)}catch(err){}
                if (ttt){
                map.addLayer(h, ttt);
                }else{
                    map.addLayer(h);
                }
            }else{
                featureLayersDisplayed.push(a);
                map.addLayer(h);
            }
            try{reorderByList()}catch(r){}
            legendd.layerInfos.push(v);
            try {legendd.refresh()} catch (m) {}
            var g = $(s).parent().parent().find("a")
        } else {      
            function lRemover(){
                if(checkLoad()){
                    var ddd = $(s).parent().attr('id');
                    $('#'+ddd+' input').prop('checked',false);//force unchecking box to fix issue with drag-not-unchecking
                    
                    try {map.removeLayer(p)}catch (m) {}
                    $("#loader").hide();
                    var y = $.inArray(mapFeature.id, featureLayersDisplayed);
                    featureLayersDisplayed.splice(y, 1);
                    var b;
                    for (var w = 0; w < legendd.layerInfos.length; w++) {
                        if (legendd.layerInfos[w].layer.id === h.id) {
                            b = w
                        }
                    }
                    legendd.layerInfos.splice(b, 1);
                    try{legendd.refresh()}catch(r){};
                }else{
                    setTimeout(function(){lRemover()},100)
                }
            }
            lRemover()//ensures that layer is done loading before attempting to remove it

        }

        r = map.getLayersVisibleAtScale(map.getScale())
        reorderByList();
    });
}

function layerFilter() {
    var e = $("#adHocLayerList").val();
    var t = $("#adHocLayerLister a");
    for (i = 0; i < t.length; i++) {
        var n = String($(t[i]).html());
        var r = new RegExp(e, "gi");
        if (n.match(r)) {
            $(t[i]).show()
        } else {
            $(t[i]).hide()
        }
    }
}

function populateLayerBox() {   
    $.each(auxFeatObjectNew, function (e, t) {
        var n = '<li><a tabindex="-1" href="#" onclick="auxFeatObjectNew[\'' + e + "'].implement()\">" + e + "</a></li>";
        $("#adHocLayerListUl").append(n);
    });
    $.each(auxFeatObjectNew2, function (e, t) {
        var n = '<li><a tabindex="-1" href="#" onclick="auxFeatObjectNew2[\'' + e + "'].implement()\">" + e + "</a></li>";
        $("#adHocLayerListUl").append(n);
        $("#GDRSnote2").show();
    })
}


function getGDRS_Feature(e) {
    
    var t = 0, m=0,
        n;
    for (i = 0; i < e.length; i++) {
        var r = false;
        n = e[i];
        var s = n + "?f=pjson";
        t++;
        if (t == e.length) {
            r = true
        }
        var o = e.length;
        if (i==o-1){
            m=1
        }

        getGDRS_Feature2(n, s, r, o, m)
    }
}

function getGDRS_Feature2(DataResourceUrl, GDRSJson, trigger, numberOfGroups, populateLB){
    $.getJSON( GDRSJson, function( data ) {
        if(!data.layers){
            unAvailGDRS++; 
            console.log("DNR GDRS data not available");}else{
                numOfLayers = data.layers.length;
            };

        $.each( data, function( key, val ) {
            if(key=='mapName'){
                groupName = val +' (Landview)';
            }
            if(key=='layers'){
                var theLayers = val;
                $.each( theLayers, function(key1, val1){
                    var lId = Number(theLayers[key1].id);
                    var layerItem = []; 
                    var lyrName = theLayers[key1].name+'*';
                    layerItem.push(lyrName, DataResourceUrl, lId, theLayers[key1].minScale, theLayers[key1].maxScale,"dynamic", "[*]", "Landview Data")
                    if(!theLayers[key1].subLayerIds){ //filters out group layers
                        var t= layerItem
                        auxFeatObjectNew2[t[0]] = new auxFeatureConstructor(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7]);
                    }; 
                }); 
                counterR++
            };            
        });
    })
    .done(function(){
        if (populateLB==1){
            populateLayersBabe();
        }
    })
    .fail(function(){
        // alert("no GDRS")
        populateLayersBabe();
    });
}

function populateLayersBabe() {
    if (layerBoxState.layerBoxPopulated==false){
        auxInit2();
        populateLayerBox()
        layerBoxState.layerBoxPopulated=true;
    }
}

function removeLayerObjectbyID(e) {
    try{
        $.each(WHAFapp.currentMapParams.theseFeatures, function (t, n) {
            if (n.id == e) {
                WHAFapp.currentMapParams.theseFeatures.splice(t, 1)
            }
        })        
    } catch(err){};
    try{gdrsNoter();}catch(err){};
}

function executeIdentifyTask(e) {
    var tname, t;
    require(["esri/InfoTemplate"], function(InfoTemplate){
        if (WHAFapp.suspender == false) {
            if (identifyTask) {
                identifyParams.geometry = e.mapPoint;
                identifyParams.mapExtent = map.extent;
                var t = identifyTask.execute(identifyParams);
                t.addCallback(function (e) {
                    return dojo.map(e, function (e) {
                        t = e.feature;
                        tName = e.layerName;
                        console.log(e.layerName)
                        if(e.layerName.slice(0,20)==="gdrs_wm.gdrs.streams"){
                            tName="Major Streams";
                        }
                        t.attributes.layerName=tName;
                        var n = "${layerName}";
                        var r = new InfoTemplate(n, "${*}");
                        t.setInfoTemplate(r);
                        return t
                    })
                });
                map.infoWindow.setFeatures([t]);
                map.infoWindow.show(e.mapPoint);
                $(".esriPopup").draggable({
                    handle: ".titlePane"
                })
            }
        }
    })
}

function identFalser() {
    identifyTask = false;
    identifyParams = false
}

function setHillShadeOpacity(t,h, e){
    hillShadeLayerServed = h;
    hillShadeLayerServed.setOpacity(WHAFapp.currentMapParams.hillShadeOp);
}

function reorderer(){

    if (hillShadeLayerServed && hillShadeLayerServed!= undefined){
        var t = map.layerIds.indexOf(hillShadeLayerServed.id)
        map.reorderLayer(majors, t+1);    
    }
}

function sortableLayerRemover(){
    var c = $('#sortable').children()
    $.each(c, function( i, v ) {
        idi=($(v).attr('id'))
        //console.log(idi)
        $(v).find('input').prop('checked', true); 
        $(v).find('label').click();
        removeLayerObjectbyID(idi)
        identFalser();  
        $(v).remove()
    });
}

function setmapFromJSON(e){
    // set extent
    if (e.xtnt && e.xtnt != "undefined") {
        var t = e.xtnt.slice(1, e.xtnt.length - 1);
        t = t.split(",");
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
        map.setExtent(n)
    }

    //set basemap
    if (e.Bsmp){
        var t = e.Bsmp;
        switch (t) {
            case "hyb":
                map.setBasemap("hybrid");changeWS_Outline("satellite");
                break;
            case "gray":
                map.setBasemap("gray");changeWS_Outline("gray");
                break;
            case "NG":
                map.setBasemap("national-geographic");changeWS_Outline("natGeo");
                break;
            default:
                map.setBasemap("satellite");changeWS_Outline("satellite");
        }
    }

    //set upstream
    if (e.upCatchment && e.upCatchment != "undefined") {
        var r = e.upCatchment;
        var i = e;
        evalUpstr(r, i)
    } else {
        // UpstreamFunction1()//remove existing upstream delineations
    }

    if (e.Dnstrm && e.Dnstrm != "undefined") {
        var r = e.Dnstrm;
        var i = e.dnSymbol;
        // console.log("eval down from JSON ", )
        evalDnstr(r, i)
    } else {
        // removeDownStream()//remove existing downstream delineations
    };

    if (e.Catchment && e.Catchment != "undefined"){
        console.log("fix this. THis is where catchment is defined. ")
        // showMeCbyId(e.Catchment)    
    } else{
        // try{removeCatchmentGraphicsC()}catch(err){};
    };
    console.log("setting JSON from: ",e.Plc)
    if (e.Plc && e.Plc != "undefined"){
        console.log("In it")
        try{activateDssStar(e.Plc)}catch(err){};
    }
    

    // set index layer opacity    
    if (e.opcty) {
        var t = Number(e.opcty);
        changeOpacity(t);
        $(".slider").slider({
            value: t
        })
    }
    //set index layer
    if (e.indexLayer){
        paramEvaluatorInit(e)    
    } else {
        removeFirstLayer(); hideLegend();

    }

    //set hillshade opacity
    if (e.HO){
        setHsOpacParam(e.HO)        
    }

    //check hillshade 
    if (e.HS == 1){
        manualHillShadeSet();
    } else{
        // alert("no hillshade")
        manualHillShadeSet('off');
     }

    //set layers
    auxFeatObjectUrl = {}//clear layers in memory 
    // sortableLayerRemover()//remove default or existing layers
    if(e.auxFeatures && e.auxFeatures != "undefined"){
        var n = e.auxFeatures;
        console.log(n)
        getLayersIn(n);
    }
    //set major wtershed selected
    if (e.Mj && e.Mj != "undefined"){
        MajorWatershedSelector(e.Mj, 1)    
    }
}

function translateParams(e){//used to translate legacy property values of WHAFapp.currentMapParams stored in localStorage 
   
    if (e.auxFeatures && e.auxFeatures !== undefined){
        e.auxFtLst=e.auxFeatures
    };if (e.hillShadeOp && e.hillShadeOp !== undefined){
        e.HO=e.hillShadeOp
    };if (e.upCatchment && e.upCatchment !== undefined){
        e.Upstrm=e.upCatchment
    };if (e.dnCatchment && e.dnCatchment !== undefined){
        e.Dnstrm=e.dnCatchment
    };if (e.Catchment && e.Catchment !== undefined){//legacy for old property name for upstream
        e.Upstrm=e.Catchment
    };if (e.Major && e.Major !== undefined){
        e.Mj=e.Major
    };if (e.HillShade && e.HillShade !== undefined){
        e.HS=e.HillShade
    };if (e.placeCoords && e.placeCoords !== undefined){//legacy for old property name for upstream
        e.Plc=e.placeCoords
    };   
}


