import React from "react";
import './PromoPage.scss'
import { sectionsApplication } from "./const";
import { ReactComponent as BackgroundPromo } from '../../assets/img/background_promo_page.svg';
import SpanButton from "../Card/SpanButton/SpanButton";
class PromoPage extends React.Component {
    state = {

    }

    createBlocksImages = () => {
        const imagesBlocks = sectionsApplication.map((section, index) => {
            if (index === 0) {
                return (
                    <div className='image_block__wrapper'>
                        <div className='image_and_description'>
                            <div className="image_block">
                                <img src={section.image} className="image_block__image first" alt='image_app'/>
                            </div>
                            <div className="image_description__wrapper">
                                <div className="image_description">
                                    <span className='image_description__span'>{section.description}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }
            else if (index % 2 === 0) {
                return (
                    <div className='image_block__wrapper'>
                        <hr className='horizontal_line' align="center" width="500" size="9" color="#3084C1"/>
                        <div className='image_and_description'>
                            <div className="image_block">
                                <img src={section.image} className="image_block__image first" alt='image_app'/>
                            </div>
                            <div className="image_description__wrapper">
                                <div className="image_description">
                                    <span className='image_description__span'>{section.description}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {

                return (
                    <div className='image_block__wrapper'>
                        <hr className='horizontal_line' align="center" width="500" size="9" color="#3084C1"/>
                        <div className='image_and_description'>
                            <div className="image_description__wrapper">
                                <div className="image_description">
                                    <span className='image_description__span'>{section.description}</span>
                                </div>
                            </div>
                            <div className="image_block">
                                <img src={section.image} className="image_block__image first" alt='image_app'/>
                            </div>
                        </div>
                    </div>
                )
            }

        })
        return imagesBlocks;
    }

    render = () => {
        const images = this.createBlocksImages();
        return (
            <main>
                <div className='background_promo'>
                    <BackgroundPromo style={{ width: "100vw", height: "100vh" }}/>
                </div>
                <article className='main_content'>
                    <section className='logo'>
                        <a className='app_link' href='https://rslang-team32-maxvvellh0use.netlify.app/'>
                            <span className='logo_span'/>
                        </a>
                    </section>
                    <section className='description_promo'>
                        <div className='description_promo__text'>
                            Представляем Вам умное приложение для изучения Английского языка.
                        </div>
                    </section>
                    <section className='images_application'>
                        {images}
                    </section>
                </article>
                <footer className='footer'>
                    <div className="footer_promo">
                        <div className='copyright'>
                            Copyright ©
                        </div>
                        <div className='github'>
                            <a href='https://github.com/Maxvvellh0use/rslang'>
                                <SpanButton
                                    className='github_button'
                                />
                            </a>
                        </div>
                    </div>
                </footer>
            </main>
        )
    }
}

export default PromoPage;
