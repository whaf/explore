function scalesGuideReset(){
    mode='watershedZoom';
//    WS_functionality();
}

function guideReset(){
    guides.scalesGuide.step=-1;
    guides.pieChartGuide.step=-1;
    guides.scalesGuide.stepper();
    $('#DssStarImage').removeClass('info5ImageOn btn-warning highlightBorder'); 
    $('#menu_features').removeClass('btn-warning highlightBorder');
}

function startGuide(which){
    guides.currentGuide=which;
    $('#guide_title').show(); 
    guides.guide_nexter(); 
    guideDrag();
}

var guides = {
    currentGuide:"",
    guide_nexter:function(){
        guides[this.currentGuide].step++;
        guides[this.currentGuide].stepper(guides[this.currentGuide].step);
    },
    guide_backer:function(){
        guides[this.currentGuide].step--;
        guides[this.currentGuide].stepper(guides[this.currentGuide].step);
    },
    "scalesGuide":{
        name:"Explore Spatial Scales",
        start:function(){
            $('#mapScalePlace').html('');
            $('#mapScalePlace').load('scaleButtons.html');
        },
        step:-1,
        steps:{
            intro:"This guide shows how to visulize different scales relevant for a selected map location by highlighting its river basin, major watershed, upstream or downstream area.",
            1:"Click on the crosshair icon (bottom left), then anywhere inside Minnesota on the map, to place a location mark.",
            2:"Click on the 'Catchment' button to delineate the cathcment of the map location. This is the smallest area unit for which the WHAF calculates health scores. Click again to remove the highlight.",
            3:"Click on the 'Basin' button to highlight the entire basin of the map location. (Hint: the drop down menu next to each scale button allows you to zoom directly to the extent of that scale).",
            4:"Click on the 'Major Watershed' button to highlight the watershed of the map location. ",
            5:"Click on the 'Upstream' button to highlight the true watershed of the catchment containing the map location. (Note: in some cases, areas outside of the state boundaries may not be included in this delineation). ",
            6:"Click on the 'Downstream' button to highlight all catchments downstream of the map location.",
            7:"View different health scores in the context of the different scales.",
            8:"Additional map layers may be added to the map view.",
            9:"Scale masks can be removed by clicking the 'X' button. Click on the buttons for the relevant scale to bring them up again."
        },
        stepper:function(){
            var step = guides.scalesGuide.step
            console.log(this)
            var showButs=['DssStarImage', 'ctmntButtonGrp', 'basinButtonGrp', 'selectButGrp', 'upButtonGrp', 'dnstrmButGrp', 'menu_scores', 'menu_features', 'maskRemoveGrp']
            for (but in showButs){
                var r=showButs[but];
                if ($('#'+r).hasClass('btn-warning')){$('#'+r).removeClass('btn-warning')};
                if ($('#'+r).hasClass('highlightBorder')){$('#'+r).removeClass('highlightBorder')};
                if ($('#'+r).children().hasClass('btn-warning')){$('#'+r).children().removeClass('btn-warning')};
            };
            if (step>=1 && step <10){
                $('#guide_StepCurrent').html(String(step)+'. '+guides.scalesGuide.steps[step])
            }
            try{$('#DssStarImage').mouseout()}catch(err){};     

            switch(this.step){
                case 0:$('#guide_control_back').hide();
                $('#guide_stepTitle').html('<h4>Guide: '+guides.scalesGuide.name+'</h4');
                $('#guide_StepCurrent').html(guides.scalesGuide.steps.intro);
                $('#guide_control_next').show();
                break;

                case 1:$('#DssStarImage').addClass('btn-warning highlightBorder');
                $('#DssStarImage').mouseenter();
                $('#guide_control_back').show();
                break;
                case 2: 
                $('#ctmntButtonGrp').children().addClass('btn-warning');
                break;
                case 3:
                $('#basinButtonGrp').children().addClass('btn-warning');
                break;
                case 4:
                $('#selectButGrp').children().addClass('btn-warning');

                break;
                case 5:
                $('#upButtonGrp').children().addClass('btn-warning');

                break; 
                case 6:
                $('#dnstrmButGrp').children().addClass('btn-warning');

                break;
                case 7:
                $('#menu_scores').addClass('btn-warning highlightBorder');
                $('#menu_scores').click();

                break;
                case 8:
                $('#menu_features').addClass('btn-warning highlightBorder');
                $('#menu_features').click();
                $('#guide_control_next').show();
                break;
                case 9:
                $('#maskRemoveGrp').children().addClass('btn-warning');
                $('#guide_control_next').hide();

                break;

            }
        } 
    },
    "featuresGuide":{
        name:"Add features to map",
        start:function(){
            
        },
        step:-1,
        steps:{
            intro:"This guide shows how to add different features to the online map and view their properties.",
            1:"Click on the layers icon to bring up a list of available features. Check the box near a feature to load it to the map.",
            2:"A small selection of features is provided by default, but many more features are available: click 'Get More Layers' to view a longer list of available features." ,
            3:"Click to select additional layers. Selected layers will be added to the map layers list (note: they are clicked off by default). If you are inside the MN DNR network, many Landview layers will be available too.",
            4:"Features can be added from the web too, if they are available as a REST web map service. After clicking 'Get More Layers', click 'Get Layers From Web' and enter the url address of the desired web map service.",
            5:"To query (or identify) properties of a map feature, click to highlight the 'i' icon next to the layer. Click on the map feature to view all available properties for the selected feature. Note: only one layer can be queried at a time. Click the 'i' icon again to disable query.",
            6:"Map layers can be reordered by dragging and dropping layers in the map layers box."
        },
        stepper:function(){
            var step = guides.featuresGuide.step;
            $('#menu_features').removeClass('btn-warning highlightBorder');
            
            if (step>=1 && step <7){
                $('#guide_StepCurrent').html(String(step)+'. '+guides.featuresGuide.steps[step])
            }

            switch(this.step){
                case 0:$('#guide_control_back').hide();
                $('#guide_stepTitle').html('<h4>Guide: '+guides.featuresGuide.name+'</h4');
                $('#guide_StepCurrent').html(guides.featuresGuide.steps.intro);
                $('#guide_control_back').hide();
                $('#guide_control_next').show();
                break;

                case 1:
                $('#menu_features').addClass('btn-warning highlightBorder');
                $('#guide_control_back').show();
                
                break;
                case 2: 
                break;

                case 3:
                break;

                case 4:

                break;
                case 5:
                $('#guide_control_next').show();
                break; 

                case 6:
                $('#guide_control_next').hide();
                break;

            }
        } 
    },
    "pieChartGuide":{
        name:"Compare health scores at 'major watershed' level",
        start:function(){
            $('#pieChartModal').show();
        },
        step:-1,
        steps:{
            intro:"This guide helps to visualize differences in ecological health between Minnesota's 81 'major watersheds'. Indices are color coded by component. ",
            1:"If the map has no location mark set, moving the mouse over each watershed highlights the watershed and dynamically changes the chart to reflect index scores.",
            2:"If a location mark is set, the chart remains static, showing scores for the major watershed that contains the set map location.",
            3:"To change the map location, click the crosshair button, then click on the map. To remove map location and compare watersheds by mouse-over, click the crosshair button twice (button should not be highlighted)."
        },
        stepper:function(){
            var step = guides.pieChartGuide.step;
            if (step>=1 && step <4){
                $('#guide_StepCurrent').html(String(step)+'. '+guides.pieChartGuide.steps[step])
            };

            switch(this.step){
                case 0:$('#guide_control_back').hide();
                $('#pieChartModal').show();
                $('#guide_stepTitle').html('<h4>Guide: '+guides.pieChartGuide.name+'</h4');
                $('#guide_StepCurrent').html(guides.pieChartGuide.steps.intro);
                $('#guide_control_next').show();
                break;

                case 1:
                $('#guide_control_back').show();
                break;
                case 2: 
                $('#guide_control_next').show();
                $('#DssStarImage').removeClass('btn-warning highlightBorder');
                break;
                case 3: 
                $('#guide_control_next').hide();
                $('#DssStarImage').addClass('btn-warning highlightBorder');
                break;
                
            }
        } 
    }


}