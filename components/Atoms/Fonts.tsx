import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: "Mark Pro";
        font-style: normal;
        font-weight: normal;
        src: local("MarkPro"), url("/fonts/MarkPro/MarkPro.otf") format("opentype");
        font-display: swap;
      }

      @font-face {
        font-family: "Mark Pro";
        font-style: normal;
        font-weight: 700;
        src: local("MarkPro-Bold"), url("/fonts/MarkPro/MarkPro-Bold.otf") format("opentype");
        font-display: swap;
      }

      @font-face {
        font-family: "Mark Pro";
        font-style: normal;
        font-weight: 350;
        src: local("MarkPro-Book"), url("/fonts/MarkPro/MarkPro-Book.otf") format("opentype");
        font-display: swap;
      }

      @font-face {
        font-family: "Mark Pro";
        font-style: normal;
        font-weight: 300;
        src: local("MarkPro-Light"), url("/fonts/MarkPro/MarkPro-Light.otf") format("opentype");
        font-display: swap;
      }

      @font-face {
        font-family: "Mark Pro";
        font-style: normal;
        font-weight: 500;
        src: local("MarkPro-Medium"), url("/fonts/MarkPro/MarkPro-Medium.otf") format("opentype");
        font-display: swap;
      }
    `}
  />
);

export default Fonts;
