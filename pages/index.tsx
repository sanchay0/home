import Image from 'next/image'
import React from 'react'

const App = () => {

  return (
    <div className="mx-auto max-w-xl">
      <div className="md:flex md:items-center md:justify-between md:space-x-5">
        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="rounded-full border border-white/10 h-16 lg:h-24 lg:w-24 w-16">
                <Image alt="image" width={100} height={100} src="/black.svg" />
              </div>
              <span aria-hidden="true" className="rounded-full absolute inset-0 shadow-inner"></span>
            </div>
          </div>
          <div className="pt-1.5">
            <h1 className="dark:text-white text-black lg:text-xl">Sanchay Javeria</h1>
            <p className="text-neutral-500 font-light text-sm">Software Engineer in San Francisco</p>
          </div>
        </div>
      </div>
      <div className="font-light text-sm mt-16">
        <p className="text-black">About</p>
        <div className="text-neutral-500 dark:text-neutral-400 mt-3 space-y-3">
          <p>For the past 4 years, I have been working on high performance and scalable distributed data systems at Pinterest. I worked on introducing <a className="duration-200 hover:no-underline underline" href="https://medium.com/pinterest-engineering/interactive-querying-with-apache-spark-sql-at-pinterest-2a3eaf60ac1b" title="blog" target="_blank" rel="noopener noreferrer">Spark SQL as the primary compute engine</a>, and these days I work on the <a className="duration-200 hover:no-underline underline" href="https://medium.com/pinterest-engineering/powering-pinterest-ads-analytics-with-apache-druid-51aa6ffb97c1" title="blog" target="_blank" rel="noopener noreferrer">Ads reporting infrastructure</a> powering the Pinterest Ads Manager.</p><p>I specialize in building scalable and reliable data-intensive applications, with a love for solving complex problems. Quality is my No. 1 constraint – always, and I strive to be a thinker-doer.</p>
          <p>Outside of work, I&apos;m very passionate about value and <a className="duration-200 hover:no-underline underline" href="https://en.wikipedia.org/wiki/Event-driven_investing" title="wiki" target="_blank" rel="noopener noreferrer">event-driven investing</a>.</p>
        </div>
      </div>
    </div>
  )
}

export default App;
