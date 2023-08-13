import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import DocsSubheading from "../../components/Docs/DocsSubheading";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";

const Docs: NextPage = () => (
  <Box marginBottom={10}>
    <LevelOneHeading header>What is Praxis?</LevelOneHeading>

    <Typography marginBottom={3}>
      Welcome to the Praxis documentation! This page will give you a brief
      overview of Praxis and how to use it.
    </Typography>

    <DocsSubheading>Overview</DocsSubheading>

    <Typography marginBottom={1.5}>
      Praxis is a social networking platform with features for collaborative
      decision making.
    </Typography>

    <Typography marginBottom={3}>
      Unlike most social networks, Praxis is specifically designed to facilitate
      collective decision making and the building of social structures that make
      sense for the communities and organizations that use it.
    </Typography>

    <DocsSubheading>Proposals</DocsSubheading>

    <Typography marginBottom={1.5}>
      At the core of Praxis are proposals and voting. Proposals are the basic
      unit of decision making in Praxis. Proposals can be created by any member
      of a group and can be voted on by any member of that group. Proposals can
      be used to make decisions about virtually anything the group wants to
      decide on.
    </Typography>

    <Typography marginBottom={1.5}>
      Once a proposal reaches enough votes to pass, it’s immediately marked as
      ratified. Depending on the proposal type, proposals will automatically
      implement themselves upon ratification. For example, roles and permissions
      changes are implemented as soon as their respective proposal passes.
    </Typography>
  </Box>
);

export default Docs;
