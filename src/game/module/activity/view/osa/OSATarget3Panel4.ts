/**
 * Created by hrz on 2017/10/13.
 * 7天充值 每日充值和累计充值
 */

class OSATarget3Panel4 extends BaseView {
    private reward0:eui.List;
    private reward1:eui.List;
    private get0:eui.Button;
    private get1:eui.Button;
    private actTime:eui.Label;
    private actDesc:eui.Label;
    private record0:eui.Label;
    private record1:eui.Label;
    private already0:eui.Label;
    private already1:eui.Label;
    private target0:eui.Label;
    private target1:eui.Label;
    private redPoint0:eui.Image;
    private redPoint1:eui.Image;
    public activityID:number;
    private _time:number;
    private _index:number;
    private actType:number;
    constructor() {
        super();
        this.skinName = `SecondRechargeSkin`;
    }

    protected childrenCreated() {
        super.childrenCreated();
        this.reward0.itemRenderer = ItemBase;
        this.reward1.itemRenderer = ItemBase;
    }

    open() {
        this.addTouchEvent(this.get0, this.onTap);
        this.addTouchEvent(this.get1, this.onTap);
        TimerManager.ins().doTimer(1000,0,this.setTime,this);
        this.actType = ActivityPanel.getActivityTypeFromId(this.activityID);
        this.initData();
    }
    private initData(){
        this.setIndex(0);
        this.setIndex(1);
        this.updateTime();
    }

    private setIndex(type) {
        let index:number,curValue:number;
        let act:ActivityType3Data|PActivityType3Data;
        let config:ActivityType3Config|PActivity3Config;
        if( this.actType == ActivityType.Normal ){
            act = Activity.ins().getActivityDataById(this.activityID) as ActivityType3Data;
        }else if( this.actType== ActivityType.Personal ){
            act = PActivity.ins().getActivityDataById(this.activityID) as PActivityType3Data;
        }
        if(type == 0){
            index = act.getCurIndex(3);
            this._index = index;
            curValue = act.chongzhiNum;
        } else {
            index = act.getCurIndex(2);
            curValue = act.chongzhiTotal;
        }
        if( this.actType == ActivityType.Normal ){
            config = GlobalConfig.ActivityType3Config[this.activityID][index];
        }else if( this.actType== ActivityType.Personal ){
            config = GlobalConfig.ActivityType3Config[this.activityID][index];
        }

        this[`reward${type}`].dataProvider = new eui.ArrayCollection(config.rewards);
        this[`redPoint${type}`].visible = false;
        let already:eui.Label = this[`already${type}`];
        let getBtn:eui.Button = this[`get${type}`];
        let record:eui.Label = this[`record${type}`];
        already.visible = false;
        if (curValue >= config.val) {
            let state = (act.recrod>>index) & 1;
            if (state == 0) {
                getBtn.label = `立即领取`;
                getBtn.visible = true;
                getBtn.enabled = true;
                this[`redPoint${type}`].visible = true;
            } else {
                getBtn.label = `已领取`;
                getBtn.visible = false;
                already.visible = true;
            }
            record.textColor = 0x00ff00;
        } else {
            getBtn.label = `未完成`;
            getBtn.visible = true;
            getBtn.enabled = false;
            record.textColor = 0xff9900;
        }
        record.text = `已充值${curValue}/${config.val}元宝`;

        if(type==0) {
            this.target0.text = `今日累计充值${config.val}元宝可领取`;
        } else {
            this.target1.text = `7日累计充值${config.val}元宝可领取`;
        }
    }

    private updateTime(){
        let act:ActivityType3Data|PActivityType3Data;
        let config:ActivityConfig|PActivityConfig;
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
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    }

    private onTap(e:egret.TouchEvent){
        let tar = e.currentTarget;
        if(tar == this.get0) {
            if( this.actType == ActivityType.Normal ){
                Activity.ins().sendReward(this.activityID, this._index);
            }else if( this.actType == ActivityType.Personal ){
                PActivity.ins().sendReward(this.activityID, this._index);
            }

        } else if (tar == this.get1) {
            let act:ActivityType3Data|PActivityType3Data;
            if( this.actType == ActivityType.Normal ){
                act = Activity.ins().getActivityDataById(this.activityID) as ActivityType3Data;
                Activity.ins().sendReward(this.activityID, act.getCurIndex(2));
            }else if( this.actType == ActivityType.Personal ){
                act = PActivity.ins().getActivityDataById(this.activityID) as PActivityType3Data;
                PActivity.ins().sendReward(this.activityID, act.getCurIndex(2));
            }

        }
    }

    close(){
        this.removeTouchEvent(this.get0, this.onTap);
        this.removeTouchEvent(this.get1, this.onTap);
        TimerManager.ins().removeAll(this);
    }

    updateData(){
        this.initData();
    }
}