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
var NewEquipWin = (function (_super) {
    __extends(NewEquipWin, _super);
    function NewEquipWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "newEquipSkin";
        _this.time = 5;
        return _this;
    }
    NewEquipWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.go, this.onEvent);
        this.removeObserve();
        TimerManager.ins().remove(this.updateTime, this);
        this.visible = false;
    };
    NewEquipWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (!NewEquip.ins().equipsList.length)
            return;
        this.addTouchEvent(this.go, this.onEvent);
        this.observe(UserEquip.ins().postEquipChange, this.callBack);
        if (NewEquip.ins().check()) {
            if (!TimerManager.ins().isExists(this.updateTime, this)) {
                this.tick = this.time;
                TimerManager.ins().doTimer(1000, 0, this.updateTime, this);
            }
        }
    };
    NewEquipWin.prototype.updateTime = function () {
        this.init();
        this.visible = true;
    };
    NewEquipWin.prototype.callBack = function () {
    };
    NewEquipWin.prototype.init = function () {
        if (this.tick <= 0) {
            if (NewEquip.ins().equipsList.length == 0) {
                this.close();
                return;
            }
            this.tick = this.time;
        }
        ;
        if (NewEquip.ins().equipsList.length > 0) {
            this.go.label = "\u88C5\u5907(" + this.tick + ")";
            this.itemdata = NewEquip.ins().equipsList[0];
            if (this.itemdata && this.itemdata.itemConfig) {
                this.equip.data = this.itemdata._configID;
                this.equip.isShowName(false);
                this.equipName.text = this.itemdata.itemConfig.name;
                this.equipName.textColor = ItemConfig.getQualityColor(this.itemdata.itemConfig);
                this.powerCount.text = this.itemdata.point + "";
            }
        }
        this.tick--;
        if (this.tick <= 0) {
            this.sendWear();
        }
    };
    NewEquipWin.prototype.onEvent = function (e) {
        switch (e.target) {
            case this.go:
                this.sendWear();
                break;
        }
    };
    NewEquipWin.prototype.sendWear = function () {
        if (this.itemdata) {
            var pos = ItemConfig.getSubType(this.itemdata.itemConfig);
            UserEquip.ins().sendWearEquipment(this.itemdata.handle, pos, 0);
            NewEquip.ins().equipsList.shift();
            if (NewEquip.ins().equipsList.length == 0)
                this.close();
            this.tick = this.time;
        }
    };
    return NewEquipWin;
}(BaseView));
__reflect(NewEquipWin.prototype, "NewEquipWin");
//# sourceMappingURL=NewEquipWin.js.map