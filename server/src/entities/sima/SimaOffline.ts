export class SimaOffline {
  public idsimaoffline: number;
  public idestacao: string;
  public datahora: Date;

  public dirvt: number | null;
  public intensvt: number | null;
  public u_vel: number | null;
  public v_vel: number | null;

  public tempag1: number | null;
  public tempag2: number | null;
  public tempag3: number | null;
  public tempag4: number | null;

  public tempar: number | null;
  public ur: number | null;
  public tempar_r: number | null;
  public pressatm: number | null;

  public radincid: number | null;
  public radrefl: number | null;
  public fonteadometro: number | null;

  public sonda_temp: number | null;
  public sonda_cond: number | null;
  public sonda_do: number | null;
  public sonda_ph: number | null;
  public sonda_nh4: number | null;
  public sonda_no3: number | null;
  public sonda_chl: number | null;
  public sonda_turb: number | null;
  public sonda_bateria: number | null;

  public corr_norte: number | null;
  public corr_leste: number | null;
  public bateriapainel: number | null;

  constructor(props: SimaOffline) {
    Object.assign(this, props);
  }
}
