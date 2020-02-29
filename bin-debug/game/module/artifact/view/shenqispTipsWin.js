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
var shenqispTipsWin = (function (_super) {
    __extends(shenqispTipsWin, _super);
    function shenqispTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "shenqispTip";
        _this.isTopLevel = true;
        _this.powerPanel.setBgVis(false);
        return _this;
    }
    shenqispTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var mId = param[0];
        var index = param[1];
        this.list.itemRenderer = ArtifactAttrDescItem;
        this.addTouchEvent(this.rect, this.onTap);
        this.setData(mId, index);
    };
    shenqispTipsWin.prototype.setData = function (mId, ix) {
        var itemConf = GlobalConfig.ImbaJigsawConf[mId];
        var conf = GlobalConfig.ImbaJigsawConf[mId];
        this.partname.text = conf.name;
        this.getway.text = conf.guide;
        this.icon.source = conf.img;
        var data = Artifact.ins().getNewArtifactBy(ix);
        this.list.dataProvider = new eui.ArrayCollection(itemConf.attrs);
        var index = mId % 10 - 1;
        var state = (data.record >> index) & 1;
        var str = "";
        var power = UserBag.getAttrPower(itemConf.attrs);
        this.powerPanel.setPower(power);
        if (state)
            str = "|C:0x35e62d&T:已获得|";
        else
            str = "|C:0xf3311e&T:未获得|";
    };
    shenqispTipsWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.rect:
                ViewManager.ins().close(this);
                break;
        }
    };
    shenqispTipsWin.prototype.dataChanged = function () {
    };
    return shenqispTipsWin;
}(BaseEuiView));
__reflect(shenqispTipsWin.prototype, "shenqispTipsWin");
ViewManager.ins().reg(shenqispTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=shenqispTipsWin.js.map