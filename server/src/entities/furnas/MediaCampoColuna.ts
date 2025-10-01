export class MedidaCampoColuna {
  public idmedidacampocoluna: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public profundidade?: number;
  public secchi?: number;
  public tempagua?: number;
  public condutividade?: number;
  public do?: number;
  public ph?: number;
  public turbidez?: number;
  public materialemsuspensao?: number;
  public intensidadeluminosa?: number;

  constructor(props: MedidaCampoColuna) {
    Object.assign(this, props);
  }
}
