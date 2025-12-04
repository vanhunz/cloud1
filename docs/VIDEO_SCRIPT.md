# 🎬 VIDEO SCRIPT - Cloud Resource Classifier

## Kịch bản Video Demo (5-7 phút)

---

## 🎬 SCENE 1: INTRO (0:00 - 0:30)

### Visual
- Logo/Title animation
- Background: Cloud imagery (servers, VMs, containers)

### Script

> **[Voice Over - Excited tone]**
>
> "Xin chào! Trong môi trường điện toán đám mây hiện đại, các tổ chức phải quản lý hàng trăm, thậm chí hàng nghìn tài nguyên như Virtual Machines, Databases, Containers...
>
> Làm thế nào để phân loại và quản lý chúng một cách hiệu quả?
>
> Hôm nay tôi xin giới thiệu **Cloud Resource Classifier** - Giải pháp tự động phân loại tài nguyên cloud thông minh!"

### On-screen text
```
☁️ CLOUD RESOURCE CLASSIFIER
Hệ thống phân loại tài nguyên động
```

---

## 🎬 SCENE 2: PROBLEM (0:30 - 1:30)

### Visual
- Split screen: Chaos vs Organized
- Icons: VMs, DBs, Containers scattered
- Graphs: Rising costs

### Script

> **[Voice Over - Serious tone]**
>
> "**Vấn đề đặt ra:**
>
> 🔴 **Số 1:** Tài nguyên không được quản lý - Không biết VM nào là production, VM nào là test. Rủi ro cao khi tắt nhầm server production!
>
> 🔴 **Số 2:** Chi phí thất thoát - Servers test chạy suốt ngày đêm không cần thiết. Chi phí cloud tăng vọt 200-300% so với dự kiến!
>
> 🔴 **Số 3:** Không thể tự động hóa - Làm sao biết database nào cần backup? Service nào cần auto-scaling?
>
> Các tổ chức mất hàng nghìn đô la mỗi tháng chỉ vì không quản lý tài nguyên hiệu quả!"

### On-screen stats
```
❌ 60% tài nguyên không được tag
❌ 40% chi phí bị lãng phí
❌ 70% công ty gặp khó tự động hóa
```

---

## 🎬 SCENE 3: SOLUTION (1:30 - 2:00)

### Visual
- Architecture diagram animation
- React logo → API → Spring Boot logo → JSON file

### Script

> **[Voice Over - Enthusiastic]**
>
> "**Giải pháp của chúng tôi:**
>
> Một hệ thống phân loại TỰ ĐỘNG sử dụng Rule Engine thông minh!
>
> **Kiến trúc đơn giản nhưng mạnh mẽ:**
> - Frontend React - Giao diện trực quan
> - Backend Spring Boot - Xử lý logic
> - Rule Engine - Phân loại thông minh
>
> Chỉ cần vài giây, hệ thống có thể phân loại hàng trăm tài nguyên!"

### On-screen
```
Frontend (React) ←→ API ←→ Backend (Spring Boot)
                              ↓
                        Rule Engine
```

---

## 🎬 SCENE 4: RULE ENGINE (2:00 - 3:00)

### Visual
- Animated flowchart of rules
- Examples flowing through rules

### Script

> **[Voice Over - Clear, educational]**
>
> "Trái tim của hệ thống là **Rule Engine** với 3 luật phân loại:
>
> **RULE A - Môi trường:**
> Tên có 'prod'? → Production
> Tên có 'test'? → Testing
> Tên có 'staging'? → Staging
>
> **RULE B - Mức độ quan trọng:**
> CPU lớn hơn 6 hoặc RAM lớn hơn 10GB? → Critical Resource
> CPU từ 3 đến 6? → Standard Resource
> CPU nhỏ hơn 3? → Low Resource
>
> **RULE C - Loại dịch vụ:**
> Tên bắt đầu 'db-'? → Database Service
> Tên bắt đầu 'cache-'? → Caching Service
> Tên bắt đầu 'vm-'? → Compute Service
>
> Kết quả cuối cùng là sự kết hợp của cả 3 rules!"

### On-screen examples
```
vm-prod-01 (4CPU, 8GB)
↓ Rule A: Production
↓ Rule B: Standard Resource
↓ Rule C: Compute Service
→ "Production - Standard - Compute"
```

---

## 🎬 SCENE 5: DEMO PART 1 - LOAD DATA (3:00 - 3:45)

### Visual
- Screen recording: Browser showing app
- Smooth transitions

### Script

> **[Voice Over - Demo tone]**
>
> "Hãy cùng xem demo thực tế!
>
> Đây là giao diện của hệ thống. Đơn giản, trực quan, dễ sử dụng.
>
> Đầu tiên, tôi sẽ tải dữ liệu tài nguyên từ backend..."

**[Click "Load Data"]**

> "Và ngay lập tức, hệ thống đã tải về 8 tài nguyên!
>
> Bạn có thể thấy:
> - vm-prod-01: Virtual Machine production
> - db-prod-main: Database production  
> - cache-test-redis: Cache server test
> - vm-staging-api: VM staging
>
> Tất cả đều chưa được phân loại..."

### On-screen highlight
- Hover over each row
- Highlight "Chưa phân loại" column

---

## 🎬 SCENE 6: DEMO PART 2 - CLASSIFY (3:45 - 4:45)

### Visual
- Dramatic pause before clicking
- Animation effects on classification

### Script

> **[Voice Over - Building excitement]**
>
> "Bây giờ là lúc magic xảy ra! Tôi sẽ nhấn nút 'Classify Resources'..."

**[Click "Classify Resources"]**
**[Pause for effect]**

> "Và WOW! Chỉ trong chưa đầy 1 giây:
>
> ✅ Stats panel xuất hiện - 8 tài nguyên, 3 Production, 2 Critical
> ✅ Bảng cập nhật với classification đầy đủ
> ✅ Badge đổi màu - Đỏ cho Production, Xanh cho Testing
> ✅ Icons hiển thị - Database icon, VM icon, Cache icon
>
> Hãy nhìn vào `db-prod-main`:
> Classification: 'Production - Critical Resource - Database Service'
>
> Hoàn toàn chính xác! Đây là database production với 8 CPU và 16GB RAM - đúng là Critical!
>
> Hay `vm-test-api`:
> Classification: 'Testing - Low Resource - Compute Service'
>
> Cũng chính xác! VM test với chỉ 2 CPU - Low Resource!"

### On-screen
- Zoom in on specific rows
- Highlight color changes
- Circle important classifications

---

## 🎬 SCENE 7: REAL-WORLD APPLICATIONS (4:45 - 5:30)

### Visual
- Split screen with use case scenarios
- Icons and animations

### Script

> **[Voice Over - Professional tone]**
>
> "Vậy hệ thống này có ích gì trong thực tế?
>
> **USE CASE 1: Tự động Backup**
> Hệ thống tìm tất cả Database Production và Critical → Tự động schedule backup hàng ngày. Dữ liệu quan trọng được bảo vệ!
>
> **USE CASE 2: Tối ưu chi phí**
> Tìm tài nguyên Test và Staging → Tự động tắt ngoài giờ làm việc → Tiết kiệm 30-40% chi phí cloud!
>
> **USE CASE 3: Auto-scaling**
> Monitor Critical Resources → Tự động scale khi load cao → Đảm bảo performance!
>
> **USE CASE 4: Security Compliance**
> Kiểm tra production resources có đúng tags bảo mật không → Alert nếu thiếu → Compliance đảm bảo!"

### On-screen
```
💰 Tiết kiệm: 40% chi phí
⚡ Performance: Auto-scaling
🔒 Security: Compliance check
📊 Management: Auto-tagging
```

---

## 🎬 SCENE 8: TECHNICAL STACK (5:30 - 6:00)

### Visual
- Logo animations: Java, Spring Boot, React
- Code snippets (clean, highlighted)

### Script

> **[Voice Over - Technical but accessible]**
>
> "**Công nghệ sử dụng:**
>
> Backend: Java 17 với Spring Boot 3 - Stable, enterprise-ready
> Frontend: React 18 - Modern, responsive
> Architecture: RESTful API, MVC pattern
> Rule Engine: Custom-built, extensible
>
> Code clean, well-documented, và dễ maintain!
>
> Và quan trọng nhất: Dễ dàng mở rộng! Có thể thêm:
> - Machine Learning models
> - Cloud API integration (AWS, Azure, GCP)
> - Advanced analytics
> - Multi-tenant support"

### On-screen code snippet
```java
public void classifyResource(CloudResource resource) {
    String env = applyRuleA_Environment(resource);
    String level = applyRuleB_CriticalLevel(resource);
    String type = applyRuleC_ServiceType(resource);
    return combine(env, level, type);
}
```

---

## 🎬 SCENE 9: BENEFITS SUMMARY (6:00 - 6:30)

### Visual
- Checkmarks animation
- Before/After comparison

### Script

> **[Voice Over - Convincing]**
>
> "**Tổng kết lại lợi ích:**
>
> ✅ Tiết kiệm thời gian - Tự động thay vì thủ công
> ✅ Giảm chi phí - 30-40% cloud spending
> ✅ Tăng security - Compliance tự động
> ✅ Dễ scale - Xử lý hàng nghìn tài nguyên
> ✅ Developer-friendly - API đơn giản, dễ tích hợp
>
> Từ CHAOS → ORGANIZED chỉ trong vài giây!"

### On-screen comparison
```
BEFORE:
❌ Manual tagging
❌ High costs
❌ No automation
❌ Security risks

AFTER:
✅ Auto classification
✅ Cost optimized
✅ Full automation
✅ Compliant
```

---

## 🎬 SCENE 10: CALL TO ACTION (6:30 - 7:00)

### Visual
- GitHub logo, Documentation
- Contact information
- Ending animation

### Script

> **[Voice Over - Enthusiastic closing]**
>
> "Cloud Resource Classifier - Giải pháp hiệu quả cho quản lý cloud hiện đại!
>
> 🌟 Source code available trên GitHub
> 📚 Documentation đầy đủ
> 🚀 Sẵn sàng deploy
>
> Hãy thử ngay hôm nay và trải nghiệm sự khác biệt!
>
> Cảm ơn bạn đã xem! Đừng quên like và subscribe để cập nhật thêm nhiều project thú vị khác!
>
> **Cloud Resource Classifier - Making Cloud Management Easy!**"

### On-screen
```
╔══════════════════════════════════════════╗
║                                          ║
║    ☁️  CLOUD RESOURCE CLASSIFIER         ║
║                                          ║
║   📧 Email: your@email.com              ║
║   🌐 GitHub: github.com/yourrepo        ║
║   📱 Twitter: @yourhandle               ║
║                                          ║
║         👍 Like | 🔔 Subscribe           ║
║                                          ║
╚══════════════════════════════════════════╝
```

---

## 📝 PRODUCTION NOTES

### Recording Tips

**Camera Setup:**
- Screen recording: 1080p 60fps
- Webcam (optional): 720p for intro/outro
- Microphone: Clear audio, no background noise

**Editing:**
- Background music: Soft, tech-style
- Transitions: Smooth, professional
- Text overlays: Clean, readable fonts
- Color grading: Consistent, modern look

**Timing:**
- Total length: 6-7 minutes
- Intro: 30s max
- Problem: 1 min
- Solution: 30s
- Technical: 3 min
- Outro: 30s

### Voice Over Tips

**Tone variations:**
- Intro: Excited, attention-grabbing
- Problem: Serious, concerned
- Solution: Enthusiastic, confident
- Demo: Clear, educational
- Technical: Professional, accessible
- Outro: Energetic, call-to-action

**Pacing:**
- Speak clearly, not too fast
- Pause after key points
- Emphasize important words
- Vary tone to maintain interest

### Post-production

**Add:**
- Background music (royalty-free)
- Sound effects (subtle)
- Text animations
- Logo animations
- Transitions
- Color correction

**Export:**
- Format: MP4
- Resolution: 1080p
- Frame rate: 30/60fps
- Bitrate: High quality

---

## 🎬 ALTERNATIVE VERSIONS

### Short Version (2 minutes)
- Scene 1: Intro (20s)
- Scene 5: Demo quick (60s)
- Scene 7: Use cases (30s)
- Scene 10: CTA (10s)

### Long Version (10 minutes)
- Add: Deep dive into code
- Add: API documentation walkthrough
- Add: Setup/installation guide
- Add: Q&A section

### Social Media Cuts
- **TikTok/Shorts (60s)**: Just demo highlights
- **Instagram (90s)**: Problem + Quick demo + CTA
- **LinkedIn (3 min)**: Professional focus, business benefits

---

## 📊 METRICS TO TRACK

After publishing:
- Views
- Watch time
- Engagement (likes, comments)
- Click-through rate (GitHub link)
- Shares

---

**🎬 LIGHTS, CAMERA, ACTION!**

*Remember: Be enthusiastic, be clear, be confident!*
