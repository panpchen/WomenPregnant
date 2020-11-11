// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { LevelConfig } from "./Config/LevelConfig";
import Game from "./Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BABY extends cc.Component {
    @property(cc.SpriteAtlas)
    atlas: cc.SpriteAtlas = null;
    @property(cc.Sprite)
    sp: cc.Sprite = null;

    init() {
        const levelData = LevelConfig.getConfigByLevel(Game.instance.getCurLevel());
        this.sp.spriteFrame = this.atlas.getSpriteFrame(`baby_${levelData.babyID}`);
    }
}
