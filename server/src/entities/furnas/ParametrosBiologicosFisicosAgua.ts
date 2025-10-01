export class ParametrosBiologicosFisicosAgua {
  public idparametrosbiologicosfisicosagua: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public profundidade?: number;
  public secchi?: number;
  public tempagua?: number;
  public condutividade?: number;
  public _do?: number;
  public ph?: number;
  public turbidez?: number;
  public materialemsuspensao?: number;
  public doc?: number;
  public toc?: number;
  public poc?: number;
  public dic?: number;
  public nt?: number;
  public pt?: number;
  public densidadebacteria?: number;
  public biomassabacteria?: number;
  public clorofilaa?: number;
  public biomassacarbonototalfito?: number;
  public densidadetotalfito?: number;
  public biomassazoo?: number;
  public densidadetotalzoo?: number;
  public producaofitoplanctonica?: number;
  public carbonoorganicoexcretado?: number;
  public respiracaofito?: number;
  public producaobacteriana?: number;
  public respiracaobacteriana?: number;
  public taxasedimentacao?: number;
  public delta13c?: number;
  public delta15n?: number;
  public intensidadeluminosa?: number;

  constructor(props: ParametrosBiologicosFisicosAgua) {
    Object.assign(this, props);
  }
}
