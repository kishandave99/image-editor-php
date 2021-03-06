angular.module("image-editor").config(function ($routeProvider, $locationProvider, $provide, appUrl) {
    $locationProvider.html5Mode(true);

    $routeProvider
    .when(appUrl.homePage_url, {
        title: 'Image Editor - Home',
        templateUrl: 'modules/home/view/home.html?v=0.0.0',
        controller: 'homeController',
        resolve: {
            seo: function (seo) {
                return seo.setMetaTags({
                    keyword:'Keyword',
                    description:'Description'
                })
            }
        }
    })
    .when(appUrl.homePage1_url, {
        title: 'Image Editor - Home',
        templateUrl: 'modules/home/view/home2.html?v=0.0.0',
        controller: 'homeController',
        resolve: {
            seo: function (seo) {
                return seo.setMetaTags({
                    keyword:'Keyword',
                    description:'Description'
                })
            }
        }
    })
    .when(appUrl.page500, {
        title: 'Internal Server Error',
        templateUrl: 'modules/error/view/500.html'
    })

    .otherwise({
        title: 'Image Editor - Home',
        // redirectTo: '/',
        templateUrl: "modules/error/view/404.html?v=0.0.0"
    });
})

.run(['$rootScope', 'appUrl', '$http', function($rootScope, appUrl, $http) {

    $rootScope.$on('$routeChangeStart', function(event, current, previous) {
        $rootScope.stateIsLoading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        $rootScope.alertService = alert;
        $rootScope.appUrl = appUrl;
        $rootScope.stateIsLoading = false;
        $rootScope.title = current.title;
    });

}])
