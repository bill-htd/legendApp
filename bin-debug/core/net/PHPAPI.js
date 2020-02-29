var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PHPAPI = (function () {
    function PHPAPI() {
    }
    PHPAPI.SVER_URL = "http://pay.lcbyh5.com/";
    PHPAPI.GET_LAST_SERVER = PHPAPI.SVER_URL + "api/getlastserver?";
    PHPAPI.GET_SEVER_LIST = PHPAPI.SVER_URL + "api/getserverlist?";
    PHPAPI.WAN_BA = PHPAPI.SVER_URL + "login/wanba?";
    PHPAPI.USER_INFO = PHPAPI.SVER_URL + "payment/userInfo?";
    PHPAPI.BUY = PHPAPI.SVER_URL + "payment/buy?";
    return PHPAPI;
}());
__reflect(PHPAPI.prototype, "PHPAPI");
//# sourceMappingURL=PHPAPI.js.map