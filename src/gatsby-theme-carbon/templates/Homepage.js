import React from 'react';
import { HomepageBanner, HomepageCallout } from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/templates/Homepage';
import { calloutLink } from './Homepage.module.scss';

import Homepage from '../../images/homepage.png';


const FirstLeftText = () => <p>Follow Hot Topics</p>;

const FirstRightText = () => (
  <p>
   Be the first to hear from the people who know.
    <a
      className={calloutLink}
      href="/about/#how-to-subscribe">
      Subscribe to our RSS feed now →
    </a>
  </p>
);

const SecondLeftText = () => <p>IBM Z and LinuxONE Content Solutions</p>;

const SecondRightText = () => (
  <p>
    Find all the technical resources in one place.
    <a
      className={calloutLink}
      href="https://www.ibm.com/support/z-content-solutions/">
      Learn more →
    </a>
  </p>
);

const BannerText = () => <h1>IBM Z Hot Topics</h1>;

const customProps = {
  Banner: <HomepageBanner renderText={BannerText} image={Homepage} />,
  FirstCallout: (
    <HomepageCallout
      backgroundColor="#030303"
      color="white"
      leftText={FirstLeftText}
      rightText={FirstRightText}
    />
  ),
  SecondCallout: (
    <HomepageCallout
      leftText={SecondLeftText}
      rightText={SecondRightText}
      color="white"
      backgroundColor="#525252"
    />
  ),
};

// spreading the original props gives us props.children (mdx content)
function ShadowedHomepage(props) {
  return <HomepageTemplate {...props} {...customProps} />;
}

export default ShadowedHomepage;
