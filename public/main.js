
angular.module('demoApp', [])
   .controller('demoAppController', function($scope, $http) {

        $scope.getProdList = function() {
            $http.get('/api/products?')
                .success(function(data) {
                    var newItems = [];
                    for (var ii = 0;  ii< data.rows.length; ii++) {
                        newItems.push(data.rows[ii].doc);
                    }
                    $scope.products = newItems;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.getCustList = function() {
            $http.get('/api/customers?')
                .success(function(data) {
                    var newItems = [];
                    for (var ii = 0;  ii< data.rows.length; ii++) {
                        newItems.push(data.rows[ii].doc);
                    }
                    $scope.customers = newItems;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
});
