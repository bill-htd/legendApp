

class OSATarget5Panel4 extends BaseView {
    private reward: eui.List;
    private getBtn: eui.Button;
    private btnMC: MovieClip;
    private _activityData: ActivityType5Data;
    public activityID: number;
    private day: number;


    constructor() {
        super();
        this.skinName = `OSADailyDoubleRechargeSkin`;
        this.addTouchEvent(this.getBtn, this.onTouch);
        this.reward.itemRenderer = ItemBase;
    }

    public open(...param: any[]): void {
        let config: ActivityType5Config[] = GlobalConfig.ActivityType5Config[this.activityID];
        console.log(config)
        this.reward.dataProvider = new eui.ArrayCollection(config.rewards);
        this.updateData()

    }

    private onTouch(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.getBtn:

                Activity.ins().sendReward(this.activityID, this.day);


                // alert(1)
                // if ( (this._activityData as ActivityType5Data).getCurDay() >= this.day)
                // Activity.ins().sendReward(this.activityID, 1);
                // else
                //     UserTips.ins().showTips("|C:0xf3311e&T:登陆天数不足，无法领取|");
                break;
        }
    }
    updateData() {
        this._activityData = Activity.ins().getActivityDataById(this.activityID) as ActivityType5Data;
        let conf: any = GlobalConfig['ActivityType5Config'][this.activityID]
        this.day = conf.day;
        let flag: boolean = ((this._activityData.recrod >> this.day & 1) == 1);
        console.log('是否已经领取过了')
        console.log(this._activityData.recrod)
        console.log(this.day)
        if (!flag) {
            this.getBtn.visible = false
            console.log('领取过了')
        } else {
            this.getBtn.visible = true
            console.log('还没领取')
        }
    }
    public close(...param: any[]): void {
        this.removeTouchEvent(this.getBtn, this.onTouch);
        DisplayUtils.removeFromParent(this.btnMC);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    }



}