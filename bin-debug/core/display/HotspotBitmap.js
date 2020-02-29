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
var HotspotBitmap = (function (_super) {
    __extends(HotspotBitmap, _super);
    function HotspotBitmap() {
        var _this = _super.call(this) || this;
        _this._hotspot = [];
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouch, _this);
        return _this;
    }
    HotspotBitmap.prototype.addHotspotArea = function (rect, callBack, thisObj, para) {
        this._hotspot.push({ "rect": rect, "callBack": callBack, "thisObj": thisObj, "para": para });
    };
    HotspotBitmap.prototype.onTouch = function (e) {
        var x = e.localX;
        var y = e.localY;
        var tempObj;
        for (var i = 0; i < this._hotspot.length; i++) {
            tempObj = this._hotspot[i];
            if (tempObj.rect.contains(x, y)) {
                if (tempObj.para)
                    tempObj.callBack.call(tempObj.thisObj, tempObj.para);
                else
                    tempObj.callBack.call(tempObj.thisObj);
            }
        }
    };
    return HotspotBitmap;
}(egret.Bitmap));
__reflect(HotspotBitmap.prototype, "HotspotBitmap");
//# sourceMappingURL=HotspotBitmap.js.map