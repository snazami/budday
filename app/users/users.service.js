angular.module('angularfireSlackApp').
factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl){

	var usersRef = new Firebase(FirebaseUrl+'users')
	var connectedRef = new Firebase(FirebaseUrl+'.info/connected');

	var users = $firebaseArray(usersRef);

	var Users = {
		getProfile: function(uid){
			return $firebaseObject(usersRef.child(uid));
		},
		getGravatar: function(uid){
			return './images/avatar.jpeg';
		},
		getDisplayName: function(uid){
			return users.$getRecord(uid).first_name;
		},
		setOnline: function(uid){
			var connected = $firebaseObject(connectedRef);
  			var online = $firebaseArray(usersRef.child(uid+'/online'));
			connected.$watch(function(){
				if(connected.$value === true){
					online.$add(true).then(function(connectedRef){
						connectedRef.onDisconnect().remove();
					})
				}
			})
		},
		all: users
	};

	return Users;
})