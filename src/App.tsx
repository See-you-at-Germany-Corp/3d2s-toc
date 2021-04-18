import React from "react";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import "./App.css";
import ClampMachine from "./components/ClampMachine";
import DFAGraph from "./components/DFAGraph";

const contributors = [
    {
        id: "61010838",
        fname: "นายภูริวัจน์",
        lname: "วิจิตธัญโรจน์",
    },
    {
        id: "61010914",
        fname: "นายลัทธพล",
        lname: "แพ่งสภา",
    },
    {
        id: "61010968",
        fname: "นายวิธวินท์",
        lname: "เมืองน้อย",
    },
    {
        id: "61011405",
        fname: "นายพรรษา",
        lname: "บุญทวีกุลสวัสดิ์",
    },
    {
        id: "61011422",
        fname: "นายวีรวิทย์",
        lname: "ศิรกุลวัฒน์",
    },
    {
        id: "61011433",
        fname: "นายเสฎฐวุฒิ",
        lname: "ทิพย์กรรภิรมย์",
    },
];

const App = (): React.ReactElement => {
    return (
        <RecoilRoot>
            <Container id="dfa-clamp-machine">
                <ClampMachine />
                <DFAGraph />
            </Container>
            <ContributorContainer id="contributor">
                <div>ผู้จัดทำ</div>
                <table>
                    <tbody>
                        {contributors.map((cont, i) => {
                            return (
                                <tr key={`cont-${i}`}>
                                    <td>{cont.id}</td>
                                    <td>{cont.fname}</td>
                                    <td>{cont.lname}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div>
                    สถาบันเทคโนโลยพีระจอมเกล้าเจ้าคุณทหารลาดกระบัง ปีการศึกษา
                    2563
                </div>
            </ContributorContainer>
        </RecoilRoot>
    );
};

const Container = styled.div`
    display: flex;
    max-width: 100vw;
`;

const ContributorContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    margin-bottom: 30px;

    table {
        width: 550px;
    }

    div,
    td {
        font-size: 30px;
        font-family: "mitr";
    }

    td {
        padding-top: 3px;
        padding-bottom: 3px;
    }
`;

export default App;
