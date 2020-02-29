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
var LadderStarListView = (function (_super) {
    __extends(LadderStarListView, _super);
    function LadderStarListView() {
        return _super.call(this) || this;
    }
    LadderStarListView.prototype.childrenCreated = function () {
        this.init();
    };
    LadderStarListView.prototype.init = function () {
        this.skinName = "LadderSratListSkin";
        this.level.anchorOffsetX = 10;
        this.level.anchorOffsetY = 14;
        this.level.x = 100;
        this.level.y = 141;
    };
    LadderStarListView.prototype.setLvAndRank = function (info) {
        if (info == undefined) {
            this.dwImg.source = "ladder_rank_0";
            this.level.source = null;
            return;
        }
        this.dwImg.source = "ladder_rank_" + info.level;
        if (info.level >= 4 || info.showDan <= 0 || info.showDan > 5) {
            this.level.source = null;
        }
        else {
            this.level.source = 'laddergradnum_' + info.showDan;
        }
    };
    LadderStarListView.prototype.updataStarInfo = function (info, change) {
        if (change === void 0) { change = true; }
        if (info) {
            this.len = Ladder.ins().getStatuByLevel(info.level);
            for (var i = 1; i <= 5; i++) {
                this["star" + i].currentState = i > info.showStar ? "black" : "light";
            }
        }
        else {
            this.len = 0;
        }
        this.currentState = this.len + "";
        this.setLvAndRank(info);
    };
    LadderStarListView.prototype.upStarStatu = function (index, num, light) {
        var _this = this;
        if (light === void 0) { light = false; }
        var times = num;
        var _index = light ? index : index - 1;
        var self = this;
        if (_index <= 0) {
            _index = 1;
        }
        if (this.mc == undefined) {
            this.mc = new MovieClip;
        }
        var item = this["star" + _index];
        this.mc.x = item.x + 22;
        this.mc.y = item.y + 22;
        this.addChild(this.mc);
        var len = this.len;
        if (light) {
            --times;
            this.mc.playFile(RES_DIR_EFF + "addstar", 1, function () {
                if (self.getChildIndex(self.mc) != -1)
                    self.removeChild(self.mc);
                item.currentState = "light";
                if (len == _index)
                    item.currentState = "black";
                if (times > 0 && _index < _this.len) {
                    _this.upStarStatu(++_index, times, light);
                }
            });
        }
        else {
            --times;
            --_index;
            this.mc.playFile(RES_DIR_EFF + "minusstar", 1, function () {
                if (self.getChildIndex(self.mc) != -1)
                    self.removeChild(self.mc);
                item.currentState = "black";
                if (_index == 0) {
                    var win = ViewManager.ins().getView(LadderResultWin);
                    if (win && win.isShow())
                        win.cheackIsChangeLevel(times);
                    _this.upSign = false;
                }
            });
            times = 0;
        }
        if (light && _index == this.len) {
            var win = ViewManager.ins().getView(LadderResultWin);
            if (win && win.isShow())
                win.cheackIsChangeLevel(times);
            this.upSign = true;
        }
    };
    LadderStarListView.prototype.showLvUp = function (currentLv) {
        this.numLevel = currentLv;
    };
    LadderStarListView.prototype.showRankUp = function (currentRank) {
        this.numRank = currentRank;
        this.rankMc = new MovieClip();
        this.rankMc.x = 100;
        this.rankMc.y = 99;
        this.rankMc.playFile(RES_DIR_EFF + "ladderlvup", 1, this.RankChangeCallback.bind(this));
        this.addChild(this.rankMc);
    };
    LadderStarListView.prototype.showLvDown = function (currentLv) {
        this.numLevel = currentLv;
        this.level.source = 'laddergradnum_' + this.numLevel;
    };
    LadderStarListView.prototype.RankChangeCallback = function () {
        this.dwImg.source = "ladder_rank_" + this.numRank;
        var tw = egret.Tween.get(this.dwImg);
        this.dwImg.alpha = 0;
        tw.to({ 'alpha': 1 }, 700);
    };
    return LadderStarListView;
}(BaseComponent));
__reflect(LadderStarListView.prototype, "LadderStarListView");
//# sourceMappingURL=LadderStarListView.js.map