-- CREATE OR REPLACE FUNCTION buscar_parametros_limnologicos(
--     p_instituicao_nome text DEFAULT NULL,
--     p_idcampanha integer DEFAULT NULL,
--     p_data_inicio date DEFAULT NULL,
--     p_data_fim date DEFAULT NULL,
--     p_limit_param integer DEFAULT 100,
--     p_offset_param integer DEFAULT 0
-- )
-- RETURNS TABLE (
--     instituicao_nome text,
--     reservatorio_nome text,
--     sitio_nome text,
--     numero_campanha integer,
--     data_inicio_campanha date,
--     data_fim_campanha date,
--     abioticocoluna_profundidade double precision,
--     abioticocoluna_dic double precision,
--     abioticocoluna_nt double precision,
--     abioticocoluna_pt double precision,
--     abioticocoluna_delta13c double precision,
--     abioticocoluna_delta15n double precision,
--     abioticocoluna_data_medida date,
--     abioticocoluna_hora_medida time,
--     abioticosuperficie_dic double precision,
--     abioticosuperficie_nt double precision,
--     abioticosuperficie_pt double precision,
--     abioticosuperficie_delta13c double precision,
--     abioticosuperficie_delta15n double precision,
--     abioticosuperficie_data_medida date,
--     abioticosuperficie_hora_medida time,
--     aguamateriaorganicasedimento_profundidade double precision,
--     aguamateriaorganicasedimento_batimetria double precision,
--     aguamateriaorganicasedimento_agua double precision,
--     aguamateriaorganicasedimento_materiaorganica double precision,
--     aguamateriaorganicasedimento_data_medida date,
--     aguamateriaorganicasedimento_hora_medida time,
--     bioticocoluna_profundidade double precision,
--     bioticocoluna_doc double precision,
--     bioticocoluna_toc double precision,
--     bioticocoluna_poc double precision,
--     bioticocoluna_densidadebacteria double precision,
--     bioticocoluna_biomassabacteria double precision,
--     bioticocoluna_clorofilaa double precision,
--     bioticocoluna_biomassacarbonototalfito double precision,
--     bioticocoluna_densidadetotalfito double precision,
--     bioticocoluna_biomassazoo double precision,
--     bioticocoluna_densidadetotalzoo double precision,
--     bioticocoluna_data_medida date,
--     bioticocoluna_hora_medida time,
--     bioticosuperficie_doc double precision,
--     bioticosuperficie_toc double precision,
--     bioticosuperficie_poc double precision,
--     bioticosuperficie_densidadebacteria double precision,
--     bioticosuperficie_biomassabacteria double precision,
--     bioticosuperficie_clorofilaa double precision,
--     bioticosuperficie_biomassacarbonototalfito double precision,
--     bioticosuperficie_densidadetotalfito double precision,
--     bioticosuperficie_biomassazoo double precision,
--     bioticosuperficie_densidadetotalzoo double precision,
--     bioticosuperficie_data_medida date,
--     bioticosuperficie_hora_medida time,
--     bolhas_profundidade double precision,
--     bolhas_nrodefunis integer,
--     bolhas_volumecoletado double precision,
--     bolhas_co2 double precision,
--     bolhas_o2 double precision,
--     bolhas_n2 double precision,
--     bolhas_ch4 double precision,
--     bolhas_n2o double precision,
--     bolhas_data_medida date,
--     bolhas_hora_medida time,
--     camarasolo_ch4 double precision,
--     camarasolo_co2 double precision,
--     camarasolo_n2o double precision,
--     camarasolo_tempar double precision,
--     camarasolo_tempsolo double precision,
--     camarasolo_vento double precision,
--     camarasolo_altitude double precision,
--     camarasolo_data_medida date,
--     camarasolo_hora_medida time,
--     carbono_dc double precision,
--     carbono_doc double precision,
--     carbono_poc double precision,
--     carbono_toc double precision,
--     carbono_dic double precision,
--     carbono_tc double precision,
--     carbono_data_medida date,
--     carbono_hora_medida time,
--     concentracaogasagua_batimetria double precision,
--     concentracaogasagua_altura double precision,
--     concentracaogasagua_replica integer,
--     concentracaogasagua_ch4 double precision,
--     concentracaogasagua_co2 double precision,
--     concentracaogasagua_data_medida date,
--     concentracaogasagua_hora_medida time,
--     concentracaogassedimento_batimetria double precision,
--     concentracaogassedimento_profundidadedosedimento double precision,
--     concentracaogassedimento_replica integer,
--     concentracaogassedimento_ch4 double precision,
--     concentracaogassedimento_co2 double precision,
--     concentracaogassedimento_data_medida date,
--     concentracaogassedimento_hora_medida time,
--     difusao_ch4 double precision,
--     difusao_co2 double precision,
--     difusao_n2o double precision,
--     difusao_ph double precision,
--     difusao_tempagua double precision,
--     difusao_tempar double precision,
--     difusao_profundidade double precision,
--     difusao_altitude double precision,
--     difusao_vento double precision,
--     difusao_data_medida date,
--     difusao_hora_medida time,
--     dupladessorcaoagua_profundidade double precision,
--     dupladessorcaoagua_co2 double precision,
--     dupladessorcaoagua_o2 double precision,
--     dupladessorcaoagua_n2 double precision,
--     dupladessorcaoagua_ch4 double precision,
--     dupladessorcaoagua_n2o double precision,
--     dupladessorcaoagua_data_medida date,
--     dupladessorcaoagua_hora_medida time,
--     fluxobolhasinpe_profundidade double precision,
--     fluxobolhasinpe_ch4 double precision,
--     fluxobolhasinpe_ch4_desviopadrao double precision,
--     fluxobolhasinpe_ch4_amostras integer,
--     fluxobolhasinpe_data_medida date,
--     fluxobolhasinpe_hora_medida time,
--     fluxocarbono_producaofitoplanctonica double precision,
--     fluxocarbono_carbonoorganicoexcretado double precision,
--     fluxocarbono_respiracaofito double precision,
--     fluxocarbono_producaobacteriana double precision,
--     fluxocarbono_respiracaobacteriana double precision,
--     fluxocarbono_taxasedimentacao double precision,
--     fluxocarbono_data_medida date,
--     fluxocarbono_hora_medida time,
--     fluxodifusivo_batimetria double precision,
--     fluxodifusivo_intervalo text,
--     fluxodifusivo_ch4 double precision,
--     fluxodifusivo_co2 double precision,
--     fluxodifusivo_data_medida date,
--     fluxodifusivo_hora_medida time,
--     fluxodifusivoinpe_profundidade double precision,
--     fluxodifusivoinpe_co2 double precision,
--     fluxodifusivoinpe_co2_desviopadrao double precision,
--     fluxodifusivoinpe_co2_amostras integer,
--     fluxodifusivoinpe_ch4 double precision,
--     fluxodifusivoinpe_ch4_desviopadrao double precision,
--     fluxodifusivoinpe_ch4_amostras integer,
--     fluxodifusivoinpe_datamedida date,
--     fluxodifusivoinpe_horamedida time,
--     gasesembolhas_profundidade double precision,
--     gasesembolhas_co2 double precision,
--     gasesembolhas_o2 double precision,
--     gasesembolhas_n2 double precision,
--     gasesembolhas_ch4 double precision,
--     gasesembolhas_n2o double precision,
--     gasesembolhas_data_medida date,
--     horiba_profundidade double precision,
--     horiba_tempagua double precision,
--     horiba_condutividade double precision,
--     horiba_ph double precision,
--     horiba__do double precision,
--     horiba_tds double precision,
--     horiba_redox double precision,
--     horiba_turbidez double precision,
--     horiba_data_medida date,
--     ionsnaaguaintersticialdosedimento_profundidade double precision,
--     ionsnaaguaintersticialdosedimento_batimetria double precision,
--     ionsnaaguaintersticialdosedimento_f double precision,
--     ionsnaaguaintersticialdosedimento_cl double precision,
--     ionsnaaguaintersticialdosedimento_no2 double precision,
--     ionsnaaguaintersticialdosedimento_br double precision,
--     ionsnaaguaintersticialdosedimento_no3 double precision,
--     ionsnaaguaintersticialdosedimento_po4 double precision,
--     ionsnaaguaintersticialdosedimento_so4 double precision,
--     ionsnaaguaintersticialdosedimento_na double precision,
--     ionsnaaguaintersticialdosedimento_nh4 double precision,
--     ionsnaaguaintersticialdosedimento_k double precision,
--     ionsnaaguaintersticialdosedimento_mg double precision,
--     ionsnaaguaintersticialdosedimento_ca double precision,
--     ionsnaaguaintersticialdosedimento_acetato double precision,
--     ionsnaaguaintersticialdosedimento_data_medida date,
--     ionsnaaguaintersticialdosedimento_hora_medida time,
--     medidacampocoluna_profundidade double precision,
--     medidacampocoluna_secchi double precision,
--     medidacampocoluna_tempagua double precision,
--     medidacampocoluna_condutividade double precision,
--     medidacampocoluna__do double precision,
--     medidacampocoluna_ph double precision,
--     medidacampocoluna_turbidez double precision,
--     medidacampocoluna_materialemsuspensao double precision,
--     medidacampocoluna_intensidadeluminosa double precision,
--     medidacampocoluna_data_medida date,
--     medidacampocoluna_hora_medida time,
--     medidacamposuperficie_secchi double precision,
--     medidacamposuperficie_tempagua double precision,
--     medidacamposuperficie_condutividade double precision,
--     medidacamposuperficie__do double precision,
--     medidacamposuperficie_ph double precision,
--     medidacamposuperficie_turbidez double precision,
--     medidacamposuperficie_materialemsuspensao double precision,
--     medidacamposuperficie_data_medida date,
--     medidacamposuperficie_hora_medida time,
--     nutrientessedimento_profundidade double precision,
--     nutrientessedimento_batimetria double precision,
--     nutrientessedimento_nh4 double precision,
--     nutrientessedimento_no2 double precision,
--     nutrientessedimento_no3 double precision,
--     nutrientessedimento_po4 double precision,
--     nutrientessedimento_ptotal double precision,
--     nutrientessedimento_ntotal double precision,
--     nutrientessedimento_data_medida date,
--     nutrientessedimento_hora_medida time,
--     parametrosbiologicosfisicosagua_profundidade double precision,
--     parametrosbiologicosfisicosagua_secchi double precision,
--     parametrosbiologicosfisicosagua_tempagua double precision,
--     parametrosbiologicosfisicosagua_condutividade double precision,
--     parametrosbiologicosfisicosagua__do double precision,
--     parametrosbiologicosfisicosagua_ph double precision,
--     parametrosbiologicosfisicosagua_turbidez double precision,
--     parametrosbiologicosfisicosagua_materialemsuspensao double precision,
--     parametrosbiologicosfisicosagua_doc double precision,
--     parametrosbiologicosfisicosagua_toc double precision,
--     parametrosbiologicosfisicosagua_poc double precision,
--     parametrosbiologicosfisicosagua_dic double precision,
--     parametrosbiologicosfisicosagua_nt double precision,
--     parametrosbiologicosfisicosagua_pt double precision,
--     parametrosbiologicosfisicosagua_densidadebacteria double precision,
--     parametrosbiologicosfisicosagua_biomassabacteria double precision,
--     parametrosbiologicosfisicosagua_clorofilaa double precision,
--     parametrosbiologicosfisicosagua_biomassacarbonototalfito double precision,
--     parametrosbiologicosfisicosagua_densidadetotalfito double precision,
--     parametrosbiologicosfisicosagua_biomassazoo double precision,
--     parametrosbiologicosfisicosagua_densidadetotalzoo double precision,
--     parametrosbiologicosfisicosagua_producaofitoplanctonica double precision,
--     parametrosbiologicosfisicosagua_carbonoorganicoexcretado double precision,
--     parametrosbiologicosfisicosagua_respiracaofito double precision,
--     parametrosbiologicosfisicosagua_producaobacteriana double precision,
--     parametrosbiologicosfisicosagua_respiracaobacteriana double precision,
--     parametrosbiologicosfisicosagua_taxasedimentacao double precision,
--     parametrosbiologicosfisicosagua_delta13c double precision,
--     parametrosbiologicosfisicosagua_delta15n double precision,
--     parametrosbiologicosfisicosagua_intensidadeluminosa double precision,
--     parametrosbiologicosfisicosagua_data_medida date,
--     pfq_profundidade double precision,
--     pfq_batimetria double precision,
--     pfq_tempar double precision,
--     pfq_tempagua double precision,
--     pfq__do double precision,
--     pfq_ph double precision,
--     pfq_redox double precision,
--     pfq_vento text,
--     pfq_data_medida date,
--     pfq_hora_medida time,
--     tc_profundidade text,
--     tc_tc double precision,
--     tc_data_medida date,
--     variaveisfisicasquimicasdaagua_profundidade double precision,
--     variaveisfisicasquimicasdaagua_secchi double precision,
--     variaveisfisicasquimicasdaagua_batimetria double precision,
--     variaveisfisicasquimicasdaagua_f double precision,
--     variaveisfisicasquimicasdaagua_cl double precision,
--     variaveisfisicasquimicasdaagua_nno3 double precision,
--     variaveisfisicasquimicasdaagua_ppo43 double precision,
--     variaveisfisicasquimicasdaagua_sso42 double precision,
--     variaveisfisicasquimicasdaagua_li double precision,
--     variaveisfisicasquimicasdaagua_na double precision,
--     variaveisfisicasquimicasdaagua_nnh4 double precision,
--     variaveisfisicasquimicasdaagua_k double precision,
--     variaveisfisicasquimicasdaagua_mg double precision,
--     variaveisfisicasquimicasdaagua_ca double precision,
--     variaveisfisicasquimicasdaagua_clorofila double precision,
--     variaveisfisicasquimicasdaagua_feofitina double precision,
--     variaveisfisicasquimicasdaagua_turbidez double precision,
--     variaveisfisicasquimicasdaagua_nt double precision,
--     variaveisfisicasquimicasdaagua_pt double precision,
--     variaveisfisicasquimicasdaagua_tdc double precision,
--     variaveisfisicasquimicasdaagua_data_medida date,
--     variaveisfisicasquimicasdaagua_hora_medida time
-- )
-- LANGUAGE plpgsql
-- AS $$
-- BEGIN
--     RETURN QUERY

--     SELECT
--         i.nome AS instituicao_nome,
--         r.nome AS reservatorio_nome,
--         s.nome AS sitio_nome,
--         c.nroCampanha AS numero_campanha,
--         c.datainicio AS data_inicio_campanha,
--         c.datafim AS data_fim_campanha,
--         abioticocoluna.profundidade AS abioticocoluna_profundidade,
--         abioticocoluna.dic AS abioticocoluna_dic,
--         abioticocoluna.nt AS abioticocoluna_nt,
--         abioticocoluna.pt AS abioticocoluna_pt,
--         abioticocoluna.delta13c AS abioticocoluna_delta13c,
--         abioticocoluna.delta15n AS abioticocoluna_delta15n,
--         abioticocoluna.datamedida AS abioticocoluna_data_medida,
--         abioticocoluna.horamedida AS abioticocoluna_hora_medida,
--         abioticosuperficie.dic AS abioticosuperficie_dic,
--         abioticosuperficie.nt AS abioticosuperficie_nt,
--         abioticosuperficie.pt AS abioticosuperficie_pt,
--         abioticosuperficie.delta13c AS abioticosuperficie_delta13c,
--         abioticosuperficie.delta15n AS abioticosuperficie_delta15n,
--         abioticosuperficie.datamedida AS abioticosuperficie_data_medida,
--         abioticosuperficie.horamedida AS abioticosuperficie_hora_medida,
--         aguamateriaorganicasedimento.profundidade AS aguamateriaorganicasedimento_profundidade,
--         aguamateriaorganicasedimento.batimetria AS aguamateriaorganicasedimento_batimetria,
--         aguamateriaorganicasedimento.agua AS aguamateriaorganicasedimento_agua,
--         aguamateriaorganicasedimento.materiaOrganica AS aguamateriaorganicasedimento_materiaOrganica,
--         aguamateriaorganicasedimento.datamedida AS aguamateriaorganicasedimento_data_medida,
--         aguamateriaorganicasedimento.horamedida AS aguamateriaorganicasedimento_hora_medida,
--         bioticocoluna.profundidade AS bioticocoluna_profundidade,
--         bioticocoluna.doc AS bioticocoluna_doc,
--         bioticocoluna.toc AS bioticocoluna_toc,
--         bioticocoluna.poc AS bioticocoluna_poc,
--         bioticocoluna.densidadeBacteria AS bioticocoluna_densidadeBacteria,
--         bioticocoluna.biomassaBacteria AS bioticocoluna_biomassaBacteria,
--         bioticocoluna.clorofilaA AS bioticocoluna_clorofilaA,
--         bioticocoluna.biomassaCarbonoTotalFito AS bioticocoluna_biomassaCarbonoTotalFito,
--         bioticocoluna.densidadeTotalFito AS bioticocoluna_densidadeTotalFito,
--         bioticocoluna.biomassaZoo AS bioticocoluna_biomassaZoo,
--         bioticocoluna.densidadeTotalZoo AS bioticocoluna_densidadeTotalZoo,
--         bioticocoluna.datamedida AS bioticocoluna_data_medida,
--         bioticocoluna.horamedida AS bioticocoluna_hora_medida,
--         bioticosuperficie.doc AS bioticosuperficie_doc,
--         bioticosuperficie.toc AS bioticosuperficie_toc,
--         bioticosuperficie.poc AS bioticosuperficie_poc,
--         bioticosuperficie.densidadeBacteria AS bioticosuperficie_densidadeBacteria,
--         bioticosuperficie.biomassaBacteria AS bioticosuperficie_biomassaBacteria,
--         bioticosuperficie.clorofilaA AS bioticosuperficie_clorofilaA,
--         bioticosuperficie.biomassaCarbonoTotalFito AS bioticosuperficie_biomassaCarbonoTotalFito,
--         bioticosuperficie.densidadeTotalFito AS bioticosuperficie_densidadeTotalFito,
--         bioticosuperficie.biomassaZoo AS bioticosuperficie_biomassaZoo,
--         bioticosuperficie.densidadeTotalZoo AS bioticosuperficie_densidadetotalzoo,
--         bioticosuperficie.datamedida AS bioticosuperficie_data_medida,
--         bioticosuperficie.horamedida AS bioticosuperficie_hora_medida,
--         bolhas.profundidade AS bolhas_profundidade,
--         bolhas.nroDeFunis AS bolhas_nroDeFunis,
--         bolhas.volumeColetado AS bolhas_volumeColetado,
--         bolhas.co2 AS bolhas_co2,
--         bolhas.o2 AS bolhas_o2,
--         bolhas.n2 AS bolhas_n2,
--         bolhas.ch4 AS bolhas_ch4,
--         bolhas.n2o AS bolhas_n2o,
--         bolhas.datamedida AS bolhas_data_medida,
--         bolhas.horamedida AS bolhas_hora_medida,
--         camarasolo.ch4 AS camarasolo_ch4,
--         camarasolo.co2 AS camarasolo_co2,
--         camarasolo.n2o AS camarasolo_n2o,
--         camarasolo.tempar AS camarasolo_tempar,
--         camarasolo.tempsolo AS camarasolo_tempsolo,
--         camarasolo.vento AS camarasolo_vento,
--         camarasolo.altitude AS camarasolo_altitude,
--         camarasolo.datamedida AS camarasolo_data_medida,
--         camarasolo.horamedida AS camarasolo_hora_medida,
--         carbono.dc AS carbono_dc,
--         carbono.doc AS carbono_doc,
--         carbono.poc AS carbono_poc,
--         carbono.toc AS carbono_toc,
--         carbono.dic AS carbono_dic,
--         carbono.tc AS carbono_tc,
--         carbono.datamedida AS carbono_data_medida,
--         carbono.horamedida AS carbono_hora_medida,
--         concentracaogasagua.batimetria AS concentracaogasagua_batimetria,
--         concentracaogasagua.altura AS concentracaogasagua_altura,
--         concentracaogasagua.replica AS concentracaogasagua_replica,
--         concentracaogasagua.ch4 AS concentracaogasagua_ch4,
--         concentracaogasagua.co2 AS concentracaogasagua_co2,
--         concentracaogasagua.datamedida AS concentracaogasagua_data_medida,
--         concentracaogasagua.horamedida AS concentracaogasagua_hora_medida,
--         concentracaogassedimento.batimetria AS concentracaogassedimento_batimetria,
--         concentracaogassedimento.profundidadeDoSedimento AS concentracaogassedimento_profundidadeDoSedimento,
--         concentracaogassedimento.replica AS concentracaogassedimento_replica,
--         concentracaogassedimento.ch4 AS concentracaogassedimento_ch4,
--         concentracaogassedimento.co2 AS concentracaogassedimento_co2,
--         concentracaogassedimento.datamedida AS concentracaogassedimento_data_medida,
--         concentracaogassedimento.horamedida AS concentracaogassedimento_hora_medida,
--         difusao.ch4 AS difusao_ch4,
--         difusao.co2 AS difusao_co2,
--         difusao.n2o AS difusao_n2o,
--         difusao.ph AS difusao_ph,
--         difusao.tempagua AS difusao_tempagua,
--         difusao.tempar AS difusao_tempar,
--         difusao.profundidade AS difusao_profundidade,
--         difusao.altitude AS difusao_altitude,
--         difusao.vento AS difusao_vento,
--         difusao.datamedida AS difusao_data_medida,
--         difusao.horamedida AS difusao_hora_medida,
--         dupladessorcaoagua.profundidade AS dupladessorcaoagua_profundidade,
--         dupladessorcaoagua.co2 AS dupladessorcaoagua_co2,
--         dupladessorcaoagua.o2 AS dupladessorcaoagua_o2,
--         dupladessorcaoagua.n2 AS dupladessorcaoagua_n2,
--         dupladessorcaoagua.ch4 AS dupladessorcaoagua_ch4,
--         dupladessorcaoagua.n2o AS dupladessorcaoagua_n2o,
--         dupladessorcaoagua.datamedida AS dupladessorcaoagua_data_medida,
--         dupladessorcaoagua.horamedida AS dupladessorcaoagua_hora_medida,
--         fluxobolhasinpe.profundidade AS fluxobolhasinpe_profundidade,
--         fluxobolhasinpe.ch4 AS fluxobolhasinpe_ch4,
--         fluxobolhasinpe.ch4_desviopadrao AS fluxobolhasinpe_ch4_desviopadrao,
--         fluxobolhasinpe.ch4_amostras AS fluxobolhasinpe_ch4_amostras,
--         fluxobolhasinpe.datamedida AS fluxobolhasinpe_data_medida,
--         fluxobolhasinpe.horamedida AS fluxobolhasinpe_hora_medida,
--         fluxocarbono.producaofitoplanctonica AS fluxocarbono_producaofitoplanctonica,
--         fluxocarbono.carbonoorganicoexcretado AS fluxocarbono_carbonoorganicoexcretado,
--         fluxocarbono.respiracaofito AS fluxocarbono_respiracaofito,
--         fluxocarbono.producaobacteriana AS fluxocarbono_producaobacteriana,
--         fluxocarbono.respiracaobacteriana AS fluxocarbono_respiracaobacteriana,
--         fluxocarbono.taxasedimentacao AS fluxocarbono_taxasedimentacao,
--         fluxocarbono.datamedida AS fluxocarbono_data_medida,
--         fluxocarbono.horamedida AS fluxocarbono_hora_medida,
--         fluxodifusivo.batimetria AS fluxodifusivo_batimetria,
--         fluxodifusivo.intervalo AS fluxodifusivo_intervalo,
--         fluxodifusivo.ch4 AS fluxodifusivo_ch4,
--         fluxodifusivo.co2 AS fluxodifusivo_co2,
--         fluxodifusivo.datamedida AS fluxodifusivo_data_medida,
--         fluxodifusivo.horamedida AS fluxodifusivo_hora_medida,
--         fluxodifusivoinpe.profundidade AS fluxodifusivoinpe_profundidade,
--         fluxodifusivoinpe.co2 AS fluxodifusivoinpe_co2,
--         fluxodifusivoinpe.co2_desviopadrao AS fluxodifusivoinpe_co2_desviopadrao,
--         fluxodifusivoinpe.co2_amostras AS fluxodifusivoinpe_co2_amostras,
--         fluxodifusivoinpe.ch4 AS fluxodifusivoinpe_ch4,
--         fluxodifusivoinpe.ch4_desviopadrao AS fluxodifusivoinpe_ch4_desviopadrao,
--         fluxodifusivoinpe.ch4_amostras AS fluxodifusivoinpe_ch4_amostras,
--         fluxodifusivoinpe.datamedida AS fluxodifusivoinpe_data_medida,
--         fluxodifusivoinpe.horamedida AS fluxodifusivoinpe_hora_medida,
--         gasesembolhas.profundidade AS gasesembolhas_profundidade,
--         gasesembolhas.co2 AS gasesembolhas_co2,
--         gasesembolhas.o2 AS gasesembolhas_o2,
--         gasesembolhas.n2 AS gasesembolhas_n2,
--         gasesembolhas.ch4 AS gasesembolhas_ch4,
--         gasesembolhas.n2o AS gasesembolhas_n2o,
--         gasesembolhas.datamedida AS gasesembolhas_data_medida,
--         horiba.profundidade AS horiba_profundidade,
--         horiba.tempagua AS horiba_tempagua,
--         horiba.condutividade AS horiba_condutividade,
--         horiba.ph AS horiba_ph,
--         horiba._do AS horiba__do,
--         horiba.tds AS horiba_tds,
--         horiba.redox AS horiba_redox,
--         horiba.turbidez AS horiba_turbidez,
--         horiba.datamedida AS horiba_data_medida,
--         ionsnaaguaintersticialdosedimento.profundidade AS ionsnaaguaintersticialdosedimento_profundidade,
--         ionsnaaguaintersticialdosedimento.batimetria AS ionsnaaguaintersticialdosedimento_batimetria,
--         ionsnaaguaintersticialdosedimento.f AS ionsnaaguaintersticialdosedimento_f,
--         ionsnaaguaintersticialdosedimento.cl AS ionsnaaguaintersticialdosedimento_cl,
--         ionsnaaguaintersticialdosedimento.no2 AS ionsnaaguaintersticialdosedimento_no2,
--         ionsnaaguaintersticialdosedimento.br AS ionsnaaguaintersticialdosedimento_br,
--         ionsnaaguaintersticialdosedimento.no3 AS ionsnaaguaintersticialdosedimento_no3,
--         ionsnaaguaintersticialdosedimento.po4 AS ionsnaaguaintersticialdosedimento_po4,
--         ionsnaaguaintersticialdosedimento.so4 AS ionsnaaguaintersticialdosedimento_so4,
--         ionsnaaguaintersticialdosedimento.na AS ionsnaaguaintersticialdosedimento_na,
--         ionsnaaguaintersticialdosedimento.nh4 AS ionsnaaguaintersticialdosedimento_nh4,
--         ionsnaaguaintersticialdosedimento.k AS ionsnaaguaintersticialdosedimento_k,
--         ionsnaaguaintersticialdosedimento.mg AS ionsnaaguaintersticialdosedimento_mg,
--         ionsnaaguaintersticialdosedimento.ca AS ionsnaaguaintersticialdosedimento_ca,
--         ionsnaaguaintersticialdosedimento.acetato AS ionsnaaguaintersticialdosedimento_acetato,
--         ionsnaaguaintersticialdosedimento.datamedida AS ionsnaaguaintersticialdosedimento_data_medida,
--         ionsnaaguaintersticialdosedimento.horamedida AS ionsnaaguaintersticialdosedimento_hora_medida,
--         medidacampocoluna.profundidade AS medidacampocoluna_profundidade,
--         medidacampocoluna.secchi AS medidacampocoluna_secchi,
--         medidacampocoluna.tempagua AS medidacampocoluna_tempagua,
--         medidacampocoluna.condutividade AS medidacampocoluna_condutividade,
--         medidacampocoluna._do AS medidacampocoluna__do,
--         medidacampocoluna.ph AS medidacampocoluna_ph,
--         medidacampocoluna.turbidez AS medidacampocoluna_turbidez,
--         medidacampocoluna.materialemsuspensao AS medidacampocoluna_materialemsuspensao,
--         medidacampocoluna.intensidadeluminosa AS medidacampocoluna_intensidadeluminosa,
--         medidacampocoluna.datamedida AS medidacampocoluna_data_medida,
--         medidacampocoluna.horamedida AS medidacampocoluna_hora_medida,
--         medidacamposuperficie.secchi AS medidacamposuperficie_secchi,
--         medidacamposuperficie.tempagua AS medidacamposuperficie_tempagua,
--         medidacamposuperficie.condutividade AS medidacamposuperficie_condutividade,
--         medidacamposuperficie._do AS medidacamposuperficie__do,
--         medidacamposuperficie.ph AS medidacamposuperficie_ph,
--         medidacamposuperficie.turbidez AS medidacamposuperficie_turbidez,
--         medidacamposuperficie.materialemsuspensao AS medidacamposuperficie_materialemsuspensao,
--         medidacamposuperficie.datamedida AS medidacamposuperficie_data_medida,
--         medidacamposuperficie.horamedida AS medidacamposuperficie_hora_medida,
--         nutrientessedimento.profundidade AS nutrientessedimento_profundidade,
--         nutrientessedimento.batimetria AS nutrientessedimento_batimetria,
--         nutrientessedimento.nh4 AS nutrientessedimento_nh4,
--         nutrientessedimento.no2 AS nutrientessedimento_no2,
--         nutrientessedimento.no3 AS nutrientessedimento_no3,
--         nutrientessedimento.po4 AS nutrientessedimento_po4,
--         nutrientessedimento.ptotal AS nutrientessedimento_ptotal,
--         nutrientessedimento.ntotal AS nutrientessedimento_ntotal,
--         nutrientessedimento.datamedida AS nutrientessedimento_data_medida,
--         nutrientessedimento.horamedida AS nutrientessedimento_hora_medida,
--         parametrosbiologicosfisicosagua.profundidade AS parametrosbiologicosfisicosagua_profundidade,
--         parametrosbiologicosfisicosagua.secchi AS parametrosbiologicosfisicosagua_secchi,
--         parametrosbiologicosfisicosagua.tempagua AS parametrosbiologicosfisicosagua_tempagua,
--         parametrosbiologicosfisicosagua.condutividade AS parametrosbiologicosfisicosagua_condutividade,
--         parametrosbiologicosfisicosagua._do AS parametrosbiologicosfisicosagua__do,
--         parametrosbiologicosfisicosagua.ph AS parametrosbiologicosfisicosagua_ph,
--         parametrosbiologicosfisicosagua.turbidez AS parametrosbiologicosfisicosagua_turbidez,
--         parametrosbiologicosfisicosagua.materialemsuspensao AS parametrosbiologicosfisicosagua_materialemsuspensao,
--         parametrosbiologicosfisicosagua.doc AS parametrosbiologicosfisicosagua_doc,
--         parametrosbiologicosfisicosagua.toc AS parametrosbiologicosfisicosagua_toc,
--         parametrosbiologicosfisicosagua.poc AS parametrosbiologicosfisicosagua_poc,
--         parametrosbiologicosfisicosagua.dic AS parametrosbiologicosfisicosagua_dic,
--         parametrosbiologicosfisicosagua.nt AS parametrosbiologicosfisicosagua_nt,
--         parametrosbiologicosfisicosagua.pt AS parametrosbiologicosfisicosagua_pt,
--         parametrosbiologicosfisicosagua.densidadebacteria AS parametrosbiologicosfisicosagua_densidadebacteria,
--         parametrosbiologicosfisicosagua.biomassabacteria AS parametrosbiologicosfisicosagua_biomassabacteria,
--         parametrosbiologicosfisicosagua.clorofilaa AS parametrosbiologicosfisicosagua_clorofilaa,
--         parametrosbiologicosfisicosagua.biomassacarbonototalfito AS parametrosbiologicosfisicosagua_biomassacarbonototalfito,
--         parametrosbiologicosfisicosagua.densidadetotalfito AS parametrosbiologicosfisicosagua_densidadetotalfito,
--         parametrosbiologicosfisicosagua.biomassazoo AS parametrosbiologicosfisicosagua_biomassazoo,
--         parametrosbiologicosfisicosagua.densidadetotalzoo AS parametrosbiologicosfisicosagua_densidadetotalzoo,
--         parametrosbiologicosfisicosagua.producaofitoplanctonica AS parametrosbiologicosfisicosagua_producaofitoplanctonica,
--         parametrosbiologicosfisicosagua.carbonoorganicoexcretado AS parametrosbiologicosfisicosagua_carbonoorganicoexcretado,
--         parametrosbiologicosfisicosagua.respiracaofito AS parametrosbiologicosfisicosagua_respiracaofito,
--         parametrosbiologicosfisicosagua.producaobacteriana AS parametrosbiologicosfisicosagua_producaobacteriana,
--         parametrosbiologicosfisicosagua.respiracaobacteriana AS parametrosbiologicosfisicosagua_respiracaobacteriana,
--         parametrosbiologicosfisicosagua.taxasedimentacao AS parametrosbiologicosfisicosagua_taxasedimentacao,
--         parametrosbiologicosfisicosagua.delta13c AS parametrosbiologicosfisicosagua_delta13c,
--         parametrosbiologicosfisicosagua.delta15n AS parametrosbiologicosfisicosagua_delta15n,
--         parametrosbiologicosfisicosagua.intensidadeluminosa AS parametrosbiologicosfisicosagua_intensidadeluminosa,
--         parametrosbiologicosfisicosagua.datamedida AS parametrosbiologicosfisicosagua_data_medida,
--         pfq.profundidade AS pfq_profundidade,
--         pfq.batimetria AS pfq_batimetria,
--         pfq.tempar AS pfq_tempar,
--         pfq.tempagua AS pfq_tempagua,
--         pfq._do AS pfq__do,
--         pfq.ph AS pfq_ph,
--         pfq.redox AS pfq_redox,
--         pfq.vento AS pfq_vento,
--         pfq.datamedida AS pfq_data_medida,
--         pfq.horamedida AS pfq_hora_medida,
--         tc.profundidade AS tc_profundidade,
--         tc.tc AS tc_tc,
--         tc.datamedida AS tc_data_medida,
--         variaveisfisicasquimicasdaagua.profundidade AS variaveisfisicasquimicasdaagua_profundidade,
--         variaveisfisicasquimicasdaagua.secchi AS variaveisfisicasquimicasdaagua_secchi,
--         variaveisfisicasquimicasdaagua.batimetria AS variaveisfisicasquimicasdaagua_batimetria,
--         variaveisfisicasquimicasdaagua.f AS variaveisfisicasquimicasdaagua_f,
--         variaveisfisicasquimicasdaagua.cl AS variaveisfisicasquimicasdaagua_cl,
--         variaveisfisicasquimicasdaagua.nno3 AS variaveisfisicasquimicasdaagua_nno3,
--         variaveisfisicasquimicasdaagua.ppo43 AS variaveisfisicasquimicasdaagua_ppo43,
--         variaveisfisicasquimicasdaagua.sso42 AS variaveisfisicasquimicasdaagua_sso42,
--         variaveisfisicasquimicasdaagua.li AS variaveisfisicasquimicasdaagua_li,
--         variaveisfisicasquimicasdaagua.na AS variaveisfisicasquimicasdaagua_na,
--         variaveisfisicasquimicasdaagua.nnh4 AS variaveisfisicasquimicasdaagua_nnh4,
--         variaveisfisicasquimicasdaagua.k AS variaveisfisicasquimicasdaagua_k,
--         variaveisfisicasquimicasdaagua.mg AS variaveisfisicasquimicasdaagua_mg,
--         variaveisfisicasquimicasdaagua.ca AS variaveisfisicasquimicasdaagua_ca,
--         variaveisfisicasquimicasdaagua.clorofila AS variaveisfisicasquimicasdaagua_clorofila,
--         variaveisfisicasquimicasdaagua.feofitina AS variaveisfisicasquimicasdaagua_feofitina,
--         variaveisfisicasquimicasdaagua.turbidez AS variaveisfisicasquimicasdaagua_turbidez,
--         variaveisfisicasquimicasdaagua.nt AS variaveisfisicasquimicasdaagua_nt,
--         variaveisfisicasquimicasdaagua.pt AS variaveisfisicasquimicasdaagua_pt,
--         variaveisfisicasquimicasdaagua.tdc AS variaveisfisicasquimicasdaagua_tdc,
--         variaveisfisicasquimicasdaagua.datamedida AS variaveisfisicasquimicasdaagua_data_medida,
--         variaveisfisicasquimicasdaagua.horamedida AS variaveisficasquimicasdaagua_hora_medida
--     FROM tbcampanha c
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     JOIN tbsitio s ON c.idreservatorio = s.idreservatorio
--     LEFT JOIN tbabioticocoluna abioticocoluna ON abioticocoluna.idcampanha = c.idcampanha AND abioticocoluna.idsitio = s.idsitio
--     LEFT JOIN tbabioticosuperficie abioticosuperficie ON abioticosuperficie.idcampanha = c.idcampanha AND abioticosuperficie.idsitio = s.idsitio
--     LEFT JOIN tbaguamateriaorganicasedimento aguamateriaorganicasedimento ON aguamateriaorganicasedimento.idcampanha = c.idcampanha AND aguamateriaorganicasedimento.idsitio = s.idsitio
--     LEFT JOIN tbbioticocoluna bioticocoluna ON bioticocoluna.idcampanha = c.idcampanha AND bioticocoluna.idsitio = s.idsitio
--     LEFT JOIN tbbioticosuperficie bioticosuperficie ON bioticosuperficie.idcampanha = c.idcampanha AND bioticosuperficie.idsitio = s.idsitio
--     LEFT JOIN tbbolhas bolhas ON bolhas.idcampanha = c.idcampanha AND bolhas.idsitio = s.idsitio
--     LEFT JOIN tbcamarasolo camarasolo ON camarasolo.idcampanha = c.idcampanha AND camarasolo.idsitio = s.idsitio
--     LEFT JOIN tbcarbono carbono ON carbono.idcampanha = c.idcampanha AND carbono.idsitio = s.idsitio
--     LEFT JOIN tbconcentracaogasagua concentracaogasagua ON concentracaogasagua.idcampanha = c.idcampanha AND concentracaogasagua.idsitio = s.idsitio
--     LEFT JOIN tbconcentracaogassedimento concentracaogassedimento ON concentracaogassedimento.idcampanha = c.idcampanha AND concentracaogassedimento.idsitio = s.idsitio
--     LEFT JOIN tbdifusao difusao ON difusao.idcampanha = c.idcampanha AND difusao.idsitio = s.idsitio
--     LEFT JOIN tbdupladessorcaoagua dupladessorcaoagua ON dupladessorcaoagua.idcampanha = c.idcampanha AND dupladessorcaoagua.idsitio = s.idsitio
--     LEFT JOIN tbfluxobolhasinpe fluxobolhasinpe ON fluxobolhasinpe.idcampanha = c.idcampanha AND fluxobolhasinpe.idsitio = s.idsitio
--     LEFT JOIN tbfluxocarbono fluxocarbono ON fluxocarbono.idcampanha = c.idcampanha AND fluxocarbono.idsitio = s.idsitio
--     LEFT JOIN tbfluxodifusivo fluxodifusivo ON fluxodifusivo.idcampanha = c.idcampanha AND fluxodifusivo.idsitio = s.idsitio
--     LEFT JOIN tbfluxodifusivoinpe fluxodifusivoinpe ON fluxodifusivoinpe.idcampanha = c.idcampanha AND fluxodifusivoinpe.idsitio = s.idsitio
--     LEFT JOIN tbgasesembolhas gasesembolhas ON gasesembolhas.idcampanha = c.idcampanha AND gasesembolhas.idsitio = s.idsitio
--     LEFT JOIN tbhoriba horiba ON horiba.idcampanha = c.idcampanha AND horiba.idsitio = s.idsitio
--     LEFT JOIN tbionsnaaguaintersticialdosedimento ionsnaaguaintersticialdosedimento ON ionsnaaguaintersticialdosedimento.idcampanha = c.idcampanha AND ionsnaaguaintersticialdosedimento.idsitio = s.idsitio
--     LEFT JOIN tbmedidacampocoluna medidacampocoluna ON medidacampocoluna.idcampanha = c.idcampanha AND medidacampocoluna.idsitio = s.idsitio
--     LEFT JOIN tbmedidacamposuperficie medidacamposuperficie ON medidacamposuperficie.idcampanha = c.idcampanha AND medidacamposuperficie.idsitio = s.idsitio
--     LEFT JOIN tbnutrientessedimento nutrientessedimento ON nutrientessedimento.idcampanha = c.idcampanha AND nutrientessedimento.idsitio = s.idsitio
--     LEFT JOIN tbparametrosbiologicosfisicosagua parametrosbiologicosfisicosagua ON parametrosbiologicosfisicosagua.idcampanha = c.idcampanha AND parametrosbiologicosfisicosagua.idsitio = s.idsitio
--     LEFT JOIN tbpfq pfq ON pfq.idcampanha = c.idcampanha AND pfq.idsitio = s.idsitio
--     LEFT JOIN tbtc tc ON tc.idcampanha = c.idcampanha AND tc.idsitio = s.idsitio
--     LEFT JOIN tbvariaveisfisicasquimicasdaagua variaveisfisicasquimicasdaagua ON variaveisfisicasquimicasdaagua.idcampanha = c.idcampanha AND variaveisfisicasquimicasdaagua.idsitio = s.idsitio
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idcampanha IS NULL OR c.idcampanha = p_idcampanha)
--       AND (p_data_inicio IS NULL OR c.datainicio >= p_data_inicio)
--       AND (p_data_fim IS NULL OR c.datafim <= p_data_fim)
--     ORDER BY c.datainicio DESC, c.horamedida DESC
--     LIMIT p_limit_param
--     OFFSET p_offset_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- ==================================================================
-- -- Funções que filtram por NOME da INSTITUIÇÃO (p_instituicao_nome TEXT)
-- -- ==================================================================

-- -- =========================
-- -- ABIÓTICO - COLUNA
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_abioticocoluna(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     dic DOUBLE PRECISION,
--     nt DOUBLE PRECISION,
--     pt DOUBLE PRECISION,
--     delta13c DOUBLE PRECISION,
--     delta15n DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT
--         (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
--         t.profundidade, t.dic, t.nt, t.pt, t.delta13c, t.delta15n,
--         s.nome, i.nome, r.nome
--     FROM tbabioticocoluna t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY datahora DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- ABIÓTICO - SUPERFÍCIE
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_abioticosuperficie(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     dic DOUBLE PRECISION,
--     nt DOUBLE PRECISION,
--     pt DOUBLE PRECISION,
--     delta13c DOUBLE PRECISION,
--     delta15n DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT
--         (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--         t.dic, t.nt, t.pt, t.delta13c, t.delta15n,
--         s.nome, i.nome, r.nome
--     FROM tbabioticosuperficie t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- ÁGUA - MATÉRIA ORGÂNICA E SEDIMENTO
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_aguamateriaorganicasedimento(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     batimetria DOUBLE PRECISION,
--     agua DOUBLE PRECISION,
--     materiaorganica DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.batimetria, t.agua, t.materiaOrganica,
--            s.nome, i.nome, r.nome
--     FROM tbaguamateriaorganicasedimento t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- BIÓTICO - COLUNA
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_bioticocoluna(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     doc DOUBLE PRECISION,
--     toc DOUBLE PRECISION,
--     poc DOUBLE PRECISION,
--     densidadebacteria DOUBLE PRECISION,
--     clorofilaA DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.doc, t.toc, t.poc, t.densidadeBacteria, t.clorofilaA,
--            s.nome, i.nome, r.nome
--     FROM tbbioticocoluna t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- BIÓTICO - SUPERFÍCIE
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_bioticosuperficie(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     doc DOUBLE PRECISION,
--     toc DOUBLE PRECISION,
--     poc DOUBLE PRECISION,
--     densidadebacteria DOUBLE PRECISION,
--     clorofilaA DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.doc, t.toc, t.poc, t.densidadeBacteria, t.clorofilaA,
--            s.nome, i.nome, r.nome
--     FROM tbbioticosuperficie t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- BOLHAS
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_bolhas(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     nrodefunis INTEGER,
--     volumecoletado DOUBLE PRECISION,
--     ch4 DOUBLE PRECISION,
--     co2 DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.nroDeFunis, t.volumeColetado, t.ch4, t.co2,
--            s.nome, i.nome, r.nome
--     FROM tbbolhas t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- CÂMARA DE SOLO
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_camarasolo(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     ch4 DOUBLE PRECISION,
--     co2 DOUBLE PRECISION,
--     n2o DOUBLE PRECISION,
--     tempar DOUBLE PRECISION,
--     tempsolo DOUBLE PRECISION,
--     vento DOUBLE PRECISION,
--     altitude DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.ch4, t.co2, t.n2o, t.tempar, t.tempsolo, t.vento, t.altitude,
--            s.nome, i.nome, r.nome
--     FROM tbcamarasolo t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- CARBONO
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_carbono(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     dc DOUBLE PRECISION,
--     doc DOUBLE PRECISION,
--     poc DOUBLE PRECISION,
--     toc DOUBLE PRECISION,
--     dic DOUBLE PRECISION,
--     tc DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.dc, t.doc, t.poc, t.toc, t.dic, t.tc,
--            s.nome, i.nome, r.nome
--     FROM tbcarbono t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- CONCENTRAÇÃO GÁS - ÁGUA
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_concentracaogasagua(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     batimetria DOUBLE PRECISION,
--     altura DOUBLE PRECISION,
--     replica INTEGER,
--     ch4 DOUBLE PRECISION,
--     co2 DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.batimetria, t.altura, t.replica, t.ch4, t.co2,
--            s.nome, i.nome, r.nome
--     FROM tbconcentracaogasagua t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- CONCENTRAÇÃO GÁS - SEDIMENTO
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_concentracaogassedimento(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     batimetria DOUBLE PRECISION,
--     profundidadeDoSedimento DOUBLE PRECISION,
--     replica INTEGER,
--     ch4 DOUBLE PRECISION,
--     co2 DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.batimetria, t.profundidadeDoSedimento, t.replica, t.ch4, t.co2,
--            s.nome, i.nome, r.nome
--     FROM tbconcentracaogassedimento t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- DIFUSÃO
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_difusao(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     ch4 DOUBLE PRECISION,
--     co2 DOUBLE PRECISION,
--     n2o DOUBLE PRECISION,
--     ph DOUBLE PRECISION,
--     tempagua DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.ch4, t.co2, t.n2o, t.ph, t.tempagua,
--            s.nome, i.nome, r.nome
--     FROM tbdifusao t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- DUPLA DESSORÇÃO ÁGUA
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_dupladessorcaoagua(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     co2 DOUBLE PRECISION,
--     o2 DOUBLE PRECISION,
--     n2 DOUBLE PRECISION,
--     ch4 DOUBLE PRECISION,
--     n2o DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.co2, t.o2, t.n2, t.ch4, t.n2o,
--            s.nome, i.nome, r.nome
--     FROM tbdupladessorcaoagua t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- FLUXO - BOLHAS (INPE)
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_fluxobolhasinpe(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     ch4 DOUBLE PRECISION,
--     ch4_desviopadrao DOUBLE PRECISION,
--     ch4_amostras INTEGER,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.ch4, t.ch4_desviopadrao, t.ch4_amostras,
--            s.nome, i.nome, r.nome
--     FROM tbfluxobolhasinpe t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- FLUXO - CARBONO
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_fluxocarbono(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     producaofitoplanctonica DOUBLE PRECISION,
--     carbonoorganicoexcretado DOUBLE PRECISION,
--     respiracaofito DOUBLE PRECISION,
--     producaobacteriana DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.producaofitoplanctonica, t.carbonoorganicoexcretado, t.respiracaofito, t.producaobacteriana,
--            s.nome, i.nome, r.nome
--     FROM tbfluxocarbono t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- FLUXO - DIFUSIVO
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_fluxodifusivo(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     batimetria DOUBLE PRECISION,
--     intervalo TEXT,
--     ch4 DOUBLE PRECISION,
--     co2 DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.batimetria, t.intervalo, t.ch4, t.co2,
--            s.nome, i.nome, r.nome
--     FROM tbfluxodifusivo t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- FLUXO - DIFUSIVO INPE
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_fluxodifusivoinpe(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     co2 DOUBLE PRECISION,
--     co2_desviopadrao DOUBLE PRECISION,
--     co2_amostras INTEGER,
--     ch4 DOUBLE PRECISION,
--     ch4_desviopadrao DOUBLE PRECISION,
--     ch4_amostras INTEGER,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.co2, t.co2_desviopadrao, t.co2_amostras, t.ch4, t.ch4_desviopadrao, t.ch4_amostras,
--            s.nome, i.nome, r.nome
--     FROM tbfluxodifusivoinpe t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- GASES - BOLHAS
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_gasesembolhas(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     co2 DOUBLE PRECISION,
--     o2 DOUBLE PRECISION,
--     n2 DOUBLE PRECISION,
--     ch4 DOUBLE PRECISION,
--     n2o DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.co2, t.o2, t.n2, t.ch4, t.n2o,
--            s.nome, i.nome, r.nome
--     FROM tbgasesembolhas t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- HORIBA (SENSOR DE CAMPO)
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_horiba(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     tempagua DOUBLE PRECISION,
--     condutividade DOUBLE PRECISION,
--     ph DOUBLE PRECISION,
--     _do DOUBLE PRECISION,
--     tds DOUBLE PRECISION,
--     redox DOUBLE PRECISION,
--     turbidez DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.tempagua, t.condutividade, t.ph, t._do, t.tds, t.redox, t.turbidez,
--            s.nome, i.nome, r.nome
--     FROM tbhoriba t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- IONS NA ÁGUA INTERSTICIAL DO SEDIMENTO
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_ionsnaaguaintersticialdosedimento(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     batimetria DOUBLE PRECISION,
--     f DOUBLE PRECISION,
--     cl DOUBLE PRECISION,
--     no2 DOUBLE PRECISION,
--     br DOUBLE PRECISION,
--     no3 DOUBLE PRECISION,
--     po4 DOUBLE PRECISION,
--     so4 DOUBLE PRECISION,
--     na DOUBLE PRECISION,
--     nh4 DOUBLE PRECISION,
--     k DOUBLE PRECISION,
--     mg DOUBLE PRECISION,
--     ca DOUBLE PRECISION,
--     acetato DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.batimetria, t.f, t.cl, t.no2, t.br, t.no3, t.po4, t.so4, t.na, t.nh4, t.k, t.mg, t.ca, t.acetato,
--            s.nome, i.nome, r.nome
--     FROM tbionsnaaguaintersticialdosedimento t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- MEDIDA CAMPOS - COLUNA
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_medidacampocoluna(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     secchi DOUBLE PRECISION,
--     tempagua DOUBLE PRECISION,
--     condutividade DOUBLE PRECISION,
--     _do DOUBLE PRECISION,
--     ph DOUBLE PRECISION,
--     turbidez DOUBLE PRECISION,
--     materialemsuspensao DOUBLE PRECISION,
--     intensidadeluminosa DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.secchi, t.tempagua, t.condutividade, t._do, t.ph, t.turbidez, t.materialemsuspensao, t.intensidadeluminosa,
--            s.nome, i.nome, r.nome
--     FROM tbmedidacampocoluna t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- MEDIDA CAMPOS - SUPERFÍCIE
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_medidacamposuperficie(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     secchi DOUBLE PRECISION,
--     tempagua DOUBLE PRECISION,
--     condutividade DOUBLE PRECISION,
--     _do DOUBLE PRECISION,
--     ph DOUBLE PRECISION,
--     turbidez DOUBLE PRECISION,
--     materialemsuspensao DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.secchi, t.tempagua, t.condutividade, t._do, t.ph, t.turbidez, t.materialemsuspensao,
--            s.nome, i.nome, r.nome
--     FROM tbmedidacamposuperficie t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- NUTRIENTES - SEDIMENTO
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_nutrientessedimento(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     batimetria DOUBLE PRECISION,
--     nh4 DOUBLE PRECISION,
--     no2 DOUBLE PRECISION,
--     no3 DOUBLE PRECISION,
--     po4 DOUBLE PRECISION,
--     ptotal DOUBLE PRECISION,
--     ntotal DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.batimetria, t.nh4, t.no2, t.no3, t.po4, t.ptotal, t.ntotal,
--            s.nome, i.nome, r.nome
--     FROM tbnutrientessedimento t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- PARÂMETROS BIOLÓGICOS/FÍSICOS ÁGUA
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_parametrosbiologicosfisicosagua(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     secchi DOUBLE PRECISION,
--     tempagua DOUBLE PRECISION,
--     condutividade DOUBLE PRECISION,
--     _do DOUBLE PRECISION,
--     ph DOUBLE PRECISION,
--     turbidez DOUBLE PRECISION,
--     doc DOUBLE PRECISION,
--     toc DOUBLE PRECISION,
--     poc DOUBLE PRECISION,
--     dic DOUBLE PRECISION,
--     nt DOUBLE PRECISION,
--     pt DOUBLE PRECISION,
--     clorofilaA DOUBLE PRECISION,
--     producaofitoplanctonica DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.secchi, t.tempagua, t.condutividade, t._do, t.ph, t.turbidez,
--            t.doc, t.toc, t.poc, t.dic, t.nt, t.pt, t.clorofilaA, t.producaofitoplanctonica,
--            s.nome, i.nome, r.nome
--     FROM tbparametrosbiologicosfisicosagua t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- PFQ
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_pfq(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     batimetria DOUBLE PRECISION,
--     tempar DOUBLE PRECISION,
--     tempagua DOUBLE PRECISION,
--     _do DOUBLE PRECISION,
--     ph DOUBLE PRECISION,
--     redox DOUBLE PRECISION,
--     vento TEXT,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.batimetria, t.tempar, t.tempagua, t._do, t.ph, t.redox, t.vento,
--            s.nome, i.nome, r.nome
--     FROM tbpfq t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- TC
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_tc(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade TEXT,
--     tc DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.tc,
--            s.nome, i.nome, r.nome
--     FROM tbtc t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;


-- -- =========================
-- -- VARIÁVEIS FÍSICO-QUÍMICAS DA ÁGUA
-- -- =========================
-- CREATE OR REPLACE FUNCTION buscar_variaveisfisicasquimicasdaagua(
--     p_instituicao_nome TEXT DEFAULT NULL,
--     p_idreservatorio integer DEFAULT NULL,
--     p_rotulo TEXT DEFAULT NULL,
--     p_data_inicio TIMESTAMP DEFAULT NULL,
--     p_data_fim TIMESTAMP DEFAULT NULL,
--     p_offset_param INT DEFAULT 0,
--     p_limit_param INT DEFAULT 20
-- )
-- RETURNS TABLE (
--     datahora TIMESTAMP,
--     profundidade DOUBLE PRECISION,
--     secchi DOUBLE PRECISION,
--     batimetria DOUBLE PRECISION,
--     f DOUBLE PRECISION,
--     cl DOUBLE PRECISION,
--     nno3 DOUBLE PRECISION,
--     ppo43 DOUBLE PRECISION,
--     sso42 DOUBLE PRECISION,
--     li DOUBLE PRECISION,
--     na DOUBLE PRECISION,
--     nnh4 DOUBLE PRECISION,
--     k DOUBLE PRECISION,
--     mg DOUBLE PRECISION,
--     ca DOUBLE PRECISION,
--     clorofila DOUBLE PRECISION,
--     feofitina DOUBLE PRECISION,
--     turbidez DOUBLE PRECISION,
--     nt DOUBLE PRECISION,
--     pt DOUBLE PRECISION,
--     tdc DOUBLE PRECISION,
--     sitio_nome TEXT,
--     instituicao_nome TEXT,
--     reservatorio_nome TEXT
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
--            t.profundidade, t.secchi, t.batimetria, t.f, t.cl, t.nno3, t.ppo43, t.sso42, t.li,
--            t.na, t.nnh4, t.k, t.mg, t.ca, t.clorofila, t.feofitina, t.turbidez, t.nt, t.pt, t.tdc,
--            s.nome, i.nome, r.nome
--     FROM tbvariaveisfisicasquimicasdaagua t
--     JOIN tbcampanha c ON t.idcampanha = c.idcampanha
--     JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
--     LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
--     WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
--       AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
--       AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
--       AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
--       AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
--     ORDER BY 1 DESC
--     OFFSET p_offset_param LIMIT p_limit_param;
-- END;
-- $$ LANGUAGE plpgsql;

-- ==================================================================
-- FIM DO SCRIPT: funções geradas (filtragem por nome da instituição).
-- =================================================================


-- =========================
-- TODAS AS COORDENADAS DA INSTITUIÇÃO
-- =========================

-- CREATE OR REPLACE FUNCTION buscar_sitios_por_instituicao(
--     p_idinstituicao integer
-- )
-- RETURNS TABLE (
--     idsitio integer,
--     nome_sitio varchar(100),
--     lat double precision,
--     lng double precision,
--     descricao text,
--     nome_reservatorio varchar(50),
--     nome_instituicao varchar(50)
-- )
-- LANGUAGE plpgsql
-- AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT
--         s.idsitio,
--         s.nome AS nome_sitio,
--         s.lat,
--         s.lng,
--         s.descricao::text, -- cast aqui
--         r.nome AS nome_reservatorio,
--         i.nome AS nome_instituicao
--     FROM
--         tbsitio s
--     JOIN
--         tbreservatorio r ON s.idreservatorio = r.idreservatorio
--     JOIN
--         tbcampanha c ON r.idreservatorio = c.idreservatorio
--     JOIN
--         tbinstituicao i ON c.idinstituicao = i.idinstituicao
--     WHERE
--         i.idinstituicao = p_idinstituicao
--     ORDER BY
--         s.nome;
-- END;
-- $$;



-- =====================================
-- PROCEDURE: buscar_reservatorios_por_instituicao
-- =====================================
CREATE OR REPLACE FUNCTION buscar_reservatorios_por_instituicao(
    p_nome_instituicao VARCHAR
)
RETURNS TABLE (
    idreservatorio INTEGER,
    nome_reservatorio VARCHAR(50),
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    nome_instituicao VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT
        r.idreservatorio,
        r.nome AS nome_reservatorio,
        r.lat,
        r.lng,
        i.nome AS nome_instituicao
    FROM
        tbreservatorio r
    JOIN
        tbcampanha c ON r.idreservatorio = c.idreservatorio
    JOIN
        tbinstituicao i ON c.idinstituicao = i.idinstituicao
    WHERE
        i.nome ILIKE p_nome_instituicao  -- permite busca sem case sensitive
    ORDER BY
        r.nome;
END;
$$;



CREATE OR REPLACE FUNCTION buscar_dados_reservatorio_detalhado(
<<<<<<< HEAD
    p_idreservatorio INTEGER
)
RETURNS TABLE (
    idreservatorio INTEGER
    nome_reservatorio VARCHAR(50)
    lat DOUBLE PRECISION
    lng DOUBLE PRECISION
    tc_datahora TIMESTAMP
    tc_profundidade TEXT
    tc_tc DOUBLE PRECISION
    tc_sitio_nome TEXT
    tc_instituicao_nome TEXT
    tc_reservatorio_nome TEXT
    variaveisfisicasquimicasdaagua_datahora TIMESTAMP
    variaveisfisicasquimicasdaagua_profundidade DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_secchi DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_batimetria DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_f DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_cl DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_nno3 DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_ppo43 DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_sso42 DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_li DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_na DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_nnh4 DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_k DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_mg DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_ca DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_clorofila DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_feofitina DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_turbidez DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_nt DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_pt DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_tdc DOUBLE PRECISION
    variaveisfisicasquimicasdaagua_sitio_nome TEXT
    variaveisfisicasquimicasdaagua_instituicao_nome TEXT
    variaveisfisicasquimicasdaagua_reservatorio_nome TEXT
    parametrosbiologicosfisicosagua_profundidade DOUBLE PRECISION
    parametrosbiologicosfisicosagua_secchi DOUBLE PRECISION
    parametrosbiologicosfisicosagua_tempagua DOUBLE PRECISION
    parametrosbiologicosfisicosagua_condutividade DOUBLE PRECISION
    parametrosbiologicosfisicosagua__do DOUBLE PRECISION
    parametrosbiologicosfisicosagua_ph DOUBLE PRECISION
    parametrosbiologicosfisicosagua_turbidez DOUBLE PRECISION
    parametrosbiologicosfisicosagua_materialemsuspensao DOUBLE PRECISION
    parametrosbiologicosfisicosagua_doc DOUBLE PRECISION
    parametrosbiologicosfisicosagua_toc DOUBLE PRECISION
    parametrosbiologicosfisicosagua_poc DOUBLE PRECISION
    parametrosbiologicosfisicosagua_dic DOUBLE PRECISION
    parametrosbiologicosfisicosagua_nt DOUBLE PRECISION
    parametrosbiologicosfisicosagua_pt DOUBLE PRECISION
    parametrosbiologicosfisicosagua_densidadebacteria DOUBLE PRECISION
    parametrosbiologicosfisicosagua_biomassabacteria DOUBLE PRECISION
    parametrosbiologicosfisicosagua_clorofilaa DOUBLE PRECISION
    parametrosbiologicosfisicosagua_biomassacarbonototalfito DOUBLE PRECISION
    parametrosbiologicosfisicosagua_densidadetotalfito DOUBLE PRECISION
    parametrosbiologicosfisicosagua_biomassazoo DOUBLE PRECISION
    parametrosbiologicosfisicosagua_densidadetotalzoo DOUBLE PRECISION
    parametrosbiologicosfisicosagua_data_medida DATE
    parametrosbiologicosfisicosagua_hora_medida TIME
    parametrosbiologicosfisicosagua_sitio_nome TEXT
    parametrosbiologicosfisicosagua_instituicao_nome TEXT
    parametrosbiologicosfisicosagua_reservatorio_nome TEXT
    nutrientessedimento_profundidade DOUBLE PRECISION
    nutrientessedimento_batimetria DOUBLE PRECISION
    nutrientessedimento_nh4 DOUBLE PRECISION
    nutrientessedimento_no2 DOUBLE PRECISION
    nutrientessedimento_no3 DOUBLE PRECISION
    nutrientessedimento_po4 DOUBLE PRECISION
    nutrientessedimento_ptotal DOUBLE PRECISION
    nutrientessedimento_ntotal DOUBLE PRECISION
    nutrientessedimento_data_medida DATE
    nutrientessedimento_hora_medida TIME
    nutrientessedimento_sitio_nome TEXT
    nutrientessedimento_instituicao_nome TEXT
    nutrientessedimento_reservatorio_nome TEXT
    medidacamposuperficie_secchi DOUBLE PRECISION
    medidacamposuperficie_tempagua DOUBLE PRECISION
    medidacamposuperficie_condutividade DOUBLE PRECISION
    medidacamposuperficie__do DOUBLE PRECISION
    medidacamposuperficie_ph DOUBLE PRECISION
    medidacamposuperficie_turbidez DOUBLE PRECISION
    medidacamposuperficie_materialemsuspensao DOUBLE PRECISION
    medidacamposuperficie_data_medida DATE
    medidacamposuperficie_hora_medida TIME
    medidacamposuperficie_sitio_nome TEXT
    medidacamposuperficie_instituicao_nome TEXT
    medidacamposuperficie_reservatorio_nome TEXT
    medidacampocoluna_profundidade DOUBLE PRECISION
    medidacampocoluna_secchi DOUBLE PRECISION
    medidacampocoluna_tempagua DOUBLE PRECISION
    medidacampocoluna_condutividade DOUBLE PRECISION
    medidacampocoluna__do DOUBLE PRECISION
    medidacampocoluna_ph DOUBLE PRECISION
    medidacampocoluna_turbidez DOUBLE PRECISION
    medidacampocoluna_materialemsuspensao DOUBLE PRECISION
    medidacampocoluna_intensidadeluminosa DOUBLE PRECISION
    medidacampocoluna_data_medida DATE
    medidacampocoluna_hora_medida TIME
    medidacampocoluna_sitio_nome TEXT
    medidacampocoluna_instituicao_nome TEXT
    medidacampocoluna_reservatorio_nome TEXT
    ionsnaaguaintersticialdosedimento_profundidade DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_batimetria DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_f DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_cl DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_no2 DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_br DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_no3 DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_po4 DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_so4 DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_na DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_nh4 DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_k DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_mg DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_ca DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_acetato DOUBLE PRECISION
    ionsnaaguaintersticialdosedimento_data_medida DATE
    ionsnaaguaintersticialdosedimento_hora_medida TIME
    ionsnaaguaintersticialdosedimento_sitio_nome TEXT
    ionsnaaguaintersticialdosedimento_instituicao_nome TEXT
    ionsnaaguaintersticialdosedimento_reservatorio_nome TEXT
    horiba_profundidade DOUBLE PRECISION
    horiba_tempagua DOUBLE PRECISION
    horiba_condutividade DOUBLE PRECISION
    horiba_ph DOUBLE PRECISION
    horiba__do DOUBLE PRECISION
    horiba_tds DOUBLE PRECISION
    horiba_redox DOUBLE PRECISION
    horiba_turbidez DOUBLE PRECISION
    horiba_data_medida DATE
    horiba_hora_medida TIME
    horiba_sitio_nome TEXT
    horiba_instituicao_nome TEXT
    horiba_reservatorio_nome TEXT
    gasesembolhas_profundidade DOUBLE PRECISION
    gasesembolhas_co2 DOUBLE PRECISION
    gasesembolhas_o2 DOUBLE PRECISION
    gasesembolhas_n2 DOUBLE PRECISION
    gasesembolhas_ch4 DOUBLE PRECISION
    gasesembolhas_n2o DOUBLE PRECISION
    gasesembolhas_data_medida DATE
    gasesembolhas_hora_medida TIME
    gasesembolhas_sitio_nome TEXT
    gasesembolhas_instituicao_nome TEXT
    gasesembolhas_reservatorio_nome TEXT
    fluxodifusivoinpe_profundidade DOUBLE PRECISION
    fluxodifusivoinpe_co2 DOUBLE PRECISION
    fluxodifusivoinpe_co2_desviopadrao DOUBLE PRECISION
    fluxodifusivoinpe_co2_amostras INTEGER
    fluxodifusivoinpe_ch4 DOUBLE PRECISION
    fluxodifusivoinpe_ch4_desviopadrao DOUBLE PRECISION
    fluxodifusivoinpe_ch4_amostras INTEGER
    fluxodifusivoinpe_datamedida DATE
    fluxodifusivoinpe_horamedida TIME
    fluxodifusivoinpe_sitio_nome TEXT
    fluxodifusivoinpe_instituicao_nome TEXT
    fluxodifusivoinpe_reservatorio_nome TEXT
    fluxodifusivo_batimetria DOUBLE PRECISION
    fluxodifusivo_intervalo TEXT
    fluxodifusivo_ch4 DOUBLE PRECISION
    fluxodifusivo_co2 DOUBLE PRECISION
    fluxodifusivo_data_medida DATE
    fluxodifusivo_hora_medida TIME
    fluxodifusivo_sitio_nome TEXT
    fluxodifusivo_instituicao_nome TEXT
    fluxodifusivo_reservatorio_nome TEXT
    fluxocarbono_producaofitoplanctonica DOUBLE PRECISION
    fluxocarbono_carbonoorganicoexcretado DOUBLE PRECISION
    fluxocarbono_respiracaofito DOUBLE PRECISION
    fluxocarbono_producaobacteriana DOUBLE PRECISION
    fluxocarbono_respiracaobacteriana DOUBLE PRECISION
    fluxocarbono_taxasedimentacao DOUBLE PRECISION
    fluxocarbono_data_medida DATE
    fluxocarbono_hora_medida TIME
    fluxocarbono_sitio_nome TEXT
    fluxocarbono_instituicao_nome TEXT
    fluxocarbono_reservatorio_nome TEXT
    fluxobolhasinpe_profundidade DOUBLE PRECISION
    fluxobolhasinpe_ch4 DOUBLE PRECISION
    fluxobolhasinpe_ch4_desviopadrao DOUBLE PRECISION
    fluxobolhasinpe_ch4_amostras INTEGER
    fluxobolhasinpe_data_medida DATE
    fluxobolhasinpe_hora_medida TIME
    fluxobolhasinpe_sitio_nome TEXT
    fluxobolhasinpe_instituicao_nome TEXT
    fluxobolhasinpe_reservatorio_nome TEXT
    dupladessorcaoagua_profundidade DOUBLE PRECISION
    dupladessorcaoagua_co2 DOUBLE PRECISION
    dupladessorcaoagua_o2 DOUBLE PRECISION
    dupladessorcaoagua_n2 DOUBLE PRECISION
    dupladessorcaoagua_ch4 DOUBLE PRECISION
    dupladessorcaoagua_n2o DOUBLE PRECISION
    dupladessorcaoagua_data_medida DATE
    dupladessorcaoagua_hora_medida TIME
    dupladessorcaoagua_sitio_nome TEXT
    dupladessorcaoagua_instituicao_nome TEXT
    dupladessorcaoagua_reservatorio_nome TEXT
    difusao_ch4 DOUBLE PRECISION
    difusao_co2 DOUBLE PRECISION
    difusao_n2o DOUBLE PRECISION
    difusao_ph DOUBLE PRECISION
    difusao_tempagua DOUBLE PRECISION
    difusao_tempar DOUBLE PRECISION
    difusao_profundidade DOUBLE PRECISION
    difusao_altitude DOUBLE PRECISION
    difusao_vento DOUBLE PRECISION
    difusao_data_medida DATE
    difusao_hora_medida TIME
    difusao_sitio_nome TEXT
    difusao_instituicao_nome TEXT
    difusao_reservatorio_nome TEXT
    concentracaogassedimento_batimetria DOUBLE PRECISION
    concentracaogassedimento_profundidadedosedimento DOUBLE PRECISION
    concentracaogassedimento_replica INTEGER
    concentracaogassedimento_ch4 DOUBLE PRECISION
    concentracaogassedimento_co2 DOUBLE PRECISION
    concentracaogassedimento_data_medida DATE
    concentracaogassedimento_hora_medida TIME
    concentracaogassedimento_sitio_nome TEXT
    concentracaogassedimento_instituicao_nome TEXT
    concentracaogassedimento_reservatorio_nome TEXT
    concentracaogasagua_batimetria DOUBLE PRECISION
    concentracaogasagua_altura DOUBLE PRECISION
    concentracaogasagua_replica INTEGER
    concentracaogasagua_ch4 DOUBLE PRECISION
    concentracaogasagua_co2 DOUBLE PRECISION
    concentracaogasagua_data_medida DATE
    concentracaogasagua_hora_medida TIME
    concentracaogasagua_sitio_nome TEXT
    concentracaogasagua_instituicao_nome TEXT
    concentracaogasagua_reservatorio_nome TEXT
    carbono_dc DOUBLE PRECISION
    carbono_doc DOUBLE PRECISION
    carbono_poc DOUBLE PRECISION
    carbono_toc DOUBLE PRECISION
    carbono_dic DOUBLE PRECISION
    carbono_tc DOUBLE PRECISION
    carbono_data_medida DATE
    carbono_hora_medida TIME
    carbono_sitio_nome TEXT
    carbono_instituicao_nome TEXT
    carbono_reservatorio_nome TEXT
    camarasolo_ch4 DOUBLE PRECISION
    camarasolo_co2 DOUBLE PRECISION
    camarasolo_n2o DOUBLE PRECISION
    camarasolo_tempar DOUBLE PRECISION
    camarasolo_tempsolo DOUBLE PRECISION
    camarasolo_vento DOUBLE PRECISION
    camarasolo_altitude DOUBLE PRECISION
    camarasolo_data_medida DATE
    camarasolo_hora_medida TIME
    camarasolo_sitio_nome TEXT
    camarasolo_instituicao_nome TEXT
    camarasolo_reservatorio_nome TEXT
    bolhas_profundidade DOUBLE PRECISION
    bolhas_nrodefunis INTEGER
    bolhas_volumecoletado DOUBLE PRECISION
    bolhas_co2 DOUBLE PRECISION
    bolhas_o2 DOUBLE PRECISION
    bolhas_n2 DOUBLE PRECISION
    bolhas_ch4 DOUBLE PRECISION
    bolhas_n2o DOUBLE PRECISION
    bolhas_data_medida DATE
    bolhas_hora_medida TIME
    bolhas_sitio_nome TEXT
    bolhas_instituicao_nome TEXT
    bolhas_reservatorio_nome TEXT
    bioticosuperficie_doc DOUBLE PRECISION
    bioticosuperficie_toc DOUBLE PRECISION
    bioticosuperficie_poc DOUBLE PRECISION
    bioticosuperficie_densidadebacteria DOUBLE PRECISION
    bioticosuperficie_biomassabacteria DOUBLE PRECISION
    bioticosuperficie_clorofilaa DOUBLE PRECISION
    bioticosuperficie_biomassacarbonototalfito DOUBLE PRECISION
    bioticosuperficie_densidadetotalfito DOUBLE PRECISION
    bioticosuperficie_biomassazoo DOUBLE PRECISION
    bioticosuperficie_densidadetotalzoo DOUBLE PRECISION
    bioticosuperficie_data_medida DATE
    bioticosuperficie_hora_medida TIME
    bioticosuperficie_sitio_nome TEXT
    bioticosuperficie_instituicao_nome TEXT
    bioticosuperficie_reservatorio_nome TEXT
    bioticocoluna_profundidade DOUBLE PRECISION
    bioticocoluna_doc DOUBLE PRECISION
    bioticocoluna_toc DOUBLE PRECISION
    bioticocoluna_poc DOUBLE PRECISION
    bioticocoluna_densidadebacteria DOUBLE PRECISION
    bioticocoluna_biomassabacteria DOUBLE PRECISION
    bioticocoluna_clorofilaa DOUBLE PRECISION
    bioticocoluna_biomassacarbonototalfito DOUBLE PRECISION
    bioticocoluna_densidadetotalfito DOUBLE PRECISION
    bioticocoluna_biomassazoo DOUBLE PRECISION
    bioticocoluna_densidadetotalzoo DOUBLE PRECISION
    bioticocoluna_data_medida DATE
    bioticocoluna_hora_medida TIME
    bioticocoluna_sitio_nome TEXT
    bioticocoluna_instituicao_nome TEXT
    bioticocoluna_reservatorio_nome TEXT
    aguamateriaorganicasedimento_profundidade DOUBLE PRECISION
    aguamateriaorganicasedimento_batimetria DOUBLE PRECISION
    aguamateriaorganicasedimento_agua DOUBLE PRECISION
    aguamateriaorganicasedimento_materiaorganica DOUBLE PRECISION
    aguamateriaorganicasedimento_data_medida DATE
    aguamateriaorganicasedimento_hora_medida TIME
    aguamateriaorganicasedimento_sitio_nome TEXT
    aguamateriaorganicasedimento_instituicao_nome TEXT
    aguamateriaorganicasedimento_reservatorio_nome TEXT
    abioticosuperficie_dic DOUBLE PRECISION
    abioticosuperficie_nt DOUBLE PRECISION
    abioticosuperficie_pt DOUBLE PRECISION
    abioticosuperficie_delta13c DOUBLE PRECISION
    abioticosuperficie_delta15n DOUBLE PRECISION
    abioticosuperficie_data_medida DATE
    abioticosuperficie_hora_medida TIME
    abioticosuperficie_sitio_nome TEXT
    abioticosuperficie_instituicao_nome TEXT
    abioticosuperficie_reservatorio_nome TEXT
    abioticocoluna_profundidade DOUBLE PRECISION
    abioticocoluna_dic DOUBLE PRECISION
    abioticocoluna_nt DOUBLE PRECISION
    abioticocoluna_pt DOUBLE PRECISION
    abioticocoluna_delta13c DOUBLE PRECISION
    abioticocoluna_delta15n DOUBLE PRECISION
    abioticocoluna_data_medida DATE
    abioticocoluna_hora_medida TIME
    abioticocoluna_sitio_nome TEXT
    abioticocoluna_instituicao_nome TEXT
=======
    p_idreservatorio INTEGER,
    p_limit INTEGER DEFAULT NULL,   -- Limite de registros a serem retornados
    p_offset INTEGER DEFAULT NULL     -- Deslocamento (offset)
)
RETURNS TABLE (
    idreservatorio INTEGER,
    nome_reservatorio VARCHAR(50),
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    tc_datahora TIMESTAMP,
    tc_profundidade TEXT,
    tc_tc DOUBLE PRECISION,
    tc_sitio_nome TEXT,
    tc_instituicao_nome TEXT,
    tc_reservatorio_nome TEXT,
    variaveisfisicasquimicasdaagua_datahora TIMESTAMP,
    variaveisfisicasquimicasdaagua_profundidade DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_secchi DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_batimetria DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_f DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_cl DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_nno3 DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_ppo43 DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_sso42 DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_li DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_na DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_nnh4 DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_k DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_mg DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_ca DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_clorofila DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_feofitina DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_turbidez DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_nt DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_pt DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_tdc DOUBLE PRECISION,
    variaveisfisicasquimicasdaagua_sitio_nome TEXT,
    variaveisfisicasquimicasdaagua_instituicao_nome TEXT,
    variaveisfisicasquimicasdaagua_reservatorio_nome TEXT,
    parametrosbiologicosfisicosagua_profundidade DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_secchi DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_tempagua DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_condutividade DOUBLE PRECISION,
    parametrosbiologicosfisicosagua__do DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_ph DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_turbidez DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_materialemsuspensao DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_doc DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_toc DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_poc DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_dic DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_nt DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_pt DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_densidadebacteria DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_biomassabacteria DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_clorofilaa DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_biomassacarbonototalfito DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_densidadetotalfito DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_biomassazoo DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_densidadetotalzoo DOUBLE PRECISION,
    parametrosbiologicosfisicosagua_data_medida DATE,
    parametrosbiologicosfisicosagua_hora_medida TIME,
    parametrosbiologicosfisicosagua_sitio_nome TEXT,
    parametrosbiologicosfisicosagua_instituicao_nome TEXT,
    parametrosbiologicosfisicosagua_reservatorio_nome TEXT,
    nutrientessedimento_profundidade DOUBLE PRECISION,
    nutrientessedimento_batimetria DOUBLE PRECISION,
    nutrientessedimento_nh4 DOUBLE PRECISION,
    nutrientessedimento_no2 DOUBLE PRECISION,
    nutrientessedimento_no3 DOUBLE PRECISION,
    nutrientessedimento_po4 DOUBLE PRECISION,
    nutrientessedimento_ptotal DOUBLE PRECISION,
    nutrientessedimento_ntotal DOUBLE PRECISION,
    nutrientessedimento_data_medida DATE,
    nutrientessedimento_hora_medida TIME,
    nutrientessedimento_sitio_nome TEXT,
    nutrientessedimento_instituicao_nome TEXT,
    nutrientessedimento_reservatorio_nome TEXT,
    medidacamposuperficie_secchi DOUBLE PRECISION,
    medidacamposuperficie_tempagua DOUBLE PRECISION,
    medidacamposuperficie_condutividade DOUBLE PRECISION,
    medidacamposuperficie__do DOUBLE PRECISION,
    medidacamposuperficie_ph DOUBLE PRECISION,
    medidacamposuperficie_turbidez DOUBLE PRECISION,
    medidacamposuperficie_materialemsuspensao DOUBLE PRECISION,
    medidacamposuperficie_data_medida DATE,
    medidacamposuperficie_hora_medida TIME,
    medidacamposuperficie_sitio_nome TEXT,
    medidacamposuperficie_instituicao_nome TEXT,
    medidacamposuperficie_reservatorio_nome TEXT,
    medidacampocoluna_profundidade DOUBLE PRECISION,
    medidacampocoluna_secchi DOUBLE PRECISION,
    medidacampocoluna_tempagua DOUBLE PRECISION,
    medidacampocoluna_condutividade DOUBLE PRECISION,
    medidacampocoluna__do DOUBLE PRECISION,
    medidacampocoluna_ph DOUBLE PRECISION,
    medidacampocoluna_turbidez DOUBLE PRECISION,
    medidacampocoluna_materialemsuspensao DOUBLE PRECISION,
    medidacampocoluna_intensidadeluminosa DOUBLE PRECISION,
    medidacampocoluna_data_medida DATE,
    medidacampocoluna_hora_medida TIME,
    medidacampocoluna_sitio_nome TEXT,
    medidacampocoluna_instituicao_nome TEXT,
    medidacampocoluna_reservatorio_nome TEXT,
    ionsnaaguaintersticialdosedimento_profundidade DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_batimetria DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_f DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_cl DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_no2 DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_br DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_no3 DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_po4 DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_so4 DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_na DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_nh4 DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_k DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_mg DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_ca DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_acetato DOUBLE PRECISION,
    ionsnaaguaintersticialdosedimento_data_medida DATE,
    ionsnaaguaintersticialdosedimento_hora_medida TIME,
    ionsnaaguaintersticialdosedimento_sitio_nome TEXT,
    ionsnaaguaintersticialdosedimento_instituicao_nome TEXT,
    ionsnaaguaintersticialdosedimento_reservatorio_nome TEXT,
    horiba_profundidade DOUBLE PRECISION,
    horiba_tempagua DOUBLE PRECISION,
    horiba_condutividade DOUBLE PRECISION,
    horiba_ph DOUBLE PRECISION,
    horiba__do DOUBLE PRECISION,
    horiba_tds DOUBLE PRECISION,
    horiba_redox DOUBLE PRECISION,
    horiba_turbidez DOUBLE PRECISION,
    horiba_data_medida DATE,
    horiba_hora_medida TIME,
    horiba_sitio_nome TEXT,
    horiba_instituicao_nome TEXT,
    horiba_reservatorio_nome TEXT,
    gasesembolhas_profundidade DOUBLE PRECISION,
    gasesembolhas_co2 DOUBLE PRECISION,
    gasesembolhas_o2 DOUBLE PRECISION,
    gasesembolhas_n2 DOUBLE PRECISION,
    gasesembolhas_ch4 DOUBLE PRECISION,
    gasesembolhas_n2o DOUBLE PRECISION,
    gasesembolhas_data_medida DATE,
    gasesembolhas_hora_medida TIME,
    gasesembolhas_sitio_nome TEXT,
    gasesembolhas_instituicao_nome TEXT,
    gasesembolhas_reservatorio_nome TEXT,
    fluxodifusivoinpe_profundidade DOUBLE PRECISION,
    fluxodifusivoinpe_co2 DOUBLE PRECISION,
    fluxodifusivoinpe_co2_desviopadrao DOUBLE PRECISION,
    fluxodifusivoinpe_co2_amostras INTEGER,
    fluxodifusivoinpe_ch4 DOUBLE PRECISION,
    fluxodifusivoinpe_ch4_desviopadrao DOUBLE PRECISION,
    fluxodifusivoinpe_ch4_amostras INTEGER,
    fluxodifusivoinpe_datamedida DATE,
    fluxodifusivoinpe_horamedida TIME,
    fluxodifusivoinpe_sitio_nome TEXT,
    fluxodifusivoinpe_instituicao_nome TEXT,
    fluxodifusivoinpe_reservatorio_nome TEXT,
    fluxodifusivo_batimetria DOUBLE PRECISION,
    fluxodifusivo_intervalo TEXT,
    fluxodifusivo_ch4 DOUBLE PRECISION,
    fluxodifusivo_co2 DOUBLE PRECISION,
    fluxodifusivo_data_medida DATE,
    fluxodifusivo_hora_medida TIME,
    fluxodifusivo_sitio_nome TEXT,
    fluxodifusivo_instituicao_nome TEXT,
    fluxodifusivo_reservatorio_nome TEXT,
    fluxocarbono_producaofitoplanctonica DOUBLE PRECISION,
    fluxocarbono_carbonoorganicoexcretado DOUBLE PRECISION,
    fluxocarbono_respiracaofito DOUBLE PRECISION,
    fluxocarbono_producaobacteriana DOUBLE PRECISION,
    fluxocarbono_respiracaobacteriana DOUBLE PRECISION,
    fluxocarbono_taxasedimentacao DOUBLE PRECISION,
    fluxocarbono_data_medida DATE,
    fluxocarbono_hora_medida TIME,
    fluxocarbono_sitio_nome TEXT,
    fluxocarbono_instituicao_nome TEXT,
    fluxocarbono_reservatorio_nome TEXT,
    fluxobolhasinpe_profundidade DOUBLE PRECISION,
    fluxobolhasinpe_ch4 DOUBLE PRECISION,
    fluxobolhasinpe_ch4_desviopadrao DOUBLE PRECISION,
    fluxobolhasinpe_ch4_amostras INTEGER,
    fluxobolhasinpe_data_medida DATE,
    fluxobolhasinpe_hora_medida TIME,
    fluxobolhasinpe_sitio_nome TEXT,
    fluxobolhasinpe_instituicao_nome TEXT,
    fluxobolhasinpe_reservatorio_nome TEXT,
    dupladessorcaoagua_profundidade DOUBLE PRECISION,
    dupladessorcaoagua_co2 DOUBLE PRECISION,
    dupladessorcaoagua_o2 DOUBLE PRECISION,
    dupladessorcaoagua_n2 DOUBLE PRECISION,
    dupladessorcaoagua_ch4 DOUBLE PRECISION,
    dupladessorcaoagua_n2o DOUBLE PRECISION,
    dupladessorcaoagua_data_medida DATE,
    dupladessorcaoagua_hora_medida TIME,
    dupladessorcaoagua_sitio_nome TEXT,
    dupladessorcaoagua_instituicao_nome TEXT,
    dupladessorcaoagua_reservatorio_nome TEXT,
    difusao_ch4 DOUBLE PRECISION,
    difusao_co2 DOUBLE PRECISION,
    difusao_n2o DOUBLE PRECISION,
    difusao_ph DOUBLE PRECISION,
    difusao_tempagua DOUBLE PRECISION,
    difusao_tempar DOUBLE PRECISION,
    difusao_profundidade DOUBLE PRECISION,
    difusao_altitude DOUBLE PRECISION,
    difusao_vento DOUBLE PRECISION,
    difusao_data_medida DATE,
    difusao_hora_medida TIME,
    difusao_sitio_nome TEXT,
    difusao_instituicao_nome TEXT,
    difusao_reservatorio_nome TEXT,
    concentracaogassedimento_batimetria DOUBLE PRECISION,
    concentracaogassedimento_profundidadedosedimento DOUBLE PRECISION,
    concentracaogassedimento_replica INTEGER,
    concentracaogassedimento_ch4 DOUBLE PRECISION,
    concentracaogassedimento_co2 DOUBLE PRECISION,
    concentracaogassedimento_data_medida DATE,
    concentracaogassedimento_hora_medida TIME,
    concentracaogassedimento_sitio_nome TEXT,
    concentracaogassedimento_instituicao_nome TEXT,
    concentracaogassedimento_reservatorio_nome TEXT,
    concentracaogasagua_batimetria DOUBLE PRECISION,
    concentracaogasagua_altura DOUBLE PRECISION,
    concentracaogasagua_replica INTEGER,
    concentracaogasagua_ch4 DOUBLE PRECISION,
    concentracaogasagua_co2 DOUBLE PRECISION,
    concentracaogasagua_data_medida DATE,
    concentracaogasagua_hora_medida TIME,
    concentracaogasagua_sitio_nome TEXT,
    concentracaogasagua_instituicao_nome TEXT,
    concentracaogasagua_reservatorio_nome TEXT,
    carbono_dc DOUBLE PRECISION,
    carbono_doc DOUBLE PRECISION,
    carbono_poc DOUBLE PRECISION,
    carbono_toc DOUBLE PRECISION,
    carbono_dic DOUBLE PRECISION,
    carbono_tc DOUBLE PRECISION,
    carbono_data_medida DATE,
    carbono_hora_medida TIME,
    carbono_sitio_nome TEXT,
    carbono_instituicao_nome TEXT,
    carbono_reservatorio_nome TEXT,
    camarasolo_ch4 DOUBLE PRECISION,
    camarasolo_co2 DOUBLE PRECISION,
    camarasolo_n2o DOUBLE PRECISION,
    camarasolo_tempar DOUBLE PRECISION,
    camarasolo_tempsolo DOUBLE PRECISION,
    camarasolo_vento DOUBLE PRECISION,
    camarasolo_altitude DOUBLE PRECISION,
    camarasolo_data_medida DATE,
    camarasolo_hora_medida TIME,
    camarasolo_sitio_nome TEXT,
    camarasolo_instituicao_nome TEXT,
    camarasolo_reservatorio_nome TEXT,
    bolhas_profundidade DOUBLE PRECISION,
    bolhas_nrodefunis INTEGER,
    bolhas_volumecoletado DOUBLE PRECISION,
    bolhas_co2 DOUBLE PRECISION,
    bolhas_o2 DOUBLE PRECISION,
    bolhas_n2 DOUBLE PRECISION,
    bolhas_ch4 DOUBLE PRECISION,
    bolhas_n2o DOUBLE PRECISION,
    bolhas_data_medida DATE,
    bolhas_hora_medida TIME,
    bolhas_sitio_nome TEXT,
    bolhas_instituicao_nome TEXT,
    bolhas_reservatorio_nome TEXT,
    bioticosuperficie_doc DOUBLE PRECISION,
    bioticosuperficie_toc DOUBLE PRECISION,
    bioticosuperficie_poc DOUBLE PRECISION,
    bioticosuperficie_densidadebacteria DOUBLE PRECISION,
    bioticosuperficie_biomassabacteria DOUBLE PRECISION,
    bioticosuperficie_clorofilaa DOUBLE PRECISION,
    bioticosuperficie_biomassacarbonototalfito DOUBLE PRECISION,
    bioticosuperficie_densidadetotalfito DOUBLE PRECISION,
    bioticosuperficie_biomassazoo DOUBLE PRECISION,
    bioticosuperficie_densidadetotalzoo DOUBLE PRECISION,
    bioticosuperficie_data_medida DATE,
    bioticosuperficie_hora_medida TIME,
    bioticosuperficie_sitio_nome TEXT,
    bioticosuperficie_instituicao_nome TEXT,
    bioticosuperficie_reservatorio_nome TEXT,
    bioticocoluna_profundidade DOUBLE PRECISION,
    bioticocoluna_doc DOUBLE PRECISION,
    bioticocoluna_toc DOUBLE PRECISION,
    bioticocoluna_poc DOUBLE PRECISION,
    bioticocoluna_densidadebacteria DOUBLE PRECISION,
    bioticocoluna_biomassabacteria DOUBLE PRECISION,
    bioticocoluna_clorofilaa DOUBLE PRECISION,
    bioticocoluna_biomassacarbonototalfito DOUBLE PRECISION,
    bioticocoluna_densidadetotalfito DOUBLE PRECISION,
    bioticocoluna_biomassazoo DOUBLE PRECISION,
    bioticocoluna_densidadetotalzoo DOUBLE PRECISION,
    bioticocoluna_data_medida DATE,
    bioticocoluna_hora_medida TIME,
    bioticocoluna_sitio_nome TEXT,
    bioticocoluna_instituicao_nome TEXT,
    bioticocoluna_reservatorio_nome TEXT,
    aguamateriaorganicasedimento_profundidade DOUBLE PRECISION,
    aguamateriaorganicasedimento_batimetria DOUBLE PRECISION,
    aguamateriaorganicasedimento_agua DOUBLE PRECISION,
    aguamateriaorganicasedimento_materiaorganica DOUBLE PRECISION,
    aguamateriaorganicasedimento_data_medida DATE,
    aguamateriaorganicasedimento_hora_medida TIME,
    aguamateriaorganicasedimento_sitio_nome TEXT,
    aguamateriaorganicasedimento_instituicao_nome TEXT,
    aguamateriaorganicasedimento_reservatorio_nome TEXT,
    abioticosuperficie_dic DOUBLE PRECISION,
    abioticosuperficie_nt DOUBLE PRECISION,
    abioticosuperficie_pt DOUBLE PRECISION,
    abioticosuperficie_delta13c DOUBLE PRECISION,
    abioticosuperficie_delta15n DOUBLE PRECISION,
    abioticosuperficie_data_medida DATE,
    abioticosuperficie_hora_medida TIME,
    abioticosuperficie_sitio_nome TEXT,
    abioticosuperficie_instituicao_nome TEXT,
    abioticosuperficie_reservatorio_nome TEXT,
    abioticocoluna_profundidade DOUBLE PRECISION,
    abioticocoluna_dic DOUBLE PRECISION,
    abioticocoluna_nt DOUBLE PRECISION,
    abioticocoluna_pt DOUBLE PRECISION,
    abioticocoluna_delta13c DOUBLE PRECISION,
    abioticocoluna_delta15n DOUBLE PRECISION,
    abioticocoluna_data_medida DATE,
    abioticocoluna_hora_medida TIME,
    abioticocoluna_sitio_nome TEXT,
    abioticocoluna_instituicao_nome TEXT,
>>>>>>> QA
    abioticocoluna_reservatorio_nome TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
<<<<<<< HEAD
        r.idreservatorio
        r.nome AS nome_reservatorio
        r.lat
        r.lng
        COALESCE(tc.datahora, NULL) AS tc_datahora
        COALESCE(tc.profundidade, NULL) AS tc_profundidade
        COALESCE(tc.tc, NULL) AS tc_tc
        COALESCE(tc.sitio_nome, NULL) AS tc_sitio_nome
        COALESCE(tc.instituicao_nome, NULL) AS tc_instituicao_nome
        COALESCE(tc.reservatorio_nome, NULL) AS tc_reservatorio_nome
        COALESCE(variaveisfisicasquimicasdaagua.datahora, NULL) AS variaveisfisicasquimicasdaagua_datahora
        COALESCE(variaveisfisicasquimicasdaagua.profundidade, NULL) AS variaveisfisicasquimicasdaagua_profundidade
        COALESCE(variaveisfisicasquimicasdaagua.secchi, NULL) AS variaveisfisicasquimicasdaagua_secchi
        COALESCE(variaveisfisicasquimicasdaagua.batimetria, NULL) AS variaveisfisicasquimicasdaagua_batimetria
        COALESCE(variaveisfisicasquimicasdaagua.f, NULL) AS variaveisfisicasquimicasdaagua_f
        COALESCE(variaveisfisicasquimicasdaagua.cl, NULL) AS variaveisfisicasquimicasdaagua_cl
        COALESCE(variaveisfisicasquimicasdaagua.nno3, NULL) AS variaveisfisicasquimicasdaagua_nno3
        COALESCE(variaveisfisicasquimicasdaagua.ppo43, NULL) AS variaveisfisicasquimicasdaagua_ppo43
        COALESCE(variaveisfisicasquimicasdaagua.sso42, NULL) AS variaveisfisicasquimicasdaagua_sso42
        COALESCE(variaveisfisicasquimicasdaagua.li, NULL) AS variaveisfisicasquimicasdaagua_li
        COALESCE(variaveisfisicasquimicasdaagua.na, NULL) AS variaveisfisicasquimicasdaagua_na
        COALESCE(variaveisfisicasquimicasdaagua.nnh4, NULL) AS variaveisfisicasquimicasdaagua_nnh4
        COALESCE(variaveisfisicasquimicasdaagua.k, NULL) AS variaveisfisicasquimicasdaagua_k
        COALESCE(variaveisfisicasquimicasdaagua.mg, NULL) AS variaveisfisicasquimicasdaagua_mg
        COALESCE(variaveisfisicasquimicasdaagua.ca, NULL) AS variaveisfisicasquimicasdaagua_ca
        COALESCE(variaveisfisicasquimicasdaagua.clorofila, NULL) AS variaveisfisicasquimicasdaagua_clorofila
        COALESCE(variaveisfisicasquimicasdaagua.feofitina, NULL) AS variaveisfisicasquimicasdaagua_feofitina
        COALESCE(variaveisfisicasquimicasdaagua.turbidez, NULL) AS variaveisfisicasquimicasdaagua_turbidez
        COALESCE(variaveisfisicasquimicasdaagua.nt, NULL) AS variaveisfisicasquimicasdaagua_nt
        COALESCE(variaveisfisicasquimicasdaagua.pt, NULL) AS variaveisfisicasquimicasdaagua_pt
        COALESCE(variaveisfisicasquimicasdaagua.tdc, NULL) AS variaveisfisicasquimicasdaagua_tdc
        COALESCE(variaveisfisicasquimicasdaagua.sitio_nome, NULL) AS variaveisfisicasquimicasdaagua_sitio_nome
        COALESCE(variaveisfisicasquimicasdaagua.instituicao_nome, NULL) AS variaveisfisicasquimicasdaagua_instituicao_nome
        COALESCE(variaveisfisicasquimicasdaagua.reservatorio_nome, NULL) AS variaveisfisicasquimicasdaagua_reservatorio_nome
        COALESCE(parametrosbiologicosfisicosagua.profundidade, NULL) AS parametrosbiologicosfisicosagua_profundidade
        COALESCE(parametrosbiologicosfisicosagua.secchi, NULL) AS parametrosbiologicosfisicosagua_secchi
        COALESCE(parametrosbiologicosfisicosagua.tempagua, NULL) AS parametrosbiologicosfisicosagua_tempagua
        COALESCE(parametrosbiologicosfisicosagua.condutividade, NULL) AS parametrosbiologicosfisicosagua_condutividade
        COALESCE(parametrosbiologicosfisicosagua._do, NULL) AS parametrosbiologicosfisicosagua__do
        COALESCE(parametrosbiologicosfisicosagua.ph, NULL) AS parametrosbiologicosfisicosagua_ph
        COALESCE(parametrosbiologicosfisicosagua.turbidez, NULL) AS parametrosbiologicosfisicosagua_turbidez
        COALESCE(parametrosbiologicosfisicosagua.materialemsuspensao, NULL) AS parametrosbiologicosfisicosagua_materialemsuspensao
        COALESCE(parametrosbiologicosfisicosagua.doc, NULL) AS parametrosbiologicosfisicosagua_doc
        COALESCE(parametrosbiologicosfisicosagua.toc, NULL) AS parametrosbiologicosfisicosagua_toc
        COALESCE(parametrosbiologicosfisicosagua.poc, NULL) AS parametrosbiologicosfisicosagua_poc
        COALESCE(parametrosbiologicosfisicosagua.dic, NULL) AS parametrosbiologicosfisicosagua_dic
        COALESCE(parametrosbiologicosfisicosagua.nt, NULL) AS parametrosbiologicosfisicosagua_nt
        COALESCE(parametrosbiologicosfisicosagua.pt, NULL) AS parametrosbiologicosfisicosagua_pt
        COALESCE(parametrosbiologicosfisicosagua.densidadebacteria, NULL) AS parametrosbiologicosfisicosagua_densidadebacteria
        COALESCE(parametrosbiologicosfisicosagua.biomassabacteria, NULL) AS parametrosbiologicosfisicosagua_biomassabacteria
        COALESCE(parametrosbiologicosfisicosagua.clorofilaa, NULL) AS parametrosbiologicosfisicosagua_clorofilaa
        COALESCE(parametrosbiologicosfisicosagua.biomassacarbonototalfito, NULL) AS parametrosbiologicosfisicosagua_biomassacarbonototalfito
        COALESCE(parametrosbiologicosfisicosagua.densidadetotalfito, NULL) AS parametrosbiologicosfisicosagua_densidadetotalfito
        COALESCE(parametrosbiologicosfisicosagua.biomassazoo, NULL) AS parametrosbiologicosfisicosagua_biomassazoo
        COALESCE(parametrosbiologicosfisicosagua.densidadetotalzoo, NULL) AS parametrosbiologicosfisicosagua_densidadetotalzoo
        COALESCE(parametrosbiologicosfisicosagua.data_medida, NULL) AS parametrosbiologicosfisicosagua_data_medida
        COALESCE(parametrosbiologicosfisicosagua.hora_medida, NULL) AS parametrosbiologicosfisicosagua_hora_medida
        COALESCE(parametrosbiologicosfisicosagua.sitio_nome, NULL) AS parametrosbiologicosfisicosagua_sitio_nome
        COALESCE(parametrosbiologicosfisicosagua.instituicao_nome, NULL) AS parametrosbiologicosfisicosagua_instituicao_nome
        COALESCE(parametrosbiologicosfisicosagua.reservatorio_nome, NULL) AS parametrosbiologicosfisicosagua_reservatorio_nome
        COALESCE(nutrientessedimento.profundidade, NULL) AS nutrientessedimento_profundidade
        COALESCE(nutrientessedimento.batimetria, NULL) AS nutrientessedimento_batimetria
        COALESCE(nutrientessedimento.nh4, NULL) AS nutrientessedimento_nh4
        COALESCE(nutrientessedimento.no2, NULL) AS nutrientessedimento_no2
        COALESCE(nutrientessedimento.no3, NULL) AS nutrientessedimento_no3
        COALESCE(nutrientessedimento.po4, NULL) AS nutrientessedimento_po4
        COALESCE(nutrientessedimento.ptotal, NULL) AS nutrientessedimento_ptotal
        COALESCE(nutrientessedimento.ntotal, NULL) AS nutrientessedimento_ntotal
        COALESCE(nutrientessedimento.data_medida, NULL) AS nutrientessedimento_data_medida
        COALESCE(nutrientessedimento.hora_medida, NULL) AS nutrientessedimento_hora_medida
        COALESCE(nutrientessedimento.sitio_nome, NULL) AS nutrientessedimento_sitio_nome
        COALESCE(nutrientessedimento.instituicao_nome, NULL) AS nutrientessedimento_instituicao_nome
        COALESCE(nutrientessedimento.reservatorio_nome, NULL) AS nutrientessedimento_reservatorio_nome
        COALESCE(medidacamposuperficie.secchi, NULL) AS medidacamposuperficie_secchi
        COALESCE(medidacamposuperficie.tempagua, NULL) AS medidacamposuperficie_tempagua
        COALESCE(medidacamposuperficie.condutividade, NULL) AS medidacamposuperficie_condutividade
        COALESCE(medidacamposuperficie._do, NULL) AS medidacamposuperficie__do
        COALESCE(medidacamposuperficie.ph, NULL) AS medidacamposuperficie_ph
        COALESCE(medidacamposuperficie.turbidez, NULL) AS medidacamposuperficie_turbidez
        COALESCE(medidacamposuperficie.materialemsuspensao, NULL) AS medidacamposuperficie_materialemsuspensao
        COALESCE(medidacamposuperficie.data_medida, NULL) AS medidacamposuperficie_data_medida
        COALESCE(medidacamposuperficie.hora_medida, NULL) AS medidacamposuperficie_hora_medida
        COALESCE(medidacamposuperficie.sitio_nome, NULL) AS medidacamposuperficie_sitio_nome
        COALESCE(medidacamposuperficie.instituicao_nome, NULL) AS medidacamposuperficie_instituicao_nome
        COALESCE(medidacamposuperficie.reservatorio_nome, NULL) AS medidacamposuperficie_reservatorio_nome
        COALESCE(medidacampocoluna.profundidade, NULL) AS medidacampocoluna_profundidade
        COALESCE(medidacampocoluna.secchi, NULL) AS medidacampocoluna_secchi
        COALESCE(medidacampocoluna.tempagua, NULL) AS medidacampocoluna_tempagua
        COALESCE(medidacampocoluna.condutividade, NULL) AS medidacampocoluna_condutividade
        COALESCE(medidacampocoluna._do, NULL) AS medidacampocoluna__do
        COALESCE(medidacampocoluna.ph, NULL) AS medidacampocoluna_ph
        COALESCE(medidacampocoluna.turbidez, NULL) AS medidacampocoluna_turbidez
        COALESCE(medidacampocoluna.materialemsuspensao, NULL) AS medidacampocoluna_materialemsuspensao
        COALESCE(medidacampocoluna.intensidadeluminosa, NULL) AS medidacampocoluna_intensidadeluminosa
        COALESCE(medidacampocoluna.data_medida, NULL) AS medidacampocoluna_data_medida
        COALESCE(medidacampocoluna.hora_medida, NULL) AS medidacampocoluna_hora_medida
        COALESCE(medidacampocoluna.sitio_nome, NULL) AS medidacampocoluna_sitio_nome
        COALESCE(medidacampocoluna.instituicao_nome, NULL) AS medidacampocoluna_instituicao_nome
        COALESCE(medidacampocoluna.reservatorio_nome, NULL) AS medidacampocoluna_reservatorio_nome
        COALESCE(ionsnaaguaintersticialdosedimento.profundidade, NULL) AS ionsnaaguaintersticialdosedimento_profundidade
        COALESCE(ionsnaaguaintersticialdosedimento.batimetria, NULL) AS ionsnaaguaintersticialdosedimento_batimetria
        COALESCE(ionsnaaguaintersticialdosedimento.f, NULL) AS ionsnaaguaintersticialdosedimento_f
        COALESCE(ionsnaaguaintersticialdosedimento.cl, NULL) AS ionsnaaguaintersticialdosedimento_cl
        COALESCE(ionsnaaguaintersticialdosedimento.no2, NULL) AS ionsnaaguaintersticialdosedimento_no2
        COALESCE(ionsnaaguaintersticialdosedimento.br, NULL) AS ionsnaaguaintersticialdosedimento_br
        COALESCE(ionsnaaguaintersticialdosedimento.no3, NULL) AS ionsnaaguaintersticialdosedimento_no3
        COALESCE(ionsnaaguaintersticialdosedimento.po4, NULL) AS ionsnaaguaintersticialdosedimento_po4
        COALESCE(ionsnaaguaintersticialdosedimento.so4, NULL) AS ionsnaaguaintersticialdosedimento_so4
        COALESCE(ionsnaaguaintersticialdosedimento.na, NULL) AS ionsnaaguaintersticialdosedimento_na
        COALESCE(ionsnaaguaintersticialdosedimento.nh4, NULL) AS ionsnaaguaintersticialdosedimento_nh4
        COALESCE(ionsnaaguaintersticialdosedimento.k, NULL) AS ionsnaaguaintersticialdosedimento_k
        COALESCE(ionsnaaguaintersticialdosedimento.mg, NULL) AS ionsnaaguaintersticialdosedimento_mg
        COALESCE(ionsnaaguaintersticialdosedimento.ca, NULL) AS ionsnaaguaintersticialdosedimento_ca
        COALESCE(ionsnaaguaintersticialdosedimento.acetato, NULL) AS ionsnaaguaintersticialdosedimento_acetato
        COALESCE(ionsnaaguaintersticialdosedimento.data_medida, NULL) AS ionsnaaguaintersticialdosedimento_data_medida
        COALESCE(ionsnaaguaintersticialdosedimento.hora_medida, NULL) AS ionsnaaguaintersticialdosedimento_hora_medida
        COALESCE(ionsnaaguaintersticialdosedimento.sitio_nome, NULL) AS ionsnaaguaintersticialdosedimento_sitio_nome
        COALESCE(ionsnaaguaintersticialdosedimento.instituicao_nome, NULL) AS ionsnaaguaintersticialdosedimento_instituicao_nome
        COALESCE(ionsnaaguaintersticialdosedimento.reservatorio_nome, NULL) AS ionsnaaguaintersticialdosedimento_reservatorio_nome
        COALESCE(horiba.profundidade, NULL) AS horiba_profundidade
        COALESCE(horiba.tempagua, NULL) AS horiba_tempagua
        COALESCE(horiba.condutividade, NULL) AS horiba_condutividade
        COALESCE(horiba.ph, NULL) AS horiba_ph
        COALESCE(horiba._do, NULL) AS horiba__do
        COALESCE(horiba.tds, NULL) AS horiba_tds
        COALESCE(horiba.redox, NULL) AS horiba_redox
        COALESCE(horiba.turbidez, NULL) AS horiba_turbidez
        COALESCE(horiba.data_medida, NULL) AS horiba_data_medida
        COALESCE(horiba.hora_medida, NULL) AS horiba_hora_medida
        COALESCE(horiba.sitio_nome, NULL) AS horiba_sitio_nome
        COALESCE(horiba.instituicao_nome, NULL) AS horiba_instituicao_nome
        COALESCE(horiba.reservatorio_nome, NULL) AS horiba_reservatorio_nome
        COALESCE(gasesembolhas.profundidade, NULL) AS gasesembolhas_profundidade
        COALESCE(gasesembolhas.co2, NULL) AS gasesembolhas_co2
        COALESCE(gasesembolhas.o2, NULL) AS gasesembolhas_o2
        COALESCE(gasesembolhas.n2, NULL) AS gasesembolhas_n2
        COALESCE(gasesembolhas.ch4, NULL) AS gasesembolhas_ch4
        COALESCE(gasesembolhas.n2o, NULL) AS gasesembolhas_n2o
        COALESCE(gasesembolhas.data_medida, NULL) AS gasesembolhas_data_medida
        COALESCE(gasesembolhas.hora_medida, NULL) AS gasesembolhas_hora_medida
        COALESCE(gasesembolhas.sitio_nome, NULL) AS gasesembolhas_sitio_nome
        COALESCE(gasesembolhas.instituicao_nome, NULL) AS gasesembolhas_instituicao_nome
        COALESCE(gasesembolhas.reservatorio_nome, NULL) AS gasesembolhas_reservatorio_nome
        COALESCE(fluxodifusivoinpe.profundidade, NULL) AS fluxodifusivoinpe_profundidade
        COALESCE(fluxodifusivoinpe.co2, NULL) AS fluxodifusivoinpe_co2
        COALESCE(fluxodifusivoinpe.co2_desviopadrao, NULL) AS fluxodifusivoinpe_co2_desviopadrao
        COALESCE(fluxodifusivoinpe.co2_amostras, NULL) AS fluxodifusivoinpe_co2_amostras
        COALESCE(fluxodifusivoinpe.ch4, NULL) AS fluxodifusivoinpe_ch4
        COALESCE(fluxodifusivoinpe.ch4_desviopadrao, NULL) AS fluxodifusivoinpe_ch4_desviopadrao
        COALESCE(fluxodifusivoinpe.ch4_amostras, NULL) AS fluxodifusivoinpe_ch4_amostras
        COALESCE(fluxodifusivoinpe.datamedida, NULL) AS fluxodifusivoinpe_datamedida
        COALESCE(fluxodifusivoinpe.horamedida, NULL) AS fluxodifusivoinpe_horamedida
        COALESCE(fluxodifusivoinpe.sitio_nome, NULL) AS fluxodifusivoinpe_sitio_nome
        COALESCE(fluxodifusivoinpe.instituicao_nome, NULL) AS fluxodifusivoinpe_instituicao_nome
        COALESCE(fluxodifusivoinpe.reservatorio_nome, NULL) AS fluxodifusivoinpe_reservatorio_nome
        COALESCE(fluxodifusivo.batimetria, NULL) AS fluxodifusivo_batimetria
        COALESCE(fluxodifusivo.intervalo, NULL) AS fluxodifusivo_intervalo
        COALESCE(fluxodifusivo.ch4, NULL) AS fluxodifusivo_ch4
        COALESCE(fluxodifusivo.co2, NULL) AS fluxodifusivo_co2
        COALESCE(fluxodifusivo.data_medida, NULL) AS fluxodifusivo_data_medida
        COALESCE(fluxodifusivo.hora_medida, NULL) AS fluxodifusivo_hora_medida
        COALESCE(fluxodifusivo.sitio_nome, NULL) AS fluxodifusivo_sitio_nome
        COALESCE(fluxodifusivo.instituicao_nome, NULL) AS fluxodifusivo_instituicao_nome
        COALESCE(fluxodifusivo.reservatorio_nome, NULL) AS fluxodifusivo_reservatorio_nome
        COALESCE(fluxocarbono.producaofitoplanctonica, NULL) AS fluxocarbono_producaofitoplanctonica
        COALESCE(fluxocarbono.carbonoorganicoexcretado, NULL) AS fluxocarbono_carbonoorganicoexcretado
        COALESCE(fluxocarbono.respiracaofito, NULL) AS fluxocarbono_respiracaofito
        COALESCE(fluxocarbono.producaobacteriana, NULL) AS fluxocarbono_producaobacteriana
        COALESCE(fluxocarbono.respiracaobacteriana, NULL) AS fluxocarbono_respiracaobacteriana
        COALESCE(fluxocarbono.taxasedimentacao, NULL) AS fluxocarbono_taxasedimentacao
        COALESCE(fluxocarbono.data_medida, NULL) AS fluxocarbono_data_medida
        COALESCE(fluxocarbono.hora_medida, NULL) AS fluxocarbono_hora_medida
        COALESCE(fluxocarbono.sitio_nome, NULL) AS fluxocarbono_sitio_nome
        COALESCE(fluxocarbono.instituicao_nome, NULL) AS fluxocarbono_instituicao_nome
        COALESCE(fluxocarbono.reservatorio_nome, NULL) AS fluxocarbono_reservatorio_nome
        COALESCE(fluxobolhasinpe.profundidade, NULL) AS fluxobolhasinpe_profundidade
        COALESCE(fluxobolhasinpe.ch4, NULL) AS fluxobolhasinpe_ch4
        COALESCE(fluxobolhasinpe.ch4_desviopadrao, NULL) AS fluxobolhasinpe_ch4_desviopadrao
        COALESCE(fluxobolhasinpe.ch4_amostras, NULL) AS fluxobolhasinpe_ch4_amostras
        COALESCE(fluxobolhasinpe.data_medida, NULL) AS fluxobolhasinpe_data_medida
        COALESCE(fluxobolhasinpe.hora_medida, NULL) AS fluxobolhasinpe_hora_medida
        COALESCE(fluxobolhasinpe.sitio_nome, NULL) AS fluxobolhasinpe_sitio_nome
        COALESCE(fluxobolhasinpe.instituicao_nome, NULL) AS fluxobolhasinpe_instituicao_nome
        COALESCE(fluxobolhasinpe.reservatorio_nome, NULL) AS fluxobolhasinpe_reservatorio_nome
        COALESCE(dupladessorcaoagua.profundidade, NULL) AS dupladessorcaoagua_profundidade
        COALESCE(dupladessorcaoagua.co2, NULL) AS dupladessorcaoagua_co2
        COALESCE(dupladessorcaoagua.o2, NULL) AS dupladessorcaoagua_o2
        COALESCE(dupladessorcaoagua.n2, NULL) AS dupladessorcaoagua_n2
        COALESCE(dupladessorcaoagua.ch4, NULL) AS dupladessorcaoagua_ch4
        COALESCE(dupladessorcaoagua.n2o, NULL) AS dupladessorcaoagua_n2o
        COALESCE(dupladessorcaoagua.data_medida, NULL) AS dupladessorcaoagua_data_medida
        COALESCE(dupladessorcaoagua.hora_medida, NULL) AS dupladessorcaoagua_hora_medida
        COALESCE(dupladessorcaoagua.sitio_nome, NULL) AS dupladessorcaoagua_sitio_nome
        COALESCE(dupladessorcaoagua.instituicao_nome, NULL) AS dupladessorcaoagua_instituicao_nome
        COALESCE(dupladessorcaoagua.reservatorio_nome, NULL) AS dupladessorcaoagua_reservatorio_nome
        COALESCE(difusao.ch4, NULL) AS difusao_ch4
        COALESCE(difusao.co2, NULL) AS difusao_co2
        COALESCE(difusao.n2o, NULL) AS difusao_n2o
        COALESCE(difusao.ph, NULL) AS difusao_ph
        COALESCE(difusao.tempagua, NULL) AS difusao_tempagua
        COALESCE(difusao.tempar, NULL) AS difusao_tempar
        COALESCE(difusao.profundidade, NULL) AS difusao_profundidade
        COALESCE(difusao.altitude, NULL) AS difusao_altitude
        COALESCE(difusao.vento, NULL) AS difusao_vento
        COALESCE(difusao.data_medida, NULL) AS difusao_data_medida
        COALESCE(difusao.hora_medida, NULL) AS difusao_hora_medida
        COALESCE(difusao.sitio_nome, NULL) AS difusao_sitio_nome
        COALESCE(difusao.instituicao_nome, NULL) AS difusao_instituicao_nome
        COALESCE(difusao.reservatorio_nome, NULL) AS difusao_reservatorio_nome
        COALESCE(concentracaogassedimento.batimetria, NULL) AS concentracaogassedimento_batimetria
        COALESCE(concentracaogassedimento.profundidadedosedimento, NULL) AS concentracaogassedimento_profundidadedosedimento
        COALESCE(concentracaogassedimento.replica, NULL) AS concentracaogassedimento_replica
        COALESCE(concentracaogassedimento.ch4, NULL) AS concentracaogassedimento_ch4
        COALESCE(concentracaogassedimento.co2, NULL) AS concentracaogassedimento_co2
        COALESCE(concentracaogassedimento.data_medida, NULL) AS concentracaogassedimento_data_medida
        COALESCE(concentracaogassedimento.hora_medida, NULL) AS concentracaogassedimento_hora_medida
        COALESCE(concentracaogassedimento.sitio_nome, NULL) AS concentracaogassedimento_sitio_nome
        COALESCE(concentracaogassedimento.instituicao_nome, NULL) AS concentracaogassedimento_instituicao_nome
        COALESCE(concentracaogassedimento.reservatorio_nome, NULL) AS concentracaogassedimento_reservatorio_nome
        COALESCE(concentracaogasagua.batimetria, NULL) AS concentracaogasagua_batimetria
        COALESCE(concentracaogasagua.altura, NULL) AS concentracaogasagua_altura
        COALESCE(concentracaogasagua.replica, NULL) AS concentracaogasagua_replica
        COALESCE(concentracaogasagua.ch4, NULL) AS concentracaogasagua_ch4
        COALESCE(concentracaogasagua.co2, NULL) AS concentracaogasagua_co2
        COALESCE(concentracaogasagua.data_medida, NULL) AS concentracaogasagua_data_medida
        COALESCE(concentracaogasagua.hora_medida, NULL) AS concentracaogasagua_hora_medida
        COALESCE(concentracaogasagua.sitio_nome, NULL) AS concentracaogasagua_sitio_nome
        COALESCE(concentracaogasagua.instituicao_nome, NULL) AS concentracaogasagua_instituicao_nome
        COALESCE(concentracaogasagua.reservatorio_nome, NULL) AS concentracaogasagua_reservatorio_nome
        COALESCE(carbono.dc, NULL) AS carbono_dc
        COALESCE(carbono.doc, NULL) AS carbono_doc
        COALESCE(carbono.poc, NULL) AS carbono_poc
        COALESCE(carbono.toc, NULL) AS carbono_toc
        COALESCE(carbono.dic, NULL) AS carbono_dic
        COALESCE(carbono.tc, NULL) AS carbono_tc
        COALESCE(carbono.data_medida, NULL) AS carbono_data_medida
        COALESCE(carbono.hora_medida, NULL) AS carbono_hora_medida
        COALESCE(carbono.sitio_nome, NULL) AS carbono_sitio_nome
        COALESCE(carbono.instituicao_nome, NULL) AS carbono_instituicao_nome
        COALESCE(carbono.reservatorio_nome, NULL) AS carbono_reservatorio_nome
        COALESCE(camarasolo.ch4, NULL) AS camarasolo_ch4
        COALESCE(camarasolo.co2, NULL) AS camarasolo_co2
        COALESCE(camarasolo.n2o, NULL) AS camarasolo_n2o
        COALESCE(camarasolo.tempar, NULL) AS camarasolo_tempar
        COALESCE(camarasolo.tempsolo, NULL) AS camarasolo_tempsolo
        COALESCE(camarasolo.vento, NULL) AS camarasolo_vento
        COALESCE(camarasolo.altitude, NULL) AS camarasolo_altitude
        COALESCE(camarasolo.data_medida, NULL) AS camarasolo_data_medida
        COALESCE(camarasolo.hora_medida, NULL) AS camarasolo_hora_medida
        COALESCE(camarasolo.sitio_nome, NULL) AS camarasolo_sitio_nome
        COALESCE(camarasolo.instituicao_nome, NULL) AS camarasolo_instituicao_nome
        COALESCE(camarasolo.reservatorio_nome, NULL) AS camarasolo_reservatorio_nome
        COALESCE(bolhas.profundidade, NULL) AS bolhas_profundidade
        COALESCE(bolhas.nrodefunis, NULL) AS bolhas_nrodefunis
        COALESCE(bolhas.volumecoletado, NULL) AS bolhas_volumecoletado
        COALESCE(bolhas.co2, NULL) AS bolhas_co2
        COALESCE(bolhas.o2, NULL) AS bolhas_o2
        COALESCE(bolhas.n2, NULL) AS bolhas_n2
        COALESCE(bolhas.ch4, NULL) AS bolhas_ch4
        COALESCE(bolhas.n2o, NULL) AS bolhas_n2o
        COALESCE(bolhas.data_medida, NULL) AS bolhas_data_medida
        COALESCE(bolhas.hora_medida, NULL) AS bolhas_hora_medida
        COALESCE(bolhas.sitio_nome, NULL) AS bolhas_sitio_nome
        COALESCE(bolhas.instituicao_nome, NULL) AS bolhas_instituicao_nome
        COALESCE(bolhas.reservatorio_nome, NULL) AS bolhas_reservatorio_nome
        COALESCE(bioticosuperficie.doc, NULL) AS bioticosuperficie_doc
        COALESCE(bioticosuperficie.toc, NULL) AS bioticosuperficie_toc
        COALESCE(bioticosuperficie.poc, NULL) AS bioticosuperficie_poc
        COALESCE(bioticosuperficie.densidadebacteria, NULL) AS bioticosuperficie_densidadebacteria
        COALESCE(bioticosuperficie.biomassabacteria, NULL) AS bioticosuperficie_biomassabacteria
        COALESCE(bioticosuperficie.clorofilaa, NULL) AS bioticosuperficie_clorofilaa
        COALESCE(bioticosuperficie.biomassacarbonototalfito, NULL) AS bioticosuperficie_biomassacarbonototalfito
        COALESCE(bioticosuperficie.densidadetotalfito, NULL) AS bioticosuperficie_densidadetotalfito
        COALESCE(bioticosuperficie.biomassazoo, NULL) AS bioticosuperficie_biomassazoo
        COALESCE(bioticosuperficie.densidadetotalzoo, NULL) AS bioticosuperficie_densidadetotalzoo
        COALESCE(bioticosuperficie.data_medida, NULL) AS bioticosuperficie_data_medida
        COALESCE(bioticosuperficie.hora_medida, NULL) AS bioticosuperficie_hora_medida
        COALESCE(bioticosuperficie.sitio_nome, NULL) AS bioticosuperficie_sitio_nome
        COALESCE(bioticosuperficie.instituicao_nome, NULL) AS bioticosuperficie_instituicao_nome
        COALESCE(bioticosuperficie.reservatorio_nome, NULL) AS bioticosuperficie_reservatorio_nome
        COALESCE(bioticocoluna.profundidade, NULL) AS bioticocoluna_profundidade
        COALESCE(bioticocoluna.doc, NULL) AS bioticocoluna_doc
        COALESCE(bioticocoluna.toc, NULL) AS bioticocoluna_toc
        COALESCE(bioticocoluna.poc, NULL) AS bioticocoluna_poc
        COALESCE(bioticocoluna.densidadebacteria, NULL) AS bioticocoluna_densidadebacteria
        COALESCE(bioticocoluna.biomassabacteria, NULL) AS bioticocoluna_biomassabacteria
        COALESCE(bioticocoluna.clorofilaa, NULL) AS bioticocoluna_clorofilaa
        COALESCE(bioticocoluna.biomassacarbonototalfito, NULL) AS bioticocoluna_biomassacarbonototalfito
        COALESCE(bioticocoluna.densidadetotalfito, NULL) AS bioticocoluna_densidadetotalfito
        COALESCE(bioticocoluna.biomassazoo, NULL) AS bioticocoluna_biomassazoo
        COALESCE(bioticocoluna.densidadetotalzoo, NULL) AS bioticocoluna_densidadetotalzoo
        COALESCE(bioticocoluna.data_medida, NULL) AS bioticocoluna_data_medida
        COALESCE(bioticocoluna.hora_medida, NULL) AS bioticocoluna_hora_medida
        COALESCE(bioticocoluna.sitio_nome, NULL) AS bioticocoluna_sitio_nome
        COALESCE(bioticocoluna.instituicao_nome, NULL) AS bioticocoluna_instituicao_nome
        COALESCE(bioticocoluna.reservatorio_nome, NULL) AS bioticocoluna_reservatorio_nome
        COALESCE(aguamateriaorganicasedimento.profundidade, NULL) AS aguamateriaorganicasedimento_profundidade
        COALESCE(aguamateriaorganicasedimento.batimetria, NULL) AS aguamateriaorganicasedimento_batimetria
        COALESCE(aguamateriaorganicasedimento.agua, NULL) AS aguamateriaorganicasedimento_agua
        COALESCE(aguamateriaorganicasedimento.materiaorganica, NULL) AS aguamateriaorganicasedimento_materiaorganica
        COALESCE(aguamateriaorganicasedimento.data_medida, NULL) AS aguamateriaorganicasedimento_data_medida
        COALESCE(aguamateriaorganicasedimento.hora_medida, NULL) AS aguamateriaorganicasedimento_hora_medida
        COALESCE(aguamateriaorganicasedimento.sitio_nome, NULL) AS aguamateriaorganicasedimento_sitio_nome
        COALESCE(aguamateriaorganicasedimento.instituicao_nome, NULL) AS aguamateriaorganicasedimento_instituicao_nome
        COALESCE(aguamateriaorganicasedimento.reservatorio_nome, NULL) AS aguamateriaorganicasedimento_reservatorio_nome
        COALESCE(abioticosuperficie.dic, NULL) AS abioticosuperficie_dic
        COALESCE(abioticosuperficie.nt, NULL) AS abioticosuperficie_nt
        COALESCE(abioticosuperficie.pt, NULL) AS abioticosuperficie_pt
        COALESCE(abioticosuperficie.delta13c, NULL) AS abioticosuperficie_delta13c
        COALESCE(abioticosuperficie.delta15n, NULL) AS abioticosuperficie_delta15n
        COALESCE(abioticosuperficie.data_medida, NULL) AS abioticosuperficie_data_medida
        COALESCE(abioticosuperficie.hora_medida, NULL) AS abioticosuperficie_hora_medida
        COALESCE(abioticosuperficie.sitio_nome, NULL) AS abioticosuperficie_sitio_nome
        COALESCE(abioticosuperficie.instituicao_nome, NULL) AS abioticosuperficie_instituicao_nome
        COALESCE(abioticosuperficie.reservatorio_nome, NULL) AS abioticosuperficie_reservatorio_nome
        COALESCE(abioticocoluna.profundidade, NULL) AS abioticocoluna_profundidade
        COALESCE(abioticocoluna.dic, NULL) AS abioticocoluna_dic
        COALESCE(abioticocoluna.nt, NULL) AS abioticocoluna_nt
        COALESCE(abioticocoluna.pt, NULL) AS abioticocoluna_pt
        COALESCE(abioticocoluna.delta13c, NULL) AS abioticocoluna_delta13c
        COALESCE(abioticocoluna.delta15n, NULL) AS abioticocoluna_delta15n
        COALESCE(abioticocoluna.data_medida, NULL) AS abioticocoluna_data_medida
        COALESCE(abioticocoluna.hora_medida, NULL) AS abioticocoluna_hora_medida
        COALESCE(abioticocoluna.sitio_nome, NULL) AS abioticocoluna_sitio_nome
        COALESCE(abioticocoluna.instituicao_nome, NULL) AS abioticocoluna_instituicao_nome
=======
        r.idreservatorio,
        r.nome AS nome_reservatorio,
        r.lat,
        r.lng,
        COALESCE(tc.datahora, NULL) AS tc_datahora,
        COALESCE(tc.profundidade, NULL) AS tc_profundidade,
        COALESCE(tc.tc, NULL) AS tc_tc,
        COALESCE(tc.sitio_nome, NULL) AS tc_sitio_nome,
        COALESCE(tc.instituicao_nome, NULL) AS tc_instituicao_nome,
        COALESCE(tc.reservatorio_nome, NULL) AS tc_reservatorio_nome,
        COALESCE(variaveisfisicasquimicasdaagua.datahora, NULL) AS variaveisfisicasquimicasdaagua_datahora,
        COALESCE(variaveisfisicasquimicasdaagua.profundidade, NULL) AS variaveisfisicasquimicasdaagua_profundidade,
        COALESCE(variaveisfisicasquimicasdaagua.secchi, NULL) AS variaveisfisicasquimicasdaagua_secchi,
        COALESCE(variaveisfisicasquimicasdaagua.batimetria, NULL) AS variaveisfisicasquimicasdaagua_batimetria,
        COALESCE(variaveisfisicasquimicasdaagua.f, NULL) AS variaveisfisicasquimicasdaagua_f,
        COALESCE(variaveisfisicasquimicasdaagua.cl, NULL) AS variaveisfisicasquimicasdaagua_cl,
        COALESCE(variaveisfisicasquimicasdaagua.nno3, NULL) AS variaveisfisicasquimicasdaagua_nno3,
        COALESCE(variaveisfisicasquimicasdaagua.ppo43, NULL) AS variaveisfisicasquimicasdaagua_ppo43,
        COALESCE(variaveisfisicasquimicasdaagua.sso42, NULL) AS variaveisfisicasquimicasdaagua_sso42,
        COALESCE(variaveisfisicasquimicasdaagua.li, NULL) AS variaveisfisicasquimicasdaagua_li,
        COALESCE(variaveisfisicasquimicasdaagua.na, NULL) AS variaveisfisicasquimicasdaagua_na,
        COALESCE(variaveisfisicasquimicasdaagua.nnh4, NULL) AS variaveisfisicasquimicasdaagua_nnh4,
        COALESCE(variaveisfisicasquimicasdaagua.k, NULL) AS variaveisfisicasquimicasdaagua_k,
        COALESCE(variaveisfisicasquimicasdaagua.mg, NULL) AS variaveisfisicasquimicasdaagua_mg,
        COALESCE(variaveisfisicasquimicasdaagua.ca, NULL) AS variaveisfisicasquimicasdaagua_ca,
        COALESCE(variaveisfisicasquimicasdaagua.clorofila, NULL) AS variaveisfisicasquimicasdaagua_clorofila,
        COALESCE(variaveisfisicasquimicasdaagua.feofitina, NULL) AS variaveisfisicasquimicasdaagua_feofitina,
        COALESCE(variaveisfisicasquimicasdaagua.turbidez, NULL) AS variaveisfisicasquimicasdaagua_turbidez,
        COALESCE(variaveisfisicasquimicasdaagua.nt, NULL) AS variaveisfisicasquimicasdaagua_nt,
        COALESCE(variaveisfisicasquimicasdaagua.pt, NULL) AS variaveisfisicasquimicasdaagua_pt,
        COALESCE(variaveisfisicasquimicasdaagua.tdc, NULL) AS variaveisfisicasquimicasdaagua_tdc,
        COALESCE(variaveisfisicasquimicasdaagua.sitio_nome, NULL) AS variaveisfisicasquimicasdaagua_sitio_nome,
        COALESCE(variaveisfisicasquimicasdaagua.instituicao_nome, NULL) AS variaveisfisicasquimicasdaagua_instituicao_nome,
        COALESCE(variaveisfisicasquimicasdaagua.reservatorio_nome, NULL) AS variaveisfisicasquimicasdaagua_reservatorio_nome,
        COALESCE(parametrosbiologicosfisicosagua.profundidade, NULL) AS parametrosbiologicosfisicosagua_profundidade,
        COALESCE(parametrosbiologicosfisicosagua.secchi, NULL) AS parametrosbiologicosfisicosagua_secchi,
        COALESCE(parametrosbiologicosfisicosagua.tempagua, NULL) AS parametrosbiologicosfisicosagua_tempagua,
        COALESCE(parametrosbiologicosfisicosagua.condutividade, NULL) AS parametrosbiologicosfisicosagua_condutividade,
        COALESCE(parametrosbiologicosfisicosagua._do, NULL) AS parametrosbiologicosfisicosagua__do,
        COALESCE(parametrosbiologicosfisicosagua.ph, NULL) AS parametrosbiologicosfisicosagua_ph,
        COALESCE(parametrosbiologicosfisicosagua.turbidez, NULL) AS parametrosbiologicosfisicosagua_turbidez,
        COALESCE(parametrosbiologicosfisicosagua.materialemsuspensao, NULL) AS parametrosbiologicosfisicosagua_materialemsuspensao,
        COALESCE(parametrosbiologicosfisicosagua.doc, NULL) AS parametrosbiologicosfisicosagua_doc,
        COALESCE(parametrosbiologicosfisicosagua.toc, NULL) AS parametrosbiologicosfisicosagua_toc,
        COALESCE(parametrosbiologicosfisicosagua.poc, NULL) AS parametrosbiologicosfisicosagua_poc,
        COALESCE(parametrosbiologicosfisicosagua.dic, NULL) AS parametrosbiologicosfisicosagua_dic,
        COALESCE(parametrosbiologicosfisicosagua.nt, NULL) AS parametrosbiologicosfisicosagua_nt,
        COALESCE(parametrosbiologicosfisicosagua.pt, NULL) AS parametrosbiologicosfisicosagua_pt,
        COALESCE(parametrosbiologicosfisicosagua.densidadebacteria, NULL) AS parametrosbiologicosfisicosagua_densidadebacteria,
        COALESCE(parametrosbiologicosfisicosagua.biomassabacteria, NULL) AS parametrosbiologicosfisicosagua_biomassabacteria,
        COALESCE(parametrosbiologicosfisicosagua.clorofilaa, NULL) AS parametrosbiologicosfisicosagua_clorofilaa,
        COALESCE(parametrosbiologicosfisicosagua.biomassacarbonototalfito, NULL) AS parametrosbiologicosfisicosagua_biomassacarbonototalfito,
        COALESCE(parametrosbiologicosfisicosagua.densidadetotalfito, NULL) AS parametrosbiologicosfisicosagua_densidadetotalfito,
        COALESCE(parametrosbiologicosfisicosagua.biomassazoo, NULL) AS parametrosbiologicosfisicosagua_biomassazoo,
        COALESCE(parametrosbiologicosfisicosagua.densidadetotalzoo, NULL) AS parametrosbiologicosfisicosagua_densidadetotalzoo,
        COALESCE(parametrosbiologicosfisicosagua.data_medida, NULL) AS parametrosbiologicosfisicosagua_data_medida,
        COALESCE(parametrosbiologicosfisicosagua.hora_medida, NULL) AS parametrosbiologicosfisicosagua_hora_medida,
        COALESCE(parametrosbiologicosfisicosagua.sitio_nome, NULL) AS parametrosbiologicosfisicosagua_sitio_nome,
        COALESCE(parametrosbiologicosfisicosagua.instituicao_nome, NULL) AS parametrosbiologicosfisicosagua_instituicao_nome,
        COALESCE(parametrosbiologicosfisicosagua.reservatorio_nome, NULL) AS parametrosbiologicosfisicosagua_reservatorio_nome,
        COALESCE(nutrientessedimento.profundidade, NULL) AS nutrientessedimento_profundidade,
        COALESCE(nutrientessedimento.batimetria, NULL) AS nutrientessedimento_batimetria,
        COALESCE(nutrientessedimento.nh4, NULL) AS nutrientessedimento_nh4,
        COALESCE(nutrientessedimento.no2, NULL) AS nutrientessedimento_no2,
        COALESCE(nutrientessedimento.no3, NULL) AS nutrientessedimento_no3,
        COALESCE(nutrientessedimento.po4, NULL) AS nutrientessedimento_po4,
        COALESCE(nutrientessedimento.ptotal, NULL) AS nutrientessedimento_ptotal,
        COALESCE(nutrientessedimento.ntotal, NULL) AS nutrientessedimento_ntotal,
        COALESCE(nutrientessedimento.data_medida, NULL) AS nutrientessedimento_data_medida,
        COALESCE(nutrientessedimento.hora_medida, NULL) AS nutrientessedimento_hora_medida,
        COALESCE(nutrientessedimento.sitio_nome, NULL) AS nutrientessedimento_sitio_nome,
        COALESCE(nutrientessedimento.instituicao_nome, NULL) AS nutrientessedimento_instituicao_nome,
        COALESCE(nutrientessedimento.reservatorio_nome, NULL) AS nutrientessedimento_reservatorio_nome,
        COALESCE(medidacamposuperficie.secchi, NULL) AS medidacamposuperficie_secchi,
        COALESCE(medidacamposuperficie.tempagua, NULL) AS medidacamposuperficie_tempagua,
        COALESCE(medidacamposuperficie.condutividade, NULL) AS medidacamposuperficie_condutividade,
        COALESCE(medidacamposuperficie._do, NULL) AS medidacamposuperficie__do,
        COALESCE(medidacamposuperficie.ph, NULL) AS medidacamposuperficie_ph,
        COALESCE(medidacamposuperficie.turbidez, NULL) AS medidacamposuperficie_turbidez,
        COALESCE(medidacamposuperficie.materialemsuspensao, NULL) AS medidacamposuperficie_materialemsuspensao,
        COALESCE(medidacamposuperficie.data_medida, NULL) AS medidacamposuperficie_data_medida,
        COALESCE(medidacamposuperficie.hora_medida, NULL) AS medidacamposuperficie_hora_medida,
        COALESCE(medidacamposuperficie.sitio_nome, NULL) AS medidacamposuperficie_sitio_nome,
        COALESCE(medidacamposuperficie.instituicao_nome, NULL) AS medidacamposuperficie_instituicao_nome,
        COALESCE(medidacamposuperficie.reservatorio_nome, NULL) AS medidacamposuperficie_reservatorio_nome,
        COALESCE(medidacampocoluna.profundidade, NULL) AS medidacampocoluna_profundidade,
        COALESCE(medidacampocoluna.secchi, NULL) AS medidacampocoluna_secchi,
        COALESCE(medidacampocoluna.tempagua, NULL) AS medidacampocoluna_tempagua,
        COALESCE(medidacampocoluna.condutividade, NULL) AS medidacampocoluna_condutividade,
        COALESCE(medidacampocoluna._do, NULL) AS medidacampocoluna__do,
        COALESCE(medidacampocoluna.ph, NULL) AS medidacampocoluna_ph,
        COALESCE(medidacampocoluna.turbidez, NULL) AS medidacampocoluna_turbidez,
        COALESCE(medidacampocoluna.materialemsuspensao, NULL) AS medidacampocoluna_materialemsuspensao,
        COALESCE(medidacampocoluna.intensidadeluminosa, NULL) AS medidacampocoluna_intensidadeluminosa,
        COALESCE(medidacampocoluna.data_medida, NULL) AS medidacampocoluna_data_medida,
        COALESCE(medidacampocoluna.hora_medida, NULL) AS medidacampocoluna_hora_medida,
        COALESCE(medidacampocoluna.sitio_nome, NULL) AS medidacampocoluna_sitio_nome,
        COALESCE(medidacampocoluna.instituicao_nome, NULL) AS medidacampocoluna_instituicao_nome,
        COALESCE(medidacampocoluna.reservatorio_nome, NULL) AS medidacampocoluna_reservatorio_nome,
        COALESCE(ionsnaaguaintersticialdosedimento.profundidade, NULL) AS ionsnaaguaintersticialdosedimento_profundidade,
        COALESCE(ionsnaaguaintersticialdosedimento.batimetria, NULL) AS ionsnaaguaintersticialdosedimento_batimetria,
        COALESCE(ionsnaaguaintersticialdosedimento.f, NULL) AS ionsnaaguaintersticialdosedimento_f,
        COALESCE(ionsnaaguaintersticialdosedimento.cl, NULL) AS ionsnaaguaintersticialdosedimento_cl,
        COALESCE(ionsnaaguaintersticialdosedimento.no2, NULL) AS ionsnaaguaintersticialdosedimento_no2,
        COALESCE(ionsnaaguaintersticialdosedimento.br, NULL) AS ionsnaaguaintersticialdosedimento_br,
        COALESCE(ionsnaaguaintersticialdosedimento.no3, NULL) AS ionsnaaguaintersticialdosedimento_no3,
        COALESCE(ionsnaaguaintersticialdosedimento.po4, NULL) AS ionsnaaguaintersticialdosedimento_po4,
        COALESCE(ionsnaaguaintersticialdosedimento.so4, NULL) AS ionsnaaguaintersticialdosedimento_so4,
        COALESCE(ionsnaaguaintersticialdosedimento.na, NULL) AS ionsnaaguaintersticialdosedimento_na,
        COALESCE(ionsnaaguaintersticialdosedimento.nh4, NULL) AS ionsnaaguaintersticialdosedimento_nh4,
        COALESCE(ionsnaaguaintersticialdosedimento.k, NULL) AS ionsnaaguaintersticialdosedimento_k,
        COALESCE(ionsnaaguaintersticialdosedimento.mg, NULL) AS ionsnaaguaintersticialdosedimento_mg,
        COALESCE(ionsnaaguaintersticialdosedimento.ca, NULL) AS ionsnaaguaintersticialdosedimento_ca,
        COALESCE(ionsnaaguaintersticialdosedimento.acetato, NULL) AS ionsnaaguaintersticialdosedimento_acetato,
        COALESCE(ionsnaaguaintersticialdosedimento.data_medida, NULL) AS ionsnaaguaintersticialdosedimento_data_medida,
        COALESCE(ionsnaaguaintersticialdosedimento.hora_medida, NULL) AS ionsnaaguaintersticialdosedimento_hora_medida,
        COALESCE(ionsnaaguaintersticialdosedimento.sitio_nome, NULL) AS ionsnaaguaintersticialdosedimento_sitio_nome,
        COALESCE(ionsnaaguaintersticialdosedimento.instituicao_nome, NULL) AS ionsnaaguaintersticialdosedimento_instituicao_nome,
        COALESCE(ionsnaaguaintersticialdosedimento.reservatorio_nome, NULL) AS ionsnaaguaintersticialdosedimento_reservatorio_nome,
        COALESCE(horiba.profundidade, NULL) AS horiba_profundidade,
        COALESCE(horiba.tempagua, NULL) AS horiba_tempagua,
        COALESCE(horiba.condutividade, NULL) AS horiba_condutividade,
        COALESCE(horiba.ph, NULL) AS horiba_ph,
        COALESCE(horiba._do, NULL) AS horiba__do,
        COALESCE(horiba.tds, NULL) AS horiba_tds,
        COALESCE(horiba.redox, NULL) AS horiba_redox,
        COALESCE(horiba.turbidez, NULL) AS horiba_turbidez,
        COALESCE(horiba.data_medida, NULL) AS horiba_data_medida,
        COALESCE(horiba.hora_medida, NULL) AS horiba_hora_medida,
        COALESCE(horiba.sitio_nome, NULL) AS horiba_sitio_nome,
        COALESCE(horiba.instituicao_nome, NULL) AS horiba_instituicao_nome,
        COALESCE(horiba.reservatorio_nome, NULL) AS horiba_reservatorio_nome,
        COALESCE(gasesembolhas.profundidade, NULL) AS gasesembolhas_profundidade,
        COALESCE(gasesembolhas.co2, NULL) AS gasesembolhas_co2,
        COALESCE(gasesembolhas.o2, NULL) AS gasesembolhas_o2,
        COALESCE(gasesembolhas.n2, NULL) AS gasesembolhas_n2,
        COALESCE(gasesembolhas.ch4, NULL) AS gasesembolhas_ch4,
        COALESCE(gasesembolhas.n2o, NULL) AS gasesembolhas_n2o,
        COALESCE(gasesembolhas.data_medida, NULL) AS gasesembolhas_data_medida,
        COALESCE(gasesembolhas.hora_medida, NULL) AS gasesembolhas_hora_medida,
        COALESCE(gasesembolhas.sitio_nome, NULL) AS gasesembolhas_sitio_nome,
        COALESCE(gasesembolhas.instituicao_nome, NULL) AS gasesembolhas_instituicao_nome,
        COALESCE(gasesembolhas.reservatorio_nome, NULL) AS gasesembolhas_reservatorio_nome,
        COALESCE(fluxodifusivoinpe.profundidade, NULL) AS fluxodifusivoinpe_profundidade,
        COALESCE(fluxodifusivoinpe.co2, NULL) AS fluxodifusivoinpe_co2,
        COALESCE(fluxodifusivoinpe.co2_desviopadrao, NULL) AS fluxodifusivoinpe_co2_desviopadrao,
        COALESCE(fluxodifusivoinpe.co2_amostras, NULL) AS fluxodifusivoinpe_co2_amostras,
        COALESCE(fluxodifusivoinpe.ch4, NULL) AS fluxodifusivoinpe_ch4,
        COALESCE(fluxodifusivoinpe.ch4_desviopadrao, NULL) AS fluxodifusivoinpe_ch4_desviopadrao,
        COALESCE(fluxodifusivoinpe.ch4_amostras, NULL) AS fluxodifusivoinpe_ch4_amostras,
        COALESCE(fluxodifusivoinpe.datamedida, NULL) AS fluxodifusivoinpe_datamedida,
        COALESCE(fluxodifusivoinpe.horamedida, NULL) AS fluxodifusivoinpe_horamedida,
        COALESCE(fluxodifusivoinpe.sitio_nome, NULL) AS fluxodifusivoinpe_sitio_nome,
        COALESCE(fluxodifusivoinpe.instituicao_nome, NULL) AS fluxodifusivoinpe_instituicao_nome,
        COALESCE(fluxodifusivoinpe.reservatorio_nome, NULL) AS fluxodifusivoinpe_reservatorio_nome,
        COALESCE(fluxodifusivo.batimetria, NULL) AS fluxodifusivo_batimetria,
        COALESCE(fluxodifusivo.intervalo, NULL) AS fluxodifusivo_intervalo,
        COALESCE(fluxodifusivo.ch4, NULL) AS fluxodifusivo_ch4,
        COALESCE(fluxodifusivo.co2, NULL) AS fluxodifusivo_co2,
        COALESCE(fluxodifusivo.data_medida, NULL) AS fluxodifusivo_data_medida,
        COALESCE(fluxodifusivo.hora_medida, NULL) AS fluxodifusivo_hora_medida,
        COALESCE(fluxodifusivo.sitio_nome, NULL) AS fluxodifusivo_sitio_nome,
        COALESCE(fluxodifusivo.instituicao_nome, NULL) AS fluxodifusivo_instituicao_nome,
        COALESCE(fluxodifusivo.reservatorio_nome, NULL) AS fluxodifusivo_reservatorio_nome,
        COALESCE(fluxocarbono.producaofitoplanctonica, NULL) AS fluxocarbono_producaofitoplanctonica,
        COALESCE(fluxocarbono.carbonoorganicoexcretado, NULL) AS fluxocarbono_carbonoorganicoexcretado,
        COALESCE(fluxocarbono.respiracaofito, NULL) AS fluxocarbono_respiracaofito,
        COALESCE(fluxocarbono.producaobacteriana, NULL) AS fluxocarbono_producaobacteriana,
        COALESCE(fluxocarbono.respiracaobacteriana, NULL) AS fluxocarbono_respiracaobacteriana,
        COALESCE(fluxocarbono.taxasedimentacao, NULL) AS fluxocarbono_taxasedimentacao,
        COALESCE(fluxocarbono.data_medida, NULL) AS fluxocarbono_data_medida,
        COALESCE(fluxocarbono.hora_medida, NULL) AS fluxocarbono_hora_medida,
        COALESCE(fluxocarbono.sitio_nome, NULL) AS fluxocarbono_sitio_nome,
        COALESCE(fluxocarbono.instituicao_nome, NULL) AS fluxocarbono_instituicao_nome,
        COALESCE(fluxocarbono.reservatorio_nome, NULL) AS fluxocarbono_reservatorio_nome,
        COALESCE(fluxobolhasinpe.profundidade, NULL) AS fluxobolhasinpe_profundidade,
        COALESCE(fluxobolhasinpe.ch4, NULL) AS fluxobolhasinpe_ch4,
        COALESCE(fluxobolhasinpe.ch4_desviopadrao, NULL) AS fluxobolhasinpe_ch4_desviopadrao,
        COALESCE(fluxobolhasinpe.ch4_amostras, NULL) AS fluxobolhasinpe_ch4_amostras,
        COALESCE(fluxobolhasinpe.data_medida, NULL) AS fluxobolhasinpe_data_medida,
        COALESCE(fluxobolhasinpe.hora_medida, NULL) AS fluxobolhasinpe_hora_medida,
        COALESCE(fluxobolhasinpe.sitio_nome, NULL) AS fluxobolhasinpe_sitio_nome,
        COALESCE(fluxobolhasinpe.instituicao_nome, NULL) AS fluxobolhasinpe_instituicao_nome,
        COALESCE(fluxobolhasinpe.reservatorio_nome, NULL) AS fluxobolhasinpe_reservatorio_nome,
        COALESCE(dupladessorcaoagua.profundidade, NULL) AS dupladessorcaoagua_profundidade,
        COALESCE(dupladessorcaoagua.co2, NULL) AS dupladessorcaoagua_co2,
        COALESCE(dupladessorcaoagua.o2, NULL) AS dupladessorcaoagua_o2,
        COALESCE(dupladessorcaoagua.n2, NULL) AS dupladessorcaoagua_n2,
        COALESCE(dupladessorcaoagua.ch4, NULL) AS dupladessorcaoagua_ch4,
        COALESCE(dupladessorcaoagua.n2o, NULL) AS dupladessorcaoagua_n2o,
        COALESCE(dupladessorcaoagua.data_medida, NULL) AS dupladessorcaoagua_data_medida,
        COALESCE(dupladessorcaoagua.hora_medida, NULL) AS dupladessorcaoagua_hora_medida,
        COALESCE(dupladessorcaoagua.sitio_nome, NULL) AS dupladessorcaoagua_sitio_nome,
        COALESCE(dupladessorcaoagua.instituicao_nome, NULL) AS dupladessorcaoagua_instituicao_nome,
        COALESCE(dupladessorcaoagua.reservatorio_nome, NULL) AS dupladessorcaoagua_reservatorio_nome,
        COALESCE(difusao.ch4, NULL) AS difusao_ch4,
        COALESCE(difusao.co2, NULL) AS difusao_co2,
        COALESCE(difusao.n2o, NULL) AS difusao_n2o,
        COALESCE(difusao.ph, NULL) AS difusao_ph,
        COALESCE(difusao.tempagua, NULL) AS difusao_tempagua,
        COALESCE(difusao.tempar, NULL) AS difusao_tempar,
        COALESCE(difusao.profundidade, NULL) AS difusao_profundidade,
        COALESCE(difusao.altitude, NULL) AS difusao_altitude,
        COALESCE(difusao.vento, NULL) AS difusao_vento,
        COALESCE(difusao.data_medida, NULL) AS difusao_data_medida,
        COALESCE(difusao.hora_medida, NULL) AS difusao_hora_medida,
        COALESCE(difusao.sitio_nome, NULL) AS difusao_sitio_nome,
        COALESCE(difusao.instituicao_nome, NULL) AS difusao_instituicao_nome,
        COALESCE(difusao.reservatorio_nome, NULL) AS difusao_reservatorio_nome,
        COALESCE(concentracaogassedimento.batimetria, NULL) AS concentracaogassedimento_batimetria,
        COALESCE(concentracaogassedimento.profundidadedosedimento, NULL) AS concentracaogassedimento_profundidadedosedimento,
        COALESCE(concentracaogassedimento.replica, NULL) AS concentracaogassedimento_replica,
        COALESCE(concentracaogassedimento.ch4, NULL) AS concentracaogassedimento_ch4,
        COALESCE(concentracaogassedimento.co2, NULL) AS concentracaogassedimento_co2,
        COALESCE(concentracaogassedimento.data_medida, NULL) AS concentracaogassedimento_data_medida,
        COALESCE(concentracaogassedimento.hora_medida, NULL) AS concentracaogassedimento_hora_medida,
        COALESCE(concentracaogassedimento.sitio_nome, NULL) AS concentracaogassedimento_sitio_nome,
        COALESCE(concentracaogassedimento.instituicao_nome, NULL) AS concentracaogassedimento_instituicao_nome,
        COALESCE(concentracaogassedimento.reservatorio_nome, NULL) AS concentracaogassedimento_reservatorio_nome,
        COALESCE(concentracaogasagua.batimetria, NULL) AS concentracaogasagua_batimetria,
        COALESCE(concentracaogasagua.altura, NULL) AS concentracaogasagua_altura,
        COALESCE(concentracaogasagua.replica, NULL) AS concentracaogasagua_replica,
        COALESCE(concentracaogasagua.ch4, NULL) AS concentracaogasagua_ch4,
        COALESCE(concentracaogasagua.co2, NULL) AS concentracaogasagua_co2,
        COALESCE(concentracaogasagua.data_medida, NULL) AS concentracaogasagua_data_medida,
        COALESCE(concentracaogasagua.hora_medida, NULL) AS concentracaogasagua_hora_medida,
        COALESCE(concentracaogasagua.sitio_nome, NULL) AS concentracaogasagua_sitio_nome,
        COALESCE(concentracaogasagua.instituicao_nome, NULL) AS concentracaogasagua_instituicao_nome,
        COALESCE(concentracaogasagua.reservatorio_nome, NULL) AS concentracaogasagua_reservatorio_nome,
        COALESCE(carbono.dc, NULL) AS carbono_dc,
        COALESCE(carbono.doc, NULL) AS carbono_doc,
        COALESCE(carbono.poc, NULL) AS carbono_poc,
        COALESCE(carbono.toc, NULL) AS carbono_toc,
        COALESCE(carbono.dic, NULL) AS carbono_dic,
        COALESCE(carbono.tc, NULL) AS carbono_tc,
        COALESCE(carbono.data_medida, NULL) AS carbono_data_medida,
        COALESCE(carbono.hora_medida, NULL) AS carbono_hora_medida,
        COALESCE(carbono.sitio_nome, NULL) AS carbono_sitio_nome,
        COALESCE(carbono.instituicao_nome, NULL) AS carbono_instituicao_nome,
        COALESCE(carbono.reservatorio_nome, NULL) AS carbono_reservatorio_nome,
        COALESCE(camarasolo.ch4, NULL) AS camarasolo_ch4,
        COALESCE(camarasolo.co2, NULL) AS camarasolo_co2,
        COALESCE(camarasolo.n2o, NULL) AS camarasolo_n2o,
        COALESCE(camarasolo.tempar, NULL) AS camarasolo_tempar,
        COALESCE(camarasolo.tempsolo, NULL) AS camarasolo_tempsolo,
        COALESCE(camarasolo.vento, NULL) AS camarasolo_vento,
        COALESCE(camarasolo.altitude, NULL) AS camarasolo_altitude,
        COALESCE(camarasolo.data_medida, NULL) AS camarasolo_data_medida,
        COALESCE(camarasolo.hora_medida, NULL) AS camarasolo_hora_medida,
        COALESCE(camarasolo.sitio_nome, NULL) AS camarasolo_sitio_nome,
        COALESCE(camarasolo.instituicao_nome, NULL) AS camarasolo_instituicao_nome,
        COALESCE(camarasolo.reservatorio_nome, NULL) AS camarasolo_reservatorio_nome,
        COALESCE(bolhas.profundidade, NULL) AS bolhas_profundidade,
        COALESCE(bolhas.nrodefunis, NULL) AS bolhas_nrodefunis,
        COALESCE(bolhas.volumecoletado, NULL) AS bolhas_volumecoletado,
        COALESCE(bolhas.co2, NULL) AS bolhas_co2,
        COALESCE(bolhas.o2, NULL) AS bolhas_o2,
        COALESCE(bolhas.n2, NULL) AS bolhas_n2,
        COALESCE(bolhas.ch4, NULL) AS bolhas_ch4,
        COALESCE(bolhas.n2o, NULL) AS bolhas_n2o,
        COALESCE(bolhas.data_medida, NULL) AS bolhas_data_medida,
        COALESCE(bolhas.hora_medida, NULL) AS bolhas_hora_medida,
        COALESCE(bolhas.sitio_nome, NULL) AS bolhas_sitio_nome,
        COALESCE(bolhas.instituicao_nome, NULL) AS bolhas_instituicao_nome,
        COALESCE(bolhas.reservatorio_nome, NULL) AS bolhas_reservatorio_nome,
        COALESCE(bioticosuperficie.doc, NULL) AS bioticosuperficie_doc,
        COALESCE(bioticosuperficie.toc, NULL) AS bioticosuperficie_toc,
        COALESCE(bioticosuperficie.poc, NULL) AS bioticosuperficie_poc,
        COALESCE(bioticosuperficie.densidadebacteria, NULL) AS bioticosuperficie_densidadebacteria,
        COALESCE(bioticosuperficie.biomassabacteria, NULL) AS bioticosuperficie_biomassabacteria,
        COALESCE(bioticosuperficie.clorofilaa, NULL) AS bioticosuperficie_clorofilaa,
        COALESCE(bioticosuperficie.biomassacarbonototalfito, NULL) AS bioticosuperficie_biomassacarbonototalfito,
        COALESCE(bioticosuperficie.densidadetotalfito, NULL) AS bioticosuperficie_densidadetotalfito,
        COALESCE(bioticosuperficie.biomassazoo, NULL) AS bioticosuperficie_biomassazoo,
        COALESCE(bioticosuperficie.densidadetotalzoo, NULL) AS bioticosuperficie_densidadetotalzoo,
        COALESCE(bioticosuperficie.data_medida, NULL) AS bioticosuperficie_data_medida,
        COALESCE(bioticosuperficie.hora_medida, NULL) AS bioticosuperficie_hora_medida,
        COALESCE(bioticosuperficie.sitio_nome, NULL) AS bioticosuperficie_sitio_nome,
        COALESCE(bioticosuperficie.instituicao_nome, NULL) AS bioticosuperficie_instituicao_nome,
        COALESCE(bioticosuperficie.reservatorio_nome, NULL) AS bioticosuperficie_reservatorio_nome,
        COALESCE(bioticocoluna.profundidade, NULL) AS bioticocoluna_profundidade,
        COALESCE(bioticocoluna.doc, NULL) AS bioticocoluna_doc,
        COALESCE(bioticocoluna.poc, NULL) AS bioticocoluna_poc,
        COALESCE(bioticocoluna.densidadebacteria, NULL) AS bioticocoluna_densidadebacteria,
        COALESCE(bioticocoluna.biomassabacteria, NULL) AS bioticocoluna_biomassabacteria,
        COALESCE(bioticocoluna.clorofilaa, NULL) AS bioticocoluna_clorofilaa,
        COALESCE(bioticocoluna.biomassacarbonototalfito, NULL) AS bioticocoluna_biomassacarbonototalfito,
        COALESCE(bioticocoluna.densidadetotalfito, NULL) AS bioticocoluna_densidadetotalfito,
        COALESCE(bioticocoluna.biomassazoo, NULL) AS bioticocoluna_biomassazoo,
        COALESCE(bioticocoluna.densidadetotalzoo, NULL) AS bioticocoluna_densidadetotalzoo,
        COALESCE(bioticocoluna.data_medida, NULL) AS bioticocoluna_data_medida,
        COALESCE(bioticocoluna.hora_medida, NULL) AS bioticocoluna_hora_medida,
        COALESCE(bioticocoluna.sitio_nome, NULL) AS bioticocoluna_sitio_nome,
        COALESCE(bioticocoluna.instituicao_nome, NULL) AS bioticocoluna_instituicao_nome,
        COALESCE(bioticocoluna.reservatorio_nome, NULL) AS bioticocoluna_reservatorio_nome,
        COALESCE(aguamateriaorganicasedimento.profundidade, NULL) AS aguamateriaorganicasedimento_profundidade,
        COALESCE(aguamateriaorganicasedimento.batimetria, NULL) AS aguamateriaorganicasedimento_batimetria,
        COALESCE(aguamateriaorganicasedimento.agua, NULL) AS aguamateriaorganicasedimento_agua,
        COALESCE(aguamateriaorganicasedimento.materiaorganica, NULL) AS aguamateriaorganicasedimento_materiaorganica,
        COALESCE(aguamateriaorganicasedimento.data_medida, NULL) AS aguamateriaorganicasedimento_data_medida,
        COALESCE(aguamateriaorganicasedimento.hora_medida, NULL) AS aguamateriaorganicasedimento_hora_medida,
        COALESCE(aguamateriaorganicasedimento.sitio_nome, NULL) AS aguamateriaorganicasedimento_sitio_nome,
        COALESCE(aguamateriaorganicasedimento.instituicao_nome, NULL) AS aguamateriaorganicasedimento_instituicao_nome,
        COALESCE(aguamateriaorganicasedimento.reservatorio_nome, NULL) AS aguamateriaorganicasedimento_reservatorio_nome,
        COALESCE(abioticosuperficie.dic, NULL) AS abioticosuperficie_dic,
        COALESCE(abioticosuperficie.nt, NULL) AS abioticosuperficie_nt,
        COALESCE(abioticosuperficie.pt, NULL) AS abioticosuperficie_pt,
        COALESCE(abioticosuperficie.delta13c, NULL) AS abioticosuperficie_delta13c,
        COALESCE(abioticosuperficie.delta15n, NULL) AS abioticosuperficie_delta15n,
        COALESCE(abioticosuperficie.data_medida, NULL) AS abioticosuperficie_data_medida,
        COALESCE(abioticosuperficie.hora_medida, NULL) AS abioticosuperficie_hora_medida,
        COALESCE(abioticosuperficie.sitio_nome, NULL) AS abioticosuperficie_sitio_nome,
        COALESCE(abioticosuperficie.instituicao_nome, NULL) AS abioticosuperficie_instituicao_nome,
        COALESCE(abioticosuperficie.reservatorio_nome, NULL) AS abioticosuperficie_reservatorio_nome,
        COALESCE(abioticocoluna.profundidade, NULL) AS abioticocoluna_profundidade,
        COALESCE(abioticocoluna.dic, NULL) AS abioticocoluna_dic,
        COALESCE(abioticocoluna.nt, NULL) AS abioticocoluna_nt,
        COALESCE(abioticocoluna.pt, NULL) AS abioticocoluna_pt,
        COALESCE(abioticocoluna.delta13c, NULL) AS abioticocoluna_delta13c,
        COALESCE(abioticocoluna.delta15n, NULL) AS abioticocoluna_delta15n,
        COALESCE(abioticocoluna.data_medida, NULL) AS abioticocoluna_data_medida,
        COALESCE(abioticocoluna.hora_medida, NULL) AS abioticocoluna_hora_medida,
        COALESCE(abioticocoluna.sitio_nome, NULL) AS abioticocoluna_sitio_nome,
        COALESCE(abioticocoluna.instituicao_nome, NULL) AS abioticocoluna_instituicao_nome,
>>>>>>> QA
        COALESCE(abioticocoluna.reservatorio_nome, NULL) AS abioticocoluna_reservatorio_nome
    FROM tbreservatorio r
    LEFT JOIN tbcampanha c ON r.idreservatorio = c.idreservatorio
    LEFT JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    LEFT JOIN tbsitio s ON c.idcampanha = s.idcampanha
    LEFT JOIN tbtc tc ON r.idreservatorio = tc.idreservatorio
    LEFT JOIN tbvariaveisfisicasquimicasdaagua variaveisfisicasquimicasdaagua ON r.idreservatorio = variaveisfisicasquimicasdaagua.idreservatorio
    LEFT JOIN tbparametrosbiologicosfisicosagua parametrosbiologicosfisicosagua ON r.idreservatorio = parametrosbiologicosfisicosagua.idreservatorio
    LEFT JOIN tbnutrientessedimento nutrientessedimento ON r.idreservatorio = nutrientessedimento.idreservatorio
    LEFT JOIN tbmedidacamposuperficie medidacamposuperficie ON r.idreservatorio = medidacamposuperficie.idreservatorio
    LEFT JOIN tbmedidacampocoluna medidacampocoluna ON r.idreservatorio = medidacampocoluna.idreservatorio
    LEFT JOIN tbionsnaaguaintersticialdosedimento ionsnaaguaintersticialdosedimento ON r.idreservatorio = ionsnaaguaintersticialdosedimento.idreservatorio
    LEFT JOIN tbhoriba horiba ON r.idreservatorio = horiba.idreservatorio
    LEFT JOIN tbgasesembolhas gasesembolhas ON r.idreservatorio = gasesembolhas.idreservatorio
    LEFT JOIN tbfluxodifusivoinpe fluxodifusivoinpe ON r.idreservatorio = fluxodifusivoinpe.idreservatorio
    LEFT JOIN tbfluxodifusivo fluxodifusivo ON r.idreservatorio = fluxodifusivo.idreservatorio
    LEFT JOIN tbfluxocarbono fluxocarbono ON r.idreservatorio = fluxocarbono.idreservatorio
    LEFT JOIN tbfluxobolhasinpe fluxobolhasinpe ON r.idreservatorio = fluxobolhasinpe.idreservatorio
    LEFT JOIN tbdupladessorcaoagua dupladessorcaoagua ON r.idreservatorio = dupladessorcaoagua.idreservatorio
    LEFT JOIN tbdifusao difusao ON r.idreservatorio = difusao.idreservatorio
    LEFT JOIN tbconcentracaogassedimento concentracaogassedimento ON r.idreservatorio = concentracaogassedimento.idreservatorio
    LEFT JOIN tbconcentracaogasagua concentracaogasagua ON r.idreservatorio = concentracaogasagua.idreservatorio
    LEFT JOIN tbcarbono carbono ON r.idreservatorio = carbono.idreservatorio
    LEFT JOIN tbcamarasolo camarasolo ON r.idreservatorio = camarasolo.idreservatorio
    LEFT JOIN tbbolhas bolhas ON r.idreservatorio = bolhas.idreservatorio
    LEFT JOIN tbbioticosuperficie bioticosuperficie ON r.idreservatorio = bioticosuperficie.idreservatorio
    LEFT JOIN tbbioticocoluna bioticocoluna ON r.idreservatorio = bioticocoluna.idreservatorio
    LEFT JOIN tbaguamateriaorganicasedimento aguamateriaorganicasedimento ON r.idreservatorio = aguamateriaorganicasedimento.idreservatorio
    LEFT JOIN tbabioticosuperficie abioticosuperficie ON r.idreservatorio = abioticosuperficie.idreservatorio
    LEFT JOIN tbabioticocoluna abioticocoluna ON r.idreservatorio = abioticocoluna.idreservatorio
    WHERE
<<<<<<< HEAD
        r.idreservatorio = p_idreservatorio;
=======
        r.idreservatorio = p_idreservatorio
            LIMIT p_limit OFFSET p_offset;
>>>>>>> QA
END;
$$;