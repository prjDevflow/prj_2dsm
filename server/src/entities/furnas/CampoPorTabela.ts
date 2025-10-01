export class CampoPorTabela {
  public idcampoportabela: number;
  public idtabela: number;
  public nome: string;
  public rotulo: string;
  public unidade: string | null;
  public descricao: string | null;
  public principal: string;
  public ordem: number | null;
  public tipo: string;

  constructor(props: CampoPorTabela) {
    Object.assign(this, props);
  }
}