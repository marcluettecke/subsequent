export interface IPromoText {
  skeletalExtraction: string;
}

export interface IPersonalDescription {
  fullname: string;
  title: string;
  education: string;
  role: string;
  random: string;
}

export interface FeatureNetworkScreen {
  id: number;
  xPerc: number;
  yPerc: number;
  widthPerc: number;
  pos: {
    x: number | null;
    y: number | null;
  };
  width?: number;
  style?: string;
}

export interface FeatureNetworkCable {
  screenID?: number;
  pos1: {
    x: number | null;
    y: number | null;
  };
  pos2: {
    x: number | null;
    y: number | null;
  };
  class: string;
}
