// TODO: Move text to en.json once documentation is finalized

import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import DocsPermissionList from "../../components/Docs/DocsPermissionList";
import DocsSubheading from "../../components/Docs/DocsSubheading";
import ExternalLink from "../../components/Shared/ExternalLink";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import Link from "../../components/Shared/Link";
import { NavigationPaths } from "../../constants/common.constants";
import { useIsDesktop } from "../../hooks/common.hooks";

const DocsHomePage: NextPage = () => {
  const isDesktop = useIsDesktop();

  return (
    <Box marginBottom={15} marginTop={isDesktop ? 0 : 1}>
      <LevelOneHeading header>What is Praxis?</LevelOneHeading>

      <Typography marginBottom={3}>
        Welcome to the Praxis documentation! This page will give you a brief
        overview of Praxis and how it works.
      </Typography>

      <DocsSubheading>Overview</DocsSubheading>

      <Typography marginBottom={1.5}>
        Praxis is a social networking platform with features for collaborative
        decision making.
      </Typography>

      <Typography marginBottom={1.5}>
        Unlike most social networks, Praxis is specifically designed to
        facilitate collective decision making and the building of social
        structures that make sense for the organizations and communities that
        use it.
      </Typography>

      <Typography marginBottom={3}>
        Praxis is free software released under the
        <ExternalLink
          href="https://github.com/praxis-app/praxis-ui/blob/main/LICENSE"
          leftSpace
        >
          <b>GNU General Public License v3.0</b>
        </ExternalLink>
        .
      </Typography>

      <DocsSubheading>Proposals</DocsSubheading>

      <Typography marginBottom={1.5}>
        At the core of Praxis are proposals and voting. Proposals are the basic
        unit of decision making in Praxis. Proposals can be created by any
        member of a group and can be voted on by any group member. Proposals can
        be used to make decisions about anything the group wants to decide on.
      </Typography>

      <Box paddingTop={1} paddingBottom={2} width="90%" margin="0 auto">
        <Image
          alt="Role Change Proposal"
          blurDataURL="/images/role-change-proposal.png"
          src="/images/role-change-proposal.png"
          objectFit="contain"
          layout="responsive"
          loading="lazy"
          placeholder="blur"
          width={300}
          height={190}
        />
      </Box>

      <Typography marginBottom={3}>
        Once a proposal reaches enough votes to pass, it's immediately marked as
        ratified. Depending on the proposal type, proposals will automatically
        implement themselves upon ratification. Roles and permissions changes,
        for instance, are implemented as soon as their respective proposal
        passes.
      </Typography>

      <DocsSubheading>Groups</DocsSubheading>

      <Typography marginBottom={1.5}>
        Almost everything in Praxis is scoped to
        <Link href={NavigationPaths.Groups} leftSpace>
          <b>groups</b>
        </Link>
        , including both proposals and events. Groups can be public or private,
        and can be used to organize a community, a project, or anything else.
      </Typography>

      <Typography marginBottom={3}>
        Every group has its own set of roles and permissions, as well as other
        settings that can all be configured directly by group members via
        proposals and voting, or by the groups admins. It's up to every group to
        decide the best way to organize themselves.
      </Typography>

      <DocsSubheading>Roles & Permissions</DocsSubheading>

      <Typography marginBottom={1.5}>
        Roles and permissions are a core part of Praxis. They exist at both the
        group and server level, and can be used to manage who can do what
        throughout the platform.
      </Typography>

      <Typography marginBottom={1.5}>
        Every role has a set of permissions that define what actions that role
        can perform. Roles can be assigned to users, and users can have multiple
        roles. This allows for a lot of flexibility in how groups can be
        organized, as well as how the server is structured as a whole.
      </Typography>

      <Typography marginBottom={1.5}>Server permissions:</Typography>

      <DocsPermissionList permissionType="server" />

      <Typography marginBottom={1.5}>Group permissions:</Typography>

      <DocsPermissionList permissionType="group" />

      <DocsSubheading>Work in progress</DocsSubheading>

      <Typography marginBottom={1.5}>
        Praxis is still in development and there are a lot of features that are
        still being worked on, meaning the documentation is also likely to
        change as the project is still getting off the ground. If you'd like to
        contribute or have any questions at all, feel free to reach out to us on
        <ExternalLink href="https://github.com/praxis-app" leftSpace>
          <b>GitHub</b>
        </ExternalLink>
        .
      </Typography>
    </Box>
  );
};

export default DocsHomePage;
