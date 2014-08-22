/* função ajax generica */

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
/* fim da função genérica */

/* ================================= */

/* carregar tabelas */
function loadParse(classe){

        jQuerySubmit("GET",'https://api.parse.com/1/classes/Cervejas'+classe, function(data) {                        

                   for(var i = 0; i < data.results.length; i++){

                        jQuery("#paineis").append('<div id="col-md-4">'+
                        	'<div id="DIV_2">'+'<img src='+data.results[i].imagens+' width="130" height="230" id="IMG_3" />'+'</div>'+
                        	'<div id="DIV_4">'+
                        	'<h3 id="H3_5">'+'<a id="A_6">'+data.results[i].nome+'</a>'+'</h3>'+
                        	'<ul id="UL_17">'+
                        	'<li id="LI_18">'+'<img src='+data.results[i].bandeira+' id="bandeira">'+'<strong id="STRONG_20">'+data.results[i].origem+'</strong>'+'</li>'+
                        	'<li id="LI_185">'+'<img src="img/icones/cerveja.png" id="bandeira">'+'<strong id="avaliacao">'+data.results[i].estilo+'</strong>'+'</li>'+
                        	'</ul>'+
                        	'<p id="P_24">'+'<span id="SPAN_25">'+'R$'+'</span>'+'19'+'<span id="SPAN_26">'+',75'+'</span>'+'</p>'+
                        	'<button type="button" class="btn btn-info" onclick="openMOdal(\''+data.results[i].objectId+'\')">'+'Info'+'</button>'+'</div>'+'</div>'
                            );                        
                	};    
        });
};

function openMOdal(getID2){
    jQuerySubmit("GET",'https://api.parse.com/1/classes/Cervejas/'+getID2, function(data){
        jQuery("#modal").append('<div id="modalTeste">'+
                        	'<h3>'+'Descrição'+'</h3>'+
                        	'<p>'+data.descr+'</p>'+
                        	'<h4>'+'Teor Alcoólico: '+data.teor+'%'+'</h4>'+
                        	'</div>');

        $( "#modalTeste" ).dialog({
	        modal: true,
	        buttons: {
	          	Ok: function(){
	          			$( this ).dialog( "close" )
	          		},
	        }
	    })
	})
};                  

$(document).ready(loadParse("/"))

/* fim do carregar tabelas */

/* ================================= */

/* carregar gerenciador */
function loadTable(a, b){

        jQuerySubmit("GET",'https://api.parse.com/1/classes/Cervejas', function(data) {
                            

                   for(var i = 0; i < data.results.length; i++){

                        jQuery("#tabela").append('<tr>'+
                        	'<td>'+data.results[i].nome+'</td>'+
                        	'<td>'+data.results[i].updatedAt+'</td>'+
                        	'<td>'+'<button type="button" onclick="getOne(\''+ data.results[i].objectId +'\')">'+'<img src="img/icones/editar.png" width="35" height="35"  align="center" />'+'</button>'+'</td>'+
                        	'<td>'+'<button type="button" onclick="confirm(\''+ data.results[i].objectId +'\')">'+'<img src="img/icones/excluir.png" width="35" height="35"  align="center" />'+'</button>'+'</td>'+
                        	'</tr>'
                            );
                        
                };    
        });
};

$(document).ready(loadTable(1, 100))

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
         
                    document.getElementById("tabela").innerHTML = ""
                    document.getElementById("modalEdit").innerHTML = ""
                    loadTable(1, 100)
    
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

function confirm(getID2){
	$( "#confirmar" ).dialog({
	          modal: true,
	          buttons: {
	          	Sim: function(){
	          			jQuerySubmit("DELETE",'https://api.parse.com/1/classes/Cervejas/'+ getID2, function(data){
        				document.getElementById("tabela").innerHTML = ""
        				loadTable(1, 100)
    					})

	          			$( this ).dialog( "close" )
	          		},
	          	Não: function(){$(this).dialog("close")}
	          }
	    });
}
/* fim carregar gerenciador */

/* ================================= */

/* modal cadastrar */
function cadastrar(){
	$( "#modalCadastro" ).dialog({
	          modal: true,
	          buttons: {
	          	Cadastrar:function(){
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
                        document.getElementById("tabela").innerHTML = ""
                        document.getElementById("modalCadastro").innerHTML = ""
                        loadTable(1, 100)
        
                        $('#modalEdit').on('hidden', function () {
                        	$('input').val('');
                    	});


                        $( this ).dialog( "close" )
                    },
	          	Close: function(){
                    document.getElementById("modalEdit").innerHTML = ""
    
                    $('#modalEdit').on('hidden', function () {
                        $('input').val('');
                    });

                    $( this ).dialog( "close" )
	            }
	        }
	})
}
/* fim modal cadastrar */

/* ================================= */

/* filtro bandeiras*/

function filtro(bandeira){
	var colocar = '/?where={"origem":"'+bandeira+'"}'
	document.getElementById("paineis").innerHTML = ""
	loadParse(colocar)

}