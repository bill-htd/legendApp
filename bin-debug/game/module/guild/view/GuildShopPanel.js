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
var GuildShopPanel = (function (_super) {
    __extends(GuildShopPanel, _super);
    function GuildShopPanel() {
        var _this = _super.call(this) || this;
        _this.isOpenEff = false;
        _this.initUI();
        return _this;
    }
    GuildShopPanel.prototype.initUI = function () {
        this.skinName = "GuildStoreWinSkin";
    };
    GuildShopPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.guildshopkaiqi, this.onTap);
        this.addTouchEvent(this.useBtn, this.onTap);
        this.addTouchEvent(this.guildMore, this.onTap);
        GuildStore.ins().getGuildStoreInfo();
        GuildStore.ins().sendGuildStoreBoxInfo();
        this.observe(GuildStore.ins().postGuildStoreInfo, this.onupdateData);
        this.observe(GuildStore.ins().postGuildStoreBox, this.onItemInfo);
        this.observe(GuildStore.ins().postGuildStoreBoxInfo, this.onReadInfo);
        this.onupdateData();
        this.guildshopitem_7.visible = false;
    };
    GuildShopPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.guildshopkaiqi, this.onTap);
        this.removeTouchEvent(this.useBtn, this.onTap);
        this.removeTouchEvent(this.guildMore, this.onTap);
        this.removeObserve();
    };
    GuildShopPanel.prototype.onupdateData = function () {
        if (GuildStore.ins().guildStoreLv > 0) {
            this.guildshopopen.visible = true;
            this.guildshopclose.visible = false;
            this.guildshopclose.touchEnabled = false;
            this.guildshopopen.touchEnabled = true;
            if (GlobalConfig.GuildStoreConfig.needContrib > Guild.ins().myCon)
                this.guildshoplabel.textFlow = new egret.HtmlTextParser().parser(Guild.ins().myCon + "");
            else
                this.guildshoplabel.textFlow = new egret.HtmlTextParser().parser(Guild.ins().myCon + "");
            this.guildshopxiaolabel.text = "" + GlobalConfig.GuildStoreConfig.needContrib;
            var totalNum = GlobalConfig.GuildStoreConfig.time[GuildStore.ins().guildStoreLv - 1];
            var nextTotalNum = GlobalConfig.GuildStoreConfig.time[GuildStore.ins().guildStoreLv];
            var str = "";
            if (GuildStore.ins().guildStoreNum <= 0) {
                str = "<font color='#f3311e'>" + GuildStore.ins().guildStoreNum + "/" + totalNum + "</font>";
            }
            else {
                str = GuildStore.ins().guildStoreNum + "/" + totalNum;
            }
            if (nextTotalNum)
                this.guildshopshengyulabel.textFlow = new egret.HtmlTextParser().parser("本日剩余次数:" + str);
            else
                this.guildshopshengyulabel.textFlow = new egret.HtmlTextParser().parser("本日剩余次数:" + str);
        }
        else {
            this.guildshopopen.visible = false;
            this.guildshopopen.touchEnabled = false;
            this.guildshopclose.touchEnabled = true;
            this.guildshopclose.visible = true;
            this.guildshopkaiqi.textFlow = new egret.HtmlTextParser().parser("<u>前往提升</u>");
        }
        for (var k in GlobalConfig.GuildStoreConfig.item) {
            this["guildshopitem_" + k].data = GlobalConfig.GuildStoreConfig.item[k];
        }
        this.guildMore.textFlow = new egret.HtmlTextParser().parser("<u>更多记录</u>");
    };
    GuildShopPanel.prototype.onReadInfo = function () {
        var arr = GuildStore.ins().getRecordInfoAry();
        if (arr.length > 0) {
            this.record.visible = true;
            var config = GlobalConfig.ItemConfig[arr[0].itemId];
            var q = ItemConfig.getQualityColor(config);
            this.record.textFlow = new egret.HtmlTextParser().parser(arr[0].roleName + " \u83B7\u5F97\u4E86 <font color=" + q + ">" + config.name + "</font>");
            if (arr.length > 1) {
                this.record1.visible = true;
                var config_1 = GlobalConfig.ItemConfig[arr[1].itemId];
                this.record1.textFlow = new egret.HtmlTextParser().parser(arr[1].roleName + " \u83B7\u5F97\u4E86 <font color=" + q + ">" + config_1.name + "</font>");
            }
            if (arr.length > 2) {
                this.record2.visible = true;
                var config_2 = GlobalConfig.ItemConfig[arr[2].itemId];
                this.record2.textFlow = new egret.HtmlTextParser().parser(arr[2].roleName + " \u83B7\u5F97\u4E86 <font color=" + q + ">" + config_2.name + "</font>");
            }
        }
        else {
            this.record.visible = false;
            this.record1.visible = false;
            this.record2.visible = false;
        }
    };
    GuildShopPanel.prototype.onItemInfo = function () {
        this.guildshopitem_7.visible = true;
        var guildStoreItemData = GuildStore.ins().getGuildStoreItemData(0);
        this.guildshopitem_7.num = guildStoreItemData.num;
        this.guildshopitem_7.data = guildStoreItemData.itemId;
        this.onupdateData();
    };
    GuildShopPanel.prototype.startEff = function () {
        var _this = this;
        this.guildshopitem_7.visible = false;
        this.isOpenEff = true;
        this.openBoxEff = new MovieClip;
        this.openBoxEff.x = 232;
        this.openBoxEff.y = 287;
        this.openBoxEff.playFile(RES_DIR_EFF + 'kaibaoxiang', 1, function () {
            GuildStore.ins().sendGuildStoreBox();
            _this.isOpenEff = false;
        });
        this.addChild(this.openBoxEff);
    };
    GuildShopPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn0:
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.guildshopkaiqi:
                ViewManager.ins().open(GuildWin, 1);
                break;
            case this.useBtn:
                if (GuildStore.ins().guildStoreNum <= 0) {
                    UserTips.ins().showTips("|C:0xf3311e&T:本日剩余次数为0|");
                    return;
                }
                if (GlobalConfig.GuildStoreConfig.needContrib > Guild.ins().myCon) {
                    UserTips.ins().showTips("|C:0xf3311e&T:贡献度不足|");
                    return;
                }
                if (UserBag.ins().getSurplusCount() <= 0) {
                    UserTips.ins().showTips("|C:0xf3311e&T:背包已满，请先清理背包|");
                    return;
                }
                if (this.isOpenEff == false)
                    this.startEff();
                break;
            case this.guildMore:
                ViewManager.ins().open(GuildShopRecordWin);
                break;
        }
    };
    return GuildShopPanel;
}(BaseComponent));
__reflect(GuildShopPanel.prototype, "GuildShopPanel");
//# sourceMappingURL=GuildShopPanel.js.map