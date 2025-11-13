-- =====================================
-- PROCEDURE: buscar_reservatorios_por_instituicao
-- =====================================

CREATE OR REPLACE FUNCTION buscar_reservatorios_por_instituicao(
    p_nome_instituicao VARCHAR DEFAULT NULL
)
RETURNS TABLE (
    idreservatorio INTEGER,
    nome_reservatorio VARCHAR(50),
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    nome_instituicao VARCHAR(50)
)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT
        r.idreservatorio,
        r.nome::VARCHAR(50) AS nome_reservatorio,
        r.lat::DOUBLE PRECISION,
        r.lng::DOUBLE PRECISION,
        i.nome::VARCHAR(50) AS nome_instituicao
    FROM tbreservatorio r
    JOIN tbcampanha c ON r.idreservatorio = c.idreservatorio
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    WHERE (p_nome_instituicao IS NULL OR i.nome ILIKE '%' || TRIM(p_nome_instituicao) || '%')
    ORDER BY nome_reservatorio;
END;
$$;


-- =====================================
-- PROCEDURE: buscar_geral
-- =====================================

CREATE OR REPLACE FUNCTION buscar_fluxoinpe_por_reservatorio_detalhado(
    p_idreservatorio INTEGER,
    p_limit INTEGER DEFAULT NULL,
    p_offset INTEGER DEFAULT NULL
)
RETURNS TABLE (
    datahora TIMESTAMP,
    ch4 DOUBLE PRECISION,
    batimetria DOUBLE PRECISION,
    tempar DOUBLE PRECISION,
    tempcupula DOUBLE PRECISION,
    tempaguasubsuperficie DOUBLE PRECISION,
    tempaguameio DOUBLE PRECISION,
    tempaguafundo DOUBLE PRECISION,
    phsubsuperficie DOUBLE PRECISION,
    phmeio DOUBLE PRECISION,
    phfundo DOUBLE PRECISION,
    orpsubsuperficie DOUBLE PRECISION,
    orpmeio DOUBLE PRECISION,
    orpfundo DOUBLE PRECISION,
    condutividadesubsuperficie DOUBLE PRECISION,
    condutividademeio DOUBLE PRECISION,
    condutividadefundo DOUBLE PRECISION,
    odsubsuperficie DOUBLE PRECISION,
    odmeio DOUBLE PRECISION,
    odfundo DOUBLE PRECISION,
    tsdsubsuperficie DOUBLE PRECISION,
    tsdmeio DOUBLE PRECISION,
    tsdfundo DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT,
    total_count BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.ch4::DOUBLE PRECISION,
        t.batimetria::DOUBLE PRECISION,
        t.tempar::DOUBLE PRECISION,
        t.tempcupula::DOUBLE PRECISION,
        t.tempaguasubsuperficie::DOUBLE PRECISION,
        t.tempaguameio::DOUBLE PRECISION,
        t.tempaguafundo::DOUBLE PRECISION,
        t.phsubsuperficie::DOUBLE PRECISION,
        t.phmeio::DOUBLE PRECISION,
        t.phfundo::DOUBLE PRECISION,
        t.orpsubsuperficie::DOUBLE PRECISION,
        t.orpmeio::DOUBLE PRECISION,
        t.orpfundo::DOUBLE PRECISION,
        t.condutividadesubsuperficie::DOUBLE PRECISION,
        t.condutividademeio::DOUBLE PRECISION,
        t.condutividadefundo::DOUBLE PRECISION,
        t.odsubsuperficie::DOUBLE PRECISION,
        t.odmeio::DOUBLE PRECISION,
        t.odfundo::DOUBLE PRECISION,
        t.tsdsubsuperficie::DOUBLE PRECISION,
        t.tsdmeio::DOUBLE PRECISION,
        t.tsdfundo::DOUBLE PRECISION,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome,
        COUNT(*) OVER() AS total_count
    FROM tbfluxoinpe t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = t.idsitio
    WHERE r.idreservatorio = p_idreservatorio
    ORDER BY datahora DESC
    OFFSET COALESCE(p_offset, 0)
    LIMIT COALESCE(p_limit, NULL);
END;
$$;
