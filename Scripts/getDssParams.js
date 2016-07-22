
//experimental functions for handling matrix
function getindexFactoMetricsObject(){

    var r = indexdescNewJson
    var impacts =['ET+','Runoff-','Infiltrate+','Interflow','Storage surface+','GW Recharge','Bed bank stability+','boundary cond.+','Stream energy-','Strm long. connect+','Dissolved Oxygen+','Spcs divers+','Veg. vigor+','Photosynth+','Carbon seq.+','Tr habitat conn+','Sed.  channel source','Sed channel delivery','Sed hillslope source','Sed hillslope delivery','Sed upland source','Sed overland flow delivery','Contaminant source-','Contaminant delivery-','Chem in solution','Nutrient source','Nutrient delivery']
    var ob = {};

    for (var i=0;i<impacts.length; i++){
     var s = impacts[i]
     ob[s] = null
    }

    console.log(ob)
    //JSON.stringify(ob)

    bigOb={}
    for (i in r){
     dog(r[i].name);
      if (r[i].metrics){
        var e = r[i].metrics;
        for (d in e){
         dog(e[d].name) 
        }
      }
    }

    function dog(e){
      console.log(e) 
      bigOb.e=ob
    }

    console.log(bigOb)
    return JSON.stringify(bigOb)
}

function csvToJs(csv){

var csvString = $.trim(csv);
var csvArray = csvToArray(csvString);


    function csvToArray(csvString){
      // The array we're going to build
      var csvArray   = [];
      // Break it into rows to start
      var csvRows    = csvString.split(/\n/);
      // Take off the first line to get the headers, then split that into an array
      var csvHeaders = csvRows.shift().split(';');

      // Loop through remaining rows
      for(var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex){
        var rowArray  = csvRows[rowIndex].split(';');

        // Create a new row object to store our data.
        var rowObject = csvArray[rowIndex] = {};
        
        // Then iterate through the remaining properties and use the headers as keys
        for(var propIndex = 0; propIndex < rowArray.length; ++propIndex){
          // Grab the value from the row array we're looping through...
          var propValue =   rowArray[propIndex].replace(/^"|"$/g,'');
          // ...also grab the relevant header (the RegExp in both of these removes quotes)
          var propLabel = csvHeaders[propIndex].replace(/^"|"$/g,'');;

          rowObject[propLabel] = propValue;
        }
      }

      return csvArray;
    }
}

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

function getPramsFromArray(m){
  var comp,index,compList=['HYDROLOGY','GEOMORPHOLOGY','BIOLOGY','CONNECTIVITY','WATER QUALITY']

  impactsList = m[0]

  impactsOb={}//direct:{},indirect:{}}

  for (var i=1;i<m.length;i++){
     
    var c = (m[i][0]);
    if(compList.indexOf(c)!==-1){
      comp=c
    } else if(c!=='' && c[0]!=='_'){
      index=c
      console.log(comp+': '+index)
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


getPramsFromArray(m)




//Array of values: get by converting csv to json (http://www.convertcsv.com/csv-to-json.htm)
//csv sample in this folder
//Results should look like array m below:

m=[
  ["","AVOID:Direct Means Objective (reduce source, change condition) ","CONTROL / TRAP /Mitigate : Indirect Means Objective (mitigate disease impact)","SPECIFIC ACTION","ET+","Runoff -","Infiltrate ","Interflow (?)","Storage surface +","GW Recharge","bed bank stability +","boundary cond. +","stream energy -","strm long. connect +","Dissolved Oxygen +","Nesting /rearing habitat","Pool riffle","Mosaic Ter-rip-aq Connect+","refugia","Spawning/breeding","(Veg./ Animal?) Spcs Dispersal","(Veg./ Animal?) spcs divers +","Soil Health/OM","veg. vigor +","photosynth +","carbon seq. +","Upland Tr habitat conn +","sed.  channel source ","sed channel delivery","sed hillslope source","sed hillslope delivery","sed upland source","sed overland flow delivery","chemical-bacterial contaminant source- ","chemical-bacterial contaminant delivery-","Chem in solution","Nitrogen source -","Nitrogen delivery -","nutrient  (P) source","nutrient  (P) delivery","self sustaining  1  some maintenance  0 fails w/out con-tinued inputs    -1"  ],
  ["_HYDROLOGY","","","","1","1","1","1","1","1","","","","","","","","","","","","","1","","","","","","","","1","","1","","1","","","1","","1",""  ],
  ["_GEOMORPHOLOGY","","","","","","","","","1","1","1","1","1","","","1","","","","","","1","","","1","","1","1","1","1","1","1","","","","","","","1",""  ],
  ["_BIOLOGY","","","","1","1","1","","1","","","","","","","1","1","1","1","1","1","1","","1","1","1","1","","","","","","","","","","","","","",""  ],
  ["_CONNECTIVITY","","","","","","","","","","","","","1","","1","1","1","1","1","1","1","","","","","1","","1","","1","","","","1","","","","","1",""  ],
  ["_WATER QUALITY","","","","","","","","","","1","1","1","","1","","","","","","1","1","","","","","","1","1","1","1","1","1","1","1","1","1","1","1","1",""  ],
  ["HYDROLOGY","","","Ag BMP (number) or Action Name ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["Perennial Cover","increase perennial vegetation, perennial crops","","Conservation Cover (327)  ","1","1","1","0","0","0","0","0","0","0","0","1","0","1","1","0","1","1","1","1","1","1","1","0","0","0","0","1","1","0","1","0","","1","","1","1"  ],
  ["","","Grassed Waterways","Grassed Waterways (412) ","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","0","1","-1"  ],
  ["","","Cover crops, Winter annuals","Conservation Crop Rotation (328) Cover Crops (340)","1","1","1","0","0","0","0","0","0","0","0","1","","1","1","","1","","1","1","1","1","1","0","0","0","0","1","1","0","1","0","1","1","0","1","-1"  ],
  ["Impervious Cover","decrease imperviousness","","avoid use/reduce impervious surface","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1"  ],
  ["","","vegetative buffer of storm water outlets, roads","veg. buffer of storm water outlets, roads","1","1","1","1","1","1","0","1","0","0","0","0","0","1","0","0","1","1","0","0","1","1","1","0","0","0","1","0","1","0","1","0","0","0","0","1","0"  ],
  ["","","storm water retention ponds","storm water retention ponds","1","1","1","0","1","0","0","1","1","0","0","1","0","0","0","0","1","0","0","0","0","0","0","0","0","0","1","0","1","0","1","0","0","0","0","1","-1"  ],
  ["","","Rain gardens, roof gardens","Rain gardens","1","1","1","0","1","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","1","1","0","0","0","0","1","0","1","0","1","0","0","1","1","1","-1"  ],
  ["Wetland Loss","increase storage - restore natural wetlands","","Wetland Restoration (651)","1","1","1","0","1","0","0","0","0","0","0","1","0","1","1","0","1","1","0","0","1","1","0","0","0","0","1","0","1","0","1","0","1","1","0","1","1"  ],
  ["","","Construct treatment wetlands","Constructed Treatment Wetlands ","1","1","1","0","1","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","1","0","1","0","1","0","1","1","0","1","0"  ],
  ["","","Saturated Buffer (tile runoff dispersed in riparian) ","Saturated Buffer (739)","1","1","1","1","0","0","1","1","1","0","0","0","0","1","0","0","0","0","0","0","1","1","0","0","0","1","1","0","1","0","0","0","1","1","0","0","-1"  ],
  ["","","Culvert downsizing, road retention","Culvert downsizing, road retention","0","1","1","0","0","0","0","0","1","-1","0","0","-1","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","1","0"  ],
  ["","","hold water and sediment - wascob","WASCOB (638)","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","1","0","1","0","0","1","0","1","-1"  ],
  ["Altered Watercourse","Re-meander or restore altered watercourse","","Stream re-meander/restoration","1","1","1","1","1","0","1","1","1","1","1","1","1","1","1","1","1","1","0","0","0","0","0","1","1","0","0","0","0","0","0","1","0","0","0","1","0"  ],
  ["","","buffer channelized streams","Ditch buffer","1","1","1","1","0","0","1","1","1","1","1","1","0","0","0","0","1","1","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","1","0"  ],
  ["","","create 2-stage ditch","Two Stage Ditch","1","1","1","1","0","0","1","1","1","1","1","0","0","0","0","0","1","1","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","1","0","1","1"  ],
  ["Water Withdrawal","reduce water use ","","Water Use Reductions","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1"  ],
  ["","","improve irrigation efficiencies","Irrigation Water Mgmt (442, 449)","0","1","1","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"  ],
  ["","","Controlled Subsurface drainage/Sub-irrigation","Controlled Subsurface Drainage (554, 587)","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","-1"  ],
  ["","","set protected flows","Set Protected Low Flows","0","0","0","1","0","0","0","0","0","1","1","1","1","1","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1"  ],
  ["Flow Variability","reduce flow manipulation/dam operation","","Reduce Dam manipulation of flow","0","0","0","0","0","0","1","1","1","1","1","1","1","0","1","1","1","1","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","1","-1"  ],
  ["","","increase landscape storage","Grade Stabilization Structure (410) ","1","1","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","0","0","0","1","-1"  ],
  ["","","controlled drainage","Controlled Subsurface Drainage (554)","0","-1","0","1","0","-1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","1","0","1","-1"  ],
  ["","","adjust/manage tile output","Tile system design, alternate intakes","0","1","1","1","0","1","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","1","0","0","0","0","0","0","1","-1"  ],
  ["GEOMORPHOLOGY","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["Soil Erosion Potential","NA - condition not directly changeable","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","improve soil health","Improve soil health","0","1","1","1","0","1","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","1","1","1","1","0","0","0","0","1","0","1","0"  ],
  ["","","Reduce / manage soil compaction (Field to stream)","Compaction management ","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","1","1","1","1","0","0","0","0","1","0","1","1"  ],
  ["","","Manure application","Nutrient mgmt (manure) (590) ","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","0","0","0","0","0","0","0","0","-1","0","0","-1","0","-1","0","-1"  ],
  ["","","stabilize/avoid destabilizing steep slopes","Terrace (600), Contour Farming, Buffer strips (330-332) ","1","1","1","0","0","0","0","0","0","0","0","0","0","0","1","0","1","0","1","0","1","1","1","0","0","1","1","1","1","0","0","0","","","","1","-1"  ],
  ["","","stabilize/avoid destabilizing steep slopes","Bluff and Shoreland Ordinance implementation","1","1","1","0","0","0","0","1","0","0","0","1","0","1","1","1","1","1","0","1","1","1","0","0","0","1","1","0","1","0","0","0","0","0","0","1","1"  ],
  ["","","increase vegetative cover on erodible soils ","No till, residue mgmt (330, 332) ","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","1","1","1","1","0","0","0","1","1","1","1","-1"  ],
  ["Groundwater Contamination Susceptibility","NA - condition not directly changeable","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","increase buffer of karst features","Vegetative Buffer of Karst Features","0","0","1","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","1","1","0","0","0","1","1","0","1","0","1","0","0","1","0","1","0"  ],
  ["","","avoid release of contaminates","Monitor/upgrade to septic systems ","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","0"  ],
  ["","","avoid release of contaminates","Limit land app. of manure/feedlot size, location","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","1","1","1","1","-1"  ],
  ["","","avoid release of contaminates","Land Use Controls in  sensitive GW areas","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","1","0","1","0","1","1","0","1","0","1"  ],
  ["Climate Vulnerability","NA - condition not directly changeable","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","prepare for extremes in precip -increase water storage","(See surface storage and altered watercourse) ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","prepare for extremes in precip - decrease runoff","(See soil erosion index)","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","prepare for warming temp.- disease,invasive - resilience","Manage invasive species - barriers","0","0","0","0","0","0","0","0","0","-1","0","-1","0","-1","-1","-1","-1","-1","0","0","0","0","-1","0","0","0","0","0","0","0","0","0","0","0","0","0","-1"  ],
  ["","","prepare for warming temp.- disease,invasive - resilience","Manage invasive species - increase resilience","0","0","0","0","0","0","1","1","0","1","0","1","1","1","1","1","1","1","0","1","1","1","1","0","0","1","0","1","0","0","0","0","1","0","1","0","1"  ],
  ["stream stability- future","Stream restoration","","Stream Restoration (pg94, field to stream)","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","0","0","0","0","1","1","1","1","0","1","0","1","0","0","1","0","1","1"  ],
  ["","Floodplain acquisition","","Floodplain acquisition or easement","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","0","0","0","0","0","1","0","1","1"  ],
  ["","","Riparian vegetation","Riparian Buffer (Field to Stream pg92)","1","1","1","1","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","0","1","1","1","0","0","0","1","0","0","1","0","1","0"  ],
  ["","","Riprap","Streambank protection - riprap 580","0","0","0","-1","0","0","0","-1","-1","0","0","-1","-1","-1","-1","-1","-1","-1","0","0","0","0","-1","0","0","1","1","0","0","0","0","0","0","0","0","0","-1"  ],
  ["","","Bioengineering banks","Streambank protection 580","0","0","0","0","0","0","1","1","1","0","0","-1","0","0","0","1","0","0","0","0","0","0","0","0","1","1","1","0","0","0","0","0","0","0","0","1","0"  ],
  ["BIOLOGY","","(ARE THESE RESPONSES OR ACTIONS??)","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["Terrestrial Habitat Quality","improve habitat condition - manage (remove stressors)","","(See Manage invasive spcs w/ reslience  - Geo-Climate index) ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","0","","0","","","0","","0"  ],
  ["","improve habitat condition - replant","","re-establish native plant communities","1","1","1","1","0","1","0","1","0","0","0","1","0","1","1","1","1","1","1","1","1","1","1","0","0","1","1","1","1","0","1","0","0","1","0","1","0"  ],
  ["","improve habitat condition - fire","","controlled burning","0","1","1","0","0","0","0","0","0","0","0","1","0","1","1","1","1","1","1","1","1","1","1","0","0","1","1","1","1","0","0","0","0","0","0","0","-1"  ],
  ["","improve habitat condition - inundation cycling","","(See Floodplain acquisition/easements - Geo-stream stability)","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","1"  ],
  ["","","Enhance and Connect Habitat Patches","Mandate or encourage private/public habitat improvement","1","1","1","0","0","0","0","0","0","0","0","1","0","1","1","1","1","1","1","1","1","1","1","0","0","1","0","1","0","0","0","0","0","0","0","0","-1"  ],
  ["Fish Index","Stock fish","","stock fish","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","-1"  ],
  ["Invertebrate Index","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["Mussels Index","Re-introduce mussels","","re-introduce mussels","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","1","1","0","0","0","0","0","1","1","0","0","0","0","1","0","1","0","0","0","0","1"  ],
  ["","","Maintain gw inputs (water temp. limited)  ","Maintain gw inputs (for cold water systems)  ","0","0","1","1","0","1","0","0","0","0","0","0","0","1","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"  ],
  ["","","improve habitat condition - instream/lake","Habitat Improvement projects","0","0","0","0","0","1","1","1","1","0","1","1","1","1","1","1","1","1","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0"  ],
  ["","","","(See Stream Restoration - Geo Stream Stability Index) ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","restore connectivity (aquatic)","(See Aquatic Conn - Obstruction removal)","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","","(See Aquatic Conn - Provide fish passage)","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["Animal Species Richness","Maintain, restore diversity - stock species","","Stock or reintroduce species","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","-1"  ],
  ["At-Risk Animal Spec. Richness","Maintain, restore diversity - stock species","","Stock or reintroduce species of greatest concern","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","-1"  ],
  ["","","improve habitat condition - instream","See Habitat Improvement Projects - Stream Spc Quality","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","improve habitat condition - upland","See Habitat Improvement - Terrestrial Habitat Quality","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","improve habitat connectivity - riparian","See Riparian Connectivity Index ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","protect sensitive habitats (life cycle)","See Purchase land / consrv. Easements - Terr Habitat Quality","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["CONNECTIVITY","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["Terrestrial Habitat Connectivity","Re-connect quality upland habitat ","","Create corridors to connect quality terrestrial habitat","1","1","1","0","0","0","0","0","0","0","0","1","0","1","1","1","1","1","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","1"  ],
  ["","","reduce impact of impervious surface use","wildlife highway bypass","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","-1"  ],
  ["","","expand upland perennial veg corridors","Purchase land / consrv. Easements","1","1","1","0","0","0","0","0","0","0","0","1","0","1","1","1","1","1","1","1","1","1","1","0","0","0","0","1","1","0","0","0","0","0","0","0","0"  ],
  ["","","","restore native habitat","1","1","1","0","0","0","0","0","0","0","0","1","0","1","1","1","1","1","1","1","1","1","1","0","0","1","1","1","1","0","0","0","0","0","0","0","-1"  ],
  ["","","reduce row crop ag","set aside programs, CRP, RIM etc.","1","1","1","0","0","1","0","0","0","0","0","1","0","1","1","1","1","1","1","1","1","1","1","0","0","1","1","1","1","0","0","0","1","0","1","0","0"  ],
  ["Riparian Connectivity","connect terrestrial/aquatic interface","buffer waterways","Implement buffer initiative","1","1","1","1","1","1","1","1","1","0","0","1","1","1","1","1","1","1","0","0","0","0","0","0","0","1","1","0","1","0","1","0","0","1","0","1","0"  ],
  ["","","increase floodplain access","See Floodplain Acquisition - Geo - stream Stability index","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","1"  ],
  ["Aquatic Connectivity","connect stream network/remove obstructions","","Dam Removal","0","0","0","0","-1","0","1","1","1","1","1","1","1","1","1","1","1","1","0","0","0","0","0","-1","1","0","0","0","0","0","0","0","0","0","1","0","1"  ],
  ["","","","Culvert redesign for fish passage","0","0","0","0","0","0","1","1","1","1","1","0","1","0","1","1","1","1","0","0","0","0","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0"  ],
  ["","","","Provide fish passage","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","-1"  ],
  ["","reduce/remove WQ pollution disconnects (endocrine disruptions, DO, Temp.","","Remove WQ chemical and temperature barriers","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","","0","0","0","0","0","0","0","0","0","0","1","1","1","0","0","0","0","0"  ],
  ["WATER QUALITY","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["Localized Pollution Sources","Reduce localized inputs","","Reduce point source inputs","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","0","0","0","0","0"  ],
  ["","","Remove contaminants:  ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","intercept delivery from feedlots, (bacteria)","riparian buffers, karst feature buffer","0","1","1","1","0","0","0","","","","","","","","","","","","","","","","","","","","","","","0","1","0","","","0","1","-1"  ],
  ["","","","Feedlot /WW Filter Strip (635) Runoff Diversion (362)","0","1","1","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","0","1","1","1","1","1"  ],
  ["","","","exclusion (382) fencing (472)","0","0","0","0","0","0","1","1","0","1","0","1","1","1","1","1","0","1","0","1","1","1","0","0","0","0","0","0","0","1","1","0","1","0","0","0","0"  ],
  ["","","","rotational grazing","1","1","1","0","0","0","1","1","0","0","0","0","1","1","0","1","0","0","1","1","1","1","1","0","0","1","1","1","1","1","1","0","1","1","1","1","-1"  ],
  ["","","intercept delivery of chemical pollutants","? (superfund, potential contaminants, mines)","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","0","1","1","","","0","0","-1"  ],
  ["","","intercept delivery of phosphorus from WWTP","?","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","0","1","1","","","0","1","-1"  ],
  ["","","avoid release of  contaminants from septics","Monitor/upgrade to septic systems ","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","0"  ],
  ["Non-Point Source","reduce nonpoint sediment/ phosphorus","","See Perennial Cover actions? Or maybe there are no specific actions for this broad category? ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","intercept delivery of sed/P  with vegetation","","","","","","","","","","","","","","","","","","","","","","1","1","1","0","0","0","1","0","1","0","1","0","","","0","1","0"  ],
  ["","","intercept delivery of sed/P with structures","","","","","","","","","","","","","","","","","","","","","","","","","0","0","0","1","0","1","0","1","0","","","0","1","-1"  ],
  ["Assessments","improve Aquatic Life","","See Stream Spc Quality index? ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","0","1","1","","","0","1","-1"  ],
  ["","improve Aquatic Recreation","increase D.O. , decrease algae","Aerate water,","","","","","","","","","","","","","","","","","","1","","","","","","","","","","","","","","","","","","","-1"  ],
  ["","decrease Aquatic Consumption risk","Reduce airborne mercury? ","Air quality controls on coal burning plants","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","-1"  ]
]

m_ = [
  ["","AVOID:Direct Means Objective (reduce source, change condition) ","CONTROL / TRAP /Mitigate : Indirect Means Objective (mitigate disease impact)","SPECIFIC ACTION","ET+","Runoff -","Infiltrate ","Interflow (?)","Storage surface +","GW Recharge","bed bank stability +","boundary cond. +","stream energy -","strm long. connect +","Dissolved Oxygen +","Nesting /rearing habitat","Pool riffle","Mosaic Ter-rip-aq Connect+","refugia","Spawning/breeding","(Veg./ Animal?) Spcs Dispersal","(Veg./ Animal?) spcs divers +","Soil Health/OM","veg. vigor +","photosynth +","carbon seq. +","Upland Tr habitat conn +","sed.  channel source ","sed channel delivery","sed hillslope source","sed hillslope delivery","sed upland source","sed overland flow delivery","chemical-bacterial contaminant source- ","chemical-bacterial contaminant delivery-","Chem in solution","Nitrogen source -","Nitrogen delivery -","nutrient  (P) source","nutrient  (P) delivery","self sustaining  1  some maintenance  0 fails w/out con-tinued inputs    -1"  ],
  ["_HYDROLOGY","","","","1","1","1","1","1","1","","","","","","","","","","","","","1","","","","","","","","1","","1","","1","","","1","","1",""  ],
  ["_GEOMORPHOLOGY","","","","","","","","","1","1","1","1","1","","","1","","","","","","1","","","1","","1","1","1","1","1","1","","","","","","","1",""  ],
  ["_BIOLOGY","","","","1","1","1","","1","","","","","","","1","1","1","1","1","1","1","","1","1","1","1","","","","","","","","","","","","","",""  ],
  ["_CONNECTIVITY","","","","","","","","","","","","","1","","1","1","1","1","1","1","1","","","","","1","","1","","1","","","","1","","","","","1",""  ],
  ["_WQ","","","","","","","","","","1","1","1","","1","","","","","","1","1","","","","","","1","1","1","1","1","1","1","1","1","1","1","1","1",""  ],
  ["HYDROLOGY","","","Ag BMP (number) or Action Name ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["Perennial Cover","increase perennial vegetation, perennial crops","","Conservation Cover (327)  ","1","1","1","0","0","0","0","0","0","0","0","1","0","1","1","0","1","1","1","1","1","1","1","0","0","0","0","1","1","0","1","0","","1","","1","1"  ],
  ["","","Grassed Waterways","Grassed Waterways (412) ","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","0","1","-1"  ],
  ["","","Cover crops, Winter annuals","Conservation Crop Rotation (328) Cover Crops (340)","1","1","1","0","0","0","0","0","0","0","0","1","","1","1","","1","","1","1","1","1","1","0","0","0","0","1","1","0","1","0","1","1","0","1","-1"  ],
  ["Impervious Cover","decrease imperviousness","","avoid use/reduce impervious surface","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1"  ],
  ["","","vegetative buffer of storm water outlets, roads","veg. buffer of storm water outlets, roads","1","1","1","1","1","1","0","1","0","0","0","0","0","1","0","0","1","1","0","0","1","1","1","0","0","0","1","0","1","0","1","0","0","0","0","1","0"  ],
  ["","","storm water retention ponds","storm water retention ponds","1","1","1","0","1","0","0","1","1","0","0","1","0","0","0","0","1","0","0","0","0","0","0","0","0","0","1","0","1","0","1","0","0","0","0","1","-1"  ],
  ["","","Rain gardens, roof gardens","Rain gardens","1","1","1","0","1","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","1","1","0","0","0","0","1","0","1","0","1","0","0","1","1","1","-1"  ],
  ["Wetland Loss","increase storage - restore natural wetlands","","Wetland Restoration (651)","1","1","1","0","1","0","0","0","0","0","0","1","0","1","1","0","1","1","0","0","1","1","0","0","0","0","1","0","1","0","1","0","1","1","0","1","1"  ],
  ["","","Construct treatment wetlands","Constructed Treatment Wetlands ","1","1","1","0","1","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","1","0","1","0","1","0","1","1","0","1","0"  ],
  ["","","Saturated Buffer (tile runoff dispersed in riparian) ","Saturated Buffer (739)","1","1","1","1","0","0","1","1","1","0","0","0","0","1","0","0","0","0","0","0","1","1","0","0","0","1","1","0","1","0","0","0","1","1","0","0","-1"  ],
  ["","","Culvert downsizing, road retention","Culvert downsizing, road retention","0","1","1","0","0","0","0","0","1","-1","0","0","-1","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","1","0"  ],
  ["","","hold water and sediment - wascob","WASCOB (638)","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","1","0","1","0","0","1","0","1","-1"  ],
  ["Altered Watercourse","Re-meander or restore altered watercourse","","Stream re-meander/restoration","1","1","1","1","1","0","1","1","1","1","1","1","1","1","1","1","1","1","0","0","0","0","0","1","1","0","0","0","0","0","0","1","0","0","0","1","0"  ],
  ["","","buffer channelized streams","Ditch buffer","1","1","1","1","0","0","1","1","1","1","1","1","0","0","0","0","1","1","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","1","0"  ],
  ["","","create 2-stage ditch","Two Stage Ditch","1","1","1","1","0","0","1","1","1","1","1","0","0","0","0","0","1","1","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","1","0","1","1"  ],
  ["Water Withdrawal","reduce water use ","","Water Use Reductions","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1"  ],
  ["","","improve irrigation efficiencies","Irrigation Water Mgmt (442, 449)","0","1","1","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"  ],
  ["","","Controlled Subsurface drainage/Sub-irrigation","Controlled Subsurface Drainage (554, 587)","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","-1"  ],
  ["","","set protected flows","Set Protected Low Flows","0","0","0","1","0","0","0","0","0","1","1","1","1","1","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1"  ],
  ["Flow Variability","reduce flow manipulation/dam operation","","Reduce Dam manipulation of flow","0","0","0","0","0","0","1","1","1","1","1","1","1","0","1","1","1","1","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","1","-1"  ],
  ["","","increase landscape storage","Grade Stabilization Structure (410) ","1","1","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","0","0","0","1","-1"  ],
  ["","","controlled drainage","Controlled Subsurface Drainage (554)","0","-1","0","1","0","-1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","1","0","1","-1"  ],
  ["","","adjust/manage tile output","Tile system design, alternate intakes","0","1","1","1","0","1","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","1","0","0","0","0","0","0","1","-1"  ],
  ["GEOMORPHOLOGY","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["Soil Erosion Potential","NA - condition not directly changeable","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","improve soil health","Improve soil health","0","1","1","1","0","1","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","1","1","1","1","0","0","0","0","1","0","1","0"  ],
  ["","","Reduce / manage soil compaction (Field to stream)","Compaction management ","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","1","1","1","1","0","0","0","0","1","0","1","1"  ],
  ["","","Manure application","Nutrient mgmt (manure) (590) ","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","0","0","0","0","0","0","0","0","-1","0","0","-1","0","-1","0","-1"  ],
  ["","","stabilize/avoid destabilizing steep slopes","Terrace (600), Contour Farming, Buffer strips (330-332) ","1","1","1","0","0","0","0","0","0","0","0","0","0","0","1","0","1","0","1","0","1","1","1","0","0","1","1","1","1","0","0","0","","","","1","-1"  ],
  ["","","stabilize/avoid destabilizing steep slopes","Bluff and Shoreland Ordinance implementation","1","1","1","0","0","0","0","1","0","0","0","1","0","1","1","1","1","1","0","1","1","1","0","0","0","1","1","0","1","0","0","0","0","0","0","1","1"  ],
  ["","","increase vegetative cover on erodible soils ","No till, residue mgmt (330, 332) ","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","0","0","0","1","1","1","1","0","0","0","1","1","1","1","-1"  ],
  ["Groundwater Contamination Susceptibility","NA - condition not directly changeable","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","increase buffer of karst features","Vegetative Buffer of Karst Features","0","0","1","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","1","1","0","0","0","1","1","0","1","0","1","0","0","1","0","1","0"  ],
  ["","","avoid release of contaminates","Monitor/upgrade to septic systems ","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","0"  ],
  ["","","avoid release of contaminates","Limit land app. of manure/feedlot size, location","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","1","1","1","1","-1"  ],
  ["","","avoid release of contaminates","Land Use Controls in  sensitive GW areas","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","1","0","1","0","1","1","0","1","0","1"  ],
  ["Climate Vulnerability","NA - condition not directly changeable","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","prepare for extremes in precip -increase water storage","(See surface storage and altered watercourse) ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","prepare for extremes in precip - decrease runoff","(See soil erosion index)","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","prepare for warming temp.- disease,invasive - resilience","Manage invasive species - barriers","0","0","0","0","0","0","0","0","0","-1","0","-1","0","-1","-1","-1","-1","-1","0","0","0","0","-1","0","0","0","0","0","0","0","0","0","0","0","0","0","-1"  ],
  ["","","prepare for warming temp.- disease,invasive - resilience","Manage invasive species - increase resilience","0","0","0","0","0","0","1","1","0","1","0","1","1","1","1","1","1","1","0","1","1","1","1","0","0","1","0","1","0","0","0","0","1","0","1","0","1"  ],
  ["stream stability- future","Stream restoration","","Stream Restoration (pg94, field to stream)","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","0","0","0","0","1","1","1","1","0","1","0","1","0","0","1","0","1","1"  ],
  ["","Floodplain acquisition","","Floodplain acquisition or easement","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","0","0","0","0","0","1","0","1","1"  ],
  ["","","Riparian vegetation","Riparian Buffer (Field to Stream pg92)","1","1","1","1","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","0","1","1","1","0","0","0","1","0","0","1","0","1","0"  ],
  ["","","Riprap","Streambank protection - riprap 580","0","0","0","-1","0","0","0","-1","-1","0","0","-1","-1","-1","-1","-1","-1","-1","0","0","0","0","-1","0","0","1","1","0","0","0","0","0","0","0","0","0","-1"  ],
  ["","","Bioengineering banks","Streambank protection 580","0","0","0","0","0","0","1","1","1","0","0","-1","0","0","0","1","0","0","0","0","0","0","0","0","1","1","1","0","0","0","0","0","0","0","0","1","0"  ],
  ["BIOLOGY","","(ARE THESE RESPONSES OR ACTIONS??)","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["Terrestrial Habitat Quality","improve habitat condition - manage (remove stressors)","","(See Manage invasive spcs w/ reslience  - Geo-Climate index) ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","0","","0","","","0","","0"  ],
  ["","improve habitat condition - replant","","re-establish native plant communities","1","1","1","1","0","1","0","1","0","0","0","1","0","1","1","1","1","1","1","1","1","1","1","0","0","1","1","1","1","0","1","0","0","1","0","1","0"  ],
  ["","improve habitat condition - fire","","controlled burning","0","1","1","0","0","0","0","0","0","0","0","1","0","1","1","1","1","1","1","1","1","1","1","0","0","1","1","1","1","0","0","0","0","0","0","0","-1"  ],
  ["","improve habitat condition - inundation cycling","","(See Floodplain acquisition/easements - Geo-stream stability)","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","1"  ],
  ["","","Enhance and Connect Habitat Patches","Mandate or encourage private/public habitat improvement","1","1","1","0","0","0","0","0","0","0","0","1","0","1","1","1","1","1","1","1","1","1","1","0","0","1","0","1","0","0","0","0","0","0","0","0","-1"  ],
  ["Fish Index","Stock fish","","stock fish","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","-1"  ],
  ["Invertebrate Index","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["Mussels Index","Re-introduce mussels","","re-introduce mussels","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","1","1","0","0","0","0","0","1","1","0","0","0","0","1","0","1","0","0","0","0","1"  ],
  ["","","Maintain gw inputs (water temp. limited)  ","Maintain gw inputs (for cold water systems)  ","0","0","1","1","0","1","0","0","0","0","0","0","0","1","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"  ],
  ["","","improve habitat condition - instream/lake","Habitat Improvement projects","0","0","0","0","0","1","1","1","1","0","1","1","1","1","1","1","1","1","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0"  ],
  ["","","","(See Stream Restoration - Geo Stream Stability Index) ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","restore connectivity (aquatic)","(See Aquatic Conn - Obstruction removal)","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","","(See Aquatic Conn - Provide fish passage)","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["Animal Species Richness","Maintain, restore diversity - stock species","","Stock or reintroduce species","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","-1"  ],
  ["At-Risk Animal Spec. Richness","Maintain, restore diversity - stock species","","Stock or reintroduce species of greatest concern","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","-1"  ],
  ["","","improve habitat condition - instream","See Habitat Improvement Projects - Stream Spc Quality","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","improve habitat condition - upland","See Habitat Improvement - Terrestrial Habitat Quality","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","improve habitat connectivity - riparian","See Riparian Connectivity Index ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","protect sensitive habitats (life cycle)","See Purchase land / consrv. Easements - Terr Habitat Quality","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["CONNECTIVITY","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["Terrestrial Habitat Connectivity","Re-connect quality upland habitat ","","Create corridors to connect quality terrestrial habitat","1","1","1","0","0","0","0","0","0","0","0","1","0","1","1","1","1","1","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","1"  ],
  ["","","reduce impact of impervious surface use","wildlife highway bypass","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","-1"  ],
  ["","","expand upland perennial veg corridors","Purchase land / consrv. Easements","1","1","1","0","0","0","0","0","0","0","0","1","0","1","1","1","1","1","1","1","1","1","1","0","0","0","0","1","1","0","0","0","0","0","0","0","0"  ],
  ["","","","restore native habitat","1","1","1","0","0","0","0","0","0","0","0","1","0","1","1","1","1","1","1","1","1","1","1","0","0","1","1","1","1","0","0","0","0","0","0","0","-1"  ],
  ["","","reduce row crop ag","set aside programs, CRP, RIM etc.","1","1","1","0","0","1","0","0","0","0","0","1","0","1","1","1","1","1","1","1","1","1","1","0","0","1","1","1","1","0","0","0","1","0","1","0","0"  ],
  ["Riparian Connectivity","connect terrestrial/aquatic interface","buffer waterways","Implement buffer initiative","1","1","1","1","1","1","1","1","1","0","0","1","1","1","1","1","1","1","0","0","0","0","0","0","0","1","1","0","1","0","1","0","0","1","0","1","0"  ],
  ["","","increase floodplain access","See Floodplain Acquisition - Geo - stream Stability index","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","1"  ],
  ["Aquatic Connectivity","connect stream network/remove obstructions","","Dam Removal","0","0","0","0","-1","0","1","1","1","1","1","1","1","1","1","1","1","1","0","0","0","0","0","-1","1","0","0","0","0","0","0","0","0","0","1","0","1"  ],
  ["","","","Culvert redesign for fish passage","0","0","0","0","0","0","1","1","1","1","1","0","1","0","1","1","1","1","0","0","0","0","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0"  ],
  ["","","","Provide fish passage","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","-1"  ],
  ["","reduce/remove WQ pollution disconnects (endocrine disruptions, DO, Temp.","","Remove WQ chemical and temperature barriers","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","","0","0","0","0","0","0","0","0","0","0","1","1","1","0","0","0","0","0"  ],
  ["WATER QUALITY","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["Localized Pollution Sources","Reduce localized inputs","","Reduce point source inputs","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","0","0","0","0","0"  ],
  ["","","Remove contaminants:  ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","intercept delivery from feedlots, (bacteria)","riparian buffers, karst feature buffer","0","1","1","1","0","0","0","","","","","","","","","","","","","","","","","","","","","","","0","1","0","","","0","1","-1"  ],
  ["","","","Feedlot /WW Filter Strip (635) Runoff Diversion (362)","0","1","1","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","0","1","1","1","1","1"  ],
  ["","","","exclusion (382) fencing (472)","0","0","0","0","0","0","1","1","0","1","0","1","1","1","1","1","0","1","0","1","1","1","0","0","0","0","0","0","0","1","1","0","1","0","0","0","0"  ],
  ["","","","rotational grazing","1","1","1","0","0","0","1","1","0","0","0","0","1","1","0","1","0","0","1","1","1","1","1","0","0","1","1","1","1","1","1","0","1","1","1","1","-1"  ],
  ["","","intercept delivery of chemical pollutants","? (superfund, potential contaminants, mines)","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","0","1","1","","","0","0","-1"  ],
  ["","","intercept delivery of phosphorus from WWTP","?","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","0","1","1","","","0","1","-1"  ],
  ["","","avoid release of  contaminants from septics","Monitor/upgrade to septic systems ","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","0"  ],
  ["Non-Point Source","reduce nonpoint sediment/ phosphorus","","See Perennial Cover actions? Or maybe there are no specific actions for this broad category? ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""  ],
  ["","","intercept delivery of sed/P  with vegetation","","","","","","","","","","","","","","","","","","","","","","1","1","1","0","0","0","1","0","1","0","1","0","","","0","1","0"  ],
  ["","","intercept delivery of sed/P with structures","","","","","","","","","","","","","","","","","","","","","","","","","0","0","0","1","0","1","0","1","0","","","0","1","-1"  ],
  ["Assessments","improve Aquatic Life","","See Stream Spc Quality index? ","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","0","1","1","","","0","1","-1"  ],
  ["","improve Aquatic Recreation","increase D.O. , decrease algae","Aerate water,","","","","","","","","","","","","","","","","","","1","","","","","","","","","","","","","","","","","","","-1"  ],
  ["","decrease Aquatic Consumption risk","Reduce airborne mercury? ","Air quality controls on coal burning plants","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","-1"  ]
]