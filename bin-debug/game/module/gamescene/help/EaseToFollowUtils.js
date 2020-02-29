var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EaseToFollowUtils = (function () {
    function EaseToFollowUtils() {
    }
    EaseToFollowUtils.startTweenMove = function (followers, followTarget, callback, finishFunc) {
        var itemsTemp = [];
        EaseToFollowUtils.followTarget = followTarget;
        if (typeof followers == "object") {
            for (var key in followers) {
                itemsTemp.push(followers[key]);
            }
        }
        else if (Array.isArray(followers)) {
            itemsTemp = followers;
        }
        EaseToFollowUtils.arrowArray = itemsTemp;
        EaseToFollowUtils.callBack = callback;
        EaseToFollowUtils.finishFunc = finishFunc;
        TimerManager.ins().remove(EaseToFollowUtils.onEnterFrame, EaseToFollowUtils);
        TimerManager.ins().doTimer(10, 0, EaseToFollowUtils.onEnterFrame, EaseToFollowUtils);
    };
    EaseToFollowUtils.onEnterFrame = function () {
        if (Assert(EaseToFollowUtils.followTarget, "the easeToFollow followTarget is null"))
            return;
        var items = EaseToFollowUtils.arrowArray;
        var isLine = items.length < 5;
        for (var i = 0; i < items.length; i++) {
            if (i > 0 && isLine) {
                EaseToFollowUtils.calEvery(items[i - 1].x, items[i - 1].y, items[i]);
            }
            else {
                if (items[i] == null)
                    return;
                EaseToFollowUtils.calEvery(EaseToFollowUtils.followTarget.x, EaseToFollowUtils.followTarget.y - 50, items[i]);
            }
        }
    };
    EaseToFollowUtils.calEvery = function (targetX, targetY, currentArrow) {
        EaseToFollowUtils.dx = targetX - currentArrow.x;
        EaseToFollowUtils.dy = targetY - currentArrow.y;
        if (Math.abs(EaseToFollowUtils.dx) < 30 && Math.abs(EaseToFollowUtils.dy) < 30) {
            EaseToFollowUtils.vx = 0;
            EaseToFollowUtils.vy = 0;
            var index = EaseToFollowUtils.arrowArray.indexOf(currentArrow);
            if (index > -1) {
                EaseToFollowUtils.arrowArray.splice(index, 1);
                if (EaseToFollowUtils.callBack) {
                    EaseToFollowUtils.callBack(currentArrow);
                }
            }
            if (EaseToFollowUtils.arrowArray.length == 0) {
                EaseToFollowUtils.dispose(currentArrow);
                return;
            }
        }
        else {
            EaseToFollowUtils.easing += 0.004;
            EaseToFollowUtils.vx = EaseToFollowUtils.dx * EaseToFollowUtils.easing;
            EaseToFollowUtils.vy = EaseToFollowUtils.dy * EaseToFollowUtils.easing;
        }
        currentArrow.x += EaseToFollowUtils.vx;
        currentArrow.y += EaseToFollowUtils.vy;
    };
    EaseToFollowUtils.dispose = function (item) {
        TimerManager.ins().remove(EaseToFollowUtils.onEnterFrame, EaseToFollowUtils);
        EaseToFollowUtils.followTarget = null;
        EaseToFollowUtils.callBack = null;
        EaseToFollowUtils.arrowArray = [];
        EaseToFollowUtils.easing = 0.04;
        if (EaseToFollowUtils.finishFunc) {
            EaseToFollowUtils.finishFunc();
            EaseToFollowUtils.finishFunc = null;
        }
    };
    EaseToFollowUtils.easing = 0.04;
    EaseToFollowUtils.vx = 0;
    EaseToFollowUtils.vy = 0;
    EaseToFollowUtils.isFirst = true;
    return EaseToFollowUtils;
}());
__reflect(EaseToFollowUtils.prototype, "EaseToFollowUtils");
//# sourceMappingURL=EaseToFollowUtils.js.map