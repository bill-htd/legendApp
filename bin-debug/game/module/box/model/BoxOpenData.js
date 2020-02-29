var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BoxOpenData = (function () {
    function BoxOpenData() {
        this.itemId = 0;
        this.canUsed = true;
    }
    BoxOpenData.prototype.updateData = function (bytes) {
        this.pos = bytes.readShort();
        this.itemId = bytes.readShort();
        this.state = bytes.readShort();
        this.remindTime = bytes.readInt();
        this.updateTime = egret.getTimer();
    };
    BoxOpenData.prototype.getTime = function () {
        return Math.floor((this.remindTime * 1000 + this.updateTime - egret.getTimer()) / 1000);
    };
    BoxOpenData.prototype.getDetailData = function () {
        var arrDesc = GlobalConfig.TreasureBoxConfig[this.itemId].desc;
        var arrRewards = GlobalConfig.TreasureBoxConfig[this.itemId].rewards;
        var data = [];
        for (var i = 0; i < arrDesc.length; i++) {
            var item = new BoxItemData;
            item.desc = arrDesc[i];
            item.reward = arrRewards[i];
            data.push(item);
        }
        return data;
    };
    return BoxOpenData;
}());
__reflect(BoxOpenData.prototype, "BoxOpenData");
var BoxFreeData = (function () {
    function BoxFreeData() {
        this.statu = 1;
    }
    BoxFreeData.prototype.updateData = function (bytes) {
        this.pos = bytes.readShort();
        this.remindTime = bytes.readInt();
        this.updateTime = egret.getTimer();
    };
    BoxFreeData.prototype.getTime = function () {
        return Math.max(Math.floor((this.remindTime * 1000 + this.updateTime - egret.getTimer()) / 1000), 0);
    };
    return BoxFreeData;
}());
__reflect(BoxFreeData.prototype, "BoxFreeData");
//# sourceMappingURL=BoxOpenData.js.map