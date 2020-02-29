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
var RoleInfoItem = (function (_super) {
    __extends(RoleInfoItem, _super);
    function RoleInfoItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "RoleInfoItemSkin";
        _this.iconMc = new MovieClip();
        _this.iconMc.x = 45;
        _this.iconMc.y = 40;
        _this.iconMc.scaleX = _this.iconMc.scaleY = 0.4;
        return _this;
    }
    RoleInfoItem.prototype.getImgSource = function () {
        return this._imgSource;
    };
    RoleInfoItem.prototype.setImgSource = function (value, isAct) {
        var effSoure = value ? "hushen" : "mabi";
        this.iconMc.playFile(RES_DIR_EFF + effSoure, -1);
        if (this.iconMc && !this.iconMc.parent)
            this.addChild(this.iconMc);
        var filter = isAct ? [] : FilterUtil.ARRAY_GRAY_FILTER;
        this.iconMc.filters = filter;
    };
    RoleInfoItem.prototype.getLv = function () {
        return this._lv;
    };
    RoleInfoItem.prototype.setLv = function (value) {
        if (this._lv != value) {
            this._lv = value;
            if (this._lv == 0)
                this.lvTxt.text = "";
            else
                this.lvTxt.text = "+" + this._lv;
        }
    };
    RoleInfoItem.prototype.getNameTxt = function () {
        return this.labelDisplay.text;
    };
    RoleInfoItem.prototype.setNameTxt = function (value) {
        if (this._imgSource != value) {
            this.labelDisplay.text = value;
        }
    };
    RoleInfoItem.prototype.setBgValue = function (value) {
        this.bgImg.source = value;
    };
    RoleInfoItem.prototype.getRedPointVisibel = function () {
        return this.redPoint.visible;
    };
    RoleInfoItem.prototype.setRedPointVisibel = function (value) {
        this.redPoint.visible = value;
    };
    RoleInfoItem.prototype.destory = function () {
        this.iconMc.filters = null;
        DisplayUtils.removeFromParent(this.iconMc);
        this.iconMc.filters = null;
    };
    return RoleInfoItem;
}(BaseView));
__reflect(RoleInfoItem.prototype, "RoleInfoItem");
//# sourceMappingURL=RoleInfoItem.js.map