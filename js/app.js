var app = angular.module('app', []);

app.controller('dataCtrl', function ($scope, $http) {
    
    $scope.loadAll = function (name, template, css) {
        loadTemplate(template, activeIFrameDoc);

        $http.get(''+ css +'').then(function (response) {
            $scope.cssRule = cssToArrObjs(response.data);

            //.replace(/\r?\n|\r|\s/g,'')
        });
    };

    var init = function () {
        $http.get("templates/package.json").then(function (response) {
            $scope.templates = response.data;
        });
    };

    init();

    ////////////

    var activeIFrame = document.getElementById('active');
    var activeIFrameDoc = document.getElementById('active').contentWindow.document;

    // load functions

    function loadTemplate(src, doc) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                doc.body.insertAdjacentHTML('beforeend', this.response);
                addClickEvent();
            }
        };
        xhttp.open("GET", src, true);
        xhttp.send();
    }

    function loadScript(src, doc) {

        var script = doc.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        doc.contentWindow.document.body.appendChild(script);
    }

    function loadStyle(name, src, doc) {
        var head = doc.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        if(!doc.getElementById(name)){
            link.id = name;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = src;
            link.media = 'all';
            head.appendChild(link);
        }
    }

    function loadTemplateCss(css){
        var b = document.querySelector('#test').innerHTML;
        console.log(b);
        // console.log(getTemplateCss(css))
    }

    // add event to select elements in iframe
    function addClickEvent() {
        var elements = activeIFrameDoc.body.querySelectorAll('*');

        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click", selectElement);
        }
    }

    // do something on element selection

    function selectElement(event) {

        event.stopPropagation();

        //var css = GetAppliedCssRules($(event.target), activeIFrameDoc);

        //createUserCss(css);
        document.querySelector('#css').value = '';
        document.querySelector('#css').value = css;
    }

    // rgba to hex color converter

    function rgb2hex(rgb){
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    }

    // convert css to obj

    function cssToArrObjs(cssText){
        var styles = cssText.replace(/((["'])(?:\\[\s\S]|.)*?\2|\/(?![*\/])(?:\\.|\[(?:\\.|.)\]|.)*?\/)|\/\/.*?$|\/\*[\s\S]*?\*\//gm,'').split('}');
        styles.pop();
        var cssObjs = [];
        styles.forEach(function(element, index, array){
            cssObjs.push(cssToObj(element.trim()))
        });
        return cssObjs
    }

    function cssToObj(cssText){
        var openBrace = cssText.indexOf('{');
        var css = cssText.slice(openBrace).replace(/({|})/g,'');
        var selector = cssText.slice(0, openBrace).trim();
        var rules = css.split(';');
        if(css.substr(-1) == ';'){rules.pop()}
        var properties = [];
        var values = [];
        rules.forEach(function(element, index, array){
            var rule = element.split(':');
            properties.push(rule[0].trim());
            values.push(rule[1].trim());
        });
        var objCss = {};
        var objRule = {};
        for (var i = 0; i < properties.length; i++){
            objCss[properties[i]] = values[i]
        }
        objRule[selector] = objCss;
        return objRule
    }
    
});
