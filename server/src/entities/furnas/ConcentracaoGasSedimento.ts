export class ConcentracaoGasSedimento {
  public idconcentracaogassedimento: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public batimetria?: number;
  public profundidadedosedimento?: number;
  public replica?: number;
  public ch4?: number;
  public co2?: number;

  constructor(props: ConcentracaoGasSedimento) {
    Object.assign(this, props);
  }
}
