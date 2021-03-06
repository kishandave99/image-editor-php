function changeHeader($scope, $location, $rootScope, $window, $http, blockUI, appUrl) {
    $window.scrollTo(0, 0);

};
angular.module('image-editor')
    .controller('changeHeader', changeHeader);