import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import DocsSubheading from "../../components/Docs/DocsSubheading";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";

const Docs: NextPage = () => (
  <Box marginBottom={15}>
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
      of a group and can be voted on by any group member. Proposals can be used
      to make decisions about anything the group wants to decide on.
    </Typography>

    <Typography marginBottom={3}>
      Once a proposal reaches enough votes to pass, its immediately marked as
      ratified. Depending on the proposal type, proposals will automatically
      implement themselves upon ratification. Roles and permissions changes, for
      instance, are implemented as soon as their respective proposal passes.
    </Typography>

    <DocsSubheading>Groups</DocsSubheading>

    <Typography marginBottom={1.5}>
      Almost everything in Praxis is scoped to groups, including both proposals
      and events. Groups can be public or private, and can be used to organize a
      community, a project, or anything else.
    </Typography>

    <Typography marginBottom={1.5}>
      Every group has its own set of roles and permissions, as well as other
      settings that can all be configured directly by group members via
      proposals and voting, or by the groups admins. Its up to every group to
      decide the best way to organize themselves.
    </Typography>
  </Box>
);

export default Docs;
