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
var CircleRunBoostView = (function (_super) {
    __extends(CircleRunBoostView, _super);
    function CircleRunBoostView() {
        var _this = _super.call(this) || this;
        _this.equipSource = [
            "xduanzao_20",
            "xduanzao_21",
            "xduanzao_22",
            "xduanzao_23",
            "xduanzao_24",
            "xduanzao_24",
            "xduanzao_25",
            "xduanzao_25"
        ];
        _this.nameBg = [
            "xduanzao_10_png",
            "xduanzao_11_png"
        ];
        _this.skinName = "CircleRunBoostSkin";
        _this.itemList = [];
        var n = CircleRunView.EQUIP_COUNT;
        while (n--) {
            _this.itemList[n] = _this['item' + n];
        }
        _this["item0"].itemName.source = "xduanzao_12_png";
        _this["item1"].itemName.source = "xduanzao_13_png";
        _this["item2"].itemName.source = "xduanzao_14_png";
        _this["item3"].itemName.source = "xduanzao_15_png";
        _this["item4"].itemName.source = "xduanzao_16_png";
        _this["item5"].itemName.source = "xduanzao_16_png";
        _this["item6"].itemName.source = "xduanzao_17_png";
        _this["item7"].itemName.source = "xduanzao_17_png";
        return _this;
    }
    Object.defineProperty(CircleRunBoostView.prototype, "type", {
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
    CircleRunBoostView.prototype.setValue = function () {
        var model = SubRoles.ins().getSubRoleByIndex(this.curRole);
        var n = this.itemList.length;
        for (var i = 0; i < n; i++) {
            var num = 0;
            switch (this._type) {
                case 0:
                    num = model.getEquipByIndex(i).strengthen;
                    break;
            }
            this.itemList[i].setValue(num);
        }
    };
    CircleRunBoostView.prototype.turnItem = function (pos) {
        this.equip.source = this.equipSource[pos];
        this.setNameBg(pos);
    };
    CircleRunBoostView.prototype.setNameBg = function (pos) {
        var len = this.itemList.length;
        for (var i = 0; i < len; i++) {
            if (i == pos)
                this.itemList[i].setSource(this.nameBg[1]);
            else
                this.itemList[i].setSource(this.nameBg[0]);
        }
    };
    return CircleRunBoostView;
}(BaseView));
__reflect(CircleRunBoostView.prototype, "CircleRunBoostView");
//# sourceMappingURL=CircleRunBoostView.js.map