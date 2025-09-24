// export const exportCsvRepository = {
//   async getDataFurnas() {
//     const query = `
//      SELECT
//     f.idabioticocoluna AS idfluxoinpe,
//     f.datamedida,
//     f.horamedida,
//     f.profundidade,
//     f.dic,
//     f.nt,
//     f.pt,
//     f.delta13c,
//     f.delta15n,

//     s.idsitio,
//     s.nome AS sitio_nome,
//     s.lat AS sitio_lat,
//     s.lng AS sitio_lng,
//     s.descricao AS sitio_descricao,

//     c.idcampanha,
//     c.nroCampanha,
//     c.datainicio,
//     c.datafim,

//     r.idreservatorio,
//     r.nome AS reservatorio_nome,
//     r.lat AS reservatorio_lat,
//     r.lng AS reservatorio_lng,

//     i.idinstituicao,
//     i.nome AS instituicao_nome

// FROM tbabioticocoluna f
// -- Sítio
// JOIN tbsitio s ON f.idsitio = s.idsitio
// -- Campanha
// JOIN tbcampanha c ON f.idcampanha = c.idcampanha
// -- Reservatório
// JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
// -- Instituição
// JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao

// ORDER BY f.datamedida DESC, f.horamedida DESC
// LIMIT 100;

//     `;
//   },
//   async getDataBalcar() {
//     const query = `
//      SELECT
//     f.idfluxoinpe,
//     f.datamedida,
//     f.ch4,
//     f.batimetria,
//     f.tempar,
//     f.tempcupula,
//     f.tempaguasubsuperficie,
//     f.tempaguameio,
//     f.tempaguafundo,
//     f.phsubsuperficie,
//     f.phmeio,
//     f.phfundo,
//     f.orpsubsuperficie,
//     f.orpmeio,
//     f.orpfundo,
//     f.condutividadesubsuperficie,
//     f.condutividademeio,
//     f.condutividadefundo,
//     f.odsubsuperficie,
//     f.odmeio,
//     f.odfundo,
//     f.tsdsubsuperficie,
//     f.tsdmeio,
//     f.tsdfundo,

//     s.idsitio,
//     s.nome AS sitio_nome,
//     s.lat AS sitio_lat,
//     s.lng AS sitio_lng,
//     s.descricao AS sitio_descricao,

//     c.idcampanha,
//     c.nrocampanha,
//     c.datainicio,
//     c.datafim,

//     r.idreservatorio,
//     r.nome AS reservatorio_nome,
//     r.lat AS reservatorio_lat,
//     r.lng AS reservatorio_lng,

//     i.idinstituicao,
//     i.nome AS instituicao_nome

// FROM tbfluxoinpe f
// -- JOIN com o sítio
// JOIN tbsitio s ON f.idsitio = s.idsitio
// -- JOIN com a campanha
// JOIN tbcampanha c ON f.idcampanha = c.idcampanha
// -- JOIN com o reservatório
// JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
// -- JOIN com a instituição
// JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao

// ORDER BY f.datamedida DESC
// LIMIT 100;

//     `;
//   },

//   async getDataSima() {
//     const query = `
//      SELECT
//     e.idestacao,
//     e.rotulo AS estacao_nome,
//     e.lat AS estacao_lat,
//     e.lng AS estacao_lng,
//     e.inicio AS estacao_inicio,
//     e.fim AS estacao_fim,

//     s.idSensor,
//     s.nome AS sensor_nome,
//     s.fabricante,
//     s.modelo,
//     s.faixa,
//     s.precisao,

//     sima.idsima,
//     sima.datahora,
//     sima.regno,
//     sima.nofsamples,
//     sima.proamag,
//     sima.dirvt,
//     sima.intensvt,
//     sima.u_vel,
//     sima.v_vel,
//     sima.tempag1,
//     sima.tempag2,
//     sima.tempag3,
//     sima.tempag4,
//     sima.tempar,
//     sima.ur,
//     sima.tempar_r,
//     sima.pressatm,
//     sima.radincid,
//     sima.radrefl,
//     sima.bateria,
//     sima.sonda_temp,
//     sima.sonda_cond,
//     sima.sonda_DO,
//     sima.sonda_pH,
//     sima.sonda_NH4,
//     sima.sonda_NO3,
//     sima.sonda_turb,
//     sima.sonda_chl,
//     sima.sonda_bateria,
//     sima.corr_norte,
//     sima.corr_leste,
//     sima.co2_low,
//     sima.co2_high,
//     sima.precipitacao

// FROM tbsima sima
// JOIN tbestacao e ON sima.idestacao = e.idestacao
// LEFT JOIN tbcampotabela c ON c.idSensor IS NOT NULL -- Se quiser associar sensores
// LEFT JOIN tbsensor s ON c.idSensor = s.idSensor

// ORDER BY sima.datahora DESC
// LIMIT 100;

//     `;
//   },
// };
