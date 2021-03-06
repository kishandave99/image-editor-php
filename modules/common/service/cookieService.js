(function () {
    'use strict';
    angular
        .module('image-editor')
        .factory('cookieService', cookieService);

    cookieService.$inject = ['$cookies'];
    function cookieService($cookies) {

        var service = {};

        service.get = get;
        service.set = set;
        service.unset = unset;
        service.getAll = getAll;

        return service;
        function getAll() {
            return $cookies.getAll();
        }
        function get(key) {
            return $cookies.getObject(key);
        }
        function set(key, val) {
            return $cookies.putObject(key, val);
        }
        function unset(key) {
            return $cookies.remove(key);
        }

    }
})();