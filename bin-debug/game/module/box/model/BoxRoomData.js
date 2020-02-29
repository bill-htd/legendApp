var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BoxRoomData = (function () {
    function BoxRoomData() {
        this.itemId = 0;
        this.canUsed = true;
    }
    BoxRoomData.prototype.updateData = function (bytes) {
        this.itemId = bytes.readShort();
        if (this.itemId)
            this.name = GlobalConfig.TreasureBoxConfig[this.itemId].name;
    };
    return BoxRoomData;
}());
__reflect(BoxRoomData.prototype, "BoxRoomData");
//# sourceMappingURL=BoxRoomData.js.map