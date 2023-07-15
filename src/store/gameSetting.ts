import create from "zustand";


/**
 * 當前牌局設定及牌局狀態
 * @param userArray                玩家名稱(逆時針紀錄)
 * @param base                     一底多少
 * @param bonus                    一台多少
 * @param startDealer              起莊玩家
 * @param winningStreakCount       連莊狀態
 * @param round                    圈 (EX: 東圈東風)
 * @param step                     風 (EX: 東圈東風)
 * @param currentDealer            當前莊家
 * @param position                 四方位置
 * 
 */

interface GameSettingStoreStateType {
  userArray: string[]
  base: number,
  bonus: number,
  startDealer: string
  winningStreakCount: number
  round: 1 | 2 | 3 | 4
  step: 1 | 2 | 3 | 4
  currentDealer: string
  position: {
    top: string,
    right: string,
    bottom: string,
    left: string,
  }
}

type StartGameSettingType = {
    base:number,
    bonus: number,
    startDealer: string,
}

interface GameSettingStoreType {
  userArray: string[]
  base: number,
  bonus: number,
  startDealer: string
  winningStreakCount: number
  round: 1 | 2 | 3 | 4
  step: 1 | 2 | 3 | 4
  currentDealer: string
  setStartGameSetting: (StartGameSetting:StartGameSettingType) => void;
  initGameSetting: () => void;
  position: {
    top: string,
    right: string,
    bottom: string,
    left: string,
  }
  setPosition : (key:string, value:string) => void

}

const init: GameSettingStoreStateType = {
  userArray: [],
  base: 30,
  bonus: 10,
  startDealer: "",
  winningStreakCount: 0,
  round: 1,
  step: 1,
  currentDealer: "",
  position: {
    top: "",
    right: "",
    bottom: "",
    left: "",
  }
};

export const gameSettingStore = create<GameSettingStoreType>((set, get) => ({
  ...init,
  setStartGameSetting: (StartGameSetting) => {
    set({ 
        base: StartGameSetting.base,
        bonus: StartGameSetting.bonus,
        startDealer: StartGameSetting.startDealer,
     });
  },
  setPosition: (position:any) => {
    set({ 
        position: position
     });
  },
  initGameSetting: () => {
    set({ ...init });
  },
}));
