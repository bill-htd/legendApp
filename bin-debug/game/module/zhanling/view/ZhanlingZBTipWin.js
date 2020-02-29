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
var ZhanlingZBTipWin = (function (_super) {
    __extends(ZhanlingZBTipWin, _super);
    function ZhanlingZBTipWin() {
        var _this = _super.call(this) || this;
        _this.skinName = 'ZhanlingZBTipsSkin';
        return _this;
    }
    ZhanlingZBTipWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    ZhanlingZBTipWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this, this.otherClose);
        this.gainList.itemRenderer = GainGoodsItem;
        this.gainList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchList, this);
        this.skillList.itemRenderer = ZhanlingZBTipItemsRender;
        this.itemid = param[0];
        for (var k in GlobalConfig.ZhanLingBase) {
            var zlBase_1 = GlobalConfig.ZhanLingBase[k];
            if (zlBase_1.mat == this.itemid) {
                this.zlId = zlBase_1.id;
                break;
            }
        }
        var cfg = GlobalConfig.ZhanLingLevel[this.zlId][0];
        this.zhanlingName.source = cfg.zlName;
        if (!this.model)
            this.model = new MovieClip();
        if (!this.model.parent)
            this.zhanling.addChild(this.model);
        if (this.model.name != RES_DIR_EFF + cfg.innerAppearance)
            this.model.playFile(RES_DIR_EFF + cfg.innerAppearance, -1);
        if (!this.bottomMc)
            this.bottomMc = new MovieClip();
        if (!this.bottomMc.parent)
            this.bottomD.addChild(this.bottomMc);
        if (!this.bottomMc.isPlaying)
            this.bottomMc.playFile(RES_DIR_EFF + "zhanlingbottom", -1);
        var itemConfig = GlobalConfig.ItemConfig[this.itemid];
        this.itemname.textFlow = TextFlowMaker.generateTextFlow1("|C:" + ItemConfig.getQualityColor(itemConfig) + "&T:" + itemConfig.name);
        var q = ItemConfig.getQuality(itemConfig);
        this.quali.source = q > 0 ? "quali" + q : "";
        var zlBase = GlobalConfig.ZhanLingBase[this.zlId];
        var zlTconfig = GlobalConfig.ZhanLingTalent[zlBase.talent][1];
        if (!zlTconfig)
            zlTconfig = GlobalConfig.ZhanLingTalent[zlBase.talent][1];
        var tfdesc = "激活后获得强力天赋:";
        if (zlTconfig.talentDesc && zlTconfig.talentDesc.icon) {
            this.skillIcon0.source = zlTconfig.talentDesc.icon;
            if (zlTconfig.talentDesc.desc)
                tfdesc += zlTconfig.talentDesc.desc;
        }
        else {
            if (zlTconfig.passive)
                this.skillIcon0.source = Math.floor(zlTconfig.passive[0].id / 1000) * 1000 + "_png";
            var skconfig = GlobalConfig.SkillsConfig[zlTconfig.passive[0].id];
            var skdconfig = GlobalConfig.SkillsDescConfig[skconfig.desc];
            tfdesc += StringUtils.replace(skdconfig.desc, skconfig.desc_ex);
        }
        this.desc.textFlow = TextFlowMaker.generateTextFlow1(tfdesc);
        var roleLen = 3;
        var zlLevel = GlobalConfig.ZhanLingLevel[this.zlId][0];
        var zlValue = UserBag.getAttrPower(zlLevel.attrs) * roleLen;
        var tfValue = (zlTconfig.expower + UserBag.getAttrPower((zlTconfig.attrs ? zlTconfig.attrs : []))) * roleLen;
        var jnValue = 0;
        var arrSkId = [];
        for (var i = 0; i < zlBase.skill.length; i++) {
            var skillid = zlBase.skill[i].id;
            var zlsConfig = GlobalConfig.ZhanLingSkill[skillid];
            if (!zlsConfig.attrs)
                continue;
            jnValue += UserBag.getAttrPower(zlsConfig.attrs) * roleLen;
            arrSkId.push({ id: skillid, zlId: zlBase.id });
        }
        this.skillList.dataProvider = new ArrayCollection(arrSkId);
        zlValue = zlValue + tfValue + jnValue;
        this.powerPanel.setPower(zlValue);
        var gainConfig = GlobalConfig.GainItemConfig[this.itemid];
        if (gainConfig)
            this.gainList.dataProvider = new eui.ArrayCollection(gainConfig.gainWay);
    };
    ZhanlingZBTipWin.prototype.otherClose = function (e) {
        ViewManager.ins().close(this);
    };
    ZhanlingZBTipWin.prototype.onTouchList = function (e) {
        var item = e.item;
        if (e.item == null || !item[1]) {
            return;
        }
        ViewManager.ins().open(item[1], item[2]);
    };
    return ZhanlingZBTipWin;
}(BaseEuiView));
__reflect(ZhanlingZBTipWin.prototype, "ZhanlingZBTipWin");
ViewManager.ins().reg(ZhanlingZBTipWin, LayerManager.UI_Popup);
//# sourceMappingURL=ZhanlingZBTipWin.js.map