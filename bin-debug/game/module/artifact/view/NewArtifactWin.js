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
var NewArtifactWin = (function (_super) {
    __extends(NewArtifactWin, _super);
    function NewArtifactWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        _this.arrImage = [];
        _this.name = "\u795E\u5668";
        return _this;
    }
    NewArtifactWin.prototype.childrenCreated = function () {
        this.beginY = this.imgArtfact.y;
        this.mc = new MovieClip();
        this.groupEff.addChild(this.mc);
        this.mc.x = 0;
        this.mc.y = 0;
        this.mc.playFile(RES_DIR_EFF + "artifacteff", -1);
        this.pieceCom.piece.itemRenderer = ArtifactSuiItemRenderer;
        this.list.itemRenderer = ArtifactAttrDescItem;
        this.turnicon.textFlow = new egret.HtmlTextParser().parser("<u>\u67E5\u770B\u5408\u51FB</u>");
        this.eff = new MovieClip;
        this.eff.x = 65;
        this.eff.y = 25;
        this.eff.scaleX = 0.85;
        this.eff.scaleY = 0.85;
        this.eff.touchEnabled = false;
    };
    NewArtifactWin.prototype.open = function () {
        this.index = 1;
        this.addTouchEvent(this.imgLeft, this.onTap);
        this.addTouchEvent(this.imgRight, this.onTap);
        this.addTouchEvent(this.btnOpen, this.onTap);
        this.addTouchEvent(this.detail, this.onTap);
        this.addTouchEvent(this.turnicon, this.onTap);
        this.pieceCom.piece.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLink, this);
        this.observe(Artifact.ins().postNewArtifactUpdate, this.updateView);
        this.observe(Artifact.ins().postNewArtifactInit, this.updateView);
        this.getGuideTips();
        this.updateView();
    };
    NewArtifactWin.prototype.close = function () {
        DisplayUtils.removeFromParent(this.eff);
        egret.Tween.removeTweens(this.groupMaterial);
        ViewManager.ins().close(ArtifactChipOpenWin);
    };
    NewArtifactWin.prototype.onTap = function (e) {
        this.isBtnOpen = false;
        switch (e.target) {
            case this.imgLeft:
                if (this.index == 1)
                    break;
                else
                    this.index--;
                this.updateView();
                break;
            case this.imgRight:
                if (this.index < Artifact.ins().getMaxIndex()) {
                    if (this.getIsNext())
                        this.index++;
                }
                this.updateView();
                break;
            case this.btnOpen:
                this.isBtnOpen = true;
                Artifact.ins().openArtifact(this.index);
                break;
            case this.detail:
                ViewManager.ins().open(ArtifactAllAttrWin);
                break;
            case this.turnicon:
                var conf = GlobalConfig.ImbaConf[this.index];
                if (conf && conf.winGuide) {
                    GameGuider.guidance(conf.winGuide[0], conf.winGuide[1]);
                    if (conf.winGuide[0] != "LiLianWin")
                        ViewManager.ins().close(LiLianWin);
                }
                break;
            default:
                break;
        }
    };
    NewArtifactWin.prototype.getIsNext = function () {
        if (this.index == 1)
            return true;
        var pidx = this.index - 1;
        var cafd = Artifact.ins().getNewArtifactBy(pidx);
        if (!cafd.open)
            return false;
        return true;
    };
    NewArtifactWin.prototype.updateView = function () {
        var conf = GlobalConfig.ImbaConf[this.index];
        var data = Artifact.ins().getNewArtifactBy(this.index);
        if (data && data.open && conf.turnDesc) {
            this.turnicon.visible = true;
            this.turnicon.textFlow = new egret.HtmlTextParser().parser("<u>" + conf.turnDesc + "</u>");
        }
        else {
            this.turnicon.visible = false;
        }
        this.imgArtfact.y = this.beginY;
        this.imgOpen.visible = !data.open;
        if (!this.getGuideMaterialId(this.index)) {
            if (data.open) {
                this.imgArtfact.source = conf.img;
                this.cleanMaterialImg();
                this.groupEff.visible = true;
                this.currentState = "normal";
                DisplayUtils.removeFromParent(this.eff);
                this.artifactTween();
            }
            else {
                this.imgArtfact.source = conf.imgShadow;
                this.setMaterialImg();
                this.groupEff.visible = false;
                this.currentState = "open";
                this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
                if (!this.eff.parent)
                    this.actGroup.addChild(this.eff);
                egret.Tween.removeTweens(this.groupMaterial);
                this.groupMaterial.x = 42;
                this.groupMaterial.y = 101;
            }
        }
        else {
            this.imgArtfact.source = conf.imgShadow;
            this.setMaterialImg();
            this.groupEff.visible = false;
            this.currentState = "normal";
            DisplayUtils.removeFromParent(this.eff);
            egret.Tween.removeTweens(this.groupMaterial);
            this.groupMaterial.x = 42;
            this.groupMaterial.y = 101;
        }
        this.imgName.source = conf.imgName;
        var attstr = "";
        var num = 0;
        for (var key in conf.attrs) {
            num++;
        }
        if (conf.attrs)
            attstr = AttributeData.getAttStr(conf.attrs, 1);
        if (conf.exattrs != null) {
            for (var key in conf.exattrs) {
                attstr += "\n";
                attstr += AttributeData.getExtAttStrByType(conf.exattrs[key], 1);
                num++;
            }
        }
        this.labelAttr.text = conf.funcDesc;
        this.imgFunc.source = conf.simpleDesc;
        var str = "";
        var array = [];
        var artData = Artifact.ins().getNewArtifactBy(this.index);
        var len = 0;
        for (var i = 0; i < 8; i++) {
            var color = void 0;
            var state = (artData.record >> i) & 1;
            var state2 = ((artData.exitRecord >> i) & 1) && (state == 0);
            var obj = {};
            obj["state"] = state;
            obj["state2"] = state2;
            var mId = conf.jigsawId[i];
            var name_1 = "";
            var img = "";
            if (mId == null) {
                name_1 = "";
                img = "";
            }
            else {
                name_1 = GlobalConfig.ImbaJigsawConf[mId].name;
                img = GlobalConfig.ImbaJigsawConf[mId].img;
                len++;
            }
            obj["name"] = name_1;
            obj["index"] = mId;
            obj["img"] = img;
            array.push(obj);
        }
        len = len > 2 ? len : 2;
        this.pieceCom.setData(len);
        this.pieceCom.piece.dataProvider = new eui.ArrayCollection(array);
        this.pieceCom.piece.validateNow();
        this.powerPanel.setPower(Artifact.ins().getNewArtifactPower(this.index));
        this.imgLeft.visible = this.index != 1;
        this.imgRight.visible = this.index < Artifact.ins().getMaxIndex() && this.getIsNext();
        if (data.open && this.isBtnOpen) {
            var arr = conf.img.split("_");
            var img = arr[0] + "_" + arr[1];
            Activationtongyong.show(0, conf.name, "j" + img + "_png", true, function () {
                if (conf.winGuide) {
                    ViewManager.ins().open(conf.winGuide[0], conf.winGuide[1]);
                    if (conf.winGuide[0] != "LiLianWin")
                        ViewManager.ins().close(LiLianWin);
                }
            });
        }
    };
    NewArtifactWin.prototype.artifactTween = function () {
        var t = egret.Tween.get(this.groupMaterial, { "loop": true });
        t.to({ y: 60 }, 1000).to({ y: 101 }, 1000);
    };
    NewArtifactWin.prototype.getGuideTips = function () {
        var maxIndex = Artifact.ins().getMaxIndex();
        for (var i = 1; i <= maxIndex; i++) {
            var data = Artifact.ins().getNewArtifactBy(i);
            var mId = this.getGuideMaterialId(i);
            this.index = i;
            if (!data.open) {
                break;
            }
        }
    };
    NewArtifactWin.prototype.getGuideMaterialId = function (index) {
        var conf = GlobalConfig.ImbaConf[index];
        var data = Artifact.ins().getNewArtifactBy(index);
        var id = 0;
        for (var i = 0; i < conf.jigsawId.length; i++) {
            var e = (data.record >> i) & 1;
            if (e != 1) {
                id = conf.jigsawId[i];
                break;
            }
        }
        return id;
    };
    NewArtifactWin.prototype.openTips = function (mId) {
        var artData = Artifact.ins().getNewArtifactBy(this.index);
        var conf = GlobalConfig.ImbaConf[this.index];
        var itemConf = GlobalConfig.ImbaJigsawConf[mId];
        var index = conf.jigsawId.indexOf(mId);
        var state = (artData.record >> index) & 1;
        var state2 = ((artData.exitRecord >> index) & 1) && !state;
        this.parttips.visible = false;
        if (state2)
            ViewManager.ins().open(ArtifactChipOpenWin, mId, this.index);
        else {
            ViewManager.ins().open(shenqispTipsWin, mId, this.index);
        }
    };
    NewArtifactWin.prototype.setMaterialImg = function () {
        this.cleanMaterialImg();
        var conf = GlobalConfig.ImbaConf[this.index];
        var data = Artifact.ins().getNewArtifactBy(this.index);
        var id = 0;
        for (var i = 0; i < conf.jigsawId.length; i++) {
            var e = (data.record >> i) & 1;
            if (!this.arrImage[i]) {
                var img = new eui.Image();
                this.arrImage.push(img);
                this.groupMaterial.addChild(img);
            }
            if (e == 1) {
                var mConf = GlobalConfig.ImbaJigsawConf[conf.jigsawId[i]];
                this.arrImage[i].source = mConf.img;
                this.arrImage[i].visible = true;
                this.arrImage[i].x = mConf.point.x;
                this.arrImage[i].y = mConf.point.y;
            }
        }
    };
    NewArtifactWin.prototype.cleanMaterialImg = function () {
        for (var i = 0; i < this.arrImage.length; i++) {
            this.arrImage[i].visible = false;
        }
    };
    NewArtifactWin.prototype.onLink = function (e) {
        var mid = parseInt(e.item["index"]);
        if (!isNaN(mid))
            this.openTips(mid);
    };
    return NewArtifactWin;
}(BaseEuiView));
__reflect(NewArtifactWin.prototype, "NewArtifactWin");
ViewManager.ins().reg(NewArtifactWin, LayerManager.UI_Main);
//# sourceMappingURL=NewArtifactWin.js.map