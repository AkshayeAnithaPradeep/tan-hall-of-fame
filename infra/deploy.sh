#!/bin/bash
set -e

REGION="us-west-2"
FUNCTION_NAME="tanhof-api"
S3_BUCKET="tanhof-lambda-deploy-976681090932"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Packaging Lambda..."
cd "$SCRIPT_DIR"
zip -j lambda.zip lambda.mjs

echo "Uploading to S3..."
aws s3 cp lambda.zip "s3://$S3_BUCKET/lambda.zip" --region "$REGION"

echo "Updating Lambda function code..."
aws lambda update-function-code \
  --function-name "$FUNCTION_NAME" \
  --s3-bucket "$S3_BUCKET" \
  --s3-key lambda.zip \
  --region "$REGION" \
  --output text --query 'FunctionArn'

rm lambda.zip

echo ""
echo "Function URL:"
aws lambda get-function-url-config \
  --function-name "$FUNCTION_NAME" \
  --region "$REGION" \
  --query 'FunctionUrl' \
  --output text

echo "Done!"
