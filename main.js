var app = angular.module('main', []);
app.controller('main', function ($scope) {
    $scope.conexoes = [];
    $scope.estados = [{isEstadoFinal: false}];
    $scope.alfabetoLong = "";
    $scope.stringAvaliada = "";
    $scope.mensagemAceita = "";
    $scope.mensagemFinito = "";


    $scope.resetar = function () {
        $scope.conexoes = [];
        $scope.alfabeto = [];
        $scope.estados = [{isEstadoFinal: false}];
        $scope.alfabetoLong = "";
        $scope.stringAvaliada = "";
        $scope.mensagemAceita = "";
    };

    $scope.isFinito = function(){
        //Checando pra ver se linha toca em si mesma
        for(var i = 0 ; i < $scope.conexoes.length ; i++){
            for(var j = 0 ; j < $scope.conexoes[i].length ; j++){
                if($scope.conexoes[i][j] === i && $scope.estados[i].isEstadoFinal){
                    $scope.mensagemFinito = "Linguagem reconhecida não é finita!";
                    return;
                }
            }
        }
        $scope.mensagemFinito = "Linguagem reconhecida é finita!"
    };

    $scope.calcular = function () {
        $scope.isFinito();
        for(var i = 0 ; i < $scope.stringAvaliada.length ; i++){
            if(!$scope.alfabetoLong.includes($scope.stringAvaliada.charAt(i))){
                $scope.mensagemAceita = "String não aceita!";
                return;
            }
        }
        var stringTemp = $scope.stringAvaliada;
        var proximo = 0;
        if(!$scope.conexoes[0]){
            $scope.mensagemAceita = "String não aceita!";
            return;
        }
        while(true){
            var char = stringTemp.charAt(0);
            var index = $scope.alfabetoLong.indexOf(char); //Descobrir a coluna?
            if($scope.conexoes[proximo][index] === "" || stringTemp.length === 0 || $scope.conexoes[proximo][index] === proximo){
                if($scope.estados[proximo].isEstadoFinal){
                    $scope.mensagemAceita = "String aceita!"
                }else{
                    $scope.mensagemAceita = "String não aceita!"
                }
                return;
            }else{
                proximo = parseInt($scope.conexoes[proximo][index]);
                stringTemp = stringTemp.slice(1);
            }
        }
    };

    $scope.toggleFinal = function (index) {
        $scope.estados[index].isEstadoFinal = !$scope.estados[index].isEstadoFinal;
    };

    $scope.popular = function(){
        for(var i = 0 ; i < $scope.estados.length ; i++){
            if(!$scope.conexoes[i]){
                $scope.conexoes[i] = [];
            }
            for(var j = 0 ; j < $scope.alfabetoLong.length ; j ++){
                if(!$scope.conexoes[i][j]){
                    $scope.conexoes[i][j] = "";
                }
            }
        }
    };

    $scope.adicionarEstado = function () {
        $scope.estados.push({isEstadoFinal: false});
        $scope.popular();
    }


});