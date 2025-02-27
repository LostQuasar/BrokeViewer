<script lang="ts">
	import { data_store } from "./BrokeListView";
	import { tick } from 'svelte';
	export let cols: Number;

	let data_value: string[][];
	let gridDiv: HTMLDivElement;
	data_store.subscribe(async (data_store: string[][]) => {
		data_value = data_store;
		await tick();
		updateScreen();
	});

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
		const data = shuffle(data_value);
		const arrayDiv: HTMLDivElement[] = [];
		const arrayP1: HTMLParagraphElement[] = [];
		const arrayP2: HTMLParagraphElement[] = [];
		const arrayA: HTMLAnchorElement[] = [];
		gridDiv.innerHTML = '';

		for (let i = 0; i < data.length; i++) {
			arrayA[i] = document.createElement("a");
			arrayA[i].href = data[i][3];
			arrayDiv[i] = document.createElement("div");
			arrayDiv[i].className = "grid-item";
			arrayDiv[i].style.backgroundImage = "url(" + data[i][2] + ")";
			arrayP1[i] = document.createElement("p");
			arrayP1[i].className = "grid-text";
			arrayP1[i].innerHTML = data[i][0];
			arrayP2[i] = document.createElement("p");
			arrayP2[i].className = "align-bottom";
			arrayP2[i].innerHTML = data[i][1];
			gridDiv
				.appendChild(arrayA[i])
				.appendChild(arrayDiv[i])
				.appendChild(arrayP1[i])
				.appendChild(arrayP2[i]);
		}
	}
	
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
		/* border: 10px solid var(--background-primary); */
		margin: 10px;
		border-radius: 10px;
		height: 0;
		padding-bottom: calc(100% / var(--cols));
		background-color: #ffffff;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center center;
	}
	:global(.grid-text) {
		margin: 10%;
		font-size: 1.25rem;
		font-weight: 900;
		color: #1b1b1b;
		text-shadow:
			#f6f6f6 0px 0px 6px,
			#f6f6f6 0px 0px 12px;
	}
	:global(.align-bottom) {
		position: absolute;
		bottom: 0;
		margin-left: 0;
	}
</style>
