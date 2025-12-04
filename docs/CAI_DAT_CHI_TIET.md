# 📦 HƯỚNG DẪN CÀI ĐẶT CHI TIẾT

## Cloud Resource Classifier - Installation Guide

---

## 📋 MỤC LỤC

1. [Yêu cầu hệ thống](#1-yêu-cầu-hệ-thống)
2. [Cài đặt Java & Maven](#2-cài-đặt-java--maven)
3. [Cài đặt Node.js & npm](#3-cài-đặt-nodejs--npm)
4. [Clone project](#4-clone-project)
5. [Cài đặt Backend](#5-cài-đặt-backend)
6. [Cài đặt Frontend](#6-cài-đặt-frontend)
7. [Chạy ứng dụng](#7-chạy-ứng-dụng)
8. [Kiểm tra](#8-kiểm-tra)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. YÊU CẦU HỆ THỐNG

### Phần cứng tối thiểu
- **CPU**: 2 cores
- **RAM**: 4GB
- **Disk**: 2GB trống

### Phần cứng khuyến nghị
- **CPU**: 4 cores
- **RAM**: 8GB+
- **Disk**: 5GB trống

### Hệ điều hành
- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Linux (Ubuntu 20.04+)

---

## 2. CÀI ĐẶT JAVA & MAVEN

### 2.1 Windows

#### Cài Java 17

**Option 1: Dùng installer**
1. Tải: https://adoptium.net/
2. Chọn: **Temurin 17 (LTS)**
3. Download Windows x64 Installer
4. Chạy installer, chọn "Add to PATH"

**Option 2: Dùng winget**
```powershell
winget install EclipseAdoptium.Temurin.17.JDK
```

**Verify:**
```powershell
java -version
# Phải thấy: openjdk version "17.x.x"
```

#### Cài Maven

**Download:**
1. Tải: https://maven.apache.org/download.cgi
2. Chọn: **Binary zip archive**
3. Giải nén vào `C:\Program Files\Apache\maven`

**Thêm vào PATH:**
```powershell
# Mở System Environment Variables
# Thêm: C:\Program Files\Apache\maven\bin
```

**Verify:**
```powershell
mvn -version
# Phải thấy: Apache Maven 3.x.x
```

### 2.2 macOS

```bash
# Cài Java
brew install openjdk@17

# Link Java
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk

# Cài Maven
brew install maven

# Verify
java -version
mvn -version
```

### 2.3 Linux (Ubuntu)

```bash
# Update packages
sudo apt update

# Cài Java 17
sudo apt install openjdk-17-jdk -y

# Cài Maven
sudo apt install maven -y

# Verify
java -version
mvn -version
```

---

## 3. CÀI ĐẶT NODE.JS & NPM

### 3.1 Windows

**Option 1: Installer**
1. Tải: https://nodejs.org/
2. Chọn: **LTS version** (18.x hoặc 20.x)
3. Chạy installer
4. Chọn "Automatically install necessary tools"

**Option 2: Winget**
```powershell
winget install OpenJS.NodeJS.LTS
```

**Verify:**
```powershell
node -v
# Phải thấy: v18.x.x hoặc v20.x.x

npm -v
# Phải thấy: 9.x.x hoặc 10.x.x
```

### 3.2 macOS

```bash
# Dùng Homebrew
brew install node@18

# Hoặc dùng nvm (khuyến nghị)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Verify
node -v
npm -v
```

### 3.3 Linux

```bash
# Dùng NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node -v
npm -v
```

---

## 4. CLONE PROJECT

### Option 1: Từ GitHub (nếu có)

```bash
git clone https://github.com/your-username/cloud-resource-classifier.git
cd cloud-resource-classifier
```

### Option 2: Từ thư mục hiện có

Bạn đã có project tại: `C:\Users\LENOVO\Desktop\web\cloud`

```powershell
cd C:\Users\LENOVO\Desktop\web\cloud
```

---

## 5. CÀI ĐẶT BACKEND

### 5.1 Di chuyển vào thư mục backend

```bash
cd cloud-resource-classifier
```

### 5.2 Kiểm tra cấu trúc

```bash
# Windows PowerShell
tree /F

# macOS/Linux
tree
```

Phải có:
```
cloud-resource-classifier/
├── src/
├── pom.xml
└── ...
```

### 5.3 Download dependencies

```bash
mvn clean install
```

**Lần đầu sẽ mất 2-5 phút để tải dependencies**

**Output mong đợi:**
```
[INFO] BUILD SUCCESS
[INFO] Total time: 01:23 min
```

### 5.4 Build project

```bash
mvn package
```

**Tạo file JAR tại:** `target/cloud-resource-classifier-1.0.0.jar`

### 5.5 Test chạy

```bash
mvn spring-boot:run
```

**Phải thấy:**
```
==============================================
  Cloud Resource Classifier Started!
  Backend API: http://localhost:8080
==============================================
```

**Ctrl+C để dừng**

---

## 6. CÀI ĐẶT FRONTEND

### 6.1 Di chuyển vào thư mục frontend

```bash
# Từ root project
cd ../react-app

# Hoặc đường dẫn đầy đủ
cd C:\Users\LENOVO\Desktop\web\cloud\react-app
```

### 6.2 Kiểm tra cấu trúc

Phải có:
```
react-app/
├── src/
├── public/
├── package.json
└── ...
```

### 6.3 Install dependencies

```bash
npm install
```

**Lần đầu sẽ mất 1-3 phút**

**Output mong đợi:**
```
added 1234 packages, and audited 1235 packages in 2m

123 packages are looking for funding
```

### 6.4 Test chạy

```bash
npm start
```

**Trình duyệt tự mở:** `http://localhost:3000`

**Ctrl+C để dừng**

---

## 7. CHẠY ỨNG DỤNG

### 7.1 Chạy Backend

**Terminal 1:**
```bash
cd cloud-resource-classifier
mvn spring-boot:run
```

**Đợi đến khi thấy:**
```
Started CloudResourceApplication in 3.456 seconds
```

### 7.2 Chạy Frontend

**Terminal 2 (mới):**
```bash
cd react-app
npm start
```

**Trình duyệt tự mở:** `http://localhost:3000`

### 7.3 Sử dụng

1. Click "🔄 Load Data"
2. Click "🎯 Classify Resources"
3. Xem kết quả!

---

## 8. KIỂM TRA

### 8.1 Health Check

```bash
curl http://localhost:8080/resources/health
```

**Response:** `"Backend is running"`

### 8.2 Test API

```bash
# Get all resources
curl http://localhost:8080/resources

# Classify
curl -X POST http://localhost:8080/resources/classify
```

### 8.3 Kiểm tra Frontend

Mở: `http://localhost:3000`

- ✅ Trang load không lỗi
- ✅ Nút "Load Data" hoạt động
- ✅ Nút "Classify" hoạt động
- ✅ Bảng hiển thị data
- ✅ Stats panel hiển thị

---

## 9. TROUBLESHOOTING

### ❌ Lỗi: "java: command not found"

**Nguyên nhân:** Java chưa cài hoặc chưa có trong PATH

**Giải quyết:**
```bash
# Kiểm tra Java
java -version

# Nếu không có, cài lại Java
# Windows: Set JAVA_HOME environment variable
# macOS/Linux: echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
```

### ❌ Lỗi: "mvn: command not found"

**Nguyên nhân:** Maven chưa cài hoặc chưa có trong PATH

**Giải quyết:**
```bash
# Windows: Thêm Maven bin vào PATH
# macOS: brew install maven
# Linux: sudo apt install maven
```

### ❌ Lỗi: "port 8080 already in use"

**Nguyên nhân:** Port 8080 bị chiếm

**Giải quyết:**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8080
kill -9 <PID>
```

**Hoặc đổi port trong `application.properties`:**
```properties
server.port=8081
```

### ❌ Lỗi: "npm ERR! code ELIFECYCLE"

**Nguyên nhân:** Dependencies không cài đúng

**Giải quyết:**
```bash
# Xóa node_modules
rm -rf node_modules package-lock.json

# Cài lại
npm install
```

### ❌ Lỗi: CORS Error

**Nguyên nhân:** Backend chưa chạy hoặc CORS chưa config

**Giải quyết:**
1. Chắc chắn Backend đang chạy
2. Check `@CrossOrigin` trong Controller:
```java
@CrossOrigin(origins = "http://localhost:3000")
```

### ❌ Lỗi: "Cannot find module 'axios'"

**Nguyên nhân:** Thiếu dependency

**Giải quyết:**
```bash
npm install axios
```

### ❌ Lỗi: "Failed to load resources.json"

**Nguyên nhân:** File JSON không tìm thấy

**Giải quyết:**
- Check file: `src/main/resources/data/resources.json`
- Phải có trong classpath
- Rebuild project: `mvn clean install`

### ❌ Backend chạy nhưng API trả 404

**Kiểm tra:**
1. URL đúng: `http://localhost:8080/resources` (không có /api)
2. Controller mapping: `@RequestMapping("/resources")`
3. Backend logs có lỗi không

### ❌ Frontend không hiển thị data

**Kiểm tra:**
1. Browser console có lỗi không (F12)
2. Network tab - API call có thành công không
3. Backend có response đúng không
4. Check `resourceApi.js` URL: `http://localhost:8080`

---

## 📚 NEXT STEPS

### Sau khi cài đặt thành công:

1. ✅ Đọc [README.md](../README.md)
2. ✅ Xem [Báo cáo chi tiết](BAO_CAO_DU_AN.md)
3. ✅ Tham khảo [Hướng dẫn demo](HUONG_DAN_DEMO.md)
4. ✅ Chuẩn bị [Slide thuyết trình](SLIDE_TRINH_BAY.md)

### Tips:

- **Development mode**: Dùng `mvn spring-boot:run` và `npm start`
- **Production mode**: Build JAR và React production build
- **IDE**: IntelliJ IDEA cho Java, VS Code cho React
- **Testing**: Dùng Postman để test API

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:

1. Check logs trong terminal
2. Google error message
3. Check StackOverflow
4. Liên hệ: [your-email@example.com]

---

**🎉 Chúc mừng! Bạn đã cài đặt thành công!**

Giờ bạn có thể chạy demo và trình bày project rồi! 🚀
