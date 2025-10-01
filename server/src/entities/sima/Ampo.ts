export class AmpoTabela {
  public idcampodatabela: number;
  public idsensor: number;
  public nomecampo: string | null;
  public rotulo: string | null;
  public unidademedida: string | null;
  public ordem: number | null;

  constructor(props: AmpoTabela) {
    Object.assign(this, props);
  }
}
