export class Horiba {
  public idhoriba: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public profundidade?: number;
  public tempagua?: number;
  public condutividade?: number;
  public ph?: number;
  public do?: number;
  public tds?: number;
  public redox?: number;
  public turbidez?: number;

  constructor(props: Horiba) {
    Object.assign(this, props);
  }
}
