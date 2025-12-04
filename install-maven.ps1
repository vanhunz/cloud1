# Script tự động cài đặt Maven trên Windows
Write-Host "Installing Apache Maven..." -ForegroundColor Green
Write-Host ""

# Kiểm tra Java
try {
    $javaVersion = java -version 2>&1 | Select-String "version" | Out-String
    Write-Host "Java found" -ForegroundColor Green
    Write-Host $javaVersion.Trim()
} catch {
    Write-Host "Java not found!" -ForegroundColor Red
    Write-Host "Please install Java 17+ first: https://adoptium.net/" -ForegroundColor Yellow
    exit 1
}

# Cài thủ công
Write-Host "`nInstalling Maven manually..." -ForegroundColor Cyan

$mavenVersion = "3.9.6"
$downloadUrl = "https://archive.apache.org/dist/maven/maven-3/$mavenVersion/binaries/apache-maven-$mavenVersion-bin.zip"
$installDir = "$env:USERPROFILE\apache-maven"
$zipFile = "$env:TEMP\maven.zip"

try {
    # Download
    Write-Host "Downloading Maven $mavenVersion..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipFile -UseBasicParsing
    
    # Extract
    Write-Host "Extracting..." -ForegroundColor Yellow
    Expand-Archive -Path $zipFile -DestinationPath $env:USERPROFILE -Force
    
    # Rename
    if (Test-Path $installDir) {
        Remove-Item $installDir -Recurse -Force
    }
    Rename-Item "$env:USERPROFILE\apache-maven-$mavenVersion" $installDir
    
    # Add to PATH
    Write-Host "Adding to PATH..." -ForegroundColor Yellow
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
    $mavenBin = "$installDir\bin"
    
    if ($currentPath -notlike "*$mavenBin*") {
        $newPath = "$currentPath;$mavenBin"
        [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    }
    
    # Set MAVEN_HOME
    [Environment]::SetEnvironmentVariable("MAVEN_HOME", $installDir, "User")
    
    # Cleanup
    Remove-Item $zipFile -Force
    
    Write-Host "`nMaven installed successfully!" -ForegroundColor Green
    Write-Host "`nInstalled to: $installDir" -ForegroundColor Cyan
    Write-Host "`nIMPORTANT: Please restart PowerShell!" -ForegroundColor Yellow
    Write-Host "Then run: mvn -version" -ForegroundColor Yellow
    
} catch {
    Write-Host "`nInstallation failed!" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host "`nPlease install manually:" -ForegroundColor Yellow
    Write-Host "1. Download: https://maven.apache.org/download.cgi" -ForegroundColor White
    Write-Host "2. Extract to C:\Program Files\Apache\maven" -ForegroundColor White
    Write-Host "3. Add to PATH: C:\Program Files\Apache\maven\bin" -ForegroundColor White
    exit 1
}
