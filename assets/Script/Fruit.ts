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
export default class Fruit extends cc.Component {
  @property(cc.SpriteAtlas)
  atlas: cc.SpriteAtlas = null;
  @property(cc.Sprite)
  sp: cc.Sprite = null;
  @property(cc.Sprite)
  spBg: cc.Sprite = null;
  @property(cc.Label)
  nameLabel: cc.Label = null;

  private _currPos: cc.Vec2;
  private _fruitData = null;

  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onMoveEvt, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this._onEndEvt, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onEndEvt, this);
  }

  init(fruitData) {
    this.setFruitData(fruitData);
    this.sp.spriteFrame = this.atlas.getSpriteFrame(`fruit_${this._fruitData.fruitId}`);
    this.spBg.spriteFrame = this.atlas.getSpriteFrame(`bg_${this._fruitData.fruitId % 4}`);
    this.nameLabel.string = this._fruitData.fruitName;
  }

  getFruitId() {
    return this._fruitData.fruitId;
  }

  setFruitData(data) {
    this._fruitData = data;
  }

  _onMoveEvt(evt: cc.Event.EventTouch) {
    this._currPos = evt.getLocation();
    const newFruit: Fruit = Game.instance.getNewFruit();
    if (!newFruit) {
      const startPos = evt.getStartLocation();
      const deltaY = Math.abs(this._currPos.y - startPos.y);
      if (deltaY > 150) {
        Game.instance.fruitBottomBar.setScrollViewEnable(false);
        this._addNewFruit();
      }
    } else {
      newFruit.node.active = true;
      Game.instance.followNewFruit(newFruit, this._currPos);
    }
  }

  _addNewFruit() {
    if (Game.instance.node) {
      const newFruit = cc.instantiate(this.node).getComponent(Fruit);
      newFruit.setFruitData(this._fruitData);
      Game.instance.setNewFruit(newFruit);
      newFruit.node.parent = Game.instance.node;
      newFruit.node.active = false;
    }
  }

  _onEndEvt(evt: cc.Event.EventTouch) {
    let newFruit = Game.instance.getNewFruit();
    if (newFruit) {
      const target = Game.instance.balance.targetPoint;
      const curPos = Game.instance.worldConvertLocalPointAR(target, this._currPos);
      const sizeTarget = target.getContentSize();
      curPos.x = Math.abs(curPos.x);
      curPos.y = Math.abs(curPos.y);

      if (this._isInSolt(curPos.x, sizeTarget.width - 100, curPos.y, sizeTarget.height - 100)) {
        // const worldPos = Game.instance.localConvertWorldPointAR(target);
        // const localPos = Game.instance.worldConvertLocalPointAR(Game.instance.node, worldPos);
        // newFruit.node.setPosition(localPos);
        cc.director.emit("TAKE_IN_SLOT", this._fruitData);
        this.node.active = false;
      }
      newFruit.node.active = false;
      newFruit.destroy();
      newFruit = null;
      Game.instance.setNewFruit(null);

      Game.instance.fruitBottomBar.setScrollViewEnable(true);
    }
  }

  _isInSolt(curPosX, tartPosX, curPosY, tartPosY) {
    return curPosX < tartPosX && curPosY < tartPosY;
  }
}
