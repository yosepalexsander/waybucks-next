import { GithubIcon, InstagramIcon, LinkedinIcon } from 'icons';

export default function Footer() {
  return (
    <footer>
      <div className="media-social">
        <a href="https://www.instagram.com/yosep_htjlu" target="_blank" rel="noopener noreferrer">
          <InstagramIcon className="icons"/>
        </a>
        <a href="https://github.com/yosepalexsander" target="_blank" rel="noopener noreferrer">
          <GithubIcon className="icons"/>
        </a>
        <a href="https://linkedin.com/in/yosep-alexsander" target="_blank" rel="noopener noreferrer">
          <LinkedinIcon className="icons"/>
        </a>
      </div>
      <div className="information">
        <div className="more">  
          <p className="h4 uppercase mb-4">More Information</p>
          <p>About Us</p>
          <p>Carrer Center</p>
          <p>Store</p>
        </div>
        <div className="support">
          <p className="h4 uppercase mb-4">Support</p>
          <p>Frequently Asked Questions</p>
        </div>
      </div>
      <p className="copyright">&copy;2021 Waysbucks Coffee by Yosep Alexsander</p>
    </footer>
  )
}
