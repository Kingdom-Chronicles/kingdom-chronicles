import { post, get } from '@aws-amplify/api';
import { uploadData, getUrl } from '@aws-amplify/storage';

export const gameService = {
  async createGameSession(gameType: string, teams: string[]) {
    const session = await post({
      apiName: 'api',
      path: '/games/sessions',
      options: {
        body: {
          gameType,
          startTime: new Date().toISOString(),
          status: 'IN_PROGRESS',
          teams,
        },
      },
    });
    return session;
  },

  async updateScore(sessionId: string, teamId: string, points: number) {
    const score = await post({
      apiName: 'api',
      path: '/games/scores',
      options: {
        body: {
          teamId,
          gameSessionId: sessionId,
          points,
          timestamp: new Date().toISOString(),
        },
      },
    });
    return score;
  },

  async getGameAssets(gameType: string) {
    const assets = await get({
      apiName: 'api',
      path: `/games/assets?gameType=${gameType}`,
    });
    return assets;
  },

  async uploadGameAsset(file: File, gameType: string, metadata: any) {
    const key = `games/${gameType}/${Date.now()}-${file.name}`;
    await uploadData({
      key,
      data: file,
      options: {
        contentType: file.type,
        metadata: {
          gameType,
          ...metadata,
        },
      },
    });

    const url = await getUrl({ key });
    
    const asset = await post({
      apiName: 'api',
      path: '/games/assets',
      options: {
        body: {
          type: file.type,
          url: url.url.toString(),
          gameType,
          metadata: JSON.stringify(metadata),
        },
      },
    });
    return asset;
  },
};