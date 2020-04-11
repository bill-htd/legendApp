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
var HongBaoOpenItem = (function (_super) {
    __extends(HongBaoOpenItem, _super);
    function HongBaoOpenItem() {
        var _this = _super.call(this) || this;
        _this.actid = 0;
        _this.hongbaoid = 0;
        _this.skinName = 'hongbaoOpenSkin';
        _this.init();
        return _this;
    }
    HongBaoOpenItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    HongBaoOpenItem.prototype.init = function () {
        this.hbbtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
        this.closeBtn0.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
        this.closeBtn1.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.list.itemRenderer = HongBaoRewardsItem;
        this.closeBtn.visible = false;
    };
    HongBaoOpenItem.prototype.inithongbaodata = function (actid, hongbaoid) {
        this.actid = actid;
        this.hongbaoid = hongbaoid;
    };
    HongBaoOpenItem.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.hbbtn:
                if (!this.data || !this.data.actId || !this.data.eId)
                    return;
                var activityData = Activity.ins().getActivityDataById(this.data.actId);
                if (!activityData.isOpenActivity()) {
                    UserTips.ins().showTips("\u6D3B\u52A8\u5DF2\u7ED3\u675F");
                    return;
                }
                Activity.ins().sendReward(this.data.actId, this.data.eId, EnvelopeType.GET);
                break;
            case this.closeBtn0:
                Activity.ins().sendReward(this.actid, this.hongbaoid, 2);
                break;
            case this.closeBtn1:
                Activity.ins().sendReward(this.actid, this.hongbaoid, 1);
                break;
        }
    };
    HongBaoOpenItem.prototype.onTouch = function () {
        this.close();
    };
    HongBaoOpenItem.prototype.close = function () {
        if (this.callFun && this.bt1 && this.bt2 && this.bt3) {
            TimerManager.ins().remove(this.close, this);
            if (this.parent) {
                this.parent.removeChildren();
                this.callFun();
            }
        }
    };
    HongBaoOpenItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var job = this.data.job;
        var sex = this.data.sex;
        var roleName = this.data.name;
        var text = this.data.text;
        var index = this.data.index;
        this.myFace.source = "head_" + job + sex;
        this.playerName.text = roleName;
        this.speaktxt.textFlow = TextFlowMaker.generateTextFlow1(text);
        var config = GlobalConfig.ActivityType12Config[this.data.actId][index];
        this.title.source = "hongbao_title" + config.skinType;
    };
    HongBaoOpenItem.prototype.destruct = function () {
        this.hbbtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    HongBaoOpenItem.prototype.playAni = function (arr, callFun, obj) {
        var _this = this;
        this.removeChild(this.hbbtn);
        this.removeChild(this.hhbtnlabel);
        this.removeChild(this.speaktxt);
        this.removeChild(this.speakbg);
        if (!this.topImg.scrollRect)
            this.topImg.scrollRect = new egret.Rectangle(0, 0, this.topImg.width, this.topImg.height);
        if (!this.downImg.scrollRect)
            this.downImg.scrollRect = new egret.Rectangle(0, 0, this.downImg.width, this.downImg.height);
        var self = this;
        this.callFun = function () {
            if (callFun)
                callFun.call(obj);
        };
        var upSr = this.topImg.scrollRect;
        var downSr = this.downImg.scrollRect;
        var twTime = 400;
        this.list.dataProvider = new eui.ArrayCollection(arr);
        var tw1 = egret.Tween.get(upSr, {
            onChange: function () {
                _this.topImg.scrollRect = upSr;
            }
        }).to({ y: 200 }, twTime).call(function () {
            egret.Tween.removeTweens(tw1);
            self.bt1 = true;
            self.closeBtn.visible = true;
        });
        var tw2 = egret.Tween.get(downSr, {
            onChange: function () {
                _this.downImg.scrollRect = downSr;
            }
        }).to({ height: 0 }, twTime).call(function () {
            egret.Tween.removeTweens(tw2);
            self.bt2 = true;
        });
        var tw3 = egret.Tween.get(this.downImg).to({ y: this.downImg.y + this.downImg.height }, twTime).call(function () {
            egret.Tween.removeTweens(tw3);
            self.bt3 = true;
        });
        if (!TimerManager.ins().isExists(this.close, this))
            TimerManager.ins().doTimer(10000, 0, this.close, this);
    };
    return HongBaoOpenItem;
}(BaseItemRender));
__reflect(HongBaoOpenItem.prototype, "HongBaoOpenItem");
//# sourceMappingURL=HongBaoOpenItem.js.map