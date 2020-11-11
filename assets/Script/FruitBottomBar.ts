// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { LevelConfig } from "./Config/LevelConfig";
import Fruit from "./Fruit";
import Game from "./Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FruitBottomBar extends cc.Component {
  @property(cc.Prefab)
  fruitPrefab: cc.Prefab = null;
  @property(cc.ScrollView)
  scrollView: cc.ScrollView = null;
  @property(cc.Node)
  leftArrow: cc.Node = null;
  @property(cc.Node)
  rightArrow: cc.Node = null;

  private _fruitList: Fruit[] = [];

  onLoad() {
    // this.scrollView.node.on("scrolling", this._onScrolling, this);
    // cc.tween(this.leftArrow)
    //   .repeatForever(
    //     cc.tween()
    //       .by(0.2, { x: -10 })
    //       .by(0.2, { x: 10 })
    //   ).start();

    // cc.tween(this.rightArrow)
    //   .repeatForever(
    //     cc.tween()
    //       .by(0.2, { x: 10 })
    //       .by(0.2, { x: -10 })
    //   ).start();
  }

  init() {
    this.scrollView.scrollToLeft();
    if (this._fruitList.length > 0) {
      const newList = Game.instance.getRandomList(LevelConfig.getFruitList());
      this._fruitList.forEach((fruit, index) => {
        const fruitData = LevelConfig.getFruitDataByFruitId(newList[index]);
        fruit.init(fruitData)
        fruit.node.active = true;
      });
    } else {
      const newList = Game.instance.getRandomList(LevelConfig.getFruitList());
      for (let i = 0, len = newList.length; i < len; i++) {
        const fruit = cc.instantiate(this.fruitPrefab).getComponent(Fruit);
        const fruitId = newList[i];
        const fruitData = LevelConfig.getFruitDataByFruitId(fruitId);
        fruit.node.parent = this.scrollView.content;
        fruit.init(fruitData);
        this._fruitList.push(fruit);
      }
    }
  }

  setScrollViewEnable(isEnable) {
    this.scrollView.enabled = isEnable;
  }

  takeFruitToBar(showFruit: Fruit) {
    for (let i = 0; i < this._fruitList.length; i++) {
      const fruit = this._fruitList[i];
      if (fruit.getFruitId() == showFruit.getFruitId()) {
        fruit.node.active = true;
        break;
      }
    }
  }

  // _onScrolling() {
  //   let x = this.scrollView.content.x;
  //   this.leftArrow.active = x < 0;
  //   this.rightArrow.active = x > -this.scrollView.getMaxScrollOffset().x;
  // }
}
