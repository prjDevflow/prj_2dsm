export class Furnas {
  // Identificadores principais
  public idcampanha: number;
  public idsitio: number;
  public idabioticocoluna: number | null;

  // Informações de data e hora
  public datamedida: Date | null;
  public horamedida: string | null;

  // Parâmetros físico-químicos
  public profundidade: number | null;
  public temperatura: number | null;
  public condutividade: number | null;
  public ph: number | null;
  public oxigenioDissolvido: number | null;
  public transparencia: number | null;

  // Nutrientes
  public nt: number | null;       // Nitrogênio total
  public pt: number | null;       // Fósforo total

  // Carbono
  public dic: number | null;      // Carbono inorgânico dissolvido
  public doc: number | null;      // Carbono orgânico dissolvido
  public poc: number | null;      // Carbono orgânico particulado

  // Isótopos estáveis
  public delta13c: number | null;
  public delta15n: number | null;

  // Gases (exemplo, pode adicionar outros)
  public co2: number | null;
  public ch4: number | null;

  constructor(props: Partial<Furnas>) {
    Object.assign(this, props);
  }
}
