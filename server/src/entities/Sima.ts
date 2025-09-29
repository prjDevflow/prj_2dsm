export class Sima {
  public datahora: Date;
  public co2_low: number | null;
  public co2_high: number | null;
  public tempag1: number | null;
  public tempag2: number | null;
  public tempag3: number | null;
  public tempag4: number | null;
  public tempar: number | null;
  public tempar_r: number | null;
  public sonda_do: number | null;
  public sonda_dosat: number | null;
  public sonda_ph: number | null;
  public sonda_chl: number | null;
  public sonda_nh4: number | null;
  public sonda_no3: number | null;
  public sonda_cond: number | null;
  public sonda_turb: number | null;
  public radincid: number | null;
  public radrefl: number | null;
  public dirvt: number | null;
  public intensvt: number | null;
  public u_vel: number | null;
  public v_vel: number | null;
  public corr_norte: number | null;
  public corr_leste: number | null;
  public precipitacao: number | null;
  public nome_estacao: string | null;

  constructor(props: Sima) {
    Object.assign(this, props);
  }
}
