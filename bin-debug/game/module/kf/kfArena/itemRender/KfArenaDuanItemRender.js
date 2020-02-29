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
var KfArenaDuanItemRender = (function (_super) {
    __extends(KfArenaDuanItemRender, _super);
    function KfArenaDuanItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "KfArenaDuanItemSkin";
        return _this;
    }
    KfArenaDuanItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward.itemRenderer = ItemBase;
    };
    KfArenaDuanItemRender.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var itemData = this.data;
        this.dwImg.source = "" + itemData.mail.head;
        this.dwName.text = "" + itemData.mail.context;
        this.reward.dataProvider = new eui.ArrayCollection(itemData.mail.tAwardList);
    };
    return KfArenaDuanItemRender;
}(BaseItemRender));
__reflect(KfArenaDuanItemRender.prototype, "KfArenaDuanItemRender");
//# sourceMappingURL=KfArenaDuanItemRender.js.map