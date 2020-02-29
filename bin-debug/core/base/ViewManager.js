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
var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        var _this = _super.call(this) || this;
        _this.filters = ["TipsView", "UIView1_1", "GameSceneView", "ChatMainUI", "PlayFunView"];
        _this.closeTopFilters = [];
        _this._regesterInfo = {};
        _this._views = {};
        _this._hCode2Key = {};
        _this._opens = [];
        _this._constView = ["GameSceneView", "ChatMainUI", "UIView2", "TipsView", "PlayFunView"];
        return _this;
    }
    ViewManager.ins = function () {
        return _super.ins.call(this);
    };
    ViewManager.prototype.clear = function () {
        this.closeAll();
        this._views = {};
    };
    ViewManager.prototype.reg = function (viewClass, layer) {
        if (viewClass == null) {
            return;
        }
        var keys = egret.getQualifiedClassName(viewClass);
        if (this._regesterInfo[keys]) {
            return;
        }
        this._regesterInfo[keys] = [viewClass, layer];
    };
    ViewManager.prototype.destroy = function (hCode) {
        var keys = this._hCode2Key[hCode];
        delete this._views[keys];
        delete this._hCode2Key[hCode];
    };
    ViewManager.prototype.getKey = function (nameOrClass) {
        var key = "";
        if (typeof (nameOrClass) == "string")
            key = nameOrClass;
        else if (typeof (nameOrClass) == "function")
            key = egret.getQualifiedClassName(nameOrClass);
        else if ((nameOrClass) instanceof BaseEuiView) {
            var keys = Object.keys(this._views);
            for (var i = 0, len = keys.length; i < len; i++) {
                var tempKey = keys[i];
                if (this._views[tempKey] == nameOrClass) {
                    key = tempKey;
                    break;
                }
            }
        }
        else
            debug.log("打开界面只支持类名和类名的字符串形式,关闭界面只支持类名和类名的字符串以及类的实例形式,错误编号:" + nameOrClass);
        return key;
    };
    ViewManager.prototype.viewOpenCheck = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var result = true;
        var info = this._regesterInfo[key];
        if (info != null) {
            var c = info[0];
            var f = c["openCheck"];
            if (f != null) {
                result = f.apply(void 0, param);
            }
        }
        return result;
    };
    ViewManager.prototype.open = function (nameOrClass) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var key = this.getKey(nameOrClass);
        if (!this.viewOpenCheck.apply(this, [key].concat(param))) {
            return null;
        }
        var view = this.openEasy(key, param);
        if (this.filters.indexOf(key) == -1) {
            debug.log("开始打开窗口:" + key);
        }
        if (view) {
            this.checkOpenView(view);
            this.setUIEff(key);
        }
        else {
        }
        return view;
    };
    ViewManager.prototype.setUIEff = function (className) {
        if (className) {
            var view = this.getView(className);
            if (view) {
                view.playUIEff();
            }
        }
    };
    ViewManager.prototype.openEasy = function (nameOrClass, param) {
        if (param === void 0) { param = null; }
        var keys = this.getKey(nameOrClass);
        var view = this._views[keys];
        var info = this._regesterInfo[keys];
        if (!view) {
            if (!true && Assert(info, "ViewManager.openEasy class " + keys + " is null!!")) {
                return;
            }
            view = new info[0]();
            this._views[keys] = view;
            this._hCode2Key[view.hashCode] = keys;
        }
        if (view == null) {
            Log.trace("UI_" + keys + "不存在");
            return null;
        }
        for (var _i = 0, _a = view.exclusionWins; _i < _a.length; _i++) {
            var exclusionWin = _a[_i];
            this.closeEasy(exclusionWin);
        }
        if (view.isShow() || view.isInit()) {
            view.addToParent(info[1]);
            view.open.apply(view, param);
        }
        else {
            EasyLoading.ins().showLoading();
            view.loadResource(function () {
                view.addToParent(info[1]);
                view.setVisible(false);
            }.bind(this), function () {
                view.initUI();
                view.initData();
                view.open.apply(view, param);
                view.setVisible(true);
                EasyLoading.ins().hideLoading();
            }.bind(this));
        }
        var index = this._opens.indexOf(keys);
        if (index >= 0) {
            this._opens.splice(index, 1);
        }
        this._opens.push(keys);
        return view;
    };
    ViewManager.prototype.checkOpenView = function (view) {
        if (view.isTopLevel && view.parent != LayerManager.UI_Popup) {
            SoundUtil.ins().playEffect(SoundUtil.WINDOW);
            GameLogic.ins().postViewOpen(1);
            this.closeEasy(ChatMainUI);
            this.closeEasy(ChatWin);
        }
    };
    ViewManager.prototype.close = function (nameOrClass) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var key = this.getKey(nameOrClass);
        this.closeEx(key, param);
    };
    ViewManager.prototype.closeEx = function (className) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (className) {
            var view = this.getView(className);
            if (view) {
                var self_1 = this;
                view.closeEx(function () {
                    var view = self_1.closeEasy(className, param);
                    if (view) {
                        self_1.checkCloseView();
                    }
                    else {
                    }
                });
            }
        }
    };
    ViewManager.prototype.closeLastTopView = function () {
        var len = this._opens.length;
        for (var k = len - 1; k >= 0; k--) {
            var win = this.getView(this._opens[k]);
            if (win && win.isTopLevel) {
                var view = ViewManager.ins().getView(RoleWin);
                if (win instanceof RoleWin && view.getWingPanelInfo()) {
                    view.doOpenHintWin(2);
                }
                else {
                    this.close(win);
                }
                break;
            }
        }
    };
    ViewManager.prototype.closeEasy = function (nameOrClass) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (!this.isShow(nameOrClass)) {
            return null;
        }
        var key = this.getKey(nameOrClass);
        var view = this.getView(key);
        if (view) {
            var viewIndex = this._opens.indexOf(key);
            if (viewIndex >= 0) {
                this._opens.splice(viewIndex, 1);
            }
            view.close.apply(view, param);
            view.$onClose.apply(view);
            view.removeFromParent();
        }
        return view;
    };
    ViewManager.prototype.checkCloseView = function () {
        var hasTopLevelWin = false;
        for (var _i = 0, _a = this._opens; _i < _a.length; _i++) {
            var key = _a[_i];
            var win = this.getView(key);
            if (win && win.isTopLevel) {
                hasTopLevelWin = true;
                break;
            }
        }
        if (!hasTopLevelWin) {
            SoundUtil.WINDOW_OPEN = false;
            GameLogic.ins().postViewOpen(0);
            if (SceneManager.ins().getSceneName() == SceneManager.MAIN) {
                if (!this.isShow(GameSceneView))
                    this.openEasy(GameSceneView);
                if (!this.isShow(ChatMainUI))
                    this.openEasy(ChatMainUI);
            }
        }
    };
    Object.defineProperty(ViewManager, "gamescene", {
        get: function () {
            return ViewManager.ins().getView(GameSceneView);
        },
        enumerable: true,
        configurable: true
    });
    ViewManager.prototype.getView = function (nameOrClass) {
        var keys = this.getKey(nameOrClass);
        return this._views[keys];
    };
    ViewManager.prototype.closeAll = function () {
        while (this._opens.length) {
            this.closeEasy(this._opens[0], []);
        }
        this.destroyAllNotShowView();
        this.checkCloseView();
    };
    ViewManager.prototype.closeTopLevel = function () {
        var filter = this.closeTopFilters;
        this.closeTopFilters = [];
        for (var i = this._opens.length - 1; i >= 0; i--) {
            var keys = this._opens[i];
            if (filter.indexOf(keys) >= 0) {
                continue;
            }
            var view = this.getView(keys);
            var key = 1000000;
            if (!isNaN(parseInt(keys))) {
                key = parseInt(keys);
            }
            if (!view)
                continue;
            if (view.isTopLevel)
                this.closeEasy(keys, []);
        }
        this.checkCloseView();
    };
    ViewManager.prototype.openNum = function () {
        return this._opens.length;
    };
    ViewManager.prototype.isShow = function (nameOrClass) {
        return this._opens.indexOf(this.getKey(nameOrClass)) >= 0;
    };
    ViewManager.prototype.hasTopView = function () {
        for (var _i = 0, _a = this._opens; _i < _a.length; _i++) {
            var key = _a[_i];
            var win = this.getView(key);
            if (win && win.isTopLevel) {
                return true;
            }
        }
        return false;
    };
    ViewManager.prototype.destroyAllNotShowView = function () {
        for (var code in this._hCode2Key) {
            var keys = this._hCode2Key[code];
            if (this._constView.indexOf(keys) == -1 && this._opens.indexOf(keys) == -1) {
                var win = this.getView(keys);
                if (win && win.destoryView) {
                    win.destoryView(false);
                }
            }
        }
    };
    return ViewManager;
}(BaseClass));
__reflect(ViewManager.prototype, "ViewManager");
//# sourceMappingURL=ViewManager.js.map