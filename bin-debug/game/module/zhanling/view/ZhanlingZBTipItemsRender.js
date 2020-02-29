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
var ZhanlingZBTipItemsRender = (function (_super) {
    __extends(ZhanlingZBTipItemsRender, _super);
    function ZhanlingZBTipItemsRender() {
        var _this = _super.call(this) || this;
        _this.skinName = 'ZhanlingZBTipItemsSkin';
        _this.init();
        return _this;
    }
    ZhanlingZBTipItemsRender.prototype.init = function () {
    };
    ZhanlingZBTipItemsRender.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var zlId = this.data.zlId;
        var skillid = this.data.id;
        var zlskill = GlobalConfig.ZhanLingSkill[skillid];
        if (zlskill.desc && zlskill.desc.icon)
            this.skillIcon1.source = zlskill.desc.icon;
        else
            this.skillIcon1.source = Math.floor(zlskill.passive / 1000) * 1000 + "_png";
        var zlBase = GlobalConfig.ZhanLingBase[zlId];
        var openLv = 0;
        for (var i = 0; i < zlBase.skill.length; i++) {
            if (zlBase.skill[i].id == skillid) {
                openLv = zlBase.skill[i].open;
                break;
            }
        }
        var skillconfig = GlobalConfig.SkillsConfig[zlskill.passive];
        var descId = skillconfig ? skillconfig.desc : 0;
        var sdconfig = GlobalConfig.SkillsDescConfig[descId];
        var tips = { name: "", desc: "" };
        if (sdconfig) {
            tips.name = sdconfig.name;
            tips.desc = sdconfig.desc;
        }
        if (skillconfig && sdconfig && tips.desc) {
            tips.desc = StringUtils.replace(tips.desc, "" + skillconfig.desc_ex[0]);
        }
        if (zlskill.desc && zlskill.desc.name)
            tips.name = zlskill.desc.name;
        if (zlskill.desc && zlskill.desc.desc) {
            tips.desc = zlskill.desc.desc;
        }
        if (zlskill.attrs) {
            if (tips.desc)
                tips.desc += "\n";
            tips.desc += "|C:0xff00ff&T:" + AttributeData.getAttStr(zlskill.attrs, 0, 1, "：") + "|";
        }
        var stageLv = ZhanLingModel.ins().getStageLv(openLv);
        this.desc.textFlow = TextFlowMaker.generateTextFlow1(stageLv[0] + "\u9636\u4E60\u5F97\u6280\u80FD|C:0xff00ff&T:\u3010" + tips.name + "\u3011\n" + tips.desc);
    };
    ZhanlingZBTipItemsRender.prototype.destruct = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    ZhanlingZBTipItemsRender.prototype.onClick = function () {
    };
    return ZhanlingZBTipItemsRender;
}(BaseItemRender));
__reflect(ZhanlingZBTipItemsRender.prototype, "ZhanlingZBTipItemsRender");
//# sourceMappingURL=ZhanlingZBTipItemsRender.js.map