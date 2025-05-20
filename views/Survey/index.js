import React, { useState } from "react";
// import { Switch, Route } from 'react-router-dom';
import { Spin } from "antd";
import { useGet } from "../../hooks";
import { countryCode } from "../../helpers";
import {ApiUrl} from '../../config';

export default function Create({ match, route }) {
  const { id } = match.params;
  const [url, setUrl] = useState(`?`);
  const [params, setParams] = useState(null);
  const { data, loading, refresh } = useGet({
    url: `${ApiUrl}surveys/detail/${id}${url}`,
  });

  return (
    <div className="Survey">
      <Spin spinning={loading}>
        {/*<Switch>
					{route.routes.map((x) => (
						<Route
							exact
							key={x.path}
							path={x.path}
							render={(props) => (
								<x.component
									{...props}
									data={data}
									onRefresh={refresh}
									setUrl={setUrl}
									url={url}
								/>
							)}
						/>
					))}
							</Switch>*/}
      </Spin>
    </div>
  );
}
