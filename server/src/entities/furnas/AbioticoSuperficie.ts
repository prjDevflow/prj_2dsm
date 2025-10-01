export class AbioticoSuperficie {
  public idabioticosuperficie: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida: Date | null;
  public horamedida: string | null;
  public temperatura: number | null;
  public ph: number | null;
  public condutividade: number | null;
  public od: number | null;
  public turbidez: number | null;
  public sd: number | null;

  constructor(props: AbioticoSuperficie) {
    Object.assign(this, props);
  }
}
