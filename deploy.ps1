$SERVER   = "root@45.32.17.214"
$APP_DIR  = "/root/goverce/goverce-next"
$APP_NAME = "goverce-next"

# 1. Sync with GitHub
Write-Host "--- Step 1: Syncing code with GitHub ---" -ForegroundColor Cyan
git add .
$commitMsg = "Site update: " + (Get-Date -Format "yyyy-MM-dd HH:mm")
git commit -m $commitMsg
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Warning: Git push failed or nothing to commit, continuing..." -ForegroundColor Yellow
}

# 2. Build Next.js (standalone output)
Write-Host "--- Step 2: Building Next.js project ---" -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Build failed. Check your code." -ForegroundColor Red
    exit 1
}

# 3. Upload standalone build to Vultr
Write-Host "--- Step 3: Uploading standalone build to Vultr ---" -ForegroundColor Cyan
ssh $SERVER "mkdir -p $APP_DIR/.next"
scp -r .next/standalone/* "${SERVER}:${APP_DIR}/"
scp -r .next/static "${SERVER}:${APP_DIR}/.next/static"
scp -r public "${SERVER}:${APP_DIR}/public"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Upload failed." -ForegroundColor Red
    exit 1
}

# 4. Copy .env and restart PM2
Write-Host "--- Step 4: Restarting Next.js server ---" -ForegroundColor Cyan

$remoteScript = @'
APP_DIR="/root/goverce/goverce-next"
APP_NAME="goverce-next"

[ -f "$APP_DIR/.env" ] || cp /root/goverce/goverce-audit/.env "$APP_DIR/.env" 2>/dev/null || true

if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
  pm2 restart "$APP_NAME" --update-env
else
  cd "$APP_DIR"
  PORT=3010 HOSTNAME=127.0.0.1 pm2 start server.js --name "$APP_NAME"
fi
pm2 save
'@

$remoteScript | ssh $SERVER bash

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Server restart failed." -ForegroundColor Red
    exit 1
}

Write-Host "--- Success: goverce.com updated and running! ---" -ForegroundColor Green
