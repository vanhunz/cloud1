# Script chạy Frontend React
Write-Host "Starting Frontend React..." -ForegroundColor Green

# Go to frontend directory
cd "$PSScriptRoot\react-app"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "`nStarting React dev server..." -ForegroundColor Cyan
Write-Host "Frontend will run at: http://localhost:3000" -ForegroundColor Green
Write-Host "Browser will open automatically`n" -ForegroundColor Yellow

# Start React
npm start
