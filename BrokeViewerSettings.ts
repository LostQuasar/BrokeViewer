export interface BrokeViewerSettings {
	rows: number;
	list_folder: string;
}
export const DEFAULT_SETTINGS: BrokeViewerSettings = {
	rows: 4,
	list_folder: "list/",
};
