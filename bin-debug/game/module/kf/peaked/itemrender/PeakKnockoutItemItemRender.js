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
var PeakKnockoutItemItemRender = (function (_super) {
    __extends(PeakKnockoutItemItemRender, _super);
    function PeakKnockoutItemItemRender() {
        return _super.call(this) || this;
    }
    PeakKnockoutItemItemRender.prototype.dataChanged = function () {
        if (this.data) {
            this.infoLabel.text = (this.data.servId ? "\u8DE8\u670D" : "\u5355\u670D") + "\u6DD8\u6C70\u8D5B\u7B2C" + this.data.round + "\u573A";
            this.playerName.text = this.data.player ? this.data.player : "\u8F6E\u7A7A";
            this.playerName.name = this.data.id;
            if (this.data.result) {
                this.result.textColor = ColorUtil.GREEN;
                this.result.text = "\u80DC\u5229";
            }
            else {
                this.result.textColor = ColorUtil.RED;
                this.result.text = "\u5931\u8D25";
            }
        }
    };
    return PeakKnockoutItemItemRender;
}(BaseItemRender));
__reflect(PeakKnockoutItemItemRender.prototype, "PeakKnockoutItemItemRender");
//# sourceMappingURL=PeakKnockoutItemItemRender.js.map