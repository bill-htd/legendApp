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
var NextDayLoginWin = (function (_super) {
    __extends(NextDayLoginWin, _super);
    function NextDayLoginWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "nextDaySkin";
        return _this;
    }
    NextDayLoginWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.sendBtn, this.onTap);
        this.item.data = { count: 500, id: 2, type: 0 };
    };
    NextDayLoginWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.sendBtn, this.onTap);
    };
    NextDayLoginWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.sendBtn:
                if (Activity.ins().nextDayState == 1) {
                    Activity.ins().sendNextDayReward();
                }
                else if (Activity.ins().nextDayState == 2) {
                    UserTips.ins().showTips(StringUtils.addColor("已领取奖励", 0xf3311e));
                }
                else {
                    UserTips.ins().showTips(StringUtils.addColor("创建角色第二天才能领取奖励", 0xf3311e));
                }
                break;
        }
    };
    return NextDayLoginWin;
}(BaseView));
__reflect(NextDayLoginWin.prototype, "NextDayLoginWin");
//# sourceMappingURL=NextDayLoginWin.js.map