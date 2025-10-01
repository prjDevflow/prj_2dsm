export class FluxoDifusivo {
  public idfluxodifusivo: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public batimetria?: number;
  public intervalo?: string;
  public ch4?: number;
  public co2?: number;

  constructor(props: FluxoDifusivo) {
    Object.assign(this, props);
  }
}
