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
var BoxDetailWin = (function (_super) {
    __extends(BoxDetailWin, _super);
    function BoxDetailWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChestRewardSkin";
        _this.list.dataProvider = null;
        _this.list.itemRenderer = BoxDetailItem;
        _this.isTopLevel = true;
        return _this;
    }
    BoxDetailWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.data = param[0];
        var conf = GlobalConfig.TreasureBoxConfig[this.data.itemId];
        this.imgBox.source = conf.imgClose;
        this.updateList();
        this.endTime = this.data.getTime();
        if (this.data.state == 2) {
            this.currentState = "payOpen";
            this.doTime();
            TimerManager.ins().doTimer(1000, this.endTime, this.doTime, this);
        }
        else if (this.data.state == 1 && Box.ins().isHaveFreePos()) {
            this.currentState = "open";
            this.t3.text = DateUtils.getFormatBySecond(conf.time);
        }
        else {
            this.currentState = "jiesuo";
            this.labelTime.text = DateUtils.getFormatBySecond(conf.time);
            this.costMoney = BoxModel.ins().countBoxTimeCost(conf.time, conf.type);
            this.costNum.text = this.costMoney + "";
            if (UserVip.ins().lv < GlobalConfig.TreasureBoxBaseConfig.thirdOpenLevel) {
                this.labelVip.visible = true;
                this.labelWarning.text = "\u961F\u5217\u4E0D\u8DB3\uFF0C\u53EA\u80FD\u540C\u65F6\u89E3\u95011\u4E2A\u5B9D\u7BB1";
                this.labelVip.text = "VIP" + GlobalConfig.TreasureBoxBaseConfig.thirdOpenLevel + " \u53EF\u540C\u65F6\u89E3\u95012\u4E2A\u5B9D\u7BB1";
            }
            else {
                this.labelVip.visible = false;
                this.labelWarning.text = "\u961F\u5217\u4E0D\u8DB3\uFF0C\u53EA\u80FD\u540C\u65F6\u89E3\u95012\u4E2A\u5B9D\u7BB1";
            }
        }
        this.addTouchEvent(this.rect, this.onTap);
        this.addTouchEvent(this.btnOpen, this.onTap);
    };
    BoxDetailWin.prototype.close = function () {
        this.removeTouchEvent(this.rect, this.onTap);
        this.removeTouchEvent(this.btnOpen, this.onTap);
    };
    BoxDetailWin.prototype.doTime = function () {
        this.endTime--;
        if (this.endTime <= -1) {
            TimerManager.ins().remove(this.doTime, this);
            Box.ins().sendOpen(this.data.pos);
            ViewManager.ins().close(BoxDetailWin);
        }
        else {
            this.labelTime.text = DateUtils.getFormatBySecond(this.endTime, 1);
            this.costMoney = BoxModel.ins().countBoxTimeCost(this.endTime, this.data.itemId);
            this.costNum.text = this.costMoney + "";
        }
    };
    BoxDetailWin.prototype.updateList = function () {
        this.list.dataProvider = new eui.ArrayCollection(this.data.getDetailData());
    };
    BoxDetailWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.btnOpen:
                if (Actor.yb < this.costMoney) {
                    UserTips.ins().showTips("\u5143\u5B9D\u4E0D\u8DB3");
                    ViewManager.ins().close(this);
                    return;
                }
                Box.ins().sendOpen(this.data.pos);
                ViewManager.ins().close(BoxDetailWin);
                break;
            case this.rect:
                ViewManager.ins().close(BoxDetailWin);
                break;
        }
    };
    return BoxDetailWin;
}(BaseEuiView));
__reflect(BoxDetailWin.prototype, "BoxDetailWin");
ViewManager.ins().reg(BoxDetailWin, LayerManager.UI_Popup);
//# sourceMappingURL=BoxDetailWin.js.map