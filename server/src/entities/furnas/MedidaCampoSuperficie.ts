export class MedidaCampoSuperficie {
  public idmedidacamposuperficie: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public secchi?: number;
  public tempagua?: number;
  public condutividade?: number;
  public do?: number;
  public ph?: number;
  public turbidez?: number;
  public materialemsuspensao?: number;

  constructor(props: MedidaCampoSuperficie) {
    Object.assign(this, props);
  }
}
