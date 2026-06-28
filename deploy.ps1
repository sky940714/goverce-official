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

# 2. Build Next.js
Write-Host "--- Step 2: Building Next.js project ---" -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Build failed. Check your code." -ForegroundColor Red
    exit 1
}

# 3. Upload to Vultr (via tar for reliability)
Write-Host "--- Step 3: Uploading to Vultr ---" -ForegroundColor Cyan

# Use bash tar commands via Bash tool path
$bashExe = "C:\Program Files\Git\bin\bash.exe"

# Create tar archive in bash
& $bashExe -c "cd 'C:/Users/jerry/goverce-official' && tar -czf /tmp/goverce-next.tar.gz -C .next/standalone . && tar -czf /tmp/goverce-static.tar.gz -C .next static && tar -czf /tmp/goverce-public.tar.gz public && echo 'archives ready'"

scp /tmp/goverce-next.tar.gz "${SERVER}:/tmp/"
scp /tmp/goverce-static.tar.gz "${SERVER}:/tmp/"
scp /tmp/goverce-public.tar.gz "${SERVER}:/tmp/"

$remoteExtract = @'
APP_DIR="/root/goverce/goverce-next"
mkdir -p "$APP_DIR"
tar -xzf /tmp/goverce-next.tar.gz -C "$APP_DIR"
tar -xzf /tmp/goverce-static.tar.gz -C "$APP_DIR/.next"
tar -xzf /tmp/goverce-public.tar.gz -C "$APP_DIR"
rm /tmp/goverce-next.tar.gz /tmp/goverce-static.tar.gz /tmp/goverce-public.tar.gz
echo "extracted"
'@
$remoteExtract | & $bashExe -c "ssh root@45.32.17.214 bash"

# 4. Restart PM2
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
echo "PM2 restarted"
'@
$remoteScript | & $bashExe -c "ssh root@45.32.17.214 bash"

Write-Host "--- Success: goverce.com updated! ---" -ForegroundColor Green
