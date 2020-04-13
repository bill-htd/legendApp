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
var QHBPanle = (function (_super) {
    __extends(QHBPanle, _super);
    function QHBPanle() {
        var _this = _super.call(this) || this;
        _this.skinName = "qianghongbaoSkin";
        return _this;
    }
    QHBPanle.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        console.log(this.skin);
        this.init();
    };
    QHBPanle.prototype.init = function () {
        this.list.itemRenderer = CreateRoleViewItem;
        var arrName = ["", "", "", ""];
        var addName = ["紫廖渔歌", "半瓶矿泉水", "暖风", "繁华过后", "念迩成习", "逆丶美丽",
            "握不住的美", "隔岸觀火", "残喘的笑", "何时苏醒", "湮丶燃尽了", "年少无知≈", "卸不掉的盔甲", "″温瞳渐远≈",
            "男人/吥乖", "走遍四方", "我已无力说爱", "繁华沧桑", "卡尺", "往事随风", "剑胆琴心", "心如止水", "风伤依旧",
            "一直很低调", "遥忘而立", "忧郁的萨克斯", "哥比彩钻还炫", "烈日追风", "本人、已昏", "全橙相伴", "残月孤生"];
        for (var i = 0; i < 3; i++) {
            arrName = arrName.concat(addName);
        }
        this.list.dataProvider = new eui.ArrayCollection(arrName);
        this.scroller.touchChildren = false;
        this.scroller.touchEnabled = false;
        this.listH = this.list.height - 200;
        this.scroller.viewport.scrollV = 0;
        var t = egret.Tween.get(this.scroller.viewport);
        t.to({ scrollV: this.listH }, 40 * this.listH).call(this.loopT, this);
    };
    QHBPanle.prototype.loopT = function () {
        this.scroller.viewport.scrollV = 200;
        var t = egret.Tween.get(this.scroller.viewport);
        t.to({ scrollV: this.listH }, 40 * this.listH).call(this.loopT, this);
    };
    QHBPanle.prototype.update = function () {
    };
    QHBPanle.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        this.removeTouchEvent(this, this.onTouch);
    };
    QHBPanle.prototype.onTouch = function (e) {
        switch (e.target) {
        }
    };
    return QHBPanle;
}(BaseView));
__reflect(QHBPanle.prototype, "QHBPanle");
//# sourceMappingURL=QHBPanle.js.map