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

export interface FeatureNetworkScreenPosition {
  id: number;
  xPerc: number;
  yPerc: number;
  widthPerc: number;
}

export interface FeatureNetworkScreen {
  id: number;
  pos: {
    x: number;
    y: number;
  };
  width: number;
  style?: string;
  inLight?: boolean;
}

export interface FeatureNetworkCable {
  screenID?: number;
  pos1: {
    x: number;
    y: number;
  };
  pos2: {
    x: number;
    y: number;
  };
  class: string;
}
