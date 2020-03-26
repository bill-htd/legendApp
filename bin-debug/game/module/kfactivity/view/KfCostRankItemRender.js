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
var KfCostRankItemRender = (function (_super) {
    __extends(KfCostRankItemRender, _super);
    function KfCostRankItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = 'ISCostRankItemSkin';
        _this.init();
        return _this;
    }
    KfCostRankItemRender.prototype.init = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    KfCostRankItemRender.prototype.onClick = function (e) {
    };
    KfCostRankItemRender.prototype.dataChanged = function () {
        if (this.data && (this.data instanceof KuaFuRankData)) {
            this.pos.text = this.data.rank + "";
            var serverName = window['getServerName'](this.data.serverId);
            this.player.text = "[" + serverName + "]." + this.data.roleName;
            this.value.text = "\u5DF2\u6D88\u8D39\uFF1A" + this.data.rmb;
        }
    };
    return KfCostRankItemRender;
}(BaseItemRender));
__reflect(KfCostRankItemRender.prototype, "KfCostRankItemRender");
//# sourceMappingURL=KfCostRankItemRender.js.map