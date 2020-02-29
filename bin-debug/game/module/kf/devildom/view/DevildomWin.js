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
var DevildomWin = (function (_super) {
    __extends(DevildomWin, _super);
    function DevildomWin() {
        var _this = _super.call(this) || this;
        _this.MAX_LEN = 4;
        _this.TAB_W = 92;
        _this.isTopLevel = true;
        _this.skinName = "KFInvasionSkin";
        return _this;
    }
    DevildomWin.prototype.initUI = function () {
        var tabLen = Object.keys(GlobalConfig.DevilBossConfig).length;
        this.leftGroup.visible = tabLen > this.MAX_LEN;
        this.rightGroup.visible = tabLen > this.MAX_LEN;
        this.refreshTime.text = GlobalConfig.DevilBossBase.startTime[0] + ":" + GlobalConfig.DevilBossBase.startTime[1];
        this.bossBody = new MovieClip();
        this.bossBody.x = 0;
        this.bossBody.y = 0;
        this.bossGroup.addChild(this.bossBody);
        this.menuList.itemRenderer = DevildomBossTab;
        this.menuData = new eui.ArrayCollection();
        this.menuList.dataProvider = this.menuData;
    };
    DevildomWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTouch);
        this.addTouchEvent(this.seeRule, this.onTouch);
        this.addTouchEvent(this.challengeBtn, this.onTouch);
        this.addTouchEvent(this.belongBtn, this.onTouch);
        this.addTouchEvent(this.partBtn, this.onTouch);
        this.addTouchEvent(this.leftBtn, this.onTouch);
        this.addTouchEvent(this.rightBtn, this.onTouch);
        this.addChangeEvent(this.menuList, this.onChoose);
        this.addEvent(eui.UIEvent.CHANGE_END, this.menuScroller, this.onChange);
        this.observe(DevildomSys.ins().postBossInfo, this.initData);
        this.dataSys = DevildomSys.ins();
        var curIndex = !isNaN(param[0]) ? param[0] : 0;
        this.menuList.selectedIndex = curIndex;
        this.selectBoss(curIndex);
    };
    DevildomWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    DevildomWin.prototype.initData = function () {
        this.menuData.replaceAll(CommonUtils.objectToArray(GlobalConfig.DevilBossConfig));
    };
    DevildomWin.prototype.onChange = function () {
        if (this.menuList.scrollH < 20) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = true;
        }
        else if (this.menuList.scrollH > (this.menuList.dataProvider.length - this.MAX_LEN) * 88 + 2) {
            this.leftBtn.visible = true;
            this.rightBtn.visible = false;
        }
        else {
            this.leftBtn.visible = true;
            this.rightBtn.visible = true;
        }
        if (this.menuList.dataProvider.length <= 5) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = false;
        }
    };
    DevildomWin.prototype.onTouch = function (e) {
        var _this = this;
        switch (e.target) {
            case this.seeRule:
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[38].text);
                break;
            case this.challengeBtn:
                var cd = (this.dataSys.enterCD - egret.getTimer()) / 1000 >> 0;
                if (cd > 0) {
                    UserTips.ins().showTips("|C:0xf3311e&T:" + cd + "\u79D2\u540E\u53EF\u4EE5\u8FDB\u5165\uFF01");
                    return;
                }
                var dp = GlobalConfig.DevilBossConfig[this.menuList.selectedItem.id];
                var zsLv = dp.levelLimit / 1000 >> 0;
                if (zsLv > UserZs.ins().lv) {
                    UserTips.ins().showTips("|C:0xf3311e&T:\u8F6C\u751F\u7B49\u7EA7\u5230\u8FBE" + zsLv + "\u7EA7\u53EF\u8FDB\u53BB\uFF01");
                    return;
                }
                var lv = dp.levelLimit % 1000;
                if (lv > Actor.level) {
                    UserTips.ins().showTips("|C:0xf3311e&T:\u4EBA\u7269\u7B49\u7EA7\u5230\u8FBE" + lv + "\u7EA7\u53EF\u8FDB\u53BB\uFF01");
                    return;
                }
                if (!DevildomSys.ins().historyId) {
                    WarnWin.show("\u9B54\u541B\u5237\u65B0\u540E\uFF0C\u53EA\u53EF\u8FDB\u5165\u5176\u4E2D\u4E00\u4F4D\u9B54\u541B\u7684\u5730\u56FE\u4E14\u4E0D\u53EF\u6539\u53D8\uFF0C\u662F\u5426\u8FDB\u5165\uFF1F", function () {
                        _this.dataSys.sendEnter(_this.menuList.selectedItem.id);
                    }, this);
                }
                else {
                    if (DevildomSys.ins().historyId != this.menuList.selectedItem.id) {
                        UserTips.ins().showTips("|C:0xf3311e&T:\u60A8\u5DF2\u8FDB\u5165" + GlobalConfig.DevilBossConfig[DevildomSys.ins().historyId].bossName + "\u5730\u56FE\uFF0C\u65E0\u6CD5\u518D\u8FDB\u5165\u6B64\u9B54\u541B\u5730\u56FE\uFF01");
                        return;
                    }
                    DevildomSys.ins().sendEnter(this.menuList.selectedItem.id);
                }
                break;
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.belongBtn:
                ViewManager.ins().open(DevildomBelongAwardWin);
                break;
            case this.partBtn:
                ViewManager.ins().open(DevildomPartAwardWin);
                break;
            case this.leftBtn:
                var num = this.TAB_W * this.MAX_LEN;
                var scrollH = this.menuList.scrollH - num;
                scrollH = Math.round(scrollH / this.TAB_W) * this.TAB_W;
                if (scrollH < 0) {
                    scrollH = 0;
                }
                this.menuList.scrollH = scrollH;
                break;
            case this.rightBtn:
                num = this.TAB_W * this.MAX_LEN;
                scrollH = this.menuList.scrollH + num;
                scrollH = Math.round(scrollH / this.TAB_W) * this.TAB_W;
                if (scrollH > this.menuList.contentWidth - this.menuScroller.width) {
                    scrollH = this.menuList.contentWidth - this.menuScroller.width;
                }
                this.menuList.scrollH = scrollH;
                break;
        }
    };
    DevildomWin.prototype.onChoose = function (e) {
        this.selectBoss(this.menuList.selectedIndex);
    };
    DevildomWin.prototype.selectBoss = function (index) {
        var curId = this.menuList.selectedItem.id;
        var id = DevildomBossModel.ins().getCurBossIdByIndex(curId);
        var bossDp = GlobalConfig.MonstersConfig[id];
        var showBody = "monster" + bossDp.avatar + "_3s";
        this.bossBody.playFile(RES_DIR_MONSTER + showBody, -1);
        this.bossName.source = "invasion_boss_name" + index;
        this.challengeBtn.enabled = this.dataSys.killedState.length > 0 && !this.dataSys.killedState[curId];
    };
    DevildomWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var boo = DevildomSys.ins().isOpen();
        if (!GameServer.isOpenLF) {
            UserTips.ins().showTips("|C:0xf3311e&T:\u5F00\u542F\u8DE8\u670D\u540E\u53EF\u53C2\u4E0E\u9B54\u754C\u5165\u4FB5\u73A9\u6CD5");
        }
        else if (!DevildomSys.ins().isHfTerm()) {
            UserTips.ins().showTips("|C:0xf3311e&T:\u5408\u670D\u671F\u95F4\u4E0D\u53EF\u8FDB\u5165");
        }
        else if (GameServer.serverOpenDay + 1 < GlobalConfig.DevilBossBase.openDay) {
            UserTips.ins().showTips("|C:0xf3311e&T:\u5F00\u670D" + GlobalConfig.DevilBossBase.openDay + "\u5929\u540E\u53EF\u53C2\u4E0E\u9B54\u754C\u5165\u4FB5\u73A9\u6CD5");
        }
        return boo;
    };
    return DevildomWin;
}(BaseEuiView));
__reflect(DevildomWin.prototype, "DevildomWin");
ViewManager.ins().reg(DevildomWin, LayerManager.UI_Main);
//# sourceMappingURL=DevildomWin.js.map