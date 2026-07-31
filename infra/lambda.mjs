import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';

const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME;

const headers = {
  'Content-Type': 'application/json',
};

export const handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod;

  if (method === 'GET') {
    const params = event.queryStringParameters || {};
    return listMessages(params.nextToken);
  }

  if (method === 'POST') {
    const body = JSON.parse(event.body);
    return createMessage(body);
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
};

async function listMessages(nextToken) {
  const scanParams = {
    TableName: TABLE_NAME,
    Limit: 50,
  };

  if (nextToken) {
    scanParams.ExclusiveStartKey = JSON.parse(Buffer.from(nextToken, 'base64url').toString());
  }

  const result = await ddb.send(new ScanCommand(scanParams));

  const response = {
    items: result.Items,
    nextToken: result.LastEvaluatedKey
      ? Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString('base64url')
      : null,
  };

  return { statusCode: 200, headers, body: JSON.stringify(response) };
}

async function createMessage({ name, description, image, color, icon }) {
  if (!name || !description) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'name and description are required' }) };
  }

  const now = new Date().toISOString();
  const item = {
    id: randomUUID(),
    __typename: 'Message',
    name,
    description,
    image: image || null,
    color: color || '#ead454',
    icon: icon || 'heart',
    createdAt: now,
    updatedAt: now,
  };

  await ddb.send(new PutCommand({ TableName: TABLE_NAME, Item: item }));

  return { statusCode: 201, headers, body: JSON.stringify(item) };
}
