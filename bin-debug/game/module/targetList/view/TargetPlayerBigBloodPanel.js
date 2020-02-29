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
var TargetPlayerBigBloodPanel = (function (_super) {
    __extends(TargetPlayerBigBloodPanel, _super);
    function TargetPlayerBigBloodPanel() {
        var _this = _super.call(this) || this;
        _this.curValue = 1;
        return _this;
    }
    TargetPlayerBigBloodPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "TargetPlayerSmallBloodSkin";
        this.bloodBar.slideDuration = 0;
        this.grayImg.source = "bosshp2";
        this.grayImgMask = new egret.Rectangle(0, 0, this.grayImg.width, this.grayImg.height);
        this.grayImg.mask = this.grayImgMask;
        TargetPlayerBigBloodPanel.GRAYIMG_WIDTH = this.grayImg.width;
        this.bloodBar.labelDisplay.visible = false;
        this.playerBloodGroup.top = BattleCC.ins().isBattle() || PaoDianCC.ins().isPaoDian ? this.playerBloodGroup.top : 60;
    };
    TargetPlayerBigBloodPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(GameLogic.ins().postEntityHpChange, this.updateHP);
        this.observe(GameLogic.ins().postChangeTarget, this.updateTarget);
        this.observe(GameLogic.ins().postOtherAttChange, this.updateAtt);
        this.updateTarget();
    };
    TargetPlayerBigBloodPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.grayImgMask)
            egret.Tween.removeTweens(this.grayImgMask);
        this.currAttackHandle = 0;
    };
    TargetPlayerBigBloodPanel.prototype.changeHp = function () {
        var roleList = EntityManager.ins().getEntitysBymasterhHandle(this.currAttackHandle, EntityType.Role);
        if (roleList && roleList.length > 0) {
            var len = roleList.length;
            var hpValue = 0;
            var hpTotal = 0;
            var neigongValue = 0;
            var neigongTotal = 0;
            var mainRoleInfo = void 0;
            for (var i = 0; i < len; i++) {
                var role = roleList[i];
                if (role) {
                    var curHp = role.infoModel.getAtt(AttributeType.atHp) || 0;
                    var maxHp = role.infoModel.getAtt(AttributeType.atMaxHp) || 0;
                    hpValue += curHp;
                    hpTotal += maxHp;
                    var curNeigong = role.infoModel.getAtt(AttributeType.cruNeiGong) || 0;
                    var maxNeigong = role.infoModel.getAtt(AttributeType.maxNeiGong) || 0;
                    neigongValue += curNeigong;
                    neigongTotal += maxNeigong;
                }
            }
            if (BattleCC.ins().isBattle()) {
                hpValue = hpValue / hpTotal * 100;
                hpTotal = 100;
            }
            this.hudunbloodBar0.maximum = neigongTotal;
            this.hudunbloodBar0.value = neigongValue;
            this.bloodBar.maximum = hpTotal;
            this.bloodBar.value = hpValue;
            this.curValue = Math.floor(hpValue / hpTotal * 100);
            this.tweenBlood();
        }
        else {
            var monster = EntityManager.ins().getEntityByHandle(this.currAttackHandle);
            if (monster && monster.infoModel && monster.infoModel.type == EntityType.Monster) {
                this.hudunbloodBar0.maximum = monster.infoModel.getAtt(AttributeType.maxNeiGong) || 0;
                this.hudunbloodBar0.value = monster.infoModel.getAtt(AttributeType.cruNeiGong) || 0;
                this.bloodBar.maximum = monster.infoModel.getAtt(AttributeType.atMaxHp) || 0;
                this.bloodBar.value = monster.infoModel.getAtt(AttributeType.atHp) || 0;
                this.curValue = Math.floor(this.bloodBar.value / this.bloodBar.maximum * 100);
                this.tweenBlood();
            }
        }
    };
    TargetPlayerBigBloodPanel.prototype.updateTarget = function () {
        if (GameLogic.ins().currAttackHandle == 0) {
            ViewManager.ins().close(this);
        }
        if (this.currAttackHandle != 0 && this.currAttackHandle != GameLogic.ins().currAttackHandle) {
            this.currAttackHandle = GameLogic.ins().currAttackHandle;
            if (this.currAttackHandle != 0) {
                var mainRoleInfo = void 0;
                var roleList = EntityManager.ins().getEntitysBymasterhHandle(this.currAttackHandle, EntityType.Role);
                if (roleList && roleList.length > 0) {
                    mainRoleInfo = roleList[0].infoModel;
                    var tname = mainRoleInfo.name;
                    var strlist = tname.split("\n");
                    if (strlist[1])
                        tname = strlist[1];
                    else
                        tname = strlist[0];
                    this.nameTxt.textFlow = TextFlowMaker.generateTextFlow(tname);
                    this.head.source = "yuanhead" + mainRoleInfo.job + mainRoleInfo.sex;
                    this.changeHp();
                }
                else {
                    var monster = EntityManager.ins().getEntityByHandle(this.currAttackHandle);
                    if (monster && monster.infoModel && monster.infoModel.type == EntityType.Monster) {
                        var config = GlobalConfig.MonstersConfig[monster.infoModel.configID];
                        this.nameTxt.textFlow = new egret.HtmlTextParser().parser(config.name);
                        this.head.source = "monhead" + config.head + "_png";
                        this.changeHp();
                    }
                }
            }
        }
    };
    TargetPlayerBigBloodPanel.prototype.updateHP = function (param) {
        if (!CityCC.ins().isCity && !BattleCC.ins().isBattle() && !PaoDianCC.ins().isPaoDian
            && !GwBoss.ins().isGwBoss && !GwBoss.ins().isGwTopBoss)
            return;
        var targetRole = param[0];
        var sourceRole = param[1];
        var type = param[2];
        var value = param[3];
        if (targetRole && (targetRole.infoModel.masterHandle == this.currAttackHandle || targetRole.infoModel.handle == this.currAttackHandle))
            this.changeHp();
    };
    TargetPlayerBigBloodPanel.prototype.updateAtt = function (char) {
        if (!char || !char.infoModel)
            return;
        if (!CityCC.ins().isCity && !BattleCC.ins().isBattle() && !PaoDianCC.ins().isPaoDian)
            return;
        if (char.infoModel.masterHandle == this.currAttackHandle || char.infoModel.handle == this.currAttackHandle)
            this.changeHp();
    };
    TargetPlayerBigBloodPanel.prototype.tweenBlood = function () {
        var _this = this;
        var bloodPer = (this.curValue * TargetPlayerBigBloodPanel.GRAYIMG_WIDTH) / 100;
        var self = this;
        egret.Tween.removeTweens(this.grayImgMask);
        if (bloodPer < 3)
            return;
        var t = egret.Tween.get(this.grayImgMask, {
            onChange: function () {
                if (self.grayImg)
                    self.grayImg.mask = _this.grayImgMask;
            }
        }, self);
        t.to({ "width": bloodPer - 3 }, 1000).call(function () {
            if (bloodPer <= 0) {
                self.grayImgMask.width = 0;
                egret.Tween.removeTweens(this.grayImgMask);
                ViewManager.ins().close(this);
            }
        }, self);
    };
    TargetPlayerBigBloodPanel.GRAYIMG_WIDTH = 0;
    return TargetPlayerBigBloodPanel;
}(BaseEuiView));
__reflect(TargetPlayerBigBloodPanel.prototype, "TargetPlayerBigBloodPanel");
var GameSystem;
(function (GameSystem) {
    GameSystem.targetPlayerBigBloodPanel = function () {
        ViewManager.ins().reg(TargetPlayerBigBloodPanel, LayerManager.Main_View);
    };
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=TargetPlayerBigBloodPanel.js.map