import React from 'react'
import '../CSS/footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {FaTwitter,FaLinkedinIn,FaFacebook} from "react-icons/fa"

class Footer extends React.Component {
    render() {
        return(

<>
    

<footer class="new_footer_area bg_color">
            <div class="new_footer_top">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-6">
                            <div class="f_widget company_widget wow fadeInLeft" data-wow-delay="0.2s" style={{visibility: 'visible', 'animation-delay': '0.2s', 'animation-name': 'fadeInLeft'}}>
                                <h3 class="f-title f_600 t_color f_size_18">Get in Touch</h3>
                                <form action="#" class="f_subscribe_two mailchimp" method="post" novalidate="true" _lpchecked="1">
                                    <input type="text" name="EMAIL" class="form-control memail" placeholder="Email"/>
                                    <button class="btn btn_get btn_get_two" type="submit">Subscribe</button>
                                    <p class="mchimp-errmessage" style={{display: 'none'}}></p>
                                    <p class="mchimp-sucmessage"  style={{display: 'none'}}></p>
                                </form>
                            </div>
                        </div>
                      
                 
                        <div class="col-lg-3 col-md-6">
                            <div class="f_widget social-widget pl_70 wow fadeInLeft" data-wow-delay="0.8s" style={{visibility: 'visible', 'animation-delay': '0.8s', 'animation-name': 'fadeInLeft'}}>
                                <h3 class="f-title f_600 t_color f_size_18">Find Us On Social Media...</h3>
                                <div class="f_social_icon">
                                    <a href="#"><FaTwitter />
</a>
                                    <a href="#"><FaLinkedinIn/></a>
                                    <a href="#"><FaFacebook/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer_bg">
                    <div class="footer_bg_one"></div>
                    <div class="footer_bg_two"></div>
                </div>
            </div>
            <div class="footer_bottom">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6 col-sm-7">
                            <p class="mb-0 f_400">© React Warriors Inc.. 2021 All rights reserved.</p>
                        </div>
                        <div class="col-lg-6 col-sm-5 text-right">
                            <p>Made with <i class="icon_heart"></i> in <a href="#">weekBEAT</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
</>
        )
    }
}
export default Footer;