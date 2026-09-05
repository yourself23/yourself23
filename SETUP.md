# 📦 NPM Installation & Alignment Guide

This document provides consistent setup instructions for all yourself23 repositories.

## 🚀 Standard Setup Process

### 1. Clone Repository
```bash
git clone https://github.com/yourself23/[REPO-NAME].git
cd [REPO-NAME]
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Update with your GitMyABI token
GITMYABI_TOKEN=your_token_here
GITMYABI_PROJECT_ID=6a9beb806a646456eda1145a
```

### 4. Verify Installation
```bash
npm run test
npm run lint
```

## 📋 Standard npm Scripts

All repositories include these common scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --fix",
    "format": "prettier --write src",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

## 🔐 GitMyABI Registry Setup

### Configure Registry Globally
```bash
npm config set @yourself23:registry https://registry.gitmyabi.com
```

### Add Token to .npmrc
```bash
echo "//registry.gitmyabi.com/:_authToken=${GITMYABI_TOKEN}" >> ~/.npmrc
```

### Or Configure Per-Project
Create `.npmrc` in project root:
```
@yourself23:registry=https://registry.gitmyabi.com
//registry.gitmyabi.com/:_authToken=${GITMYABI_TOKEN}
```

## 📦 Project Dependencies

All repositories should maintain compatible versions:

```json
{
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "prettier": "^2.8.0",
    "vite": "^4.0.0"
  }
}
```

## ✅ Repository Checklist

- [ ] `.env.example` file exists
- [ ] `package.json` has standard scripts
- [ ] `.npmrc` configured for GitMyABI
- [ ] `README.md` includes setup instructions
- [ ] Contributing guidelines present
- [ ] License file included
- [ ] `.gitignore` excludes `.env` and node_modules

