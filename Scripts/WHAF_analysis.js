//BEST - WORST
function analyzeBestWorst(e, t, n) {
    var r = [t, n];
    if (e) {
        analyzeIndexList.push(t);
        indexNameList.push(r);
        console.log(indexNameList)
    } else {
        arrayer(analyzeIndexList, t);
        arrayer(indexNameList, r)
    }
    testFunction2();
    testFunction()
}

function executeEval(e) {
    analyticIndex = {};
    WS_catchments = {};
    WS_catchmentsMissingVals = [];
    dontHaveAllVals = 0;
    lowSideCatchments = [];
    highSideCatchments = [];
    var t = (new Date).getTime();
    console.log("executing Eval");
    var n = [];
    for (var r = 0; r < analyzeIndexList.length; r++) {
        var i = analyzeIndexList[r];
        var s = [];
        for (var o = 0; o < e.features.length; o++) {
            indexCtmntFeat = e.features[o].attributes;
            $.each(indexCtmntFeat, function (e, t) {
                if (e == i) {
                    s.push(t)
                }
            })
        }
        var u = s.sort(function (e, t) {
            return e - t
        });
        var a = u[0];
        var f = u[u.length - 1];
        var l = u.reduce(function (e, t) {
            return e + t
        });
        var c = l / u.length;
        analyticIndex[i] = new AnalyzeIndObject(i, a, f, c)
    }
    console.log(analyticIndex);
    for (var o = 0; o < e.features.length; o++) {
        indexCtmntFeat = e.features[o].attributes;
        WS_catchments[indexCtmntFeat.CATCH_ID] = new ctmentsInSelectedWS(indexCtmntFeat.CATCH_ID, indexCtmntFeat.HU_12_NAME);
        if (o == 0) {
            console.log("an example of feature: ", indexCtmntFeat)
        }
        cummScore = 0;
        numIndices = 0;
        for (var r = 0; r < analyzeIndexList.length; r++) {
            var i = analyzeIndexList[r];
            $.each(indexCtmntFeat, function (e, t) {
                if (e == i) {
                    keyString = String(e);
                    WS_catchments[indexCtmntFeat.CATCH_ID][keyString] = t;
                    if (t || t == 0) {
                        numIndices++;
                        cummScore = cummScore + t
                    }
                }
            })
        }
        AvgScore = cummScore / numIndices;
        if (numIndices == analyzeIndexList.length) {
            WS_catchments[indexCtmntFeat.CATCH_ID].AnalysisScore = AvgScore;
            n.push(AvgScore)
        } else {
            dontHaveAllVals = dontHaveAllVals + 1;
            WS_catchmentsMissingVals.push(indexCtmntFeat.CATCH_ID)
        }
    }
    console.log(WS_catchments);
    var h = n.sort(function (e, t) {
        return e - t
    });
    if (AnalyzeRange < h.length) {
        if (AnalyzeRange > h.length / 2) {
            alert("The number of catchemnts selected for highlighting is greater than half of the relevant watersheds. Some catchemnts are highlighted as both best and worst. You may want to select a smaller number.")
        }
        lowVal = h[AnalyzeRange - 1];
        if (h[AnalyzeRange - 1] == h[AnalyzeRange]) {
            messageListAnalyze.push("There are more than " + AnalyzeRange + " catchment(s) with scores equal to those of your selection (lowest " + AnalyzeRange + "). All of those are shown in the map.")
        }
        highVal = h[h.length - AnalyzeRange];
        if (highVal == h[h.length - (AnalyzeRange + 1)]) {
            messageListAnalyze.push("There are more than " + AnalyzeRange + " catchment(s) with scores equal to those of your selection (highest " + AnalyzeRange + "). All of those are shown in the map.")
        }
        console.log("low value (for lowest " + AnalyzeRange + "): " + lowVal);
        console.log("high value (for highest " + AnalyzeRange + "): " + highVal);
        console.log("Number of catchments missing some values: ", dontHaveAllVals);
        console.log(WS_catchmentsMissingVals);
        for (var p in WS_catchments) {
            if (WS_catchments.hasOwnProperty(p)) {
                if (WS_catchments[p].AnalysisScore <= lowVal) {
                    lowSideCatchments.push(p)
                } else if (WS_catchments[p].AnalysisScore >= highVal) {
                    highSideCatchments.push(p)
                }
            }
        }
        console.log("low End List: ", lowSideCatchments);
        console.log("high End List: ", highSideCatchments);
        var d = new  WHAFapp.QueryCons;
        d.returnGeometry = true;
        d.outFields = ["*"];
        lowExpression = "CATCH_ID = '";
        for (o = 0; o < lowSideCatchments.length; o++) {
            if (o < lowSideCatchments.length - 1) {
                lowExpression = lowExpression + String(lowSideCatchments[o]) + "' OR CATCH_ID = '"
            } else {
                lowExpression = lowExpression + String(lowSideCatchments[o]) + "'"
            }
        }
        d.where = lowExpression + " AND " + t + "=" + t;
        CtmentInMajorQT.execute(d, executeCtmntInMJ_selectionLow);
        var v = new  WHAFapp.QueryCons;
        v.returnGeometry = true;
        v.outFields = ["*"];
        topExpression = "CATCH_ID = '";
        for (o = 0; o < highSideCatchments.length; o++) {
            if (o < highSideCatchments.length - 1) {
                topExpression = topExpression + String(highSideCatchments[o]) + "' OR CATCH_ID = '"
            } else {
                topExpression = topExpression + String(highSideCatchments[o]) + "'"
            }
        }
        v.where = topExpression + " AND " + t + "=" + t;
        console.log(v.where);
        CtmentInMajorQT.execute(v, executeCtmntInMJ_selectionTop);
        var m = new  WHAFapp.QueryCons;
        m.returnGeometry = true;
        m.outFields = ["*"];
        m.where = "major = " + selectedWatershed.number + " AND " + t + "=" + t;
        CtmentInMajorQT.execute(m, executeCtmntInMJ_selectionAll);
        var g = dontHaveAllVals + " catchments in this watershed have no values for one or more of the selected indices and were not included in the analysis";
        if (dontHaveAllVals > 0) {
            messageListAnalyze.push(g)
        }
        var y = "<br> <strong>MESSAGES:</strong> <br>";
        for (o = 0; o < messageListAnalyze.length; o++) {
            y = y + messageListAnalyze[o] + "<br>"
        }
        if (messageListAnalyze.length > 0) {
            $("#AnalyzeDescription").html(y)
        } else {
            $("#AnalyzeDescription").html("")
        }
    } else {
        alert("The number of catchemnts selected for highlighting is greater than (or equals) the number of relevant catchments in this watershed. Please select a lower number.");
        $("#loader").hide()
    }
}

function executeCtmntInMJ_selectionAll(e) {
    var t = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 1), new dojo.Color([125, 125, 125, 0]));
    for (i = 0; i < e.features.length; i++) {
        graphiCtmnt = e.features[i];
        if (i == 0) {
            console.log("original feature: ", graphiCtmnt)
        }
    }
    $("#loader").hide()
}

function executeCtmntInMJ_selectionTop(e) {
    var t = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([20, 255, 20]), 4), new dojo.Color([125, 125, 125, 0]));
    for (i = 0; i < e.features.length; i++) {
        graphi = e.features[i];
        graphi.setSymbol(t);
        map.graphics.add(graphi);
        analyzeCtmnts.push(graphi);
        $("#loader").hide()
    }
}

function executeCtmntInMJ_selectionLow(e) {
    var t = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NULL, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 20, 20]), 2), new dojo.Color([125, 125, 125, 0]));
    for (i = 0; i < e.features.length; i++) {
        graphi = e.features[i];
        graphi.setSymbol(t);
        map.graphics.add(graphi);
        analyzeCtmnts.push(graphi);
        $("#loader").hide()
    }
}

function testFunction() {
    var e = $("#analyzeRangeInput").val();
    var t = Number(e);
    AnalyzeRange = t;
    console.log(selectedWatershed.number, selectedWatershed.name, selectedWatershed.HUC8);
    CtmentInMajorQT = new  WHAFapp.QueryTaskCons(assessmentURL + "/49");
    var n = (new Date).getTime();
    var r = new  WHAFapp.QueryCons;
    r.returnGeometry = false;
    r.outFields = ["*"];
    r.where = "major = " + selectedWatershed.number + " AND " + n + "=" + n;
    CtmentInMajorQT.execute(r, executeEval)
}

function testFunction2() {
    removeAnalyzeCtmnts();
    messageListAnalyze = [];
    $("#AnalyzeDescription").html("")
}

function removeAnalyzeCtmnts() {
    for (i = 0; i < analyzeCtmnts.length; i++) {
        map.graphics.remove(analyzeCtmnts[i])
    }
    analyzeCtmnts = []
}

function AnalyzeIndObject(e, t, n, r) {
    this.field = e;
    this.minVal = t;
    this.maxVal = n;
    this.meanVal = r
}

function ctmentsInSelectedWS(e, t) {
    this.CATCH_ID = e;
    this.CtmntName = t
}

function determineAnalysisBlock() {
    if (analyzer) {
        analyzeBlock("analyze")
    } else {
        analyzeBlock()
    }
}

function analyzeBlock(e) {
    var t = (new Date).getTime();
    var n = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255, 0]), .5), new dojo.Color([0, 0, 0, .5]));
    var r = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([100, 100, 100, 1]), .5), new dojo.Color([125, 125, 125, 0]));
    if (e == "analyze") {
        analyzer = true;
        //CHANGE TO REGULAR MASK FUNCTION
        if (selectedWatershed.number) {
            t = (new Date).getTime();
            var i = "major <> " + selectedWatershed.number + " AND " + t + "=" + t;
            console.log("EXPRESSION BLOCK IS: ", i);
            // allMajorsLayer = map.getLayer("allMajorsGraphics");
            DSS_objectives.majorsFL.setDefinitionExpression(i);
            DSS_objectives.majorsFL.setRenderer(new  WHAFapp.SimpleRendererCons(n));
            testFunction2();
            testFunction()
        } else {
            alert("Please select a major watershed")
        }
    } else {
        if (analyzer) {
            var s = "major < " + t;
            DSS_objectives.majorsFL.setDefinitionExpression(s);
            DSS_objectives.majorsFL.setRenderer(new  WHAFapp.SimpleRendererCons(r));
            DSS_objectives.majorsFL.redraw();
            analyzer = false
        }
    }
}
