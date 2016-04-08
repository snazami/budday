angular.module('angularfireSlackApp').
controller("BecomeBuddayCtrl", function(FirebaseUrl, $scope){
	var ref = new Firebase(FirebaseUrl);

	becomeBuddayCtrl = this;

	becomeBuddayCtrl.input = {}

	becomeBuddayCtrl.submit = function(){

		ref.child('/budday_sign_up').push({
			user_info: becomeBuddayCtrl.input,
			timestamp: Firebase.ServerValue.TIMESTAMP
		}).then(function(){
			becomeBuddayCtrl.input = {};

		})
	}

	//scroll on load
	$('html, body').animate({
	    scrollTop: 0
	}, 500);
});