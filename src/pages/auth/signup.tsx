import { useReactiveVar } from "@apollo/client";
import { Card, CardContent, FormGroup, Typography } from "@mui/material";
import { Form, Formik, FormikErrors } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  inviteTokenVar,
  isLoggedInVar,
  isNavDrawerOpenVar,
  toastVar,
} from "../../apollo/cache";
import {
  IsFirstUserDocument,
  IsFirstUserQuery,
  MeDocument,
  MeQuery,
  SignUpInput,
  useIsFirstUserQuery,
  useServerInviteQuery,
  useSignUpMutation,
} from "../../apollo/gen";
import AttachedImagePreview from "../../components/Images/AttachedImagePreview";
import ImageInput from "../../components/Images/ImageInput";
import Flex from "../../components/Shared/Flex";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import PrimaryActionButton from "../../components/Shared/PrimaryActionButton";
import ProgressBar from "../../components/Shared/ProgressBar";
import { TextField } from "../../components/Shared/TextField";
import { NavigationPaths } from "../../constants/common.constants";
import { INVITE_TOKEN } from "../../constants/server-invite.constants";
import { UserFieldNames } from "../../constants/user.constants";
import {
  getRandomString,
  redirectTo,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/common.utils";

const SignUp: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isNavDrawerOpen = useReactiveVar(isNavDrawerOpenVar);

  const [profilePicture, setProfilePicture] = useState<File>();
  const [imageInputKey, setImageInputKey] = useState("");

  const [signUp] = useSignUpMutation();

  const { query } = useRouter();
  const token = String(query?.token || "");
  const { loading: serverInviteLoading, error: serverInviteError } =
    useServerInviteQuery({
      onCompleted({ serverInvite }) {
        inviteTokenVar(serverInvite.token);
        setLocalStorageItem(INVITE_TOKEN, serverInvite.token);
      },
      variables: { token },
      skip: isLoggedIn || !token,
    });

  const {
    data,
    loading: userCountLoading,
    error: userCountError,
  } = useIsFirstUserQuery({ skip: isLoggedIn });

  const { t } = useTranslation();

  const initialValues: SignUpInput = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    inviteToken: token,
  };

  const validateSignUp = ({
    name,
    email,
    password,
    confirmPassword,
  }: SignUpInput) => {
    const errors: FormikErrors<SignUpInput> = {};
    if (!name) {
      errors.name = t("signUp.errors.missingName");
    }
    if (!email) {
      errors.email = t("signUp.errors.missingEmail");
    }
    if (!password) {
      errors.password = t("signUp.errors.missingPassword");
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = t("signUp.errors.confirmPassword");
    }
    return errors;
  };

  const handleSubmit = async (formValues: SignUpInput) => {
    await signUp({
      variables: {
        input: {
          ...formValues,
          profilePicture,
        },
      },
      update(cache, { data }) {
        if (!data?.signUp.user) {
          return;
        }
        cache.writeQuery<MeQuery>({
          data: { me: data.signUp.user },
          query: MeDocument,
        });
        cache.writeQuery<IsFirstUserQuery>({
          data: { isFirstUser: false },
          query: IsFirstUserDocument,
        });
      },
      onCompleted() {
        inviteTokenVar("");
        isLoggedInVar(true);
        setImageInputKey(getRandomString());
        removeLocalStorageItem(INVITE_TOKEN);
      },
      onError(err) {
        toastVar({
          status: "error",
          title: err.message,
        });
      },
    });
  };

  const handleRemoveSelectedImage = () => {
    setProfilePicture(undefined);
    setImageInputKey(getRandomString());
  };

  useEffect(() => {
    if (isLoggedIn) {
      redirectTo(NavigationPaths.Home);
    }
  }, [isLoggedIn]);

  if (serverInviteError) {
    return <Typography>{t("invites.prompts.expiredOrInvalid")}</Typography>;
  }
  if (userCountError) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }
  if (serverInviteLoading || userCountLoading || isLoggedIn) {
    return <ProgressBar />;
  }
  if (!token && !data?.isFirstUser) {
    return <Typography>{t("invites.prompts.inviteRequired")}</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <LevelOneHeading sx={{ marginBottom: 2 }}>
          {t("users.prompts.becomeAMember")}
        </LevelOneHeading>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validateSignUp}
        >
          {({ isSubmitting, dirty }) => (
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
                <TextField
                  label={t("users.form.confirmPassword")}
                  name={UserFieldNames.ConfirmPassword}
                  type="password"
                />
                {profilePicture && (
                  <AttachedImagePreview
                    handleRemove={handleRemoveSelectedImage}
                    selectedImages={[profilePicture]}
                  />
                )}
              </FormGroup>

              <Flex sx={{ justifyContent: "space-between" }}>
                <ImageInput
                  refreshKey={imageInputKey}
                  setImage={setProfilePicture}
                />

                <PrimaryActionButton
                  disabled={isSubmitting || !dirty}
                  sx={{ marginTop: 1.85 }}
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
