'use strict';

/**
 * @ngdoc function
 * @name spacecraft.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spacecraft
 */
angular.module('spacecraft.main', [])
    .config(['$stateProvider', function ($stateProvider)
    {
        // Our first state called `menu`
        $stateProvider
            .state('game', {
                url: '',
                templateUrl: '/views/main.html',
                controller: 'MainController as ctrl'
            });
    }])
    .controller('MainController', ['$scope', function ($scope)
    {
        var editorSession,
            editorRenderer;

        $scope.aceLoaded = function (editor)
        {
            editorSession = editor.getSession();
            editorRenderer = editor.renderer;
        };

        $scope.aceChanged = function ()
        {
            console.log(editorSession.getDocument().getValue());
        };
    }]);
