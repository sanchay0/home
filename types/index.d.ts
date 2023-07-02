interface IHeader {
    href: string;
    label: string;
}

interface HeaderProps {
    links?: IHeader[];
}

interface ITag {
    id: string;
    name: string;
}

interface IPost {
    id: string;
    title: string;
    author: string;
    content: string;
    created_at: Date;
    updated_at?: Date;
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
