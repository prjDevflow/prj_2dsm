export class Estacao {
  public idestacao: string;
  public idhexadecimal: string;
  public rotulo: string | null;
  public lat: number | null;
  public lng: number | null;
  public inicio: Date | null;
  public fim: Date | null;

  constructor(props: Estacao) {
    Object.assign(this, props);
  }
}
