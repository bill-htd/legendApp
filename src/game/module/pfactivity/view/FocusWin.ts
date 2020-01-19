/**
 * Created by hrz on 2017/9/19.
 */

class FocusWin extends BaseEuiView {
    private bgClose:eui.Rect;
    private closeBtn:eui.Button;
    private focusBtn:eui.Button;
    private reward:eui.List;

    constructor(){
        super();
        this.skinName = `UpToDesktopSkin`;
    }

    open(){
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.focusBtn, this.onTap);
        this.initList();
    }

    private initList(){
        let award = GlobalConfig.WeiXiGuanZhuConst.awards;
        this.reward.itemRenderer = ItemBase;
        this.reward.dataProvider = new eui.ArrayCollection(award);
    }

    private onTap(e:egret.TouchEvent){
        let tar = e.currentTarget;
        switch (tar) {
            case this.bgClose:
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.focusBtn:
                window["showQRCode"] && window["showQRCode"]();
                ViewManager.ins().close(this);
                break;
        }
    }
}

ViewManager.ins().reg(FocusWin, LayerManager.UI_Popup);