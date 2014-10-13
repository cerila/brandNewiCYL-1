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
  $ionicPlatform.ready( function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
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
  });
}])

.run(['$rootScope', '$state', 'Identification', 'User', 'Alert', 'CustomNav', function ($rootScope, $state, Identification, User, Alert, CustomNav) {
  CustomNav.new();
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams){
    if (toState.access.authenticate && !Identification.isAuthenticated()) {
      // User isn’t authenticated
      //event.preventDefault();
      //console.log("#1----------"+toState.access.offline+"==="+fromState.name+"=--="+(toState.access.offline != fromState.name));  //=====================test
      if (!!toState.access.offline && toState.access.offline != fromState.name) {
        $state.go(toState.access.offline);
      }
      else {
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

  });

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
          templateUrl: 'templates/main/default.html',
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
        'main-container': {
          templateUrl: 'templates/main/love.html',
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
          templateUrl: 'templates/main/life.html',
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

    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main/default');

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

