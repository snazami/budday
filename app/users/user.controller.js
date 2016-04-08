angular.module('angularfireSlackApp').
controller('UserCtrl', function($state, Users, user, $scope, $sce, Auth, $firebaseArray){
	$scope.user = user;
	if($scope.user.vineUrl){
		$scope.vineUrl = $sce.trustAsResourceUrl($scope.user.vineUrl+"/embed/postcard");
	}
	else {
		$scope.vineUrl = null;
	}

	$scope.rating = {
		food: function(){
			var foodArray = new Array($scope.user);
			return foodArray; 
		}
	}

	$scope.food = Number($scope.user.food);
	$scope.party = Number($scope.user.party);
	$scope.culture = Number($scope.user.culture);

	$scope.getNumber = function(num) {

    	return new Array(num);   
	}

	$scope.users = Users.all;
	
	//console.log($scope.rating.food());

	$('.relatedUser div').hover(function(){
    if(!$(this).hasClass('animated')){
        $(this).addClass('animated');
        $(this).stop().effect('shake', {distance:3}, 200);
    }
	}, function(){
	    $(this).removeClass('animated');
	});

	//scroll on load
	$('html, body').animate({
	    scrollTop: 0
	}, 500);

	$scope.saveForLater = function(userId){
		if(Auth.$getAuth()!=null){
			
			auth = Users.getProfile(Auth.$getAuth().uid).$id;
			var ref = new Firebase("https://torrid-heat-9603.firebaseio.com/users/");
			var saveForLater = $firebaseArray(ref.child(auth).child('saved_for_later'));
			saveForLater.$add(userId);
		}
		//console.log(userId);
	}
	
});