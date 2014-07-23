'use strict';

angular.module('mean.mean-crop').directive('meanCrop', function($http) {
    return {
        templateUrl: 'mean-crop/views/directives/meanCrop.html',
        scope: {
            imgSrc: '=',
            cropDest: '=',
            cropCallback: '&',
            coords: '=',
            width: '=',
            height: '=',
        },
        restrict: 'E',
        replace: true,
        link: function($scope, element, attrs) {
            function updatePreview(c) {
                $scope.coords = c;
                if (parseInt(c.w) > 0) {
                    var rx = xsize / c.w;
                    var ry = ysize / c.h;
                    $pimg.css({
                        width: Math.round(rx * boundx) + 'px',
                        height: Math.round(ry * boundy) + 'px',
                        marginLeft: '-' + Math.round(rx * c.x) + 'px',
                        marginTop: '-' + Math.round(ry * c.y) + 'px'
                    });
                }
            }

            $('#mean-crop-pane .mean-crop-container').width($scope.width);
            $('#mean-crop-pane .mean-crop-container').height($scope.height);

            var jcrop_api,
                boundx,
                boundy,

                // Grab some information about the preview pane
                $preview = $('#mean-crop-pane'),
                $pcnt = $('#mean-crop-pane .mean-crop-container'),
                $pimg = $('#mean-crop-pane .mean-crop-container img'),

                xsize = $pcnt.width(),
                ysize = $pcnt.height();

            $('#target').Jcrop({
                onChange: updatePreview,
                onSelect: updatePreview,
                aspectRatio: xsize / ysize
            }, function() {
                // Use the API to get the real image size
                var bounds = this.getBounds();
                boundx = bounds[0];
                boundy = bounds[1];
                // Store the API in the jcrop_api variable
                jcrop_api = this;
                // Move the preview into the jcrop container for css positioning
                $preview.appendTo(jcrop_api.ui.holder);

                if ($scope.coords)
                    updatePreview($scope.coords);

            });

            $scope.crop = function() {
                $http.get('/meanCrop/crop?coords=' + JSON.stringify($scope.coords) + '&src=' + $scope.imgSrc + '&w=' + $scope.width + '&h=' + $scope.height + '&dest=' + $scope.cropDest).success(function(data) {
                    if (data) {
                        if (angular.isDefined(attrs.cropCallback)) {
                            data.coords = $scope.coords;
                            $scope.cropCallback({
                                data: data
                            });
                        }
                    }
                });
            };
        }
    };
});