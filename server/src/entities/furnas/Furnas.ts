export class Furnas {
  // Identificadores
  idcampanha: number;
  idsitio: number;
  idabioticocoluna: number | null;

  // Informações de data e hora
  datamedida: Date | null;
  horamedida: string | null;

  // Parâmetros físico-químicos
  profundidade: number | null;
  temperatura: number | null;
  condutividade: number | null;
  ph: number | null;
  oxigenioDissolvido: number | null;
  transparencia: number | null;

  // Nutrientes
  nt: number | null; // Nitrogênio total
  pt: number | null; // Fósforo total

  // Carbono
  dic: number | null;
  doc: number | null;
  poc: number | null;

  // Isótopos estáveis
  delta13c: number | null;
  delta15n: number | null;

  // Gases
  co2: number | null;
  ch4: number | null;

  constructor(props: Partial<Furnas>) {
    Object.assign(this, props);
  }
}
