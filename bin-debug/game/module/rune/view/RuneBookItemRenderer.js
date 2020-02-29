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
var RuneBookItemRenderer = (function (_super) {
    __extends(RuneBookItemRenderer, _super);
    function RuneBookItemRenderer() {
        var _this = _super.call(this) || this;
        _this.keys = ['red', 'orange', 'purple', 'green', 'white'];
        _this.skinName = 'RuneOverViewItem';
        return _this;
    }
    RuneBookItemRenderer.prototype.dataChanged = function () {
        var data = this.data;
        if (data.title) {
            this.currentState = 'title';
            this.lbName.text = data.title;
        }
        else {
            var rbc = data.data;
            if (rbc) {
                if (rbc.checkpoint == 0) {
                    this.currentState = 'rune';
                }
                else {
                    this.currentState = 'nune_lock';
                    var config = GlobalConfig.FbChallengeConfig[rbc.checkpoint];
                    this.lbName.text = "\u901A\u5173\u901A\u5929\u5854" + GlobalConfig.FbChNameConfig[config.group].name + "\u89E3\u9501";
                }
                var maxId = rbc.id;
                for (var i = 0; i < this.keys.length; i++) {
                    var id = maxId - 100 * i;
                    var icon = this[this.keys[i]];
                    icon.setDataByItemConfig(GlobalConfig.ItemConfig[id]);
                }
            }
        }
    };
    return RuneBookItemRenderer;
}(BaseItemRender));
__reflect(RuneBookItemRenderer.prototype, "RuneBookItemRenderer");
var RuneBookItemData = (function () {
    function RuneBookItemData(data, title) {
        this.data = data;
        this.title = title;
        if (this.data) {
            this._itemConfig = GlobalConfig.ItemConfig[this.data.id];
        }
    }
    RuneBookItemData.prototype.getItemConfig = function () {
        return this._itemConfig;
    };
    return RuneBookItemData;
}());
__reflect(RuneBookItemData.prototype, "RuneBookItemData");
//# sourceMappingURL=RuneBookItemRenderer.js.map