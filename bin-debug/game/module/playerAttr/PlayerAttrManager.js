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
var PlayerAttrManager = (function (_super) {
    __extends(PlayerAttrManager, _super);
    function PlayerAttrManager() {
        var _this = _super.call(this) || this;
        _this.moduleAry = [];
        _this.count = 0;
        _this.roleIndex = 0;
        _this.descAry = [];
        _this.attrData = [];
        _this.dressPower = 0;
        _this.dressCount = 9;
        _this.score = 0;
        _this.power = 0;
        _this.specialPower = 0;
        _this.descAry.push("总装备");
        _this.descAry.push("装备分");
        _this.descAry.push("传世");
        _this.descAry.push("龙魂");
        _this.descAry.push("战纹");
        _this.descAry.push("装扮");
        _this.descAry.push("称号");
        _this.descAry.push("合击");
        _this.descAry.push("转生");
        _this.descAry.push("羽毛");
        _this.descAry.push("两个戒指");
        _this.descAry.push("烈焰戒指");
        _this.descAry.push("烈焰戒指技能");
        _this.descAry.push("官印");
        _this.descAry.push("内功");
        _this.descAry.push("经脉");
        _this.descAry.push("秘籍");
        _this.descAry.push("爵位");
        _this.descAry.push("神器");
        _this.descAry.push("勋章");
        _this.descAry.push("图鉴");
        _this.descAry.push("强化");
        _this.descAry.push("精炼");
        _this.descAry.push("铸造");
        _this.descAry.push("兵魂");
        _this.descAry.push("行会技能");
        _this.descAry.push("VIP");
        _this.descAry.push("等级");
        return _this;
    }
    PlayerAttrManager.prototype.doSave = function (value, type, name) {
        var blob;
        if (typeof window.Blob == "function") {
            blob = new Blob([value], { type: type });
        }
        else {
            var BlobBuilder = window["BlobBuilder"] || window["MozBlobBuilder"] || window["WebKitBlobBuilder"] || window["MSBlobBuilder"];
            var bb = new BlobBuilder();
            bb.append(value);
            blob = bb.getBlob(type);
        }
        var URL = window.URL || window["webkitURL"];
        var bloburl = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        if ('download' in anchor) {
            anchor.style.visibility = "hidden";
            anchor.href = bloburl;
            anchor.download = name;
            document.body.appendChild(anchor);
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, true);
            anchor.dispatchEvent(evt);
            document.body.removeChild(anchor);
        }
        else if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, name);
        }
        else {
            location.href = bloburl;
        }
    };
    PlayerAttrManager.prototype.save = function (content, fileName) {
        this.doSave(content, "text/latex", fileName + ".txt");
    };
    PlayerAttrManager.prototype.getAttrStr = function () {
        var attr = "";
        var count = this.attrData.length;
        for (var i = 0; i < count; i++) {
            var model = this.attrData[i];
            attr += this.descAry[model.module] + "	" + model.soldierPower + "	" + model.magePower + "	" + model.immortalPower + "\n";
        }
        return attr;
    };
    PlayerAttrManager.prototype.getModuleIndex = function (moduleName) {
        var count = this.descAry.length;
        for (var i = 0; i < count; i++) {
            if (this.descAry[i] == moduleName) {
                return i;
            }
        }
        return 0;
    };
    PlayerAttrManager.prototype.updateData = function (moduleName, power, roleIndex) {
        var index = this.getModuleIndex(moduleName);
        if (roleIndex == undefined) {
            roleIndex = 0;
        }
        var dataIndex = SubRoles.ins().getSubRoleByIndex(roleIndex).job;
        var data = this.attrData[index];
        if (data == undefined) {
            data = new PlayerAttrModel();
        }
        switch (dataIndex) {
            case JobConst.ZhanShi:
                data.soldierPower = power;
                break;
            case JobConst.FaShi:
                data.magePower = power;
                break;
            case JobConst.DaoShi:
                data.immortalPower = power;
                break;
        }
        data.module = index;
        this.attrData[index] = data;
    };
    PlayerAttrManager.prototype.isHaveRole = function (roleIndex) {
        return roleIndex < SubRoles.ins().subRolesLen;
    };
    PlayerAttrManager.prototype.getAttr = function () {
        var _this = this;
        ViewManager.ins().open(LiLianWin, 3);
        TimerManager.ins().doTimerDelay(850, 0, 1, function () {
            _this.updateData("图鉴", Book.ins().getBookPowerNumEx());
            ViewManager.ins().close(LiLianWin);
        }, this);
        TimerManager.ins().doTimerDelay(850, 0, 1, function () {
            ViewManager.ins().open(LiLianWin, 2);
            TimerManager.ins().doTimerDelay(860, 0, 1, function () {
                var win = ViewManager.ins().getView(LiLianWin);
                _this.updateData("勋章", win['xunzhangPanel'].getPower());
                ViewManager.ins().close(LiLianWin);
            }, _this);
        }, this);
        TimerManager.ins().doTimerDelay(1000, 0, 1, function () {
            ViewManager.ins().open(LiLianWin, 1);
        }, this);
        TimerManager.ins().doTimerDelay(1150, 0, 1, function () {
            var count = parseInt(Artifact.ins().getMaxIndex() + "");
            var artifactPower = 0;
            for (var i = 0; i < count; i++) {
                if (Artifact.ins().getNewArtifactBy(i + 1).open || Artifact.ins().getNewArtifactPower(i + 1) != 0) {
                    artifactPower += Artifact.ins().getNewArtifactPower(i + 1);
                }
                else {
                    break;
                }
            }
            _this.updateData("神器", artifactPower);
        }, this);
        TimerManager.ins().doTimerDelay(1500, 0, 1, function () {
            ViewManager.ins().close(LiLianWin);
            ViewManager.ins().open(LiLianWin);
        }, this);
        TimerManager.ins().doTimerDelay(1600, 0, 1, function () {
            _this.updateData("爵位", LiLian.ins().getPower());
            ViewManager.ins().close(LiLianWin);
        }, this);
        TimerManager.ins().doTimerDelay(1700, 0, 1, function () {
            ViewManager.ins().open(DressWin, 0, 3);
            TimerManager.ins().doTimerDelay(10, 0, 1, function () {
                _this.updateData("称号", Title.ins().getTotalPower(), 0);
                ViewManager.ins().close(DressWin);
            }, _this);
        }, this);
        TimerManager.ins().doTimerDelay(1800, 0, 1, function () {
            ViewManager.ins().open(DressWin, 1, 3);
            TimerManager.ins().doTimerDelay(20, 0, 1, function () {
                _this.updateData("称号", Title.ins().getTotalPower(), 1);
                ViewManager.ins().close(DressWin);
            }, _this);
        }, this);
        TimerManager.ins().doTimerDelay(1900, 0, 1, function () {
            ViewManager.ins().open(DressWin, 2, 3);
            TimerManager.ins().doTimerDelay(20, 0, 1, function () {
                _this.updateData("称号", Title.ins().getTotalPower(), 2);
                ViewManager.ins().close(DressWin);
            }, _this);
        }, this);
        TimerManager.ins().doTimerDelay(2000, 0, 1, function () {
            ViewManager.ins().open(GuildSkillWin, 0);
            TimerManager.ins().doTimerDelay(20, 0, 1, function () {
                var win = ViewManager.ins().getView(GuildSkillWin);
                _this.updateData("行会技能", win.guildskill.getTotalPower(), 0);
                ViewManager.ins().close(GuildSkillWin);
            }, _this);
        }, this);
        TimerManager.ins().doTimerDelay(2100, 0, 1, function () {
            ViewManager.ins().open(GuildSkillWin, 1);
            TimerManager.ins().doTimerDelay(20, 0, 1, function () {
                var win = ViewManager.ins().getView(GuildSkillWin);
                _this.updateData("行会技能", win.guildskill.getTotalPower(), 1);
                ViewManager.ins().close(GuildSkillWin);
            }, _this);
        }, this);
        TimerManager.ins().doTimerDelay(2200, 0, 1, function () {
            ViewManager.ins().open(GuildSkillWin, 2);
            TimerManager.ins().doTimerDelay(20, 0, 1, function () {
                var win = ViewManager.ins().getView(GuildSkillWin);
                _this.updateData("行会技能", win.guildskill.getTotalPower(), 2);
                ViewManager.ins().close(GuildSkillWin);
                ViewManager.ins().close(GuildMap);
                ViewManager.ins().open(RoleWin, 0);
                _this.getRoleInfo();
            }, _this);
        }, this);
        this.updateData("VIP", this.getVipPower());
        var length = SubRoles.ins().subRolesLen;
        for (var i = 0; i < length; i++) {
            var job = SubRoles.ins().getSubRoleByIndex(i).job;
            var power = this.getRolePower(Actor.level, job);
            this.updateData("等级", power, i);
        }
    };
    PlayerAttrManager.prototype.getVipPower = function () {
        var power = 0;
        if (UserVip.ins().lv > 0) {
            var cfg = GlobalConfig.VipConfig[UserVip.ins().lv];
            power = UserBag.getAttrPower(cfg.attrAddition);
        }
        return power;
    };
    PlayerAttrManager.prototype.getRolePower = function (lv, job) {
        var power = 0;
        var cfg;
        for (var i in GlobalConfig.RoleConfig) {
            if (i == lv.toString()) {
                for (var j in GlobalConfig.RoleConfig[i]) {
                    if (j == job.toString()) {
                        cfg = GlobalConfig.RoleConfig[i][j];
                        power = this.getAttrPower(cfg);
                    }
                }
            }
        }
        return power;
    };
    PlayerAttrManager.prototype.getAttrPower = function (data) {
        var attr = [];
        attr.push(new AttributeData(AttributeType.atHp, data.hp));
        attr.push(new AttributeData(AttributeType.atMp, data.mp));
        attr.push(new AttributeData(AttributeType.atAttack, data.atk));
        attr.push(new AttributeData(AttributeType.atDef, data.def));
        attr.push(new AttributeData(AttributeType.atRes, data.res));
        attr.push(new AttributeData(AttributeType.atCrit, data.crit));
        attr.push(new AttributeData(AttributeType.atTough, data.tough));
        attr.push(new AttributeData(AttributeType.atAttackSpeed, data.as));
        attr.push(new AttributeData(AttributeType.atMoveSpeed, data.ms));
        var power = 0;
        power = UserBag.getAttrPower(attr);
        return power;
    };
    PlayerAttrManager.prototype.getRoleInfo = function () {
        var _this = this;
        TimerManager.ins().doTimerDelay(20, 0, 1, function () {
            var win = ViewManager.ins().getView(RoleWin);
            var rolePanel = win.roleInfoPanel;
            TimerManager.ins().doTimerDelay(10, 0, 1, function () {
                rolePanel['item' + _this.count].showPower();
                TimerManager.ins().doTimerDelay(20, 0, 1, function () {
                    var tips = ViewManager.ins().getView(EquipDetailedWin);
                    if (tips != undefined) {
                        if (tips.getType() == "官印") {
                            _this.updateData("官印", tips.getPower(), _this.roleIndex);
                        }
                        else {
                            _this.score += tips.getScore();
                            _this.power += tips.getPower();
                        }
                        ViewManager.ins().close(EquipDetailedWin);
                    }
                    _this.count++;
                    if (_this.count < 9) {
                        _this.getRoleInfo();
                    }
                    else {
                        _this.updateData("总装备", _this.power, _this.roleIndex);
                        _this.updateData("装备分", _this.score, _this.roleIndex);
                        _this.count = 0;
                        _this.power = 0;
                        _this.score = 0;
                        _this.roleIndex++;
                        ViewManager.ins().close(RoleWin);
                        TimerManager.ins().doTimerDelay(20, 0, 1, function () {
                            if (_this.roleIndex < 3) {
                                ViewManager.ins().open(RoleWin, 0, _this.roleIndex);
                                _this.getRoleInfo();
                            }
                            else {
                                _this.count = 0;
                                _this.roleIndex = 0;
                                _this.getSpecialRingPower();
                            }
                        }, _this);
                    }
                }, _this);
            }, _this);
        }, this);
    };
    PlayerAttrManager.prototype.getSpecialRingPower = function () {
        var _this = this;
        ViewManager.ins().open(SpecialRingWin, this.count, this.roleIndex);
        TimerManager.ins().doTimerDelay(20, 0, 1, function () {
            var win = ViewManager.ins().getView(SpecialRingWin);
            TimerManager.ins().doTimerDelay(10, 0, 1, function () {
                _this.specialPower += win.getPower();
                ViewManager.ins().close(SpecialRingWin);
                _this.count++;
                if (_this.count < 2) {
                    _this.getSpecialRingPower();
                }
                else {
                    _this.updateData("两个戒指", _this.specialPower, _this.roleIndex);
                    _this.specialPower = 0;
                    _this.count = 0;
                    _this.roleIndex++;
                    TimerManager.ins().doTimerDelay(20, 0, 1, function () {
                        if (_this.roleIndex < 3) {
                            ViewManager.ins().open(SpecialRingWin, _this.count, _this.roleIndex);
                            _this.getSpecialRingPower();
                        }
                        else {
                            _this.count = 0;
                            _this.roleIndex = 0;
                            _this.delayRun();
                        }
                    }, _this);
                }
            }, _this);
        }, this);
    };
    PlayerAttrManager.prototype.delayRun = function () {
        this.moduleAry.push({ tips: "烈焰戒指", cls: FireRingWin });
        this.moduleAry.push({ tips: "烈焰戒指技能", cls: FireRingWin, param: 1 });
        this.addRoleAttr({ tips: "龙魂", cls: TreasureWin });
        this.addRoleNextAttr({ tips: "内功", cls: SkillWin, param: 1 });
        this.addRoleNextAttr({ tips: "经脉", cls: SkillWin, param: 2 });
        this.addRoleNextAttr({ tips: "秘籍", cls: SkillWin, param: 3 });
        this.addRoleNextAttr({ tips: "强化", cls: ForgeWin, param: 0 });
        this.addRoleNextAttr({ tips: "精炼", cls: ForgeWin, param: 1 });
        this.addRoleNextAttr({ tips: "铸造", cls: ForgeWin, param: 2 });
        this.addRoleNextAttr({ tips: "兵魂", cls: ForgeWin, param: 3 });
        this.moduleAry.push({ tips: "合击", cls: RoleWin, param: 1 });
        this.moduleAry.push({ tips: "转生", cls: RoleWin, param: 2 });
        this.addRoleNextAttr({ tips: "羽毛", cls: RoleWin, param: 3 });
        this.addRoleAttr({ tips: "传世", cls: HeirloomWin });
        this.addRoleAttr({ tips: "战纹", cls: RuneWin });
        this.addRoleNextAttr({ tips: "装扮", cls: DressWin, param: 0 });
        this.addRoleNextAttr({ tips: "装扮", cls: DressWin, param: 1 });
        this.addRoleNextAttr({ tips: "装扮", cls: DressWin, param: 2 });
        this.onGetAttr();
    };
    PlayerAttrManager.prototype.addRoleAttr = function (data) {
        var length = SubRoles.ins().subRolesLen;
        for (var i = 0; i < length; i++) {
            this.moduleAry.push({ tips: data.tips, cls: data.cls, roleIndex: i, param: i });
        }
    };
    PlayerAttrManager.prototype.addRoleNextAttr = function (data) {
        var length = SubRoles.ins().subRolesLen;
        for (var i = 0; i < length; i++) {
            this.moduleAry.push({ tips: data.tips, cls: data.cls, roleIndex: i, param: [data.param, i] });
        }
    };
    PlayerAttrManager.prototype.onGetAttr = function () {
        var _this = this;
        if (this.moduleAry.length) {
            this.data = this.moduleAry.shift();
            if (this.data.param != undefined) {
                if (this.data.param instanceof Array) {
                    ViewManager.ins().open(this.data.cls, this.data.param[0], this.data.param[1]);
                }
                else {
                    ViewManager.ins().open(this.data.cls, this.data.param);
                }
            }
            else {
                ViewManager.ins().open(this.data.cls);
            }
            TimerManager.ins().doTimerDelay(100, 0, 1, function () {
                _this.getPlayerAttr();
            }, this);
        }
    };
    PlayerAttrManager.prototype.getPlayerAttr = function () {
        var win = ViewManager.ins().getView(this.data.cls);
        this.getValue(win, this.data, this.data.cls);
        this.onGetAttr();
    };
    PlayerAttrManager.prototype.getValue = function (container, data, win) {
        for (var i = 0; i < container.numChildren; i++) {
            var dis = container.getChildAt(i);
            if (dis instanceof PowerPanel) {
                if (dis.visible) {
                    var roleIndex = 0;
                    if (this.data.roleIndex) {
                        roleIndex = this.data.roleIndex;
                    }
                    if (this.data.tips == "装扮") {
                        this.dressCount--;
                        this.dressPower += dis.power;
                        if (this.dressCount == 0) {
                            this.updateData(this.data.tips, this.dressPower, roleIndex);
                            this.dressPower = 0;
                            this.dressCount = 9;
                            this.save(this.getAttrStr(), Actor.myName + "\u7684\u6218\u6597\u529B");
                        }
                    }
                    else {
                        var power = 0;
                        if (dis.power) {
                            power = dis.power;
                        }
                        this.updateData(this.data.tips, power, roleIndex);
                    }
                }
                ViewManager.ins().close(win);
                return;
            }
            else if (dis instanceof egret.DisplayObjectContainer) {
                if (dis instanceof eui.ViewStack) {
                    var child = dis.selectedChild;
                    if (child) {
                        this.getValue(child, data, win);
                    }
                }
                else {
                    this.getValue(dis, data, win);
                }
            }
        }
        ViewManager.ins().close(win);
    };
    PlayerAttrManager.ins = function () {
        return _super.ins.call(this);
    };
    return PlayerAttrManager;
}(BaseClass));
__reflect(PlayerAttrManager.prototype, "PlayerAttrManager");
//# sourceMappingURL=PlayerAttrManager.js.map