import { useState, useRef, useEffect, useMemo } from "react";
import clsx from "clsx";
import "../../style/animation.css";
// import { Input } from "../../component";
import { Input } from "../../component/new_input";


enum Position {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
}

type PositionType =
  | Position.TOP
  | Position.RIGHT
  | Position.BOTTOM
  | Position.LEFT
  | "";

/**
 * 玩家狀態
 * @param name                      玩家名稱
 * @param count                     輸贏金額
 * @param isDealer                  是否為莊家
 * @param winningStreakCount        連莊次數
 */
type UserType = {
  name: string;
  count: number;
  isDealer: boolean;
  winningStreakCount: number;
};

export const HomePage = (): JSX.Element => {
  const positionArray = [
    Position.TOP,
    Position.RIGHT,
    Position.BOTTOM,
    Position.LEFT,
  ];

  const [currentUserName, setCurrentUserName] = useState<any>('');

  const [currentPosition, setCurrentPosition] = useState<PositionType>();
  type userName = { [key: string]: string };

  type userStateType = { [key: string]: UserType };

  const [userState, setUserState] = useState<userStateType>({
    top: {
      name: "",
      count: 0,
      isDealer: false,
      winningStreakCount: 0,
    },
    right: {
      name: "",
      count: 0,
      isDealer: false,
      winningStreakCount: 0,
    },
    bottom: {
      name: "",
      count: 0,
      isDealer: false,
      winningStreakCount: 0,
    },
    left: {
      name: "",
      count: 0,
      isDealer: false,
      winningStreakCount: 0,
    },
  });

  const userArray = useMemo(() => {
    const array  = Object.keys(userState).map((key) =>  
    {  
      return userState[key].name;  
    });  
    console.log("array:", array);
    return array
  }, [userState]);

  const isReady = !userArray.find((name) => name === "")

  const onClickUserBox = (position: PositionType) => {
    if (currentPosition === position) {
      setCurrentPosition("");
    } else {
      setTimeout(() => {
        // @ts-ignore
        document.querySelector(`#${position}_input`).focus();
        console.log(document.querySelector(`#${position}_input`));
      }, 100);
      setCurrentPosition(position);

      setCurrentUserName(userState[position].name)
    }
  };

  type UserBoxProps = {
    position: PositionType;
  };
  // const UserBox = ({ position }: UserBoxProps): JSX.Element => {
    const UserBox = (position:PositionType ): JSX.Element => {
    let positionStyle = ''

    switch (position) {
      case Position.TOP:
        positionStyle += `top-[10%] left-[50%] translate-x-[-50%] translate-y-[-10%] ${
          currentPosition === position &&
          "!top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] z-10 !w-[75vw] !h-[75vw]"
        }`;
        break;
      case Position.RIGHT:
        positionStyle += `top-[50%] left-[99%] translate-x-[-99%] translate-y-[-50%] ${
          currentPosition === position &&
          "!top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] z-10 !w-[75vw] !h-[75vw]"
        }`;
        break;
      case Position.BOTTOM:
        positionStyle += `top-[90%] left-[50%] translate-x-[-50%] translate-y-[-90%] ${
          currentPosition === position &&
          "!top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] z-10 !w-[75vw] !h-[75vw]"
        }`;
        break;
      case Position.LEFT:
        positionStyle += `top-[50%] left-[1%] translate-x-[-1%] translate-y-[-50%] ${
          currentPosition === position &&
          "!top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] z-10 !w-[75vw] !h-[75vw]"
        }`;
        break;
    }

    return (
      <div
        className={clsx(
          "userBox absolute rounded-3xl w-[30vw] h-[35vw] bg-[#fff] shadow-[0px_4px_12px_rgba(0,0,0,0.1)]",
          positionStyle
          // "userBox absolute top-[25%] left-[50%] translate-x-[-50%] translate-y-[-25%] rounded-3xl",
          // "w-[30vw] h-[35vw] border-2 border-solid border-[blue] rounded",
          // currentPosition === Position.TOP &&
          //   "!top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] z-10 !w-[75vw] !h-[75vw]"
        )}
        onClick={() => {
          !currentPosition && onClickUserBox(position);
        }}
      >
        {currentPosition === position ? (
          <div
            className="p-4 flex flex-col items-center justify-between h-full"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className=" text-3xl text-center">請輸入玩家名稱</div>
            <div className="border-2 border-[gray] border-solid text-xl">

                <Input.Text
                    className="h-[50px]"
                    id={`${position}_input`}
                    type="text"
                    value={currentUserName}
                    placeholder="玩家名稱"
                    onChange={(e) => {
                        onCurrentUserNameChange(e.target.value);
                    }}
                />
            </div>
            <div
              className={clsx(
                "text-gray-500 text-3xl",
                currentUserName !== "" && "!text-[blue]"
              )}
              onClick={() => {
                onEnterUserNameDone(position);
              }}
            >
              確認
            </div>
          </div>
        ) : (
          <div className="h-full">
            {userState[position].name ? (
              <div className="flex flex-col h-full">
                <div className="flex justify-center items-center h-[25%]">
                  連{userState[position].winningStreakCount}
                </div>
                <div className="flex justify-center items-center h-[25%] text-xl">
                  {userState[position].name}
                </div>
                <div className="flex justify-center items-center h-[50%] text-4xl">
                  {userState[position].count}
                </div>
              </div>
            ) : (
              <div className="text-[green] text-4xl flex justify-center items-center h-full">+</div>
            )}
          </div>
        )}
      </div>
    );
  };

  const focusInput = (position: PositionType) => {
    // @ts-ignore
    document.querySelector(`.${position}_input`).focus();
  };

  const onEnterUserNameDone = (position: PositionType) => {
    console.log('currentUserName:', currentUserName);
    console.log('position:', position);
    
    if (!currentUserName) return;
    setUserState({
      ...userState,
      [position]: {
        ...userState[position],
        name: currentUserName,
      },
    });
    onCurrentUserNameChange("");
    setCurrentPosition("");
  };

  useEffect(() => {
    console.log("userState:", userState);
  }, [userState]);

  const onCurrentUserNameChange = (value: string) => {
    setCurrentUserName(value)
  }

  return (
    <div className="bg-[#FFFCEC]">
      <div className="h-[50px] border-2 border-solid border-[green]">
        header
      </div>

      <div className="contentHeight relative">
        {positionArray.map((position: PositionType) => {
          // return <UserBox position={position} />;
          return UserBox(position);
        })}
        {/* <div
          className={clsx(
            "userBox absolute top-[25%] left-[50%] translate-x-[-50%] translate-y-[-25%] rounded-3xl",
            "w-[30vw] h-[35vw] border-2 border-solid border-[blue] rounded",
            currentPosition === Position.TOP &&
              "!top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] z-10 !w-[75vw] !h-[75vw]"
          )}
          onClick={() => {
            !currentPosition && onClickUserBox(Position.TOP);
          }}
        >
          {currentPosition === Position.TOP ? (
            <div
              className=""
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className=" text-3xl text-center">請輸入玩家名稱</div>
              <input

                id="top_input"
                ref={topInput}
                type="text"
                value={currentUserName}
                placeholder="玩家名稱"
                onChange={(e) => {
                    setCurrentUserName(e.target.value);
                }}
              />
              <div 
                className={clsx('text-gray-500' ,currentUserName !== "" && '!text-[blue]' )}
                onClick={()=>{onEnterUserNameDone(Position.TOP)}}
                >
                    確認
                    </div>
            </div>
          ) : (
            <div className="h-full">
                {
                    userState[Position.TOP].name 
                    ?
                    <div className="flex flex-col h-full">
                        <div className="flex justify-center items-center h-[25%]">連{ userState[Position.TOP].winningStreakCount }</div>
                        <div className="flex justify-center items-center h-[25%] text-xl">{ userState[Position.TOP].name }</div>
                        <div className="flex justify-center items-center h-[50%] text-4xl">{ userState[Position.TOP].count }</div>

                    </div>
                    :
                    <div className="text-[green] text-4xl">+</div>
                }
            </div>
          )}
        </div> */}

        {/* <div className="flex flex-col">
                    <div className="flex justify-center items-center">
                        <div className={clsx(
                            "w-[50px] h-[50px] border-2 border-solid border-[blue] rounded"
                            ,userState.top.onFocus && 'absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]')}
                            onClick={()=>{onClickUser('top', !userState.top.onFocus)}}
                        >1</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>1</div>
                        <div>1</div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div>1</div>
                    </div>
                    <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <div className="text-[red] box rotate">123</div>
                    </div>
                </div> */}
                <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                  <div className="p-2 bg-blue-600 text-[#fff] rounded">開始牌局</div>
                </div>
      </div>

      <div className="border-2 border-solid border-[red] h-[50px]">footer</div>
      {currentPosition && (
        <div
          className={clsx(
            "absolute top-0 left-0 w-[100vw] h-[100vh] z-[5]"
          )}
          onClick={() => {
            setCurrentPosition("");
            console.log("outside");
          }}
        ></div>
      )}
    </div>
  );
};
