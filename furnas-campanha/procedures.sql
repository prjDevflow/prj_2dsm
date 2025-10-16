CREATE OR REPLACE FUNCTION buscar_parametros_limnologicos(
    p_instituicao_nome text DEFAULT NULL,
    p_idcampanha integer DEFAULT NULL,
    p_data_inicio date DEFAULT NULL,
    p_data_fim date DEFAULT NULL,
    p_limit_param integer DEFAULT 100,
    p_offset_param integer DEFAULT 0
)
RETURNS TABLE (
    instituicao_nome text,
    reservatorio_nome text,
    sitio_nome text,
    numero_campanha integer,
    data_inicio_campanha date,
    data_fim_campanha date,
    abioticocoluna_profundidade double precision,
    abioticocoluna_dic double precision,
    abioticocoluna_nt double precision,
    abioticocoluna_pt double precision,
    abioticocoluna_delta13c double precision,
    abioticocoluna_delta15n double precision,
    abioticocoluna_data_medida date,
    abioticocoluna_hora_medida time,
    abioticosuperficie_dic double precision,
    abioticosuperficie_nt double precision,
    abioticosuperficie_pt double precision,
    abioticosuperficie_delta13c double precision,
    abioticosuperficie_delta15n double precision,
    abioticosuperficie_data_medida date,
    abioticosuperficie_hora_medida time,
    aguamateriaorganicasedimento_profundidade double precision,
    aguamateriaorganicasedimento_batimetria double precision,
    aguamateriaorganicasedimento_agua double precision,
    aguamateriaorganicasedimento_materiaorganica double precision,
    aguamateriaorganicasedimento_data_medida date,
    aguamateriaorganicasedimento_hora_medida time,
    bioticocoluna_profundidade double precision,
    bioticocoluna_doc double precision,
    bioticocoluna_toc double precision,
    bioticocoluna_poc double precision,
    bioticocoluna_densidadebacteria double precision,
    bioticocoluna_biomassabacteria double precision,
    bioticocoluna_clorofilaa double precision,
    bioticocoluna_biomassacarbonototalfito double precision,
    bioticocoluna_densidadetotalfito double precision,
    bioticocoluna_biomassazoo double precision,
    bioticocoluna_densidadetotalzoo double precision,
    bioticocoluna_data_medida date,
    bioticocoluna_hora_medida time,
    bioticosuperficie_doc double precision,
    bioticosuperficie_toc double precision,
    bioticosuperficie_poc double precision,
    bioticosuperficie_densidadebacteria double precision,
    bioticosuperficie_biomassabacteria double precision,
    bioticosuperficie_clorofilaa double precision,
    bioticosuperficie_biomassacarbonototalfito double precision,
    bioticosuperficie_densidadetotalfito double precision,
    bioticosuperficie_biomassazoo double precision,
    bioticosuperficie_densidadetotalzoo double precision,
    bioticosuperficie_data_medida date,
    bioticosuperficie_hora_medida time,
    bolhas_profundidade double precision,
    bolhas_nrodefunis integer,
    bolhas_volumecoletado double precision,
    bolhas_co2 double precision,
    bolhas_o2 double precision,
    bolhas_n2 double precision,
    bolhas_ch4 double precision,
    bolhas_n2o double precision,
    bolhas_data_medida date,
    bolhas_hora_medida time,
    camarasolo_ch4 double precision,
    camarasolo_co2 double precision,
    camarasolo_n2o double precision,
    camarasolo_tempar double precision,
    camarasolo_tempsolo double precision,
    camarasolo_vento double precision,
    camarasolo_altitude double precision,
    camarasolo_data_medida date,
    camarasolo_hora_medida time,
    carbono_dc double precision,
    carbono_doc double precision,
    carbono_poc double precision,
    carbono_toc double precision,
    carbono_dic double precision,
    carbono_tc double precision,
    carbono_data_medida date,
    carbono_hora_medida time,
    concentracaogasagua_batimetria double precision,
    concentracaogasagua_altura double precision,
    concentracaogasagua_replica integer,
    concentracaogasagua_ch4 double precision,
    concentracaogasagua_co2 double precision,
    concentracaogasagua_data_medida date,
    concentracaogasagua_hora_medida time,
    concentracaogassedimento_batimetria double precision,
    concentracaogassedimento_profundidadedosedimento double precision,
    concentracaogassedimento_replica integer,
    concentracaogassedimento_ch4 double precision,
    concentracaogassedimento_co2 double precision,
    concentracaogassedimento_data_medida date,
    concentracaogassedimento_hora_medida time,
    difusao_ch4 double precision,
    difusao_co2 double precision,
    difusao_n2o double precision,
    difusao_ph double precision,
    difusao_tempagua double precision,
    difusao_tempar double precision,
    difusao_profundidade double precision,
    difusao_altitude double precision,
    difusao_vento double precision,
    difusao_data_medida date,
    difusao_hora_medida time,
    dupladessorcaoagua_profundidade double precision,
    dupladessorcaoagua_co2 double precision,
    dupladessorcaoagua_o2 double precision,
    dupladessorcaoagua_n2 double precision,
    dupladessorcaoagua_ch4 double precision,
    dupladessorcaoagua_n2o double precision,
    dupladessorcaoagua_data_medida date,
    dupladessorcaoagua_hora_medida time,
    fluxobolhasinpe_profundidade double precision,
    fluxobolhasinpe_ch4 double precision,
    fluxobolhasinpe_ch4_desviopadrao double precision,
    fluxobolhasinpe_ch4_amostras integer,
    fluxobolhasinpe_data_medida date,
    fluxobolhasinpe_hora_medida time,
    fluxocarbono_producaofitoplanctonica double precision,
    fluxocarbono_carbonoorganicoexcretado double precision,
    fluxocarbono_respiracaofito double precision,
    fluxocarbono_producaobacteriana double precision,
    fluxocarbono_respiracaobacteriana double precision,
    fluxocarbono_taxasedimentacao double precision,
    fluxocarbono_data_medida date,
    fluxocarbono_hora_medida time,
    fluxodifusivo_batimetria double precision,
    fluxodifusivo_intervalo text,
    fluxodifusivo_ch4 double precision,
    fluxodifusivo_co2 double precision,
    fluxodifusivo_data_medida date,
    fluxodifusivo_hora_medida time,
    fluxodifusivoinpe_profundidade double precision,
    fluxodifusivoinpe_co2 double precision,
    fluxodifusivoinpe_co2_desviopadrao double precision,
    fluxodifusivoinpe_co2_amostras integer,
    fluxodifusivoinpe_ch4 double precision,
    fluxodifusivoinpe_ch4_desviopadrao double precision,
    fluxodifusivoinpe_ch4_amostras integer,
    fluxodifusivoinpe_datamedida date,
    fluxodifusivoinpe_horamedida time,
    gasesembolhas_profundidade double precision,
    gasesembolhas_co2 double precision,
    gasesembolhas_o2 double precision,
    gasesembolhas_n2 double precision,
    gasesembolhas_ch4 double precision,
    gasesembolhas_n2o double precision,
    gasesembolhas_data_medida date,
    horiba_profundidade double precision,
    horiba_tempagua double precision,
    horiba_condutividade double precision,
    horiba_ph double precision,
    horiba__do double precision,
    horiba_tds double precision,
    horiba_redox double precision,
    horiba_turbidez double precision,
    horiba_data_medida date,
    ionsnaaguaintersticialdosedimento_profundidade double precision,
    ionsnaaguaintersticialdosedimento_batimetria double precision,
    ionsnaaguaintersticialdosedimento_f double precision,
    ionsnaaguaintersticialdosedimento_cl double precision,
    ionsnaaguaintersticialdosedimento_no2 double precision,
    ionsnaaguaintersticialdosedimento_br double precision,
    ionsnaaguaintersticialdosedimento_no3 double precision,
    ionsnaaguaintersticialdosedimento_po4 double precision,
    ionsnaaguaintersticialdosedimento_so4 double precision,
    ionsnaaguaintersticialdosedimento_na double precision,
    ionsnaaguaintersticialdosedimento_nh4 double precision,
    ionsnaaguaintersticialdosedimento_k double precision,
    ionsnaaguaintersticialdosedimento_mg double precision,
    ionsnaaguaintersticialdosedimento_ca double precision,
    ionsnaaguaintersticialdosedimento_acetato double precision,
    ionsnaaguaintersticialdosedimento_data_medida date,
    ionsnaaguaintersticialdosedimento_hora_medida time,
    medidacampocoluna_profundidade double precision,
    medidacampocoluna_secchi double precision,
    medidacampocoluna_tempagua double precision,
    medidacampocoluna_condutividade double precision,
    medidacampocoluna__do double precision,
    medidacampocoluna_ph double precision,
    medidacampocoluna_turbidez double precision,
    medidacampocoluna_materialemsuspensao double precision,
    medidacampocoluna_intensidadeluminosa double precision,
    medidacampocoluna_data_medida date,
    medidacampocoluna_hora_medida time,
    medidacamposuperficie_secchi double precision,
    medidacamposuperficie_tempagua double precision,
    medidacamposuperficie_condutividade double precision,
    medidacamposuperficie__do double precision,
    medidacamposuperficie_ph double precision,
    medidacamposuperficie_turbidez double precision,
    medidacamposuperficie_materialemsuspensao double precision,
    medidacamposuperficie_data_medida date,
    medidacamposuperficie_hora_medida time,
    nutrientessedimento_profundidade double precision,
    nutrientessedimento_batimetria double precision,
    nutrientessedimento_nh4 double precision,
    nutrientessedimento_no2 double precision,
    nutrientessedimento_no3 double precision,
    nutrientessedimento_po4 double precision,
    nutrientessedimento_ptotal double precision,
    nutrientessedimento_ntotal double precision,
    nutrientessedimento_data_medida date,
    nutrientessedimento_hora_medida time,
    parametrosbiologicosfisicosagua_profundidade double precision,
    parametrosbiologicosfisicosagua_secchi double precision,
    parametrosbiologicosfisicosagua_tempagua double precision,
    parametrosbiologicosfisicosagua_condutividade double precision,
    parametrosbiologicosfisicosagua__do double precision,
    parametrosbiologicosfisicosagua_ph double precision,
    parametrosbiologicosfisicosagua_turbidez double precision,
    parametrosbiologicosfisicosagua_materialemsuspensao double precision,
    parametrosbiologicosfisicosagua_doc double precision,
    parametrosbiologicosfisicosagua_toc double precision,
    parametrosbiologicosfisicosagua_poc double precision,
    parametrosbiologicosfisicosagua_dic double precision,
    parametrosbiologicosfisicosagua_nt double precision,
    parametrosbiologicosfisicosagua_pt double precision,
    parametrosbiologicosfisicosagua_densidadebacteria double precision,
    parametrosbiologicosfisicosagua_biomassabacteria double precision,
    parametrosbiologicosfisicosagua_clorofilaa double precision,
    parametrosbiologicosfisicosagua_biomassacarbonototalfito double precision,
    parametrosbiologicosfisicosagua_densidadetotalfito double precision,
    parametrosbiologicosfisicosagua_biomassazoo double precision,
    parametrosbiologicosfisicosagua_densidadetotalzoo double precision,
    parametrosbiologicosfisicosagua_producaofitoplanctonica double precision,
    parametrosbiologicosfisicosagua_carbonoorganicoexcretado double precision,
    parametrosbiologicosfisicosagua_respiracaofito double precision,
    parametrosbiologicosfisicosagua_producaobacteriana double precision,
    parametrosbiologicosfisicosagua_respiracaobacteriana double precision,
    parametrosbiologicosfisicosagua_taxasedimentacao double precision,
    parametrosbiologicosfisicosagua_delta13c double precision,
    parametrosbiologicosfisicosagua_delta15n double precision,
    parametrosbiologicosfisicosagua_intensidadeluminosa double precision,
    parametrosbiologicosfisicosagua_data_medida date,
    pfq_profundidade double precision,
    pfq_batimetria double precision,
    pfq_tempar double precision,
    pfq_tempagua double precision,
    pfq__do double precision,
    pfq_ph double precision,
    pfq_redox double precision,
    pfq_vento text,
    pfq_data_medida date,
    pfq_hora_medida time,
    tc_profundidade text,
    tc_tc double precision,
    tc_data_medida date,
    variaveisfisicasquimicasdaagua_profundidade double precision,
    variaveisfisicasquimicasdaagua_secchi double precision,
    variaveisfisicasquimicasdaagua_batimetria double precision,
    variaveisfisicasquimicasdaagua_f double precision,
    variaveisfisicasquimicasdaagua_cl double precision,
    variaveisfisicasquimicasdaagua_nno3 double precision,
    variaveisfisicasquimicasdaagua_ppo43 double precision,
    variaveisfisicasquimicasdaagua_sso42 double precision,
    variaveisfisicasquimicasdaagua_li double precision,
    variaveisfisicasquimicasdaagua_na double precision,
    variaveisfisicasquimicasdaagua_nnh4 double precision,
    variaveisfisicasquimicasdaagua_k double precision,
    variaveisfisicasquimicasdaagua_mg double precision,
    variaveisfisicasquimicasdaagua_ca double precision,
    variaveisfisicasquimicasdaagua_clorofila double precision,
    variaveisfisicasquimicasdaagua_feofitina double precision,
    variaveisfisicasquimicasdaagua_turbidez double precision,
    variaveisfisicasquimicasdaagua_nt double precision,
    variaveisfisicasquimicasdaagua_pt double precision,
    variaveisfisicasquimicasdaagua_tdc double precision,
    variaveisfisicasquimicasdaagua_data_medida date,
    variaveisfisicasquimicasdaagua_hora_medida time
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY

    SELECT
        i.nome AS instituicao_nome,
        r.nome AS reservatorio_nome,
        s.nome AS sitio_nome,
        c.nroCampanha AS numero_campanha,
        c.datainicio AS data_inicio_campanha,
        c.datafim AS data_fim_campanha,
        abioticocoluna.profundidade AS abioticocoluna_profundidade,
        abioticocoluna.dic AS abioticocoluna_dic,
        abioticocoluna.nt AS abioticocoluna_nt,
        abioticocoluna.pt AS abioticocoluna_pt,
        abioticocoluna.delta13c AS abioticocoluna_delta13c,
        abioticocoluna.delta15n AS abioticocoluna_delta15n,
        abioticocoluna.datamedida AS abioticocoluna_data_medida,
        abioticocoluna.horamedida AS abioticocoluna_hora_medida,
        abioticosuperficie.dic AS abioticosuperficie_dic,
        abioticosuperficie.nt AS abioticosuperficie_nt,
        abioticosuperficie.pt AS abioticosuperficie_pt,
        abioticosuperficie.delta13c AS abioticosuperficie_delta13c,
        abioticosuperficie.delta15n AS abioticosuperficie_delta15n,
        abioticosuperficie.datamedida AS abioticosuperficie_data_medida,
        abioticosuperficie.horamedida AS abioticosuperficie_hora_medida,
        aguamateriaorganicasedimento.profundidade AS aguamateriaorganicasedimento_profundidade,
        aguamateriaorganicasedimento.batimetria AS aguamateriaorganicasedimento_batimetria,
        aguamateriaorganicasedimento.agua AS aguamateriaorganicasedimento_agua,
        aguamateriaorganicasedimento.materiaOrganica AS aguamateriaorganicasedimento_materiaOrganica,
        aguamateriaorganicasedimento.datamedida AS aguamateriaorganicasedimento_data_medida,
        aguamateriaorganicasedimento.horamedida AS aguamateriaorganicasedimento_hora_medida,
        bioticocoluna.profundidade AS bioticocoluna_profundidade,
        bioticocoluna.doc AS bioticocoluna_doc,
        bioticocoluna.toc AS bioticocoluna_toc,
        bioticocoluna.poc AS bioticocoluna_poc,
        bioticocoluna.densidadeBacteria AS bioticocoluna_densidadeBacteria,
        bioticocoluna.biomassaBacteria AS bioticocoluna_biomassaBacteria,
        bioticocoluna.clorofilaA AS bioticocoluna_clorofilaA,
        bioticocoluna.biomassaCarbonoTotalFito AS bioticocoluna_biomassaCarbonoTotalFito,
        bioticocoluna.densidadeTotalFito AS bioticocoluna_densidadeTotalFito,
        bioticocoluna.biomassaZoo AS bioticocoluna_biomassaZoo,
        bioticocoluna.densidadeTotalZoo AS bioticocoluna_densidadeTotalZoo,
        bioticocoluna.datamedida AS bioticocoluna_data_medida,
        bioticocoluna.horamedida AS bioticocoluna_hora_medida,
        bioticosuperficie.doc AS bioticosuperficie_doc,
        bioticosuperficie.toc AS bioticosuperficie_toc,
        bioticosuperficie.poc AS bioticosuperficie_poc,
        bioticosuperficie.densidadeBacteria AS bioticosuperficie_densidadeBacteria,
        bioticosuperficie.biomassaBacteria AS bioticosuperficie_biomassaBacteria,
        bioticosuperficie.clorofilaA AS bioticosuperficie_clorofilaA,
        bioticosuperficie.biomassaCarbonoTotalFito AS bioticosuperficie_biomassaCarbonoTotalFito,
        bioticosuperficie.densidadeTotalFito AS bioticosuperficie_densidadeTotalFito,
        bioticosuperficie.biomassaZoo AS bioticosuperficie_biomassaZoo,
        bioticosuperficie.densidadeTotalZoo AS bioticosuperficie_densidadetotalzoo,
        bioticosuperficie.datamedida AS bioticosuperficie_data_medida,
        bioticosuperficie.horamedida AS bioticosuperficie_hora_medida,
        bolhas.profundidade AS bolhas_profundidade,
        bolhas.nroDeFunis AS bolhas_nroDeFunis,
        bolhas.volumeColetado AS bolhas_volumeColetado,
        bolhas.co2 AS bolhas_co2,
        bolhas.o2 AS bolhas_o2,
        bolhas.n2 AS bolhas_n2,
        bolhas.ch4 AS bolhas_ch4,
        bolhas.n2o AS bolhas_n2o,
        bolhas.datamedida AS bolhas_data_medida,
        bolhas.horamedida AS bolhas_hora_medida,
        camarasolo.ch4 AS camarasolo_ch4,
        camarasolo.co2 AS camarasolo_co2,
        camarasolo.n2o AS camarasolo_n2o,
        camarasolo.tempar AS camarasolo_tempar,
        camarasolo.tempsolo AS camarasolo_tempsolo,
        camarasolo.vento AS camarasolo_vento,
        camarasolo.altitude AS camarasolo_altitude,
        camarasolo.datamedida AS camarasolo_data_medida,
        camarasolo.horamedida AS camarasolo_hora_medida,
        carbono.dc AS carbono_dc,
        carbono.doc AS carbono_doc,
        carbono.poc AS carbono_poc,
        carbono.toc AS carbono_toc,
        carbono.dic AS carbono_dic,
        carbono.tc AS carbono_tc,
        carbono.datamedida AS carbono_data_medida,
        carbono.horamedida AS carbono_hora_medida,
        concentracaogasagua.batimetria AS concentracaogasagua_batimetria,
        concentracaogasagua.altura AS concentracaogasagua_altura,
        concentracaogasagua.replica AS concentracaogasagua_replica,
        concentracaogasagua.ch4 AS concentracaogasagua_ch4,
        concentracaogasagua.co2 AS concentracaogasagua_co2,
        concentracaogasagua.datamedida AS concentracaogasagua_data_medida,
        concentracaogasagua.horamedida AS concentracaogasagua_hora_medida,
        concentracaogassedimento.batimetria AS concentracaogassedimento_batimetria,
        concentracaogassedimento.profundidadeDoSedimento AS concentracaogassedimento_profundidadeDoSedimento,
        concentracaogassedimento.replica AS concentracaogassedimento_replica,
        concentracaogassedimento.ch4 AS concentracaogassedimento_ch4,
        concentracaogassedimento.co2 AS concentracaogassedimento_co2,
        concentracaogassedimento.datamedida AS concentracaogassedimento_data_medida,
        concentracaogassedimento.horamedida AS concentracaogassedimento_hora_medida,
        difusao.ch4 AS difusao_ch4,
        difusao.co2 AS difusao_co2,
        difusao.n2o AS difusao_n2o,
        difusao.ph AS difusao_ph,
        difusao.tempagua AS difusao_tempagua,
        difusao.tempar AS difusao_tempar,
        difusao.profundidade AS difusao_profundidade,
        difusao.altitude AS difusao_altitude,
        difusao.vento AS difusao_vento,
        difusao.datamedida AS difusao_data_medida,
        difusao.horamedida AS difusao_hora_medida,
        dupladessorcaoagua.profundidade AS dupladessorcaoagua_profundidade,
        dupladessorcaoagua.co2 AS dupladessorcaoagua_co2,
        dupladessorcaoagua.o2 AS dupladessorcaoagua_o2,
        dupladessorcaoagua.n2 AS dupladessorcaoagua_n2,
        dupladessorcaoagua.ch4 AS dupladessorcaoagua_ch4,
        dupladessorcaoagua.n2o AS dupladessorcaoagua_n2o,
        dupladessorcaoagua.datamedida AS dupladessorcaoagua_data_medida,
        dupladessorcaoagua.horamedida AS dupladessorcaoagua_hora_medida,
        fluxobolhasinpe.profundidade AS fluxobolhasinpe_profundidade,
        fluxobolhasinpe.ch4 AS fluxobolhasinpe_ch4,
        fluxobolhasinpe.ch4_desviopadrao AS fluxobolhasinpe_ch4_desviopadrao,
        fluxobolhasinpe.ch4_amostras AS fluxobolhasinpe_ch4_amostras,
        fluxobolhasinpe.datamedida AS fluxobolhasinpe_data_medida,
        fluxobolhasinpe.horamedida AS fluxobolhasinpe_hora_medida,
        fluxocarbono.producaofitoplanctonica AS fluxocarbono_producaofitoplanctonica,
        fluxocarbono.carbonoorganicoexcretado AS fluxocarbono_carbonoorganicoexcretado,
        fluxocarbono.respiracaofito AS fluxocarbono_respiracaofito,
        fluxocarbono.producaobacteriana AS fluxocarbono_producaobacteriana,
        fluxocarbono.respiracaobacteriana AS fluxocarbono_respiracaobacteriana,
        fluxocarbono.taxasedimentacao AS fluxocarbono_taxasedimentacao,
        fluxocarbono.datamedida AS fluxocarbono_data_medida,
        fluxocarbono.horamedida AS fluxocarbono_hora_medida,
        fluxodifusivo.batimetria AS fluxodifusivo_batimetria,
        fluxodifusivo.intervalo AS fluxodifusivo_intervalo,
        fluxodifusivo.ch4 AS fluxodifusivo_ch4,
        fluxodifusivo.co2 AS fluxodifusivo_co2,
        fluxodifusivo.datamedida AS fluxodifusivo_data_medida,
        fluxodifusivo.horamedida AS fluxodifusivo_hora_medida,
        fluxodifusivoinpe.profundidade AS fluxodifusivoinpe_profundidade,
        fluxodifusivoinpe.co2 AS fluxodifusivoinpe_co2,
        fluxodifusivoinpe.co2_desviopadrao AS fluxodifusivoinpe_co2_desviopadrao,
        fluxodifusivoinpe.co2_amostras AS fluxodifusivoinpe_co2_amostras,
        fluxodifusivoinpe.ch4 AS fluxodifusivoinpe_ch4,
        fluxodifusivoinpe.ch4_desviopadrao AS fluxodifusivoinpe_ch4_desviopadrao,
        fluxodifusivoinpe.ch4_amostras AS fluxodifusivoinpe_ch4_amostras,
        fluxodifusivoinpe.datamedida AS fluxodifusivoinpe_data_medida,
        fluxodifusivoinpe.horamedida AS fluxodifusivoinpe_hora_medida,
        gasesembolhas.profundidade AS gasesembolhas_profundidade,
        gasesembolhas.co2 AS gasesembolhas_co2,
        gasesembolhas.o2 AS gasesembolhas_o2,
        gasesembolhas.n2 AS gasesembolhas_n2,
        gasesembolhas.ch4 AS gasesembolhas_ch4,
        gasesembolhas.n2o AS gasesembolhas_n2o,
        gasesembolhas.datamedida AS gasesembolhas_data_medida,
        horiba.profundidade AS horiba_profundidade,
        horiba.tempagua AS horiba_tempagua,
        horiba.condutividade AS horiba_condutividade,
        horiba.ph AS horiba_ph,
        horiba._do AS horiba__do,
        horiba.tds AS horiba_tds,
        horiba.redox AS horiba_redox,
        horiba.turbidez AS horiba_turbidez,
        horiba.datamedida AS horiba_data_medida,
        ionsnaaguaintersticialdosedimento.profundidade AS ionsnaaguaintersticialdosedimento_profundidade,
        ionsnaaguaintersticialdosedimento.batimetria AS ionsnaaguaintersticialdosedimento_batimetria,
        ionsnaaguaintersticialdosedimento.f AS ionsnaaguaintersticialdosedimento_f,
        ionsnaaguaintersticialdosedimento.cl AS ionsnaaguaintersticialdosedimento_cl,
        ionsnaaguaintersticialdosedimento.no2 AS ionsnaaguaintersticialdosedimento_no2,
        ionsnaaguaintersticialdosedimento.br AS ionsnaaguaintersticialdosedimento_br,
        ionsnaaguaintersticialdosedimento.no3 AS ionsnaaguaintersticialdosedimento_no3,
        ionsnaaguaintersticialdosedimento.po4 AS ionsnaaguaintersticialdosedimento_po4,
        ionsnaaguaintersticialdosedimento.so4 AS ionsnaaguaintersticialdosedimento_so4,
        ionsnaaguaintersticialdosedimento.na AS ionsnaaguaintersticialdosedimento_na,
        ionsnaaguaintersticialdosedimento.nh4 AS ionsnaaguaintersticialdosedimento_nh4,
        ionsnaaguaintersticialdosedimento.k AS ionsnaaguaintersticialdosedimento_k,
        ionsnaaguaintersticialdosedimento.mg AS ionsnaaguaintersticialdosedimento_mg,
        ionsnaaguaintersticialdosedimento.ca AS ionsnaaguaintersticialdosedimento_ca,
        ionsnaaguaintersticialdosedimento.acetato AS ionsnaaguaintersticialdosedimento_acetato,
        ionsnaaguaintersticialdosedimento.datamedida AS ionsnaaguaintersticialdosedimento_data_medida,
        ionsnaaguaintersticialdosedimento.horamedida AS ionsnaaguaintersticialdosedimento_hora_medida,
        medidacampocoluna.profundidade AS medidacampocoluna_profundidade,
        medidacampocoluna.secchi AS medidacampocoluna_secchi,
        medidacampocoluna.tempagua AS medidacampocoluna_tempagua,
        medidacampocoluna.condutividade AS medidacampocoluna_condutividade,
        medidacampocoluna._do AS medidacampocoluna__do,
        medidacampocoluna.ph AS medidacampocoluna_ph,
        medidacampocoluna.turbidez AS medidacampocoluna_turbidez,
        medidacampocoluna.materialemsuspensao AS medidacampocoluna_materialemsuspensao,
        medidacampocoluna.intensidadeluminosa AS medidacampocoluna_intensidadeluminosa,
        medidacampocoluna.datamedida AS medidacampocoluna_data_medida,
        medidacampocoluna.horamedida AS medidacampocoluna_hora_medida,
        medidacamposuperficie.secchi AS medidacamposuperficie_secchi,
        medidacamposuperficie.tempagua AS medidacamposuperficie_tempagua,
        medidacamposuperficie.condutividade AS medidacamposuperficie_condutividade,
        medidacamposuperficie._do AS medidacamposuperficie__do,
        medidacamposuperficie.ph AS medidacamposuperficie_ph,
        medidacamposuperficie.turbidez AS medidacamposuperficie_turbidez,
        medidacamposuperficie.materialemsuspensao AS medidacamposuperficie_materialemsuspensao,
        medidacamposuperficie.datamedida AS medidacamposuperficie_data_medida,
        medidacamposuperficie.horamedida AS medidacamposuperficie_hora_medida,
        nutrientessedimento.profundidade AS nutrientessedimento_profundidade,
        nutrientessedimento.batimetria AS nutrientessedimento_batimetria,
        nutrientessedimento.nh4 AS nutrientessedimento_nh4,
        nutrientessedimento.no2 AS nutrientessedimento_no2,
        nutrientessedimento.no3 AS nutrientessedimento_no3,
        nutrientessedimento.po4 AS nutrientessedimento_po4,
        nutrientessedimento.ptotal AS nutrientessedimento_ptotal,
        nutrientessedimento.ntotal AS nutrientessedimento_ntotal,
        nutrientessedimento.datamedida AS nutrientessedimento_data_medida,
        nutrientessedimento.horamedida AS nutrientessedimento_hora_medida,
        parametrosbiologicosfisicosagua.profundidade AS parametrosbiologicosfisicosagua_profundidade,
        parametrosbiologicosfisicosagua.secchi AS parametrosbiologicosfisicosagua_secchi,
        parametrosbiologicosfisicosagua.tempagua AS parametrosbiologicosfisicosagua_tempagua,
        parametrosbiologicosfisicosagua.condutividade AS parametrosbiologicosfisicosagua_condutividade,
        parametrosbiologicosfisicosagua._do AS parametrosbiologicosfisicosagua__do,
        parametrosbiologicosfisicosagua.ph AS parametrosbiologicosfisicosagua_ph,
        parametrosbiologicosfisicosagua.turbidez AS parametrosbiologicosfisicosagua_turbidez,
        parametrosbiologicosfisicosagua.materialemsuspensao AS parametrosbiologicosfisicosagua_materialemsuspensao,
        parametrosbiologicosfisicosagua.doc AS parametrosbiologicosfisicosagua_doc,
        parametrosbiologicosfisicosagua.toc AS parametrosbiologicosfisicosagua_toc,
        parametrosbiologicosfisicosagua.poc AS parametrosbiologicosfisicosagua_poc,
        parametrosbiologicosfisicosagua.dic AS parametrosbiologicosfisicosagua_dic,
        parametrosbiologicosfisicosagua.nt AS parametrosbiologicosfisicosagua_nt,
        parametrosbiologicosfisicosagua.pt AS parametrosbiologicosfisicosagua_pt,
        parametrosbiologicosfisicosagua.densidadebacteria AS parametrosbiologicosfisicosagua_densidadebacteria,
        parametrosbiologicosfisicosagua.biomassabacteria AS parametrosbiologicosfisicosagua_biomassabacteria,
        parametrosbiologicosfisicosagua.clorofilaa AS parametrosbiologicosfisicosagua_clorofilaa,
        parametrosbiologicosfisicosagua.biomassacarbonototalfito AS parametrosbiologicosfisicosagua_biomassacarbonototalfito,
        parametrosbiologicosfisicosagua.densidadetotalfito AS parametrosbiologicosfisicosagua_densidadetotalfito,
        parametrosbiologicosfisicosagua.biomassazoo AS parametrosbiologicosfisicosagua_biomassazoo,
        parametrosbiologicosfisicosagua.densidadetotalzoo AS parametrosbiologicosfisicosagua_densidadetotalzoo,
        parametrosbiologicosfisicosagua.producaofitoplanctonica AS parametrosbiologicosfisicosagua_producaofitoplanctonica,
        parametrosbiologicosfisicosagua.carbonoorganicoexcretado AS parametrosbiologicosfisicosagua_carbonoorganicoexcretado,
        parametrosbiologicosfisicosagua.respiracaofito AS parametrosbiologicosfisicosagua_respiracaofito,
        parametrosbiologicosfisicosagua.producaobacteriana AS parametrosbiologicosfisicosagua_producaobacteriana,
        parametrosbiologicosfisicosagua.respiracaobacteriana AS parametrosbiologicosfisicosagua_respiracaobacteriana,
        parametrosbiologicosfisicosagua.taxasedimentacao AS parametrosbiologicosfisicosagua_taxasedimentacao,
        parametrosbiologicosfisicosagua.delta13c AS parametrosbiologicosfisicosagua_delta13c,
        parametrosbiologicosfisicosagua.delta15n AS parametrosbiologicosfisicosagua_delta15n,
        parametrosbiologicosfisicosagua.intensidadeluminosa AS parametrosbiologicosfisicosagua_intensidadeluminosa,
        parametrosbiologicosfisicosagua.datamedida AS parametrosbiologicosfisicosagua_data_medida,
        pfq.profundidade AS pfq_profundidade,
        pfq.batimetria AS pfq_batimetria,
        pfq.tempar AS pfq_tempar,
        pfq.tempagua AS pfq_tempagua,
        pfq._do AS pfq__do,
        pfq.ph AS pfq_ph,
        pfq.redox AS pfq_redox,
        pfq.vento AS pfq_vento,
        pfq.datamedida AS pfq_data_medida,
        pfq.horamedida AS pfq_hora_medida,
        tc.profundidade AS tc_profundidade,
        tc.tc AS tc_tc,
        tc.datamedida AS tc_data_medida,
        variaveisfisicasquimicasdaagua.profundidade AS variaveisfisicasquimicasdaagua_profundidade,
        variaveisfisicasquimicasdaagua.secchi AS variaveisfisicasquimicasdaagua_secchi,
        variaveisfisicasquimicasdaagua.batimetria AS variaveisfisicasquimicasdaagua_batimetria,
        variaveisfisicasquimicasdaagua.f AS variaveisfisicasquimicasdaagua_f,
        variaveisfisicasquimicasdaagua.cl AS variaveisfisicasquimicasdaagua_cl,
        variaveisfisicasquimicasdaagua.nno3 AS variaveisfisicasquimicasdaagua_nno3,
        variaveisfisicasquimicasdaagua.ppo43 AS variaveisfisicasquimicasdaagua_ppo43,
        variaveisfisicasquimicasdaagua.sso42 AS variaveisfisicasquimicasdaagua_sso42,
        variaveisfisicasquimicasdaagua.li AS variaveisfisicasquimicasdaagua_li,
        variaveisfisicasquimicasdaagua.na AS variaveisfisicasquimicasdaagua_na,
        variaveisfisicasquimicasdaagua.nnh4 AS variaveisfisicasquimicasdaagua_nnh4,
        variaveisfisicasquimicasdaagua.k AS variaveisfisicasquimicasdaagua_k,
        variaveisfisicasquimicasdaagua.mg AS variaveisfisicasquimicasdaagua_mg,
        variaveisfisicasquimicasdaagua.ca AS variaveisfisicasquimicasdaagua_ca,
        variaveisfisicasquimicasdaagua.clorofila AS variaveisfisicasquimicasdaagua_clorofila,
        variaveisfisicasquimicasdaagua.feofitina AS variaveisfisicasquimicasdaagua_feofitina,
        variaveisfisicasquimicasdaagua.turbidez AS variaveisfisicasquimicasdaagua_turbidez,
        variaveisfisicasquimicasdaagua.nt AS variaveisfisicasquimicasdaagua_nt,
        variaveisfisicasquimicasdaagua.pt AS variaveisfisicasquimicasdaagua_pt,
        variaveisfisicasquimicasdaagua.tdc AS variaveisfisicasquimicasdaagua_tdc,
        variaveisfisicasquimicasdaagua.datamedida AS variaveisfisicasquimicasdaagua_data_medida,
        variaveisfisicasquimicasdaagua.horamedida AS variaveisficasquimicasdaagua_hora_medida
    FROM tbcampanha c
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    JOIN tbsitio s ON c.idreservatorio = s.idreservatorio
    LEFT JOIN tbabioticocoluna abioticocoluna ON abioticocoluna.idcampanha = c.idcampanha AND abioticocoluna.idsitio = s.idsitio
    LEFT JOIN tbabioticosuperficie abioticosuperficie ON abioticosuperficie.idcampanha = c.idcampanha AND abioticosuperficie.idsitio = s.idsitio
    LEFT JOIN tbaguamateriaorganicasedimento aguamateriaorganicasedimento ON aguamateriaorganicasedimento.idcampanha = c.idcampanha AND aguamateriaorganicasedimento.idsitio = s.idsitio
    LEFT JOIN tbbioticocoluna bioticocoluna ON bioticocoluna.idcampanha = c.idcampanha AND bioticocoluna.idsitio = s.idsitio
    LEFT JOIN tbbioticosuperficie bioticosuperficie ON bioticosuperficie.idcampanha = c.idcampanha AND bioticosuperficie.idsitio = s.idsitio
    LEFT JOIN tbbolhas bolhas ON bolhas.idcampanha = c.idcampanha AND bolhas.idsitio = s.idsitio
    LEFT JOIN tbcamarasolo camarasolo ON camarasolo.idcampanha = c.idcampanha AND camarasolo.idsitio = s.idsitio
    LEFT JOIN tbcarbono carbono ON carbono.idcampanha = c.idcampanha AND carbono.idsitio = s.idsitio
    LEFT JOIN tbconcentracaogasagua concentracaogasagua ON concentracaogasagua.idcampanha = c.idcampanha AND concentracaogasagua.idsitio = s.idsitio
    LEFT JOIN tbconcentracaogassedimento concentracaogassedimento ON concentracaogassedimento.idcampanha = c.idcampanha AND concentracaogassedimento.idsitio = s.idsitio
    LEFT JOIN tbdifusao difusao ON difusao.idcampanha = c.idcampanha AND difusao.idsitio = s.idsitio
    LEFT JOIN tbdupladessorcaoagua dupladessorcaoagua ON dupladessorcaoagua.idcampanha = c.idcampanha AND dupladessorcaoagua.idsitio = s.idsitio
    LEFT JOIN tbfluxobolhasinpe fluxobolhasinpe ON fluxobolhasinpe.idcampanha = c.idcampanha AND fluxobolhasinpe.idsitio = s.idsitio
    LEFT JOIN tbfluxocarbono fluxocarbono ON fluxocarbono.idcampanha = c.idcampanha AND fluxocarbono.idsitio = s.idsitio
    LEFT JOIN tbfluxodifusivo fluxodifusivo ON fluxodifusivo.idcampanha = c.idcampanha AND fluxodifusivo.idsitio = s.idsitio
    LEFT JOIN tbfluxodifusivoinpe fluxodifusivoinpe ON fluxodifusivoinpe.idcampanha = c.idcampanha AND fluxodifusivoinpe.idsitio = s.idsitio
    LEFT JOIN tbgasesembolhas gasesembolhas ON gasesembolhas.idcampanha = c.idcampanha AND gasesembolhas.idsitio = s.idsitio
    LEFT JOIN tbhoriba horiba ON horiba.idcampanha = c.idcampanha AND horiba.idsitio = s.idsitio
    LEFT JOIN tbionsnaaguaintersticialdosedimento ionsnaaguaintersticialdosedimento ON ionsnaaguaintersticialdosedimento.idcampanha = c.idcampanha AND ionsnaaguaintersticialdosedimento.idsitio = s.idsitio
    LEFT JOIN tbmedidacampocoluna medidacampocoluna ON medidacampocoluna.idcampanha = c.idcampanha AND medidacampocoluna.idsitio = s.idsitio
    LEFT JOIN tbmedidacamposuperficie medidacamposuperficie ON medidacamposuperficie.idcampanha = c.idcampanha AND medidacamposuperficie.idsitio = s.idsitio
    LEFT JOIN tbnutrientessedimento nutrientessedimento ON nutrientessedimento.idcampanha = c.idcampanha AND nutrientessedimento.idsitio = s.idsitio
    LEFT JOIN tbparametrosbiologicosfisicosagua parametrosbiologicosfisicosagua ON parametrosbiologicosfisicosagua.idcampanha = c.idcampanha AND parametrosbiologicosfisicosagua.idsitio = s.idsitio
    LEFT JOIN tbpfq pfq ON pfq.idcampanha = c.idcampanha AND pfq.idsitio = s.idsitio
    LEFT JOIN tbtc tc ON tc.idcampanha = c.idcampanha AND tc.idsitio = s.idsitio
    LEFT JOIN tbvariaveisfisicasquimicasdaagua variaveisfisicasquimicasdaagua ON variaveisfisicasquimicasdaagua.idcampanha = c.idcampanha AND variaveisfisicasquimicasdaagua.idsitio = s.idsitio
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idcampanha IS NULL OR c.idcampanha = p_idcampanha)
      AND (p_data_inicio IS NULL OR c.datainicio >= p_data_inicio)
      AND (p_data_fim IS NULL OR c.datafim <= p_data_fim)
    ORDER BY c.datainicio DESC, c.horamedida DESC
    LIMIT p_limit_param
    OFFSET p_offset_param;
END;
$$ LANGUAGE plpgsql;


-- ==================================================================
-- Funções que filtram por NOME da INSTITUIÇÃO (p_instituicao_nome TEXT)
-- ==================================================================

-- =========================
-- ABIÓTICO - COLUNA
-- =========================
CREATE OR REPLACE FUNCTION buscar_abioticocoluna(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    dic DOUBLE PRECISION,
    nt DOUBLE PRECISION,
    pt DOUBLE PRECISION,
    delta13c DOUBLE PRECISION,
    delta15n DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.profundidade, t.dic, t.nt, t.pt, t.delta13c, t.delta15n,
        s.nome, i.nome, r.nome
    FROM tbabioticocoluna t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- ABIÓTICO - SUPERFÍCIE
-- =========================
CREATE OR REPLACE FUNCTION buscar_abioticosuperficie(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    dic DOUBLE PRECISION,
    nt DOUBLE PRECISION,
    pt DOUBLE PRECISION,
    delta13c DOUBLE PRECISION,
    delta15n DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
        t.dic, t.nt, t.pt, t.delta13c, t.delta15n,
        s.nome, i.nome, r.nome
    FROM tbabioticosuperficie t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- ÁGUA - MATÉRIA ORGÂNICA E SEDIMENTO
-- =========================
CREATE OR REPLACE FUNCTION buscar_aguamateriaorganicasedimento(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    batimetria DOUBLE PRECISION,
    agua DOUBLE PRECISION,
    materiaorganica DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.batimetria, t.agua, t.materiaOrganica,
           s.nome, i.nome, r.nome
    FROM tbaguamateriaorganicasedimento t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- BIÓTICO - COLUNA
-- =========================
CREATE OR REPLACE FUNCTION buscar_bioticocoluna(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    doc DOUBLE PRECISION,
    toc DOUBLE PRECISION,
    poc DOUBLE PRECISION,
    densidadebacteria DOUBLE PRECISION,
    clorofilaA DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.doc, t.toc, t.poc, t.densidadeBacteria, t.clorofilaA,
           s.nome, i.nome, r.nome
    FROM tbbioticocoluna t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- BIÓTICO - SUPERFÍCIE
-- =========================
CREATE OR REPLACE FUNCTION buscar_bioticosuperficie(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    doc DOUBLE PRECISION,
    toc DOUBLE PRECISION,
    poc DOUBLE PRECISION,
    densidadebacteria DOUBLE PRECISION,
    clorofilaA DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.doc, t.toc, t.poc, t.densidadeBacteria, t.clorofilaA,
           s.nome, i.nome, r.nome
    FROM tbbioticosuperficie t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- BOLHAS
-- =========================
CREATE OR REPLACE FUNCTION buscar_bolhas(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    nrodefunis INTEGER,
    volumecoletado DOUBLE PRECISION,
    ch4 DOUBLE PRECISION,
    co2 DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.nroDeFunis, t.volumeColetado, t.ch4, t.co2,
           s.nome, i.nome, r.nome
    FROM tbbolhas t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- CÂMARA DE SOLO
-- =========================
CREATE OR REPLACE FUNCTION buscar_camarasolo(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    ch4 DOUBLE PRECISION,
    co2 DOUBLE PRECISION,
    n2o DOUBLE PRECISION,
    tempar DOUBLE PRECISION,
    tempsolo DOUBLE PRECISION,
    vento DOUBLE PRECISION,
    altitude DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.ch4, t.co2, t.n2o, t.tempar, t.tempsolo, t.vento, t.altitude,
           s.nome, i.nome, r.nome
    FROM tbcamarasolo t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- CARBONO
-- =========================
CREATE OR REPLACE FUNCTION buscar_carbono(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    dc DOUBLE PRECISION,
    doc DOUBLE PRECISION,
    poc DOUBLE PRECISION,
    toc DOUBLE PRECISION,
    dic DOUBLE PRECISION,
    tc DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.dc, t.doc, t.poc, t.toc, t.dic, t.tc,
           s.nome, i.nome, r.nome
    FROM tbcarbono t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- CONCENTRAÇÃO GÁS - ÁGUA
-- =========================
CREATE OR REPLACE FUNCTION buscar_concentracaogasagua(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    batimetria DOUBLE PRECISION,
    altura DOUBLE PRECISION,
    replica INTEGER,
    ch4 DOUBLE PRECISION,
    co2 DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.batimetria, t.altura, t.replica, t.ch4, t.co2,
           s.nome, i.nome, r.nome
    FROM tbconcentracaogasagua t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- CONCENTRAÇÃO GÁS - SEDIMENTO
-- =========================
CREATE OR REPLACE FUNCTION buscar_concentracaogassedimento(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    batimetria DOUBLE PRECISION,
    profundidadeDoSedimento DOUBLE PRECISION,
    replica INTEGER,
    ch4 DOUBLE PRECISION,
    co2 DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.batimetria, t.profundidadeDoSedimento, t.replica, t.ch4, t.co2,
           s.nome, i.nome, r.nome
    FROM tbconcentracaogassedimento t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- DIFUSÃO
-- =========================
CREATE OR REPLACE FUNCTION buscar_difusao(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    ch4 DOUBLE PRECISION,
    co2 DOUBLE PRECISION,
    n2o DOUBLE PRECISION,
    ph DOUBLE PRECISION,
    tempagua DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.ch4, t.co2, t.n2o, t.ph, t.tempagua,
           s.nome, i.nome, r.nome
    FROM tbdifusao t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- DUPLA DESSORÇÃO ÁGUA
-- =========================
CREATE OR REPLACE FUNCTION buscar_dupladessorcaoagua(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    co2 DOUBLE PRECISION,
    o2 DOUBLE PRECISION,
    n2 DOUBLE PRECISION,
    ch4 DOUBLE PRECISION,
    n2o DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.co2, t.o2, t.n2, t.ch4, t.n2o,
           s.nome, i.nome, r.nome
    FROM tbdupladessorcaoagua t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- FLUXO - BOLHAS (INPE)
-- =========================
CREATE OR REPLACE FUNCTION buscar_fluxobolhasinpe(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    ch4 DOUBLE PRECISION,
    ch4_desviopadrao DOUBLE PRECISION,
    ch4_amostras INTEGER,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.ch4, t.ch4_desviopadrao, t.ch4_amostras,
           s.nome, i.nome, r.nome
    FROM tbfluxobolhasinpe t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- FLUXO - CARBONO
-- =========================
CREATE OR REPLACE FUNCTION buscar_fluxocarbono(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    producaofitoplanctonica DOUBLE PRECISION,
    carbonoorganicoexcretado DOUBLE PRECISION,
    respiracaofito DOUBLE PRECISION,
    producaobacteriana DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.producaofitoplanctonica, t.carbonoorganicoexcretado, t.respiracaofito, t.producaobacteriana,
           s.nome, i.nome, r.nome
    FROM tbfluxocarbono t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- FLUXO - DIFUSIVO
-- =========================
CREATE OR REPLACE FUNCTION buscar_fluxodifusivo(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    batimetria DOUBLE PRECISION,
    intervalo TEXT,
    ch4 DOUBLE PRECISION,
    co2 DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.batimetria, t.intervalo, t.ch4, t.co2,
           s.nome, i.nome, r.nome
    FROM tbfluxodifusivo t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- FLUXO - DIFUSIVO INPE
-- =========================
CREATE OR REPLACE FUNCTION buscar_fluxodifusivoinpe(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    co2 DOUBLE PRECISION,
    co2_desviopadrao DOUBLE PRECISION,
    co2_amostras INTEGER,
    ch4 DOUBLE PRECISION,
    ch4_desviopadrao DOUBLE PRECISION,
    ch4_amostras INTEGER,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.co2, t.co2_desviopadrao, t.co2_amostras, t.ch4, t.ch4_desviopadrao, t.ch4_amostras,
           s.nome, i.nome, r.nome
    FROM tbfluxodifusivoinpe t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- GASES - BOLHAS
-- =========================
CREATE OR REPLACE FUNCTION buscar_gasesembolhas(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    co2 DOUBLE PRECISION,
    o2 DOUBLE PRECISION,
    n2 DOUBLE PRECISION,
    ch4 DOUBLE PRECISION,
    n2o DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.co2, t.o2, t.n2, t.ch4, t.n2o,
           s.nome, i.nome, r.nome
    FROM tbgasesembolhas t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- HORIBA (SENSOR DE CAMPO)
-- =========================
CREATE OR REPLACE FUNCTION buscar_horiba(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    tempagua DOUBLE PRECISION,
    condutividade DOUBLE PRECISION,
    ph DOUBLE PRECISION,
    _do DOUBLE PRECISION,
    tds DOUBLE PRECISION,
    redox DOUBLE PRECISION,
    turbidez DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.tempagua, t.condutividade, t.ph, t._do, t.tds, t.redox, t.turbidez,
           s.nome, i.nome, r.nome
    FROM tbhoriba t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- IONS NA ÁGUA INTERSTICIAL DO SEDIMENTO
-- =========================
CREATE OR REPLACE FUNCTION buscar_ionsnaaguaintersticialdosedimento(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    batimetria DOUBLE PRECISION,
    f DOUBLE PRECISION,
    cl DOUBLE PRECISION,
    no2 DOUBLE PRECISION,
    br DOUBLE PRECISION,
    no3 DOUBLE PRECISION,
    po4 DOUBLE PRECISION,
    so4 DOUBLE PRECISION,
    na DOUBLE PRECISION,
    nh4 DOUBLE PRECISION,
    k DOUBLE PRECISION,
    mg DOUBLE PRECISION,
    ca DOUBLE PRECISION,
    acetato DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.batimetria, t.f, t.cl, t.no2, t.br, t.no3, t.po4, t.so4, t.na, t.nh4, t.k, t.mg, t.ca, t.acetato,
           s.nome, i.nome, r.nome
    FROM tbionsnaaguaintersticialdosedimento t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- MEDIDA CAMPOS - COLUNA
-- =========================
CREATE OR REPLACE FUNCTION buscar_medidacampocoluna(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    secchi DOUBLE PRECISION,
    tempagua DOUBLE PRECISION,
    condutividade DOUBLE PRECISION,
    _do DOUBLE PRECISION,
    ph DOUBLE PRECISION,
    turbidez DOUBLE PRECISION,
    materialemsuspensao DOUBLE PRECISION,
    intensidadeluminosa DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.secchi, t.tempagua, t.condutividade, t._do, t.ph, t.turbidez, t.materialemsuspensao, t.intensidadeluminosa,
           s.nome, i.nome, r.nome
    FROM tbmedidacampocoluna t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- MEDIDA CAMPOS - SUPERFÍCIE
-- =========================
CREATE OR REPLACE FUNCTION buscar_medidacamposuperficie(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    secchi DOUBLE PRECISION,
    tempagua DOUBLE PRECISION,
    condutividade DOUBLE PRECISION,
    _do DOUBLE PRECISION,
    ph DOUBLE PRECISION,
    turbidez DOUBLE PRECISION,
    materialemsuspensao DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.secchi, t.tempagua, t.condutividade, t._do, t.ph, t.turbidez, t.materialemsuspensao,
           s.nome, i.nome, r.nome
    FROM tbmedidacamposuperficie t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- NUTRIENTES - SEDIMENTO
-- =========================
CREATE OR REPLACE FUNCTION buscar_nutrientessedimento(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    batimetria DOUBLE PRECISION,
    nh4 DOUBLE PRECISION,
    no2 DOUBLE PRECISION,
    no3 DOUBLE PRECISION,
    po4 DOUBLE PRECISION,
    ptotal DOUBLE PRECISION,
    ntotal DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.batimetria, t.nh4, t.no2, t.no3, t.po4, t.ptotal, t.ntotal,
           s.nome, i.nome, r.nome
    FROM tbnutrientessedimento t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- PARÂMETROS BIOLÓGICOS/FÍSICOS ÁGUA
-- =========================
CREATE OR REPLACE FUNCTION buscar_parametrosbiologicosfisicosagua(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    secchi DOUBLE PRECISION,
    tempagua DOUBLE PRECISION,
    condutividade DOUBLE PRECISION,
    _do DOUBLE PRECISION,
    ph DOUBLE PRECISION,
    turbidez DOUBLE PRECISION,
    doc DOUBLE PRECISION,
    toc DOUBLE PRECISION,
    poc DOUBLE PRECISION,
    dic DOUBLE PRECISION,
    nt DOUBLE PRECISION,
    pt DOUBLE PRECISION,
    clorofilaA DOUBLE PRECISION,
    producaofitoplanctonica DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.secchi, t.tempagua, t.condutividade, t._do, t.ph, t.turbidez,
           t.doc, t.toc, t.poc, t.dic, t.nt, t.pt, t.clorofilaA, t.producaofitoplanctonica,
           s.nome, i.nome, r.nome
    FROM tbparametrosbiologicosfisicosagua t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- PFQ
-- =========================
CREATE OR REPLACE FUNCTION buscar_pfq(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    batimetria DOUBLE PRECISION,
    tempar DOUBLE PRECISION,
    tempagua DOUBLE PRECISION,
    _do DOUBLE PRECISION,
    ph DOUBLE PRECISION,
    redox DOUBLE PRECISION,
    vento TEXT,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.batimetria, t.tempar, t.tempagua, t._do, t.ph, t.redox, t.vento,
           s.nome, i.nome, r.nome
    FROM tbpfq t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- TC
-- =========================
CREATE OR REPLACE FUNCTION buscar_tc(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade TEXT,
    tc DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.tc,
           s.nome, i.nome, r.nome
    FROM tbtc t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- VARIÁVEIS FÍSICO-QUÍMICAS DA ÁGUA
-- =========================
CREATE OR REPLACE FUNCTION buscar_variaveisfisicasquimicasdaagua(
    p_instituicao_nome TEXT DEFAULT NULL,
    p_idreservatorio integer DEFAULT NULL,
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE (
    datahora TIMESTAMP,
    profundidade DOUBLE PRECISION,
    secchi DOUBLE PRECISION,
    batimetria DOUBLE PRECISION,
    f DOUBLE PRECISION,
    cl DOUBLE PRECISION,
    nno3 DOUBLE PRECISION,
    ppo43 DOUBLE PRECISION,
    sso42 DOUBLE PRECISION,
    li DOUBLE PRECISION,
    na DOUBLE PRECISION,
    nnh4 DOUBLE PRECISION,
    k DOUBLE PRECISION,
    mg DOUBLE PRECISION,
    ca DOUBLE PRECISION,
    clorofila DOUBLE PRECISION,
    feofitina DOUBLE PRECISION,
    turbidez DOUBLE PRECISION,
    nt DOUBLE PRECISION,
    pt DOUBLE PRECISION,
    tdc DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp,
           t.profundidade, t.secchi, t.batimetria, t.f, t.cl, t.nno3, t.ppo43, t.sso42, t.li,
           t.na, t.nnh4, t.k, t.mg, t.ca, t.clorofila, t.feofitina, t.turbidez, t.nt, t.pt, t.tdc,
           s.nome, i.nome, r.nome
    FROM tbvariaveisfisicasquimicasdaagua t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_instituicao_nome IS NULL OR i.nome ILIKE '%' || p_instituicao_nome || '%')
      AND (p_idreservatorio IS NULL OR c.idreservatorio = p_idreservatorio)
      AND (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;

-- ==================================================================
-- FIM DO SCRIPT: funções geradas (filtragem por nome da instituição).
-- =================================================================


-- =========================
-- TODAS AS COORDENADAS DA INSTITUIÇÃO
-- =========================

CREATE OR REPLACE FUNCTION buscar_sitios_por_instituicao(
    p_idinstituicao integer
)
RETURNS TABLE (
    idsitio integer,
    nome_sitio varchar(100),
    lat double precision,
    lng double precision,
    descricao text,
    nome_reservatorio varchar(50),
    nome_instituicao varchar(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        s.idsitio,
        s.nome AS nome_sitio,
        s.lat,
        s.lng,
        s.descricao::text, -- cast aqui
        r.nome AS nome_reservatorio,
        i.nome AS nome_instituicao
    FROM
        tbsitio s
    JOIN
        tbreservatorio r ON s.idreservatorio = r.idreservatorio
    JOIN
        tbcampanha c ON r.idreservatorio = c.idreservatorio
    JOIN
        tbinstituicao i ON c.idinstituicao = i.idinstituicao
    WHERE
        i.idinstituicao = p_idinstituicao
    ORDER BY
        s.nome;
END;
$$;
