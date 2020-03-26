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
var GameApp = (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        var _this = _super.call(this) || this;
        _this.preload_load_count = 0;
        _this.map_load_count = 0;
        return _this;
    }
    GameApp.ins = function () {
        return _super.ins.call(this);
    };
    GameApp.prototype.loadWeb = function () {
        var groupName = "firstLoad";
        ResourceUtils.ins().loadGroup(groupName, this.complete, this.progress, this);
    };
    GameApp.prototype.load = function (loadingView) {
        this.loadingView = loadingView;
        var groupName = "firstLoad";
        ResourceUtils.ins().loadGroup(groupName, this.complete, this.progress, this);
    };
    GameApp.prototype.complete = function () {
        var _this = this;
        RES.getResByUrl(MAP_DIR + "maps.json", function (data) {
            _this.map_load_count += 1;
            if (Assert(data, "maps.json \u5730\u56FE\u6570\u636E\u52A0\u8F7D\u5931\u8D25!!\u52A0\u8F7D\u6B21\u6570\uFF1A" + _this.map_load_count)) {
                if (_this.map_load_count < 3) {
                    _this.complete();
                }
                else {
                    alert("\u5730\u56FE\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u91CD\u65B0\u767B\u5F55");
                }
                return;
            }
            Assert(_this.map_load_count == 1, "maps.json \u91CD\u65B0\u52A0\u8F7D\u6210\u529F\u3002\u52A0\u8F7D\u6B21\u6570\uFF1A" + _this.map_load_count);
            ReportData.getIns().report('loaded', ReportData.LOAD);
            for (var i in GameSystem) {
                GameSystem[i]();
            }
            GlobalConfig.init();
            GameMap.init(data);
            if (window['getNative']() == 'web') {
                LocationProperty.setLoadProgress(90, "(登录游戏中)");
            }
            else {
                _this.loadingView.setProgress(90, '(登录游戏中)');
            }
            RoleMgr.ins().connectServer();
            eui.Label.default_fontFamily = "微软雅黑";
            RoleAI.ins().init();
            if (LocationProperty.isFirstLoad) {
                ResourceUtils.ins().loadGroup("preload", GameApp.ins().doPerLoadComplete, GameApp.ins().postPerLoadProgress, _this);
            }
        }, this);
    };
    GameApp.prototype.progress = function (itemsLoaded, itemsTotal) {
        if (window['getNative']() == 'web') {
            LocationProperty.setLoadProgress(40 + (itemsLoaded / itemsTotal * 30), "(加载必要资源)");
        }
        else {
            this.loadingView.setProgress(40 + (itemsLoaded / itemsTotal * 30), '(加载必要资源)');
        }
    };
    GameApp.prototype.postPerLoadProgress = function (itemsLoaded, itemsTotal) {
        return [itemsLoaded, itemsTotal];
    };
    GameApp.prototype.doPerLoadComplete = function () {
        GlobalConfig.init();
        this.postPerLoadComplete();
    };
    GameApp.prototype.postPerLoadComplete = function () {
        console.log('资源加载完成！！！！');
    };
    GameApp.prototype.postLoginInit = function () {
    };
    GameApp.prototype.postZeroInit = function () {
    };
    return GameApp;
}(BaseClass));
__reflect(GameApp.prototype, "GameApp");
MessageCenter.compile(GameApp);
//# sourceMappingURL=GameApp.js.map