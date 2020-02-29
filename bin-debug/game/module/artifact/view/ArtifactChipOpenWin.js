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
var ArtifactChipOpenWin = (function (_super) {
    __extends(ArtifactChipOpenWin, _super);
    function ArtifactChipOpenWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "shenqiPartActskin";
        _this.list.itemRenderer = ArtifactAttrDescItem;
        return _this;
    }
    ArtifactChipOpenWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.index = param[1];
        this.mId = param[0];
        this.openTips(this.mId);
        this.addTouchEvent(this.btnOpen, this.onTap);
    };
    ArtifactChipOpenWin.prototype.close = function () {
    };
    ArtifactChipOpenWin.prototype.openTips = function (mId) {
        var data = Artifact.ins().getNewArtifactBy(this.index);
        var conf = GlobalConfig.ImbaJigsawConf[mId];
        this.list.dataProvider = new eui.ArrayCollection(conf.attrs);
        this.imgArtifact.source = conf.img;
        this.labelInfo.text = "\u518D\u83B7\u5F97" + data.remindNumToOpen() + "\u4E2A\u788E\u7247\u53EF\u6FC0\u6D3B\u5B8C\u6574\u795E\u5668";
        this.labelName.text = conf.name;
    };
    ArtifactChipOpenWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.btnOpen:
                Artifact.ins().sendOpenChip(this.mId);
                ViewManager.ins().close(this);
                break;
        }
    };
    return ArtifactChipOpenWin;
}(BaseEuiView));
__reflect(ArtifactChipOpenWin.prototype, "ArtifactChipOpenWin");
ViewManager.ins().reg(ArtifactChipOpenWin, LayerManager.UI_Popup);
//# sourceMappingURL=ArtifactChipOpenWin.js.map