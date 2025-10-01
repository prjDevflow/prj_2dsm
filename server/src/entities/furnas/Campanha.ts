export class Campanha {
  public idcampanha: number;
  public idinstituicao: number;
  public idreservatorio: number;
  public nrocampanha: number | null;
  public datainicio: Date | null;
  public datafim: Date | null;

  constructor(props: Campanha) {
    Object.assign(this, props);
  }
}
