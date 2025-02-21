/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateAchievement = /* GraphQL */ `subscription OnCreateAchievement(
  $filter: ModelSubscriptionAchievementFilterInput
  $owner: String
) {
  onCreateAchievement(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAchievementSubscriptionVariables,
  APITypes.OnCreateAchievementSubscription
>;
export const onUpdateAchievement = /* GraphQL */ `subscription OnUpdateAchievement(
  $filter: ModelSubscriptionAchievementFilterInput
  $owner: String
) {
  onUpdateAchievement(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAchievementSubscriptionVariables,
  APITypes.OnUpdateAchievementSubscription
>;
export const onDeleteAchievement = /* GraphQL */ `subscription OnDeleteAchievement(
  $filter: ModelSubscriptionAchievementFilterInput
  $owner: String
) {
  onDeleteAchievement(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAchievementSubscriptionVariables,
  APITypes.OnDeleteAchievementSubscription
>;
export const onCreateTeam = /* GraphQL */ `subscription OnCreateTeam(
  $filter: ModelSubscriptionTeamFilterInput
  $owner: String
) {
  onCreateTeam(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTeamSubscriptionVariables,
  APITypes.OnCreateTeamSubscription
>;
export const onUpdateTeam = /* GraphQL */ `subscription OnUpdateTeam(
  $filter: ModelSubscriptionTeamFilterInput
  $owner: String
) {
  onUpdateTeam(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTeamSubscriptionVariables,
  APITypes.OnUpdateTeamSubscription
>;
export const onDeleteTeam = /* GraphQL */ `subscription OnDeleteTeam(
  $filter: ModelSubscriptionTeamFilterInput
  $owner: String
) {
  onDeleteTeam(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTeamSubscriptionVariables,
  APITypes.OnDeleteTeamSubscription
>;
export const onCreateTeamMember = /* GraphQL */ `subscription OnCreateTeamMember(
  $filter: ModelSubscriptionTeamMemberFilterInput
  $owner: String
) {
  onCreateTeamMember(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTeamMemberSubscriptionVariables,
  APITypes.OnCreateTeamMemberSubscription
>;
export const onUpdateTeamMember = /* GraphQL */ `subscription OnUpdateTeamMember(
  $filter: ModelSubscriptionTeamMemberFilterInput
  $owner: String
) {
  onUpdateTeamMember(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTeamMemberSubscriptionVariables,
  APITypes.OnUpdateTeamMemberSubscription
>;
export const onDeleteTeamMember = /* GraphQL */ `subscription OnDeleteTeamMember(
  $filter: ModelSubscriptionTeamMemberFilterInput
  $owner: String
) {
  onDeleteTeamMember(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTeamMemberSubscriptionVariables,
  APITypes.OnDeleteTeamMemberSubscription
>;
export const onCreateGameSession = /* GraphQL */ `subscription OnCreateGameSession(
  $filter: ModelSubscriptionGameSessionFilterInput
  $owner: String
) {
  onCreateGameSession(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateGameSessionSubscriptionVariables,
  APITypes.OnCreateGameSessionSubscription
>;
export const onUpdateGameSession = /* GraphQL */ `subscription OnUpdateGameSession(
  $filter: ModelSubscriptionGameSessionFilterInput
  $owner: String
) {
  onUpdateGameSession(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateGameSessionSubscriptionVariables,
  APITypes.OnUpdateGameSessionSubscription
>;
export const onDeleteGameSession = /* GraphQL */ `subscription OnDeleteGameSession(
  $filter: ModelSubscriptionGameSessionFilterInput
  $owner: String
) {
  onDeleteGameSession(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteGameSessionSubscriptionVariables,
  APITypes.OnDeleteGameSessionSubscription
>;
export const onCreateScore = /* GraphQL */ `subscription OnCreateScore(
  $filter: ModelSubscriptionScoreFilterInput
  $owner: String
) {
  onCreateScore(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateScoreSubscriptionVariables,
  APITypes.OnCreateScoreSubscription
>;
export const onUpdateScore = /* GraphQL */ `subscription OnUpdateScore(
  $filter: ModelSubscriptionScoreFilterInput
  $owner: String
) {
  onUpdateScore(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateScoreSubscriptionVariables,
  APITypes.OnUpdateScoreSubscription
>;
export const onDeleteScore = /* GraphQL */ `subscription OnDeleteScore(
  $filter: ModelSubscriptionScoreFilterInput
  $owner: String
) {
  onDeleteScore(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteScoreSubscriptionVariables,
  APITypes.OnDeleteScoreSubscription
>;
export const onCreateGameAsset = /* GraphQL */ `subscription OnCreateGameAsset(
  $filter: ModelSubscriptionGameAssetFilterInput
  $owner: String
) {
  onCreateGameAsset(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateGameAssetSubscriptionVariables,
  APITypes.OnCreateGameAssetSubscription
>;
export const onUpdateGameAsset = /* GraphQL */ `subscription OnUpdateGameAsset(
  $filter: ModelSubscriptionGameAssetFilterInput
  $owner: String
) {
  onUpdateGameAsset(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateGameAssetSubscriptionVariables,
  APITypes.OnUpdateGameAssetSubscription
>;
export const onDeleteGameAsset = /* GraphQL */ `subscription OnDeleteGameAsset(
  $filter: ModelSubscriptionGameAssetFilterInput
  $owner: String
) {
  onDeleteGameAsset(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteGameAssetSubscriptionVariables,
  APITypes.OnDeleteGameAssetSubscription
>;
