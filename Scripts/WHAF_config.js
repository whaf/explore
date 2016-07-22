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

indexJson={
    "H_S_MEAN": {
        "name": "Hydrology  Mean",
        "watershedId": "Hyd - Mean Score (major)",
        "catchmentId": "",
        "indexSummary": "Mean of Hydrology index scores",
        "shortDesc": "<h4>Hydrology</h4>Hydrology is the study of inter-relationships and interactions between water and its environment in the hydrological cycle. As water moves within a watershed, it carries sediment, chemicals, heat and biota. (Dunne and Leopold, 5). The movement of water in the hydrologic cycle drives the watershed system and affects all aspects of watershed health. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/component_score.html' target='_blank'>here</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"The Hydrology Component health score combines and averages five health scores that each capture different aspects of the hydrologic cycle.  Quantity of vegetation, amount of impervious surface, water consumption, loss of places that store water and deviation in stream flow patterns tell a story about the overall health of our hydrologic systems that store, use and distribute water."
    },
    "H_S_PC": {
        "name": "Perennial Cover",
        "watershedId": "Hyd Index - Perennial Cover, 2011 (major)",
        "catchmentId": "Hyd Index - Perennial Cover, 2011",
        "indexSummary": "Percent of land with remaining perennial (year-round) vegetation",
        "shortDesc": "<h4>Perennial cover</h4>Perennial cover is permanent vegetation that covers the landscape year-round.  Permanent vegetation is removed from land when it is converted to cropland,  or developed for human use, such as roads, buildings and homes.  This index quanitifies the percent of the landscape that is covered in perennial vegetation as measured by the National Land Cover Database.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/perennial.html' target='_blank'>here.</a>",
        "sourceData": "NLCD",
        "sourceDataDate": "2001-2011",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures":"", 
        "why":"When permanent vegetation is removed it impacts the water cycle directly by removing water storage found in leaves, stems and roots; and eliminating the evapotranspiration of water vapor into the atmosphere.  This loss of storage causes water to leave the landscape and move downstream more quickly.  This effect is often compounded by the land use that replaces lost vegetation with annual row crops or hard surfaces like roads and buildings."
    }, 
    "H_S_IC": {
        "name": "Impervious Cover",
        "watershedId": "Hyd Index - Impervious Cover, 2011 (major)",
        "catchmentId": "Hyd Index - Impervious Cover, 2011",
        "indexSummary": "Extent of impervious land area, where impervious area of 4% or greater scores 0",
        "shortDesc": "<h4>Impervious cover</h4>Impervious cover refers to hard surfaces that do not allow water to pass through into the soil (i.e. roads, buildings, parking lots).  Hard surfaces cause water to accumulate, carry impurities and fail to recharge groundwater.  This index looks at what percentage of a watershed is covered in hard surfaces.  Each small sub-watershed that is more than 4% impervious surface is considered impacted.  The percentage of impacted subwatersheds within a major watershed was used to create the index.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/impervious.html' target='_blank'>here.</a>",
        "sourceData": "NLCD",
        "sourceDataDate": "2001-2011",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"Impervious surfaces are hard surfaces that affect the water cycle by blocking water from soaking into the ground.  This results in more water flow on the surface that quickly reaches streams and lakes; and less water moving through the soil where contaminants can be filtered and groundwater replenished."
    },
    "H_S_WW": {
        "name": "Water Withdrawal",
        "watershedId": "Hyd Index - Water Withdrawal (major)",
        "catchmentId": "Hyd Index - Water Withdrawal",
        "indexSummary": "Ratio of permitted water use to available surface water",
        "shortDesc": "<h4>Water Withdrawal</h4>Surface and ground water is removed by wells or pumps for human needs such as drinking, industrial uses and irrigation. Using water can reduce stream flows and lake levels, lower groundwater aquifers and impact water quality and water temperature. This index calculates the use of water in a given catchment and its upstream catchments as a percent of the surface water runoff.  Water use is measured as the total annual volume of water (surface and groundwater) reported as used  in the DNR's permits database for each catchment and its upstream catchments.  The amount used is then adjusted for consumptive use based on documented consumptive use coefficients.  Surface water runoff is measured as the mean annual discharge for a catchment and its upstream catchments. Mean annual discharge is estimated using observed annual precipitation and predicted annual runoff coefficients.  Scores are based on a mean of the last 5 years for which data exists. Scores are inversely related to the 'water use vulnerability index', i.e. water use as percent of runoff. A score of 100 is given to catchments with 0 water use, and a score of 0 is given to catchments where average water use exceeds runoff. Watersheds scores represent the mean score of all catchments inside them. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/waterwithdraw.html' target='_blank'>here.</a>",
        "sourceData": "2011",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"The removal of water for human use can reduce stream flows and lake levels, lowers groundwater aquifers and impact water quality and water temperature.  Sustainable quantity and quality of groundwater is essential for safe drinking water in the future.",
        "metrics": [{
            "name": "Predicted Vulnerability",
            "watershedId": "",
            "catchmentId": "Hyd Index - Water Withdrawal, Predicted Vulnerability",
            "indexSummary": "Predicted (five years) ratio of permitted water use/available surface water",
            "shortDesc": "<h4>Water Withdrawal (predicted)</h4>The trend during the last five years in reported use as a percentage of runoff is projected out five years.  Each catchment is scored in s similar fashion as in the water withdrawal index, but on the basis of a five year future projection. While this prediction is inexact, it can be used to identify emerging problem areas in terms of water use. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/waterwithdraw.html' target='_blank'>here.</a>",
            "sourceData": "2011",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"h_i_ww_pv",
            "why":"While this prediction is inexact, water use trends can be used to identify emerging problem areas in terms of water use and water supply."
        }]
    },
    "H_S_HS": {
        "name": "Hydrologic Storage",
        "watershedId": "Hyd Index - Loss of Hydrologic Storage (major)",
        "catchmentId": "Hyd Index - Loss of Hydrologic Storage",
        "indexSummary": "Loss of wetland surface features, and percent of altered streams",
        "shortDesc": "<h4>Hydrologic Storage</h4>Hydrologic storage refers to  places on the landscape that provide either temporary or permanent water storage.  Examples include lakes, rivers, permanent or seasonal wetlands, and floodplains.  The Hydrologic Storage Index compares the extent of historic wetland features, estimated from soil characteristics, to the extent of current wetland features; and the ratio of natural stream length to channelized stream length for each watershed.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/storage.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "Catchment level scores are available for some of the metrics of this index, and more are under development",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"The loss of places that store water means precipitation leaves the landscape more quickly.  This can lead to higher flows during rain events and less stored water during times of drought.  Draining wetlands and straightening streams eliminates important and productive habitats, and reduces plant and animal biodiversity.",
        "metrics": [{
            "name": "Altered Watercourse",
            "watershedId": "Hyd Metric - Loss of Hydrologic Storage, Altered Watercourse (major)",
            "catchmentId": "Hyd Metric - Loss of Hydrologic Storage, Altered Watercourse",
            "indexSummary": "Percent of straightened streams",
            "shortDesc": "<h4>Natural/Altered Watercourse Ratio </h4> This index represents the extent to which natural streams were straightened by human activity, thereby reducing the hydrologic storage of the land.  It is based on the altered watercourses dataset and refers to the length of stream segments that were altered in relation to the length of those that meander naturally.  This index does not represent data on the volume of water stored in these streams.  The score, 0-100, represents the percent of stream length that remains unaltered.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/storage.html' target='_blank'>here.</a>",
            "sourceData": "Altered Watercourse Project",
            "sourceDataDate": "2012",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"h_m_lhs_aw",
            "why":"Streams are altered to move water more quickly off the land.  Some stream alteration replaces miles of meanders with short, straight stream segments.  Straightened streams have excess energy that creates both headcuts and downstream erosion.   Some stream alteration adds miles of ditches to drain wetlands and bogs for other uses",
        }, {
            "name": "Wetland Loss",
            "watershedId": "Hyd Metric - Loss of Hydrologic Storage, Wetland Loss (major)",
            "catchmentId": "Hyd Metric - Loss of Hydrologic Storage, Wetland Loss",
            "indexSummary": "Loss of wetland surface features, normalized to total watershed area",
            "shortDesc": "<h4>Wetland Loss </h4> This index represents the proportion of the watershed that has been drained and converted out of wetland coverage.  Wetland drainage reduces the upland hydrologic storage capacity and increases rate and magnitude that stream flow after rainfall events.  Less wetland area leads to a greater delivery of contaminants to streams and lakes, and a destabilization of streams and streambanks.  Pre-European settlement wetland coverage is estimated from the proportion of soils that are classified as 'Hydric', current wetland coverage is calculated from the National Wetland Inventory.  A score of 100 means that there has been no net loss of wetlands, a score of 50 means that 50 percent of the watershed area has been converted to non-wetland land uses.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/storage.html' target='_blank'>here.</a>",
            "sourceData": "SSURGO/STATSGO Soils Database, National Wetland Inventory",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"h_m_lhs_wl",
            "why":"Wetland drainage reduces the upland water storage. This increases the rate and magnitude of stream flow after rainfall events, leads to a greater delivery of contaminants to streams and lakes, and destabilizes streams and streambanks"
        }]
    },
    "H_S_FV": {
        "name": "Flow Variability",
        "watershedId": "Hyd Index - Flow Variability (major)",
        "catchmentId": "",
        "indexSummary": "Deviation of stream flow pattern from expected",
        "shortDesc": "<h4>Flow Variability</h4>Water flow rates and variability are basic characteristics of any aquatic system.   The flow regime is the main driver of watershed ecology and can be described by five ecologically important characteristics (Poff et al. 1997).  The Flow Variability Index uses stream gage data to compare the flow characteristics  in each watershed or group of watersheds to an expected flow regime.  A statistical analysis of deviation from expected flow patterns was used to rank and score flow variability.   For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/hydrology/flowvariability.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"Stream flow patterns  that deviate from expected rates are responding to alterations that change the water cycle.  Annual, monthly and daily patterns of flow are responses to different types of alteration.  Water cycle imbalances lead to instability in the stream channel, erosion challenges and water supply challenges"
    },
    "G_S_MEAN": {
        "name": "Geomorphology Mean",
        "watershedId": "Geo - Mean Score (major)",
        "catchmentId": "",
        "indexSummary": "Mean of Geomorphology index scores",
        "shortDesc": "<h4>Geomorphology</h4>Geomorphology is the study of landforms; from their origin and evolution to the processes that continue to shape them.  Geomorphologists seek to understand landform history and dynamics, and predict future changes through a combination of field observation, physical experiments, and modeling.For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/geomorphology/component_score.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":""
    },
    "G_S_SES": {
        "name": "Soil Erosion Potential",
        "watershedId": "Geo Index - Soil Erosion Potential (major)",
        "catchmentId": "Geo Index - Soil Erosion Potential",
        "indexSummary": "Percent of land area in erodible soil type, scaled by slope",
        "shortDesc": "<h4>Soil Erosion Potential</h4>Soil erosion is the loss of surface material due to water, wind or other natural forces.  Different soil types are more or less erodable due to attributes like  particle size and parent material.  The Soil Erodibility Index calculates the amount of soil present in each watershed classified as an 'erodable' soil type, weighted by the steepness of the slope on which it is found.  The index reflects only soil properties and not the land use or land cover in the watershed.For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/geomorphology/soil_erodibilty.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"Erodible soils on steep slopes are likely to be mobilized, particularly if they are left bare.  Knowing where there is a high level of risk of mobilizing soil can inform other land use choices."
    },
    "G_S_GCS": {
        "name": "Groundwater Contamination Susceptibility",
        "watershedId": "Geo Index - Groundwater Contamination Susceptibility (major)",
        "catchmentId": "",
        "indexSummary": "Area weighted risk for Groundwater Contamination",
        "shortDesc": "<h4>Groundwater Contamination Susceptibility</h4>The susceptibility of groundwater to contamination is the risk that waterborne surface contaminants will reach the groundwater.  This risk was modeled across Minnesota in 1989.  This model quantified the potential for groundwater contamination from surface sources based on data such as subsurface materials and structure, rate of groundwater recharge and soil type.  The Groundwater Contamination Index uses an area weighted summary of the contamination risk for each watershed.  A score of '0 means very high risk and a score of 100' indicates very little risk.For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/geomorphology/gw_contamination.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"Risk of contamination to groundwater informs other land use decisions that could impact water quality and drinking water supplies."
    },
    "G_S_CV": {
        "name": "Climate Vulnerability",
        "watershedId": "Geo Index - Climate Vulnerability (major)",
        "catchmentId": "",
        "indexSummary": "Deviation from balance of precipitation and evapotranspiration; moisture excess/deficit",
        "shortDesc": "<h4>Climate Vulnerability</h4>The Climate Vulnerability Index uses the balance of precipitation and evapotranspiration across Minnesota as a 'placeholder' indicator of vulnerability to climate change.  Based on 30 years of data, the trend shows a deficit of moisture in western Minnesota, particularly the northwest; and a surplus in the east, increasing toward the southeast.  More frequent extreme events and less predictable precipitation patterns may have greater impact in areas that already trend toward wet or dry conditions.  A more robust index of climate vulnerability is planned.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/geomorphology/climate.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"More frequent extreme events and less predictable precipitation patterns may have greater impact in areas that already trend toward wet or dry conditions."
    },
    "B_S_MEAN": {
        "name": "Biology Mean",
        "watershedId": "Bio - Mean Score (major)",
        "catchmentId": "",
        "indexSummary": "Mean of Biology index scores",
        "shortDesc": "<h4>Biology</h4>Biology is the study of life. The biological systems of a watershed encompass the plant and animal species that are present in the stream, the riparian lands, and the contributing watershed.  These living organisms interact to create a flow of materials and energy that provide numerous ecosystem services. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/component_score.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":""
    },
    "B_S_THQ": {
        "name": "Terrestrial Habitat Quality",
        "watershedId": "Bio Index - Terrestrial Habitat Quality (major)",
        "catchmentId": "Bio Index - Terrestrial Habitat Quality",
        "indexSummary": "Percent of land area in high value habitat types",
        "shortDesc": "<h4>Terrestrial Habitat Quality</h4>The quality of terrestrial habitat is based on its size, configuration and cover type.  A computer model of wetland, grassland and forest habitat quality ranks the quality of the natural land cover in each watershed.  This index compares the amount of land that is high quality habitat to the amount of land that is low quality or unsuitable habitat.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/terr_habitat.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"Critical amounts of quality habitat are needed to support continued health of diverse plant and animal communities."
    },
    "B_S_SSQ": {
        "name": "Stream Species Quality",
        "watershedId": "Bio Index - Stream Species Quality (major)",
        "catchmentId": "",
        "indexSummary": "Count of fish, aquatic invertebrate and mussel species / expected count",
        "shortDesc": "<h4>Stream Species Quality</h4>The aquatic species found in streams are often indicators of the condition of the contributing landscape.  For the Stream Species Index, the number of fish and macroinvertebrate species found were compared to the number of species expected each at sampling location.  Freshwater mussel survey data was used to compare the number of species found alive with the number of species found only as dead shells.  These metrics were combined to create the Stream Species index. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/streamspc.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "Sub metrics for this index are available in catchment scale, and provide distinct view of ecological health for fish, aquatic invertebrate and mussel communities",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"The health of aquatic communities found in streams indicates the status of the local aquatic resource as well as reflecting the influence of the contributing landscape on stream health.",
        "metrics": [{
            "name": "Fish Index",
            "watershedId": "",
            "catchmentId": "Bio Metric - Stream Species Quality, Fish IBI",
            "indexSummary": "Metric scores based on fish IBI (index of biotic integrity)",
            "shortDesc": "<h4>Fish Index (IBI based)</h4> This index is based on the fish IBI (Index of Biotic Integrity) published by the Minnesota Pollution Control Agency. IBI site scores were transformed to a 0-100 scale, whereby the threshold's score value determined by the PCA represents 50; site scores that are lower than the threshold value were transformed to a score between 0-50, while higher scores were transformed to a score between 50 and 100. Catchment scores represent an average of fish IBI scores in a given catchment. <br><br>Fish index scores were extrapolated to some catchments where IBI analysis was not carried out, if those were directly upstream or downstream from a catchment that has IBI sites. In those cases, scores from upstream and downstream catchments were averaged to provide extrapolated scores. Catchments with extrapolated scores are highlighted in the map when zooming in. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/streamspc.html' target='_blank'>here.</a>",
            "sourceData": "Fish IBI (PCA)",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"b_m_ssq_fi",
            "why":"The health of aquatic communities in streams reflects local conditions and the influence of the contributing landscape.  Fish community health may be more indicative of the larger landscape, given their mobility and longevity.  Aquatic macroinvertebrates are less mobile and more reflective of local habitat conditions.  Adult mussels are less mobile, but the larval stage is distributed by host fish so mussel communities reflect both local conditions and stream system health.   ‘Dead shell’ records add valuable indicators of species change over time."
        }, {
            "name": "Fish Index (extrapolated)",
            "watershedId": "",
            "catchmentId": ["Bio Metric - Stream Species Quality, Fish IBI", "Bio Metric - Stream Species Quality, Fish IBI Extrapolated", "Bio Metric - Stream Species Quality, Fish IBI Extrapolated Highlight"],
            "indexSummary": "Metric scores based on fish IBI (index of biotic integrity), extrapolated",
            "shortDesc": "<h4>Fish Index (IBI based)</h4> This index is based on the fish IBI (Index of Biotic Integrity) published by the Minnesota Pollution Control Agency. IBI site scores were transformed to a 0-100 scale, whereby the threshold's score value determined by the PCA represents 50; site scores that are lower than the threshold value were transformed to a score between 0-50, while higher scores were transformed to a score between 50 and 100. Catchment scores represent an average of fish IBI scores in a given catchment. <br><br>Fish index scores were extrapolated to some catchments where IBI analysis was not carried out, if those were directly upstream or downstream from a catchment that has IBI sites. In those cases, scores from upstream and downstream catchments were averaged to provide extrapolated scores. Catchments with extrapolated scores are highlighted in the map when zooming in. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/streamspc.html' target='_blank'>here.</a>",
            "sourceData": "Fish IBI (PCA)",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"b_m_ssq_fi_EX",
            "why":"The health of aquatic communities in streams reflects local conditions and the influence of the contributing landscape.  Fish community health may be more indicative of the larger landscape, given their mobility and longevity.  Aquatic macroinvertebrates are less mobile and more reflective of local habitat conditions.  Adult mussels are less mobile, but the larval stage is distributed by host fish so mussel communities reflect both local conditions and stream system health.   ‘Dead shell’ records add valuable indicators of species change over time."
        }, {
            "name": "Invertebrate Index",
            "watershedId": "",
            "catchmentId": "Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI",
            "indexSummary": "Metric scores based on invertebrate IBI (index of biotic integrity)",
            "shortDesc": "<h4> Invertebrate Index (IBI based)</h4> This index is based on the Invertebrate IBI (Index of Biotic Integrity) published by the Minnesota Pollution Control Agency. IBI site scores were transformed to a 0-100 scale, whereby the threshold's score value determined by the PCA represents 50; site scores that are lower than the threshold value were transformed to a score between 0-50, while higher scores were transformed to a score between 50 and 100. Catchment scores represent an average of Invertebrate IBI scores in a given catchment. <br><br>Invertebrate index scores were extrapolated to some catchments where IBI analysis was not carried out, if those were directly upstream or downstream from a catchment that has IBI sites. In those cases, scores from upstream and downstream catchments were averaged to provide extrapolated scores. Catchments with extrapolated scores are highlighted in the map when zooming in. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/streamspc.html' target='_blank'>here.</a>",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"b_m_ssq_ii",
            "why":"The health of aquatic communities in streams reflects local conditions and the influence of the contributing landscape.  Fish community health may be more indicative of the larger landscape, given their mobility and longevity.  Aquatic macroinvertebrates are less mobile and more reflective of local habitat conditions.  Adult mussels are less mobile, but the larval stage is distributed by host fish so mussel communities reflect both local conditions and stream system health.   ‘Dead shell’ records add valuable indicators of species change over time."
        }, {
            "name": "Invertebrate Index (extrapolated)",
            "watershedId": "",
            "catchmentId": ["Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI", "Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI Extrapolated", "Bio Metric - Stream Species Quality, Aquatic Invertebrate IBI Extrapolated Highlight"],
            "indexSummary": "Metric scores based on invertebrate IBI (index of biotic integrity)",
            "shortDesc": "<h4> Invertebrate Index (IBI based)</h4> This index is based on the Invertebrate IBI (Index of Biotic Integrity) published by the Minnesota Pollution Control Agency. IBI site scores were transformed to a 0-100 scale, whereby the threshold's score value determined by the PCA represents 50; site scores that are lower than the threshold value were transformed to a score between 0-50, while higher scores were transformed to a score between 50 and 100. Catchment scores represent an average of Invertebrate IBI scores in a given catchment. <br><br>Invertebrate index scores were extrapolated to some catchments where IBI analysis was not carried out, if those were directly upstream or downstream from a catchment that has IBI sites. In those cases, scores from upstream and downstream catchments were averaged to provide extrapolated scores. Catchments with extrapolated scores are highlighted in the map when zooming in. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/streamspc.html' target='_blank'>here.</a>",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"b_m_ssq_ii_EX",
            "why":"The health of aquatic communities in streams reflects local conditions and the influence of the contributing landscape.  Fish community health may be more indicative of the larger landscape, given their mobility and longevity.  Aquatic macroinvertebrates are less mobile and more reflective of local habitat conditions.  Adult mussels are less mobile, but the larval stage is distributed by host fish so mussel communities reflect both local conditions and stream system health.   ‘Dead shell’ records add valuable indicators of species change over time."
        }, {
            "name": "Mussels Index",
            "watershedId": "",
            "catchmentId": "Bio Metric - Mussel Score",
            "indexSummary": "Metric scores based on Mussel Quality Survey",
            "shortDesc": "<h4>Mussel Quality Metric</h4>This metric is based on the results of the MN DNR statewide survey of mussels in Minnesota's major streams and rivers.  Each survey site has a site quality score that combines four underlying population measurements. These four measurements are scored on a 0-100 scale: count of live mussels per minute spent searching, recruitment (presence of juvenile mussels), percent sensitive mussel species, and percent of species present found live.  These four metrics are averaged together to create a mussel site quality score.  <br><br> Mussel catchment scores represent an average of the mussel site quality scores within that catchment. Mussel catchment scores were also extrapolated for catchments directly upstream or downstream from a catchment that has mussel survey sites. In those cases, scores from upstream and downstream catchments were averaged to provide extrapolated scores. Catchments with extrapolated scores are highlighted in the map when zooming in. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/streamspc.html' target='_blank'>here.</a>",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"b_m_ssq_ms",
            "why":"The health of aquatic communities in streams reflects local conditions and the influence of the contributing landscape.  Fish community health may be more indicative of the larger landscape, given their mobility and longevity.  Aquatic macroinvertebrates are less mobile and more reflective of local habitat conditions.  Adult mussels are less mobile, but the larval stage is distributed by host fish so mussel communities reflect both local conditions and stream system health.   ‘Dead shell’ records add valuable indicators of species change over time."
        }, {
            "name": "Mussels Index (extrapolated)",
            "watershedId": "",
            "catchmentId": ["Bio Metric - Mussel Score", "Bio Metric - Mussel Score Extrapolated", "Bio Metric - Mussel Score Extrapolated Hightlight"],
            "indexSummary": "Metric scores based on Mussel Quality Survey",
            "shortDesc": "<h4>Mussel Quality Metric</h4>This metric is based on the results of the MN DNR statewide survey of mussels in Minnesota's major streams and rivers.  Each survey site has a site quality score that combines four underlying population measurements. These four measurements are scored on a 0-100 scale: count of live mussels per minute spent searching, recruitment (presence of juvenile mussels), percent sensitive mussel species, and percent of species present found live.  These four metrics are averaged together to create a mussel site quality score.  <br><br> Mussel catchment scores represent an average of the mussel site quality scores within that catchment. Mussel catchment scores were also extrapolated for catchments directly upstream or downstream from a catchment that has mussel survey sites. In those cases, scores from upstream and downstream catchments were averaged to provide extrapolated scores. Catchments with extrapolated scores are highlighted in the map when zooming in. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/streamspc.html' target='_blank'>here.</a>",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"b_m_ssq_ms_EX",
            "why":"The health of aquatic communities in streams reflects local conditions and the influence of the contributing landscape.  Fish community health may be more indicative of the larger landscape, given their mobility and longevity.  Aquatic macroinvertebrates are less mobile and more reflective of local habitat conditions.  Adult mussels are less mobile, but the larval stage is distributed by host fish so mussel communities reflect both local conditions and stream system health.   ‘Dead shell’ records add valuable indicators of species change over time."
        }]
    },
    "B_S_SR": {
        "name": "Animal Species Richness",
        "watershedId": "Bio Index - Animal Species Richness (major)",
        "catchmentId": "",
        "indexSummary": "Rank by count of species (mussels, fish, aquatic invertebrate, birds)",
        "shortDesc": "<h4>Animal Species Richness</h4>Species richness is defined as the total number of different species found within a system, and refers only to the presence of a species but not its abundance.  The Animal Species Richness Index is based on the number of mussels, fish, aquatic invertebrate and bird species that have been found in each watershed.  The highest total number of species found in a watershed was used as the highest score (100) and most desirable condition.  The absence of all animal species is the lowest score (0) and least desirable condition. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/spc_rich.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"As a general condition, having a large number of different species within a system creates more resilience to stresses.  Some individual animal communities are healthies with low diversity, but at a watershed scale, overall animal species richness contributes to health and resilience."
    },
    "B_S_ARSR": {
        "name": "At-Risk Animal Spec. Richness",
        "watershedId": "Bio Index - At Risk Species Richness (major)",
        "catchmentId": "",
        "indexSummary": "Rank by count of at risk species (mussels, fish, birds)",
        "shortDesc": "<h4>At-Risk Animal Species Richness</h4>Species richness is defined as the total number of different species found within a system, and refers only to the presence of a species but not its abundance. The At-Risk Animal Species Richness Index is based on the number of mussels, fish, and bird species on Minnesota's Species of Greatest Conservation Need' (SGCN) list that have been found in each watershed.  The highest total number of at-risk animals species found in a watershed was used as the highest score (100) and most desirable condition.  The absence of at-risk animals species is the lowest score (0) and least desirable condition. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/biology/at_risk.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"As a general condition, having a large number of different animal species within a system creates more resilience to stresses.  The richness of At-Risk Species indicates the presence of species in “greatest conservation need” and may reflect the presence of key habitats necessary to support them."
    },
    "C_S_MEAN": {
        "name": "Connectivity Mean",
        "watershedId": "Con - Mean Score (major)",
        "catchmentId": "",
        "indexSummary": "Mean of Connectivity index scores",
        "shortDesc": "<h4>Connectivity</h4>Connectivity is defined as the maintenance of lateral, longitudinal, and vertical pathways for biological, hydrological, and physical processes (Annear, 2004). It refers to the flow, exchange, and pathways that move organisms, energy, and matter throughout the watershed.For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/connectivity/component_score.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":""
    },
    "C_S_THC": {
        "name": "Terrestrial Habitat Connectivity",
        "watershedId": "Con Index - Terrestrial Habitat Connectivity (major)",
        "catchmentId": "",
        "indexSummary": "Land area in quality habitat and their potential connectors",
        "shortDesc": "<h4>Terrestrial Habitat Connectivity</h4>The connections between patches of terrestrial habitat add value to the habitat and allow energy and organisms to move across the landscape.  The Terrestrial Habitat Connectivity Index uses a computer model to rank the ability for organisms to move from one habitat patch to another based on the land cover type.  A highway is difficult to cross, a prairie is not.  The amount of land area that provides habitat and habitat connections is compared to the land area that is not suitable habitat.For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/connectivity/terrestrial_conn.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"Patches of habitat that together create a mosaic across a landscape provide essential connections for travel corridors, places of refuge, and seasonal access to breeding and nesting grounds."
    },
    "C_S_AC": {
        "name": "Aquatic Connectivity",
        "watershedId": "Con Index - Aquatic Connectivity (major)",
        "catchmentId": "Con Index - Aquatic Connectivity",
        "indexSummary": "Density of structures per river mile (bridges, culverts, dams)",
        "shortDesc": "<h4>Aquatic Connectivity</h4>Man-made structures can limit the ability of water, organisms and energy to flow through aquatic systems.  The Aquatic Connectivity Index is based on the density of culverts, bridges and dams in each watershed.  The higher the density of structures limiting the free flow of water, the lower the Aquatic Connectivity score. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/connectivity/aquatic_conn.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"Structures on streams can disconnect stream segments, block fish passage, alter meander patterns, change the slope and width of streams, trap water and sediment,  create upstream head-cuts and downstream erosion.  These changes degrade aquatic habitat and create instability in the stream system."
    },
    "C_S_RC": {
        "name": "Riparian Connectivity",
        "watershedId": "Con Index - Riparian Connectivity (major)",
        "catchmentId": "Con Index - Riparian Connectivity",
        "indexSummary": "Percent of riparian land that is not developed or cultivated",
        "shortDesc": "<h4>Riparian Connectivity</h4>'Riparian' refers to the land immediately adjacent to water features such as lakes and rivers.  Access to this area is important to aquatic and terrestrial species particularly during seasonal high flow or flood events.  Riparian lands are also  important year round as travel corridors and habitat connectors, often providing the only remaining natural land cover in developed landscapes.  The Riparian Connectivity Index compares the amount of cropped or developed land cover to the amount of open land in the riparian area. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/connectivity/riparian_conn.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"Access to the riparian area is important to aquatic and terrestrial species particularly during seasonal high flow or flood events.  Riparian lands are also important year round as travel corridors and habitat connectors, often providing the only remaining natural land cover in developed landscapes."
    },
    "W_S_MEAN": {
        "name": "Water Quality Mean",
        "watershedId": "WQ - Mean Score (major)",
        "catchmentId": "",
        "indexSummary": "Mean of Water Quality index scores",
        "shortDesc": "<h4>Water Quality</h4>Water quality is water's chemical character.  The chemical and physical characteristics of water reflect the geography, climate and land use practices in the surrounding area.  Changes in water quality occur from localized pollution sources, such as effluent from manufacturing plants; or non-point sources, such as nutrient and sediment from agricultural or urban land use.  The degree of impact also reflects the natural vulnerability of the water resource to potential contaminants. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/water_quality/component_score.html'  target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":""
    },
    "W_S_NPS": {
        "name": "WQ Index - Non-Point Source (major)",
        "watershedId": "WQ Index - Non-Point Source (major)",
        "catchmentId": "",
        "indexSummary": "Combines 2 metrics:  Rate of chemical and nutrient application and percent impervious in riparian zone",
        "shortDesc": "<h4>Non-Point Source</h4>Distributed sources or potential sources of pollution to surface or groundwater that are not associated with a specific location are referred to as 'non-point sources'.  For example, stormwater runoff carrying contaminants from urban or rural landscapes would be a non-point source.  The Non-Point Source Index measures and combines two metrics:  the rate of chemical application to cropland and the amount of impervious surface in the riparian zone. For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/water_quality/non_point.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "This index is under construction. Currently, the methods used to calculate the combined index score differ from the catchment scale metric. When analysis o",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"Nonpoint sources of pollution can move off the landscape into waterways which can contaminate drinking water and degrade aquatic communities.",
        "metrics": [{
            "name": "Upland Phosphorus", 
            "watershedId": "WQ Metric - Non-Point Source, Phosphorus Risk (major)",
            "catchmentId": "WQ Metric - Non-Point Source, Phosphorus Risk",
            "indexSummary": "Phosphorus Risk from Upland Sources",
            "shortDesc": "<h4>Upland Phosphorus Metric</h4>Phosphorus is often the limiting nutrient in aquatic systems, as a pollutant phosphorus has a significant potential to offset the natural balance in a system. Increased phosphorus levels can lead to algae blooms in surface waters which can further alter the chemical and physical properties of these waters. This metric models the risk of phosphorus mobilization based on three factors: land use, watershed slope, and soil erodibility. Scores range from 0 (most likely to mobilize phosphorus from uplands) to 100 (least likely to mobilize phosphorus from uplands).",
            "sourceData": "SSURGO Soils Database, LiDAR derived elevation, Crop Data Layer (land cover)",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_nps_pr",
            "why":"Phosphorus is an essential element for plant life, but the additional phosphorus added as fertilizer can be carried by rainfall into surface water and ground water.  Excess phosphorus levels can lead to algae blooms in surface waters which further alter the chemical and physical properties of these waters."
        }]
    },
    "W_S_PS": {
        "name": "Localized Pollution Sources",
        "watershedId": "WQ Index - Localized Pollution Sources (major)",
        "catchmentId": "WQ Index - Localized Pollution Sources",
        "indexSummary": "Density of localized pollution sources for six pollution source types per land area",
        "shortDesc": "<h4>Localized Pollution Sources</h4>For the Localized Pollution Sources Index, the density of different activities was calculated: animal feedlots, potential water contamination sources (MPCA database), superfund sites, wastewater treatment plants, open pit mines and septic systems (based on presence of a domestic well).  Each poollution source type can be examined for its potential impact by viewing the metric score below.  For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/water_quality/point.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "The term Localized Pollution Sources refers to a known contaminant risk location. Some of these sources do not discharge to surface water and do not meet the statutory section 502(14) 'point source' definition of the Clean Water Act.",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"",
        "metrics": [{
            "name": "Animal Units",
            "watershedId": "",
            "catchmentId": "WQ Metric - Localized Pollution Sources, Animal Units",
            "indexSummary": "Number of animal units in registered feedlots",
            "shortDesc": "<h4>Animal Units Metric</h4>Higher density of animals on the landscape creates a greater risk of contamination from animal waste.  This metric totals the number of animal units (in registered feedlots) in each catchment.   This value is divided by catchment land area to calculate AU/acre (1 AU = 1000 lb dairy cow equivalent).  Scores are scaled from 0 to 100, with a density of .75 AU/acre or greater = 0; no registered feedlots = 100 (September 2014 data).",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_ps_a",
            "why":"A high density of animals being raised in feedlots creates a greater risk of contamination from animal waste."
        }, {
            "name": "Potential contaminants",
            "watershedId": "",
            "catchmentId": "WQ Metric - Localized Pollution Sources, Potential Contaminants",
            "indexSummary": "Potential contaminant sites, representing a wide range of activity types, present within a catchment",
            "shortDesc": "<h4>Potential Contaminant Sites Metric</h4>Potential contaminants are identified from a database managed by the Minnesota Pollution Control Agency (October 2014 data).  The contaminate types include air pollution sources, hazardous waste producers and disposal sites, petroleum tanks, tank leak sites, solid waste dumps and landfills, contaminated sites that are under remediation, and storm water discharge sites.  The total number of sites is divided by catchment land area.   Scores range from 0 to 100, with a density of 1.87 points/km2 or greater = 0; no sites present = 100.",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_ps_pc",
            "why":"A high density of potential contaminant sites creates a greater risk of contamination from those varied contaminant sources."
        }, {
            "name": "Superfund Sites",
            "watershedId": "",
            "catchmentId": "WQ Metric - Localized Pollution Sources, Superfund Sites",
            "indexSummary": "Density of state and federally listed superfund sites",
            "shortDesc": "<h4>Superfund Sites Metric</h4>This metric uses a combination of federal and state listed superfund sites, including both active and inactive locations.  Total number of sites is divided by catchment land area.  Scores range from 0 to 90; with the 95th percentile density or greater = 0 and a maximum score of 90 if any superfund sites were present in a catchment; no sites present = 100.",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_ps_sf",
            "why":"A presence of superfund sites increases the risk of contamination from former activities at that location."
        }, {
            "name": "Wastewater Treatment Plants",
            "watershedId": "",
            "catchmentId": "WQ Metric - Localized Pollution Sources, Wastewater Treatment Plants",
            "indexSummary": "Nutrient loads discharged from wastewater treatment plants",
            "shortDesc": "<h4>Wastewater Treatment Plants Metric</h4>This metric measures phosphorus, nitrogen and carbonaceous biochemical oxygen demand (CBOD) discharge loads for WWTPs based on NPDES permit reports.  The quantity of the three effluents was summed for each catchment and a metric score was calculated for each of the three effluents. Where WWTPs were present, but no quantity was measured for that particular effluent, the catchment received no score.  The score for each effluent type was based on 0 = the 95th percentile of the load totals; remaining values scaled from 0-100.  A combined WWTP score was calculated by averaging the individual effluent scores together.",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_ps_wtp",
            "why":"Higher concentrations of phosphorus, nitrogen and CBOD in waste water creates a greater level of risk of contamination from those effluents."
        }, {
            "name": "Open Pit Mines",
            "watershedId": "",
            "catchmentId": "WQ Metric - Localized Pollution Sources, Open Pit Mines",
            "indexSummary": "Land disturbed by surface mining activities",
            "shortDesc": "<h4>Open Pit Mines Metric</h4>This metric quantifies the density of surface mines.  The majority of surface mines are heavily concentrated in the Mesabi iron range and data used for this index are only generated for that region. Other surface mining occurs throughout the state including aggregate mines/rock quarries and silica sand mines.  These have different impacts and are not represented in this index.   The index score is based on the amount of land area within a catchment disturbed by mining activity.  Scores range from 0 to 100, with 15% or greater disturbance of land area = 0; no mines present = 100.",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_ps_opm",
            "why":"Open pit mines create a risk of contamination from mineral extraction activities that can create acid mine drainage, airborne mercury, and sulfate leeching."
        }, {
            "name": "Septic Systems",
            "watershedId": "",
            "catchmentId": "WQ Metric - Localized Pollution Sources, Septic Systems",
            "indexSummary": "Density of domestic septic systems",
            "shortDesc": "<h4>Septic Systems Metric</h4>The domestic wells listed in the County Well Index (CWI) were used to approximate septic system location.  Given these data assumptions and lack of historic records, this metric provides a conservative estimate of actual septic system density. The metric score is based on well density per square km of land area in a catchment.  Scores range from 0 to 100, with a density of 15.587 wells/km2 or greater = 0; no wells present = 100.",
            "sourceData": "",
            "sourceDataDate": "",
            "caveats": "",
            "longDescLink": "",
            "auxFeatures": "",
            "fieldName":"w_m_ps_ss",
            "why":"A high density of households with individual water and sewer services increases the risk of septic system failure.  Untreated effluent can carry human disease, nutrients and bacteria into groundwater and contaminate well water, or reach nearby streams or water bodies."
        }]
    },
    "W_S_WQA": {
        "name": "Assessments",
        "watershedId": "WQ Index - Water Quality Assessments (major)",
        "catchmentId": "",
        "indexSummary": "Percent of assessed water bodies found to be impaired",
        "shortDesc": "<h4>Water Quality Assessments</h4>Water quality assessments are done by the Minnesota Pollution Control Agency to determine if the water of lakes, reservoirs and streams meet the standards set in the federal Clean Water Act.  Three designated uses are evaluated:  aquatic consumption, aquatic recreation and aquatic life.  The Water Quality Assessment Index compares and ranks the percentage of water bodies evaluated and found to be impaired in each watershed.   For more details, click <a href='http://www.dnr.state.mn.us/whaf/about/scores/water_quality/assessment.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "This index is currently under development and will be updated soon",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":"",
        "why":"The number of water bodies assessed and found to be impaired for different human uses shows where surface water systems are being impacted by the different water quality risks factors."
    },
    "A_S_MEAN": {
        "name": "Combined Mean Scores",
        "watershedId": "Overall Average (major)",
        "catchmentId": "",
        "indexSummary": "Combined mean scores (mean of means)",
        "shortDesc": "<h4>Combined Mean Scores</h4>Each watershed receives a mean (average) health ranking. The mean watershed health score is the mean of the 5 component scores calculated for that watershed. For more information, click <a href='http://www.dnr.state.mn.us/whaf/scores/combined/index.html' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":""
    },
    "A_S_MIN": {
        "name": "Lowest Index Scores",
        "watershedId": "Overall Minimum (major)",
        "catchmentId": "",
        "indexSummary": "Lowest score of all indices for each major watershed",
        "shortDesc": "<h4>Lowest Index Scores</h4>Each watershed receives a minimum health ranking. The minimum watershed health score is the lowest health index score received when comparing all of the health index values for that watershed. For more information, click <a href='http://www.dnr.state.mn.us/whaf/scores/combined/index.html ' target='_blank'>here.</a>",
        "sourceData": "",
        "sourceDataDate": "",
        "caveats": "",
        "longDescLink": "",
        "auxFeatures": "",
        "fieldName":""
    }
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

