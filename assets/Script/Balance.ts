// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BABY from "./Baby";
import { LevelConfig } from "./Config/LevelConfig";
import Game from "./Game";
import SlotFruit from "./SlotFruit";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Balance extends cc.Component {
  @property(BABY)
  baby: BABY = null;
  @property(cc.Node)
  targetPoint: cc.Node = null;
  @property(cc.Node)
  rotatePoint: cc.Node = null;
  @property(cc.Node)
  plates: cc.Node[] = [];
  @property(cc.Node)
  slotNodes: cc.Node[] = [];
  @property(SlotFruit)
  slotFruit: SlotFruit = null;

  private _initAngle: number = 0;

  init() {
    this.baby.init();
    const curLevelData = LevelConfig.getConfigByLevel(Game.instance.getCurLevel());
    this._initAngle = curLevelData.angle;
    this.rotatePoint.angle = this._initAngle;
  }

  starWeight(fruitData) {
    this._updateData(fruitData);
    this._startRotate(fruitData);
  }

  update() {
    this.plates.forEach(plate => {
      plate.angle = this.rotatePoint.angle * -1;
    });
  }

  _updateData(fruitData) {
    this.slotNodes[0].active = false;
    this.slotNodes[1].active = true;
    this.slotFruit.init(fruitData);
  }

  _startRotate(fruitData) {
    cc.tween(this.rotatePoint)
      .by(0.5, { angle: fruitData.angle })
      .delay(0.6)
      .call(() => {
        this._clear(() => {
          if (Math.abs(this._initAngle) == Math.abs(fruitData.angle)) {
            cc.director.emit("GAME_NEXTLEVEL");
          }
        });
      })
      .start();
  }

  _clear(callback) {
    cc.tween(this.rotatePoint)
      .to(0.2, { angle: this._initAngle })
      .call(() => {
        this.slotNodes[0].active = true;
        this.slotNodes[1].active = false;
        this.slotFruit.clear();
        callback && callback();
      })
      .start();
  }
}
