import React from 'react';
import ResourceLinks from 'gatsby-theme-carbon/src/components/LeftNav/ResourceLinks';

const links = [
  {
    title: 'Hot Topics Archive',
    href: 'https://www-01.ibm.com/servers/resourcelink/svc00100.nsf/pages/zosHotTopics?OpenDocument',
  },
  {
    title: 'IBM Z Content Solutions',
    href: 'https://www.ibm.com/support/z-content-solutions/',
  },
  {
    title: 'IBM Documentation',
    href: 'https://www.ibm.com/docs/en',
  },
];

// shouldOpenNewTabs: true if outbound links should open in a new tab
const CustomResources = () => <ResourceLinks shouldOpenNewTabs links={links} />;

export default CustomResources;
