function jQuerySubmit(type, url, retorno) {
    $.ajax({
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("X-Parse-Application-Id","L7F9ql3DctcnCtoDwah0GGG8GFw8vuWJ6OWFJgNp");
            xhrObj.setRequestHeader("X-Parse-REST-API-Key","TLtoYkorgdYipUyLayJnWEjZUuiuhWhTimVzJLg5");                
        },
        type: type,
        url: url,
        processData: false,
        dataType: "json",
        success: function(data){ retorno(data)},
        error: function(){ alert("Erro ao carregar PARSE")}
    });
}

/* funçãos AJAX*/

function loadParse(a, b){

        jQuerySubmit("GET",'https://api.parse.com/1/classes/Cervejas/?where={"teor":{"$gte":'+a+',"$lte":'+ b +'}}', function(data) {
                            

                   for(var i = 0; i < data.results.length; i++){

                        jQuery("#section1").append('<div class="blocos">' +
                            '<div class="col3">' +
                            '<h3 class="titleCall">'+data.results[i].nome+'</h3>' +
                            '<p>'+data.results[i].descr+'</p>' +
                            '<h5>'+data.results[i].teor+'</h5>' +
                            '<h5>'+data.results[i].preco+'</h5>' +
                            '<h6>'+data.results[i].objectId+'</h6>' + 
                            '<button class="buttonDel" onclick="deletar(\''+ data.results[i].objectId +'\')" value="delete">Delete</button>'+
                            '<button class="buttonEdit" id="buttonEdit" onclick="getOne(\''+ data.results[i].objectId +'\')" value="Editar">Editar</button>'+
                            '</div>' +
                            '<ul id="ulCall"></ul>' +
                            '</div>');
                        
                };    
        });
};

function getOne(getID2){
    jQuerySubmit("GET",'https://api.parse.com/1/classes/Cervejas/'+getID2, function(data){
        jQuery("#modalEdit").append('<div id="editName" class="field f_100">'+
                    '<input type="text" name="editName" id="editName" required="required" value="'+data.nome+'">'+ '</div>'+
                    '<div id="editDescr" class="field f_100">'+
                    '<textarea rows="5" cols="20" name="editDescr" id="editDescr" required="required">'+data.descr+'</textarea>'+'</div>'+
                    '<div id="editTeor" class="field f_100">'+
                    '<input type="number" name="editTeor" id="editTeor" required="required" value="'+data.teor+'">'+'</div>'+
                    '<div id="editPreco" class="field f_100">'+
                     '<input type="number" name="editPreco" id="editPreco" required="required" value="'+data.preco+'">'+'</div>'
                ); 
    $( "#modalEdit" ).dialog({
          modal: true,
          buttons: {
                Ok: function() {

                    var cervejasNome = $("input[name=editName]").val();
                    var cervejasDescr = $("textarea[name=editDescr]").val();
                    var cervejasTeor = parseFloat($("input[name=editTeor]").val());
                    var cervejasPreco = parseFloat($("input[name=editPreco]").val());
                    
                  $.ajax({
                    beforeSend: function(xhrObj){
                        xhrObj.setRequestHeader("X-Parse-Application-Id","L7F9ql3DctcnCtoDwah0GGG8GFw8vuWJ6OWFJgNp");
                        xhrObj.setRequestHeader("X-Parse-REST-API-Key","TLtoYkorgdYipUyLayJnWEjZUuiuhWhTimVzJLg5");                
                    },
                    type:"PUT",
                    url:'https://api.parse.com/1/classes/Cervejas/'+ getID2,
                    processData:false,
                    dataType:"json",
                    data: JSON.stringify({"nome":cervejasNome,
                                            "descr":cervejasDescr,
                                            "teor":cervejasTeor,
                                            "preco":cervejasPreco}),
                    contentType: "application/json; charset=UTF-8"
                    })
         
                    document.getElementById("section1").innerHTML = ""
                    document.getElementById("modalEdit").innerHTML = ""
                    loadParse(1, 100)
    
                    $('#modalEdit').on('hidden', function () {
                        $('input').val('');
                    });

                    $( this ).dialog( "close" );
                },
                Close: function(){
                    document.getElementById("modalEdit").innerHTML = ""
    
                    $('#modalEdit').on('hidden', function () {
                        $('input').val('');
                    });

                    $( this ).dialog( "close" );

                }
            }
        })
    })
} 


function deletar(idObject){
    jQuerySubmit("DELETE",'https://api.parse.com/1/classes/Cervejas/'+ idObject, function(data){
        document.getElementById("section1").innerHTML = ""
        loadParse(1, 100)
    })
};

/* validador do cadastro */

function cadastro(){
 
    $( "#modalCadastro" ).dialog({
          modal: true,
          buttons: {
                    Ok: function(){
                        var cervejasNome = $("input[name=enterName]").val();
                        var cervejasDescr = $("textarea[name=enterDescr]").val();
                        var cervejasTeor = parseFloat($("input[name=enterTeor]").val());
                        var cervejasPreco = parseFloat($("input[name=enterPreco]").val());
                       
                        $.ajax({

                            beforeSend: function(xhrObj){
                                xhrObj.setRequestHeader("X-Parse-Application-Id","L7F9ql3DctcnCtoDwah0GGG8GFw8vuWJ6OWFJgNp");
                                xhrObj.setRequestHeader("X-Parse-REST-API-Key","TLtoYkorgdYipUyLayJnWEjZUuiuhWhTimVzJLg5"); 
                            },
                             
                            type: "POST",
                            data: JSON.stringify({"nome":cervejasNome,
                                                    "descr":cervejasDescr,
                                                    "teor":cervejasTeor,
                                                    "preco":cervejasPreco}),
                            url: 'https://api.parse.com/1/classes/Cervejas',
                            dataType: "json",
                            contentType: "application/json; charset=UTF-8"

                            })
                        document.getElementById("section1").innerHTML = ""
                        document.getElementById("modalCadastro").innerHTML = ""
                        loadParse(1, 100)
        
                        $('#modalEdit').on('hidden', function () {
                            $('input').val('');
                        });

                        $( this ).dialog( "close" );
                    },
                    Close: function(){
                    document.getElementById("modalEdit").innerHTML = ""
    
                    $('#modalEdit').on('hidden', function () {
                        $('input').val('');
                    });

                    $( this ).dialog( "close" );
                    }     
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

$(".cs-text-cut").lettering('words');

/* prompt de cadastro */





