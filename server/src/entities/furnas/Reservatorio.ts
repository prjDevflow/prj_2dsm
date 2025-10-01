export class Reservatorio {
  public idreservatorio: number;
  public nome: string;
  public lat: number | null;
  public lng: number | null;

  constructor(props: Reservatorio) {
    Object.assign(this, props);
  }
}
