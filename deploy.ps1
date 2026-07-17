$SERVER   = "root@45.32.17.214"
$APP_DIR  = "/root/goverce/goverce-next"
$APP_NAME = "goverce-next"
$BASH     = "C:\Program Files\Git\bin\bash.exe"

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

# 3. Upload to Vultr (all through bash so /tmp paths align)
Write-Host "--- Step 3: Uploading to Vultr ---" -ForegroundColor Cyan

& $BASH -c @"
set -e
cd 'C:/Users/jerry/goverce-official'
tar -czf /tmp/goverce-next.tar.gz -C .next/standalone .
tar -czf /tmp/goverce-static.tar.gz -C .next static
tar -czf /tmp/goverce-public.tar.gz public
echo 'Archives created, uploading...'
scp /tmp/goverce-next.tar.gz ${SERVER}:/tmp/
scp /tmp/goverce-static.tar.gz ${SERVER}:/tmp/
scp /tmp/goverce-public.tar.gz ${SERVER}:/tmp/
rm -f /tmp/goverce-next.tar.gz /tmp/goverce-static.tar.gz /tmp/goverce-public.tar.gz
echo 'Upload complete'
"@

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Upload failed." -ForegroundColor Red
    exit 1
}

# 4. Extract and restart PM2 (write script to temp file to avoid BOM issue)
Write-Host "--- Step 4: Deploying and restarting Next.js server ---" -ForegroundColor Cyan

$remoteScript = "APP_DIR=`"$APP_DIR`"`nmkdir -p `"`$APP_DIR`"`ntar -xzf /tmp/goverce-next.tar.gz -C `"`$APP_DIR`"`ntar -xzf /tmp/goverce-static.tar.gz -C `"`$APP_DIR/.next`"`ntar -xzf /tmp/goverce-public.tar.gz -C `"`$APP_DIR`"`nrm -f /tmp/goverce-next.tar.gz /tmp/goverce-static.tar.gz /tmp/goverce-public.tar.gz`n[ -f `"`$APP_DIR/.env`" ] || cp /root/goverce/goverce-audit/.env `"`$APP_DIR/.env`" 2>/dev/null || true`nif pm2 describe $APP_NAME > /dev/null 2>&1; then pm2 restart $APP_NAME --update-env; else cd `"`$APP_DIR`" && PORT=3010 HOSTNAME=127.0.0.1 pm2 start server.js --name $APP_NAME; fi`npm2 save`necho 'Server restarted'"

$tmpFile = "$env:TEMP\goverce_deploy.sh"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($tmpFile, $remoteScript, $utf8NoBom)

$normalizedPath = $tmpFile -replace '\\', '/'
$driveLetter = $normalizedPath.Substring(0,1).ToLower()
$bashTmpPath = "/$driveLetter" + $normalizedPath.Substring(2)

& $BASH -c "ssh $SERVER bash < '$bashTmpPath'"

Remove-Item $tmpFile -ErrorAction SilentlyContinue

Write-Host "--- Success: goverce.com updated! ---" -ForegroundColor Green
