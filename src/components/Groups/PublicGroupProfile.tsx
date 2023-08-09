import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePublicGroupProfileQuery } from "../../apollo/gen";
import GroupEventsTab from "../../components/Groups/GroupEventsTab";
import GroupProfileCard from "../../components/Groups/GroupProfileCard";
import Feed from "../../components/Shared/Feed";
import ProgressBar from "../../components/Shared/ProgressBar";

interface Props {
  name: string;
}

const PublicGroupProfile = ({ name }: Props) => {
  const [tab, setTab] = useState(0);
  const { data, loading, error } = usePublicGroupProfileQuery({
    variables: { name },
    errorPolicy: "all",
    skip: !name,
  });

  const { t } = useTranslation();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }
  if (loading) {
    return <ProgressBar />;
  }
  if (!data) {
    return null;
  }
  const { publicGroup } = data;

  return (
    <>
      <GroupProfileCard group={publicGroup} setTab={setTab} tab={tab} />

      {tab === 0 && <Feed feed={publicGroup.feed} />}
      {tab === 1 && <GroupEventsTab groupId={publicGroup.id} />}
      {tab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t("groups.tabs.about")}
            </Typography>

            <Typography>{publicGroup.description}</Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default PublicGroupProfile;
