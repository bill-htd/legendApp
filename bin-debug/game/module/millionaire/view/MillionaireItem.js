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
var MillionaireItem = (function (_super) {
    __extends(MillionaireItem, _super);
    function MillionaireItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'richmanItemSkin';
        return _this;
    }
    MillionaireItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.isEffing = false;
        this.startX = this.itemicon.x;
        this.startY = this.itemicon.y;
    };
    MillionaireItem.prototype.setHide = function () {
        this.itemicon.alpha = 1;
        this.itemicon.source = "";
        this.shadow.visible = false;
        this.itemicon.x = this.startX;
        this.itemicon.y = this.startY;
    };
    MillionaireItem.prototype.setHideEff = function () {
        var flyItem = new eui.Image(this.itemicon.source);
        flyItem.x = this.startX;
        flyItem.y = this.startY;
        flyItem.width = this.itemicon.width;
        flyItem.height = this.itemicon.height;
        this.itemicon.parent.addChild(flyItem);
        GameLogic.ins().postFlyItemEx(flyItem);
        this.setHide();
    };
    MillionaireItem.prototype.dataChanged = function () {
        this.shadow.visible = true;
        var id = this.data.index;
        if (this.data.rewardId == -1) {
            this.itemicon.source = "";
            this.shadow.visible = false;
            return;
        }
        var rewardId = this.data.rewardId - 1;
        var config = GlobalConfig.RichManGridConfig[id];
        if (!config)
            return;
        var rdata;
        if (config.exparam) {
            for (var k in config.exparam) {
                if (Number(k) == Millionaire.ins().round) {
                    rdata = config.exparam[k];
                    break;
                }
            }
        }
        if (rdata) {
            this.setImgSouce(rdata);
            return;
        }
        if (config.action == MillionaireItem.ACTION_1) {
            id = Millionaire.ins().randomGridById;
            if (id) {
                config = GlobalConfig.RichManGridConfig[id];
                rewardId = Millionaire.ins().randomGridByRewardId - 1;
            }
            rdata = config.param[rewardId];
            this.setImgSouce(rdata);
        }
        else if (config.action == MillionaireItem.ACTION_2) {
            id = Millionaire.ins().randomGridById;
            if (id) {
                config = GlobalConfig.RichManGridConfig[id];
                rewardId = Millionaire.ins().randomGridByRewardId - 1;
                rdata = config.param[rewardId];
                this.setImgSouce(rdata);
            }
            else {
                this.itemicon.source = "richman_json.richiman_random";
            }
        }
        else if (config.action == MillionaireItem.ACTION_3) {
            this.itemicon.source = "richman_json.richiman_teleport";
        }
        else if (config.action == MillionaireItem.ACTION_4) {
            this.itemicon.source = "richman_json.richman_dice6";
        }
    };
    MillionaireItem.prototype.setImgSouce = function (rdata) {
        var itemType = 0;
        if (!rdata.type) {
            this.itemicon.source = RewardData.getCurrencyRes(rdata.id);
            switch (rdata.id) {
                case MoneyConst.yuanbao:
                    itemType = 5;
                    break;
                case MoneyConst.gold:
                    itemType = 0;
                    break;
                case MoneyConst.soul:
                    itemType = 2;
                    break;
                case MoneyConst.piece:
                    itemType = 2;
                    this.itemicon.source = RewardData.CURRENCY_RES[rdata.id];
                    break;
                default:
                    break;
            }
        }
        else {
            var itemconfig = GlobalConfig.ItemConfig[rdata.id];
            if (itemconfig) {
                this.itemicon.source = itemconfig.icon + "_png";
            }
        }
    };
    MillionaireItem.prototype.destruct = function () {
    };
    MillionaireItem.prototype.clear = function () {
    };
    MillionaireItem.ACTION_1 = 1;
    MillionaireItem.ACTION_2 = 2;
    MillionaireItem.ACTION_3 = 3;
    MillionaireItem.ACTION_4 = 4;
    return MillionaireItem;
}(BaseItemRender));
__reflect(MillionaireItem.prototype, "MillionaireItem");
//# sourceMappingURL=MillionaireItem.js.map