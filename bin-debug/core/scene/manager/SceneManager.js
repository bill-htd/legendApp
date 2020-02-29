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
var SceneManager = (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager() {
        return _super.call(this) || this;
    }
    SceneManager.ins = function () {
        return _super.ins.call(this);
    };
    SceneManager.prototype.clear = function () {
        var nowScene = this._currScene;
        if (nowScene) {
            nowScene.onExit();
            this._currScene = undefined;
        }
    };
    SceneManager.prototype.runScene = function (SceneClass) {
        if (SceneClass == null) {
            Log.trace("runScene:scene is null");
            return;
        }
        var oldScene = this._currScene;
        if (oldScene) {
            oldScene.onExit();
            oldScene = undefined;
        }
        var s = new SceneClass();
        s.onEnter();
        this._currScene = s;
    };
    SceneManager.prototype.getCurrScene = function () {
        return this._currScene;
    };
    SceneManager.prototype.getSceneName = function () {
        if (this._currScene) {
            return egret.getQualifiedClassName(this._currScene);
        }
        return '';
    };
    SceneManager.CREATE_ROLE = "CreateRoleScene";
    SceneManager.MAIN = "MainScene";
    return SceneManager;
}(BaseClass));
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map