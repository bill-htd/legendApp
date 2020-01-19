class WorldBossBeKillWin extends BaseEuiView {
	public reliveBtn: eui.Button;
	public exitBtn: eui.Button;
	public killTips: eui.Label;
	public reliveTxt: eui.Label;
	public reliveTimesTxt: eui.Label;
	private remainM: number = 0;
	private alive:eui.Label;
	private aliveNum:number;
	public moneyIcon:eui.Image;

	constructor() {
		super();
	}

	public initUI(): void {
		super.initUI();

		this.skinName = "WorldBossGoldSkin";
		// this.isTopLevel = true;
		this.aliveNum = 0;
	}

	public open(...param: any[]): void {
		this.addTouchEvent(this.reliveBtn, this.onTap);
		this.addTouchEvent(this.exitBtn, this.onTap);
		this.setWin();
	}

	public close(...param: any[]): void {
		this.removeTouchEvent(this.reliveBtn, this.onTap);
		this.removeTouchEvent(this.exitBtn, this.onTap);
		ViewManager.ins().close(WorldBossCdWin);
	}

	private setWin(): void {
		// if (ZsBoss.ins().isZsBossFb(GameMap.fubenID)) {
		if (UserBoss.ins().killerHandler > 0) {
			let killer = EntityManager.ins().getEntityByHandle(UserBoss.ins().killerHandler);
			let str: string = "";
			if (killer) {
				if (killer instanceof CharRole) {
					str = killer.infoModel.name;
				}
				else if( killer.infoModel.masterHandle ){
					let killers = EntityManager.ins().getMasterList(EntityManager.ins().getRootMasterHandle(killer.infoModel.masterHandle));//如果是召唤兽 就是它主人的handler
					if (killers && killers.length) {
						for (let char of killers) {
							if (char instanceof CharRole) {
								str = `${char.infoModel.name}`
								break;
							}
						}
					}
					if (!str) {
						str = `${killer.infoModel.name}`;
					}
				}
				else {
					str = `Boss${killer.infoModel.name}`;
				}
			}
			//正常流程玩家不会死亡
			// //修复引导副本玩家死亡显示名字错误bug
			// if (str.indexOf("&T") >= 0 && str.indexOf("|") >= 0) {
			// 	str = str.replace("\n", "");
			// 	let tf = TextFlowMaker.generateTextFlow1(`你被${str}击败`);
			// 	for (let style of tf) {
			// 		if (style.style && style.style.size) {
			// 			style.style.size = this.killTips.size;
			// 		}
			// 	}
			// 	this.killTips.textFlow = tf;
			// } else {
			// }
			this.killTips.textFlow = new egret.HtmlTextParser().parser(`你被${StringUtils.addColor(`${str}`,'#23C42A')}击败`);
			this.aliveNum = this.getAliveItem();
			this.alive.visible = this.aliveNum?true:false;
			if( this.alive.visible )
				this.alive.text = `复活道具 ${this.aliveNum}/1`;
		}

		this.reliveBtn.label = `${UserBoss.ins().checkWorldBossNeed()}原地复活`;
		if (GameMap.fbType == UserFb.FB_TEAM)
		{
			this.reliveBtn.visible = false;
			this.moneyIcon.visible = false;
		}
		else
		{
			this.reliveBtn.visible = true;
			this.moneyIcon.visible = true;
		}

		this.reliveTimesTxt.text = UserBoss.ins().reliveTime + "秒";
		TimerManager.ins().remove(this.refushLabel, this);
		this.remainM = UserBoss.ins().reliveTime;
		TimerManager.ins().doTimer(1000, this.remainM, this.refushLabel, this, this.overTime, this);

		DieGuide.ins().postdieGuide(0);//死亡引导
	}
	private getAliveItem():number{
		if (BattleCC.ins().isBattle() || PaoDianCC.ins().isPaoDian)
			return 0;

		let itemId: number = CityCC.ins().isCity ? GlobalConfig.CityBaseConfig.rebornItem : GlobalConfig.WorldBossBaseConfig.rebornItem;
		let item:ItemData = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER,itemId);
		if (!item) return 0;
		return item.count;
	}

	private refushLabel(): void {
		this.remainM--;
		this.reliveTimesTxt.text = this.remainM + "秒";
	}

	private overTime(): void {
		ViewManager.ins().close(this);
		ViewManager.ins().close(WorldBossCdWin);
	}

	public static openCheck(...param: any[]): boolean {
		return true;
	}

	private onTap(e: egret.TouchEvent): void {
		switch (e.currentTarget) {
			case this.reliveBtn:
				if( this.aliveNum ){
					UserBoss.ins().sendClearCD();
					return;
				}
				if (UserBoss.ins().checkWorldBossMoney()) 
						UserBoss.ins().sendClearCD();		
				else 
				{
						UserTips.ins().showTips("元宝不足，无法立即复活");
						//ViewManager.ins().open(WorldBossBeKillWin);
						//UserBoss.ins().ShowTip = false;
					}
				break;
			case this.exitBtn:
				UserFb.ins().sendExitFb();
				break;

		}
	}
}

ViewManager.ins().reg(WorldBossBeKillWin, LayerManager.UI_Popup);
