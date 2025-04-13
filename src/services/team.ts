import { sanityClient } from "sanity:client";

import type { Team, TeamRole } from "~/sanity/sanity.types";

export type FetchedTeam = Omit<Team, "role"> & {
  role?: TeamRole[];
};

export async function getTeamMembers(): Promise<FetchedTeam[]> {
  const query = `*[_type == "team"]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    fristName,
    lastName,
    "role": role[]->{
      _id,
      title,
      description
    },
    image
  }`;

  const team: FetchedTeam[] = await sanityClient.fetch(query);
  return team;
}

export async function getTeamMemberById(id: string): Promise<Team | null> {
  const query = `*[_type == "team" && _id == $id][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    fristName,
    lastName,
    "role": role[]->{
      _id,
      title,
      description
    },
    image
  }`;

  const teamMember = await sanityClient.fetch(query, { id });
  return teamMember;
}
