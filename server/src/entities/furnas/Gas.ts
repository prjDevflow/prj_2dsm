export class Gas {
  public idgas: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida: Date | null;
  public horamedida: string | null;
  public co2: number | null;
  public ch4: number | null;
  public n2o: number | null;

  constructor(props: Gas) {
    Object.assign(this, props);
  }
}