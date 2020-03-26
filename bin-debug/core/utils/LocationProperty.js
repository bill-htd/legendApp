var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocationProperty = (function () {
    function LocationProperty() {
    }
    LocationProperty.init = function () {
        this.urlParam = {};
        if (window['getNative']() == 'web') {
            var str = window['paraUrl'];
            if (str) {
                var whIndex = str.indexOf("?");
                if (whIndex != -1) {
                    var param = str.slice(whIndex + 1).split("&");
                    var strArr = void 0;
                    for (var i = 0; i < param.length; i++) {
                        strArr = param[i].split("=");
                        this.urlParam[strArr[0]] = strArr[1];
                    }
                }
            }
        }
        else {
            var info = window['getLoginInfo']();
            if (info) {
                this.urlParam['srvid'] = info.srvid;
                this.urlParam['user'] = info.user;
                this.urlParam['serverid'] = info.serverid;
                this.urlParam['spverify'] = info.spverify;
                this.urlParam['srvaddr'] = info.srvaddr;
                this.urlParam['srvport'] = info.srvport;
            }
        }
        var rv = LocationProperty.ver_res;
        if (rv) {
            RES_RESOURCE += rv;
            RES_DIR += rv;
            MAP_DIR += rv;
        }
        RES_RESOURCE += '/';
        RES_DIR += '/';
        MAP_DIR += '/';
    };
    Object.defineProperty(LocationProperty, "roleID", {
        get: function () {
            return this.urlParam['roleID'] || 0;
        },
        set: function (str) {
            this.urlParam['roleID'] = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "userName", {
        get: function () {
            return this.urlParam['userName'] || "";
        },
        set: function (str) {
            this.urlParam['userName'] = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "userID", {
        get: function () {
            return this.urlParam['userID'] || 0;
        },
        set: function (str) {
            this.urlParam['userID'] = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "resAdd", {
        get: function () {
            return this.urlParam['hosts'] || "";
        },
        set: function (str) {
            this.urlParam['hosts'] = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "openID", {
        get: function () {
            return this.urlParam['user'];
        },
        set: function (str) {
            this.urlParam['user'] = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "srvid", {
        get: function () {
            return parseInt(this.urlParam['srvid']);
        },
        set: function (v) {
            this.urlParam['srvid'] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "serverIP", {
        get: function () {
            return this.urlParam['srvaddr'];
        },
        set: function (str) {
            this.urlParam['srvaddr'] = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "serverPort", {
        get: function () {
            return this.urlParam['srvport'] || 9001;
        },
        set: function (v) {
            this.urlParam['srvport'] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "password", {
        get: function () {
            return this.urlParam['spverify'] || "e10adc3949ba59abbe56e057f20f883e";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "openKey", {
        get: function () {
            return this.urlParam['openkey'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "zoneId", {
        get: function () {
            return this.urlParam['zoneid'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "serverID", {
        get: function () {
            return this.urlParam['serverid'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "appid", {
        get: function () {
            return this.urlParam['appid'] || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "app_openid", {
        get: function () {
            return this.urlParam['app_openid'] || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "isSubscribe", {
        get: function () {
            return this.urlParam['isSubscribe'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "nickName", {
        get: function () {
            var str = this.urlParam['nickName'] || "";
            try {
                return str.length ? decodeURIComponent(str) : str;
            }
            catch (e) {
                return str;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "callUrl", {
        get: function () {
            var str = this.urlParam['callUrl'] || "";
            return str.length ? decodeURIComponent(str) : str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "gifi", {
        get: function () {
            return this.urlParam['gifi'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "roleCount", {
        get: function () {
            return parseInt(this.urlParam['roleCount']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "isnew", {
        get: function () {
            return parseInt(this.urlParam['isnew']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "login_ip", {
        get: function () {
            return this.urlParam['login_ip'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "is_attention", {
        get: function () {
            return this.urlParam['is_attention'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "isShowShare", {
        get: function () {
            return window['isShowShare'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "v", {
        get: function () {
            return parseInt(this.urlParam['v']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "isYelloVip", {
        get: function () {
            return parseInt(this.urlParam['isYelloVip']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "isYelloYearVip", {
        get: function () {
            return parseInt(this.urlParam['isYelloYearVip']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "yelloVipLevel", {
        get: function () {
            return parseInt(this.urlParam['yelloVipLevel']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "isYelloHighVip", {
        get: function () {
            return parseInt(this.urlParam['isYelloHighVip']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "logurl", {
        get: function () {
            return decodeURIComponent(this.urlParam['logurl']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "isFirstLoad", {
        get: function () {
            return !LocationProperty.isLocation && LocationProperty.roleCount == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "loadurl", {
        get: function () {
            return decodeURIComponent(this.urlParam['loadurl']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "pfid", {
        get: function () {
            return this.urlParam['pfid'] || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "pf", {
        get: function () {
            return this.urlParam['pf'] || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "ver_res", {
        get: function () {
            return this.urlParam["ver_res"] ? parseInt(this.urlParam["ver_res"]) : 0;
        },
        enumerable: true,
        configurable: true
    });
    LocationProperty.isCanLogin = function () {
        return this.openID != null &&
            this.password != null &&
            this.srvid != null &&
            this.serverIP != null &&
            this.serverPort != null;
    };
    Object.defineProperty(LocationProperty, "isLocation", {
        get: function () {
            return location.href.indexOf("192.168.201") >= 0
                || location.href.indexOf("127.0.0.1") >= 0
                || location.href.indexOf("localhost") >= 0
                || location.href.indexOf("cq.api.com") >= 0
                || location.href.indexOf("10.10.1") >= 0
                || location.href.indexOf("10.10.4") >= 0;
        },
        enumerable: true,
        configurable: true
    });
    LocationProperty.setLoadProgress = function (n, str) {
        window['showLoadProgress'](n, str);
    };
    return LocationProperty;
}());
__reflect(LocationProperty.prototype, "LocationProperty");
function shareCallback() {
    UserTips.ins().showTips("\u5206\u4EAB\u6210\u529F");
    PfActivity.ins().sendWeiXinInviteGift();
    ViewManager.ins().close(YqWin);
}
function isFocusCallback(code) {
    PfActivity.ins().postGuanZhu(+code);
}
function isShareCallback(code) {
    PfActivity.ins().postShare(+code);
}
//# sourceMappingURL=LocationProperty.js.map