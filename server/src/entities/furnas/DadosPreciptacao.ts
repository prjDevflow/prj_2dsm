export class DadosPrecipitacao {
  public iddadosprecipitacao: number;
  public idreservatorio: number;
  public datamedida?: Date;
  public precipitacao?: number;

  constructor(props: DadosPrecipitacao) {
    Object.assign(this, props);
  }
}
