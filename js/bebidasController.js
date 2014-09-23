var bebidasApp = angular.module('bebidasApp', []);


function atualizar(scope, funcao) {

    if (scope.$$phase || scope.$root.$$phase) {
		if (typeof funcao !== 'function') {
			return;
		}    	
		funcao();
    }  else {
		if (typeof funcao !== 'function') {
	    	scope.$apply();
    	} else {
    		scope.$apply(funcao);
    	}
	}
}

function jQuerySubmit(type, url, objeto, retorno) {
	var parametrosEnvio = {
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("X-Parse-Application-Id","L7F9ql3DctcnCtoDwah0GGG8GFw8vuWJ6OWFJgNp");
            xhrObj.setRequestHeader("X-Parse-REST-API-Key","TLtoYkorgdYipUyLayJnWEjZUuiuhWhTimVzJLg5");                
        },
        type: type,
        url: url,
        processData: false,
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function(data){ retorno(data)},
        error: function(){ alert("Erro ao carregar PARSE")}
    };

    if (objeto) {
    	parametrosEnvio.data = JSON.stringify(objeto);
    }

    $.ajax(parametrosEnvio);
}

bebidasApp.controller('bebidasCtrl', ['$scope', function ($scope) {
	var bebidaInicial = {
		nome: '',
		descr: '',
		preco: '',
		teor: '',
		origem: '',
		estilo: '',
		bandeira: ''
	};
	$scope.bebidas = [];

	$scope.paises = ['Brasil', 'Bélgica', 'Estados Unidos', 'Holanda', 'Irlanda', 'México', 'Dinamarca', 'Alemanha'];
	$scope.estilos = ['Large', 'Pilsen'];
	$scope.pagina = 0;
	$scope.bebidaExcluir = null;
	$scope.detalheEscolhido = null;
	$scope.bebida = bebidaInicial;

	$scope.reload = function (numeroPag) {
		$scope.pagina = numeroPag;
		$scope.bebidas = $scope.todasBebidas;
		$scope.detalheEscolhido = null;
		$scope.bebidaEditada = null;
		$scope.bebida = bebidaInicial;
	}

	$scope.definirPagina = function (numeroPagina) {
		$scope.pagina = numeroPagina;
	};

	$scope.definirPaises = function (nomePais) {
		var bebidas = $scope.todasBebidas,
			numeroBebidas = bebidas.length,
			indiceBebida,
			bebida,
			bebidasPais = [];
		
		for (indiceBebida = 0; indiceBebida < numeroBebidas; indiceBebida++) {
			bebida = bebidas[indiceBebida];
			if (bebida.origem === nomePais) {
				bebidasPais.push(bebida);
			}
		}
		$scope.bebidas = bebidasPais;
		atualizar($scope);
	};

	$scope.definirDetalhe = function (objectId) {
		if ($scope.detalheEscolhido) {
			$scope.detalheEscolhido = null;
		} else {
			$scope.detalheEscolhido = objectId;
		}
	};

	$scope.habilitarCadastro = function () {
		if ($scope.bebidaEditada === -1) {
			$scope.bebidaEditada = null;
		} else {
			$scope.bebidaEditada = -1;
		}
		$scope.bebida = bebidaInicial;

	};

	$scope.editarBebida = function (objectId) {
		var bebidas = $scope.bebidas,
			numeroBebidas = bebidas.length,
			indiceBebida,
			bebida;

		$scope.bebidaEditada = objectId;
		for (indiceBebida = 0; indiceBebida < numeroBebidas; indiceBebida++) {
			bebida = bebidas[indiceBebida];
			if (bebida) {
				if (bebida.objectId === objectId) {
					$scope.bebida = bebida;
					break;
				}
			}
		}

		$('#cadastro').toggle()
	};

	$scope.excluir = function () {
		$scope.bebidaExcluir = $scope.bebidaEditada;
	};

	$scope.confirmarExcluir = function () {
		var bebidas = $scope.bebidas,
			numeroBebidas = bebidas.length,
			indiceBebida,
			bebida;

		jQuerySubmit("DELETE", 'https://api.parse.com/1/classes/Cervejas/'+ $scope.bebidaExcluir, null, function(data) {
			for (indiceBebida = 0; indiceBebida < numeroBebidas; indiceBebida++) {
				bebida = bebidas[indiceBebida];
				if (bebida) {
					if (bebida.objectId === $scope.bebidaExcluir) {
						bebidas.splice(indiceBebida, 1);
						break;
					}
				}
			}
			$scope.bebidaExcluir = null;
			$scope.bebidas = bebidas;
			$scope.bebida = bebidaInicial;
			atualizar($scope);
		});
	};

	$scope.cancelarExcluir = function () {
		$scope.bebidaExcluir = null;
		atualizar($scope);
	};

	jQuerySubmit("GET", 'https://api.parse.com/1/classes/Cervejas', null, function (data) {
		var bebidas = data.results;
		$scope.todasBebidas = bebidas;
		$scope.bebidas = bebidas;
		atualizar($scope);
	});


	$scope.cadastrarBebida = function (getId) {
		var bebida = $scope.bebida;
		jQuerySubmit("POST", 'https://api.parse.com/1/classes/Cervejas/' + getID, bebida, function(data) {
			console.log(data);
		});
	}
	/*function confirmDelet(getID2){
		$( "#confirmar" ).dialog({
		          modal: true,
		          buttons: {
		          	Sim: function(){
		          			

		          			$( this ).dialog( "close" )
		          		},
		          	Não: function(){$(this).dialog("close")}
		          }
		    });
	}*/
}]);

function maxLength(el) {    
    if (!('maxLength' in el)) {
        var max = el.attributes.maxLength.value;
        el.onkeypress = function () {
            if (this.value.length >= max) return false;
        };
    }
}