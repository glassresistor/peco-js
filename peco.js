var stuffToStuff = function(find, replace, text) {
    var $uglyText = $('<div>'+text+'</div>');
    $uglyText.find(find).each(function(index, value) {
        var element = this;
        var newElement = $("<"+replace+"></"+replace+">");
        $.each(this.attributes, function(index) {
            $(newElement).attr(element.attributes[index].name,
                element.attributes[index].value);
        });
        newElement.html($(value).html());
        $(this).replaceWith(newElement);
    });  
    return $uglyText.html(); 
};

var changeLinkTarget = function(text) {
    var $uglyText = $('<div>'+text+'</div>');
    $uglyText.find('a').each(function(index, value) {
        var element = this;
        $(element).attr('target', '_blank');
    });  
    return $uglyText.html(); 
}



$(document).ready(function(){
    var uglyForm = $('#uglyForm');
    uglyForm.submit(function(e) {
        e.preventDefault();
        var uglyText = $('#uglyText').val();
        var subs = {
            //dash block
            "--": "&mdash;",
            "-": "&mdash;",
            "&ndash;": "&mdash;",
            //quote block
            "&#8220;": "\"", //left double quoute  
            "&#8221;": "\"", //right double quoute  
            "&#8216;": "\'", //left single quoute  
            "&#8227;": "\'", //right single quoute
            "&quot;":  "\"", //left double quoute  
            "&ldquo;":  "\"", //left double quoute  
            "&rdquo;":  "\"", //right double quoute  
            "&#8217;": "'",
            //Country info
            "U.S.": "US",
            "D.C.": "DC",
            "U.N.": "UN",
            //remove double space
            "&nbsp;": " ",
            //remove spaces around mdash

        };
        var tagSubs = {
            'i': 'em',
            'b': 'strong'
        };
        $.each(subs, function(k, v) {
            uglyText = uglyText.replace(new RegExp(k, 'g'), v);
        });
        uglyText = uglyText.replace(/\s+&mdash;\s+/g, '&mdash;');
        $.each(tagSubs, function(k, v){
            uglyText = stuffToStuff(k, v, uglyText);
        });
        uglyText = changeLinkTarget(uglyText);
        $('#uglyText').val(uglyText);
    });
});
