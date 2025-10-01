export class NutrientesSedimento {
  public idnutrientessedimento: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public profundidade?: number;
  public batimetria?: number;
  public n2?: number;
  public pt?: number;
  public tc?: number;

  constructor(props: NutrientesSedimento) {
    Object.assign(this, props);
  }
}
