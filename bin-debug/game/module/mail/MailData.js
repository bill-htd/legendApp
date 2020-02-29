var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MailData = (function () {
    function MailData() {
    }
    MailData.prototype.parser = function (bytes) {
        this.disposeData(bytes);
        this.item = [];
        this.text = bytes.readString();
        var len = bytes.readInt();
        for (var i = 0; i < len; i++) {
            var reward = new RewardData;
            reward.parser(bytes);
            this.item.push(reward);
        }
    };
    MailData.prototype.disposeData = function (bytes) {
        this.handle = bytes.readInt();
        this.title = bytes.readString();
        this.times = bytes.readInt();
        this.type = bytes.readInt();
        this.receive = bytes.readInt();
    };
    return MailData;
}());
__reflect(MailData.prototype, "MailData");
//# sourceMappingURL=MailData.js.map