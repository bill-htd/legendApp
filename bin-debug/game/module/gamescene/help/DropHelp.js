var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DropHelp = (function () {
    function DropHelp() {
    }
    DropHelp.init = function (parent, parName) {
        this.dropContainer = parent;
        this.dropNameContainer = parName;
        MessageCenter.addListener(Encounter.ins().postCreateDrop, this.addDrop, this);
    };
    DropHelp.start = function (entity) {
        this.mainEntity = entity ? entity : EntityManager.ins().getNoDieRole();
        if (GameMap.fbType == UserFb.FB_TYPE_MATERIAL || (GameMap.fbType == UserFb.FB_TYPE_GUANQIABOSS && OpenSystem.ins().checkSysOpen(SystemType.QUICKDROP))
            || ((GameMap.fbType == UserFb.FB_TYPE_PERSONAL || Encounter.ins().isEncounter() || GameMap.fbType == UserFb.FB_TYPE_TIAOZHAN) && GameServer.serverOpenDay > 0
                || GameMap.fbType == UserFb.FB_TYPE_GUARD_WEAPON || GameMap.fbType == UserFb.FB_TYPE_KF_BOSS)) {
            TimerManager.ins().doTimer(800, 1, this.delayTweenItem, this);
        }
        else {
            TimerManager.ins().doTimer(100, 0, this.findDrop, this);
        }
        this.starting = true;
    };
    DropHelp.stop = function () {
        TimerManager.ins().removeAll(this);
        this.starting = false;
        RoleAI.ins().isFindDrop = false;
    };
    DropHelp.delayTweenItem = function () {
        if (!DropHelp.getItemCount()) {
            this.checkDrop();
            return;
        }
        var entity = this.mainEntity;
        if (!entity) {
            this.clearDrop();
            return;
        }
        for (var key in this.itemPos) {
            DropHelp.tweenItem(this.itemPos[key], entity, key);
        }
    };
    DropHelp.tweenItem = function (item, role, key) {
        if (item == null) {
            DebugUtils.warn("掉落物Item=null，不能缓动！");
            return;
        }
        DisplayUtils.removeFromParent(item);
        item.setItemParent(DropHelp.dropNameContainer);
        var t = egret.Tween.get(item);
        var randowNum = Math.random() * 500 + 200;
        t.wait(randowNum).to({ x: role.x, y: role.y - 50 }, 450, egret.Ease.backIn).call(function () {
            egret.Tween.removeTweens(item);
            DisplayUtils.removeFromParent(item);
            item.destruct();
            delete DropHelp.itemPos[key];
            if (!DropHelp.getItemCount()) {
                DropHelp.checkDrop();
            }
        }, DropHelp);
    };
    DropHelp.getItemCount = function () {
        return DropHelp.itemPos ? Object.keys(DropHelp.itemPos).length : 0;
    };
    DropHelp.addDrop = function (arr) {
        var x_Grid = arr[0], y_Grid = arr[1], itemData = arr[2];
        var charItem = ObjectPool.pop("CharItem2");
        charItem.setData(itemData);
        var x_g = 0;
        var y_g = 0;
        var i = 0;
        var flag = "|";
        if (this.itemPos[x_Grid + flag + y_Grid] || !GameMap.checkWalkable(x_Grid, y_Grid)) {
            for (i = 0; i < this.orderX.length; i++) {
                x_g = x_Grid + this.orderX[i];
                y_g = y_Grid + this.orderY[i];
                if (GameMap.checkWalkable(x_g, y_g) == false)
                    continue;
                if (this.itemPos[x_g + flag + y_g] == null)
                    break;
            }
            if (i >= this.orderX.length) {
                var index = 2;
                var b = true;
                while (b) {
                    for (var i_1 = x_Grid - index; i_1 < x_Grid + index && b; i_1++) {
                        for (var j = y_Grid - index; j < y_Grid + index && b; j++) {
                            x_g = i_1;
                            y_g = j;
                            if (GameMap.checkWalkable(x_g, y_g) == false)
                                continue;
                            if (this.itemPos[x_g + flag + y_g] == null)
                                b = false;
                        }
                    }
                    index++;
                }
            }
        }
        else {
            x_g = x_Grid;
            y_g = y_Grid;
        }
        charItem.x = GameMap.grip2Point(x_g);
        charItem.y = GameMap.grip2Point(y_g);
        this.itemPos[x_g + flag + y_g] = charItem;
        GameLogic.ins().addEntity(charItem);
        charItem.addRoatEffect();
        charItem.addFloatEffect();
    };
    DropHelp.clearAllDropTween = function () {
        if (!this.itemPos)
            return;
        var value = null;
        for (var key in this.itemPos) {
            value = this.itemPos[key];
            if (value && value instanceof CharItem2) {
                value.removeRoatEffect();
            }
        }
    };
    DropHelp.clearDrop = function () {
        DropHelp.clearAllDropTween();
        this.stop();
        for (var key in this.itemPos) {
            DisplayUtils.removeFromParent(this.itemPos[key]);
            if (this.itemPos[key])
                this.itemPos[key].destruct();
            ObjectPool.push(this.itemPos[key]);
            delete this.itemPos[key];
        }
        this.curTarget = null;
        if (this.completeFunc) {
            this.completeFunc.func.call(this.completeFunc.funcThis);
            this.completeFunc = null;
        }
    };
    DropHelp.findDrop = function () {
        var role = this.mainEntity;
        if (!role)
            return;
        var mylist = EntityManager.ins().getEntityByTeam(Team.My);
        if (this.curTarget)
            if (!role || role.action == EntityAction.RUN || role.atking) {
                if (role && role.action == EntityAction.RUN) {
                    if (role.x == this.lastPoint.x && role.y == this.lastPoint.y) {
                        role.playAction(EntityAction.STAND);
                    }
                    else {
                        this.lastPoint.x = role.x;
                        this.lastPoint.y = role.y;
                    }
                }
                return;
            }
        RoleAI.ins().isFindDrop = true;
        if (mylist.length > 1) {
            var len = SubRoles.ins().subRolesLen;
            var index = 0;
            var dirs = [-1, 1];
            for (var j = 0; j < mylist.length; j++) {
                var element = mylist[j];
                if (element == role || element.action == EntityAction.RUN)
                    continue;
                var selfMaster = role;
                if (element.infoModel.masterHandle) {
                    var ms = EntityManager.ins().getEntityByHandle(element.infoModel.masterHandle);
                    if (ms) {
                        selfMaster = ms;
                    }
                }
                if (mylist.length == 2) {
                    dirs = [0];
                }
                var p = DirUtil.getGridByDir(selfMaster.dir + dirs[index] != null ? dirs[index] : 0);
                index += 1;
                GameMap.moveEntity(element, selfMaster.x + p.x, selfMaster.y + p.y);
            }
        }
        if (egret.getTimer() - this.waitTime < 200) {
            return;
        }
        var target = null;
        if (this.curTarget) {
            target = this.curTarget;
            if (MathUtils.getDistance(role.x, role.y, target.x, target.y) < GameMap.CELL_SIZE >> 1) {
                for (var i in this.itemPos) {
                    if (this.itemPos[i] == target) {
                        var dropItem = this.itemPos[i];
                        if (dropItem && dropItem instanceof CharItem2) {
                            dropItem.removeRoatEffect();
                        }
                        delete this.itemPos[i];
                        break;
                    }
                }
                egret.Tween.get(target).wait(100).call(function () {
                    if (target && target.parent) {
                        var p = target.parent.localToGlobal(target.x, target.y);
                        GameLogic.ins().postFlyItem({ item: target, gp: p });
                        DisplayUtils.removeFromParent(target);
                    }
                    target = null;
                });
                this.curTarget = null;
                this.waitTime = egret.getTimer();
                return;
            }
            else
                this.curTarget = null;
        }
        var tar = null;
        var xb = Number.MAX_VALUE;
        for (var i in this.itemPos) {
            target = this.itemPos[i];
            var dist = MathUtils.getDistance(role.x, role.y, target.x, target.y);
            if (xb > dist) {
                xb = dist;
                tar = this.itemPos[i];
            }
        }
        if (tar) {
            this.curTarget = tar;
            GameMap.moveEntity(role, tar.x, tar.y);
            return;
        }
        this.checkDrop();
        if (GameMap.fubenID == 0) {
            UserFb.ins().sendGetReward();
        }
    };
    DropHelp.checkDrop = function () {
        if (!this.getItemCount()) {
            this.stop();
            if (this.completeFunc) {
                this.completeFunc.func.call(this.completeFunc.funcThis);
                this.completeFunc = null;
            }
            return;
        }
    };
    DropHelp.addCompleteFunc = function (f, funcThis) {
        this.completeFunc = { func: f, funcThis: funcThis };
    };
    DropHelp.tempDropPoint = new egret.Point();
    DropHelp.itemPos = {};
    DropHelp.orderX = [-1, 1, -1, 0, 1, -1, 0, 1];
    DropHelp.orderY = [0, 0, 1, 1, 1, -1, -1, -1];
    DropHelp.waitTime = 0;
    DropHelp.lastPoint = new egret.Point();
    return DropHelp;
}());
__reflect(DropHelp.prototype, "DropHelp");
//# sourceMappingURL=DropHelp.js.map