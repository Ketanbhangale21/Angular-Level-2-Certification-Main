export type Model = {
  code: string;
  description: string;
  colors: Color[];
};

export type Color = {
  code: string;
  description: string;
  price: number;
};

export type Configuration = {
  configs: Type[];
  towHitch: boolean;
  yoke: boolean;
};

export type Type = {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
};

export type Summary = {
  code?: string;
  description?: string;
  color?: Color;
  config?: Type;
  towHitch?: boolean;
  yoke?: boolean;
};
