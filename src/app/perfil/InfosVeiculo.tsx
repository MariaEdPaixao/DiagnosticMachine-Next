import { PerfilInfosStyle } from "@/styles/styled";

export default function InfosVeiculo(){

    return(
        <PerfilInfosStyle>
            <div className="tituloPerfil">
                <h2>Dados do seu veículo: </h2>
            </div>
            <form action="" >
                <div className="campos">
                    <label htmlFor="idmarca">Marca: </label>
                    <input type="text" name="marca" id="idmarca" className="selectStyle" value="Toyota" readOnly/>
                </div>
                <div className="campos">
                    <label htmlFor="idmodelo">Modelo: </label>
                    <input type="text" name="modelo" id="idmodelo" className="selectStyle" value="Corolla" readOnly />
                </div>
                <div className="infosC">
                    <div className="campos">
                        <label htmlFor="idano">Ano: </label>
                        <input type="number" name="ano" id="idano" className="selectStyle" value="2021" readOnly />
                    </div>
                    <div className="campos">
                        <label htmlFor="idplaca">Placa: </label>
                        <input type="text" name="placa" id="idplaca" className="selectStyle" value="ACB1234" readOnly />
                    </div>
                </div>
            </form>
        </PerfilInfosStyle>
    )
}