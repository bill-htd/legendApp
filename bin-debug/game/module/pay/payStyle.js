var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pay = (function (_super) {
    __extends(Pay, _super);
    function Pay() {
        var _this = _super.call(this) || this;
        _this.canNoSend = false;
        _this.timeStar = true;
        _this.sendNum = 0;
        return _this;
    }
    Pay.ins = function () {
        return _super.ins.call(this);
    };
    Pay.prototype.sendPayStyte = function (money, type, yuanbao) {
        var self = this;
        if (!yuanbao)
            return;
        if (!type)
            type = 1;
        if (self.sendNum == 3) {
            UserTips.ins().showTips("\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u8FC7\u6BB5\u65F6\u95F4\u5728\u8BD5\u8BD5");
            return;
        }
        else {
            if (this.timeStar) {
                this.timeStar = false;
                TimerManager.ins().doTimer(20000, 1, function () {
                    self.timeStar = true;
                    self.sendNum = 0;
                }, this);
            }
        }
        var url = window['getChargeUrl']();
        if (!url) {
            WarnWin.show("请求地址出错，请重新点击购买按钮", function () { }, this);
            return;
        }
        url += '&user_id=' + LocationProperty.userID;
        url += '&role_name=' + LocationProperty.userName;
        url += '&role_id=' + LocationProperty.roleID;
        url += '&pay_type=' + type;
        url += '&amount=' + money;
        url += '&gold=' + yuanbao;
        url += '&serverid=' + LocationProperty.serverID;
        Http.ins().send(url, true, false, function (event) {
            self.sendNum++;
            var request = event.currentTarget;
            var data = JSON.parse(request.response);
            if (data.status == 1) {
                if (data.data) {
                    if (data.data.url) {
                        var url_1 = data.data.url;
                        if (url_1) {
                            ViewManager.ins().close(WarnWin);
                            if (type == 1) {
                                url_1 = url_1.replace(/&amp;/g, "&");
                            }
                            else {
                                url_1 = decodeURIComponent(url_1);
                            }
                            if (window['getNative']() == 'web') {
                                window.open(url_1);
                            }
                            else {
                                egret.ExternalInterface.call("openURL", url_1);
                            }
                        }
                    }
                    else {
                        alert('获取地址失败，请重新请求');
                    }
                }
                else {
                    alert('获取地址失败，请重新请求');
                }
            }
            else {
                alert(data.info);
            }
        });
    };
    return Pay;
}(BaseClass));
__reflect(Pay.prototype, "Pay");
//# sourceMappingURL=payStyle.js.map