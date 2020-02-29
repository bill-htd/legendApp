var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AttributeFormat = (function () {
    function AttributeFormat() {
        this.intervals = 4;
        this.emptyLine = 0;
        this.sign = "+";
        this.spaceCount = 0;
        this.isShowAttName = 1;
        this.wordColor = AttributeFormat.DEFAULT_COLOR;
        this.attrColor = AttributeFormat.DEFAULT_COLOR;
    }
    AttributeFormat.getFormat = function (intervals, emptyLine, sign, spaceCount, isShowAttName, wordColor, attrColor) {
        if (intervals === void 0) { intervals = 4; }
        if (emptyLine === void 0) { emptyLine = 0; }
        if (sign === void 0) { sign = "+"; }
        if (spaceCount === void 0) { spaceCount = 0; }
        if (isShowAttName === void 0) { isShowAttName = 1; }
        if (wordColor === void 0) { wordColor = this.DEFAULT_COLOR; }
        if (attrColor === void 0) { attrColor = this.DEFAULT_COLOR; }
        var format = new AttributeFormat();
        format.intervals = intervals;
        format.emptyLine = emptyLine;
        format.sign = sign;
        format.spaceCount = spaceCount;
        format.isShowAttName = isShowAttName;
        format.wordColor = wordColor;
        format.attrColor = attrColor;
        return format;
    };
    AttributeFormat.FORMAT_1 = function () {
        return this.getFormat(0, 0, "：");
    };
    AttributeFormat.FORMAT_2 = function () {
        var format = this.FORMAT_1();
        format.attrColor = 0x35e62d;
        return format;
    };
    AttributeFormat.DEFAULT_COLOR = 0xDFD1B5;
    return AttributeFormat;
}());
__reflect(AttributeFormat.prototype, "AttributeFormat");
//# sourceMappingURL=AttributeFormat.js.map