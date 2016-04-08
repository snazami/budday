angular.module('angularfireSlackApp').
controller('HomeCtrl', function(Auth, $state, Users, $scope){

	var homeCtrl = this;

	homeCtrl.users = Users.all;

	$scope.scrollTo = function(id){
		console.log("lol");
		$('html, body').animate({
		        scrollTop: $(id).offset().top
		    }, 500);
	}

	//MAPBOX
	L.mapbox.accessToken = 'pk.eyJ1Ijoic25hemFtaSIsImEiOiJjaW1pMTBpcDEwMDNydmlrdW8yc2RoY29pIn0.R_8cMvgM26cjwwLW7rlBVQ';

	//map init
	var map = L.mapbox.map('map', 'mapbox.streets', {
		zoomControl: false
	}).setView([34.5, -118], 8);
	
	//markers layer init
	var markers = new L.layerGroup(); //var markers = new L.MarkerClusterGroup();

	var controlsAdded = false; //control variable to ensure we only add controls the first time

	$scope.enableMapControls = function(){
		if(mapDisabled){
			$('.mapContainer p').fadeOut(200);
			// $('.mapContainer h1').fadeOut(200, function(){
			// 	$( "#closeMap" ).fadeIn(200);
			// });
			$( "#closeMap" ).fadeIn(200);
			$('.mapContainer button').fadeOut(200);
			$( ".mapContainer" ).animate({ 
			    height: 600
			  }, 300);
			$( ".mapContainer h2" ).animate({ 
			    'margin-top': '20'
			}, 300);
			if ($(window).width() < 800) {
			   $('.mapContainer h2').fadeOut(200);
			}
			
			$scope.scrollTo("#map")

			mapDisabled = false;
			map.dragging.enable();
			map.touchZoom.enable();
			map.doubleClickZoom.enable();
			map.scrollWheelZoom.enable();
			map.keyboard.enable();
			
			if(!controlsAdded){
				//find my location
				//L.control.locate().addTo(map); 
				
				//geocoding
				map.addControl(L.mapbox.geocoderControl('mapbox.places', { 
			        autocomplete: true,
			        keepOpen: true,
			        position: 'bottomright'
					}
				));
				controlsAdded=true;
			}
		}
	}

	$scope.disableMapControls = function(){
		if(!mapDisabled){
			map.dragging.disable();
			map.touchZoom.disable();
			map.doubleClickZoom.disable();
			map.scrollWheelZoom.disable();
			map.keyboard.disable();
			mapDisabled = true;
		}
	}

	$scope.closeMap = function(){
		$scope.disableMapControls();
		$( "#closeMap" ).fadeOut(500);
		$( ".mapContainer" ).animate({ 
			    height: 400
			  }, 500);
		$( ".mapContainer h2" ).animate({ 
			    'margin-top': '80'
			  }, 300);
	}

	$scope.disableMapControls(); //intially disable map controls

	var mapDisabled = true; //control variable to determine if map controls is enabled	

	//enable map controls on click
	$('#map').click(function(){
		$scope.enableMapControls();
	})

	//disable map on mouseout
	$('.mapContainer').mouseleave(function(){
		$scope.disableMapControls();
	})

	//when users has loaded --> add them to map
	Users.all.$loaded(function(usersForMap){
	for (var i = 0; i < usersForMap.length; i++) {
	    if(usersForMap[i].latLng){
		    var a = usersForMap[i].latLng;
		    var title = usersForMap[i].first_name;
		    var img = usersForMap[i].profileImageUrl;
		    var id = usersForMap[i].$id;
		    var marker = L.marker(new L.LatLng(a[1], a[0]), {
		        icon: L.mapbox.marker.icon({'marker-color': '#288463'}),
		        title: title,
		        id: id
		    });
		    marker.bindPopup("<a href='#/user/"+id+"'><strong>"+title+"</strong><br><img src='"+img+"'></a>");
		    markers.addLayer(marker);
		}
	}

	map.addLayer(markers);
	});
	

})