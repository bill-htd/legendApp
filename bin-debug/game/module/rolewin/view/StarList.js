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
var StarList = (function (_super) {
    __extends(StarList, _super);
    function StarList(listLength, starNum, spacing, isShowNum) {
        if (listLength === void 0) { listLength = 10; }
        if (starNum === void 0) { starNum = 0; }
        if (spacing === void 0) { spacing = 50; }
        if (isShowNum === void 0) { isShowNum = 1; }
        var _this = _super.call(this) || this;
        _this._statListLength = listLength;
        _this._starNum = starNum;
        _this.list = [];
        for (var i = 0; i < _this._statListLength; i++) {
            var starItem = new StarItem;
            starItem.x = i * spacing + 10;
            _this.addChild(starItem);
            if (i <= _this._starNum - 1)
                starItem.isShow(1);
            starItem.isShowFull(isShowNum);
            _this.list.push(starItem);
        }
        _this.mc = new MovieClip();
        _this.mc.scaleX = 1.5;
        _this.mc.scaleY = 1.5;
        return _this;
    }
    StarList.prototype.setStarNum = function (num, show) {
        if (show === void 0) { show = 0; }
        if (this._starNum == num)
            return;
        this._starNum = num;
        for (var i = 0; i < this._statListLength; i++) {
            if (i <= this._starNum - 1) {
                this.list[i].isShow(1);
                if (show == 1 && i == this._starNum - 1) {
                    this.mc.x = this.list[i].x + 24;
                    this.mc.y = this.list[i].y + 28;
                    if (!this.mc.parent) {
                        this.addChild(this.mc);
                    }
                    this.mc.playFile(RES_DIR_EFF + "minusstar", 1);
                }
            }
            else {
                this.list[i].isShow(0);
            }
        }
    };
    Object.defineProperty(StarList.prototype, "starNum", {
        get: function () {
            return this._starNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarList.prototype, "listLength", {
        get: function () {
            return this._statListLength;
        },
        enumerable: true,
        configurable: true
    });
    StarList.prototype.setlistLength = function (listLength, starNum, spacing, isShowNum) {
        if (listLength === void 0) { listLength = 10; }
        if (starNum === void 0) { starNum = 0; }
        if (spacing === void 0) { spacing = 50; }
        if (isShowNum === void 0) { isShowNum = 1; }
        for (var i = this._statListLength; i < listLength; i++) {
            var starItem = new StarItem;
            starItem.x = i * spacing + 10;
            this.addChild(starItem);
            if (i <= starNum - 1)
                starItem.isShow(1);
            starItem.isShowFull(isShowNum);
            this.list.push(starItem);
        }
        this._statListLength = listLength;
    };
    return StarList;
}(BaseView));
__reflect(StarList.prototype, "StarList");
//# sourceMappingURL=StarList.js.map