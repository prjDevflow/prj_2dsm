export class Biotico {
  public idbiotico: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida: Date | null;
  public horamedida: string | null;
  public especie: string | null;
  public densidade: number | null;
  public biomassa: number | null;

  constructor(props: Biotico) {
    Object.assign(this, props);
  }
}

