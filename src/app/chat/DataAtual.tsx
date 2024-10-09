import { DataStyle } from "../../styles/styled";
import { DataProps } from "../../types";

export default function DataAtual({data}: DataProps){
    return(
        <DataStyle className="dataAtual">
            <p>{data}</p>
        </DataStyle>
    )
}