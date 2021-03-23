import React from "react";
import _ from "lodash";
import { useSetRecoilState, useRecoilValue } from "recoil";

import { DFASelector, DFACurrentState } from "../../store";

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
            removeCoin(coinID);
            setDFA("B");
        }
    }

    function withdrawCoin() {
        if (removedCoinLists.length > 0) {
            const removedCoin = _.last(removedCoinLists) as number;
            setRemovedCoin(_.dropRight(removedCoinLists)); 
            setCoinLists(coinLists.concat(removedCoin));
            setDFA("Y");
            setDFA("B");
        }
    }

    React.useEffect(() => {
        if (DFACurrent.id >= 5)
            setRemovedCoin([])
    }, [DFACurrent]);
  
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
