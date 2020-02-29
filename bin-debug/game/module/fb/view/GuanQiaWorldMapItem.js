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
var GuanQiaWorldMapItem = (function (_super) {
    __extends(GuanQiaWorldMapItem, _super);
    function GuanQiaWorldMapItem() {
        var _this = _super.call(this) || this;
        _this.chapter = 0;
        _this.rewardChapter = -1;
        _this.skinName = "CheckMapItemSkin";
        _this.observe(UserFb.ins().postZhangJieAwardChange, _this.reflashChapter);
        _this.observe(UserFb.ins().postGuanqiaWroldReward, _this.reflashChapter);
        _this.addTouchEvent(_this, _this.onClick);
        _this.mc = new MovieClip();
        _this.mc.x = _this.mc.y = 32;
        _this.mc.scaleX = 0.45;
        _this.mc.scaleY = 1.2;
        _this.rewardGroup.addChild(_this.mc);
        return _this;
    }
    GuanQiaWorldMapItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reflashChapter();
    };
    GuanQiaWorldMapItem.prototype.close = function () {
        this.removeObserve();
        this.removeTouchEvent(this, this.onClick);
        egret.Tween.removeTweens(this.rewardGroup);
    };
    GuanQiaWorldMapItem.prototype.onClick = function (e) {
        var config = GlobalConfig.WorldRewardConfig[this.chapter];
        if (UserFb.ins().guanqiaID > config.needLevel)
            UserFb.ins().sendGuanqiaWroldReward(this.chapter);
        else if (!UserFb.ins().isGetReceiveBox(this.chapter))
            UserTips.ins().showTips("\u8FD8\u9700\u8981" + (config.needLevel - UserFb.ins().guanqiaID + 1) + "\u5173\u53EF\u9886\u53D6");
    };
    GuanQiaWorldMapItem.prototype.reflashChapter = function () {
        this.update(this.chapter);
    };
    GuanQiaWorldMapItem.prototype.update = function (chapter) {
        this.chapter = chapter;
        this.rewardChapter = -1;
        var config = GlobalConfig.WorldRewardConfig[chapter];
        var lastConfig = GlobalConfig.WorldRewardConfig[chapter - 1];
        this.itemIcon.setData(GlobalConfig.ItemConfig[config.rewards[0].id]);
        var laseLevel = 1;
        if (lastConfig) {
            laseLevel = lastConfig.needLevel + 1;
        }
        this.nameTxt.text = config ? config.id + "." + config.name : "";
        this.chapterCount.text = laseLevel + "-" + config.needLevel + "\u5173";
        if (UserFb.ins().guanqiaID <= config.needLevel && UserFb.ins().guanqiaID >= laseLevel) {
            this.box.source = config.icon + "c";
        }
        else {
            this.box.source = config.icon;
        }
        var lastChapter = 0;
        lastChapter = laseLevel - UserFb.ins().guanqiaID;
        this.passImg.visible = false;
        var groupY = this.rewardGroup.y;
        var offY = groupY - 10;
        egret.Tween.removeTweens(this.rewardGroup);
        if (UserFb.ins().guanqiaID > config.needLevel) {
            if (UserFb.ins().isGetReceiveBox(chapter)) {
                this.mc.visible = false;
                this.mc.stop();
                this.rewardGroup.visible = false;
                this.passImg.visible = true;
            }
            else {
                this.rewardGroup.visible = true;
                this.mc.visible = true;
                this.rewardChapter = chapter;
                this.mc.playFile(RES_DIR_EFF + "chargeff1", -1);
                egret.Tween.get(this.rewardGroup, { loop: true }).to({ y: offY }, 1000).to({ y: groupY }, 1000);
            }
        }
        else {
            this.rewardGroup.visible = (UserFb.ins().guanqiaID <= config.needLevel && UserFb.ins().guanqiaID >= laseLevel);
            this.mc.visible = false;
            this.mc.stop();
        }
    };
    return GuanQiaWorldMapItem;
}(BaseView));
__reflect(GuanQiaWorldMapItem.prototype, "GuanQiaWorldMapItem");
//# sourceMappingURL=GuanQiaWorldMapItem.js.map