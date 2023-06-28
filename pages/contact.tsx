const HomePage = () => {

    return (
        <div>
            Feel free to shoot me a message on <a className="text-black duration-200 hover:no-underline underline after:content-['_↗']" href="https://twitter.com/sanchayjaveria" title="Twitter" target="_blank" rel="noopener noreferrer">Twitter</a>, or you can also send me an email at <a className="text-black duration-200 hover:no-underline underline after:content-['_↗']" href="mailto:sanchayjaveria@gmail.com" title="Email">sanchayjaveria [at] gmail [dot] com</a>
        </div>
    )
}

HomePage.getInitialProps = () => {
    const headerLinks = [
        { href: '/', label: 'About' },
        { href: '/blog', label: 'Blog' },
      ];

    return { headerLinks };
}

export default HomePage;
