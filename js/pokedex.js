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

pokeApp.controller('pokemonSelected', function($scope, selectedPokemon) {
    $scope.$watch(function(){
            return selectedPokemon.getPokemon()
        }
        ,function (newPok){
            $scope.pokemon = newPok;
        });
});

pokeApp.factory('selectedPokemon', function($resource, $log, $rootScope){
    var pokemon = {};
    var details = {};
    function find(url){
        var donnees = $resource(url);
        donnees.get().$promise.then(function(result){
            pokemon = result;
            var Apidetails = $resource(result.species.url);
            Apidetails.get().$promise.then(function(result){
                var details = result.flavor_text_entries.find(function(m){
                        return m.language.name === "en";
                });
                pokemon.details = details.flavor_text;
            });
        });
    }
    function getPokemon(){
        return pokemon;
    }

    return {find: find, getPokemon: getPokemon}
});

pokeApp.directive('pokedex', function() {
    return {
        templateUrl: 'pokedex.html'
    };
});