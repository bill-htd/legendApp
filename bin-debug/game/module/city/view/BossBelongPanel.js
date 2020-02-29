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
var BossBelongPanel = (function (_super) {
    __extends(BossBelongPanel, _super);
    function BossBelongPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "BossBelongSkin";
        _this.bloodBar0.labelDisplay.visible = false;
        _this.attackBoss1.currentState = "attbossup";
        return _this;
    }
    BossBelongPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(UserBoss.ins().postBelongChange, this.updateBelong);
        this.observe(GameLogic.ins().postChangeTarget, this.updateTarget);
        this.observe(MapView.onGridClick, this.mapClick);
        this.observe(GameLogic.ins().postEnterMap, this.onEnterMap);
        this.addTouchEvent(this.belongGroup, this.onTap);
        this.addTouchEvent(this.attguishu1, this.onTap);
        this.addTouchEvent(this.attackBoss1, this.onTap);
        this.addTouchEvent(this.attackPlayer1, this.onTap);
        this.updateBelong();
        TimerManager.ins().remove(this.updateBelong, this);
        TimerManager.ins().doTimer(200, 0, this.updateBelong, this);
    };
    BossBelongPanel.prototype.onEnterMap = function () {
        this.attackBoss1.currentState = "attbossup";
        this.attackPlayer1.currentState = "attgsup";
    };
    BossBelongPanel.prototype.mapClick = function (_a) {
        var target = _a.target, x = _a.x, y = _a.y;
        this.attackBoss1.currentState = "attbossup";
    };
    BossBelongPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.attackBoss1:
                this.attrBoss();
                break;
            case this.attguishu1:
                if (UserBoss.ins().attHandle == Actor.handle) {
                    if (KFBossSys.ins().isKFBossBattle) {
                        KFBossSys.ins().sendCleanBelong();
                    }
                    else if (DevildomSys.ins().isDevildomBattle) {
                        DevildomSys.ins().sendCleanBelong();
                    }
                    else {
                        UserBoss.ins().sendCleanBelong();
                    }
                    break;
                }
            case this.belongGroup:
            case this.attackPlayer1:
                if (UserBoss.ins().attHandle == 0) {
                    UserTips.ins().showTips("|C:0xFFFF00&T:该BOSS无归属者,快去抢夺!|");
                    return;
                }
                if (UserBoss.ins().attHandle == Actor.handle || UserBoss.ins().attHandle == GameLogic.ins().currAttackHandle)
                    return;
                if (!UserBoss.ins().canClick)
                    return;
                GameLogic.ins().postChangeAttrPoint(UserBoss.ins().attHandle);
                this.setBtnState();
                break;
        }
    };
    BossBelongPanel.prototype.attrBoss = function () {
        GameLogic.ins().postChangeAttrPoint(UserBoss.ins().bossHandler);
        this.attackBoss1.currentState = "attbossing";
        this.attackPlayer1.currentState = "attgsup";
    };
    BossBelongPanel.prototype.updateTarget = function () {
        this.setBtnState();
    };
    BossBelongPanel.prototype.setBtnState = function () {
        if (UserBoss.ins().attHandle == Actor.handle) {
            if (GwBoss.ins().isGwBoss || KFBossSys.ins().isKFBossBattle || DevildomSys.ins().isDevildomBattle) {
                this.attguishu1.label = "\u53D6\u6D88\u5F52\u5C5E";
            }
            else {
                this.attguishu1.visible = false;
            }
            this.attackPlayer1.currentState = "attgsdis";
        }
        else {
            this.attguishu1.visible = true;
            this.attguishu1.label = "\u62A2\u593A\u5F52\u5C5E";
            if (GameLogic.ins().currAttackHandle && GameLogic.ins().currAttackHandle != UserBoss.ins().bossHandler) {
                this.attackPlayer1.currentState = "attgsing";
            }
            else {
                this.attackPlayer1.currentState = "attgsup";
            }
        }
        if (GameLogic.ins().currAttackHandle && GameLogic.ins().currAttackHandle == UserBoss.ins().bossHandler) {
            this.attackBoss1.currentState = "attbossing";
        }
        else {
            this.attackBoss1.currentState = "attbossup";
        }
    };
    BossBelongPanel.prototype.updateBelong = function () {
        this.updateTarget();
        var roleList = EntityManager.ins().getMasterList(EntityManager.ins().getRootMasterHandle(UserBoss.ins().attHandle));
        if (roleList && roleList.length > 0) {
            var len = roleList.length;
            var hpValue = 0;
            var hpTotal = 0;
            var neigongValue = 0;
            var neigongTotal = 0;
            var mainRoleInfo = void 0;
            for (var i = 0; i < len; i++) {
                var role = roleList[i];
                if (role instanceof CharRole) {
                    var curHp = role.infoModel.getAtt(AttributeType.atHp) || 0;
                    var maxHp = role.infoModel.getAtt(AttributeType.atMaxHp) || 0;
                    hpValue += curHp;
                    hpTotal += maxHp;
                    var curNeigong = role.infoModel.getAtt(AttributeType.cruNeiGong) || 0;
                    var maxNeigong = role.infoModel.getAtt(AttributeType.maxNeiGong) || 0;
                    neigongValue += curNeigong;
                    neigongTotal += maxNeigong;
                    if (!mainRoleInfo) {
                        mainRoleInfo = role.infoModel;
                    }
                }
            }
            this.belongGroup.visible = (hpValue > 0 && UserBoss.ins().winner == "");
            var color = Actor.handle != UserBoss.ins().attHandle ? ColorUtil.ROLENAME_COLOR_YELLOW : ColorUtil.ROLENAME_COLOR_GREEN;
            var tname = mainRoleInfo.getNameWithServer();
            var strlist = tname.split("\n");
            if (strlist[1])
                tname = strlist[1];
            else
                tname = strlist[0];
            tname = StringUtils.replaceStr(tname, "0xffffff", color + "");
            this.belongNameTxt1.textFlow = TextFlowMaker.generateTextFlow("|C:" + color + "&T:" + tname);
            this.roleHead1.source = "yuanhead" + mainRoleInfo.job + mainRoleInfo.sex;
            this.bloodBar0.maximum = hpTotal;
            this.bloodBar0.value = hpValue;
            this.neigongBar0.maximum = neigongTotal;
            this.neigongBar0.value = neigongValue;
        }
        else {
            this.belongGroup.visible = false;
            this.attackPlayer1.currentState = "attgsup";
        }
    };
    return BossBelongPanel;
}(BaseEuiView));
__reflect(BossBelongPanel.prototype, "BossBelongPanel");
var GameSystem;
(function (GameSystem) {
    GameSystem.bossBelongPanel = function () {
        ViewManager.ins().reg(BossBelongPanel, LayerManager.Main_View);
    };
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=BossBelongPanel.js.map