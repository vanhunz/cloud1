# 📖 README - Cloud Resource Classifier

## 🎯 Giới thiệu

**Cloud Resource Classifier** là hệ thống phân loại tài nguyên động trong môi trường điện toán đám mây. Hệ thống tự động phân loại các tài nguyên cloud (VM, database, container...) dựa trên Rule Engine thông minh.

## 🏗 Kiến trúc

```
Frontend (React) ←→ REST API ←→ Backend (Spring Boot) ←→ Mock Data (JSON)
```

## 🚀 Cài đặt & Chạy

### Yêu cầu
- Java 17+
- Maven 3.6+
- Node.js 16+
- npm 8+

### Backend (Spring Boot)

```bash
cd cloud-resource-classifier
mvn clean install
mvn spring-boot:run
```

Backend chạy tại: `http://localhost:8080`

### Frontend (React)

```bash
cd react-app
npm install
npm start
```

Frontend chạy tại: `http://localhost:3000`

## 📊 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/resources` | Lấy toàn bộ tài nguyên |
| POST | `/resources/classify` | Phân loại tài nguyên |
| GET | `/resources/stats/summary` | Thống kê |
| GET | `/resources/health` | Health check |

## 🎯 Rule Engine

### 3 Rules chính:

**RULE A - Environment:**
- `name` chứa "prod" → Production
- `name` chứa "test" → Testing
- `name` chứa "staging" → Staging

**RULE B - Critical Level:**
- CPU > 6 OR Mem > 10 → Critical Resource
- CPU 3-6 → Standard Resource
- CPU < 3 → Low Resource

**RULE C - Service Type:**
- `name` bắt đầu "db-" → Database Service
- `name` bắt đầu "cache-" → Caching Service
- `name` bắt đầu "vm-" → Compute Service

## 📝 Ví dụ

**Input:**
```json
{
  "id": "1",
  "name": "db-prod-main",
  "cpu": 8,
  "mem": 16,
  "tags": {"env": "prod"}
}
```

**Output:**
```
Classification: "Production - Critical Resource - Database Service"
```

## 📚 Tài liệu

- [Báo cáo chi tiết](docs/BAO_CAO_DU_AN.md)
- [Hướng dẫn demo](docs/HUONG_DAN_DEMO.md)
- [Slide thuyết trình](docs/SLIDE_TRINH_BAY.md)

## 🎬 Demo

1. Mở `http://localhost:3000`
2. Click "Load Data"
3. Click "Classify Resources"
4. Xem kết quả phân loại

## 📂 Cấu trúc thư mục

```
cloud/
├── cloud-resource-classifier/    # Backend
│   ├── src/main/java/
│   └── pom.xml
├── react-app/                    # Frontend
│   ├── src/
│   └── package.json
└── docs/                         # Documentation
    ├── BAO_CAO_DU_AN.md
    ├── HUONG_DAN_DEMO.md
    └── SLIDE_TRINH_BAY.md
```

## 🎓 Mục đích

Đồ án môn học - Hệ thống phân loại tài nguyên Cloud

## 📧 Liên hệ

[Your Name] - [Your Email]

---

**Made with ☁️ and ❤️**
