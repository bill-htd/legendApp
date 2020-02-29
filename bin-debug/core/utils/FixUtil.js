var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FixUtil = (function () {
    function FixUtil() {
    }
    FixUtil.fixAll = function () {
        FixUtil.fixEXMLParser();
        FixUtil.fixLoadThm();
        FixUtil.fixComponentSkinName();
        FixUtil.fixRemoveDisplayObject();
    };
    FixUtil.fixGetResAsync = function () {
        var func = RES.getResByUrl;
        RES.getResByUrl = function (url, compFunc, thisObject, type) {
            if (type === void 0) { type = ""; }
            if (type) {
                var analyzer = RES.getAnalyzer(type);
                var res = analyzer.getRes(url);
                if (res) {
                    compFunc.call(thisObject, res, url);
                    return;
                }
            }
            func(url, compFunc, thisObject, type);
        };
    };
    FixUtil.fixRemoveDisplayObject = function () {
        var removeDisplayObject = function (displayObject, bitmapData) {
            if (!bitmapData)
                return;
            var hashCode;
            if (bitmapData.bitmapData && bitmapData.bitmapData.hashCode) {
                hashCode = bitmapData.bitmapData.hashCode;
            }
            else {
                hashCode = bitmapData.hashCode;
            }
            if (!hashCode) {
                return;
            }
            if (!egret.BitmapData['_displayList'][hashCode]) {
                return;
            }
            var tempList = egret.BitmapData['_displayList'][hashCode];
            var index = tempList.indexOf(displayObject);
            if (index >= 0) {
                tempList.splice(index, 1);
            }
            if (tempList.length == 0) {
                ResourceMgr.ins().disposeResTime(hashCode);
            }
        };
        egret.BitmapData.$removeDisplayObject = removeDisplayObject;
    };
    FixUtil.parseSkinName = function (skinName) {
        var exmlsDic = FixUtil.exmlsDic;
        if (exmlsDic && exmlsDic.hasOwnProperty(skinName)) {
            var obj = exmlsDic[skinName];
            delete exmlsDic[skinName];
            EXML.$parseURLContent(obj.path, obj.content);
        }
    };
    FixUtil.fixComponentSkinName = function () {
        var $parseSkinName = eui.Component.prototype.$parseSkinName;
        eui.Component.prototype.$parseSkinName = function () {
            var skinName = this.skinName;
            if (typeof (skinName) == "string") {
                FixUtil.parseSkinName(skinName);
            }
            $parseSkinName.call(this);
        };
    };
    FixUtil.fixLoadThm = function () {
        var exmlsDic = FixUtil.exmlsDic = {};
        var setSkinClassName = function (path, content) {
            var match = content.match(/ class="([^"]*)"/i);
            if (true && exmlsDic[match[1]]) {
                alert("\u76AE\u80A4 " + exmlsDic[match[1]].path + " \u4E0E " + path + " \u7C7B\u540D\u91CD\u590D\uFF01\uFF01\uFF01");
            }
            exmlsDic[match[1]] = { path: path, content: content };
        };
        eui.Theme.prototype["onConfigLoaded"] = function (str) {
            var data;
            if (str) {
                if (true) {
                    try {
                        data = JSON.parse(str);
                    }
                    catch (e) {
                        egret.$error(3000);
                    }
                }
                else {
                    data = JSON.parse(str);
                }
            }
            else if (true) {
                egret.$error(3000, this.$configURL);
            }
            if (!data) {
                alert("\u76AE\u80A4\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u91CD\u65B0\u767B\u5F55");
                return;
            }
            if (data && data.skins) {
                var skinMap = this.skinMap;
                var skins_1 = data.skins;
                var keys = Object.keys(skins_1);
                var length_1 = keys.length;
                for (var i = 0; i < length_1; i++) {
                    var key = keys[i];
                    if (!skinMap[key]) {
                        this.mapSkin(key, skins_1[key]);
                    }
                }
            }
            if (data.styles) {
                this.$styles = data.styles;
            }
            if (!data.exmls || data.exmls.length == 0) {
                this.onLoaded();
            }
            else if (data.exmls[0]['gjs']) {
                data.exmls.forEach(function (exml) { return EXML.$parseURLContentAsJs((exml).path, (exml).gjs, (exml).className); });
                this.onLoaded();
            }
            else if (data.exmls[0]['content']) {
                data.exmls.forEach(function (exml) { return setSkinClassName(exml.path, exml.content); });
                FixUtil.preParserExml();
                this.onLoaded();
            }
            else {
                EXML.$loadAll(data.exmls, this.onLoaded, this, true);
            }
        };
    };
    FixUtil.preParserExml = function () {
        var prelist = ["skins.ButtonSkin", "skins.CheckBoxSkin", "skins.HScrollBarSkin", "skins.HSliderSkin", "skins.ItemRendererSkin", "skins.PanelSkin",
            "skins.ProgressBarSkin", "skins.RadioButtonSkin", "skins.ScrollerSkin", "skins.TextInputSkin", "skins.ToggleSwitchSkin", "skins.VScrollBarSkin", "skins.VSliderSkin",
            "PlayFunSkin", "UIView2Skin", "GameFightSceneSkin"];
        for (var _i = 0, prelist_1 = prelist; _i < prelist_1.length; _i++) {
            var skinName = prelist_1[_i];
            FixUtil.parseSkinName(skinName);
        }
    };
    FixUtil.fixEXMLParser = function () {
        var EXMLParser = eui.sys.EXMLParser;
        EXMLParser.prototype['getClassNameOfNode1'] = function (node) {
            if (node.attributes && node.attributes["className"]) {
                var Cls = egret.getDefinitionByName(node.attributes["className"]);
                if (Cls) {
                    if (node.parent && node.parent.localName == "ViewStack") {
                        if (node.attributes['skinName']) {
                            this.addInitSkin(Cls, node.attributes['skinName']);
                            delete node.attributes['skinName'];
                        }
                    }
                    return node.attributes["className"];
                }
            }
            return this['getClassNameOfNode'](node);
        };
        EXMLParser.prototype['addInitSkin'] = function (cls, skinName) {
            var proto = cls.prototype;
            if (!proto.__skinName_1) {
                proto.__skinName_1 = skinName;
                var close_2 = proto.close;
                if (close_2) {
                    proto.close_1 = close_2;
                    proto.close = function () {
                        if (this.skinName) {
                            this.close_1();
                        }
                    };
                    close_2 = null;
                }
                var open_2 = proto.open;
                if (open_2) {
                    proto.open_1 = open_2;
                    proto.open = function () {
                        var param = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            param[_i] = arguments[_i];
                        }
                        if (true) {
                            if (!this.skinName) {
                                this.$initSkin();
                            }
                            else if (!this.$isInitSkin) {
                                var clsName = egret.getQualifiedClassName(this);
                                console.log("\u7C7B" + clsName + "\u4EE3\u7801\u4E2D\u4E0D\u80FD\u8BBE\u7F6EskinName\uFF01\uFF01");
                            }
                        }
                        else {
                            if (!this.$isInitSkin) {
                                this.$initSkin();
                            }
                        }
                        this.open_1.apply(this, param);
                    };
                    open_2 = null;
                }
                var childrenCreated = proto.childrenCreated;
                if (childrenCreated) {
                    proto.childrenCreated_1 = childrenCreated;
                    proto.childrenCreated = function () {
                    };
                    childrenCreated = null;
                }
                var initSkin = proto['$initSkin'];
                if (true && initSkin) {
                    console.log("initSkin 函数不可以使用");
                }
                proto['$initSkin'] = function () {
                    this.skinName = this.__skinName_1;
                    this.$isInitSkin = true;
                    this.childrenCreated_1();
                };
            }
        };
        EXMLParser.prototype['createFuncForNode'] = function (node) {
            var className = node.localName;
            var isBasicType = this.isBasicTypeData(className);
            if (isBasicType)
                return this.createBasicTypeForNode(node);
            var moduleName = this.getClassNameOfNode1(node);
            var func = new eui.sys.EXFunction();
            var tailName = "_i";
            var id = node.attributes.id;
            func.name = id + tailName;
            this.currentClass.addFunction(func);
            var cb = new eui.sys.EXCodeBlock();
            func.codeBlock = cb;
            var varName = "t";
            if (className == "Object") {
                cb.addVar(varName, "{}");
            }
            else {
                cb.addVar(varName, "new " + moduleName + "()");
            }
            var containsId = !!this.currentClass.getVariableByName(id);
            if (containsId) {
                cb.addAssignment("this." + id, varName);
            }
            this.addAttributesToCodeBlock(cb, varName, node);
            this.initlizeChildNode(node, cb, varName);
            var delayAssignments = this.delayAssignmentDic[id];
            if (delayAssignments) {
                var length_2 = delayAssignments.length;
                for (var i = 0; i < length_2; i++) {
                    var codeBlock = delayAssignments[i];
                    cb.concat(codeBlock);
                }
            }
            cb.addReturn(varName);
            return "this." + func.name + "()";
        };
        var formatValue = EXMLParser.prototype['formatValue'];
        EXMLParser.prototype['formatValue'] = function (key, value, node) {
            if (key == "itemRendererSkinName") {
                return this['formatString'](value);
            }
            return formatValue.call(this, key, value, node);
        };
        var innerClassCount = 1;
        EXMLParser.prototype.parse = function (text) {
            if (true) {
                if (!text) {
                    egret.$error(1003, "text");
                }
            }
            var xmlData = null;
            if (true) {
                try {
                    xmlData = egret.XML.parse(text);
                }
                catch (e) {
                    egret.$error(2002, text + "\n" + e.message);
                }
            }
            else {
                xmlData = egret.XML.parse(text);
            }
            var hasClass = false;
            var className = "";
            if (xmlData.attributes["class"]) {
                className = xmlData.attributes["class"];
                delete xmlData.attributes["class"];
                hasClass = !!className;
            }
            else {
                className = "$exmlClass_" + innerClassCount++;
            }
            var exClass = this.parseClass(xmlData, className);
            var code = exClass.toCode();
            var clazz = null;
            var geval = eval;
            if (true) {
                try {
                    clazz = geval(code);
                }
                catch (e) {
                    egret.log(code);
                    return null;
                }
            }
            else {
                clazz = geval(code);
            }
            if (hasClass && clazz) {
                egret.registerClass(clazz, className);
                var paths = className.split(".");
                var length_3 = paths.length;
                var definition = __global;
                for (var i = 0; i < length_3 - 1; i++) {
                    var path = paths[i];
                    definition = definition[path] || (definition[path] = {});
                }
                if (definition[paths[length_3 - 1]]) {
                }
                else {
                    definition[paths[length_3 - 1]] = clazz;
                }
            }
            xmlData = undefined;
            className = undefined;
            code = undefined;
            exClass = undefined;
            geval = undefined;
            text = undefined;
            return clazz;
        };
        EXMLParser = undefined;
    };
    return FixUtil;
}());
__reflect(FixUtil.prototype, "FixUtil");
//# sourceMappingURL=FixUtil.js.map