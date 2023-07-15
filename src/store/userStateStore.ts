import create from "zustand";
import { persist } from "zustand/middleware";

const windArray = ['東','南','西','北','中','發','白']

const roundArray = ['東','南','西','北']

type SettingType = {
    base: number,
    bonus: number,
    startDealer: string,
}

type DealerStateType = {
    name: string,
    winningStreakCount: number
  }

type UserStateType = {
    name: string
    record: number[]
}

type UserStateStoreType = {
    userState: {[key:string]: UserStateType}
    setUserState:(userState: {[key:string]: UserStateType}) => void
    dealerState: DealerStateType
    setDealerState:(dealerState: DealerStateType) => void

};


/**
 * 當前牌局設定及牌局狀態
 * @param userState                各玩家狀態(名稱、輸贏、賽局紀錄)
 * @param dealerState              目前莊家狀態(莊家是誰，連幾)
 * @param setting                  牌局設定(底、台、起莊是誰)
 * @param wind                     風
 * @param round                    圈
 * @param startTime                開始賽局-時間戳記
 * @param endTime                  結束賽局-時間戳記
 * @param gameRecord               過往牌局紀錄
 */
type InitType = {
    userState: {[key:string]: UserStateType}
    dealerState: DealerStateType
    setting: SettingType
    wind: string,
    round: string,
    startTime: number | null,
    endTime: number | null,
    gameRecord: InitType[],
}

const init: InitType = {
    userState: {
        top: {
            name: '',
            record: [],
          },
        right: {
            name: '',
            record: [],
          },
        bottom: {
            name: '',
            record: [],
        },
          left: {
            name: '',
            record: [],
          },
    },
    dealerState: {
        name: "",
        winningStreakCount: 0
    },
    setting: {
        base: 30,
        bonus: 10,
        startDealer: '',
    },
    wind: '東',
    round: '東',
    startTime: null,
    endTime: null,
    gameRecord: [],
};

export const UserStateStore = create(
    persist(
        (set, get:any) => ({
            ...init,
            setUserState: (userState: {[key:string]: UserStateType}) => {
                set({
                    userState: userState
                })
            },
            setDealerState: (dealerState: DealerStateType) => {
                set({
                    dealerState: dealerState,
                    startTime: new Date().getTime(),
                })
            },
            win: (winner: string) => {
                if (winner === get().dealerState.name) {
                    set({
                        dealerState: {
                            ...get().dealerState,
                            winningStreakCount: get().dealerState.winningStreakCount + 1
                        }
                    })
                } else {
                    // 莊家輪轉的機制
                    const userArray = Object.keys(get().userState).map((key) => {
                        return get().userState[key].name
                      })
                    const currentIndex = userArray.indexOf(get().dealerState.name)
                    const nextIndex = (currentIndex - 1) < 0 ? 3 : (currentIndex - 1)
                    const nextDealer = userArray[nextIndex]
                    set({
                        dealerState: {
                            name: nextDealer,
                            winningStreakCount: 0
                        }
                    })

                    // 風跟圈的輪環機制。
                    const currentWindIndex = windArray.indexOf(get().wind)
                    const currentRoundIndex = roundArray.indexOf(get().round)

                    if (currentRoundIndex === 3) {
                        set({
                            wind: (currentWindIndex + 1) > 6 ? windArray[0] : windArray[currentWindIndex + 1],
                            round: roundArray[0],
                        })
                    } else {
                        set({
                            round: roundArray[currentRoundIndex + 1],
                        })
                    }
                }
            },
            setSetting: (setting: SettingType) => {
                set({
                    setting: setting
                })
            },
            startNewGame: () => {
                const record = { 
                    ...get(),
                    endTime: new Date().getTime()
                }

                let newRecord:InitType[] = [].concat(record.gameRecord)
                newRecord.push(record)

                set({
                    ...init,
                    gameRecord: newRecord
                })
            },
            noOneWinTheGame: () => {
                const cuttentDealerState = get().dealerState
                set({
                    dealerState: {
                        name: cuttentDealerState.name,
                        winningStreakCount: cuttentDealerState.winningStreakCount + 1
                    }
                })
            }
        }),
        {
            name: "userState-storage",
            getStorage: () => localStorage,
        }
    )
);
