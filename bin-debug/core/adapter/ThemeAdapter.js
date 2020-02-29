var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var load = EXML.load;
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    ThemeAdapter.prototype.getTheme = function (url, compFunc, errorFunc, thisObject) {
        var load_count = 0;
        var self = this;
        function onGetRes(e) {
            compFunc.call(thisObject, e);
            RES.destroyRes(RES_RESOURCE + "default.thm.json");
        }
        function onError(e) {
            if (e.resItem.url == url) {
                load_count += 1;
                Assert(false, "\u52A0\u8F7D default.thm.json \u5931\u8D25!! \u5931\u8D25\u6B21\u6570\uFF1A" + load_count + ".");
                if (load_count < 3) {
                    RES.getResByUrl(url, onGetRes, self, RES.ResourceItem.TYPE_TEXT);
                    return;
                }
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onError, null);
                alert("\u76AE\u80A4\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u91CD\u65B0\u767B\u5F55");
            }
        }
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onError, null);
        RES.getResByUrl(url, onGetRes, this, RES.ResourceItem.TYPE_TEXT);
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
//# sourceMappingURL=ThemeAdapter.js.map