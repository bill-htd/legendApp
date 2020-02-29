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
var GuanQiaWorldBigMapItem = (function (_super) {
    __extends(GuanQiaWorldBigMapItem, _super);
    function GuanQiaWorldBigMapItem() {
        var _this = _super.call(this) || this;
        _this.chapterBig = 0;
        _this.skinName = "CheckBigItemSkin";
        _this.observe(UserFb.ins().postZhangJieAwardChange, _this.reflashChapter);
        _this.observe(UserFb.ins().postGuanqiaWroldReward, _this.reflashChapter);
        _this.addTouchEvent(_this, _this.onClick);
        var role = SubRoles.ins().getSubRoleByIndex(0);
        _this.rolelocation.source = "head_" + role.job + role.sex;
        return _this;
    }
    GuanQiaWorldBigMapItem.prototype.onClick = function (e) {
        var win = ViewManager.ins().getView(GuanQiaWordMapWin);
        win.changeMap(MapType.chapterMap, this.chapterBig);
    };
    GuanQiaWorldBigMapItem.prototype.close = function () {
        this.removeObserve();
        this.removeTouchEvent(this, this.onClick);
        egret.Tween.removeTweens(this.roleHeadGroup);
    };
    GuanQiaWorldBigMapItem.prototype.reflashChapter = function () {
        this.update(this.chapterBig);
    };
    GuanQiaWorldBigMapItem.prototype.update = function (chapter) {
        this.chapterBig = chapter;
        var start = 1;
        var last;
        var allcfg = GlobalConfig.AllWorldConfig[chapter];
        var allLastcfg = GlobalConfig.AllWorldConfig[chapter - 1];
        var len = allcfg.mapGroup.length;
        var lastCfg = GlobalConfig.WorldRewardConfig[allcfg.mapGroup[len - 1]];
        var cfg;
        last = lastCfg.needLevel;
        if (allLastcfg) {
            len = allLastcfg.mapGroup.length;
            cfg = GlobalConfig.WorldRewardConfig[allLastcfg.mapGroup[len - 1]];
            start = cfg.needLevel + 1;
        }
        this.nameTxt.text = allcfg ? allcfg.id + "." + allcfg.name : "";
        this.chapterCount.text = start + "-" + last + "\u5173";
        var groupY = this.roleHeadGroup.y;
        var offY = groupY - 10;
        egret.Tween.removeTweens(this.roleHeadGroup);
        if (UserFb.ins().groupID == allcfg.id) {
            this.roleHeadGroup.visible = true;
            egret.Tween.get(this.roleHeadGroup, { loop: true }).to({ y: offY }, 1000).to({ y: groupY }, 1000);
        }
        else {
            this.roleHeadGroup.visible = false;
        }
        var b = false;
        if (UserFb.ins().guanqiaID < start)
            b = false;
        else {
            for (var i = 0; i < allcfg.mapGroup.length; i++) {
                cfg = GlobalConfig.WorldRewardConfig[allcfg.mapGroup[i]];
                if (UserFb.ins().guanqiaID > cfg.needLevel && !UserFb.ins().isGetReceiveBox(allcfg.mapGroup[i])) {
                    b = true;
                    break;
                }
            }
        }
        this.redPointBox.visible = b;
    };
    return GuanQiaWorldBigMapItem;
}(BaseView));
__reflect(GuanQiaWorldBigMapItem.prototype, "GuanQiaWorldBigMapItem");
//# sourceMappingURL=GuanQiaWorldBigMapItem.js.map