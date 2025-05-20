import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, Menu } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  FacebookIcon,
  EmailIcon,
  TwitterIcon,
  XIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

const ShareFile=({ className = '', title = '', url = '', chartRef, pageUrl })=>  {
  const { t } = useTranslation();
  //const handleShare =()=>chartRef.current.handlePieDownload();
  const postUrl = 'https://example.com/your-post'; // URL of the post to be shared
  const postTitle = 'Check out this amazing post!'; // Text to accompany the tweet
  const postImage = 'https://example.com/path-to-your-image.jpg'; // URL of the image

  return (
    

    <Dropdown trigger={['click']} overlay={
      <Menu className="ShareMenu" style={{pointerEvents: 'all'}}>
        <Menu.Item key={1}>
          <EmailShareButton subject={title} body={pageUrl}>
            <EmailIcon size={20} round /> {t('lbl.email')}
          </EmailShareButton>
        </Menu.Item>
        <Menu.Item key={2}>
        <FacebookShareButton url={pageUrl} quote={title} className="Demo__some-network__share-button">
          <FacebookIcon size={20} round /> Facebook 
        </FacebookShareButton>
        </Menu.Item>
        <Menu.Item  key={3}>
        <TwitterShareButton url={pageUrl} title={title} className="Demo__some-network__share-button">
          <XIcon size={20} round /> Twitter
          {/* <TwitterIcon size={32} round /> */}
        </TwitterShareButton>
        </Menu.Item>
        <Menu.Item  key={4}>
          <LinkedinShareButton title={title} url={pageUrl}>
            <LinkedinIcon size={20} round /> LinkedIn
          </LinkedinShareButton>
        </Menu.Item>
        <Menu.Item  key={5}>
          <WhatsappShareButton title={`${title}`} url={pageUrl}>
            <WhatsappIcon size={20} round /> WhatsApp
          </WhatsappShareButton>
        </Menu.Item>
      </Menu>
    }>
      <Button className={className} icon={<ShareAltOutlined />} >
        {t('lbl.share')}
      </Button>
    </Dropdown>
  );
};
export default  ShareFile