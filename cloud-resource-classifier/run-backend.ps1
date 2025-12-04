# Script chạy Backend Spring Boot không cần Maven
Write-Host "Starting Cloud Resource Classifier Backend..." -ForegroundColor Green

# Kiểm tra Java
try {
    $javaVersion = java -version 2>&1 | Select-String "version"
    Write-Host "✓ Java found: $javaVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Java not found. Please install Java 17+" -ForegroundColor Red
    exit 1
}

# Compile Java files
Write-Host "`nCompiling Java source files..." -ForegroundColor Yellow

$srcPath = "src\main\java"
$resourcesPath = "src\main\resources"
$targetClasses = "target\classes"

# Tạo thư mục target
New-Item -ItemType Directory -Force -Path $targetClasses | Out-Null
New-Item -ItemType Directory -Force -Path "target\classes\data" | Out-Null

# Copy resources
Write-Host "Copying resources..." -ForegroundColor Yellow
Copy-Item -Path "$resourcesPath\*" -Destination $targetClasses -Recurse -Force

# Tìm tất cả file .java
$javaFiles = Get-ChildItem -Path $srcPath -Filter *.java -Recurse

# Compile
Write-Host "Compiling $($javaFiles.Count) Java files..." -ForegroundColor Yellow

# Tạo classpath với Spring Boot dependencies
$springBootVersion = "3.2.0"
$deps = @(
    "org.springframework.boot:spring-boot-starter-web:$springBootVersion"
    "org.springframework.boot:spring-boot-starter:$springBootVersion"
    "com.fasterxml.jackson.core:jackson-databind:2.15.0"
)

# Compile command
$sourceFiles = ($javaFiles | ForEach-Object { $_.FullName }) -join " "

# Sử dụng javac để compile
javac -d $targetClasses -cp "$targetClasses" -sourcepath $srcPath $sourceFiles

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Compilation successful!" -ForegroundColor Green
    
    # Chạy application
    Write-Host "`nStarting Spring Boot application..." -ForegroundColor Green
    Write-Host "Backend will run at: http://localhost:8080" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
    Write-Host "`n" + ("=" * 50) + "`n" -ForegroundColor Cyan
    
    java -cp "$targetClasses" com.cloud.CloudResourceApplication
} else {
    Write-Host "✗ Compilation failed!" -ForegroundColor Red
    Write-Host "Note: This requires Spring Boot JARs. Please install Maven or use IDE." -ForegroundColor Yellow
    exit 1
}
