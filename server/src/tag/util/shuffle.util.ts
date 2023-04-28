export function shuffle(items: string[]) {
	let array = items?.map((item) => item.toString());
	if (items.length > 3) {
		array.sort();
		let holder = [];
		for (let i = 0; i < 3; i++) {
			const rand = Math.floor(Math.random() * array.length);
			const _id = array.splice(rand, 1);
			holder.push(_id);
		}
		return holder;
	} else {
		return array;
	}
}
