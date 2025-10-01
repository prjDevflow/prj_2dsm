export class BioticoSuperficie {
  public idbioticosuperficie: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
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

  constructor(props: BioticoSuperficie) {
    Object.assign(this, props);
  }
}
