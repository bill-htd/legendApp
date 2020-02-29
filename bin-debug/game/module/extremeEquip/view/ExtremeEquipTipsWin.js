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
var ExtremeEquipTipsWin = (function (_super) {
    __extends(ExtremeEquipTipsWin, _super);
    function ExtremeEquipTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ExtremeEquipTipsSkin";
        _this.isTopLevel = true;
        return _this;
    }
    ExtremeEquipTipsWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.posId = args[0];
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.updateTips();
    };
    ExtremeEquipTipsWin.prototype.updateTips = function () {
        this.pos.text = Role.getEquipNameByType(this.posId);
        var config = GlobalConfig.ZhiZunEquipLevel[this.posId][1];
        var id = config.materialInfo.id;
        var itemConfig = GlobalConfig.ItemConfig[id];
        this.nameLabel.text = itemConfig.name;
        this.itemIcon.setData(itemConfig);
        this.powerPanel.setPower(config.showPower);
        for (var i in config.attrs) {
            if (this["attr" + config.attrs[i].type])
                this["attr" + config.attrs[i].type].text = config.attrs[i].value;
        }
        if (this.posId == EquipPos.WEAPON || this.posId == EquipPos.CLOTHES) {
            this.chainName.text = ExtremeEquipModel.ins().getSkillName(this.posId);
            this.chainPos.textFlow = TextFlowMaker.generateTextFlow1(StringUtils.replaceStrColor(ExtremeEquipModel.ins().getSkillDesc(this.posId), "0xffff00"));
        }
        else {
            DisplayUtils.removeFromParent(this.chainGroup);
        }
        var secPos = ExtremeEquipModel.ins().getLinkEquipPos(this.posId);
        var zzll = GlobalConfig.ZhiZunLinkLevel[this.posId][secPos][1];
        this.soulAttr.textFlow = TextFlowMaker.generateTextFlow1(StringUtils.replaceStrColor(zzll.chainDesc, "0xffff00"));
    };
    ExtremeEquipTipsWin.prototype.close = function () {
        this.removeTouchEvent(this.bgClose, this.onTouch);
    };
    ExtremeEquipTipsWin.prototype.onTouch = function (e) {
        ViewManager.ins().close(this);
    };
    return ExtremeEquipTipsWin;
}(BaseEuiView));
__reflect(ExtremeEquipTipsWin.prototype, "ExtremeEquipTipsWin");
ViewManager.ins().reg(ExtremeEquipTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=ExtremeEquipTipsWin.js.map