class OSATarget2Panel extends ActivityPanel {

	public type2PanelList: any[] = [];
	public cruPanel: any;


	constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();

		// this.initPanelList();
	}

	public open(...param: any[]): void {
		if (this.cruPanel) {
			this.cruPanel.close();
			DisplayUtils.removeFromParent(this.cruPanel);
		}

		// this.initPanelList();
		let config:ActivityType2Config[]|PActivity2Config[];
		if( this.activityType == ActivityType.Normal ) {
			config = GlobalConfig.ActivityType2Config[this.activityID];
		}else if( this.activityType == ActivityType.Personal ){
			config = GlobalConfig.PActivity2Config[this.activityID];
		}

		if (!this.type2PanelList[this.activityID + ""]) {
			let panel: ActivityPanel = ObjectPool.pop(`OSATarget2Panel${config[1].showType}`);
			panel.top = 0;
			panel.bottom = 0;
			panel.left = 0;
			panel.right = 0;
			panel.activityID = this.activityID;
			panel.activityType = this.activityType;
			this.type2PanelList[this.activityID + ""] = panel;
		}
		// switch (config[1].showType) {
		// 	case 0:
		// 		let config: ActivityConfig = GlobalConfig.ActivityConfig[this.activityID];
		// 		if (!this.type2PanelList[this.activityID + ""]) {
		// 			this.type2PanelList[this.activityID + ""] = new OSATarget2Panel2();
		// 			this.type2PanelList[this.activityID + ""].activityID = this.activityID;
		// 		}
		// 		break;
		// 	case 1:
		// 		if (!this.type2PanelList[this.activityID + ""]) {
		// 			this.type2PanelList[this.activityID + ""] = new Activity2Panel1();
		// 			this.type2PanelList[this.activityID + ""].activityID = this.activityID;
		// 		}
		// 		break;
		// 	default:
		// 		break;
		// }
		this.cruPanel = this.type2PanelList[this.activityID + ""];
		this.cruPanel.open();
		this.addChild(this.cruPanel);
	}

	public close(...param: any[]): void {
		if(this.cruPanel) this.cruPanel.close();
	}
	private initPanelList(){
		let config: ActivityConfig|PActivityConfig;
		if( this.activityType == ActivityType.Normal ) {
			config = GlobalConfig.ActivityConfig[this.activityID];
		}else if( this.activityType == ActivityType.Personal ){
			config = GlobalConfig.PActivityConfig[this.activityID];
		}

		if (!this.type2PanelList[this.activityID + ""]) {
			this.type2PanelList[this.activityID + ""] = new OSATarget2Panel2();
			this.type2PanelList[this.activityID + ""].activityID = this.activityID;
			this.type2PanelList[this.activityID + ""].actType = this.activityType;
		}
	}
	public updateData() {
		this.cruPanel.updateData();
	}
}
