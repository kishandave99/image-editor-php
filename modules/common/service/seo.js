angular.module('image-editor').service('seo', ['$window', function ($window) {
    var self = this;
    self.setMetaTags = function (tagData) {
        $window.document.getElementsByName('keyword')[0].content = tagData.keyword;
        $window.document.getElementsByName('description')[0].content = tagData.description;
    };
}]);