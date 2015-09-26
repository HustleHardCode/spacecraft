'use strict';

/**
 * @ngdoc overview
 * @name  Spacecraft
 * @description
 * # spacecraft
 *
 * Main module of the application.
 */
angular.module('spacecraft', [
        'ui.router'
    ])
    .config(function($stateProvider, $urlRouterProvider)
    {
        // For any unmatched url, send to ""
        $urlRouterProvider.otherwise("");

        // Our first state called `menu`
        $stateProvider
            .state('game', {
                url: '',
                templateUrl: '/views/main.html',
                controller: 'GameController as ctrl'
            });
    });
