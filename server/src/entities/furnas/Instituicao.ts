export class Instituicao {
  public idinstituicao: number;
  public nome: string;

  constructor(props: Instituicao) {
    Object.assign(this, props);
  }
}
