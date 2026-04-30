# 1. Sync with GitHub (備份原始碼)
Write-Host "--- 🟢 Step 1: Syncing code with GitHub ---" -ForegroundColor Cyan
git add .
# 我們預設使用自動生成的 commit 訊息，你也可以手動改
$commitMsg = "Site update: " + (Get-Date -Format "yyyy-MM-dd HH:mm")
git commit -m $commitMsg
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Warning: Git push failed, but continuing to deployment..." -ForegroundColor Yellow
}

# 2. Build project (打包)
Write-Host "--- 🔵 Step 2: Building project (Vite) ---" -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Build failed. Please check your code." -ForegroundColor Red
    exit
}

# 3. Upload to Vultr (部署上線)
Write-Host "--- 🟠 Step 3: Uploading files to Vultr ---" -ForegroundColor Cyan
scp -r dist/* root@45.32.17.214:/var/www/goverce-official

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Upload failed." -ForegroundColor Red
    exit
}

Write-Host "--- ✅ Success: GitHub & Server updated! ---" -ForegroundColor Green