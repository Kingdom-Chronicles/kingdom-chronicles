import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { 
  DynamoDBDocumentClient, 
  PutCommand,
  QueryCommand,
  UpdateCommand,
  GetCommand
} from '@aws-sdk/lib-dynamodb';
import type { GameScore, LeaderboardEntry, GameScoreUpdate, GameProgress, FailedAnswer } from './types';

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

  // New methods for progress tracking
  async updateGameProgress(progress: GameProgress): Promise<void> {
    await this.client.send(new PutCommand({
      TableName: this.TABLE_NAME,
      Item: {
        PK: `USER#${progress.userId}`,
        SK: `PROGRESS#${progress.gameType}`,
        ...progress
      }
    }));
  }

  async getGameProgress(userId: string, gameType: string): Promise<GameProgress | null> {
    const result = await this.client.send(new GetCommand({
      TableName: this.TABLE_NAME,
      Key: {
        PK: `USER#${userId}`,
        SK: `PROGRESS#${gameType}`
      }
    }));

    return result.Item as GameProgress || null;
  }

  async saveFailedAnswer(failedAnswer: FailedAnswer): Promise<void> {
    await this.client.send(new PutCommand({
      TableName: this.TABLE_NAME,
      Item: {
        PK: `USER#${failedAnswer.userId}`,
        SK: `FAILED#${failedAnswer.gameType}#${failedAnswer.timestamp}`,
        ...failedAnswer
      }
    }));
  }

  async getFailedAnswers(userId: string, gameType?: string): Promise<FailedAnswer[]> {
    const skPrefix = gameType ? `FAILED#${gameType}#` : 'FAILED#';
    
    const result = await this.client.send(new QueryCommand({
      TableName: this.TABLE_NAME,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `USER#${userId}`,
        ':sk': skPrefix
      }
    }));

    return (result.Items || []) as FailedAnswer[];
  }

  async updateFailedAnswerReminderCount(userId: string, gameType: string, timestamp: string): Promise<void> {
    await this.client.send(new UpdateCommand({
      TableName: this.TABLE_NAME,
      Key: {
        PK: `USER#${userId}`,
        SK: `FAILED#${gameType}#${timestamp}`
      },
      UpdateExpression: 'ADD reminderCount :inc SET lastReminded = :now',
      ExpressionAttributeValues: {
        ':inc': 1,
        ':now': new Date().toISOString()
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