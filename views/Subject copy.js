import React from 'react';
import { Spin } from 'antd';
import { useGet } from '../hooks';
import { Empty } from '../components';
import { get } from '../helpers';
import {ApiUrl} from '../config';

export default function SubjectCopy({ match })  {
  console.log("Subject copy",match)
  const { id } = match.params;
  const { data, loading } = useGet({ url: `${ApiUrl}subjectHasSurvey/${id}` });

  return (
    <Spin spinning={loading}>
      <h2>{get(data, 'result.set.title')}</h2>
      <Empty isEmpty={get(data, 'result.set.surveys', []).length === 0}>
        Subject
      </Empty>
    </Spin>
  );
};