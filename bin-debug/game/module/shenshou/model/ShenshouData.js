var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ShenshouData = (function () {
    function ShenshouData(bytes) {
        this.equipIDs = [];
        this.state = 0;
        for (var i = 1; i <= 5; i++) {
            this.equipIDs[i] = 0;
        }
        if (bytes)
            this.readData(bytes);
    }
    ShenshouData.prototype.readData = function (bytes) {
        this.id = bytes.readByte();
        this.equipIDs = [];
        var len = bytes.readByte();
        for (var i = 0; i < len; i++) {
            this.equipIDs[i + 1] = bytes.readInt();
        }
        this.state = bytes.readByte();
        if (this.equipIDs.indexOf(0) > -1 && this.state != ShenshouState.State_Has)
            this.state = ShenshouState.State_No;
    };
    ShenshouData.prototype.checkState = function () {
        if (this.state == ShenshouState.State_Has)
            return;
        if (this.equipIDs.indexOf(0) > -1)
            this.state = ShenshouState.State_No;
        else
            this.state = ShenshouState.State_Can;
    };
    return ShenshouData;
}());
__reflect(ShenshouData.prototype, "ShenshouData");
var ShenshouEquipData = (function () {
    function ShenshouEquipData() {
    }
    return ShenshouEquipData;
}());
__reflect(ShenshouEquipData.prototype, "ShenshouEquipData");
var ShenshouState;
(function (ShenshouState) {
    ShenshouState[ShenshouState["State_No"] = 2] = "State_No";
    ShenshouState[ShenshouState["State_Can"] = 0] = "State_Can";
    ShenshouState[ShenshouState["State_Has"] = 1] = "State_Has";
})(ShenshouState || (ShenshouState = {}));
//# sourceMappingURL=ShenshouData.js.map