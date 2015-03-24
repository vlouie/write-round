angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope){})

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
