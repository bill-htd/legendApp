var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Bezier = (function () {
    function Bezier(fp, ep) {
        this._fromPoint = fp;
        this._toPoint = ep;
    }
    Bezier.pop = function (fp, ep) {
        var bezier = null;
        if (this._pool.length) {
            bezier = this._pool.pop();
            bezier.fromPoint = fp;
            bezier.toPoint = ep;
        }
        else {
            bezier = new Bezier(fp, ep);
        }
        return bezier;
    };
    Bezier.push = function (bezier) {
        if (bezier) {
            bezier.display = null;
            bezier.ease = null;
            bezier.fromPoint = null;
            bezier.toPoint = null;
            bezier.centerPoint = null;
            this._pool.push(bezier);
        }
    };
    Object.defineProperty(Bezier.prototype, "fromPoint", {
        set: function (value) {
            this._fromPoint = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bezier.prototype, "toPoint", {
        set: function (value) {
            this._toPoint = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bezier.prototype, "display", {
        set: function (value) {
            this._display = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bezier.prototype, "ease", {
        set: function (value) {
            this._ease = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bezier.prototype, "centerPoint", {
        set: function (value) {
            this._centerPoint = value;
        },
        enumerable: true,
        configurable: true
    });
    Bezier.prototype.start = function (time, callback, callObj, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        egret.Tween.get(this).wait(delay).to({ factor: 1 }, time, this._ease).call(function () {
            egret.Tween.removeTweens(_this);
            if (callback) {
                callback.call(callObj);
            }
        });
    };
    Object.defineProperty(Bezier.prototype, "factor", {
        get: function () {
            return 0;
        },
        set: function (value) {
            this._display.x = (1 - value) * (1 - value) * this._fromPoint.x + 2 * value * (1 - value) * this._centerPoint.x + value * value * this._toPoint.x;
            this._display.y = (1 - value) * (1 - value) * this._fromPoint.y + 2 * value * (1 - value) * this._centerPoint.y + value * value * this._toPoint.y;
        },
        enumerable: true,
        configurable: true
    });
    Bezier._pool = [];
    return Bezier;
}());
__reflect(Bezier.prototype, "Bezier");
//# sourceMappingURL=Bezier.js.map