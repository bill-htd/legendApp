/**
 * 红包发送类
 */
class HongBaoSpeak extends BaseEuiView {
    private sendBtn:eui.Button;
    private closeBtn:eui.Rect;
    public input: eui.EditableText;

    private actId:number;
    private index:number;
    constructor() {
        super();
        this.skinName = "hongbaoSpeakSkin";
    }

    public destoryView(): void {
        super.destoryView();
    }

    public initUI(): void {
        super.initUI();

    }

    public open(...param: any[]): void {
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.sendBtn, this.onClick);
        // this.input.addEventListener(egret.FocusEvent.FOCUS_IN, this.updateInput, this);
        this.actId = param[0];
        this.index = param[1];
        let config:ActivityType12Config = GlobalConfig.ActivityType12Config[this.actId][this.index];
        this.input.text = "";
        this.input.prompt = config.blessWord + "（点击输入）";
        this.input.maxChars = config.wordCount;
    }

    public close(...param: any[]): void {
   
    }

    private onClick(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.sendBtn:
                ViewManager.ins().close(this);
                let activityData: ActivityType12Data = Activity.ins().getActivityDataById(this.actId) as ActivityType12Data;
                if( !activityData.isOpenActivity() ){
                    UserTips.ins().showTips(`活动已结束`);
                    return;
                }
                Activity.ins().sendReward(this.actId,this.index,EnvelopeType.SEND,this.input.text);
                ViewManager.ins().close(XiaoNianWin);
                // let activityData: ActivityType12Data = Activity.ins().getActivityDataById(this.actId) as ActivityType12Data;
                // let config:ActivityType12Config[] = GlobalConfig.ActivityType12Config[this.actId];
                // if( config && config[this.index] ){
                //     if( activityData.score >= config[this.index].score )
                //         Activity.ins().sendReward(this.actId,this.index,EnvelopeType.SEND,this.input.text);
                //     else
                //         UserTips.ins().showTips(`积分不足`);
                // }
                break;
        }
    }

}

ViewManager.ins().reg(HongBaoSpeak, LayerManager.UI_Popup);