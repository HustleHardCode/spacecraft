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
        $scope.isCodeRunning = true;
        $scope.hideEditor = false;

        $scope.aceLoaded = function (editor)
        {
            editorSession = editor.getSession();
            editorRenderer = editor.renderer;

            editor.$blockScrolling = Infinity;

            editorSession.setValue($scope.code);
        };

        $scope.aceChanged = function ()
        {
            $scope.tmpCode = editorSession.getDocument().getValue();
        };

        $scope.toggleEditorOpen = function ()
        {
            $scope.hideEditor = !$scope.hideEditor;
        };

        $scope.toggleCodeRun = function ()
        {
            $scope.isCodeRunning = !$scope.isCodeRunning;

            if ($scope.isCodeRunning)
            {
                $scope.code = $scope.tmpCode;
            }
            else
            {
                $scope.code = null;
            }
        };
    }]);
