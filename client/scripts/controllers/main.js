'use strict';

/**
 * @ngdoc function
 * @name spacecraft.controller:MainController
 * @description
 * # MainController
 * Controller of the spacecraft
 */
angular.module('spacecraft.main', [])
    .config(['$stateProvider', function ($stateProvider)
    {
        // Our first state called `menu`
        $stateProvider
            .state('game', {
                url: '',
                templateUrl: 'views/main.html',
                controller: 'MainController as ctrl'
            });
    }])

    .controller('MainController', ['$scope', '$storage', function ($scope, $storage)
    {
        var editorSession,
            editorRenderer;

        $scope.code = $storage.local.getItem("code") || "return { \n\t" +
                        "run : function(spaceCraft, world) \n\t" +
                        "{  \n\t\tspaceCraft.weapon.fire();  \n\t}  " +
                        "\n};";

        $scope.isCodeRunning = false;
        $scope.hideEditor = false;
        $scope.hideTutorial = true;

        $scope.tipsAndTricks =
        {
            hide: $storage.local.getItem("tipsAndTricks") || false
        };

        $scope.functionTutorial = {};
        $scope.functionTutorialOpen = false;
        $scope.functionFeedBackOpen = false;

        $scope.openFunctionTutorial = function (v)
        {
            $scope.functionTutorial = tutorial[v];
            $scope.functionTutorialOpen = true;
        };

        $scope.aceLoaded = function (editor)
        {
            editorSession = editor.getSession();
            editorRenderer = editor.renderer;

            editor.$blockScrolling = Infinity;

            editorSession.setValue($scope.code);

            $storage.local.setItem("code", $scope.code);
        };

        $scope.aceChanged = function ()
        {
            $scope.code = editorSession.getDocument().getValue();

            $storage.local.setItem("code", $scope.code);
        };

        $scope.toggleEditorOpen = function ()
        {
            $scope.hideEditor = !$scope.hideEditor;
        };

        $scope.toggleCodeRun = function ()
        {
            $scope.isCodeRunning = !$scope.isCodeRunning;
        };

        $scope.toggleTutorialOpen = function ()
        {
            if ($scope.functionTutorialOpen)
            {
                $scope.functionTutorialOpen = false;
            }
            else
            {
                $scope.hideTutorial = !$scope.hideTutorial;
            }
        };

        $scope.openFeedBack = function ()
        {
            $scope.functionFeedBackOpen = !$scope.functionFeedBackOpen;
        };

        $scope.toggleTipsAndTricks = function ()
        {
            $scope.tipsAndTricks.hide = !$scope.tipsAndTricks.hide;
        };
    }]);
