# 🚀 HƯỚNG DẪN CHẠY NHANH

## Quick Start Guide

### Bước 1: Chạy Backend

```bash
cd cloud-resource-classifier
mvn spring-boot:run
```

**Đợi thấy:**
```
==============================================
  Cloud Resource Classifier Started!
  Backend API: http://localhost:8080
==============================================
```

### Bước 2: Chạy Frontend

**Terminal mới:**
```bash
cd react-app
npm install
npm start
```

**Trình duyệt tự mở:** `http://localhost:3000`

### Bước 3: Demo

1. ✅ Nhấn "🔄 Load Data"
2. ✅ Nhấn "🎯 Classify Resources"
3. ✅ Xem kết quả!

---

## Test API (Optional)

```bash
# Health check
curl http://localhost:8080/resources/health

# Get resources
curl http://localhost:8080/resources

# Classify
curl -X POST http://localhost:8080/resources/classify
```

---

## Troubleshooting

### Backend không chạy?
- Kiểm tra Java version: `java -version` (cần 17+)
- Kiểm tra Maven: `mvn -version`
- Xóa folder `target/` và chạy lại

### Frontend không chạy?
- Kiểm tra Node: `node -v` (cần 16+)
- Xóa folder `node_modules/` và `npm install` lại
- Kiểm tra port 3000 có bị chiếm không

### CORS Error?
- Backend phải chạy trước Frontend
- Check `@CrossOrigin` trong Controller

---

## 📝 Notes

- Backend port: **8080**
- Frontend port: **3000**
- Mock data: `src/main/resources/data/resources.json`

---

**🎯 Chúc bạn demo thành công!**
