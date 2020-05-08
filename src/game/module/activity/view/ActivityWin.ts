
class ActivityWin extends BaseEuiView {
	/** 关闭按钮 */
	public closeBtn: eui.Button;
	// public closeBtn0: eui.Button;
	/** tabPanel */
	public viewStack: eui.ViewStack;

	public menuScroller: eui.Scroller;
	public menuList: eui.List;
	public rightBtn: eui.Button;
	public leftBtn: eui.Button;
	public rightEff: MovieClip;
	public leftEff: MovieClip;//
	private leftRed: eui.Image;
	private rightRed: eui.Image;

	public activityPanelList: any[] = [];
	private _datas: ActivityBtnConfig[] | PActivityBtnConfig[];
	private BtnArr: ActivityBtnConfig[] | PActivityBtnConfig[];//应该显示的活动
	private dataArr: eui.ArrayCollection;

	private selectIndex: number;

	public roleSelect: RoleSelectPanel;
	private title: eui.Image;

	constructor() {
		super();
		this.skinName = "ActivityWinSkin";
		this.isTopLevel = true;
		this.selectIndex = 0;
	}

	public initUI(): void {
		super.initUI();
		this.menuList.itemRenderer = ActivityBtnRenderer;

	}

	private checkIndexByActivityId(actId: number): number {
		for (let i = 0; i < this.activityPanelList.length; i++) {
			if (this.activityPanelList[i].activityID == actId) {
				return i;
			}
		}
		return 0;
	}

	public static openCheck(...param: any[]): boolean {
		if (!OpenSystem.ins().checkSysOpen(SystemType.ACTIVITY)) {
			UserTips.ins().showTips(OpenSystem.ins().getNoOpenTips(SystemType.ACTIVITY));
			return false;
		}

		let actId = param[0];
		if (actId != undefined) {
			if (!Activity.ins().getActivityDataById(actId) || !Activity.ins().getActivityDataById(actId).isOpenActivity() ||
				!PActivity.ins().getActivityDataById(actId) || !PActivity.ins().getActivityDataById(actId).isOpenActivity()
			) {
				UserTips.ins().showTips(`|C:0xff0000&T:活动未开启`);
				return false;
			}
		}

		let sum: string[] = Object.keys(Activity.ins().activityData);
		let psum: string[] = Object.keys(PActivity.ins().activityData);
		if (!sum.length && !psum.length) {
			UserTips.ins().showTips(`|C:0xff0000&T:很遗憾,活动已经结束了`);
			return false;
		}
		//正常活动
		for (let k in Activity.ins().activityData) {
			if (!Activity.ins().activityData[k] ||
				Activity.ins().activityData[k].pageStyle ||
				Activity.ins().activityData[k].timeType == ActivityDataFactory.TimeType_Total
			) {
				continue;//此界面不处理合服活动数据
			}
			if (Activity.ins().getActivityDataById(+k).isOpenActivity()) {
				return true;
			}
		}
		//个人活动
		for (let k in PActivity.ins().activityData) {
			if (PActivity.ins().getActivityDataById(+k).isOpenActivity()) {
				return true;
			}
		}

		UserTips.ins().showTips(`|C:0xff0000&T:很遗憾,活动已经结束了`);
		return false;
	}

	private actId: number;

	public open(...param: any[]): void {

		this.actId = param[0];

		this.updateView();

		this.addTouchEvent(this.closeBtn, this.onClick);
		// this.addTouchEvent(this.closeBtn0, this.onClick);
		this.addChangeEvent(this.menuList, this.onClickMenu);
		this.addTouchEvent(this.leftBtn, this.onTouchBtn);
		this.addTouchEvent(this.rightBtn, this.onTouchBtn);
		//正常活动
		this.observe(Activity.ins().postActivityPanel, this.updatePanel);//所有活动刷新
		this.observe(Activity.ins().postActivityIsGetAwards, this.refushRedPoint);
		this.observe(Recharge.ins().postUpdateRecharge, this.refushRedPoint);
		this.observe(Recharge.ins().postRechargeTotalDay, this.refushRedPoint);
		this.observe(Recharge.ins().postMuchDayRecReward, this.refushRedPoint);
		this.observe(Recharge.ins().postUpdateRechargeEx, this.refushRedPoint);
		this.observe(Activity.ins().postChangePage, this.ChangePageCallBack);//单份活动刷新
		//个人正常活动
		this.observe(PActivity.ins().postActivityPanel, this.updatePanel);//所有活动刷新
		this.observe(PActivity.ins().postActivityIsGetAwards, this.refushRedPoint);
		this.observe(PActivity.ins().postChangePage, this.ChangePageCallBack);//单份活动刷新

		this.addChangeEvent(this.menuScroller, this.onChange);
	}

	public close(...param: any[]): void {
		for (let i: number = 0; i < this.activityPanelList.length; i++) {
			this.activityPanelList[i].close();
		}
	}

	private refushRedPoint(): void {
		this.dataArr.replaceAll(this.BtnArr);
		this.menuList.dataProvider = this.dataArr;
	}

	private updateView() {
		let index: number = 0;
		let i = 0;
		for (i = 0; i < this.viewStack.numElements; i++) {
			ObjectPool.push(this.viewStack.getElementAt(i));
		}
		this.viewStack.removeChildren();
		this.activityPanelList = [];
		this._datas = [];
		i = 0;
		//正常活动
		for (let k in Activity.ins().activityData) {
			if (!Activity.ins().activityData[k] ||
				Activity.ins().activityData[k].pageStyle ||
				Activity.ins().activityData[k].timeType == ActivityDataFactory.TimeType_Total
			) {
				console.log(Activity.ins().activityData[k])
				console.log(ActivityDataFactory.TimeType_Total)
				continue;//此界面不处理合服活动数据
			}
			if (Activity.ins().getActivityDataById(+k).isOpenActivity()) {
				let data: ActivityBtnConfig = Activity.ins().getbtnInfo(k);
				if (data) {
					if (data.activityType && data.activityType == ActivityType.Nesting) continue;//过滤嵌套活动
					if (!ErrorLog.Assert(data, "ActivityWin  data   " + k))
						this._datas.push(data);
				}

			}
		}
		//个人活动
		for (let k in PActivity.ins().activityData) {
			if (PActivity.ins().getActivityDataById(+k).isOpenActivity()) {
				let data: PActivityBtnConfig = PActivity.ins().getbtnInfo(k);
				if (data.activityType && data.activityType == ActivityType.Nesting) continue;//过滤嵌套活动
				if (!ErrorLog.Assert(data, "PActivityWin  data   " + k))
					this._datas.push(data);
			}
		}

		this._datas.sort(this.sort);
		this.BtnArr = [];
		for (let k in this._datas) {
			let id: number = this._datas[k].id;
			// if (id == 20) {
			// 	this.activityPanelList[i] = ObjectPool.pop("Recharge2Win");//Recharge3Win
			// } else {
			// 	this.activityPanelList[i] = ActivityPanel.create(id);
			// }
			let act: ActivityBaseData;
			if (this._datas[k].activityType == ActivityType.Normal) {
				act = Activity.ins().getActivityDataById(+id);
			} else if (this._datas[k].activityType == ActivityType.Personal) {
				act = PActivity.ins().getActivityDataById(+id);
			}
			if (act && act.id == id) {
				let hide: boolean = act.getHide();
				if (!hide) {
					let panel: ActivityPanel = ActivityPanel.create(id, act.activityType);
					if (!panel)
						continue;
					panel.top = 0;
					panel.left = 0;
					panel.bottom = 0;
					panel.right = 0;
					this.activityPanelList[i] = panel;
					this.viewStack.addChild(this.activityPanelList[i]);
					this.BtnArr.push(this._datas[k]);
					if (this.actId && this.actId == id) {
						index = i;
					}
					i++;
				}
			}
		}


		this.dataArr = new eui.ArrayCollection(this.BtnArr);
		this.menuList.dataProvider = this.dataArr;
		this.onChange();

		if (this.viewStack.numElements > 0) {
			// if( index )//道具获取方式指定跳转
			// 	index = this.checkIndexByActivityId(index);
			this.setOpenIndex(index);
		}
		this.viewStack.validateNow();
		this.menuList.validateNow();

		if (index >= 5) {
			let scrollH = 92 * index;
			if (scrollH > this.menuList.contentWidth - this.menuScroller.width) {
				scrollH = this.menuList.contentWidth - this.menuScroller.width;
			}
			this.menuList.scrollH = scrollH;
		}

		if (GameServer.serverOpenDay < 7) {
			this.title.source = `biaoti_kaifuhuodong`;
		} else {
			this.title.source = `biaoti_huodong`;
		}

	}

	private updatePanel(activityID: number) {
		for (let k in this.activityPanelList) {
			if (this.activityPanelList[k].activityID == activityID) {
				this.activityPanelList[k].updateData();
				break;
			}
		}
	}

	private onClick(e: egret.TouchEvent): void {
		switch (e.currentTarget) {
			case this.closeBtn:
				// case this.closeBtn0:
				ViewManager.ins().close(this);
				break;
		}
	}

	private setOpenIndex(selectedIndex: number): void {
		this.activityPanelList[selectedIndex].open();
		this.viewStack.selectedIndex = selectedIndex;
		this.menuList.selectedIndex = selectedIndex;
		if (this.activityPanelList[selectedIndex].activityType == ActivityType.Normal) {
			Activity.ins().setPalyEffListById(this.activityPanelList[selectedIndex].activityID, true);
		} else if (this.activityPanelList[selectedIndex].activityType == ActivityType.Personal) {
			PActivity.ins().setPalyEffListById(this.activityPanelList[selectedIndex].activityID, true);
		}

		this.refushRedPoint();
	}

	private onClickMenu(e: egret.TouchEvent): void {
		this.actId = 0;//不再指定打开某个活动
		if (this.selectIndex != e.currentTarget.selectedIndex) {
			SoundUtil.ins().playEffect(SoundUtil.WINDOW);
			if (this.activityPanelList[this.selectIndex])
				this.activityPanelList[this.selectIndex].close();
		}
		this.selectIndex = e.currentTarget.selectedIndex;
		if (this.activityPanelList[this.selectIndex].activityID > 10000)
			this.setOpenIndex(this.selectIndex);
		else {
			let config: ActivityConfig | PActivityConfig;
			let actType = this.activityPanelList[this.selectIndex].activityType;
			if (actType == ActivityType.Normal)
				config = GlobalConfig.ActivityConfig[this.activityPanelList[this.selectIndex].activityID];
			else if (actType == ActivityType.Personal)
				config = GlobalConfig.PActivityConfig[this.activityPanelList[this.selectIndex].activityID];
			if (config) {
				if (config.activityType == ActivityDataFactory.ACTIVITY_TYPE_3 || config.activityType == ActivityDataFactory.ACTIVITY_TYPE_9 || config.activityType == ActivityDataFactory.ACTIVITY_TYPE_19) {
					this.setOpenIndex(this.selectIndex);
				} else {
					if (actType == ActivityType.Normal)
						Activity.ins().sendChangePage(this.activityPanelList[this.selectIndex].activityID);
					else if (actType == ActivityType.Personal)
						PActivity.ins().sendChangePage(this.activityPanelList[this.selectIndex].activityID);
				}
			}
		}
	}

	private ChangePageCallBack() {
		if (this.actId)
			this.selectIndex = this.checkIndexByActivityId(this.actId);
		this.setOpenIndex(this.selectIndex);
	}

	private onChange(): void {
		if (this.menuList.scrollH < 46) {
			this.leftBtn.visible = false;
			this.rightBtn.visible = true;
		} else if (this.menuList.scrollH >= this.menuList.contentWidth - this.menuList.width - 46) {
			this.leftBtn.visible = true;
			this.rightBtn.visible = false;
		} else {
			this.leftBtn.visible = true;
			this.rightBtn.visible = true;
		}
		if (this.viewStack.numElements <= 5) {
			this.leftBtn.visible = false;
			this.rightBtn.visible = false;
		}

		this.leftRed.visible = this.leftBtn.visible;
		this.rightRed.visible = this.rightBtn.visible;

		// if (this.leftBtn.visible) {
		// 	if(this.leftEff.parent == null){
		// 		this.leftEff.playFile(RES_DIR_EFF + "jiantouzuo", -1);
		// 		this.leftBtn.parent.addChild(this.leftEff);
		// 	}
		// } else {
		// 	DisplayUtils.removeFromParent(this.leftEff);
		// }
		//
		// if (this.rightBtn.visible) {
		// 	if (this.rightEff.parent == null) {
		// 		this.rightEff.playFile(RES_DIR_EFF + "jiantouzuo", -1);
		// 		this.rightBtn.parent.addChild(this.rightEff);
		// 	}
		// } else {
		// 	DisplayUtils.removeFromParent(this.rightEff);
		// }
	}

	private onTouchBtn(e: egret.TouchEvent): void {
		let num: number = 92 * 5;
		let scrollH: number = 0;
		switch (e.target) {
			case this.leftBtn:
				scrollH = this.menuList.scrollH - num;
				scrollH = Math.round(scrollH / 92) * 92;
				if (scrollH < 0) {
					scrollH = 0;
				}
				this.menuList.scrollH = scrollH;
				break;
			case this.rightBtn:
				scrollH = this.menuList.scrollH + num;
				scrollH = Math.round(scrollH / 92) * 92;
				if (scrollH > this.menuList.contentWidth - this.menuScroller.width) {
					scrollH = this.menuList.contentWidth - this.menuScroller.width;
				}
				this.menuList.scrollH = scrollH;
				break;
		}
		this.onChange();
	}

	private sort(a: ActivityBtnConfig | PActivityBtnConfig, b: ActivityBtnConfig | PActivityBtnConfig): number {
		if (a.sort > b.sort)
			return 1;
		else if (a.sort < b.sort)
			return -1;
		else {
			if (a.activityType > b.activityType)
				return 1;
			else
				return -1;
		}

	}
}

ViewManager.ins().reg(ActivityWin, LayerManager.UI_Main);