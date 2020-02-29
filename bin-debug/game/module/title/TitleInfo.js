var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TitleInfo = (function () {
    function TitleInfo(config) {
        this.config = config;
    }
    Object.defineProperty(TitleInfo.prototype, "attrsText", {
        get: function () {
            if (!this._attrsText) {
                var attrs = [];
                var n = this.config.attrs.length;
                while (n--) {
                    attrs[n] = TitleInfo.formatAttr(this.config.attrs[n].type, this.config.attrs[n].value);
                }
                this._attrsText = new eui.ArrayCollection(attrs);
                this.power = UserBag.getAttrPower(this.config.attrs);
            }
            return this._attrsText;
        },
        enumerable: true,
        configurable: true
    });
    TitleInfo.formatAttr = function (type, value) {
        return {
            h: AttributeData.getAttrStrByType(type) + '：',
            t: String(value),
            textColor: 0x35e62d
        };
    };
    return TitleInfo;
}());
__reflect(TitleInfo.prototype, "TitleInfo");
//# sourceMappingURL=TitleInfo.js.map