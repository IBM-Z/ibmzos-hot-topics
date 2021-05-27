import React from 'react';
import ThemeFeedbackDialog from 'gatsby-theme-carbon/src/components/FeedbackDialog/FeedbackDialog';

function onSubmit(data) {
  if (process.env.NODE_ENV === 'development') {
    return fetch(process.env.BACKEND_URI, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

function FeedbackDialog({ props }) {
  return <ThemeFeedbackDialog {...props} onSubmit={onSubmit} />;
};

export default FeedbackDialog;
