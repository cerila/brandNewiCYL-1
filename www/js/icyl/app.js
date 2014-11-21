// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var dependencies = ['ionic',
                    'icyl.services',
                    'icyl.directives',
                    //'icyl.filters',
                    'icyl.controllers',
                    'demo.controllers',
                    'w5c.validator'];

angular.module('icyl', dependencies)

.run(['$ionicPlatform', function ($ionicPlatform) {

  var pushNotification;

  // handle APNS notifications for iOS
  function onNotificationAPN(e) {
    if (e.alert) {
      $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
       // showing an alert also requires the org.apache.cordova.dialogs plugin
       navigator.notification.alert(e.alert);
    }
        
    if (e.sound) {
      // playing a sound also requires the org.apache.cordova.media plugin
      var snd = new Media(e.sound);
      snd.play();
    }
    
    if (e.badge) {
      pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
    }
  }
  
  // handle GCM notifications for Android
  function onNotification(e) {
    $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
    switch( e.event ) {
      case 'registered':
        if ( e.regid.length > 0 )
        {
          $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
          // Your GCM push server needs to know the regID before it can push to this device
          // here is where you might want to send it the regID for later use.
          console.log("regID = " + e.regid);
        }
      break;
          
      case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if (e.foreground)
        {
          $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
          // on Android soundname is outside the payload. 
          // On Amazon FireOS all custom attributes are contained within payload
          var soundfile = e.soundname || e.payload.sound;
          // if the notification contains a soundname, play it.
          // playing a sound also requires the org.apache.cordova.media plugin
          var my_media = new Media("/android_asset/www/"+ soundfile);
          my_media.play();
        }
        else
        { // otherwise we were launched because the user touched a notification in the notification tray.
          if (e.coldstart)
            $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
          else
            $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
        }
    
        $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
        //android only
        $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
        //amazon-fireos only
        $("#app-status-ul").append('<li>MESSAGE -> TIMESTAMP: ' + e.payload.timeStamp + '</li>');
      break;
          
      case 'error':
        $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
      break;
          
      default:
        $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
      break;
    }
  }
  
  function tokenHandler (result) {
    $("#app-status-ul").append('<li>token: '+ result +'</li>');
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
  }

  function successHandler (result) {
    $("#app-status-ul").append('<li>success:'+ result +'</li>');
  }
  
  function errorHandler (error) {
    $("#app-status-ul").append('<li>error:'+ error +'</li>');
  }

  $ionicPlatform.ready( function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
      // StatusBar.overlaysWebView(false); //iOS6 style
      // StatusBar.styleLightContent();
    }
    //window.ionic.Platform.showStatusBar(false)
    //window.ionic.Platform.fullScreen(true,false);
    
    // console.log(window.plugins);
    if (window.plugins && window.plugins.pushNotification) {
      try 
      { 
        pushNotification = window.plugins.pushNotification;
        if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'amazon-fireos' ) {
          pushNotification.register(successHandler, errorHandler, {"senderID":"642769024933","ecb":"onNotification"});    // required!
        } 
        else {
          pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});  // required!
        }
      }
      catch(err) 
      { 
        txt="\nThere was an error on this page.\n"; 
        txt+="Error description: " + err.message + "\n"; 
        console.log(txt); 
      } 
    }   
  });

  $ionicPlatform.on('online', function () {

  });
  $ionicPlatform.on('offline', function () {

  });
}])

.run(['$rootScope', '$state', 'Identification', 'User', 'Alert', 'CustomNav', 'Session', function ($rootScope, $state, Identification, User, Alert, CustomNav, Session) {
  CustomNav.new();
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams){
    // console.log("stateChangeStart入口: '" + fromState.name + "' -> '" + toState.name + "'; +'" + Session.token + "'");
    // console.log(fromState);
    if (toState.access.authenticate && !Identification.isAuthenticated()) {
      // User isn’t authenticated
      //event.preventDefault();
      //console.log("#1----------"+toState.access.offline+"==="+fromState.name+"=--="+(toState.access.offline != fromState.name));  //=====================test
      if (!!toState.access.offline && toState.access.offline != fromState.name) {
        $state.go(toState.access.offline);
      }
      else {
        // console.log("checkToken入口: '" + fromState.name + "' -> '" + toState.name + "'; + '" + !Session.token + "'");
        Identification.checkToken().then( function (data) {
          if (data.err_code !== 0) {
            $rootScope.actions = {
              toState: toState
            };
            //$rootScope.actions.toState = toState;
            User.userLogin($rootScope);
            User.userRegister($rootScope);
            //console.log("#1----------"+$rootScope.$id+"=="+data.err_code);  //=====================test
            //因为在User.userLogin里面$ionicModal.fromTemplateUrl是异步加载模板的，所以在这里如果直接调用的话会出错(还没加载完成)；
            //解决方法一：改造成promise形式；
            //解决方法二：直接在$ionicModal.fromTemplateUrl(url).then($scope.loginmodal = modal; $scope.loginmodal.show();)里面打开该模板；
            //$rootScope.actions.login(); 
            //console.log($rootScope.actions.login);  //=====================test
            
          }
          else {
            $state.go(toState);
          }
        }, function (err) {
          console.log('错误：Identification.checkToken()' + err);
          Alert('请检查网络！');
        });
      }
      
      //$state.transitionTo("login");
      event.preventDefault(); 
    }
  });
  $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams){
    var index = -1;
    if (!!fromState.name && fromState.name.indexOf('offline') < 0) {
      index = CustomNav.find(toState.name);
      if (index < 0 && toState.name != fromState.name) {
        CustomNav.record(fromState.name);
        //console.log('record'); //========================test
      }
      else {
        CustomNav.remove(0, index+1);
        //console.log('remove'); //====================test
      }
      
      //console.log('in');  //=====================test
    }
    
    if (fromState.name.indexOf('offline') > -1) {
      //console.log(fromState.name.indexOf('offline'));  //=====================test
      //console.log(CustomNav.find(CustomNav.fromState)+1);  //=====================test
      index = CustomNav.find(toState.name);
      CustomNav.remove(0, index+1);
      //console.log("#@$%#@$^$%&^%&(^*(^$#%@================="+index);  //=====================test
    } 
    toState.name.indexOf('offline') > -1 ? CustomNav.fromState = fromState.name : CustomNav.fromState = '';
    //console.log(CustomNav.histories+'==='+fromState.name+'==='+index+'==='+toState.name+'==='+$state.current.name+'==='+CustomNav.fromState);  //=====================test
    //console.log(CustomNav.fromState);  //=====================test
    // console.log(CustomNav.histories);
  });

  // console.log("online:" + navigator.onLine);
 
  $rootScope.online = navigator.onLine ? 'online' : 'offline';
  $rootScope.$apply();
 
  if (window.addEventListener) {
    window.addEventListener("online", function() {
      $rootScope.online = "online";
      $rootScope.$apply();
    }, true);
    window.addEventListener("offline", function() {
      $rootScope.online = "offline";
      $rootScope.$apply();
    }, true);
  } else {
    document.body.ononline = function() {
      $rootScope.online = "online";
      $rootScope.$apply();
    };
    document.body.onoffline = function() {
      $rootScope.online = "offline";
      $rootScope.$apply();
    };
  }

}])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('main', {
      url:'/main',
      abstract: true,
      access: { authenticate: false },
      templateUrl: 'templates/main.html',
      controller: 'mainContainer'
    })

    // //分模块加载
    // .state('main.default', {
    //   url:'/default',
    //   access: { authenticate: false },
    //   views: {
    //     // 'main-header': {
    //     //   templateUrl: 'templates/common/header.html'
    //     // },
    //     'main-container': {
    //       templateUrl: 'templates/main/default.html'
    //       //, controller: 'mainDefault'
    //     },
    //     'main-footer': {
    //       templateUrl: 'templates/common/footer.html'
    //     }
    //   },
    //   controller: 'mainDefault'
    // })
    
    //一次加载整个页面
    .state('main.default', {
      url:'/default',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/test/demo_shouye.html',
          controller: 'mainDefault'
        }
      }
    })

    .state('main.news', {
      url:'/news',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/main/news.html',
          controller: 'mainNews'
        }
        // ,
        // 'main-footer': {
        //   templateUrl: 'templates/common/footer.html'
        // }
      }
    })

    .state('main.knowlbase', {
      url:'/knowlbase',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/main/knowlbase.html',
          controller: 'mainKnowlBase'
        }
        // ,
        // 'main-footer': {
        //   templateUrl: 'templates/common/footer.html'
        // }
      }
    })

    .state('main.link', {
      url:'/link',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/main/link.html',
          controller: 'mainLink'      
        }
        // ,
        // 'main-footer': {
        //   templateUrl: 'templates/common/footer.html'
        // }
      }
    })

    .state('main.brand', {
      url:'/brand',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/main/brand.html',
          controller: 'mainBrand'
        }
        // ,
        // 'main-footer': {
        //   templateUrl: 'templates/common/footer.html'
        // }
      }
    })

    .state('main.career', {
      url:'/career',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/main/career.html',
          controller: 'mainCareer'
        }
        // ,
        // 'main-footer': {
        //   templateUrl: 'templates/common/footer.html'
        // }
      }
    })

    .state('main.love', {
      url:'/love',
      access: { authenticate: false },
      views: {
        // 'main-container': {
        //   templateUrl: 'templates/main/love.html',
        //   controller: 'mainLove'
        // }
        'main-container': {
          templateUrl: 'templates/love/homepage.html',
          controller: 'mainLove'
        }
        // ,
        // 'main-footer': {
        //   templateUrl: 'templates/common/footer.html'
        // }
      }
    })

    .state('main.beauty', {
      url:'/beauty',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/main/beauty.html',
          controller: 'mainBeauty'
        }
        // ,
        // 'main-footer': {
        //   templateUrl: 'templates/common/footer.html'
        // }
      }
    })

    .state('main.life', {
      url:'/life',
      access: { authenticate: false },
      views: {
        // 'main-header': {
        //   templateUrl: 'templates/common/header.html'
        // }
        // ,
        'main-container': {
          templateUrl: 'templates/life/homepage.html',
          controller: 'mainLife'
        }
        // ,
        // 'main-footer': {
        //   templateUrl: 'templates/common/footer.html'
        // }
      }
    })

    .state('main.sysmgmt', {
      url:'/sysmgmt',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/main/sysmgmt.html',
          controller: 'mainSysMgmt'
        }
        // ,
        // 'main-footer': {
        //   templateUrl: 'templates/common/footer.html'
        // }
      }
    })

    .state('main.loginold', {
      url:'/loginold',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/main/loginold.html',
          controller: 'mainLoginOld'
        }
        // ,
        // 'main-footer': {
        //   templateUrl: 'templates/common/footer.html'
        // }
      }
    })

    .state('main.mine', {
      url:'/mine',
      access: { authenticate: true, offline: 'main.mineoffline' },
      views: {
        //'main-header': {
        //  templateUrl: 'templates/common/header.html'
        //},
        'main-container': {
          templateUrl: 'templates/user/mine.html',
          controller: 'mainMine'
          //, controller: 'mainMine'
        }
        //,
        //'main-footer': {
        //  templateUrl: 'templates/common/footer.html'
        //}
      }
    })

    .state('main.mineoffline', {
      url:'/mineoffline',
      access: { authenticate: false },
      views: {
        //'main-header': {
        //  templateUrl: 'templates/common/header.html'
        //},
        'main-container': {
          templateUrl: 'templates/user/mineoffline.html',
          controller: 'mainMineOffline'
        }
        //,
        //'main-footer': {
        //  templateUrl: 'templates/common/footer.html'
        //}
      }
    })

    .state('main.account', {
      url:'/account',
      access: { authenticate: true },
      views: {
        //'main-header': {
        //  templateUrl: 'templates/common/header.html'
        //},
        'main-container': {
          templateUrl: 'templates/user/account.html',
          controller: 'mainAccount'
        }
        //,
        //'main-footer': {
        //  templateUrl: 'templates/common/footer.html'
        //}
      }
    })

    .state('main.userinfo', {
      url:'/userinfo',
      access: { authenticate: true },
      views: {
        //'main-header': {
        //  templateUrl: 'templates/common/header.html'
        //},
        'main-container': {
          templateUrl: 'templates/user/userinfo.html',
          controller: 'mainUserInfo'
        }
        //,
        //'main-footer': {
        //  templateUrl: 'templates/common/footer.html'
        //}
      }
    })
    
    .state('main.test', {
      url:'/test',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/test/test.html',
          controller: 'mainTest'
        }
      }
    })

    .state('main.testr', {
      url:'/testr',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/test/test_repeat.html',
          controller: 'mainTestR'
        }
      }
    })

    .state('main.testl', {
      url:'/testl',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/test/test_list.html',
          controller: 'mainTestL'
        }
      }
    })

    .state('main.tests', {
      url:'/tests',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/test/test_scroll.html',
          controller: 'mainTestS'
        }
      }
    })

    .state('main.testp', {
      url:'/testp',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/test/test_popover.html',
          controller: 'mainTestP'
        }
      }
    })

    .state('main.testa', {
      url:'/testa',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/test/test_actionsheet.html',
          controller: 'mainTestA'
        }
      }
    })

    .state('main.testc', {
      url:'/testc',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/test/test_card_tabs.html',
          controller: 'mainTestC'
        }
      }
    })

    .state('main.dianping', {
      url:'/dianping',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/test/demo_dianping.html',
          controller: 'mainDemoDianping'
        }
      }
    })

    .state('main.shouye', {
      url:'/shouye',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/test/demo_shouye.html',
          controller: 'mainDemoShouye'
        }
      }
    })

    .state('main.newsHomepage', {
      url:'/newsHomepage',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/news/homepage.html',
          controller: 'mainNewsHomepage'
        }
      }
    })

    .state('main.newsArticle', {
      url:'/newsArticle',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/news/article.html',
          controller: 'mainNewsArticle'
        }
      }
    })

    .state('main.lovePersonalZone', {
      url:'/lovePersonalZone',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/love/personalZone.html',
          controller: 'mainLovePersonalZone'
        }
      }
    })

    .state('main.loveMessage', {
      url:'/loveMessage',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/love/message.html',
          controller: 'mainLoveMessage'
        }
      }
    })

    //团青活动首页
    .state('main.activityHomepage', {
      url:'/activityHomepage',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/activity/homepage.html',
          controller: 'mainActivityHomepage'
        }
      }
    })

    .state('main.activitySignUp', {
      url:'/activitySignUp',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/activity/signUp.html',
          controller: 'mainActivitySignUp'
        }
      }
    })

    //智慧生活
    .state('main.lifeChat', {
      url:'/lifeChat',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/life/chatHomepage.html',
          controller: 'mainLifeChat'
        }
      }
    })

    .state('main.lifeLoan', {
      url:'/lifeLoan',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/life/loan.html',
          controller: 'mainLifeLoan'
        }
      }
    })

    .state('main.lifeCommodity', {
      url:'/lifeCommodity',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/life/commodity.html',
          controller: 'mainLifeCommodity'
        }
      }
    })

    //个人定制
    .state('main.personHomepage', {
      url:'/personHomepage',
      access: { authenticate: true },
      views: {
        'main-container': {
          templateUrl: 'templates/person/homepage.html',
          controller: 'mainPersonHomepage'
        }
      }
    })

    .state('main.personPublish', {
      url:'/personPublish',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/publish.html',
          controller: 'mainPersonPublish'
        }
      }
    })

    .state('main.personSignIn', {
      url:'/personSignIn',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/signIn.html',
          controller: 'mainPersonSignIn'
        }
      }
    })

    .state('main.personMessage', {
      url:'/personMessage',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/message.html',
          controller: 'mainPersonMessage'
        }
      }
    })

    .state('main.personInformation', {
      url:'/personInformation',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/information.html',
          controller: 'mainPersonInformation'
        }
      }
    })

    .state('main.personRegister', {
      url:'/personRegister',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/register.html',
          controller: 'mainPersonRegister'
        }
      }
    })

    .state('main.personGuide', {
      url:'/personGuide',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/guide.html',
          controller: 'mainPersonGuide'
        }
      }
    })

    .state('main.personManagement', {
      url:'/personManagement',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/management.html',
          controller: 'mainPersonManagement'
        }
      }
    })

    .state('main.personStatistics', {
      url:'/personStatistics',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/statistics.html',
          controller: 'mainPersonStatistics'
        }
      }
    })

    .state('main.personQuestionnaire', {
      url:'/personQuestionnaire',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/questionnaire.html',
          controller: 'mainPersonQuestionnaire'
        }
      }
    })

    .state('main.personWarn', {
      url:'/personWarn',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/warn.html',
          controller: 'mainPersonWarn'
        }
      }
    })
    ;

    $stateProvider

    .state('simple', {
      url:'/simple',
      abstract: true,
      access: { authenticate: false },
      templateUrl: 'templates/simple.html',
      controller: 'simpleContainer'
    })
    
    //一次加载整个页面
    .state('simple.default', {
      url:'/default',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/test/demo_shouye.html',
          controller: 'mainDefault'
        }
      }
    })

    //首页
    .state('simple.homepage', {
      url:'/homepage',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/main/homepage.html',
          controller: 'simpleHomepage'
        }
      }
    })

    //文章导航
    .state('simple.navArticle', {
      url:'/navArticle',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/navigation/article.html',
          controller: 'simpleNavArticle'
        }
      }
    })

    //活动导航
    .state('simple.navActivity', {
      url:'/navActivity',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/navigation/activity.html',
          controller: 'simpleNavActivity'
        }
      }
    })

    //服务导航
    .state('simple.service', {
      url:'/service',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/navigation/service.html',
          controller: 'simpleNavService'
        }
      }
    })

    //文章列表
    .state('simple.articleList', {
      url:'/articleList/:tabCode',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/main/articlelist.html',
          controller: 'simpleArticleList'
        }
      }
    })

    //活动列表
    .state('simple.activityList', {
      url:'/activityList/:tabCode',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/main/activitylist.html',
          controller: 'simpleActivityList'
        }
      }
    })

    //服务列表
    .state('simple.serviceList', {
      url:'/serviceList/:tabCode',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/main/servicelist.html',
          controller: 'simpleServiceList'
        }
      }
    })

    .state('simple.article', {
      url:'/article/:articleId',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/news/article.html',
          controller: 'simpleArticle'
        }
      }
    })

    //心理1解1
    .state('simple.psychology', {
      url:'/psychology',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/activity/psychology.html',
          controller: 'simplePsychology'
        }
      }
    })

    //心理1解1链接
    .state('simple.psychologyLink', {
      url:'/psychologyLink/:qid',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/activity/psychologyLink.html',
          controller: 'simplePsychologyLink'
        }
      }
    })

    //搜索
    .state('simple.search', {
      url:'/search',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/main/search.html',
          controller: 'simpleSearch'
        }
      }
    })

    //发布
    .state('simple.publish', {
      url:'/publish',
      access: { authenticate: true },
      views: {
        'main-container': {
          templateUrl: 'templates/person/publish.html',
          controller: 'simplePublish'
        }
      }
    })

    //个人定制
    .state('simple.personHomepage', {
      url:'/personHomepage',
      access: { authenticate: true },
      views: {
        'main-container': {
          templateUrl: 'templates/person/homepage.html',
          controller: 'simplePersonHomepage'
        }
      }
    })

    //收藏
    .state('simple.favorites', {
      url:'/favorites',
      access: { authenticate: true },
      views: {
        'main-container': {
          templateUrl: 'templates/main/favorites.html',
          controller: 'simpleFavorites'
        }
      }
    })

    //设置
    .state('simple.settings', {
      url:'/settings',
      access: { authenticate: true },
      views: {
        'main-container': {
          templateUrl: 'templates/main/settings.html',
          controller: 'simpleSettings'
        }
      }
    })

    //认识我们
    .state('simple.ours', {
      url:'/ours',
      access: { authenticate: true },
      views: {
        'main-container': {
          templateUrl: 'templates/settings/ours.html',
          controller: 'simpleOurs'
        }
      }
    })

    //用户协议
    .state('simple.agreement', {
      url:'/agreement',
      access: { authenticate: true },
      views: {
        'main-container': {
          templateUrl: 'templates/settings/agreement.html',
          controller: 'simpleAgreement'
        }
      }
    })

    //意见与反馈
    .state('simple.feedback', {
      url:'/feedback',
      access: { authenticate: true },
      views: {
        'main-container': {
          templateUrl: 'templates/settings/feedback.html',
          controller: 'simpleFeedback'
        }
      }
    })

    //个人资料
    .state('simple.personalInfo', {
      url:'/personalInfo',
      access: { authenticate: true },
      views: {
        'main-container': {
          templateUrl: 'templates/person/information.html',
          controller: 'simplePersonalInfo'
        }
      }
    })

    //我的主页
    .state('simple.mine', {
      url:'/mine',
      access: { authenticate: true },
      views: {
        'main-container': {
          templateUrl: 'templates/main/mine.html',
          controller: 'simpleMine'
        }
      }
    })

    .state('simple.personSignIn', {
      url:'/personSignIn',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/signIn.html',
          controller: 'mainPersonSignIn'
        }
      }
    })

    .state('simple.personMessage', {
      url:'/personMessage',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/message.html',
          controller: 'mainPersonMessage'
        }
      }
    })

    .state('simple.personManagement', {
      url:'/personManagement',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/management.html',
          controller: 'mainPersonManagement'
        }
      }
    })

    .state('simple.personStatistics', {
      url:'/personStatistics',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/statistics.html',
          controller: 'mainPersonStatistics'
        }
      }
    })

    .state('simple.personWarn', {
      url:'/personWarn',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/warn.html',
          controller: 'mainPersonWarn'
        }
      }
    })

    //通讯录
    .state('simple.personAddressBook', {
      url:'/personAddressBook',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/person/addressBook.html',
          controller: 'simplePersonAddressBook'
        }
      }
    })

    //聊天室
    .state('simple.chatroom', {
      url:'/chatroom',
      access: { authenticate: false },
      views: {
        'main-container': {
          templateUrl: 'templates/main/chatroom.html',
          controller: 'simpleChatroom'
        }
      }
    })
    ;

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/main/default');
  $urlRouterProvider.otherwise('/simple/homepage');

}])

  
  



.config(['$ionicConfigProvider', function ($ionicConfigProvider) {
  $ionicConfigProvider.prefetchTemplates(false);
}])

.config(['w5cValidatorProvider', function (w5cValidatorProvider) {

     // 全局配置
     w5cValidatorProvider.config({
         blurTrig   : false,
         showError  : true,
         removeError: true

     });
     w5cValidatorProvider.setRules({
         email: {
             //required : "输入的邮箱地址不能为空",
             email    : "输入邮箱的格式不正确"
         },
         username: {
             required : "输入的用户名不能为空",
             pattern  : "用户名必须输入字母、数字、下划线,以字母开头"
         },
         password: {
             required : "密码不能为空",
             minlength: "密码长度不能小于{minlength}",
             maxlength: "密码长度不能大于{maxlength}"
         },
         repeat_password: {
                repeat: "两次填写的密码不一致"
         },
         chinese_name : {
             required : "姓名不能为空",
             pattern  : "请正确输入中文姓名"
         },
         mobile: {
             required : "手机号不能为空",
             pattern  : "请填写正确手机号",
             minlength: "手机号长度不能小于{minlength}",
             maxlength: "手机号长度不能大于{maxlength}"
         }
     });
 }]);

