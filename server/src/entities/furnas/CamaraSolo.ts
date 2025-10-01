export class CamaraSolo {
  public idcamarasolo: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public ch4?: number;
  public co2?: number;
  public n2o?: number;
  public tempar?: number;
  public tempsolo?: number;
  public vento?: number;
  public altitude?: number;

  constructor(props: CamaraSolo) {
    Object.assign(this, props);
  }
}
