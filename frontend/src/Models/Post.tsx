export interface IPosts {
	id: number;
	title: string;
	content: string;
	image: string;
	like: boolean;
	posted_at: string;
	is_reported: boolean;
}

export class Post implements IPosts {
	id;
	title;
	content;
	image;
	like;
	posted_at;
	is_reported;
	constructor(
		id: number,
		title: string,
		content: string,
		image: string,
		like: boolean,
		posted_at: string,
		is_reported: boolean
	) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.image = image;
		this.like = like;
		this.posted_at = posted_at;
		this.is_reported = is_reported;
	}
}
