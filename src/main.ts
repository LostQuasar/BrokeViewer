import {Plugin, WorkspaceLeaf } from 'obsidian';

import { BrokeListView } from 'src/BrokeListView';
import { BrokeViewerSettingTab } from 'src/BrokeViewerSettingTab';
import type { BrokeViewerSettings } from 'src/BrokeViewerSettings';
import { DEFAULT_SETTINGS } from 'src/BrokeViewerSettings';

export const BROKE_VIEW_TYPE = "broke-list-view";
export const BROKE_ICON = "gift";

export default class BrokeViewerPlugin extends Plugin {
	settings!: BrokeViewerSettings;

	async onload() {
		await this.loadSettings();

		const ribbonViewerIcon = this.addRibbonIcon(BROKE_ICON, 'Broke Viewer', (evt: MouseEvent) => {
			this.activateView();
		});

		ribbonViewerIcon.addClass('broke-viewer-ribbon');

		this.addSettingTab(new BrokeViewerSettingTab(this.app, this));

		this.registerView(
			BROKE_VIEW_TYPE,
			(leaf) => new BrokeListView(leaf, this)
		);

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	reloadView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(BROKE_VIEW_TYPE);
		if (leaves.length > 0) {
			leaf = leaves[0]; leaf.getViewState
		} 
	}

	async activateView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(BROKE_VIEW_TYPE);

		if (leaves.length > 0) {
			leaf = leaves[0];
		} else {
			leaf = workspace.getLeaf(true);
			await leaf.setViewState({ type: BROKE_VIEW_TYPE });
		}

		workspace.revealLeaf(leaf);
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

