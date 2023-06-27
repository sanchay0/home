export default function Footer() {
    return (
        <div className="py-12 px-8 text-center">
            <p>
            <a title="Resume" className="hover:text-black transition-colors duration-300" href="https://sanchay.s3.us-east-2.amazonaws.com/resume.pdf" target="_blank" rel="noopener noreferrer"><i className="fas fa-file-alt"></i></a>
            <a title="Github" className="hover:text-black transition-colors duration-300" href="https://www.github.com/sanchay0/" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            <a title="LinkedIn" className="hover:text-black transition-colors duration-300" href="https://www.linkedin.com/in/javeria2/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            <a title="Twitter" className="hover:text-black transition-colors duration-300" href="https://twitter.com/sanchayjaveria" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            </p>
        </div>
    )
}