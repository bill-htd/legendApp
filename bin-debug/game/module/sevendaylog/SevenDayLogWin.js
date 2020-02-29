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
var SevenDayLogWin = (function (_super) {
    __extends(SevenDayLogWin, _super);
    function SevenDayLogWin() {
        var _this = _super.call(this) || this;
        _this.itemary = [];
        _this.dayindex = 0;
        _this.itemList = [];
        _this.skinName = "act14logSkin";
        _this.itemary = [];
        _this.itemList = [];
        for (var i = 0; i < 14; i++) {
            _this.itemList[i] = _this['dayNum' + (i + 1)];
            _this.itemList[i].touchEnabled = false;
        }
        return _this;
    }
    SevenDayLogWin.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.suerBtn, this.onTouch);
        for (var i = 0; i < 14; i++) {
            this.addTouchEvent(this.itemList[i], this.itemTouch);
        }
        this.observe(Activity.ins().postSevendayAwardCallback, this.setList);
        this.observe(Activity.ins().postSevendayIsAwards, this.changeList);
        this.changeList();
        this.showRedPoint();
        var dayNum = param[0];
        if (dayNum) {
            this.setList(dayNum);
        }
        if (this.dayindex > 7) {
            TimerManager.ins().doNext(function () {
                _this.scroller.viewport.scrollV = _this.scroller.viewport.contentHeight - _this.scroller.height;
            }, this);
        }
    };
    SevenDayLogWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.suerBtn, this.onTouch);
        DisplayUtils.removeFromParent(this.btnMC);
        for (var i = 0; i < 14; i++) {
            this.removeTouchEvent(this.itemList[i], this.itemTouch);
        }
        this.removeObserve();
    };
    SevenDayLogWin.prototype.changeList = function () {
        var day = 0;
        var dayNum = Activity.ins().dayNum;
        if (dayNum >= 14)
            day = 13;
        else
            day = dayNum;
        for (var i = 1; i <= day; i++) {
            var config = GlobalConfig.LoginRewardsConfig[i];
            if (config) {
                if (dayNum >= config.day) {
                    if ((Activity.ins().isAwards >> config.day & 1) == 0) {
                        this.setList(i - 1);
                        return;
                    }
                }
            }
        }
        this.setList(day);
    };
    SevenDayLogWin.prototype.onTouch = function (e) {
        switch (e.currentTarget) {
            case this.suerBtn:
                if (Activity.ins().dayNum >= this.day)
                    Activity.ins().sendGetSevenDayAwards(this.day);
                else
                    UserTips.ins().showTips("|C:0xf3311e&T:登陆天数不足，无法领取|");
                break;
        }
    };
    SevenDayLogWin.prototype.itemTouch = function (e) {
        this.setList(e.currentTarget.data - 1);
    };
    SevenDayLogWin.prototype.setList = function (index) {
        if (index === void 0) { index = -1; }
        if (index == -1) {
            index = this.dayindex;
        }
        this.dayindex = index;
        var list;
        var len = CommonUtils.getObjectLength(GlobalConfig.LoginRewardsConfig);
        list = GlobalConfig.LoginRewardsConfig[index + 1].rewards;
        this.day = GlobalConfig.LoginRewardsConfig[index + 1].day;
        var today = 0;
        today = Activity.ins().dayNum;
        this.daylabel.text = "\u767B\u9646\u5929\u6570\uFF1A" + today;
        this.daylabel.visible = true;
        var flag = ((Activity.ins().isAwards >> this.day & 1) == 1);
        this.dayaward.text = "\u7B2C" + TextFlowMaker.getCStr(index + 1) + "\u5929\u5956\u52B1\u8BE6\u60C5";
        this.suerBtn.visible = true;
        if (Activity.ins().dayNum >= this.day) {
            if (!flag) {
                this.btnMC = this.btnMC || new MovieClip;
                this.btnMC.x = this.suerBtn.width / 2;
                this.btnMC.y = this.suerBtn.height / 2;
                this.btnMC.playFile(RES_DIR_EFF + "chargeff1", -1);
                this.suerBtn.addChild(this.btnMC);
                this.redPoint.visible = true;
            }
            else {
                this.daylabel.visible = false;
                this.suerBtn.visible = false;
                this.redPoint.visible = false;
            }
        }
        else {
            DisplayUtils.removeFromParent(this.btnMC);
            this.suerBtn.visible = false;
            this.redPoint.visible = false;
        }
        this.itemary.forEach(function (element) {
            if (element.parent) {
                element.parent.removeChild(element);
                element = null;
            }
        });
        this.itemary = [];
        for (var i = 0; i < list.length; i++) {
            var item = new ItemBase();
            this.group1.addChild(item);
            item.data = list[i];
            this.itemary.push(item);
        }
        for (var i = 0; i < 14; i++) {
            this.itemList[i].data = i + 1;
            if (i == index || (i == 13 && index == 13)) {
                this.itemList[i].setSelectImg(true);
            }
            else {
                this.itemList[i].setSelectImg(false);
            }
        }
        this.showRedPoint();
    };
    SevenDayLogWin.prototype.showRedPoint = function () {
    };
    return SevenDayLogWin;
}(BaseView));
__reflect(SevenDayLogWin.prototype, "SevenDayLogWin");
//# sourceMappingURL=SevenDayLogWin.js.map