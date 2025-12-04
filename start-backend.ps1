# Script chạy Backend sau khi cài Maven
Write-Host "Starting Backend Spring Boot..." -ForegroundColor Green

# Refresh PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","User") + ";" + [System.Environment]::GetEnvironmentVariable("Path","Machine")
$env:MAVEN_HOME = [System.Environment]::GetEnvironmentVariable("MAVEN_HOME","User")

# Verify Maven
Write-Host "`nVerifying Maven..." -ForegroundColor Yellow
try {
    $mavenVersion = mvn -version 2>&1 | Select-Object -First 1
    Write-Host $mavenVersion -ForegroundColor Green
} catch {
    Write-Host "Maven not found! Please restart PowerShell." -ForegroundColor Red
    Write-Host "Or run: refreshenv" -ForegroundColor Yellow
    exit 1
}

# Go to backend directory
cd "$PSScriptRoot\cloud-resource-classifier"

Write-Host "`nBuilding and starting Spring Boot..." -ForegroundColor Cyan
Write-Host "This may take 2-3 minutes on first run..." -ForegroundColor Yellow
Write-Host "`nBackend will run at: http://localhost:8080" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop`n" -ForegroundColor Yellow

# Run Spring Boot
mvn spring-boot:run
