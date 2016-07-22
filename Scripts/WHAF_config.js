//This file contains a variety of global objects for easy reference

WHAFconfig={

    tableColors:{
        low:'rgb(216, 75, 42)',
        high:'rgb(122, 162, 92)',
        medium:'#777777'
    },

	healthActions:{//actions listed in 'health concern' box of DSS

		'Hyd Index - Perennial Cover, 2011': {
		    change: ['Increase amount of perennial vegetation'],
		    mitigate: ['Add cover crops to crop rotation']
		}, 'Hyd Index - Impervious Cover, 2011': {
		    change: ['Decrease amount of Impervious cover'],
		    mitigate: ['Vegetative buffer of outflows and roads']
		}, 'Hyd Index - Water Withdrawal': {
		    change: ['Decrease water use'],
		    mitigate: ['improve irrigation efficiency','Set protected flows']
		}, 'Hyd Index - Water Withdrawal, Predicted Vulnerability': {
		    change: [],
		    mitigate: [],
		    note:''
		}, 'Hyd Index - Loss of Hydrologic Storage': {
		    change: [],
		    mitigate: [],
		    note:'This index is a combination of the two subsequent metrics: Wetland Loss and Altered Watercourses'
		}, 'Hyd Metric - Loss of Hydrologic Storage, Wetland Loss': {
		    change: ['Restore wetlands and drained lakes'],
		    mitigate: ['Hold and meter out excess runoff']
		}, 'Hyd Metric - Loss of Hydrologic Storage, Altered Watercourse': {
		    change: ['Re-meander or restore altered watercourses'],
		    mitigate: ['Buffer channelized streams']
		}, 'Geo Index - Soil Erosion Potential': {
		    change: [],
		    mitigate: []
		}, 'Bio Index - Terrestrial Habitat Quality': {
		    change: [],
		    mitigate: []
		}, 'Bio Metric - Mussel Score': {
		    change: [],
		    mitigate: []
		}, 'Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI': {
		    change: [],
		    mitigate: []
		}, 'Bio Metric - Stream Species Quality, Fish IBI': {
		    change: [],
		    mitigate: []
		}, 'Con Index - Aquatic Connectivity': {
		    change: [],
		    mitigate: []
		}, 'Con Index - Riparian Connectivity': {
		    change: [],
		    mitigate: []
		}, 'WQ Index - Localized Pollution Sources': {
		    change: [],
		    mitigate: []
		}, 'WQ Metric - Localized Pollution Sources, Animal Units': {
		    change: [],
		    mitigate: []
		}, 'WQ Metric - Localized Pollution Sources, Potential Contaminants': {
		    change: [],
		    mitigate: []
		}, 'WQ Metric - Localized Pollution Sources, Septic Systems': {
		    change: [],
		    mitigate: []
		}, 'WQ Metric - Localized Pollution Sources, Wastewater Treatment Plants': {
		    change: [],
		    mitigate: []
		}, 'WQ Metric - Localized Pollution Sources, Superfund Sites': {
		    change: [],
		    mitigate: []
		}, 'WQ Metric - Localized Pollution Sources, Open Pit Mines': {
		    change: [],
		    mitigate: []
		}, 'WQ Metric - Non-Point Source, Phosphorus Risk': {
		    change: [],
		    mitigate: []
		}, 'WQ Index - Water Quality Assessments, Aquatic Life': {
		    change: [],
		    mitigate: []
		}, 'WQ Index - Water Quality Assessments, Aquatic Recreation': {
		    change: [],
		    mitigate: []
		}, 'WQ Index - Water Quality Assessments, Aquatic Consumption': {
		    change: [],
		    mitigate: []
		}		
	}
}

bingKey = 'ApJTJDoA38tLfDX-jEP7t-wmEGpJexl4-KPkGmPF2INKLLnm2h9a4KXsILBjoEuB'
//object containing all alyers that populate the context section of the  DSS. 
//Consumed by the charScroll() function 
//the url property is identical to that used by the app to populate layers with the 'share url' function. 
//the url property can be easily accessed through firebug console: with the desired map layers displayed, click the share url button on the app and a string with url parameters should log on the console, including 'auxFtLst=', which is the the string for the url property in this object.  
charLayers = [{ 
    "section": "1. Physical context",
    "title": "Topography",
    "url": [],
    "text": "Topography is a foundational landscape condition. The elevation and slope of the land affects factors as diverse as wind, water flow, temperature and land use. Elevation change or 'relief' is the amount a geographic area varies in its height above sea level. Minnesota's landscapes range from the flat Red River Valley basin in the west, to steep slopes and bluffs near Lake Superior and along the Minnesota, Mississippi and St. Croix rivers.<br><br>The steepness and length of slopes impacts other landscape features. Slope concentrates water flows leading to the formation of streams and rivers. Soil erosion also accelerates on long steep slopes. Historically, steep slopes have been less used for agriculture and human development. Important remnant native plant and animal communities are now often found on steep slopes.",
    "check":function (){
        manualHillShadeSet('on');
        changeHillOpacity(85);
        $("#hillSlider").slider("value", 85);
        }
    }, {
        "section": "1. Physical context",
        "title": "Ecological Classifications",
        "url": '1.28,0,0]1.29,0,0]1.3,0,0]1.31,1,0]',
        "text": "The Ecological Classification System is a system developed by the MN DNR and US Forest Service for mapping and classifying landscape ecosystems. The system provides a nested set of classification units which, from broadest to most detailed, includes: Provinces, Sections, Subsections and Land Type Associations. Each scale maps progressively more uniform ecological features, including climate, geology, topography, soils, hydrology and vegetation. These patterns represent different correlated landscape features and can help guide appropriate resource management approaches across different spatial scales. Detail about each different <a target='_blank' href='http://www.dnr.state.mn.us/ecs/index.html'> classification</a> is available on the MN DNR website.<br><br> <strong>Provinces</strong> are units of land defined using major climate zones, native vegetation, and biomes such as prairies, deciduous forests, or boreal forests.<br><br><strong>Sections</strong> are units within Provinces that are defined by origin of glacial deposits, regional elevation, distribution of plants, and regional climate.<br><br><strong>Subsections</strong> are units within Sections that are defined using glacial deposition processes, surface bedrock formations, local climate, topographic relief, and the distribution of plants, especially trees. <br><br><strong>Land Type Associations</strong> are units within Subsections that are defined using glacial landforms, bedrock types, topographic roughness, lake and stream distributions, wetland patterns, depth to ground water table, soil parent and pre-European settlement vegetation." 
    }, {
        "section": "1. Physical context",
        "title": "Hydrologic Position",
        "url": '1.11,0,0]1.13,0,0]1.12,0,0]1.14,0,0]1.15,1,0]2.1',
        "text": "The hydrologic position maps help to illustrate where each watershed catchment resides on the landscape in relationship to neighboring catchments. This relationship is based on the location of the mouth or 'pour point' of each catchment and the area that is upstream of that point. The amount of land area upstream influences the amount of water that leaves or ‘discharges’ from the mouth of each catchment.<br><br> Headwater catchments are shown in white. These areas do not receive overland water flow from upstream but rather collect surface water within their boundary and send it downstream. In contrast, those catchments that encompass a major river receive flow from all catchments upstream. The mouth of major rivers accumulate all the water from the upstream river basin and have the largest water discharge amounts shown in dark blue. <br><br> In addition to knowing how catchments are related to each other within a major watershed, it is important to know how a location is related to other hydrologic scales. By selecting a location inside of the Root River Watershed, the nested extent of different contributing areas can be displayed."
    }, {
        "section": "1. Physical context",
        "title": "Soils - Percent Sand",
        "url": '2.12,0,0]1.11,0,0]1.12,0,0]1.13,0,0]1.14,0,0]2.11,0,0]1.53,1,0]1.54,0,0]1.55,0,0]1.56,0,0]',
        "text": "<div>Soil texture results from the relative amount of sand, silt and clay present in the soil. These particle types vary in size from clay particles (&lt; .002 mm), to silt (.002 - .05mm) to sand particles (&gt; .05mm). The combination and relative amount of each particle type influences many soil properties.<br><br></div><div class='offset4 span4'><img class='img-rounded info2Image' src='./img/texture-triangle.jpg'></div><div class='span12' ><br>This chart shows the relationship between some common soil texture classes and the relative amount of each particle type. Soil texture in turn influences soil erodibility, permeability and suitability for various uses. (Source: soils4teachers.org/physical-properties)<br><br> Organic matter is an important factor affecting soil physical properties such as water infiltration rate and water and nutrient holding capacity. Unlike particle size, the amount of organic matter can change; it can be either enhanced or depleted in response to land management activities.</div>"
    }, {
        "section": "1. Physical context",
        "title": "Groundwater",
        "url": "1.11,0,0]1.57,0,0]1.58,1,0]",
        "text": "The <a target='_blank' href='http://www.dnr.state.mn.us/waters/groundwater_section/mapping/gwcontam_susceptibility.html'> Groundwater Contamination Susceptibility</a> layer uses four parameters (aquifer materials, recharge potential, soil materials, and vadose zone materials) to delineate areas of relative susceptibility to ground water contamination. The range of relative susceptibility across the state reflects the rate at which contamination would likely reach groundwater resources. <br><br>The <a target='_blank' href='http://www.dnr.state.mn.us/groundwater/provinces/index.html'> six ground water provinces</a> of the state are based on bedrock and glacial geology. Within each province, groundwater sources and the availability of ground water for drinking water, industrial, and agricultural uses are similar."
    }, {
        "section": "1. Physical context",
        "title": "Climate",
        "url": "1.11,0,0]1.77,1,0]1.76,0,0]",
        "text": "Minnesota’s landscape is located at the intersection of three distinct ecological biomes. Precipitation and temperature play an important role in defining the boundaries of these biomes. These two climate trends show different statewide patterns which create a range of temperature and precipitation combinations."
    }, {
        "section": "2. Landscape Alteration",
        "title": "Historic Landscape",
        "url": "1.11,0,0]1.24,1,0]",
        "text": "Marschner’s Pre-European Settlement Vegetation Map is interpreted from Public Land Survey notes from the 1890’s. This map gives an insight into the distribution of vegetation before non-Native Americans began to significantly impact the land cover patterns of Minnesota."
    },{
        "section": "2. Landscape Alteration",
        "title": "Land Cover (NLCD)",
        "url": "1.11,0,0]1.26,0,0]1.25,1,0]",
        "text": "Land cover data provides information on current and past land use patterns primarily derived from satellite and aerial imagery. The National Land Cover Database is a nation-wide data set classifying all lands into one of 16 categories. Every five years, an update of land cover is completed giving land cover trends over time. The most recent layer currently available relies on imagery gathered in 2011. The chart compares the extent of certain land cover types in 2001, 2006 and 2011 for the Root River Watershed."
    }, {
        "section": "2. Landscape Alteration",
        "title": "Crop Data Layer",
        "url": "1.11,0,0]1.27,1,0]",
        "text": "The Crop Data Layer gives detail about the amount of various types of agriculture cultivation. By comparing the proportion of each crop type grown, the chart shows how the ratios fluctuate over time. "
    }, {
        "section": "2. Landscape Alteration",
        "title": "Biodiversity Areas",
        "url": "1.11,0,0]1.33,1,0]1.32,1,0]",
        "text": "Minnesota Biological Survey ecologists rank the biodiversity of habitat sites based on the presence of rare species populations, the size and condition of native plant communities within the site, and the landscape context. In many areas of Minnesota, remaining sites occur primarily along steep slopes and near water features, while most of the upland has been converted to human use."
    }, {
        "section": "2. Landscape Alteration",
        "title": "Change in Water Storage",
        "url": "1.11,0,0]1.13,1,0]1.48,1,0]1.41,0,0]1.49,0,0]",
        "text": "In much of Minnesota, the historic landscape had many more seasonal and perennial wetlands. Land has been drained using ditches and tile lines, streams have been straightened to accommodate agriculture, communities and roads. The scale of this change has accelerated the rate at which rainfall moves through entire the system creating rapid fluctuations in Minnesota’s stream and lake levels.<br><br> An analysis of the terrain and soil type was used to create an inventory of places to consider restoring wetlands statewide. This inventory gives an indication of the extent of water storage areas that have been lost through land use conversion. "
    }, {
        "section": "3. Social context",
        "title": "Population Density",
        "url": "1.11,0,0]1.71,1,0]1.7,0,0]1.73,0,0]",
        "text": "The distribution of human populations on the landscape is the primary driver of land use patterns over time. As population distributions change over time, the types of land use pressure and impacts change. <br><br>"
    }, {
        "section": "3. Social context",
        "title": "Population Change",
        "url": "1.11,0,0]1.72,1,0]1.71,0,0]1.7,0,0]1.73,0,0]",
        "text": "This map represents change in population between the 2000 and 2010. The population values were aggregated to the catchment watershed boundary in order to compare the 2000 and 2010 census data sets. Loss of population is shown in shades of blue with population gains in shades of red. "
    },{
        "section": "3. Social context",
        "title": "",
        "url": [],
        "text": "",
        "link":'http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/0',
        "check":function (){
            extLyrDem(this.link)
        }
    },{
        "section": "3. Social context",
        "title": "",
        "url": [],
        "text": "",
        "link":'http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Projected_Population_Change/MapServer/0',
        "check":function (){
            extLyrDem(this.link)
        }
    },{
        "section": "3. Social context",
        "title": "",
        "url": [],
        "text": "",
        "link":'http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_1990-2000_Population_Change/MapServer/0',
        "check":function (){
            extLyrDem(this.link)
        }
    },{
        "section": "3. Social context",
        "title": "",
        "url": [],
        "text": "",
        "link":'http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_2000-2010_Population_Change/MapServer/0',
        "check":function (){
            extLyrDem(this.link)
        }
    },{
        "section": "3. Social context",
        "title": "",
        "url": [],
        "text": "",
        "link":'http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Unemployment_Rate/MapServer/0',
        "check":function (){
            extLyrDem(this.link)
        }
    },{
        "section": "3. Social context",
        "title": "",
        "url": [],
        "text": "",
        "link":'http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Diversity_Index/MapServer/0',
        "check":function (){
            extLyrDem(this.link)
        }
    },{
        "section": "3. Social context",
        "title": "",
        "url": [],
        "text": "",
        "link":'http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Median_Household_Income/MapServer/0',
        "check":function (){
            extLyrDem(this.link)
        }
    },{
        "section": "3. Social context",
        "title": "",
        "url": [],
        "text": "",
        "link":'http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Percent_Over_64/MapServer/0',
        "check":function (){
            extLyrDem(this.link)
        }
    },{
        "section": "3. Social context",
        "title": "",
        "url": [],
        "text": "",
        "link":'http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Projected_Population_Change/MapServer/0',
        "check":function (){
            extLyrDem(this.link)
        }
    }
]

//Object containing the language and titles for the DSS help menu
DSS_helpItems={
    "step1":{
      "title":"Step 1: what scale?",
      "text":"In this step, you may select a location on the map and view some spatial scales that are relevant for your investigation. You may select a point on the map or select a 'major watershed"
    },
    "step2":{
      "title":"Step 2: watershed context",
      "text":"This step offers multiple map layers that characterize the selected watershed. Use the 'next' or 'back' arrows to loop through these layers, and select whether to keep or dismiss them in a report.<br><br> Note that each step populates different layers in the 'additional layers' box, which you may toggle on or off."
    },
    "step3":{
      "title":"Step 3: health conditions (overview)",
      "text":"This step offers an overview of all health condition indices available for the selected location, in various scales.<br><br> Hover over a row to see maps for that index, and check the boxes for the indices of interest. The next step offers an in-depth view of each index. You may loop through all available indices or limit your examination to indices checked on this table."
    },
    "step4":{
      "title":"Step 4: health conditions (detailed)",
      "text":"This step offers multiple analyses of watershed health. Click the 'next' or 'back' arrows to loop through all indices, and view their descriptions. You may add layers to the map view, write notes about your findings and determine how relevant each index is for your investigation. Click 'dismiss' if an index is not relevant at all."
    },
    "step5":{
      "title":"Get report",
      "text":"Under development"
    },
    "stepedit":{
      "title":"Edit map from report:",
      "text":"Changes you make to the map will be saved to your report, including map layers, title and notes."
    }  
}

//index names to be excluded from DSS loop
indexExclude = ['Predicted Vulnerability'] 
metricIndent = ['Altered Watercourse','Wetland Loss','Animal Units','Potential contaminants','Superfund Sites','Wastewater Treatment Plants','Open Pit Mines','Septic Systems']
                                                                                            
//DSS decision matrix
DesiredSystemImpacts=['ET+','Runoff-','Infiltrate+','Interflow','Storage surface+','GW Recharge','Bed bank stability+','boundary cond.+','Stream energy-','Strm long. connect+','Dissolved Oxygen+','Spcs divers+','Veg. vigor+','Photosynth+','Carbon seq.+','Tr habitat conn+','Sed.  channel source','Sed channel delivery','Sed hillslope source','Sed hillslope delivery','Sed upland source','Sed overland flow delivery','Contaminant source-','Contaminant delivery-','Chem in solution','Nutrient source','Nutrient delivery']

fieldNameByIndex={
    "Perennial Cover": "h_i_pc_11",
    "Impervious Cover": "h_i_ic_11",
    "Water Withdrawal": "h_i_ww",
    "Hydrologic Storage":"h_i_lhs",
    "Altered Watercourse": "h_m_lhs_aw",
    "Wetland Loss": "h_m_lhs_wl",
    "Soil Erosion Potential": "g_i_sep",
    "Terrestrial Habitat Quality": "b_i_th",
    "Fish Index": "b_m_ssq_fi",
    "Invertebrate Index": "b_m_ssq_ii",
    "Mussels Index": "b_m_ssq_ms",
    "Aquatic Connectivity": "c_i_ac",
    "Riparian Connectivity": "c_i_rc",
    "Upland Phosphorus": "w_m_nps_pr",
    "Localized Pollution Sources": "w_i_ps",
    "Animal Units": "w_m_ps_a",
    "Potential contaminants": "w_m_ps_pc",
    "Superfund Sites": "w_m_ps_sf",
    "Wastewater Treatment Plants": "w_m_ps_wtp",
    "Open Pit Mines": "w_m_ps_opm",
    "Septic Systems": "w_m_ps_ss"
}

compByIndex={
    "Hydrology Mean": "HYDROLOGY",
    "Perennial Cover": "HYDROLOGY",
    "Impervious Cover": "HYDROLOGY",
    "Water Withdrawal": "HYDROLOGY",
    "Predicted Vulnerability": "HYDROLOGY",
    "Hydrologic Storage": "HYDROLOGY",
    "Altered Watercourse": "HYDROLOGY",
    "Wetland Loss": "HYDROLOGY",
    "Flow Variability": "HYDROLOGY",
    "Geomorphology Mean": "GEOMORPHOLOGY",
    "Soil Erosion Potential": "GEOMORPHOLOGY",
    "stream stability- future": "GEOMORPHOLOGY", 
    "Groundwater Contamination Susceptibility": "GEOMORPHOLOGY",
    "Climate Vulnerability": "GEOMORPHOLOGY",
    "Biology Mean": "BIOLOGY",
    "Terrestrial Habitat Quality": "BIOLOGY",
    "Stream Species Quality": "BIOLOGY",
    "Fish Index": "BIOLOGY",
    "Fish Index (extrapolated)": "BIOLOGY",
    "Invertebrate Index": "BIOLOGY",
    "Invertebrate Index (extrapolated)": "BIOLOGY",
    "Mussels Index": "BIOLOGY",
    "Mussels Index (extrapolated)": "BIOLOGY",
    "Animal Species Richness": "BIOLOGY",
    "At-Risk Animal Spec. Richness": "BIOLOGY",
    "Connectivity Mean": "CONNECTIVITY",
    "Terrestrial Habitat Connectivity": "CONNECTIVITY",
    "Aquatic Connectivity": "CONNECTIVITY",
    "Riparian Connectivity": "CONNECTIVITY",
    "Water Quality Mean": "WATER QUALITY",
    "WQ Index - Non-Point Source (major)": "WATER QUALITY",
    "Non-Point Source": "WATER QUALITY",
    "Phosphorus Risk": "WATER QUALITY",
    "Upland Phosphorus": "WATER QUALITY",
    "Localized Pollution Sources": "WATER QUALITY",
    "Animal Units": "WATER QUALITY",
    "Potential contaminants": "WATER QUALITY",
    "Superfund Sites": "WATER QUALITY",
    "Wastewater Treatment Plants": "WATER QUALITY",
    "Open Pit Mines": "WATER QUALITY",
    "Septic Systems": "WATER QUALITY",
    "Assessments": "WATER QUALITY"
}

systemBenefits = {"Increase Evapotranspiration":{"components":["HYDROLOGY","BIOLOGY"],"desc":""},"Decrease Runoff":{"components":["HYDROLOGY","BIOLOGY"],"desc":""},"Increase Infiltration ":{"components":["HYDROLOGY","BIOLOGY"],"desc":""},"Increase Interflow ":{"components":["HYDROLOGY"],"desc":""},"Increase  Surface Water Storage":{"components":["HYDROLOGY","BIOLOGY"],"desc":""},"Increase Groundwater Recharge":{"components":["HYDROLOGY","GEOMORPHOLOGY"],"desc":""},"Stabilize Bed and Bank ":{"components":["GEOMORPHOLOGY","WATER QUALITY"],"desc":""},"Improve Boundary Condition":{"components":["GEOMORPHOLOGY","WATER QUALITY"],"desc":""},"Decrease Stream /Wave Energy":{"components":["GEOMORPHOLOGY","WATER QUALITY"],"desc":""},"Increase Longitudinal Connectivity":{"components":["GEOMORPHOLOGY","CONNECTIVITY"],"desc":""},"Increase Dissolved Oxygen":{"components":["WATER QUALITY"],"desc":""},"Increase Nesting/  Rearing Habitat":{"components":["BIOLOGY","CONNECTIVITY"],"desc":""},"Increase Pool Riffle Habitat":{"components":["GEOMORPHOLOGY","BIOLOGY","CONNECTIVITY"],"desc":""},"Connect Mosaic of Habitat Types":{"components":["BIOLOGY","CONNECTIVITY"],"desc":""},"Increase Refugia":{"components":["BIOLOGY","CONNECTIVITY"],"desc":""},"Increase Spawning/Breeding Habitat":{"components":["BIOLOGY","CONNECTIVITY"],"desc":""},"Increase  Species Dispersal":{"components":["BIOLOGY","CONNECTIVITY","WATER QUALITY"],"desc":""},"Increase Species Diversity":{"components":["BIOLOGY","CONNECTIVITY","WATER QUALITY"],"desc":""},"Improve Soil Health/Increase  Organic Matter":{"components":["HYDROLOGY","GEOMORPHOLOGY"],"desc":""},"Improve Vegetative Vigor ":{"components":["BIOLOGY"],"desc":""},"Increase Rate of Photosynthesis ":{"components":["BIOLOGY"],"desc":""},"Increase Carbon Sequesetration":{"components":["GEOMORPHOLOGY","BIOLOGY"],"desc":""},"Increase Connectivity of Upland Habitat ":{"components":["BIOLOGY","CONNECTIVITY"],"desc":""},"Stablize  Sediment In Channel ":{"components":["GEOMORPHOLOGY","WATER QUALITY"],"desc":""},"Decrease Delivery of In Channel Sediment":{"components":["GEOMORPHOLOGY","CONNECTIVITY","WATER QUALITY"],"desc":""},"Decrease Sediment from Hillslopes ":{"components":["GEOMORPHOLOGY","WATER QUALITY"],"desc":""},"Intercept Hillslope Sediment":{"components":["HYDROLOGY","GEOMORPHOLOGY","CONNECTIVITY","WATER QUALITY"],"desc":""},"Decrease Sediment from  Upland ":{"components":["GEOMORPHOLOGY","WATER QUALITY"],"desc":""},"Intercept   Overland Flow Sediment":{"components":["HYDROLOGY","GEOMORPHOLOGY","WATER QUALITY"],"desc":""},"Decrease source of chemical-bacterial contaminants":{"components":["WATER QUALITY"],"desc":""},"Decrease delivery of chemical-bacterial contaminants ":{"components":["HYDROLOGY","CONNECTIVITY","WATER QUALITY"],"desc":""},"Decrease Chemicals  in Solution":{"components":["WATER QUALITY"],"desc":""},"Decrease Sources of Nitrogen":{"components":["WATER QUALITY"],"desc":""},"Decrease Delivery of Nitrogen to Water":{"components":["HYDROLOGY","WATER QUALITY"],"desc":""},"Decrease Sources of Phosphorus":{"components":["WATER QUALITY"],"desc":""},"Decrease Delivery of Phosphorus to Water":{"components":["HYDROLOGY","GEOMORPHOLOGY","CONNECTIVITY","WATER QUALITY"],"desc":""}}

dssParameters = {
    "increase perennial vegetation, perennial crops (Conservation Cover (327)  )": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Perennial Cover",
        "component": "HYDROLOGY",
        "actionType": "direct"
    },
    "Grassed Waterways (Grassed Waterways (412) )": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase  Species Dispersal": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease source of chemical-bacterial contaminants": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Perennial Cover",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "Cover crops, Winter annuals (Conservation Crop Rotation (328) Cover Crops (340))": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase  Species Dispersal": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Sources of Nitrogen": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Perennial Cover",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "decrease imperviousness (avoid use/reduce impervious surface)": {
        "parameters": {
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase  Species Dispersal": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1"
        },
        "index": "Impervious Cover",
        "component": "HYDROLOGY",
        "actionType": "direct"
    },
    "vegetative buffer of storm water outlets, roads (veg. buffer of storm water outlets, roads)": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Increase  Surface Water Storage": "1",
            "Increase Groundwater Recharge": "1",
            "Improve Boundary Condition": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Intercept Hillslope Sediment": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Impervious Cover",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "storm water retention ponds (storm water retention ponds)": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase  Surface Water Storage": "1",
            "Improve Boundary Condition": "1",
            "Decrease Stream /Wave Energy": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Intercept Hillslope Sediment": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Impervious Cover",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "Rain gardens, roof gardens (Rain gardens)": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase  Surface Water Storage": "1",
            "Increase Species Diversity": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Intercept Hillslope Sediment": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Sources of Phosphorus": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Impervious Cover",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "increase storage - restore natural wetlands (Wetland Restoration (651))": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase  Surface Water Storage": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Intercept Hillslope Sediment": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Sources of Nitrogen": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Wetland Loss",
        "component": "HYDROLOGY",
        "actionType": "direct"
    },
    "Construct treatment wetlands (Constructed Treatment Wetlands )": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase  Surface Water Storage": "1",
            "Increase Dissolved Oxygen": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Intercept Hillslope Sediment": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Sources of Nitrogen": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Wetland Loss",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "Saturated Buffer (tile runoff dispersed in riparian)  (Saturated Buffer (739))": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Decrease Stream /Wave Energy": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease Sources of Nitrogen": "1",
            "Decrease Delivery of Nitrogen to Water": "1"
        },
        "index": "Wetland Loss",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "Culvert downsizing, road retention (Culvert downsizing, road retention)": {
        "parameters": {
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Decrease Stream /Wave Energy": "1",
            "Increase Longitudinal Connectivity": "-1",
            "Increase Pool Riffle Habitat": "-1",
            "Decrease Delivery of In Channel Sediment": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Wetland Loss",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "hold water and sediment - wascob (WASCOB (638))": {
        "parameters": {
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Intercept Hillslope Sediment": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Wetland Loss",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "Re-meander or restore altered watercourse (Stream re-meander/restoration)": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Increase  Surface Water Storage": "1",
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Decrease Stream /Wave Energy": "1",
            "Increase Longitudinal Connectivity": "1",
            "Increase Dissolved Oxygen": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Increase Pool Riffle Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Stablize  Sediment In Channel ": "1",
            "Decrease Delivery of In Channel Sediment": "1",
            "Decrease Chemicals  in Solution": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Altered Watercourse",
        "component": "HYDROLOGY",
        "actionType": "direct"
    },
    "buffer channelized streams (Ditch buffer)": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Decrease Stream /Wave Energy": "1",
            "Increase Longitudinal Connectivity": "1",
            "Increase Dissolved Oxygen": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Stablize  Sediment In Channel ": "1",
            "Decrease Delivery of In Channel Sediment": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Altered Watercourse",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "create 2-stage ditch (Two Stage Ditch)": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Decrease Stream /Wave Energy": "1",
            "Increase Longitudinal Connectivity": "1",
            "Increase Dissolved Oxygen": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Stablize  Sediment In Channel ": "1",
            "Decrease Delivery of In Channel Sediment": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Altered Watercourse",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "reduce water use  (Water Use Reductions)": {
        "parameters": {
            "Increase Groundwater Recharge": "1"
        },
        "index": "Water Withdrawal",
        "component": "HYDROLOGY",
        "actionType": "direct"
    },
    "improve irrigation efficiencies (Irrigation Water Mgmt (442, 449))": {
        "parameters": {
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Groundwater Recharge": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1"
        },
        "index": "Water Withdrawal",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "Controlled Subsurface drainage/Sub-irrigation (Controlled Subsurface Drainage (554, 587))": {
        "parameters": {
            "Decrease Sources of Nitrogen": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Sources of Phosphorus": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Water Withdrawal",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "set protected flows (Set Protected Low Flows)": {
        "parameters": {
            "Increase Interflow ": "1",
            "Increase Longitudinal Connectivity": "1",
            "Increase Dissolved Oxygen": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Increase Pool Riffle Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1"
        },
        "index": "Water Withdrawal",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "reduce flow manipulation/dam operation (Reduce Dam manipulation of flow)": {
        "parameters": {
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Decrease Stream /Wave Energy": "1",
            "Increase Longitudinal Connectivity": "1",
            "Increase Dissolved Oxygen": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Increase Pool Riffle Habitat": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Stablize  Sediment In Channel ": "1",
            "Decrease Delivery of In Channel Sediment": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Flow Variability",
        "component": "HYDROLOGY",
        "actionType": "direct"
    },
    "increase landscape storage (Grade Stabilization Structure (410) )": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Increase  Surface Water Storage": "1",
            "Increase Groundwater Recharge": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Flow Variability",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "controlled drainage (Controlled Subsurface Drainage (554))": {
        "parameters": {
            "Decrease Runoff": "-1",
            "Increase Interflow ": "1",
            "Increase Groundwater Recharge": "-1",
            "Decrease Delivery of In Channel Sediment": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Flow Variability",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "adjust/manage tile output (Tile system design, alternate intakes)": {
        "parameters": {
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Increase Groundwater Recharge": "1",
            "Decrease Stream /Wave Energy": "1",
            "Intercept Hillslope Sediment": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Flow Variability",
        "component": "HYDROLOGY",
        "actionType": "indirect"
    },
    "improve soil health (Improve soil health)": {
        "parameters": {
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Increase Groundwater Recharge": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Soil Erosion Potential",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "Reduce / manage soil compaction (Field to stream) (Compaction management )": {
        "parameters": {
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Soil Erosion Potential",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "Manure application (Nutrient mgmt (manure) (590) )": {
        "parameters": {
            "Increase Infiltration ": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Decrease source of chemical-bacterial contaminants": "-1",
            "Decrease Sources of Nitrogen": "-1",
            "Decrease Sources of Phosphorus": "-1"
        },
        "index": "Soil Erosion Potential",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "stabilize/avoid destabilizing steep slopes (Terrace (600), Contour Farming, Buffer strips (330-332) )": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Refugia": "1",
            "Increase  Species Dispersal": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Soil Erosion Potential",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "stabilize/avoid destabilizing steep slopes (Bluff and Shoreland Ordinance implementation)": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Improve Boundary Condition": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Soil Erosion Potential",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "increase vegetative cover on erodible soils  (No till, residue mgmt (330, 332) )": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease Sources of Nitrogen": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Sources of Phosphorus": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Soil Erosion Potential",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "increase buffer of karst features (Vegetative Buffer of Karst Features)": {
        "parameters": {
            "Increase Infiltration ": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Groundwater Contamination Susceptibility",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "avoid release of contaminates (Monitor/upgrade to septic systems )": {
        "parameters": {
            "Decrease source of chemical-bacterial contaminants": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Chemicals  in Solution": "1",
            "Decrease Sources of Nitrogen": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Sources of Phosphorus": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Groundwater Contamination Susceptibility",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "avoid release of contaminates (Limit land app. of manure/feedlot size, location)": {
        "parameters": {
            "Decrease source of chemical-bacterial contaminants": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Sources of Nitrogen": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Sources of Phosphorus": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Groundwater Contamination Susceptibility",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "avoid release of contaminates (Land Use Controls in  sensitive GW areas)": {
        "parameters": {
            "Decrease Sediment from Hillslopes ": "1",
            "Decrease Sediment from  Upland ": "1",
            "Decrease source of chemical-bacterial contaminants": "1",
            "Decrease Chemicals  in Solution": "1",
            "Decrease Sources of Nitrogen": "1",
            "Decrease Sources of Phosphorus": "1"
        },
        "index": "Groundwater Contamination Susceptibility",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "prepare for warming temp.- disease,invasive - resilience (Manage invasive species - barriers)": {
        "parameters": {
            "Increase Longitudinal Connectivity": "-1",
            "Increase Nesting/  Rearing Habitat": "-1",
            "Connect Mosaic of Habitat Types": "-1",
            "Increase Refugia": "-1",
            "Increase Spawning/Breeding Habitat": "-1",
            "Increase  Species Dispersal": "-1",
            "Increase Species Diversity": "-1",
            "Increase Connectivity of Upland Habitat ": "-1"
        },
        "index": "Climate Vulnerability",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "prepare for warming temp.- disease,invasive - resilience (Manage invasive species - increase resilience)": {
        "parameters": {
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Increase Longitudinal Connectivity": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Increase Pool Riffle Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Decrease Sediment from  Upland ": "1",
            "Decrease Sources of Nitrogen": "1",
            "Decrease Sources of Phosphorus": "1"
        },
        "index": "Climate Vulnerability",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "Stream restoration (Stream Restoration (pg94, field to stream))": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Increase  Surface Water Storage": "1",
            "Increase Groundwater Recharge": "1",
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Decrease Stream /Wave Energy": "1",
            "Increase Longitudinal Connectivity": "1",
            "Increase Dissolved Oxygen": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Increase Pool Riffle Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Stablize  Sediment In Channel ": "1",
            "Decrease Delivery of In Channel Sediment": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "stream stability- future",
        "component": "GEOMORPHOLOGY",
        "actionType": "direct"
    },
    "Floodplain acquisition (Floodplain acquisition or easement)": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Increase  Surface Water Storage": "1",
            "Increase Groundwater Recharge": "1",
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Decrease Stream /Wave Energy": "1",
            "Increase Longitudinal Connectivity": "1",
            "Increase Dissolved Oxygen": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Increase Pool Riffle Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Stablize  Sediment In Channel ": "1",
            "Decrease Delivery of In Channel Sediment": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "stream stability- future",
        "component": "GEOMORPHOLOGY",
        "actionType": "direct"
    },
    "Riparian vegetation (Riparian Buffer (Field to Stream pg92))": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Decrease Stream /Wave Energy": "1",
            "Increase Longitudinal Connectivity": "1",
            "Increase Dissolved Oxygen": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Increase Pool Riffle Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Decrease Delivery of In Channel Sediment": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "stream stability- future",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "Riprap (Streambank protection - riprap 580)": {
        "parameters": {
            "Increase Interflow ": "-1",
            "Improve Boundary Condition": "-1",
            "Decrease Stream /Wave Energy": "-1",
            "Increase Nesting/  Rearing Habitat": "-1",
            "Increase Pool Riffle Habitat": "-1",
            "Connect Mosaic of Habitat Types": "-1",
            "Increase Refugia": "-1",
            "Increase Spawning/Breeding Habitat": "-1",
            "Increase  Species Dispersal": "-1",
            "Increase Species Diversity": "-1",
            "Increase Connectivity of Upland Habitat ": "-1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1"
        },
        "index": "stream stability- future",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "Bioengineering banks (Streambank protection 580)": {
        "parameters": {
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Decrease Stream /Wave Energy": "1",
            "Increase Nesting/  Rearing Habitat": "-1",
            "Increase Spawning/Breeding Habitat": "1",
            "Decrease Delivery of In Channel Sediment": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "stream stability- future",
        "component": "GEOMORPHOLOGY",
        "actionType": "indirect"
    },
    "improve habitat condition - replant (re-establish native plant communities)": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Increase Groundwater Recharge": "1",
            "Improve Boundary Condition": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Terrestrial Habitat Quality",
        "component": "BIOLOGY",
        "actionType": "direct"
    },
    "improve habitat condition - fire (controlled burning)": {
        "parameters": {
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1"
        },
        "index": "Terrestrial Habitat Quality",
        "component": "BIOLOGY",
        "actionType": "direct"
    },
    "Enhance and Connect Habitat Patches (Mandate or encourage private/public habitat improvement)": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Decrease Sediment from  Upland ": "1"
        },
        "index": "Terrestrial Habitat Quality",
        "component": "BIOLOGY",
        "actionType": "indirect"
    },
    "Stock fish (stock fish)": {
        "parameters": {
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1"
        },
        "index": "Fish Index",
        "component": "BIOLOGY",
        "actionType": "direct"
    },
    "Re-introduce mussels (re-introduce mussels)": {
        "parameters": {
            "Increase Pool Riffle Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Stablize  Sediment In Channel ": "1",
            "Decrease Delivery of In Channel Sediment": "1",
            "Decrease source of chemical-bacterial contaminants": "1",
            "Decrease Chemicals  in Solution": "1"
        },
        "index": "Mussels Index",
        "component": "BIOLOGY",
        "actionType": "direct"
    },
    "Maintain gw inputs (water temp. limited)   (Maintain gw inputs (for cold water systems)  )": {
        "parameters": {
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Increase Groundwater Recharge": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Species Diversity": "1"
        },
        "index": "Mussels Index",
        "component": "BIOLOGY",
        "actionType": "indirect"
    },
    "improve habitat condition - instream/lake (Habitat Improvement projects)": {
        "parameters": {
            "Increase Groundwater Recharge": "1",
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Decrease Stream /Wave Energy": "1",
            "Increase Dissolved Oxygen": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Increase Pool Riffle Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Stablize  Sediment In Channel ": "1",
            "Decrease Delivery of In Channel Sediment": "1"
        },
        "index": "Mussels Index",
        "component": "BIOLOGY",
        "actionType": "indirect"
    },
    "Maintain, restore diversity - stock species (Stock or reintroduce species)": {
        "parameters": {
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1"
        },
        "index": "Animal Species Richness",
        "component": "BIOLOGY",
        "actionType": "direct"
    },
    "Maintain, restore diversity - stock species (Stock or reintroduce species of greatest concern)": {
        "parameters": {
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1"
        },
        "index": "At-Risk Animal Spec. Richness",
        "component": "BIOLOGY",
        "actionType": "direct"
    },
    "Re-connect quality upland habitat  (Create corridors to connect quality terrestrial habitat)": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1"
        },
        "index": "Terrestrial Habitat Connectivity",
        "component": "CONNECTIVITY",
        "actionType": "direct"
    },
    "reduce impact of impervious surface use (wildlife highway bypass)": {
        "parameters": {
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1"
        },
        "index": "Terrestrial Habitat Connectivity",
        "component": "CONNECTIVITY",
        "actionType": "indirect"
    },
    "expand upland perennial veg corridors (Purchase land / consrv. Easements)": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1"
        },
        "index": "Terrestrial Habitat Connectivity",
        "component": "CONNECTIVITY",
        "actionType": "indirect"
    },
    "restore native habitat": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1"
        },
        "index": "Terrestrial Habitat Connectivity",
        "component": "CONNECTIVITY"
    },
    "reduce row crop ag (set aside programs, CRP, RIM etc.)": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Groundwater Recharge": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease Sources of Nitrogen": "1",
            "Decrease Sources of Phosphorus": "1"
        },
        "index": "Terrestrial Habitat Connectivity",
        "component": "CONNECTIVITY",
        "actionType": "indirect"
    },
    "connect terrestrial/aquatic interface (Implement buffer initiative)": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Increase  Surface Water Storage": "1",
            "Increase Groundwater Recharge": "1",
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Decrease Stream /Wave Energy": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Increase Pool Riffle Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Riparian Connectivity",
        "component": "CONNECTIVITY",
        "actionType": "direct"
    },
    "connect stream network/remove obstructions (Dam Removal)": {
        "parameters": {
            "Increase  Surface Water Storage": "-1",
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Decrease Stream /Wave Energy": "1",
            "Increase Longitudinal Connectivity": "1",
            "Increase Dissolved Oxygen": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Increase Pool Riffle Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Stablize  Sediment In Channel ": "-1",
            "Decrease Delivery of In Channel Sediment": "1",
            "Decrease Sources of Phosphorus": "1"
        },
        "index": "Aquatic Connectivity",
        "component": "CONNECTIVITY",
        "actionType": "direct"
    },
    "Culvert redesign for fish passage": {
        "parameters": {
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Decrease Stream /Wave Energy": "1",
            "Increase Longitudinal Connectivity": "1",
            "Increase Dissolved Oxygen": "1",
            "Increase Pool Riffle Habitat": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1",
            "Stablize  Sediment In Channel ": "1",
            "Decrease Delivery of In Channel Sediment": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1"
        },
        "index": "Aquatic Connectivity",
        "component": "CONNECTIVITY"
    },
    "Provide fish passage": {
        "parameters": {
            "Increase Spawning/Breeding Habitat": "1",
            "Increase  Species Dispersal": "1",
            "Increase Species Diversity": "1"
        },
        "index": "Aquatic Connectivity",
        "component": "CONNECTIVITY"
    },
    "reduce/remove WQ pollution disconnects (endocrine disruptions, DO, Temp. (Remove WQ chemical and temperature barriers)": {
        "parameters": {
            "Decrease source of chemical-bacterial contaminants": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Chemicals  in Solution": "1"
        },
        "index": "Aquatic Connectivity",
        "component": "CONNECTIVITY",
        "actionType": "direct"
    },
    "Reduce localized inputs (Reduce point source inputs)": {
        "parameters": {
            "Decrease source of chemical-bacterial contaminants": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Chemicals  in Solution": "1"
        },
        "index": "Localized Pollution Sources",
        "component": "WATER QUALITY",
        "actionType": "direct"
    },
    "intercept delivery from feedlots, (bacteria) (riparian buffers, karst feature buffer)": {
        "parameters": {
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Interflow ": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Localized Pollution Sources",
        "component": "WATER QUALITY",
        "actionType": "indirect"
    },
    "Feedlot /WW Filter Strip (635) Runoff Diversion (362)": {
        "parameters": {
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Increase Dissolved Oxygen": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease source of chemical-bacterial contaminants": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Sources of Nitrogen": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Sources of Phosphorus": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Localized Pollution Sources",
        "component": "WATER QUALITY"
    },
    "exclusion (382) fencing (472)": {
        "parameters": {
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Increase Longitudinal Connectivity": "1",
            "Increase Nesting/  Rearing Habitat": "1",
            "Increase Pool Riffle Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Refugia": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Increase Species Diversity": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Decrease source of chemical-bacterial contaminants": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Sources of Nitrogen": "1"
        },
        "index": "Localized Pollution Sources",
        "component": "WATER QUALITY"
    },
    "rotational grazing": {
        "parameters": {
            "Increase Evapotranspiration": "1",
            "Decrease Runoff": "1",
            "Increase Infiltration ": "1",
            "Stabilize Bed and Bank ": "1",
            "Improve Boundary Condition": "1",
            "Increase Pool Riffle Habitat": "1",
            "Connect Mosaic of Habitat Types": "1",
            "Increase Spawning/Breeding Habitat": "1",
            "Improve Soil Health/Increase  Organic Matter": "1",
            "Improve Vegetative Vigor ": "1",
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Decrease Sediment from Hillslopes ": "1",
            "Intercept Hillslope Sediment": "1",
            "Decrease Sediment from  Upland ": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease source of chemical-bacterial contaminants": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Sources of Nitrogen": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Sources of Phosphorus": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Localized Pollution Sources",
        "component": "WATER QUALITY"
    },
    "intercept delivery of chemical pollutants (? (superfund, potential contaminants, mines))": {
        "parameters": {
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Chemicals  in Solution": "1"
        },
        "index": "Localized Pollution Sources",
        "component": "WATER QUALITY",
        "actionType": "indirect"
    },
    "intercept delivery of phosphorus from WWTP (?)": {
        "parameters": {
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Chemicals  in Solution": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Localized Pollution Sources",
        "component": "WATER QUALITY",
        "actionType": "indirect"
    },
    "avoid release of  contaminants from septics (Monitor/upgrade to septic systems )": {
        "parameters": {
            "Decrease source of chemical-bacterial contaminants": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Chemicals  in Solution": "1",
            "Decrease Sources of Nitrogen": "1",
            "Decrease Delivery of Nitrogen to Water": "1",
            "Decrease Sources of Phosphorus": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Localized Pollution Sources",
        "component": "WATER QUALITY",
        "actionType": "indirect"
    },
    "intercept delivery of sed/P  with vegetation": {
        "parameters": {
            "Increase Rate of Photosynthesis ": "1",
            "Increase Carbon Sequesetration": "1",
            "Increase Connectivity of Upland Habitat ": "1",
            "Intercept Hillslope Sediment": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Non-Point Source",
        "component": "WATER QUALITY",
        "actionType": "indirect"
    },
    "intercept delivery of sed/P with structures": {
        "parameters": {
            "Intercept Hillslope Sediment": "1",
            "Intercept   Overland Flow Sediment": "1",
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Non-Point Source",
        "component": "WATER QUALITY",
        "actionType": "indirect"
    },
    "improve Aquatic Life (See Stream Spc Quality index? )": {
        "parameters": {
            "Decrease delivery of chemical-bacterial contaminants ": "1",
            "Decrease Chemicals  in Solution": "1",
            "Decrease Delivery of Phosphorus to Water": "1"
        },
        "index": "Assessments",
        "component": "WATER QUALITY",
        "actionType": "direct"
    },
    "improve Aquatic Recreation (Aerate water,)": {
        "parameters": {
            "Increase Species Diversity": "1"
        },
        "index": "Assessments",
        "component": "WATER QUALITY",
        "actionType": "direct"
    }
}

