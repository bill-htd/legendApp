var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WaveDropData = (function () {
    function WaveDropData() {
        this.drops = [];
    }
    WaveDropData.prototype.parser = function (bytes) {
        var count = 1;
        for (var i = 0; i < count; i++) {
            this.drops[i] = this.drops[i] || new RewardData();
            this.drops[i].parser(bytes);
        }
        this.drops.length = count;
    };
    return WaveDropData;
}());
__reflect(WaveDropData.prototype, "WaveDropData");
//# sourceMappingURL=WaveDropData.js.map