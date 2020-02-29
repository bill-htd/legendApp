var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIAnimation = (function () {
    function UIAnimation() {
    }
    UIAnimation.setAnimation = function (eobj, aniType, others) {
        if (!UIAnimation.checkObj(eobj)) {
            if (others && typeof (others.func) == "function")
                others.func();
            return;
        }
        var obj;
        var className = egret.getQualifiedClassName(eobj);
        switch (className) {
            case "eui.Button":
                obj = eobj;
                break;
            case "eui.ToggleButton":
                obj = eobj;
                break;
            case "eui.Image":
                obj = eobj;
                break;
            case "eui.Group":
                obj = eobj;
                break;
            case "eui.Rect":
                obj = eobj;
                break;
            case "BaseComponent":
                obj = eobj;
                break;
            case "eui.TabBar":
                obj = eobj;
                break;
            default:
                obj = eobj;
                break;
        }
        if (!obj)
            return;
        egret.Tween.removeTweens(obj);
        var sx = NaN;
        var sxleft = NaN;
        var sxhro = NaN;
        var sxright = NaN;
        var sxscaleX = NaN;
        var ex = NaN;
        var exleft = NaN;
        var exhro = NaN;
        var exright = NaN;
        var exscaleX = NaN;
        var sy = NaN;
        var sytop = NaN;
        var syver = NaN;
        var sybot = NaN;
        var syscaleY = NaN;
        var ey = NaN;
        var eytop = NaN;
        var eyver = NaN;
        var eybot = NaN;
        var eyscaleY = NaN;
        var salpha = NaN;
        var ealpha = NaN;
        switch (aniType) {
            case UIAnimation.ANITYPE_FADEIN_LEFT_HOR:
                if (!isNaN(obj.left)) {
                    sxleft = obj.left - UIAnimation.diff;
                    exleft = obj.left;
                }
                if (!isNaN(obj.horizontalCenter)) {
                    sxhro = obj.horizontalCenter - UIAnimation.diff;
                    exhro = obj.horizontalCenter;
                }
                if (!isNaN(obj.right)) {
                    sxright = obj.right + UIAnimation.diff;
                    exright = obj.right;
                }
                if (!isNaN(obj.alpha)) {
                    salpha = 0;
                    ealpha = obj.alpha;
                }
                if (!isNaN(obj.x)) {
                    sx = obj.x - UIAnimation.diff;
                    ex = obj.x;
                }
                if (!isNaN(obj.scaleX)) {
                    sxscaleX = obj.scaleX;
                    exscaleX = obj.scaleX;
                }
                if (!isNaN(obj.scaleY)) {
                    syscaleY = obj.scaleY;
                    eyscaleY = obj.scaleY;
                }
                break;
            case UIAnimation.ANITYPE_FADEIN_RIGHT_HOR:
                if (!isNaN(obj.left)) {
                    sxleft = obj.left + UIAnimation.diff;
                    exleft = obj.left;
                }
                if (!isNaN(obj.horizontalCenter)) {
                    sxhro = obj.horizontalCenter + UIAnimation.diff;
                    exhro = obj.horizontalCenter;
                }
                if (!isNaN(obj.right)) {
                    sxright = obj.right - UIAnimation.diff;
                    exright = obj.right;
                }
                if (!isNaN(obj.alpha)) {
                    salpha = 0;
                    ealpha = obj.alpha;
                }
                if (!isNaN(obj.x)) {
                    sx = obj.x + UIAnimation.diff;
                    ex = obj.x;
                }
                if (!isNaN(obj.scaleX)) {
                    sxscaleX = obj.scaleX;
                    exscaleX = obj.scaleX;
                }
                if (!isNaN(obj.scaleY)) {
                    syscaleY = obj.scaleY;
                    eyscaleY = obj.scaleY;
                }
                break;
            case UIAnimation.ANITYPE_FADEIN_UP_VER:
                if (!isNaN(obj.top)) {
                    sytop = obj.top - UIAnimation.diff;
                    eytop = obj.top;
                }
                if (!isNaN(obj.verticalCenter)) {
                    syver = obj.verticalCenter - UIAnimation.diff;
                    eyver = obj.verticalCenter;
                }
                if (!isNaN(obj.bottom)) {
                    sybot = obj.bottom + UIAnimation.diff;
                    eybot = obj.bottom;
                }
                if (!isNaN(obj.alpha)) {
                    salpha = 0;
                    ealpha = obj.alpha;
                }
                if (!isNaN(obj.y)) {
                    sy = obj.y - UIAnimation.diff;
                    ey = obj.y;
                }
                if (!isNaN(obj.scaleX)) {
                    sxscaleX = obj.scaleX;
                    exscaleX = obj.scaleX;
                }
                if (!isNaN(obj.scaleY)) {
                    syscaleY = obj.scaleY;
                    eyscaleY = obj.scaleY;
                }
                break;
            case UIAnimation.ANITYPE_FADEIN_DOWN_VER:
                if (!isNaN(obj.top)) {
                    sytop = obj.top + UIAnimation.diff;
                    eytop = obj.top;
                }
                if (!isNaN(obj.verticalCenter)) {
                    syver = obj.verticalCenter + UIAnimation.diff;
                    eyver = obj.verticalCenter;
                }
                if (!isNaN(obj.bottom)) {
                    sybot = obj.bottom - UIAnimation.diff;
                    eybot = obj.bottom;
                }
                if (!isNaN(obj.alpha)) {
                    salpha = 0;
                    ealpha = obj.alpha;
                }
                if (!isNaN(obj.y)) {
                    sy = obj.y + UIAnimation.diff;
                    ey = obj.y;
                }
                if (!isNaN(obj.scaleX)) {
                    sxscaleX = obj.scaleX;
                    exscaleX = obj.scaleX;
                }
                if (!isNaN(obj.scaleY)) {
                    syscaleY = obj.scaleY;
                    eyscaleY = obj.scaleY;
                }
                break;
            case UIAnimation.ANITYPE_IN_LEFT_HOR:
                if (!isNaN(obj.left)) {
                    sxleft = obj.left - obj.width;
                    exleft = obj.left;
                }
                if (!isNaN(obj.horizontalCenter)) {
                    sxhro = obj.horizontalCenter - obj.width;
                    exhro = obj.horizontalCenter;
                }
                if (!isNaN(obj.right)) {
                    sxright = obj.right + obj.width;
                    exright = obj.right;
                }
                if (!isNaN(obj.alpha)) {
                    salpha = 0;
                    ealpha = obj.alpha;
                }
                if (!isNaN(obj.x)) {
                    sx = obj.x - obj.width;
                    ex = obj.x;
                }
                if (!isNaN(obj.scaleX)) {
                    sxscaleX = obj.scaleX;
                    exscaleX = obj.scaleX;
                }
                if (!isNaN(obj.scaleY)) {
                    syscaleY = obj.scaleY;
                    eyscaleY = obj.scaleY;
                }
                break;
            case UIAnimation.ANITYPE_IN_RIGHT_HOR:
                if (!isNaN(obj.left)) {
                    sxleft = obj.left + obj.width;
                    exleft = obj.left;
                }
                if (!isNaN(obj.horizontalCenter)) {
                    sxhro = obj.horizontalCenter + obj.width * UIAnimation.hroWidh;
                    exhro = obj.horizontalCenter;
                }
                if (!isNaN(obj.right)) {
                    sxright = obj.right - obj.width * UIAnimation.hroWidh;
                    exright = obj.right;
                }
                if (!isNaN(obj.alpha)) {
                    salpha = 0;
                    ealpha = obj.alpha;
                }
                if (!isNaN(obj.x)) {
                    sx = obj.x + obj.width * UIAnimation.hroWidh;
                    ex = obj.x;
                }
                if (!isNaN(obj.scaleX)) {
                    sxscaleX = obj.scaleX;
                    exscaleX = obj.scaleX;
                }
                if (!isNaN(obj.scaleY)) {
                    syscaleY = obj.scaleY;
                    eyscaleY = obj.scaleY;
                }
                break;
            case UIAnimation.ANITYPE_IN_UP_VER:
                if (!isNaN(obj.top)) {
                    sytop = obj.top - obj.height;
                    eytop = obj.top;
                }
                if (!isNaN(obj.verticalCenter)) {
                    syver = obj.verticalCenter - obj.height;
                    eyver = obj.verticalCenter;
                }
                if (!isNaN(obj.bottom)) {
                    sybot = obj.bottom + obj.height;
                    eybot = obj.bottom;
                }
                if (!isNaN(obj.alpha)) {
                    salpha = 0;
                    ealpha = obj.alpha;
                }
                if (!isNaN(obj.y)) {
                    sy = obj.y - obj.height;
                    ey = obj.y;
                }
                if (!isNaN(obj.scaleX)) {
                    sxscaleX = obj.scaleX;
                    exscaleX = obj.scaleX;
                }
                if (!isNaN(obj.scaleY)) {
                    syscaleY = obj.scaleY;
                    eyscaleY = obj.scaleY;
                }
                break;
            case UIAnimation.ANITYPE_IN_DOWN_VER:
                if (!isNaN(obj.top)) {
                    sytop = obj.top + obj.height;
                    eytop = obj.top;
                }
                if (!isNaN(obj.verticalCenter)) {
                    syver = obj.verticalCenter + obj.height;
                    eyver = obj.verticalCenter;
                }
                if (!isNaN(obj.bottom)) {
                    sybot = obj.bottom - obj.height;
                    eybot = obj.bottom;
                }
                if (!isNaN(obj.alpha)) {
                    salpha = 0;
                    ealpha = obj.alpha;
                }
                if (!isNaN(obj.y)) {
                    sy = obj.y + obj.height;
                    ey = obj.y;
                }
                if (!isNaN(obj.scaleX)) {
                    sxscaleX = obj.scaleX;
                    exscaleX = obj.scaleX;
                }
                if (!isNaN(obj.scaleY)) {
                    syscaleY = obj.scaleY;
                    eyscaleY = obj.scaleY;
                }
                break;
            case UIAnimation.ANITYPE_OUT_LEFT_HOR:
                if (!isNaN(obj.left)) {
                    sxleft = obj.left;
                    exleft = obj.left - obj.width;
                }
                if (!isNaN(obj.horizontalCenter)) {
                    sxhro = obj.horizontalCenter;
                    exhro = obj.horizontalCenter - obj.width;
                }
                if (!isNaN(obj.right)) {
                    sxright = obj.right;
                    exright = obj.right + obj.width;
                }
                if (!isNaN(obj.alpha)) {
                    salpha = obj.alpha;
                    ealpha = 0;
                }
                if (!isNaN(obj.x)) {
                    sx = obj.x;
                    ex = obj.x - obj.width;
                }
                if (!isNaN(obj.scaleX)) {
                    sxscaleX = obj.scaleX;
                    exscaleX = obj.scaleX;
                }
                if (!isNaN(obj.scaleY)) {
                    syscaleY = obj.scaleY;
                    eyscaleY = obj.scaleY;
                }
                break;
            case UIAnimation.ANITYPE_OUT_RIGHT_HOR:
                if (!isNaN(obj.left)) {
                    sxleft = obj.left + obj.width;
                    exleft = obj.left;
                }
                if (!isNaN(obj.horizontalCenter)) {
                    sxhro = obj.horizontalCenter;
                    exhro = obj.horizontalCenter + obj.width * UIAnimation.hroWidh;
                }
                if (!isNaN(obj.right)) {
                    sxright = obj.right;
                    exright = obj.right - obj.width * UIAnimation.hroWidh;
                }
                if (!isNaN(obj.alpha)) {
                    salpha = obj.alpha;
                    ealpha = 0;
                }
                if (!isNaN(obj.x)) {
                    sx = obj.x;
                    ex = obj.x + obj.width * UIAnimation.hroWidh;
                }
                if (!isNaN(obj.scaleX)) {
                    sxscaleX = obj.scaleX;
                    exscaleX = obj.scaleX;
                }
                if (!isNaN(obj.scaleY)) {
                    syscaleY = obj.scaleY;
                    eyscaleY = obj.scaleY;
                }
                break;
            case UIAnimation.ANITYPE_OUT_UP_VER:
                if (!isNaN(obj.top)) {
                    sytop = obj.top;
                    eytop = obj.top - obj.height;
                }
                if (!isNaN(obj.verticalCenter)) {
                    syver = obj.verticalCenter;
                    eyver = obj.verticalCenter - obj.height;
                }
                if (!isNaN(obj.bottom)) {
                    sybot = obj.bottom;
                    eybot = obj.bottom + obj.height;
                }
                if (!isNaN(obj.alpha)) {
                    salpha = obj.alpha;
                    ealpha = 0;
                }
                if (!isNaN(obj.y)) {
                    sy = obj.y;
                    ey = obj.y - obj.height;
                }
                if (!isNaN(obj.scaleX)) {
                    sxscaleX = obj.scaleX;
                    exscaleX = obj.scaleX;
                }
                if (!isNaN(obj.scaleY)) {
                    syscaleY = obj.scaleY;
                    eyscaleY = obj.scaleY;
                }
                break;
            case UIAnimation.ANITYPE_OUT_DOWN_VER:
                if (!isNaN(obj.top)) {
                    sytop = obj.top;
                    eytop = obj.top + obj.height;
                }
                if (!isNaN(obj.verticalCenter)) {
                    syver = obj.verticalCenter;
                    eyver = obj.verticalCenter + obj.height;
                }
                if (!isNaN(obj.bottom)) {
                    sybot = obj.bottom;
                    eybot = obj.bottom - obj.height;
                }
                if (!isNaN(obj.alpha)) {
                    salpha = obj.alpha;
                    ealpha = 0;
                }
                if (!isNaN(obj.y)) {
                    sy = obj.y;
                    ey = obj.y + obj.height;
                }
                if (!isNaN(obj.scaleX)) {
                    sxscaleX = obj.scaleX;
                    exscaleX = obj.scaleX;
                }
                if (!isNaN(obj.scaleY)) {
                    syscaleY = obj.scaleY;
                    eyscaleY = obj.scaleY;
                }
                break;
            case UIAnimation.ANITYPE_IN_SCALE_VER:
                if (!isNaN(obj.scaleX)) {
                    sxscaleX = 0.5;
                    exscaleX = obj.scaleX;
                }
                if (!isNaN(obj.scaleY)) {
                    syscaleY = 0.5;
                    eyscaleY = obj.scaleY;
                }
                break;
            case UIAnimation.ANITYPE_OUT_SCALE_VER:
                if (!isNaN(obj.scaleX)) {
                    sxscaleX = obj.scaleX;
                    exscaleX = 0;
                }
                if (!isNaN(obj.scaleY)) {
                    syscaleY = obj.scaleY;
                    eyscaleY = 0;
                }
                break;
        }
        sx = sx ? sx : obj.x;
        sxleft = sxleft ? sxleft : obj.left;
        sxhro = sxhro ? sxhro : obj.horizontalCenter;
        sxright = sxright ? sxright : obj.right;
        sxscaleX = sxscaleX ? sxscaleX : obj.scaleX;
        ex = ex ? ex : obj.x;
        exleft = exleft ? exleft : obj.left;
        exhro = exhro ? exhro : obj.horizontalCenter;
        exright = exright ? exright : obj.right;
        exscaleX = exscaleX == 0 ? exscaleX : obj.scaleX;
        sy = sy ? sy : obj.y;
        sytop = sytop ? sytop : obj.top;
        syver = syver ? syver : obj.verticalCenter;
        sybot = sybot ? sybot : obj.bottom;
        syscaleY = syscaleY ? syscaleY : obj.scaleY;
        ey = ey ? ey : obj.y;
        eytop = eytop ? eytop : obj.top;
        eyver = eyver ? eyver : obj.verticalCenter;
        eybot = eybot ? eybot : obj.bottom;
        eyscaleY = eyscaleY == 0 ? eyscaleY : obj.scaleY;
        salpha = salpha == 0 ? salpha : obj.alpha;
        ealpha = ealpha == 0 ? ealpha : 1;
        UIAnimation.aniStartEUI(obj, {
            sx: sx, sxleft: sxleft, sxhro: sxhro, sxright: sxright,
            ex: ex, exleft: exleft, exhro: exhro, exright: exright,
            sy: sy, sytop: sytop, syver: syver, sybot: sybot,
            ey: ey, eytop: eytop, eyver: eyver, eybot: eybot,
            salpha: salpha, ealpha: ealpha,
            sxscaleX: sxscaleX, exscaleX: exscaleX,
            syscaleY: syscaleY, eyscaleY: eyscaleY
        }, others);
    };
    UIAnimation.aniStartEUI = function (obj, dir, others) {
        obj.x = dir.sx;
        obj.left = dir.sxleft;
        obj.horizontalCenter = dir.sxhro;
        obj.right = dir.sxright;
        obj.y = dir.sy;
        obj.top = dir.sytop;
        obj.verticalCenter = dir.syver;
        obj.bottom = dir.sybot;
        obj.alpha = dir.salpha;
        obj.scaleX = dir.sxscaleX;
        obj.scaleY = dir.syscaleY;
        var tw = egret.Tween.get(obj);
        var t = others ? (others.time ? others.time : UIAnimation.time) : UIAnimation.time;
        var ease = others ? (others.ease ? others.ease : UIAnimation.Egret_Ease) : UIAnimation.Egret_Ease;
        tw.to({
            x: dir.ex, left: dir.exleft, horizontalCenter: dir.exhro, right: dir.exright,
            y: dir.ey, top: dir.eytop, verticalCenter: dir.eyver, bottom: dir.eybot,
            alpha: dir.ealpha, scaleX: dir.exscaleX, scaleY: dir.eyscaleY
        }, t, ease).call(function () {
            obj.x = dir.ex;
            obj.left = dir.exleft;
            obj.horizontalCenter = dir.exhro;
            obj.right = dir.exright;
            obj.y = dir.ey;
            obj.top = dir.eytop;
            obj.verticalCenter = dir.eyver;
            obj.bottom = dir.eybot;
            obj.alpha = dir.ealpha;
            obj.scaleX = dir.exscaleX;
            obj.scaleY = dir.eyscaleY;
            UIAnimation.cleanObj(obj);
            egret.Tween.removeTweens(obj);
            if (others && typeof (others.func) == "function")
                others.func();
        });
    };
    UIAnimation.checkObj = function (obj) {
        if (UIAnimation.aniMap[obj.hashCode])
            return false;
        UIAnimation.aniMap[obj.hashCode] = obj;
        return true;
    };
    UIAnimation.cleanObj = function (obj) {
        if (UIAnimation.aniMap[obj.hashCode])
            delete UIAnimation.aniMap[obj.hashCode];
    };
    UIAnimation.ANITYPE_FADEIN_LEFT_HOR = 1;
    UIAnimation.ANITYPE_FADEIN_RIGHT_HOR = 2;
    UIAnimation.ANITYPE_FADEIN_UP_VER = 3;
    UIAnimation.ANITYPE_FADEIN_DOWN_VER = 4;
    UIAnimation.ANITYPE_IN_LEFT_HOR = 5;
    UIAnimation.ANITYPE_IN_RIGHT_HOR = 6;
    UIAnimation.ANITYPE_IN_UP_VER = 7;
    UIAnimation.ANITYPE_IN_DOWN_VER = 8;
    UIAnimation.ANITYPE_OUT_LEFT_HOR = 9;
    UIAnimation.ANITYPE_OUT_RIGHT_HOR = 10;
    UIAnimation.ANITYPE_OUT_UP_VER = 11;
    UIAnimation.ANITYPE_OUT_DOWN_VER = 12;
    UIAnimation.ANITYPE_IN_SCALE_VER = 13;
    UIAnimation.ANITYPE_OUT_SCALE_VER = 14;
    UIAnimation.diff = 50;
    UIAnimation.time = 200;
    UIAnimation.Egret_Ease = egret.Ease.backInOut;
    UIAnimation.aniMap = {};
    UIAnimation.hroWidh = 1.5;
    return UIAnimation;
}());
__reflect(UIAnimation.prototype, "UIAnimation");
//# sourceMappingURL=UIAnimation.js.map