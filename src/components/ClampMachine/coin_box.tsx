import React from "react";
import _ from "lodash";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";

import { DFASelector, DFACurrentState, clampStore } from "../../store";

import { machineStateData } from "../../types/machineStateData";
import { IClampState } from "../../types/clamp.types";

import { CoinBoxContainer, CoinHoleContainer, CoinContainer } from "./style";

interface ICoinHoleProps {
    withdrawCoin: Function;
}

const CoinHole = (props: ICoinHoleProps): React.ReactElement => {
    const { withdrawCoin } = { ...props };

    return (
        <CoinHoleContainer>
            <div className="coin-hole-box">
                <div className="coin-hole"></div>
            </div>
            <div
                className="coin-withdraw-box"
                onMouseDown={() => withdrawCoin()}
            ></div>
        </CoinHoleContainer>
    );
};

interface ICoinProps {
    id: number;
    index: number;
    insertCoin: Function;
}

const Coin = (props: ICoinProps): React.ReactElement => {
    const { id, index, insertCoin }: ICoinProps = { ...props };

    return (
        <CoinContainer
            onDragEnd={() => setTimeout(insertCoin(id), 50)}
            drag
            animate={{ x: index * -30, y: 0 }}
            dragConstraints={{
                top: 0,
                left: -index * 120,
                right: 400 - index * 80,
                bottom: 0,
            }}
        >
            <img
                src="https://cdn.discordapp.com/attachments/817783466379968572/823885361872502834/unknown-removebg-preview.png"
                alt="coin-img"
            />
        </CoinContainer>
    );
};

const CoinBox = (): React.ReactElement => {
    const [coinLists, setCoinLists] = React.useState(
        getCoinLists(_.random(4, 8))
    );
    const [removedCoinLists, setRemovedCoin] = React.useState<number[]>([]);

    const setDFA = useSetRecoilState(DFASelector);
    const DFACurrent = useRecoilValue(DFACurrentState);
    const [clampState, setClamp] = useRecoilState(clampStore);

    function getCoinLists(max: number): number[] {
        let coinLists = [];

        for (let i = 0; i < max; i++) coinLists.push(i);

        return coinLists;
    }

    function removeCoin(coinID: number) {
        setCoinLists(
            _.remove(coinLists, (id) => {
                return id !== coinID;
            })
        );

        setRemovedCoin(_.concat(removedCoinLists, coinID));
    }

    function insertCoin(coinID: number) {
        if (coinLists.length > 0) {
            setClamp((prev: IClampState) => ({
                ...prev,
                coin: prev.coin + 1,
            }));

            removeCoin(coinID);
        }
    }

    function withdrawCoin() {
        if (removedCoinLists.length > 0) setDFA("Y");
    }

    function returnCoin() {
        const removedCoin = _.dropRight(removedCoinLists, 0) as number[];
        setRemovedCoin([]);
        setCoinLists(coinLists.concat(removedCoin));

        setClamp((prev: IClampState) => ({
            ...prev,
            coin: 0,
        }));
    }

    function addCoinToMachine() {
        setClamp((prev: IClampState) => ({
            ...prev,
            coin: prev.coin - 1,
        }));
        setDFA("B");
    }

    React.useEffect(() => {
        if (DFACurrent.id >= machineStateData.READY_TO_GRAB) setRemovedCoin([]);

        switch (DFACurrent.id) {
            case machineStateData.IDLE: {
                if (clampState.coin > 0) addCoinToMachine();
                break;
            }
            case machineStateData.FIRST_COIN: {
                if (clampState.coin > 0) addCoinToMachine();
                break;
            }
            case machineStateData.RETURN_COIN: {
                returnCoin();
                setDFA("B");
                break;
            }
            default:
                break;
        }
        // eslint-disable-next-line
    }, [DFACurrent, clampState.coin]);

    return (
        <CoinBoxContainer>
            <CoinHole withdrawCoin={withdrawCoin} />
            <div
                className="coin-lists"
                style={{ display: "flex", width: "100%", marginLeft: "20px" }}
            >
                {_.map(coinLists, (coinID, index) => (
                    <Coin
                        key={`coin-${coinID}`}
                        id={coinID}
                        index={index}
                        insertCoin={insertCoin}
                    />
                ))}
            </div>
        </CoinBoxContainer>
    );
};

export default CoinBox;
