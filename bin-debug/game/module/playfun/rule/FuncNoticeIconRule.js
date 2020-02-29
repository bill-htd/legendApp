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
var FuncNoticeIconRule = (function (_super) {
    __extends(FuncNoticeIconRule, _super);
    function FuncNoticeIconRule(id) {
        var _this = _super.call(this, id) || this;
        _this.funcNoticeLastLv = 0;
        _this.showMessage = [
            UserFb.ins().postGuanKaIdChange
        ];
        return _this;
    }
    FuncNoticeIconRule.prototype.checkShowIcon = function () {
        var lv = UserFb.ins().guanqiaID;
        var config = FuncNoticeWin.getFuncNoticeConfigById(lv);
        if (!config)
            return false;
        var bool = (config.openLv - lv <= 10);
        if (bool) {
            if (config.openLv - lv == 0) {
                if (lv - this.funcNoticeLastLv == 1)
                    UserTips.ins().showFuncNotice(lv);
                config = FuncNoticeWin.getFuncNoticeConfigById(lv + 1);
                if (!config || config.openLv - lv > 10)
                    bool = false;
            }
            if (bool && this.tar) {
                this.updateButton();
            }
        }
        this.funcNoticeLastLv = lv;
        return bool;
    };
    FuncNoticeIconRule.prototype.createTar = function () {
        var t = _super.prototype.createTar.call(this);
        this.updateButton();
        return t;
    };
    FuncNoticeIconRule.prototype.updateButton = function () {
        var lv = UserFb.ins().guanqiaID;
        var config = FuncNoticeWin.getFuncNoticeConfigById(lv);
        this.tar["iconDisplay"].source = "yg_" + config.index + "0";
        this.tar["txt"].text = config.openLv + "\u5173\u5F00\u542F";
        if (config.index == 2) {
            this.tar["iconDisplay"].x = 15;
            this.tar["iconDisplay"].y = 0;
        }
        else {
            this.tar["iconDisplay"].x = 3;
            this.tar["iconDisplay"].y = -30;
        }
    };
    FuncNoticeIconRule.prototype.tapExecute = function () {
        var lv = UserFb.ins().guanqiaID;
        var config = FuncNoticeWin.getFuncNoticeConfigById(lv);
        if (config.openLv - lv == 0)
            lv += 1;
        UserTips.ins().showFuncNotice(lv);
    };
    return FuncNoticeIconRule;
}(RuleIconBase));
__reflect(FuncNoticeIconRule.prototype, "FuncNoticeIconRule");
//# sourceMappingURL=FuncNoticeIconRule.js.map