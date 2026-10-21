# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)
## Phân hệ: Quản Trị Chấm Công, Thời Gian Làm Việc & Thiết Bị Sinh Trắc Học trên Cổng Web Admin
### Module: Bảng Công Tổng Hợp Đa Chiều, Phê Duyệt Giải Trình Tập Trung, Điều Khiển Máy Chấm Công & Khóa Bảng Lương

| Thông tin | Chi tiết |
| :--- | :--- |
| **Mã tài liệu** | `SRS_WEB_ATTENDANCE_MASTER_001` |
| **Tên phân hệ** | Quản trị Chấm công, Thời gian làm việc & Thiết bị Sinh trắc học trên Web Admin |
| **Dự án** | VMO ERP System - Web Admin Management Portal |
| **Nền tảng** | Web Application (Desktop Browser: Chrome, Safari, Edge, Firefox) + Backend Attendance Microservices |
| **Tài liệu tham chiếu Mobile** | [SRS_Phan_Cham_Cong.md](file:///Users/hoangkien/project/erp/SRS_Phan_Cham_Cong.md), [SRS_Quan_Tri_Thong_Tin_Nhan_Su.md](file:///Users/hoangkien/project/erp/SRS_Quan_Tri_Thong_Tin_Nhan_Su.md), [SRS_Dieu_Huong_Va_Thong_Bao_Web_Admin.md](file:///Users/hoangkien/project/erp/SRS_Dieu_Huong_Va_Thong_Bao_Web_Admin.md) |
| **Tệp thiết kế nguồn** | `ERP - App.fig` (Các Frame Web Desktop: `Desktop - 2`, `Group 6889`, `Group 6890`, `Ngày nghỉ`, `ERP`) |
| **Độ phân giải chuẩn** | Desktop ($1440 \times 1024$, $1920 \times 1080$), Co giãn tối thiểu $1280 \times 800$, Tối ưu bảng tính siêu rộng |
| **Phiên bản SRS** | 1.0 (Chuẩn hóa toàn diện Bảng Ma trận Công 31 ngày, Bulk Approval, IoT Device Sync, Khóa Bảng Công & DDL) |
| **Ngày tạo** | 21/10/2026 |
| **Trạng thái** | Sẵn sàng triển khai (Ready for Dev/QA) |

---

## 1. Giới thiệu tổng quan phân hệ (Overview & Scope)

### 1.1 Mục đích tài liệu
Tài liệu này đặc tả toàn diện các yêu cầu giao diện người dùng (UI/UX), yêu cầu chức năng (FR), quy tắc nghiệp vụ tính công chuyên sâu (BR), kiến trúc xử lý dữ liệu sinh trắc học thời gian thực, hợp đồng API RESTful và lược đồ cơ sở dữ liệu quan hệ (PostgreSQL DDL) cho phân hệ **"Quản trị Chấm công, Thời gian làm việc & Thiết bị Sinh trắc học"** trên Cổng Web Admin của hệ thống VMO ERP.

Nếu trên ứng dụng Mobile, phân hệ Chấm công chủ yếu phục vụ nhân viên xem lịch công cá nhân và gửi đơn giải trình vi phạm đơn lẻ; thì trên **Cổng Web Admin Desktop**, đây là **Trung tâm Điều hành Thời gian & Dữ liệu Công chuẩn (Time & Attendance Command Center)** phục vụ Ban Giám đốc (BOD), Giám đốc Trung tâm PM (DUL), Quản lý Dự án (PM), Chuyên viên C&B/HR và Quản trị viên Kỹ thuật (IT Admin) nhằm:
1. Giám sát toàn diện bảng chấm công dạng ma trận (Spreadsheet Matrix 31 ngày) của toàn bộ 921+ nhân sự thuộc 81 đơn vị.
2. Xử lý tập trung các vi phạm chấm công (Mã M836, đi muộn, về sớm, quên quẹt thẻ) với cơ chế **Phê duyệt hàng loạt (Bulk Approval)**.
3. Điều khiển và đồng bộ nhật ký dữ liệu thô (Raw Biometric Logs) từ các trạm máy chấm công vân tay/khuôn mặt tại các tòa nhà (`IDMC 5`, `TTC 11`, `Keangnam`, `Đà Nẵng`, `Tokyo`) qua giao thức TCP/IP Port 4370.
4. Quản lý định biên WFH/On-site, cấu hình ca làm việc linh hoạt, chính sách phạt vi phạm và thực hiện **Khóa Bảng công hàng tháng (Timesheet Lock)** để chuyển giao số liệu sang phân hệ Tính lương (Payroll).

---

### 1.2 Bảng so sánh Kiến trúc: Mobile App vs. Web Admin

| Tiêu chuẩn So sánh | Ứng dụng Di động ([SRS_Phan_Cham_Cong.md](file:///Users/hoangkien/project/erp/SRS_Phan_Cham_Cong.md)) | Cổng Quản trị Web (`SRS_Quan_Ly_Cham_Cong_Web_Admin.md`) |
| :--- | :--- | :--- |
| **Đối tượng & Tác vụ** | Nhân viên xem công cá nhân, giải trình từng ngày, xem lịch tháng đơn giản. | HR, C&B, DUL, PMO quản trị dữ liệu công 921+ nhân sự, kiểm toán sai lệch, xử lý hàng loạt, chốt công tính lương. |
| **Bố cục Hiển thị** | Dạng Lịch tháng thu nhỏ + Danh sách cuộn dọc từng ngày ($375 \times 812$). | **Ma trận Bảng tính Đa chiều (Spreadsheet Grid $1440 \times 1024$ / $1920 \times 1080$):** Cố định cột thông tin nhân sự bên trái + 31 cột ngày + Cột tổng kết công/phạt bên phải, cuộn mượt mà Virtual DOM. |
| **Xử lý Giải trình & Bổ sung công** | Nộp từng đơn lẻ, xem trạng thái từng đơn. | **Trung tâm Xử lý Hàng loạt (Bulk Actions Hub):** Lọc toàn bộ đơn theo phòng ban/loại vi phạm, tích chọn nhiều đơn để duyệt/từ chối 1 chạm, đối soát ảnh chụp/vé xe trên Drawer. |
| **Đồng bộ Máy Chấm công (IoT)** | Chỉ cấu hình IP đơn lẻ hoặc tải file mẫu. | **Trung tâm Giám sát Thiết bị Trực tiếp:** Quản lý danh sách trạm máy chấm công đa tòa nhà, trạng thái Online/Offline, nút đồng bộ tức thời Push SDK, nạp file log DAT/Excel khi mất mạng. |
| **Quản trị WFH / On-site** | Tạo đơn WFH cá nhân, người quản lý duyệt đơn lẻ. | **Bảng Kế hoạch Định biên (Gantt/Calendar View):** Kiểm soát trần WFH tối đa 30% nhân sự/dự án, giám sát tỷ lệ tuân thủ giờ làm việc WFH toàn công ty. |
| **Quy trình Chốt công kỳ lương** | Chỉ nhận thông báo nhắc nhở khi sắp đến hạn. | **Wizard Khóa Bảng Công 3 Bước:** Rà soát sai lệch $\rightarrow$ Xác nhận phê duyệt cấp DUL $\rightarrow$ Ký điện tử Khóa bảng công (Timesheet Lock), ngăn chặn mọi sửa đổi và kết xuất bảng lương. |
| **Báo cáo & Phân tích** | Biểu đồ thanh cơ bản theo phòng ban. | **Heatmap & Attendance Analytics Dashboard:** Phân tích điểm nóng đi muộn theo thứ trong tuần, bảng xếp hạng chuyên cần, chi phí phạt vi phạm. |

---

## 2. Danh mục Chức năng Phân hệ Web Admin (Functional Scope)

```mermaid
graph TD
    A[CỔNG WEB ADMIN: QUẢN TRỊ CHẤM CÔNG & THỜI GIAN LÀM VIỆC] --> B[1. Bảng Ma trận Công Tháng Master Spreadsheet Grid]
    A --> C[2. Trung tâm Duyệt Giải trình & Bổ sung công Hàng loạt]
    A --> D[3. Quản lý Định biên WFH & Lịch On-site Khách hàng]
    A --> E[4. Trung tâm Điều khiển Thiết bị Sinh trắc học IoT & Raw Log]
    A --> F[5. Cấu hình Ca làm việc & Chính sách Phạt Vi phạm]
    A --> G[6. Quy trình Chốt & Khóa Bảng công Hàng tháng]
    A --> H[7. Dashboard Báo cáo Phân tích Chuyên cần & Heatmap]

    B --> B1[Grid 31 ngày: Ký hiệu công 1.0, 0.5, P, KL, WFH, M836]
    B --> B2[Sticky Columns: Mã NV, Tên, Bộ phận | Cột Tổng kết công]
    B --> B3[Bộ lọc Cây 81 đơn vị, Trụ sở & Xuất Excel mẫu C&B]

    C --> C1[Data Table gom toàn bộ vi phạm: Đi muộn M836, Quên quẹt thẻ]
    C --> C2[Thao tác Duyệt / Từ chối hàng loạt có nhập lý do chung]
    C --> C3[Drawer Đối soát Chi tiết: Ảnh vé xe, camera, lịch sử vi phạm]

    D --> D1[Lịch Gantt hiển thị tỷ lệ WFH theo từng Trung tâm PM]
    D --> D2[Cảnh báo tự động khi vượt trần quy định 30% WFH/ngày]

    E --> E1[Giám sát Trạng thái Máy chấm công: IDMC 5, TTC 11, Keangnam]
    E --> E2[Kích hoạt Đồng bộ Ngay qua Push SDK Port 4370 TCP/IP]
    E --> E3[Nạp file Raw Log (.dat, .xlsx) đối soát khi máy mất mạng]

    F --> F1[Cấu hình Ca chuẩn 8h30 - 18h00, Flexitime & Ca trực dự án]
    F --> F2[Chính sách ân hạn 15 phút, Khung trừ công mã M836]

    G --> G1[Wizard 3 bước: Rà soát sai lệch -> Phê duyệt DUL -> Khóa công]
    G --> G2[Bảo mật Checksum Hash ngăn chặn chỉnh sửa sau khi khóa]

    H --> H1[Biểu đồ nhiệt Heatmap tỷ lệ đi muộn theo các ngày trong tuần]
    H --> H2[Bảng xếp hạng Top vi phạm & Thống kê quỹ phạt nội bộ]
```

---

## 3. Đặc tả Chi tiết Giao diện Web Desktop (Wireframes & Screen Specs)

---

### MÀN HÌNH 1: BẢNG MA TRẬN CHẤM CÔNG THÁNG MASTER (`SCR_WEB_ATT_001`)
*Giao diện Spreadsheet Grid $1440 \times 1024$ / $1920 \times 1080$ px phục vụ HR và C&B kiểm toán dữ liệu công toàn diện.*

#### 3.1 Bản vẽ Giao diện Ma trận Bảng công Web Desktop
```
+---------------------------------------------------------------------------------------------------------------------------------------+
| [LOGO VMO]   Tổng quan    Nhân viên    [CHẤM CÔNG]*   Ngày nghỉ    Làm thêm giờ (OT)    Dự án    Bảo mật 2FA        [🔍] [🔔 2] (Admin v)|
+---------------------------------------------------------------------------------------------------------------------------------------+
| Trang chủ > Quản lý Thời gian > Bảng chấm công tổng hợp tháng 10/2026                                                21/10/2026 15:30  |
|                                                                                                                                       |
|  BẢNG CHẤM CÔNG TỔNG HỢP TOÀN DOANH NGHIỆP                         [ 🔄 Đồng bộ máy vân tay ] [ 📥 Nạp log file ] [ 📤 Xuất Excel v ] |
|  Kỳ công: Tháng 10/2026 (01/10/2026 - 31/10/2026) | Trạng thái: [ 🟢 ĐANG MỞ KỲ CÔNG ]                 [ 🔒 Khóa bảng công tháng ]     |
|                                                                                                                                       |
|  +---------------------------------------------------------------------------------------------------------------------------------+  |
|  | [All (921)]*  |  Trung Tâm PM 18 (45)  |  Khối Sản Xuất (720)  |  Phòng QA (42)  |  SWAT (18)  |  [⚠️ 28 Nhân sự có vi phạm chờ duyệt]|  |
|  +---------------------------------------------------------------------------------------------------------------------------------+  |
|                                                                                                                                       |
|  +-------------------------------------------------------------+ +--------------------+ +-------------------+ +--------------------+  |
|  | [🔍 Tìm kiếm theo tên, mã nhân viên, email...             ] | | [🏢 Cơ cấu 81 đơn vị]| | [ Trụ sở: Tất cả v] | | [ Trạng thái công]|  |
|  +-------------------------------------------------------------+ +--------------------+ +-------------------+ +--------------------+  |
|                                                                                                                                       |
|  Chú thích ký hiệu: [1.0] Đủ công  [0.5] Nửa công  [P] Nghỉ phép  [KL] Không lương  [WFH] Làm từ xa  [M] Đi muộn M836  [CN/T7] Cuối tuần|
|  +---------------------------------------------------------------------------------------------------------------------------------+  |
|  | [STICKY COLUMNS]   | NGÀY TRONG THÁNG (01 -> 31)                                           | TỔNG KẾT KỲ CÔNG THÁNG 10          |  |
|  | MÃ NV   | HỌ VÀ TÊN| 01| 02| 03| 04| 05| 06| 07| 08| 09| 10|...| 20| 21| 22|...| 30| 31| CÔNG CHUẨN| THỰC TẾ| MUỘN| PHÉP| WFH| CÔNG LƯƠNG|  |
|  +---------+----------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+-----------+--------+-----+-----+----+-----------+  |
|  | VMO0123 | Ian C.   |1.0|1.0|T7 |CN |1.0|1.0|1.0|1.0|1.0|T7 |...|M* |1.0|1.0|...|1.0|T7 |    22.0   |  21.5  |  2  | 1.0 | 2  |   22.0    |  |
|  |         | TT PM 18 |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   | (Ngày)    | (Ngày) |(lần)|     |    | (Chốt tính)|  |
|  +---------+----------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+-----------+--------+-----+-----+----+-----------+  |
|  | VMO0125 | Collins J|1.0|1.0|T7 |CN |1.0|WFH|1.0|1.0|1.0|T7 |...|1.0|1.0|1.0|...|1.0|T7 |    22.0   |  22.0  |  0  | 0.0 | 4  |   22.0    |  |
|  |         | TT PM 18 |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |           |        |     |     |    |           |  |
|  +---------+----------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+-----------+--------+-----+-----+----+-----------+  |
|  | VMO0088 | Sarah J. |1.0|1.0|T7 |CN |P  |P  |1.0|1.0|1.0|T7 |...|1.0|1.0|1.0|...|1.0|T7 |    22.0   |  20.0  |  0  | 2.0 | 0  |   22.0    |  |
|  |         | Phòng QA |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |           |        |     |     |    |           |  |
|  +---------+----------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+-----------+--------+-----+-----+----+-----------+  |
|  | VMO0412 | Alex M.  |1.0|1.0|T7 |CN |1.0|1.0|1.0|1.0|KL |T7 |...|1.0|1.0|1.0|...|1.0|T7 |    22.0   |  21.0  |  1  | 0.0 | 0  |   21.0    |  |
|  |         | SWAT     |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |           |        |     |     |    |           |  |
|  +---------------------------------------------------------------------------------------------------------------------------------+  |
|  Hiển thị 1 - 25 của 921 nhân sự                      | Số dòng: [25 v]                               [<] [1] [2] [3] ... [37] [>]    |
+---------------------------------------------------------------------------------------------------------------------------------------+
```

#### 3.2 Đặc tả Tương tác Ô Lưới Bảng tính (Cell Interaction UX)
* **Ký hiệu Ô ngày (Day Cell Formatting):**
  * `1.0` (Xanh lá cây nhạt `#F6FFED`): Làm đủ ca 8 tiếng.
  * `0.5` (Cam nhạt): Làm nửa ca (Sáng hoặc Chiều).
  * `M*` (Đỏ nhạt `#FFF1F0` có dấu sao): Đi muộn/Về sớm có vi phạm mã M836 đang chờ giải trình.
  * `P` (Tím nhạt): Nghỉ phép năm có lương đã được duyệt.
  * `KL` (Xám tro): Nghỉ không hưởng lương.
  * `WFH` (Xanh dương `#E6F7FF`): Làm việc tại nhà có phê duyệt.
  * `T7`, `CN` (Nền xám sọc): Ngày nghỉ cuối tuần thứ Bảy, Chủ Nhật.
* **Tương tác Nhấp đúp (Double-Click Cell):**
  * Nhấp đúp chuột vào bất kỳ ô ngày nào $\rightarrow$ Mở ngăn kéo trượt (Slide Drawer) hiển thị:
    * Giờ quét vân tay vào thực tế (Check-in: `08:36:12`).
    * Giờ quét vân tay ra thực tế (Check-out: `18:05:40`).
    * Tên máy chấm công ghi nhận: `Máy Tầng 8 - IDMC 5`.
    * Nút cho phép HR sửa công thủ công (Manual Override) kèm ô bắt buộc nhập lý do điều chỉnh để ghi log kiểm toán.

---

### MÀN HÌNH 2: TRUNG TÂM DUYỆT GIẢI TRÌNH & BỔ SUNG CÔNG HÀNG LOẠT (`SCR_WEB_ATT_002`)
*Giao diện giải quyết nút thắt lớn nhất của cấp Quản lý: Duyệt hàng chục giải trình cùng lúc chỉ với 1 cú nhấp chuột.*

#### 3.3 Bản vẽ Giao diện Duyệt Hàng loạt Vi phạm Chấm công ($1440 \times 1024$ px)
```
+-----------------------------------------------------------------------------------------------------------------------------+
|  TRUNG TÂM PHÊ DUYỆT GIẢI TRÌNH & BỔ SUNG CÔNG                                            [ ⚙️ Cấu hình quy tắc duyệt tự động ]|
+-----------------------------------------------------------------------------------------------------------------------------+
|  Đang có: 28 yêu cầu cần phê duyệt | Đã duyệt trong tháng: 142 | Bị từ chối: 8                                              |
|                                                                                                                             |
|  [X Đã chọn 3 yêu cầu] -> [ ✅ DUYỆT HÀNG LOẠT (3) ]   [ ❌ TỪ CHỐI HÀNG LOẠT (3) ]   [ ✉️ Yêu cầu bổ sung bằng chứng ]       |
|  +-----------------------------------------------------------------------------------------------------------------------+  |
|  | [X]| MÃ NV   | HỌ VÀ TÊN      | BỘ PHẬN      | NGÀY VI PHẠM| LOẠI YÊU CẦU    | NỘI DUNG GIẢI TRÌNH    | BẰNG CHỨNG | THAO TÁC |  |
|  +---+---------+----------------+--------------+-------------+-----------------+------------------------+------------+----------+  |
|  | [X]| VMO0123 | Ian Chesnut    | TT PM Số 18  | 20/10/2026  | Đi muộn (M836)  | Hỏng xe trên đường Duy | [📷 Ve_xe] | [👁][✅][❌]|  |
|  |   |         |                |              | (08:36:12)  | Muộn 6 phút     | Tân, có gửi ảnh vé sửa |            |          |  |
|  +---+---------+----------------+--------------+-------------+-----------------+------------------------+------------+----------+  |
|  | [X]| VMO0125 | Collins Jackson| TT PM Số 18  | 20/10/2026  | Quên chấm công  | Quên quẹt thẻ lúc ra   | [✉️ Xác nhận| [👁][✅][❌]|  |
|  |   |         |                |              | (Chiều về)  | Bổ sung ra 18:00| PM xác nhận làm đến 18h| của PM]    |          |  |
|  +---+---------+----------------+--------------+-------------+-----------------+------------------------+------------+----------+  |
|  | [X]| VMO0088 | Sarah Jenkins  | Phòng QA     | 19/10/2026  | Đi muộn (M836)  | Tắc đường hầm chui Lê  | [Không có] | [👁][✅][❌]|  |
|  |   |         |                |              | (08:42:00)  | Muộn 12 phút    | Văn Lương do mưa ngập  |            |          |  |
|  +---+---------+----------------+--------------+-------------+-----------------+------------------------+------------+----------+  |
|  | [ ]| VMO0412 | Alex Morgan    | SWAT         | 18/10/2026  | Quên chấm công  | Quên quẹt thẻ sáng     | [Không có] | [👁][✅][❌]|  |
|  |   |         |                |              | (Sáng vào)  | Bổ sung vào 8:30| Họp khẩn với khách JP  |            |          |  |
|  +---+---------+----------------+--------------+-------------+-----------------+------------------------+------------+----------+  |
+-----------------------------------------------------------------------------------------------------------------------------+
```

##### 3.4 Quy trình Phê duyệt Hàng loạt & Ghi đè Công (Bulk Approval Flow)
1. Cán bộ quản lý tích chọn các checkbox hợp lệ (Ví dụ: 3 nhân viên có lý do chính đáng và có ảnh chụp bằng chứng).
2. Nhấp nút **`[ ✅ DUYỆT HÀNG LOẠT ]`** $\rightarrow$ Hệ thống hiển thị Modal xác nhận nhanh: *"Bạn có chắc chắn muốn phê duyệt giải trình cho 3 nhân sự đã chọn? Công ngày tương ứng sẽ được tự động tính đủ 1.0"*.
3. Bấm **Xác nhận**:
   * Backend kích hoạt tiến trình xử lý hàng loạt trong CSDL.
   * Cập nhật `work_point` từ `0.0` hoặc `0.5` thành `1.0` (Đủ công hưởng lương).
   * Ký hiệu trên Bảng ma trận công đổi ngay lập tức sang màu xanh.
   * Gửi thông báo WebSocket tức thì tới ứng dụng di động của 3 nhân viên: *"Giải trình ngày DD/MM của bạn đã được phê duyệt"*.

---

### MÀN HÌNH 4: TRUNG TÂM ĐIỀU KHIỂN & ĐỒNG BỘ THIẾT BỊ MÁY CHẤM CÔNG IoT (`SCR_WEB_ATT_004`)
*Khắc phục hoàn toàn sự cố đứt gãy dữ liệu: Web Admin kết nối trực tiếp các trạm máy chấm công vân tay đa tòa nhà.*

#### 3.5 Bản vẽ Bảng Điều khiển Thiết bị Sinh trắc học & Đồng bộ Log
```
+-----------------------------------------------------------------------------------------------------------------------------+
|  QUẢN LÝ THIẾT BỊ CHẤM CÔNG & NHẬT KÝ SINH TRẮC HỌC (BIOMETRIC IoT CONSOLE)              [ + Thêm máy mới ] [ 📥 Nạp tệp DAT/XLSX ]|
+-----------------------------------------------------------------------------------------------------------------------------+
|  Tổng số thiết bị: 6 trạm máy | [🟢 5 Đang Online] | [🔴 1 Mất kết nối] | Lần đồng bộ tự động gần nhất: 15:30:00 (5 phút trước)   |
|                                                                                                                             |
|  DANH SÁCH TRẠM MÁY CHẤM CÔNG TOÀN HỆ THỐNG                                                                                 |
|  +-----------------------------------------------------------------------------------------------------------------------+  |
|  | TÊN THIẾT BỊ             | VỊ TRÍ LẮP ĐẶT | ĐỊA CHỈ IP & CỔNG   | GIAO THỨC  | TRẠNG THÁI | DỮ LIỆU ĐÃ LƯU | THAO TÁC     |  |
|  +--------------------------+----------------+---------------------+------------+------------+----------------+--------------+  |
|  | Máy 01 - IDMC5 Tầng 8    | IDMC 5 Cầu Giấy| 192.168.1.201:4370  | TCP/IP ZK  | [🟢 Online]| 1,420 bản ghi  | [🔄 Sync] [⚙️]|  |
|  | Máy 02 - IDMC5 Tầng 9    | IDMC 5 Cầu Giấy| 192.168.1.202:4370  | TCP/IP ZK  | [🟢 Online]| 980 bản ghi    | [🔄 Sync] [⚙️]|  |
|  | Máy 03 - TTC11 Tầng 11   | TTC Duy Tân    | 192.168.2.201:4370  | TCP/IP ZK  | [🟢 Online]| 2,150 bản ghi  | [🔄 Sync] [⚙️]|  |
|  | Máy 04 - Keangnam T72    | Landmark 72    | 192.168.3.201:4370  | TCP/IP ZK  | [🟢 Online]| 890 bản ghi    | [🔄 Sync] [⚙️]|  |
|  | Máy 05 - VP Đà Nẵng      | Hải Châu, ĐN   | 10.10.1.201:4370    | VPN Tunnel | [🟢 Online]| 450 bản ghi    | [🔄 Sync] [⚙️]|  |
|  | Máy 06 - TTC11 Cửa phụ   | TTC Duy Tân    | 192.168.2.205:4370  | TCP/IP ZK  | [🔴 Offline| 0 bản ghi mới  | [Kiểm tra IP]|  |
|  |                          |                |                     |            | (Mất mạng)]| (Chờ kết nối)  | [Nạp log tay]|  |
|  +-----------------------------------------------------------------------------------------------------------------------+  |
|                                                                                                                             |
|  NHẬT KÝ QUÉT VÂN TAY / KHUÔN MẶT MỚI NHẤT (STREAMING REALTIME RAW LOGS)                                                   |
|  +-----------------------------------------------------------------------------------------------------------------------+  |
|  | THỜI GIAN          | MÃ VÂN TAY | MÃ NV   | HỌ VÀ TÊN NHÂN VIÊN   | THIẾT BỊ GHI NHẬN        | KIỂU QUÉT   | KẾT QUẢ GHÉP |  |
|  +--------------------+------------+---------+-----------------------+--------------------------+-------------+--------------+  |
|  | 21/10/2026 15:34:12| 1023       | VMO0123 | Ian Chesnut           | Máy 01 - IDMC5 Tầng 8    | Quét Vân tay| [✅ Đã ghép] |  |
|  | 21/10/2026 15:33:50| 1025       | VMO0125 | Collins Jackson       | Máy 01 - IDMC5 Tầng 8    | Khuôn mặt 3D| [✅ Đã ghép] |  |
|  | 21/10/2026 15:30:10| 9999       | [Chưa gán]| Người lạ / Thử việc | Máy 03 - TTC11 Tầng 11   | Quét Vân tay| [⚠️ Chưa map]|  |
|  +-----------------------------------------------------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------------------------------------------------+
```

---

### MÀN HÌNH 6: QUY TRÌNH CHỐT & KHÓA BẢNG CÔNG THÁNG (`SCR_WEB_ATT_006`)
*Quy trình bắt buộc vào ngày 03 hàng tháng để chuyển giao dữ liệu công sang phân hệ Tính Lương.*

#### 3.6 Bản vẽ Wizard 3 Bước Khóa Bảng Công
```
+--------------------------------------------------------------------------------------------------+
|  QUY TRÌNH CHỐT & KHÓA BẢNG CHẤM CÔNG THÁNG 10/2026                                        [X]    |
+--------------------------------------------------------------------------------------------------+
|  Tiến độ: [1. Rà soát sai lệch]*  --->  [2. Đối soát phê duyệt DUL]  --->  [3. Ký số & Khóa bảng công]
|                                                                                                  |
|  KẾT QUẢ KIỂM TOÁN TỰ ĐỘNG TOÀN DOANH NGHIỆP:                                                    |
|  • Tổng số nhân sự tham gia tính công:     921 nhân sự                                           |
|  • Tổng số ngày công chuẩn trong tháng:    22.0 ngày                                             |
|  • Số nhân sự đã hoàn tất công hợp lệ:     918 nhân sự (99.7%)                                   |
|  • [⚠️ CẢNH BÁO]: Còn 3 nhân sự còn giải trình chưa được duyệt:                                  |
|    1. Alex Morgan (SWAT) - Quên chấm công ngày 18/10                                             |
|    2. Pham Duc Dan (Nhân sự) - Vi phạm M836 ngày 15/10                                           |
|    3. Le Van Cuong (TT 10) - Đơn WFH ngày 20/10                                                  |
|                                                                                                  |
|  Hành động xử lý đối với 3 trường hợp chưa duyệt *:                                              |
|  (o) Tự động tính 0 công đối với các ngày vi phạm chưa duyệt này                                 |
|  ( ) Tạm hoãn khóa để gửi thông báo khẩn cấp cho Quản lý trực tiếp xử lý trong 2 giờ             |
|                                                                                                  |
|  Mật khẩu xác nhận Quản trị viên C&B *:                                                          |
|  +--------------------------------------------------------------------------------------------+  |
|  | •••••••••••••••••••••••••••••••••••••••••••••••••••••                                  [👁] |  |
|  +--------------------------------------------------------------------------------------------+  |
|                                                                                                  |
|  [!] LƯU Ý BẢO MẬT: Sau khi khóa, toàn bộ dữ liệu công tháng 10/2026 sẽ được niêm phong chống sửa |
|      đổi (Read-only) và tự động sinh mã băm SHA-256 đối soát bảng lương.                         |
|                                                                                                  |
|  [ Hủy bỏ ]                                                                 [ 🔒 XÁC NHẬN KHÓA ] |
+--------------------------------------------------------------------------------------------------+
```

---

## 4. Đặc tả Quy tắc Nghiệp vụ Tính Công Chuyên Sâu (Business Rules - BR)

### 4.1 Bảng Quy tắc Tính Giờ & Xử phạt Vi phạm Chấm công

| Mã Vi phạm | Khung Thời gian Quét Thẻ | Mức Phạt & Trừ Công | Quy tắc Giải trình & Miễn phạt |
| :--- | :--- | :--- | :--- |
| **Đúng giờ (On-time)** | Check-in $\le$ 08:30:59 | Tính đủ $1.0$ công chuẩn. | Không cần giải trình. |
| **Ân hạn (Grace Period)** | 08:31:00 đến 08:45:00 | Tính đủ $1.0$ công chuẩn. | Tối đa 3 lần/tháng. Từ lần thứ 4 trở đi bị tính là vi phạm đi muộn. |
| **Đi muộn Mã M836** | 08:45:01 đến 09:00:00 | Trừ $0.25$ công nếu không giải trình. | Được phép nộp đơn giải trình. Nếu Quản lý duyệt: Tính đủ $1.0$ công. |
| **Đi muộn Nửa buổi** | 09:00:01 đến 12:00:00 | Trừ $0.5$ công (Tính nửa ngày làm việc). | Phải có đơn xin nghỉ phép nửa ngày hoặc đơn giải trình có phê duyệt của Giám đốc TT (DUL). |
| **Về sớm (Early Out)** | Check-out trước 17:30:00 | Trừ $0.5$ công nếu về sớm $> 30$ phút. | Phải có đơn xin về sớm hoặc giấy cử đi công tác. |
| **Quên Check-in hoặc Out** | Chỉ có 1 mốc giờ trong ngày | Tính $0.0$ công cả ngày. | Bắt buộc nộp đơn Bổ sung công kèm xác nhận của đồng nghiệp/quản lý trong vòng 48 giờ. |
| **Làm việc từ xa (WFH)** | Quẹt thẻ trên mobile theo GPS | Tính $1.0$ công nếu có đơn duyệt trước. | Đơn WFH nộp sau ngày làm việc sẽ bị hệ thống từ chối tự động. |

---

### 4.2 Thuật toán Ghép Cặp Log Sinh Trắc Học Tự Động (Biometric Pairing Algorithm)
1. **Thu thập Log thô:** Thiết bị ZKTeco đẩy bản ghi thô gồm: `{biometric_user_id, timestamp, device_id}`.
2. **Ánh xạ Nhân sự:** Tra cứu bảng `workforce_settings` để chuyển đổi `biometric_user_id = 1023` $\rightarrow$ `employee_id = VMO0123`.
3. **Ghép cặp In/Out:**
   * Lấy bản ghi sớm nhất trong khoảng `06:00 - 12:00` làm giờ Check-in thực tế.
   * Lấy bản ghi muộn nhất trong khoảng `12:01 - 23:59` làm giờ Check-out thực tế.
   * Toàn bộ các lần quẹt thẻ phụ ở giữa được lưu vào bảng lịch sử để tra cứu đối soát khi có khiếu nại.

---

## 5. Đặc tả Hợp đồng API Phía Backend (Backend RESTful API Contracts)

---

### 5.1 API 1: Lấy Bảng Ma Trận Công Tháng Master (`GET /api/v1/admin/attendance/monthly-matrix`)

* **Method:** `GET` | **Path:** `/api/v1/admin/attendance/monthly-matrix`
* **Query Parameters:**
  * `month` (int, required): Tháng tính công (Ví dụ: `10`).
  * `year` (int, required): Năm tính công (Ví dụ: `2026`).
  * `department_id` (uuid, optional): Lọc theo đơn vị trong cây 81 đơn vị.
  * `page` (int, default: 1), `limit` (int, default: 25).
* **Response Body JSON (200 OK):**
```json
{
  "success": true,
  "status_code": 200,
  "data": {
    "month": 10,
    "year": 2026,
    "standard_working_days": 22.0,
    "is_timesheet_locked": false,
    "items": [
      {
        "employee_id": "e4b3c2a1-0001-4000-8000-abcdef012345",
        "employee_code": "VMO0123",
        "full_name": "Ian Chesnut",
        "department_name": "Trung Tâm PM Số 18",
        "daily_records": {
          "2026-10-01": {"code": "1.0", "check_in": "08:28:10", "check_out": "18:02:15"},
          "2026-10-20": {"code": "M836", "check_in": "08:36:12", "check_out": "18:05:40", "has_pending_explanation": true}
        },
        "summary": {
          "standard_days": 22.0,
          "actual_work_days": 21.5,
          "late_count": 2,
          "leave_paid_days": 1.0,
          "wfh_days": 2,
          "final_payable_days": 22.0
        }
      }
    ]
  }
}
```

---

### 5.2 API 2: Phê Duyệt Giải Trình & Bổ Sung Công Hàng Loạt (`POST /api/v1/admin/attendance/explanations/bulk-action`)

* **Method:** `POST` | **Path:** `/api/v1/admin/attendance/explanations/bulk-action`
* **Request Body JSON:**
```json
{
  "action": "APPROVE", // "APPROVE" hoặc "REJECT"
  "explanation_ids": [
    "exp_9a8b7c6d-0001-4000-8000-000000000001",
    "exp_9a8b7c6d-0002-4000-8000-000000000002"
  ],
  "review_note": "Chấp thuận giải trình do sự cố giao thông ngập đường Duy Tân",
  "adjust_work_point_to": 1.0
}
```
* **Response Body JSON (200 OK):**
```json
{
  "success": true,
  "status_code": 200,
  "message": "Đã phê duyệt thành công 2 yêu cầu giải trình chấm công",
  "data": {
    "approved_count": 2,
    "updated_daily_records_count": 2
  }
}
```

---

### 5.3 API 3: Kích Hoạt Đồng Bộ Thiết Bị Sinh Trắc Học Trực Tiếp (`POST /api/v1/admin/attendance/devices/{id}/sync`)

* **Method:** `POST` | **Path:** `/api/v1/admin/attendance/devices/dev_001/sync`
* **Response Body JSON (200 OK):**
```json
{
  "success": true,
  "status_code": 200,
  "message": "Đồng bộ thiết bị thành công",
  "data": {
    "device_name": "Máy 01 - IDMC5 Tầng 8",
    "ip_address": "192.168.1.201",
    "new_raw_logs_downloaded": 142,
    "paired_records_count": 142,
    "sync_completed_at": "2026-10-21T15:35:10Z"
  }
}
```

---

### 5.4 API 4: Niêm Phong & Khóa Bảng Chấm Công Tháng (`POST /api/v1/admin/attendance/timesheets/lock`)

* **Method:** `POST` | **Path:** `/api/v1/admin/attendance/timesheets/lock`
* **Request Body JSON:**
```json
{
  "month": 10,
  "year": 2026,
  "admin_password": "VmoEnterprise@2026",
  "unresolved_action": "SET_ZERO", // Tự động trừ công các đơn chưa duyệt
  "notes": "Chốt bảng công tháng 10 chuyển phòng Kế toán tính lương kỳ 1"
}
```
* **Response Body JSON (200 OK):**
```json
{
  "success": true,
  "status_code": 200,
  "message": "Bảng chấm công tháng 10/2026 đã được niêm phong và khóa thành công",
  "data": {
    "lock_id": "lock_9a8b7c6d-202610-001",
    "locked_at": "2026-10-21T15:40:00Z",
    "total_headcount_locked": 921,
    "checksum_sha256": "8f4a7c2b5d9e1f3a6b8c9d0e2f4a6b8c9d0e2f4a6b8c9d0e2f4a6b8c9d0e2f4a"
  }
}
```

---

## 6. Lược đồ Cơ sở Dữ liệu Quan hệ (PostgreSQL Database DDL)

```sql
-- ============================================================================
-- PHÂN HỆ QUẢN TRỊ CHẤM CÔNG & SINH TRẮC HỌC (VMO ERP WEB ADMIN)
-- Lược đồ DDL PostgreSQL 15+
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BẢNG DANH MỤC CA LÀM VIỆC (WORK_SHIFTS)
CREATE TABLE work_shifts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shift_code VARCHAR(50) NOT NULL UNIQUE, -- SHIFT_STANDARD, SHIFT_FLEXI, SHIFT_NIGHT
    name VARCHAR(100) NOT NULL,
    start_time TIME NOT NULL DEFAULT '08:30:00',
    end_time TIME NOT NULL DEFAULT '18:00:00',
    break_start_time TIME NOT NULL DEFAULT '12:00:00',
    break_end_time TIME NOT NULL DEFAULT '13:30:00',
    grace_period_minutes INT NOT NULL DEFAULT 15, -- Số phút ân hạn đi muộn không trừ công
    standard_work_point NUMERIC(3, 2) NOT NULL DEFAULT 1.0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. BẢNG QUẢN LÝ THIẾT BỊ MÁY CHẤM CÔNG (ATTENDANCE_DEVICES)
CREATE TABLE attendance_devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_code VARCHAR(50) NOT NULL UNIQUE,
    device_name VARCHAR(100) NOT NULL,
    office_location VARCHAR(100) NOT NULL, -- IDMC 5, TTC 11, Keangnam
    ip_address VARCHAR(50) NOT NULL,
    port INT NOT NULL DEFAULT 4370,
    protocol VARCHAR(30) NOT NULL DEFAULT 'TCP_IP_ZKTECO',
    is_online BOOLEAN NOT NULL DEFAULT TRUE,
    last_sync_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. BẢNG LƯU TRỮ NHẬT KÝ THÔ TỪ MÁY CHẤM CÔNG (RAW_BIOMETRIC_LOGS)
CREATE TABLE raw_biometric_logs (
    id BIGSERIAL PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES attendance_devices(id),
    biometric_user_id VARCHAR(50) NOT NULL, -- ID người dùng trên máy vân tay
    punch_time TIMESTAMP WITH TIME ZONE NOT NULL,
    verify_type VARCHAR(30) DEFAULT 'FINGERPRINT', -- FINGERPRINT, FACE_3D, CARD, PASSWORD
    is_paired BOOLEAN NOT NULL DEFAULT FALSE,
    raw_payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_raw_logs_user_time ON raw_biometric_logs(biometric_user_id, punch_time);
CREATE INDEX idx_raw_logs_pairing ON raw_biometric_logs(is_paired) WHERE is_paired = FALSE;

-- 4. BẢNG BẢN GHI CÔNG NGÀY CHI TIẾT (DAILY_ATTENDANCE_RECORDS)
CREATE TYPE attendance_status_enum AS ENUM ('ON_TIME', 'LATE_M836', 'EARLY_OUT', 'HALF_DAY', 'LEAVE_PAID', 'LEAVE_UNPAID', 'WFH', 'ABSENT');

CREATE TABLE daily_attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    shift_id UUID NOT NULL REFERENCES work_shifts(id),
    actual_check_in TIMESTAMP WITH TIME ZONE,
    actual_check_out TIMESTAMP WITH TIME ZONE,
    working_hours NUMERIC(4, 2) DEFAULT 0.0,
    late_minutes INT DEFAULT 0,
    early_minutes INT DEFAULT 0,
    work_point NUMERIC(3, 2) NOT NULL DEFAULT 0.0, -- 1.0, 0.5, 0.0
    status attendance_status_enum NOT NULL DEFAULT 'ON_TIME',
    is_manual_override BOOLEAN NOT NULL DEFAULT FALSE,
    override_by UUID REFERENCES employees(id),
    override_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_emp_date UNIQUE(employee_id, attendance_date)
);

CREATE INDEX idx_daily_att_date ON daily_attendance_records(attendance_date, status);

-- 5. BẢNG ĐƠN GIẢI TRÌNH VI PHẠM & BỔ SUNG CÔNG (ATTENDANCE_EXPLANATIONS)
CREATE TYPE explanation_status_enum AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

CREATE TABLE attendance_explanations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    daily_record_id UUID NOT NULL REFERENCES daily_attendance_records(id) ON DELETE CASCADE,
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    explanation_type VARCHAR(50) NOT NULL, -- LATE_M836, FORGOT_CHECK_IN, FORGOT_CHECK_OUT
    reason TEXT NOT NULL,
    proof_image_urls TEXT[],
    suggested_check_in TIME,
    suggested_check_out TIME,
    status explanation_status_enum NOT NULL DEFAULT 'PENDING',
    approver_id UUID REFERENCES employees(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    review_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_explanations_status ON attendance_explanations(status, created_at);

-- 6. BẢNG NIÊM PHONG & KHÓA BẢNG CÔNG HÀNG THÁNG (MONTHLY_TIMESHEET_LOCKS)
CREATE TABLE monthly_timesheet_locks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    month INT NOT NULL,
    year INT NOT NULL,
    is_locked BOOLEAN NOT NULL DEFAULT TRUE,
    locked_by UUID NOT NULL REFERENCES employees(id),
    locked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    total_headcount INT NOT NULL DEFAULT 921,
    checksum_hash VARCHAR(128) NOT NULL, -- Mã SHA-256 niêm phong dữ liệu
    notes TEXT,
    CONSTRAINT uq_month_year_lock UNIQUE(month, year)
);
```

---

## 7. Yêu cầu Phi chức năng & Hiệu năng Cao (NFR & Performance)

1. **Hiệu năng Xử lý Ma trận Bảng tính (Spreadsheet Virtualization):**
   * Bảng ma trận 921 dòng $\times$ 31 cột ngày (hơn 28.000 ô dữ liệu) bắt buộc triển khai kỹ thuật **DOM Virtualization (Virtual Scrolling)** để đảm bảo tốc độ cuộn mượt mà đạt 60 FPS, thời gian render khởi đầu $\le 300$ ms.
2. **Tốc độ Ghép cặp Nhật ký Sinh trắc học (High-throughput Pairing):**
   * Tiến trình Backend ghép cặp 50.000 bản ghi thô từ máy vân tay vào bảng công ngày phải hoàn tất trong vòng $\le 3$ giây bằng Bulk Insert / Batch Processing.
3. **Toàn vẹn Dữ liệu Bảng Lương (Data Integrity & Cryptographic Seal):**
   * Khi bảng công được khóa, toàn bộ các bảng ghi công ngày của tháng đó bị kích hoạt cờ `READ_ONLY` ở cấp Trigger PostgreSQL; mọi câu lệnh `UPDATE` hoặc `DELETE` trái phép sẽ lập tức bị chặn lại.

---

## 8. Kế hoạch Kiểm thử & Tiêu chí Nghiệm thu (QA Acceptance Criteria)

| Mã Kịch bản | Tên Kịch bản Kiểm thử | Thao tác Thực hiện | Kết quả Kỳ vọng (Pass Criteria) |
| :--- | :--- | :--- | :--- |
| **TC_WEB_ATT_001** | Hiển thị Ma trận công tháng đúng ký hiệu | Chọn Tháng 10/2026 | Ma trận hiển thị đầy đủ 31 ngày; ngày có vi phạm đi muộn hiển thị mã `M*` đỏ; ngày phép hiển thị `P` tím; tổng kết cột công chuẩn xác. |
| **TC_WEB_ATT_002** | Phê duyệt hàng loạt 3 giải trình đi muộn | Chọn 3 nhân sự vi phạm M836, bấm `[ ✅ Duyệt hàng loạt ]` | Cả 3 ô ngày trên bảng ma trận chuyển tức thời từ đỏ `M*` sang xanh `1.0`; công hưởng lương của nhân viên tăng thêm đúng tỷ lệ. |
| **TC_WEB_ATT_003** | Kích hoạt đồng bộ máy chấm công trực tiếp | Bấm nút `[ 🔄 Đồng bộ ngay ]` trên trạm IDMC 5 Tầng 8 | Hệ thống kết nối TCP/IP port 4370, kéo về 142 bản ghi mới; hiển thị thông báo thành công xanh lá trong 2 giây. |
| **TC_WEB_ATT_004** | Nhấp đúp ô ngày để xem chi tiết quẹt thẻ | Double-click vào ô ngày 20/10 của Ian Chesnut | Drawer trượt ra hiển thị rõ giờ vào 08:36:12, giờ ra 18:05:40, trạm máy IDMC 5 và nút điều chỉnh công thủ công cho HR. |
| **TC_WEB_ATT_005** | Khóa bảng công tháng ngăn chặn sửa đổi | Admin thực hiện bước 3 trong Wizard và nhập mật khẩu xác nhận | Trạng thái đổi thành `[ 🔒 ĐÃ KHÓA BẢNG CÔNG ]`; toàn bộ nút sửa công và nộp đơn giải trình của tháng đó bị vô hiệu hóa hoàn toàn. |
| **TC_WEB_ATT_006** | Xuất Bảng công chuẩn Excel cho C&B | Bấm `[ 📤 Xuất Excel ]` $\rightarrow$ Chọn mẫu chi tiết C&B | Tệp Excel `Bang_Cham_Cong_T10_2026.xlsx` được tải về với đầy đủ định dạng màu, công thức cộng tổng và chữ ký số. |
