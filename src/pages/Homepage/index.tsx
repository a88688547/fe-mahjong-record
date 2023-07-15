//@ts-nocheck
import { useState, useRef, useEffect, useMemo } from 'react'
import clsx from 'clsx'
import '../../style/animation.css'
// import { Input } from "../../component";
import { Input } from '../../component/new_input'
import { Button, Modal, Space, Toast, Divider, Picker, NumberKeyboard, Switch } from 'antd-mobile'
import { PickerView } from 'antd-mobile'
import { bonusOptions, timerOptions } from '../../constant/viewPickerOprions'
import { UserStateStore } from '../../store/userStateStore'

export const baseArray = [
  [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 },
    { label: '50', value: 50 },
  ],
]

enum Position {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

type PositionType = Position.TOP | Position.RIGHT | Position.BOTTOM | Position.LEFT | ''

/**
 * 玩家狀態
 * @param name                      玩家名稱
 * @param count                     輸贏金額
 * @param isDealer                  是否為莊家
 * @param winningStreakCount        連莊次數
 */
type UserType = {
  name: string
  count: number
  isDealer: boolean
  winningStreakCount: number
}

type DealerStateType = {
  name: string
  winningStreakCount: number
}

export const HomePage = (): JSX.Element => {
  const positionArray = [Position.TOP, Position.RIGHT, Position.BOTTOM, Position.LEFT]

  const {
    userState,
    setUserState,
    dealerState,
    setDealerState,
    win,
    setting,
    setSetting,
    wind,
    round,
    startNewGame,
    noOneWinTheGame,
  } = UserStateStore((state) => ({
    userState: state.userState,
    setUserState: state.setUserState,
    dealerState: state.dealerState,
    setDealerState: state.setDealerState,
    win: state.win,
    setting: state.setting,
    setSetting: state.setSetting,
    wind: state.wind,
    round: state.round,
    startNewGame: state.startNewGame,
    noOneWinTheGame: state.noOneWinTheGame,
  }))

  // const [dealerState, setDealerState] = useState<DealerStateType>({
  //   name: "",
  //   winningStreakCount: 0
  // })

  // const [gameRecord, setGameRecord] = useState({})

  // const userCount = useMemo(() => {
  //   const newUserCount = {}
  //   for (const [key, value] of Object.entries(gameRecord)) {
  //     newUserCount[key] = value.reduce((pre, cur, index) => {
  //       return (pre += cur)
  //     }, 0)
  //   }
  //   return newUserCount
  // }, [gameRecord])

  // useEffect(() => {
  //   console.log('gameRecord:', gameRecord)
  // }, [gameRecord])

  const initWinData = {
    bonus: 0, // 台數
    loser: '', // 輸家
    timer: 1, //  倍率
    haveTimer: false, // 有沒有加倍
  }

  const [isStartNewGameModalOpen, setIsStartNewGameModalOpen] = useState<boolean>(false)
  const [isNoOneWinModalOpen, setIsNoOneWinModalOpen] = useState<boolean>(false)

  const [currentUserName, setCurrentUserName] = useState<any>('')

  const [currentPosition, setCurrentPosition] = useState<PositionType>()

  const [winData, setWinData] = useState(initWinData)

  const onWinDataChange = (key, value) => {
    switch (key) {
      case 'bonusLoser':
        setWinData({
          ...winData,
          bonus: value[0],
          loser: value[1],
        })

        break
      case 'timer':
        console.log('value[0]:', value[0])

        setWinData({
          ...winData,
          timer: value[0],
        })
        break
      case 'haveTimer':
        if (!value) {
          setWinData({
            ...winData,
            timer: 1,
            haveTimer: value,
          })
        } else {
          setWinData({
            ...winData,
            haveTimer: value,
          })
        }

        break
      default:
        setWinData({
          ...winData,
          [key]: value,
        })
        break
    }
  }

  type userStateType = { [key: string]: UserType }

  // const [userState, setUserState] = useState<userStateType>({
  //   top: {
  //     name: '',
  //     count: 0,
  //     winningStreakCount: 0,
  //   },
  //   right: {
  //     name: '',
  //     count: 0,
  //     winningStreakCount: 0,
  //   },
  //   bottom: {
  //     name: '',
  //     count: 0,
  //     winningStreakCount: 0,
  //   },
  //   left: {
  //     name: '',
  //     count: 0,
  //     winningStreakCount: 0,
  //   },
  // })

  const userArray = useMemo(() => {
    const array = Object.keys(userState).map((key) => {
      return userState[key].name
    })
    return array
  }, [userState])

  const userOption = useMemo(() => {
    const option = Object.keys(userState).map((key) => {
      return {
        label: userState[key].name,
        value: userState[key].name,
      }
    })
    return option || []
  }, [userState])

  // 玩家名稱是否皆以輸入完成。
  const isReady = userArray.every((name) => name !== '')

  // 是否開始賽局 (停止更改牌局設定)
  // const [isGameStarting, setIsGameStarting] = useState<boolean>(false)
  const isGameStarting = dealerState.name !== ''

  const [checkIsWin, setCheckIsWin] = useState<boolean>(false)

  useEffect(() => {
    console.log('isReady:', isReady)
  }, [isReady])

  const onClickUserBox = (position: PositionType) => {
    if (currentPosition === position) {
      setCurrentPosition('')
    } else {
      setCurrentPosition(position)
      setCurrentUserName(userState[position].name)

      if (isGameStarting) {
        console.log('test')

        setCheckIsWin(false)
      } else {
        setTimeout(() => {
          // @ts-ignore
          // document.querySelector(`#${position}_label`).focus();
          // console.log(document.querySelector(`#${position}_label`));

          const input = document.querySelector(`#${position}_input`)
          input.setAttribute('autofocus', 'autofocus')
          input.focus()
        }, 300)
      }
    }
  }

  const onAddRecord = (count: number) => {
    console.log('count:', count)

    console.log('currentUserName:', currentUserName)
    console.log('winData?.loser:', winData?.loser)

    // const newRecord = { ...gameRecord }
    const newUserState = { ...userState }

    // userArray.forEach((user) => {
    //   if (currentUserName === winData?.loser) {
    //     if (user === currentUserName) {
    //       newRecord[user].push(3 * count)
    //     } else {
    //       newRecord[user].push(0 - count)
    //     }
    //   } else {
    //     if (user === currentUserName) {
    //       newRecord[user].push(count)
    //     } else if (user === winData?.loser) {
    //       newRecord[user].push(0 - count)
    //     } else {
    //       newRecord[user].push(0)
    //     }
    //   }
    // })

    positionArray.forEach((position: string) => {
      const user = newUserState[position].name
      let newRecord = [].concat(newUserState[position].record)

      if (currentUserName === winData?.loser) {
        if (user === currentUserName) {
          newRecord.push(3 * count)
        } else {
          newRecord.push(0 - count)
        }
      } else {
        if (user === currentUserName) {
          newRecord.push(count)
        } else if (user === winData?.loser) {
          newRecord.push(0 - count)
        } else {
          newRecord.push(0)
        }
      }

      newUserState[position].record = newRecord
    })

    console.log('newUserState:', newUserState)

    setCurrentPosition('')
    // setGameRecord(newRecord)
    setUserState(newUserState)
    win(currentUserName)

    setWinData(initWinData)
  }

  const totalCount = (array: number[]) => {
    const total = array.reduce((acc, cur) => {
      return (acc += cur)
    }, 0)
    return total
  }

  const ResultBox = (): JSX.Element => {
    // 是不是自摸
    const isWinThree = winData?.loser === currentUserName

    // 總金額
    let total
    // 莊的台數
    const dealerCount = 1 + dealerState?.winningStreakCount * 2
    // 顯示自摸 及 莊台的方式
    let Box

    if (isWinThree) {
      // 是'莊家'自摸
      if (currentUserName === dealerState?.name) {
        total = (setting?.base + setting?.bonus * winData?.bonus + dealerCount * setting?.bonus) * 3 * winData?.timer
        Box = () => {
          return (
            <>
              <div className="w-[1/5]">
                <div className="text-center">莊{dealerCount}台</div>
                <div className="text-center">{dealerCount * setting?.bonus}</div>
              </div>
              <div className="w-[1/5]">
                <div className="text-center">自摸</div>
                <div className="text-center">x 3</div>
              </div>
            </>
          )
        }
      } else {
        total = ((setting?.base + setting?.bonus * winData?.bonus) * 3 + dealerCount * setting?.bonus) * winData?.timer
        Box = () => {
          return (
            <>
              <div className="w-[1/5]">
                <div className="text-center">自摸</div>
                <div className="text-center">x 3</div>
              </div>
              <div className="w-[1/5]">
                <div className="text-center">莊{dealerCount}台</div>
                <div className="text-center">{dealerCount * setting?.bonus}</div>
              </div>
            </>
          )
        }
      }
    } else {
      // 有莊家台
      if (winData?.loser === dealerState?.name || currentUserName === dealerState?.name) {
        total = (setting?.base + setting?.bonus * winData?.bonus + dealerCount * setting?.bonus) * winData?.timer
        Box = () => {
          return (
            <div className="w-[1/5]">
              <div className="text-center">莊{dealerCount}台</div>
              <div className="text-center">{dealerCount * setting?.bonus}</div>
            </div>
          )
        }
      } else {
        total = (setting?.base + setting?.bonus * winData?.bonus) * winData?.timer
        Box = () => {
          return null
        }
      }
    }

    return (
      <div className="w-full flex justify-around text-base text-gray-500 border-t-[1px] border-gray-300 border-solid pt-5 mt-2">
        <div className="w-[75%] flex justify-around border-r-[1px] border-solid flex-wrap">
          <div className="w-[1/5]">
            <div className="text-center">底</div>
            <div className="text-center">{setting?.base}</div>
          </div>
          <div className="w-[1/5]">
            <div className="text-center">牌型{winData?.bonus}台</div>
            <div className="text-center">{setting?.bonus * winData?.bonus}</div>
          </div>
          {Box()}
          {/* {
            (winData?.loser === dealerState?.name || currentUserName === dealerState?.name ) &&
              <div className="w-[1/5]">
                <div className="text-center">莊{1 + (dealerState?.winningStreakCount * 2)}台</div>
                <div className="text-center">{(1 + (dealerState?.winningStreakCount * 2)) * setting?.bonus}</div>
              </div>
          } */}
          {winData?.haveTimer && (
            <div className="w-[1/5]">
              <div className="text-center">倍率</div>
              <div className="text-center">x{winData?.timer}</div>
            </div>
          )}
        </div>

        <div className="w-[25%]">
          <div className="text-center">總金額</div>
          <div className="text-center">{total}</div>
        </div>
      </div>
    )
  }

  const moneyColor = (number) => {
    let color
    if (number > 0) {
      color = '#009900'
    } else if (number < 0) {
      color = '#ff0000'
    } else {
      color = '#000'
    }
    return color
  }

  const UserBox = (position: PositionType): JSX.Element => {
    let positionStyle = ''

    const sizeStyle = () => {
      if (currentPosition === position && isGameStarting && checkIsWin) {
        return ' !w-[85vw] !h-[auto]'
      } else if (currentPosition === position && isGameStarting && !checkIsWin) {
        return ' !w-[85vw] !h-[40vw]'
      } else if (currentPosition === position) {
        return ' !w-[85vw] !h-[75vw]'
      }
    }

    switch (position) {
      case Position.TOP:
        positionStyle += `top-[20%] left-[50%] translate-x-[-50%] translate-y-[-20%] ${
          currentPosition === position && '!top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] z-10'
        }`
        break
      case Position.RIGHT:
        positionStyle += `top-[50%] left-[99%] translate-x-[-99%] translate-y-[-50%] ${
          currentPosition === position && '!top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] z-10'
        }`
        break
      case Position.BOTTOM:
        positionStyle += `top-[80%] left-[50%] translate-x-[-50%] translate-y-[-80%] ${
          currentPosition === position && '!top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] z-10'
        }`
        break
      case Position.LEFT:
        positionStyle += `top-[50%] left-[1%] translate-x-[-1%] translate-y-[-50%] ${
          currentPosition === position && '!top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] z-10'
        }`
        break
    }

    return (
      <div
        className={clsx(
          'userBox absolute rounded-3xl w-[30vw] h-[35vw] bg-[#fff] shadow-[0px_4px_12px_rgba(0,0,0,0.1)]',
          positionStyle,
          sizeStyle()
        )}
        onClick={() => {
          !currentPosition && onClickUserBox(position)
        }}
      >
        {currentPosition === position ? (
          isGameStarting ? (
            checkIsWin ? (
              <div className="py-4 px-2 w-full">
                <div className="font-bold text-3xl mb-6 text-center">胡牌！</div>
                <div className="flex justify-around w-full">
                  <div className="text-xl">牌型台數</div>
                  <div className="text-xl">放槍者</div>
                </div>
                <PickerView
                  className="mb-4"
                  columns={winOptions}
                  value={[winData?.bonus, winData?.loser]}
                  style={{ '--height': '100px', '--item-height': '2rem' }}
                  onChange={(val, extend) => {
                    onWinDataChange('bonusLoser', val)
                  }}
                />
                <div className="flex justify-center items-center">
                  <div className="text-xl mr-4">倍率</div>
                  <Switch
                    checked={winData?.haveTimer}
                    onChange={(val) => {
                      onWinDataChange('haveTimer', val)
                    }}
                  />
                </div>
                {winData?.haveTimer && (
                  <PickerView
                    className="mb-4"
                    columns={[timerOptions]}
                    value={[winData?.timer]}
                    style={{ '--height': '100px', '--item-height': '2rem' }}
                    onChange={(val, extend) => {
                      onWinDataChange('timer', val)
                    }}
                  />
                )}
                {ResultBox()}
                <div className="flex justify-center items-center">
                  <div
                    className=" px-8 py-2 text-xl rounded bg-[#dff2df] text-[green] mt-4"
                    onClick={() =>
                      onAddRecord(
                        (setting?.base + setting?.bonus * winData?.bonus + 1 * setting?.bonus) * winData?.timer
                      )
                    }
                  >
                    確定
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-4 flex flex-col justify-center items-center">
                <div className="text-3xl mb-6">請選擇</div>
                <div className="flex">
                  <div
                    className="bg-[#dff2df] px-8 py-2 text-xl rounded text-[#89ba89]"
                    onClick={(e) => {
                      setCheckIsWin(true)
                      e.stopPropagation()
                    }}
                  >
                    胡牌
                  </div>
                </div>
              </div>
            )
          ) : (
            <div
              className="p-4 flex flex-col items-center justify-between h-full"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <div className=" text-3xl text-center">請輸入玩家名稱</div>
              <div className="border-2 border-[gray] border-solid text-xl">
                <label id={`${position}_label`} className="hidden" for={`${position}_input`}></label>

                <Input.Text
                  className="h-[50px]"
                  id={`${position}_input`}
                  type="text"
                  inputmode="search"
                  value={currentUserName}
                  placeholder="玩家名稱"
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      onEnterUserNameDone(position)
                    }
                  }}
                  onChange={(e) => {
                    onCurrentUserNameChange(e.target.value)
                  }}
                />
              </div>
              <div
                className={clsx('text-gray-500 text-3xl', currentUserName !== '' && '!text-[blue]')}
                onClick={() => {
                  onEnterUserNameDone(position)
                }}
              >
                確認
              </div>
            </div>
          )
        ) : (
          <div className="h-full">
            {userState[position].name ? (
              <div className="flex flex-col h-full">
                <div className="flex justify-center items-center h-[25%]">
                  {dealerState.name === userState[position].name && (
                    <div className="bg-[orange] p-1 rounded text-[white]">
                      {dealerState.winningStreakCount === 0 ? '莊' : `連${dealerState.winningStreakCount}`}
                    </div>
                  )}
                </div>
                <div className="text-center h-[25%] text-xl text-[#919090] text-ellipsis whitespace-nowrap overflow-hidden">
                  {userState[position].name}
                </div>
                <div
                  className={clsx('flex justify-center items-center h-[50%] text-4xl')}
                  style={{
                    color: moneyColor(totalCount(userState[position]?.record) || 0),
                  }}
                >
                  {/* {userCount[userState[position]?.name] || 0} */}
                  {totalCount(userState[position]?.record) || 0}
                </div>
              </div>
            ) : (
              <div className="text-[green] text-4xl flex justify-center items-center h-full">+</div>
            )}
          </div>
        )}
      </div>
    )
  }

  const onEnterUserNameDone = (position: PositionType) => {
    console.log('currentUserName:', currentUserName)
    console.log('position:', position)

    if (!currentUserName) return
    setUserState({
      ...userState,
      [position]: {
        ...userState[position],
        name: currentUserName,
      },
    })
    console.log('setUserState:', setUserState)
    onCurrentUserNameChange('')
    setCurrentPosition('')
  }

  useEffect(() => {
    console.log('userState:', userState)
  }, [userState])

  const onCurrentUserNameChange = (value: string) => {
    setCurrentUserName(value)
  }

  // 牌局設定彈窗
  const [isSettingModalOpen, setIsSettingModalOpen] = useState<boolean>(false)

  // const [setting, setSetting] = useState({
  //   base: 30,
  //   bonus: 10,
  //   startDealer: '',
  // })

  const onSettingChange = (key, value) => {
    setSetting({
      ...setting,
      [key]: value,
    })
  }

  const [isNumberKeyboardOpen, setIsNumberKeyboardOpen] = useState<boolean>(false)

  const onNumberKeyboardInput = (key: string, value: string) => {
    setSetting((preValue) => {
      return {
        ...preValue,
        [key]: preValue[key] + value,
      }
    })
  }
  const onNumberKeyboardDelete = (key: string) => {
    setSetting((preValue) => {
      const v = preValue[key]
      console.log('v:', v.slice(0, v.length - 1))
      return {
        ...preValue,
        [key]: v.slice(0, v.length - 1),
      }
    })
  }

  // 開始牌局
  const startGame = () => {
    // 確認開始莊家是否有選擇
    if (!setting?.startDealer) {
      Toast.show({
        content: '請選擇起莊玩家',
        position: 'top',
        afterClose: () => {
          console.log('after')
        },
      })
    } else {
      // setIsGameStarting(true)
      setIsSettingModalOpen(false)
      // 設定起莊玩家
      setDealerState({
        name: setting?.startDealer,
        winningStreakCount: 0,
      })
      Toast.show({
        content: <div className="">牌局開始</div>,
        position: 'top',
        afterClose: () => {
          console.log('after')
        },
      })

      // let data = {}

      // userArray.forEach((user) => {
      //   const userName = user + ''
      //   console.log('userName:', userName)

      //   data[userName] = []
      // })

      // setGameRecord(data)
    }
  }

  const winOptions = useMemo(() => {
    const loserOption = userOption.map((option) => {
      return {
        ...option,
        label: option?.label === currentUserName ? '自摸' : option?.label,
      }
    })
    return [bonusOptions, loserOption]
  }, [userOption, currentUserName])

  useEffect(() => {
    console.log('winOptions:', winOptions)
  }, [winOptions])

  const onClickStartNewGame = () => {
    if (!isGameStarting) return
    setIsStartNewGameModalOpen(true)
  }

  const onClickNoOneWin = () => {
    setIsNoOneWinModalOpen(true)
  }

  return (
    <div className="bg-[#FFFCEC]">
      {/* Header */}
      <div className="h-[50px] flex justify-around items-center w-full">
        <div onClick={onClickStartNewGame}>{isGameStarting && '新牌局'}</div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* Content */}
      <div className="contentHeight relative">
        {/* 風和圈 */}
        <div className=" absolute top-[5%] left-[50%] translate-x-[-50%] translate-y-[-5%] flex">
          <div className="flex justify-center items-center rounded py-1 px-3 bg-[#FFECC9] text-[#B87800]">
            {`${wind}圈${round}風`}
          </div>
        </div>

        {positionArray.map((position: PositionType) => {
          // return <UserBox position={position} />;
          return UserBox(position)
        })}

        <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
          {!isGameStarting ? (
            <div
              className={clsx(
                'p-2 rounded text-lg',
                isReady ? ' bg-blue-600 text-[#fff]' : ' bg-gray-500 text-gray-900'
              )}
              onClick={() => {
                if (!isReady) {
                  Toast.show({
                    content: '請先加入所有玩家',
                    position: 'top',
                    afterClose: () => {
                      console.log('after')
                    },
                  })
                } else {
                  if (isGameStarting) return
                  setIsSettingModalOpen(true)
                }
              }}
            >
              開始牌局
            </div>
          ) : (
            <div
              className="py-1 px-3 bg-[white] rounded overflow-hidden text-base shadow-[0px_4px_12px_rgba(0,0,0,0.1)]"
              onClick={onClickNoOneWin}
            >
              流局
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="h-[50px] flex justify-around items-center">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* 點擊玩家視窗放大時，背後的遮罩 */}
      {currentPosition && (
        <div
          className={clsx('absolute top-0 left-0 w-[100vw] vh100 z-[5]')}
          onClick={() => {
            setCurrentPosition('')
            console.log('outside')
          }}
        ></div>
      )}

      {/* 牌局設定Modal */}
      <div
        className={clsx(
          'vh100 absolute top-0 left-0 w-[100vw] bg-black-1/10 z-[5] justify-center items-center',
          isSettingModalOpen ? 'flex' : 'hidden'
        )}
        onClick={() => setIsSettingModalOpen(false)}
      >
        <div className="z-10 w-[80vw] p-4 bg-[#fff] rounded-3xl" onClick={(e) => e.stopPropagation()}>
          <div className="mb-10 text-center text-2xl font-bold">牌局設定</div>
          <div className="mb-10 text-xl">
            <div className="flex mb-3">
              <div className="w-1/2 flex justify-center items-center">底</div>
              {/* <div className="w-1/2 border-1 border-solid border-gray-100">
                  <input 
                    value={setting?.base}
                    type='number'
                    onChange={(e) => {
                      onSettingChange('base', e.target.value)
                    }}
                  />
                </div> */}
              {/* <div className="w-1/2" onClick={()=>setIsNumberKeyboardOpen(true)}>{setting?.base}</div> */}
              <div className="w-1/2 flex justify-center items-center">
                <Picker
                  columns={baseArray}
                  value={[setting?.base]}
                  onConfirm={(e) => onSettingChange('base', e[0])}
                  onSelect={(val, extend) => {
                    console.log('onSelect', val, extend.items)
                  }}
                >
                  {(items, { open }) => {
                    return (
                      <Button className="!py-[5px] !px-[20px] !border-0 !bg-blue-400 !text-[#fff]" onClick={open}>
                        {items.every((item) => item === null)
                          ? '未选择'
                          : items.map((item) => item?.label ?? '未选择').join(' - ')}
                      </Button>
                    )
                  }}
                </Picker>
              </div>
            </div>
            <div className="flex mb-3">
              <div className="w-1/2 flex justify-center items-center">台</div>
              <div className="w-1/2 flex justify-center items-center">
                <Picker
                  columns={baseArray}
                  value={[setting?.bonus]}
                  onConfirm={(e) => onSettingChange('bonus', e[0])}
                  onSelect={(val, extend) => {
                    console.log('onSelect', val, extend.items)
                  }}
                >
                  {(items, { open }) => {
                    return (
                      <Button className="!py-[5px] !px-[20px] !border-0 !bg-blue-400 !text-[#fff]" onClick={open}>
                        {items.every((item) => item === null)
                          ? '未选择'
                          : items.map((item) => item?.label ?? '未选择').join(' - ')}
                      </Button>
                    )
                  }}
                </Picker>
              </div>
            </div>
            <div className="flex mb-3">
              <div className="w-1/2 text-center">起莊</div>
              <div className="w-1/2 flex justify-center items-center">
                <Picker
                  columns={[userOption] || []}
                  value={[setting?.startDealer]}
                  onConfirm={(e) => onSettingChange('startDealer', e[0])}
                  onSelect={(val, extend) => {
                    console.log('onSelect', val, extend.items)
                  }}
                >
                  {(items, { open }) => {
                    return (
                      <Button className="!py-[5px] !px-[20px] !border-0 !bg-blue-400 !text-[#fff]" onClick={open}>
                        {items.every((item) => item === null)
                          ? '未选择'
                          : items.map((item) => item?.label ?? '未选择').join(' - ')}
                      </Button>
                    )
                  }}
                </Picker>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center relative top-0">
            <div
              className="flex justify-center items-center bg-blue-600 text-[#fff] py-2 px-12 rounded text-xl"
              onClick={startGame}
            >
              開始
            </div>
          </div>
        </div>
      </div>

      {/* 確認是否開始新牌局 */}
      <div
        className={clsx(
          'vh100 absolute top-0 left-0 w-[100vw] bg-black-5/10 z-[5] justify-center items-center',
          isStartNewGameModalOpen ? 'flex' : 'hidden'
        )}
        onClick={() => setIsStartNewGameModalOpen(false)}
      >
        <div className="z-10 w-[80vw] p-4 bg-[#fff] rounded-3xl" onClick={(e) => e.stopPropagation()}>
          <div className="mb-7 text-center text-2xl font-[400]">開始新牌局？</div>

          <div className="flex justify-around items-center text-lg">
            <div className="py-1 text-[#929292]" onClick={() => setIsStartNewGameModalOpen(false)}>
              取消
            </div>
            <div
              className="py-1 font-bold text-[green]"
              onClick={() => {
                setIsStartNewGameModalOpen(false)
                startNewGame()
              }}
            >
              確定
            </div>
          </div>
        </div>
      </div>

      {/* 確認是否流局 */}
      <div
        className={clsx(
          'vh100 absolute top-0 left-0 w-[100vw] bg-black-5/10 z-[5] justify-center items-center',
          isNoOneWinModalOpen ? 'flex' : 'hidden'
        )}
        onClick={() => setIsNoOneWinModalOpen(false)}
      >
        <div className="z-10 w-[80vw] p-4 bg-[#fff] rounded-3xl" onClick={(e) => e.stopPropagation()}>
          <div className="mb-7 text-center text-2xl font-[400]">確定流局？</div>

          <div className="flex justify-around items-center text-lg">
            <div className="py-1 text-[#929292]" onClick={() => setIsNoOneWinModalOpen(false)}>
              取消
            </div>
            <div
              className="py-1 font-bold text-[green]"
              onClick={() => {
                setIsNoOneWinModalOpen(false)
                noOneWinTheGame()
              }}
            >
              確定
            </div>
          </div>
        </div>
      </div>

      <NumberKeyboard
        visible={isNumberKeyboardOpen}
        onClose={() => setIsNumberKeyboardOpen(false)}
        onInput={(e) => onNumberKeyboardInput('base', e)}
        onDelete={() => onNumberKeyboardDelete('base')}
        showCloseButton={false}
        confirmText="确定"
      />
    </div>
  )
}
