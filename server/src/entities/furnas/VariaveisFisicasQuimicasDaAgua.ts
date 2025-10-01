export class VariaveisFisicasQuimicasDaAgua {
  public idvariaveisfisicasquimicasdaagua: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public profundidade?: number;
  public secchi?: number;
  public batimetria?: number;
  public f?: number;
  public cl?: number;
  public nno3?: number;
  public ppo43?: number;
  public sso42?: number;
  public li?: number;
  public na?: number;
  public nnh4?: number;
  public k?: number;
  public mg?: number;
  public ca?: number;
  public clorofila?: number;
  public feofitina?: number;
  public turbidez?: number;
  public nt?: number;
  public pt?: number;
  public tdc?: number;

  constructor(props: VariaveisFisicasQuimicasDaAgua) {
    Object.assign(this, props);
  }
}
