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
var Castingposlist = (function (_super) {
    __extends(Castingposlist, _super);
    function Castingposlist() {
        var _this = _super.call(this) || this;
        _this.skinName = "castingposlistskin";
        return _this;
    }
    Castingposlist.prototype.setShow = function (pos, level, isMax) {
        this.currentState = "pos_" + pos;
        var index = isMax ? UserGem.ROLL_NUM : level % UserGem.ROLL_NUM;
        for (var i = 0; i < UserGem.ROLL_NUM; i++) {
            var statu = 0;
            if (index > i) {
                statu = 0;
            }
            else if (index == i) {
                statu = 1;
            }
            else {
                statu = 2;
            }
            this["item" + i].setShowStatu(statu);
            if (this["line_" + i]) {
                this["line_" + i].source = statu == 0 ? "zhuzaoxian" : "zhuzaoxianbg";
            }
        }
    };
    return Castingposlist;
}(BaseView));
__reflect(Castingposlist.prototype, "Castingposlist");
//# sourceMappingURL=Castingposlist.js.map