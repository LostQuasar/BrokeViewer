import { ItemView, Notice, WorkspaceLeaf, Platform } from 'obsidian';
import Component from "./Component.svelte";
import { BROKE_VIEW_TYPE, BROKE_ICON } from 'src/main';
import type BrokeViewerPlugin from 'src/main';

export class BrokeListView extends ItemView {
	component!: Component;

	constructor(leaf: WorkspaceLeaf, public plugin: BrokeViewerPlugin) {
        super(leaf);
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
		let data = await this.parseData();
		let cols: Number;
		if (!Platform.isDesktop){
			cols = this.plugin.settings.mobile_cols;
		}
		else {
			cols = this.plugin.settings.desktop_cols;
		}
		this.component = new Component({
			target: this.contentEl,
			props: {
				cols: cols,
				data: data,
			}
		});

	}

	async onClose() {
		this.component.$destroy();
	}

	async parseData() {
		let itemArray: string[][] = [];
		let listFolder = this.app.vault.getFolderByPath(this.plugin.settings.list_folder);
		if (!listFolder) {
			new Notice("Folder " + this.plugin.settings.list_folder + " could not be read.")
			throw new Error('Folder could not be read.');
		};
		listFolder.children.forEach(async folderChild => {
			let file = this.app.vault.getFileByPath(folderChild.path);
			if (!file) {
				new Notice("File " + folderChild.path + " could not be read.")
				throw new Error('File could not be read.');
			};
			let fileData = await this.app.vault.cachedRead(file);
			let price = fileData.match(/## Price\n(.+?)\n/)
			if (!price) {
				new Notice("Price could not be read in  " + folderChild.path)
				throw new Error('Price could not be read.');
			};
			let img = fileData.match(/!\[.+?\]\((.+?)\)/)
			if (!img) {
				new Notice("Image url could not be read in  " + folderChild.path)
				throw new Error('Image url could not be read.');
			};

			itemArray.push([file.name.replace('.md',''),price[1],img[1],'obsidian://open?vault='+this.app.vault.getName()+'&file='+(encodeURI(file.path))])
		});
		return itemArray
	}
}

