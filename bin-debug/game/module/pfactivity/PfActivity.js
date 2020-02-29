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
var PfActivity = (function (_super) {
    __extends(PfActivity, _super);
    function PfActivity() {
        var _this = _super.call(this) || this;
        _this.wxInviteCount = 0;
        _this.focusState = -1;
        _this.shareState = -1;
        _this.isShowGameDesktop = 0;
        _this.sysId = PackageID.pfActivity;
        _this.regNetMsg(1, _this.doWanBaGift);
        _this.regNetMsg(3, _this.doZhiShangData);
        _this.regNetMsg(4, _this.doWeiXinInviteGift);
        return _this;
    }
    PfActivity.ins = function () {
        return _super.ins.call(this);
    };
    PfActivity.prototype.initLogin = function () {
        var _this = this;
        this.sendWanBaGift();
        window["isFocus"]();
        window["isShare"]();
        window["isShowGameDesktop"](function (status) {
            if (SysSetting.ins().getValue("isSaveGameDesktop")) {
                status = 0;
            }
            _this.postGameDesktop(status);
        });
    };
    PfActivity.prototype.postGuanZhu = function (code) {
        this.focusState = code;
        if (this.focusState == 1)
            this.sendGuanZhuGift();
    };
    PfActivity.prototype.postShare = function (code) {
        this.shareState = code;
    };
    PfActivity.prototype.postGameDesktop = function (status) {
        this.isShowGameDesktop = status;
        return status;
    };
    PfActivity.prototype.saveGameDesktop = function () {
        var _this = this;
        window["saveGameDesktop"](function () {
            SysSetting.ins().setValue("isSaveGameDesktop", 1);
            _this.postGameDesktop(0);
        });
    };
    PfActivity.prototype.doWanBaGift = function (bytes) {
        ViewManager.ins().open(WanBaGiftWin, bytes.readByte(), bytes.readBoolean());
    };
    PfActivity.prototype.sendWanBaGift = function () {
        if (!LocationProperty.gifi)
            return;
        this.sendBaseProto(1);
    };
    PfActivity.prototype.sendGuanZhuGift = function () {
        this.sendBaseProto(2);
    };
    PfActivity.prototype.doZhiShangData = function (bytes) {
        if (LocationProperty.appid != PlatFormID.ZHI_SHANG)
            return;
        ReportData.getIns().reportUrl(LocationProperty.callUrl);
    };
    PfActivity.prototype.sendWeiXinInviteGift = function () {
        this.sendBaseProto(4);
    };
    PfActivity.prototype.doWeiXinInviteGift = function (bytes) {
        PfActivity.ins().wxInviteCount = bytes.readInt();
        PfActivity.ins().inviteTime = bytes.readInt();
        this.postInviteInfoUpdate();
    };
    PfActivity.prototype.postInviteInfoUpdate = function () {
    };
    PfActivity.prototype.copyMsgToBoard = function (msg) {
        if (document && document.createElement) {
            var input = document.createElement("input");
            input.value = msg;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length);
            document.execCommand("Copy");
            document.body.removeChild(input);
            return true;
        }
        return false;
    };
    return PfActivity;
}(BaseSystem));
__reflect(PfActivity.prototype, "PfActivity");
var GameSystem;
(function (GameSystem) {
    GameSystem.pfactivity = PfActivity.ins.bind(PfActivity);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=PfActivity.js.map