// Mapeamento dos nomes da API para os rótulos que devem aparecer na tabela
export const fieldNameToLabel: Record<string, string> = {
  // Campos separados de data e hora
  "data": "Data",
  "hora": "Hora",
  
  // Mapeamento direto dos campos da API para os rótulos
  "datahora": "Data e horário", // Mantém para compatibilidade
  "tempag1": "Temp. da água 2m",
  "tempag2": "Temp. da água 5m", 
  "tempag3": "Temp. da água 20m",
  "tempag4": "Temp. da água 40m",
  "tempar": "Temp. do ar",
  "sonda_do": "Conc. de DO",
  "sonda_dosat": "Porcentagem de DO",
  "sonda_ph": "pH",
  "sonda_chl": "Clorofila",
  "sonda_nh4": "Conc. de NH4+",
  "sonda_no3": "Conc. de NO3-",
  "sonda_cond": "Condutividade",
  "sonda_turb": "Turbidez",
  "sonda_bateria": "Bateria da PTT",
  "radincid": "Radiação incidente",
  "radrefl": "Radiação refletida",
  "dirvt": "Direção do vento",
  "intensvt": "Intensidade do vento",
  "u_vel": "Vel. zonal do vento",
  "v_vel": "Vel. meridional do vento",
  "corr_norte": "Vel. meridional da corrente",
  "corr_leste": "Vel. zonal da corrente",
  "pressatm": "Pressão atmosférica",
  "ur": "Umidade relativa do ar",
  
  // Campos adicionais da API que não estão no CSV
  "co2_low": "CO2 Baixo",
  "co2_high": "CO2 Alto", 
  "tempar_r": "Temp. do ar (Reserva)",
  "precipitacao": "Precipitação",
  "nome_estacao": "Nome da Estação",
  
  // Campos de identificação
  "idsima": "ID Sima",
  "idsimaoffline": "ID Sima Offline",
  "idestacao": "ID Estação"
};

// Função para traduzir o nome do campo para o rótulo
export const translateFieldName = (fieldName: string): string => {
  return fieldNameToLabel[fieldName] || fieldName;
};

// Função para obter as colunas visíveis com rótulos traduzidos
export const getTranslatedColumns = (columns: string[]) => {
  return columns.map(col => ({
    original: col,
    translated: translateFieldName(col)
  }));
};