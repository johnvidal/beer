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

bebidasApp.controller('bebidasCtrl', ['$scope', function ($scope) {
	$scope.bebidas = [];

	$scope.paises = ['Brasil', 'Bélgica', 'Estados Unidos', 'Holanda', 'Irlanda', 'México', 'Dinamarca'];
	$scope.pagina = 0;

	$scope.reload = function (numeroPag) {
		$scope.pagina = numeroPag;
		$scope.bebidas = $scope.todasBebidas;
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

	jQuerySubmit("GET",'https://api.parse.com/1/classes/Cervejas', function (data) {
		var bebidas = data.results;
		$scope.todasBebidas = bebidas;
		$scope.bebidas = bebidas;
		atualizar($scope);
	})
}]);