export class FluxoCarbono {
  public idfluxocarbono: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public producaofitoplanctonica?: number;
  public carbonoorganicoexcretado?: number;
  public respiracaofito?: number;
  public producaobacteriana?: number;
  public respiracaobacteriana?: number;
  public taxasedimentacao?: number;

  constructor(props: FluxoCarbono) {
    Object.assign(this, props);
  }
}
