/**
 * localStorage 存储类
 */
angular.module('$localStorage',[])
.factory('$localStorage', ['$window', function($window) {
	return {
		set: function(key, value) {
			$window.localStorage[key] = value;
		},
		get: function(key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
		setObject: function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key) {
			return JSON.parse($window.localStorage[key] || '{}');
		},
		removeItem: function(key) {
			$window.localStorage.removeItem(key);
		},
		removeAll: function() {
			$window.localStorage.clear();
		}
	}
}]);