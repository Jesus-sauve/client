import "../node_modules/noty/lib/noty.css";  
import "../node_modules/noty/lib/themes/mint.css";
import "../node_modules/noty/lib/themes/bootstrap-v4.css";
import Noty from 'noty';
import 'antd/dist/antd.css';
import '../public/css/new-style.css';
import '../public/css/styles.css';
import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    WhatsappShareButton,
    InstapaperShareButton,
    InstapaperIcon,
    TelegramShareButton,
    TelegramIcon,
    EmailIcon,
    EmailShareButton
  } from "react-share";
import Script from 'next/script';
import NextProgress from "next-progress";
import { Provider } from "../context";

function MyApp ({ Component, pageProps }) {
    return (
        <Provider>
            <NextProgress delay={300} options={{ showSpinner: false }} />
            <Component { ...pageProps } />
            <div className="popup">
            <div className='bouton-social'>
            <FacebookShareButton url={"https://basebiblique.org"}>
                <FacebookIcon size={40}/>
            </FacebookShareButton>

            <FacebookMessengerShareButton url={"https://basebiblique.org"}>
                <FacebookMessengerIcon size={40} />
            </FacebookMessengerShareButton>

            <WhatsappShareButton url={"https://basebiblique.org"}>
                <WhatsappIcon size={40} />
            </WhatsappShareButton>

            <InstapaperShareButton url={"https://basebiblique.org"}>
                <InstapaperIcon size={40} />
            </InstapaperShareButton>

            <TelegramShareButton url={"https://basebiblique.org"}>
                <TelegramIcon size={40} />
            </TelegramShareButton>

            <EmailShareButton url={"https://basebiblique.org"}>
                <EmailIcon size={40} />
            </EmailShareButton>
            <div className="bouton_shard">
                <i className="fa-solid fa-share-nodes"></i>
            </div>
            </div>

            </div>
            <Script src="/js/script.js" strategy="lazyOnload"></Script>
        </Provider>

    )
}

export default MyApp;


