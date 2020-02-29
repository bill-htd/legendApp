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
var OSATarget7Panel4 = (function (_super) {
    __extends(OSATarget7Panel4, _super);
    function OSATarget7Panel4() {
        var _this = _super.call(this) || this;
        _this.skinName = "CDSnowManSkin";
        return _this;
    }
    OSATarget7Panel4.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = ChritmasSnowMainItem;
    };
    OSATarget7Panel4.prototype.open = function () {
        this.addTouchEvent(this.turnBossBtn, this.onTap);
        this.addTouchEvent(this.arrowUp, this.onTap);
        this.addTouchEvent(this.arrowDown, this.onTap);
        TimerManager.ins().doTimer(1000, 0, this.updateTime, this);
        this.initData();
    };
    OSATarget7Panel4.prototype.initData = function () {
        this.actInfo1.text = GlobalConfig.ActivityConfig[this.activityID].desc;
        var config = GlobalConfig.ActivityType7Config[this.activityID];
        var listConfig = [];
        for (var i in config) {
            listConfig.push(config[i]);
        }
        listConfig.sort(function (a, b) {
            if (a.index < b.index)
                return -1;
            return 1;
        });
        this.list.dataProvider = new eui.ArrayCollection(listConfig);
        this.updateTime();
        this.updateData();
    };
    OSATarget7Panel4.prototype.updateTime = function () {
        var act = Activity.ins().getActivityDataById(this.activityID);
        var sec = act.getLeftTime();
        this.actTime1.text = DateUtils.getFormatBySecond(sec, DateUtils.TIME_FORMAT_5, 3);
    };
    OSATarget7Panel4.prototype.updateData = function () {
        var data = Activity.ins().getActivityDataById(this.activityID);
        this.numLbl.text = "" + data.bossScore;
        var sources = this.list.dataProvider;
        for (var _i = 0, _a = sources.source; _i < _a.length; _i++) {
            var source = _a[_i];
            sources.itemUpdated(source);
        }
    };
    OSATarget7Panel4.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        switch (tar) {
            case this.turnBossBtn:
                ViewManager.ins().open(BossWin, 1);
                break;
            case this.arrowUp:
                this.arrowTo(-1);
                break;
            case this.arrowDown:
                this.arrowTo(1);
                break;
        }
    };
    OSATarget7Panel4.prototype.arrowTo = function (dir) {
        var sv = this.list.scrollV + dir * 130;
        if (sv < 0) {
            sv = 0;
        }
        else if (sv > this.list.contentHeight - this.list.parent.height) {
            sv = this.list.contentHeight - this.list.parent.height;
        }
        this.list.scrollV = sv;
    };
    OSATarget7Panel4.prototype.close = function () {
        this.removeTouchEvent(this.turnBossBtn, this.onTap);
        this.removeTouchEvent(this.arrowUp, this.onTap);
        this.removeTouchEvent(this.arrowDown, this.onTap);
        TimerManager.ins().remove(this.updateTime, this);
    };
    return OSATarget7Panel4;
}(BaseView));
__reflect(OSATarget7Panel4.prototype, "OSATarget7Panel4");
//# sourceMappingURL=OSATarget7Panel4.js.map