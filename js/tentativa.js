/* funçãos para carregar o parse */
function carregar(bbbb){
    $.ajax({
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("X-Parse-Application-Id","L7F9ql3DctcnCtoDwah0GGG8GFw8vuWJ6OWFJgNp");
            xhrObj.setRequestHeader("X-Parse-REST-API-Key","TLtoYkorgdYipUyLayJnWEjZUuiuhWhTimVzJLg5");                
        },
        type:"DELETE",
        url:'https://api.parse.com/1/classes/Cervejas/'+ bbbb,
        processData:false,
        dataType:"json",
    }).then(function(){
        document.getElementById("section1").innerHTML = ""
        loadParse(1, 100)
    })
}

function modal() {
    $( "#modalCreate" ).dialog({
      modal: true,
      buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }
    });
  };

function loadParse(a, b){

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

                        var carregandoObjeto = data.results[i].objectId

                        jQuery("#section1").append('<div class="blocos">' +
                            '<div class="col3">' +
                            '<h3 class="titleCall">'+data.results[i].nome+'</h3>' +
                            '<p>'+data.results[i].descr+'</p>' +
                            '<h5>'+data.results[i].teor+'</h5>' +
                            '<h5>'+data.results[i].preco+'</h5>' +
                            '<button class="buttonDel" onclick="carregar(\''+ data.results[i].objectId +'\')" value="delete">Delete</button>'+
                            '<button class="buttonEdit" id="buttonEdit" onclick="modal()" value="Editar">Editar</button>'+
                            '</div>' +
                            '<ul id="ulCall"></ul>' +
                            '</div>');
                    }    
        });
};

/* filtro de Teor Alcoólico */

function getValue(){
    var a = document.getElementById("min").value
    var b = document.getElementById("max").value
    document.getElementById("section1").innerHTML = ""
    loadParse(a, b)
}

$(document).ready(loadParse(1, 100))

/* prompt de cadastro */


/* validador do cadastro*/

$(function(){
 
    $("#button").click(function(){
 
        var cervejasNome = {"nome":$("input[name=enterName]").val()};
        var cervejasDescr = {"descr":$("textarea[name=enterDescr]").val()};
        var cervejasTeor = {"teor":parseFloat($("input[name=enterTeor]").val())};
        var cervejasPreco = {"preco":parseFloat($("input[name=enterPreco]").val())};
       
        $.ajax({

            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("X-Parse-Application-Id","L7F9ql3DctcnCtoDwah0GGG8GFw8vuWJ6OWFJgNp");
                xhrObj.setRequestHeader("X-Parse-REST-API-Key","TLtoYkorgdYipUyLayJnWEjZUuiuhWhTimVzJLg5"); 
            },
             
            type: "POST",
            data: JSON.stringify(cervejasNome, cervejasDescr, cervejasTeor, cervejasPreco),
            url: 'https://api.parse.com/1/classes/Cervejas',
            dataType: "json",
            contentType: "application/json; charset=UTF-8"

        })            
    });
});