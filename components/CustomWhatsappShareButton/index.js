import React from 'react';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';

const CustomWhatsappShareButton = ({ url, title, image }) => {
  // Form the message with the image URL
  const message = `${title}\n\n${image}\n\n${url}`;

  return (
    <WhatsappShareButton
      url={url}
      title={title}
      separator=":: "
    >
      <WhatsappIcon size={32} round />
    </WhatsappShareButton>
  );
};

export default CustomWhatsappShareButton;