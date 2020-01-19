/**
 * 活动3控件6
 */
class OSATarget3ItemRender6 extends BaseItemRender {
	private get:eui.Button;
	private reward:eui.List;
	private isGet:boolean;//是否可领取
	private redPoint:eui.Image;
	private actId:number;
	private index:number;
	public already:eui.Label;
	private target:eui.Label;
	private recharge:eui.Label;
	constructor(){
		super();
		this.skinName = `DailyRechargeItemSkin`;
	}

	protected childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick,this);
		this.reward.itemRenderer = ItemBase;
		this.isGet = true;
	}

	/**触摸事件 */
	public onClick(e:egret.Event) {
		let ins:Activity|PActivity;
		let config: ActivityType3Config|PActivity3Config;
		let activityData: ActivityType3Data|PActivityType3Data
		if(  this.data instanceof ActivityType3Config ){
			ins = Activity.ins();
			config = GlobalConfig.ActivityType3Config[this.actId][this.index];
			activityData = ins.getActivityDataById(this.actId) as ActivityType3Data;
		}else if( this.data instanceof PActivity3Config ){
			ins = PActivity.ins();
			config = GlobalConfig.PActivity3Config[this.actId][this.index];
			activityData = ins.getActivityDataById(this.actId) as PActivityType3Data;
		}
		switch (e.target){
			case this.get:
				if( this.isGet ){
					ins.sendReward(this.actId,this.index);
				}else{
					let tips = 0;
					switch (config.showType){
						case Show3Type.TYPE6:
							if( activityData.chongzhiTotal < config.val )
								tips = config.val - activityData.chongzhiTotal;
							break;
					}
					if( !tips ){
						Activity.ins().sendReward(this.actId,this.index);
						return;
					}
					if( config.showType == Show3Type.TYPE6 && activityData.chongzhiTotal < config.val )
						UserTips.ins().showTips("未完成累计充值");

				}
				break;
		}
	}

	dataChanged() {
		super.dataChanged();
		let config:ActivityType3Config|PActivity3Config;
		let activityData: ActivityType3Data|PActivityType3Data;
		if(  this.data instanceof ActivityType3Config ){
			config = this.data as ActivityType3Config;
			activityData = Activity.ins().getActivityDataById(config.Id) as ActivityType3Data;
		}else if( this.data instanceof PActivity3Config ){
			config = this.data as PActivity3Config;
			activityData = PActivity.ins().getActivityDataById(config.Id) as PActivityType3Data;
		}

		// this.num.text = config.day+"";
		this.reward.dataProvider = new eui.ArrayCollection(config.rewards);

		this.target.text = `累计充值${config.val}元宝`;
		let color = 0x00ff00;
		if( activityData.chongzhiTotal < config.val ){
			color = 0xff0000;
		}
		this.recharge.textFlow = TextFlowMaker.generateTextFlow1(`(|C:${color}&T:${activityData.chongzhiTotal}|C:${0x00ff00}&T:/${config.val})`);
		//控件按钮状态
		let btnType:number = activityData.getRewardStateById(config.index);
		switch (btnType){
			case Activity.NotReached:
				this.get.label = "未完成";
				this.get.currentState = "disabled";
				this.isGet = false;
				this.redPoint.visible = false;
				break;
			case Activity.CanGet:
				this.get.label = "领取";
				this.get.currentState = "up";
				this.isGet = true;
				this.redPoint.visible = true;
				break;
			case Activity.Geted://已领取
				this.isGet = false;
				this.redPoint.visible = false;
				this.get.visible = false;
				this.already.visible = true;
				break;
		}

		this.actId = config.Id;
		this.index = config.index;
	}
}