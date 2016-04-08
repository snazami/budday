'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl as homeCtrl'
        // resolve: {
        //   requireNoAuth: function($state, Auth){
        //     return Auth.$requireAuth().then(function(auth) {
        //       $state.go('channels');
        //     }), function(error){
        //       return;
        //     }
        //   }
        // }
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth) {
              $state.go('home');
            }), function(error){
              return;
            }
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth) {
              $state.go('home');
            }), function(error){
              return;
            }
          }
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve:  {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('home');
            })
          },
          profile: function(Users, Auth) {
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('user', {
        url: '/user/{user}',
        templateUrl: 'users/user.html',
        controller: 'UserCtrl as userCtrl',
        resolve: {
          user: function($stateParams, Users){
            return Users.all.$loaded().then(function(){
              return Users.getProfile($stateParams.user);
            });
          }
        }
      })
      .state('becomeBudday', {
        url: '/budday',
        controller: 'BecomeBuddayCtrl as becomeBuddayCtrl',
        templateUrl: 'home/becomeBudday.html'
      })
      .state('channels', {
        url: '/channels',
        controller: 'ChannelsCtrl as channelsCtrl',
        templateUrl: 'channels/index.html',
        resolve: {
          channels: function(Channels){
            return Channels.$loaded();
          },
          profile: function($state, Auth, Users){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function(profile){
                if(profile.first_name){
                  return profile;
                }
                else{
                  $state.go('profile');
                }
              });
            }, function(error){
              $state.go('home');
            });
          }
        }
      })
      .state('channels.create', {
        url: '/create',
        templateUrl: 'channels/create.html',
        controller: 'ChannelsCtrl as channelsCtrl'
      })
      .state('channels.messages', {
        url: '/{channelId}/messages',
        templateUrl: 'channels/messages.html',
        controller: 'MessagesCtrl as messagesCtrl',
        resolve: {
        messages: function($stateParams, Messages){
          return Messages.forChannel($stateParams.channelId).$loaded();
        },
        channelName: function($stateParams, channels){
          return '#'+channels.$getRecord($stateParams.channelId).name;
        }
      }
    })
    .state('channels.direct', {
  url: '/{uid}/messages/direct',
  templateUrl: 'channels/messages.html',
  controller: 'MessagesCtrl as messagesCtrl',
  resolve: {
    messages: function($stateParams, Messages, profile){
      return Messages.forUsers($stateParams.uid, profile.$id).$loaded();
    },
    channelName: function($stateParams, Users){
      return Users.all.$loaded().then(function(){
        return '@'+Users.getDisplayName($stateParams.uid);
      });
    }
  }
});

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://torrid-heat-9603.firebaseio.com/');
