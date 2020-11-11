// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
enum FRUIT_ID {
  ZHIMA,
  PUTAO,
  LIZI,
  XIHONGSHI,
  XIYOU,
  QIEZI,
  BAOCAI,
  HAMIGUA,
  COCO,
  XIGUA
}

enum BABY_ID {
  ONE_AGE,
  TWO_AGE,
  THREE_AGE,
  FOUR_AGE,
  FIVE_AGE,
  SIX_AGE,
  SEVEN_AGE,
  EIGHT_AGE,
  NINE_AGE,
  TEN_AGE
}

const FruitList = [
  FRUIT_ID.ZHIMA,
  FRUIT_ID.PUTAO,
  FRUIT_ID.LIZI,
  FRUIT_ID.XIHONGSHI,
  FRUIT_ID.XIYOU,
  FRUIT_ID.QIEZI,
  FRUIT_ID.BAOCAI,
  FRUIT_ID.HAMIGUA,
  FRUIT_ID.COCO,
  FRUIT_ID.XIGUA
]

const LevelList = [
  {
    id: 0,
    fruitData: {
      fruitId: FRUIT_ID.ZHIMA,
      fruitName: "芝麻",
      angle: 3
    },
    babyID: BABY_ID.ONE_AGE,
    angle: -3
  },
  {
    id: 1,
    fruitData: {
      fruitName: "葡萄",
      fruitId: FRUIT_ID.PUTAO,
      angle: 6
    },
    babyID: BABY_ID.TWO_AGE,
    angle: -6
  },
  {
    id: 2,
    fruitData: {
      fruitName: "李子",
      fruitId: FRUIT_ID.LIZI,
      angle: 9
    },
    babyID: BABY_ID.THREE_AGE,
    angle: -9
  },
  {
    id: 3,
    fruitData: {
      fruitName: "西红柿",
      fruitId: FRUIT_ID.XIHONGSHI,
      angle: 12
    },
    babyID: BABY_ID.FOUR_AGE,
    angle: -12
  },
  {
    id: 4,
    fruitData: {
      fruitName: "西柚",
      fruitId: FRUIT_ID.XIYOU,
      angle: 15
    },
    babyID: BABY_ID.FIVE_AGE,
    angle: -15
  },
  {
    id: 5,
    fruitData: {
      fruitName: "茄子",
      fruitId: FRUIT_ID.QIEZI,
      angle: 18
    },
    babyID: BABY_ID.SIX_AGE,
    angle: -18
  },
  {
    id: 6,
    fruitData: {
      fruitName: "卷心菜",
      fruitId: FRUIT_ID.BAOCAI,
      angle: 21
    },
    babyID: BABY_ID.SEVEN_AGE,
    angle: -21
  },
  {
    id: 7,
    fruitData: {
      fruitName: "哈密瓜",
      fruitId: FRUIT_ID.HAMIGUA,
      angle: 24
    },
    babyID: BABY_ID.EIGHT_AGE,
    angle: -24
  },
  {
    id: 8,
    fruitData: {
      fruitName: "椰子",
      fruitId: FRUIT_ID.COCO,
      angle: 27
    },
    babyID: BABY_ID.NINE_AGE,
    angle: -27
  },
  {
    id: 9,
    fruitData: {
      fruitName: "西瓜",
      fruitId: FRUIT_ID.XIGUA,
      angle: 30
    },
    babyID: BABY_ID.TEN_AGE,
    angle: -30
  },
]

export class LevelConfig {
  static getConfigByLevel(level) {
    return LevelList[level - 1];
  }

  static getConfigList() {
    return LevelList;
  }

  static getFruitDataByFruitId(fruitId) {
    for (let i = 0, len = LevelList.length; i < len; i++) {
      const fruitData = LevelList[i].fruitData;
      if (fruitData.fruitId == fruitId) {
        return fruitData;
      }
    }
    return null;
  }

  static getFruitList() {
    return FruitList;
  }
}

