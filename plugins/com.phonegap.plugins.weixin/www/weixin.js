/**
 * WeiXin
 * version 0.9
 * author: Jian Chen / ajccom
 * https://github.com/ajccom/phonegap-weixin
 * tested cordova version - 2.3.0
 **/
var weixin = {
    register: function(appid, success, error) {
        cordova.exec(success, error, "WeiXin", "register", [appid]);
    },

    unregister: function(success, error) {
        cordova.exec(success, error, "WeiXin", "unregister", []);
    },

    openWeixin: function(success, error) {
        cordova.exec(success || null, error || null, "WeiXin", "openWeixin", []);
    },

    send: function(arg, success, error) {
        if (typeof arg.isSendToTimeline === 'undefined') {arg.isSendToTimeline = true}
        if (arg.type === 'image' && typeof arg.imageType === 'undefined') {arg.imageType = 'url'}
        if (arg.type === 'music' || arg.type === 'video' || arg.type === 'webpage') {
            if (typeof arg.title === 'undefined') {arg.title = ''}
            if (typeof arg.desc === 'undefined') {arg.desc = ''}
            if (typeof arg.imgUrl === 'undefined') {arg.imgUrl = ''}
            if (typeof arg.isLowBand === 'undefined') {arg.isLowBand = false}
        }
        cordova.exec(success, error, "WeiXin", "send", [arg]);
    }
}
module.exports = weixin;
