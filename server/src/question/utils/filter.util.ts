export function findExistTags(tags: any) {
	let tagsId = tags?.map((tag) => {
		if (tag._id !== null) {
			return tag._id;
		}
	});
	return tagsId?.filter((tag) => tag !== undefined);
}

export function findNotExistTags(tags: any, rootId: string) {
	let needToCreateTags = tags?.map((tag) => {
		if (!tag?._id) {
			return {
				name: tag.name,
				questions: [rootId],
			};
		}
	});
	return needToCreateTags?.filter((tag) => tag !== undefined);
}
