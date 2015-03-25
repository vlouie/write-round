angular.module('starter.controllers', [])

.controller('LoginCtrl', ['$scope', '$state', '$http', function($scope, $state, $http){
    this.user = {};

    this.login = function(user) {
        console.log(user);
        $http.post('http://localhost:3000/login', {username: user.username, password: user.password}).
            success(function(data){
                $state.go('tab.dash');
            }).
            error(function(data){
            });
    };
}])

.controller('RegisterCtrl', function($scope){})

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
