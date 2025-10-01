export class AguaMateriaOrganicaSedimento {
  public idaguanateriaorganicasedimento: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public profundidade?: number;
  public batimetria?: number;
  public agua?: number;
  public materiaorganica?: number;

  constructor(props: AguaMateriaOrganicaSedimento) {
    Object.assign(this, props);
  }
}
