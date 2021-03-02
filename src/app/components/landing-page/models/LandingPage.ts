export interface IPromoText {
	skeletalExtraction: string;
}

export interface IAllPersonalDescriptions {
	[key: string]: IPersonalDescription;
}
export interface IPersonalDescription {
	education: string;
	role: string;
	random: string;
}
