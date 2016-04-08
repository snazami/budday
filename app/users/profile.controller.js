angular.module('angularfireSlackApp').
controller('ProfileCtrl', function($state, md5, auth, profile, $scope, $sce){

	var profileCtrl = this;

	profileCtrl.profile = profile;

	profileCtrl.updateProfile = function(){
		//profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
		profileCtrl.profile.$save().then(function(){
			//$state.go('channels');
		});
	}

	//NEW USER
	if(!profileCtrl.profile.displayName){
		if(auth.provider=='facebook'){
			console.log(auth);
			profileCtrl.profile.first_name=auth.facebook.cachedUserProfile.first_name;
			profileCtrl.profile.last_name=auth.facebook.cachedUserProfile.last_name;
			profileCtrl.profile.profileImageUrl=auth.facebook.cachedUserProfile.picture.data.url;
			profileCtrl.profile.$save();
		}
		if(auth.provider=='google'){
			profileCtrl.profile.displayName=auth.google.displayName;
			profileCtrl.profile.profileImageUrl=auth.google.cachedUserProfile.picture;
		}
		if(auth.provider=='password'){
			profileCtrl.profile.profileImageUrl="/images/avatar.jpeg";
		}
		
		
	}
	else {
		$scope.newProfile=false;
	}

	//SET VINE
  	$scope.errorImageSrc = 'https://cdn2.iconfinder.com/data/icons/contact-flat-buttons/512/thumb_down-512.png';

  	profileCtrl.setVine = function(){
		$scope.showVine = true;
    	$scope.vineError = null;
		if(profileCtrl.profile.vineUrl.length>0){
			if (profileCtrl.profile.vineUrl.substring(0, 16) == "https://vine.co/") {
        		$scope.showVine = true;
       			$scope.vineUrl = $sce.trustAsResourceUrl(profileCtrl.profile.vineUrl+"/embed/simple");
		        
				// $('.vineDiv').css({
		  //         'width': '100%'
		  //       });
		  //       var cw = $('.vineDiv').width();
		  //       $('.vineDiv').css({
		  //         'height': cw+'px'
		  //       });
		        console.log("good vine");
      		}
      		else{
        		$scope.vineError = "Hmmm, that does not look like a vine. Try something like 'https://vine.co/v/iHTTDHz6Z2v'";
        		$scope.showVine=false;
        		console.log("bad vine");
     		}
      
      
			//$scope.desiredFrameSource = $scope.userObj.vine+"/embed/simple";
		}
		// if (profileCtrl.profile.vineUrl.substring(0, 16) == "https://vine.co/") {
		//  	$scope.desiredFrameSource = profileCtrl.profile.vineUrl+"/embed/simple";
		//  	$scope.showVine = true;
		// }
		// else {
		// 	$scope.showVine = false;
		// }

		
	}

  profileCtrl.removeVine = function(){
    profileCtrl.profile.vineUrl="";
    $scope.showVine = false;
  }

  	//MAPBOX
    // mapboxgl.accessToken = 'pk.eyJ1Ijoic25hemFtaSIsImEiOiJjaW1pMTBpcDEwMDNydmlrdW8yc2RoY29pIn0.R_8cMvgM26cjwwLW7rlBVQ';
    // var map = new mapboxgl.Map({
    //     container: 'map', // container id
    //     style: 'mapbox://styles/mapbox/emerald-v8', //stylesheet location
    //     center: [-117, 35], // starting position
    //     zoom: 9 // starting zoom
    // });

    // var geocoder = new mapboxgl.Geocoder({
    //   position: 'bottom-left',
    //   container: 'place',
    //   placeholder: 'Search places to be a budday'
    // });
    // map.addControl(geocoder);

    // geocoder.on('result', function(data){
    //   profileCtrl.profile.place = data.result.place_name;
    //   profileCtrl.profile.latLng = data.result.geometry.coordinates;

	// geoFire.set(profileCtrl.profile.$id, [data.result.geometry.coordinates[0], data.result.geometry.coordinates[1]]).then(function() {
	//   	console.log("Provided key has been added to GeoFire");
	// 	}, function(error) {
	//   		console.log("Error: " + error);
	// 	});
    //})

})

// angular.module('angularfireSlackApp').
// directive('iframeNanny', function($q, $http, $compile, $sce) {
//   return {
//     restrict: 'E',
//     scope: {
//       desiredUri: '=',
//       errorImageUri: '='
//     },
//     link: function(scope, element, attrs) {
//       var loadedUri = '';
       
//       function isURLReal(fullyQualifiedURL) {
//         var URL = encodeURIComponent(fullyQualifiedURL);
//         var dfd = $q.defer();
//         var yqlUri = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22' + URL + '%22&callback=JSON_CALLBACK';
        
//         $http.jsonp(yqlUri)
//           .success(function(data, status) {
//             console.log(data.results.length);
//             if (data.results.length) {
//               console.log('success!')
//               dfd.resolve(true);
//             } else {
//               dfd.reject(false);
//             }
//           }).error(function(data, status) {
//             dfd.reject('failed');
//           });

//         return dfd.promise;
//       }

//       scope.$watch('desiredUri', function(uri) {
//         if (loadedUri !== uri) {
          
//           isURLReal(uri).then(function() { 
//             console.log('directive: uri valid');
//             loadedUri = uri;
            
//             scope.trustedUri = $sce.trustAsResourceUrl(scope.desiredUri);
            
//             var iFrameHtml = '<iframe src="{{trustedUri}}" class="vine"></iframe>';
            
//             var markup = $compile(iFrameHtml)(scope);
//             element.empty();
//             element.append(markup);
//           }).catch(function() {
//             console.log('directive: uri invalid');
//             var badRequestImgHtml = '<img src="{{errorImageUri}}">';
            
//             var markup = $compile(badRequestImgHtml)(scope);
            
//             console.log(scope.errorImageUri);
//             element.empty();
//             element.append(markup);
//           });
//         }
//       });
//     }
//   };
// })