export class DadosRepresa {
  public iddadosrepresa: number;
  public idreservatorio: number;
  public datamedida?: Date;
  public nivelreservatorio?: number;
  public volutilareservatorio?: number;
  public porvolutilreservatorio?: number;
  public geracao?: number;
  public vazaoafluente?: number;
  public vazaodefluente?: number;
  public produtividade?: number;
  public vazaoturbinada?: number;
  public vazaovertida?: number;
  public vazaoturbinadavazio?: number;

  constructor(props: DadosRepresa) {
    Object.assign(this, props);
  }
}
