#!/usr/bin/env bash
set -e

echo "🔧 Stopping any running n8n dev processes..."
pkill -f n8n || true

echo "🧹 Removing local n8n dev data and caches..."
rm -rf .n8n
rm -rf node_modules
rm -f package-lock.json
rm -rf ~/.npm/_npx/* || true
rm -rf node_modules/.cache || true

echo "📦 Reinstalling dependencies..."
npm install

echo "🛠️ Ensuring @n8n/node-cli is installed locally..."
npm install --save-dev @n8n/node-cli@latest

echo "🚀 Starting n8n dev..."
npm run dev
