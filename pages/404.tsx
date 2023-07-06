import Head from 'next/head'
import Image from 'next/image'

export default function Custom404() {
    return (
        <>
        <Head>
            <title>404</title>
        </Head>
        <div className="text-center">
            <Image 
                priority={false} 
                alt="image"
                width={300}
                height={300}
                src="/404.svg"
                draggable="false"
                className="select-none" />
            <div className="mt-16">404 | This page could not be found.</div>
        </div>
        </>
    )
}
