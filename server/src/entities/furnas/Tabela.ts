export class Tabela {
  public idtabela: number;
  public idinstituicao: number;
  public nome: string;
  public rotulo: string;
  public excecao: string | null;
  public sitio: string;
  public campanha: string;

  constructor(props: Tabela) {
    Object.assign(this, props);
  }
}
