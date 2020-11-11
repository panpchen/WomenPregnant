// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { UIManager, UIType } from "../UIManager";
import PopBaseUI from "./PopBaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResultUI extends PopBaseUI {
    clickBackGame() {
        UIManager.instance.hideAll();
        UIManager.instance.showUI(UIType.MenuUI);
    }
}
