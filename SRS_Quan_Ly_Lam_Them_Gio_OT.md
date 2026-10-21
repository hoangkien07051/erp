# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)
## Module: Quản lý Làm thêm giờ (Overtime / OT Management)
### Phân hệ: Đăng ký OT Khối Sản xuất & Backoffice, Phê duyệt, Báo cáo & Cấu hình Hệ số lương

| Thông tin | Chi tiết |
| :--- | :--- |
| **Mã tài liệu** | `SRS_MOD_OVERTIME_001` |
| **Tên phân hệ** | Quản lý Làm thêm giờ (Overtime Management) |
| **Dự án** | VMO ERP System |
| **Nền tảng** | iOS & Android (Mobile App) + Backend Microservices |
| **Tệp thiết kế nguồn** | `ERP - App.fig` (Frame: `Đăng kí làm thêm giờ`, `Tạo OT khối sản xuất - Người quản trị`, `Tạo OT Backoffice - Người quản trị`, `Phê duyệt OT- người quản trị`, `Báo cáo OT- Người quản trị`, `Cấu hình loại OT`, `Lý do OT`) |
| **Phiên bản SRS** | 1.0 |
| **Ngày tạo** | 21/10/2026 |
| **Trạng thái** | Sẵn sàng triển khai (Ready for Dev/QA) |

---

## 1. Giới thiệu tổng quan phân hệ (Overview & Scope)

### 1.1 Mục đích tài liệu
Tài liệu này đặc tả chi tiết toàn bộ yêu cầu giao diện (UI/UX), yêu cầu chức năng (FR), quy tắc tính giờ và tính hệ số lương tăng ca theo Bộ luật Lao động Việt Nam và quy chế VMO Holdings, đặc tả API và lược đồ CSDL cho cụm chức năng **Quản lý Làm thêm giờ (OT)** trên ứng dụng di động VMO ERP.

### 1.2 Danh mục các chức năng chi tiết
1. **Chức năng 1 (`SCR_OT_001`):** Đăng ký làm thêm giờ cá nhân (`Đăng kí làm thêm giờ`).
2. **Chức năng 2 (`SCR_OT_002`):** Quản lý tạo đơn OT tập thể Khối Sản xuất & Khối Backoffice (`Tạo OT khối sản xuất` & `Tạo OT Backoffice`).
3. **Chức năng 3 (`SCR_OT_003`):** Phê duyệt làm thêm giờ (`Phê duyệt OT- người quản trị`).
4. **Chức năng 4 (`SCR_OT_004`):** Báo cáo tổng hợp số giờ OT (`Báo cáo OT- Người quản trị`).
5. **Chức năng 5 (`SCR_OT_005`):** Cấu hình Hệ số lương OT & Danh mục lý do (`Cấu hình loại OT` & `Lý do OT`).

---

## 2. CHỨC NĂNG 1 & 2: ĐĂNG KÝ & TẠO ĐƠN LÀM THÊM GIỜ (`SCR_OT_001` & `SCR_OT_002`)

### 2.1 Bố cục giao diện Mobile (Figma: `Đăng kí làm thêm giờ` & `Tạo OT`)
```
+-------------------------------------------------+
|  [Status Bar: Time, Wifi, Battery]              |
|  [<]            Đăng ký làm thêm giờ (OT)       |
|                                                 |
|  Phân loại khối làm việc *                      |
|  (o) Khối Sản xuất (Dự án)   ( ) Khối Backoffice|
|                                                 |
|  Chọn Dự án tính cost OT *                      |
|  [ VMO ERP Mobile - Project 18             [v] ]|
|                                                 |
|  Hình thức áp dụng *                            |
|  (o) Cá nhân          ( ) Cả nhóm (Nhiều NV)    |
|                                                 |
|  Danh sách nhân sự tham gia OT *                |
|  [+] Thêm nhân viên (Đã chọn: 3 nhân sự)        |
|  - Vũ Thanh Tùng (VMO1409)                      |
|  - Trần Thị B (VMO1520)                         |
|  - Lê Văn C (VMO1602)                           |
|                                                 |
|  Ngày làm thêm giờ *                            |
|  [ 25/12/2021 (Thứ Bảy - Nghỉ cuối tuần)   📅 ] |
|  -> Hệ số lương áp dụng: 200% (Cuối tuần)       |
|                                                 |
|  Khung giờ làm việc *                           |
|  Từ giờ: [ 09:00 🕒 ]     Đến giờ: [ 18:00 🕒 ] |
|  Nghỉ giữa ca: [ 1.0 ] giờ                      |
|  -> Tổng số giờ OT tính lương: 8.0 giờ          |
|                                                 |
|  Hình thức hưởng chế độ *                       |
|  (o) Tính tiền lương tăng ca   ( ) Nghỉ bù      |
|                                                 |
|  Lý do OT *                                     |
|  [ Release phiên bản gấp theo yêu cầu KH   [v] ]|
|                                                 |
|  Kế hoạch & Nhiệm vụ chi tiết *                 |
|  +-------------------------------------------+  |
|  | Deploy production, test regression và fix |  |
|  | critical bugs trước 17h chiều thứ Bảy...  |  |
|  +-------------------------------------------+  |
|                                                 |
|  Người phê duyệt *                              |
|  [ Nguyễn Quốc Anh (anhnq2) - PM           [v] ]|
|                                                 |
|  +-------------------------------------------+  |
|  |                 GỬI ĐƠN                   |  |
|  +-------------------------------------------+  |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

### 2.2 Quy tắc tính hệ số lương OT theo Luật Lao động (Business Rules)
* **BR-OT-01 (Hệ số nhân lương theo ngày):**
  * **Làm thêm vào Ngày thường:** Hệ số nhân **`150%`** (1.5x đơn giá lương giờ).
  * **Làm thêm vào Ngày nghỉ cuối tuần (Thứ 7, CN):** Hệ số nhân **`200%`** (2.0x đơn giá lương giờ).
  * **Làm thêm vào Ngày Lễ, Tết, Ngày nghỉ có hưởng lương:** Hệ số nhân **`300%`** (3.0x đơn giá lương giờ, chưa kể tiền lương ngày lễ).
  * **Làm thêm vào Ban đêm (từ 22:00 hôm trước đến 06:00 sáng hôm sau):** Cộng thêm ít nhất **`30%`** đơn giá lương theo Điều 98 BLLĐ 2019.
* **BR-OT-02 (Giới hạn trần số giờ OT):**
  * Tối đa không quá **40 giờ/tháng**.
  * Tối đa không quá **200 giờ/năm** (hoặc 300 giờ/năm với khối sản xuất IT được sự phê duyệt của Ban Lãnh đạo).
  * Nếu đăng ký vượt hạn mức, hệ thống tự động cảnh báo đỏ cho PM và HR.
* **BR-OT-03 (Chính sách Nghỉ bù vs Tính tiền lương):**
  * Nhân viên có thể chọn hình thức `Nghỉ bù`: Số giờ OT sẽ được quy đổi vào quỹ ngày nghỉ bù có hưởng lương tương ứng.

---

## 3. CHỨC NĂNG 3: PHÊ DUYỆT LÀM THÊM GIỜ (`SCR_OT_003`)

### 3.1 Bố cục giao diện Mobile (Figma: `Phê duyệt OT- người quản trị`)
```
+-------------------------------------------------+
|  [Status Bar]                                   |
|  [<]             Phê duyệt OT             [Search]|
|                                                 |
|  [ Chờ duyệt (8) ]  [ Đã duyệt ]  [ Từ chối ]   |
|                                                 |
|  +-------------------------------------------+  |
|  | [Tag: Khối Sản xuất] Dự án VMO ERP Mobile |  |
|  | Ngày OT: 25/12/2021 (Thứ 7) - Hệ số: 200%  |  |
|  | Khung giờ: 09:00 - 18:00 (8.0 giờ)         |  |
|  | Số nhân sự tham gia: 3 nhân sự             |  |
|  | - Vũ Thanh Tùng (VMO1409)                  |  |
|  | - Trần Thị B (VMO1520)                     |  |
|  | - Lê Văn C (VMO1602)                       |  |
|  | Lý do: Release bản gấp theo yêu cầu KH     |  |
|  | Người tạo đơn: Nguyễn Quốc Anh - PM        |  |
|  |                                           |  |
|  |    [   TỪ CHỐI   ]       [   PHÊ DUYỆT   ]    |  |
|  +-------------------------------------------+  |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 3.1.1 Grid Dashboard Người quản trị gồm 18 thẻ chức năng (Figma: Ảnh 3 - Màn 2)
Cung cấp cổng điều hướng tập trung cho các cấp lãnh đạo (Lead, PM, ĐUL, PMO, CHRO):
```
+-------------------------------------------------+
|  [Status Bar]                                   |
|  [≡]               Chấm công             [🔔 2] |
|                                                 |
|  [🔍 Search                                 [v] ]|
|                                                 |
|  [ Icon 1 ]           [ Icon 2 ]                |
|  Chấm công            Phê duyệt chấm công       |
|                                                 |
|  [ Icon 3 ]           [ Icon 4 ]                |
|  Tổng quan ngày nghỉ  Xin nghỉ phép             |
|                                                 |
|  [ Icon 5 ]           [ Icon 6 ]                |
|  Quản lý ngày nghỉ    Yêu cầu OT khối sản xuất  |
|                                                 |
|  [ Icon 7 ]           [ Icon 8 ]                |
|  ĐUL phê duyệt SX     PMO phê duyệt SX          |
|                                                 |
|  [ Icon 9 ]           [ Icon 10 ]               |
|  CHRO phê duyệt OT    Yêu cầu OT Backoffice     |
|                                                 |
|  [ Icon 11 ]          [ Icon 12 ]               |
|  Phê duyệt OT BO      Yêu cầu On-site khối khác |
|                                                 |
|  [ Icon 13 ]          [ Icon 14 ]               |
|  ĐUL phê duyệt Onsite PMO phê duyệt Onsite      |
|                                                 |
|  [ Icon 15 ]          [ Icon 16 ]               |
|  Phê duyệt WFH/Onsite Yêu cầu WFH/Onsite        |
|                                                 |
|  [ Icon 17 ]          [ Icon 18 ]               |
|  Báo cáo chấm công    Báo cáo Overtime          |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

### 3.2 Quy tắc Phê duyệt OT
* **Điều kiện bắt buộc:** Đơn OT phải được tạo và phê duyệt **trước** khi thời gian làm việc thực tế diễn ra (hoặc muộn nhất là trong vòng 24 giờ sau khi kết thúc buổi làm thêm kèm lý do đột xuất).
* Khi duyệt: Hệ thống ghi nhận trạng thái `APPROVED`, đồng bộ dữ liệu sang phân hệ Chấm công và bảng tổng hợp lương tháng của Kế toán.

---

## 4. CHỨC NĂNG 4 & 5: BÁO CÁO OT & CẤU HÌNH LOẠI OT (`SCR_OT_004` & `SCR_OT_005`)

### 4.1 Báo cáo tổng hợp số giờ OT (`SCR_OT_004`)

#### 4.1.1 Bố cục Màn hình Danh sách nhân viên trong Báo cáo OT (Figma: Ảnh 3 - Màn 5)
```
+-------------------------------------------------+
|  [Status Bar]                                   |
|  [≡]                Tất cả OT            [🔔 2] |
|                                                 |
|  [🔍 Search                                 [v] ]|
|                                                 |
|  ADMIN                               [ Action v ]|
|                                                 |
|  ( ) Ian Chesnut - 0123                     [v] |
|      ian.chesnut@gmail.com                      |
|      Tester                                     |
|                                                 |
|  ( ) Jane Bonde - 0124                      [v] |
|      jane.bonde@gmail.com                       |
|      Tester                                     |
|                                                 |
|  ( ) Collins Jackson - 0125                 [v] |
|      collins.jackson@gmail.com                  |
|      Tester                                     |
|                                                 |
|  ( ) Rayanna Forbes - 0126                  [v] |
|      rayanna.forbes@gmail.com                   |
|      Tester                                     |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 4.1.2 Bố cục Màn hình xem chi tiết 1 bản ghi làm thêm giờ của nhân viên (Figma: Ảnh 3 - Màn 6)
Khi chạm vào mũi tên `[^]` mở rộng của một nhân viên trong danh sách:
```
+-------------------------------------------------+
|  [Status Bar]                                   |
|  [≡]                Tất cả OT            [🔔 2] |
|                                                 |
|  [🔍 Search                                 [v] ]|
|                                                 |
|  ADMIN                               [ Action v ]|
|                                                 |
|  ( ) Ian Chesnut - 0123                     [^] |
|      ian.chesnut@gmail.com                      |
|      Tester                                     |
|                                                 |
|  Bộ phận quản lý:        Global                 |
|  Tên dự án:              VMO227 - VMO ERP       |
|  Lý do OT:               OT3 - Low performance  |
|  Mô tả chi tiết lý do:   Khách hàng yêu cầu thêm|
|  KH Thanh toán:          [X]                    |
|  Ngày:                   27/09/2021             |
|  Thời gian bắt đầu:      17:30                  |
|  Thời gian kết thúc:     24:00                  |
|  Số giờ làm thêm:        06:30                  |
|  Phân loại:              Ngày làm việc          |
|  Thời gian quy đổi:      09:45                  |
|  PMO note:               Note                   |
|  Văn phòng làm việc:     TYTB                   |
|  Trạng thái phê duyệt:   Đã phê duyệt           |
|                                                 |
|  ( ) Collins Jackson - 0125                 [v] |
|  ( ) Rayanna Forbes - 0126                  [v] |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 4.1.3 Action Bottom Sheet Báo cáo OT (Figma: Ảnh 3 - Màn 7)
Khi Quản lý bấm nút `Action [v]`:
```
+-------------------------------------------------+
|                                                 |
|                 (Màn hình nền mờ)               |
|                                                 |
|  +-------------------------------------------+  |
|  |                 [ Thanh gạt ]             |  |
|  |  Action                                   |  |
|  |                                           |  |
|  |  (o) Tải xuống xlsx                       |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```

### 4.2 Cấu hình Hệ số lương OT & Danh mục lý do (`SCR_OT_005`)
* Figma: `Cấu hình loại OT` & `Lý do OT`.
* Cho phép Quản trị viên HR/C&B cấu hình:
  * Tên loại OT: Ngày thường, Nghỉ hàng tuần, Lễ Tết.
  * Hệ số lương: 1.5, 2.0, 3.0.
  * Danh mục lý do OT: `Khách hàng yêu cầu gấp`, `Fix bug critical production`, `Triển khai Go-live hệ thống`, `Khối văn phòng kiểm kê cuối năm`.

---

## 5. Đặc tả Hợp đồng API phía Backend (Backend API Contracts)

### 5.1 API 1: Tạo đơn làm thêm giờ (Cá nhân hoặc Cả nhóm)
* **Method:** `POST` | **Path:** `/api/v1/overtime/requests`
* **Request Body:**
```json
{
  "department_type": "PRODUCTION", // hoặc "BACKOFFICE"
  "project_id": 18,
  "ot_date": "2021-12-25",
  "start_time": "09:00:00",
  "end_time": "18:00:00",
  "break_hours": 1.0,
  "rate_multiplier": 2.0,
  "compensation_type": "PAYMENT", // hoặc "COMPENSATORY_LEAVE"
  "reason_id": "CLIENT_URGENT_RELEASE",
  "tasks_description": "Deploy production và test regression.",
  "user_ids": [1409, 1520, 1602],
  "approver_id": 412
}
```

### 5.2 API 2: Quản lý Phê duyệt / Từ chối đơn OT
* **Method:** `POST` | **Path:** `/api/v1/overtime/approvals/{id}/action`
* **Request Body:**
```json
{
  "action": "APPROVE", // hoặc "REJECT"
  "comment": "Đồng ý OT. Dự án nhớ hỗ trợ đồ ăn nhẹ cho team."
}
```

### 5.3 API 3: Lấy báo cáo tổng hợp giờ OT theo dự án / phòng ban
* **Method:** `GET` | **Path:** `/api/v1/overtime/reports?project_id=18&month=12&year=2021`
* **Response 200 OK:**
```json
{
  "success": true,
  "code": 200,
  "data": {
    "project_id": 18,
    "project_name": "VMO ERP Mobile",
    "total_ot_hours": 72.0,
    "total_ot_hours_150": 24.0,
    "total_ot_hours_200": 48.0,
    "total_ot_hours_300": 0.0,
    "members": [
      {
        "user_id": 1409,
        "employee_code": "VMO-1409",
        "full_name": "Vũ Thanh Tùng",
        "hours_150": 8.0,
        "hours_200": 16.0,
        "total_hours": 24.0
      }
    ]
  }
}
```

---

## 6. Lược đồ Cơ sở dữ liệu chuẩn hóa (PostgreSQL Schema DDL)

```sql
-- 1. Bảng cấu hình loại OT và hệ số lương
CREATE TABLE overtime_types (
    id VARCHAR(32) PRIMARY KEY, -- 'WEEKDAY_150', 'WEEKEND_200', 'HOLIDAY_300', 'NIGHT_EXTRA'
    name VARCHAR(128) NOT NULL,
    rate_multiplier NUMERIC(3, 2) NOT NULL, -- 1.50, 2.00, 3.00
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 2. Bảng đơn đăng ký làm thêm giờ (Overtime Requests)
CREATE TABLE overtime_requests (
    id BIGSERIAL PRIMARY KEY,
    creator_id BIGINT NOT NULL REFERENCES users(id),
    department_type VARCHAR(20) NOT NULL, -- 'PRODUCTION', 'BACKOFFICE'
    project_id BIGINT NULL,
    ot_date DATE NOT NULL,
    start_time TIME WITHOUT TIME ZONE NOT NULL,
    end_time TIME WITHOUT TIME ZONE NOT NULL,
    break_hours NUMERIC(3, 1) DEFAULT 1.0,
    total_hours NUMERIC(4, 2) NOT NULL,
    overtime_type_id VARCHAR(32) NOT NULL REFERENCES overtime_types(id),
    compensation_type VARCHAR(20) NOT NULL DEFAULT 'PAYMENT', -- 'PAYMENT', 'COMPENSATORY_LEAVE'
    reason_id VARCHAR(64) NOT NULL,
    tasks_description TEXT NOT NULL,
    approver_id BIGINT NOT NULL REFERENCES users(id),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'APPROVED', 'REJECTED'
    reviewer_comment TEXT NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ot_requests_date ON overtime_requests(ot_date, status);
CREATE INDEX idx_ot_requests_approver ON overtime_requests(approver_id, status);

-- 3. Bảng phân bổ thành viên tham gia OT (Hỗ trợ tạo đơn cả nhóm)
CREATE TABLE overtime_members (
    id BIGSERIAL PRIMARY KEY,
    overtime_request_id BIGINT NOT NULL REFERENCES overtime_requests(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id),
    actual_hours NUMERIC(4, 2) NULL, -- Giờ thực tế sau khi đối soát chấm công
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_ot_member UNIQUE (overtime_request_id, user_id)
);

CREATE INDEX idx_ot_members_user ON overtime_members(user_id);
```
