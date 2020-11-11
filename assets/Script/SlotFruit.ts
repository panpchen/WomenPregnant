// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class SlotFruit extends cc.Component {
  @property(cc.SpriteAtlas)
  atlas: cc.SpriteAtlas = null;
  @property(cc.Label)
  nameLabel: cc.Label = null;
  @property(cc.Sprite)
  sp: cc.Sprite = null;
  @property(cc.Sprite)
  bg: cc.Sprite = null;

  init(fruitData) {
    this.sp.spriteFrame = this.atlas.getSpriteFrame(`fruit_${fruitData.fruitId}`);
    this.bg.spriteFrame = this.atlas.getSpriteFrame(`bg_${fruitData.fruitId % 4}`);
    this.nameLabel.string = fruitData.fruitName;
  }

  clear() {
    this.sp.spriteFrame = this.atlas.getSpriteFrame("fruit_0");
    this.bg.spriteFrame = this.atlas.getSpriteFrame("bg_0");
    this.nameLabel.string = "";
  }
}