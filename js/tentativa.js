function ajax(a, b){

        $.ajax({
                        beforeSend: function(xhrObj){
                                xhrObj.setRequestHeader("X-Parse-Application-Id","L7F9ql3DctcnCtoDwah0GGG8GFw8vuWJ6OWFJgNp");
                                xhrObj.setRequestHeader("X-Parse-REST-API-Key","TLtoYkorgdYipUyLayJnWEjZUuiuhWhTimVzJLg5");                
                        },
                        type:"GET",
                        url:'https://api.parse.com/1/classes/Cervejas/?where={"teor":{"$gte":'+a+',"$lte":'+ b +'}}',
                        processData:false,
                        dataType:"json",
                }).then(function(data) {
               
               for(var i = 0; i < data.results.length; i++){
                    jQuery("#section1").append('<div class="main loginboxinner">' +
                        '<div class="col3">' +
                        '<h3 class="titleCall">'+data.results[i].nome+'</h3>' +
                        '<p>'+data.results[i].descr+'</p>' +
                        '<h5>'+data.results[i].teor+'</h5>' +
                        '<h5>'+data.results[i].preco+'</h5>' +
                        '</div>' +
                        '<ul id="ulCall"></ul>' +
                        '</div>');

                }    
        });
};

 function getValue(){
    var a = document.getElementById("min").value
    var b = document.getElementById("max").value
    document.getElementById("section1").innerHTML = ""
    ajax(a, b)

 }

$(document).ready(ajax(1, 100))

$(function(){
 
    $("#button").click(function(){
 
        var a1 = $("input[name=field1]").val();
        var b2 = $("textarea[name=field4]").val();
        var c3 = parseFloat($("input[name=field7]").val());
        var d4 = parseFloat($("input[name=field10]").val());
        //var cerveja = {
             //"nome": "skol",
             //"descr": "lol"
        //}
        $.ajax({

            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("X-Parse-Application-Id","L7F9ql3DctcnCtoDwah0GGG8GFw8vuWJ6OWFJgNp");
                xhrObj.setRequestHeader("X-Parse-REST-API-Key","TLtoYkorgdYipUyLayJnWEjZUuiuhWhTimVzJLg5"); 
            },
             
            type: "POST",
            data: JSON.stringify({"nome":a1,
                                "descr":b2,
                                "teor":c3,
                                "preco":d4}),
            url: 'https://api.parse.com/1/classes/Cervejas',
            dataType: "json",
            contentType: "application/json; charset=UTF-8"

        })            
    });
});