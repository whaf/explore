function addCommas(e) {
    e += "";
    var t = e.split(".");
    var n = t[0];
    var r = t.length > 1 ? "." + t[1] : "";
    var i = /(\d+)(\d{3})/;
    while (i.test(n)) {
        n = n.replace(i, "$1" + "," + "$2")
    }
    return n + r
}

function contains(e, t) {
    for (var n = 0; n < e.length; n++) {
        if (e[n] === t) {
            return true
        }
    }
    return false
}

function arrayer(e, t) {
    var n = jQuery.inArray(t, e);
    if (n != -1) {
        var r = e.splice(n, 1)
    }
}

function alignItemsVert(fixedItemId, dependentItemId){
    function centOfImage(id){
        imTop=$('#'+id).offset().top;
        return imTop+centrHeight(id)/2
    }
    function centrHeight(id){
        imHeight1=$('#'+id).css('height');
        imHeight2=Number(imHeight1.replace('px',''));
        return imHeight2/2
    }
    l=centOfImage(fixedItemId);
    g=centrHeight(dependentItemId);
    $('#'+dependentItemId).offset({ top: l-g});
}

function alignItemsTop(fixedItemId, dependentItemId){
    var d;
    d=$('#'+fixedItemId).offset().top;
    $('#'+dependentItemId).offset({top:d})
}