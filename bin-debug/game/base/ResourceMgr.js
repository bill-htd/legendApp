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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ResourceMgr = (function (_super) {
    __extends(ResourceMgr, _super);
    function ResourceMgr() {
        var _this = _super.call(this) || this;
        _this.isFirstEnter = true;
        _this.resDisTime = {};
        _this.isDelayDestroy = false;
        _this.observe(GameLogic.ins().postEnterMap, _this.destroy);
        return _this;
    }
    ResourceMgr.ins = function () {
        return _super.ins.call(this);
    };
    ResourceMgr.prototype.start = function () {
        TimerManager.ins().doTimer(60000 * 5, 0, this.destroy, this);
    };
    ResourceMgr.prototype.destroy = function () {
        if (!this.isFirstEnter) {
            this.destroyRes();
        }
        else {
            this.isFirstEnter = false;
            this.start();
        }
    };
    ResourceMgr.prototype.destroyWin = function () {
        this.destroyUIRes();
    };
    ResourceMgr.prototype.disposeResTime = function (hashCode) {
        this.resDisTime[hashCode] = egret.getTimer();
    };
    ResourceMgr.prototype.destroyRes = function () {
        var baseAnalyzer = RES.getAnalyzer(RES.ResourceItem.TYPE_IMAGE);
        var fileDic = baseAnalyzer['fileDic'];
        var t = egret.getTimer();
        for (var key in fileDic) {
            if (key.indexOf(RES_DIR) < 0)
                continue;
            var texture = fileDic[key];
            if (this.checkMcCanDestroy(texture.bitmapData) && this.checkCanDestroy(texture)) {
                RES.destroyRes(key);
            }
            if (egret.getTimer() - t > 3) {
                break;
            }
        }
    };
    ResourceMgr.prototype.destroyUIRes = function () {
        var baseAnalyzer = RES.getAnalyzer(RES.ResourceItem.TYPE_IMAGE);
        var fileDic = baseAnalyzer['fileDic'];
        var baseJson = RES.getAnalyzer(RES.ResourceItem.TYPE_JSON);
        var resConfig = baseJson["resourceConfig"];
        var t = egret.getTimer();
        for (var key in fileDic) {
            var json = resConfig.getRawResourceItem(key);
            if (json && json.url.indexOf("image/public/") >= 0) {
                continue;
            }
            if (key.indexOf(MAP_DIR) >= 0 || (key.indexOf(RES_DIR) >= 0 && key.indexOf(RES_DIR_EFF) < 0))
                continue;
            var texture = fileDic[key];
            if (this.checkCanDestroy(texture) && this.checkMcCanDestroy(texture.bitmapData)) {
                RES.destroyRes(key);
            }
            if (egret.getTimer() - t > 3) {
                break;
            }
        }
    };
    ResourceMgr.prototype.checkBitmapSize = function () {
        var baseAnalyzer = RES.getAnalyzer(RES.ResourceItem.TYPE_IMAGE);
        var fileDic = baseAnalyzer['fileDic'];
        var bit = 0;
        for (var key in fileDic) {
            var texture = baseAnalyzer.getRes(key);
            bit += texture.bitmapData.width * texture.bitmapData.height * 4;
        }
        console.log("bit:" + bit);
        return bit;
    };
    ResourceMgr.prototype.checkCanDestroy = function (bitmapData) {
        var hashCode;
        if (bitmapData.bitmapData && bitmapData.bitmapData.hashCode) {
            hashCode = bitmapData.bitmapData.hashCode;
        }
        else {
            hashCode = bitmapData.hashCode;
        }
        if (!hashCode) {
            return false;
        }
        var arr = egret.BitmapData['_displayList'][hashCode];
        if (!arr || !arr.length) {
            if (!this.resDisTime[hashCode])
                return true;
            if ((egret.getTimer() - this.resDisTime[hashCode]) > 2500) {
                delete egret.BitmapData['_displayList'][hashCode];
                delete this.resDisTime[hashCode];
                return true;
            }
        }
        return false;
    };
    ResourceMgr.prototype.checkMcCanDestroy = function (bitmapData) {
        if (!bitmapData)
            return false;
        var hashCode = bitmapData.hashCode;
        var arr = MovieClip.displayList[hashCode];
        if (!arr || !arr.length) {
            if (!this.resDisTime[hashCode])
                return true;
            if ((egret.getTimer() - this.resDisTime[hashCode]) > 2500) {
                delete MovieClip.displayList[hashCode];
                delete this.resDisTime[hashCode];
                return true;
            }
        }
        return false;
    };
    ResourceMgr.prototype.reloadContainer = function (obj) {
        var num = obj.numChildren;
        for (var i = 0; i < num; i++) {
            var img = obj.getChildAt(i);
            if (img instanceof eui.Image) {
                this.reloadImg(img);
            }
            else if (img instanceof egret.DisplayObjectContainer) {
                this.reloadContainer(img);
            }
        }
    };
    ResourceMgr.prototype.reloadImg = function (image) {
        var source = image.source;
        if (source) {
            if (image.texture && image.texture.bitmapData)
                return;
            image.source = null;
            image.source = source;
        }
    };
    __decorate([
        callDelay(3000)
    ], ResourceMgr.prototype, "destroyRes", null);
    __decorate([
        callDelay(3000)
    ], ResourceMgr.prototype, "destroyUIRes", null);
    return ResourceMgr;
}(BaseSystem));
__reflect(ResourceMgr.prototype, "ResourceMgr");
var GameSystem;
(function (GameSystem) {
    GameSystem.resourceMgr = ResourceMgr.ins.bind(ResourceMgr);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=ResourceMgr.js.map