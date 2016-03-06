function askDNR(service, show){		//Gets data for landuse from the server, populates it in 'WHAFapp.landuseData' object. 
										//service is a string representing the layer number for the service (i.e. '0' for catchment, '1' for upstream)
	var h,c, xhr,f, q, txt, txt1, chartTitle, scale, majorName, catchId, catchmentName, basinName, majorNumber;
	var catch_id=WHAFapp.currentMapParams.Catchment;
	var major=WHAFapp.currentMapParams.crossmajor;
	var huc4=WHAFapp.currentMapParams.crossHuc4;
	// if(charts.status=false){return};
	if (catch_id== undefined || major== undefined || huc4== undefined ){alert("Please select a map location."); return}
	
	xhr = new XMLHttpRequest();
	serviceUrl='http://arcgis.dnr.state.mn.us/arcgis/rest/services/ewr/whaf_watersheddata/MapServer/'+service+'/'
	query='query?where=catch_id%3D%27'+catch_id+'%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=json'
	queryMjr='query?where=major+%3D+'+major+'&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson'
	queryBsn='query?where=HUC4%3D%27'+huc4+'%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson'
	if(service==0){q=serviceUrl+query;scale='Catchment'}else if(service==1){q=serviceUrl+query;scale='Upstream'} else if(service==2){q=serviceUrl+query;scale="Downstream"}else if (service==3){q=serviceUrl+queryMjr;scale='Major Watershed'}else if (service==4){q=serviceUrl+queryBsn; scale='Basin'}
	$('#loader').show();
	xhr.open('GET', q); 
	xhr.send(null);

	xhr.onreadystatechange = function () {
		var c;
		console.log(xhr.readyState);

	    if (xhr.readyState < 4){
	                             // while waiting response from server
	        }// $('#misc').html('Loading...')
	    else if (xhr.readyState === 4) {                // 4 = Response from server has been completely loaded.
	        console.log(xhr.status);
	        if (xhr.status == 200 && xhr.status < 300){  // http status between 200 to 299 are all successful
	            h=xhr.responseText;
	            c=jQuery.parseJSON( h );
	            console.log(c);
	            if (c.features === undefined || c.features[0] === undefined){
		        	$('#loader').hide();
		        	alert("Unable to get data for this location. Please verify that the location is set inside Minnesota.");
		        	return;
	            }

            	// if(service==0){$('#landUseChartsArea').html('Land Area: '+ c.features[0].attributes.CATCH_ID);}
            	// else if(service==1){$('#landUseChartsArea').html('Land Area: '+ c.features[0].attributes.CATCH_ID);} 
            	// else if(service==2){$('#landUseChartsArea').html('Land Area: '+ c.features[0].attributes.CATCH_ID);}
            	// else if (service==3){$('#landUseChartsArea').html('Land Area: '+ c.features[0].attributes.major);}
            	// else if (service==4){$('#landUseChartsArea').html('Land Area: '+ c.features[0].attributes.HUC4);}
	            //$('#landUseChartsArea').html( Land Areac.features[0].attributes.CATCH_ID);
	            WHAFapp.landuseData[service]= c.features[0].attributes//.CATCH_ID  
	            
				areaInSqMeters= 'st_area(shape)'

				var r = WHAFapp.landuseData[service][areaInSqMeters]/4046.86
				var s = WHAFapp.landuseData[service][areaInSqMeters]/2590000
				var c = addCommas(r.toFixed(0))
				var d = addCommas(s.toFixed(2))
				o='Land Area: '+c+' Acres ('+d+' Square Miles)'
				$('#landUseChartsArea').html(o)

	            drawChart(service);
	        }   
	    }   
	};
	majorName=WHAFapp.currentMapParams.majorname//selectedWatershed.name;
	majorNumber=WHAFapp.currentMapParams.crossmajor//selectedWatershed.number;
	catchmentName=WHAFapp.currentMapParams.CatchmentName;
	catchId = WHAFapp.currentMapParams.Catchment;
	basinName=HUC_4s[WHAFapp.currentMapParams.crossHuc4];

	if(service==0){chartTitle="Catchment Land Cover"; txt1="DNR-catchment "+catchId; if (catchmentName!= undefined){txt1=txt1+" ("+catchmentName+")"}}
	else if(service==1){chartTitle="Upstream Land Cover"; txt="DNR-catchment "+catchId; if (catchmentName!= undefined){txt=txt+" ("+catchmentName+")"}; txt1=txt+" and its upstream catchments"} 
	else if(service==2){chartTitle="Downstream Land Cover"; txt="DNR-catchment "+catchId; if (catchmentName!= undefined){txt=txt+" ("+catchmentName+")"}; txt1=txt+" and its downstream catchments"}
	else if (service==3){chartTitle="Major Watershed Land Cover"; txt1="Major Watershed: "+majorName+" ("+majorNumber+")" }
	else if (service==4){chartTitle="Basin Land Cover"; txt1="River Basin: "+basinName}
	$('#landUseChartsTitle').text(txt1);
	$('#mainChartsTitle').text(chartTitle);
	console.log(majorName, catchmentName, basinName)



}

function drawChart(service) {
	var cdlRange=[], nlcdRange=[],cdlRows=[['Year']];
	var cdlCheckParam='cdl_wheat_', nlcdCheckParam='nlcd_water_';
	var cdlCategories=[['CDL_CORN_','CORN'],['CDL_LEGUMES_','SOY BEANS & LEGUMES'],['CDL_HAY_FORAGE_','HAY FORAGE'],['CDL_SUGARBEETS_','SUGARBEETS'],['CDL_WHEAT_','WHEAT'], ['CDL_OTHER_MISC_','OTHER MISC'],['CDL_GRAINS_AND_SEEDS_', 'GRAINS AND SEEDS'], ['CDL_POTATOES_', 'POTATOES']];
	for (var key in WHAFapp.landuseData[service]) {
		  if (WHAFapp.landuseData[service].hasOwnProperty(key) && key.slice(0,-4)==cdlCheckParam) {
		    var t=key.slice(-4);
		    cdlRange.push(t)
	      }
	      if (WHAFapp.landuseData[service].hasOwnProperty(key) && key.slice(0,-4)==nlcdCheckParam) {
		    var b=key.slice(-4);
		    nlcdRange.push(b)
	      }
		}

	////CDL Chart Generator/////
	for (var f=0; f<cdlCategories.length; f++){
		cdlRows[0].push(cdlCategories[f][1])
	}
	for (var y=0; y<cdlRange.length; y++){
		var year=cdlRange[y];
		var row=[year];
		for (var t=0; t<cdlCategories.length; t++){
	        var r=cdlCategories[t][0].toLowerCase()
	        console.log(r)
	 	    var b=r+year
		    var l=WHAFapp.landuseData[service][b]
		    row.push(l)
		}
		cdlRows.push(row)
	}

	var CDL_data = google.visualization.arrayToDataTable(cdlRows); 

    var CDL_options = {
    	fontSize:9,
		// legend:{textStyle: {fontSize: 8}},
		// vAxis:{TextStyle:{fontSize: 3}},
		chartArea:{left:45,top:15,width:'60%',height:'70%'},
		width: 450,
		height: 190,
		isStacked:false,
		lineWidth:2,
		explorer: { actions: ['dragToZoom', 'rightClickToReset'] },
		tooltip:{tigger:'focus'},
		areaOpacity:0,
		series: {
			0:{color: 'rgb(255,211,0)'},
			1:{color: 'rgb(35,114,0)'},
			2:{color: 'rgb(255,165,226)'},
			3:{color: 'rgb(168,0,229)'},
			4:{color: 'rgb(165,112,0)'},
			5:{color: 'rgb(255,102,102)'},
			6:{color: 'rgb(214,158,188)'},
			7:{color: 'rgb(114,35,0)'}
		},
		vAxis: {
          title: 'Percent of Land Area',
        }
	};

	var chart1 = new google.visualization.AreaChart(document.getElementById('CDL_chart_div'));
	charts.cdl=chart1;

	charts.cdl.draw(CDL_data, CDL_options);
	// image=charts.first.getImageURI();
	//------------------------------------------------------------------------------//


	////NLCD Chart Generator/////
	var nlcdCategories=[['NLCD_WATER_','WATER'],['NLCD_DEVELOPED_','DEVELOPED'],['NLCD_FOREST_','FOREST'],['NLCD_UPLAND_NATURAL_','SHRUB & HERBACEOUS'],['NLCD_CULTIVATED_','CULTIVATED'],['NLCD_WETLANDS_','WETLAND']];

	console.log(nlcdRange);
	var nlcdRows=[['Land Cover']];
	for (var n=0; n<nlcdRange.length; n++){
		nlcdRows[0].push(nlcdRange[n]);
		// nlcdRows[0].push({type: 'string', role: 'annotation'});
	}
	console.log(nlcdRows)
	for (var y=0; y<nlcdCategories.length; y++){
		var lCover=nlcdCategories[y][1];
		var llCover=nlcdCategories[y][0].toLowerCase();
		var row=[lCover];
		for (var t=0; t<nlcdRange.length; t++){
	        var r=nlcdRange[t]
	 	    var b=llCover+r
		    var l=WHAFapp.landuseData[service][b]
		    var ll=String(l);
		    row.push(l);
		    // row.push(ll);
		}
		nlcdRows.push(row)
	}

	console.log(nlcdRows)


     var data = google.visualization.arrayToDataTable(nlcdRows);

      var options = {
		fontSize:9,
        chartArea:{top:15,left:120,height:'70%',width:'55%'},
        colors: ['#80abd5', '#548dc6','#336699'],
        width: 450,
        height: 190,
        hAxis: {
          title: 'Percent of Total Area',
          minValue: 0,
        },
        vAxis: {
 
        }
      };

      var chart2 = new google.visualization.BarChart(document.getElementById('NLCD_chart_div'));
      charts.nlcd=chart2;
      charts.nlcd.draw(data, options);

      if (charts.status==false){chartDrag(); charts.status=true} //places chart div in page and makes it draggable. 
	  else{$('#cdlChartPlace').show()};
	  $('#loader').hide();
}

