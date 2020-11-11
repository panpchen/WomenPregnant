// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "../Game";
import BaseUI from "./BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PassUI extends BaseUI {
  @property(cc.Sprite)
  babySp: cc.Sprite = null;
  @property(cc.Label)
  title: cc.Label = null;
  @property(cc.SpriteFrame)
  textures: cc.SpriteFrame[] = [];

  init() {
    const level = Game.instance.getCurLevel();
    this.title.string = `我已经${level}个月了，猜猜我多重了？`;
    this.babySp.spriteFrame = this.textures[level - 1];
    cc.tween(this.babySp.node)
      .to(0.1, { scale: 0 })
      .to(0.5, { scale: 1.2 })
      .to(0.1, { scale: 1 })
      .delay(1.5)
      .call(() => {
        this.hide();
      })
      .start();
  }
}
