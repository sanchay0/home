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
    created_at: Date;
    updated_at?: Date;
}

interface ITag {
    id?: string;
    name: string;
    posts?: IPostRoot[];
}

interface IPost extends IPostRoot {
    tags?: ITag[];
}

interface ILike {
    id?: string;
    created_at: timestamp;
    name: string;
    post_id: DocumentReference;
}

interface ICommentRoot {
    id?: string;
    name: string;
    content: string;
    created_at: timestamp;
}

interface IComment extends ICommentRoot {
    id?: string;
    replies?: ICommentRoot[];
    post_id: DocumentReference;
}

interface HeaderProps {
    links?: IHeader[];
}

interface BlogProps {
    tag?: ITag;
}

interface ISubscriber {
    id?: string;
    email: string;
}