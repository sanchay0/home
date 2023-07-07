import Head from 'next/head'

export default function Contact() {
    return ( 
        <>
        <Head>
            <title>Contact</title>
        </Head>
        <div className="grid gap-12 md:gap-24 font-light text-sm mt-16">
            <div className="font-light text-sm">
            <p className="dark:text-white text-black">Contact</p>
                <div className="grid gap-6 mt-3">
                    <div className="grid grid-cols-1 items-start md:grid-cols-1 text-neutral-500">
                        <p>Feel free to shoot me a message on <a className="text-black duration-200 hover:no-underline underline after:content-['_↗']" href="https://twitter.com/sanchayjaveria" title="Twitter" target="_blank" rel="noopener noreferrer">Twitter</a>, or you can also send me an email at <a className="text-black duration-200 hover:no-underline underline after:content-['_↗']" href="mailto:sanchayjaveria@gmail.com" title="Email">sanchayjaveria [at] gmail [dot] com</a></p>
                    </div>
                </div>
            </div>

            <div className="font-light text-sm">
                <p className="dark:text-white text-black">Other Links</p>
                <div className="grid gap-6 mt-3">
                    <div className="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div><p className="dark:text-neutral-400 text-neutral-400">LinkedIn</p></div>
                        <div className="md:col-span-2 w-full">
                            <p className="dark:text-white text-black">
                            <a title="LinkedIn" className="text-black duration-200 hover:no-underline underline after:content-['_↗']" href="https://www.linkedin.com/in/javeria2/" target="_blank" rel="noopener noreferrer">javeria2</a>
                                </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div><p className="dark:text-neutral-400 text-neutral-400">Github</p></div>
                        <div className="md:col-span-2 w-full">
                            <p className="dark:text-white text-black">
                            <a title="Github" className="text-black duration-200 hover:no-underline underline after:content-['_↗']" href="https://www.github.com/sanchay0/" target="_blank" rel="noopener noreferrer">sanchay0</a>
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div><p className="dark:text-neutral-400 text-neutral-400">Resume</p></div>
                        <div className="md:col-span-2 w-full">
                            <p className="dark:text-white text-black">
                            <a title="Resume" className="text-black duration-200 hover:no-underline underline after:content-['_↗']" href="https://sanchay.s3.us-east-2.amazonaws.com/resume.pdf" target="_blank" rel="noopener noreferrer">sanchay_javeria</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
