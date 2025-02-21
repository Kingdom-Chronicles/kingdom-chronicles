import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { 
  DynamoDBDocumentClient, 
  PutCommand,
  QueryCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb';
import type { GameScore, LeaderboardEntry, GameScoreUpdate } from './types';

class ScoreService {
  private client: DynamoDBDocumentClient;
  private readonly TABLE_NAME = 'KingdomChroniclesScores-dev';

  constructor() {
    const ddbClient = new DynamoDBClient({
      region: import.meta.env.VITE_AWS_REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
      }
    });

    this.client = DynamoDBDocumentClient.from(ddbClient);
  }

  async updateScore(userId: string, username: string, update: GameScoreUpdate): Promise<void> {
    const timestamp = new Date().toISOString();

    // Add individual game score
    await this.client.send(new PutCommand({
      TableName: this.TABLE_NAME,
      Item: {
        PK: `USER#${userId}`,
        SK: `GAME#${update.gameType}#${timestamp}`,
        userId,
        username,
        gameType: update.gameType,
        score: update.score,
        timestamp
      }
    }));

    // Update or create game-specific total score
    await this.client.send(new UpdateCommand({
      TableName: this.TABLE_NAME,
      Key: {
        PK: `USER#${userId}`,
        SK: `TOTAL#${update.gameType}`
      },
      UpdateExpression: 'ADD totalScore :score SET username = :username, gameType = :gameType',
      ExpressionAttributeValues: {
        ':score': update.score,
        ':username': username,
        ':gameType': update.gameType
      }
    }));

    // Update overall total score
    await this.client.send(new UpdateCommand({
      TableName: this.TABLE_NAME,
      Key: {
        PK: `USER#${userId}`,
        SK: 'TOTAL'
      },
      UpdateExpression: 'ADD totalScore :score SET username = :username, gameType = :gameType',
      ExpressionAttributeValues: {
        ':score': update.score,
        ':username': username,
        ':gameType': 'ALL'
      }
    }));
  }

  async getLeaderboard(limit: number = 10, gameType?: string): Promise<LeaderboardEntry[]> {
    try {
      const { Items = [] } = await this.client.send(new QueryCommand({
        TableName: this.TABLE_NAME,
        IndexName: 'GSI1',
        KeyConditionExpression: 'gameType = :gameType',
        ExpressionAttributeValues: {
          ':gameType': gameType || 'ALL'
        },
        ScanIndexForward: false,
        Limit: limit
      }));

      return Items.map((item, index) => ({
        username: item.username,
        totalScore: item.totalScore || 0,
        rank: index + 1,
        gameType: item.gameType
      }));
    } catch (error) {
      console.error('Error in getLeaderboard:', error);
      throw error;
    }
  }

  async getUserScores(userId: string): Promise<GameScore[]> {
    const { Items = [] } = await this.client.send(new QueryCommand({
      TableName: this.TABLE_NAME,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `USER#${userId}`,
        ':sk': 'GAME#'
      },
      ScanIndexForward: false
    }));

    return Items as GameScore[];
  }
}

export const scoreService = new ScoreService();