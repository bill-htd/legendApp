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
var WorshipChampionPanel = (function (_super) {
    __extends(WorshipChampionPanel, _super);
    function WorshipChampionPanel() {
        return _super.call(this) || this;
    }
    WorshipChampionPanel.prototype.childrenCreated = function () {
        this.praiseGroup0.touchChildren = false;
        this.praiseGroup1.touchChildren = false;
        this.praiseGroup2.touchChildren = false;
    };
    WorshipChampionPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Actor.ins().postChip, this.upData);
        this.observe(PeakedSys.ins().postWorship, this.upData);
        this.observe(UserReadPlayer.ins().postPlayerResult, this.openOtherPlayerView);
        this.addTouchEvent(this.shipBtn, this.onTouch);
        this.addTouchEvent(this.praiseGroup0, this.onTouch);
        this.addTouchEvent(this.praiseGroup1, this.onTouch);
        this.addTouchEvent(this.praiseGroup2, this.onTouch);
        this.isEff = false;
        this.initData();
        this.upData();
    };
    WorshipChampionPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._openOtherWin = false;
        if (this.titleMc) {
            this.titleMc.destroy();
            this.titleMc = null;
        }
        this.$onClose();
        TimerManager.ins().removeAll(this);
        DisplayUtils.removeFromParent(this.weaponEff0);
        DisplayUtils.removeFromParent(this.weaponEff1);
        DisplayUtils.removeFromParent(this.weaponEff2);
        DisplayUtils.removeFromParent(this.bodyEff0);
        DisplayUtils.removeFromParent(this.bodyEff1);
        DisplayUtils.removeFromParent(this.bodyEff2);
        if (this.yanHuaMc) {
            this.yanHuaMc.destroy();
            this.yanHuaMc = null;
        }
    };
    WorshipChampionPanel.prototype.initData = function () {
        if (PeakedSys.ins().kfPlayer2Data &&
            PeakedSys.ins().kfPlayer2Data.winId &&
            PeakedSys.ins().kfStatus >= KF_PeakStatus.Knockout &&
            PeakedSys.ins().kfStatusIsEnd) {
            var info = PeakedHelp.findPlayerDtById(PeakedSys.ins().kfPlayer2Data.winId);
            if (info)
                UserReadPlayer.ins().sendFindPlayer(info.roleId, info.serverId);
            this.shipBtn.enabled = true;
            this.chipLabel.visible = true;
            this.countLabel.visible = true;
        }
        else {
            this.shipBtn.enabled = false;
            this.chipLabel.visible = false;
            this.countLabel.visible = false;
        }
        for (var i = 0; i < 3; i++) {
            this["praiseGroup" + i].visible = false;
        }
        this.name0.text = "\u6682\u65E0";
        this.chipLabel.text = "\u7B79\u7801\uFF1A+" + GlobalConfig.PeakRaceBase.mobaiChips;
        if (!this.titleMc) {
            this.titleMc = ObjectPool.pop("MovieClip");
            this.titleMc.x = this.titleMcGroup.x;
            this.titleMc.y = this.titleMcGroup.y;
        }
        this.titleGroup.addChild(this.titleMc);
        var eff = RES_DIR_EFF + "chenghao1qiang";
        this.titleMc.playFile(eff, -1);
    };
    WorshipChampionPanel.prototype.upData = function () {
        var peakBaseDp = GlobalConfig.PeakRaceBase;
        if (!peakBaseDp.mobaiNum)
            peakBaseDp.mobaiNum = 10;
        var color = PeakedSys.ins().worshipNum < peakBaseDp.mobaiNum ? ColorUtil.GREEN_COLOR_N : ColorUtil.RED;
        var str = "\u819C\u62DC\uFF1A|C:" + color + "&T:" + PeakedSys.ins().worshipNum + "/" + peakBaseDp.mobaiNum;
        this.countLabel.textFlow = TextFlowMaker.generateTextFlow1(str);
        if (this.isEff)
            this.playYHEff();
    };
    WorshipChampionPanel.prototype.playYHEff = function () {
        if (this.yanHuaMc) {
            this.yanHuaMc.destroy();
            this.yanHuaMc = null;
        }
        this.yanHuaMc = new MovieClip();
        this.yanHuaMc.x = 270;
        this.yanHuaMc.y = 335;
        this.addChildAt(this.yanHuaMc, this.numChildren + 1);
        this.yanHuaMc.playFile(RES_DIR_EFF + "yanhuaeff", 2);
        this.isEff = false;
    };
    WorshipChampionPanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.shipBtn:
                if (PeakedSys.ins().worshipNum >= GlobalConfig.PeakRaceBase.mobaiNum) {
                    UserTips.ins().showTips("\u4ECA\u65E5\u819C\u62DC\u6B21\u6570\u5DF2\u7528\u5B8C\uFF01");
                    return;
                }
                if (!PeakedSys.ins().kfPlayer2Data.winId) {
                    UserTips.ins().showTips("\u5F53\u524D\u6CA1\u6709\u53EF\u819C\u62DC\u7684\u51A0\u519B\uFF01");
                    return;
                }
                this.isEff = true;
                PeakedSys.ins().sendWorship();
                break;
            case this.praiseGroup0:
            case this.praiseGroup1:
            case this.praiseGroup2:
                var info = PeakedHelp.findPlayerDtById(PeakedSys.ins().kfPlayer2Data.winId);
                if (info)
                    UserReadPlayer.ins().sendFindPlayer(info.roleId, info.serverId);
                break;
        }
    };
    WorshipChampionPanel.prototype.openOtherPlayerView = function (otherPlayerData) {
        this.otherPlayerData = otherPlayerData;
        if (this._openOtherWin) {
            var win = ViewManager.ins().open(RRoleWin, otherPlayerData);
            win.hideEx(1);
            this._openOtherWin = false;
        }
        else {
            this.startShowZhanling();
            this._openOtherWin = true;
            for (var index = 0; index < otherPlayerData.roleData.length; index++) {
                this["praiseGroup" + index].visible = true;
                var role = otherPlayerData.roleData[index];
                var zb = role.zhuangbei;
                var isHaveBody = void 0;
                var bodyId = zb[0];
                var weaponId = zb[1];
                var weaponConf = role.getEquipByIndex(0);
                var weaponConfId = weaponConf.item.configID;
                var bodyConf = role.getEquipByIndex(2);
                var bodyConfId = bodyConf.item.configID;
                this["weaponImg" + index].source = null;
                this["bodyImg" + index].source = null;
                this["name" + index].text = "S." + otherPlayerData.serverId + otherPlayerData.name;
                if (weaponConfId > 0) {
                    var fileName = GlobalConfig.EquipConfig[weaponConfId].appearance;
                    if (fileName && fileName.indexOf("[job]") > -1)
                        fileName = fileName.replace("[job]", role.job + "");
                    this["weaponImg" + index].source = fileName + "_" + role.sex + "_c_png";
                }
                if (bodyConfId > 0) {
                    var fileName = GlobalConfig.EquipConfig[bodyConfId].appearance;
                    if (fileName && fileName.indexOf("[job]") > -1)
                        fileName = fileName.replace("[job]", role.job + "");
                    this["bodyImg" + index].source = fileName + "_" + role.sex + "_c_png";
                    isHaveBody = true;
                }
                if (!isHaveBody)
                    this["bodyImg" + index].source = "body000_" + role.sex + "_c_png";
                if (weaponId > 0)
                    this["weaponImg" + index].source = this.getZhuangbanById(weaponId).res + "_" + role.sex + "_c_png";
                if (bodyId > 0)
                    this["bodyImg" + index].source = this.getZhuangbanById(bodyId).res + "_" + role.sex + "_c_png";
                this["wingImg" + index].source = null;
                var wingdata = role.wingsData;
                var id = zb[2];
                if (id > 0)
                    this["wingImg" + index].source = GlobalConfig.ZhuangBanId[id].res + "_png";
                else if (wingdata.openStatus) {
                    this["wingImg" + index].source = GlobalConfig.WingLevelConfig[wingdata.lv].appearance + "_png";
                }
                this.setEffect(role.getEquipByIndex(2).item.configID, "bPos" + index + "_", role.sex, this["bodyEffect" + index], this["bodyEff" + index]);
                this.setEffect(role.getEquipByIndex(0).item.configID, "wPos" + index + "_", role.sex, this["weaponEffect" + index], this["weaponEff" + index]);
            }
        }
    };
    WorshipChampionPanel.prototype.getZhuangbanById = function (id) {
        for (var k in GlobalConfig.ZhuangBanId) {
            if (GlobalConfig.ZhuangBanId[k].id == id)
                return GlobalConfig.ZhuangBanId[k];
        }
        return null;
    };
    WorshipChampionPanel.prototype.setEffect = function (id, imgStr, sex, soulEffGroup, suitEff) {
        if (!suitEff)
            suitEff = new MovieClip();
        var cfg = GlobalConfig.EquipWithEffConfig[id + "_" + sex];
        if (cfg) {
            suitEff.scaleX = suitEff.scaleY = cfg.scaling;
            if (!suitEff.parent)
                soulEffGroup.addChild(suitEff);
            suitEff.x = this[imgStr + sex].x + cfg.offX;
            suitEff.y = this[imgStr + sex].y + cfg.offY;
            suitEff.playFile(RES_DIR_EFF + cfg.inShowEff, -1);
        }
        else if (suitEff.parent)
            suitEff.parent.removeChild(suitEff);
    };
    WorshipChampionPanel.prototype.showZhanling = function (otherPlayerData) {
        var zhanlingID = otherPlayerData.zhanlingID;
        var zhanlingLevel = otherPlayerData.zhanlingLevel;
        if (zhanlingLevel < 0)
            return;
        var config = GlobalConfig.ZhanLingLevel[zhanlingID][zhanlingLevel];
        this.warfileName = config.appearance;
        if (!this.warMc) {
            this.warMc = new MovieClip;
            this.warMc.x = 450;
            this.warMc.y = 220;
            this.praiseGroup0.addChildAt(this.warMc, 0);
            this.warMc.playFile(RES_DIR_MONSTER + this.warfileName + "_4s", -1);
            this.warMc.touchEnabled = false;
        }
        var anchorOffset = GlobalConfig.ZhanLingConfig.anchorOffset || [];
        this.warMc.anchorOffsetX = anchorOffset[0] || 0;
        this.warMc.anchorOffsetY = anchorOffset[1] || 0;
        TimerManager.ins().remove(this.startShowZhanling, this);
        TimerManager.ins().doTimer(200, 1, this.playZhanLingAttack, this);
    };
    WorshipChampionPanel.prototype.playZhanLingAttack = function () {
        var _this = this;
        if (this.warMc) {
            var s = RES_DIR_MONSTER + this.warfileName + "_4" + EntityAction.ATTACK;
            this.warMc.playFile(s, 1, function () {
                var src = RES_DIR_MONSTER + _this.warfileName + "_4" + EntityAction.STAND;
                _this.warMc.playFile(src, -1, null, false);
                TimerManager.ins().remove(_this.playZhanLingAttack, _this);
                TimerManager.ins().doTimer(2800, 1, _this.hideZhanling, _this);
            }, false);
        }
    };
    WorshipChampionPanel.prototype.hideZhanling = function () {
        var _this = this;
        if (this.warMc) {
            egret.Tween.get(this.warMc).to({ alpha: 0 }, GlobalConfig.ZhanLingConfig.disappearTime || 1500).call(function () {
                DisplayUtils.removeFromParent(_this.warMc);
                _this.warMc.destroy();
                _this.warMc = null;
                TimerManager.ins().remove(_this.hideZhanling, _this);
                TimerManager.ins().doTimer(7000, 1, _this.startShowZhanling, _this);
            });
        }
    };
    WorshipChampionPanel.prototype.startShowZhanling = function () {
        this.showZhanling(this.otherPlayerData);
    };
    return WorshipChampionPanel;
}(BaseView));
__reflect(WorshipChampionPanel.prototype, "WorshipChampionPanel");
//# sourceMappingURL=WorshipChampionPanel.js.map