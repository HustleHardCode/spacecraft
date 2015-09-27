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

        $scope.code = "spaceCraft.thrust();";
        $scope.runnable = false;

        $scope.aceLoaded = function (editor)
        {
            editorSession = editor.getSession();
            editorRenderer = editor.renderer;

            editor.$blockScrolling = Infinity;

            editorSession.setValue($scope.code);
        };

        $scope.aceChanged = function ()
        {
            $scope.code = editorSession.getDocument().getValue();
        };

        $scope.run = function ()
        {
            $scope.runnable = true;
        };

        $scope.stop = function ()
        {
            $scope.runnable = false;
        };
    }]);
