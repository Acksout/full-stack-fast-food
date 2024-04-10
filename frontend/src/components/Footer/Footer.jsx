
import './Footer.css'
import {assets} from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img className="footer-logo" src={assets.logo} alt=""/>
                    <p>sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate
                        sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum </p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt=""/>
                        <img src={assets.twitter_icon} alt=""/>
                        <img src={assets.linkedin_icon} alt=""/>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91-0987654321</li>
                        <li>contact@fakemail.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className="footer-copyright">Copyright 2024 © fakemail.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer
