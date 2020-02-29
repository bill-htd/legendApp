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
var SoundEffects = (function (_super) {
    __extends(SoundEffects, _super);
    function SoundEffects() {
        return _super.call(this) || this;
    }
    SoundEffects.prototype.play = function (effectName) {
        var sound = this.getSound(effectName);
        if (sound) {
            this.playSound(sound);
        }
    };
    SoundEffects.prototype.playSound = function (sound) {
        var channel = sound.play(0, 1);
        channel.volume = this._volume;
    };
    SoundEffects.prototype.setVolume = function (volume) {
        this._volume = volume;
    };
    SoundEffects.prototype.loadedPlay = function (key) {
        var sound = RES.getRes(key);
        if (!sound) {
            return;
        }
        this.playSound(sound);
    };
    return SoundEffects;
}(BaseSound));
__reflect(SoundEffects.prototype, "SoundEffects");
//# sourceMappingURL=SoundEffects.js.map