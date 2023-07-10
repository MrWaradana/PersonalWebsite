import { JSXElementConstructor, ReactElement } from "react";

type Meta = {
    title: string;
    description: string;
    tech: string[];
    slug: string;
    imageDesc: string;
    date: string;
}

type BlogPost = {
    meta: Meta;
    content: ReactElement<any, string | JSXElementConstructor<any>>;
}