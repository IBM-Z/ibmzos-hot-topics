import React from 'react';
import Footer from 'gatsby-theme-carbon/src/components/Footer';
import { Rss16 } from '@carbon/icons-react';

const Content = ({ buildTime }) => (
  <>
  <p><strong>Follow Hot Topics</strong> to be the first to hear about new articles and updates.</p>
  <p><a href="/about/#how-to-subscribe">Subscribe to our RSS Feed <Rss16 /></a></p>
  <p>Last updated on {buildTime}</p>
  </>
);

const links = {
  firstCol: [
    { href: 'https://www.ibm.com/contact/us/en/?lnk=flg-cont-usen', linkText: 'Contact IBM' },
    { href: 'https://www.ibm.com/privacy/us/en/?lnk=flg-priv-usen', linkText: 'Privacy' },
    { href: 'https://www.ibm.com/us-en/legal?lnk=flg-tous-usen', linkText: 'Terms of use' },
    { href: 'https://www.ibm.com/accessibility/us/en/?lnk=flg-acce-usen', linkText: 'Accessibility' }
  ],
  secondCol: [],
};

const CustomFooter = () => <Footer links={links} Content={Content} />;

export default CustomFooter;