var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SixteenPanel = (function (_super) {
    __extends(SixteenPanel, _super);
    function SixteenPanel() {
        var _this = _super.call(this) || this;
        _this._curGroup = 0;
        _this.MAX = 16;
        _this.PK_GROUP_0 = 0;
        _this.PK_GROUP_1 = 1;
        _this.PK_GROUP_2 = 2;
        _this.PK_GROUP_3 = 3;
        _this.hasBed = false;
        _this.lastStatus = 0;
        _this.skinName = "SixteenSkin";
        _this.left = 0;
        _this.right = 0;
        _this.top = 0;
        _this.bottom = 0;
        return _this;
    }
    SixteenPanel.prototype.childrenCreated = function () {
        this._linkGroupList = [];
        this._linkGroupList[this.PK_GROUP_0] = [];
        this._linkGroupList[this.PK_GROUP_1] = [];
        this._linkGroupList[this.PK_GROUP_2] = [];
        this._linkGroupList[this.PK_GROUP_3] = [];
        this._vsBtnList = [];
        this._vsBtnList[this.PK_GROUP_1] = [];
        this._vsBtnList[this.PK_GROUP_2] = [];
        this._vsBtnList[this.PK_GROUP_3] = [];
        this._playerLabelList = [];
        for (var i = 1; i <= this.MAX; i++) {
            var actBtn1 = this["actState_1_" + i];
            var actBtn2 = this["actState_2_" + i];
            var actBtn3 = this["actState_3_" + i];
            if (actBtn1) {
                actBtn1.name = this.PK_GROUP_1 + "_" + i;
                actBtn1.currentState = "view";
                this._vsBtnList[this.PK_GROUP_1].push(actBtn1);
                actBtn1.visible = false;
            }
            if (actBtn2) {
                actBtn2.name = this.PK_GROUP_2 + "_" + i;
                actBtn2.currentState = "view";
                this._vsBtnList[this.PK_GROUP_2].push(actBtn2);
                actBtn2.visible = false;
            }
            if (actBtn3) {
                actBtn3.name = this.PK_GROUP_3 + "_" + i;
                actBtn3.currentState = "view";
                this._vsBtnList[this.PK_GROUP_3].push(actBtn3);
                actBtn3.visible = false;
            }
            this["player" + (i - 1)].text = "---";
            this["player" + (i - 1)].name = "";
            this._playerLabelList.push(this["player" + (i - 1)]);
            var line0 = this["link_0_" + i];
            var line1 = this["link_1_" + i];
            var line2 = this["link_2_" + i];
            var line3 = this["link_3_" + i];
            if (line0)
                this._linkGroupList[this.PK_GROUP_0].push(line0);
            if (line1)
                this._linkGroupList[this.PK_GROUP_1].push(line1);
            if (line2)
                this._linkGroupList[this.PK_GROUP_2].push(line2);
            if (line3)
                this._linkGroupList[this.PK_GROUP_3].push(line3);
            this.finals.touchChildren = false;
        }
        this.groupBtnSelect0.touchEnabled = false;
        this.groupBtnSelect1.touchEnabled = false;
        this.groupBtnSelect2.touchEnabled = false;
        this.groupBtnSelect3.touchEnabled = false;
    };
    SixteenPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(PeakedSys.ins().postState, this.upCurState);
        this.observe(PeakedSys.ins().postBetInfo, this.refBetState);
        this.observe(PeakedSys.ins().postKFBetInfo, this.refBetState);
        this.observe(PeakedSys.ins().postBFInfoList, this.upSixteenData);
        this.observe(PeakedSys.ins().postKFInfoList, this.upSixteenData);
        this.observe(PeakedRedpoint.ins().postRedPoint, this.refRedpoint);
        for (var _a = 0, _b = this._vsBtnList; _a < _b.length; _a++) {
            var btns = _b[_a];
            if (btns) {
                for (var _c = 0, btns_1 = btns; _c < btns_1.length; _c++) {
                    var btn = btns_1[_c];
                    this.addTouchEvent(btn, this.onTouchBtn);
                }
            }
        }
        for (var _d = 0, _e = this._playerLabelList; _d < _e.length; _d++) {
            var player = _e[_d];
            this.addTouchEvent(player, this.onTouchPlayer);
        }
        this.addTouchEvent(this.myRecord, this.onTouch);
        this.addTouchEvent(this.myBet, this.onTouch);
        this.addTouchEvent(this.topRank, this.onTouch);
        this.addTouchEvent(this.groupBtn1, this.onChargeTab);
        this.addTouchEvent(this.groupBtn2, this.onChargeTab);
        this.addTouchEvent(this.groupBtn3, this.onChargeTab);
        this.addTouchEvent(this.groupBtn0, this.onChargeTab);
        this.addTouchEvent(this.finals, this.onTouch);
        this.addTouchEvent(this.vewChampScore, this.onTouch);
        this.clearGroupSelect();
        PeakedRedpoint.ins().postRedPoint();
        this.upCurState();
    };
    SixteenPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        for (var _a = 0, _b = this._vsBtnList; _a < _b.length; _a++) {
            var btns = _b[_a];
            if (!btns)
                continue;
            for (var _c = 0, btns_2 = btns; _c < btns_2.length; _c++) {
                var btn = btns_2[_c];
                this.removeTouchEvent(btn, this.onTouchBtn);
            }
        }
        for (var _d = 0, _e = this._playerLabelList; _d < _e.length; _d++) {
            var player = _e[_d];
            this.removeTouchEvent(player, this.onTouchPlayer);
        }
        this.removeTouchEvent(this.myRecord, this.onTouch);
        this.removeTouchEvent(this.myBet, this.onTouch);
        this.removeTouchEvent(this.topRank, this.onTouch);
        this.removeTouchEvent(this.groupBtn1, this.onChargeTab);
        this.removeTouchEvent(this.groupBtn2, this.onChargeTab);
        this.removeTouchEvent(this.groupBtn3, this.onChargeTab);
        this.removeTouchEvent(this.groupBtn0, this.onChargeTab);
        this.removeTouchEvent(this.finals, this.onTouch);
        this.removeTouchEvent(this.vewChampScore, this.onTouch);
        this.$onClose();
        this.peakEff.stop();
        DisplayUtils.removeFromParent(this.peakEff);
    };
    SixteenPanel.prototype.upCurState = function () {
        if (!this.peakEff) {
            this.peakEff = new MovieClip;
            this.peakEff.x = 83;
            this.peakEff.y = 283;
            this.peakEff.touchEnabled = false;
        }
        this.peakEff.playFile(RES_DIR_EFF + "dianfengjuesai", -1);
        this.competion.addChild(this.peakEff);
        this.peakEff.visible = true;
        if (PeakedSys.ins().isKf()) {
            if (PeakedSys.ins().isKFSixteen()) {
                this.currentState = "kf";
            }
            else {
                this.currentState = "kf_four";
                this.peakEff.stop();
                DisplayUtils.removeFromParent(this.peakEff);
            }
            this.upKf16Data();
        }
        else {
            this.currentState = "bf";
        }
        this.upStateData();
    };
    SixteenPanel.prototype.upStateData = function () {
        var time = 0;
        if (PeakedSys.ins().isKf()) {
            var state = PeakedSys.ins().kfStatus;
            if (state == KF_PeakStatus.Finals && PeakedSys.ins().kfStatusIsEnd != 0) {
                this.singleTimeInfoLabel.text = "";
                this.timerGroup.visible = false;
            }
            else {
                if (PeakedSys.ins().kfStatusIsEnd)
                    state++;
                time = PeakedHelp.kfStatusTimer[state];
                this.singleTimeInfoLabel.text = DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_13) + " " + PeakedData.STATE_KF_TYPE_CN[state];
            }
            PeakedSys.ins().sendKFInfoList();
        }
        else {
            var state = PeakedSys.ins().bfStatus;
            if (state == 0)
                return;
            if (state == BF_PeakStatus.Finals && PeakedSys.ins().bfStatusIsEnd != 0) {
                this.singleTimeInfoLabel.text = "";
                this.timerGroup.visible = false;
            }
            else {
                if (PeakedSys.ins().bfStatusIsEnd)
                    state++;
                time = PeakedHelp.bfStatusTimer[state];
                this.singleTimeInfoLabel.text = DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_13) + " " + PeakedData.STATE_TYPE_CN[state];
            }
            PeakedSys.ins().sendBFInfoList();
        }
        if (this.timerGroup.visible) {
            for (var i = 1; i <= 5; i++) {
                this["gameTime" + i + "Txt"].text = DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_14);
                time += GlobalConfig.PeakRaceBase.promInterval;
            }
        }
    };
    SixteenPanel.prototype.refBetState = function () {
        var bfStatus = PeakedSys.ins().bfStatus;
        var kfStatus = PeakedSys.ins().kfStatus;
        var isKf = PeakedSys.ins().isKf();
        if (isKf) {
            if (kfStatus != this.lastStatus)
                this.hasBed = false;
            this.lastStatus = kfStatus;
        }
        else {
            if (bfStatus != this.lastStatus)
                this.hasBed = false;
            this.lastStatus = bfStatus;
        }
        bfStatus = PeakedSys.ins().bfStatusIsEnd ? bfStatus + 1 : bfStatus;
        kfStatus = PeakedSys.ins().kfStatusIsEnd ? kfStatus + 1 : kfStatus;
        if ((PeakedSys.ins().bfStatus + 1 == BF_PeakStatus.Finals || PeakedSys.ins().kfStatus + 1 == KF_PeakStatus.Finals) && PeakedSys.ins().bfStatusIsEnd) {
            var playData = void 0;
            if (isKf) {
                playData = PeakedHelp.getKFPlayerData(4, 1, this._curGroup, PeakedSys.ins().isKFSixteen());
            }
            else {
                playData = PeakedHelp.getPlayerData(4, 1);
            }
            if (playData && PeakedHelp.checkIsBet(playData.playerList, "4")) {
                this.vewChampScore.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:\u5DF2\u4E0B\u6CE8");
            }
            else
                this.vewChampScore.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:\u51B3\u8D5B\u4E0B\u6CE8");
        }
        else
            this.vewChampScore.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:\u67E5\u770B\u6BD4\u5206");
        if (!isKf) {
            this.vewChampScore.visible = bfStatus > BF_PeakStatus.Prom4;
        }
        else
            this.vewChampScore.visible = kfStatus > KF_PeakStatus.Prom4;
        for (var type in this._vsBtnList) {
            var canBet = false;
            if (isKf) {
                if (PeakedSys.ins().isKFSixteen()) {
                    canBet = (type == this.PK_GROUP_1 + "" && kfStatus == KF_PeakStatus.Prom16)
                        || (type == this.PK_GROUP_2 + "" && kfStatus == KF_PeakStatus.Prom8)
                        || (type == this.PK_GROUP_3 + "" && kfStatus == KF_PeakStatus.Prom4);
                    for (var _i = 0, _a = this._vsBtnList[type]; _i < _a.length; _i++) {
                        var btn = _a[_i];
                        btn.visible = (type == this.PK_GROUP_1 + "" && kfStatus >= KF_PeakStatus.Prom16)
                            || (type == this.PK_GROUP_2 + "" && kfStatus >= KF_PeakStatus.Prom8)
                            || (type == this.PK_GROUP_3 + "" && kfStatus >= KF_PeakStatus.Prom4);
                    }
                }
                else {
                    canBet = (type == this.PK_GROUP_1 + "" && kfStatus == KF_PeakStatus.Prom64)
                        || (type == this.PK_GROUP_2 + "" && kfStatus == KF_PeakStatus.Prom32);
                    for (var _b = 0, _c = this._vsBtnList[type]; _b < _c.length; _b++) {
                        var btn = _c[_b];
                        btn.visible = (type == this.PK_GROUP_1 + "" && kfStatus >= KF_PeakStatus.Prom64)
                            || (type == this.PK_GROUP_2 + "" && kfStatus >= KF_PeakStatus.Prom32);
                    }
                }
            }
            else {
                canBet = (type == this.PK_GROUP_1 + "" && bfStatus == BF_PeakStatus.Prom16)
                    || (type == this.PK_GROUP_2 + "" && bfStatus == BF_PeakStatus.Prom8)
                    || (type == this.PK_GROUP_3 + "" && bfStatus == BF_PeakStatus.Prom4);
                for (var _d = 0, _e = this._vsBtnList[type]; _d < _e.length; _d++) {
                    var btn = _e[_d];
                    btn.visible = (type == this.PK_GROUP_1 + "" && bfStatus >= BF_PeakStatus.Prom16)
                        || (type == this.PK_GROUP_2 + "" && bfStatus >= BF_PeakStatus.Prom8)
                        || (type == this.PK_GROUP_3 + "" && bfStatus >= BF_PeakStatus.Prom4);
                }
            }
            if (isKf)
                canBet = canBet && PeakedSys.ins().kfStatusIsEnd != 0;
            else
                canBet = canBet && PeakedSys.ins().bfStatusIsEnd != 0;
            for (var _f = 0, _g = this._vsBtnList[type]; _f < _g.length; _f++) {
                var btn = _g[_f];
                if (!btn)
                    continue;
                if (canBet) {
                    var groupArr = btn.name.split("_");
                    var playData = void 0;
                    if (isKf) {
                        playData = PeakedHelp.getKFPlayerData(+(groupArr[0]), +(groupArr[1]), this._curGroup, PeakedSys.ins().isKFSixteen());
                    }
                    else {
                        playData = PeakedHelp.getPlayerData(+(groupArr[0]), +(groupArr[1]));
                    }
                    if (playData && PeakedHelp.checkIsBet(playData.playerList, type)) {
                        btn.currentState = "beted";
                        this.hasBed = true;
                        break;
                    }
                    else {
                        btn.currentState = "bet";
                    }
                }
                else {
                    btn.currentState = "view";
                }
            }
            if (canBet && this.hasBed) {
                for (var _h = 0, _j = this._vsBtnList[type]; _h < _j.length; _h++) {
                    var btn = _j[_h];
                    if (btn.currentState == "bet")
                        btn.currentState = "view";
                }
            }
        }
    };
    SixteenPanel.prototype.upSixteenData = function () {
        if (PeakedSys.ins().isKf()) {
            if (this.currentState == "kf_four") {
                var betGroup = PeakedHelp.findBetKFGroup();
                if (betGroup > -1)
                    this._curGroup = betGroup;
                else
                    this._curGroup = PeakedHelp.findKFGroupById(Actor.actorID);
                this._curGroup = this._curGroup < 0 ? 0 : this._curGroup;
                if (this["groupBtnSelect" + this._curGroup])
                    this["groupBtnSelect" + this._curGroup].visible = true;
            }
            this.upKf16Data();
        }
        else
            this.up16Data(PeakedSys.ins().player16List);
    };
    SixteenPanel.prototype.upKf16Data = function () {
        if (PeakedSys.ins().isKFSixteen()) {
            this.up16Data(PeakedSys.ins().kfPlayer16List);
        }
        else if (PeakedSys.ins().kfPlayer64List)
            this.up16Data(PeakedSys.ins().kfPlayer64List.slice(this._curGroup * this.MAX >> 1, this._curGroup * this.MAX + this.MAX >> 1));
    };
    SixteenPanel.prototype.up16Data = function (list) {
        this.clearPlayer();
        if (list) {
            for (var i = 0; i < this.MAX; i++) {
                if (i % 2 == 0) {
                    var data = list[i / 2];
                    if (data && data.playerList[0]) {
                        this["player" + i].text = "" + data.playerList[0].playerName;
                        this["player" + i].name = data.playerList[0].playerName + "_" + data.playerList[0].roleId;
                        if (data.playerList[0].roleId == Actor.actorID)
                            this["player" + i].textColor = ColorUtil.GREEN;
                        else
                            this["player" + i].textColor = 0xF8B141;
                    }
                    if (data && data.playerList[1]) {
                        this["player" + (i + 1)].text = "" + data.playerList[1].playerName;
                        this["player" + (i + 1)].name = data.playerList[1].playerName + "_" + data.playerList[1].roleId;
                        if (data.playerList[1].roleId == Actor.actorID)
                            this["player" + (i + 1)].textColor = ColorUtil.GREEN;
                        else
                            this["player" + (i + 1)].textColor = 0xF8B141;
                    }
                }
            }
        }
        var playerData;
        if (PeakedSys.ins().isKf()) {
            if (PeakedSys.ins().isKFSixteen()) {
                var championData = PeakedSys.ins().kfPlayer2Data;
                if (championData)
                    playerData = PeakedHelp.findPlayerDtById(championData.winId, PeakedSys.ins().kfPlayer64List);
            }
        }
        else {
            var championData = PeakedSys.ins().player2Data;
            if (championData)
                playerData = PeakedHelp.findPlayerDtById(championData.winId, PeakedSys.ins().player16List);
        }
        if (playerData) {
            this.championFace.source = "yuanhead" + playerData.job + playerData.sex;
            this.championNameLabel.text = playerData.playerName;
            this.championNameLabel.name = playerData.playerName + "_" + playerData.roleId;
            this.competion.visible = false;
            this.finals.visible = true;
        }
        else {
            this.championFace.source = "";
            this.championNameLabel.text = "";
            this.championNameLabel.name = "";
            this.competion.visible = true;
            this.finals.visible = false;
        }
        this.upLink();
        this.refBetState();
    };
    SixteenPanel.prototype.upLink = function () {
        this.clearLink();
        var sys = PeakedSys.ins();
        var lists = [];
        if (sys.isKf()) {
            if (PeakedSys.ins().isKFSixteen()) {
                lists = [sys.kfPlayer16List, sys.kfPlayer8List, sys.kfPlayer4List, [sys.kfPlayer2Data]];
            }
            else {
                lists = [sys.kfPlayer64List.slice(this._curGroup * this.MAX >> 1, this._curGroup * this.MAX + this.MAX >> 1),
                    sys.kfPlayer32List.slice(this._curGroup * this.MAX >> 2, this._curGroup * this.MAX + this.MAX >> 2),
                    sys.kfPlayer16List.slice(this._curGroup * this.MAX >> 3, this._curGroup * this.MAX + this.MAX >> 3),
                    sys.kfPlayer8List.slice(this._curGroup * this.MAX >> 4, this._curGroup * this.MAX + this.MAX >> 4)];
            }
        }
        else {
            lists = [sys.player16List, sys.player8List, sys.player4List, [sys.player2Data]];
        }
        var nx = 0;
        for (var _i = 0, lists_1 = lists; _i < lists_1.length; _i++) {
            var list = lists_1[_i];
            if (list && this._linkGroupList[nx].length > 0) {
                var ix = 0;
                for (var _a = 0, list_1 = list; _a < list_1.length; _a++) {
                    var dt = list_1[_a];
                    if (!dt)
                        continue;
                    if (PeakedHelp.findPlayerIndexById(dt.winId, dt.playerList) == 0) {
                        PeakedHelp.setImgGroupSource(this._linkGroupList[nx][ix * 2], "line_light");
                    }
                    else if (PeakedHelp.findPlayerIndexById(dt.winId, dt.playerList) == 1) {
                        PeakedHelp.setImgGroupSource(this._linkGroupList[nx][ix * 2 + 1], "line_light");
                    }
                    ix++;
                }
            }
            nx++;
        }
    };
    SixteenPanel.prototype.onTouchPlayer = function (e) {
        var label = e.target;
        if (label.name) {
            var arr = label.name.split("_");
            if (Actor.myName == arr[0]) {
                ViewManager.ins().open(RoleWin);
                return;
            }
            var info = PeakedHelp.findPlayerDtById(+(arr[1]));
            if (info)
                UserReadPlayer.ins().sendFindPlayer(arr[1], info.serverId);
            else
                UserReadPlayer.ins().sendFindPlayer(arr[1]);
        }
    };
    SixteenPanel.prototype.onTouchBtn = function (e) {
        var actbtn = e.target.parent;
        var nameStr = actbtn.name;
        var groupArr = nameStr.split("_");
        switch (actbtn.currentState) {
            case "view":
                ViewManager.ins().open(PeakViewBattleReportWin, +(groupArr[0]), +(groupArr[1]), this._curGroup);
                break;
            case "bet":
                ViewManager.ins().open(PeakBetWin, +(groupArr[0]), +(groupArr[1]), this._curGroup);
                break;
            case "beted":
                break;
        }
    };
    SixteenPanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.finals:
                var arr = this.championNameLabel.name.split("_");
                if (Actor.myName == arr[0]) {
                    ViewManager.ins().open(RoleWin);
                    return;
                }
                var info = PeakedHelp.findPlayerDtById(+(arr[1]));
                if (info)
                    UserReadPlayer.ins().sendFindPlayer(arr[1], info.serverId);
                else
                    UserReadPlayer.ins().sendFindPlayer(arr[1]);
                break;
            case this.vewChampScore:
                if (this.vewChampScore.text == "\u67E5\u770B\u6BD4\u5206")
                    ViewManager.ins().open(PeakViewBattleReportWin, 4, 1, this._curGroup);
                else if (this.vewChampScore.text == "\u51B3\u8D5B\u4E0B\u6CE8") {
                    ViewManager.ins().open(PeakBetWin, 4, 1, this._curGroup);
                }
                break;
            case this.myRecord:
                ViewManager.ins().open(PeakMyBattleRecordWin, this._curGroup);
                break;
            case this.myBet:
                ViewManager.ins().open(PeakMyBetRecordWin);
                break;
            case this.topRank:
                ViewManager.ins().open(PeakTopRankWin);
                break;
        }
    };
    SixteenPanel.prototype.onChargeTab = function (e) {
        this.clearGroupSelect();
        switch (e.target) {
            case this.groupBtn0:
                this._curGroup = 0;
                this.groupBtnSelect0.visible = true;
                this.upKf16Data();
                break;
            case this.groupBtn1:
                this._curGroup = 1;
                this.groupBtnSelect1.visible = true;
                this.upKf16Data();
                break;
            case this.groupBtn2:
                this._curGroup = 2;
                this.groupBtnSelect2.visible = true;
                this.upKf16Data();
                break;
            case this.groupBtn3:
                this._curGroup = 3;
                this.groupBtnSelect3.visible = true;
                this.upKf16Data();
                break;
        }
    };
    SixteenPanel.prototype.refRedpoint = function () {
        this.topRankRedpoint.visible = PeakedRedpoint.ins().redpoint2 > 0;
    };
    SixteenPanel.prototype.clearLink = function () {
        for (var i = 0; i < this.MAX; i++) {
            if (this._linkGroupList[this.PK_GROUP_0][i])
                PeakedHelp.setImgGroupSource(this._linkGroupList[this.PK_GROUP_0][i], "line_black");
            if (this._linkGroupList[this.PK_GROUP_1][i])
                PeakedHelp.setImgGroupSource(this._linkGroupList[this.PK_GROUP_1][i], "line_black");
            if (this._linkGroupList[this.PK_GROUP_2][i])
                PeakedHelp.setImgGroupSource(this._linkGroupList[this.PK_GROUP_2][i], "line_black");
            if (this._linkGroupList[this.PK_GROUP_3][i])
                PeakedHelp.setImgGroupSource(this._linkGroupList[this.PK_GROUP_3][i], "line_black");
        }
    };
    SixteenPanel.prototype.clearPlayer = function () {
        for (var i = 1; i <= this.MAX; i++) {
            this["player" + (i - 1)].text = "";
            this["player" + (i - 1)].name = "";
        }
    };
    SixteenPanel.prototype.clearGroupSelect = function () {
        this.groupBtnSelect0.visible = false;
        this.groupBtnSelect1.visible = false;
        this.groupBtnSelect2.visible = false;
        this.groupBtnSelect3.visible = false;
    };
    __decorate([
        callLater
    ], SixteenPanel.prototype, "upStateData", null);
    __decorate([
        callLater
    ], SixteenPanel.prototype, "upKf16Data", null);
    return SixteenPanel;
}(BaseView));
__reflect(SixteenPanel.prototype, "SixteenPanel");
//# sourceMappingURL=SixteenPanel.js.map