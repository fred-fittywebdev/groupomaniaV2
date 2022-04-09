export class User {
	constructor(
		public id: number,
		public first_name: string,
		public last_name: string,
		public username: string,
		public email: string,
		public is_valid: boolean,
		public warnings: boolean,
		public profile_picture: string
	) {}
}
