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
var MineNpcHead = (function (_super) {
    __extends(MineNpcHead, _super);
    function MineNpcHead() {
        var _this = _super.call(this) || this;
        _this.states = ["none", "mine"];
        _this.skinName = "MineNpcHeadSkin";
        _this.contentGroup.touchEnabled = false;
        _this.touchEnabled = false;
        return _this;
    }
    MineNpcHead.prototype.updateModel = function (info) {
        var config = info.npcConfig;
        if (config && config.title) {
            this.titleGroup.visible = true;
        }
        else {
            this.titleGroup.visible = false;
        }
        this.titleImg.source = config ? config.title : "";
        this.icon.source = config ? config.headIcon : "";
    };
    MineNpcHead.prototype.updateState = function (info) {
        if (info.isBeFight) {
            this.setState(1);
        }
        else if (MineData.ins().getIsCanAtk(info)) {
            this.setState(2);
        }
        else {
            this.setState(0);
        }
    };
    MineNpcHead.prototype.setState = function (state) {
        if (state == 1) {
            this.workerState.source = "";
        }
        else if (state == 2) {
            this.workerState.source = "jingji_json.kuanggong_title";
        }
        else {
            this.workerState.source = "";
        }
        this.setEff(state);
    };
    MineNpcHead.prototype.setEff = function (state) {
        if (state == 1) {
            var eff = this.getEff();
            eff.playFile(RES_DIR_EFF + "fighting", -1);
            eff.x = this.stateGroup.width >> 1;
            eff.y = -20;
            this.stateGroup.addChild(eff);
        }
        else {
            if (this.eff) {
                DisplayUtils.removeFromParent(this.eff);
                this.eff.dispose();
            }
        }
    };
    MineNpcHead.prototype.getEff = function () {
        if (!this.eff) {
            this.eff = new MovieClip();
        }
        return this.eff;
    };
    return MineNpcHead;
}(BaseComponent));
__reflect(MineNpcHead.prototype, "MineNpcHead");
//# sourceMappingURL=MineNpcHead.js.map