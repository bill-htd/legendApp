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
var euiextension;
(function (euiextension) {
    var DropDownList = (function (_super) {
        __extends(DropDownList, _super);
        function DropDownList() {
            var _this = _super.call(this) || this;
            _this.btnBg = new egret.Shape();
            _this.btnBg.touchEnabled = true;
            _this.btnBg.graphics.beginFill(0x0);
            _this.btnBg.graphics.drawRect(0, 0, 480, 410);
            _this.btnBg.alpha = 0.6;
            _this.addChild(_this.btnBg);
            var labelIP = new eui.Label();
            labelIP.textColor = 0xFFFFFF;
            labelIP.size = 24;
            labelIP.y = 20;
            labelIP.text = "选择服务器地址";
            _this.addChild(labelIP);
            _this.listIP = new eui.List();
            _this.listIP.y = 50;
            _this.listIP.itemRenderer = IPItemRenderer;
            _this.scrollerIP = new eui.Scroller();
            _this.scrollerIP.y = _this.listIP.y;
            _this.scrollerIP.height = 400;
            _this.scrollerIP.viewport = _this.listIP;
            _this.scrollerIP.bounces = false;
            _this.addChild(_this.scrollerIP);
            var labelRes = new eui.Label();
            labelRes.textColor = 0xFFFFFF;
            labelRes.size = 24;
            labelRes.x = 250;
            labelRes.y = 20;
            labelRes.text = "选择游戏资源地址";
            _this.addChild(labelRes);
            _this.listRES = new eui.List();
            _this.listRES.x = labelRes.x;
            _this.listRES.y = 50;
            _this.listRES.itemRenderer = IPItemRenderer;
            _this.scrollerRES = new eui.Scroller();
            _this.scrollerRES.x = _this.listRES.x;
            _this.scrollerRES.y = _this.listRES.y;
            _this.scrollerRES.height = _this.scrollerIP.height;
            _this.scrollerRES.viewport = _this.listRES;
            _this.scrollerRES.bounces = false;
            _this.addChild(_this.scrollerRES);
            _this.addChangeEvent(_this.listIP, _this.setSelectIP);
            _this.addChangeEvent(_this.listRES, _this.setSelectRES);
            return _this;
        }
        DropDownList.prototype.setDataIP = function (data) {
            this.listIP.dataProvider = new eui.ArrayCollection(data);
            var index = parseInt(egret.localStorage.getItem("listIP")) || 0;
            this.listIP.selectedIndex = index > data.length ? 0 : index;
            this.setSelectIP();
        };
        DropDownList.prototype.setDataRES = function (data) {
            this.listRES.dataProvider = new eui.ArrayCollection(data);
            var index = parseInt(egret.localStorage.getItem("listRES")) || 0;
            this.listRES.selectedIndex = index > data.length ? 0 : index;
            this.setSelectRES();
        };
        DropDownList.prototype.destructor = function () {
            this.listIP.removeEventListener(egret.Event.CHANGE, this.setSelectIP, this);
            this.listRES.removeEventListener(egret.Event.CHANGE, this.setSelectRES, this);
        };
        DropDownList.prototype.setSelectIP = function () {
            var param = this.listIP.selectedItem.split("|");
            LocationProperty.srvid = parseInt(param[1]);
            var param1 = param[2].split(":");
            LocationProperty.serverIP = param1[0];
            LocationProperty.serverPort = parseInt(param1[1]);
            egret.localStorage.setItem("listIP", this.listIP.selectedIndex.toString());
        };
        DropDownList.prototype.setSelectRES = function () {
            LocationProperty.resAdd = this.listRES.selectedItem.split("=")[1];
            egret.localStorage.setItem("listRES", this.listRES.selectedIndex.toString());
        };
        return DropDownList;
    }(BaseView));
    euiextension.DropDownList = DropDownList;
    __reflect(DropDownList.prototype, "euiextension.DropDownList");
    var IPItemRenderer = (function (_super) {
        __extends(IPItemRenderer, _super);
        function IPItemRenderer() {
            var _this = _super.call(this) || this;
            var exmlText = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><e:Skin xmlns:e=\"http://ns.egret.com/eui\"></e:Skin>";
            _this.skinName = exmlText;
            _this.label = new eui.Label;
            _this.label.textColor = 0x35e62d;
            _this.label.size = 12;
            _this.label.y = 10;
            _this.addChild(_this.label);
            _this.height = 23;
            return _this;
        }
        IPItemRenderer.prototype.dataChanged = function () {
            this.label.text = this.data;
        };
        Object.defineProperty(IPItemRenderer.prototype, "selected", {
            set: function (value) {
                if (this["_selected"] == value)
                    return;
                this["_selected"] = value;
                this.invalidateState();
                if (value)
                    this.label.textColor = 0xf3311e;
                else
                    this.label.textColor = 0x35e62d;
            },
            enumerable: true,
            configurable: true
        });
        return IPItemRenderer;
    }(BaseItemRender));
    __reflect(IPItemRenderer.prototype, "IPItemRenderer");
})(euiextension || (euiextension = {}));
//# sourceMappingURL=euiextension.js.map