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
    return listMessages(params.year);
  }

  if (method === 'POST') {
    const body = JSON.parse(event.body);
    return createMessage(body);
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
};

async function listMessages(year) {
  const scanParams = {
    TableName: TABLE_NAME,
  };

  if (year) {
    scanParams.FilterExpression = 'begins_with(createdAt, :yearPrefix)';
    scanParams.ExpressionAttributeValues = { ':yearPrefix': String(year) };
  }

  const items = [];
  let lastKey;

  do {
    if (lastKey) {
      scanParams.ExclusiveStartKey = lastKey;
    }
    const result = await ddb.send(new ScanCommand(scanParams));
    items.push(...result.Items);
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);

  return { statusCode: 200, headers, body: JSON.stringify({ items }) };
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
