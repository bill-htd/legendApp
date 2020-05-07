

class OSATarget0Panel5 extends BaseView {
    private reward: eui.List;
    private getBtn:eui.Button;

    constructor() {
        super();
        this.skinName = `OSADailyDoubleRechargeSkin`;
    }
    protected childrenCreated() {
        super.childrenCreated();
        this.reward.itemRenderer = ItemBase;
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    }
    // OSADailyDoubleRechargeSkin
    open() {
        

        // this.reward.dataProvider = new eui.ArrayCollection(config.awardList.concat());
    }

    private onTap(e:egret.TouchEvent) {
        // Recharge.ins().getDayReward(this.data.index);

    }




}