/**
 * Created by dantedimon on 5/7/2017.
 */


var getStyleOf = [{name:'position',inputs:1},{name:'margin',inputs:4},{name:'padding',inputs:4},{name:'color',inputs:1},{name:'background-color',inputs:1}];
var styleDefaults = [];

// get styles

function getStyle(inputs, style) {
    var from = $('#active').contents().find('body .selected');

    var to = $('input[name='+style+']');

    switch (inputs){
        case 1:
            var val = from.css(style);
            if(style == 'color' || style == 'background-color'){
                val = rgb2hex(val)
            }
            to.val(val);
            break;

        case 4:
            if(style == 'margin' || style == 'padding'){
                var add = ['-top','-right','-bottom','-left'];
                var values = [];
                for(var i = 0; i < add.length; i++){
                    var val = from.css(style + add[i]);
                    values.push(val)
                }
                var val = values.join(' ');
                to.val(val);
            }
            break;
    }

    var exist;

    for(var i = 0; i < styleDefaults.length; i++){
        if(styleDefaults[i].hasOwnProperty(style)){
            exist = true
        }
    }

    if(exist != true ){
        styleDefaults.push({name:style, value:val});
    }
}

// set styles

function setStyle(e) {
    var from = document.getElementsByName(e.target.name)[0];
    var to = $('#active').contents().find('body .selected');

    to.css(e.target.name, from.value)
}

function toDefaults(e) {
    var from = $('input[name='+e.target.previousElementSibling.name+']');
    var to = $('#iframe').contents().find('body .selected');

    for(var i = 0; i < styleDefaults.length; i++){
        if(e.target.previousElementSibling.name == styleDefaults[i].name){
            from.val(styleDefaults[i].value);
            to.css(styleDefaults[i].name, styleDefaults[i].value);
        }
    }

    console.log(styleDefaults)
}