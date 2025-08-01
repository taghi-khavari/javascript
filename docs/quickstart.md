# Quick Start

## Local
```bash
git clone <repo>
cd repo
cp .env.example .env
npm install
docker-compose up -d postgres redis
npm run dev
```

## Tests
```bash
npm test
```

## Deploy (example)
```bash
docker build -t bot .
ssh ec2 "docker pull bot && pm2 restart bot"
```
