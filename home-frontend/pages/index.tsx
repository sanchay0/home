import React, { useRef } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import styles from '../styles/styles.module.css'

interface PageProps {
  offset: number,
  gradient: string,
  onClick: () => void,
  caption: string,
  first: string,
  second: string,
}

const Page = ({ offset, gradient, onClick, caption, first, second }: PageProps) => (
  <>
    <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
      <div className={styles.slopeBegin} />
    </ParallaxLayer>

    <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
      <div className={`${styles.slopeEnd} ${styles[gradient]}`} />
    </ParallaxLayer>

    <ParallaxLayer className={`${styles.text} ${styles.number}`} offset={offset} speed={0.3}>
      <span className="md:text-30xl sm:text-25xl text-14xl">0{offset + 1}</span>
    </ParallaxLayer>

    <ParallaxLayer className={`${styles.text}`} offset={offset} speed={0.4}>
      {/* BIO */}
      <div className="grid grid-cols-1 md:pl-80 sm:pl-64 pl-32">
        <p className="md:text-xl sm:text-lg text-base text-white pb-1">{caption}</p>
        <span className={`${styles.stripe} ${styles[gradient]}`} />
        <p className="md:text-5xl sm:text-4xl text-3xl text-white pt-6">{first}</p>
        <p className="md:text-lg sm:text-base text-sm text-white pt-3">{second}</p>
      </div>
    </ParallaxLayer>
  </>
)

export default function App() {
  const parallax = useRef<IParallax>(null)

  const scroll = (to: number) => {
    if (parallax.current) {
      parallax.current.scrollTo(to)
    }
  }

  const Footer = () => (
    <div className={`${styles.footer}`}>
      <p>
        <a title="Resume" href="https://sanchay.s3.us-east-2.amazonaws.com/resume.pdf" target="_blank" rel="noopener noreferrer"><i className="fas fa-file-alt"></i></a>
        <a title="Github" href="https://www.github.com/sanchay0/" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
        <a title="LinkedIn" href="https://www.linkedin.com/in/javeria2/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
        <a title="Twitter" href="https://twitter.com/sanchayjaveria" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
        <a title="Instagram" href="https://www.instagram.com/sanchayjaveria" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
      </p>
    </div>
  )

  return (
    <div style={{ background: '#dfdfdf' }}>
      <Parallax className={styles.container} ref={parallax} pages={1}>
        <Page offset={0} gradient="pink" onClick={() => {}} caption="I am 👋" first="Sanchay Javeria" second="Software Engineer at Pinterest" />
      </Parallax>
      <Footer />
    </div>
  )
}

