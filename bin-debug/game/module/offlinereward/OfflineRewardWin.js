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
var OfflineRewardWin = (function (_super) {
    __extends(OfflineRewardWin, _super);
    function OfflineRewardWin() {
        var _this = _super.call(this) || this;
        _this.arr = [];
        _this.skinName = "OfflineRewardSkin";
        return _this;
    }
    OfflineRewardWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.okBtn, this.onClick);
        this.arr = param[0];
        this.coin = param[1];
        for (var i = 0; i < this.coin.length; i++) {
            if (this.coin[i].id == MoneyConst.soul) {
                this.arr.push(this.coin[i].count);
                break;
            }
        }
        this.update();
    };
    OfflineRewardWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.okBtn, this.onClick);
    };
    OfflineRewardWin.prototype.update = function () {
        this.time.text = "离线时间：" + DateUtils.getFormatBySecond(this.arr[0], DateUtils.TIME_FORMAT_9);
        this.exp.text = "" + this.arr[1];
        this.money.text = "" + this.arr[2];
        this.equipNum.text = "" + (this.arr[3] + this.arr[4]);
        this.jinglianshiNum.text = "" + (this.arr[6] ? this.arr[6] : 0);
        if (this.arr[4] == 0) {
            this.bagFull.visible = false;
        }
        else {
            this.bagFull.visible = true;
            this.bagFull.textFlow = (new egret.HtmlTextParser).parser("\u80CC\u5305\u5DF2\u6EE1\uFF0C\u81EA\u52A8\u7194\u70BC<a color=0x35e62d>" + this.arr[4] + "</a>\u4EF6\u88C5\u5907");
        }
        if (this.arr[5].length > 0) {
            for (var i = 0; i < this.arr[5].length; i++) {
                var obj = this.arr[5][i];
                if (obj["type"] == 1) {
                    this.label4.text = obj["gold"];
                    this.label6.text = obj["exp"];
                }
                else if (obj["type"] == 2) {
                    this.label3.text = obj["gold"];
                    this.label5.text = obj["exp"];
                }
                else if (obj["type"] == 3) {
                    this.exp.text = "" + (this.arr[1] + obj["exp"]);
                    this.arr[2] += obj["gold"];
                }
                else if (obj["type"] == 4) {
                    this.exp.text = "" + (this.arr[1] + obj["exp"]);
                    this.arr[2] += obj["gold"];
                }
            }
            this.money.text = "" + this.arr[2];
        }
    };
    OfflineRewardWin.prototype.onClick = function () {
        ViewManager.ins().close(this);
    };
    return OfflineRewardWin;
}(BaseEuiView));
__reflect(OfflineRewardWin.prototype, "OfflineRewardWin");
ViewManager.ins().reg(OfflineRewardWin, LayerManager.UI_Main2);
//# sourceMappingURL=OfflineRewardWin.js.map