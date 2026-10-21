# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)
## Phân hệ: Đặt Lại Mật Khẩu, Xác Thực 2 Yếu Tố (2FA) & Quản Trị An Toàn Tài Khoản trên Cổng Web Admin
### Module: Khôi phục Mật khẩu Quản trị (Self-Service) & Trung tâm Giám sát 2FA / Helpdesk Security Governance

| Thông tin | Chi tiết |
| :--- | :--- |
| **Mã tài liệu** | `SRS_WEB_AUTH_2FA_RESET_001` |
| **Tên phân hệ** | Đặt lại Mật khẩu, Xác thực 2FA & Quản trị An toàn Tài khoản trên Web Admin |
| **Dự án** | VMO ERP System - Web Admin Management Portal |
| **Nền tảng** | Web Application (Desktop Browser: Chrome, Safari, Edge, Firefox) + Backend Auth & Security Microservices |
| **Tài liệu tham chiếu Mobile** | [SRS_Dat_Lai_Mat_Khau_2FA.md](file:///Users/hoangkien/project/erp/SRS_Dat_Lai_Mat_Khau_2FA.md), [SRS_Thay_Doi_Thong_Tin.md](file:///Users/hoangkien/project/erp/SRS_Thay_Doi_Thong_Tin.md), [SRS_Login_Web_Admin.md](file:///Users/hoangkien/project/erp/SRS_Login_Web_Admin.md) |
| **Độ phân giải chuẩn** | Desktop ($1440 \times 900$, $1440 \times 1024$, $1920 \times 1080$), Hỗ trợ Co giãn thích ứng (Responsive) |
| **Phiên bản SRS** | 1.0 (Chuẩn hóa toàn diện UI Split-Screen, TOTP Authenticator, Helpdesk 2FA Reset, Chính sách Bảo mật Doanh nghiệp & DDL) |
| **Ngày tạo** | 21/10/2026 |
| **Trạng thái** | Sẵn sàng triển khai (Ready for Dev/QA) |

---

## 1. Giới thiệu tổng quan phân hệ (Overview & Scope)

### 1.1 Mục đích tài liệu
Tài liệu này đặc tả toàn diện các yêu cầu giao diện người dùng (UI/UX), yêu cầu chức năng (FR), quy tắc nghiệp vụ (BR), kiến trúc dòng dữ liệu, hợp đồng API RESTful và lược đồ cơ sở dữ liệu quan hệ (PostgreSQL DDL) cho phân hệ **"Đặt lại Mật khẩu, Xác thực 2 Yếu tố (2FA) & Quản trị An toàn Tài khoản"** trên Cổng Web Admin của hệ thống VMO ERP.

Phân hệ được thiết kế để giải quyết trọn vẹn bài toán xác thực hai chiều trong doanh nghiệp:
1. **Chiều Cá nhân (Self-Service Admin Recovery):** Cho phép Quản trị viên, Lãnh đạo hoặc Nhân sự chủ động khôi phục mật khẩu khi bị quên thông qua các kênh xác thực bảo mật chuẩn doanh nghiệp (Email công ty `@vmogroup.com` / `@vmo.vn`, Tin nhắn SMS, Mã xác thực ứng dụng Google Authenticator / Microsoft Authenticator).
2. **Chiều Quản trị Hệ thống & Trợ giúp Kỹ thuật (Helpdesk Security Governance):** Cung cấp công cụ cho Bộ phận IT Support / Quản trị viên Hệ thống (`SUPER_ADMIN`) quản lý trạng thái 2FA của toàn bộ 921+ nhân sự, mở khóa tài khoản bị khóa do tấn công dò mật khẩu (Brute-force Lockout), hủy bỏ liên kết 2FA khi nhân sự mất điện thoại/đổi SIM, cấp mã khôi phục khẩn cấp (Emergency Backup Codes) và thiết lập chính sách mật khẩu toàn công ty.

---

### 1.2 Bảng so sánh Kiến trúc: Mobile App vs. Web Admin

| Tiêu chuẩn So sánh | Ứng dụng Di động ([SRS_Dat_Lai_Mat_Khau_2FA.md](file:///Users/hoangkien/project/erp/SRS_Dat_Lai_Mat_Khau_2FA.md)) | Cổng Quản trị Web (`SRS_Dat_Lai_Mat_Khau_2FA_Web_Admin.md`) |
| :--- | :--- | :--- |
| **Phạm vi tác vụ** | Chỉ phục vụ cá nhân người dùng tự lấy lại mật khẩu cho chính mình trên điện thoại. | **Hai phân hệ song song:** (1) Tự khôi phục mật khẩu cá nhân; (2) Trung tâm Giám sát Helpdesk hỗ trợ mở khóa và cấu hình 2FA cho 921+ nhân viên toàn công ty. |
| **Phương thức xác thực 2FA** | 2 Kênh cơ bản: Email hoặc Tin nhắn SMS qua số điện thoại. | **Đa phương thức Enterprise:** Email công ty, SMS Brandname, **Mã ứng dụng TOTP (Google/Microsoft Authenticator)**, và **Magic Link ký số HMAC-SHA256**. |
| **Bố cục giao diện** | Luồng màn hình đơn lẻ dọc ($375 \times 812$), gồm 11 màn hình (Screen 12 đến 22). | **Giao diện Web Split-Screen 2 cột ($1440 \times 900$):** Cột đồ họa thương hiệu và Cột form tương tác tập trung, bàn phím vật lý hỗ trợ phím `Tab` và `Enter`. |
| **Chính sách mật khẩu** | Kiểm tra độ khớp 2 mật khẩu đơn giản. | **Enterprise Password Policy:** Thanh đo độ mạnh realtime (Zxcvbn), kiểm tra tối thiểu 8-12 ký tự, ký tự hoa/thường/số/ký tự đặc biệt, không trùng 5 mật khẩu gần nhất, phát hiện mật khẩu rò rỉ (HaveIBeenPwned). |
| **Xử lý sau đổi mật khẩu** | Điều hướng về màn hình thông báo Thành công / Đăng nhập. | Tùy chọn **"Đăng xuất khỏi tất cả các thiết bị khác"** (Revoke All Active Sessions), ghi nhận IP, trình duyệt và gửi Email cảnh báo bảo mật tức thì. |
| **Hỗ trợ khi mất thiết bị 2FA**| Nhân viên bị kẹt, không thể đăng nhập nếu mất SIM/mất máy. | **Cơ chế Helpdesk Override:** Quản trị viên IT có thẩm quyền xác minh danh tính và thực hiện cấp lại 2FA, mở khóa tài khoản hoặc sinh bộ mã Emergency Backup Codes. |
| **Nhật ký & Kiểm toán** | Không hiển thị log cho người dùng. | **Security Audit Log:** Lưu trữ toàn bộ lịch sử yêu cầu OTP, IP gửi, kết quả xác thực, cảnh báo IP lạ hoặc hành vi yêu cầu OTP bất thường. |

---

## 2. Danh mục Các Chức năng Trọng tâm Cần Triển khai trên Web Admin

```mermaid
graph TD
    A[PHÂN HỆ BẢO MẬT 2FA & ĐẶT LẠI MẬT KHẨU WEB ADMIN] --> B[PHẦN 1: TỰ KHÔI PHỤC MẬT KHẨU (SELF-SERVICE)]
    A --> C[PHẦN 2: TRUNG TÂM GIÁM SÁT AN TOÀN & HELPDESK]
    A --> D[PHẦN 3: CẤU HÌNH CHÍNH SÁCH BẢO MẬT DOANH NGHIỆP]

    B --> B1[SCR_WEB_RESET_001: Chọn kênh khôi phục - Email / SMS / TOTP]
    B --> B2[SCR_WEB_RESET_002: Xác thực OTP 6 số hoặc Magic Link]
    B --> B3[SCR_WEB_RESET_003: Thiết lập mật khẩu mới & Đăng xuất phiên cũ]
    B --> B4[Bảo vệ Cloudflare Turnstile & Chống Spam OTP]

    C --> C1[SCR_WEB_SEC_001: Bảng điều hành Quản trị 2FA 921+ Nhân viên]
    C --> C2[SCR_WEB_SEC_002: Modal Mở khóa tài khoản bị Lockout do Brute-force]
    C --> C3[SCR_WEB_SEC_003: Quy trình Hủy & Cấp lại 2FA khi nhân viên mất máy]
    C --> C4[Cấp bộ mã khôi phục khẩn cấp - Emergency Backup Codes]
    C --> C5[Gửi link kích hoạt / Đặt lại mật khẩu qua email từ phía Admin]

    D --> D1[Cấu hình độ dài & độ phức tạp mật khẩu toàn hệ thống]
    D --> D2[Thiết lập chu kỳ đổi mật khẩu định kỳ - Password Expiration]
    D --> D3[Cấu hình TTL mã OTP & Giới hạn số lần thử sai - Max Retries]
    D --> D4[Bắt buộc kích hoạt 2FA theo Vai trò - Enforce 2FA by Role]
    D --> D5[Nhật ký Kiểm toán An ninh - Security Audit Log]
```

---

## 3. Đặc tả Chi tiết Giao diện Web Desktop (Wireframes & Screen Specs)

---

### PHẦN 1: LUỒNG TỰ KHÔI PHỤC MẬT KHẨU (SELF-SERVICE PASSWORD RECOVERY)

---

#### MÀN HÌNH 1: CHỌN PHƯƠNG THỨC XÁC THỰC 2FA (`SCR_WEB_RESET_001`)
*Bố cục Split-Screen $1440 \times 900$ px, đồng bộ hoàn hảo với [SRS_Login_Web_Admin.md](file:///Users/hoangkien/project/erp/SRS_Login_Web_Admin.md).*

##### 3.1 Bản vẽ Giao diện Web Desktop ($1440 \times 900$ px)
```
+-----------------------------------------------------------------------------------------------------------------------+
|                                              VMO ERP WEB ADMIN PORTAL                                                 |
+-----------------------------------------------------------+-----------------------------------------------------------+
|                                                           |                                                           |
|                     [ HERO BRANDING ]                     |                   [ RECOVERY CONTAINER ]                  |
|                    (Khối Cột Trái: 55%)                   |                     (Khối Cột Phải: 45%)                  |
|                                                           |                                                           |
|  +-----------------------------------------------------+  |  [< Quay lại Đăng nhập]                                   |
|  |                                                     |  |                                                           |
|  |           [ HÌNH MINH HỌA NGHỆ THUẬT 3D ]           |  |                 KHÔI PHÚC MẬT KHẨU QUẢN TRỊ               |
|  |       Poster bảo mật Enterprise Shield & Key        |  |  Vui lòng chọn phương thức xác thực 2 yếu tố (2FA)         |
|  |                                                     |  |  để nhận mã khôi phục quyền truy cập tài khoản.           |
|  +-----------------------------------------------------+  |                                                           |
|                                                           |  Tài khoản hoặc Email quản trị *                          |
|                 VMO SECURITY SHIELD                       |  +-----------------------------------------------------+  |
|          Bảo Vệ Đa Lớp Dữ Liệu Doanh Nghiệp               |  | admin.hr@vmogroup.com                               |  |
|                                                           |  +-----------------------------------------------------+  |
|  • Xác thực 2 yếu tố (2FA) chuẩn TOTP RFC 6238            |                                                           |
|  • Mã hóa lưu trữ Argon2id & AES-256 GCM                  |  Chọn phương thức nhận mã xác thực *:                     |
|  • Cơ chế bảo vệ Brute-force & Khóa tài khoản an toàn     |  +-----------------------------------------------------+  |
|                                                           |  | (o) [✉️] Gửi mã xác thực qua Email Doanh nghiệp      |  |
|  -------------------------------------------------------  |  |     Mã sẽ được gửi tới: ad***@vmogroup.com          |  |
|  Phiên bản Web Admin: v2.5.0 (Build 2026.10)              |  +-----------------------------------------------------+  |
|  © 2026 VMO Holdings. All rights reserved.                |  | ( ) [📱] Gửi mã SMS qua Số điện thoại bảo mật        |  |
|                                                           |  |     Mã sẽ được gửi tới: 098***4321                  |  |
|                                                           |  +-----------------------------------------------------+  |
|                                                           |  | ( ) [🔐] Sử dụng Ứng dụng xác thực (Google/MS Auth) |  |
|                                                           |  |     Nhập mã 6 số từ Authenticator App đã liên kết   |  |
|                                                           |  +-----------------------------------------------------+  |
|                                                           |                                                           |
|                                                           |  [🔒 Cloudflare Turnstile: Xác minh an toàn bảo mật]      |
|                                                           |                                                           |
|                                                           |  +-----------------------------------------------------+  |
|                                                           |  |                 TIẾP TỤC GỬI MÃ [->]                |  |
|                                                           |  +-----------------------------------------------------+  |
|                                                           |                                                           |
|                                                           |  Gặp sự cố mất thiết bị 2FA? [ Liên hệ IT Helpdesk ]      |
+-----------------------------------------------------------+-----------------------------------------------------------+
```

##### 3.2 Đặc tả Tương tác & Trạng thái Form
1. **Ô Nhập `Tài khoản hoặc Email quản trị`:**
   * Placeholder: `Nhập email công ty (@vmogroup.com) hoặc mã quản trị`.
   * Khi người dùng nhập xong và chuyển con trỏ chuột (`onBlur`), hệ thống thực hiện kiểm tra nhanh qua API xem tài khoản có tồn tại hay không.
   * Nếu tài khoản tồn tại: Hệ thống tự động che mờ (masking) Email (`ad***@vmogroup.com`) và Số điện thoại (`098***4321`) để bảo vệ quyền riêng tư.
   * Nếu tài khoản không tồn tại: Báo đỏ dưới ô nhập `* Tài khoản không tồn tại trong hệ thống quản trị`.
2. **Lựa chọn Phương thức Nhận mã (Radio Group 3 Thẻ):**
   * **Tùy chọn 1 (Default):** `Gửi mã qua Email Doanh nghiệp`. Phù hợp cho phần lớn nhân viên văn phòng.
   * **Tùy chọn 2:** `Gửi mã SMS qua Số điện thoại bảo mật`. Sử dụng SMS Brandname `VMO_CORP`.
   * **Tùy chọn 3:** `Sử dụng Ứng dụng xác thực (Authenticator App)`. Bỏ qua bước chờ tin nhắn/email, chuyển thẳng tới màn hình nhập mã TOTP 6 số từ Google Authenticator hoặc Microsoft Authenticator.
3. **Nút `[ TIẾP TỤC GỬI MÃ ]`:**
   * Màu cam thương hiệu VMO (`#F05A22`), hiệu ứng loading spinner khi đang kết nối hệ thống gửi mã.
   * Tự động chuyển tiếp sang Màn hình 2 (`SCR_WEB_RESET_002`).

---

#### MÀN HÌNH 2: NHẬP MÃ XÁC THỰC OTP HOẶC DUYỆT MAGIC LINK (`SCR_WEB_RESET_002`)

##### 3.3 Bản vẽ Giao diện Web Desktop Nhập OTP ($1440 \times 900$ px)
```
+-----------------------------------------------------------------------------------------------------------------------+
|                                              VMO ERP WEB ADMIN PORTAL                                                 |
+-----------------------------------------------------------+-----------------------------------------------------------+
|                                                           |                                                           |
|                     [ HERO BRANDING ]                     |                   [ OTP VERIFY CONTAINER ]                |
|                    (Khối Cột Trái: 55%)                   |                     (Khối Cột Phải: 45%)                  |
|                                                           |                                                           |
|  +-----------------------------------------------------+  |  [< Chọn lại phương thức khác]                            |
|  |                                                     |  |                                                           |
|  |           [ HÌNH MINH HỌA NGHỆ THUẬT 3D ]           |  |                 XÁC THỰC MÃ BẢO MẬT 2FA                   |
|  |         Biểu tượng 6 ô vuông mã khóa an toàn        |  |  Chúng tôi đã gửi mã xác thực 6 chữ số đến địa chỉ:       |
|  |                                                     |  |  ad***@vmogroup.com (Hết hạn sau: 04:59)                  |
|  +-----------------------------------------------------+  |                                                           |
|                                                           |  Nhập mã xác thực 6 chữ số:                               |
|                 VMO SECURITY SHIELD                       |  +-----+  +-----+  +-----+  +-----+  +-----+  +-----+     |
|          Bảo Vệ Đa Lớp Dữ Liệu Doanh Nghiệp               |  |  0  |  |  3  |  |  6  |  |  4  |  |  5  |  |  9  |     |
|                                                           |  +-----+  +-----+  +-----+  +-----+  +-----+  +-----+     |
|  • Mã xác minh có hiệu lực trong vòng 5 phút              |  ⚠️ Mã xác thực không chính xác hoặc đã hết hạn (Còn 2 lần) |
|  • Tự động chặn IP nếu nhập sai quá 5 lần                 |                                                           |
|  • Hỗ trợ mở link trực tiếp trong Email để xác thực nhanh |  Chưa nhận được mã?                                       |
|                                                           |  [ 🔄 Gửi lại mã (58s) ]                                  |
|  -------------------------------------------------------  |                                                           |
|  Phiên bản Web Admin: v2.5.0 (Build 2026.10)              |  ---------------------- HOẶC -----------------------     |
|  © 2026 VMO Holdings. All rights reserved.                |                                                           |
|                                                           |  [✉️] Bạn cũng có thể bấm vào nút "Xác nhận khôi phục"    |
|                                                           |       trong email mà chúng tôi vừa gửi để tiếp tục.       |
|                                                           |                                                           |
|                                                           |  +-----------------------------------------------------+  |
|                                                           |  |                   XÁC NHẬN MÃ OTP                   |  |
|                                                           |  +-----------------------------------------------------+  |
+-----------------------------------------------------------+-----------------------------------------------------------+
```

##### 3.4 Cơ chế Tương tác Bàn phím & Tự động Nhảy Ô (Auto-Focus UX)
* **6 Ô Nhập OTP Riêng biệt:**
  * Mỗi ô có kích thước $54 \times 60$ px, font chữ 24px Bold căn giữa.
  * Tự động nhảy con trỏ chuột sang ô kế tiếp khi người dùng gõ xong 1 ký tự số.
  * Hỗ trợ phím `Backspace`: Tự động xóa ô hiện tại và lùi về ô phía trước.
  * Hỗ trợ dán trực tiếp (`Paste Event - Ctrl+V / Cmd+V`): Người dùng copy chuỗi `036459` từ email/tin nhắn, paste vào ô bất kỳ $\rightarrow$ hệ thống tự động điền đủ 6 ô và tự động kích hoạt Submit.
* **Bộ đếm ngược Thời gian (Countdown Timers):**
  * Thời hạn mã OTP: Đếm ngược từ `05:00` về `00:00`.
  * Khóa nút gửi lại: Nút `[ Gửi lại mã ]` bị vô hiệu hóa với bộ đếm ngược 60 giây để chống spam SMS Gateway / SES Email.
* **Cơ chế Khôi phục qua Magic Link (One-Click Approval):**
  * Đồng thời với mã OTP, email gửi kèm một đường link bảo mật có chứa JWT token ký HMAC-SHA256 (`https://erp.vmo.vn/auth/verify-magic-link?token=ey...`).
  * Khi người dùng nhấp trực tiếp vào link trong email trên cùng trình duyệt, hệ thống tự động bỏ qua bước nhập OTP và chuyển tiếp thẳng sang Màn hình 3.

---

#### MÀN HÌNH 3: THIẾT LẬP MẬT KHẨU MỚI & THU HỒI PHIÊN CŨ (`SCR_WEB_RESET_003`)

##### 3.5 Bản vẽ Giao diện Web Desktop Thiết lập Mật khẩu Mới ($1440 \times 900$ px)
```
+-----------------------------------------------------------------------------------------------------------------------+
|                                              VMO ERP WEB ADMIN PORTAL                                                 |
+-----------------------------------------------------------+-----------------------------------------------------------+
|                                                           |                                                           |
|                     [ HERO BRANDING ]                     |                   [ NEW PASSWORD FORM ]                   |
|                    (Khối Cột Trái: 55%)                   |                     (Khối Cột Phải: 45%)                  |
|                                                           |                                                           |
|  +-----------------------------------------------------+  |                 THIẾT LẬP MẬT KHẨU MỚI                    |
|  |                                                     |  |  Tài khoản: admin.hr@vmogroup.com                         |
|  |           [ HÌNH MINH HỌA NGHỆ THUẬT 3D ]           |  |  Vui lòng tạo mật khẩu mới đáp ứng tiêu chuẩn an toàn.    |
|  |           Chìa khóa vàng & Ổ khóa xanh lá           |  |                                                           |
|  +-----------------------------------------------------+  |  Mật khẩu mới *                                           |
|                                                           |  +-----------------------------------------------------+  |
|                 VMO SECURITY POLICY                       |  | VmoEnterprise@2026                              [👁] |  |
|          Tiêu Chuẩn Mật Khẩu Doanh Nghiệp                 |  +-----------------------------------------------------+  |
|                                                           |  Độ mạnh mật khẩu: [ RẤT MẠNH ] [████████████████████]     |
|  • Tối thiểu 8 ký tự (Khuyến nghị 12 ký tự)               |                                                           |
|  • Bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt      |  Tiêu chuẩn bắt buộc:                                     |
|  • Không được trùng với 5 mật khẩu gần nhất               |  [✅] Tối thiểu 8 ký tự (Hiện tại: 18)                     |
|  • Không chứa họ tên hoặc ngày sinh cá nhân               |  [✅] Chứa ít nhất 1 chữ hoa (A-Z) và 1 chữ thường (a-z)   |
|                                                           |  [✅] Chứa ít nhất 1 chữ số (0-9)                          |
|  -------------------------------------------------------  |  [✅] Chứa ít nhất 1 ký tự đặc biệt (!@#$%^&*...)          |
|  Phiên bản Web Admin: v2.5.0 (Build 2026.10)              |                                                           |
|  © 2026 VMO Holdings. All rights reserved.                |  Nhập lại mật khẩu mới *                                  |
|                                                           |  +-----------------------------------------------------+  |
|                                                           |  | VmoEnterprise@2026                              [👁] |  |
|                                                           |  +-----------------------------------------------------+  |
|                                                           |  [⇪ Caps Lock đang bật]                                   |
|                                                           |                                                           |
|                                                           |  [X] Đăng xuất khỏi tất cả các thiết bị và phiên làm việc |
|                                                           |      khác (Khuyến nghị để bảo vệ an toàn tài khoản)       |
|                                                           |                                                           |
|                                                           |  +-----------------------------------------------------+  |
|                                                           |  |                LƯU MẬT KHẨU & ĐĂNG NHẬP             |  |
|                                                           |  +-----------------------------------------------------+  |
+-----------------------------------------------------------+-----------------------------------------------------------+
```

##### 3.6 Đặc tả Nghiệp vụ Lưu Mật khẩu & Bảo vệ Toàn diện
1. **Thanh đo Độ mạnh Mật khẩu (Password Strength Meter):**
   * Tích hợp thuật toán đánh giá `zxcvbn`:
     * Điểm 0-1: `[ YẾU ]` (Màu đỏ `#FF4D4F`) - Nút Lưu bị vô hiệu hóa.
     * Điểm 2: `[ TRUNG BÌNH ]` (Màu vàng `#FAAD14`) - Nút Lưu bị vô hiệu hóa nếu chưa đủ 4 tiêu chí.
     * Điểm 3: `[ MẠNH ]` (Màu xanh da trời `#1890FF`) - Cho phép lưu.
     * Điểm 4: `[ RẤT MẠNH ]` (Màu xanh lá cây `#52C41A`) - Cho phép lưu.
2. **Checkbox "Đăng xuất khỏi tất cả các thiết bị khác" (Force Revoke Sessions):**
   * Mặc định được tích chọn `[X]`.
   * Khi kích hoạt: Backend thực hiện vô hiệu hóa toàn bộ Refresh Token của tài khoản đó trong Redis/PostgreSQL, buộc tất cả các máy trạm khác và ứng dụng Mobile phải đăng nhập lại với mật khẩu mới.
3. **Cảnh báo Bảo mật Tức thời qua Email:**
   * Sau khi đổi mật khẩu thành công, hệ thống gửi email cảnh báo tự động:
     * *Tiêu đề:* `[VMO Security Alert] Mật khẩu tài khoản của bạn vừa được thay đổi`.
     * *Nội dung:* Hiển thị thời gian thực hiện, Địa chỉ IP, Trình duyệt sử dụng, Vị trí địa lý ước tính. Nếu không phải nhân viên thực hiện, email cung cấp nút khẩn cấp `[ 🔒 Khóa tài khoản ngay lập tức ]`.

---

### PHẦN 2: TRUNG TÂM GIÁM SÁT AN TOÀN & HELPDESK 2FA (`SCR_WEB_SEC_001`)
*Dành riêng cho Quản trị viên Hệ thống (`SUPER_ADMIN`) và Cán bộ IT Helpdesk quản lý 921+ nhân viên toàn công ty.*

##### 3.7 Bản vẽ Giao diện Web Desktop Quản trị 2FA & Tài khoản ($1440 \times 1024$ px)
```
+-----------------------------------------------------------------------------------------------------------------------------+
| [LOGO VMO]   Tổng quan    Nhân viên    Chấm công    Ngày nghỉ    Dự án    [BẢO MẬT & 2FA]*    Cấu hình       [🔍] [🔔] (Admin v)|
+-----------------------------------------------------------------------------------------------------------------------------+
| Trang chủ > Quản trị An ninh Hệ thống > Quản lý 2FA & Khôi phục Tài khoản                                  21/10/2026 14:35 |
|                                                                                                                             |
|  QUẢN TRỊ AN TOÀN TÀI KHOẢN & HỖ TRỢ HELPDESK                                         [ ⚙️ Chính sách bảo mật ] [ 📤 Xuất log ]
|  Tổng số tài khoản: 921 | Đã bật 2FA: 885 (96.1%) | Bị khóa (Lockout): 3 | Chưa bật 2FA: 36                                 |
|                                                                                                                             |
|  +-----------------------------------------------------------------------------------------------------------------------+  |
|  | [Tất cả (921)]  |  [⚠️ Đang bị khóa (3)]*  |  [Đã bật Authenticator App (540)]  |  [Sử dụng Email/SMS (345)]  |  [Chưa bật (36)] |
|  +-----------------------------------------------------------------------------------------------------------------------+  |
|                                                                                                                             |
|  +----------------------------------------------------+ +--------------------+ +--------------------+ +---------------------+  |
|  | [🔍 Tìm kiếm theo tên, mã NV, email, số điện thoại] | | [🏢 Phòng ban: All v]| | [🔐 Loại 2FA: All v] | | [ Trạng thái: All v] |  |
|  +----------------------------------------------------+ +--------------------+ +--------------------+ +---------------------+  |
|                                                                                                                             |
|  +-----------------------------------------------------------------------------------------------------------------------+  |
|  | MÃ NV   | HỌ VÀ TÊN        | EMAIL CÔNG TY        | SĐT BẢO MẬT  | LOẠI 2FA CHÍNH    | TRẠNG THÁI TÀI KHOẢN | THAO TÁC HELPDESK  |  |
|  +---------+------------------+----------------------+--------------+-------------------+----------------------+--------------------+  |
|  | VMO0123 | Ian Chesnut      | ian.chesnut@vmo.vn   | 0987.654.321 | [📱 MS Auth App]  | [✅ Đang hoạt động]  | [🔑 Đặt lại 2FA] [⋮] |  |
|  | VMO0125 | Collins Jackson  | collins.j@vmo.vn     | 0912.333.444 | [✉️ Email OTP]    | [✅ Đang hoạt động]  | [🔑 Đặt lại 2FA] [⋮] |  |
|  | VMO0088 | Sarah Jenkins    | sarah.j@vmo.vn       | 0904.555.666 | [📱 Google Auth]  | [🔒 BỊ KHÓA DO SAI]  | [ 🔓 MỞ KHÓA NGAY ]|  |
|  |         |                  |                      |              |                   | (Sai OTP 5 lần)      | [ Gửi link reset ] |  |
|  | VMO0412 | Alex Morgan      | alex.m@vmo.vn        | 0977.888.999 | [ Chưa kích hoạt] | [⚠️ Chưa bật 2FA]    | [ ✉️ Gửi email nhắc] |  |
|  +---------+------------------+----------------------+--------------+-------------------+----------------------+--------------------+  |
|  Hiển thị 1 - 25 của 3 tài khoản bị khóa              | Số dòng: [25 v]                                 [<] [1] [>]         |
+-----------------------------------------------------------------------------------------------------------------------------+
```

##### 3.8 Đặc tả Chi tiết các Tác vụ Helpdesk Cốt lõi

1. **Tác vụ 1: Mở khóa Tài khoản Bị khóa do Dò mật khẩu / Sai OTP (`[ 🔓 MỞ KHÓA NGAY ]`):**
   * *Bối cảnh:* Nhân viên nhập sai mật khẩu hoặc OTP quá 5 lần, hệ thống tự động khóa tài khoản trong 30 phút để chống Brute-force. Nhân viên liên hệ IT Helpdesk đề nghị hỗ trợ.
   * *Thao tác:* Admin bấm nút `[ 🔓 Mở khóa ngay ]` $\rightarrow$ Hệ thống hiển thị modal xác nhận lý do $\rightarrow$ Xóa bộ đếm thất bại trong Redis $\rightarrow$ Tài khoản hoạt động lại bình thường.
2. **Tác vụ 2: Đặt lại & Hủy liên kết 2FA Cũ (`[ 🔑 Đặt lại 2FA ]`):**
   * *Bối cảnh:* Nhân viên làm mất điện thoại, hỏng thiết bị hoặc đổi máy mới nên không mở được Google Authenticator / không nhận được mã.
   * *Thao tác:* Admin bấm `[ Đặt lại 2FA ]` $\rightarrow$ Mở Modal `SCR_WEB_SEC_002` (yêu cầu đính kèm xác nhận danh tính) $\rightarrow$ Hệ thống hủy Secret Key cũ, gửi email hướng dẫn quét mã QR 2FA mới cho nhân viên.
3. **Tác vụ 3: Cấp Bộ mã Khôi phục Khẩn cấp (Generate Emergency Backup Codes):**
   * Hệ thống sinh ra bộ gồm **8 mã khôi phục dùng 1 lần (Backup Codes)**, mỗi mã gồm 8 ký tự ngẫu nhiên (Ví dụ: `8a7b-9c2d`).
   * Quản trị viên cung cấp mã này an toàn cho nhân viên để đăng nhập tạm thời khi đi công tác không có mạng di động.
4. **Tác vụ 4: Gửi Link Đặt lại Mật khẩu Chủ động (`Force Password Reset Link`):**
   * Admin bấm gửi link $\rightarrow$ Hệ thống tự động vô hiệu hóa mật khẩu hiện tại và gửi email chứa token khôi phục trực tiếp đến hòm thư của nhân viên.

---

#### MÀN HÌNH 5: MODAL HỦY & THIẾT LẬP LẠI 2FA CHO NHÂN VIÊN (`SCR_WEB_SEC_002`)

##### 3.9 Bản vẽ Modal Xác nhận Hủy 2FA của Helpdesk
```
+-----------------------------------------------------------------------------------+
|  XÁC NHẬN THIẾT LẬP LẠI 2FA CHO NHÂN SỰ                                      [X]  |
+-----------------------------------------------------------------------------------+
|  Thông tin nhân sự yêu cầu hỗ trợ:                                                |
|  • Họ và tên: Sarah Jenkins                   Mã nhân viên: VMO0088               |
|  • Phòng ban: Phòng QA                        Email: sarah.j@vmogroup.com         |
|  • Thiết bị 2FA hiện tại: Google Authenticator (Kích hoạt ngày: 12/04/2025)       |
|                                                                                   |
|  Lý do thiết lập lại 2FA *:                                                       |
|  (o) Nhân viên làm mất điện thoại / đổi máy mới không thể lấy mã TOTP             |
|  ( ) Nhân viên thay đổi số điện thoại nhận mã SMS                                 |
|  ( ) Nghi vấn tài khoản bị xâm nhập hoặc lộ mã xác thực                           |
|  ( ) Khác: [ Nhập lý do chi tiết........................................... ]     |
|                                                                                   |
|  Xác minh danh tính nhân viên *:                                                  |
|  [X] Đã gọi điện video call nội bộ hoặc gặp trực tiếp để xác minh gương mặt       |
|  [X] Đã kiểm tra số CMND/CCCD khớp với hồ sơ nhân sự (CCCD: ***004455)            |
|                                                                                   |
|  Hành động bảo mật kèm theo:                                                      |
|  [X] Hủy bỏ toàn bộ các phiên làm việc hiện tại của nhân sự                       |
|  [X] Gửi email thông báo khẩn cấp tới email cá nhân và quản lý trực tiếp          |
|                                                                                   |
|  [ Hủy bỏ ]                                              [ 🚀 Xác nhận Hủy & Cấp lại 2FA ]|
+-----------------------------------------------------------------------------------+
```

---

#### MÀN HÌNH 6: THIẾT LẬP CHÍNH SÁCH BẢO MẬT DOANH NGHIỆP (`SCR_WEB_SEC_003`)

##### 3.10 Bản vẽ Màn hình Cấu hình Chính sách Bảo mật Toàn hệ thống
```
+-----------------------------------------------------------------------------------------------------------------------------+
| [LOGO VMO]   Tổng quan    Nhân viên    Chấm công    Ngày nghỉ    Dự án    Bảo mật & 2FA    [CẤU HÌNH HỆ THỐNG]*        (Admin v)|
+-----------------------------------------------------------------------------------------------------------------------------+
| Trang chủ > Cấu hình Hệ thống > Chính sách Mật khẩu & Xác thực 2FA                                          21/10/2026 14:40 |
|                                                                                                                             |
|  THIẾT LẬP CHÍNH SÁCH BẢO MẬT & XÁC THỰC DOANH NGHIỆP                                                [ 💾 Lưu chính sách ]   |
|                                                                                                                             |
|  1. CHÍNH SÁCH ĐỘ PHỨC TẠP MẬT KHẨU (PASSWORD COMPLEXITY)                                                                   |
|  -------------------------------------------------------------------------------------------------------------------------  |
|  • Độ dài mật khẩu tối thiểu:             [ 10 ký tự v ] (Khuyến nghị cho cấp Quản trị: từ 10 đến 16 ký tự)                 |
|  • Bắt buộc chứa chữ hoa và chữ thường:   [ (o) Bật   ( ) Tắt ]                                                             |
|  • Bắt buộc chứa ít nhất 1 chữ số:        [ (o) Bật   ( ) Tắt ]                                                             |
|  • Bắt buộc chứa ký tự đặc biệt:          [ (o) Bật   ( ) Tắt ]                                                             |
|  • Số mật khẩu gần nhất không được trùng: [ 5 mật khẩu v ]                                                                  |
|  • Thời hạn hiệu lực của mật khẩu:        [ 90 ngày v ] (Bắt buộc đổi mật khẩu định kỳ sau 90 ngày)                         |
|                                                                                                                             |
|  2. CHÍNH SÁCH XÁC THỰC HAI YẾU TỐ (2FA POLICY)                                                                             |
|  -------------------------------------------------------------------------------------------------------------------------  |
|  • Bắt buộc kích hoạt 2FA đối với:       [X] SUPER_ADMIN   [X] HR_MANAGER   [X] PMO   [X] DEPT_LEAD   [ ] EMPLOYEE          |
|  • Thời gian ân hạn bật 2FA cho NV mới:  [ 7 ngày v ] (Sau 7 ngày chưa bật 2FA sẽ bị chặn truy cập Web Admin)               |
|  • Thời gian sống của mã OTP (TTL):       [ 5 phút v ]                                                                      |
|  • Thời gian chờ gửi lại mã (Cooldown):   [ 60 giây v ]                                                                     |
|                                                                                                                             |
|  3. CHÍNH SÁCH PHÒNG CHỐNG BRUTE-FORCE & KHÓA TÀI KHOẢN (ACCOUNT LOCKOUT)                                                  |
|  -------------------------------------------------------------------------------------------------------------------------  |
|  • Số lần nhập sai mật khẩu tối đa:       [ 5 lần v ]                                                                       |
|  • Số lần nhập sai mã OTP tối đa:         [ 3 lần v ]                                                                       |
|  • Thời gian khóa tài khoản tự động:      [ 30 phút v ]                                                                     |
|  • Kích hoạt Cloudflare Turnstile sau:    [ 2 lần đăng nhập thất bại v ]                                                    |
+-----------------------------------------------------------------------------------------------------------------------------+
```

---

## 4. Đặc tả Yêu cầu Chức năng (Functional Requirements) & Quy tắc Nghiệp vụ

### 4.1 Quy tắc Nghiệp vụ (Business Rules - BR)

1. **BR-SEC-001 (Sinh Mã OTP Chuẩn CSPRNG An toàn Tuyệt đối):**
   * Mã OTP gồm đúng **6 chữ số ngẫu nhiên**, được sinh bởi thuật toán ngẫu nhiên bảo mật cao (Cryptographically Secure Pseudo-Random Number Generator - `secrets.choice`).
   * Tuyệt đối không sinh mã tuần tự hoặc dựa trên hàm thời gian dự đoán được (`random.random`).
2. **BR-SEC-002 (Lưu trữ và Kiểm tra Mã OTP trong Bộ nhớ Đệm Redis):**
   * Mã OTP được lưu trong Redis dưới dạng băm SHA-256 (`SHA256(otp + salt)`). Tuyệt đối không lưu plaintext OTP trong bộ nhớ cache hoặc log file.
   * Khóa Redis có dạng: `otp:recovery:{user_id}`, thiết lập thời gian tự hủy (TTL) chính xác là **300 giây (5 phút)**.
3. **BR-SEC-003 (Chống Brute-Force OTP & Giới hạn Thử sai):**
   * Người dùng chỉ được phép nhập sai mã OTP tối đa **3 lần**.
   * Đến lần thứ 3 nhập sai, mã OTP lập tức bị hủy trong Redis. Người dùng phải chờ hết 60 giây để yêu cầu gửi lại mã mới.
   * Nếu yêu cầu gửi lại mã quá 5 lần trong vòng 1 giờ, địa chỉ IP và tài khoản sẽ bị tạm khóa tính năng gửi OTP trong 2 giờ.
4. **BR-SEC-004 (Xác thực Ứng dụng TOTP RFC 6238):**
   * Secret Key của ứng dụng TOTP (Google/Microsoft Authenticator) được mã hóa bằng thuật toán **AES-256-GCM** trước khi lưu vào CSDL.
   * Hệ thống chấp nhận độ trễ thời gian (Clock Drift Window) tối đa $\pm 1$ bước thời gian (tức $\pm 30$ giây) để tránh lỗi lệch giờ giữa điện thoại người dùng và máy chủ.
5. **BR-SEC-005 (Quy trình Helpdesk Override Bắt buộc 2 Bước):**
   * Quản trị viên Helpdesk khi thực hiện Hủy 2FA hoặc Mở khóa tài khoản cho nhân sự bắt buộc phải chọn lý do hợp lệ và tích cam kết đã xác minh danh tính.
   * Hệ thống tự động ghi nhật ký kiểm toán không thể xóa (`IMMUTABLE`) vào bảng `auth_security_audit_logs`.

---

## 5. Đặc tả Hợp đồng API Phía Backend (Backend RESTful API Contracts)

---

### 5.1 API 1: Yêu cầu Khôi phục Mật khẩu & Gửi Mã OTP (`POST /api/v1/auth/forgot-password/request`)

* **Method:** `POST`
* **Path:** `/api/v1/auth/forgot-password/request`
* **Headers:** `Content-Type: application/json`, `CF-Turnstile-Token: <token>`
* **Request Body JSON:**
```json
{
  "identity": "admin.hr@vmogroup.com",
  "channel": "EMAIL", // "EMAIL", "SMS", "AUTHENTICATOR_APP"
  "turnstile_token": "0.cf-turnstile-token-sample..."
}
```
* **Response Body JSON (200 OK):**
```json
{
  "success": true,
  "status_code": 200,
  "message": "Mã xác thực khôi phục mật khẩu đã được gửi thành công",
  "data": {
    "session_id": "req_sess_9a8b7c6d-5555-4000-8000-000000000001",
    "channel": "EMAIL",
    "masked_target": "ad***@vmogroup.com",
    "expires_in_seconds": 300,
    "resend_cooldown_seconds": 60
  }
}
```

---

### 5.2 API 2: Xác thực Mã OTP hoặc Magic Link Token (`POST /api/v1/auth/forgot-password/verify-otp`)

* **Method:** `POST`
* **Path:** `/api/v1/auth/forgot-password/verify-otp`
* **Request Body JSON:**
```json
{
  "session_id": "req_sess_9a8b7c6d-5555-4000-8000-000000000001",
  "otp_code": "036459", // 6 chữ số
  "magic_link_token": null // Truyền token nếu xác thực qua click email
}
```
* **Response Body JSON (200 OK):**
```json
{
  "success": true,
  "status_code": 200,
  "message": "Mã xác thực chính xác. Vui lòng thiết lập mật khẩu mới",
  "data": {
    "reset_token": "rst_token_1a2b3c4d_signed_hmac_sha256...",
    "expires_in_seconds": 600
  }
}
```

---

### 5.3 API 3: Hoàn tất Thiết lập Mật khẩu Mới (`POST /api/v1/auth/forgot-password/commit-reset`)

* **Method:** `POST`
* **Path:** `/api/v1/auth/forgot-password/commit-reset`
* **Request Body JSON:**
```json
{
  "reset_token": "rst_token_1a2b3c4d_signed_hmac_sha256...",
  "new_password": "VmoEnterprise@2026",
  "revoke_all_sessions": true
}
```
* **Response Body JSON (200 OK):**
```json
{
  "success": true,
  "status_code": 200,
  "message": "Mật khẩu của bạn đã được cập nhật thành công. Vui lòng đăng nhập lại",
  "data": {
    "user_email": "admin.hr@vmogroup.com",
    "sessions_revoked": 4,
    "security_alert_sent": true
  }
}
```

---

### 5.4 API 4: Helpdesk Mở khóa Tài khoản Bị Lockout (`POST /api/v1/admin/security/users/{id}/unlock`)

* **Method:** `POST`
* **Path:** `/api/v1/admin/security/users/e4b3c2a1-0001-4000-8000-abcdef012345/unlock`
* **Headers:** `Authorization: Bearer <admin_token>`, `X-CSRF-Token: <csrf>`
* **Request Body JSON:**
```json
{
  "reason": "Nhân viên liên hệ xác minh trực tiếp tại quầy IT Support",
  "identity_verified": true,
  "send_notification_email": true
}
```
* **Response Body JSON (200 OK):**
```json
{
  "success": true,
  "status_code": 200,
  "message": "Tài khoản nhân viên Sarah Jenkins đã được mở khóa thành công",
  "data": {
    "user_id": "e4b3c2a1-0001-4000-8000-abcdef012345",
    "unlocked_at": "2026-10-21T14:45:00Z",
    "failed_attempts_reset": 0
  }
}
```

---

### 5.5 API 5: Helpdesk Đặt lại Thiết bị 2FA (`POST /api/v1/admin/security/users/{id}/reset-2fa`)

* **Method:** `POST`
* **Path:** `/api/v1/admin/security/users/e4b3c2a1-0001-4000-8000-abcdef012345/reset-2fa`
* **Request Body JSON:**
```json
{
  "reason": "LOST_DEVICE",
  "revoke_all_sessions": true,
  "send_re-enrollment_email": true
}
```
* **Response Body JSON (200 OK):**
```json
{
  "success": true,
  "status_code": 200,
  "message": "Đã hủy liên kết thiết bị 2FA cũ và gửi email kích hoạt lại mã mới cho nhân viên",
  "data": {
    "user_id": "e4b3c2a1-0001-4000-8000-abcdef012345",
    "previous_2fa_channel": "AUTHENTICATOR_APP",
    "status": "RE_ENROLLMENT_REQUIRED"
  }
}
```

---

## 6. Lược đồ Cơ sở Dữ liệu Quan hệ (PostgreSQL Database DDL)

```sql
-- ============================================================================
-- PHÂN HỆ QUẢN TRỊ 2FA, ĐẶT LẠI MẬT KHẨU & AN TOÀN TÀI KHOẢN (VMO ERP WEB ADMIN)
-- Lược đồ DDL PostgreSQL 15+
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BẢNG CẤU HÌNH XÁC THỰC 2 YẾU TỐ (USER_2FA_SETTINGS)
CREATE TYPE two_factor_channel_enum AS ENUM ('EMAIL', 'SMS', 'AUTHENTICATOR_APP', 'NONE');

CREATE TABLE user_2fa_settings (
    user_id UUID PRIMARY KEY REFERENCES employees(id) ON DELETE CASCADE,
    is_2fa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    preferred_channel two_factor_channel_enum NOT NULL DEFAULT 'EMAIL',
    totp_secret_encrypted TEXT, -- Khóa Secret TOTP mã hóa bằng AES-256-GCM
    totp_enrolled_at TIMESTAMP WITH TIME ZONE,
    backup_phone_number VARCHAR(20),
    recovery_email VARCHAR(150),
    backup_codes_hashed JSONB, -- Mảng 8 mã dự phòng băm SHA-256 [{"code_hash": "...", "is_used": false}]
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_2fa_status ON user_2fa_settings(is_2fa_enabled, preferred_channel);

-- 2. BẢNG THEO DÕI YÊU CẦU ĐẶT LẠI MẬT KHẨU (PASSWORD_RESET_REQUESTS)
CREATE TABLE password_reset_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    session_id VARCHAR(100) NOT NULL UNIQUE,
    channel two_factor_channel_enum NOT NULL,
    otp_hash VARCHAR(128) NOT NULL, -- SHA-256 của mã OTP 6 số + Salt
    magic_link_token_hash VARCHAR(128),
    ip_address VARCHAR(50) NOT NULL,
    user_agent TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_consumed BOOLEAN NOT NULL DEFAULT FALSE,
    failed_attempts INT NOT NULL DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pwd_reset_user_session ON password_reset_requests(user_id, session_id);
CREATE INDEX idx_pwd_reset_expiry ON password_reset_requests(expires_at) WHERE is_consumed = FALSE;

-- 3. BẢNG THEO DÕI KHÓA TÀI KHOẢN AN TOÀN (ACCOUNT_LOCKOUTS)
CREATE TABLE account_lockouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    lock_reason VARCHAR(100) NOT NULL, -- FAILED_PASSWORD, FAILED_OTP, SUSPICIOUS_IP
    failed_attempts_count INT NOT NULL DEFAULT 5,
    locked_from_ip VARCHAR(50) NOT NULL,
    is_locked BOOLEAN NOT NULL DEFAULT TRUE,
    locked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    locked_until TIMESTAMP WITH TIME ZONE NOT NULL,
    unlocked_by UUID REFERENCES employees(id), -- Null nếu tự động hết hạn, có UUID nếu Helpdesk mở
    unlocked_at TIMESTAMP WITH TIME ZONE,
    unlock_note TEXT
);

CREATE INDEX idx_account_lockout_active ON account_lockouts(user_id, is_locked);

-- 4. BẢNG CHÍNH SÁCH BẢO MẬT DOANH NGHIỆP (ENTERPRISE_SECURITY_POLICIES)
CREATE TABLE enterprise_security_policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    policy_name VARCHAR(100) NOT NULL UNIQUE,
    min_password_length INT NOT NULL DEFAULT 10,
    require_uppercase BOOLEAN NOT NULL DEFAULT TRUE,
    require_lowercase BOOLEAN NOT NULL DEFAULT TRUE,
    require_numbers BOOLEAN NOT NULL DEFAULT TRUE,
    require_special_chars BOOLEAN NOT NULL DEFAULT TRUE,
    prevent_previous_passwords_count INT NOT NULL DEFAULT 5,
    password_expiry_days INT NOT NULL DEFAULT 90, -- 0 là không hết hạn
    max_password_failed_attempts INT NOT NULL DEFAULT 5,
    max_otp_failed_attempts INT NOT NULL DEFAULT 3,
    lockout_duration_minutes INT NOT NULL DEFAULT 30,
    otp_ttl_seconds INT NOT NULL DEFAULT 300,
    otp_cooldown_seconds INT NOT NULL DEFAULT 60,
    enforce_2fa_roles VARCHAR(50)[] DEFAULT ARRAY['SUPER_ADMIN', 'HR_MANAGER', 'PMO', 'DEPT_LEAD'],
    updated_by UUID REFERENCES employees(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. BẢNG LỊCH SỬ MẬT KHẨU CŨ ĐỂ CHỐNG DÙNG LẠI (PASSWORD_HISTORY)
CREATE TABLE password_history (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    password_hash TEXT NOT NULL, -- Argon2id hash
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pwd_history_user ON password_history(user_id, created_at DESC);

-- 6. BẢNG NHẬT KÝ KIỂM TOÁN AN TOÀN BẢO MẬT & HELPDESK (AUTH_SECURITY_AUDIT_LOGS)
CREATE TABLE auth_security_audit_logs (
    id BIGSERIAL PRIMARY KEY,
    actor_id UUID REFERENCES employees(id), -- NULL nếu người dùng chưa đăng nhập tự khôi phục
    target_user_id UUID NOT NULL REFERENCES employees(id),
    event_type VARCHAR(100) NOT NULL, 
    -- FORGOT_PASSWORD_REQUESTED, OTP_VERIFIED, PASSWORD_RESET_SUCCESS, 
    -- ACCOUNT_LOCKED, HELPDESK_UNLOCK, HELPDESK_2FA_RESET, BACKUP_CODES_GENERATED
    status VARCHAR(30) NOT NULL, -- SUCCESS, FAILED, CHALLENGED
    ip_address VARCHAR(50) NOT NULL,
    user_agent TEXT,
    event_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_auth_audit_target_time ON auth_security_audit_logs(target_user_id, created_at DESC);
CREATE INDEX idx_auth_audit_event_type ON auth_security_audit_logs(event_type, created_at DESC);
```

---

## 7. Yêu cầu Phi chức năng & Tiêu chuẩn An toàn (NFR & Security)

1. **Chuẩn Mã hóa Mật khẩu & Bí mật:**
   * Mật khẩu mới được băm bằng thuật toán **Argon2id** (Memory: 64 MB, Iterations: 3, Parallelism: 4) kết hợp salt ngẫu nhiên 16 bytes.
   * Khóa TOTP Secret của Authenticator App được mã hóa đối xứng bằng **AES-256-GCM** với Master Key lưu trong HashiCorp Vault / AWS KMS.
2. **Kiểm soát Tốc độ & Giới hạn Tải (Rate Limiting via Redis Token Bucket):**
   * Giới hạn tối đa **5 yêu cầu gửi OTP / giờ** cho mỗi địa chỉ IP.
   * Giới hạn tối đa **3 yêu cầu gửi OTP / giờ** cho mỗi tài khoản email.
3. **Tuân thủ Chuẩn Trải nghiệm Người dùng & Khả năng Tiếp cận (Accessibility - WCAG 2.1 AA):**
   * Độ tương phản màu sắc của thanh đo độ mạnh mật khẩu và thông báo lỗi tối thiểu đạt tỷ lệ $4.5:1$.
   * Các ô nhập OTP có gắn thẻ `aria-label="Ô nhập mã xác thực số 1 đến 6"`, hỗ trợ đọc màn hình (Screen Reader) cho người khuyết tật.

---

## 8. Kế hoạch Kiểm thử & Tiêu chí Nghiệm thu (QA Acceptance Criteria)

| Mã Kịch bản | Tên Kịch bản Kiểm thử | Thao tác Thực hiện | Kết quả Kỳ vọng (Pass Criteria) |
| :--- | :--- | :--- | :--- |
| **TC_WEB_2FA_001** | Tự khôi phục qua Email thành công | Nhập email hợp lệ, bấm gửi mã, kiểm tra email và nhập đúng 6 số OTP `036459` | Hệ thống chuyển sang màn hình Đặt mật khẩu mới; thông báo xanh xác thực thành công. |
| **TC_WEB_2FA_002** | Dán chuỗi OTP (Paste Event) | Copy chuỗi `036459` từ clipboard và nhấn `Ctrl+V` vào ô đầu tiên | Cả 6 ô tự động được điền đủ 6 ký tự số; form tự động kích hoạt Submit mà không cần bấm nút. |
| **TC_WEB_2FA_003** | Khóa tài khoản khi nhập sai OTP quá 3 lần | Nhập sai OTP 3 lần liên tiếp | Ô nhập báo đỏ `Mã xác thực không chính xác`; đến lần 3 hệ thống hủy mã, hiển thị thông báo yêu cầu chờ 60 giây gửi lại. |
| **TC_WEB_2FA_004** | Kiểm tra chính sách mật khẩu trùng 5 lần cũ | Nhập mật khẩu trùng với mật khẩu của tháng trước | Hệ thống chặn lưu và thông báo lỗi: `Mật khẩu không được trùng với 5 mật khẩu gần nhất`. |
| **TC_WEB_2FA_005** | Helpdesk mở khóa tài khoản bị Lockout | Admin vào trang Quản trị An ninh, chọn tài khoản Sarah Jenkins (đang bị khóa), bấm `[ Mở khóa ngay ]` | Tài khoản chuyển trạng thái `[ Đang hoạt động ]`, bộ đếm thất bại reset về 0, nhân viên đăng nhập lại thành công. |
| **TC_WEB_2FA_006** | Helpdesk hủy 2FA khi nhân viên mất máy | Chọn `[ Đặt lại 2FA ]`, chọn lý do mất máy và xác nhận | Trạng thái 2FA của nhân viên chuyển thành `Yêu cầu kích hoạt lại`; toàn bộ phiên đăng nhập cũ trên máy bị mất lập tức bị ngắt kết nối. |
