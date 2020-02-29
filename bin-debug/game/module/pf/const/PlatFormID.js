var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlatFormID = (function () {
    function PlatFormID() {
    }
    PlatFormID.SDK_TYPE = window["ourPlatform"];
    PlatFormID.WAN_BA = "WAN_BA";
    PlatFormID.QQ_BROWSER = 2000001 + "";
    PlatFormID.ZHI_SHANG = 2000003 + "";
    PlatFormID.FENG_KUANG = 2000004 + "";
    PlatFormID.AI_WEI_YOU = 2000005 + "";
    PlatFormID.GE_TUI = 2000006 + "";
    PlatFormID.XIN_LANG = 2000007 + "";
    PlatFormID.$9G = 2000012 + "";
    PlatFormID.QUN_HEI = 2000013 + "";
    PlatFormID.$1758 = 2000014 + "";
    return PlatFormID;
}());
__reflect(PlatFormID.prototype, "PlatFormID");
//# sourceMappingURL=PlatFormID.js.map