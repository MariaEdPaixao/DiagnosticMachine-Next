import Image from "next/image";
import btnEnviar from '@/assets/img/chat/icon-enviar.png';
import { BtnEnviarStyle } from "@/styles/styled";

export default function BtnEnviar() {
  return (
    <BtnEnviarStyle type="submit" aria-label="Enviar">
      <Image src={btnEnviar} alt="Imagem btn-enviar" className="img-btn"/>
    </BtnEnviarStyle>
  );
}
