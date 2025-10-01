export class Difusao {
  public iddifusao: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public ch4?: number;
  public co2?: number;
  public n2o?: number;
  public ph?: number;
  public tempagua?: number;
  public tempar?: number;
  public profundidade?: number;
  public altitude?: number;
  public vento?: number;

  constructor(props: Difusao) {
    Object.assign(this, props);
  }
}
