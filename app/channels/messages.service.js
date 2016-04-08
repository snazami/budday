angular.module('angularfireSlackApp').
factory('Messages', function($firebaseArray, FirebaseUrl){
	var channelMessagesRef = new Firebase(FirebaseUrl+'channelMessages');
	var userMessageRef = new Firebase(FirebaseUrl+'userMessages');

	return {
		forChannel: function(channelId){
			return $firebaseArray(channelMessagesRef.child(channelId));
		},
		forUsers: function(uid1, uid2){
			var path = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1;
			return $firebaseArray(userMessagesRef.child(path));
			//return "penis-luder"+uid1+uid2;
		},
		forUserOld: function(uid1, uid2){
			var path = uid2 < uid1 ? uid1+'/'+uid2 : uid2+'/'+uid1; //the user with the lowest id will "hold" the conversation

			return $firebaseArray(userMessageRef.child(path));
		}
	}
})