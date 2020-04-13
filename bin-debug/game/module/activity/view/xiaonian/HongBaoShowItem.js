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
var HongBaoShowItem = (function (_super) {
    __extends(HongBaoShowItem, _super);
    function HongBaoShowItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'hongbaoShowItem';
        _this.init();
        return _this;
    }
    HongBaoShowItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.touchEnabled = false;
    };
    HongBaoShowItem.prototype.init = function () {
        this.hbimg.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
        this.hongbaoeff.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    HongBaoShowItem.prototype.onClick = function () {
        if (!this.data || !this.data.actId || !this.data.eId)
            return;
        var activityData = Activity.ins().getActivityDataById(this.data.actId);
        if (!activityData.isOpenActivity()) {
            UserTips.ins().showTips("\u6D3B\u52A8\u5DF2\u7ED3\u675F");
            return;
        }
        Activity.ins().sendEnvelopeData(this.data.actId, this.data.eId);
    };
    HongBaoShowItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        if (!this.eff)
            this.eff = new MovieClip();
        if (!this.eff.parent) {
            this.hbimg.visible = false;
            this.hongbaoeff.addChild(this.eff);
            var self_1 = this;
            this.eff.playFile(RES_DIR_EFF + "hongbaoeff", 1, function () {
                if (self_1.hbimg) {
                    self_1.hbimg.visible = true;
                }
            });
        }
    };
    HongBaoShowItem.prototype.destruct = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    return HongBaoShowItem;
}(BaseItemRender));
__reflect(HongBaoShowItem.prototype, "HongBaoShowItem");
//# sourceMappingURL=HongBaoShowItem.js.map