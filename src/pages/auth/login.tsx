import { useReactiveVar } from "@apollo/client";
import { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import { isLoggedInVar } from "../../apollo/cache";
import LoginForm from "../../components/Auth/LoginForm";
import ProgressBar from "../../components/Shared/ProgressBar";
import { NavigationPaths } from "../../constants/common.constants";

const Login: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  useEffect(() => {
    if (isLoggedIn) {
      Router.push(NavigationPaths.Home);
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return <ProgressBar />;
  }

  return <LoginForm />;
};

export default Login;
