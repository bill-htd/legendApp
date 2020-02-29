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
var CircleRunGemView = (function (_super) {
    __extends(CircleRunGemView, _super);
    function CircleRunGemView() {
        var _this = _super.call(this) || this;
        _this.skinName = "CircleRunGemSkin";
        _this.itemList = [];
        var n = CircleRunView.EQUIP_COUNT;
        while (n--) {
            _this.itemList[n] = _this['item' + n];
        }
        _this["item0"].item.source = "forge_00_png";
        _this["item1"].item.source = "forge_01_png";
        _this["item2"].item.source = "forge_02_png";
        _this["item3"].item.source = "forge_03_png";
        _this["item4"].item.source = "forge_04_png";
        _this["item5"].item.source = "forge_05_png";
        _this["item6"].item.source = "forge_06_png";
        _this["item7"].item.source = "forge_07_png";
        return _this;
    }
    Object.defineProperty(CircleRunGemView.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            for (var i = 0; i < this.itemList.length; i++) {
                this.itemList[i].setType(this._type);
            }
            this.setValue();
        },
        enumerable: true,
        configurable: true
    });
    CircleRunGemView.prototype.setValue = function () {
        var model = SubRoles.ins().getSubRoleByIndex(this.curRole);
        var n = this.itemList.length;
        for (var i = 0; i < n; i++) {
            var num = 0;
            switch (this._type) {
                case 1:
                    num = model.getEquipByIndex(i).gem;
                    break;
            }
            this.itemList[i].setValue(num);
        }
    };
    CircleRunGemView.prototype.turnItem = function (pos) {
        this.setItemSelect(pos);
    };
    CircleRunGemView.prototype.setItemSelect = function (pos) {
        var len = this.itemList.length;
        for (var i = 0; i < len; i++) {
            if (i == pos)
                this.itemList[i].isSelectEff(true);
            else
                this.itemList[i].isSelectEff(false);
        }
    };
    return CircleRunGemView;
}(BaseView));
__reflect(CircleRunGemView.prototype, "CircleRunGemView");
//# sourceMappingURL=CircleRunGemView.js.map