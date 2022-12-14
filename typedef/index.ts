export interface CategoryProp {
	name: string
	slug: string
	id: string
}

export interface PostProps {
	post: {
		title: string;
		slug: string;
		createdAt: string;
		excerpt: string;
		featuredImage: {
			url: string;
		};
		author: {
			name: string;
			photo: {
				url: string;
			};
		};
	};
	content?: any
}

export interface RecentPostProps {
	id: string
	title: string
	featuredImage: {
		url: string
	}
	createdAt: string
	slug: string
}

export interface PostWidgetProps {
	categories: string[];
	slug: string;
}

export interface PostNodeProps {
	node: {
		id: any;
		title: string;
		slug: string;
		createdAt: string;
		excerpt: string;
		featuredImage: {
			url: string;
		};
		author: {
			name: string;
			photo: {
				url: string;
			};
		};
	};
}

export interface AuthorProp {
	author: {
		name: string
		bio: string
		id: string
		photo: {
			url: string
		}

	}

}

export interface CommentProp {
	postComments: {
		id: string
		name: string
		createdAt: string
		comment: string

	}
}

export interface SingleCommentProp {
	id: string
	name: string
	createdAt: string
	comment: string
}

export interface NewCommentProps {
	name: string;
	email: string;
	comment: string;
	slug: string;
}