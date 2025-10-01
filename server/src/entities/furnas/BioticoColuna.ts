export class BioticoColuna {
  public idbioticocoluna: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public profundidade?: number;
  public doc?: number;
  public toc?: number;
  public poc?: number;
  public densidadebacteria?: number;
  public biomassabacteria?: number;
  public clorofiloa?: number;
  public biomassacarbonototalfito?: number;
  public densidadetotalfito?: number;
  public biomassazoo?: number;
  public densidadetotalzoo?: number;

  constructor(props: BioticoColuna) {
    Object.assign(this, props);
  }
}
