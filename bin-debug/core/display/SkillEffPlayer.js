var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkillEffPlayer = (function () {
    function SkillEffPlayer() {
    }
    Object.defineProperty(SkillEffPlayer, "urlSkill", {
        get: function () {
            return "" + RES_DIR_SKILL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillEffPlayer, "urlSkillEff", {
        get: function () {
            return "" + RES_DIR_SKILLEFF;
        },
        enumerable: true,
        configurable: true
    });
    SkillEffPlayer.playConfigs = function (configs, param) {
        var _this = this;
        if (!this.setTimeout) {
            console.warn("SkillEffPlayer.setTimeout\u672A\u8BBE\u7F6E");
            return;
        }
        var _loop_1 = function (i) {
            var config = configs[i];
            config = SkillEffConfig.initValue(config);
            this_1.setTimeout(config.delay / param.rate, function () {
                if (config.type > 50) {
                    var typeFun_1 = _this["type" + config.type];
                    if (typeFun_1) {
                        typeFun_1.call(_this, param, config);
                    }
                    return;
                }
                var mc = ObjectPool.pop("MovieClip");
                mc.rate = config.playSpeed * (config.isRate ? param.rate : 1);
                var fileName = SkillEffPlayer.urlSkillEff + config.effectId + (config.isDir ? DirUtil.get5DirBy8Dir(param.initParam.dir) : "");
                var s = fileName + param.append;
                mc.playFile(s, config.playCount, function () {
                    _this.removeMC(mc);
                });
                mc.x = config.x;
                mc.y = config.y;
                if (param.offset) {
                    mc.x += param.offset.x;
                    mc.y += param.offset.y;
                }
                if (typeof config.rotation == "string") {
                    var str = config.rotation + "";
                    var rots = str.split("|");
                    var rotMin = +rots[0];
                    var rotMax = +rots[1] - +rots[0];
                    mc.rotation = Math.random() * rotMax + rotMin;
                }
                else {
                    mc.rotation = config.rotation;
                }
                mc.scaleX = config.scaleX * (config.isDir ? DirUtil.isScaleX(param.initParam.dir) ? -1 : 1 : 1);
                mc.scaleY = config.scaleY;
                mc.alpha = config.alpha;
                mc.anchorOffsetX = config.cx;
                mc.anchorOffsetY = config.cy;
                var layer = config.layer;
                if (config.dirPos.length && config.dirPos[param.initParam.dir]) {
                    var dirPos = config.dirPos[param.initParam.dir];
                    if (!isNaN(dirPos.x))
                        mc.x += dirPos.x;
                    if (!isNaN(dirPos.y))
                        mc.y += dirPos.y;
                    if (!isNaN(dirPos.layer))
                        layer = dirPos.layer;
                    if (!isNaN(dirPos.rotation))
                        mc.rotation += dirPos.rotation;
                    if (!isNaN(dirPos.scaleX))
                        mc.scaleX = dirPos.scaleX;
                    if (!isNaN(dirPos.scaleY))
                        mc.scaleY = dirPos.scaleY;
                    if (!isNaN(dirPos.cx))
                        mc.anchorOffsetX = dirPos.cx;
                    if (!isNaN(dirPos.cy))
                        mc.anchorOffsetY = dirPos.cy;
                }
                if (config.isRot && param.target) {
                    var targetXY = config.isInit ? {
                        x: param.initParam.tar[0].x,
                        y: param.initParam.tar[0].y
                    } : param.target[0];
                    var angle = MathUtils.getAngle(MathUtils.getRadian2(param.source.x, param.source.y, targetXY.x, targetXY.y));
                    mc.rotation = angle + mc.rotation;
                }
                param.mc = mc;
                var layerFun = _this["layer" + layer];
                if (layerFun) {
                    layerFun.call(_this, param);
                }
                var typeFun = _this["type" + config.type];
                if (typeFun) {
                    typeFun.call(_this, param, config);
                }
                if (config.tween.length > 0) {
                    var tw = egret.Tween.get(mc);
                    for (var j = 0; j < config.tween.length; j += 2) {
                        var to = config.tween[j];
                        tw.to(to, config.tween[j + 1].time);
                    }
                }
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < configs.length; i++) {
            _loop_1(i);
        }
    };
    SkillEffPlayer.play = function (skillId, source, target, hitFun, rate, offset, append) {
        var _this = this;
        if (target === void 0) { target = []; }
        if (hitFun === void 0) { hitFun = null; }
        if (rate === void 0) { rate = 1; }
        if (offset === void 0) { offset = null; }
        if (append === void 0) { append = ""; }
        var url = "" + this.urlRoot + this.urlSkill + skillId + ".json";
        RES.getResByUrl(url, function (configs) {
            if (!configs) {
                console.log("\u6CA1\u6709\u8FD9\u4E2A\u6280\u80FD -- " + skillId);
                return;
            }
            var param = new EffParam;
            param.initParam = { dir: source.dir, x: source.x, y: source.y, tar: [] };
            for (var i = 0; target && i < target.length; i++) {
                param.initParam.tar.push({ dir: target[i].dir, x: target[i].x, y: target[i].y });
            }
            param.source = source;
            param.target = target;
            param.hitFun = hitFun;
            param.rate = rate;
            param.offset = offset;
            param.append = append;
            _this.playConfigs(configs, param);
        }, this, RES.ResourceItem.TYPE_JSON);
    };
    SkillEffPlayer.type1 = function (param, config) {
        var _this = this;
        var target = param.target;
        var source = param.source;
        var mc = param.mc;
        var hitFun = param.hitFun;
        var targetXY = config.isInit ? { x: param.initParam.tar[0].x, y: param.initParam.tar[0].y } : target[0];
        var t = egret.Tween.get(mc);
        var jl = config.dis || MathUtils.getDistanceByObject(source, targetXY);
        if (config.sDis)
            jl += config.sDis;
        var angle = MathUtils.getAngle(MathUtils.getRadian2(source.x, source.y, targetXY.x, targetXY.y)) + config.range;
        if (config.sDis) {
            var p2 = MathUtils.getDirMove(angle, config.sDis);
            mc.x += p2.x;
            mc.y += p2.y;
        }
        var p1 = MathUtils.getDirMove(angle, jl, mc.x, mc.y);
        t.to({ 'x': p1.x, 'y': p1.y }, jl / config.moveSpeed * 1000).call(function () {
            _this.removeMC(mc);
            if (config.hit && hitFun)
                hitFun(config.probability);
            if (config.exEff)
                _this.play(config.exEff, source, target, hitFun, 1, null, param.append);
        });
    };
    SkillEffPlayer.removeMC = function (mc) {
        mc.destroy();
    };
    SkillEffPlayer.type96 = function (param, config) {
        if (!this.shake) {
            console.warn("SkillEffPlayer.shake\u672A\u8BBE\u7F6E");
            return;
        }
        var source = param.source;
        this.shake(source, config.range, config.time, config.playCount, config.probability);
    };
    SkillEffPlayer.type97 = function (param, config) {
        var target = param.target;
        var source = param.source;
        if (GameMap.fbType != 0)
            return;
        target[0].stopMove();
        var isMainRole = target[0] == EntityManager.ins().getNoDieRole();
        var jl = config.dis || MathUtils.getDistanceByObject(source, target[0]);
        var angle = MathUtils.getAngle(MathUtils.getRadian2(source.x, source.y, target[0].x, target[0].y));
        var p = MathUtils.getDirMove(angle, jl, target[0].x, target[0].y);
        var data = BresenhamLine.isAbleToThrough(GameMap.point2Grip(target[0].x), GameMap.point2Grip(target[0].y), GameMap.point2Grip(p.x), GameMap.point2Grip(p.y));
        if (data[0] == 0) {
            if (GameMap.point2Grip(target[0].x) == data[2] && GameMap.point2Grip(target[0].y) == data[3]) {
                p.x = target[0].x;
                p.y = target[0].y;
            }
            else {
                p.x = GameMap.grip2Point(data[2]);
                p.y = GameMap.grip2Point(data[3]);
            }
        }
        p.x = Math.max(Math.min(p.x, GameMap.MAX_WIDTH), 0);
        p.y = Math.max(Math.min(p.y, GameMap.MAX_HEIGHT), 0);
        jl = MathUtils.getDistanceByObject(target[0], p);
        if (jl <= 0)
            return;
        var t = egret.Tween.get(target[0].moveTweenObj);
        t.to({ 'x': p.x, 'y': p.y }, jl / config.moveSpeed * 1000);
    };
    SkillEffPlayer.type98 = function (param, config) {
        var target = param.target;
        var source = param.source;
        if (GameMap.fbType != 0)
            return;
        source.stopMove();
        var isMainRole = source == EntityManager.ins().getNoDieRole();
        var jl = config.dis || MathUtils.getDistanceByObject(source, target[0]);
        var angle = MathUtils.getAngle(MathUtils.getRadian2(source.x, source.y, target[0].x, target[0].y));
        var p = MathUtils.getDirMove(angle, jl, target[0].x, target[0].y);
        var data = BresenhamLine.isAbleToThrough(GameMap.point2Grip(target[0].x), GameMap.point2Grip(target[0].y), GameMap.point2Grip(p.x), GameMap.point2Grip(p.y));
        if (data[0] == 0) {
            if (GameMap.point2Grip(target[0].x) == data[2] && GameMap.point2Grip(target[0].y) == data[3]) {
                p.x = target[0].x;
                p.y = target[0].y;
            }
            else {
                p.x = GameMap.grip2Point(data[2]);
                p.y = GameMap.grip2Point(data[3]);
            }
        }
        p.x = Math.max(Math.min(p.x, GameMap.MAX_WIDTH), 0);
        p.y = Math.max(Math.min(p.y, GameMap.MAX_HEIGHT), 0);
        jl = MathUtils.getDistanceByObject(target[0], p);
        if (jl <= 0)
            return;
        p = MathUtils.getDirMove(angle, jl, source.x, source.y);
        var t = egret.Tween.get(source.moveTweenObj);
        t.to({ 'x': p.x, 'y': p.y }, jl / config.moveSpeed * 1000);
    };
    SkillEffPlayer.type99 = function (param, config) {
        var hitFun = param.hitFun;
        if (hitFun)
            hitFun(config.probability);
    };
    SkillEffPlayer.layer0 = function (param) {
        var source = param.source;
        var mc = param.mc;
        mc.x += source.x;
        mc.y += source.y;
        if (!this.bottomLayer) {
            console.warn("SkillEffPlayer.bottomLayer\u672A\u8BBE\u7F6E");
            return;
        }
        this.bottomLayer.addChild(mc);
    };
    SkillEffPlayer.layer1 = function (param) {
        var source = param.source;
        var mc = param.mc;
        source.addChildAt(mc, 0);
    };
    SkillEffPlayer.layer2 = function (param) {
        var source = param.source;
        var mc = param.mc;
        source.addChild(mc);
    };
    SkillEffPlayer.layer3 = function (param) {
        var source = param.source;
        var mc = param.mc;
        mc.x += source.x;
        mc.y += source.y;
        if (!this.topLayer) {
            console.warn("SkillEffPlayer.topLayer\u672A\u8BBE\u7F6E");
            return;
        }
        this.topLayer.addChild(mc);
    };
    SkillEffPlayer.layer4 = function (param) {
        var target = param.target;
        var mc = param.mc;
        mc.x += target[0].x;
        mc.y += target[0].y;
        if (!this.bottomLayer) {
            console.warn("SkillEffPlayer.bottomLayer\u672A\u8BBE\u7F6E");
            return;
        }
        this.bottomLayer.addChild(mc);
    };
    SkillEffPlayer.layer5 = function (param) {
        var target = param.target;
        var mc = param.mc;
        target[0].addChildAt(mc, 0);
    };
    SkillEffPlayer.layer6 = function (param) {
        var target = param.target;
        var mc = param.mc;
        target[0].addChild(mc);
    };
    SkillEffPlayer.layer7 = function (param) {
        var target = param.target;
        var mc = param.mc;
        mc.x += target[0].x;
        mc.y += target[0].y;
        if (!this.topLayer) {
            console.warn("SkillEffPlayer.topLayer\u672A\u8BBE\u7F6E");
            return;
        }
        this.topLayer.addChild(mc);
    };
    SkillEffPlayer.layer8 = function (param) {
        if (!this.fixedLayer) {
            console.warn("SkillEffPlayer.topLayer\u672A\u8BBE\u7F6E");
            return;
        }
        this.fixedLayer.addChild(param.mc);
    };
    SkillEffPlayer.urlRoot = "";
    return SkillEffPlayer;
}());
__reflect(SkillEffPlayer.prototype, "SkillEffPlayer");
var EffParam = (function () {
    function EffParam() {
        this.append = "";
        this.rate = 1;
    }
    return EffParam;
}());
__reflect(EffParam.prototype, "EffParam");
var SkillEffConfig = (function () {
    function SkillEffConfig() {
        this.type = 0;
        this.delay = 0;
        this.layer = 3;
        this.x = 0;
        this.y = 0;
        this.effectId = 0;
        this.playSpeed = 1;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.isDir = 0;
        this.moveSpeed = 100;
        this.playCount = 1;
        this.dis = 0;
        this.sDis = 0;
        this.alpha = 1;
        this.isRot = 0;
        this.hit = 0;
        this.cx = 0;
        this.cy = 0;
        this.range = 0;
        this.time = 0;
        this.isRate = 0;
        this.isInit = 0;
        this.probability = 1;
        this.exEff = "";
        this.dirPos = [];
        this.tween = [];
    }
    SkillEffConfig.initValue = function (config) {
        config["__proto__"] = this.o;
        return config;
    };
    SkillEffConfig.o = new SkillEffConfig();
    return SkillEffConfig;
}());
__reflect(SkillEffConfig.prototype, "SkillEffConfig");
//# sourceMappingURL=SkillEffPlayer.js.map