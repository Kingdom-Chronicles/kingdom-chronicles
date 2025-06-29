/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const echo = /* GraphQL */ `query Echo($msg: String) {
  echo(msg: $msg)
}
` as GeneratedQuery<APITypes.EchoQueryVariables, APITypes.EchoQuery>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    email
    points
    achievements {
      nextToken
      __typename
    }
    teams {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      email
      points
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getAchievement = /* GraphQL */ `query GetAchievement($id: ID!) {
  getAchievement(id: $id) {
    id
    title
    description
    unlockedAt
    user {
      id
      username
      email
      points
      createdAt
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    userAchievementsId
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAchievementQueryVariables,
  APITypes.GetAchievementQuery
>;
export const listAchievements = /* GraphQL */ `query ListAchievements(
  $filter: ModelAchievementFilterInput
  $limit: Int
  $nextToken: String
) {
  listAchievements(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      unlockedAt
      createdAt
      updatedAt
      userAchievementsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAchievementsQueryVariables,
  APITypes.ListAchievementsQuery
>;
export const getTeam = /* GraphQL */ `query GetTeam($id: ID!) {
  getTeam(id: $id) {
    id
    name
    score
    members {
      nextToken
      __typename
    }
    games {
      nextToken
      __typename
    }
    scores {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    gameSessionTeamsId
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTeamQueryVariables, APITypes.GetTeamQuery>;
export const listTeams = /* GraphQL */ `query ListTeams(
  $filter: ModelTeamFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      score
      createdAt
      updatedAt
      gameSessionTeamsId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTeamsQueryVariables, APITypes.ListTeamsQuery>;
export const getTeamMember = /* GraphQL */ `query GetTeamMember($id: ID!) {
  getTeamMember(id: $id) {
    id
    user {
      id
      username
      email
      points
      createdAt
      updatedAt
      owner
      __typename
    }
    team {
      id
      name
      score
      createdAt
      updatedAt
      gameSessionTeamsId
      owner
      __typename
    }
    role
    createdAt
    updatedAt
    userTeamsId
    teamMembersId
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTeamMemberQueryVariables,
  APITypes.GetTeamMemberQuery
>;
export const listTeamMembers = /* GraphQL */ `query ListTeamMembers(
  $filter: ModelTeamMemberFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeamMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      role
      createdAt
      updatedAt
      userTeamsId
      teamMembersId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTeamMembersQueryVariables,
  APITypes.ListTeamMembersQuery
>;
export const getGameSession = /* GraphQL */ `query GetGameSession($id: ID!) {
  getGameSession(id: $id) {
    id
    gameType
    startTime
    endTime
    teams {
      nextToken
      __typename
    }
    scores {
      nextToken
      __typename
    }
    status
    createdAt
    updatedAt
    teamGamesId
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetGameSessionQueryVariables,
  APITypes.GetGameSessionQuery
>;
export const listGameSessions = /* GraphQL */ `query ListGameSessions(
  $filter: ModelGameSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listGameSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      gameType
      startTime
      endTime
      status
      createdAt
      updatedAt
      teamGamesId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListGameSessionsQueryVariables,
  APITypes.ListGameSessionsQuery
>;
export const getScore = /* GraphQL */ `query GetScore($id: ID!) {
  getScore(id: $id) {
    id
    team {
      id
      name
      score
      createdAt
      updatedAt
      gameSessionTeamsId
      owner
      __typename
    }
    gameSession {
      id
      gameType
      startTime
      endTime
      status
      createdAt
      updatedAt
      teamGamesId
      owner
      __typename
    }
    points
    timestamp
    createdAt
    updatedAt
    teamScoresId
    gameSessionScoresId
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetScoreQueryVariables, APITypes.GetScoreQuery>;
export const listScores = /* GraphQL */ `query ListScores(
  $filter: ModelScoreFilterInput
  $limit: Int
  $nextToken: String
) {
  listScores(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      points
      timestamp
      createdAt
      updatedAt
      teamScoresId
      gameSessionScoresId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListScoresQueryVariables,
  APITypes.ListScoresQuery
>;
export const getGameAsset = /* GraphQL */ `query GetGameAsset($id: ID!) {
  getGameAsset(id: $id) {
    id
    type
    url
    gameType
    metadata
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetGameAssetQueryVariables,
  APITypes.GetGameAssetQuery
>;
export const listGameAssets = /* GraphQL */ `query ListGameAssets(
  $filter: ModelGameAssetFilterInput
  $limit: Int
  $nextToken: String
) {
  listGameAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type
      url
      gameType
      metadata
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListGameAssetsQueryVariables,
  APITypes.ListGameAssetsQuery
>;
