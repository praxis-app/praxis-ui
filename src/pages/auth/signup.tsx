import { useReactiveVar } from "@apollo/client";
import { Card, CardContent, FormGroup, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  inviteTokenVar,
  isLoggedInVar,
  isNavDrawerOpenVar,
  toastVar,
} from "../../apollo/cache";
import {
  MeDocument,
  MeQuery,
  SignUpInput,
  useServerInviteQuery,
  useSignUpMutation,
} from "../../apollo/gen";
import Flex from "../../components/Shared/Flex";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import PrimaryActionButton from "../../components/Shared/PrimaryActionButton";
import ProgressBar from "../../components/Shared/ProgressBar";
import { TextField } from "../../components/Shared/TextField";
import { NavigationPaths } from "../../constants/common.constants";
import { UserFieldNames } from "../../constants/user.constants";
import { redirectTo } from "../../utils/common.utils";

const SignUp: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isNavDrawerOpen = useReactiveVar(isNavDrawerOpenVar);
  const [signUp] = useSignUpMutation();

  const { query } = useRouter();
  const token = String(query?.code || "");
  const { loading, error } = useServerInviteQuery({
    onCompleted({ serverInvite: { token } }) {
      inviteTokenVar(token);
    },
    variables: { token },
    skip: !token,
  });

  const { t } = useTranslation();

  const initialValues: SignUpInput = {
    email: "",
    name: "",
    password: "",
    inviteToken: token,
  };

  const handleSubmit = async (input: SignUpInput) => {
    await signUp({
      variables: { input },
      update(cache, { data }) {
        if (!data?.signUp.user) {
          return;
        }
        cache.writeQuery<MeQuery>({
          data: { me: data.signUp.user },
          query: MeDocument,
        });
        isLoggedInVar(true);
      },
      onError(err) {
        toastVar({
          status: "error",
          title: err.message,
        });
      },
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      redirectTo(NavigationPaths.Home);
    }
  }, [isLoggedIn]);

  if (loading || isLoggedIn) {
    return <ProgressBar />;
  }

  if (error) {
    return <Typography>{t("invites.prompts.expiredOrInvalid")}</Typography>;
  }

  if (query?.code === undefined) {
    return <Typography>{t("invites.prompts.inviteRequired")}</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <LevelOneHeading sx={{ marginBottom: 2 }}>
          {t("users.prompts.becomeAMember")}
        </LevelOneHeading>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => (
            <Form hidden={isNavDrawerOpen}>
              <FormGroup>
                <TextField
                  label={t("users.form.email")}
                  name={UserFieldNames.Email}
                />
                <TextField
                  label={t("users.form.name")}
                  name={UserFieldNames.Name}
                />

                <TextField
                  label={t("users.form.password")}
                  name={UserFieldNames.Password}
                  type="password"
                />
              </FormGroup>

              <Flex flexEnd>
                <PrimaryActionButton
                  disabled={formik.isSubmitting || !formik.dirty}
                  type="submit"
                >
                  {t("users.actions.signUp")}
                </PrimaryActionButton>
              </Flex>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default SignUp;
