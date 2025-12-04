# 🚨 FIX LỖI - HƯỚNG DẪN NHANH

## ⚠️ VẤN ĐỀ

1. **Maven chưa cài** - Lệnh `mvn` không có
2. **React-app ở sai chỗ** - Nó ở `cloud/react-app`, không phải `cloud-resource-classifier/react-app`

---

## ✅ GIẢI PHÁP NHANH NHẤT

### **OPTION 1: Cài Maven (KHUYẾN NGHỊ)**

#### Cách 1A: Dùng Winget (Windows 10+)
```powershell
winget install Apache.Maven
```

#### Cách 1B: Dùng Chocolatey
```powershell
choco install maven
```

#### Cách 1C: Script tự động
```powershell
# Chạy script cài Maven
cd C:\Users\LENOVO\Desktop\web\cloud
.\install-maven.ps1
```

**SAU KHI CÀI XONG: Restart PowerShell!**

Verify:
```powershell
mvn -version
```

---

### **OPTION 2: Dùng IntelliJ IDEA (KHÔNG CẦN MAVEN)**

1. Download IntelliJ IDEA Community (Free): https://www.jetbrains.com/idea/download/
2. Mở project: `cloud-resource-classifier`
3. IntelliJ tự động download dependencies
4. Click nút ▶️ Run

**Đây là cách DỄ NHẤT!**

---

### **OPTION 3: Dùng VS Code + Extension Pack for Java**

1. Mở VS Code
2. Install extension: "Extension Pack for Java"
3. Mở folder `cloud-resource-classifier`
4. VS Code tự động build
5. Press F5 để run

---

## 🚀 CHẠY ỨNG DỤNG SAU KHI CÓ MAVEN

### Terminal 1: Backend
```powershell
cd C:\Users\LENOVO\Desktop\web\cloud\cloud-resource-classifier
mvn spring-boot:run
```

### Terminal 2: Frontend
```powershell
cd C:\Users\LENOVO\Desktop\web\cloud\react-app
npm install
npm start
```

**Lưu ý:** `react-app` ở ngoài `cloud/`, không phải trong `cloud-resource-classifier/`!

---

## 🔧 CÀI MAVEN THỦ CÔNG

Nếu script không chạy:

1. **Download Maven:**
   - Link: https://maven.apache.org/download.cgi
   - Chọn: `Binary zip archive`

2. **Giải nén:**
   - Giải nén vào: `C:\Program Files\Apache\maven`

3. **Thêm vào PATH:**
   ```powershell
   # Mở System Environment Variables
   # Thêm vào PATH: C:\Program Files\Apache\maven\bin
   ```

4. **Set MAVEN_HOME:**
   ```powershell
   # Tạo biến môi trường mới:
   # MAVEN_HOME = C:\Program Files\Apache\maven
   ```

5. **Restart PowerShell và test:**
   ```powershell
   mvn -version
   ```

---

## 📁 CẤU TRÚC ĐÚNG

```
C:\Users\LENOVO\Desktop\web\cloud\
├── cloud-resource-classifier/    ← Backend ở đây
│   ├── src/
│   └── pom.xml
│
├── react-app/                    ← Frontend ở đây (ngoài!)
│   ├── src/
│   └── package.json
│
├── install-maven.ps1             ← Script cài Maven
└── README.md
```

---

## ⚡ DEMO NHANH NHẤT (NẾU KHÔNG CÓ MAVEN)

### Dùng IntelliJ IDEA:

1. Download: https://www.jetbrains.com/idea/download/
2. Install (5 phút)
3. Open Project → chọn folder `cloud-resource-classifier`
4. Đợi IntelliJ sync (2-3 phút lần đầu)
5. Click Run ▶️

**XONG! Backend chạy tại http://localhost:8080**

### Frontend vẫn chạy bình thường:
```powershell
cd C:\Users\LENOVO\Desktop\web\cloud\react-app
npm install
npm start
```

---

## 🎯 KHUYẾN NGHỊ CỦA TÔI

**Dùng IntelliJ IDEA** - Đơn giản nhất, không cần cài Maven!

Hoặc nếu muốn học Maven:
1. Chạy: `.\install-maven.ps1`
2. Restart PowerShell
3. Run: `mvn spring-boot:run`

---

## 📞 NẾU VẪN LỖI

### Lỗi "mvn not found":
- Maven chưa cài hoặc chưa restart PowerShell
- Giải pháp: Dùng IntelliJ IDEA thay thế

### Lỗi "react-app not found":
- Bạn đang ở sai thư mục
- Đúng: `cd C:\Users\LENOVO\Desktop\web\cloud\react-app`
- Sai: `cd cloud-resource-classifier\react-app` (không tồn tại!)

### Backend chạy nhưng lỗi dependencies:
- IntelliJ IDEA sẽ tự động fix
- Hoặc với Maven: `mvn clean install` trước

---

## ✅ CHECKLIST

- [ ] Maven đã cài (hoặc dùng IntelliJ)
- [ ] Java có sẵn (bạn đã có Java 21 ✓)
- [ ] Node.js có sẵn
- [ ] Biết `react-app` ở ngoài, không phải trong `cloud-resource-classifier`

---

## 🚀 LỘ TRÌNH KHUYẾN NGHỊ

**Nhanh nhất (10 phút):**
1. Download IntelliJ IDEA Community
2. Open project `cloud-resource-classifier`
3. Click Run
4. Mở Terminal riêng → `cd react-app` → `npm start`

**Hoặc cài Maven (20 phút):**
1. `.\install-maven.ps1`
2. Restart PowerShell
3. `mvn spring-boot:run`
4. Terminal 2 → `npm start`

---

**Chọn cách nào cũng được, nhưng IntelliJ DỄ NHẤT! 🎯**
