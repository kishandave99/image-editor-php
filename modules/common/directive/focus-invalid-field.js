(function () {
  angular.module('focus.invalid.field', [])
    .directive('focusInvalidField', function () {
      return {
        restrict: 'A',
        link: function (scope, elem) {
          elem.on('submit', function () {
            // console.log(elem.find('.ng-invalid:visible'));
            if (elem.find('.ng-invalid:visible').length != 0) {
              elem.find('.ng-invalid:visible').first().focus();
              $("#" + elem.find('.ng-invalid:visible').first()[0].id).addClass("focusRed");
              if (elem.find('.ng-invalid:visible').first()[0].localName == 'div') {
                document.getElementById(elem.find('.ng-invalid:visible').first()[0].id).focus();
              }
            }
          });
        }
      };
    });
})();
 