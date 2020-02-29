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
var GuanQiaWordMapWin = (function (_super) {
    __extends(GuanQiaWordMapWin, _super);
    function GuanQiaWordMapWin() {
        var _this = _super.call(this) || this;
        _this.rewardItemChapter = -1;
        _this.pass = 0;
        _this.isTopLevel = true;
        return _this;
    }
    GuanQiaWordMapWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "CheckInfoSkin";
        this.bg.source = "chapterworld_jpg";
        this.mapGroup = new eui.Group;
        this.map.addChild(this.mapGroup);
        this.mapItemArr = [];
        this.bigMapGroup = new eui.Group;
        this.map.addChild(this.bigMapGroup);
        this.bigMapItemArr = [];
        this.initBigMapItem();
        this.changeMap(MapType.chapterMap, -1);
    };
    GuanQiaWordMapWin.prototype.changeMap = function (type, id) {
        if (id === void 0) { id = -1; }
        if (this.type == type)
            return;
        switch (type) {
            case MapType.bigMap:
                this.map.removeChild(this.mapGroup);
                this.map.addChild(this.bigMapGroup);
                this.bg.source = "bigworld_jpg";
                this.backtobig.visible = false;
                var allcfg = GlobalConfig.AllWorldConfig[UserFb.ins().groupID];
                var offX = allcfg.position.x + 80 - this.mapScroller.width / 2;
                var offY = allcfg.position.y + 80 - this.mapScroller.height / 2;
                if ((offX + this.map.width) >= 960) {
                    offX = 960 - this.map.width;
                }
                if ((offY + this.map.height) >= 1010) {
                    offY = 1010 - this.map.height;
                }
                this.map.scrollH = offX > 0 ? offX : 0;
                this.map.scrollV = offY > 0 ? offY : 0;
                this.rewordBtnGroup.x = 490;
                break;
            default:
                this.map.removeChild(this.bigMapGroup);
                this.map.addChild(this.mapGroup);
                this.bg.source = "chapterworld_jpg";
                this.backtobig.visible = true;
                this.initMapItem(id);
                var offsetY = 0;
                var mHeight = 745;
                if (this.rewardItemChapter != -1) {
                    var posY = GlobalConfig.WorldRewardConfig[this.rewardItemChapter].position.y;
                    offsetY = posY - 450 + 75;
                }
                else {
                    offsetY = 860 - mHeight;
                }
                if ((offsetY + mHeight) > 860) {
                    offsetY = 860 - mHeight;
                }
                this.map.scrollV = offsetY > 0 ? offsetY : 0;
                this.map.scrollH = 0;
                this.rewordBtnGroup.x = 410;
                break;
        }
        this.type = type;
    };
    GuanQiaWordMapWin.prototype.initBigMapItem = function () {
        this.bigMapItemArr = [];
        var config = GlobalConfig.AllWorldConfig;
        for (var k in config) {
            var panel = new GuanQiaWorldBigMapItem();
            panel.x = config[k].position.x;
            panel.y = config[k].position.y;
            panel.update(config[k].id);
            this.bigMapGroup.addChild(panel);
            this.bigMapItemArr.push(panel);
        }
    };
    GuanQiaWordMapWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.addTouchEvent(this.getRewordBtn, this.onTap);
        this.addTouchEvent(this.backtobig, this.onClick);
        this.observe(UserFb.ins().postGuanqiaWroldReward, this.upDateItemGroup);
        this.upDateItemGroup();
    };
    GuanQiaWordMapWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.close.call(this, param);
        while (this.bigMapItemArr.length != 0) {
            var panel = this.bigMapItemArr.pop();
            panel.close();
        }
        this.clearMapItem();
    };
    GuanQiaWordMapWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.backtobig:
                this.changeMap(MapType.bigMap);
                break;
        }
    };
    GuanQiaWordMapWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.getRewordBtn:
                if (UserBag.ins().getSurplusCount() >= 4)
                    UserFb.ins().sendGetAward();
                else
                    UserTips.ins().showTips("|C:0xf3311e&T:背包已满，请清理背包|");
                break;
        }
    };
    GuanQiaWordMapWin.prototype.clearMapItem = function () {
        while (this.mapItemArr.length != 0) {
            var panel = this.mapItemArr.pop();
            this.mapGroup.removeChild(panel);
            panel.close();
        }
        this.rewardItemChapter = -1;
    };
    GuanQiaWordMapWin.prototype.initMapItem = function (groupId) {
        if (groupId === void 0) { groupId = -1; }
        this.clearMapItem();
        var chapterId = -1;
        if (groupId == -1) {
            var config = GlobalConfig.WorldRewardConfig;
            for (var k in config) {
                if (UserFb.ins().guanqiaID > config[k].needLevel && !UserFb.ins().isGetReceiveBox(config[k].id)) {
                    groupId = config[k].groupId;
                    chapterId = config[k].id;
                    break;
                }
            }
            if (groupId == -1)
                groupId = UserFb.ins().groupID;
        }
        var groups = GlobalConfig.AllWorldConfig[groupId].mapGroup;
        this.WorldMapItem = [];
        for (var i = 0; i < groups.length; i++) {
            this.WorldMapItem.push(GlobalConfig.WorldRewardConfig[groups[i]]);
        }
        for (var k in this.WorldMapItem) {
            var panel = new GuanQiaWorldMapItem();
            panel.x = this.WorldMapItem[k].position.x;
            panel.y = this.WorldMapItem[k].position.y;
            panel.chapter = this.WorldMapItem[k].id;
            this.mapGroup.addChild(panel);
            this.mapItemArr.push(panel);
            if (panel.rewardChapter != -1)
                this.rewardItemChapter = panel.rewardChapter;
        }
    };
    GuanQiaWordMapWin.prototype.upDateItemGroup = function () {
        this.pass = UserFb.ins().getWorldGuanQiaBox();
        var config = GlobalConfig.ChaptersRewardConfig[UserFb.ins().guanqiaReward];
        var guanqiaID = UserFb.ins().guanqiaID;
        var preConfig = GlobalConfig.ChaptersRewardConfig[UserFb.ins().guanqiaReward - 1];
        var needLevel = preConfig ? config.needLevel - preConfig.needLevel : config.needLevel;
        var curLevel = UserFb.ins().guanqiaID - (preConfig ? preConfig.needLevel : 0) - 1;
        var state = curLevel >= needLevel;
        this.rewordBtnGroup.visible = state;
        this.getRewordBtn.enabled = state;
        this.goldTxt2.text = UserFb.ins().goldEff + "/小时";
        this.expTxt2.text = UserFb.ins().expEff + "/小时";
        this.goldTxt0.text = "";
        this.expTxt0.text = "";
    };
    return GuanQiaWordMapWin;
}(BaseEuiView));
__reflect(GuanQiaWordMapWin.prototype, "GuanQiaWordMapWin");
ViewManager.ins().reg(GuanQiaWordMapWin, LayerManager.UI_Main);
//# sourceMappingURL=GuanQiaWordMapWin.js.map