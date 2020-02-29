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
var NewWorldBossWin = (function (_super) {
    __extends(NewWorldBossWin, _super);
    function NewWorldBossWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "wpkBossSkin";
        return _this;
    }
    NewWorldBossWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.bossImage = new MovieClip;
        this.bossImage.scaleX = -1;
        this.bossImage.scaleY = 1;
        this.bossImage.x = 0;
        this.bossImage.y = 215;
        this.boss.addChild(this.bossImage);
        this.list.itemRenderer = ItemBaseNoName;
        UserBoss.ins().sendGetNewBossInfo();
    };
    NewWorldBossWin.prototype.open = function () {
        this.observe(UserBoss.ins().postNewBossInfo, this.update);
        this.addTouchEvent(this.enter, this.onTap);
        this.addTouchEvent(this.help, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.update();
    };
    NewWorldBossWin.prototype.update = function () {
        var id = UserBoss.ins().newWorldBossData.bossID;
        var config = GlobalConfig.MonstersConfig[id];
        if (!config)
            return;
        this.nameTxt.text = config.name + "(" + config.level + ")";
        this.bossImage.playFile(RES_DIR_MONSTER + ("monster" + config.avatar + "_3s"), -1);
        this.list.dataProvider = new eui.ArrayCollection(GlobalConfig.NewWorldBossBaseConfig.showAwards);
        this.bar.maximum = config.hp;
        this.bar.value = UserBoss.ins().newWorldBossData.curHp;
    };
    NewWorldBossWin.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        if (tar == this.enter) {
            if (UserBoss.ins().newWorldBossData.startTime > GameServer.serverTime) {
                var date = new Date(UserBoss.ins().newWorldBossData.startTime);
                var time = date.getHours() + "\u70B9" + (date.getMinutes() ? date.getMinutes() + "分" : "");
                UserTips.ins().showTips("\u6BCF\u5929" + time + "\u5F00\u542F\uFF0C\u8BF7\u6309\u65F6\u53C2\u52A0");
                return;
            }
            if (!UserBoss.ins().checkNewWorldBossOpen()) {
                UserTips.ins().showTips(GlobalConfig.NewWorldBossBaseConfig.openLv + "\u7EA7\u624D\u53EF\u4EE5\u53C2\u52A0");
                return;
            }
            UserBoss.ins().sendIntoNewBoss();
            ViewManager.ins().close(this);
        }
        else if (tar == this.help) {
            ViewManager.ins().open(ZsBossRuleSpeak, 15);
        }
        else if (tar == this.bgClose) {
            ViewManager.ins().close(this);
        }
    };
    NewWorldBossWin.prototype.close = function () {
    };
    return NewWorldBossWin;
}(BaseEuiView));
__reflect(NewWorldBossWin.prototype, "NewWorldBossWin");
ViewManager.ins().reg(NewWorldBossWin, LayerManager.UI_Popup);
//# sourceMappingURL=NewWorldBossWin.js.map