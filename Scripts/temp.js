//r()
function r(){
var f=[]
for (item in localStorage){
  f.push(localStorage[item])
}
for (z in f){
  try{
      var g = $.parseJSON(f[z])      
      snapMapMaker(g)}
    catch(r){}}

function snapMapMaker(g){
  var n = g.name, p=g.paramString;
  if(p && p!== undefined){
    if (n==="Map 9"){
    
      WHAFapp.serialSnapper = 1
      WhafMapConstructor(p)
    }
  }
}}




e = getSnapsFromBmarks('bMark_')

function getSnapsFromBmarks(bMarkGroup){
    var b = [],d = bMarkGroup,l = d.length
    
    for (item in localStorage){
      if(item.slice(0,l)===d){
        var g = $.parseJSON(localStorage[item])
        b.push(g)        
      }
    }
  return b
}
console.log(e)
//w=0
//gf()
function gf(){
  snapMapMaker(e[w])
  w++
}
function snapMapMaker(g){
  var n = g.name, p=g.paramString;
  if(p && p!== undefined){
      WHAFapp.serialSnapper = 1
      WhafMapConstructor(p)     
  }
}

WHAFapp.serialSnapper=1

WHAFapp.mapLoading

map.loaded

_______________________



ofsetCheck()
function ofsetCheck(){
    var y = map.getLayersVisibleAtScale()
    for (e in y){
        if(y[e].declaredClass==="esri.layers.FeatureLayer"){
            offsetSetter(y[e])
        }
    } 
    function offsetSetter(layer){//, newZooum){
        var currentOffset = layer.getMaxAllowableOffset(), scale = map.getScale(), query = layer.currentQuery
        var n = scale/3500
        WHAFapp.currentMapParams.allowedOffset = Number(n.toFixed(0));
        layer.setMaxAllowableOffset(WHAFapp.currentMapParams.allowedOffset);
            try{layer.selectFeatures(query,WHAFapp.FeatureLayerCons.SELECTION_NEW)}catch(h){};
            try{layer.refresh()}catch(h){}
    }
}

//DSS_objectives.majorsFL.currentQuery

var L = DSS_objectives.majorsFL
//offsetSetter(L)

function scaler(){
map.getScale()

newSymb = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 0, 0]), 8), new dojo.Color([125, 125, 125, 0]));
DSS_objectives.upPolyFL.hide()
DSS_objectives.upPolyFL.setRenderer(new  WHAFapp.SimpleRendererCons(newSymb));
DSS_objectives.upPolyFL.show()
}


_______________________
//$('#map').toggle()
map//=backgroundMap
//map=foregroundMap
//mainMap=map
//map.setBasemap('national-geographic')
a='?p=Nc67CsJAEIXht5lqlZm9jLvFNApWEewlRYgpFHPBHSF5e6Nhu4+fU5xZB5XbjjBRdOlgGBkjB7MWtsEnMmzRUcIajrmfJDcKj+HezVWzdG9xBOPU6iIRofnMZ62yCu2JDBqsV9gCV+ALwh/2N6YNtpRtDNdXK+uRSMFFZ5giW4+gl6f0oCcZvw=='
b = '?p=NY49C8IwEED/zU1Rkkt6F4dbFJwquDhJh1IrKPYDe0L7702VbI/HG96svcp14yxjsJENWSTkwiRTMJMPyew4eK5gP3WjTLXCo7+1c1kv7Vu8g2FsdJFoof7MRy0nFbd1zlhjqwSYwRv3h5BN8QPMMeYY13gFOL8aSSPkyUdKI4wUI+hF7qCnp3SgBxm+'
c='?p=Nc65DsIwEATQv9nKRD7XdrENIGiCREOFUkQhBRE5RBYp+XvM4e5pNLuahQem60bJiNF4FA6V9EqLlJhgHGrhQnQGbQXbuZ9of4T7cGuXsl7bJxkP49TwSkFC/VoOXM5Mqkj3UsgqwWTYDPeFLpTK0Bm5bFGoH9wfqfwBnB8NpWUYpE0fHfpoIwJfaAQ+ddQD72h8Aw=='
d='?p=Nc49C8JADIDhf5PplHw0Z2/I0sFJwcVJOpSCg6gtXIT67z2ETHkILySbv91uO0KhzLkkLdIGprahXHrSlBGlVx5hqK/V6uSwrLN/rUeYPtvRT9WN9kQJE44NHJBAF9A/OGKOmCOGy3O2dpq1dIfcnlHJIuBXu4OfH7b8AA=='
e='?p=Nc29CsMwDEbRt9HkFvlPtgctaenUoUunkiEEOjVxwAqkb19T0HYQ90OHrMKvk8VCxScykSwm60y/+OwjORNziZ7CCENbNm6TQN1m+XJGmPbjJvcmbM/WGjQ4djiFVwRF/MNp7DR2GsPjM3N/TRlDn0VKJRQCeXIFufIbZGgrLyAXrj8='
f='?p=Nc29CsMwDEbRt9HkFsu2ZHvQkkKnDl06lQwha/MDViB9+5qCtoO4Hzp1VXlf0FeuMbMjRp8xuH6JJRIHR6VS5DTC0JZd2qSw7bN+pXiYjvOuj6aCV0TnnR87giEakoH+CBYHi4PF8PzM0l9z8anPiHNNlUFfsoEObZUF9CbbDw=='
g='?p=Nc29CsMwDEbRt9HkFsu2ZHvQkkKnDl06lQwha/MDViB9+5qCtoO4Hzp1VXlf0FeuMbMjRp8xuH6JJRIHR6VS5DTC0JZd2qSw7bN+pXiYjvOuj6aCV0TnnR87giEakoH+CBYHi4PF8PzM0l9z8anPiHNNlUFfsoEObZUF9CbbDw=='


g="Nc49C8JADIDhf5PplHw0Z2/I0sFJwcVJOpSCg6gtXIT67z2ETHkILySbv91uO0KhzLkkLdIGprahXHrSlBGlVx5hqK/V6uSwrLN/rUeYPtvRT9WN9kQJE44NHJBAF9A/OGKOmCOGy3O2dpq1dIfcnlHJIuBXu4OfH7b8AA=="
o="Nc47D8IwDATgf+MpVHEaJ+7gBRAsRWJhQh0QMIDoQ9RI7b8nPLJ9Op1ON2mnclygjcQRyVDAGAKblFDlnSsNMbO33MBybAdZb+HWXa5TfZqvTykj9MNZZ2ELp9e00XpUwQKdscY2CWWGz6AvXIGY4TJy2QeDP9AfqfwB7B9nSc8CW58WKcTKVwH0ID3o7i4t6Er6Nw=="
p="Nc69DsIwDATgt/EUqjiNHXfwAggWkFiYUAfUDVFSqUYqb0/4yfbpdDrdYg/Tywp9IklIjhgTs7iSUBdDaB2JSPTSw3oeJ93uIU+DvVQ8XJ/Lzg6zKTYYnHe+L2grYgV9ERrEilBRy5Ed/kB/lPIHcLoPWr6w+FgWiVMXOwY7awY73nQE22h+Aw=="
l="NY49C8IwEED/zU1Rkkt6F4dbFJwquDhJh1IrKPYDe0L7702VbI/HG96svcp14yxjsJENWSTkwiRTMJMPyew4eK5gP3WjTLXCo7+1c1kv7Vu8g2FsdJFoof7MRy0nFbd1zlhjqwSYwRv3h5BN8QPMMeYY13gFOL8aSSPkyUdKI4wUI+hF7qCnp3SgBxm+"  
k="Nc67CsJAEIXht5lqlZm9jLvFNApWEewlRYgpFHPBHSF5e6Nhu4+fU5xZB5XbjjBRdOlgGBkjB7MWtsEnMmzRUcIajrmfJDcKj+HezVWzdG9xBOPU6iIRofnMZ62yCu2JDBqsV9gCV+ALwh/2N6YNtpRtDNdXK+uRSMFFZ5giW4+gl6f0oCcZvw=="
j='Nc0xCwIxDIbhf5OpStNr0nTIcoKTgouT3HDcJp49aITz31uEbg/h/chub9PHAX0iSUiOGBOzuHahHEMYHIlI9DLBWNdN62xQtsW+Kh7mz362SzXFI6Lzzk8NoWPoiB30R+hx6HHoMdxei7bXLD62GXHKMTPYXQvY9akr2EnLDw=='
WhafMapConstructor(g)
//refreshMap()








//$('#map').toggle()

f=map.getLayersVisibleAtScale(map.getScale())
for (o in f){
  console.log(f[0].visible)
  
}



//map.setBasemap('national-geographic')
//masksLoader()
g="Nc49C8JADIDhf5PplHw0Z2/I0sFJwcVJOpSCg6gtXIT67z2ETHkILySbv91uO0KhzLkkLdIGprahXHrSlBGlVx5hqK/V6uSwrLN/rUeYPtvRT9WN9kQJE44NHJBAF9A/OGKOmCOGy3O2dpq1dIfcnlHJIuBXu4OfH7b8AA=="
o="Nc47D8IwDATgf+MpVHEaJ+7gBRAsRWJhQh0QMIDoQ9RI7b8nPLJ9Op1ON2mnclygjcQRyVDAGAKblFDlnSsNMbO33MBybAdZb+HWXa5TfZqvTykj9MNZZ2ELp9e00XpUwQKdscY2CWWGz6AvXIGY4TJy2QeDP9AfqfwB7B9nSc8CW58WKcTKVwH0ID3o7i4t6Er6Nw=="
p="Nc69DsIwDATgt/EUqjiNHXfwAggWkFiYUAfUDVFSqUYqb0/4yfbpdDrdYg/Tywp9IklIjhgTs7iSUBdDaB2JSPTSw3oeJ93uIU+DvVQ8XJ/Lzg6zKTYYnHe+L2grYgV9ERrEilBRy5Ed/kB/lPIHcLoPWr6w+FgWiVMXOwY7awY73nQE22h+Aw=="
l="NY49C8IwEED/zU1Rkkt6F4dbFJwquDhJh1IrKPYDe0L7702VbI/HG96svcp14yxjsJENWSTkwiRTMJMPyew4eK5gP3WjTLXCo7+1c1kv7Vu8g2FsdJFoof7MRy0nFbd1zlhjqwSYwRv3h5BN8QPMMeYY13gFOL8aSSPkyUdKI4wUI+hF7qCnp3SgBxm+"  
k="Nc67CsJAEIXht5lqlZm9jLvFNApWEewlRYgpFHPBHSF5e6Nhu4+fU5xZB5XbjjBRdOlgGBkjB7MWtsEnMmzRUcIajrmfJDcKj+HezVWzdG9xBOPU6iIRofnMZ62yCu2JDBqsV9gCV+ALwh/2N6YNtpRtDNdXK+uRSMFFZ5giW4+gl6f0oCcZvw=="
j='Nc0xCwIxDIbhf5OpStNr0nTIcoKTgouT3HDcJp49aITz31uEbg/h/chub9PHAX0iSUiOGBOzuHahHEMYHIlI9DLBWNdN62xQtsW+Kh7mz362SzXFI6Lzzk8NoWPoiB30R+hx6HHoMdxei7bXLD62GXHKMTPYXQvY9akr2EnLDw=='
//WhafMapConstructor(p)
//addSnap('demikulu')//refreshMap()


WHAFapp.serialSnapper=0
bookMarksToSnaps()
//addSnap('demikulu')
function bookMarksToSnaps(){
    //demikulu is the nickname for everything related to turning book,marks to map galleries.
    //This is a temporary state that affects the way the app behaves while it takes existing bookmarks and turns them into map snaps (gallery items)
    var w=0, e=getSnapsFromBmarks('bMark_'), testCtr = 0;
 // console.log(e)
  
  
    //map=backgroundMap//shift functionalities to background map
    //mainMap=backgroundMap//shift functionalities to background map
   // WHAFapp.demikulu = 'demikulu'//shift app to demikulu mode
  
    startDemikulu()
    
    function startDemikulu(){
      
      if (w<e.length){
        if(WHAFapp.serialSnapper ==0){
            snapMapTaker(e[w]);
            w++;
            setTimeout(function(){startDemikulu()},500);
          testCtr=0;
          
        }else{
          if (testCtr<55){
              setTimeout(function(){startDemikulu()},500);
              console.log("snapping again, ", testCtr);
            testCtr++
          }
        }
        
      }else{
        //  $('#map').show();
          return
      }
    
  }
  


  
  //returns a list of bookmark items. Variable can be used to extract other kists from localStorage
    function getSnapsFromBmarks(bMarkGroup){
        var b=[],c=[],d = bMarkGroup,l = d.length    
        for (item in localStorage){
          if(item.slice(0,l)===d){
            c.push(item)
          }
        }
        c.sort();
        for(var i=0; i<c.length; i++){
            var g = $.parseJSON(localStorage[c[i]])
            b.push(g)
        }
      return b
    }
  
    function snapMapTaker(g){
      console.log(g)
      var n = g.name, p=g.paramString;
      if(p && p!== undefined){
          WHAFapp.serialSnapper = 1
          WhafMapConstructor(p)     
      }
    }
  
}
WHAFapp.demikuluName

_______________________

 function exportWhaf(){
   
   var snout={};
    
   exportBmarks('bMark_')
  //returns a list of bookmark items. Variable can be used to extract other kists from localStorage
    function exportBmarks(bMarkGroup){
        var d = bMarkGroup,l = d.length    
        for (item in localStorage){
          if(item.slice(0,l)===d){
            snout[item]=localStorage[item]
            }
        }
      
    }
      tail = JSON.stringify(snout)
      return tail
      
}

//var g = $.parseJSON(h)




f={"bMark_Map_4_Map D":"{\"name\":\"Map D\",\"desc\":\"\",\"paramString\":\"?p=Nc49C8JADIDhf5PplHw0Z2/I0sFJwcVJOpSCg6gtXIT67z2ETHkILySbv91uO0KhzLkkLdIGprahXHrSlBGlVx5hqK/V6uSwrLN/rUeYPtvRT9WN9kQJE44NHJBAF9A/OGKOmCOGy3O2dpq1dIfcnlHJIuBXu4OfH7b8AA==\"}","bMark_Map_2_Map B":"{\"name\":\"Map B\",\"desc\":\"\",\"paramString\":\"?p=NY49C8IwEED/zU1Rkkt6F4dbFJwquDhJh1IrKPYDe0L7702VbI/HG96svcp14yxjsJENWSTkwiRTMJMPyew4eK5gP3WjTLXCo7+1c1kv7Vu8g2FsdJFoof7MRy0nFbd1zlhjqwSYwRv3h5BN8QPMMeYY13gFOL8aSSPkyUdKI4wUI+hF7qCnp3SgBxm+\"}","bMark_Map_5_Map E":"{\"name\":\"Map E\",\"desc\":\"\",\"paramString\":\"?p=Nc29CsMwDEbRt9HkFvlPtgctaenUoUunkiEEOjVxwAqkb19T0HYQ90OHrMKvk8VCxScykSwm60y/+OwjORNziZ7CCENbNm6TQN1m+XJGmPbjJvcmbM/WGjQ4djiFVwRF/MNp7DR2GsPjM3N/TRlDn0VKJRQCeXIFufIbZGgrLyAXrj8=\"}","bMark_Map_7_Map G":"{\"name\":\"Map G\",\"desc\":\"\",\"paramString\":\"?p=Nc29DsIwDEbRt8kUkJ3ETjJ4KRITAzvqUHVgoT8iRmrfnkCV7ci6n7zprPI4IWTOPrIlRojobL345ImdpZTJc+hNV6ZVnu9hN8s66i4JzPDZrnorKnhGtGChr3ANviE00B+uxe4X44EjNvfXKPU3Jwh1RhxzyGy0K7NMRi+yfAE=\"}","bMark_Map_3_Map C":"{\"name\":\"Map C\",\"desc\":\"\",\"paramString\":\"?p=Nc65DsIwEATQv9nKRD7XdrENIGiCREOFUkQhBRE5RBYp+XvM4e5pNLuahQem60bJiNF4FA6V9EqLlJhgHGrhQnQGbQXbuZ9of4T7cGuXsl7bJxkP49TwSkFC/VoOXM5Mqkj3UsgqwWTYDPeFLpTK0Bm5bFGoH9wfqfwBnB8NpWUYpE0fHfpoIwJfaAQ+ddQD72h8Aw==\"}","bMark_Map_1_Map A":"{\"name\":\"Map A\",\"desc\":\"\",\"paramString\":\"?p=Nc67CsJAEIXht5lqlZm9jLvFNApWEewlRYgpFHPBHSF5e6Nhu4+fU5xZB5XbjjBRdOlgGBkjB7MWtsEnMmzRUcIajrmfJDcKj+HezVWzdG9xBOPU6iIRofnMZ62yCu2JDBqsV9gCV+ALwh/2N6YNtpRtDNdXK+uRSMFFZ5giW4+gl6f0oCcZvw==\"}","bMark_Map_6_Map F":"{\"name\":\"Map F\",\"desc\":\"\",\"paramString\":\"?p=Nc29CsMwDEbRt9HkFsu2ZHvQkkKnDl06lQwha/MDViB9+5qCtoO4Hzp1VXlf0FeuMbMjRp8xuH6JJRIHR6VS5DTC0JZd2qSw7bN+pXiYjvOuj6aCV0TnnR87giEakoH+CBYHi4PF8PzM0l9z8anPiHNNlUFfsoEObZUF9CbbDw==\"}"}
jsonToSnaps(f)

function jsonToSnaps(json){
    var w=0, e=getSnapsFromJson(), testCtr = 0;
    var u='?p=Nco7CoAwDADQ23SKkqTR1KGLg5M3EAdx9gONoLdXhGxveLftlqeKWFvqREE0KiWCKqE2IgiKJLHjOfRlO3NZLBznak9OGJbrHmwslqkmAgScP7AjOsTR/GDP7Jk9vw=='//parameters for start up empty map  
    WHAFapp.serialSnapper=0;
    startDemikulu();
    
    function startDemikulu(){
      if (w<e.length){
        if(WHAFapp.serialSnapper ==0){
            snapMapTaker(e[w]);
            w++;
            setTimeout(function(){startDemikulu()},1501);
          testCtr=0;          
        }else{
          if (testCtr<35){
              setTimeout(function(){startDemikulu()},1501);
              console.log("snapping again, ", testCtr);
              testCtr++
          }else{
            WHAFapp.serialSnapper =0
              snapMapTaker(e[w]);
              w++;
              setTimeout(function(){startDemikulu()},1501);
          }
        }
      }else{
          resetter();
          return
      }    
    }
   
  //returns a list of bookmark items. Variable can be used to extract other kists from localStorage
    function getSnapsFromJson(){
        var b=[],c=[];   
        for (item in json){
          c.push(item)
        }
        c.sort();
        for(var i=0; i<c.length; i++){
            var g = $.parseJSON(json[c[i]])
            b.push(g)
        }
      return b
    }
  
    function snapMapTaker(g){
      console.log(g)
      var n = g.name, p=g.paramString;
      if(p && p!== undefined){
        setTimeout(function(){
          WHAFapp.demikuluName=n;
           WHAFapp.serialSnapper = 1
           //alert(n)
            WhafMapConstructor(p)
        },500)
      }
    }
   
   function resetter(){
     if(WHAFapp.serialSnapper ==0){
       WhafMapConstructor(u)
     }else{
       setTimeout(function(){resetter(),300})
                            }
   }
  
}



var tog = ['togglerU','togglerD','togglerMj','togglerBsn','togglerC']
var scales = ['upMaskFL','dnMaskFL','MajorMaskFL','BsnMaskFL'];
for (t=0; t<tog.length; t++){
  w=WHAFapp.currentMapParams[tog[t]];
  DSS_objectives[scales[t]].scaleSymbol=w
}



-------------------

rr=localStorage["bMark_Map_17_altered watercourse"]
d = $.parseJSON( rr )
z=d.paramString




setMapFromBookmarkX(z)


function setMapFromBookmarkX(bmarkSynt){
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
    setFromExtentParams(t);
  
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