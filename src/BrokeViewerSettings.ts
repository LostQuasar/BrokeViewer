export interface BrokeViewerSettings {
	desktop_cols: number;
	mobile_cols: number;
	list_folder: string;
}
export const DEFAULT_SETTINGS: BrokeViewerSettings = {
	desktop_cols: 4,
	mobile_cols: 2,
	list_folder: "list",
};
