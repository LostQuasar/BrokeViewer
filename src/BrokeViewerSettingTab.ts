import { App, PluginSettingTab, Setting } from 'obsidian';
import BrokeViewerPlugin from 'src/main';

export class BrokeViewerSettingTab extends PluginSettingTab {
	plugin: BrokeViewerPlugin;

	constructor(app: App, plugin: BrokeViewerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Columns')
			.setDesc('How many columns of items to show on desktop')
			.addSlider((slider) => slider
				.setLimits(2, 12, 1)
				.setValue(this.plugin.settings.desktop_cols)
				.setDynamicTooltip()
				.onChange(async (value) => {
					this.plugin.settings.desktop_cols = value;
					await this.plugin.saveSettings();
				})
			);
			new Setting(containerEl)
			.setName('Mobile Columns')
			.setDesc('How many columns of items to show on mobile.')
			.addSlider((slider) => slider
				.setLimits(1, 12, 1)
				.setValue(this.plugin.settings.mobile_cols)
				.setDynamicTooltip()
				.onChange(async (value) => {
					this.plugin.settings.mobile_cols = value;
					await this.plugin.saveSettings();
				})
			);

		new Setting(containerEl)
			.setName("Wishlist Folder")
			.setDesc("The folder all wishlisted items are Stored.")
			.addText((text) => text
				.setPlaceholder("transcripts/")
				.setValue(this.plugin.settings.list_folder)
				.onChange(async (value) => {
					this.plugin.settings.list_folder = value;
					await this.plugin.saveSettings();
				})
			);
	}
}
