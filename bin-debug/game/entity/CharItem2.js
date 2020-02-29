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
var CharItem2 = (function (_super) {
    __extends(CharItem2, _super);
    function CharItem2() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        _this.item = new CharItem();
        _this.itemName = new CharItemName();
        return _this;
    }
    Object.defineProperty(CharItem2.prototype, "infoModel", {
        get: function () {
            return this._infoModel;
        },
        set: function (model) {
            this._infoModel = model;
        },
        enumerable: true,
        configurable: true
    });
    CharItem2.prototype.setData = function (item) {
        this.item.setData(item);
        this.itemName.setData(item);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
    };
    CharItem2.prototype.setItemParent = function (parent) {
        this._itemParent = parent;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
        this._itemParent.addChild(this);
    };
    CharItem2.prototype.addRoatEffect = function () {
        this.item.addRoatEffect();
    };
    CharItem2.prototype.removeRoatEffect = function () {
        this.item.removeRoatEffect();
    };
    CharItem2.prototype.addFloatEffect = function () {
        egret.Tween.removeTweens(this.item);
        var t = egret.Tween.get(this.item);
        var posY = this.item.y;
        this.item.y -= 100;
        t.to({ y: posY }, 500, egret.Ease.bounceOut);
    };
    CharItem2.prototype.onAdd = function (e) {
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        ResourceMgr.ins().reloadContainer(this.item);
        if (this._itemParent) {
            this._itemParent.addChild(this.item);
            this._itemParent.addChild(this.itemName);
        }
        else {
            DropHelp.dropContainer.addChild(this.item);
            DropHelp.dropNameContainer.addChild(this.itemName);
        }
    };
    CharItem2.prototype.onRemove = function (e) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        if (this.item.parent) {
            this.item.parent.removeChild(this.item);
        }
        if (this.itemName.parent) {
            this.itemName.parent.removeChild(this.itemName);
        }
        this.removeRoatEffect();
    };
    Object.defineProperty(CharItem2.prototype, "x", {
        get: function () {
            return egret.superGetter(CharItem2, this, 'x');
        },
        set: function (_x) {
            egret.superSetter(CharItem2, this, 'x', _x);
            this.itemName.x = _x;
            this.item.x = _x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharItem2.prototype, "y", {
        get: function () {
            return egret.superGetter(CharItem2, this, 'y');
        },
        set: function (_y) {
            egret.superSetter(CharItem2, this, 'y', _y);
            this.itemName.y = _y;
            this.item.y = _y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharItem2.prototype, "team", {
        get: function () {
            return this.infoModel.team;
        },
        enumerable: true,
        configurable: true
    });
    CharItem2.prototype.reset = function () {
        this.item.scaleX = 1;
        this.item.scaleY = 1;
        this.itemName.scaleX = 1;
        this.itemName.scaleY = 1;
    };
    CharItem2.prototype.destruct = function () {
        this.item.scaleX = 1;
        this.item.scaleY = 1;
        this.itemName.scaleX = 1;
        this.itemName.scaleY = 1;
        this._itemParent = null;
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
    };
    return CharItem2;
}(egret.DisplayObjectContainer));
__reflect(CharItem2.prototype, "CharItem2", ["IChar"]);
//# sourceMappingURL=CharItem2.js.map