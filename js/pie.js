Raphael.fn.pieChart = function (cx, cy, r, labels, stroke,colors, scores) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }
    var angle = 0,
        total = 0,
        value = 5.5
        // start = 0,
        process = function (j) {
            var score = scores[j]/100,
                transformer = "S"+score+" "+score+" ",
                transformer2 = "s"+score*1.1+" "+score*1.1+" ",
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                color = colors[j],//Raphael.hsb(start, .75, 1),
                ms = 300,
                delta = 20,
                bcolor = "white",
                p = sector(cx, cy, r, angle, angle + angleplus, {fill: color, stroke: stroke, "stroke-width": 0.5}),
                // txt = paper.text(120, 300, labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 14});
                txt = paper.text(cx + (r + delta + 27) * Math.cos(-popangle * rad), cy + (r + delta + 27) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 11});
                p.stop().animate({transform: transformer + cx + " " + cy});
                txt.stop().animate({opacity: 0.5}, ms, "elastic");
            p.mouseover(function () {
                // console.log(p.attr("stroke-width"))
                p.stop().animate({"stroke-width": 1.5});
                txt.stop().animate({opacity: 1, "font-size": 12}, 100);
            }).mouseout(function () {
                p.stop().animate({"stroke-width": 0.5});
                txt.stop().animate({opacity: 0.5, "font-size": 11}, 50);
            });
            angle -= angleplus;
            chart.push(p);
            chart.push(txt);
            
        };
    for (var i = 0, ii = labels.length; i < ii; i++) {
        total += value;
    }
    for (i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};

function roseCharter (place, scores) {
    $('#'+place).empty()
    var labels = ['Perennial Cover', 'Impervious Cover', 'Water Withdrawal', 'Hydrologic Storage', 'Flow Variability', 'Soil Erosion Susc.', 'Groundwater Contamination Susc.', 'Climate Vulnerability', 'Terrestrial Habitat Quality', 'Stream Species Quality', 'Animal Species Richness', 'At-Risk Animal Spec. Richness', 'Terrestrial Habitat Connectivity', 'Aquatic Connectivity', 'Riparian Connectivity', 'Non-Point Source', 'Point Source', 'Assessments'],
        hyd = Raphael.rgb(0,112,192),
        con =  Raphael.rgb(227,108,10),
        bio = Raphael.rgb(0,176,80),
        geom = Raphael.rgb(147,137,83),
        watQ= Raphael.rgb(112,48,160),

        colors = [hyd, hyd, hyd, hyd, hyd, geom, geom, geom, bio, bio, bio, bio, con, con, con, watQ, watQ, watQ];
   
    Raphael(place, 550, 550).pieChart(275, 300, 150, labels, "#fff", colors, scores);
};
