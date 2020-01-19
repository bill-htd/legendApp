/**
 * Created by hrz on 2017/9/6.
 *
 * 7日活动 累充
 */

class OSATarget3Panel2 extends BaseView {
    private getBtn:eui.Button;
    private state:eui.Label;
    private reward:eui.List;
    private already:eui.Label;
    private redPoint:eui.Image;
    public activityID:number;
    private actTime:eui.Label;
    private actDesc:eui.Label;
    private process:eui.Group;

    private _state:number = 0;
    private _index:number = 1;

    private _time:number = 0;

    private rechargeBar:ProgressBarEff;
    private actType:number;
    constructor(){
        super();
        this.skinName = `OSATotalRechargeSkin`;
    }

    protected childrenCreated() {
        super.childrenCreated();
        this.reward.itemRenderer = ItemBase;
    }

    open() {
        this.addTouchEvent(this.getBtn, this.onTap);
        TimerManager.ins().doTimer(1000,0,this.setTime,this);
        this.actType = ActivityPanel.getActivityTypeFromId(this.activityID);
        this.initData();
    }
    private initData(){
        if(!this.rechargeBar){
            this.rechargeBar = new ProgressBarEff();
            this.rechargeBar.setWidth(520);
            this.rechargeBar.x = -272;
            this.rechargeBar.y = 0;
            this.process.addChild(this.rechargeBar);
        }
        let config:ActivityType3Config|PActivity3Config;
        let act:ActivityType3Data|PActivityType3Data;
        let index:number;

        if( this.actType == ActivityType.Normal ){
            act = Activity.ins().getActivityDataById(this.activityID) as ActivityType3Data;
            index = act.getCurIndex();
            config = GlobalConfig.ActivityType3Config[this.activityID][index];
        }else if( this.actType == ActivityType.Personal ){
            act = PActivity.ins().getActivityDataById(this.activityID) as PActivityType3Data;
            index = act.getCurIndex();
            config = GlobalConfig.PActivity3Config[this.activityID][index];
        }
        this._index = index;

        this.reward.dataProvider = new eui.ArrayCollection(config.rewards);
        this.redPoint.visible = false;
        this.state.visible = true;
        if (act.chongzhiTotal>=config.val) {
            let state = (act.recrod>>index) & 1;
            if (state == 0) {
                this.getBtn.label = `领取`;
                this.getBtn.visible = true;
                this.getBtn.enabled = true;
                this.already.visible = false;
                this.redPoint.visible = true;
                this._state = 1;
            } else {
                this.getBtn.label = `已领取`;
                this.getBtn.visible = false;
                this.already.visible = true;
                this.state.visible = false;
                this._state = 2;
            }
            this.state.textColor = 0x00ff00;
        } else {
            this.getBtn.label = `未完成`;
            this.getBtn.visible = true;
            this.getBtn.enabled = false;
            this.already.visible = false;
            this.state.textColor = 0xff9900;
            this._state = 0;
        }
        this.state.text = `已充值${act.chongzhiTotal}/${config.val}元宝`;
        this.rechargeBar.setData(act.chongzhiTotal, config.val);
        this.rechargeBar.setLbValueText("");
        this.updateTime();
    }

    private updateTime(){
        let act:ActivityType3Data|PActivityType3Data;
        let config: ActivityConfig|PActivityConfig
        if( this.actType == ActivityType.Normal ){
            act = Activity.ins().getActivityDataById(this.activityID) as ActivityType3Data;
            config = GlobalConfig.ActivityConfig[this.activityID];
        }else if( this.actType == ActivityType.Personal ){
            act = PActivity.ins().getActivityDataById(this.activityID) as PActivityType3Data;
            config = GlobalConfig.PActivityConfig[this.activityID];
        }
        let sec = act.getLeftTime();
        this._time = sec;

        this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);


        this.actDesc.text = config.desc;
    }

    private setTime() {
        if(this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5,3);
        }
    }

    private onTap(){
        if(this._state == 1) {
            if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
                UserTips.ins().showTips(`背包剩余空位不足，请先清理`);
                return;
            }
            if( this.actType == ActivityType.Normal ){
                Activity.ins().sendReward(this.activityID, this._index);
            }else if( this.actType == ActivityType.Personal ){
                PActivity.ins().sendReward(this.activityID, this._index);
            }
        }
    }

    close(){
        this.removeTouchEvent(this.getBtn, this.onTap);
        TimerManager.ins().removeAll(this);
    }

    updateData(){
        this.initData();
    }
}