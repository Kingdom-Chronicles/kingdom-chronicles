const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");

exports.handler = async (event) => {
  const client = new BedrockRuntimeClient({ region: "us-east-1" });

  const prompt = {
    gameType: event.gameType,
    difficulty: event.difficulty,
    theme: event.theme
  };

  const payload = {
    prompt: `Generate a Bible-themed game prompt for ${prompt.gameType} with difficulty ${prompt.difficulty} focusing on ${prompt.theme}`,
    maxTokens: 500,
    temperature: 0.7,
    topP: 0.9,
  };

  try {
    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-v2",
      body: JSON.stringify(payload),
      contentType: "application/json",
    });

    const response = await client.send(command);
    const result = JSON.parse(new TextDecoder().decode(response.body));

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};