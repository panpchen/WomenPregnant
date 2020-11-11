// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Balance from "./Balance";
import Fruit from "./Fruit";
import FruitBottomBar from "./FruitBottomBar";
import { UIManager, UIType } from "./UIManager";
import Woman from "./Woman";

const { ccclass, property } = cc._decorator;
const TOTAL_LEVELNUM = 10;

@ccclass
export default class Game extends cc.Component {
  @property(cc.Node)
  guidePanel: cc.Node = null;
  @property(FruitBottomBar)
  fruitBottomBar: FruitBottomBar = null;
  @property(Woman)
  woman: Woman = null;
  @property(Balance)
  balance: Balance = null;

  public static instance: Game = null;
  private _curLevel: number = 0;
  private _newFruit: Fruit = null;

  onLoad() {
    Game.instance = this;
    cc.director.on("GAME_START", this._startGame.bind(this));
    cc.director.on("TAKE_IN_SLOT", this._onTakeInSlot.bind(this));
    cc.director.on("GAME_NEXTLEVEL", this._onNextLevel.bind(this));
  }

  start() {
    this.guidePanel.active = true;
  }

  _startGame() {
    this._curLevel = 1;
    this._loadLevel();
  }

  _onNextLevel() {
    if (this._curLevel == TOTAL_LEVELNUM) {
      UIManager.instance.showUI(UIType.ResultUI);
      return;
    }
    this._curLevel++;
    UIManager.instance.showUI(UIType.PassUI);
    this._loadLevel();
  }

  _loadLevel() {
    this.fruitBottomBar.init();
    this.woman.init();
    this.balance.init();
  }

  setNewFruit(fruit: Fruit) {
    this._newFruit = fruit;
  }

  getNewFruit() {
    return this._newFruit;
  }

  getCurLevel() {
    return this._curLevel;
  }

  _onTakeInSlot(fruitData) {
    this.balance.starWeight(fruitData);
  }

  followNewFruit(newFruit: Fruit, touchPos: cc.Vec2) {
    const localPos = this.worldConvertLocalPointAR(this.node, touchPos);
    newFruit.node.setPosition(localPos);
  }

  onClickEvent(event, parm) {
    if (parm == "hideGuide") {
      this.guidePanel.active = false;
    }
  }

  worldConvertLocalPointAR(node, worldPoint) {
    if (node) {
      return node.convertToNodeSpaceAR(worldPoint);
    }
    return null;
  }

  localConvertWorldPointAR(node) {
    if (node) {
      return node.convertToWorldSpaceAR(cc.v2(0, 0));
    }
    return null;
  }

  getRangeRandom(min, max) {
    return Math.random() * (max - min + 1) + min;
  }

  getRandomList(list) {
    list.sort((a, b) => {
      let v = Math.random() > 0.5 ? 1 : -1;
      return v;
    });
    return list;
  }

  countDownFormat(sec: number) {
    let nowM = Math.floor(sec % 3600 / 60);
    let nowS = Math.floor(sec % 60);
    let nowMStr = nowM.toString();
    let nowSStr = nowS.toString();
    if (nowM < 10) {
      nowMStr = `0${nowM}`;
    }
    if (nowS < 10) {
      nowSStr = `0${nowS}`;
    }
    return nowMStr + ":" + nowSStr;
  }
}
