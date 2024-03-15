<script lang="ts">
	import { onMount } from "svelte";
	export let cols: Number;
	export let data: string[][];
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

	onMount(() => {
		shuffle(data);
		const arrayDiv: HTMLDivElement[] = [];
		const arrayP: HTMLParagraphElement[] = [];
		const arrayA: HTMLAnchorElement[] = [];
		for (let i = 0; i < data.length; i++) {
			arrayA[i] = document.createElement("a");
			arrayA[i].href = data[i][3];
			arrayDiv[i] = document.createElement("div");
			arrayDiv[i].className = "grid-item";
			arrayDiv[i].style.backgroundImage = "url(" + data[i][2] + ")";
			arrayP[i] = document.createElement("p");
			arrayP[i].className = "grid-text";
			arrayP[i].innerHTML = data[i][0] + "<br>" + data[i][1];
			gridDiv
				.appendChild(arrayA[i])
				.appendChild(arrayDiv[i])
				.appendChild(arrayP[i]);
		}
	});
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
		border: 10px solid #1e1e1e;
		height: 0;
		padding-bottom: calc((100% / var(--cols)) - 20px);
		background-color: #fff;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center center;
	}
	:global(.grid-text) {
		margin: 22px;
		font-size: 22px;
		font-weight: bold;
		color: #fff;
		text-shadow:
			#000 0px 0px 6px,
			#000 0px 0px 12px;
	}
</style>
