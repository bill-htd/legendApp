var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RegExpUtil = (function () {
    function RegExpUtil() {
    }
    RegExpUtil.LINE_BREAK = /\r+/g;
    RegExpUtil.BLANK_REG = /[\s\\]/g;
    RegExpUtil.ARGB_COLOR = /[a-fA-F0-9]{8}/;
    RegExpUtil.HTML = /<[^>]+>/g;
    RegExpUtil.DELETE_SPACE = /\s/g;
    RegExpUtil.REPLACE_STRING = /%s/g;
    RegExpUtil.NumericExp = /^\d+$/;
    RegExpUtil.NonNumericExp = /\D/;
    RegExpUtil.ActorNameExp = /^([\u4e00-\u9fa5]?\w?[^>|!@#$%&*\^\?]){1,48}$/;
    return RegExpUtil;
}());
__reflect(RegExpUtil.prototype, "RegExpUtil");
//# sourceMappingURL=RegExpUtil.js.map