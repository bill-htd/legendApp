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
var SelectRoleItem = (function (_super) {
    __extends(SelectRoleItem, _super);
    function SelectRoleItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "SelectRoleItemSkin";
        return _this;
    }
    SelectRoleItem.prototype.dataChanged = function () {
        var _data = this.data;
        this.labelName.text = _data.name;
        if (_data.zsLevel == 0) {
            this.labelLevel.text = "等级：" + "" + _data.level;
        }
        else {
            this.labelLevel.text = "等级：" + _data.zsLevel + "转" + _data.level + "级";
        }
        if (_data.power <= 100000) {
            this.labelPower.text = "战力：" + _data.power + "";
        }
        else {
            var num = Math.floor(_data.power / 1000);
            num = num / 10;
            this.labelPower.text = "战力：" + num + "万";
        }
        if (_data.vipLevel == 0) {
            this.groupVip.visible = false;
        }
        else {
            this.vipLabel.text = _data.vipLevel + "";
            this.groupVip.visible = true;
        }
        this.imgRole.source = "head_" + _data.roleClass + _data.sex;
        this.select.visible = this.selected;
    };
    return SelectRoleItem;
}(BaseItemRender));
__reflect(SelectRoleItem.prototype, "SelectRoleItem");
//# sourceMappingURL=SelectRoleItem.js.map