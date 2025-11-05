

-- ==================================================================
-- Funções que filtram por NOME da INSTITUIÇÃO (p_instituicao_nome TEXT)
-- ==================================================================

-- =========================
-- ABIÓTICO - COLUNA
-- =========================
CREATE OR REPLACE FUNCTION buscar_abioticocoluna(
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
        t.profundidade,
        t.dic,
        t.nt,
        t.pt,
        t.delta13c,
        t.delta15n,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbabioticocoluna t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
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
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.dic,
        t.nt,
        t.pt,
        t.delta13c,
        t.delta15n,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbabioticosuperficie t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- ÁGUA - MATÉRIA ORGÂNICA E SEDIMENTO
-- =========================
CREATE OR REPLACE FUNCTION buscar_aguamateriaorganicasedimento(
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
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.profundidade,
        t.batimetria,
        t.agua,
        t.materiaorganica,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbaguamateriaorganicasedimento t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- BIÓTICO - COLUNA
-- =========================
CREATE OR REPLACE FUNCTION buscar_bioticocoluna(
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
    clorofilaa DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.profundidade,
        t.doc,
        t.toc,
        t.poc,
        t.densidadebacteria,
        t.clorofilaA,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbbioticocoluna t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- BIÓTICO - SUPERFÍCIE
-- =========================
CREATE OR REPLACE FUNCTION buscar_bioticosuperficie(
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
    clorofilaa DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.doc,
        t.toc,
        t.poc,
        t.densidadebacteria,
        t.clorofilaA,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbbioticosuperficie t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- BOLHAS
-- =========================
CREATE OR REPLACE FUNCTION buscar_bolhas(
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
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.profundidade,
        t.nrodefunis,
        t.volumecoletado,
        t.ch4,
        t.co2,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbbolhas t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- CÂMARA DE SOLO
-- =========================
CREATE OR REPLACE FUNCTION buscar_camarasolo(
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
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.ch4,
        t.co2,
        t.n2o,
        t.tempar,
        t.tempsolo,
        t.vento,
        t.altitude,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbcamarasolo t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- CARBONO
-- =========================
CREATE OR REPLACE FUNCTION buscar_carbono(
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
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.dc,
        t.doc,
        t.poc,
        t.toc,
        t.dic,
        t.tc,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbcarbono t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- CONCENTRAÇÃO GÁS - ÁGUA
-- =========================
CREATE OR REPLACE FUNCTION buscar_concentracaogasagua(
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
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.batimetria,
        t.altura,
        t.replica,
        t.ch4,
        t.co2,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbconcentracaogasagua t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- CONCENTRAÇÃO GÁS - SEDIMENTO
-- =========================
CREATE OR REPLACE FUNCTION buscar_concentracaogassedimento(
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
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.batimetria,
        t.profundidadeDoSedimento,
        t.replica,
        t.ch4,
        t.co2,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbconcentracaogassedimento t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- DIFUSÃO
-- =========================
CREATE OR REPLACE FUNCTION buscar_difusao(
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
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.ch4,
        t.co2,
        t.n2o,
        t.ph,
        t.tempagua,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbdifusao t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- DUPLA DESSORÇÃO ÁGUA
-- =========================
CREATE OR REPLACE FUNCTION buscar_dupladessorcaoagua(
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
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.profundidade,
        t.co2,
        t.o2,
        t.n2,
        t.ch4,
        t.n2o,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbdupladessorcaoagua t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- FLUXO - BOLHAS (INPE)
-- =========================
CREATE OR REPLACE FUNCTION buscar_fluxobolhasinpe(
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
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.profundidade,
        t.ch4,
        t.ch4_desviopadrao,
        t.ch4_amostras,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbfluxobolhasinpe t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- FLUXO - CARBONO
-- =========================


CREATE OR REPLACE FUNCTION buscar_fluxocarbono(
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE(
    datahora TIMESTAMP,
    producaofitoplanctonica DOUBLE PRECISION,
    carbonoorganicoexcretado DOUBLE PRECISION,
    respiracaofito DOUBLE PRECISION,
    producaobacteriana DOUBLE PRECISION,
    sitio_nome TEXT,
    instituicao_nome TEXT,
    reservatorio_nome TEXT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.producaofitoplanctonica,
        t.carbonoorganicoexcretado,
        t.respiracaofito,
        t.producaobacteriana,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbfluxocarbono t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- FLUXO - DIFUSIVO
-- =========================
CREATE OR REPLACE FUNCTION buscar_fluxodifusivo(
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
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.batimetria,
        t.intervalo::TEXT AS intervalo,            -- <-- cast para TEXT
        t.ch4,
        t.co2,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbfluxodifusivo t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = t.idsitio    -- <-- corrigido aqui
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;




-- =========================
-- FLUXO - DIFUSIVO INPE
-- =========================
CREATE OR REPLACE FUNCTION buscar_fluxodifusivoinpe(
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
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.profundidade,
        t.co2,
        t.co2_desviopadrao,
        t.co2_amostras,
        t.ch4,
        t.ch4_desviopadrao,
        t.ch4_amostras,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbfluxodifusivoinpe t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- GASES - BOLHAS
-- =========================
CREATE OR REPLACE FUNCTION buscar_gasesembolhas(
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
DECLARE
    sql TEXT;
BEGIN
    sql := format($SQL$
        SELECT
            (COALESCE(t.datamedida, c.datainicio))::timestamp AS datahora,
            t.profundidade,
            t.co2,
            t.o2,
            t.n2,
            t.ch4,
            t.n2o,
            s.nome::TEXT AS sitio_nome,
            i.nome::TEXT AS instituicao_nome,
            r.nome::TEXT AS reservatorio_nome
        FROM tbgasesembolhas t
        JOIN tbcampanha c ON t.idcampanha = c.idcampanha
        JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
        JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
        LEFT JOIN tbsitio s ON s.idsitio = t.idsitio
        WHERE ($1 IS NULL OR s.nome ILIKE '%%' || $1 || '%%')
          AND ($2 IS NULL OR COALESCE(t.datamedida, c.datainicio) >= $2)
          AND ($3 IS NULL OR COALESCE(t.datamedida, c.datainicio) <= $3)
        ORDER BY datahora DESC
        LIMIT %s
        OFFSET %s
    $SQL$, p_limit_param::text, p_offset_param::text);

    RETURN QUERY EXECUTE sql USING p_rotulo, p_data_inicio, p_data_fim;
END;
$$ LANGUAGE plpgsql;




-- =========================
-- HORIBA (SENSOR DE CAMPO)
-- =========================
CREATE OR REPLACE FUNCTION buscar_horiba(
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
DECLARE
    sql TEXT;
BEGIN
    sql := format($SQL$
        SELECT
            (COALESCE(t.datamedida, c.datainicio))::timestamp AS datahora,
            t.profundidade,
            t.tempagua,
            t.condutividade,
            t.ph,
            t._do,
            t.tds,
            t.redox,
            t.turbidez,
            s.nome::TEXT AS sitio_nome,
            i.nome::TEXT AS instituicao_nome,
            r.nome::TEXT AS reservatorio_nome
        FROM tbhoriba t
        JOIN tbcampanha c ON t.idcampanha = c.idcampanha
        JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
        JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
        LEFT JOIN tbsitio s ON s.idsitio = t.idsitio
        WHERE ($1 IS NULL OR s.nome ILIKE '%%' || $1 || '%%')
          AND ($2 IS NULL OR COALESCE(t.datamedida, c.datainicio) >= $2)
          AND ($3 IS NULL OR COALESCE(t.datamedida, c.datainicio) <= $3)
        ORDER BY datahora DESC
        LIMIT %s OFFSET %s
    $SQL$, p_limit_param::text, p_offset_param::text);

    RETURN QUERY EXECUTE sql USING p_rotulo, p_data_inicio, p_data_fim;
END;
$$ LANGUAGE plpgsql;




-- =========================
-- IONS NA ÁGUA INTERSTICIAL DO SEDIMENTO
-- =========================
CREATE OR REPLACE FUNCTION buscar_ionsnaaguaintersticialdosedimento(
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
    SELECT
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.profundidade,
        t.batimetria,
        t.f,
        t.cl,
        t.no2,
        t.br,
        t.no3,
        t.po4,
        t.so4,
        t.na,
        t.nh4,
        t.k,
        t.mg,
        t.ca,
        t.acetato,
        s.nome::TEXT AS sitio_nome,
        i.nome::TEXT AS instituicao_nome,
        r.nome::TEXT AS reservatorio_nome
    FROM tbionsnaaguaintersticialdosedimento t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = COALESCE(t.idsitio, s.idsitio)
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY datahora DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- MEDIDA CAMPOS - COLUNA
-- =========================
CREATE OR REPLACE FUNCTION buscar_medidacampocoluna(
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
DECLARE
    sql TEXT;
BEGIN
    sql := format($SQL$
        SELECT
            (COALESCE(t.datamedida, c.datainicio))::timestamp AS datahora,
            t.profundidade,
            t.secchi,
            t.tempagua,
            t.condutividade,
            t._do,
            t.ph,
            t.turbidez,
            t.materialemsuspensao,
            t.intensidadeluminosa,
            s.nome::TEXT            AS sitio_nome,
            i.nome::TEXT            AS instituicao_nome,
            r.nome::TEXT            AS reservatorio_nome
        FROM tbmedidacampocoluna t
        JOIN tbcampanha c ON t.idcampanha = c.idcampanha
        JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
        JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
        LEFT JOIN tbsitio s ON s.idsitio = t.idsitio
        WHERE ($1 IS NULL OR s.nome ILIKE '%%' || $1 || '%%')
          AND ($2 IS NULL OR COALESCE(t.datamedida, c.datainicio) >= $2)
          AND ($3 IS NULL OR COALESCE(t.datamedida, c.datainicio) <= $3)
        ORDER BY 1 DESC
        LIMIT %s OFFSET %s
    $SQL$, p_limit_param::text, p_offset_param::text);

    RETURN QUERY EXECUTE sql USING p_rotulo, p_data_inicio, p_data_fim;
END;
$$ LANGUAGE plpgsql;




-- =========================
-- MEDIDA CAMPOS - SUPERFÍCIE
-- =========================
CREATE OR REPLACE FUNCTION buscar_medidacamposuperficie(
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
DECLARE
    sql TEXT;
BEGIN
    sql := format($SQL$
        SELECT 
            (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
            t.secchi,
            t.tempagua,
            t.condutividade,
            t._do,
            t.ph,
            t.turbidez,
            t.materialemsuspensao,
            s.nome::TEXT            AS sitio_nome,
            i.nome::TEXT            AS instituicao_nome,
            r.nome::TEXT            AS reservatorio_nome
        FROM tbmedidacamposuperficie t
        JOIN tbcampanha c ON t.idcampanha = c.idcampanha
        JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
        JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
        LEFT JOIN tbsitio s ON s.idsitio = t.idsitio
        WHERE ($1 IS NULL OR s.nome ILIKE '%%' || $1 || '%%')
          AND ($2 IS NULL OR COALESCE(t.datamedida, c.datainicio) >= $2)
          AND ($3 IS NULL OR COALESCE(t.datamedida, c.datainicio) <= $3)
        ORDER BY datahora DESC
        LIMIT %s OFFSET %s
    $SQL$, p_limit_param::text, p_offset_param::text);

    RETURN QUERY EXECUTE sql USING p_rotulo, p_data_inicio, p_data_fim;
END;
$$ LANGUAGE plpgsql;




-- =========================
-- NUTRIENTES - SEDIMENTO
-- =========================
CREATE OR REPLACE FUNCTION buscar_nutrientessedimento(
    p_rotulo TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_offset_param INT DEFAULT 0,
    p_limit_param INT DEFAULT 20
)
RETURNS TABLE(
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
)
AS $$
DECLARE
    has_horamedida BOOLEAN;
    pick TEXT;
    sel_parts TEXT := '';
    col TEXT;
    candidates TEXT[];
    chosen TEXT;
    sql TEXT;
BEGIN
    -- Verifica se a coluna horamedida existe
    SELECT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'tbnutrientessedimento'
          AND column_name = 'horamedida'
    ) INTO has_horamedida;

    -- Mapeamento dinâmico de colunas
    FOR pick, candidates IN
        SELECT * FROM (
            VALUES
                ('nh4', ARRAY['nh4']),
                ('no2', ARRAY['no2', 'n2']),
                ('no3', ARRAY['no3']),
                ('po4', ARRAY['po4']),
                ('ptotal', ARRAY['ptotal', 'pt']),
                ('ntotal', ARRAY['ntotal', 'tc'])
        ) AS t(pick, candidates)
    LOOP
        chosen := NULL;
        FOREACH col IN ARRAY candidates LOOP
            IF EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_schema = 'public'
                  AND table_name = 'tbnutrientessedimento'
                  AND column_name = col
            ) THEN
                chosen := format('t.%I AS %I', col, pick);
                EXIT;
            END IF;
        END LOOP;

        IF chosen IS NULL THEN
            chosen := format('NULL::double precision AS %I', pick);
        END IF;

        sel_parts := sel_parts || ',' || chosen;
    END LOOP;

    -- Monta o SELECT conforme a existência de horamedida
    IF has_horamedida THEN
        sql := format($SQL$
            SELECT 
                (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
                t.profundidade,
                t.batimetria
                %s,
                s.nome::TEXT AS sitio_nome,
                i.nome::TEXT AS instituicao_nome,
                r.nome::TEXT AS reservatorio_nome
            FROM tbnutrientessedimento t
            JOIN tbcampanha c ON t.idcampanha = c.idcampanha
            JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
            JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
            LEFT JOIN tbsitio s ON s.idsitio = t.idsitio
            WHERE ($1 IS NULL OR s.nome ILIKE '%%' || $1 || '%%')
              AND ($2 IS NULL OR COALESCE(t.datamedida, c.datainicio) >= $2)
              AND ($3 IS NULL OR COALESCE(t.datamedida, c.datainicio) <= $3)
            ORDER BY datahora DESC
            LIMIT %s
            OFFSET %s
        $SQL$, sel_parts, p_limit_param::text, p_offset_param::text);
    ELSE
        sql := format($SQL$
            SELECT 
                (COALESCE(t.datamedida, c.datainicio))::timestamp AS datahora,
                t.profundidade,
                t.batimetria
                %s,
                s.nome::TEXT AS sitio_nome,
                i.nome::TEXT AS instituicao_nome,
                r.nome::TEXT AS reservatorio_nome
            FROM tbnutrientessedimento t
            JOIN tbcampanha c ON t.idcampanha = c.idcampanha
            JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
            JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
            LEFT JOIN tbsitio s ON s.idsitio = t.idsitio
            WHERE ($1 IS NULL OR s.nome ILIKE '%%' || $1 || '%%')
              AND ($2 IS NULL OR COALESCE(t.datamedida, c.datainicio) >= $2)
              AND ($3 IS NULL OR COALESCE(t.datamedida, c.datainicio) <= $3)
            ORDER BY datahora DESC
            LIMIT %s
            OFFSET %s
        $SQL$, sel_parts, p_limit_param::text, p_offset_param::text);
    END IF;

    RETURN QUERY EXECUTE sql
        USING p_rotulo, p_data_inicio, p_data_fim;
END;
$$ LANGUAGE plpgsql;




-- =========================
-- PARÂMETROS BIOLÓGICOS/FÍSICOS ÁGUA
-- =========================
CREATE OR REPLACE FUNCTION buscar_parametrosbiologicosfisicosagua(
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
DECLARE
    sql TEXT;
BEGIN
    sql := format($SQL$
        SELECT
            (COALESCE(t.datamedida, c.datainicio))::timestamp AS datahora,
            t.profundidade,
            t.secchi,
            t.tempagua,
            t.condutividade,
            t._do,
            t.ph,
            t.turbidez,
            t.doc,
            t.toc,
            t.poc,
            t.dic,
            t.nt,
            t.pt,
            t.clorofilaa        AS clorofilaA,
            t.producaofitoplanctonica,
            s.nome::TEXT       AS sitio_nome,
            i.nome::TEXT       AS instituicao_nome,
            r.nome::TEXT       AS reservatorio_nome
        FROM tbparametrosbiologicosfisicosagua t
        JOIN tbcampanha c ON t.idcampanha = c.idcampanha
        JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
        JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
        LEFT JOIN tbsitio s ON s.idsitio = t.idsitio
        WHERE ($1 IS NULL OR s.nome ILIKE '%%' || $1 || '%%')
          AND ($2 IS NULL OR COALESCE(t.datamedida, c.datainicio) >= $2)
          AND ($3 IS NULL OR COALESCE(t.datamedida, c.datainicio) <= $3)
        ORDER BY datahora DESC
        LIMIT %s
        OFFSET %s
    $SQL$, p_limit_param::text, p_offset_param::text);

    RETURN QUERY EXECUTE sql USING p_rotulo, p_data_inicio, p_data_fim;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- TC
-- =========================
CREATE OR REPLACE FUNCTION buscar_tc(
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
DECLARE
    sql TEXT;
BEGIN
    sql := format($SQL$
        SELECT 
            (COALESCE(t.datamedida, c.datainicio))::timestamp AS datahora,
            t.profundidade::text AS profundidade, -- 🔹 cast explícito corrigindo o erro
            t.tc,
            s.nome::text            AS sitio_nome,
            i.nome::text            AS instituicao_nome,
            r.nome::text            AS reservatorio_nome
        FROM tbtc t
        JOIN tbcampanha c ON t.idcampanha = c.idcampanha
        JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
        JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
        LEFT JOIN tbsitio s ON s.idsitio = t.idsitio
        WHERE ($1 IS NULL OR s.nome ILIKE '%%' || $1 || '%%')
          AND ($2 IS NULL OR COALESCE(t.datamedida, c.datainicio) >= $2)
          AND ($3 IS NULL OR COALESCE(t.datamedida, c.datainicio) <= $3)
        ORDER BY 1 DESC
        LIMIT %s OFFSET %s
    $SQL$, p_limit_param::text, p_offset_param::text);

    RETURN QUERY EXECUTE sql USING p_rotulo, p_data_inicio, p_data_fim;
END;
$$ LANGUAGE plpgsql;




-- =========================
-- VARIÁVEIS FÍSICO-QUÍMICAS DA ÁGUA
-- =========================
CREATE OR REPLACE FUNCTION buscar_variaveisfisicasquimicasdaagua(
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
    SELECT 
        (COALESCE(t.datamedida, c.datainicio) + COALESCE(t.horamedida, TIME '00:00'))::timestamp AS datahora,
        t.profundidade,
        t.secchi,
        t.batimetria,
        t.f,
        t.cl,
        t.nno3,
        t.ppo43,
        t.sso42,
        t.li,
        t.na,
        t.nnh4,
        t.k,
        t.mg,
        t.ca,
        t.clorofila,
        t.feofitina,
        t.turbidez,
        t.nt,
        t.pt,
        t.tdc,
        s.nome::TEXT AS sitio_nome,         -- cast para TEXT
        i.nome::TEXT AS instituicao_nome,   -- cast para TEXT
        r.nome::TEXT AS reservatorio_nome    -- cast para TEXT
    FROM tbvariaveisfisicasquimicasdaagua t
    JOIN tbcampanha c ON t.idcampanha = c.idcampanha
    JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
    LEFT JOIN tbsitio s ON s.idsitio = t.idsitio
    WHERE (p_rotulo IS NULL OR s.nome ILIKE '%' || p_rotulo || '%')
      AND (p_data_inicio IS NULL OR COALESCE(t.datamedida, c.datainicio) >= p_data_inicio)
      AND (p_data_fim IS NULL OR COALESCE(t.datamedida, c.datainicio) <= p_data_fim)
    ORDER BY 1 DESC
    OFFSET p_offset_param LIMIT p_limit_param;
END;
$$ LANGUAGE plpgsql;



-- ==================================================================
-- FIM DO SCRIPT: funções geradas (filtragem por nome da instituição).
-- =================================================================


--=========================
--TODAS AS COORDENADAS DA INSTITUIÇÃO
--=========================

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
    p_idreservatorio INTEGER,
    p_limit INTEGER DEFAULT NULL,
    p_offset INTEGER DEFAULT NULL
)
RETURNS TABLE (data jsonb)
LANGUAGE plpgsql
AS $$
DECLARE
    sql TEXT;
BEGIN
    -- Monta uma SELECT que junta as tabelas e transforma cada linha em JSON
    sql := 'SELECT row_to_json(t)::jsonb FROM (
        SELECT r.*, c.*, i.*,
               tc.*,
               variaveisfisicasquimicasdaagua.*,
               parametrosbiologicosfisicosagua.*,
               nutrientessedimento.*,
               medidacamposuperficie.*,
               medidacampocoluna.*,
               ionsnaaguaintersticialdosedimento.*,
               horiba.*,
               gasesembolhas.*,
               fluxodifusivoinpe.*,
               fluxodifusivo.*,
               fluxocarbono.*,
               fluxobolhasinpe.*,
               dupladessorcaoagua.*,
               difusao.*,
               concentracaogassedimento.*,
               concentracaogasagua.*,
               carbono.*,
               camarasolo.*,
               bolhas.*,
               bioticosuperficie.*,
               bioticocoluna.*,
               aguamateriaorganicasedimento.*,
               abioticosuperficie.*,
               abioticocoluna.*
        FROM tbreservatorio r
        LEFT JOIN tbcampanha c ON r.idreservatorio = c.idreservatorio
        LEFT JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao

        LEFT JOIN tbtc tc ON tc.idcampanha = c.idcampanha
        LEFT JOIN tbvariaveisfisicasquimicasdaagua variaveisfisicasquimicasdaagua ON variaveisfisicasquimicasdaagua.idcampanha = c.idcampanha
        LEFT JOIN tbparametrosbiologicosfisicosagua parametrosbiologicosfisicosagua ON parametrosbiologicosfisicosagua.idcampanha = c.idcampanha
        LEFT JOIN tbnutrientessedimento nutrientessedimento ON nutrientessedimento.idcampanha = c.idcampanha
        LEFT JOIN tbmedidacamposuperficie medidacamposuperficie ON medidacamposuperficie.idcampanha = c.idcampanha
        LEFT JOIN tbmedidacampocoluna medidacampocoluna ON medidacampocoluna.idcampanha = c.idcampanha
        LEFT JOIN tbionsnaaguaintersticialdosedimento ionsnaaguaintersticialdosedimento ON ionsnaaguaintersticialdosedimento.idcampanha = c.idcampanha
        LEFT JOIN tbhoriba horiba ON horiba.idcampanha = c.idcampanha
        LEFT JOIN tbgasesembolhas gasesembolhas ON gasesembolhas.idcampanha = c.idcampanha
        LEFT JOIN tbfluxodifusivoinpe fluxodifusivoinpe ON fluxodifusivoinpe.idcampanha = c.idcampanha
        LEFT JOIN tbfluxodifusivo fluxodifusivo ON fluxodifusivo.idcampanha = c.idcampanha
        LEFT JOIN tbfluxocarbono fluxocarbono ON fluxocarbono.idcampanha = c.idcampanha
        LEFT JOIN tbfluxobolhasinpe fluxobolhasinpe ON fluxobolhasinpe.idcampanha = c.idcampanha
        LEFT JOIN tbdupladessorcaoagua dupladessorcaoagua ON dupladessorcaoagua.idcampanha = c.idcampanha
        LEFT JOIN tbdifusao difusao ON difusao.idcampanha = c.idcampanha
        LEFT JOIN tbconcentracaogassedimento concentracaogassedimento ON concentracaogassedimento.idcampanha = c.idcampanha
        LEFT JOIN tbconcentracaogasagua concentracaogasagua ON concentracaogasagua.idcampanha = c.idcampanha
        LEFT JOIN tbcarbono carbono ON carbono.idcampanha = c.idcampanha
        LEFT JOIN tbcamarasolo camarasolo ON camarasolo.idcampanha = c.idcampanha
        LEFT JOIN tbbolhas bolhas ON bolhas.idcampanha = c.idcampanha
        LEFT JOIN tbbioticosuperficie bioticosuperficie ON bioticosuperficie.idcampanha = c.idcampanha
        LEFT JOIN tbbioticocoluna bioticocoluna ON bioticocoluna.idcampanha = c.idcampanha
        LEFT JOIN tbaguamateriaorganicasedimento aguamateriaorganicasedimento ON aguamateriaorganicasedimento.idcampanha = c.idcampanha
        LEFT JOIN tbabioticosuperficie abioticosuperficie ON abioticosuperficie.idcampanha = c.idcampanha
        LEFT JOIN tbabioticocoluna abioticocoluna ON abioticocoluna.idcampanha = c.idcampanha

        WHERE r.idreservatorio = ' || COALESCE(p_idreservatorio::text, 'NULL');

    IF p_limit IS NOT NULL THEN
        sql := sql || ' LIMIT ' || p_limit;
    END IF;

    IF p_offset IS NOT NULL THEN
        sql := sql || ' OFFSET ' || p_offset;
    END IF;

    sql := sql || ') t'; -- encerra subquery para row_to_json

    RETURN QUERY EXECUTE sql;
END;
$$;
