import { Typography } from "@mui/material";
import { NextPage } from "next";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";

const Docs: NextPage = () => (
  <>
    <LevelOneHeading header>Overview</LevelOneHeading>

    <Typography marginBottom={1.5}>
      Praxis a social networking platform with features for collaborative
      decision making.
    </Typography>

    <Typography marginBottom={1.5}>
      Unlike most social networks, Praxis is specifically designed to facilitate
      collective decision making and the building of social structures that make
      sense for the communities and organizations that use it.
    </Typography>

    <Typography marginBottom={1.5}>
      At the core of Praxis are proposals and voting. Proposals are the basic
      unit of decision making in Praxis. Proposals can be created by any member
      of a group and can be voted on by any member of that group. Proposals can
      be used to make decisions about virtually anything the group wants to
      decide on.
    </Typography>
  </>
);

export default Docs;
