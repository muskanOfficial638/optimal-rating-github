import { useRouter } from 'next/router'
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import actions from "../store/actions/auth";
import { countryCode } from "../helpers";

export default function UserAccount() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useRouter();

  useEffect(() => {
    const getAccount = async () => {
      try {
        await dispatch(actions.getAccount());
        setLoading(true);
      } catch (error) {
        history.push(`/${countryCode()}/auth/login`);
      }
    };

    getAccount();
  });

  return loading;
}
