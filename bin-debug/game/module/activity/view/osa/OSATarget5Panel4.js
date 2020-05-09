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
var OSATarget5Panel4 = (function (_super) {
    __extends(OSATarget5Panel4, _super);
    function OSATarget5Panel4() {
        var _this = _super.call(this) || this;
        _this.skinName = "OSADailyDoubleRechargeSkin";
        _this.addTouchEvent(_this.getBtn, _this.onTouch);
        _this.reward.itemRenderer = ItemBase;
        return _this;
    }
    OSATarget5Panel4.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var config = GlobalConfig.ActivityType5Config[this.activityID];
        console.log(config);
        this.reward.dataProvider = new eui.ArrayCollection(config.rewards);
        this.updateData();
    };
    OSATarget5Panel4.prototype.onTouch = function (e) {
        switch (e.currentTarget) {
            case this.getBtn:
                Activity.ins().sendReward(this.activityID, this.day);
                break;
        }
    };
    OSATarget5Panel4.prototype.updateData = function () {
        this._activityData = Activity.ins().getActivityDataById(this.activityID);
        var conf = GlobalConfig['ActivityType5Config'][this.activityID];
        this.day = conf.day;
        var flag = ((this._activityData.recrod >> this.day & 1) == 1);
        console.log('是否已经领取过了');
        console.log(this._activityData.recrod);
        console.log(this.day);
        if (!flag) {
            this.getBtn.visible = true;
            console.log('还没领取');
        }
        else {
            this.getBtn.visible = false;
            console.log('领取过了');
        }
    };
    OSATarget5Panel4.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.getBtn, this.onTouch);
        DisplayUtils.removeFromParent(this.btnMC);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    return OSATarget5Panel4;
}(BaseView));
__reflect(OSATarget5Panel4.prototype, "OSATarget5Panel4");
//# sourceMappingURL=OSATarget5Panel4.js.map