import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import {
  pageHeader,
  pageHeaderBg,
  withTabs,
  pageHeaderInfo,
  articleTitle,
  articleSubtitle,
} from "./PageHeader.module.scss";

const PageHeader = ({ title, tabs = [], description, bgImg }) => (
  <div className={cx(pageHeader, { [withTabs]: tabs.length })}>
    <div className={pageHeaderBg} style={{ backgroundImage: `url(${bgImg})` }}></div>
    <div className={cx(pageHeaderInfo, "bx--grid")}>
      <div className="bx--row">
        <div className="bx--col-lg-8">
          <h1 id="page-title" className={articleTitle}>
            {title}
          </h1>
          <h2 className={articleSubtitle}>{description}</h2>
        </div>
      </div>
    </div>
  </div>
);

PageHeader.propTypes = {
  /**
   * Specify the title for the page
   */
  title: PropTypes.node,
  description: PropTypes.node,
  bgImg: PropTypes.string,
};

export default PageHeader;
