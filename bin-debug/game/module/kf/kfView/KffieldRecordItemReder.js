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
var KffieldRecordItemReder = (function (_super) {
    __extends(KffieldRecordItemReder, _super);
    function KffieldRecordItemReder() {
        return _super.call(this) || this;
    }
    KffieldRecordItemReder.prototype.dataChanged = function () {
        if (this.data instanceof KFDropRecordData) {
            this.dropTime.text = DateUtils.getFormatBySecond(this.data.time, DateUtils.TIME_FORMAT_15);
            if (this.data.type == KFDropType.KF_BOSS) {
                var roleStr = "|C:" + 0x0099ff + "&T:" + this.data.nick + "|";
                var item = GlobalConfig.ItemConfig[this.data.goodsId];
                var goodsColor = ItemConfig.getQualityColor(item);
                var goodsStr = "|C:" + goodsColor + "&T:[" + item.name + "]|";
                var str = roleStr + "\u5728" + this.data.sceneName + "\u51FB\u6740|C:0xff0000&T:" + this.data.bossName + "|\uFF0C\u83B7\u5F97\u6781\u54C1" + goodsStr;
                var textElement = TextFlowMaker.generateTextFlow1(str);
                textElement[0].style.href = "event:" + this.data.roleId + "_" + this.data.servId;
                textElement[0].style.underline = true;
                textElement[4].style.href = "event:" + this.data.goodsId;
                textElement[4].style.underline = true;
                this.record.textFlow = textElement;
            }
            else if (this.data.type == KFDropType.DEVILDOM) {
                var roleStr = "|C:" + 0x00FF00 + "&T:S." + this.data.servId + " " + this.data.guildName + "\u884C\u4F1A|";
                var goodsId = GlobalConfig.AuctionItem[this.data.goodsId].item.id;
                var item = GlobalConfig.ItemConfig[goodsId];
                var goodsColor = ItemConfig.getQualityColor(item);
                var goodsStr = "|C:" + goodsColor + "&T:[" + item.name + "]|";
                var str = roleStr + "\u5728|C:0xFF00FF&T:\u9B54\u754C\u5165\u4FB5|\u51FB\u6740|C:0xff0000&T:" + this.data.bossName + "|\uFF0C\u83B7\u5F97\u884C\u4F1A\u62CD\u5356\u54C1" + goodsStr;
                var textElement = TextFlowMaker.generateTextFlow1(str);
                textElement[6].style.href = "event:" + goodsId;
                textElement[6].style.underline = true;
                this.record.textFlow = textElement;
            }
            this.best.visible = this.data.isBest;
            this.record.width = !this.best.visible ? 418 : 380;
            this.record.addEventListener(egret.TextEvent.LINK, this.onLink, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
        }
    };
    KffieldRecordItemReder.prototype.onLink = function (e) {
        var strArr = e.text.split("_");
        if (strArr.length > 1) {
            UserReadPlayer.ins().sendFindPlayer(parseInt(strArr[0]), parseInt(strArr[1]));
        }
        else {
            var itemconfig = GlobalConfig.ItemConfig[e.text];
            var type = ItemConfig.getType(itemconfig);
            if (itemconfig != undefined && itemconfig && type != undefined) {
                if (ItemConfig.isEquip(itemconfig)) {
                    ViewManager.ins().open(EquipDetailedWin, 1, undefined, itemconfig.id);
                }
                else if (type == ItemType.TYPE_21) {
                    ZhanLing.ins().ZhanLingItemTips(itemconfig.id);
                }
                else if (type == ItemType.TYPE_22) {
                    ViewManager.ins().open(ZhanlingZBTipWin, itemconfig.id);
                }
                else {
                    ViewManager.ins().open(ItemDetailedWin, 0, itemconfig.id);
                }
            }
        }
    };
    KffieldRecordItemReder.prototype.removeFromStage = function () {
        this.record.removeEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    };
    return KffieldRecordItemReder;
}(BaseItemRender));
__reflect(KffieldRecordItemReder.prototype, "KffieldRecordItemReder");
//# sourceMappingURL=KffieldRecordItemReder.js.map