/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createAchievement = /* GraphQL */ `mutation CreateAchievement(
  $input: CreateAchievementInput!
  $condition: ModelAchievementConditionInput
) {
  createAchievement(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateAchievementMutationVariables,
  APITypes.CreateAchievementMutation
>;
export const updateAchievement = /* GraphQL */ `mutation UpdateAchievement(
  $input: UpdateAchievementInput!
  $condition: ModelAchievementConditionInput
) {
  updateAchievement(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateAchievementMutationVariables,
  APITypes.UpdateAchievementMutation
>;
export const deleteAchievement = /* GraphQL */ `mutation DeleteAchievement(
  $input: DeleteAchievementInput!
  $condition: ModelAchievementConditionInput
) {
  deleteAchievement(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteAchievementMutationVariables,
  APITypes.DeleteAchievementMutation
>;
export const createTeam = /* GraphQL */ `mutation CreateTeam(
  $input: CreateTeamInput!
  $condition: ModelTeamConditionInput
) {
  createTeam(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTeamMutationVariables,
  APITypes.CreateTeamMutation
>;
export const updateTeam = /* GraphQL */ `mutation UpdateTeam(
  $input: UpdateTeamInput!
  $condition: ModelTeamConditionInput
) {
  updateTeam(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTeamMutationVariables,
  APITypes.UpdateTeamMutation
>;
export const deleteTeam = /* GraphQL */ `mutation DeleteTeam(
  $input: DeleteTeamInput!
  $condition: ModelTeamConditionInput
) {
  deleteTeam(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTeamMutationVariables,
  APITypes.DeleteTeamMutation
>;
export const createTeamMember = /* GraphQL */ `mutation CreateTeamMember(
  $input: CreateTeamMemberInput!
  $condition: ModelTeamMemberConditionInput
) {
  createTeamMember(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTeamMemberMutationVariables,
  APITypes.CreateTeamMemberMutation
>;
export const updateTeamMember = /* GraphQL */ `mutation UpdateTeamMember(
  $input: UpdateTeamMemberInput!
  $condition: ModelTeamMemberConditionInput
) {
  updateTeamMember(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTeamMemberMutationVariables,
  APITypes.UpdateTeamMemberMutation
>;
export const deleteTeamMember = /* GraphQL */ `mutation DeleteTeamMember(
  $input: DeleteTeamMemberInput!
  $condition: ModelTeamMemberConditionInput
) {
  deleteTeamMember(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTeamMemberMutationVariables,
  APITypes.DeleteTeamMemberMutation
>;
export const createGameSession = /* GraphQL */ `mutation CreateGameSession(
  $input: CreateGameSessionInput!
  $condition: ModelGameSessionConditionInput
) {
  createGameSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateGameSessionMutationVariables,
  APITypes.CreateGameSessionMutation
>;
export const updateGameSession = /* GraphQL */ `mutation UpdateGameSession(
  $input: UpdateGameSessionInput!
  $condition: ModelGameSessionConditionInput
) {
  updateGameSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateGameSessionMutationVariables,
  APITypes.UpdateGameSessionMutation
>;
export const deleteGameSession = /* GraphQL */ `mutation DeleteGameSession(
  $input: DeleteGameSessionInput!
  $condition: ModelGameSessionConditionInput
) {
  deleteGameSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteGameSessionMutationVariables,
  APITypes.DeleteGameSessionMutation
>;
export const createScore = /* GraphQL */ `mutation CreateScore(
  $input: CreateScoreInput!
  $condition: ModelScoreConditionInput
) {
  createScore(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateScoreMutationVariables,
  APITypes.CreateScoreMutation
>;
export const updateScore = /* GraphQL */ `mutation UpdateScore(
  $input: UpdateScoreInput!
  $condition: ModelScoreConditionInput
) {
  updateScore(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateScoreMutationVariables,
  APITypes.UpdateScoreMutation
>;
export const deleteScore = /* GraphQL */ `mutation DeleteScore(
  $input: DeleteScoreInput!
  $condition: ModelScoreConditionInput
) {
  deleteScore(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteScoreMutationVariables,
  APITypes.DeleteScoreMutation
>;
export const createGameAsset = /* GraphQL */ `mutation CreateGameAsset(
  $input: CreateGameAssetInput!
  $condition: ModelGameAssetConditionInput
) {
  createGameAsset(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateGameAssetMutationVariables,
  APITypes.CreateGameAssetMutation
>;
export const updateGameAsset = /* GraphQL */ `mutation UpdateGameAsset(
  $input: UpdateGameAssetInput!
  $condition: ModelGameAssetConditionInput
) {
  updateGameAsset(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateGameAssetMutationVariables,
  APITypes.UpdateGameAssetMutation
>;
export const deleteGameAsset = /* GraphQL */ `mutation DeleteGameAsset(
  $input: DeleteGameAssetInput!
  $condition: ModelGameAssetConditionInput
) {
  deleteGameAsset(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteGameAssetMutationVariables,
  APITypes.DeleteGameAssetMutation
>;
