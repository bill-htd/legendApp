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
var GuardLogsListRenderer = (function (_super) {
    __extends(GuardLogsListRenderer, _super);
    function GuardLogsListRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "UIshowDropNoticeSkin";
        return _this;
    }
    GuardLogsListRenderer.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var color = GlobalConfig.GuardGodWeaponConf.UIshowDrop[this.data.noticeId];
        color = color ? color : 0xffffff;
        var desc = GlobalConfig.GuardGodWeaponConf.UIshowDropNotice;
        desc = StringUtils.replace(desc, this.data.roleName, this.data.monsterName, "|C:" + color + "&T:" + this.data.itemName);
        this.showText.textFlow = TextFlowMaker.generateTextFlow1(desc);
    };
    return GuardLogsListRenderer;
}(BaseItemRender));
__reflect(GuardLogsListRenderer.prototype, "GuardLogsListRenderer");
//# sourceMappingURL=GuardLogsListRenderer.js.map