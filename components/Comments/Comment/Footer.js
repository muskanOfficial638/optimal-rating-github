import React,{useState} from 'react';
import * as moment from 'moment';
import { Button, Divider, notification } from 'antd';
import { MessageOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';
import CommentMenu from './CommentMenu';
import { useSelector } from 'react-redux';
import { postData } from '../../../store/requests/global';
import { Permission } from '../../../components';
import {ApiUrl} from '../../../config';

export default function Footer ({ data, isSub, answerVisible, setAnswerVisible, commentVisible, setCommentVisible, setEdit, onEdit, onDelete, t }) {
  const account = useSelector(state => state.auth.account);
  const [likeIndex, setLikeIndex] = useState(account ? data && data.likes && (data.likes.length == '' || data.likes.length > 0) && data.likes.findIndex(x => x.user_id === account.id) : undefined);
  // console.log('Like Length : ' +JSON.stringify(data.likes.length));
  // console.log('Account Data: ' +JSON.stringify(account));
  // console.log('CHeck Comment ID: ' +JSON.stringify(data.likes));
  const isOwn = account ? data && data.user_id === account.id : false;
  // data.likes.findIndex(x => {
  //   console.log('User ID: ' + x.user_id);
  //   console.log('Account ID: ' + account.id);
  // })
  // data.likes.findIndex(x => {
  //   console.log(data.likes.findIndex(x => x.user_id === account.id));
  // })
  const getTime = () => {
    let difference = new Date().getTimezoneOffset() / -60;
    let date = moment(data.updated_at).add(difference, "hours");
    var currentCountry =typeof window !== 'undefined' ?  localStorage.getItem('country'):null;
    /* switch (currentCountry) {
      case 'tr':
        return date.locale(currentCountry).fromNow();
      case 'fr':
        return date.locale(currentCountry).fromNow();
        case 'ru':
        return date.locale(currentCountry).fromNow();
      default:
        return date.locale('en').fromNow();
    } */
    return date.locale(currentCountry).fromNow();
  };

  const onLike = () => {
    let comment = { ...data };
    let getLikeIndex = account ? data && data.likes && (data.likes.length == '' || data.likes.length > 0) && data.likes.findIndex(x => x.user_id === account.id) : undefined;
  //     data.likes.findIndex(x => {
  //   console.log('User ID: ' + x.user_id);
  //   console.log('Account ID: ' + account.id);
  // })
  // data.likes.findIndex(x => {
  //   console.log(data.likes.findIndex(x => x.user_id === account.id));
  // })
  //   console.log('Like Index On Like: ' + likeIndex);
  //   console.log('Get Like Index On Like: ' + getLikeIndex);
    if (getLikeIndex !== -1){
      // console.log('if part');
      comment.likes.splice(getLikeIndex, 1);
      setLikeIndex(-1);
    }
    else {
      // console.log('else part');
      comment.likes.push({ user_id: account.id });
      setLikeIndex(1);
    }
    // onEdit(comment);
    postData({ url: `${ApiUrl}likes`, data: { comment_id: data.id } }).then((response) => {
      response.message === 'msg.info.like.created' ?
      notification.success({ message: t('msg.success_comment_like') }) :
      notification.success({ message: t('msg.success_comment_dislike') });
    }).catch((err) => {
      if (err.message === 'msg.error_unauthorized_country') {
        notification.error({ message: t('msg.error_unauthorized_country') });
      } else {
        notification.error({ message: t('msg.error_comment_like') });
      }
    });
  };

  return (
    <div className="CommentFooter">
      {getTime()}
      <Divider type="vertical" />
      <Permission showChild>
      {account ? (
          <>
        <Button size="small" type="link" icon={data.likes.findIndex(x => x.user_id === account.id) !== -1 ? <LikeFilled /> : <LikeOutlined />} onClick={onLike}>
          {t('lbl.like')}
          {data && data.likes && data.likes.length > 0 &&
            ` (${data.likes.length})`
          }
        </Button>
        </>
        ) : (
          <>
         <Button size="small" type="link" icon={likeIndex > -1 ? <LikeFilled /> : <LikeOutlined />} onClick={onLike}>
         {t('lbl.like')}
         {data && data.likes && data.likes.length > 0 &&
           ` (${data.likes.length})`
         }
       </Button>         
       </>
        )}
      </Permission>
      {!isSub &&
        <>
          <Divider type="vertical" />
          <Permission showChild>
            <Button size="small" type="link" icon={<MessageOutlined />} onClick={() => setAnswerVisible(!answerVisible)}>
              {t('lbl.answer')}
            </Button>
          </Permission>
          {data.comments.length > 0 &&
            <>
              <Divider type="vertical" />
              <Button size="small" type="link" icon={<MessageOutlined />} onClick={() => setCommentVisible(!commentVisible)}>
                {t(`lbl.${commentVisible ? 'hide' : 'show'}_comments`)} ({data.comments.length})
            </Button>
            </>
          }
        </>
      }
      {isOwn &&
        <CommentMenu t={t} onDelete={onDelete} setEdit={setEdit} id={data.id} />
      }
    </div>
  );
};