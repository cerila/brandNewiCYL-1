Title:程序开发档案
=========================



=========================
=#1======================

Subject		: 微信分享功能开发(Android版), !!!!!!!!!直接使用nl.x-services.plugins.socialsharing插件就可以!!!!!!!!!
Date		  : 20140815
Author		: Alex Zhou
Abstract	: 
Key Words	: Wechat; Weixin; Phonegap; Cordova; Plugin; Share

Main Body----------------
Method & Material~~~~~~~~
Online    : http://blog.csdn.net/chen1026241686/article/details/38368713
			      https://github.com/xu-li/cordova-plugin-wechat
			      https://github.com/xu-li/cordova-plugin-wechat/issues/1
			      https://github.com/xu-li/cordova-plugin-wechat-example
Code 		  : cordova plugin add https://github.com/xu-li/cordova-plugin-wechat
			      https://open.weixin.qq.com/cgi-bin/frame?t=resource/res_main_tmpl&verify=1&lang=zh_CN&target=res/app_download_android		##Android开发工具包中的libammsdk.jar, 在externalLibs/中

Procedure~~~~~~~~~~~~~~~~
1. 需要完全配置好Android-SDK开发环境(包括SDK, git, apache-ant, Java等, 见？文档);
2. 建好工程(ionic或cordova命令);
3. cordova plugin add https://github.com/xu-li/cordova-plugin-wechat; (同时安装好其他插件);
4. cordova platform add android; (执行本操作后, 会把所有需要的资源加入到platforms/android/目录中, 包括www\config.xml, plugins\*, res\*, 等等, 所以下面的步骤#7和#8都应该在本步骤之前完成);
5. 将libammsdk.jar放置到\platforms\android\CordovaLib\libs和\platforms\android\libs;
6. cordova build; (先编译一下试试看!), 编译出错, 按照错误提示作如下修改:
7. 修改\plugins\xu.li.cordova.wechat\src\android\Wechat.java和\platforms\android\src\xu\li\cordova\wechat\Wechat.java (本文件可以不修改), 即Android插件代码;
7.1 将line:23@ public class Weixin extends CordovaPlugin { 中的Weixin改为Wechat, 插件作者有误;
7.2 将line:17@ import com.tencent.mm.sdk.openapi.SendMessageToWX; 中的openapi改为modelmsg, 微信接口更新, 查阅Android_SDK.zip中的文档发现;
7.3 将line:19, 20, 21@ 作相同修改;
7.4 将line:25@ public static final String WXAPPID_PROPERTY_KEY = "weixinappid"; 中的weixinappid改为wechatappid, 插件作者笔误;
7.5 将line:1@ package xu.li.cordova.Wechat; 中的Weixin改为Wechat;
8. 在\www\config.xml中加入<preference name="wechatappid" value="wx427f444432aef6cc" />; 不要在\platforms\android\res\xml\config.xml中加, 每次ionic build或cordova build后，这个config.xml都会被\www\config.xml覆盖; 这里的wechatappid和上面的WXAPPID_PROPERTY_KEY对应;
9. 再次编译(cordova build或ionic build);
10. 使用方法: 
##<CODE>#################
Wechat.share({
    message: {
       title: "Message Title",
       description: "Message Description(optional)",
       mediaTagName: "Media Tag Name(optional)",
       thumb: "http://YOUR_THUMBNAIL_IMAGE",
       media: {
           type: Wechat.Type.WEBPAGE,   // webpage
           webpageUrl: "https://github.com/xu-li/cordova-plugin-wechat"    // webpage
       }
   },
   scene: Wechat.Scene.TIMELINE   // share to Timeline
}, function () {
    alert("Success");
}, function (reason) {
    alert("Failed: " + reason);
});
##</CODE>################
11. cordova emulate android或ionic emulate android;

Result~~~~~~~~~~~~~~~~~~~
出错: alert("Failed: " + reason) == alert('Failed: Class not found');
解决方案: 待解决;
其他方案: !!!!!!!!!直接使用nl.x-services.plugins.socialsharing插件就可以!!!!!!!!!

=#1-END==================
=========================



=========================
=#2======================

Subject   : gulp构建工具使用
Date      : 20140902
Author    : Alex Zhou
Abstract  : 
Key Words : gulp, grunt, package.json, gulpfile.js, uglify

Main Body----------------

Method & Material~~~~~~~~
Online    : http://handyxuefeng.blog.163.com/blog/static/4545217220142264922146/
Code      : 

Procedure~~~~~~~~~~~~~~~~
注意点: 要安装好gulp任务相关的工具包, npm install gulp-util --save-dev //安装到node_modules目录下, 同时加入到package.json的devDependencies中, 如果--save-dev 改为--save, 则加入到package.json的dependencies中;
Result~~~~~~~~~~~~~~~~~~~


=#2-END==================
=========================



=========================
=#3======================

Subject   : CSS笔记
Date      : 20140930
Author    : Alex Zhou
Abstract  : 
Key Words : 

Main Body----------------
1) CSS对某元素不生效的时候, 在Chrome里面找到该元素的CSS(不确定时可以直接在Chrome里面修改看效果), 然后把前面的选择器全部拷贝到自己的.css文件中, 肯定有效: 还是元素选择器的问题, 没有选中该元素.
2) CSS注意点: 1. CSS选择器优先级; 2. 伪元素选择器; 3. 元素选择器定位元素.

Method & Material~~~~~~~~
Online    : 
Code      : 

Procedure~~~~~~~~~~~~~~~~

Result~~~~~~~~~~~~~~~~~~~


=#3-END==================
=========================



=========================
=#4======================

Subject   : Xcode环境下开发
Date      : 20141015
Author    : Alex Zhou
Abstract  : 
Key Words : 

Main Body----------------
1) cordove platform add ios
2) 打开platforms/ios/iCYL beta.xcodeproj
3) iCYL beta -> Targets -> General -> Build 修改成100之类的数字 (optional)
4) iCYL beta -> Targets -> Info -> URL Types 加weixin [weixinAPPID]
5) iCYL beta -> Targets -> Build Settings -> Architectures $(ARCHS_STANDARD)改为$(ARCHS_STANDARD_32_BIT)
6) iCYL beta, Plugins 右键 Add Files to "iCYL beta"...  加入微信SDK, libWeChatSDK.a, WXApi.h, WXApiObject.h
7) iCYL beta, Resources, icons/splash 右键 Add Files to "iCYL beta"... 加入icon和splash

Method & Material~~~~~~~~
Online    : http://blog.sina.com.cn/s/blog_ad3a545d0102v0dh.html
Code      : 

Procedure~~~~~~~~~~~~~~~~

Result~~~~~~~~~~~~~~~~~~~


=#4-END==================
=========================



=========================
=#5======================

Subject   : Xcode模拟器测试、真机测试、Beta测试、Archive－Organizer、常规设置
Date      : 20141015
Author    : Alex Zhou
Abstract  : 
Key Words : 

Main Body----------------


Method & Material~~~~~~~~
Online    : 
Code      : 

Procedure~~~~~~~~~~~~~~~~

Result~~~~~~~~~~~~~~~~~~~


=#5-END==================
=========================



=========================
=#6======================

Subject   : WeChat插件使用
Date      : 20141015
Author    : Alex Zhou
Abstract  : 
Key Words : ajccom, phonegap-weixin, xu.li, cordova-plugin-wechat

Main Body----------------
1. xu.li 见 ＃4
1) scene: Wechat.Scene.SESSION是分享到聊天界面; TIMELINE是分享到朋友圈; FAVORITE是分享到收藏

2. ajccom
1) cordova plugin add https://github.com/ajccom/phonegap-weixin.git
2) iCYL beta -> Targets -> Info -> URL Types 加weixin [weixinAPPID] DONE in #4
3) Add following code to openURL method in AppDelegate.m file:
    a) #import "WXApi.h"
    b) return [WXApi handleOpenURL:url delegate:self]; in '- (BOOL)application:(UIApplication*)application openURL:(NSURL*)url sourceApplication:' method
    c) 注意作者github说明文档里面笔误, handleOpenURL错写成hadleOpenURL, 要改正!!!

Method & Material~~~~~~~~
Online    : 
Code      : 

Procedure~~~~~~~~~~~~~~~~

Result~~~~~~~~~~~~~~~~~~~


=#6-END==================
=========================



=========================
=#7======================

Subject   : 微信分享插件
Date      : 20141010
Author    : Alex Zhou
Abstract  : 在Mac OS X 10.9.5 + Xcode 6.0.1环境下开发微信分享功能
Key Words : 

Main Body----------------
参考问题: 今天在用一个第三方的静态库.a文件的时候, 运行于64位模拟器, 报错. 我在终端查了下那个.a文件支持哪些文件结构, 发现缺少x86_64, arm64
解决方法: 是把自己的工程只适配于32位, iPhone5s以上是64位兼容32位, 在TARGETS里面点项目名 -> Build Settings -> Architectures -> Other.. -> $(ARCHS_STANDARD_32_BIT), 这样你的App就会只支持32位的了.
我的问题: 出现WXApi.h file not found的错误, 是因为WXApi.h只支持32位, 按照上述方法修改后问题解决.

Method & Material~~~~~~~~
Online    : https://github.com/ajccom/phonegap-weixin

Code      : 

Procedure~~~~~~~~~~~~~~~~
1. 工程在Xcode中打开(参考PhoneGap文档iOS Platform Guide);
2. 在工程中设置URL Types(选中工程, Targets里面点项目名, Info);
3. 设置Build Settings里面的Architectures从$(ARCHS_STANDARD)改为$(ARCHS_STANDARD_32_BIT);
4. 在工程中导入Wechat的Lib, libWeChatSDK.a, WXApi.h, WXApiObject.h(任意文件夹上右键Add Files to "Project Name");
5. 模拟器运行, 真机运行.
Result~~~~~~~~~~~~~~~~~~~

Note~~~~~~~~~~~~~~~~~~~~~
1. Xcode工程最外面的config.xml和www文件夹是项目中的原始文件, 不是platforms目录里面的文件;
2. Staging目录里的文件是platforms目录下的文件;
3. 要修改icon和splash需要在Resources/splash和Resources/icon目录下直接修改, 修改www/res里面的文件没用;

=#7-END==================
=========================



=========================
=#8======================

Subject   : iPhone连接VMWare中的Mac OS X系统
Date      : 20141010
Author    : Alex Zhou
Abstract  : VMWare暂时不识别USB3.0接口, 因此点击VMWare右下角任务栏切换设备时会出现驱动无法安装的错误, 将iPhone连接到USB2.0接口就解决了.

=#8-END==================
=========================