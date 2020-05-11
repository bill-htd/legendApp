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
var payWin = (function (_super) {
    __extends(payWin, _super);
    function payWin() {
        var _this = _super.call(this) || this;
        _this.money = 0;
        _this.yuanbao = 0;
        _this.payType = 1;
        _this.activityid = 0;
        _this.selectType = 0;
        _this.isTopLevel = true;
        _this.skinName = "paySkin";
        _this.input.maxChars = 20;
        _this.input.textColor = 0x000000;
        _this.tab.itemRenderer = payItemRenderer;
        return _this;
    }
    payWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.money = param[0].money;
        this.yuanbao = param[0].yuanbao;
        this.moneyNum.text = this.money + '元';
        this.yuanbaoNum.text = this.yuanbao + '元宝';
        this.activityid = param[0].activityid;
        this.addTouchEvent(this.tab, this.onTap);
        this.addTouchEvent(this.jihuoBtn, this.onTap);
        this.addTouchEvent(this.payBtn, this.sendPay);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.getPayInfo();
    };
    payWin.prototype.getPayInfo = function () {
        var self = this;
        var url = 'http://back.dangxuexi.com/gm/index.php?m=Payment&a=paylist&amount=' + this.money;
        Http.ins().send(url, true, true, function (event) {
            var request = event.currentTarget;
            var data = JSON.parse(request.response);
            if (data.status == 1) {
                self.serverInfo = data.data;
                self.tab.dataProvider = new eui.ArrayCollection(data.data);
            }
            else {
                alert(data.info);
            }
        });
    };
    payWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.payBtn, this.sendPay);
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeTouchEvent(this.jihuoBtn, this.onTap);
        this.removeTouchEvent(this.tab, this.onTap);
        this.removeTouchEvent(this.closeBtn, this.onTap);
        egret.Tween.removeTweens(this);
        WatcherUtil.removeFromArrayCollection(this.tab.dataProvider);
        this.removeObserve();
    };
    payWin.prototype.handleRadioButton = function (event) {
    };
    payWin.prototype.sendPay = function () {
        if (this.serverInfo[this.selectType].type == '3') {
            window.open(this.serverInfo[this.selectType].url);
        }
        else {
            WarnWin.show("正在拉起支付,请稍等...\n如果获取失败，或者页面没有二维码，请重新再次拉起支付 \n\n(如果有提示，请放心支付。如果有疑问，请点击左下角客服按钮与我们联系）", function () { }, this, function () { }, this, 'sure');
            Pay.ins().sendPayStyte(this.money, parseInt(this.serverInfo[this.selectType].type), this.yuanbao, this.activityid, this.serverInfo[this.selectType].url);
        }
        ViewManager.ins().close(payWin);
    };
    payWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.tab:
                this.selectType = this.tab.selectedIndex;
                break;
            case this.closeBtn:
            case this.bgClose:
                ViewManager.ins().close(payWin);
                break;
            case this.jihuoBtn:
                if (!this.input.text) {
                    WarnWin.show("请输入激活码！", function () { }, this);
                    return;
                }
                var url = window['get_dianquan_Address']();
                if (!url) {
                    alert('获取不到地址');
                    return;
                }
                url += '&user_id=' + LocationProperty.userID;
                url += '&role_name=' + LocationProperty.userName;
                url += '&actorid=' + LocationProperty.roleID;
                url += '&amount=' + this.money;
                url += '&channel=' + window['getChannel']();
                url += '&serverid=' + LocationProperty.serverID;
                url += '&point_code=' + this.input.text;
                Http.ins().send(url, true, true, function (event) {
                    var request = event.currentTarget;
                    var data = JSON.parse(request.response);
                    console.log(data);
                    WarnWin.show(data.msg, function () { }, this, function () { }, this, 'sure');
                });
                break;
        }
    };
    return payWin;
}(BaseEuiView));
__reflect(payWin.prototype, "payWin");
ViewManager.ins().reg(payWin, LayerManager.UI_Popup);
//# sourceMappingURL=payWin.js.map