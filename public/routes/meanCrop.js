'use strict';

angular.module('mean.mean-crop').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('meanCrop example page', {
            url: '/meanCrop/example',
            templateUrl: 'mean-crop/views/index.html'
        });
    }
]);
