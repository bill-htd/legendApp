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
var TeamFbTargetItemRender = (function (_super) {
    __extends(TeamFbTargetItemRender, _super);
    function TeamFbTargetItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "teamFbTargetSkin";
        _this.touchEnabled = true;
        _this.touchChildren = false;
        return _this;
    }
    TeamFbTargetItemRender.prototype.dataChanged = function () {
        var monster = this.data;
        var config = GlobalConfig.MonstersConfig[monster.infoModel.configID];
        this.roleName.text = config.name;
        if (this.checkMonHead(config))
            this.roleHead.source = "monhead" + config.head + "_png";
        if (GameLogic.ins().currAttackHandle && GameLogic.ins().currAttackHandle == monster.infoModel.handle) {
            this.addAttEffect();
            this.targetName.visible = true;
            this.targetSelect.visible = true;
        }
        else {
            this.removeAttEffect();
            this.targetName.visible = false;
            this.targetSelect.visible = false;
        }
    };
    TeamFbTargetItemRender.prototype.checkMonHead = function (config) {
        if (Assert(config.head, "\u602A\u7269\u5934\u50CF\u4E0D\u5B58\u57282\uFF0Cid:" + config.id + ",name:" + config.name))
            return false;
        return true;
    };
    TeamFbTargetItemRender.prototype.addAttEffect = function () {
        if (!this.attEffect) {
            this.attEffect = new MovieClip;
            this.attEffect.x = 49;
            this.attEffect.y = 28;
            this.attEffect.playFile(RES_DIR_EFF + "FightingEff", -1);
            this.addChild(this.attEffect);
        }
    };
    TeamFbTargetItemRender.prototype.removeAttEffect = function () {
        if (this.attEffect) {
            this.attEffect.destroy();
            this.attEffect = null;
        }
    };
    return TeamFbTargetItemRender;
}(BaseItemRender));
__reflect(TeamFbTargetItemRender.prototype, "TeamFbTargetItemRender");
//# sourceMappingURL=TeamFbTargetItemRender.js.map