import { Typography } from "@mui/material";
import { NextPage } from "next";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";

const Docs: NextPage = () => (
  <>
    <LevelOneHeading header>What is Praxis?</LevelOneHeading>

    <Typography marginBottom={3}>
      Welcome to the Praxis documentation! This page will give you a brief
      overview of Praxis and how to use it.
    </Typography>

    <Typography variant="h5" marginBottom={1.5}>
      Overview
    </Typography>

    <Typography marginBottom={1.5}>
      Praxis a social networking platform with features for collaborative
      decision making.
    </Typography>

    <Typography marginBottom={3}>
      Unlike most social networks, Praxis is specifically designed to facilitate
      collective decision making and the building of social structures that make
      sense for the communities and organizations that use it.
    </Typography>

    <Typography variant="h5" marginBottom={1.5}>
      Proposals
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
