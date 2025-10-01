export class Sensor {
  public idsensor: number;
  public nome: string | null;
  public fabricante: string | null;
  public modelo: string | null;
  public faixa: string | null;
  public precisao: string | null;

  constructor(props: Sensor) {
    Object.assign(this, props);
  }
}
