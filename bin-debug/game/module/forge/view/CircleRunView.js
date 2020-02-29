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
var CircleRunView = (function (_super) {
    __extends(CircleRunView, _super);
    function CircleRunView() {
        var _this = _super.call(this) || this;
        _this.boostView = new CircleRunBoostView;
        _this.addChild(_this.boostView);
        _this.gemView = new CircleRunGemView;
        _this.addChild(_this.gemView);
        _this.zhulingView = new CircleRunZhulingView;
        _this.addChild(_this.zhulingView);
        return _this;
    }
    Object.defineProperty(CircleRunView.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.boostView.visible = false;
            this.gemView.visible = false;
            this.zhulingView.visible = false;
            switch (this._type) {
                case 0:
                    this.boostView.visible = true;
                    this.boostView.type = value;
                    break;
                case 1:
                    this.gemView.visible = true;
                    this.gemView.type = value;
                    break;
                case 2:
                    this.zhulingView.visible = true;
                    this.zhulingView.type = value;
                    break;
                case 3:
                    break;
            }
            this.setValue();
        },
        enumerable: true,
        configurable: true
    });
    CircleRunView.prototype.setCurRole = function (value) {
        this._curRole = value;
        this.boostView.curRole = value;
        this.gemView.curRole = value;
        this.zhulingView.curRole = value;
    };
    CircleRunView.prototype.getCurRole = function () {
        return this._curRole;
    };
    CircleRunView.prototype.setValue = function () {
        switch (this._type) {
            case 0:
                this.boostView.setValue();
                break;
            case 1:
                this.gemView.setValue();
                break;
            case 2:
                this.zhulingView.setValue();
                break;
            case 3:
                break;
        }
    };
    CircleRunView.prototype.turnItem = function (pos) {
        switch (this._type) {
            case 0:
                this.boostView.turnItem(pos);
                break;
            case 1:
                this.gemView.turnItem(pos);
                break;
            case 2:
                this.zhulingView.turnItem(pos);
                break;
            case 3:
                break;
        }
    };
    CircleRunView.BOOST = 0;
    CircleRunView.GEM = 1;
    CircleRunView.ZHU_LING = 2;
    CircleRunView.EQUIP_COUNT = 8;
    return CircleRunView;
}(BaseView));
__reflect(CircleRunView.prototype, "CircleRunView");
//# sourceMappingURL=CircleRunView.js.map