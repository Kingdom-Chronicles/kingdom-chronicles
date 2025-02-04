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
  private readonly TABLE_NAME = 'KingdomChroniclesScores-dev-dev';

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

    // Update user's total score
    await this.client.send(new UpdateCommand({
      TableName: this.TABLE_NAME,
      Key: {
        PK: `USER#${userId}`,
        SK: 'TOTAL'
      },
      UpdateExpression: 'ADD totalScore :score',
      ExpressionAttributeValues: {
        ':score': update.score
      }
    }));
  }

  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    const { Items = [] } = await this.client.send(new QueryCommand({
      TableName: this.TABLE_NAME,
      IndexName: 'GSI1',
      KeyConditionExpression: 'SK = :sk',
      ExpressionAttributeValues: {
        ':sk': 'TOTAL'
      },
      ScanIndexForward: false,
      Limit: limit
    }));

    return Items.map((item, index) => ({
      username: item.username,
      totalScore: item.totalScore,
      rank: index + 1
    }));
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