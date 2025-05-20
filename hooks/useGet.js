import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions/global";

const UseGet = ({
  url = "",
  key = "",
  params = null,
  options = null,
  singleLoad = false,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const stateData = useSelector((state) => key && state.global[key] || null) ;

  const getData = useCallback(async () => {
    if (
      !singleLoad ||
      (singleLoad && key && !stateData.loading && !stateData.data)
    ) {
      try {
        !key && setLoading(true);
        const response = await dispatch(
          actions.getData({ url, key, params, options })
        );
        !key && setLoading(false);
        !key && setData(response);
      } catch (error) {
        !key && setLoading(false);
        !key && setError(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, key, params, options, singleLoad, dispatch]);

  const refresh = () => {
    getData();
  };

  useEffect(() => {
    if (url) getData();
  }, [url, getData]);

  return stateData
    ? { ...stateData, refresh }
    : { data, loading, error, refresh };
};
export default  UseGet