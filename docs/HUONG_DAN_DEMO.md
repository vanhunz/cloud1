# 🎬 HƯỚNG DẪN DEMO DỰ ÁN

## Cloud Resource Classifier - Demo Script

---

## 📋 CHUẨN BỊ TRƯỚC KHI DEMO

### ✅ Checklist

- [ ] Đã cài đặt Java 17+
- [ ] Đã cài đặt Node.js 16+
- [ ] Backend đang chạy (port 8080)
- [ ] Frontend đang chạy (port 3000)
- [ ] Đã test API bằng Postman/curl
- [ ] Trình duyệt đã mở sẵn localhost:3000
- [ ] Slide/báo cáo đã chuẩn bị

---

## 🚀 BƯỚC 1: KHỞI ĐỘNG HỆ THỐNG

### 1.1 Start Backend

**Terminal 1:**
```bash
cd cloud-resource-classifier
mvn spring-boot:run
```

**Chờ đến khi thấy:**
```
==============================================
  Cloud Resource Classifier Started!
  Backend API: http://localhost:8080
  Test API: http://localhost:8080/resources/health
==============================================
```

### 1.2 Verify Backend

**Terminal 2:**
```bash
# Test health check
curl http://localhost:8080/resources/health

# Response: "Backend is running"
```

### 1.3 Start Frontend

**Terminal 3:**
```bash
cd react-app
npm start
```

**Trình duyệt tự động mở:** `http://localhost:3000`

---

## 🎤 BƯỚC 2: KỊCH BẢN THUYẾT TRÌNH

### Phần 1: Giới thiệu (2 phút)

**Script:**

> "Xin chào thầy/cô và các bạn! Em xin trình bày đồ án **Cloud Resource Classifier** - Hệ thống phân loại tài nguyên động trong môi trường điện toán đám mây.
>
> **Vấn đề đặt ra:** Trong môi trường cloud như AWS, Azure, GCP, các tổ chức thường có hàng trăm, hàng nghìn tài nguyên như VM, database, container được tạo ra mỗi ngày. Việc quản lý và phân loại chúng thủ công rất khó khăn, dẫn đến:
> - Thất thoát chi phí
> - Khó tự động hóa
> - Rủi ro bảo mật
>
> **Giải pháp:** Em đã xây dựng một hệ thống tự động phân loại tài nguyên sử dụng Rule Engine."

### Phần 2: Kiến trúc hệ thống (2 phút)

**Trình chiếu slide kiến trúc, giải thích:**

> "Hệ thống gồm 3 thành phần chính:
>
> **1. Frontend (React)**: Dashboard để hiển thị và tương tác
> **2. Backend (Spring Boot)**: REST API và Rule Engine
> **3. Mock Data (JSON)**: Giả lập dữ liệu tài nguyên động
>
> Luồng hoạt động: User click button → Frontend gọi API → Backend chạy Rule Engine → Trả về kết quả phân loại."

### Phần 3: Demo thực tế (5 phút)

#### 🎬 Demo Step-by-step

**STEP 1: Hiển thị trang chính**

> "Đây là giao diện chính của hệ thống. Chúng ta có 2 nút chính:
> - **Load Data**: Tải tài nguyên từ backend
> - **Classify Resources**: Phân loại tài nguyên"

**ACTION:** Chỉ vào các phần trên UI

---

**STEP 2: Load Resources**

> "Đầu tiên, em sẽ tải dữ liệu tài nguyên từ backend."

**ACTION:** Click nút "🔄 Load Data"

> "Như các bạn thấy, hệ thống đã tải về 8 tài nguyên từ file JSON. Mỗi tài nguyên có:
> - **ID và Name**: định danh
> - **CPU và Memory**: cấu hình
> - **Tags**: metadata
> - **Classification**: hiện tại đang là 'Chưa phân loại'"

**ACTION:** Scroll qua bảng, chỉ vào các cột

---

**STEP 3: Giải thích dữ liệu mẫu**

> "Để minh họa, em có các tài nguyên sau:
> - `vm-prod-01`: VM production với 4 CPU, 8GB RAM
> - `db-prod-main`: Database production với 8 CPU, 16GB RAM
> - `vm-test-api`: VM test với 2 CPU, 4GB RAM
> - `cache-staging`: Cache staging với 1 CPU, 2GB RAM"

**ACTION:** Chỉ vào từng dòng trong bảng

---

**STEP 4: Classify Resources**

> "Bây giờ em sẽ chạy Rule Engine để phân loại các tài nguyên này."

**ACTION:** Click nút "🎯 Classify Resources"

> "Hệ thống đã phân loại xong! Các bạn thấy:
>
> **1. Stats Panel xuất hiện:**
> - Tổng 8 tài nguyên
> - 3 tài nguyên Production
> - 2 tài nguyên Critical
>
> **2. Bảng cập nhật:**
> - Badge đổi màu theo môi trường (đỏ=prod, xanh=test)
> - Icons hiển thị theo loại service (🗄️=database, 💻=VM)
> - Classification đầy đủ"

**ACTION:** Chỉ vào stats panel và các badge màu

---

**STEP 5: Phân tích kết quả**

> "Hãy xem một ví dụ cụ thể:
>
> **Resource: db-prod-main**
> - Classification: 'Production - Critical Resource - Database Service'
>
> **Giải thích:**
> - **Production**: vì tên có 'prod'
> - **Critical Resource**: vì CPU=8 > 6
> - **Database Service**: vì tên bắt đầu bằng 'db-'"

**ACTION:** Hover vào dòng `db-prod-main`

---

### Phần 4: Giải thích Rule Engine (3 phút)

**Chuyển sang slide Rule Engine:**

> "Trái tim của hệ thống là Rule Engine với 3 luật chính:
>
> **RULE A - Environment Classification:**
> - Kiểm tra tên: có 'prod'/'test'/'staging'
> - Kiểm tra tags: env='prod'/'test'/'staging'
> - Kết quả: Production/Testing/Staging/Unknown
>
> **RULE B - Critical Level:**
> - CPU > 6 HOẶC Mem > 10 → Critical
> - CPU 3-6 → Standard
> - CPU < 3 → Low
>
> **RULE C - Service Type:**
> - Tên bắt đầu 'db-' → Database
> - Tên bắt đầu 'cache-' → Caching
> - Tên bắt đầu 'vm-' → Compute
>
> Kết quả cuối = Environment + Critical Level + Service Type"

---

### Phần 5: Demo API (2 phút)

**Mở Postman hoặc terminal:**

> "Em cũng muốn demo API backend:"

**ACTION 1: GET /resources**
```bash
curl http://localhost:8080/resources
```

> "Đây là endpoint lấy toàn bộ tài nguyên chưa phân loại."

**ACTION 2: POST /resources/classify**
```bash
curl -X POST http://localhost:8080/resources/classify
```

> "Endpoint này chạy Rule Engine và trả về kết quả phân loại kèm thống kê."

---

### Phần 6: Code Walkthrough (3 phút - Optional)

**Mở IDE, show code:**

**File 1: RuleEngine.java**
```java
public void classifyResource(CloudResource resource) {
    String environment = applyRuleA_Environment(resource);
    String criticalLevel = applyRuleB_CriticalLevel(resource);
    String serviceType = applyRuleC_ServiceType(resource);
    
    String finalClassification = String.format("%s - %s - %s", 
        environment, criticalLevel, serviceType);
    
    resource.setClassification(finalClassification);
}
```

> "Đây là hàm chính phân loại. Nó gọi 3 rules và kết hợp kết quả."

**File 2: ResourceController.java**
```java
@PostMapping("/classify")
public ResponseEntity<?> classifyResources() {
    List<CloudResource> classifiedResources = 
        resourceService.classifyAllResources();
    
    return ResponseEntity.ok(response);
}
```

> "Controller nhận request, gọi service, và trả về JSON."

**File 3: ResourceTable.jsx**
```javascript
const handleClassify = async () => {
    const response = await classifyResources();
    setResources(response.data);
    setStats(response.stats);
};
```

> "Frontend gọi API và cập nhật state để re-render UI."

---

## 🎯 BƯỚC 3: TRÌNH BÀY ỨNG DỤNG THỰC TẾ

### Tình huống 1: Tự động Backup

> "Ứng dụng thực tế 1: **Tự động backup**
>
> Hệ thống có thể:
> - Tìm tất cả Database Production
> - Tự động schedule backup hàng ngày
> - Critical resources → backup mỗi 6 giờ"

### Tình huống 2: Tối ưu chi phí

> "Ứng dụng thực tế 2: **Cost optimization**
>
> - Tìm tài nguyên Test/Staging
> - Tự động tắt ngoài giờ làm việc
> - Low Resources không dùng → đề xuất xóa
> - Tiết kiệm 30-40% chi phí cloud"

### Tình huống 3: Auto-scaling

> "Ứng dụng thực tế 3: **Auto-scaling**
>
> - Critical Resources → thiết lập auto-scaling
> - Monitor utilization
> - Alert khi overload"

---

## 🎤 BƯỚC 4: XỬ LÝ CÂU HỎI

### Câu hỏi thường gặp

#### Q1: "Tại sao không dùng Machine Learning?"

**Answer:**
> "Đây là MVP để minh họa concept. Rule Engine có ưu điểm:
> - Dễ hiểu, dễ debug
> - Không cần training data
> - Chạy nhanh, nhẹ
>
> Phase 2 em sẽ tích hợp ML model thật để học từ dữ liệu lớn."

#### Q2: "Data động như thế nào?"

**Answer:**
> "Hiện tại em dùng JSON để mock. Trong thực tế sẽ:
> - Kết nối AWS/Azure API
> - Sync real-time từ cloud
> - Lưu vào database
> - Update theo schedule"

#### Q3: "Hệ thống có scale được không?"

**Answer:**
> "Kiến trúc này scale tốt vì:
> - Backend stateless → dễ horizontal scaling
> - Rule Engine efficient → O(n) complexity
> - Frontend SPA → CDN caching
>
> Có thể xử lý hàng nghìn tài nguyên."

#### Q4: "Bảo mật thế nào?"

**Answer:**
> "Phase 2 sẽ thêm:
> - JWT authentication
> - Role-based access control (RBAC)
> - API rate limiting
> - Audit logging"

#### Q5: "Chi phí triển khai?"

**Answer:**
> "Rất thấp:
> - Backend: Spring Boot → run on Heroku/AWS free tier
> - Frontend: Static files → Netlify/Vercel free
> - No database cost (hiện tại)
> - Estimate: < $10/month"

---

## 📊 BƯỚC 5: TỔNG KẾT

### Summary Slide

> "Tổng kết lại, dự án đã:
>
> ✅ **Hoàn thành đầy đủ yêu cầu:**
> - Backend Spring Boot với Rule Engine
> - Frontend React UI Dashboard
> - REST API hoạt động tốt
> - Demo end-to-end
>
> ✅ **Giải quyết vấn đề thực tế:**
> - Quản lý tài nguyên cloud
> - Tối ưu chi phí
> - Tự động hóa DevOps
>
> ✅ **Có khả năng mở rộng:**
> - Tích hợp ML
> - Real cloud integration
> - Production-ready features
>
> Em xin cảm ơn thầy/cô và các bạn đã lắng nghe!"

---

## 📝 PHỤ LỤC: DEMO TIPS

### Do's ✅

- **Practice trước**: Demo ít nhất 3 lần
- **Backup plan**: Có video screen recording phòng lỗi
- **Prepare data**: JSON có nhiều test cases đa dạng
- **Time management**: Giữ đúng thời gian cho từng phần
- **Engage audience**: Đặt câu hỏi, tương tác

### Don'ts ❌

- **Không nói quá nhanh**: Rõ ràng, từ tốn
- **Không skip steps**: Demo từng bước, đầy đủ
- **Không assume knowledge**: Giải thích mọi thuật ngữ
- **Không panic khi lỗi**: Có plan B
- **Không quên test trước**: Chạy thử tất cả

---

## 🎬 VIDEO SCRIPT (Optional)

### Intro (0:00-0:30)
```
[Scene: Logo animation]
Voice: "Cloud Resource Classifier - Hệ thống phân loại tài nguyên cloud tự động"

[Scene: Problem visualization]
Voice: "Hàng nghìn tài nguyên cloud cần quản lý..."
```

### Main Demo (0:30-3:00)
```
[Scene: Screen recording]
- Load data
- Classify
- Show results
Voice: "Chỉ với 2 clicks, hệ thống đã phân loại toàn bộ..."
```

### Technical Deep Dive (3:00-5:00)
```
[Scene: Code snippets]
Voice: "Rule Engine hoạt động với 3 luật chính..."
```

### Conclusion (5:00-5:30)
```
[Scene: Results summary]
Voice: "Giải pháp hiệu quả cho quản lý cloud hiện đại"
```

---

## 🏆 CHECKLIST HOÀN THÀNH DEMO

- [ ] Backend chạy ổn định
- [ ] Frontend load không lỗi
- [ ] API response đúng
- [ ] UI hiển thị đẹp
- [ ] Stats tính toán chính xác
- [ ] Badge màu sắc đúng
- [ ] Icons hiển thị đúng
- [ ] Responsive trên mobile
- [ ] Slide đã chuẩn bị
- [ ] Báo cáo đã in
- [ ] Đã practice script
- [ ] Backup video có sẵn

---

**🎯 GOOD LUCK!**

*Tip cuối: Tự tin, rõ ràng, và đừng sợ sai. Nếu có lỗi, xử lý bình tĩnh và tiếp tục!*
