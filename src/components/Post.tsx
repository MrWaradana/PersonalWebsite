import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';


export default function Post(props) {
    return (
        <MDXProvider components={components}>
            <main {...props} />
        </MDXProvider>
    );
}