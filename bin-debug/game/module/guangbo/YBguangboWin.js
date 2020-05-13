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
var YBguangboWin = (function (_super) {
    __extends(YBguangboWin, _super);
    function YBguangboWin() {
        var _this = _super.call(this) || this;
        _this.arr = [];
        _this.groupList = [];
        _this.skinName = "YBguangbo";
        _this.addTouchEvent(_this.huishou, _this.onTap);
        _this.addTouchEvent(_this.huishou0, _this.onTap);
        _this.groupList.push(_this.group1);
        _this.groupList.push(_this.group2);
        return _this;
    }
    YBguangboWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        console.log(param);
        if (this.arr.length >= 2) {
            this.arr[0] = param[0];
        }
        else {
            this.arr.push(param[0]);
        }
        this.updateList();
    };
    YBguangboWin.prototype.updateList = function () {
        TimerManager.ins().remove(this.updateLabel, this);
        for (var i = 0; i < this.arr.length; i++) {
            this.groupList[i].visible = true;
            this.groupList[i].$children[1].textFlow = TextFlowMaker.generateTextFlow(this.arr[i]);
        }
        TimerManager.ins().doTimer(2000, 1, this.updateLabel, this);
    };
    YBguangboWin.prototype.updateLabel = function () {
        for (var i = this.arr.length - 1; i >= 0; i--) {
            this.arr.splice(i, 1);
            this.groupList[i].visible = false;
            TimerManager.ins().doTimer(2000, 1, this.updateLabel, this);
            break;
        }
    };
    YBguangboWin.prototype.close = function () {
        this.removeTouchEvent(this.huishou, this.onTap);
        this.removeTouchEvent(this.huishou0, this.onTap);
    };
    YBguangboWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.huishou0:
            case this.huishou:
                ViewManager.ins().close(this);
                ViewManager.ins().open(SmeltEquipTotalWin);
                break;
        }
    };
    return YBguangboWin;
}(BaseEuiView));
__reflect(YBguangboWin.prototype, "YBguangboWin");
ViewManager.ins().reg(YBguangboWin, LayerManager.UI_Tips);
//# sourceMappingURL=YBguangboWin.js.map