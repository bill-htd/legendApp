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
var CharEffect = (function (_super) {
    __extends(CharEffect, _super);
    function CharEffect() {
        var _this = _super.call(this) || this;
        _this.myHeight = EntityManager.CHAR_DEFAULT_HEIGHT;
        _this.typeface = EntityManager.CHAR_DEFAULT_TYPEFACE;
        _this._dir = 4;
        _this._state = EntityAction.STAND;
        _this.hasDir = [CharMcOrder.BODY, CharMcOrder.WEAPON, CharMcOrder.WING, CharMcOrder.SOUL, CharMcOrder.ZHANLING];
        _this._disOrder = {};
        _this._mcFileName = {};
        _this._bodyContainer = new egret.DisplayObjectContainer();
        _this.addChild(_this._bodyContainer);
        _this._body = ObjectPool.pop("MovieClip");
        _this._bodyContainer.addChild(_this._body);
        _this._disOrder[CharMcOrder.BODY] = _this._body;
        _this.titleCantainer = new egret.DisplayObjectContainer;
        _this.titleCantainer.anchorOffsetY = _this.myHeight;
        _this.addChild(_this.titleCantainer);
        return _this;
    }
    CharEffect.prototype.setBodyScale = function (value) {
        this._bodyContainer.scaleX = this._bodyContainer.scaleY = value;
        this.myHeight = this.myHeight * value;
        this.typeface *= value;
        this.titleCantainer.anchorOffsetY = Math.floor(this.myHeight);
    };
    Object.defineProperty(CharEffect.prototype, "infoModel", {
        get: function () {
            return this._infoModel;
        },
        set: function (model) {
            this._infoModel = model;
        },
        enumerable: true,
        configurable: true
    });
    CharEffect.prototype.setConfig = function (avatar) {
        var config = GlobalConfig.MonstershpConfig[avatar];
        if (config) {
            this.myHeight = config.hp;
            this.typeface = config.hp;
        }
        else {
            this.myHeight = EntityManager.CHAR_DEFAULT_HEIGHT;
            this.typeface = EntityManager.CHAR_DEFAULT_TYPEFACE;
        }
        this.titleCantainer.anchorOffsetY = Math.floor(this.myHeight);
    };
    CharEffect.prototype.updateModel = function () {
    };
    Object.defineProperty(CharEffect.prototype, "dir", {
        get: function () {
            return this._dir;
        },
        set: function (value) {
            if (this._dir == value)
                return;
            this._dir = value;
            this.loadBody();
        },
        enumerable: true,
        configurable: true
    });
    CharEffect.prototype.getResDir = function (mcType) {
        var td = 2 * (this._dir - 4);
        if (td < 0)
            td = 0;
        return this._dir - td;
    };
    CharEffect.prototype.playAction = function (action, callBack) {
        this._state = action;
        this.playComplete = callBack;
        this._body.clearComFun();
        this.loadBody();
    };
    CharEffect.prototype.loadBody = function () {
        this._body.stop();
        this._body.addEventListener(egret.Event.CHANGE, this.playBody, this);
        if (this.hasDir.indexOf(CharMcOrder.BODY) >= 0) {
            this.loadFile(this._body, this.getFileName(CharMcOrder.BODY), CharMcOrder.BODY);
        }
        else {
            this.playFile(this._body, this.getFileName(CharMcOrder.BODY));
        }
    };
    CharEffect.prototype.loadOther = function (mcType) {
        var mc = this.getMc(mcType);
        if (!mc)
            return;
        mc.stop();
        mc.addEventListener(egret.Event.CHANGE, this.syncFrame, this);
        this.loadFile(mc, this.getFileName(mcType), mcType);
    };
    CharEffect.prototype.loadNoDir = function (mcType) {
        var mc = this.getMc(mcType);
        this.playFile(mc, this.getFileName(mcType));
    };
    CharEffect.prototype.getFileName = function (mcType) {
        return this._mcFileName[mcType];
    };
    CharEffect.prototype.playFile = function (mc, fileName) {
        mc.playFile(fileName, -1, null, false);
    };
    CharEffect.prototype.loadFile = function (mc, fileName, mcType) {
        if (!fileName)
            return;
        if (CharEffect.ACTION_ODER[mcType] && CharEffect.ACTION_ODER[mcType].indexOf(this._state) < 0)
            return;
        var dir = this.getResDir(mcType);
        mc.scaleX = this._dir > 4 ? -1 : 1;
        var s = fileName + "_" + dir + this._state;
        mc.playFile(s, this.playCount(), mc == this._body ? this.playComplete : null, false);
    };
    CharEffect.prototype.playBody = function (e) {
        var firstFrame = 1;
        this._body.gotoAndPlay(firstFrame, this.playCount());
        this.removeBodyEvent(this._body);
        for (var mcType in this._disOrder) {
            var mc = this._disOrder[mcType];
            if (mc != this._body) {
                if (this.hasDir.indexOf(+(mcType)) >= 0 && mc instanceof MovieClip) {
                    this.loadOther(+(mcType));
                }
            }
        }
        this.sortEffect();
    };
    CharEffect.prototype.syncFrame = function (e) {
        this.removeMcEvent(e.currentTarget);
        e.currentTarget.gotoAndPlay(this._body.currentFrame, this.playCount());
    };
    CharEffect.prototype.removeBodyEvent = function (mc) {
        mc.removeEventListener(egret.Event.CHANGE, this.playBody, this);
    };
    CharEffect.prototype.removeMcEvent = function (mc) {
        mc.removeEventListener(egret.Event.CHANGE, this.syncFrame, this);
    };
    CharEffect.prototype.onImgLoaded = function (e) {
        var img = e.currentTarget;
        img.removeEventListener(egret.Event.COMPLETE, this.onImgLoaded, this);
        img.anchorOffsetX = img.width / 2;
        img.anchorOffsetY = img.height / 2;
    };
    CharEffect.prototype.playCount = function () {
        return -1;
    };
    CharEffect.prototype.addMc = function (mcType, fileName, disType) {
        if (disType === void 0) { disType = 0; }
        if (this._mcFileName[mcType] == fileName)
            return;
        this._mcFileName[mcType] = fileName;
        var mc = this._disOrder[mcType];
        if (!mc) {
            if (disType == 0) {
                mc = ObjectPool.pop("MovieClip");
            }
            else {
                mc = new eui.Image();
            }
            this._bodyContainer.addChild(mc);
            this._disOrder[mcType] = mc;
        }
        if (mc instanceof MovieClip) {
            if (this.hasDir.indexOf(mcType) >= 0) {
                if (mc == this._body) {
                    this.loadBody();
                }
                else {
                    this.loadOther(mcType);
                }
            }
            else {
                this.loadNoDir(mcType);
            }
        }
        else {
            mc.addEventListener(egret.Event.COMPLETE, this.onImgLoaded, this);
            mc.source = fileName;
        }
        this.sortEffect();
        return mc;
    };
    CharEffect.prototype.removeMc = function (mcType) {
        if (mcType == CharMcOrder.BODY)
            return;
        var mc = this._disOrder[mcType];
        if (mc) {
            if (mc instanceof MovieClip) {
                this.removeMcEvent(mc);
                mc.destroy();
            }
            else {
                DisplayUtils.removeFromParent(mc);
            }
            delete this._mcFileName[mcType];
            delete this._disOrder[mcType];
        }
    };
    CharEffect.prototype.getMc = function (mcType) {
        return this._disOrder[mcType];
    };
    CharEffect.prototype.removeAll = function () {
        for (var mcType in this._disOrder) {
            var mc = this._disOrder[mcType];
            if (mc != this._body) {
                if (mc instanceof MovieClip) {
                    this.removeMcEvent(mc);
                    mc.destroy();
                }
                else {
                    DisplayUtils.removeFromParent(mc);
                }
                delete this._mcFileName[mcType];
                delete this._disOrder[mcType];
            }
        }
        this._body.dispose();
        this.removeBodyEvent(this._body);
        delete this._mcFileName[CharMcOrder.BODY];
    };
    CharEffect.prototype.addShadow = function () {
        if (!this.shadow) {
            this.shadow = new eui.Image(RES_DIR + "yingzi.png");
            this.addChildAt(this.shadow, 0);
            this.shadow.anchorOffsetX = 57 >> 1;
            this.shadow.anchorOffsetY = 37 >> 1;
        }
    };
    CharEffect.prototype.removeShadow = function () {
        if (this.shadow) {
            this.shadow.parent.removeChild(this.shadow);
            this.shadow = null;
        }
    };
    CharEffect.prototype.sortEffect = function () {
        var order = CharEffect.FRAME_ODER[this._dir];
        var len = order.length;
        var childIndex = 0;
        for (var i = 0; i < len; i++) {
            var index = order[i];
            if (this._disOrder[index] && this._disOrder[index].parent) {
                this._bodyContainer.addChildAt(this._disOrder[index], childIndex);
                childIndex += 1;
            }
        }
    };
    Object.defineProperty(CharEffect.prototype, "weight", {
        get: function () {
            return this.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharEffect.prototype, "team", {
        get: function () {
            return this.infoModel.team;
        },
        enumerable: true,
        configurable: true
    });
    CharEffect.prototype.destroy = function () {
        this.removeAll();
    };
    CharEffect.FRAME_ODER = [
        [CharMcOrder.WEAPON, CharMcOrder.SOUL, CharMcOrder.BODY, CharMcOrder.WING, CharMcOrder.ZHANLING],
        [CharMcOrder.BODY, CharMcOrder.WEAPON, CharMcOrder.SOUL, CharMcOrder.WING, CharMcOrder.ZHANLING],
        [CharMcOrder.WING, CharMcOrder.BODY, CharMcOrder.WEAPON, CharMcOrder.SOUL, CharMcOrder.ZHANLING],
        [CharMcOrder.WING, CharMcOrder.BODY, CharMcOrder.WEAPON, CharMcOrder.SOUL, CharMcOrder.ZHANLING],
        [CharMcOrder.WING, CharMcOrder.BODY, CharMcOrder.WEAPON, CharMcOrder.SOUL, CharMcOrder.ZHANLING],
        [CharMcOrder.WING, CharMcOrder.BODY, CharMcOrder.WEAPON, CharMcOrder.SOUL, CharMcOrder.ZHANLING],
        [CharMcOrder.WING, CharMcOrder.BODY, CharMcOrder.WEAPON, CharMcOrder.SOUL, CharMcOrder.ZHANLING],
        [CharMcOrder.BODY, CharMcOrder.WEAPON, CharMcOrder.SOUL, CharMcOrder.WING, CharMcOrder.ZHANLING],
    ];
    CharEffect.ACTION_ODER = {
        8: [EntityAction.STAND, EntityAction.RUN, EntityAction.ATTACK],
    };
    return CharEffect;
}(egret.DisplayObjectContainer));
__reflect(CharEffect.prototype, "CharEffect");
//# sourceMappingURL=CharEffect.js.map