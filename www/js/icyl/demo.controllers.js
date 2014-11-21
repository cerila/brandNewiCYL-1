angular.module('demo.controllers', [])



.controller('mainTest', ['$scope', '$ionicPopover', '$ionicPopup', '$ionicTabsDelegate', 'CustomNav', '$timeout', function($scope, $ionicPopover, $ionicPopup, $ionicTabsDelegate, CustomNav, $timeout) {

  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

  $scope.selectTabWithIndex = function(index) {
    $ionicTabsDelegate.select(index);
  };

  $scope.wechat = function() {
    Wechat.share({
        message: {
          title: "Message Title",
          description: "Message Description(optional)",
          mediaTagName: "Media Tag Name(optional)",
          thumb: "http://ec4.images-amazon.com/images/I/41H7ZorRkiL._AA278_PIkin4,BottomRight,-34,22_AA300_SH20_OU28_.jpg",
          media: {
            type: Wechat.Type.WEBPAGE,   // webpage
            webpageUrl: "http://17f.go5le.net/bootstrap-3.1.1"    // webpage
          }
        },
      scene: Wechat.Scene.SESSION   // share to Timeline
    }, function () {
        alert("Success");
    }, function (reason) {
        alert("Failed: " + reason);
    });
  };

  $scope.weixin = function() {
    navigator.weixin.register('wx9123bbd027f0a99e', function(){
      alert('registered');
    }, 
    function(){
      alert('not register');
    });

    navigator.weixin.openWeixin(function(){
      alert('haha');
    }, 
    function(){
      alert('oh no');
    });
  };

  // $scope.$watch($ionicTabsDelegate.selectedIndex(), function () {
  //   CustomNav.fromTab = $ionicTabsDelegate.selectedIndex();
  //   console.log(CustomNav.fromTab);
  // });

  // console.log(CustomNav.fromTab);
  // if (CustomNav.fromTab > 0) {
    $timeout( function () { //这里必须加$timeout, 否则ionic tabs还没加载完, 执行无效
      $ionicTabsDelegate.select(CustomNav.fromTab);
      // console.log(CustomNav.fromTab);
      $scope.tabNav = function () {
        CustomNav.fromTab = $ionicTabsDelegate.selectedIndex();
        // console.log(CustomNav.fromTab);
      };
    });
    // console.log(CustomNav.fromTab);
  // }

}])


.controller('mainTestS', ['$scope', function($scope) {
  
}])


.controller('mainDemoDianping', ['$scope', '$timeout', function($scope, $timeout) {

  $scope.items = [1,2,3];
  var count = 4;

  //下拉刷新
  $scope.doRefresh = function() {
    // $scope.$apply(function(){
      $scope.items.push(count);
      count++;
      $scope.items.push(count);
      count++;
      $scope.items.push(count);
      count++;
    // });
    $scope.$broadcast('scroll.refreshComplete');
  };

  //上拉加载
  //$scope.items = [];
  $scope.loadMoreData = function() {
    $scope.items.push(count);
    count++;
    $scope.items.push(count);
    count++;
    $scope.items.push(count);
    count++;
    $timeout(function(){
      $scope.$broadcast('scroll.infiniteScrollComplete');
    },2000);
  };
  $scope.moreDataCanBeLoaded = function() {
    return true;
  };
  $scope.$on('stateChangeSuccess', function() {
    $scope.loadMoreData();
  });

  //删除、排序、滑动选项
  $scope.data = {
    showDelete: false,  //可以注释掉
    showReorder: false  //可以注释掉
  };
  $scope.share = function(item) {
    //console.log(item);
    alert('Share Item: ' + item);
  };
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

}])


.controller('mainDemoShouye', ['$scope', function($scope) {
  
}])

.controller('mainNewsHomepage', ['$scope', 'Data', 'Storage', function($scope, Data, Storage) {
  var pageParams = [
  {
    // pageName: 'mainNewsHomepage',
    tabName: '通知公告',
    tabCode: '300',
    loaded: 0,
    lastID: 0,
    requestNO: 20
  },
  {
    // pageName: 'mainNewsHomepage',
    tabName: '团讯要闻',
    tabCode: '301',
    loaded: 0,
    lastID: 0,
    requestNO: 20
  },
  {
    // pageName: 'mainNewsHomepage',
    tabName: '头条新闻',
    tabCode: '302',
    loaded: 0,
    lastID: 0,
    requestNO: 20
  }];
  $scope.articleLists = [];
  var moreData = [false, false, false];
    
  $scope.tabNav = function(index){
    // pageParams[index].lastID = 0;
    if(!$scope.articleLists[index]){
      // console.log(pageParams[index].loaded);
      Data.articleList.loadlist(pageParams[index], function(data){
        $scope.articleLists[index] = data.data.items;
        // console.log($scope.articleLists[index].length);
        // Storage.kset(pageParams[index].tabCode, $scope.articleLists[index].length);
        pageParams[index].loaded = $scope.articleLists[index].length;
        pageParams[index].lastID = $scope.articleLists[index][$scope.articleLists[index].length - 1][0];
        moreData[index] = true;
      });
    }
    // console.log(pageParams[2].lastID);
  };
  
  //下拉刷新
  $scope.doRefresh = function(index) {
    pageParams[index].lastID = 0;
    pageParams[index].requestNO = pageParams[index].loaded;
    Data.articleList.loadlist(pageParams[index], function(data){
      $scope.articleLists[index] = data.data.items;
      // console.log(pageParams[index]);
      // Storage.kset(pageParams[index].tabCode, $scope.articleLists[index].length);
      pageParams[index].loaded = $scope.articleLists[index].length;
      pageParams[index].lastID = $scope.articleLists[index][$scope.articleLists[index].length - 1][0];
      $scope.$broadcast('scroll.refreshComplete');
    });
    
  };

  //上拉加载
  $scope.loadMoreData = function(index) {
    Data.articleList.loadlist(pageParams[index], function(data){
      $scope.articleLists[index] = $scope.articleLists[index].concat(data.data.items);
      // Storage.kset(pageParams[index].tabCode, $scope.articleLists[index].length);
      pageParams[index].loaded = $scope.articleLists[index].length;
      pageParams[index].lastID = $scope.articleLists[index][$scope.articleLists[index].length - 1][0];
      // console.log(Storage.kget(pageParams[index].tabCode));
      // console.log(pageParams[index].loaded);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });

    Data.articleList.loadlist(pageParams[index], function(data){
      if(data.data.items.length < 1) {
        moreData[index] = false;
      }
      else {
        moreData[index] = true;
      }
      // console.log(moreData);
    });
    
  };
  $scope.moreDataCanBeLoaded = function(index) {
    // console.log(moreData[index]+'001');
    return moreData[index];
  };
  $scope.$on('stateChangeSuccess', function() {
    $scope.loadMoreData();
  });

  // $scope.items = [
  //   {'newsTitle': '"智慧团青"测试反馈在此填写',
  //    'times': '89',
  //    'imageUrl': "img/main_backimg_fade.png",
  //    'date': '2014-10-8',
  //    'url': '#/main/newsArticle'},
  //   {'newsTitle': '"智慧团青"测试反馈在此填写',
  //    'times': '102',
  //    'imageUrl': "img/main_backimg_fade.png",
  //    'date': '2014-10-8',
  //   'url': '#/main/newsArticle'},
  //   {'newsTitle': '"智慧团青"测试反馈在此填写',
  //    'times': '4',
  //    'imageUrl': "img/main_backimg_fade.png",
  //    'date': '2014-10-8',
  //    'url': '#/main/newsArticle'}
  // ];
}])

.controller('mainNewsArticle', ['$scope', function($scope) {
  $scope.newsTitle = '团省委组织召开机关党员大会';
  $scope.newsDate = '2014-8-11';
  $scope.newsSource = '浙江省团建';
  $scope.newsContent = '6月23日下午，团省委组织召开机关党员大会，认真学习贯彻习近平总书记在中央办公厅座谈会上的重要讲话精神和。团省委书记周艳出席会议并讲话。团省委副书记苗伟伦传达习总书记讲话精神。';
  $scope.userComment = '已阅';
  $scope.items = [
    {'company': '保险公司',
     'user': '保险员A',
     'date': '2014-8-21 13:12:46',
     'comment': '已阅',
     'times': '5'},
    {'company': '保险公司',
     'user': '保险员B',
     'date': '2014-8-21 13:12:46',
     'comment': '已阅',
     'times': '41'},
    {'company': '保险公司',
     'user': '保险员C',
     'date': '2014-8-21 13:12:46',
     'comment': '已阅',
     'times': '10'}
  ];
}])

//智会相亲页面控制器
.controller('mainLove', ['$scope', function($scope) {
  $scope.sex = 'B';
  
  $scope.items = [
    {'name': '王成',
     'sex': '男',
     'age': '20~35岁',
     'imageUrl': "img/defaultAvatar.png",
     'work': '省经信委',
     'address':'',
     'phone':'15057188887',
     'hobby': '无'},
    {'name': '戴丽娟',
     'sex': '女',
     'age': '20~35岁',
     'imageUrl': "img/defaultAvatar.png",
     'work': '浙江长征职业技术学院',
     'address':'留和路525号',
     'phone':'',
     'hobby': '无'},
    {'name': '叶林伟',
     'sex': '男',
     'age': '20~35岁',
     'imageUrl': "img/defaultAvatar.png",
     'work': '杭州市某自动化技术有限公司',
     'address':'杭州市拱墅区舟山东路66号',
     'phone':'',
     'hobby': '无'}
  ];
}])

.controller('mainLovePersonalZone', ['$scope', function($scope) {  
  $scope.item = 
    {'name': '王成',
     'sex': '男',
     'age': '20~35岁',
     'imageUrl': "img/defaultAvatar.png",
     'work': '省经信委',
     'address':'',
     'phone':'15057188887',
     'hobby': '无'};
}])

.controller('mainLoveMessage', ['$scope', function($scope) {  
  $scope.item = 
    {'name': '王成',
     'cardNo': '91',
     'organization': '省直机关团工委',
     'address':'',
     'phone':'15057188887',
     'QQ': '260025526',
     'messageContent': ''};
}])

.controller('mainActivityHomepage', ['$scope', function($scope) {
  $scope.items = [
    {'activityTitle': '关于举办“书海琴缘”省直机关单身青年钢琴比赛',
     'times': '89',
     'imageUrl': "img/main_backimg_fade.png",
     'date': '2014-10-8',
     'url': '#/main/activitySignUp'},
    {'activityTitle': '关于举行2014年度新申报省级青年文明号',
     'times': '102',
     'imageUrl': "img/main_backimg_fade.png",
     'date': '2014-10-8',
    'url': '#/main/activitySignUp'},
    {'activityTitle': '2014年青年文明号创建',
     'times': '4',
     'imageUrl': "img/main_backimg_fade.png",
     'date': '2014-10-8',
     'url': '#/main/activitySignUp'}
  ];
}])

.controller('mainActivitySignUp', ['$scope', function($scope) {
  $scope.activityTitle = '关于举办“书海琴缘”省直机关单身青年钢琴比赛';

  $scope.item = 
    {'name': '91',
     'phone': '',
     'number': '1'};
  $scope.points = '内部参与';
  $scope.endDate = '2014-8-13';
  $scope.activityDate = '2014-8-15';
  $scope.detail = '省直机关各单位团组织、省（部）属企事业单位团委、省属在杭高职学院团委：为充分发挥团组织的桥梁纽带作用，更好的服务广大团员青年，丰富机关文化建设载体，积极培育和践行社会主义核心价值观，形成向上、向善的强大精神力量，激励广大机关青年为建设美丽浙江、创造美好生活而不懈奋斗，经团工委研究，决定举办“书海琴缘”省直机关单身青年钢琴训练营。';
}])

.controller('mainLifeChat', ['$scope', function($scope) {
  $scope.item = {'chatTitle': '午间正能量：书海“琴”缘',
     'imageUrl': "img/main_backimg_fade.png",
     'url': '#/main/activitySignUp'};
  $scope.items = [
    {'chatTitle': '中国青年服饰现象探讨',
     'imageUrl': "img/main_backimg_fade.png",
     'url': '#/main/activitySignUp'},
    {'chatTitle': '和谐社会建设需要加强大学生环境素养的培育',
     'imageUrl': "img/main_backimg_fade.png",
     'url': '#/main/activitySignUp'},
    {'chatTitle': '省交通运输厅团工委成功举办“2014交通青年论坛”',
     'imageUrl': "img/main_backimg_fade.png",
     'url': '#/main/activitySignUp'}
  ];
}])

.controller('mainLifeLoan', ['$scope', function($scope) {
  $scope.items = [
    {'itemTitle': '核桃木家居的特点',
     'date': '10-10',
     'url': '#/main/activitySignUp'},
    {'itemTitle': '汇宇家居，优“汇疯”气，抢起来！',
     'date': '10-10',
     'url': '#/main/activitySignUp'},
    {'itemTitle': '主题读书征文分享活动',
     'date': '10-10',
     'url': '#/main/activitySignUp'}
  ];
}])

.controller('mainLifeCommodity', ['$scope', '$ionicModal', function($scope, $ionicModal) {

  $scope.priceRegions = [
    {'priceRegion': "0-100"},
    {'priceRegion': '100-200'},
    {'priceRegion': '200-400'},
  ];

  $scope.priceRegion = '200-400';

  $scope.categoryList = [
    {'categoryName': '服饰/鞋/包/配饰'},
    {'categoryName': '居家生活'},
    {'categoryName': '母婴童装'},
    {'categoryName': '手机数码'},
    {'categoryName': '家用电器'}
  ];

  $scope.category = '手机数码';

  $scope.regions = [
    {'region': '浙江省'},
    {'region': '杭州市'},
    {'region': '台州市'},
    {'region': '宁波市'},
    {'region': '绍兴市'}
  ];

  $scope.items = [
    {'name': '奥普兰沙发',
     'provider': '奥普兰',
     'price': '1000',
     'region': 'A区',
     'commentNum':'2',
     'category':'家居生活',
     'imageUrl': "img/main_backimg_fade.png"
    },
    {'name': '奥普兰床',
     'provider': '奥普兰',
     'price': '1000',
     'region': 'A区',
     'commentNum':'2',
     'category':'家居生活',
     'imageUrl': "img/main_backimg_fade.png"
    },
    {'name': '奥普兰餐桌',
     'provider': '奥普兰',
     'price': '1000',
     'region': 'A区',
     'commentNum':'2',
     'category':'家居生活',
     'imageUrl': "img/main_backimg_fade.png"
   }
  ];

  $ionicModal.fromTemplateUrl('commodityModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.commodityModal = modal;
  });
  $scope.openModal = function() {
    $scope.commodityModal.show();
  };
  $scope.closeModal = function() {
    $scope.commodityModal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.commodityModal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
}])

.controller('mainPersonHomepage', ['$scope', function($scope) {
  
}])

.controller('mainPersonPublish', ['$scope', function($scope) {
  $scope.item = {'itemTitle':'',
    'state':'',
    'itemLink':'',
    'contacts':'省直团工委',
    'phone':'13757196484'};

  $scope.types = [
    {name:'通知公告', category:'团讯要闻'},
    {name:'头条新闻', category:'团讯要闻'},
    {name:'新闻', category:'团讯要闻'},
    {name:'本级活动', category:'活动超市'},
    {name:'部门活动', category:'活动超市'},
    {name:'活动回顾', category:'活动超市'},
  ];

  $scope.typeName = $scope.types[0];

  $scope.clearContent = function() {
    $scope.item.itemTitle = '';
    $scope.item.state = '';
    $scope.item.itemLink = '';
  };

}])

.controller('mainPersonSignIn', ['$scope', function($scope) {
  $scope.userName = '王成';
  $scope.userID = '2014082911423';
  $scope.currentNum = '0';
  $scope.toBeChecked = '0';
}])

.controller('mainPersonManagement', ['$scope', function($scope) {
  $scope.activityContent = "";

  $scope.types = [
    {name:'全部', category:'全部'},
    {name:'读书会', category:'读书会'},
    {name:'--大型活动', category:'读书会'},
    {name:'--阅读分享', category:'读书会'},
    {name:'团青活动', category:'团青活动'},
    {name:'--相亲活动', category:'团青活动'},
    {name:'--娱体活动', category:'团青活动'},
    {name:'--组织活动', category:'团青活动'},
  ];

  $scope.typeName = $scope.types[0];

  $scope.depts = [
    {name:'全部', category:''},
    {name:'省委办公厅', category:''},
    {name:'浙江省团建', category:''}
  ];

  $scope.deptName = $scope.types[0];

  $scope.items = [
    {activityTitle:'省直机关午间正能量——摄影沙龙活动', 
     typeName:'娱体活动',
     organizer:'浙江省团建',
     number:'0',
     count:'38',
     url:'#/simple/personStatistics'},
    {activityTitle:'关于举办“书海琴缘”省直机关单身青年钢琴训练营的通知', 
     typeName:'娱体活动',
     organizer:'浙江省团建',
     number:'0',
     count:'381',
     url:'#/main/personStatistics'},
    {activityTitle:'真人CS', 
     typeName:'娱体活动',
     organizer:'浙江省团建',
     number:'0',
     count:'328',
     url:'#/main/personStatistics'},
    {activityTitle:'万人相亲会够“疯狂” 解读五宗“最”', 
     typeName:'相亲活动',
     organizer:'浙江省团建',
     number:'0',
     count:'138',
     url:'#/main/personStatistics'},
  ];

}])

.controller('mainPersonStatistics', ['$scope', function($scope) {
  $scope.activityTitle = '关于举办“书海琴缘”省直机关单身青年钢琴训练营的通知';
  
  $scope.items = [
    {name:'浙商银行', 
     dept:'浙商银行',
     address:'浙江省杭州市',
     phone:'12456789038',
     count:'2',
     isConfirmed:'未确认',
     comment:'0'},
    {name:'省司法厅', 
     dept:'省司法厅',
     address:'浙江省杭州市',
     phone:'12456789038',
     count:'2',
     isConfirmed:'已确认',
     comment:'0'},
    {name:'保险1', 
     dept:'保险公司',
     address:'浙江省杭州市',
     phone:'12456789038',
     count:'2',
     isConfirmed:'未确认',
     comment:'0'}
  ];
  $scope.count = $scope.items.length;

}])

.controller('mainPersonSignIn', ['$scope', function($scope) {
  $scope.userName = '王成';
  $scope.userID = '2014082911423';
  $scope.currentNum = '0';
  $scope.toBeChecked = '0';
}])

.controller('mainPersonMessage', ['$scope', function($scope) { 
  $scope.items = [
    {'name': '王成',
     'message': '你好！',
     'date': '2014-8-15'},
    {'name': '王成',
     'message': '你在哪里工作呀？',
     'date': '2014-8-15'},
    {'name': '王林',
     'message': 'HI！',
     'date': '2014-8-16'}
  ];
}])

.controller('mainPersonInformation', ['$scope', function($scope) {
  $scope.item = {'userName':'王成',
    'userID':'2014082911423',
    'birth':'1978-5-12',
    'identityCard':'000000000000000',

    'password':'123',
    'password2':'123',
    'phone':'13732255555',
    'QQ':'113456789',
    'email':'123@qq.com',

    'work':'省直机关团工委',
    'address':'浙江省杭州市',
    'hobby':'读书',
    'brief':'无'};

}])

.controller('mainPersonRegister', ['$scope', function($scope) {
  $scope.item = {'userName':'',
    'userID':'2014082911423',
    'identityCard':'',
    'phone':''};
}])

.controller('mainPersonGuide', ['$scope', function($scope) {
  $scope.item = {'userName':'',
    'userID':'2014082911423',
    'identityCard':'',
    'phone':''};

  $scope.items = [
    {'itemTitle': '如何报名活动',
     'date': '10-10',
     'url': ''},
    {'itemTitle': '操作指南',
     'date': '10-10',
     'url': ''}
  ];

  $scope.clearSearch = function() {
    $scope.search = '';
  };

}])

.controller('mainPersonQuestionnaire', ['$scope', function($scope) {
  $scope.staff = "91001";

  $scope.types = [
    {name:'团青活动', category:''},
    {name:'活动调查', category:''}
  ];

  $scope.typeName = $scope.types[0];

  // $scope.choices = [

  // ]
  $scope.items = [
    {num:'1', 
     name:'Q1',
     question:'智慧团青版块界面如何？',
     answer1:'1.很好',
     answer2:'2.好',
     answer3:'3.一般',
     answer4:'4.差',
     choice: '4'},
    {num:'2', 
     name:'Q2',
     question:'活动版块内容丰富吗？',
     answer1:'1.很好',
     answer2:'2.好',
     answer3:'3.一般',
     answer4:'4.差',
     choice: '1'}
  ];

}])

.controller('mainPersonWarn', ['$scope', function($scope) {
  $scope.items = [
    {activityTitle:'关于举办“书海琴缘”省直机关单身青年钢琴训练营的报名', 
     date:'2014-8-14',
     content:'请提前报名'},
    {activityTitle:'关于开展2014年度浙江省青年岗位能手评选的通知', 
     date:'2014-8-14',
     content:'请尽快报名'}
  ];

}])

//简版
//首页
.controller('simpleHomepage', ['$scope', '$ionicActionSheet', '$location', 'Data', 'CustomNav', 'Storage', function($scope, $ionicActionSheet, $location, Data, CustomNav, Storage) {
  var localData;
  var ImgCache = require("imgcache");
  ImgCache.init(function(){
    alert('ImgCache init: success!');

    // from within this function you're now able to call other ImgCache methods
    // or you can wait for the ImgCacheReady event

  }, function(){
    alert('ImgCache init: error! Check the log for errors');
  });

  var pageParams = 
  {
    tabCode: '',
    loaded: 0,
    lastID: 0,
    requestNO: 20
  };
  $scope.showNavBack = !!CustomNav.histories.length;
  $scope.articleLists = {};
  var moreData = false;

  var myDate = new Date();
  var currentTime = myDate.getTime();
  var lastTime = Storage.kget('simpleHomepage_time');
  if(lastTime == "" || parseInt((currentTime - lastTime)/3600000) > 1)
  {
    Data.articleList.loadlist(pageParams, function(data){
      $scope.articleLists = data.data.items;
      pageParams.loaded = $scope.articleLists.length;
      pageParams.lastID = $scope.articleLists[$scope.articleLists.length - 1][0];
      moreData = true;
      localData = JSON.stringify($scope.articleLists);
      Storage.kset("simpleHomepage_time", currentTime);
      Storage.kset("simpleHomepage_data", localData);
      for(var i = 0; i < pageParams.loaded; i++)
      {
        ImgCache.cacheFile('http://17f.go5le.net/admin_manage/upload_tp1/' + $scope.articleLists[i][2]);  
      }
    });     
  }
  else
  {
    localData = JSON.parse(Storage.kget('simpleHomepage_data'));
    $scope.articleLists = localData; 
    pageParams.loaded = $scope.articleLists.length;
    pageParams.lastID = $scope.articleLists[$scope.articleLists.length - 1][0];
    moreData = true;
  }
  


  // Triggered on a button click, or some other target
  $scope.show = function() {
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
       { text: '发布文章' },
       { text: '发布活动' }
      ],
      titleText: '发布',
      cancelText: '取消',
      cancel: function() {
          // add cancel code..
      },
      buttonClicked: function(index) {
        if(index == 0){
          $location.path('/simple/publish');
        }
        return true;
      }
    });
  };

  //下拉刷新
  $scope.doRefresh = function() {
    pageParams.lastID = 0;
    pageParams.requestNO = pageParams.loaded;
    Data.articleList.loadlist(pageParams, function(data){
      $scope.articleLists = data.data.items;
      pageParams.loaded = $scope.articleLists.length;
      pageParams.lastID = $scope.articleLists[$scope.articleLists.length - 1][0];
      $scope.$broadcast('scroll.refreshComplete');
      Storage.kset("simpleHomepage_data", $scope.articleLists);
    });
    
  };

  //上拉加载
  $scope.loadMoreData = function() {
    Data.articleList.loadlist(pageParams, function(data){
      $scope.articleLists = $scope.articleLists.concat(data.data.items);
      // Storage.kset(pageParams[index].tabCode, $scope.articleLists[index].length);
      pageParams.loaded = $scope.articleLists.length;
      pageParams.lastID = $scope.articleLists[$scope.articleLists.length - 1][0];
      $scope.$broadcast('scroll.infiniteScrollComplete');
      Storage.kset("simpleHomepage_data", $scope.articleLists);
    });

    Data.articleList.loadlist(pageParams, function(data){
      if(data.data.items.length < 1) {
        moreData = false;
      }
      else {
        moreData = true;
      }
      // console.log(moreData);
    });
    
  };
  $scope.moreDataCanBeLoaded = function() {
    return moreData;
  };
  $scope.$on('stateChangeSuccess', function() {
    $scope.loadMoreData();
  });
}])

//文章导航
.controller('simpleNavArticle', ['$scope', function($scope) {

}])

//活动导航
.controller('simpleNavActivity', ['$scope', function($scope) {

}])

//服务导航
.controller('simpleNavService', ['$scope', function($scope) {

}])

//搜索
.controller('simpleSearch', ['$scope', function($scope) {
  // $scope.item = {searchContent: ''};
  // $scope.clearSearch = function() {
  //   $scope.item.searchContent = '';
  // };
}])

//发布
.controller('simplePublish', ['$scope', function($scope) {
  $scope.item = {'itemTitle':'',
    'state':'',
    'itemLink':'',
    'contacts':'省直团工委',
    'phone':'13757196484'};

  $scope.types = [
    {name:'通知公告', category:'团讯要闻'},
    {name:'头条新闻', category:'团讯要闻'},
    {name:'新闻', category:'团讯要闻'},
    {name:'本级活动', category:'活动超市'},
    {name:'部门活动', category:'活动超市'},
    {name:'活动回顾', category:'活动超市'},
  ];

  $scope.typeName = $scope.types[0];

  $scope.clearContent = function() {
    $scope.item.itemTitle = '';
    $scope.item.state = '';
    $scope.item.itemLink = '';
  };

}])

//文章列表
.controller('simpleArticleList', ['$scope', 'Data', '$stateParams', function($scope, Data, $stateParams) {
  var pageParams = 
  {
    tabCode: $stateParams.tabCode,
    loaded: 0,
    lastID: 0,
    requestNO: 20
  };
  
  $scope.articleLists = {};
  var moreData = false;
    
  Data.articleList.loadlist(pageParams, function(data){
    $scope.articleLists = data.data.items;
    pageParams.loaded = $scope.articleLists.length;
    pageParams.lastID = $scope.articleLists[$scope.articleLists.length - 1] && $scope.articleLists[$scope.articleLists.length - 1][0] || 0;
    moreData = true;
  });

  //下拉刷新
  $scope.doRefresh = function() {
    pageParams.lastID = 0;
    pageParams.requestNO = pageParams.loaded;
    Data.articleList.loadlist(pageParams, function(data){
      $scope.articleLists = data.data.items;
      pageParams.loaded = $scope.articleLists.length;
      pageParams.lastID = $scope.articleLists[$scope.articleLists.length - 1] && $scope.articleLists[$scope.articleLists.length - 1][0] || 0;
      $scope.$broadcast('scroll.refreshComplete');
    });
    
  };

  //上拉加载
  $scope.loadMoreData = function() {
    Data.articleList.loadlist(pageParams, function(data){
      $scope.articleLists = $scope.articleLists.concat(data.data.items);
      // Storage.kset(pageParams[index].tabCode, $scope.articleLists[index].length);
      pageParams.loaded = $scope.articleLists.length;
      pageParams.lastID = $scope.articleLists[$scope.articleLists.length - 1] && $scope.articleLists[$scope.articleLists.length - 1][0] || 0;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });

    Data.articleList.loadlist(pageParams, function(data){
      if(data.data.items.length < 1) {
        moreData = false;
      }
      else {
        moreData = true;
      }
      // console.log(moreData);
    });
    
  };
  $scope.moreDataCanBeLoaded = function() {
    return moreData;
  };

  $scope.$on('stateChangeSuccess', function() {
    $scope.loadMoreData();
  });

}])

//文章内容及评价
.controller('simpleArticle', ['$scope', '$stateParams', 'Data', 'Identification', "User", "Storage", function($scope, $stateParams, Data, Identification, User, Storage) {
  $scope.submit = {
    Comment: ''
  }; //必须这样ng-model才是双向的two-way
  var pageParams = 
  {
    articleId: $stateParams.articleId,
    loaded: 0,
    lastID: 0,
    requestNO: 20
  };
  var replyParams = 
  {
    username: Storage.kget('username'),
    // password: Storage.kget('password'),
    content: $scope.submit.Comment,
    id: $stateParams.articleId,
    act: 'dd',
    ztid: '',
    zt: '',
    shopid: ''
  };
  
  $scope.article = {};
  $scope.comments = {};
  var moreData = false;
    
  Data.Post.loadarticle(pageParams, function(data){
    $scope.article = data.data.items;
    // console.log($scope.article);

    $scope.newsTitle = $scope.article[0][1];
    $scope.imageUrl = $scope.article[0][2];
    $scope.newsDate = $scope.article[0][3];
    $scope.newsSource = $scope.article[0][9];
    $scope.newsContent = $scope.article[0][8];
    // console.log($scope.newsTitle);
    // console.log($scope.newsDate);
    // console.log($scope.newsSource);
    // console.log($scope.newsContent);
    // console.log('loadarticle:' + moreData);
    // moreData = true;
    replyParams.ztid = $scope.article[0][0];
    replyParams.zt = $scope.article[0][1];
    replyParams.shopid = $scope.article[0][7];
    Data.Comments.loadcomments(pageParams, function (data) {
      $scope.comments = data.data.items;
      // console.log('comments:' + moreData);
      moreData = true;
    });
  });

  $scope.submit = function () {
    // console.log($scope.userComment);
    Identification.checkToken().then( function (data) {
      if (data.err_code === 0) {
        //console.log(data.data); //=====================test
        replyParams.content = $scope.submit.Comment && $scope.submit.Comment || "已阅";
        Data.Comment.submitcomment(replyParams, function (data) {
          $scope.doRefresh();
          $scope.submit.Comment = '';
        });
        // console.log(replyParams);
      }
      else {
        //console.log(data); //=====================test
        $scope.actions = {};
        User.userLogin($scope);
        User.userRegister($scope);
      }
    }, function (err) {
      console.log('错误：Identification.checkToken()' + err);
      Alert('请检查网络！');
    });
  };

  //下拉刷新
  $scope.doRefresh = function() {
    pageParams.lastID = 0;
    pageParams.requestNO = pageParams.loaded;
    Data.Post.loadarticle(pageParams, function(data){
      $scope.article = data.data.items;
      // console.log($scope.article);

      $scope.newsTitle = $scope.article[0][1];
      $scope.imageUrl = $scope.article[0][2];
      $scope.newsDate = $scope.article[0][3];
      $scope.newsSource = $scope.article[0][9];
      $scope.newsContent = $scope.article[0][8];
      // console.log($scope.newsTitle);
      // console.log($scope.newsDate);
      // console.log($scope.newsSource);
      // console.log($scope.newsContent);
      // console.log('loadarticle:' + moreData);
      // moreData = true;
      Data.Comments.loadcomments(pageParams, function(data){
        $scope.comments = data.data.items;
        // console.log('comments:' + moreData);
        moreData = true;
        $scope.$broadcast('scroll.refreshComplete');
      });
    }); 
  };

  //上拉加载更多评论：需要在asp端模仿app_news.asp的方式，同样有loaded和lasdID
  $scope.loadMoreData = function() {
    // console.log(moreData);
    Data.Comments.loadcomments(pageParams, function(data){
      // console.log($scope.comments);
      // if ($scope.comments === {}) {
      //   console.log('$scope.comments');
      //   $scope.comments = data.data.items;
      // }
      // else {
      //   console.log('else');
        $scope.comments.concat(data.data.items);
      // }
      // console.log($scope.comments);
      pageParams.loaded = $scope.comments.length;
      pageParams.lastID = $scope.comments[$scope.comments.length - 1] && $scope.comments[$scope.comments.length - 1][0] || 0;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });

    Data.Comments.loadcomments(pageParams, function(data){
      if(data.data.items.length < 1) {
        moreData = false;
      }
      else {
        moreData = true;
      }
    });
    
  };
  $scope.moreDataCanBeLoaded = function() {
    return moreData;
  };

  $scope.$on('stateChangeSuccess', function() {
    $scope.loadMoreData();
  });
}])

//活动列表
.controller('simpleActivityList', ['$scope', 'Data', '$stateParams', 'Storage', function($scope, Data, $stateParams, Storage) {
  var pageParams = 
  {
    tabCode: $stateParams.tabCode,
    loaded: 0,
    lastID: 0,
    requestNO: 20
  };
  
  $scope.activityList = {};
  $scope.username = Storage.kget('username');
  var moreData = false;
    
  Data.activityList.loadlist(pageParams, function(data){
    $scope.activityLists = data.data.items;
    pageParams.loaded = $scope.activityLists.length;
    pageParams.lastID = $scope.activityLists[$scope.activityLists.length - 1] && $scope.activityLists[$scope.activityLists.length - 1][0] || 0;
    moreData = true;
  });

  //下拉刷新
  $scope.doRefresh = function() {
    pageParams.lastID = 0;
    pageParams.requestNO = pageParams.loaded;
    Data.activityList.loadlist(pageParams, function(data){
      $scope.activityLists = data.data.items;
      pageParams.loaded = $scope.activityLists.length;
      pageParams.lastID = $scope.activityLists[$scope.activityLists.length - 1] && $scope.activityLists[$scope.activityLists.length - 1][0] || 0;
      $scope.$broadcast('scroll.refreshComplete');
    });
    
  };

  //上拉加载
  $scope.loadMoreData = function() {
    Data.activityList.loadlist(pageParams, function(data){
      $scope.activityLists = $scope.activityLists.concat(data.data.items);
      // Storage.kset(pageParams[index].tabCode, $scope.articleLists[index].length);
      pageParams.loaded = $scope.activityLists.length;
      pageParams.lastID = $scope.activityLists[$scope.activityLists.length - 1] && $scope.activityLists[$scope.activityLists.length - 1][0] || 0;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });

    Data.activityList.loadlist(pageParams, function(data){
      if(data.data.items.length < 1) {
        moreData = false;
      }
      else {
        moreData = true;
      }
      // console.log(moreData);
    });
    
  };
  $scope.moreDataCanBeLoaded = function() {
    return moreData;
  };

  $scope.$on('stateChangeSuccess', function() {
    $scope.loadMoreData();
  });

}])

//服务列表
.controller('simpleServiceList', ['$scope', 'Data', '$stateParams', '$ionicModal', 'Storage', function($scope, Data, $stateParams, $ionicModal, Storage) {
  var pageParams = 
  {
    tabCode: $stateParams.tabCode,
    loaded: 0,
    lastID: 0,
    requestNO: 20
  };
  
  $scope.serviceLists = {};
  $scope.username = Storage.kget('username');
  var moreData = false;

  Data.activityList.loadlist(pageParams, function(data){
    $scope.serviceLists = data.data.items;
    // console.log(data.data.items); //==================test
    pageParams.loaded = $scope.serviceLists.length;
    pageParams.lastID = $scope.serviceLists[$scope.serviceLists.length - 1] && $scope.serviceLists[$scope.serviceLists.length - 1][0] || 0;
    moreData = true;
  });

  //下拉刷新
  $scope.doRefresh = function() {
    pageParams.lastID = 0;
    pageParams.requestNO = pageParams.loaded;
    Data.activityList.loadlist(pageParams, function(data){
      $scope.serviceLists = data.data.items;
      pageParams.loaded = $scope.serviceLists.length;
      pageParams.lastID = $scope.serviceLists[$scope.serviceLists.length - 1] && $scope.serviceLists[$scope.serviceLists.length - 1][0] || 0;
      $scope.$broadcast('scroll.refreshComplete');
    });
    
  };

  //上拉加载
  $scope.loadMoreData = function() {
    Data.activityList.loadlist(pageParams, function(data){
      $scope.serviceLists = $scope.serviceLists.concat(data.data.items);
      // Storage.kset(pageParams[index].tabCode, $scope.articleLists[index].length);
      pageParams.loaded = $scope.serviceLists.length;
      pageParams.lastID = $scope.serviceLists[$scope.serviceLists.length - 1] && $scope.serviceLists[$scope.serviceLists.length - 1][0] || 0;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });

    Data.activityList.loadlist(pageParams, function(data){
      if(data.data.items.length < 1) {
        moreData = false;
      }
      else {
        moreData = true;
      }
      // console.log(moreData);
    });
    
  };
  $scope.moreDataCanBeLoaded = function() {
    return moreData;
  };

  $scope.$on('stateChangeSuccess', function() {
    $scope.loadMoreData();
  });

  $scope.priceRegions = [
    {'priceRegion': "0-100"},
    {'priceRegion': '100-200'},
    {'priceRegion': '200-400'},
  ];

  $scope.priceRegion = '200-400';

  $scope.categoryList = [
    {'categoryName': '服饰/鞋/包/配饰'},
    {'categoryName': '居家生活'},
    {'categoryName': '母婴童装'},
    {'categoryName': '手机数码'},
    {'categoryName': '家用电器'}
  ];

  $scope.category = '手机数码';

  $scope.regions = [
    {'region': '浙江省'},
    {'region': '杭州市'},
    {'region': '台州市'},
    {'region': '宁波市'},
    {'region': '绍兴市'}
  ];

  $scope.items = [
    {'name': '奥普兰沙发',
     'provider': '奥普兰',
     'price': '1000',
     'region': 'A区',
     'commentNum':'2',
     'category':'家居生活',
     'imageUrl': "img/main_backimg_fade.png"
    },
    {'name': '奥普兰床',
     'provider': '奥普兰',
     'price': '1000',
     'region': 'A区',
     'commentNum':'2',
     'category':'家居生活',
     'imageUrl': "img/main_backimg_fade.png"
    },
    {'name': '奥普兰餐桌',
     'provider': '奥普兰',
     'price': '1000',
     'region': 'A区',
     'commentNum':'2',
     'category':'家居生活',
     'imageUrl': "img/main_backimg_fade.png"
   }
  ];

  $ionicModal.fromTemplateUrl('commodityModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.commodityModal = modal;
  });
  $scope.openModal = function() {
    $scope.commodityModal.show();
  };
  $scope.closeModal = function() {
    $scope.commodityModal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.commodityModal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
}])

//心理1解1
.controller('simplePsychology', ['$scope', 'Data', '$stateParams', function($scope, Data, $stateParams) {
  var pageParams = 
  {
  };
  
  $scope.items = [
  ['132074', '记忆能力测试', ''],
  ['132073', '个人能力测试', ''],
  ['132072', '测试你的焦虑程度', '']
  ];
  var moreData = false;
    
  // Data.articleList.loadlist(pageParams, function(data){
  //   $scope.items = data.data.items;

    moreData = true;
  // });

  //下拉刷新
  $scope.doRefresh = function() {
    
    // Data.articleList.loadlist(pageParams, function(data){
    //   $scope.articleLists = data.data.items;
    //   pageParams.loaded = $scope.articleLists.length;
    //   pageParams.lastID = $scope.articleLists[$scope.articleLists.length - 1] && $scope.articleLists[$scope.articleLists.length - 1][0] || 0;
      $scope.$broadcast('scroll.refreshComplete');
    // });
    
  };

  //上拉加载
  $scope.loadMoreData = function() {
    // Data.articleList.loadlist(pageParams, function(data){
      // $scope.articleLists = $scope.articleLists.concat(data.data.items);
      // pageParams.loaded = $scope.articleLists.length;
      // pageParams.lastID = $scope.articleLists[$scope.articleLists.length - 1] && $scope.articleLists[$scope.articleLists.length - 1][0] || 0;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    // });

    // Data.articleList.loadlist(pageParams, function(data){
    //   if(data.data.items.length < 1) {
    //     moreData = false;
    //   }
    //   else {
    //     moreData = true;
    //   }
    // });
    
  };
  $scope.moreDataCanBeLoaded = function() {
    return moreData;
  };

  $scope.$on('stateChangeSuccess', function() {
    $scope.loadMoreData();
  });

}])

//心理1解1链接
.controller('simplePsychologyLink', ['$scope', '$stateParams', '$sce', function($scope, $stateParams, $sce) {
  $scope.pUrl = $sce.trustAsResourceUrl("http://17f.go5le.net/99_tj/991/news1_2.asp?id=" + $stateParams.qid);
}])

//我的
.controller('simpleMine', ['$scope', function($scope) {
  $scope.userID = '1';
  $scope.userName = '王成';
}])

//收藏
.controller('simpleFavorites', ['$scope', '$ionicModal', function($scope, $ionicModal) {
  $scope.itemList = [
    { text: "通知公告", checked: true },
    { text: "团讯要闻", checked: false },
    { text: "头条新闻", checked: false },
    { text: "书记寄语", checked: false }
  ];

  $ionicModal.fromTemplateUrl('favoritesModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.favoritesModal = modal;
  });
  $scope.openModal = function() {
    $scope.favoritesModal.show();
  };
  $scope.closeModal = function() {
    $scope.favoritesModal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.favoritesModal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
}])

//设置
.controller('simpleSettings', ['$scope', function($scope) {
  $scope.userName = "王林";
  $scope.signature = "";

  $scope.ClearCache = function() {
    navigator.app.clearCache();
  };
}])

.controller('simpleAgreement', ['$scope', function($scope) {
  $scope.content1 = "";
  $scope.content2 = "";
  $scope.content3 = "";
  $scope.content4 = "";
}])

.controller('simpleOurs', ['$scope', function($scope) {

}])

.controller('simpleFeedback', ['$scope', function($scope) {

}])

//个人资料
.controller('simplePersonalInfo', ['$scope', function($scope) {
  $scope.item = {'userName':'王成',
    'userID':'2014082911423',
    'birth':'1978-5-12',
    'identityCard':'000000000000000', 

    'password':'123',
    'password2':'123',
    'phone':'13732255555',
    'QQ':'113456789',
    'email':'123@qq.com',

    'work':'省直机关团工委',
    'address':'浙江省杭州市',
    'hobby':'读书',
    'brief':'无'};

}])

//通讯录
.controller('simplePersonAddressBook', ['$scope', 'Data', '$stateParams', function($scope, Data, $stateParams) {
  $scope.items = [
    {'name': '王成',
     'imageUrl': "img/defaultAvatar.png",
     'work': '省经信委',
     'address':'',
     'phone':'87052438',
     'cellphone':'15057188887'},
    {'name': '戴丽娟',
     'imageUrl': "img/defaultAvatar.png",
     'phone':'87052438',
     'cellphone':'15057188887',
     'work': '浙江长征职业技术学院',
     'address':'留和路525号'},
    {'name': '叶林伟',
     'imageUrl': "img/defaultAvatar.png",
     'work': '杭州市某自动化技术有限公司',
     'address':'杭州市拱墅区舟山东路66号',
     'phone':'',
     'cellphone':'15057188887'}
  ];

    var pageParams = 
  {
    tabCode: $stateParams.tabCode,
    loaded: 0,
    lastID: 0,
    requestNO: 20
  };
  
  // var moreData = false;

  // Data.activityList.loadlist(pageParams, function(data){
  //   $scope.serviceLists = data.data.items;
  //   // console.log(data.data.items); //==================test
  //   pageParams.loaded = $scope.serviceLists.length;
  //   pageParams.lastID = $scope.serviceLists[$scope.serviceLists.length - 1] && $scope.serviceLists[$scope.serviceLists.length - 1][0] || 0;
  //   moreData = true;
  // });

  //下拉刷新
  $scope.doRefresh = function() {
    // pageParams.lastID = 0;
    // pageParams.requestNO = pageParams.loaded;
    // Data.activityList.loadlist(pageParams, function(data){
    //   $scope.serviceLists = data.data.items;
    //   pageParams.loaded = $scope.serviceLists.length;
    //   pageParams.lastID = $scope.serviceLists[$scope.serviceLists.length - 1] && $scope.serviceLists[$scope.serviceLists.length - 1][0] || 0;
      $scope.$broadcast('scroll.refreshComplete');
    // });
    
  };

  //上拉加载
  $scope.loadMoreData = function() {
    // Data.activityList.loadlist(pageParams, function(data){
    //   $scope.serviceLists = $scope.serviceLists.concat(data.data.items);
    //   // Storage.kset(pageParams[index].tabCode, $scope.articleLists[index].length);
    //   pageParams.loaded = $scope.serviceLists.length;
    //   pageParams.lastID = $scope.serviceLists[$scope.serviceLists.length - 1] && $scope.serviceLists[$scope.serviceLists.length - 1][0] || 0;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    // });

    // Data.activityList.loadlist(pageParams, function(data){
    //   if(data.data.items.length < 1) {
    //     moreData = false;
    //   }
    //   else {
    //     moreData = true;
    //   }
    //   // console.log(moreData);
    // });
    
  };
  $scope.moreDataCanBeLoaded = function() {
    return moreData;
  };

  $scope.$on('stateChangeSuccess', function() {
    $scope.loadMoreData();
  });
}])

//聊天室
.controller('simpleChatroom', ['$scope', 'Chat', function($scope, Chat) {
  var lastID = "";//声明上次取回的消息的ID
  var mGetTime;//设置setTimeout的返回值
  var getMessReq = Chat.getAjax();//获取消息的XMLHTTPRequest对象
  var sendMessReq = Chat.getAjax();//发送消息的XMLHTTPRequest对象
  Chat.getMess(lastID, mGetTime, getMessReq);
  document.getElementById("mess").focus();//把焦点设置到消息输入框

  $scope.getMessage = function() {
    return;
  };

  $scope.sendMessage = function() {
    Chat.sendMess(lastID, mGetTime, sendMessReq);
    return;
  };

}])

.controller('mainTestC', ['$scope', '$ionicPopover', function($scope, $ionicPopover) {
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
}])

.controller('mainTestP', ['$scope', '$ionicPopover', '$ionicPopup', '$ionicBackdrop', '$timeout', '$ionicPosition', function($scope, $ionicPopover, $ionicPopup, $ionicBackdrop, $timeout, $ionicPosition) {

  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
    console.log($event);
    $scope.hello = "Hello World!";
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

  // Triggered on a button click, or some other target
  $scope.showPopup = function() {
    $scope.data = {}
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="password" ng-model="data.wifi"  placeholder="Password">',
      title: 'Enter Wi-Fi Password',
      subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.wifi) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return $scope.data.wifi;
            }
          }
        },
      ]
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 3000);
  };
  // A confirm dialog
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Consume Ice Cream',
      template: 'Are you sure you want to eat this ice cream?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };
  // An alert dialog
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Don\'t eat that!',
      template: 'It might taste good'
    });
    alertPopup.then(function(res) {
      console.log('Thank you for not eating my delicious ice cream cone');
    });
  };

  $scope.backDrop = function() {
    $ionicBackdrop.retain();
    $timeout(function() {
      $ionicBackdrop.release();
    }, 1000);
  };

  $scope.getPosition = function(e) {
    //console.log(e);
    //console.log(e.target == e.srcElement && e.srcElement == e.toElement);
    var elem = angular.element(e.srcElement);
    var elemPosition = $ionicPosition.position(elem);
    console.log(elemPosition);
    console.log(elem);
  };
}])


.controller('mainTestA', ['$scope', '$ionicActionSheet', '$ionicLoading', '$timeout', function($scope, $ionicActionSheet, $ionicLoading, $timeout) {

  // Triggered on a button click, or some other target
  $scope.show = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: '<b>Share</b> This' },
        { text: 'Delay to Cancel' },
        { text: 'Loading'}
      ],
      destructiveText: 'Delete',
      titleText: 'Modify your album',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        console.log(index);
        if (index === 0) {
          return true;
        }
        if (index === 1) {
          $timeout(function() {
            hideSheet();
            //return true;
          }, 2000);
        }
        if (index === 2) {
          $ionicLoading.show({
            template: 'Loading...',
            //noBackdrop: false
          });
          $timeout(function() {
            $ionicLoading.hide();
            hideSheet();
            //return true;
          }, 2000);
        }
        //return true;
      },
      destructiveButtonClicked: function() {
        return true;
      },
      cancelOnStateChange: true
    });

    // For example's sake, hide the sheet after two seconds
    // $timeout(function() {
    //   hideSheet();
    // }, 2000);

  };
}])


//测试
.controller('mainTestL', ['$scope', '$timeout', function($scope, $timeout) {

  $scope.items = [1,2,3];
  var count = 4;

  //下拉刷新
  $scope.doRefresh = function() {
    // $scope.$apply(function(){
      $scope.items.push(count);
      count++;
      $scope.items.push(count);
      count++;
      $scope.items.push(count);
      count++;
    // });
    $scope.$broadcast('scroll.refreshComplete');
  };

  //上拉加载
  //$scope.items = [];
  $scope.loadMoreData = function() {
    $scope.items.push(count);
    count++;
    $scope.items.push(count);
    count++;
    $scope.items.push(count);
    count++;
    $timeout(function(){
      $scope.$broadcast('scroll.infiniteScrollComplete');
    },1000);
  };
  $scope.moreDataCanBeLoaded = function() {
    return true;
  };
  $scope.$on('stateChangeSuccess', function() {
    $scope.loadMoreData();
  });

  //删除、排序、滑动选项
  $scope.data = {
    showDelete: false,  //可以注释掉
    showReorder: false  //可以注释掉
  };
  $scope.share = function(item) {
    //console.log(item);
    alert('Share Item: ' + item);
  };
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

}])


.controller('mainTestR', ['$scope', '$ionicScrollDelegate', 'filterFilter', function($scope, $ionicScrollDelegate, filterFilter) {
  var letters = $scope.letters = [];
  var contacts = $scope.contacts = [];
  var currentCharCode = 'A'.charCodeAt(0) - 1;

  //window.CONTACTS is defined below
  window.CONTACTS
    .sort(function(a, b) {
      return a.last_name > b.last_name ? 1 : -1;
    })
    .forEach(function(person) {
      //Get the first letter of the last name, and if the last name changes
      //put the letter in the array
      var personCharCode = person.last_name.toUpperCase().charCodeAt(0);
      //We may jump two letters, be sure to put both in
      //(eg if we jump from Adam Bradley to Bob Doe, add both C and D)
      var difference = personCharCode - currentCharCode;
      for (var i = 1; i <= difference; i++) {
        addLetter(currentCharCode + i);
      }
      currentCharCode = personCharCode;
      contacts.push(person);
    });

  //If names ended before Z, add everything up to Z
  for (var i = currentCharCode + 1; i <= 'Z'.charCodeAt(0); i++) {
    addLetter(i);
  }

  function addLetter(code) {
    var letter = String.fromCharCode(code);
    contacts.push({
      isLetter: true,
      letter: letter
    });
    letters.push(letter);
  }

  //Letters are shorter, everything else is 52 pixels
  $scope.getItemHeight = function(item) {
    return item.isLetter ? 40 : 100;
  };
  $scope.getItemWidth = function(item) {
    return '100%';
  };

  $scope.scrollBottom = function() {
    $ionicScrollDelegate.scrollBottom(true);
  };

  var letterHasMatch = {};
  $scope.getContacts = function() {
    letterHasMatch = {};
    //Filter contacts by $scope.search.
    //Additionally, filter letters so that they only show if there
    //is one or more matching contact
    return contacts.filter(function(item) {
      var itemDoesMatch = !$scope.search || item.isLetter ||
        item.first_name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
        item.last_name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

      //Mark this person's last name letter as 'has a match'
      if (!item.isLetter && itemDoesMatch) {
        var letter = item.last_name.charAt(0).toUpperCase();
        letterHasMatch[letter] = true;
      }

      return itemDoesMatch;
    }).filter(function(item) {
      //Finally, re-filter all of the letters and take out ones that don't
      //have a match
      if (item.isLetter && !letterHasMatch[item.letter]) {
        return false;
      }
      return true;
    });
  };

  $scope.clearSearch = function() {
    $scope.search = '';
  };

}])

;


window.CONTACTS = [{"id":1,"first_name":"Patrick","last_name":"Rogers","country":"Cyprus","ip_address":"153.88.89.148","email":"progers@yata.net"},
{"id":2,"first_name":"Janet","last_name":"Gordon","country":"Croatia","ip_address":"209.73.121.212","email":"jgordon@skivee.biz"},
{"id":3,"first_name":"Kathy","last_name":"Hamilton","country":"Armenia","ip_address":"164.214.217.162","email":"khamilton@rhynyx.biz"},
{"id":4,"first_name":"Stephanie","last_name":"Johnson","country":"Mauritius","ip_address":"8.199.242.67","email":"sjohnson@jabbertype.mil"},
{"id":5,"first_name":"Jerry","last_name":"Palmer","country":"Thailand","ip_address":"230.207.100.163","email":"jpalmer@avamm.org"},
{"id":6,"first_name":"Lillian","last_name":"Franklin","country":"Germany","ip_address":"150.190.116.1","email":"lfranklin@eare.mil"},
{"id":7,"first_name":"Melissa","last_name":"Gordon","country":"Serbia","ip_address":"162.156.29.99","email":"mgordon@flashset.org"},
{"id":8,"first_name":"Sarah","last_name":"Burns","country":"Grenada","ip_address":"13.177.156.223","email":"sburns@eimbee.info"},
{"id":9,"first_name":"Willie","last_name":"Burton","country":"Croatia","ip_address":"115.133.81.82","email":"wburton@dynazzy.info"},
{"id":10,"first_name":"Tina","last_name":"Simmons","country":"United States Virgin Islands","ip_address":"113.49.63.18","email":"tsimmons@devpulse.mil"},
{"id":11,"first_name":"Kenneth","last_name":"Larson","country":"Mexico","ip_address":"92.89.76.196","email":"klarson@browseblab.info"},
{"id":12,"first_name":"Philip","last_name":"Welch","country":"Cuba","ip_address":"223.180.48.70","email":"pwelch@skippad.edu"},
{"id":13,"first_name":"Nicholas","last_name":"Parker","country":"British Indian Ocean Territory","ip_address":"200.150.119.13","email":"nparker@twitternation.net"},
{"id":14,"first_name":"Nicole","last_name":"Webb","country":"Moldova","ip_address":"47.66.237.205","email":"nwebb@midel.biz"},
{"id":15,"first_name":"Clarence","last_name":"Schmidt","country":"China","ip_address":"134.84.246.67","email":"cschmidt@dazzlesphere.net"},
{"id":16,"first_name":"Jessica","last_name":"Murray","country":"Sao Tome and Principe","ip_address":"211.30.32.109","email":"jmurray@jumpxs.net"},
{"id":17,"first_name":"Willie","last_name":"Schmidt","country":"US Minor Outlying Islands","ip_address":"158.40.109.208","email":"wschmidt@babbleset.edu"},
{"id":18,"first_name":"Margaret","last_name":"Evans","country":"Bhutan","ip_address":"252.123.77.101","email":"mevans@voolia.info"},
{"id":19,"first_name":"Arthur","last_name":"Morales","country":"Faroe Islands","ip_address":"116.5.126.29","email":"amorales@brainlounge.biz"},
{"id":20,"first_name":"Charles","last_name":"Perez","country":"Italy","ip_address":"10.43.255.4","email":"cperez@avaveo.net"},
{"id":21,"first_name":"Jeffrey","last_name":"Webb","country":"Liechtenstein","ip_address":"55.140.114.8","email":"jwebb@mynte.net"},
{"id":22,"first_name":"Andrea","last_name":"Simpson","country":"Nauru","ip_address":"22.243.12.86","email":"asimpson@browsetype.mil"},
{"id":23,"first_name":"Steve","last_name":"Reynolds","country":"Morocco","ip_address":"21.166.38.112","email":"sreynolds@topiclounge.biz"},
{"id":24,"first_name":"Gerald","last_name":"Reyes","country":"Isle of Man","ip_address":"235.115.15.46","email":"greyes@voolith.biz"},
{"id":25,"first_name":"Judy","last_name":"Washington","country":"Sweden","ip_address":"39.120.240.182","email":"jwashington@oyondu.net"},
{"id":26,"first_name":"Brandon","last_name":"Patterson","country":"Vietnam","ip_address":"18.176.165.38","email":"bpatterson@skyba.org"},
{"id":27,"first_name":"Jacqueline","last_name":"Stephens","country":"Cambodia","ip_address":"207.226.109.97","email":"jstephens@fivespan.net"},
{"id":28,"first_name":"Carlos","last_name":"Harrison","country":"Burkina Faso","ip_address":"130.22.96.6","email":"charrison@yacero.gov"},
{"id":29,"first_name":"Carol","last_name":"Payne","country":"Estonia","ip_address":"194.1.83.133","email":"cpayne@brightbean.com"},
{"id":30,"first_name":"David","last_name":"Baker","country":"Montenegro","ip_address":"39.212.209.46","email":"dbaker@youspan.name"},
{"id":31,"first_name":"Justin","last_name":"Watkins","country":"Timor-Leste","ip_address":"8.56.161.224","email":"jwatkins@centimia.net"},
{"id":32,"first_name":"Roy","last_name":"Meyer","country":"Seychelles","ip_address":"166.207.153.210","email":"rmeyer@quire.com"},
{"id":33,"first_name":"Kelly","last_name":"Richardson","country":"Central African Republic","ip_address":"74.86.34.94","email":"krichardson@agivu.net"},
{"id":34,"first_name":"Howard","last_name":"Mason","country":"Portugal","ip_address":"139.237.150.73","email":"hmason@wikivu.info"},
{"id":35,"first_name":"Karen","last_name":"Jackson","country":"Swaziland","ip_address":"143.153.219.220","email":"kjackson@kazio.net"},
{"id":36,"first_name":"Christine","last_name":"Bennett","country":"France","ip_address":"102.220.71.37","email":"cbennett@pixoboo.edu"},
{"id":37,"first_name":"Ashley","last_name":"Jordan","country":"Svalbard and Jan Mayen Islands","ip_address":"217.38.155.41","email":"ajordan@oba.edu"}];
