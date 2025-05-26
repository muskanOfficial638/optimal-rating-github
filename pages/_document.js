import Document, { Html, Head, Main, NextScript } from 'next/document';
import "../plugins";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
          {/* Default meta tags */}
          <meta property="og:type" content="website" />
          {/* <meta name="description" content="Welcome to our site" /> */}
          <meta property="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

// import Document, { Html, Head, Main, NextScript } from 'next/document';
// import "../plugins";

// class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const initialProps = await Document.getInitialProps(ctx);
//     const { query, res, resLan, details, imgUrl, detailsUrl } = ctx.query || {};
//     console.log("details",details,imgUrl,detailsUrl)
//     return { ...initialProps, details, imgUrl, detailsUrl };
//   }

//   render() {
//     const { details, imgUrl, detailsUrl } = this.props;
// console.log("HELLO++",details && details.title,imgUrl,detailsUrl)
//     return (
//       <Html>
//         <Head>
//           <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
//           {/* Global tags */}
//           <meta property="og:type" content="website" />
//           <meta name="description" content={details?.description || "Welcome to our site"} />
//           <meta property="og:title" content={details?.title || "Optimal rating"} />
//           <meta property="og:description" content={details?.description || "Welcome to our site"} />
//           <meta property="og:image" content={imgUrl || "https://server.optimalrating.com/storage/survey/in-137.png"} />
//           <meta property="og:url" content={detailsUrl || "/"} />
//           <meta property="twitter:card" content="summary_large_image" />
//           <meta property="twitter:title" content={details?.title || "Optimal rating"} />
//           <meta property="twitter:description" content={details?.description || "Welcome to our site"} />
//           <meta property="twitter:image" content={imgUrl || "https://server.optimalrating.com/storage/survey/in-137.png"} />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default MyDocument;
