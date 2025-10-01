export class ConcentracaoGasAgua {
  public idconcentracaogasagua: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public batimetria?: number;
  public altura?: number;
  public replica?: number;
  public ch4?: number;
  public co2?: number;

  constructor(props: ConcentracaoGasAgua) {
    Object.assign(this, props);
  }
}
