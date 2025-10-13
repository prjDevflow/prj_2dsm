-- =========================
-- CO2
-- =========================
CREATE OR REPLACE FUNCTION buscar_co2(
    rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT
)
RETURNS TABLE (
    datahora TIMESTAMP,
    co2_low FLOAT,
    co2_high FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.co2_low, s.co2_high, e.rotulo
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (rotulo IS NULL OR e.rotulo ILIKE '%' || rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- TEMPERATURAS
-- =========================
CREATE OR REPLACE FUNCTION buscar_temperaturas(
    rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT
)
RETURNS TABLE (
    datahora TIMESTAMP,
    tempag1 FLOAT,
    tempag2 FLOAT,
    tempag3 FLOAT,
    tempag4 FLOAT,
    tempar FLOAT,
    tempar_r FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.tempag1, s.tempag2, s.tempag3, s.tempag4, s.tempar, s.tempar_r, e.rotulo
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (rotulo IS NULL OR e.rotulo ILIKE '%' || rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- OXIGÊNIO DISSOLVIDO (DO)
-- =========================
CREATE OR REPLACE FUNCTION buscar_do(
    rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT
)
RETURNS TABLE (
    datahora TIMESTAMP,
    sonda_do FLOAT,
    sonda_dosat FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.sonda_do, s.sonda_dosat, e.rotulo
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (rotulo IS NULL OR e.rotulo ILIKE '%' || rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- PH
-- =========================
CREATE OR REPLACE FUNCTION buscar_ph(
    rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT 
)
RETURNS TABLE (
    datahora TIMESTAMP,
    sonda_ph FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.sonda_ph, e.rotulo
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (rotulo IS NULL OR e.rotulo ILIKE '%' || rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- CLOROFILA
-- =========================
CREATE OR REPLACE FUNCTION buscar_clorofila(
    rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT
)
RETURNS TABLE (
    datahora TIMESTAMP,
    sonda_chl FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.sonda_chl, e.rotulo
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (rotulo IS NULL OR e.rotulo ILIKE '%' || rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- NUTRIENTES
-- =========================
CREATE OR REPLACE FUNCTION buscar_nutrientes(
    rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT
)
RETURNS TABLE (
    datahora TIMESTAMP,
    sonda_nh4 FLOAT,
    sonda_no3 FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.sonda_nh4, s.sonda_no3, e.rotulo
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (rotulo IS NULL OR e.rotulo ILIKE '%' || rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- CONDUTIVIDADE
-- =========================
CREATE OR REPLACE FUNCTION buscar_condutividade(
    rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT
)
RETURNS TABLE (
    datahora TIMESTAMP,
    sonda_cond FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.sonda_cond, e.rotulo
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (rotulo IS NULL OR e.rotulo ILIKE '%' || rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- TURBIDEZ
-- =========================
CREATE OR REPLACE FUNCTION buscar_turbidez(
    rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT
)
RETURNS TABLE (
    datahora TIMESTAMP,
    sonda_turb FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.sonda_turb, e.rotulo
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (rotulo IS NULL OR e.rotulo ILIKE '%' || rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- RADIAÇÃO
-- =========================
CREATE OR REPLACE FUNCTION buscar_radiacao(
    rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT
)
RETURNS TABLE (
    datahora TIMESTAMP,
    radincid FLOAT,
    radrefl FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.radincid, s.radrefl, e.rotulo
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (rotulo IS NULL OR e.rotulo ILIKE '%' || rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- VENTO (VETOR)
-- =========================
CREATE OR REPLACE FUNCTION buscar_vento_vetor(
    rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT
)
RETURNS TABLE (
    datahora TIMESTAMP,
    dirvt FLOAT,
    intensvt FLOAT,
    u_vel FLOAT,
    v_vel FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.dirvt, s.intensvt, s.u_vel, s.v_vel, e.rotulo
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (rotulo IS NULL OR e.rotulo ILIKE '%' || rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- CORRENTES
-- =========================
CREATE OR REPLACE FUNCTION buscar_correntes(
    rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT
)
RETURNS TABLE (
    datahora TIMESTAMP,
    corr_norte FLOAT,
    corr_leste FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.corr_norte, s.corr_leste, e.rotulo
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (rotulo IS NULL OR e.rotulo ILIKE '%' || rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- PRECIPITAÇÃO
-- =========================
CREATE OR REPLACE FUNCTION buscar_precipitacao(
    rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT
)
RETURNS TABLE (
    datahora TIMESTAMP,
    precipitacao FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.precipitacao, e.rotulo
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (rotulo IS NULL OR e.rotulo ILIKE '%' || rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- QUALIDADE DA ÁGUA (COMBINADO)
-- =========================
CREATE OR REPLACE FUNCTION buscar_qualidade_agua(
    rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT
)
RETURNS TABLE (
    datahora TIMESTAMP,
    tempag1 FLOAT,
    tempag2 FLOAT,
    tempag3 FLOAT,
    tempag4 FLOAT,
    sonda_temp FLOAT,
    sonda_cond FLOAT,
    sonda_do FLOAT,
    sonda_dosat FLOAT,
    sonda_ph FLOAT,
    sonda_chl FLOAT,
    sonda_turb FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.tempag1, s.tempag2, s.tempag3, s.tempag4,
           s.sonda_temp, s.sonda_cond, s.sonda_do, s.sonda_dosat,
           s.sonda_ph, s.sonda_chl, s.sonda_turb, e.rotulo
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (rotulo IS NULL OR e.rotulo ILIKE '%' || rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- TODAS AS INFORMAÇÕES
-- =========================
CREATE OR REPLACE FUNCTION buscar_todas_informacoes(
    p_idestacao TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_limit_param INT,
    p_offset_param INT DEFAULT 0
)
RETURNS TABLE (
    datahora      TIMESTAMP,
    co2_low       double precision,
    co2_high      double precision,
    tempag1       double precision,
    tempag2       double precision,
    tempag3       double precision,
    tempag4       double precision,
    tempar        double precision,
    tempar_r      double precision,
    sonda_do      double precision,
    sonda_dosat   double precision,
    sonda_ph      double precision,
    sonda_chl     double precision,
    sonda_nh4     double precision,
    sonda_no3     double precision,
    sonda_cond    double precision,
    sonda_turb    double precision,
    radincid      double precision,
    radrefl       double precision,
    dirvt         double precision,
    intensvt      double precision,
    u_vel         double precision,
    v_vel         double precision,
    corr_norte    double precision,
    corr_leste    double precision,
    precipitacao  double precision,
    nome_estacao  text
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        s.datahora,
        s.co2_low::double precision,
        s.co2_high::double precision,
        s.tempag1::double precision,
        s.tempag2::double precision,
        s.tempag3::double precision,
        s.tempag4::double precision,
        s.tempar::double precision,
        s.tempar_r::double precision,
        s.sonda_do::double precision,
        s.sonda_dosat::double precision,
        s.sonda_ph::double precision,
        s.sonda_chl::double precision,
        s.sonda_nh4::double precision,
        s.sonda_no3::double precision,
        s.sonda_cond::double precision,
        s.sonda_turb::double precision,
        s.radincid::double precision,
        s.radrefl::double precision,
        s.dirvt::double precision,
        s.intensvt::double precision,
        s.u_vel::double precision,
        s.v_vel::double precision,
        s.corr_norte::double precision,
        s.corr_leste::double precision,
        s.precipitacao::double precision,
        e.rotulo::text
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (
        p_idestacao IS NULL 
        OR TRIM(LEADING '0' FROM e.idestacao::text) = TRIM(LEADING '0' FROM p_idestacao::text)
    )
      AND (p_data_inicio IS NULL OR s.datahora >= p_data_inicio)
      AND (p_data_fim IS NULL OR s.datahora <= p_data_fim)
    ORDER BY s.datahora DESC
    LIMIT p_limit_param
    OFFSET p_offset_param;
END;
$$;





-- =========================
-- localização
-- =========================

CREATE OR REPLACE FUNCTION listar_todas_coordenadas()
RETURNS TABLE(
  rotulo VARCHAR,
  lat FLOAT,
  lng FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT e.rotulo, e.lat, e.lng
  FROM tbestacao e
  ORDER BY e.rotulo;
END;
$$ LANGUAGE plpgsql;


