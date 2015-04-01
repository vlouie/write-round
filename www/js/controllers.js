angular.module('starter.controllers', [])

.controller('LoginCtrl', ['$scope', '$state', '$http', function($scope, $state, $http){
console.log('idk');
    this.user = {};

    this.login = function(user) {
        $http.post('http://localhost:3000/login', {username: user.username, password: user.password}).
            success(function(data){
                // TODO handle different data results
                console.log(data);
                $state.go('tab.dash');
            }).
            error(function(data){
                console.log('http post error :(');
                console.log(data);
            });
    };

    this.logout = function() {
    console.log('logout function called');
        $http.post('http://localhost:3000/logout', {}).
            success(function(data){
                // TODO handle different data results
                console.log(data);
                $state.go('login');
            }).
            error(function(data){
                console.log('http logout post error :(');
                console.log(data);
            });
    }
}])

.controller('RegisterCtrl', ['$scope', '$state', '$http', function($scope, $state, $http){
    this.user = {};

    this.register = function(user) {
        $http.post('http://localhost:3000/register', {username: user.username, password: user.password, email: user.email}).
            success(function(data){
                console.log(data);
                // set session stuff?
                $state.go('tab.dash');
            }).
            error(function(data){
                console.log('http post error :(');
                console.log(data);
            });
    };
}])

.controller('LogoutCtrl', ['$scope', '$state', '$http', function($scope, $state, $http){
    this.logout = function(user) {
        //TODO send HTTP request to /logout
    };
}])

.controller('DashCtrl', function($scope) {})

.controller('SessionsCtrl', function($scope, Sessions) {
  $scope.sessions = Sessions.all();
  $scope.remove = function(session) {
    Sessions.remove(session);
  }
})

.controller('SessionDetailCtrl', function($scope, $stateParams, Sessions) {
  $scope.session = Sessions.get($stateParams.sessionId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
