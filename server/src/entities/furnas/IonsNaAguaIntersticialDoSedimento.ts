export class IonsNaAguaIntersticialDoSedimento {
  public idionsnaaguaintersticialdosedimento: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public profundidade?: number;
  public batimetria?: number;
  public f?: number;
  public cl?: number;
  public no2?: number;
  public br?: number;
  public no3?: number;
  public po4?: number;
  public so4?: number;
  public na?: number;
  public nh4?: number;
  public k?: number;
  public mg?: number;
  public ca?: number;
  public acetato?: number;

  constructor(props: IonsNaAguaIntersticialDoSedimento) {
    Object.assign(this, props);
  }
}
