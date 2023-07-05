/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
interface IHeader {
    href: string;
    label: string;
}

interface IPostRoot {
    id: string;
    title: string;
    author: string;
    content: string;
    created_at: Date;
    updated_at?: Date;
}

interface ITag {
    id: string;
    name: string;
    posts?: IPostRoot[];
}

interface IPost extends IPostRoot {
    tags?: ITag[];
}

interface ILike {
    time: timestamp;
    name: string;
}

interface ICommentRoot {
    id: string;
    name: string;
    content: string;
    time: timestamp;
}

interface IComment extends ICommentRoot {
    replies?: ICommentRoot[];
}

interface HeaderProps {
    links?: IHeader[];
}

interface BlogProps {
    tag?: ITag;
}