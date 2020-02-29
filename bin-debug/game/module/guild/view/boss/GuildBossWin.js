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
var GuildBossWin = (function (_super) {
    __extends(GuildBossWin, _super);
    function GuildBossWin() {
        var _this = _super.call(this) || this;
        _this.bossLen = 0;
        _this.itemLen = 6;
        _this.arrCount = 0;
        _this.currentArr = [];
        _this.currentIndex = 0;
        return _this;
    }
    GuildBossWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.skinName = "guildBossSkin";
        this.itemArr = [];
        for (var i = 0; i < 6; i++) {
            this.itemArr.push(this["bossItem" + i]);
        }
        this.bossLen = CommonUtils.getObjectLength(GlobalConfig.GuildBossInfoConfig);
        this.arrCount = 0;
        this.bossArr = [];
        for (var j = 0; j < this.bossLen; j++) {
            if (!this.bossArr[this.arrCount])
                this.bossArr[this.arrCount] = [];
            if (j < (this.arrCount + 1) * this.itemLen) {
                this.bossArr[this.arrCount].push(j);
            }
            else if (j == (this.arrCount + 1) * this.itemLen) {
                this.arrCount++;
                this.bossArr[this.arrCount] = [];
                this.bossArr[this.arrCount].push(j);
            }
        }
    };
    GuildBossWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return true;
    };
    GuildBossWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.imgleft, this.onTap);
        this.addTouchEvent(this.imgRight, this.onTap);
        for (var i = 0; i < this.itemLen; i++) {
            this.addTouchEvent(this.itemArr[i], this.onItemTap);
        }
        this.observe(GuildBoss.ins().postGuildBossDetailChange, this.setView);
        this.observe(GuildBoss.ins().postGuildBossInfoChange, this.setView);
        this.observe(GuildBoss.ins().postChallengeSuccess, this.challengeSuccess);
        this.currentIndex = this.getRuleIndex();
        GuildBoss.ins().sendGetBossInfo();
    };
    GuildBossWin.prototype.getRuleIndex = function () {
        var maxLen = Object.keys(GlobalConfig.GuildBossInfoConfig).length;
        var passId = GuildBoss.ins().passId;
        if (passId >= maxLen) {
            passId -= 1;
        }
        return Math.floor(passId / this.itemLen);
    };
    GuildBossWin.prototype.setView = function () {
        var index = GuildBoss.ins().passId + 1;
        var maxLen = Object.keys(GlobalConfig.GuildBossInfoConfig).length;
        index = index >= maxLen ? maxLen : index;
        this.currentArr = this.bossArr[this.currentIndex];
        var cfg = GlobalConfig.GuildBossInfoConfig[index];
        this.fightboss.source = cfg.ShowImg;
        for (var i = 0; i < this.itemLen; i++) {
            if (this.currentArr[i] != null) {
                this.itemArr[i].data = this.currentArr[i];
                this.itemArr[i].visible = true;
            }
            else {
                this.itemArr[i].visible = false;
            }
        }
        this.selfname.text = Guild.ins().guildName;
        this.enemyname.text = GuildBoss.ins().otherGuildName;
        var maxBoss = CommonUtils.getObjectLength(GlobalConfig.GuildBossInfoConfig);
        var id = GuildBoss.ins().passId + 1 > maxBoss ? maxBoss : GuildBoss.ins().passId + 1;
        var config = GlobalConfig.GuildBossInfoConfig[id];
        var bossConfig = GlobalConfig.MonstersConfig[config.boss["monId"]];
        var selfValue = 0;
        var emityValue = 0;
        selfValue = Math.ceil(((bossConfig.hp - GuildBoss.ins().bossHP) / bossConfig.hp) * 10000) / 100;
        this.sbhpbar.value = selfValue;
        this.sbhpbar.maximum = 100;
        this.ebhpbar.value = emityValue;
        this.ebhpbar.maximum = 100;
        this.state.visible = !GuildBoss.ins().isOpen();
        if (!this.currentIndex) {
            this.imgleft.visible = false;
            this.imgRight.visible = true;
        }
        else if (this.currentIndex == this.arrCount) {
            this.imgleft.visible = true;
            this.imgRight.visible = false;
        }
        else {
            this.imgleft.visible = true;
            this.imgRight.visible = true;
        }
    };
    GuildBossWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(GuildBossWin);
                break;
            case this.imgleft:
                this.currentIndex--;
                if (this.currentIndex <= 0) {
                    this.imgleft.visible = false;
                }
                this.setView();
                this.imgRight.visible = true;
                break;
            case this.imgRight:
                this.currentIndex++;
                if (this.currentIndex >= this.arrCount) {
                    this.imgRight.visible = false;
                }
                this.setView();
                this.imgleft.visible = true;
                break;
        }
    };
    GuildBossWin.prototype.onItemTap = function (e) {
        ViewManager.ins().open(GuildBossDetailWin, e.currentTarget.data);
    };
    GuildBossWin.prototype.challengeSuccess = function () {
        ViewManager.ins().close(GuildBossWin);
        ViewManager.ins().close(GuildMap);
    };
    return GuildBossWin;
}(BaseEuiView));
__reflect(GuildBossWin.prototype, "GuildBossWin");
ViewManager.ins().reg(GuildBossWin, LayerManager.UI_Popup);
//# sourceMappingURL=GuildBossWin.js.map