-- =========================
-- CO2
-- =========================
CREATE OR REPLACE FUNCTION public.buscar_co2(p_rotulo text DEFAULT NULL, p_data_inicio timestamp DEFAULT NULL, p_data_fim timestamp DEFAULT NULL, p_offset integer DEFAULT 0, p_limit integer DEFAULT 9999) RETURNS TABLE(datahora timestamp, co2_low double precision, co2_high double precision, nome_estacao text) LANGUAGE plpgsql AS $$ BEGIN RETURN QUERY SELECT s.datahora::timestamp, s.co2_low::double precision, s.co2_high::double precision, e.rotulo::text AS nome_estacao FROM tbsima s JOIN tbestacao e ON s.idestacao = e.idestacao WHERE (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%') AND (p_data_inicio IS NULL OR s.datahora >= p_data_inicio) AND (p_data_fim IS NULL OR s.datahora <= p_data_fim) ORDER BY s.datahora DESC LIMIT p_limit OFFSET p_offset; END; $$;





-- =========================
-- TEMPERATURAS
-- =========================

-- buscar_tempag1
CREATE OR REPLACE FUNCTION buscar_tempag1(
  p_rotulo TEXT DEFAULT NULL,
  data_inicio TIMESTAMP DEFAULT NULL,
  data_fim TIMESTAMP DEFAULT NULL,
  offset_param INT DEFAULT 0,
  limit_param INT DEFAULT 9999
)
RETURNS TABLE (
  datahora TIMESTAMP,
  tempag1 FLOAT,
  rotulo TEXT
)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.datahora,
    s.tempag1,
    e.rotulo::TEXT
  FROM tbsima s
  JOIN tbestacao e ON s.idestacao = e.idestacao
  WHERE 
    (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%') 
    AND (data_inicio IS NULL OR s.datahora >= data_inicio)
    AND (data_fim IS NULL OR s.datahora <= data_fim)
  ORDER BY s.datahora DESC
  OFFSET offset_param 
  LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;


-- buscar_tempag2
CREATE OR REPLACE FUNCTION buscar_tempag2(
  p_rotulo TEXT DEFAULT NULL,
  data_inicio TIMESTAMP DEFAULT NULL,
  data_fim TIMESTAMP DEFAULT NULL,
  offset_param INT DEFAULT 0,
  limit_param INT DEFAULT 9999
)
RETURNS TABLE (
  datahora TIMESTAMP,
  tempag2 FLOAT,
  rotulo TEXT
)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.datahora,
    s.tempag2,
    e.rotulo::TEXT
  FROM tbsima s
  JOIN tbestacao e ON s.idestacao = e.idestacao
  WHERE 
    (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%') 
    AND (data_inicio IS NULL OR s.datahora >= data_inicio)
    AND (data_fim IS NULL OR s.datahora <= data_fim)
  ORDER BY s.datahora DESC
  OFFSET offset_param 
  LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;


-- buscar_tempag3
CREATE OR REPLACE FUNCTION buscar_tempag3(
  p_rotulo TEXT DEFAULT NULL,
  data_inicio TIMESTAMP DEFAULT NULL,
  data_fim TIMESTAMP DEFAULT NULL,
  offset_param INT DEFAULT 0,
  limit_param INT DEFAULT 9999
)
RETURNS TABLE (
  datahora TIMESTAMP,
  tempag3 FLOAT,
  rotulo TEXT
)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.datahora,
    s.tempag3,
    e.rotulo::TEXT
  FROM tbsima s
  JOIN tbestacao e ON s.idestacao = e.idestacao
  WHERE 
    (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%') 
    AND (data_inicio IS NULL OR s.datahora >= data_inicio)
    AND (data_fim IS NULL OR s.datahora <= data_fim)
  ORDER BY s.datahora DESC
  OFFSET offset_param 
  LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;


-- buscar_tempag4
CREATE OR REPLACE FUNCTION buscar_tempag4(
  p_rotulo TEXT DEFAULT NULL,
  data_inicio TIMESTAMP DEFAULT NULL,
  data_fim TIMESTAMP DEFAULT NULL,
  offset_param INT DEFAULT 0,
  limit_param INT DEFAULT 9999
)
RETURNS TABLE (
  datahora TIMESTAMP,
  tempag4 FLOAT,
  rotulo TEXT
)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.datahora,
    s.tempag4,
    e.rotulo::TEXT
  FROM tbsima s
  JOIN tbestacao e ON s.idestacao = e.idestacao
  WHERE 
    (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%') 
    AND (data_inicio IS NULL OR s.datahora >= data_inicio)
    AND (data_fim IS NULL OR s.datahora <= data_fim)
  ORDER BY s.datahora DESC
  OFFSET offset_param 
  LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;


-- buscar_tempar
CREATE OR REPLACE FUNCTION buscar_tempar(
  p_rotulo TEXT DEFAULT NULL,
  data_inicio TIMESTAMP DEFAULT NULL,
  data_fim TIMESTAMP DEFAULT NULL,
  offset_param INT DEFAULT 0,
  limit_param INT DEFAULT 9999
)
RETURNS TABLE (
  datahora TIMESTAMP,
  tempar FLOAT,
  rotulo TEXT
)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.datahora,
    s.tempar,
    e.rotulo::TEXT
  FROM tbsima s
  JOIN tbestacao e ON s.idestacao = e.idestacao
  WHERE 
    (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%') 
    AND (data_inicio IS NULL OR s.datahora >= data_inicio)
    AND (data_fim IS NULL OR s.datahora <= data_fim)
  ORDER BY s.datahora DESC
  OFFSET offset_param 
  LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;


-- buscar_tempar_r
CREATE OR REPLACE FUNCTION buscar_tempar_r(
  p_rotulo TEXT DEFAULT NULL,
  data_inicio TIMESTAMP DEFAULT NULL,
  data_fim TIMESTAMP DEFAULT NULL,
  offset_param INT DEFAULT 0,
  limit_param INT DEFAULT 9999
)
RETURNS TABLE (
  datahora TIMESTAMP,
  tempar_r FLOAT,
  rotulo TEXT
)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.datahora,
    s.tempar_r,
    e.rotulo::TEXT
  FROM tbsima s
  JOIN tbestacao e ON s.idestacao = e.idestacao
  WHERE 
    (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%') 
    AND (data_inicio IS NULL OR s.datahora >= data_inicio)
    AND (data_fim IS NULL OR s.datahora <= data_fim)
  ORDER BY s.datahora DESC
  OFFSET offset_param 
  LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;




-- =========================
-- OXIGÊNIO DISSOLVIDO (DO)
-- =========================

CREATE OR REPLACE FUNCTION buscar_sonda_dosat(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    sonda_dosat FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.datahora, 
        s.sonda_dosat, 
        e.rotulo::TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE 
        (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
        AND (data_inicio IS NULL OR s.datahora >= data_inicio)
        AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param 
    LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION buscar_sonda_do(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    sonda_do FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.datahora, 
        s.sonda_do, 
        e.rotulo::TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE 
        (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
        AND (data_inicio IS NULL OR s.datahora >= data_inicio)
        AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param 
    LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- PH
-- =========================
CREATE OR REPLACE FUNCTION buscar_ph(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    sonda_ph FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.sonda_ph, e.rotulo::TEXT -- Conversão explícita para TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
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
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    sonda_chl FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.sonda_chl, e.rotulo::TEXT -- Conversão explícita para TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- NUTRIENTES
-- =========================
CREATE OR REPLACE FUNCTION buscar_sonda_nh4(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    sonda_nh4 FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.datahora,
        s.sonda_nh4,
        e.rotulo::TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE 
        (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
        AND (data_inicio IS NULL OR s.datahora >= data_inicio)
        AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param 
    LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION buscar_sonda_no3(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    sonda_no3 FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.datahora,
        s.sonda_no3,
        e.rotulo::TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE 
        (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
        AND (data_inicio IS NULL OR s.datahora >= data_inicio)
        AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param 
    LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- CONDUTIVIDADE
-- =========================
CREATE OR REPLACE FUNCTION buscar_condutividade(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    sonda_cond FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.sonda_cond, e.rotulo::TEXT  -- Conversão explícita de character varying(50) para TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
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
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    sonda_turb FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.sonda_turb, e.rotulo::TEXT  -- Conversão explícita para TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
      AND (data_inicio IS NULL OR s.datahora >= data_inicio)
      AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;


-- =========================
-- RADIAÇÃO
-- =========================
CREATE OR REPLACE FUNCTION buscar_radincid(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    radincid FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.datahora,
        s.radincid,
        e.rotulo::TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE 
        (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
        AND (data_inicio IS NULL OR s.datahora >= data_inicio)
        AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param 
    LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION buscar_radrefl(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    radrefl FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.datahora,
        s.radrefl,
        e.rotulo::TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE 
        (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
        AND (data_inicio IS NULL OR s.datahora >= data_inicio)
        AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param 
    LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;




-- =========================
-- VENTO (VETOR)
-- =========================
CREATE OR REPLACE FUNCTION buscar_dirvt(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    dirvt FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.datahora,
        s.dirvt,
        e.rotulo::TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE 
        (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
        AND (data_inicio IS NULL OR s.datahora >= data_inicio)
        AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION buscar_intensvt(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    intensvt FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.datahora,
        s.intensvt,
        e.rotulo::TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE 
        (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
        AND (data_inicio IS NULL OR s.datahora >= data_inicio)
        AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION buscar_u_vel(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    u_vel FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.datahora,
        s.u_vel,
        e.rotulo::TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE 
        (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
        AND (data_inicio IS NULL OR s.datahora >= data_inicio)
        AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION buscar_v_vel(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    v_vel FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.datahora,
        s.v_vel,
        e.rotulo::TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE 
        (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
        AND (data_inicio IS NULL OR s.datahora >= data_inicio)
        AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- CORRENTES
-- =========================
CREATE OR REPLACE FUNCTION buscar_corr_norte(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    corr_norte FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.datahora,
        s.corr_norte,
        e.rotulo::TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE 
        (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
        AND (data_inicio IS NULL OR s.datahora >= data_inicio)
        AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param 
    LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION buscar_corr_leste(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    corr_leste FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.datahora,
        s.corr_leste,
        e.rotulo::TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE 
        (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
        AND (data_inicio IS NULL OR s.datahora >= data_inicio)
        AND (data_fim IS NULL OR s.datahora <= data_fim)
    ORDER BY s.datahora DESC
    OFFSET offset_param 
    LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;



-- =========================
-- PRECIPITAÇÃO
-- =========================
CREATE OR REPLACE FUNCTION buscar_precipitacao(
    p_rotulo TEXT DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT NULL,
    data_fim TIMESTAMP DEFAULT NULL,
    offset_param INT DEFAULT 0,
    limit_param INT DEFAULT 9999
)
RETURNS TABLE (
    datahora TIMESTAMP,
    precipitacao FLOAT,
    nome_estacao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.datahora, s.precipitacao, e.rotulo::TEXT  -- Conversão explícita para TEXT
    FROM tbsima s
    JOIN tbestacao e ON s.idestacao = e.idestacao
    WHERE (p_rotulo IS NULL OR e.rotulo ILIKE '%' || p_rotulo || '%')
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
    p_rotulo_estacao TEXT DEFAULT NULL,
    p_data_inicio TIMESTAMP DEFAULT NULL,
    p_data_fim TIMESTAMP DEFAULT NULL,
    p_limit_param INT DEFAULT 9999,
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
        p_rotulo_estacao IS NULL 
        OR TRIM(LEADING '0' FROM e.rotulo::text) = TRIM(LEADING '0' FROM p_rotulo_estacao::text)
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


