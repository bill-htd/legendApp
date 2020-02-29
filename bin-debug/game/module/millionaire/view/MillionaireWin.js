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
var MillionaireWin = (function (_super) {
    __extends(MillionaireWin, _super);
    function MillionaireWin() {
        var _this = _super.call(this) || this;
        _this.isShowDice = false;
        _this.skinName = "richmanSkin";
        _this.isTopLevel = true;
        return _this;
    }
    MillionaireWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    MillionaireWin.isOpen = function () {
        if (GameServer.serverOpenDay < 7) {
            return false;
        }
        return true;
    };
    MillionaireWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var open = MillionaireWin.isOpen();
        if (!open)
            UserTips.ins().showTips("\u5F00\u670D\u7B2C\u4E8C\u5468\u5F00\u542F");
        return open;
    };
    MillionaireWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.go, this.onClick);
        this.addTouchEvent(this.autoGo, this.onClick);
        this.addTouchEvent(this.arrowleft, this.onClick);
        this.addTouchEvent(this.arrowright, this.onClick);
        this.observe(Millionaire.ins().postMillionaireInfo, this.callbackInfo);
        this.observe(Millionaire.ins().postTurnDice, this.callbackTurnDice);
        this.observe(Millionaire.ins().postRoundReward, this.callbackRoundReward);
        this.observe(Millionaire.ins().postMillionaireUpdate, this.callbackMillionaireUpdate);
        this.touchGroup.touchEnabled = false;
        this.reward.touchEnabled = false;
        this.paycount.touchEnabled = false;
        this.y1.touchEnabled = false;
        this.y2.touchEnabled = false;
        this.touchMoving = false;
        this.dice.visible = false;
        for (var i = 1; i <= 8; i++) {
            this.addTouchEvent(this["box" + i], this.onTab);
        }
        var roundRewards = Object.keys(GlobalConfig.RichManRoundAwardConfig).length;
        MillionaireWin.MaxBoxGroup = Math.floor(roundRewards / 4);
        Millionaire.ins().isAutoGo = false;
        this.startBoxId = 0;
        this.beginPoint = 0;
        this.touchMoving = false;
        this.ewtime = 300;
        this.actCircle = [];
        this.dicenum = 1;
        this.isShowDice = false;
        if (!this.masksp) {
            this.masksp = new egret.Sprite();
            var square = new egret.Shape();
            square.graphics.beginFill(0xffff00);
            square.graphics.drawRect(this.group1.x, this.group1.y, this.group1.width, this.group1.height);
            square.graphics.endFill();
            this.masksp.addChild(square);
            this.reward.addChild(this.masksp);
            this.reward.mask = this.masksp;
        }
        this.init();
        this.millionaireView.open();
        TimerManager.ins().remove(this.updateMillionaire, this);
        TimerManager.ins().doTimer(100, 0, this.updateMillionaire, this);
    };
    MillionaireWin.prototype.updateMillionaire = function () {
        if (this.millionaireView.diceimg) {
            this.dice.visible = true;
            if (this.isShowDice && this.millionaireView.countDown <= GlobalConfig.RichManBaseConfig.diceTime / 2)
                this.dice.source = "richman_dice" + Millionaire.ins().dicePoint;
            else {
                this.dice.source = "richman_dice" + this.dicenum;
                this.dicenum++;
                if (this.dicenum > 6)
                    this.dicenum = 1;
            }
            return;
        }
        this.isShowDice = false;
        this.dice.visible = false;
        this.dicenum = 1;
        if (Millionaire.ins().isAutoGo)
            this.turnDice();
    };
    MillionaireWin.prototype.callbackMillionaireUpdate = function () {
        this.init();
    };
    MillionaireWin.prototype.callbackInfo = function () {
        this.init();
    };
    MillionaireWin.prototype.callbackTurnDice = function () {
        this.isShowDice = true;
        this.init();
    };
    MillionaireWin.prototype.callbackRoundReward = function () {
        UserTips.ins().showTips("|C:0x00ff00&T:\u9886\u53D6\u6210\u529F");
        this.init();
    };
    MillionaireWin.prototype.init = function () {
        this.checkStartIndex();
        this.startBoxId = this.startBoxId ? this.startBoxId : 1;
        this.dicecount.text = Millionaire.ins().dice + "";
        this.count.text = "\u5F53\u524D\u5708\u6570\uFF1A " + (Millionaire.ins().round + 1);
        this.paycount.text = GlobalConfig.RichManBaseConfig.dicePrice + "";
        this.setBoxPos();
    };
    MillionaireWin.prototype.setProgressBar = function () {
        var curRound = Millionaire.ins().round;
        var maxRound = GlobalConfig.RichManRoundAwardConfig[Object.keys(GlobalConfig.RichManRoundAwardConfig).length].round;
        var percent = 0;
        var pos = (this.startBoxId - 1) * 4;
        var num = 100;
        for (var i = pos, idx = 0; i < pos + 4; i++, idx++) {
            var index = i + 1;
            if (!idx) {
                continue;
            }
            if (this["bar" + (idx - 1)] && this["bar" + (idx - 1)].value < 100) {
                this["bar" + idx].value = 0;
                this["bar" + idx].labelFunction = function () {
                    return "";
                };
                continue;
            }
            var cfg = GlobalConfig.RichManRoundAwardConfig[index];
            var precfg = GlobalConfig.RichManRoundAwardConfig[index - 1];
            var needRound = cfg.round - precfg.round;
            var cnRound = curRound - precfg.round;
            cnRound = cnRound > 0 ? cnRound : 0;
            var pcent = cnRound / needRound;
            if (pcent >= 1) {
                percent = num;
            }
            else {
                percent = Math.floor(num * pcent);
            }
            this["bar" + idx].value = percent >= 100 ? 100 : percent;
            this["bar" + idx].labelFunction = function () {
                return "";
            };
        }
    };
    MillionaireWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.go:
                this.turnDice();
                break;
            case this.autoGo:
                Millionaire.ins().isAutoGo = !Millionaire.ins().isAutoGo;
                this.autoGo.label = Millionaire.ins().isAutoGo ? "停止" : "自动掷骰子";
                break;
            case this.arrowleft:
                this.MoveLeft();
                break;
            case this.arrowright:
                this.MoveRight();
                break;
        }
    };
    MillionaireWin.prototype.turnDice = function () {
        var _this = this;
        if (this.millionaireView.effing || this.millionaireView.btnUp)
            return;
        if (Millionaire.ins().dice > 0) {
            Millionaire.ins().sendTurnDice();
            this.millionaireView.btnUp = true;
            if (!Millionaire.ins().isAutoGo)
                this.millionaireView.diceimg = true;
        }
        else {
            if (Millionaire.ins().autoTurnDice) {
                this.cost();
            }
            else {
                if (Millionaire.ins().isAutoGo) {
                    this.cost();
                    return;
                }
                WarnWin.show("\u662F\u5426\u6D88\u8D39" + GlobalConfig.RichManBaseConfig.dicePrice + "\u5143\u5B9D\u6295\u63B7\u4E00\u6B21?", function () {
                    _this.cost();
                }, this, function () {
                    SysSetting.ins().setBool(SysSetting.DICE, false);
                    Millionaire.ins().autoTurnDice = 0;
                }, this, "check");
            }
        }
    };
    MillionaireWin.prototype.cost = function () {
        if (Actor.yb >= GlobalConfig.RichManBaseConfig.dicePrice) {
            Millionaire.ins().sendTurnDice();
            this.millionaireView.btnUp = true;
            if (!Millionaire.ins().isAutoGo)
                this.millionaireView.diceimg = true;
            this.flyRMB(GlobalConfig.RichManBaseConfig.dicePrice);
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
            Millionaire.ins().isAutoGo = false;
            this.millionaireView.btnUp = false;
            this.autoGo.label = "自动掷骰子";
        }
    };
    MillionaireWin.prototype.onTab = function (e) {
        for (var i = 1; i <= 8; i++) {
            if (e.currentTarget == this["box" + i]) {
                this.getReward(i);
                break;
            }
        }
    };
    MillionaireWin.prototype.getReward = function (i) {
        ViewManager.ins().open(MillionaireTipsWin, i);
    };
    MillionaireWin.prototype.onBegin = function (e) {
        if (this.touchMoving)
            return;
        this.beginPoint = e.stageX;
    };
    MillionaireWin.prototype.onEnd = function (e) {
        if (this.touchMoving)
            return;
        if (this.beginPoint == 0)
            return;
        var offset = e.stageX - this.beginPoint;
        if (Math.abs(offset) < 5) {
            return;
        }
        this.Moving(offset);
    };
    MillionaireWin.prototype.Moving = function (offset) {
        if (offset < 0) {
            this.MoveRight();
        }
        else {
            this.MoveLeft();
        }
    };
    MillionaireWin.prototype.MoveRight = function () {
        var _this = this;
        this.touchMoving = true;
        var self = this;
        if (this.startBoxId >= MillionaireWin.MaxBoxGroup) {
            this.touchMoving = false;
            this.arrowright.visible = false;
            this.arrowleft.visible = !this.arrowright.visible;
            return;
        }
        this.startBoxId++;
        if (this.startBoxId >= MillionaireWin.MaxBoxGroup) {
            this.startBoxId = MillionaireWin.MaxBoxGroup;
            this.arrowright.visible = false;
            this.arrowleft.visible = !this.arrowright.visible;
        }
        var _loop_1 = function (i) {
            egret.Tween.get(this_1["group" + i]).to({ x: this_1["group" + i].x - this_1["group" + i].width }, this_1.ewtime).call(function () {
                egret.Tween.removeTweens(self["group" + i]);
                if (i == MillionaireWin.MaxBoxGroup) {
                    self.setBoxPos();
                    self.touchMoving = false;
                    _this.arrowleft.visible = true;
                }
            });
        };
        var this_1 = this;
        for (var i = 1; i <= MillionaireWin.MaxBoxGroup; i++) {
            _loop_1(i);
        }
    };
    MillionaireWin.prototype.MoveLeft = function () {
        var _this = this;
        this.touchMoving = true;
        var self = this;
        if (this.startBoxId <= 1) {
            this.touchMoving = false;
            this.arrowleft.visible = false;
            this.arrowright.visible = !this.arrowleft.visible;
            var roundRewards = Object.keys(GlobalConfig.RichManRoundAwardConfig).length;
            if (Math.floor(roundRewards / 4) == 1) {
                this.arrowright.visible = false;
            }
            return;
        }
        this.startBoxId--;
        if (this.startBoxId <= 1) {
            this.startBoxId = 1;
            this.arrowleft.visible = false;
            this.arrowright.visible = !this.arrowleft.visible;
            var roundRewards = Object.keys(GlobalConfig.RichManRoundAwardConfig).length;
            if (Math.floor(roundRewards / 4) == 1) {
                this.arrowright.visible = false;
            }
        }
        var _loop_2 = function (i) {
            egret.Tween.get(this_2["group" + i]).to({ x: this_2["group" + i].x + this_2["group" + i].width }, this_2.ewtime).call(function () {
                egret.Tween.removeTweens(self["group" + i]);
                if (i == MillionaireWin.MaxBoxGroup) {
                    self.setBoxPos();
                    self.touchMoving = false;
                    _this.arrowright.visible = true;
                }
            });
        };
        var this_2 = this;
        for (var i = 1; i <= MillionaireWin.MaxBoxGroup; i++) {
            _loop_2(i);
        }
    };
    MillionaireWin.prototype.setBoxPos = function () {
        for (var i = 1; i <= MillionaireWin.MaxBoxGroup; i++) {
            if (i == 1) {
                this["group" + i].x = 48;
                continue;
            }
            var dix = i - this.startBoxId;
            this["group" + i].x = this["group" + (i - 1)].x + this["group" + i].width * dix;
        }
        for (var i = 1; i <= MillionaireWin.MaxBoxGroup; i++) {
            if (i == this.startBoxId) {
                this["group" + i].x = 48;
            }
            else if (i < this.startBoxId) {
                var dix = this.startBoxId - i;
                var index = i - 1 > 0 ? i - 1 : 1;
                this["group" + i].x = this["group" + index].x - this["group" + i].width * dix;
            }
            else {
                var dix = i - this.startBoxId;
                this["group" + i].x = this["group" + (i - 1)].x + this["group" + i].width * dix;
            }
        }
        this.updateRewardUI();
    };
    MillionaireWin.prototype.updateRewardUI = function () {
        var pos = (this.startBoxId - 1) * 4;
        var idx = 0;
        for (var i = pos; i < pos + 4; i++) {
            var index = i + 1;
            if (Millionaire.ins().roundReward >> index & 1) {
                this["box" + idx + "desc"].textFlow = TextFlowMaker.generateTextFlow1("|C:0x35E62D&T:\u5DF2\u9886\u53D6");
                this.clearEff(idx);
            }
            else {
                var round = GlobalConfig.RichManRoundAwardConfig[index].round;
                this["box" + idx + "desc"].textFlow = TextFlowMaker.generateTextFlow1("|C:0xD1C28F&T:\u7B2C" + round + "\u5708");
                this.updateEff(idx, round);
            }
            idx++;
        }
        this.setProgressBar();
    };
    MillionaireWin.prototype.updateEff = function (idx, round) {
        if (Millionaire.ins().round >= round) {
            if (!this.actCircle[idx])
                this.actCircle[idx] = new MovieClip;
            if (!this.actCircle[idx].parent)
                this.reward.addChild(this.actCircle[idx]);
            this.actCircle[idx].x = this["box" + idx + "under"].x + 40;
            this.actCircle[idx].y = this["box" + idx + "under"].y + 50;
            this.actCircle[idx].playFile(RES_DIR_EFF + "actIconCircle", -1);
        }
        else {
            DisplayUtils.removeFromParent(this.actCircle[idx]);
        }
    };
    MillionaireWin.prototype.clearEff = function (idx) {
        DisplayUtils.removeFromParent(this.actCircle[idx]);
    };
    MillionaireWin.prototype.checkStartIndex = function () {
        for (var i = 1; i <= Object.keys(GlobalConfig.RichManRoundAwardConfig).length; i++) {
            var cfg = GlobalConfig.RichManRoundAwardConfig[i];
            if (cfg) {
                if (Millionaire.ins().roundReward >> i & 1) {
                }
                else {
                    this.startBoxId = Math.floor(i / 5) + 1;
                    break;
                }
            }
        }
        if (this.startBoxId <= 1) {
            this.arrowleft.visible = false;
            this.arrowright.visible = !this.arrowleft.visible;
            var roundRewards = Object.keys(GlobalConfig.RichManRoundAwardConfig).length;
            if (Math.floor(roundRewards / 4) == 1) {
                this.arrowright.visible = false;
            }
        }
        else if (this.startBoxId >= MillionaireWin.MaxBoxGroup) {
            this.arrowleft.visible = true;
            this.arrowright.visible = !this.arrowleft.visible;
        }
        else {
            this.arrowleft.visible = true;
            this.arrowright.visible = true;
        }
    };
    MillionaireWin.prototype.flyRMB = function (rmb) {
        var obj = new eui.BitmapLabel();
        obj.font = 'num_2_fnt';
        obj.y = this.roleSelect.y + 10;
        obj.x = this.roleSelect.x + 490;
        obj.scaleX = obj.scaleY = 1.5;
        obj.text = "-" + rmb;
        this.roleSelect.parent.addChild(obj);
        egret.Tween.get(obj).to({ y: obj.y + 50 }, 1000).call(function () {
            DisplayUtils.removeFromParent(obj);
        });
    };
    MillionaireWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.go, this.onClick);
        this.removeTouchEvent(this.autoGo, this.onClick);
        this.millionaireView.close();
        for (var i = 1; i <= 8; i++) {
            this.removeTouchEvent(this["box" + i], this.onTab);
        }
        TimerManager.ins().remove(this.updateMillionaire, this);
        for (var i = 0; i < this.actCircle.length; i++) {
            if (this.actCircle[i])
                DisplayUtils.removeFromParent(this.actCircle[i]);
        }
        DisplayUtils.removeFromParent(this.masksp);
        this.masksp = null;
        this.removeObserve();
    };
    MillionaireWin.MaxBoxGroup = 2;
    return MillionaireWin;
}(BaseEuiView));
__reflect(MillionaireWin.prototype, "MillionaireWin");
ViewManager.ins().reg(MillionaireWin, LayerManager.UI_Main);
//# sourceMappingURL=MillionaireWin.js.map