angular.module('icyl.controllers', [])

.controller('index', ['$scope', function ($scope) {

  // ionic.Platform.ready(function() {
  //   // hide the status bar using the StatusBar plugin
  //   if(window.StatusBar) {
  //     // org.apache.cordova.statusbar required
  //     StatusBar.hide();
  //   }
    
  // });

}])

//主容器控制器
.controller('mainContainer', ['$scope', '$state', 'Identification', 'User', 'Alert', 'CustomNav', '$window', function ($scope, $state, Identification, User, Alert, CustomNav, $window) {

	// var statics = 1;
	// console.log('not execute everytime, just one time #'+statics);
	// statics += 1;

  //CustomNav.new();

  // $scope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams){
  //   if (toState.access.authenticate && !Identification.isAuthenticated()) {
  //     //console.log(Identification.isAuthenticated());  //=====================test
  //     if (!!toState.access.offline && toState.access.offline != fromState.name) {
  //       $state.go(toState.access.offline);
  //     }
  //     else {
  //       Identification.checkToken().then( function (data) {
  //         if (data.err_code != 0) {
  //           $scope.actions = {
  //             toState: toState
  //           };
  //           User.userLogin($scope);
  //           User.userRegister($scope);
  //           //console.log($scope.actions.login);  //=====================test
            
  //         }
  //         else {
  //           $state.go(toState);
  //         }
  //       }, function (err) {
  //         console.log('错误：Identification.checkToken()' + err);
  //         Alert('请检查网络！');
  //       });
  //     }
      
  //     //$state.transitionTo("login");
  //     event.preventDefault(); 
  //   }
  // });

  // $scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams){
  //   var index = -1;
  // 	if (!!fromState.name && fromState.name.indexOf('offline') < 0) {
  // 		index = CustomNav.find(toState.name);
  // 		if (index < 0 && toState.name != fromState.name) {
  // 			CustomNav.record(fromState.name);
  // 			//console.log('record');
  // 		}
  // 		else {
  // 			CustomNav.remove(0, index+1);
  // 			//console.log('remove');
  // 		}
  		
  // 		//console.log('in');  //=====================test
  // 	}
  //   //console.log(CustomNav.histories+'==='+fromState.name+'==='+index+'==='+toState.name+'==='+$state.current.name);  //=====================test
  //   fromState.name.indexOf('offline') > -1 ? CustomNav.fromState = fromState.name : CustomNav.fromState = '';

  // });



}])

//默认主页控制器
.controller('mainDefault', ['$scope', '$window', 'Storage', function($scope, $window, Storage) {

    // $scope.url = {
    //   sysmgmt:  { url: 'http://17f.go5le.net/mall/index/login_app.asp'},
    //   news   :  { url: 'http://17f.go5le.net/99_tj/991/index.asp?lx=%CD%C5%C7%E0%B6%AF%CC%AC'},
    //   knowlbase:{ url: 'http://17f.go5le.net/99_tj/991/index.asp?lx=%CD%C5%C7%E0%B6%AF%CC%AC'},
    //   test   :  { url: 'http://www.baidu.com'}
    // };

    // $scope.cookie = 'xsunion=staff%5Fsts=2&telephone=0571%2D83731771&card5=900000001&name=900006840&dw=%B3%F8%C1%F4%CF%E3%B4%A8%B2%CB%BB%F0%B9%F8&card4=900000002&card2=900006840&card%5Fno1=900006840&shopid1=900000003&staff%5Fgrade=1&reg%5Fnbr=900006840&card3=900000003';//Storage.kget('cookie');

    // // var inAppBrowser = $window.open('http://17f.go5le.net/preload.html','_blank','hidden=yes');
    // // var setcookie = function() {
    // //   inAppBrowser.executeScript({
    // //     code: "document.cookie='xsunion=staff%5Fsts=2&telephone=0571%2D83731771&card5=900000001&name=900006840&dw=%B3%F8%C1%F4%CF%E3%B4%A8%B2%CB%BB%F0%B9%F8&card4=900000002&card2=900006840&card%5Fno1=900006840&shopid1=900000003&staff%5Fgrade=1&reg%5Fnbr=900006840&card3=900000003';"
    // //   });
    // // };
    // // // var closeonce = function() {
    // // //   inAppBrowser.removeEventListener('loadstart', setcookie);
    // // //   inAppBrowser.removeEventListener('loadstop', closeonce);
    // // //   //inAppBrowser.close();
    // // // };
    // // // inAppBrowser.addEventListener('loadstart', setcookie);
    // // inAppBrowser.addEventListener('loadstop', setcookie);
    // // inAppBrowser.removeEventListener('loadstop', setcookie);
    // // inAppBrowser.close();

              
          
    


    // $scope.actions = [];
    // $scope.closeBrowser = function(){
    //   //$window.alert($scope.actions.toString());    //====================test
    //   $scope.actions.push("Exit");
    // };
    // $scope.loadOpen = function(){
    //   //$window.alert('Load Open');
    //   $scope.actions.push("Open");
    // };
    // $scope.loadStop = function(){
    //   //$window.alert('Load Stop #1');    //====================test
    //   //$window.alert('Load Stop #2');    //====================test
    //   $scope.actions.push("Stop");
    // };
    // $scope.loadError = function(){
    //   //$window.alert('Load Error');    //====================test
    //   $scope.actions.push("Error");
    // };
    
    //console.log('mainDefault'); //=============test

}])



//团青时讯页面控制器
.controller('mainNews', ['$scope', function($scope) {

}])

//智汇共享页面控制器
.controller('mainKnowlBase', ['$scope', function($scope) {

}])

//智慧链接页面控制器
.controller('mainLink', ['$scope', function($scope) {

}])

//一团一品页面控制器
.controller('mainBrand', ['$scope', function($scope) {

}])

//青年创业页面控制器
.controller('mainCareer', ['$scope', function($scope) {

}])

//智会相亲页面控制器
.controller('mainLove', ['$scope', function($scope) {

}])

//最美浙江页面控制器
.controller('mainBeauty', ['$scope', function($scope) {

}])

//智慧生活页面控制器
.controller('mainLife', ['$scope', function($scope) {

}])

//系统管理页面控制器
.controller('mainSysMgmt', ['$scope', function($scope) {

}])

//用户登录页面控制器
.controller('mainLoginOld', ['$scope', function($scope) {

}])



// //测试
// .controller('mainTest', ['$scope', '$timeout', function($scope, $timeout) {

//   $scope.items = [1,2,3];
//   var count = 4;


//   //下拉刷新
//   $scope.doRefresh = function() {
//     // $scope.$apply(function(){
//       $scope.items.push(count);
//       count++;
//       $scope.items.push(count);
//       count++;
//       $scope.items.push(count);
//       count++;
//     // });
//     $scope.$broadcast('scroll.refreshComplete');
//   };


//   //上拉加载
//   //$scope.items = [];
//   $scope.loadMoreData = function() {
//     $scope.items.push(count);
//     count++;
//     $scope.items.push(count);
//     count++;
//     $scope.items.push(count);
//     count++;
//     $timeout(function(){
//       $scope.$broadcast('scroll.infiniteScrollComplete');
//     },1000);
//   };
//   $scope.moreDataCanBeLoaded = function() {
//     return true;
//   };
//   $scope.$on('stateChangeSuccess', function() {
//     $scope.loadMoreData();
//   });


//   //删除、排序、滑动选项
//   $scope.data = {
//     showDelete: false,  //可以注释掉
//     showReorder: false  //可以注释掉
//   };
//   $scope.share = function(item) {
//     alert('Share Item: ' + item);
//   };
//   $scope.moveItem = function(item, fromIndex, toIndex) {
//     $scope.items.splice(fromIndex, 1);
//     $scope.items.splice(toIndex, 0, item);
//   };
//   $scope.onItemDelete = function(item) {
//     $scope.items.splice($scope.items.indexOf(item), 1);
//   };


// }])

// .controller('mainTestR', ['$scope', '$ionicScrollDelegate', 'filterFilter', function($scope, $ionicScrollDelegate, filterFilter) {
//   var letters = $scope.letters = [];
//   var contacts = $scope.contacts = [];
//   var currentCharCode = 'A'.charCodeAt(0) - 1;

//   //window.CONTACTS is defined below
//   window.CONTACTS
//     .sort(function(a, b) {
//       return a.last_name > b.last_name ? 1 : -1;
//     })
//     .forEach(function(person) {
//       //Get the first letter of the last name, and if the last name changes
//       //put the letter in the array
//       var personCharCode = person.last_name.toUpperCase().charCodeAt(0);
//       //We may jump two letters, be sure to put both in
//       //(eg if we jump from Adam Bradley to Bob Doe, add both C and D)
//       var difference = personCharCode - currentCharCode;
//       for (var i = 1; i <= difference; i++) {
//         addLetter(currentCharCode + i);
//       }
//       currentCharCode = personCharCode;
//       contacts.push(person);
//     });

//   //If names ended before Z, add everything up to Z
//   for (var i = currentCharCode + 1; i <= 'Z'.charCodeAt(0); i++) {
//     addLetter(i);
//   }

//   function addLetter(code) {
//     var letter = String.fromCharCode(code);
//     contacts.push({
//       isLetter: true,
//       letter: letter
//     });
//     letters.push(letter);
//   }

//   //Letters are shorter, everything else is 52 pixels
//   $scope.getItemHeight = function(item) {
//     return item.isLetter ? 40 : 100;
//   };
//   $scope.getItemWidth = function(item) {
//     return '100%';
//   };

//   $scope.scrollBottom = function() {
//     $ionicScrollDelegate.scrollBottom(true);
//   };

//   var letterHasMatch = {};
//   $scope.getContacts = function() {
//     letterHasMatch = {};
//     //Filter contacts by $scope.search.
//     //Additionally, filter letters so that they only show if there
//     //is one or more matching contact
//     return contacts.filter(function(item) {
//       var itemDoesMatch = !$scope.search || item.isLetter ||
//         item.first_name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
//         item.last_name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

//       //Mark this person's last name letter as 'has a match'
//       if (!item.isLetter && itemDoesMatch) {
//         var letter = item.last_name.charAt(0).toUpperCase();
//         letterHasMatch[letter] = true;
//       }

//       return itemDoesMatch;
//     }).filter(function(item) {
//       //Finally, re-filter all of the letters and take out ones that don't
//       //have a match
//       if (item.isLetter && !letterHasMatch[item.letter]) {
//         return false;
//       }
//       return true;
//     });
//   };

//   $scope.clearSearch = function() {
//     $scope.search = '';
//   };

// }])



//用户在线页面控制器
.controller('mainMine', ['$scope', '$ionicNavBarDelegate', '$timeout', function($scope, $ionicNavBarDelegate, $timeout) {

  $scope.hidebackbutton = function () {
    //$ionicNavBarDelegate.showBackButton(false); //这个方法不能在页面加载时被执行
    $ionicNavBarDelegate.setTitle('hahahahaha'); //这个方法不能在页面加载时被执行
  };

  // if (!!CustomNav.fromState) {
  //   $timeout(function(){  //这个方法不能在页面加载时被执行, use $timeout as a trick
  //     $ionicNavBarDelegate.showBackButton(false);
  //   },1);
  // }
}])
//用户离线页面控制器
.controller('mainMineOffline', ['$scope', function($scope) {

}])

//用户账户控制器
.controller('mainAccount', ['$scope', 'User', function($scope, User) {

	$scope.actions = {
		logout: function () {
			User.userLogout();
		}
	};

}])

//用户信息控制器
.controller('mainUserInfo', ['$scope', '$state', 'User', 'Identification', 'Alert', function($scope, $state, User, Identification, Alert) {

	User.getUserInfo().then( function (data) {
	  if (data.err_code === 0) {
		//console.log(data.data); //=====================test
	    $scope.updateUserInfo = {
	      name: data.data.Name,
	      gender: !!Number(data.data.Gender),
	      birthday: data.data.Birthday,
	      mobile: data.data.Mobile,
	      email: data.data.Email
	    };
	    //console.log($scope.updateUserInfo); //=====================test
	  }
	  else {
	    //console.log('#1--------------'); //=====================test
	    $scope.actions = {};
	    User.userLogin($scope);
	    User.userRegister($scope);
	  }
	}, function (err) {
	  console.log('错误：User.getUserInfo()' + err);
      Alert('请检查网络！');
	});

  //console.log('again'); //=====================test

  $scope.actions = {
    update: function () {
      Identification.checkToken().then( function (data) {
        User.updateUserInfo($scope.updateUserInfo).then( function (data) {
          if (data.err_code === 0) {
            //console.log(data.data); //=====================test
            $state.go('main.account');
          }
          else {
            //console.log(data); //=====================test
            $scope.actions = {};
            User.userLogin($scope);
            User.userRegister($scope);
          }
        }, function (err) {
          console.log('错误：User.updateUserInfo()' + err);
          Alert('请检查网络！');
        });
      }, function (err) {
        console.log('错误：Identification.checkToken()' + err);
        Alert('请检查网络！');
      });
      
    }
  };

}]);