angular
    .module('image-editor')
    .constant('appUrl', {
        //Application basic pages
        loadingpage_url: '/loading',
        //dashboard module
        homePage_url: '/',
        

        //Application error pages
        page404: '/pageNotFound',
        page500: '/internalservererror',
        page503: '/serviceunavailable',
        page401: '/unauthorized',
        page403: '/forbidden',
        page502: '/badgateway',
        page400: '/badrequest',
        pageError: '/error',

        // resourceImageDownload: '/public/file/download-project-renovation-image?fileId='
        resourceImageDownload: '/uploads/'

    });