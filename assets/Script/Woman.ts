// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "./Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Woman extends cc.Component {
  @property(cc.Label)
  monthLabel: cc.Label = null;
  @property(cc.Sprite)
  sp: cc.Sprite = null;
  @property(cc.SpriteFrame)
  spList: cc.SpriteFrame[] = [];

  init() {
    const level = Game.instance.getCurLevel();
    this.monthLabel.string = `${level}个月`;
    this.sp.spriteFrame = this.spList[level - 1];
  }
}
