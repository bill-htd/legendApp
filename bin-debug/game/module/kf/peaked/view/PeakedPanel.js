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
var PeakedPanel = (function (_super) {
    __extends(PeakedPanel, _super);
    function PeakedPanel() {
        return _super.call(this) || this;
    }
    PeakedPanel.prototype.childrenCreated = function () {
    };
    PeakedPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(PeakedSys.ins().postState, this.upCurState);
        this.upCurState();
    };
    PeakedPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.$onClose();
        if (this._curPanel) {
            this._curPanel["close"]();
            DisplayUtils.removeFromParent(this._curPanel);
        }
    };
    PeakedPanel.prototype.upCurState = function () {
        if (this._curPanel) {
            this._curPanel["close"]();
            DisplayUtils.removeFromParent(this._curPanel);
        }
        if (PeakedSys.ins().isKf()) {
            var curStatus = PeakedSys.ins().kfStatus;
            if (curStatus == KF_PeakStatus.Knockout) {
                if (PeakedSys.ins().kfStatusIsEnd) {
                    curStatus = KF_PeakStatus.Prom64;
                }
            }
            switch (curStatus) {
                case KF_PeakStatus.None:
                case KF_PeakStatus.Knockout:
                    if (!this.signupPanel)
                        this.signupPanel = new SignupPanel();
                    this._curPanel = this.signupPanel;
                    break;
                case KF_PeakStatus.Prom64:
                case KF_PeakStatus.Prom32:
                case KF_PeakStatus.Prom16:
                case KF_PeakStatus.Prom8:
                case KF_PeakStatus.Prom4:
                case KF_PeakStatus.Finals:
                    if (!this.sixteenPanel)
                        this.sixteenPanel = new SixteenPanel();
                    this._curPanel = this.sixteenPanel;
                    break;
            }
        }
        else {
            var curStatus = PeakedSys.ins().bfStatus;
            if (curStatus == BF_PeakStatus.Knockout) {
                if (PeakedSys.ins().bfStatusIsEnd)
                    curStatus = BF_PeakStatus.Prom16;
                else if (!PeakedSys.ins().isSignUp) {
                    UserTips.ins().showTips("\u60A8\u672A\u62A5\u540D\uFF0C\u8BF7\u7B49\u51B3\u51FA16\u5F3A\u540E\u518D\u6765\u67E5\u770B");
                    curStatus = BF_PeakStatus.SignUp;
                }
            }
            switch (curStatus) {
                case BF_PeakStatus.None:
                case BF_PeakStatus.SignUp:
                case BF_PeakStatus.Knockout:
                    if (!this.signupPanel)
                        this.signupPanel = new SignupPanel();
                    this._curPanel = this.signupPanel;
                    break;
                case BF_PeakStatus.Prom16:
                case BF_PeakStatus.Prom8:
                case BF_PeakStatus.Prom4:
                case BF_PeakStatus.Finals:
                case BF_PeakStatus.Over:
                    if (!this.sixteenPanel)
                        this.sixteenPanel = new SixteenPanel();
                    this._curPanel = this.sixteenPanel;
                    break;
            }
        }
        if (this._curPanel) {
            this.addChild(this._curPanel);
            this._curPanel["open"]();
        }
    };
    return PeakedPanel;
}(BaseView));
__reflect(PeakedPanel.prototype, "PeakedPanel");
//# sourceMappingURL=PeakedPanel.js.map