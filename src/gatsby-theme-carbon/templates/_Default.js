import React from 'react';
import { PageHeader } from '../components/PageHeader';
import Default from 'gatsby-theme-carbon/src/templates/Default';


const customProps = {
PageHeader: <PageHeader description="test" />
}

// spreading the original props gives us props.children (mdx content)
function DefaultArticle(props) {
    return <Default {...props} {...customProps} />;
  }

  export default DefaultArticle;