/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

interface IHeader {
  href: string;
  label: string;
}

interface IPostRoot {
  id?: string;
  title: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface ITag {
  id?: string;
  name: string;
  blogs?: DocumentReference<IPostRoot>[];
}

interface IPost extends IPostRoot {
  tags?: DocumentReference<ITag>[];
}

interface ILike {
  id?: string;
  createdAt: timestamp;
  name: string;
  postId: DocumentReference<IPost>;
}

interface ICommentRoot {
  id?: string;
  name: string;
  content: string;
  createdAt: timestamp;
}

interface IComment extends ICommentRoot {
  replies?: ICommentRoot[];
  postId: DocumentReference<IPost>;
}

interface HeaderProps {
  links?: IHeader[];
}

interface ISubscriber {
  id?: string;
  email: string;
}

interface IQuote {
  id?: string;
  content: string;
  author: string;
  createdAt: Date;
}
