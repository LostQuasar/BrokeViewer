<script lang="ts">
	import { afterUpdate, onMount } from "svelte";
	import { data_store } from "./BrokeListView";
	export let cols: Number;
	let data_value: string[][];

	data_store.subscribe((data: string[][]) => {data_value = data});
	let gridDiv: HTMLDivElement;

	function shuffle(array: string[][]) {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex > 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	}
	function updateScreen() {
		shuffle(data_value);

		const arrayDiv: HTMLDivElement[] = [];
		const arrayP: HTMLParagraphElement[] = [];
		const arrayA: HTMLAnchorElement[] = [];
		for (let i = 0; i < data_value.length; i++) {
			arrayA[i] = document.createElement("a");
			arrayA[i].href = data_value[i][3];
			arrayDiv[i] = document.createElement("div");
			arrayDiv[i].className = "grid-item";
			arrayDiv[i].style.backgroundImage = "url(" + data_value[i][2] + ")";
			arrayP[i] = document.createElement("p");
			arrayP[i].className = "grid-text";
			arrayP[i].innerHTML = data_value[i][0] + "<br>" + data_value[i][1];
			gridDiv
				.appendChild(arrayA[i])
				.appendChild(arrayDiv[i])
				.appendChild(arrayP[i]);
		}
	}
	
	onMount(() => { updateScreen() });

</script>

<div bind:this={gridDiv} class="grid" style="--cols:{cols}"></div>

<style>
	.grid {
		height: 100%;
	}
	:global(.grid-item) {
		width: calc(100% / var(--cols));
		float: left;
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
		transition: all 0.35s ease-in-out;
		border: 10px solid var(--background-primary);
		height: 0;
		padding-bottom: calc((100% / var(--cols)) - 20px);
		background-color: #ffffff;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center center;
	}
	:global(.grid-text) {
		margin: 24px;
		font-size: 24px;
		font-weight: 900;
		color: #1b1b1b;
		text-shadow:
		#f6f6f6 0px 0px 6px,
		#f6f6f6 0px 0px 12px
	}
</style>
