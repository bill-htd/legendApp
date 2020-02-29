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
var ForgeItem = (function (_super) {
    __extends(ForgeItem, _super);
    function ForgeItem() {
        return _super.call(this) || this;
    }
    ForgeItem.prototype.childrenCreated = function () {
    };
    ForgeItem.prototype.getSource = function () {
        return this._source;
    };
    ForgeItem.prototype.getSourceName = function () {
        return this._sourceName;
    };
    ForgeItem.prototype.setSource = function (value) {
        if (this._source == value)
            return;
        this._source = value;
        this.item.source = this._source;
    };
    ForgeItem.prototype.setSourceName = function (value) {
        if (this._sourceName == value)
            return;
        this._sourceName = value;
        this.item.source = this._sourceName;
    };
    ForgeItem.prototype.isSelect = function (value) {
        this.select.visible = value;
        return value;
    };
    ForgeItem.prototype.isSelectEff = function (value) {
        if (!this.parent)
            return;
        if (!this.selectEff) {
            this.selectEff = new MovieClip();
            this.selectEff.x = 40;
            this.selectEff.y = 38;
            this.selectEff.playFile(RES_DIR_EFF + "zhuling", -1);
        }
        if (!this.selectEff.parent && value)
            this.addChildAt(this.selectEff, 2);
        value ? this.selectEff.play(-1) : this.selectEff.stop();
        this.selectEff.visible = value;
        return value;
    };
    ForgeItem.prototype.setValue = function (num) {
        switch (this._type) {
            case 0:
                this.boost.text = "+" + num;
                break;
            case 1:
                this.gem.text = "+" + num;
                break;
            case 2:
                this.zhuling.text = "+" + num;
                break;
            case 3:
                this.tupo.text = num + "星";
                break;
        }
    };
    ForgeItem.prototype.getType = function () {
        return this._type;
    };
    ForgeItem.prototype.setType = function (value) {
        if (this._type == value)
            return;
        this._type = value;
        switch (this._type) {
            case 0:
                this.boost.visible = true;
                this.itemName.visible = true;
                this.gem.visible = false;
                this.zhuling.visible = false;
                this.tupo.visible = false;
                this.isSelect(false);
                this.labelBg.visible = false;
                break;
            case 1:
                this.boost.visible = false;
                this.itemName.visible = false;
                this.gem.visible = true;
                this.zhuling.visible = false;
                this.tupo.visible = false;
                this.labelBg.visible = true;
                break;
            case 2:
                this.boost.visible = false;
                this.itemName.visible = false;
                this.gem.visible = false;
                this.zhuling.visible = true;
                this.tupo.visible = false;
                this.labelBg.visible = true;
                break;
            case 3:
                this.boost.visible = false;
                this.itemName.visible = false;
                this.gem.visible = false;
                this.zhuling.visible = false;
                this.tupo.visible = true;
                this.labelBg.visible = true;
                break;
        }
    };
    return ForgeItem;
}(BaseComponent));
__reflect(ForgeItem.prototype, "ForgeItem");
//# sourceMappingURL=ForgeItem.js.map