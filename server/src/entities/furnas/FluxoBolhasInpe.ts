export class FluxoBolhasInpe {
  public idfluxobolhasinpe: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public profundidade?: number;
  public ch4?: number;
  public ch4_desviopadrao?: number;
  public ch4_amostras?: number;

  constructor(props: FluxoBolhasInpe) {
    Object.assign(this, props);
  }
}
