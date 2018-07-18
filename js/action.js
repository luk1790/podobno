// https://github.com/alvarotrigo/fullPage.js

require.config({

    baseUrl: 'js/lib',

    shim: {
        'jquery': {
            exports: '$'
        },

        'bootstrap': {
        	deps: ['jquery']
        },

        'fullPage': {
            deps: ['jquery']
        },

    },
});

require(['jquery', 'fullPage', 'bootstrap'], function($) {

    var $this = this;
    $.each(this.getParam(), function(index, value) {
        $this.$('#fullpage').append('<div class="section">' + value + '</div>');
    });
    $('#fullpage').fullpage({
        loopBottom: true,
    });

    $('.btn-add').click(function(){
        var $id = $('.single-param').length + 1;
        $('.form-param').append('<div class="form-group single-param" data="'+$id+'"><label for="recipient-name" class="control-label">Tekst : </label><input type="text" class="form-control" id="recipient-name"></div>');
    });

    $('.btn-accept').click(function(){
        $this.createUrl();    
    });


    $('.btn-close').click(function(){
        $('.form-param').html('<div class="form-group single-param" data="1"><label for="recipient-name" class="control-label">Tekst : </label><input type="text" class="form-control" id="recipient-name"></div>');    
    });

    $("#recipient-name").keyup(function(event){
        if(event.keyCode == 13){
            $this.createUrl();
        }
    });
    
});

function createUrl(){
    var $url = window.location.href.split('?')[0] + '?';
    for (var i = 1; i <= $('.single-param').length; i++) {
        console.log($('.single-param[data="'+ i +'"]').children('#recipient-name').val());
        $url += "param=" + $('.single-param[data="'+ i +'"]').children('#recipient-name').val() + "&";
    }
    window.open($url, "_self");
}

function getParam() {
    var params = [];
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == "param") {
            params.push(decodeURI(pair[1]));
        }
    }
    return params;
}
