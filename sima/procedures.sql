CREATE OR REPLACE FUNCTION listar_co2(
 p_rotulo VARCHAR,
 p_data_ini TIMESTAMP,
 p_data_fim TIMESTAMP
)

RETURNS TABLE(datahora TIMESTAMP, co2_low FLOAT, co2_high FLOAT) AS $$
BEGIN
 RETURN QUERY
 SELECT s.datahora, s.co2_low, s.co2_high
 FROM tbsima s
 JOIN tbestacao e ON s.idestacao = e.idestacao
 WHERE e.rotulo = p_rotulo
 AND s.datahora BETWEEN p_data_ini AND p_data_fim
 ORDER BY s.datahora;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION listar_temperaturas(
 p_rotulo VARCHAR,
 p_data_ini TIMESTAMP,
 p_data_fim TIMESTAMP
)
RETURNS TABLE(datahora TIMESTAMP, tempag1 FLOAT, tempag2 FLOAT, tempag3 FLOAT, tempag4 FLOAT, tempar FLOABEGIN)
 RETURN QUERY
 SELECT s.datahora, s.tempag1, s.tempag2, s.tempag3, s.tempag4, s.tempar, s.tempar_r
 FROM tbsima s
 JOIN tbestacao e ON s.idestacao = e.idestacao
 WHERE e.rotulo = p_rotulo
 AND s.datahora BETWEEN p_data_ini AND p_data_fim
 ORDER BY s.datahora;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION listar_do(
 p_rotulo VARCHAR,
 p_data_ini TIMESTAMP,
 p_data_fim TIMESTAMP
)
RETURNS TABLE(datahora TIMESTAMP, sonda_do FLOAT, sonda_dosat FLOAT) AS $$
BEGIN
 RETURN QUERY
 SELECT s.datahora, s.sonda_do, s.sonda_dosat
 FROM tbsima s
 JOIN tbestacao e ON s.idestacao = e.idestacao
 WHERE e.rotulo = p_rotulo
 AND s.datahora BETWEEN p_data_ini AND p_data_fim
 ORDER BY s.datahora;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION listar_ph(
 p_rotulo VARCHAR,
 p_data_ini TIMESTAMP,
 p_data_fim TIMESTAMP
)
RETURNS TABLE(datahora TIMESTAMP, sonda_ph FLOAT) AS $$
BEGIN
 RETURN QUERY
 SELECT s.datahora, s.sonda_ph
 FROM tbsima s
 JOIN tbestacao e ON s.idestacao = e.idestacao
 WHERE e.rotulo = p_rotulo
 AND s.datahora BETWEEN p_data_ini AND p_data_fim
 ORDER BY s.datahora;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION listar_clorofila(
 p_rotulo VARCHAR,
 p_data_ini TIMESTAMP,
 p_data_fim TIMESTAMP
)
RETURNS TABLE(datahora TIMESTAMP, sonda_chl FLOAT) AS $$
BEGIN
 RETURN QUERY
 SELECT s.datahora, s.sonda_chl
 FROM tbsima s
 JOIN tbestacao e ON s.idestacao = e.idestacao
 WHERE e.rotulo = p_rotulo
 AND s.datahora BETWEEN p_data_ini AND p_data_fim
 ORDER BY s.datahora;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION listar_nutrientes(
 p_rotulo VARCHAR,
 p_data_ini TIMESTAMP,
 p_data_fim TIMESTAMP
)
RETURNS TABLE(datahora TIMESTAMP, sonda_nh4 FLOAT, sonda_no3 FLOAT) AS $$
BEGIN
 RETURN QUERY
 SELECT s.datahora, s.sonda_nh4, s.sonda_no3
 FROM tbsima s
 JOIN tbestacao e ON s.idestacao = e.idestacao
 WHERE e.rotulo = p_rotulo
 AND s.datahora BETWEEN p_data_ini AND p_data_fim
 ORDER BY s.datahora;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION listar_condutividade(
 p_rotulo VARCHAR,
 p_data_ini TIMESTAMP,
 p_data_fim TIMESTAMP
)
RETURNS TABLE(datahora TIMESTAMP, sonda_cond FLOAT) AS $$
BEGIN
 RETURN QUERY
 SELECT s.datahora, s.sonda_cond
 FROM tbsima s
 JOIN tbestacao e ON s.idestacao = e.idestacao
 WHERE e.rotulo = p_rotulo
 AND s.datahora BETWEEN p_data_ini AND p_data_fim
 ORDER BY s.datahora;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION listar_turbidez(
 p_rotulo VARCHAR,
 p_data_ini TIMESTAMP,
 p_data_fim TIMESTAMP
)
RETURNS TABLE(datahora TIMESTAMP, sonda_turb FLOAT) AS $$
BEGIN
 RETURN QUERY
 SELECT s.datahora, s.sonda_turb
 FROM tbsima s
 JOIN tbestacao e ON s.idestacao = e.idestacao
 WHERE e.rotulo = p_rotulo
 AND s.datahora BETWEEN p_data_ini AND p_data_fim
 ORDER BY s.datahora;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION listar_radiacao(
 p_rotulo VARCHAR,
 p_data_ini TIMESTAMP,
 p_data_fim TIMESTAMP
)
RETURNS TABLE(datahora TIMESTAMP, radincid FLOAT, radrefl FLOAT) AS $$
BEGIN
 RETURN QUERY
 SELECT s.datahora, s.radincid, s.radrefl
 FROM tbsima s
 JOIN tbestacao e ON s.idestacao = e.idestacao
 WHERE e.rotulo = p_rotulo
 AND s.datahora BETWEEN p_data_ini AND p_data_fim
 ORDER BY s.datahora;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION listar_vento_vetor(
 p_rotulo VARCHAR,
 p_data_ini TIMESTAMP,
 p_data_fim TIMESTAMP
)
RETURNS TABLE(datahora TIMESTAMP, dirvt FLOAT, intensvt FLOAT, u_vel FLOAT, v_vel FLOAT) AS $$
BEGIN
 RETURN QUERY
 SELECT s.datahora, s.dirvt, s.intensvt, s.u_vel, s.v_vel
 FROM tbsima s
 JOIN tbestacao e ON s.idestacao = e.idestacao
 WHERE e.rotulo = p_rotulo
 AND s.datahora BETWEEN p_data_ini AND p_data_fim
 ORDER BY s.datahora;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION listar_vento_vetor(
 p_rotulo VARCHAR,
 p_data_ini TIMESTAMP,
 p_data_fim TIMESTAMP
)
RETURNS TABLE(datahora TIMESTAMP, dirvt FLOAT, intensvt FLOAT, u_vel FLOAT, v_vel FLOAT) AS $$
BEGIN
 RETURN QUERY
 SELECT s.datahora, s.dirvt, s.intensvt, s.u_vel, s.v_vel
 FROM tbsima s
 JOIN tbestacao e ON s.idestacao = e.idestacao
 WHERE e.rotulo = p_rotulo
 AND s.datahora BETWEEN p_data_ini AND p_data_fim
 ORDER BY s.datahora;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION listar_correntes(
 p_rotulo VARCHAR,
 p_data_ini TIMESTAMP,
 p_data_fim TIMESTAMP
)
RETURNS TABLE(datahora TIMESTAMP, corr_norte FLOAT, corr_leste FLOAT) AS $$
BEGIN
 RETURN QUERY
 SELECT s.datahora, s.corr_norte, s.corr_leste
 FROM tbsima s
 JOIN tbestacao e ON s.idestacao = e.idestacao
 WHERE e.rotulo = p_rotulo
 AND s.datahora BETWEEN p_data_ini AND p_data_fim
 ORDER BY s.datahora;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION listar_precipitacao(
 p_rotulo VARCHAR,
 p_data_ini TIMESTAMP,
 p_data_fim TIMESTAMP
)
RETURNS TABLE(datahora TIMESTAMP, precipitacao FLOAT) AS $$
BEGIN
 RETURN QUERY
 SELECT s.datahora, s.precipitacao
 FROM tbsima s
 JOIN tbestacao e ON s.idestacao = e.idestacao
 WHERE e.rotulo = p_rotulo
 AND s.datahora BETWEEN p_data_ini AND p_data_fim
 ORDER BY s.datahora;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION listar_qualidade_agua(
 p_rotulo VARCHAR,
 p_data_ini TIMESTAMP,
 p_data_fim TIMESTAMP
)
RETURNS TABLE(
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
 sonda_turb FLOAT
) AS $$
BEGIN
 RETURN QUERY
 SELECT s.datahora, s.tempag1, s.tempag2, s.tempag3, s.tempag4,
 s.sonda_temp, s.sonda_cond, s.sonda_do, s.sonda_dosat,
 s.sonda_ph, s.sonda_chl, s.sonda_turb
 FROM tbsima s
 JOIN tbestacao e ON s.idestacao = e.idestacao
 WHERE e.rotulo = p_rotulo
 AND s.datahora BETWEEN p_data_ini AND p_data_fim
 ORDER BY s.datahora;
END;
$$ LANGUAGE plpgsql;