angular.module('angularfireSlackApp').
controller('MessagesCtrl', function(profile, channelName, messages){
	var messagesCtrl = this;
	
	messagesCtrl.profile = profile;
	messagesCtrl.channelName = channelName;
	messagesCtrl.messages = messages;

	messagesCtrl.message = '';

	
	messagesCtrl.messages.$add({
    	uid: profile.$id,
    	body: messagesCtrl.message,
    	timestamp: Firebase.ServerValue.TIMESTAMP
	})

	messagesCtrl.sendMessage = function (){
  		if(messagesCtrl.message.length > 0){
	    	messagesCtrl.messages.$add({
		    	uid: profile.$id,
		    	body: messagesCtrl.message,
		    	timestamp: Firebase.ServerValue.TIMESTAMP
		    }).then(function (){
	      		messagesCtrl.message = '';
	    	});
	  	}
	};
	
})