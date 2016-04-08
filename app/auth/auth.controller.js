angular.module('angularfireSlackApp').
controller('AuthCtrl', function(Auth, $state, Users, $scope){

	var authCtrl = this;

	authCtrl.user = {
		email: '',
		password: '',
	}

	authCtrl.login = function(){
		Auth.$authWithPassword(authCtrl.user).then(function(auth){
			$state.go('home');
		}, function(error){
			authCtrl.error = error;
		});
	};

	authCtrl.register = function(){
		Auth.$createUser(authCtrl.user).then(function(user){
			console.log("sucess");
			authCtrl.login()
		}, function(error){
			authCtrl.error = error;
		});
	};

	//LOG OUT
	$scope.logout = function(){
		Auth.$unauth();
		$state.go('home');
	};

	//LOG IN WITH SOCIAL MEDIA
	$scope.loginOAuth = function(provider){
		Auth.$authWithOAuthPopup(provider).then(function(authData){
			console.log(authData);
		}).catch(function(error){
			$scope.error = error;
		})
	};

	//WATCH AUTHENTICATION STATUS
	Auth.$onAuth(function(authData){
		if(authData){
			Users.getProfile(authData.uid).$loaded().then(function(userData){
				if(!userData.displayName){ //new user
					$state.go('profile');
				}
				$scope.profile = userData;
				$state.go('home');
			});
		}
		else {
			$scope.profile = null;
		}
	});
})