const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

class DynamoDBClient {
  static generateId() {
    return uuidv4();
  }

  static async putItem(table, item) {
    const params = {
      TableName: table,
      Item: item,
    };
    await dynamoDB.put(params).promise();
  }

  static async scan(table) {
    const params = {
      TableName: table,
    };
    const data = await dynamoDB.scan(params).promise();
    return data.Items;
  }

  static async updateItem(table, id, updateData) {
    const params = {
      TableName: table,
      Key: { id },
      UpdateExpression: 'set ' + Object.keys(updateData).map((key, index) => `#key${index} = :value${index}`).join(', '),
      ExpressionAttributeNames: Object.keys(updateData).reduce((acc, key, index) => {
        acc[`#key${index}`] = key;
        return acc;
      }, {}),
      ExpressionAttributeValues: Object.keys(updateData).reduce((acc, key, index) => {
        acc[`:value${index}`] = updateData[key];
        return acc;
      }, {}),
      ReturnValues: 'UPDATED_NEW',
    };
    await dynamoDB.update(params).promise();
  }

  static async deleteItem(table, id) {
    const params = {
      TableName: table,
      Key: { id },
    };
    await dynamoDB.delete(params).promise();
  }

  static async getItem(table, id) {
    const params = {
      TableName: table,
      Key: { id },
    };
    const data = await dynamoDB.get(params).promise();
    return data.Item;
  }
}

module.exports = DynamoDBClient;
