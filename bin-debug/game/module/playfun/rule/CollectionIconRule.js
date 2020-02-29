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
var CollectionIconRule = (function (_super) {
    __extends(CollectionIconRule, _super);
    function CollectionIconRule(id, t) {
        return _super.call(this, id, t) || this;
    }
    CollectionIconRule.prototype.checkShowIcon = function () {
        return LocationProperty.appid == PlatFormID.QQ_BROWSER ||
            LocationProperty.appid == PlatFormID.XIN_LANG;
    };
    CollectionIconRule.prototype.tapExecute = function () {
        window['sendToDesktop']();
    };
    return CollectionIconRule;
}(RuleIconBase));
__reflect(CollectionIconRule.prototype, "CollectionIconRule");
//# sourceMappingURL=CollectionIconRule.js.map