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
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip() {
        var _this = _super.call(this) || this;
        _this.rate = 1;
        _this.pixelHitTest = false;
        _this._mcFactory = new egret.MovieClipDataFactory();
        _this.$hitTest = function (stageX, stageY) {
            var values = this.$DisplayObject;
            if (!values)
                return null;
            if (!this.$renderNode || !this.$visible || values[0] == 0 || values[1] == 0) {
                return null;
            }
            var m = this.$getInvertedConcatenatedMatrix();
            if (m.a == 0 && m.b == 0 && m.c == 0 && m.d == 0) {
                return null;
            }
            var bounds = this.$getContentBounds();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            if (bounds.contains(localX, localY)) {
                if (!this.$children) {
                    var rect = this.$scrollRect ? this.$scrollRect : this.$maskRect;
                    if (rect && !rect.contains(localX, localY)) {
                        return null;
                    }
                    if (this.$mask && !this.$mask.$hitTest(stageX, stageY)) {
                        return null;
                    }
                    if (this.pixelHitTest && this instanceof MovieClip && !this.hitTestPoint(stageX, stageY, true)) {
                        return null;
                    }
                }
                return this;
            }
            return null;
        };
        return _this;
    }
    MovieClip.prototype.playFile = function (name, playCount, compFun, remove) {
        var _this = this;
        if (playCount === void 0) { playCount = 1; }
        if (compFun === void 0) { compFun = null; }
        if (remove === void 0) { remove = true; }
        this.time = egret.getTimer();
        this._compFun = compFun;
        this.playCount = playCount;
        this.remove = remove;
        TimerManager.ins().remove(this.playComp, this);
        if (this.texture && this.texture.bitmapData == null) {
        }
        else if (this.name == name) {
            this.createBody();
            return;
        }
        this.name = name;
        if (this.texture) {
            MovieClip.removeDisplayObject(this, this.texture.bitmapData);
        }
        this.jsonData = null;
        this.texture = null;
        RES.getResByUrl(this.name + ".json", function (data, url) {
            if (_this.name + ".json" != url || !data)
                return;
            _this.jsonData = data;
            _this.createBody();
        }, this, RES.ResourceItem.TYPE_JSON);
        RES.getResByUrl(this.name + ".png", function (data, url) {
            if (_this.name + ".png" != url || !data)
                return;
            _this.texture = data;
            if (_this.stage) {
                MovieClip.addDisplayObject(_this, _this.texture.bitmapData);
            }
            _this.createBody();
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    MovieClip.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        if (this.texture) {
            MovieClip.addDisplayObject(this, this.texture.bitmapData);
        }
    };
    MovieClip.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        if (this.texture) {
            MovieClip.removeDisplayObject(this, this.texture.bitmapData);
        }
    };
    MovieClip.prototype.createBody = function () {
        if (!this.jsonData || !this.texture)
            return;
        this._mcFactory.clearCache();
        this._mcFactory.mcDataSet = this.jsonData;
        this._mcFactory.texture = this.texture;
        var temp = this.name.split("/");
        var tempName = temp.pop();
        if (this.name == "res/body/body000_0_0a") {
            Log.trace("body000_0_0a");
        }
        this.movieClipData = this._mcFactory.generateMovieClipData(tempName);
        if (!(this.name in MovieClip.originalRate)) {
            MovieClip.originalRate[this.name] = this.movieClipData.frameRate;
        }
        this.frameRate = (MovieClip.originalRate[this.name] * this.rate) >> 0;
        this.gotoAndPlay(1, this.playCount);
        this.visible = true;
        if (this.playCount > 0) {
            var tempTime = egret.getTimer() - this.time;
            tempTime = this.playTime * this.playCount - tempTime;
            if (tempTime > 0)
                TimerManager.ins().doTimer(tempTime, 1, this.playComp, this);
            else
                this.playComp();
        }
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    MovieClip.prototype.playComp = function () {
        if (this.stage && this._compFun)
            this._compFun();
        if (this.remove)
            DisplayUtils.removeFromParent(this);
    };
    Object.defineProperty(MovieClip.prototype, "playTime", {
        get: function () {
            if (!this.movieClipData)
                return 0;
            return 1 / this.frameRate * this.totalFrames * 1000;
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.clearComFun = function () {
        this._compFun = null;
    };
    MovieClip.prototype.dispose = function () {
        this.stop();
        this.resetMovieClip();
        this.clearComFun();
        TimerManager.ins().removeAll(this);
    };
    MovieClip.prototype.destroy = function () {
        DisplayUtils.removeFromParent(this);
        this.dispose();
        ObjectPool.push(this);
    };
    MovieClip.prototype.resetMovieClip = function () {
        var mc = this;
        mc.rotation = 0;
        mc.scaleX = 1;
        mc.scaleY = 1;
        mc.alpha = 1;
        mc.anchorOffsetX = 0;
        mc.anchorOffsetY = 0;
        mc.x = 0;
        mc.y = 0;
        mc.rate = 1;
        mc.$renderNode.cleanBeforeRender();
        mc._mcFactory.clearCache();
        mc._mcFactory.mcDataSet = null;
        mc._mcFactory.texture = null;
        mc.name = null;
        mc.jsonData = null;
        mc.filters = null;
        var bitmapData = mc.texture;
        if (bitmapData) {
            MovieClip.removeDisplayObject(mc, bitmapData.bitmapData);
        }
        mc.texture = null;
        mc.remove = false;
        egret.Tween.removeTweens(mc);
    };
    MovieClip.addDisplayObject = function (displayObject, bitmapData) {
        if (!bitmapData)
            return;
        var hashCode = bitmapData.hashCode;
        if (!MovieClip.displayList[hashCode]) {
            MovieClip.displayList[hashCode] = [displayObject];
            return;
        }
        var tempList = MovieClip.displayList[hashCode];
        if (tempList.indexOf(displayObject) < 0) {
            tempList.push(displayObject);
        }
    };
    MovieClip.removeDisplayObject = function (displayObject, bitmapData) {
        if (!bitmapData)
            return;
        var hashCode = bitmapData.hashCode;
        if (!MovieClip.displayList[hashCode]) {
            return;
        }
        var tempList = MovieClip.displayList[hashCode];
        var index = tempList.indexOf(displayObject);
        if (index >= 0) {
            tempList.splice(index, 1);
        }
        if (tempList.length == 0) {
            delete MovieClip.displayList[hashCode];
            ResourceMgr.ins().disposeResTime(hashCode);
        }
    };
    MovieClip.originalRate = {};
    MovieClip.displayList = egret.createMap();
    return MovieClip;
}(egret.MovieClip));
__reflect(MovieClip.prototype, "MovieClip");
//# sourceMappingURL=MovieClip.js.map