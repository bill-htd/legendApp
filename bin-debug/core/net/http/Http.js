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
var Http = (function (_super) {
    __extends(Http, _super);
    function Http() {
        return _super.call(this) || this;
    }
    Http.ins = function () {
        return _super.ins.call(this);
    };
    Http.prototype.send = function (paramUrl, resType, method, onComplete, onError, onProgress) {
        var request = new egret.HttpRequest();
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.responseType = resType ? egret.HttpResponseType.TEXT : egret.HttpResponseType.ARRAY_BUFFER;
        request.open(paramUrl, method ? egret.HttpMethod.GET : egret.HttpMethod.POST);
        request.once(egret.Event.COMPLETE, onComplete, this);
        request.once(egret.IOErrorEvent.IO_ERROR, onError ? onError : function () {
            alert('请求失败');
        }, this);
        request.once(egret.ProgressEvent.PROGRESS, onProgress ? onProgress : function () {
            console.log('请求中');
        }, this);
        request.send();
    };
    return Http;
}(BaseClass));
__reflect(Http.prototype, "Http");
//# sourceMappingURL=Http.js.map