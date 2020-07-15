import React from "react";
import './PromoPage.scss'
import { images } from "./const";
import { ReactComponent as BackgroundPromo } from '../../assets/img/background_promo_page.svg';
class PromoPage extends React.Component {
    state = {

    }


    createBlocksImages = () => {
        const imagesBlocks = images.map((image, index) => {
            if (index === 0) {
                return (
                    <div className="image_block">
                        <img src={image} className="image_block__image first" alt='image_app'/>
                    </div>
                )
            }
            return (
                <div className="image_block">
                    <hr className='horizontal_line' align="center" width="500" size="9" color="#3084C1"/>
                    <img src={image} className="image_block__image" alt='image_app'/>
                </div>
            )
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
                <section className='logo'>
                    <span className='logo_span'/>
                </section>
                <section className='description_promo'>
                    <div className='description_promo__text'>
                        Представляем Вам умное приложение для изучения Английского языка.
                    </div>
                </section>
                <section className='images_application'>
                    {images}
                </section>
            </main>
        )
    }
}

export default PromoPage;
