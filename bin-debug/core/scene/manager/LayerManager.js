var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayerManager = (function () {
    function LayerManager() {
    }
    LayerManager.Game_Bg = new BaseEuiLayer();
    LayerManager.Game_Main = new BaseEuiLayer();
    LayerManager.Main_View = new BaseEuiLayer();
    LayerManager.UI_Main = new BaseEuiLayer();
    LayerManager.UI_Main2 = new BaseEuiLayer();
    LayerManager.UI_Popup = new BaseEuiLayer();
    LayerManager.UI_Message = new BaseEuiLayer();
    LayerManager.UI_Tips = new BaseEuiLayer();
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map