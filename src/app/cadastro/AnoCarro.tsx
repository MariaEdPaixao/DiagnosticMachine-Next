import { AnoProps } from '@/types';
import React, { useState } from 'react';

export function AnoCarro({onChange}:AnoProps){

  const [selectedAno] = useState<number | undefined>(undefined); // Estado para armazenar o ano selecionado

  // Gera a lista de anos entre 1886 e 2025
  const gerarAnos = (inicio: number, fim: number): number[] => {
    const anos = [];
    for (let ano = inicio; ano <= fim; ano++) {
      anos.push(ano);
    }
    return anos;
  };

  const anos = gerarAnos(1886, 2025); // Chama a função para gerar os anos

  return (
    <div className="campos">
      <label htmlFor="idanoCarro">Ano</label>
      <select id="idanoCarro" value={selectedAno} name="ano" required className="selectStyle" onChange={onChange}>
        <option value="" disabled selected> Selecione um ano</option>
        {anos.map((ano) => (
          <option key={ano} value={ano}>
            {ano}
          </option>
        ))}
      </select>
    </div>
  );
}
