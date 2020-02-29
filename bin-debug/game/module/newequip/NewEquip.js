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
var NewEquip = (function (_super) {
    __extends(NewEquip, _super);
    function NewEquip() {
        var _this = _super.call(this) || this;
        _this.observe(UserEquip.ins().postEquipChange, _this.callBack);
        _this.equipsList = [];
        return _this;
    }
    NewEquip.ins = function () {
        return _super.ins.call(this);
    };
    NewEquip.prototype.check = function () {
        if (!OpenSystem.ins().checkSysOpen(SystemType.NEWEQUIP)) {
            return false;
        }
        return true;
    };
    NewEquip.prototype.callBack = function () {
    };
    NewEquip.prototype.addItem = function (newItem) {
        if (!newItem)
            return;
        if (!this.check())
            return;
        var newPos = ItemConfig.getSubType(newItem.itemConfig);
        var newJob = ItemConfig.getJob(newItem.itemConfig);
        var role = SubRoles.ins().getSubRoleByIndex(0);
        if (role.job != newJob)
            return;
        if (UserZs.ins().lv >= (newItem.itemConfig.zsLevel || 0) && Actor.level >= (newItem.itemConfig.level || 1)) {
        }
        else {
            return;
        }
        var isInList = false;
        for (var i = 0; i < this.equipsList.length; i++) {
            var curItem = this.equipsList[i];
            var pos = ItemConfig.getSubType(curItem.itemConfig);
            if (i == 0 && newPos == pos) {
                if (newPos == pos) {
                    isInList = true;
                    if (this.compareEquip(curItem, newItem)) {
                        this.equipsList.push(newItem);
                    }
                    break;
                }
            }
            else {
                if (newPos == pos) {
                    isInList = true;
                    if (this.compareEquip(curItem, newItem)) {
                        this.equipsList[i] = newItem;
                    }
                    break;
                }
            }
        }
        if (!isInList) {
            var equip = role.equipsData[newPos];
            if (equip && equip.item && equip.item.itemConfig) {
                if (this.compareEquip(equip.item, newItem)) {
                    this.equipsList.push(newItem);
                }
            }
            else {
                this.equipsList.push(newItem);
            }
        }
    };
    NewEquip.prototype.compareEquip = function (curItem, newItem) {
        var curPower = curItem.point;
        var newPower = newItem.point;
        return newPower > curPower;
    };
    return NewEquip;
}(BaseSystem));
__reflect(NewEquip.prototype, "NewEquip");
var GameSystem;
(function (GameSystem) {
    GameSystem.newEquip = NewEquip.ins.bind(NewEquip);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=NewEquip.js.map