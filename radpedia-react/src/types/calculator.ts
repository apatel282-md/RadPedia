export interface OrganMeasurement {
  height: string;
  age: string;
  mean: number;
  min: number;
  max: number;
  p5: number;
  p95: number;
  lowerNormal: number;
  upperNormal: number;
}

export interface LegMeasurements {
  right: {
    proximalFemur: number;
    distalFemur: number;
    distalTibia: number;
  };
  left: {
    proximalFemur: number;
    distalFemur: number;
    distalTibia: number;
  };
}

export interface FORInputs {
  frontalHorn: number;
  interparietalDiameter: number;
  occipitalHorn: number;
}
