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
var ResourceUtils = (function (_super) {
    __extends(ResourceUtils, _super);
    function ResourceUtils() {
        var _this = _super.call(this) || this;
        _this._groupIndex = 0;
        _this._configs = new Array();
        _this._groups = {};
        _this._urlResorce = {};
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, _this.onResourceLoadComplete, _this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, _this.onResourceLoadProgress, _this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, _this.onResourceLoadError, _this);
        return _this;
    }
    ResourceUtils.ins = function () {
        return _super.ins.call(this);
    };
    ResourceUtils.prototype.addConfig = function (jsonPath, filePath) {
        this._configs.push([jsonPath, filePath]);
    };
    ResourceUtils.prototype.loadConfig = function ($onConfigComplete, $onConfigCompleteTarget) {
        this._onConfigComplete = $onConfigComplete;
        this._onConfigCompleteTarget = $onConfigCompleteTarget;
        this.loadNextConfig();
    };
    ResourceUtils.prototype.loadNextConfig = function () {
        if (this._configs.length == 0) {
            this._onConfigComplete.call(this._onConfigCompleteTarget);
            this._onConfigComplete = null;
            this._onConfigCompleteTarget = null;
            return;
        }
        var arr = this._configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        RES.loadConfig(arr[0], arr[1]);
    };
    ResourceUtils.prototype.onConfigCompleteHandle = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        this.loadNextConfig();
    };
    ResourceUtils.prototype.loadGroup = function ($groupName, $onResourceLoadComplete, $onResourceLoadProgress, $onResourceLoadTarget) {
        this._groups[$groupName] = [$onResourceLoadComplete, $onResourceLoadProgress, $onResourceLoadTarget];
        RES.loadGroup($groupName);
    };
    ResourceUtils.prototype.loadGroups = function ($groupName, $subGroups, $onResourceLoadComplete, $onResourceLoadProgress, $onResourceLoadTarget) {
        RES.createGroup($groupName, $subGroups, true);
        this.loadGroup($groupName, $onResourceLoadComplete, $onResourceLoadProgress, $onResourceLoadTarget);
    };
    ResourceUtils.prototype.pilfererLoadGroup = function ($groupName, $subGroups) {
        if ($subGroups === void 0) { $subGroups = null; }
        var useGroupName = "pilferer_" + $groupName;
        if (!$subGroups) {
            $subGroups = [$groupName];
        }
        RES.createGroup(useGroupName, $subGroups, true);
        RES.loadGroup(useGroupName, -1);
    };
    ResourceUtils.prototype.onResourceLoadComplete = function (event) {
        var groupName = event.groupName;
        if (this._groups[groupName]) {
            var loadComplete = this._groups[groupName][0];
            var loadCompleteTarget = this._groups[groupName][2];
            if (loadComplete != null) {
                loadComplete.call(loadCompleteTarget);
            }
            this._groups[groupName] = null;
            delete this._groups[groupName];
        }
    };
    ResourceUtils.prototype.onResourceLoadProgress = function (event) {
        var groupName = event.groupName;
        if (this._groups[groupName]) {
            var loadProgress = this._groups[groupName][1];
            var loadProgressTarget = this._groups[groupName][2];
            if (loadProgress != null) {
                loadProgress.call(loadProgressTarget, event.itemsLoaded, event.itemsTotal);
            }
        }
    };
    ResourceUtils.prototype.onResourceLoadError = function (event) {
        Log.trace(event.groupName + "资源组有资源加载失败");
        if (event.groupName == "preload") {
            GameApp.ins().preload_load_count += 1;
            if (GameApp.ins().preload_load_count == 1) {
                Assert(false, event.groupName + " \u8D44\u6E90\u52A0\u8F7D\u5931\u8D25!!\u5931\u8D25\u6B21\u6570\uFF1A" + GameApp.ins().preload_load_count);
            }
            if (GameApp.ins().preload_load_count < 3) {
                RES.loadGroup(event.groupName);
            }
            else {
                alert("\u8D44\u6E90\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u91CD\u65B0\u767B\u5F55");
            }
            return;
        }
        this.onResourceLoadComplete(event);
    };
    ResourceUtils.prototype.loadResource = function ($resources, $groups, $onResourceLoadComplete, $onResourceLoadProgress, $onResourceLoadTarget) {
        if ($resources === void 0) { $resources = []; }
        if ($groups === void 0) { $groups = []; }
        if ($onResourceLoadComplete === void 0) { $onResourceLoadComplete = null; }
        if ($onResourceLoadProgress === void 0) { $onResourceLoadProgress = null; }
        if ($onResourceLoadTarget === void 0) { $onResourceLoadTarget = null; }
        var needLoadArr = $resources.concat($groups);
        var groupName = "loadGroup" + this._groupIndex++;
        RES.createGroup(groupName, needLoadArr, true);
        this._groups[groupName] = [$onResourceLoadComplete, $onResourceLoadProgress, $onResourceLoadTarget];
        RES.loadGroup(groupName);
    };
    ResourceUtils.prototype.loadUrlResource = function (url, type, compFun, thisObj) {
        var _this = this;
        if (this._urlResorce[url] == null) {
            this._urlResorce[url] = {
                "data": null,
                "compFun": compFun,
                "thisObj": thisObj
            };
            RES.getResByUrl(url, function (data) {
                _this._urlResorce[url]["data"] = data;
                if (compFun != null)
                    compFun.apply(_this._urlResorce[url]["thisObj"]);
            }, this, type);
        }
        else if (compFun != null)
            compFun.apply(thisObj);
    };
    ResourceUtils.prototype.getUrlResource = function (url) {
        if (this._urlResorce[url] == null) {
            debug.log("资源未加载");
            return null;
        }
        return this._urlResorce[url]["data"];
    };
    return ResourceUtils;
}(BaseClass));
__reflect(ResourceUtils.prototype, "ResourceUtils");
//# sourceMappingURL=ResourceUtils.js.map