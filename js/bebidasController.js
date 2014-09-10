var bebidasApp = angular.module('bebidasApp', []);

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
	$scope.pagina = 0;
	$scope.definirPagina = function (numeroPagina) {
		$scope.pagina = numeroPagina;
		
	};

	jQuerySubmit("GET",'https://api.parse.com/1/classes/Cervejas', function (data) {
		$scope.bebidas = data.results;
		$scope.$apply();
	})

}]);