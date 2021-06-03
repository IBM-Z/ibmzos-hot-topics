import React from "react";
import PropTypes from "prop-types";
//import cx from 'classnames';
import { bylineText, hr } from "./Byline.module.scss";
import Moment from 'moment';

const Byline = ({ author, date, readTime }) => (
  <section className="byline">
    <p className={bylineText}>By: {author}</p>
    <p className={bylineText}>Published: {Moment.utc(date).format("MMMM Do, YYYY")}</p>
    <p className={bylineText}>Read time: {readTime}</p>
    <hr />
  </section>
);

Byline.propTypes = {
  /**
   * Specify the title for the page
   */
  author: PropTypes.node,
  date: PropTypes.node,
  readTime: PropTypes.node,
};

export default Byline;
