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
var ResVersionManager = (function (_super) {
    __extends(ResVersionManager, _super);
    function ResVersionManager() {
        var _this = _super.call(this) || this;
        _this.res_loadByVersion();
        _this.resVersionData = window["verData"];
        return _this;
    }
    ResVersionManager.ins = function () {
        return _super.ins.call(this);
    };
    ResVersionManager.prototype.has = function (url) {
        return this.resVersionData.hasOwnProperty(url);
    };
    ResVersionManager.prototype.getDir = function (url) {
        return this.resVersionData[url];
    };
    ResVersionManager.prototype.hasVer = function () {
        return !isNaN(LocationProperty.v);
    };
    ResVersionManager.prototype.res_loadByVersion = function () {
        RES.web.Html5VersionController.prototype.getVirtualUrl = function (url) {
            var manager = ResVersionManager.ins();
            if (manager.hasVer()) {
                if (manager.has(url)) {
                    var dir = manager.getDir(url);
                    url = "" + LocationProperty.resAdd + dir + "/" + url;
                }
                else
                    url = LocationProperty.resAdd + "0/" + url;
            }
            else
                url = "" + LocationProperty.resAdd + url;
            return url;
        };
    };
    ResVersionManager.prototype.loadConfig = function (complateFunc, complateFuncTarget) {
        this.complateFunc = complateFunc;
        this.complateFuncTarget = complateFuncTarget;
        if (this.resVersionData) {
            this.complateFunc.call(this.complateFuncTarget);
            return;
        }
        if (this.hasVer()) {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.ARRAY_BUFFER;
            var respHandler = function (evt) {
                switch (evt.type) {
                    case egret.Event.COMPLETE:
                        break;
                    case egret.IOErrorEvent.IO_ERROR:
                        debug.log("respHandler io error");
                        break;
                }
            };
            request.once(egret.Event.COMPLETE, respHandler, this);
            request.once(egret.IOErrorEvent.IO_ERROR, respHandler, this);
            request.open("" + LocationProperty.resAdd + LocationProperty.v + "/" + LocationProperty.v + ".ver", egret.HttpMethod.GET);
            request.send();
            return;
        }
        this.complateFunc.call(this.complateFuncTarget);
    };
    return ResVersionManager;
}(BaseClass));
__reflect(ResVersionManager.prototype, "ResVersionManager");
//# sourceMappingURL=ResVersionManager.js.map