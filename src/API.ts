/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email: string,
  points: number,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  points?: ModelIntInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  email: string,
  points: number,
  achievements?: ModelAchievementConnection | null,
  teams?: ModelTeamMemberConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelAchievementConnection = {
  __typename: "ModelAchievementConnection",
  items:  Array<Achievement | null >,
  nextToken?: string | null,
};

export type Achievement = {
  __typename: "Achievement",
  id: string,
  title: string,
  description: string,
  unlockedAt?: string | null,
  user?: User | null,
  createdAt: string,
  updatedAt: string,
  userAchievementsId?: string | null,
  owner?: string | null,
};

export type ModelTeamMemberConnection = {
  __typename: "ModelTeamMemberConnection",
  items:  Array<TeamMember | null >,
  nextToken?: string | null,
};

export type TeamMember = {
  __typename: "TeamMember",
  id: string,
  user?: User | null,
  team?: Team | null,
  role: string,
  createdAt: string,
  updatedAt: string,
  userTeamsId?: string | null,
  teamMembersId?: string | null,
  owner?: string | null,
};

export type Team = {
  __typename: "Team",
  id: string,
  name: string,
  score: number,
  members?: ModelTeamMemberConnection | null,
  games?: ModelGameSessionConnection | null,
  scores?: ModelScoreConnection | null,
  createdAt: string,
  updatedAt: string,
  gameSessionTeamsId?: string | null,
  owner?: string | null,
};

export type ModelGameSessionConnection = {
  __typename: "ModelGameSessionConnection",
  items:  Array<GameSession | null >,
  nextToken?: string | null,
};

export type GameSession = {
  __typename: "GameSession",
  id: string,
  gameType: string,
  startTime: string,
  endTime?: string | null,
  teams?: ModelTeamConnection | null,
  scores?: ModelScoreConnection | null,
  status: string,
  createdAt: string,
  updatedAt: string,
  teamGamesId?: string | null,
  owner?: string | null,
};

export type ModelTeamConnection = {
  __typename: "ModelTeamConnection",
  items:  Array<Team | null >,
  nextToken?: string | null,
};

export type ModelScoreConnection = {
  __typename: "ModelScoreConnection",
  items:  Array<Score | null >,
  nextToken?: string | null,
};

export type Score = {
  __typename: "Score",
  id: string,
  team?: Team | null,
  gameSession?: GameSession | null,
  points: number,
  timestamp: string,
  createdAt: string,
  updatedAt: string,
  teamScoresId?: string | null,
  gameSessionScoresId?: string | null,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  email?: string | null,
  points?: number | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateAchievementInput = {
  id?: string | null,
  title: string,
  description: string,
  unlockedAt?: string | null,
  userAchievementsId?: string | null,
};

export type ModelAchievementConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  unlockedAt?: ModelStringInput | null,
  and?: Array< ModelAchievementConditionInput | null > | null,
  or?: Array< ModelAchievementConditionInput | null > | null,
  not?: ModelAchievementConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userAchievementsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateAchievementInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  unlockedAt?: string | null,
  userAchievementsId?: string | null,
};

export type DeleteAchievementInput = {
  id: string,
};

export type CreateTeamInput = {
  id?: string | null,
  name: string,
  score: number,
  gameSessionTeamsId?: string | null,
};

export type ModelTeamConditionInput = {
  name?: ModelStringInput | null,
  score?: ModelIntInput | null,
  and?: Array< ModelTeamConditionInput | null > | null,
  or?: Array< ModelTeamConditionInput | null > | null,
  not?: ModelTeamConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  gameSessionTeamsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateTeamInput = {
  id: string,
  name?: string | null,
  score?: number | null,
  gameSessionTeamsId?: string | null,
};

export type DeleteTeamInput = {
  id: string,
};

export type CreateTeamMemberInput = {
  id?: string | null,
  role: string,
  userTeamsId?: string | null,
  teamMembersId?: string | null,
};

export type ModelTeamMemberConditionInput = {
  role?: ModelStringInput | null,
  and?: Array< ModelTeamMemberConditionInput | null > | null,
  or?: Array< ModelTeamMemberConditionInput | null > | null,
  not?: ModelTeamMemberConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userTeamsId?: ModelIDInput | null,
  teamMembersId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateTeamMemberInput = {
  id: string,
  role?: string | null,
  userTeamsId?: string | null,
  teamMembersId?: string | null,
};

export type DeleteTeamMemberInput = {
  id: string,
};

export type CreateGameSessionInput = {
  id?: string | null,
  gameType: string,
  startTime: string,
  endTime?: string | null,
  status: string,
  teamGamesId?: string | null,
};

export type ModelGameSessionConditionInput = {
  gameType?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  endTime?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelGameSessionConditionInput | null > | null,
  or?: Array< ModelGameSessionConditionInput | null > | null,
  not?: ModelGameSessionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  teamGamesId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateGameSessionInput = {
  id: string,
  gameType?: string | null,
  startTime?: string | null,
  endTime?: string | null,
  status?: string | null,
  teamGamesId?: string | null,
};

export type DeleteGameSessionInput = {
  id: string,
};

export type CreateScoreInput = {
  id?: string | null,
  points: number,
  timestamp: string,
  teamScoresId?: string | null,
  gameSessionScoresId?: string | null,
};

export type ModelScoreConditionInput = {
  points?: ModelIntInput | null,
  timestamp?: ModelStringInput | null,
  and?: Array< ModelScoreConditionInput | null > | null,
  or?: Array< ModelScoreConditionInput | null > | null,
  not?: ModelScoreConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  teamScoresId?: ModelIDInput | null,
  gameSessionScoresId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateScoreInput = {
  id: string,
  points?: number | null,
  timestamp?: string | null,
  teamScoresId?: string | null,
  gameSessionScoresId?: string | null,
};

export type DeleteScoreInput = {
  id: string,
};

export type CreateGameAssetInput = {
  id?: string | null,
  type: string,
  url: string,
  gameType: string,
  metadata?: string | null,
};

export type ModelGameAssetConditionInput = {
  type?: ModelStringInput | null,
  url?: ModelStringInput | null,
  gameType?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  and?: Array< ModelGameAssetConditionInput | null > | null,
  or?: Array< ModelGameAssetConditionInput | null > | null,
  not?: ModelGameAssetConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type GameAsset = {
  __typename: "GameAsset",
  id: string,
  type: string,
  url: string,
  gameType: string,
  metadata?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateGameAssetInput = {
  id: string,
  type?: string | null,
  url?: string | null,
  gameType?: string | null,
  metadata?: string | null,
};

export type DeleteGameAssetInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  points?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelAchievementFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  unlockedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAchievementFilterInput | null > | null,
  or?: Array< ModelAchievementFilterInput | null > | null,
  not?: ModelAchievementFilterInput | null,
  userAchievementsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelTeamFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  score?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTeamFilterInput | null > | null,
  or?: Array< ModelTeamFilterInput | null > | null,
  not?: ModelTeamFilterInput | null,
  gameSessionTeamsId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelTeamMemberFilterInput = {
  id?: ModelIDInput | null,
  role?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTeamMemberFilterInput | null > | null,
  or?: Array< ModelTeamMemberFilterInput | null > | null,
  not?: ModelTeamMemberFilterInput | null,
  userTeamsId?: ModelIDInput | null,
  teamMembersId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelGameSessionFilterInput = {
  id?: ModelIDInput | null,
  gameType?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  endTime?: ModelStringInput | null,
  status?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelGameSessionFilterInput | null > | null,
  or?: Array< ModelGameSessionFilterInput | null > | null,
  not?: ModelGameSessionFilterInput | null,
  teamGamesId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelScoreFilterInput = {
  id?: ModelIDInput | null,
  points?: ModelIntInput | null,
  timestamp?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelScoreFilterInput | null > | null,
  or?: Array< ModelScoreFilterInput | null > | null,
  not?: ModelScoreFilterInput | null,
  teamScoresId?: ModelIDInput | null,
  gameSessionScoresId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelGameAssetFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  url?: ModelStringInput | null,
  gameType?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelGameAssetFilterInput | null > | null,
  or?: Array< ModelGameAssetFilterInput | null > | null,
  not?: ModelGameAssetFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelGameAssetConnection = {
  __typename: "ModelGameAssetConnection",
  items:  Array<GameAsset | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  points?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  userAchievementsId?: ModelSubscriptionIDInput | null,
  userTeamsId?: ModelSubscriptionIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionAchievementFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  unlockedAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAchievementFilterInput | null > | null,
  or?: Array< ModelSubscriptionAchievementFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionTeamFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  score?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTeamFilterInput | null > | null,
  or?: Array< ModelSubscriptionTeamFilterInput | null > | null,
  teamMembersId?: ModelSubscriptionIDInput | null,
  teamGamesId?: ModelSubscriptionIDInput | null,
  teamScoresId?: ModelSubscriptionIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionTeamMemberFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  role?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTeamMemberFilterInput | null > | null,
  or?: Array< ModelSubscriptionTeamMemberFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionGameSessionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  gameType?: ModelSubscriptionStringInput | null,
  startTime?: ModelSubscriptionStringInput | null,
  endTime?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGameSessionFilterInput | null > | null,
  or?: Array< ModelSubscriptionGameSessionFilterInput | null > | null,
  gameSessionTeamsId?: ModelSubscriptionIDInput | null,
  gameSessionScoresId?: ModelSubscriptionIDInput | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionScoreFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  points?: ModelSubscriptionIntInput | null,
  timestamp?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionScoreFilterInput | null > | null,
  or?: Array< ModelSubscriptionScoreFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionGameAssetFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  url?: ModelSubscriptionStringInput | null,
  gameType?: ModelSubscriptionStringInput | null,
  metadata?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGameAssetFilterInput | null > | null,
  or?: Array< ModelSubscriptionGameAssetFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    points: number,
    achievements?:  {
      __typename: "ModelAchievementConnection",
      nextToken?: string | null,
    } | null,
    teams?:  {
      __typename: "ModelTeamMemberConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    points: number,
    achievements?:  {
      __typename: "ModelAchievementConnection",
      nextToken?: string | null,
    } | null,
    teams?:  {
      __typename: "ModelTeamMemberConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    points: number,
    achievements?:  {
      __typename: "ModelAchievementConnection",
      nextToken?: string | null,
    } | null,
    teams?:  {
      __typename: "ModelTeamMemberConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateAchievementMutationVariables = {
  input: CreateAchievementInput,
  condition?: ModelAchievementConditionInput | null,
};

export type CreateAchievementMutation = {
  createAchievement?:  {
    __typename: "Achievement",
    id: string,
    title: string,
    description: string,
    unlockedAt?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userAchievementsId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateAchievementMutationVariables = {
  input: UpdateAchievementInput,
  condition?: ModelAchievementConditionInput | null,
};

export type UpdateAchievementMutation = {
  updateAchievement?:  {
    __typename: "Achievement",
    id: string,
    title: string,
    description: string,
    unlockedAt?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userAchievementsId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteAchievementMutationVariables = {
  input: DeleteAchievementInput,
  condition?: ModelAchievementConditionInput | null,
};

export type DeleteAchievementMutation = {
  deleteAchievement?:  {
    __typename: "Achievement",
    id: string,
    title: string,
    description: string,
    unlockedAt?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userAchievementsId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateTeamMutationVariables = {
  input: CreateTeamInput,
  condition?: ModelTeamConditionInput | null,
};

export type CreateTeamMutation = {
  createTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    score: number,
    members?:  {
      __typename: "ModelTeamMemberConnection",
      nextToken?: string | null,
    } | null,
    games?:  {
      __typename: "ModelGameSessionConnection",
      nextToken?: string | null,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    gameSessionTeamsId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateTeamMutationVariables = {
  input: UpdateTeamInput,
  condition?: ModelTeamConditionInput | null,
};

export type UpdateTeamMutation = {
  updateTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    score: number,
    members?:  {
      __typename: "ModelTeamMemberConnection",
      nextToken?: string | null,
    } | null,
    games?:  {
      __typename: "ModelGameSessionConnection",
      nextToken?: string | null,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    gameSessionTeamsId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteTeamMutationVariables = {
  input: DeleteTeamInput,
  condition?: ModelTeamConditionInput | null,
};

export type DeleteTeamMutation = {
  deleteTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    score: number,
    members?:  {
      __typename: "ModelTeamMemberConnection",
      nextToken?: string | null,
    } | null,
    games?:  {
      __typename: "ModelGameSessionConnection",
      nextToken?: string | null,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    gameSessionTeamsId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateTeamMemberMutationVariables = {
  input: CreateTeamMemberInput,
  condition?: ModelTeamMemberConditionInput | null,
};

export type CreateTeamMemberMutation = {
  createTeamMember?:  {
    __typename: "TeamMember",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null,
    role: string,
    createdAt: string,
    updatedAt: string,
    userTeamsId?: string | null,
    teamMembersId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateTeamMemberMutationVariables = {
  input: UpdateTeamMemberInput,
  condition?: ModelTeamMemberConditionInput | null,
};

export type UpdateTeamMemberMutation = {
  updateTeamMember?:  {
    __typename: "TeamMember",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null,
    role: string,
    createdAt: string,
    updatedAt: string,
    userTeamsId?: string | null,
    teamMembersId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteTeamMemberMutationVariables = {
  input: DeleteTeamMemberInput,
  condition?: ModelTeamMemberConditionInput | null,
};

export type DeleteTeamMemberMutation = {
  deleteTeamMember?:  {
    __typename: "TeamMember",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null,
    role: string,
    createdAt: string,
    updatedAt: string,
    userTeamsId?: string | null,
    teamMembersId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateGameSessionMutationVariables = {
  input: CreateGameSessionInput,
  condition?: ModelGameSessionConditionInput | null,
};

export type CreateGameSessionMutation = {
  createGameSession?:  {
    __typename: "GameSession",
    id: string,
    gameType: string,
    startTime: string,
    endTime?: string | null,
    teams?:  {
      __typename: "ModelTeamConnection",
      nextToken?: string | null,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    status: string,
    createdAt: string,
    updatedAt: string,
    teamGamesId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateGameSessionMutationVariables = {
  input: UpdateGameSessionInput,
  condition?: ModelGameSessionConditionInput | null,
};

export type UpdateGameSessionMutation = {
  updateGameSession?:  {
    __typename: "GameSession",
    id: string,
    gameType: string,
    startTime: string,
    endTime?: string | null,
    teams?:  {
      __typename: "ModelTeamConnection",
      nextToken?: string | null,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    status: string,
    createdAt: string,
    updatedAt: string,
    teamGamesId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteGameSessionMutationVariables = {
  input: DeleteGameSessionInput,
  condition?: ModelGameSessionConditionInput | null,
};

export type DeleteGameSessionMutation = {
  deleteGameSession?:  {
    __typename: "GameSession",
    id: string,
    gameType: string,
    startTime: string,
    endTime?: string | null,
    teams?:  {
      __typename: "ModelTeamConnection",
      nextToken?: string | null,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    status: string,
    createdAt: string,
    updatedAt: string,
    teamGamesId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateScoreMutationVariables = {
  input: CreateScoreInput,
  condition?: ModelScoreConditionInput | null,
};

export type CreateScoreMutation = {
  createScore?:  {
    __typename: "Score",
    id: string,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null,
    gameSession?:  {
      __typename: "GameSession",
      id: string,
      gameType: string,
      startTime: string,
      endTime?: string | null,
      status: string,
      createdAt: string,
      updatedAt: string,
      teamGamesId?: string | null,
      owner?: string | null,
    } | null,
    points: number,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
    teamScoresId?: string | null,
    gameSessionScoresId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateScoreMutationVariables = {
  input: UpdateScoreInput,
  condition?: ModelScoreConditionInput | null,
};

export type UpdateScoreMutation = {
  updateScore?:  {
    __typename: "Score",
    id: string,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null,
    gameSession?:  {
      __typename: "GameSession",
      id: string,
      gameType: string,
      startTime: string,
      endTime?: string | null,
      status: string,
      createdAt: string,
      updatedAt: string,
      teamGamesId?: string | null,
      owner?: string | null,
    } | null,
    points: number,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
    teamScoresId?: string | null,
    gameSessionScoresId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteScoreMutationVariables = {
  input: DeleteScoreInput,
  condition?: ModelScoreConditionInput | null,
};

export type DeleteScoreMutation = {
  deleteScore?:  {
    __typename: "Score",
    id: string,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null,
    gameSession?:  {
      __typename: "GameSession",
      id: string,
      gameType: string,
      startTime: string,
      endTime?: string | null,
      status: string,
      createdAt: string,
      updatedAt: string,
      teamGamesId?: string | null,
      owner?: string | null,
    } | null,
    points: number,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
    teamScoresId?: string | null,
    gameSessionScoresId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateGameAssetMutationVariables = {
  input: CreateGameAssetInput,
  condition?: ModelGameAssetConditionInput | null,
};

export type CreateGameAssetMutation = {
  createGameAsset?:  {
    __typename: "GameAsset",
    id: string,
    type: string,
    url: string,
    gameType: string,
    metadata?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateGameAssetMutationVariables = {
  input: UpdateGameAssetInput,
  condition?: ModelGameAssetConditionInput | null,
};

export type UpdateGameAssetMutation = {
  updateGameAsset?:  {
    __typename: "GameAsset",
    id: string,
    type: string,
    url: string,
    gameType: string,
    metadata?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteGameAssetMutationVariables = {
  input: DeleteGameAssetInput,
  condition?: ModelGameAssetConditionInput | null,
};

export type DeleteGameAssetMutation = {
  deleteGameAsset?:  {
    __typename: "GameAsset",
    id: string,
    type: string,
    url: string,
    gameType: string,
    metadata?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type EchoQueryVariables = {
  msg?: string | null,
};

export type EchoQuery = {
  echo?: string | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    points: number,
    achievements?:  {
      __typename: "ModelAchievementConnection",
      nextToken?: string | null,
    } | null,
    teams?:  {
      __typename: "ModelTeamMemberConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAchievementQueryVariables = {
  id: string,
};

export type GetAchievementQuery = {
  getAchievement?:  {
    __typename: "Achievement",
    id: string,
    title: string,
    description: string,
    unlockedAt?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userAchievementsId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListAchievementsQueryVariables = {
  filter?: ModelAchievementFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAchievementsQuery = {
  listAchievements?:  {
    __typename: "ModelAchievementConnection",
    items:  Array< {
      __typename: "Achievement",
      id: string,
      title: string,
      description: string,
      unlockedAt?: string | null,
      createdAt: string,
      updatedAt: string,
      userAchievementsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTeamQueryVariables = {
  id: string,
};

export type GetTeamQuery = {
  getTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    score: number,
    members?:  {
      __typename: "ModelTeamMemberConnection",
      nextToken?: string | null,
    } | null,
    games?:  {
      __typename: "ModelGameSessionConnection",
      nextToken?: string | null,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    gameSessionTeamsId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListTeamsQueryVariables = {
  filter?: ModelTeamFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTeamsQuery = {
  listTeams?:  {
    __typename: "ModelTeamConnection",
    items:  Array< {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTeamMemberQueryVariables = {
  id: string,
};

export type GetTeamMemberQuery = {
  getTeamMember?:  {
    __typename: "TeamMember",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null,
    role: string,
    createdAt: string,
    updatedAt: string,
    userTeamsId?: string | null,
    teamMembersId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListTeamMembersQueryVariables = {
  filter?: ModelTeamMemberFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTeamMembersQuery = {
  listTeamMembers?:  {
    __typename: "ModelTeamMemberConnection",
    items:  Array< {
      __typename: "TeamMember",
      id: string,
      role: string,
      createdAt: string,
      updatedAt: string,
      userTeamsId?: string | null,
      teamMembersId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGameSessionQueryVariables = {
  id: string,
};

export type GetGameSessionQuery = {
  getGameSession?:  {
    __typename: "GameSession",
    id: string,
    gameType: string,
    startTime: string,
    endTime?: string | null,
    teams?:  {
      __typename: "ModelTeamConnection",
      nextToken?: string | null,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    status: string,
    createdAt: string,
    updatedAt: string,
    teamGamesId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListGameSessionsQueryVariables = {
  filter?: ModelGameSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGameSessionsQuery = {
  listGameSessions?:  {
    __typename: "ModelGameSessionConnection",
    items:  Array< {
      __typename: "GameSession",
      id: string,
      gameType: string,
      startTime: string,
      endTime?: string | null,
      status: string,
      createdAt: string,
      updatedAt: string,
      teamGamesId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetScoreQueryVariables = {
  id: string,
};

export type GetScoreQuery = {
  getScore?:  {
    __typename: "Score",
    id: string,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null,
    gameSession?:  {
      __typename: "GameSession",
      id: string,
      gameType: string,
      startTime: string,
      endTime?: string | null,
      status: string,
      createdAt: string,
      updatedAt: string,
      teamGamesId?: string | null,
      owner?: string | null,
    } | null,
    points: number,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
    teamScoresId?: string | null,
    gameSessionScoresId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListScoresQueryVariables = {
  filter?: ModelScoreFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListScoresQuery = {
  listScores?:  {
    __typename: "ModelScoreConnection",
    items:  Array< {
      __typename: "Score",
      id: string,
      points: number,
      timestamp: string,
      createdAt: string,
      updatedAt: string,
      teamScoresId?: string | null,
      gameSessionScoresId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGameAssetQueryVariables = {
  id: string,
};

export type GetGameAssetQuery = {
  getGameAsset?:  {
    __typename: "GameAsset",
    id: string,
    type: string,
    url: string,
    gameType: string,
    metadata?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListGameAssetsQueryVariables = {
  filter?: ModelGameAssetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGameAssetsQuery = {
  listGameAssets?:  {
    __typename: "ModelGameAssetConnection",
    items:  Array< {
      __typename: "GameAsset",
      id: string,
      type: string,
      url: string,
      gameType: string,
      metadata?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    points: number,
    achievements?:  {
      __typename: "ModelAchievementConnection",
      nextToken?: string | null,
    } | null,
    teams?:  {
      __typename: "ModelTeamMemberConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    points: number,
    achievements?:  {
      __typename: "ModelAchievementConnection",
      nextToken?: string | null,
    } | null,
    teams?:  {
      __typename: "ModelTeamMemberConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    points: number,
    achievements?:  {
      __typename: "ModelAchievementConnection",
      nextToken?: string | null,
    } | null,
    teams?:  {
      __typename: "ModelTeamMemberConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateAchievementSubscriptionVariables = {
  filter?: ModelSubscriptionAchievementFilterInput | null,
  owner?: string | null,
};

export type OnCreateAchievementSubscription = {
  onCreateAchievement?:  {
    __typename: "Achievement",
    id: string,
    title: string,
    description: string,
    unlockedAt?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userAchievementsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateAchievementSubscriptionVariables = {
  filter?: ModelSubscriptionAchievementFilterInput | null,
  owner?: string | null,
};

export type OnUpdateAchievementSubscription = {
  onUpdateAchievement?:  {
    __typename: "Achievement",
    id: string,
    title: string,
    description: string,
    unlockedAt?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userAchievementsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteAchievementSubscriptionVariables = {
  filter?: ModelSubscriptionAchievementFilterInput | null,
  owner?: string | null,
};

export type OnDeleteAchievementSubscription = {
  onDeleteAchievement?:  {
    __typename: "Achievement",
    id: string,
    title: string,
    description: string,
    unlockedAt?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userAchievementsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateTeamSubscriptionVariables = {
  filter?: ModelSubscriptionTeamFilterInput | null,
  owner?: string | null,
};

export type OnCreateTeamSubscription = {
  onCreateTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    score: number,
    members?:  {
      __typename: "ModelTeamMemberConnection",
      nextToken?: string | null,
    } | null,
    games?:  {
      __typename: "ModelGameSessionConnection",
      nextToken?: string | null,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    gameSessionTeamsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateTeamSubscriptionVariables = {
  filter?: ModelSubscriptionTeamFilterInput | null,
  owner?: string | null,
};

export type OnUpdateTeamSubscription = {
  onUpdateTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    score: number,
    members?:  {
      __typename: "ModelTeamMemberConnection",
      nextToken?: string | null,
    } | null,
    games?:  {
      __typename: "ModelGameSessionConnection",
      nextToken?: string | null,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    gameSessionTeamsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteTeamSubscriptionVariables = {
  filter?: ModelSubscriptionTeamFilterInput | null,
  owner?: string | null,
};

export type OnDeleteTeamSubscription = {
  onDeleteTeam?:  {
    __typename: "Team",
    id: string,
    name: string,
    score: number,
    members?:  {
      __typename: "ModelTeamMemberConnection",
      nextToken?: string | null,
    } | null,
    games?:  {
      __typename: "ModelGameSessionConnection",
      nextToken?: string | null,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    gameSessionTeamsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateTeamMemberSubscriptionVariables = {
  filter?: ModelSubscriptionTeamMemberFilterInput | null,
  owner?: string | null,
};

export type OnCreateTeamMemberSubscription = {
  onCreateTeamMember?:  {
    __typename: "TeamMember",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null,
    role: string,
    createdAt: string,
    updatedAt: string,
    userTeamsId?: string | null,
    teamMembersId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateTeamMemberSubscriptionVariables = {
  filter?: ModelSubscriptionTeamMemberFilterInput | null,
  owner?: string | null,
};

export type OnUpdateTeamMemberSubscription = {
  onUpdateTeamMember?:  {
    __typename: "TeamMember",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null,
    role: string,
    createdAt: string,
    updatedAt: string,
    userTeamsId?: string | null,
    teamMembersId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteTeamMemberSubscriptionVariables = {
  filter?: ModelSubscriptionTeamMemberFilterInput | null,
  owner?: string | null,
};

export type OnDeleteTeamMemberSubscription = {
  onDeleteTeamMember?:  {
    __typename: "TeamMember",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      points: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null,
    role: string,
    createdAt: string,
    updatedAt: string,
    userTeamsId?: string | null,
    teamMembersId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateGameSessionSubscriptionVariables = {
  filter?: ModelSubscriptionGameSessionFilterInput | null,
  owner?: string | null,
};

export type OnCreateGameSessionSubscription = {
  onCreateGameSession?:  {
    __typename: "GameSession",
    id: string,
    gameType: string,
    startTime: string,
    endTime?: string | null,
    teams?:  {
      __typename: "ModelTeamConnection",
      nextToken?: string | null,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    status: string,
    createdAt: string,
    updatedAt: string,
    teamGamesId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateGameSessionSubscriptionVariables = {
  filter?: ModelSubscriptionGameSessionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateGameSessionSubscription = {
  onUpdateGameSession?:  {
    __typename: "GameSession",
    id: string,
    gameType: string,
    startTime: string,
    endTime?: string | null,
    teams?:  {
      __typename: "ModelTeamConnection",
      nextToken?: string | null,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    status: string,
    createdAt: string,
    updatedAt: string,
    teamGamesId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteGameSessionSubscriptionVariables = {
  filter?: ModelSubscriptionGameSessionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteGameSessionSubscription = {
  onDeleteGameSession?:  {
    __typename: "GameSession",
    id: string,
    gameType: string,
    startTime: string,
    endTime?: string | null,
    teams?:  {
      __typename: "ModelTeamConnection",
      nextToken?: string | null,
    } | null,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    status: string,
    createdAt: string,
    updatedAt: string,
    teamGamesId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateScoreSubscriptionVariables = {
  filter?: ModelSubscriptionScoreFilterInput | null,
  owner?: string | null,
};

export type OnCreateScoreSubscription = {
  onCreateScore?:  {
    __typename: "Score",
    id: string,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null,
    gameSession?:  {
      __typename: "GameSession",
      id: string,
      gameType: string,
      startTime: string,
      endTime?: string | null,
      status: string,
      createdAt: string,
      updatedAt: string,
      teamGamesId?: string | null,
      owner?: string | null,
    } | null,
    points: number,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
    teamScoresId?: string | null,
    gameSessionScoresId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateScoreSubscriptionVariables = {
  filter?: ModelSubscriptionScoreFilterInput | null,
  owner?: string | null,
};

export type OnUpdateScoreSubscription = {
  onUpdateScore?:  {
    __typename: "Score",
    id: string,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null,
    gameSession?:  {
      __typename: "GameSession",
      id: string,
      gameType: string,
      startTime: string,
      endTime?: string | null,
      status: string,
      createdAt: string,
      updatedAt: string,
      teamGamesId?: string | null,
      owner?: string | null,
    } | null,
    points: number,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
    teamScoresId?: string | null,
    gameSessionScoresId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteScoreSubscriptionVariables = {
  filter?: ModelSubscriptionScoreFilterInput | null,
  owner?: string | null,
};

export type OnDeleteScoreSubscription = {
  onDeleteScore?:  {
    __typename: "Score",
    id: string,
    team?:  {
      __typename: "Team",
      id: string,
      name: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      gameSessionTeamsId?: string | null,
      owner?: string | null,
    } | null,
    gameSession?:  {
      __typename: "GameSession",
      id: string,
      gameType: string,
      startTime: string,
      endTime?: string | null,
      status: string,
      createdAt: string,
      updatedAt: string,
      teamGamesId?: string | null,
      owner?: string | null,
    } | null,
    points: number,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
    teamScoresId?: string | null,
    gameSessionScoresId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateGameAssetSubscriptionVariables = {
  filter?: ModelSubscriptionGameAssetFilterInput | null,
  owner?: string | null,
};

export type OnCreateGameAssetSubscription = {
  onCreateGameAsset?:  {
    __typename: "GameAsset",
    id: string,
    type: string,
    url: string,
    gameType: string,
    metadata?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateGameAssetSubscriptionVariables = {
  filter?: ModelSubscriptionGameAssetFilterInput | null,
  owner?: string | null,
};

export type OnUpdateGameAssetSubscription = {
  onUpdateGameAsset?:  {
    __typename: "GameAsset",
    id: string,
    type: string,
    url: string,
    gameType: string,
    metadata?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteGameAssetSubscriptionVariables = {
  filter?: ModelSubscriptionGameAssetFilterInput | null,
  owner?: string | null,
};

export type OnDeleteGameAssetSubscription = {
  onDeleteGameAsset?:  {
    __typename: "GameAsset",
    id: string,
    type: string,
    url: string,
    gameType: string,
    metadata?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
