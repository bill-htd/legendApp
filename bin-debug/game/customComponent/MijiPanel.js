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
var MijiPanel = (function (_super) {
    __extends(MijiPanel, _super);
    function MijiPanel() {
        var _this = _super.call(this) || this;
        _this.isTween = false;
        _this.curRole = 0;
        return _this;
    }
    MijiPanel.prototype.childrenCreated = function () {
        this.init();
    };
    MijiPanel.prototype.init = function () {
        this.change.textFlow = new egret.HtmlTextParser().parser("<u>\u79D8\u7C4D\u7F6E\u6362</u>");
        this.mijiBtns = [this.mijiBtn0, this.mijiBtn1, this.mijiBtn2, this.mijiBtn3, this.mijiBtn4, this.mijiBtn5, this.mijiBtn6, this.mijiBtn7, this.select];
        this.eff = new MovieClip;
        this.eff.playFile(RES_DIR_EFF + "chargeff1");
        this.eff.x = 278;
        this.eff.y = 500;
        this.eff.scaleX = 0.7;
    };
    MijiPanel.prototype.destructor = function () {
    };
    MijiPanel.prototype.setCurRole = function (roleId) {
        if (this.curRole != roleId) {
            this.curRole = roleId;
            if (this.isTween) {
                UserMiji.ins().sendMijiwancheng(this.roleID);
                this.isTween = false;
                for (var i = 0; i < 8; i++) {
                    egret.Tween.removeTweens(this["imageSmall_" + (i + 1)]);
                }
            }
        }
    };
    MijiPanel.prototype.setData = function () {
        var _this = this;
        var ins = UserMiji.ins();
        var showSetCount = true;
        for (var i = 0; i < 8; i++) {
            this["imageMax_" + (i + 1)].visible = false;
            var numList = void 0;
            if (ErrorLog.Assert(ins.miji, "MijiPanel   data.miji is null")) {
                this.mijiBtns[i].data = null;
            }
            else {
                numList = ins.miji[this.curRole];
                if (ErrorLog.Assert(numList, "MijiPanel   numList " +
                    "is null  roleId = " + this.curRole)) {
                    this.mijiBtns[i].data = null;
                }
                else {
                    var isLiang = !numList[i] ? false : (numList[i].id == 0 ? false : true);
                    this["imageMax_" + (i + 1)].visible = isLiang;
                    this.mijiBtns[i].data = !numList[i] ? null : numList[i];
                    if (!numList[i]) {
                        if (showSetCount) {
                            this.mijiBtns[i].setCountLabel(i);
                            showSetCount = false;
                        }
                    }
                }
            }
        }
        this.learnLabel.visible = false;
        this.learnImg.visible = false;
        ins.miji[this.curRole].forEach(function (element) {
            if (element.id > 0) {
                _this.learnLabel.visible = true;
                _this.learnImg.visible = true;
            }
        });
        this.powerPanel.setPower(ins.getPowerByRole(this.curRole));
    };
    MijiPanel.prototype.updateEff = function () {
        if (!this.select.addImg.visible) {
            this.playEff();
        }
        else {
            DisplayUtils.removeFromParent(this.mc);
        }
    };
    MijiPanel.prototype.playEff = function () {
        if (!this.mc)
            this.mc = new MovieClip;
        if (!this.mc.parent) {
            this.btnAct.addChildAt(this.mc, 1);
            this.mc.x = this.getBtn.x + this.getBtn.width / 2;
            this.mc.y = this.getBtn.y + this.getBtn.height / 2;
        }
        this.mc.playFile(RES_DIR_EFF + "chargeff1", -1);
    };
    MijiPanel.prototype.playArrow = function () {
        if (!this._arrow)
            this._arrow = new GuideArrow2();
        if (!this._arrow.parent)
            this.arrow.addChild(this._arrow);
        this._arrow.x = 0;
        this._arrow.setTips("\u70B9\u51FB\u9576\u5D4C\u79D8\u7C4D");
        this._arrow.setDirection(0);
    };
    MijiPanel.prototype.stopArrow = function () {
        if (this._arrow)
            this._arrow.removeTweens();
        DisplayUtils.removeFromParent(this._arrow);
        this._arrow = null;
    };
    MijiPanel.prototype.setOpenDesc = function () {
        var config = GlobalConfig.MiJiGridConfig[UserMiji.ins().grid + 1];
        if (config) {
        }
        else {
            this.curZsLv.visible = false;
        }
    };
    MijiPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setOpenDesc();
        this.setData();
        this.addTouchEvent(this.getBtn, this.onTap);
        this.addTouchEvent(this.change, this.onTap);
        this.addTouchEvent(this.mijitujian, this.onTap);
        this.addTouchEvent(this.all, this.onTap);
        this.addTouchEvent(this.btnLock, this.onTap);
        for (var a in this.mijiBtns) {
            this.addTouchEvent(this.mijiBtns[a], this.onTap);
        }
        this.observe(UserMiji.ins().postMijiData, this.updateRedPoint);
        this.observe(UserMiji.ins().postMijiUpDate, this.learnUpdate);
        this.observe(UserMiji.ins().postSelectedMiji, this.selectMijiItem);
        this.observe(UserMiji.ins().postMijiLockInfo, this.setData);
        this.select.showAdd();
    };
    MijiPanel.prototype.close = function () {
        for (var a in this.mijiBtns) {
            this.removeTouchEvent(this.mijiBtns[a], this.onTap);
        }
        this.removeTouchEvent(this.getBtn, this.onTap);
        this.removeTouchEvent(this.change, this.onTap);
        this.removeTouchEvent(this.mijitujian, this.onTap);
        this.removeTouchEvent(this.all, this.onTap);
        this.removeObserve();
        DisplayUtils.removeFromParent(this.mc);
        this.stopArrow();
    };
    MijiPanel.prototype.selectMijiItem = function (itemObj) {
        this.select.data = itemObj[0];
        this.curName = itemObj[1];
        this.updateEff();
    };
    MijiPanel.prototype.onBagUseMiji = function (itemId) {
        this.playEff();
        this.playArrow();
    };
    MijiPanel.prototype.learnUpdate = function (para) {
        var _this = this;
        var index = para[0];
        var id = para[1];
        var oldID = para[2];
        var isSuss = para[3];
        if (isSuss == 1) {
            this.learnUpdateEffect(index, false, function () {
                _this["imageMax_" + (index + 1)].visible = true;
                var mc = ObjectPool.pop("MovieClip");
                mc.scaleX = mc.scaleY = 1;
                mc.rotation = 0;
                mc.x = mc.y = 36;
                mc.playFile(RES_DIR_EFF + "faileff", 1, function () {
                    ObjectPool.push(mc);
                });
                _this.mijiBtns[index].addChild(mc);
                UserTips.ins().showTips("秘籍镶嵌失败");
            });
        }
        else {
            var callback = function () {
                _this["imageMax_" + (index + 1)].visible = true;
                TimerManager.ins().doTimer(500, 1, function () {
                    var mc = ObjectPool.pop("MovieClip");
                    mc.scaleX = mc.scaleY = 1;
                    mc.rotation = 0;
                    mc.x = mc.y = 36;
                    mc.playFile(RES_DIR_EFF + "successeff", 1, function () {
                        ObjectPool.push(mc);
                    });
                    _this.mijiBtns[index].addChild(mc);
                    _this.mijiBtns[index].showSelect();
                    _this.setData();
                    var tempName = oldID ? ",[" + GlobalConfig.ItemConfig[GlobalConfig.MiJiSkillConfig[oldID].item].name + "]被替换" : "";
                    UserTips.ins().showTips("秘籍镶嵌完成" + tempName);
                    var mijiRedPoint = Setting.ins().getValue(ClientSet.mijiRedPoint);
                    if (!mijiRedPoint)
                        Setting.ins().setValue(ClientSet.mijiRedPoint, 1);
                }, _this);
            };
            if (id - oldID == 1) {
                callback();
            }
            else {
                this.learnUpdateEffect(index, true, callback);
            }
        }
        this.updateEff();
    };
    MijiPanel.prototype.learnUpdateEffect = function (index, isSuss, fun) {
        var _this = this;
        this.isTween = true;
        var len = 8 * 3 + index + 1;
        var _loop_1 = function (i) {
            var num = i;
            var time = 150 * i;
            var closeTime = 150;
            if (i > 7 && i < 16) {
                num = i - 8;
                time = 150 * i;
            }
            else if (i > 15 && i < 24) {
                num = i - 8 * 2;
                time = 150 * i + 100 * (i - 15);
                closeTime = 250;
            }
            else if (i > 23) {
                num = i - 8 * 3;
                time = 150 * i + 200 * (i - 23) + 650;
                closeTime = 350;
            }
            var tw = egret.Tween.get(this_1["imageSmall_" + (num + 1)]);
            tw.to({}, time).call(function () {
                var tw = egret.Tween.get(_this["imageSmall_" + (num + 1)]);
                _this["imageSmall_" + (num + 1)].visible = true;
                if (i == (len - 1))
                    tw.to({ "visible": true }, 150).call(function () {
                        for (var i_1 = 0; i_1 < 8; i_1++) {
                            egret.Tween.removeTweens(_this["imageSmall_" + (i_1 + 1)]);
                            _this.isTween = false;
                        }
                        UserMiji.ins().sendMijiwancheng(_this.roleID);
                        fun();
                    });
                else
                    tw.to({ "visible": false }, closeTime);
            });
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
    };
    MijiPanel.prototype.updateRedPoint = function () {
        this.setOpenDesc();
        this.setData();
    };
    MijiPanel.prototype.onTap = function (e) {
        var _this = this;
        var ins = UserMiji.ins();
        switch (e.target) {
            case this.getBtn:
                DisplayUtils.removeFromParent(this.mc);
                this.stopArrow();
                if (!this.select.data) {
                    var i_2 = this.mijiBtns.indexOf(this.select);
                    if (i_2 == 8) {
                        if (!ins.grid) {
                            UserTips.ins().showTips("1\u8F6C\u540E\u5F00\u542F");
                            return;
                        }
                        ViewManager.ins().open(MijiLearnWin, this.curRole);
                        return;
                    }
                    UserTips.ins().showTips("请选择技能！");
                    return;
                }
                var id = this.select.data + 1;
                var isLearn = void 0;
                id = this.select.data - 1;
                isLearn = UserMiji.ins().hasSpecificSkillOfRole(this.curRole, id);
                var tempName = "";
                if (GlobalConfig.MiJiSkillConfig[id]) {
                    tempName = GlobalConfig.ItemConfig[GlobalConfig.MiJiSkillConfig[id].item].name;
                }
                if (isLearn) {
                    WarnWin.show("\u5DF2\u9576\u5D4C\u300A" + tempName + "\u300B,\u5C06\u76F4\u63A5\u66FF\u4EE3\u300A" + tempName + "\u300B\u83B7\u5F97\u300A" + this.curName + "\u300B\u6548\u679C", function () {
                        _this.roleID = _this.curRole;
                        UserMiji.ins().sendMijiLearn(_this.curRole, _this.select.data);
                        SoundUtil.ins().playEffect(SoundUtil.SKILL_UP);
                        _this.select.showAdd();
                    }, this);
                }
                else {
                    WarnWin.show("\u9576\u5D4C\u540E\u83B7\u5F97\u300A" + this.curName + "\u300B,\u6709\u51E0\u7387\u66FF\u6362\u5DF2\u9576\u5D4C\u79D8\u7C4D\uFF0C\u662F\u5426\u9576\u5D4C\uFF1F" + (isLearn ? "\n<font color='#f3311e'>(已镶嵌《" + tempName + "》,同类技能仅高级生效)</font>" : "\n<font color='#35e62d'>（低级秘籍不会替换高级秘籍）</font>"), function () {
                        _this.roleID = _this.curRole;
                        UserMiji.ins().sendMijiLearn(_this.curRole, _this.select.data);
                        SoundUtil.ins().playEffect(SoundUtil.SKILL_UP);
                        _this.select.showAdd();
                    }, this);
                }
                break;
            case this.change:
                ViewManager.ins().open(MijiZhWin);
                break;
            case this.mijitujian:
                ViewManager.ins().open(MiJiTujianWin);
                break;
            case this.all:
                ViewManager.ins().open(MijiLookWin);
                break;
            case this.btnLock:
                ViewManager.ins().open(MijiLockWin, this.curRole);
                break;
            default:
                var i = this.mijiBtns.indexOf(e.target.parent);
                if (i == 8) {
                    if (!ins.grid) {
                        UserTips.ins().showTips("1\u8F6C\u540E\u5F00\u542F");
                        return;
                    }
                    ViewManager.ins().open(MijiLearnWin, this.curRole);
                    return;
                }
                if (!this.mijiBtns[i] || this.mijiBtns[i].data && !this.mijiBtns[i].data.id)
                    return;
                if (!ins.grid || i >= ins.grid) {
                    UserTips.ins().showTips("未开启");
                    return;
                }
                ViewManager.ins().open(MijiTipWin, this.mijiBtns[i].data);
                break;
        }
    };
    return MijiPanel;
}(BaseView));
__reflect(MijiPanel.prototype, "MijiPanel");
//# sourceMappingURL=MijiPanel.js.map