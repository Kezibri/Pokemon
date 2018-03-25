var pokeApp = angular.module('pokedex', ['ngResource']);
pokeApp.constant('POKEAPI', 'https://pokeapi.co/api/v2/');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('allPokemons', function($scope, $resource, POKEAPI, selectedPokemon) {
    var donnees = $resource(POKEAPI + "pokemon/?limit=200");
    donnees.get().$promise.then(function(results){
        $scope.pokemons = results.results;
    });
    $scope.sel = function(selected) {
        selectedPokemon.find(selected)
    };
});

