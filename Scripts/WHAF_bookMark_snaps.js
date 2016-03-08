function keepMap(){
    var mapViewOb={};
    var nam = $('#bookMarkInput').val();
    var note = $('#bookMarkNotes').val();
    refreshMapParams();
    var paramString = showShare('store')
    mapViewOb.name = nam;
    mapViewOb.desc = note;
    mapViewOb.paramString=paramString;
    return mapViewOb;
}

function storeMap(snap){
    var index = bMarkIndex();
    var ff=keepMap();
    var item = ff.name;
    var snapItemId = 'snap_Map_'+index+'_'+item;
    var itemId = 'bMark_Map_'+index+'_'+item;
    var kk=JSON.stringify(ff);
    var te = '<li><a onclick="retrieveMap(\''+itemId+'\')" href="#" tabindex="-1"> <i class="bookiIcon icon-remove icon-white pull-right" onclick = "$(this).parent().remove(); localStorage.removeItem(\''+itemId+'\');" ></i>'+item+ '</a></li>'
    if(snap=='snap'){
        sessionStorage.setItem(snapItemId,kk);
        return(snapItemId);
    }
    else{
        localStorage.setItem(itemId,kk);
        $('#bookMarkList').prepend(te);
    }
}

function retrieveMap(item){
    var rr,d,decodeString,txti,texter;
    if(item[0]==='b'){//for bookmarks
        rr = localStorage.getItem(item)
    }
    else if (item[0]==='s'){//for mapsnaps
        rr = sessionStorage.getItem(item)
    }

    d = $.parseJSON( rr );      
    
    try{txti = d.desc;//inserts saved bookmark name and descriptoin to bookmark box
        $('#bookMarkNotes').val(txti);
        var texter = d.name;
        $('#bookMarkInput').val(texter)
    }catch(r){};

    
    try{
        if (d.paramString && d.paramString !== undefined){
            if (d.paramString.indexOf("?xtnt")===0){//if paramString was not encoded
                rrParams=d.paramString;
                setMapFromBookmark(rrParams);
            } else{
                WhafMapConstructor(d.paramString)
            }
          } else {
          setmapFromJSON(d);
        };
    }catch(err){}
}

function refreshMap(){
    try{locationMarksRemover()}catch(u){};
    try{WHAFapp.tb.deactivate()}catch(u){};
    var t = showShare('store');
    WhafMapConstructor(t);
}

function storeExtent(){
    var index = bMarkIndex();
    var ee=map.extent;
    var nam = $('#bookMarkInput').val();
    var note = $('#bookMarkNotes').val();
    ee.name = nam;
    ee.desc = note;
    
    
    var ll=JSON.stringify(ee)
    var item = nam
    var itemId = 'bMark_Loc_'+index+'_'+item
    localStorage.setItem(itemId,ll);

     var te = '<li><a onclick="retrieveExtent(\''+itemId+'\')" href="#" tabindex="-1"> <i class="bookiIcon icon-remove icon-white pull-right" onclick = "$(this).parent().remove(); localStorage.removeItem(\''+itemId+'\');" ></i>'+item+ ' (map extent)</a></li>'
    
    $('#bookMarkList').prepend(te);
    
}

function retrieveExtent(item){
    var rr= localStorage.getItem(item);
    var d = $.parseJSON( rr );
    var n = new  WHAFapp.ExtentCons({
        xmin: d.xmin,
        ymin: d.ymin,
        xmax: d.xmax,
        ymax: d.ymax,
        spatialReference: {wkid: 102100}
    });
    map.setExtent(n);
    var txti = d.desc;
    $('#bookMarkNotes').val(txti);
    var texter = d.name;
    $('#bookMarkInput').val(texter)
}

function bMarkIndex(){

    if (localStorage.getItem("BM_index") && localStorage.getItem("BM_index") !== null){
        index = localStorage.getItem("BM_index");
        var d = Number(index);
        d++;
        s = String(d)
        localStorage.setItem("BM_index", s)

        return localStorage.getItem("BM_index")
    } else{
        localStorage.setItem("BM_index", '1');
        return localStorage.getItem("BM_index")
    }
}

function allStorage(){
    if(localStorage){
        var archive = [],
            keys = Object.keys(localStorage),
            i = 0;
        for (; i < keys.length; i++) {
            archive.push(keys[i]);
        }
        return archive;
    }
}

function popBmarkPane(){//retrieves bookmark data from browser's local storage and creates bookmark list from it. 
    var mB={},tB=[],lB={},f;
    if(localStorage){
        f=allStorage()
        for (ite=0; ite<f.length; ite++){
          var w=(f[ite]);
          
          var bool = w.slice(0,5);
          var type = w.slice(6,9);
          
          if (type == "Map"){
            extractN(f[ite]);
          }
          else if (type == "Loc"){
            extractNE(f[ite]);
          }
        }
    }

    tB.sort();
    tB.reverse();
    rrr();

    function extractNE(t){
        tt=t.replace('bMark_Loc_','')
        yy=tt.indexOf('_');
        zz=Number(tt.slice(0,yy))
        tB.push(zz);
        lB[zz] = t
    }

    function extractN(t){
        tt=t.replace('bMark_Map_','')
        yy=tt.indexOf('_');
        zz=tt.slice(yy)
        zzz=zz.replace('_','')
        tB.push(zzz);
      
        mB[zzz] = t
    }



    function rrr(){
      
      var te
        for (var ii=0; ii<tB.length; ii++){
            var item = mB[tB[ii]];
          
            try{
                var d = $.parseJSON(localStorage.getItem(item));
              
                var itemId = item;
                var item=d.name;
              if (itemId.slice(6,9)==="Map"){
                  te = '<li><a onclick="retrieveMap(\''+itemId+'\')" href="#" tabindex="-1"> <i class="bookiIcon icon-remove icon-white pull-right" onclick = "$(this).parent().remove(); localStorage.removeItem(\''+itemId+'\');" ></i>'+item+ '</a></li>'
                } else if (itemId.slice(6,9)==="Loc"){
                  te = '<li><a onclick="retrieveExtent(\''+itemId+'\')" href="#" tabindex="-1"> <i class="bookiIcon icon-remove icon-white pull-right" onclick = "$(this).parent().remove(); localStorage.removeItem(\''+itemId+'\');" ></i>'+item+ ' (map extent)</a></li>'              
                }
                $('#bookMarkList').prepend(te);    
            }catch(err){};
        }
    }
}

// function popBmarkPane(){//retrieves bookmark data from browser's local storage and creates bookmark list from it. 
//   var mB={},tmB=[],lB={}, tlB=[],f;
//     if(localStorage){
//         f=allStorage()
//         for (ite=0; ite<f.length; ite++){
//           var w=(f[ite]);
//           var bool = w.slice(0,5);
//           var type = w.slice(6,9);
//           if (type == "Map"){
//             extractN(f[ite]);
//           }
//           else if (type == "Loc"){
//             extractNE(f[ite]);
//           }
//         }
//     };

//     tmB.sort(sortNumber);
//     tlB.sort(sortNumber);
//     rrr();

//     function extractNE(t){
//         tt=t.replace('bMark_Loc_','')
//         yy=tt.indexOf('_');
//         zz=Number(tt.slice(0,yy))
//         tlB.push(zz);
//         lB[zz] = t
//     }

//     function extractN(t){
//         tt=t.replace('bMark_Map_','')
//         yy=tt.indexOf('_');
//         zz=Number(tt.slice(0,yy))
//         tmB.push(zz);
//         mB[zz] = t
//     }
  
//     function sortNumber(a,b) {
//         return a - b;
//     }

//     function rrr(){ 
      
//         for (var ii=0; ii<tlB.length; ii++){
//             var item = lB[tlB[ii]];
//             console.log(item)
//             try{
//                 var d = $.parseJSON(localStorage.getItem(item));
//                 var itemId = item;
//                 var item=d.name;
//                 var te = '<li><a onclick="retrieveExtent(\''+itemId+'\')" href="#" tabindex="-1"> <i class="bookiIcon icon-remove icon-white pull-right" onclick = "$(this).parent().remove(); localStorage.removeItem(\''+itemId+'\');" ></i>'+item+ ' (map extent)</a></li>'
//                 $('#bookMarkList').prepend(te);    
//             }catch(err){};
//         }

//         for (var ii=0; ii<tmB.length; ii++){
//             var item = mB[tmB[ii]];
//             try{
//                 var d = $.parseJSON(localStorage.getItem(item));
//                 var itemId = item;
//                 var item=d.name;
//                 var te = '<li><a onclick="retrieveMap(\''+itemId+'\')" href="#" tabindex="-1"> <i class="bookiIcon icon-remove icon-white pull-right" onclick = "$(this).parent().remove(); localStorage.removeItem(\''+itemId+'\');" ></i>'+item+ '</a></li>'
//                 $('#bookMarkList').prepend(te);    
//             }catch(err){};
//         }
//     }
// }

function reScaleSnaps(elem, z){
  var m=100*((1-z)/2);
  var tt='translate(-'+m+'%, -'+m+'%) scale('+z+','+z+')';
  $(elem).css({'transform': tt,'-moz-transform': tt,'-ms-transform': tt,'-webkit-transform': tt,'-o-transform': tt})
}

function graceRemove(elem){
    $(elem).fadeOut(400, function(){$(elem).remove(); shiftSnaps()});
}

function addSnap(){
    var title, mapRoot = 'map_root',v,e=WHAFapp.snpNumber, idName = String(e)+'_sPlace',c,cc,C,CC,h,H,m,mm,e,r,E,S,R,f,F,k,snapster,ff,FF,M,MW,mw;
    var g='<div id="'+idName+'Menu" class="snapMenuBox"><div id="" class ="snapMenuItems"><a href=\'#\' title="Remove"><img id="" class="img-rounded info9Image snapMenuSVG" src="./img/svgs/closeR.svg" onClick="graceRemove($(this).parent().parent().parent().parent()); snpVwCtrHid()"></a></div></div>'
    c=$('#map').css('width');
    h=$('#map').css('height');
    H=Number(h.replace('px',''))*WHAFapp.snapZoom;
    C=Number(c.replace('px',''))*WHAFapp.snapZoom;
        
    adjustSnaphotAreaPadding();

    snapster = storeMap('snap')

    if (WHAFapp.serialSnapper === 1 && WHAFapp.demikuluName && WHAFapp.demikuluName!==''){
        title = '<input class="snapTitle span12" id="'+idName+'_title" autocomplete="off"  type="text" value="'+WHAFapp.demikuluName+'">'
    }else{
        title = '<input class="snapTitle span12" id="'+idName+'_title" autocomplete="off" placeholder="Add Title..." type="text">'
    }


    $('#snapShotsArea').append('<div id="'+idName+'" class="mapSnapStrip" style="height:'+String(H)+'px">'+g+'<div id="'+idName+'Map" class="snapBounds" href="#"></div>'+title+'</div>')  
    WHAFapp.demikuluName='';//reset the title for snaps

    M=$('#'+mapRoot).css('width')
    MW=Number(M.replace('px',''));
    mw=String((MW-2)*WHAFapp.snapZoom)+'px'
    $('.mapSnapStrip').css('width',mw)

    $('.mapSnapStrip').css('width',String(C))//adjusts all mapsnaps in case window resize


    v=$('#'+mapRoot).clone();
    v[0].id=String(e)+'_'+v[0].id;
    
    changeIn(v)
    function changeIn(ii){
        $(ii).addClass('snapRoot');
        reScaleSnaps(ii,WHAFapp.snapZoom);
        $(ii).click(function(){retrieveSnap(snapster)});
        var j=$(ii).find("div,svg")
    
      for (r in j){
        if(j[r].id=='map_zoom_slider'){$(j[r]).remove()}
        if (j[r].id && j[r].id !== undefined){
          j[r].id=String(e)+'_'+j[r].id;
        } 
      }
    }
    
    ff=Number($('#map').css('height').replace('px',''));
    FF=ff*WHAFapp.snapZoom;

    $('#snapShotsArea').css('height',FF+50);  

    $('.snapTitle').css({'top':FF+7});



    $('#'+idName+'Map').html(v);
    $('#snapShotsArea .container').css('cursor','pointer');
    $('#snapShotsArea .esriControlsBR').hide();

    cc=$('#snapShotsArea').css('width');
    CC=Number(cc.replace('px',''));
    m=CC+C*5;
    mm=String(m)+'px';
  
    $('#snapShotsArea').css('width',mm)

    WHAFapp.snpNumber=WHAFapp.snpNumber+1;//change depending on elements removed
  
    k=$('#snapShotsArea').find('.mapSnapStrip').length
    WHAFapp.displayedSnap=k-1
    shiftSnaps(WHAFapp.displayedSnap);
    $('#snapShotsArea').fadeIn();
    $('#snapMax').fadeOut();

    setTimeout(function () {
        $('#snapViewCtrol').fadeIn(1000);
        $('#snapViewCtrol').fadeIn(1000);
        try{
            h=$('#snapShotsArea').offset().top
            $('#snapViewCtrol').css({'top':h+30})        
        }catch(err){};
    }, 1000);
    if(k>1){
        setTimeout(function () {
            $('.snapCtrl').fadeIn(800)
        }, 1500)
    }
}



function retrieveSnap(snapster){
    if($('#snapShotsArea').hasClass('noclick')){
        $('#snapShotsArea').removeClass('noclick')
    } else{
        retrieveMap(snapster)
    }
}

function shiftSnaps(cz){ 
  if (!cz){
    cz=$('#snapShotsArea').find('.mapSnapStrip').length-1;
  }  
  var r=$('.mapSnapStrip').css('margin-left'),R,c,C,l,nz,h,H;
  if (r && r !== undefined){
      R=Number(r.replace('px',''));
      c=$('.mapSnapStrip').css('width');
      C=Number(c.replace('px',''));
      H=-5-cz*(C+R*2);
      h=String(H)+'px';
      l=$('#snapShotsArea').find('.mapSnapStrip');
      nz=l.length;
      if(cz<nz&&cz>-1&& H<0){
        $('#snapShotsArea').animate({'margin-left':h},800);
        for (var u=0; u<l.length; u++){
          $(l[u]).animate({'opacity': 1},800);
        }
        $(l[cz]).animate({'opacity': 1},400)
      }
  }
  if(cz<1){
    $('.snapCtrl').fadeOut();
  }
  if(cz<0){
    $('#snapShotsArea, .snapCtrl').fadeOut();
  } 
}

function snapPlus(){
    var k=$('#snapShotsArea').find('.mapSnapStrip').length;
    if (k>0){
        $('#snapMax').fadeIn();
    }
}

function snapBringUp(){
    $('#snapViewCtrol').fadeIn();
    var k=$('#snapShotsArea').find('.mapSnapStrip').length;
    if (k>1){
        $('.snapCtrl').fadeIn();
    }
    $('#snapShotsArea, #snapMin').fadeIn();
}

function nextSnap(op){
  var l,z,x,X,r,R,c,C,h,H;
    x=$('#snapShotsArea').css('margin-left')
    X=Number(x.replace('px',''))
    r=$('.mapSnapStrip').css('margin-left')
    R=Number(r.replace('px',''));
    c=$('.mapSnapStrip').css('width');
    C=Number(c.replace('px',''));

  l=$('#snapShotsArea').find('.mapSnapStrip');
  z=l.length;
  switch (op){
    case '+':
        if(slideStopper()===true){
            WHAFapp.displayedSnap++;
            H=X-(C+R*2);
            h=String(H)+'px';
            $('#snapShotsArea').css({'margin-left':h});
        }      break;
    case '-':
      
        WHAFapp.displayedSnap--;
        // shiftSnaps(WHAFapp.displayedSnap);
        H=X+(C+R*2);
        h=String(H)+'px';
        if (H<0){
            $('#snapShotsArea').css({'margin-left':h});
        }
      break 
  }
}

//FUNCTION TO FADE OUT MAP SNAPS THAT ARE NOT SHOWING IN SLIDESHOW
// function shadeSlides(){
//     var m,n,l;
//     m=WHAFapp.displayedSnap;
//     l=$('#snapShotsArea').find('.mapSnapStrip');
//     n=l.length;
//     for (a in l){
//         if (a!=m){
//             $(l[a].fadeOut())
//         } else{
//             $(l[a].fadeIn())
//         }
//     }

// }

//FUNCTIONS TO MODIFY SIZE AND LAYOUT OF MAP SNAPS
function modSnaps(what, place){
    switch(what){
        case '+':
            WHAFapp.snapZoom=WHAFapp.snapZoom+0.05
            movingOn(place, WHAFapp.snapZoom)
            break;
        case '-':
        if(WHAFapp.snapZoom>0.1){
              WHAFapp.snapZoom=WHAFapp.snapZoom-0.05
              movingOn(place, WHAFapp.snapZoom)
              }
              break;
      case 'snapShow':
        movingOn(place, .9)
        break;
      default:
        movingOn(place, WHAFapp.snapZoom)
        
    }
    function movingOn(place, size){
        switch (place){
            case 'strip':
                changeStripSize(size);
                break;
            case 'sideBySide':
                scaleSnaps(sideBySideZoom);
                break;
        }
    }
}

function slideShowPrep(){//Sets the slideshow of map snaps

    $('#WHAF_headerNav').hide();
    $('#projectShowTitleWrapper').show();

    $('#map_root, #scaleButtonPlace, #menuBox, #snapsmall, #snapLarge, #snapMin, #StateIcon, #back, .snapMenuItems, #TabOfcontentPlace').fadeOut();
    $('.snapTitle').addClass('snapTitleShow');
    $('#snapShotsArea').css('margin-bottom','5px');
    $('.snapCtrl ').css('top','50%');
    // $('#snapCtrlR, #snapCtrlL').css('margin-top','-400px');
    modSnaps('snapShow','strip');

    $('#slideShowPrep').hide();
    $('#stripView').show();
    setTimeout(function(){snapRetreat()},1500);
}

function removeSlideShow(){//returns to map snap strips

    $('#WHAF_headerNav').show();
    $('#projectShowTitleWrapper').hide();
    $('.snapTitle').removeClass('snapTitleShow');
    $('#map_root, #WHAF_headerNav, #scaleButtonPlace, #menuBox, #snapViewCtrol, #snapsmall, #snapLarge, #snapMin, #StateIcon, #back, .snapMenuItems, #TabOfcontentPlace').fadeIn();
    modSnaps('k','strip');
    $('#stripView').hide();
    $('#slideShowPrep').show();
    $('.snapCtrl ').css('top','90%');
}


function scaleSnaps(i){//changes size of map snap ; VALUE 0-1
    var S=i, s,TR,tr,transformExpression; 
    // WHAFapp.snapZoom=S
    s=String(S)
    TR=(1-s)/2*100
    tr=String(TR);
    transformExpression = 'translate(-'+tr+'%, -'+tr+'%) scale('+s+','+s+')'

    $('.snapRoot').css('transform',transformExpression)
    c=$('#map').css('width');
    C=Number(c.replace('px',''))*S;

    d=$('#map').css('height');
    D=Number(d.replace('px',''))*S+30;

    $('.mapSnapStrip ').css({'width':String(C)});    
}

function changeStripSize(i){//changes size of map snap in map snap strip; VALUE 0-1 
    scaleSnaps(i)
    d=$('#map').css('height');
    D=Number(d.replace('px',''))*i+55;
    $('#snapShotsArea').css('height',D);
    $('.snapTitle').css({'top':D-48});
    
    adjustSnaphotAreaPadding(i)
    shiftSnaps();
 }

function adjustSnaphotAreaPadding(i){
    var o,O,s,S,f,F,m,M,c,C,ii;
    if (!i || i=== undefined){ii=WHAFapp.snapZoom}
    else{ii=i}
    c=$('#map').css('width');
    C=Number(c.replace('px',''))*ii;    
    o=$('#map').css('width');
    O=Number(o.replace('px',''));
    s=C//$('.mapSnapStrip').css('width');
    m=$('.mapSnapStrip').css('margin-left')
    if(!m || m===undefined){
        m='35px'
    }
    S=s//Number(s.replace('px',''));
    M=Number(m.replace('px',''));
    F=O/2-(S/2+M-5);
    f=String(F)+'px';
    $('#snapShotsArea').css('padding-left',f);
}

function setSideBySide(){ //changing the layout of the snaps container for side by side display 

    var options = {
        'width':x-30,
        'padding-left':'0px',
        'margin':'7px',
        'height':'auto',
        'top':'0%',
        'display':'block',
        'overflow':'auto',
        'background-color':'rgb(40,40,40)'
    }
    scaleSnaps(WHAFapp.sideBySideZoom)
    $('#snapShotsArea').css(options)

}

function setMapSnapStrip(){//changing the layout of the snaps container for strip display 

    var options ={
        'position':'absolute',
        'left':'-2px',
        'top':'auto',
        'bottom':'0px',
        'height':'auto',
        'width':'2500px',
        'z-index':' 1000',
        'padding':'0px',
        'display':'block', 
        'background-color':'rgba(25,25,25,1)',
        'overflow':'auto',
        'margin-bottom':'5px',
        'overflow':'hidden'
        
    }

    scaleSnaps(WHAFapp.snapZoom)

    $('#snapShotsArea').css(options);

    ff=Number($('#map').css('height').replace('px',''));
    $('#snapShotsArea').css('height',(ff*WHAFapp.snapZoom)+50);  

    cc=$('#snapShotsArea').css('width');
    CC=Number(cc.replace('px',''));
    m=CC+C*5;
    mm=String(m)+'px';  
    $('#snapShotsArea').css('width',mm);
    adjustSnaphotAreaPadding();
    shiftSnaps();


}



function serialSnapper(){
    if (WHAFapp.serialSnapper === 1){//condition for update-end to trigger snapper
        if (maskLoadChecker()===true){//ensures that all mask layers are completed
            addSnap();
            WHAFapp.serialSnapper = 0
        } else{
            setTimeout(function(){serialSnapper()}, 800)
        }
    } 
}

 function bookMarksToSnaps(){

    var w=0, e=getSnapsFromBmarks('bMark_'), testCtr = 0;
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
            alert("Unfortunately, importing the bookmarks failed this time. We recommend refreshing the browser and trying again.")
            return
              // WHAFapp.serialSnapper =0
              // snapMapTaker(e[w]);
              // w++;
              // setTimeout(function(){startDemikulu()},1501);
          }
        }
      }else{
          resetter();
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

function exportBmarks(bMarkGroup){
    var snout={}
    var d = bMarkGroup,l = d.length    
    for (item in localStorage){
      if(item.slice(0,l)===d){
        snout[item]=localStorage[item]
        }
    }

    tail = JSON.stringify(snout)
    return tail      

}

function scaleAttrFromUrl(){//if scales are provided in url or bookmark, ensure that scalSymbol is updated on layer object
    var tog = ['togglerU','togglerD','togglerMj','togglerBsn'];
    var scales = ['upMaskFL','dnMaskFL','MajorMaskFL','BsnMaskFL'];
    for (t=0; t<tog.length; t++){
        if(WHAFapp.currentMapParams[tog[t]]){
            w=WHAFapp.currentMapParams[tog[t]];
            DSS_objectives[scales[t]].scaleSymbol=w
        }
    }

}


function snapRetreat(){
    var l=$('#snapShotsArea').find('.mapSnapStrip'), ll=l.length, y=0
    while (y<ll){
      nextSnap('-')
      y++
    }
}