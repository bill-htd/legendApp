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
var MergeJsonAnalyzer = (function (_super) {
    __extends(MergeJsonAnalyzer, _super);
    function MergeJsonAnalyzer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mergeJsons = ["MergeConfig_json"];
        return _this;
    }
    MergeJsonAnalyzer.prototype.analyzeData = function (resItem, data) {
        var name = resItem.name;
        if (this.fileDic[name] || !data) {
            return;
        }
        try {
            var jsonData = JSON.parse(data);
            if (this.mergeJsons.indexOf(name) != -1) {
                for (var key in jsonData) {
                    this.fileDic[key] = jsonData[key];
                }
            }
            else {
                this.fileDic[name] = jsonData;
            }
        }
        catch (e) {
            egret.$warn(1017, resItem.url, data);
        }
    };
    return MergeJsonAnalyzer;
}(RES.JsonAnalyzer));
__reflect(MergeJsonAnalyzer.prototype, "MergeJsonAnalyzer");
//# sourceMappingURL=MergeJsonAnalyzer.js.map