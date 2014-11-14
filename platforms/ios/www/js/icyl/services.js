angular.module('icyl.services', ['ngResource'])

.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
})

.constant('DEFAULT_NAV_TREE', {
  tree_0: 'main.default',
  tree_0_0: 'main.mine',
  tree_0_1: 'main.mineoffline',
  tree_0_0_0: 'main.account',
  tree_0_0_0_0: 'main.userinfo'
})

.constant('DEFAULT_NAV_TREE_REVERT', {
  //main_default: 'tree_0',
  main_mine: 'tree_0_0',
  main_mineoffline: 'tree_0_1',
  main_account: 'tree_0_0_0',
  main_userinfo: 'tree_0_0_0_0'
})

//本地存储函数
.factory('Storage', ['$window', function($window) {
  return {
    kset: function(key, value) {
      $window.localStorage.setItem(key, value);
    },
    kget: function(key) {
      return $window.localStorage.getItem(key);
    },
    kremove: function(key) {
      $window.localStorage.removeItem(key);
    }



  };
}])

// //参数传递函数
// .factory('Params', function() {
//   return {
//     outStr: '',
//     outObj: {},
//   };
// })

//非持久化session函数
.service('Session', function () {
  this.create = function (token) {
    this.token = token;
  };
  this.destroy = function () {
    this.token = null;
  };
  return this;
})

//alert函数
.factory('Alert', ['$window', function($window) {
  return function(msg) {
    $window.alert(msg);
  };
}])

// //offline.js校验函数封装
// .factory('Offline', ['$window', '$q', function($window, $q) {
//   return {
//     offlineCheck: function() {
//       // var deferred = $q.defer();

//       // myAsyncCall().success(function(data) {
//       //   deferred.resolve(data);
//       // });
//       // return deferred.promise;
//     }
//   };
// }])

// //CSS值存储--废弃
// .service('CssPairs', function () {
//   this.store = function (key, value) {
//     this.init();
//     this.pairs[key] = value;
//   };
//   // this.unset = function (key) {
//   //   this.pairs[key] = '';
//   // };
//   this.delete = function (key) {
//     delete this.pairs[key];
//   };
//   this.init = function () {
//     if (this.pairs === undefined) {
//       this.pairs = {};
//     }
//   };
//   this.clear = function () {
//     this.pairs = {};
//   };
//   return this;
// })

//自定义导航状态存储
.service('CustomNav', ['DEFAULT_NAV_TREE', 'DEFAULT_NAV_TREE_REVERT', function (DEFAULT_NAV_TREE, DEFAULT_NAV_TREE_REVERT) {
  this.record = function (state) {
    this.histories.unshift(state);
  };
  this.goback = function () {
    return this.histories[0];
  };
  this.new = function () {
    //this.histories = new Array();
    this.histories = [];
  };
  this.remove = function (start, count) {
    this.histories.splice(start, count);
  };
  this.find = function (toState) {
    return this.histories.indexOf(toState);
  };
  this.defaultback = function (currentState) {
    return 'simple.homepage';
    // var currentState = currentState.replace(/\./,"_");
    // var temp = 'null';
    // !!DEFAULT_NAV_TREE_REVERT[currentState] ? temp = DEFAULT_NAV_TREE_REVERT[currentState].slice(0, -2) : temp = '';
    // //console.log(currentState+"##########"); //============================test
    // //var temp = DEFAULT_NAV_TREE_REVERT[currentState].slice(0, -2);
    // //console.log(temp); //============================test
    // if (!!DEFAULT_NAV_TREE[temp]) {
    //   return DEFAULT_NAV_TREE[temp];
    // }
    // else {
    //   return 'main.default';
    // }
  };
  this.fromState = '';
  this.fromTab = 0;
  //this.isGoBack = false;
  return this;
}])

//数据模型函数
.factory('Data', ['$resource', function($resource){
  return {
    User: $resource('http://17f.go5le.net/mall/index/chklogin_app.asp', 
    // User: $resource('http://:baseurl/:path/public/:route', 
                    {
                      // baseurl:'localhost', 
                      // path:'myserver',
                      callback: 'JSON_CALLBACK' //jsonp_flag
                    }, 
                    {
                      //signin: {method:'POST', params:{c:'user', a:'get_token'}, timeout: 3000},//json_flag
                      //signup: {method:'POST', params:{c:'user', a:'register'}, timeout: 3000}, //json_flag
                      //checktoken: {method:'POST', params:{c:'user', a:'user_verify'}, timeout: 3000}, //json_flag
                      //updateuserinfo: {method:'POST', params:{c:'user', a:'update_userinfo'}, timeout: 3000},  //json_flag
                      signin: {method:'JSONP', params:{c:'user', a:'get_token'}, timeout: 3000}, //jsonp_flag
                      signup: {method:'JSONP', params:{c:'user', a:'register'}, timeout: 3000},  //jsonp_flag
                      checktoken: {method:'JSONP', params:{c:'user', a:'user_verify'}, timeout: 3000}, //jsonp_flag
                      // updateuserinfo: {method:'JSONP', params:{c:'user', a:'update_userinfo'}, timeout: 3000},  //jsonp_flag
                      // signin: {method:'POST', params:{route:'login'}, timeout: 3000}, //json_flag laravel
                      // signup: {method:'POST', params:{route:'register'}, timeout: 3000},  //json_flag laravel
                      // checktoken: {method:'POST', params:{route:'checkToken'}, timeout: 3000}, //json_flag laravel
                      updateuserinfo: {method:'POST', params:{route:'updateUserinfo'}, timeout: 3000},  //json_flag laravel
                      update_avatar: {method:'POST'},
                      update_mobile: {method:'POST'},
                      update_password: {method:'POST'}
                    }),
    Post: $resource('http://17f.go5le.net/mall/index/app_news12.asp',
                    {
                      // baseurl:'localhost',
                      // path:'good'
                      callback: 'JSON_CALLBACK' //jsonp_flag
                    },
                    {
                      loadarticle: {method:'JSONP', timeout: 3000},
                      loadcomments: {method:'JSONP', timeout: 3000}
                    }),
    articleList: $resource('http://17f.go5le.net/mall/index/app_news.asp',
                    {
                      // baseurl:'localhost',
                      // path:'good'},
                      callback: 'JSON_CALLBACK' //jsonp_flag
                    },
                    {
                      loadlist: {method:'JSONP', timeout: 3000}
                    }),
    Comments: $resource('http://17f.go5le.net/mall/index/app_pj.asp',
                    {
                      // baseurl:'localhost',
                      // path:'good'},
                      callback: 'JSON_CALLBACK' //jsonp_flag
                    },
                    {
                      loadcomments: {method:'JSONP', timeout: 3000}
                    }),



  };
}])



//用户操作函数
.factory('User', 
  [ '$ionicModal', 
    //'$ionicAnimation',
    'Storage', 
    'Data', 
    'Alert', 
    '$state', 
    'Session', 
    '$q', 
    '$window', 
    //'$stateParams',
  function(
    $ionicModal, 
    //$ionicAnimation, 
    Storage, 
    Data, 
    Alert, 
    $state, 
    Session, 
    $q, 
    $window 
    //, $stateParams
  ) {
    return {
      userLogin: function($scope) {
        $scope.loginData = {
          username: '91',
          password: '123',
          rememberPwd: true
        };

        //console.log("#18----------"+$scope.$id);  //=====================test
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/common/login.html', {
          scope: $scope
          //,animation: 'no-animation'
        }).then(function(modal) {
          $scope.loginmodal = modal;
          $scope.loginmodal.show(); //20140804: 直接在这里打开登录窗口，因为是异步加载，所以在其他地方马上打开会因为模板还没加载完成而出错
          //console.log("#17----------"+$scope.$id);  //=====================test
        });

        // Triggered in the login modal to close it
        $scope.actions.closeLogin = function() {
          $scope.loginmodal.hide();
        };

        // Open the login modal
        $scope.actions.login = function() {
          $scope.loginmodal.show();
          //console.log("#login----------"+$scope.$id);  //=====================test
        };

        $scope.actions.preRegister = function() {
          $scope.actions.closeLogin();
          $scope.actions.register();
        };

        // Perform the login action when the user submits the login form
        $scope.actions.doLogin = function() {
          console.log('正在登录', $scope.loginData);

          Data.User.signin($scope.loginData, function(data) {
            console.log(data.data.token);

          if (data.err_code === 0) { 
              //Alert(data.data.user + ' 您好，欢迎回来！' ); 
              $scope.loginmodal.remove();
              // $ionicModal.fromTemplateUrl('templates/common/login.html', {
              //  scope: $scope
              // }).then(function(modal) {
              //  $scope.loginmodal = modal;
              // });
              if ($scope.loginData.rememberPwd === true) {
                Storage.kset('password', data.data.password);
              }
              Storage.kset('username', data.data.username);
              // Storage.kset('token', data.data.token);  //########################key, use in the future
              Session.create(data.data.token);  //########################key, use in the future
              //$scope.mine.mineNgclick = '';
              //$scope.mine.minehref = '#/main/mine';
              //Alert(data.data.token+'=='+data.data.username+'=='+data.data.password+'=='+$scope.loginData.rememberPwd);
              $scope.loginData.password = '';
              //$scope.loginData.rememberPwd = false;
              //!!$scope.actions.toState ? $state.go($scope.actions.toState) : $window.location.reload(); //$state.reload()方法还有bug，不能重新实例化controller
              //!!$scope.actions.toState ? $state.go($scope.actions.toState) : $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true }); //替代方法1，$state.reload()方法还有bug，不能重新实例化controller
              !!$scope.actions.toState ? $state.go($scope.actions.toState) : $state.go('.', {}, {reload: true}); //替代方法2，$state.reload()方法还有bug，不能重新实例化controller
              //!!$scope.actions.toState ? $state.go($scope.actions.toState) : $state.go($state.current, {}, {reload: true}); //替代方法3，$state.reload()方法还有bug，不能重新实例化controller
              //$state.go('main.mine'); //===================使用$state.go跳转到main.mine页面
              //console.log("#16----------"+$state.current.name);  //=====================test
            }
            else {
              Alert(data.err_code + '：' + data.err_msg);
              $scope.loginData.password = '';
            }
          }, function(err){
              Alert('请检查网络！');
              console.log(' request fail for login !!!!! ' + err);
          });
        };

        //$scope.actions.login();
      },

      userRegister: function($scope) {
        $scope.registerData = {
          // username: 'alexgzhou',
          // password: '123456789',
          // repeatpassword: '123456789',
          // name: '周天舒',
          // mobile: '13282037883',
          gender: false
        };

        //Alert(registerData.gender);

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/common/register.html', {
          scope: $scope
          //,animation: 'no-animation'
        }).then(function(modal) {
          $scope.registermodal = modal;
        });

        // Triggered in the login modal to close it
        $scope.actions.closeRegister = function() {
          $scope.registermodal.hide();
        };

        // Open the login modal
        $scope.actions.register = function() {
          $scope.registermodal.show();
        };

        $scope.actions.prelogin = function() {
          $scope.actions.closeRegister();
          $scope.actions.login();
        };

        // Perform the register action when the user submits the register form
        $scope.actions.doRegister = function() {
          //$scope.registerData.gender = $scope.registerData.genderFlag ? '女': '男';

          console.log('正在注册', $scope.registerData);

          Data.User.signup($scope.registerData, function(data) {
            //Alert($scope.registerData.genderFlag);
            
            if (data.err_code === 0) { 
              //Alert(data.data.user + ' 注册成功，用户名：' + data.data.username ); 
              $scope.registermodal.remove();
              $ionicModal.fromTemplateUrl('templates/common/register.html', {
               scope: $scope
              }).then(function(modal) {
               $scope.registermodal = modal;
              });
              $scope.loginData = {
                username: $scope.registerData.username,
                rememberPwd: true
              };
              $scope.registerData = {
                gender: false
              };
              $scope.actions.login(); 
            }
            else {
              Alert(data.err_code + '：' + data.err_msg);
              $scope.registerData.password = '';
              $scope.registerData.repeatpassword = '';
              // $scope.registerData = {
              //   gender: false
              // };
            }
          }, function(err){
              Alert('请检查网络！！');
              console.log(' request fail for register !!!!! ' + err);
          });
        };
      },

      userLogout: function() {
        Session.destroy();
        Storage.kremove('password');
        // Storage.kremove('token');  //########################key, use in the future
        $state.go('main.mine');
      },

      getUserInfo: function() {
        var deferred = $q.defer();
        Data.User.checktoken({token: Session.token}, function(data) {
          deferred.resolve(data);
          //console.log('#2--------------'+Session.token);
        }, function(err) {
          Alert('请检查网络！！！');
          console.log(' request fail for getUserInfo !!!!! ' + err);
          deferred.resolve(err);
        });
        return deferred.promise;
      },

      updateUserInfo: function(userinfo) {
        var deferred = $q.defer();
        userinfo.token = Session.token;
        //console.log(userinfo);
        Data.User.updateuserinfo(userinfo, function(data) {
          deferred.resolve(data);
        }, function(err) {
            Alert('请检查网络！！！！');
            console.log(' request fail for updateUserInfo !!!!! ' + err);
            deferred.resolve(err);
        });
        return deferred.promise;
      }



    };
}])



// //页面行为函数
// .factory('Actions', ['User', '$compile', function(User, $compile) {
//   return {
//     mineClick: {
//       allowed: function($scope) {
//         $scope.mine = {};
//         //彻底解决：见241行说明
//         $scope.mine.mineNgclick = ''; //20140803-0131-改成promise后这里又出问题了，和actions.login()失效类似，但情况相反，这里ng-click赋值为空后，actions.login()还有效，好像ng-click有缓存一样
//         $scope.mine.minehref = "#/main/mine";
//         //console.log("#15----------"+$scope.$id);  //=====================test
//       },
//       denied: function($scope) {
//         $scope.mine = {};
//         $scope.actions = {};
//         User.userLogin($scope);
//         User.userRegister($scope);
//         //彻底解决：不要动态改变界面端(view)的ng-click文字，而是在controller中动态改变mine.mineNgclick绑定的对象，view中为ng-click='mine.mineNgclick()'
//         $scope.mine.mineNgclick = $scope.actions.login;  //这句语句在$resource之后actions.login()失效,可能和异步AJAX有关，具体原因还需详细分析？

//         //$scope.mine.minehref = "#";
//         //console.log("#14----------"+$scope.$id);  //=====================test 
//       }
//     }



//   };
// }])



//页面初始化函数
.factory('PageInit', ['User', '$compile', function(User, $compile) {
  return {
  };
}])



//安全认证函数
.factory('Identification', 
  [ 'Storage', 
    'Data', 
    //'Actions', 
    'Alert',
    'Session',
    '$q',
  function(
    Storage, 
    Data, 
    Alert, 
    //Actions,
    Session, 
    $q
  ) {
    return {
      checkToken: function() {
        //$scope.mine = {};
        //$scope.mine.mineNgclick = "actions.login()";
        //console.log("#4----------"+$scope.$id);  //=====================test
        // console.log("checkToken入口: " + Session.token);
        //设置promise
        var deferred = $q.defer();
        //checkToken具体步骤
        if (Storage.kget('username') && Storage.kget('password')) {
          if (Session.token) {
            Data.User.checktoken({token: Session.token}, function(data) {
              if (data.err_code === 0) { 
                //Actions.mineClick.allowed($scope);
                //console.log("#5----------"+$scope.$id);  //=====================test
                //return true;
                // console.log(data.data.token);
                deferred.resolve(data);
              }
              else {
                Data.User.signin({username: Storage.kget('username'), password: Storage.kget('password')}, function(data) {
                  if (data.err_code === 0) { 
                    // Storage.kset('token', data.data.token);  //########################key, use in the future
                    // Session.create(data.data.token);  //########################key, use in the future
                    Session.create(data.data.token ? data.data.token : "whatever");  //########################Temp, remove in the future
                    //Actions.mineClick.allowed($scope);
                    //console.log("#6----------"+$scope.$id);  //=====================test
                    //return true;
                    // console.log(data.data.token);
                    deferred.resolve(data);
                  }
                  else {
                    //Actions.mineClick.denied($scope);
                    //console.log("#7----------"+$scope.$id);  //=====================test
                    //return false;
                    deferred.resolve(data);
                  }
                }, function(err) {
                  Alert('请检查网络！！！！！');
                  console.log(' request fail for get_token !!!!! ' + err);
                  deferred.resolve(err);
                });
              }
            }, function(err) {
                Alert('请检查网络！！！！！！');
                console.log(' request fail for check_token !!!!! ' + err);
                deferred.resolve(err);
            });
          }
          else {
            Data.User.signin({username: Storage.kget('username'), password: Storage.kget('password')}, function(data) {
              if (data.err_code === 0) { 
                  // Storage.kset('token', data.data.token);  //########################key, use in the future
                  // Session.create(data.data.token);  //########################key, use in the future
                  Session.create(data.data.token ? data.data.token : "whatever");  //########################Temp, remove in the future
                  //Actions.mineClick.allowed($scope);
                  //console.log("#8----------"+$scope.$id);  //=====================test
                  //return true;
                  // console.log("Session.create: " + data.data.token);
                  deferred.resolve(data);
                }
                else {
                  //Actions.mineClick.denied($scope);
                  //console.log("#9----------");  //=====================test
                  //return false;
                  deferred.resolve(data);
                }
              }, function(err) {
                Alert('请检查网络！！！！！！！');
                console.log(' request fail for get_token !!!!! ' + err);
                deferred.resolve(err);
              });
          }
        }
        else {
          if (Session.token) {
            // console.log("#10----------"+$scope.$id);  //=====================test
            Data.User.checktoken({token: Session.token}, function(data) {
              if (data.err_code === 0) { 
                //Actions.mineClick.allowed($scope);
                //console.log("#11----------"+$scope.$id);  //=====================test
                // return true;
                deferred.resolve(data);
              }
              else {
                //console.log("#12----------"+$scope.$id);  //=====================test
                //Actions.mineClick.denied($scope);
                // return false;
                deferred.resolve(data);
              }
            }, function(err) {
                Alert('请检查网络！！！！！！！！');
                console.log(' request fail for check_token without username and password !!!!! ' + err);
                deferred.resolve(err);
            });
          }
          else {
            //Actions.mineClick.denied($scope);
            //console.log("#13----------"+Session.token);  //=====================test
            // return false;
            var data = {};
            data.err_code = -999;
            deferred.resolve(data);
          }
        }
        return deferred.promise;
      },

      isAuthenticated: function () {
        return !!Session.token;
      }

    };
}])

;