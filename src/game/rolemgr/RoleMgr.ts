/**
 * 用户角色管理
 * @author
 *
 */
class RoleMgr extends BaseSystem {
	private errorCode: string[] = ["",
		"sql错误",
		"用户没登陆",
		"游戏服务没准备好",
		"角色上一次保存数据是否出现异常",
		"客户端选择角色的常规错误",
		"角色名称重复",
		"角色不存在",
		"错误的性别",
		"随机生成的名字已经分配完",
		"客户端上传的角色阵营参数错误",
		"客户端上传的角色职业参数错误",
		"名称无效，名称中包含非法字符或长度不合法",
		"如果玩家是帮主，不能删除该角色，需要玩家退帮",
		"已经登陆到其他服务器",
		"已经超过最大可建角色数量"
	];
	public static LONGIN_ERROR_CODE: any[] = [
		"",
		"密码错误",
		"没有这个账号",
		"账号已登录，请刷新页面，最长需等待3分钟后重新登录",
		"服务器忙",
		"服务器维护中",
		"Session服务器出错，可能数据库没连接好",
		"不存在这个服务器",
		"账号已纳入防沉迷系统，是否需要进行身份证信息填写？"
	];

	private canEnter: boolean = false;
	private enterID: number = -1;
	private isFirstEnter: boolean = true;
	private lastRoleID: number = -1;//上次进入角色id

	public static ins(): RoleMgr {
		return super.ins() as RoleMgr;
	}

	public constructor() {
		super();
		this.sysId = PackageID.Login;

		this.regNetMsg(1, this.doCheckAccount);
		this.regNetMsg(2, this.postCreateRole);
		this.regNetMsg(4, this.doRoleList);
		this.regNetMsg(5, this.doEnterGame);
		this.regNetMsg(6, this.doRandom);

		this.observe(GameApp.ins().postPerLoadComplete, this.perCom);
	}

	private perCom(): void {
		this.canEnter = true;
		if (this.enterID != -1) {
			this.sendEnterGame(this.enterID);
		}
	}

	/**
	 * 连接服务器
	 */
	public connectServer(): void {
		this.startBtnEnable(false);
		GameSocket.ins().login(
			LocationProperty.openID,
			LocationProperty.password,
			LocationProperty.srvid,
			LocationProperty.serverIP,
			LocationProperty.serverPort);
	}


	/**
	 * 处理登录认证
	 * 255-1
	 * @param bytes
	 */
	private doCheckAccount(bytes: GameByteArray): void {
		let result: number = bytes.readByte();
		if (result == 0) {
			//登录成功，请求角色列表
			let bytes: GameByteArray = this.getBytes(4);
			// bytes.writeCmd(this.sysId, 4);
			this.sendToServer(bytes);
		} else {
			this.startBtnEnable(true);
			alert("Connect failed:" + RoleMgr.LONGIN_ERROR_CODE[result]);
			//被顶号
			if (result == 3) {
				window["connectError"]();
			}
		}
	}

	/**
	 * 处理角色列表
	 * 255-4
	 * @param bytes
	 */
	private doRoleList(bytes: GameByteArray): void {

		let id: number = bytes.readInt();

		LocationProperty.userID = id

		let code: number = bytes.readByte();
		//  资源加载完成，删除加载界面
		if (StageUtils.ins().getStage().$children[2]) {
			StageUtils.ins().getStage().$children[2].setProgress(100,'加载完成，进入游戏')
			StageUtils.ins().getStage().removeChild(StageUtils.ins().getStage().$children[2])
		}
		switch (code) {
			case 0:
				
				SceneManager.ins().runScene(CreateRoleScene);
				window['showGame']();
				break;
			case 1:
				let roleNum: number = bytes.readInt();
				let roleArr: SelectRoleData[] = [];
				for (let i: number = 0; i < roleNum; i++) {
					let role = new SelectRoleData(bytes);
					roleArr.push(role);
				}
				if (roleNum == 1) {
					LocationProperty.userName = roleArr[0].name;
					this.enterID = roleArr[0].id;
					this.sendEnterGame(roleArr[0].id);
				} else if (!this.isFirstEnter && this.lastRoleID != -1) {
					this.sendEnterGame(this.lastRoleID);
				} else {
					SceneManager.ins().runScene(SelectRoleScene);
					ViewManager.ins().open(SelectRoleWin, roleArr);
					window['showGame']();
				}
				break;
		}
	}


	/**
	 * 请求进入游戏
	 * 255-5
	 */
	public sendEnterGame(roleID: number): void {

		LocationProperty.roleID = roleID
		let bytes: GameByteArray = this.getBytes(5);
		// bytes.writeCmd(this.sysId, 5);
		bytes.writeInt(roleID);
		bytes.writeString(LocationProperty.pf);
		bytes.writeString(LocationProperty.pfid);
		bytes.writeString(LocationProperty.appid);
		this.sendToServer(bytes);


		this.lastRoleID = roleID;
	}


	/**
	 * 处理进入游戏
	 * 255-5
	 * @param bytes
	 */
	private doEnterGame(bytes: egret.ByteArray): void {
		let result: number = bytes.readByte();
		switch (result) {
			case 0:

				break;
			case 1:


				//  资源加载完成，删除加载界面
				if (StageUtils.ins().getStage().$children[2]) {
					StageUtils.ins().getStage().$children[2].setProgress(100,'加载完成，进入游戏')
					StageUtils.ins().getStage().removeChild(StageUtils.ins().getStage().$children[2])
				}

				//验证成功，正在登录游戏
				//成功进入游戏后，将正在连接的跨服状态关掉
				KFServerSys.ins().linkingKFState(false);
				SceneManager.ins().runScene(MainScene);
				EntityManager.ins().removeAll();
				Encounter.ins().clearEncounterModel();
				Chat.ins().initData();
				Guild.ins().initData();


				//进入打点数据 避免创角后断网重新链接，造成数据多发
				if (this.isFirstEnter) {
					this.isFirstEnter = false;
					ReportData.getIns().report("entergame", ReportData.LOAD);
				}
				break;
			default:
				alert("错误码:" + result);
				break;
		}
	}


	/**
	 * 请求创建角色
	 * 255-2
	 * @param roleName
	 * @param sex
	 * @param job
	 * @param head
	 * @param camp
	 * @param pf
	 */
	public sendCreateRole(roleName: string, sex: number, job: number, head: number, camp: number, pf: string): void {
		let bytes: GameByteArray = this.getBytes(2);
		bytes.writeString(roleName);
		bytes.writeByte(sex);
		bytes.writeByte(job);
		bytes.writeByte(head);
		bytes.writeString(LocationProperty.pf);
		bytes.writeString(LocationProperty.pfid);
		bytes.writeString(LocationProperty.appid);
		this.sendToServer(bytes);
	}

	/**
	 * 处理创建角色
	 * 255-2
	 * @param bytes
	 * @returns {boolean}是否有资源没加载完
	 */
	public postCreateRole(bytes: GameByteArray): number | boolean {
		let id: number = bytes.readInt();

		LocationProperty.userID = id;
		let result: number = bytes.readByte();
		if (result != 0) {
			this.showErrorTips(result);
			return result;
		}
		ReportData.getIns().report("createRole", ReportData.LOAD);
		ReportData.getIns().createRole(id);

		SoundUtil.ins().playEffect(SoundUtil.CREATE_ROLE);
		SoundUtil.ins().delayTime(3000);//播放完创建角色声音才播放其他声音

		if (!LocationProperty.isFirstLoad || this.canEnter) {
			this.sendEnterGame(id);
			return false;
		}
		this.enterID = id;
		return false;
	}

	/**
	 * 请求随机名字
	 * 255-6
	 * @param sex
	 */
	public sendRandomName(sex: number): void {
		let bytes: GameByteArray = this.getBytes(6);
		bytes.writeByte(sex);
		this.sendToServer(bytes);
	}

	/**
	 * 处理随即名字
	 * 255-6
	 * @param bytes
	 */
	private doRandom(bytes: GameByteArray): void {
		let result: number = bytes.readByte();
		if (result == 0) {
			let sex: number = bytes.readByte();
			let name: string = bytes.readUTF();
			this.setName(name);
		}
	}

	/**
	 * 设置开始按钮是否激活
	 * @param value
	 */
	private startBtnEnable(value: boolean): void {
		if (this.startGameView)
			this.startGameView.start.enabled = value;
	}

	private get startGameView(): StartGameView {
		return <StartGameView>ViewManager.ins().getView(StartGameView);
	}


	private setName(str: string): void {
		this.createRoleView.setName(str);
	}

	private get createRoleView(): CreateRoleView {
		return <CreateRoleView>ViewManager.ins().getView(CreateRoleView);
	}

	/**
	 * 弹出错误提示
	 */
	public showErrorTips(result: number): void {
		if (result == 0)
			return;
		UserTips.ins().showTips(this.errorCode[Math.abs(result)]);
	}


}

namespace GameSystem {
	export let roleMgr = RoleMgr.ins.bind(RoleMgr);
}