export interface BlogTypes {
	slug: string;
	title: string;
	id: string;
	excerpt: string;
	image: {
		url: string;
	};
	author: {
		name: string;
		avatar: {
			url: string;
		}[];
	};
	category: {
		slug: string;
		label: string;
	};
	description: {
		text: string;
	};
	createdAt: Date;
}
