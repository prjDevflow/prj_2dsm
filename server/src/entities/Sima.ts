export class Sima {
  public idsima: number;
  public idestacao: number;
  public datahora: Date;
  public regno: number;
  public nofsamples: number;
  public proamag: number;
  public dirvt: number;
  public intensvt: number;
  public u_vel: number;
  public v_vel: number;
  public tempag1: number;
  public tempag2: number;
  public tempag3: number;
  public tempag4: number;
  public tempar: number;
  public ur: number;
  public tempar_r: number;
  public pressatm: number;
  public radincid: number;
  public radrefl: number;
  public bateria: number;
  public sonda_temp: number;
  public sonda_cond: number;
  public sonda_DOsat: number;
  public sonda_DO: number;
  public sonda_pH: number;
  public sonda_NH4: number;
  public sonda_NO3: number;
  public sonda_turb: number;
  public sonda_chl: number;
  public sonda_bateria: number;
  public corr_norte: number;
  public corr_leste: number;
  public co2_low: number;
  public co2_high: number;
  public precipitacao: number;

  constructor(props: Sima) {
    Object.assign(this, props);
  }
}
