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
var d_launchX = 180;
var d_launchY = 500;
var d_firstX = 0;
var d_firstY = 0;
var d_distantX = 77;
var d_distantY = 93;
var d_depotX = 320;
var d_depotY = 620;
var d_waitTime = 50;
var ChallengeDayRewardWin = (function (_super) {
    __extends(ChallengeDayRewardWin, _super);
    function ChallengeDayRewardWin() {
        var _this = _super.call(this) || this;
        _this.arr = [];
        _this.items = [];
        _this.maxCount = 12;
        _this.isTopLevel = true;
        _this.skinName = "chuangtianguanDayReward";
        return _this;
    }
    ChallengeDayRewardWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.GetRewardBtn0, this.challenge);
        this.addTouchEvent(this.bgClose, this.closeCB);
        this.observe(UserFb2.ins().postRewardStatu, this.setBtnStatu);
        UserFb2.ins().sendrequestDayReward();
    };
    ChallengeDayRewardWin.prototype.challenge = function () {
        var func = function () {
            UserFb2.ins().sendGetDayReward();
        };
        this.playGet(func);
        this.canClicck = false;
    };
    ChallengeDayRewardWin.prototype.setBtnStatu = function () {
        if (SkyLevelModel.ins().rewardTimes >= 1) {
            this.GetRewardBtn0.label = "\u7EE7\u7EED\u9886\u53D6(" + SkyLevelModel.ins().rewardTimes + ")";
        }
        else {
            this.GetRewardBtn0.label = "确定";
        }
        this.arr = SkyLevelModel.ins().dayRewardList.slice();
        this.playResult();
    };
    ChallengeDayRewardWin.prototype.playResult = function (fun) {
        var _this = this;
        var count = this.arr.length > this.maxCount ? this.maxCount : this.arr.length;
        for (var i = 0; i < count; i++) {
            this.items[i] = this.createItem(this.arr[i]);
            var t = egret.Tween.get(this.items[i]);
            this.items[i].x = (i % 4) * d_distantX + d_firstX;
            this.items[i].y = Math.floor(i / 4) * d_distantY + d_firstY;
            this.items[i].alpha = 0;
            t.wait(i * d_waitTime).to({ alpha: 1 }, 200).call(function () {
                count--;
                if (count == 0) {
                    if (fun != undefined) {
                        fun();
                    }
                    _this.canClicck = true;
                }
            });
        }
    };
    ChallengeDayRewardWin.prototype.playGet = function (fun) {
        var _this = this;
        var count = this.arr.length > this.maxCount ? this.maxCount : this.arr.length;
        for (var i = 0; i < count; i++) {
            if (!this.items[i])
                continue;
            var t = egret.Tween.get(this.items[i]);
            t.to({
                "y": d_depotY,
                "x": d_depotX,
                "scaleX": 0,
                "scaleY": 0
            }, 300 - Math.floor(i / 4) * 50).call(function () {
                count--;
                if (count == 0) {
                    if (fun != undefined) {
                        fun();
                    }
                    _this.releaseAllItem();
                }
            });
        }
    };
    ChallengeDayRewardWin.prototype.createItem = function (data) {
        var item = new ItemBase();
        this.listCon.addChild(item);
        item.data = { type: data[0], count: data[2], id: data[1] };
        item.x = d_launchX;
        item.y = d_launchY;
        return item;
    };
    ChallengeDayRewardWin.prototype.releaseAllItem = function () {
        for (var k in this.items) {
            this.items[k].destruct();
            this.listCon.removeChild(this.items[k]);
        }
        this.items = [];
        if (SkyLevelModel.ins().rewardTimes == 0) {
            ViewManager.ins().close(ChallengeDayRewardWin);
        }
    };
    ChallengeDayRewardWin.prototype.closeCB = function (e) {
        var _this = this;
        if (!this.canClicck) {
            return;
        }
        this.canClicck = false;
        var func = function () {
            ViewManager.ins().close(_this);
        };
        this.playGet(func);
    };
    return ChallengeDayRewardWin;
}(BaseEuiView));
__reflect(ChallengeDayRewardWin.prototype, "ChallengeDayRewardWin");
ViewManager.ins().reg(ChallengeDayRewardWin, LayerManager.UI_Main);
//# sourceMappingURL=ChallengeDayRewardWin.js.map