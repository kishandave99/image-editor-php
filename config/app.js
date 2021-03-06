angular.module('image-editor',
    [
        'ngRoute',
        'blockUI',
        'focus.invalid.field',
        'ngFileUpload',
        'ngCookies',
        'dm.style'
    ])
    .factory('httpErrorResponseInterceptor', ['$q', '$location', '$rootScope', 'appUrl', 'blockUI', '$window', 'cookieService',
        function ($q, $location, $rootScope, appUrl, blockUI, $window, cookieService) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    config.withCredentials = true;
                    return config;
                },
                response: function (responseData) {
                    return responseData;
                },

                responseError: function error(response) {

                    //alert(response.status);
                    switch (response.status) {
                        case -1:
                            if (blockUI.state().blocking) {
                                blockUI.stop();
                            }
                            $location.path(appUrl.pageError)
                            break;
                        case 401:
                            $location.path(appUrl.page401);
                            break;
                        case 502:
                            $location.path(appUrl.page502);
                            break;
                        case 400:
                            $location.path(appUrl.page400);
                            break;
                        case 404:
                            $location.path(appUrl.page404);
                            break;
                        case 500:
                            $location.path(appUrl.page500);
                            break;
                        case 405:
                            $location.path(appUrl.page404);
                            break;
                        case 403:
                            $location.path(appUrl.page403);
                            break;
                        default:
                            $location.path(appUrl.page404);
                    }

                    return $q.reject(response);
                }
            };
        }
    ]);

angular.module("image-editor").config(function (blockUIConfig, $provide) {
    blockUIConfig.message = '';
    blockUIConfig.autoBlock = false;


    $provide.decorator('$exceptionHandler', function ($delegate, $injector) {
        return function (exception, cause) {
            console.log(exception);
            var pageRoute = $injector.get("$location");
            pageRoute.path('/internalservererror');
        };
    })
})

//Http Intercpetor to check auth failures for xhr requests
angular.module("image-editor").config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpErrorResponseInterceptor');
    $httpProvider.defaults.withCredentials = true;
}]);
angular.module("image-editor").run(['$rootScope', '$http', '$window',
    function ($rootScope, $http, $window) {
        $rootScope.online = navigator.onLine;
        $window.addEventListener("offline", function () {
            $rootScope.$apply(function () {
                $rootScope.online = false;
            });
        }, false);
        $window.addEventListener("online", function () {
            $rootScope.$apply(function () {
                $rootScope.online = true;
            });
        }, false);

        // set environment


        $rootScope.webService = window.environment.webService;
        $rootScope.baseUrl = window.environment.baseUrl;
        $rootScope.publicResourceUrl = window.environment.publicResourceUrl;

}]);
angular.module('image-editor').directive('sbLoad', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var fn = $parse(attrs.sbLoad);
            elem.on('load', function (event) {
                scope.$apply(function () {
                    fn(scope, { $event: event });
                });
            });
        }
    };
}]);