class OSATarget3Panel9 extends BaseView {
    activityID:number;
    private actTime1:eui.Label;
    private actInfo1:eui.Label;

    private rechargeBtn:eui.Group;

    private singleReward:ItemBase;
    private _sendConf:ActivityType3Config;

    // private targtet:CelebrationItem;
    private tonk:MovieClip;
    private boom:MovieClip;
    private bigEgg:eui.Image;//巨蛋
    private hamer:eui.Group;//锤子特效
    private flower:eui.Group;//爆炸特效
    private already:eui.Label;
    private reward:eui.List;
    private redPoint:eui.Image;
    constructor(id) {
        super();
        this.activityID = id || 0;
        this.initSkin();
    }

    private initSkin() {
        let config = GlobalConfig.ActivityConfig[this.activityID];
        this.skinName = config.pageSkin;
    }

    open() {
        this.initSkin();

        // for (let i = 0; i < 6; i++) {
        //     this.addTouchEvent(this[`reward${i}`], this.onTap);
        // }
        let config:ActivityType3Config[] = GlobalConfig.ActivityType3Config[this.activityID];
        let len:number = CommonUtils.getObjectLength(config);
        for( let i = 0;i < len;i++ ){
            if( this[`targtet${i}`] )
                this.addTouchEvent(this[`targtet${i}`], this.onTap);
        }

        this.addTouchEvent(this.rechargeBtn, this.onTap);
        this.observe(Activity.ins().postActivityIsGetAwards, this.showAward);
        this.reward.itemRenderer = ItemBase;
        this.initData();
        TimerManager.ins().doTimer(1000, 0, this.updateTime, this);
    }

    private initData() {
        this.actInfo1.text = GlobalConfig.ActivityConfig[this.activityID].desc;

        for (let i in GlobalConfig.ActivityType3Config[this.activityID]) {
            let conf = GlobalConfig.ActivityType3Config[this.activityID][i];
            if (conf.type == 4) {
                this.singleReward.data = conf.rewards[0];
                break;
            }
        }

        this.updateTime();
        this.updateData2();
    }

    private updateTime(){
        let act = Activity.ins().getActivityDataById(this.activityID) as ActivityType3Data;
        let sec = act.getLeftTime();
        this.actTime1.text = DateUtils.getFormatBySecond(sec, DateUtils.TIME_FORMAT_5, 3);
    }

    private onTap(e:egret.TouchEvent) {
        if (e.currentTarget == this.rechargeBtn) {
            if( !this._sendConf )return;
            // let rdata:RechargeData = Recharge.ins().getRechargeData(0);
            // if(!rdata || rdata.num != 2 ){
            //     ViewManager.ins().open(Recharge1Win);
            // }else{
            //     ViewManager.ins().open(ChargeFirstWin);
            // }
            let actData:ActivityType3Data = Activity.ins().getActivityDataById(this._sendConf.Id) as ActivityType3Data;
            let state = actData.getRewardStateById(this._sendConf.index);
            if (state == Activity.Geted) {
                //已领取
                UserTips.ins().showTips(`已领取`);
            }else if (state == Activity.CanGet) {
                //可领取
                Activity.ins().sendReward(this.activityID, this._sendConf.index);
            }else{
                //未达成
                UserTips.ins().showTips(`未达成条件不足，请先获得锤子充值目标`);
            }
            return;
        }
        if( e.currentTarget instanceof CelebrationItem ){
            let tar = e.currentTarget as CelebrationItem;
            this.updateReward(tar.data.config.index,tar.data.config.index);
            let cfg:ActivityType3Config[] = GlobalConfig.ActivityType3Config[this.activityID];
            for( let i in cfg ){//重置选中
                if( cfg[i].index != tar.data.config.index && this[`targtet${cfg[i].index-1}`])
                    this[`targtet${cfg[i].index-1}`].setSelect(false);
            }
        }

    }

    private showAward() {
        if(this._sendConf) {
            let actData:ActivityType3Data = Activity.ins().getActivityDataById(this._sendConf.Id) as ActivityType3Data;
            let state = actData.getRewardStateById(this._sendConf.index);
            if (state == Activity.Geted) {
                // UserTips.ins().showItemTips(this._sendConf.rewards[0].id);
                //领取后的表现效果
                this.showEff(this._sendConf);
                this.rechargeBtn.visible = false;
                this.already.visible = !this.rechargeBtn.visible;
            }
        }
    }

    close() {
        // for (let i = 0; i < 6; i++) {
        //     this.removeTouchEvent(this[`reward${i}`], this.onTap);
        // }
        this.cleanEff();
        this.removeTouchEvent(this.rechargeBtn, this.onTap);
        this.removeObserve();

        TimerManager.ins().remove(this.updateTime, this);
    }

    private updateReward(index:number,select?:number){
        let act = Activity.ins().getActivityDataById(this.activityID) as ActivityType3Data;
        let config:ActivityType3Config = GlobalConfig.ActivityType3Config[this.activityID][index];
        if( !config || !act || !this[`targtet${index-1}`])return;
        this[`targtet${index-1}`].data = {curCost:act.chongzhiTotal,config:config};
        this[`targtet${index-1}`].setSelect(select?(index==select):false);
        this.rechargeBtn.visible = true;
        this.bigEgg.source = config.expAttr[4];
        if( index == select ){
            this._sendConf = config;
            let state = act.getRewardStateById(this._sendConf.index);
            this.redPoint.visible = false;
            if (state == Activity.Geted) {
                //已领取
                this.rechargeBtn.visible = false;
                this.bigEgg.source = config.expAttr[5];
            }else if (state == Activity.CanGet) {
                //可领取
                this.redPoint.visible = true;
            }else{
                //未达成

            }
            this.reward.dataProvider = new eui.ArrayCollection(config.rewards);
        }
        this.already.visible = !this.rechargeBtn.visible;

    }
    //updateData会通用调用刷新数据显示
    updateData2() {
        let curIndex = this.getRuleIndex();
        if( !curIndex )return;
        let act = Activity.ins().getActivityDataById(this.activityID) as ActivityType3Data;
        let config:ActivityType3Config[] = GlobalConfig.ActivityType3Config[this.activityID];
        // config.expAttr [完整 , 破蛋, 锤子特效, 爆炸特效]
        // for (let i = 0; i < 5; i++) {
        //     let curConf = config[i+1];
        //     let nextConf = config[i+2];
        //
        //     let v = Math.floor((act.chongzhiTotal - curConf.val) / (nextConf.val-curConf.val) * 5);
        //
        //     for (let j = 0; j < 5; j++) {
        //         let key =  `sche${i}bell${j}`;
        //         if (v > j) {
        //             this[key].source = "bell2"
        //         } else {
        //             this[key].source = "bell1";
        //         }
        //     }
        // }
        let len:number = CommonUtils.getObjectLength(config);
        for (let i = 0; i < len; i++) {
            this.updateReward(i+1,curIndex);
        }

    }
    private updateData(){

    }
    private getRuleIndex():number{
        let act = Activity.ins().getActivityDataById(this.activityID) as ActivityType3Data;
        if( !act )return 0;
        let config:ActivityType3Config[] = GlobalConfig.ActivityType3Config[this.activityID];
        let maxIndex = CommonUtils.getObjectLength(config);
        let minIndex = maxIndex;//最小显示索引
        for( let k in config ){
            if( config[k].index-1 >= maxIndex || !this[`targtet${config[k].index-1}`])
                continue;
            let state = act.getRewardStateById(config[k].index);
            if (state == Activity.Geted) {
                //已领取
                continue;
            }else if (state == Activity.CanGet) {
                //可领取
                return config[k].index;
            }else{
                //未达成
                if( minIndex > config[k].index )
                    minIndex = config[k].index;
            }
        }
        return minIndex;
    }
    private cleanEff(){
        egret.Tween.removeTweens(this.hamer);
        egret.Tween.removeTweens(this.flower);
        DisplayUtils.removeFromParent(this.tonk);
        DisplayUtils.removeFromParent(this.boom);
    }
    private showEff(config:ActivityType3Config){
        if( !config )return;
        if( !this.tonk )
            this.tonk = new MovieClip;
        if( !this.tonk.parent )
            this.hamer.addChild(this.tonk);
        if( !this.boom )
            this.boom = new MovieClip;
        if( !this.boom.parent )
            this.flower.addChild(this.boom);
        egret.Tween.removeTweens(this.hamer);
        egret.Tween.removeTweens(this.flower);
        let self = this;
        this.tonk.playFile(RES_DIR_EFF + config.expAttr[2],1,()=>{
            let tw:egret.Tween = egret.Tween.get(this.hamer);
            //从完整变成破蛋
            tw.wait(200).call(()=>{
                // self.bigEgg.source = config.expAttr[1];
                self.updateReward(config.index,config.index);
            });
            self.boom.playFile(RES_DIR_EFF + config.expAttr[3],1,()=>{
                egret.Tween.removeTweens(self.hamer);
                egret.Tween.removeTweens(self.flower);
                DisplayUtils.removeFromParent(self.tonk);
                DisplayUtils.removeFromParent(self.boom);
            });
        });

    }
}