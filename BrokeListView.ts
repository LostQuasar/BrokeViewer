import { ItemView, Notice, WorkspaceLeaf } from 'obsidian';
import Component from "./Component.svelte";
import { BROKE_VIEW_TYPE, BROKE_ICON } from 'main';
import type BrokeViewerPlugin from 'main';

export class BrokeListView extends ItemView {
	component!: Component;
	plugin: BrokeViewerPlugin;

	constructor(leaf: WorkspaceLeaf, plugin: BrokeViewerPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType() {
		return BROKE_VIEW_TYPE;
	}

	getDisplayText() {
		return "Broke Viewer";
	}

	getIcon(): string {
		return BROKE_ICON;
	}
	async onOpen() {
		this.parseData();
		this.component = new Component({
			target: this.contentEl,
			props: {
				variable: 4
			}
		});

	}

	async onClose() {
		this.component.$destroy();
	}

	parseData() {
		let listFolder = this.app.vault.getFolderByPath(this.plugin.settings.list_folder);
		if (!listFolder) {
			new Notice("Folder " + this.plugin.settings.list_folder + " could not be read.")
			throw new Error('Folder could not be read.');
		}

		 

	}
}

