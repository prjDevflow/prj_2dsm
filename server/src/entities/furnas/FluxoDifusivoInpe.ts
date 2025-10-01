export class FluxoDifusivoInpe {
  public idfluxodifusivoinpe: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public profundidade?: number;
  public co2?: number;
  public co2_desviopadrao?: number;
  public co2_amostras?: number;
  public ch4?: number;
  public ch4_desviopadrao?: number;
  public ch4_amostras?: number;

  constructor(props: FluxoDifusivoInpe) {
    Object.assign(this, props);
  }
}
