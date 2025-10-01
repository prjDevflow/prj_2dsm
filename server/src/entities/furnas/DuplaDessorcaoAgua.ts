export class DuplaDessorcaoAgua {
  public iddupladessorcaoagua: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public profundidade?: number;
  public co2?: number;
  public o2?: number;
  public n2?: number;
  public ch4?: number;
  public n2o?: number;

  constructor(props: DuplaDessorcaoAgua) {
    Object.assign(this, props);
  }
}
