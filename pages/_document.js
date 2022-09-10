import Document, {Html, Head, Main, NextScript} from 'next/document';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

class MyDocument extends Document {

    setGoogleTags() {
        if(publicRuntimeConfig.PRODUCTION) {
            return {
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                
                    gtag('config', 'G-Z3580V4RD3');
                `
            }
        }
    }

    render() {
        return (
            <Html lang='fr'>
                <Head>
                <meta charSet="UTF-8" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.css" />
                <link rel="shortcut icon" href="https://res.cloudinary.com/basebiblique/image/upload/v1660038236/logo_sqxb10.png" />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/4.0.0/mdb.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/4.0.0/mdb.min.js"></script> 
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z3580V4RD3"></script>
                <script dangerouslySetInnerHTML={this.setGoogleTags()}></script>
                </ Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;