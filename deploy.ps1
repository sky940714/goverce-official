# 1. Sync with GitHub (備份原始碼)
Write-Host "--- Step 1: Syncing code with GitHub ---" -ForegroundColor Cyan
git add .
$commitMsg = "Site update: " + (Get-Date -Format "yyyy-MM-dd HH:mm")
git commit -m $commitMsg
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Warning: Git push failed, but continuing to deployment..." -ForegroundColor Yellow
}

# 2. Build frontend (打包)
Write-Host "--- Step 2: Building project (Vite) ---" -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Build failed. Please check your code." -ForegroundColor Red
    exit
}

# 3. Upload frontend to Vultr
Write-Host "--- Step 3: Uploading frontend to Vultr ---" -ForegroundColor Cyan
scp -r dist/* root@45.32.17.214:/var/www/goverce-official

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Frontend upload failed." -ForegroundColor Red
    exit
}

# 4. Upload backend and restart
Write-Host "--- Step 4: Deploying backend to Vultr ---" -ForegroundColor Cyan
scp backend/server.js backend/package.json backend/package-lock.json root@45.32.17.214:/root/goverce/goverce-audit/
ssh root@45.32.17.214 "cd /root/goverce/goverce-audit && npm install --omit=dev --quiet && pm2 restart goverce-audit --update-env"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Backend deployment failed." -ForegroundColor Red
    exit
}

Write-Host "--- Success: Frontend + Backend updated! ---" -ForegroundColor Green