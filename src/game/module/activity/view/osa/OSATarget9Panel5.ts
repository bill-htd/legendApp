class OSATarget9Panel5 extends BaseView {
	public title: eui.Group;
	public actTime: eui.Label;

	//抽奖
	// item0~item9: BabelLotteryItem;
	private tttzhi: eui.Image;
	private choujiangBtn: eui.Button;

	//消耗
	private pay0: eui.Label;
	private num: eui.Label;
	private icon: eui.Image;
	private getkey: eui.Label;//获取钥匙

	private turnten: eui.CheckBox;//10连抽
	private list: eui.List;
	private rolling: boolean;
	private num2: eui.Label;
	public activityID: number;

	private actType: number;
	private config9: ActivityType9Config[][] | PActivity9Config[][];
	private ins: Activity | PActivity;

	public constructor() {
		super();
	}

	private setCurSkin(): void {
		let aCon: ActivityConfig | PActivityConfig;
		if (this.actType == ActivityType.Normal) {
			aCon = GlobalConfig.ActivityConfig[this.activityID];
		} else if (this.actType == ActivityType.Personal) {
			aCon = GlobalConfig.PActivityConfig[this.activityID];
		}

		if (aCon.pageSkin)
			this.skinName = aCon.pageSkin;
		else
			this.skinName = "XNluckyTurntableSkin";
	}

	public close(...param: any[]): void {
		this.removeObserve();
		// for( let i = 0;i < 3;i++ ){
		//     this.removeTouchEvent(this[`isget${i}`], this.onGiftClick);
		// }
		egret.Tween.removeTweens(this.tttzhi);
		this.rolling = false;
		let data: ActivityType9Data | PActivityType9Data;
		if (this.actType == ActivityType.Normal) {
			data = this.ins.activityData[this.activityID] as ActivityType9Data;
		} else if (this.actType == ActivityType.Personal) {
			data = this.ins.activityData[this.activityID] as PActivityType9Data;
		}
		if (data && data.indexs.length == 1) {
			//当前在转动中
			this.ins.sendReward(this.activityID, 1);
		}
		TimerManager.ins().removeAll(this);
	}

	public open(...param: any[]): void {
		this.actType = ActivityPanel.getActivityTypeFromId(this.activityID);
		this.setCurSkin();
		if (this.actType == ActivityType.Normal) {
			this.ins = Activity.ins();
			this.config9 = GlobalConfig.ActivityType9Config;
		} else if (this.actType == ActivityType.Personal) {
			this.ins = PActivity.ins();
			this.config9 = GlobalConfig.PActivityType9Config;
		}
		this.observe(this.ins.postChangePage, this.resultCallBack);
		// this.observe(Activity.ins().postRewardResult, this.resultCallBack);//类型9的2号返回消息用7号替代
		TimerManager.ins().doTimer(1000, 0, this.setTime, this);
		this.addTouchEvent(this.choujiangBtn, this.getLottery);
		// for( let i = 0;i < 3;i++ ){
		//     this.addTouchEvent(this[`isget${i}`], this.onGiftClick);
		// }
		this.list.itemRenderer = NoticeListRenderer;

		this.turnten.selected = false;
		this.currentState = "resetWithKey";
		this.validateNow();
		this.updateData();
	}

	private onTouch(e: egret.TouchEvent) {
		let num: number = 92 * 5;
		let scrollH: number = 0;
		switch (e.currentTarget) {

		}
	}

	public updateData(): void {
		// data.indexs = [];
		let config: ActivityType9Config | PActivity9Config = this.config9[this.activityID][0];
		let itemcfg: ItemConfig = GlobalConfig.ItemConfig[config.item];
		if (itemcfg) {
			this.icon.source = itemcfg.icon + "_png";
			let item: ItemData = UserBag.ins().getBagItemById(itemcfg.id);
			let sum = 0;
			let maxsum = 1;
			let colorStr: number = 0xD1C28F;
			if (item) {
				sum = item.count;
				if (sum >= maxsum)
					colorStr = ColorUtil.GREEN;
				else
					colorStr = ColorUtil.RED;
			} else {
				colorStr = ColorUtil.RED;
			}
			this.num.textFlow = TextFlowMaker.generateTextFlow1(`|C:${colorStr}&T:${sum}|C:0xD1C28F&T:/${maxsum}`);
			this.pay0.text = config.yb + "";
		}

		for (let i in this.config9[this.activityID]) {
			if (!(+i)) continue;
			let cfg: ActivityType9Config | PActivity9Config = this.config9[this.activityID][i];
			let item: BabelLotteryItem = this["item" + (+i - 1)] as BabelLotteryItem;
			item.itemIcon.data = cfg.reward[0];
			item.rewardState(false);//可以无限抽奖 没有已领取状态
		}
		this.num2.visible = false;

		// this.updateProgress();
		this.listRefush();
		this.setTime();
	}

	private resultCallBack(id: number) {
		let data: ActivityType9Data | PActivityType9Data;
		if (this.actType == ActivityType.Normal) {
			data = this.ins.activityData[this.activityID] as ActivityType9Data;
		} else if (this.actType == ActivityType.Personal) {
			data = this.ins.activityData[this.activityID] as PActivityType9Data;
		}
		if (!data || this.activityID != id) return;
		if (data.indexs.length > 1) {
			//10连抽返回 弹出奖励界面
			ViewManager.ins().open(LuckyResultWin, this.activityID, data.indexs);
		} else if (data.indexs.length == 1) {
			//单抽返回(第一次返回索引数组1) 第二次请求
			this.beginLottery(data.indexs[0]);
			// Activity.ins().sendReward(this.activityID,1);
		}
		this.listRefush();
		this.updateData();
	}

	private beginLottery(index: number): void {
		let rotat: number = 360 * 4 + (index - 1) * 36;
		let tween: egret.Tween = egret.Tween.get(this.tttzhi);
		this.rolling = true;
		tween.to({"rotation": rotat}, 4000, egret.Ease.circOut).call(() => {
			this.ins.sendReward(this.activityID, 1);
			this.flyItem(this["item" + (index - 1)] as BabelLotteryItem);
			setTimeout(() => {
				this.rolling = false;
			}, 2000);
		}, this);
	}

	private flyItem(item: BabelLotteryItem): void {
		var itemBase: ItemBase = new ItemBase();
		itemBase.x = item.x;
		itemBase.y = item.y;
		itemBase.data = item.itemIcon.data;
		itemBase.anchorOffsetX = itemBase.width / 2;
		itemBase.anchorOffsetY = itemBase.height / 2;
		item.parent.addChild(itemBase);
		GameLogic.ins().postFlyItemEx(itemBase);
	}

	private getLottery(): void {
		if (this.rolling) {
			UserTips.ins().showTips("正在抽奖，请稍候");
			return;
		}
		if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
			ViewManager.ins().open(BagFullTipsWin);
			return;
		}
		let config: ActivityType9Config | PActivity9Config = this.config9[this.activityID][0];
		if (this.turnten.selected) {
			//10连
			let item: ItemData = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, config.item);
			if (item && item.count) {
				this.ins.sendReward(this.activityID, 2);
			} else {
				let count = 10;
				let total: number = config.yb * count;
				HuntWarnBuyWin.showBuyWarn("LuckyResultWin" + this.activityID + "-10", this.checkSend10.bind(this), `是否消耗${total}元宝购买${GlobalConfig.ItemConfig[config.item].name}*${count}`)
			}
		} else {
			//1连
			let item: ItemData = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, config.item);
			if (item && item.count) {
				this.ins.sendReward(this.activityID, 1);
			} else {
				let count = 1;
				let total: number = config.yb * 1;
				HuntWarnBuyWin.showBuyWarn("LuckyResultWin" + this.activityID + "-1", this.checkSend1.bind(this), `是否消耗${total}元宝购买${GlobalConfig.ItemConfig[config.item].name}*${count}`)
			}
		}
	}

	private checkSend10() {
		//10连
		if (this.ins.getIsRollTen(this.activityID)) {
			this.ins.sendReward(this.activityID, 2);
		} else {
			UserTips.ins().showTips("元宝不足");
		}
	}

	private checkSend1() {
		//1连
		if (this.ins.getRollSum(this.activityID) || Actor.yb >= this.config9[this.activityID][0].yb) {
			this.ins.sendReward(this.activityID, 1);
		} else {
			UserTips.ins().showTips("元宝不足");
		}
	}

	// /**抽奖次数进度条*/
	// private updateProgress(){
	//     let config:ActivityType9Config|PActivity9Config = this.config9[this.activityID][0];
	//     let data: ActivityType9Data|PActivityType9Data;
	//     if( this.actType == ActivityType.Normal ){
	//         data = this.ins.activityData[this.activityID] as ActivityType9Data;
	//     }else if( this.actType == ActivityType.Personal ){
	//         data = this.ins.activityData[this.activityID] as PActivityType9Data;
	//     }
	//     let arr = [];
	//     if( config && data ){
	//         for( let i=0;i < config.reward.length;i++ ){
	//             let arrdata = {index:i,config:config,actType:this.actType};
	//             arr.push(arrdata);
	//         }
	//         this.menuListData.replaceAll(arr);
	//     }
	//     this.menuList.validateNow();
	//
	//     TimerManager.ins().doNext(()=>{
	//
	//         let startX = 0;
	//         for (let i = 1; i <= this.menuListData.length; i++) {
	//             if(data.getStateByIndex(i) == 0) {
	//                 startX = 90 * (i-1);
	//                 break;
	//             }
	//         }
	//         if (startX > this.menuList.contentWidth - this.menuList.width)
	//             startX = this.menuList.contentWidth - this.menuList.width;
	//         this.menuList.scrollH = startX;
	//
	//         this.updateBtn();
	//
	//     }, this);
	//
	// }
	// private updateBtn(){
	//     if( this.menuListData.length <= 5 ){
	//         this.rightBtn.visible = this.rightRed.visible = this.leftBtn.visible = this.leftRed.visible = false;
	//     }else{
	//         this.onChange();
	//     }
	// }
	// private onChange():void{
	//     if (this.menuList.scrollH < 46) {
	//         this.leftBtn.visible = this.leftRed.visible = false;
	//         this.rightBtn.visible = this.rightRed.visible = true;
	//     } else if (this.menuList.scrollH >= this.menuList.contentWidth - this.menuList.width - 46) {
	//         this.leftBtn.visible = this.leftRed.visible = true;
	//         this.rightBtn.visible = this.rightRed.visible = false;
	//     } else {
	//         this.leftBtn.visible = this.leftRed.visible = true;
	//         this.rightBtn.visible = this.rightRed.visible = true;
	//     }
	//     this.updateRedPoint();
	// }
	private updateRedPoint() {
		let config: ActivityType9Config | PActivity9Config = this.config9[this.activityID][0];
		let b = false;
		for (let i = 0; i < config.reward.length; i++) {
			b = this.ins.isGetRollReward(this.activityID, i);
			if (b)
				break;
		}
		// if( this.leftBtn.visible )
		//     this.leftRed.visible  = b;
		// if( this.rightBtn.visible )
		//     this.rightRed.visible = b;
	}


	private listRefush(): void {
		let data: ActivityType9Data | PActivityType9Data;
		if (this.actType == ActivityType.Normal) {
			data = this.ins.activityData[this.activityID] as ActivityType9Data;
		} else if (this.actType == ActivityType.Personal) {
			data = this.ins.activityData[this.activityID] as PActivityType9Data;
		}
		if (data) {
			let arr = [];
			for (let i = 0; i < data.noticeArr.length; i++) {
				let config: ActivityType9Config | PActivity9Config = this.config9[this.activityID][data.noticeArr[i].index];
				let notice = {
					activityID: this.activityID,
					name: data.noticeArr[i].name,
					index: data.noticeArr[i].index,
					actType: this.actType,
					des: config ? config.middleDesc : null
				};
				arr.push(notice);
			}
			this.list.dataProvider = new eui.ArrayCollection(arr);
		}

	}

	private setTime() {
		let data: ActivityType9Data | PActivityType9Data;
		if (this.actType == ActivityType.Normal) {
			data = this.ins.activityData[this.activityID] as ActivityType9Data;
		} else if (this.actType == ActivityType.Personal) {
			data = this.ins.activityData[this.activityID] as PActivityType9Data;
		}
		if (data)
			this.actTime.text = "剩余时间：" + data.getRemainTime();
	}

}