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
var SoundBg = (function (_super) {
    __extends(SoundBg, _super);
    function SoundBg() {
        var _this = _super.call(this) || this;
        _this._currBg = "";
        return _this;
    }
    SoundBg.prototype.stop = function () {
        if (this._currSoundChannel) {
            this.removeSoundChannel(this._currSoundChannel);
        }
        this._currSoundChannel = null;
        this._currSound = null;
        this._currBg = "";
    };
    SoundBg.prototype.play = function (effectName) {
        if (this._currBg == effectName)
            return;
        this.stop();
        this._currBg = effectName;
        var sound = this.getSound(effectName);
        if (sound) {
            this.playSound(sound);
        }
    };
    SoundBg.prototype.touchPlay = function () {
        if (this._currSoundChannel && this._currSound) {
            var pos = this._currSoundChannel.position;
            this.removeSoundChannel(this._currSoundChannel);
            this._currSoundChannel = this._currSound.play(pos, 1);
            this.addSoundChannel(this._currSoundChannel);
        }
    };
    SoundBg.prototype.playSound = function (sound) {
        this._currSound = sound;
        this._currSoundChannel = this._currSound.play(0, 1);
        this.addSoundChannel(this._currSoundChannel);
    };
    SoundBg.prototype.onSoundComplete = function () {
        if (this._currSoundChannel)
            this.removeSoundChannel(this._currSoundChannel);
        this.playSound(this._currSound);
    };
    SoundBg.prototype.addSoundChannel = function (channel) {
        channel.volume = this._volume;
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    };
    SoundBg.prototype.removeSoundChannel = function (channel) {
        channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        channel.stop();
    };
    SoundBg.prototype.setVolume = function (volume) {
        this._volume = volume;
        if (this._currSoundChannel) {
            this._currSoundChannel.volume = this._volume;
        }
    };
    SoundBg.prototype.loadedPlay = function (key) {
        if (this._currBg == key) {
            var sound = RES.getRes(key);
            if (!sound) {
                return;
            }
            this.playSound(sound);
        }
    };
    SoundBg.prototype.checkCanClear = function (key) {
        return this._currBg != key;
    };
    return SoundBg;
}(BaseSound));
__reflect(SoundBg.prototype, "SoundBg");
//# sourceMappingURL=SoundBg.js.map