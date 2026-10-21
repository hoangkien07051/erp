# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)
## Module: Quản lý Nghỉ phép (Leave Management System)
### Phân hệ: Đơn xin nghỉ phép, Phê duyệt, Quản lý Quota & Cấp phát phép năm

| Thông tin | Chi tiết |
| :--- | :--- |
| **Mã tài liệu** | `SRS_MOD_LEAVE_001` |
| **Tên phân hệ** | Quản lý Nghỉ phép (Leave Management) |
| **Dự án** | VMO ERP System |
| **Nền tảng** | iOS & Android (Mobile App) + Backend Microservices |
| **Tệp thiết kế nguồn** | `ERP - App.fig` (Frame: `Xin nghỉ phép - Nhân viên`, `Phê duyệt nghỉ phép - Người quản trị`, `Tất cả nghỉ phép - người quản trị`, `Cấp phát nghỉ phép - Người quản trị`) |
| **Phiên bản SRS** | 1.0 |
| **Ngày tạo** | 21/10/2026 |
| **Trạng thái** | Sẵn sàng triển khai (Ready for Dev/QA) |

---

## 1. Giới thiệu tổng quan phân hệ (Overview & Scope)

### 1.1 Mục đích tài liệu
Tài liệu này đặc tả chi tiết các yêu cầu giao diện (UI/UX), yêu cầu chức năng (FR), quy tắc nghiệp vụ theo Bộ luật Lao động Việt Nam và quy chế nội bộ VMO Holdings, hợp đồng API và lược đồ CSDL cho cụm chức năng **Quản lý Nghỉ phép** trên ứng dụng di động VMO ERP.

### 1.2 Danh mục các chức năng chi tiết
1. **Chức năng 1 (`SCR_LEAVE_001`):** Đơn xin nghỉ phép cá nhân & Theo dõi Quota phép (`Xin nghỉ phép - Nhân viên`).
2. **Chức năng 2 (`SCR_LEAVE_002`):** Quản lý Phê duyệt nghỉ phép (`Phê duyệt nghỉ phép - Người quản trị`).
3. **Chức năng 3 (`SCR_LEAVE_003`):** Quản trị toàn bộ đơn nghỉ phép toàn công ty (`Tất cả nghỉ phép - người quản trị`).
4. **Chức năng 4 (`SCR_LEAVE_004`):** Cấp phát & Điều chỉnh hạn mức phép năm (`Cấp phát nghỉ phép - Người quản trị`).

---

## 2. CHỨC NĂNG 1: ĐƠN XIN NGHỈ PHÉP CỦA NHÂN VIÊN (`SCR_LEAVE_001`)

### 2.1 Bố cục giao diện Mobile (Figma: Ảnh 2 - Màn 1: `Xin nghỉ phép - Nhân viên`)
```
+-------------------------------------------------+
|  [Status Bar: Time, Wifi, Battery]              |
|  [≡]               Nghỉ phép             [🔔 2] |
|                                                 |
|  [🔍 Search                                 [v] ]|
|                                                 |
|  Ian Chesnut                         [ Action v]|
|                                                 |
|  Loại phép *                                    |
|  [ Nghỉ phép năm 2021                       [v] ]|
|                                                 |
|  Từ ngày *                 Đến ngày *           |
|  [ dd/mm/yyyy        📅 ]  [ dd/mm/yyyy      📅 ]|
|                                                 |
|  [X] Nửa ngày                                   |
|  Thời lượng: 0,00 Ngày (Link xanh)              |
|                                                 |
|  Mô tả                                          |
|  +-------------------------------------------+  |
|  | Type your message here                    |  |
|  |                                           |  |
|  +-------------------------------------------+  |
|                                                 |
|  +---------------------+ +--------------------+ |
|  |       HỦY BỎ        | |        LƯU         | |
|  +---------------------+ +--------------------+ |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 2.1.1 Action Bottom Sheet của Nhân viên (Figma: Ảnh 2 - Màn 2)
Khi nhân viên bấm nút `Action [v]`:
```
+-------------------------------------------------+
|                                                 |
|                 (Màn hình nền mờ)               |
|                                                 |
|  +-------------------------------------------+  |
|  |                 [ Thanh gạt ]             |  |
|  |  Action                                   |  |
|  |                                           |  |
|  |  (o) Chuyển về nháp                       |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```

#### 2.1.2 Bottom Sheet Chọn loại nghỉ phép (Figma: Ảnh 2 - Màn 3 & Ảnh 5 - Màn 7)
Khi chạm vào ô `Loại phép [v]`:
```
+-------------------------------------------------+
|                                                 |
|                 (Màn hình nền mờ)               |
|                                                 |
|  +-------------------------------------------+  |
|  |                 [ Thanh gạt ]             |  |
|  |  Loại nghỉ phép                           |  |
|  |                                           |  |
|  |  (o) Nghỉ phép năm 2021                   |  |
|  |                                           |  |
|  |  ( ) Nghỉ việc riêng không hưởng lương    |  |
|  |                                           |  |
|  |  ( ) Nghỉ ốm (hưởng BHXH)                 |  |
|  |                                           |  |
|  |  ( ) Nghỉ thai sản                        |  |
|  |                                           |  |
|  |  ( ) Nghỉ cưới                            |  |
|  |                                           |  |
|  |  ( ) Nghỉ việc hiếu                       |  |
|  |                                           |  |
|  |  ( ) Nghỉ phép năm 2020                   |  |
|  |                                           |  |
|  |  [ Tìm kiếm thêm... / Đang áp dụng ]      |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```

#### 2.1.3 Calendar Range Picker Modal (Figma: Ảnh 2 - Màn 5)
Khi chạm vào icon lịch `[📅]` ở trường Từ ngày hoặc Đến ngày:
```
+-------------------------------------------------+
|                                                 |
|                 (Màn hình nền mờ)               |
|                                                 |
|  +-------------------------------------------+  |
|  |  < <                May 2021          > > |  |
|  |                                           |  |
|  |  Mon  Tue  Wed  Thu  Fri   Sat   Sun      |  |
|  |   27   28   29   30    1     2     3      |  |
|  |    4    5    6    7    8     9    10      |  |
|  |   11   12   13   14   15    16    17      |  |
|  |   18   19   20   21  [22]  [23]   24      |  |
|  |   25   26   27   28   29    30    31      |  |
|  |    1    2    3    4    5     6     7      |  |
|  |                                           |  |
|  |  +------------------+ +----------------+  |  |
|  |  |       NOW        | |       OK       |  |  |
|  |  +------------------+ +----------------+  |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```
* **Đặc tả tương tác:**
  * Cho phép chọn ngày bắt đầu và ngày kết thúc (khoảng thời gian bôi cam `[22] - [23]`).
  * `[ NOW ]`: Chọn nhanh ngày hiện tại.
  * `[ OK ]`: Áp dụng khoảng ngày đã chọn vào form và tính toán lại `Thời lượng` ngày nghỉ.

### 2.2 Danh mục các loại nghỉ phép chuẩn (Leave Types)

| Mã loại | Tên loại nghỉ phép | Chế độ hưởng lương | Trừ quỹ phép năm | Giới hạn & Quy định |
| :--- | :--- | :---: | :---: | :--- |
| `ANNUAL_LEAVE` | **Nghỉ phép năm** | 100% lương | **Có** | Trừ vào quỹ phép khả dụng. Nếu hết phép, hệ thống cảnh báo và gợi ý chuyển sang Nghỉ không lương. |
| `UNPAID_LEAVE` | **Nghỉ không lương** | 0% lương | **Không** | Không trừ phép năm, trừ ngày công tính lương trong tháng. |
| `SICK_LEAVE` | **Nghỉ ốm đau** | Hưởng BHXH | **Không** | Bắt buộc đính kèm Giấy ra viện / Giấy chứng nhận nghỉ việc hưởng BHXH (C65-HD). |
| `MATERNITY_LEAVE`| **Nghỉ thai sản** | Hưởng BHXH | **Không** | Nghỉ sinh con (6 tháng) hoặc nghỉ khám thai theo chế độ Luật BHXH. |
| `WEDDING_LEAVE` | **Nghỉ kết hôn** | 100% lương | **Không** | Nhân viên kết hôn: Nghỉ 3 ngày; Con kết hôn: Nghỉ 1 ngày (Hưởng nguyên lương theo BLLĐ Điều 115). |
| `FUNERAL_LEAVE` | **Nghỉ tang chế** | 100% lương | **Không** | Tứ thân phụ mẫu, vợ/chồng, con mất: Nghỉ 3 ngày (Hưởng nguyên lương). |

### 2.3 Quy tắc tính số ngày nghỉ (Business Rules)
* **BR-LEAVE-01 (Loại trừ ngày cuối tuần và ngày lễ):**
  $$\text{Số ngày nghỉ thực tế} = \sum_{\text{Từ ngày}}^{\text{Đến ngày}} (\text{Ngày làm việc trong tuần}) - (\text{Ngày lễ quốc gia})$$
  * Tự động bỏ qua Thứ Bảy và Chủ Nhật (trừ trường hợp nhân viên dự án có lịch làm việc cuối tuần được cấu hình riêng).
* **BR-LEAVE-02 (Cảnh báo vượt Quỹ phép):**
  * Nếu `Số ngày đăng ký > Quỹ phép khả dụng`, hệ thống hiển thị cảnh báo đỏ và ngăn không cho gửi đơn: *"Số ngày nghỉ vượt quá số ngày phép năm còn lại (Còn lại: X ngày). Vui lòng chọn loại Nghỉ không lương."*
* **BR-LEAVE-03 (Thời hạn gửi đơn trước):**
  * Nghỉ $\le 1$ ngày: Gửi trước tối thiểu 01 ngày làm việc.
  * Nghỉ $> 3$ ngày: Gửi trước tối thiểu 03 ngày làm việc để PM bố trí nhân sự thay thế.

---

## 3. CHỨC NĂNG 2: QUẢN LÝ PHÊ DUYỆT NGHỈ PHÉP (`SCR_LEAVE_002`)

### 3.1 Bố cục giao diện Mobile (Figma: Ảnh 5 - Màn 1: `Phê duyệt nghỉ phép - Người quản trị`)
```
+-------------------------------------------------+
|  [Status Bar]                                   |
|  [≡]           Phê duyệt nghỉ phép       [🔔 2] |
|                                                 |
|  [🔍 Search                                 [v] ]|
|                                                 |
|  ADMIN                               [ Action v ]|
|                                                 |
|  21/12/2021                                     |
|  Nhân viên:            Ian Chesnut - 0123       |
|  Từ ngày:              21/12/2021 09:00         |
|  Đến ngày:             21/12/2021 17:30         |
|  Loại phép:            Nghỉ phép năm 2021       |
|  Thời lượng:           1.0 Ngày                 |
|  Trạng thái:           [ Chờ phê duyệt ]        |
|  +---------------------+ +--------------------+ |
|  |       TỪ CHỐI       | |     PHÊ DUYỆT      | |
|  +---------------------+ +--------------------+ |
|                                                 |
|  20/12/2021                                     |
|  Nhân viên:            Jane Bonde - 0124        |
|  Trạng thái:           [ Đã phê duyệt (Xanh) ]  |
|  +-------------------------------------------+  |
|  |                  TỪ CHỐI                  |  |
|  +-------------------------------------------+  |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 3.1.1 Action Bottom Sheet trong Phê duyệt nghỉ phép (Figma: Ảnh 5 - Màn 2)
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
|  |  ( ) Tạo mới                              |  |
|  |                                           |  |
|  |  (o) Tải xuống xlsx                       |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```

### 3.2 Quy tắc Phê duyệt & Tác động hệ thống
* **Khi bấm [PHÊ DUYỆT]:**
  1. Trạng thái đơn chuyển thành `APPROVED`.
  2. Hệ thống trừ ngay số ngày nghỉ vào Quỹ phép năm của nhân viên (`used_days += X`, `remaining_days -= X`).
  3. Tự động đồng bộ sang **Bảng chấm công cá nhân (`SCR_ATT_001`)**: Ngày nghỉ được gắn cờ `LEAVE_APPROVED`, hiển thị màu tím trên lịch, tính đủ công hưởng lương mà không báo lỗi vắng mặt.
  4. Bắn Push Notification báo tin vui về máy nhân viên.
* **Khi bấm [TỪ CHỐI]:**
  * Bắt buộc nhập lý do từ chối (tối thiểu 10 ký tự). Trả lại số ngày phép tạm khóa.

---

## 4. CHỨC NĂNG 3 & 4: QUẢN TRỊ TẤT CẢ NGHỈ PHÉP & CẤP PHÁT PHÉP NĂM (`SCR_LEAVE_003` & `004`)

### 4.1 Quản trị tất cả đơn nghỉ phép (`SCR_LEAVE_003`)

#### 4.1.1 Form Tạo đơn nghỉ phép phân cấp tổ chức (Figma: Ảnh 5 - Màn 3 đến 6)
Dành cho Quản lý / HR tạo hộ đơn cho nhân viên thuộc chi nhánh hoặc đơn vị:
```
+-------------------------------------------------+
|  [Status Bar]                                   |
|  [≡]             Tất cả nghỉ phép        [🔔 2] |
|                                                 |
|  [🔍 Search                                 [v] ]|
|                                                 |
|  ADMIN                               [ Action v ]|
|                                                 |
|  Loại phép *                                    |
|  [ Nghỉ phép năm 2021                       [v] ]|
|                                                 |
|  Từ ngày *                 Đến ngày *           |
|  [ dd/mm/yyyy        📅 ]  [ dd/mm/yyyy      📅 ]|
|                                                 |
|  [X] Nửa ngày                                   |
|  Thời lượng: 0,00 Ngày (Link xanh)              |
|                                                 |
|  Mô tả                                          |
|  +-------------------------------------------+  |
|  | Type your message here                    |  |
|  +-------------------------------------------+  |
|                                                 |
|  Tên công ty *                                  |
|  [ VMO Holdings                             [v] ]|
|                                                 |
|  Đơn vị *                                       |
|  [ Trung tâm PM Số 18                       [v] ]|
|                                                 |
|  Nhân viên *                                    |
|  [ Ian Chesnut - 0123                       [v] ]|
|                                                 |
|  +---------------------+ +--------------------+ |
|  |       HỦY BỎ        | |        LƯU         | |
|  +---------------------+ +--------------------+ |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 4.1.2 Các Bottom Sheet lựa chọn phân cấp (Figma: Ảnh 5 - Màn 8, 9, 10, 11)
1. **Bottom Sheet Chọn Tên công ty (Màn 8):**
   * `(o) VMO Holdings`
   * `( ) VMO Japan`
   * `( ) Công ty Cổ phần Công nghệ VMO`
2. **Bottom Sheet Chọn Đơn vị phòng ban (Màn 10):**
   * `(o) Trung tâm PM Số 18`
   * `( ) Khối kinh doanh`
   * `( ) [VMO] Trung tâm kinh doanh`
   * `( ) Khối phát triển năng lực`
   * `( ) Global`
   * `( ) BackOffice`
3. **Bottom Sheet Chọn Nhân viên (Màn 9):**
   * `(o) Ian Chesnut - 0123`
   * `( ) Jane Bonde - 0124`
   * `( ) Collins Jackson - 0125`
   * `( ) Rayanna Forbes - 0126`
4. **Action Bottom Sheet Quản trị (Màn 11):**
   * `(o) Duyệt`
   * `( ) Từ chối`
   * `( ) Chuyển về nháp`

#### 4.1.3 Bộ lọc Nghỉ phép đa chiều (Figma: Ảnh 5 - Màn 12 & 13)
* **Bộ lọc Ma trận Thời gian (Màn 12):**
  * Checkbox các Tháng: `[X] Tháng 1`, `[ ] Tháng 2` ... `[ ] Tháng 12`.
  * Checkbox các Quý: `[ ] Quý 1`, `[ ] Quý 2`, `[ ] Quý 3`, `[ ] Quý 4`.
  * Checkbox Năm: `[X] 2021`.
* **Bộ lọc Tiêu chí nâng cao (Màn 13):**
  * Chọn `Đối tượng` (Cá nhân / Phòng ban / Toàn công ty).
  * Chọn `Loại phép` (Nghỉ phép năm, Nghỉ không lương, Nghỉ ốm...).
  * `Ngày gửi đơn từ` - `Đến ngày`.
  * `Ngày phê duyệt`.
  * `Trạng thái`: `Tất cả` / `Chờ duyệt` / `Đã duyệt` / `Từ chối`.
  * Nút `[ Hủy bỏ ]` và `[ Áp dụng ]`.

### 4.2 Cấp phát & Quản lý Hạn mức phép năm (`SCR_LEAVE_004`)
* Figma: `Cấp phát nghỉ phép - Người quản trị`.
* **Quy chuẩn cấp phát phép năm VMO Holdings:**
  * **Phép tiêu chuẩn:** Mỗi năm làm việc đủ 12 tháng được hưởng **12 ngày phép năm**. Nhân viên làm chưa đủ năm được tính tỷ lệ: 1 tháng làm việc = 1 ngày phép.
  * **Phép thâm niên:** Cứ mỗi **05 năm làm việc liên tục** tại VMO Holdings được cộng thêm **01 ngày phép** vào quỹ phép năm hàng năm.
  * **Thời hạn chuyển tiếp phép cũ (Carry-forward policy):** Phép năm cũ (2021) được phép sử dụng kéo dài đến hết ngày **31/03/2022**. Sau thời điểm này, số ngày phép cũ chưa dùng sẽ tự động hết hạn và xóa khỏi quỹ khả dụng.

---

## 5. Đặc tả Hợp đồng API phía Backend (Backend API Contracts)

### 5.1 API 1: Lấy thông tin quỹ phép & lịch sử đơn nghỉ phép cá nhân
* **Method:** `GET` | **Path:** `/api/v1/leaves/my-summary?year=2021`
* **Response 200 OK:**
```json
{
  "success": true,
  "code": 200,
  "data": {
    "quota": {
      "year": 2021,
      "standard_days": 12.0,
      "seniority_days": 2.0,
      "carried_over_days": 0.0,
      "total_entitled_days": 14.0,
      "used_days": 5.5,
      "pending_days": 1.0,
      "available_days": 7.5
    },
    "history": [
      {
        "id": 9012,
        "leave_type": "ANNUAL_LEAVE",
        "start_date": "2021-12-27",
        "end_date": "2021-12-27",
        "duration_days": 1.0,
        "reason": "Về quê giải quyết việc gia đình",
        "status": "APPROVED",
        "approver_name": "Nguyễn Quốc Anh"
      }
    ]
  }
}
```

### 5.2 API 2: Tạo đơn xin nghỉ phép
* **Method:** `POST` | **Path:** `/api/v1/leaves/requests`
* **Request Body:**
```json
{
  "leave_type": "ANNUAL_LEAVE",
  "start_date": "2021-12-27",
  "start_period": "ALL_DAY",
  "end_date": "2021-12-27",
  "end_period": "ALL_DAY",
  "reason": "Gia đình có việc riêng cần về quê xử lý.",
  "handover_user_id": 558,
  "approver_id": 412,
  "cc_user_ids": [558, 601],
  "attachment_urls": []
}
```

### 5.3 API 3: Quản lý Duyệt / Từ chối đơn nghỉ phép
* **Method:** `POST` | **Path:** `/api/v1/leaves/approvals/{id}/action`
* **Request Body:**
```json
{
  "action": "APPROVE", // hoặc "REJECT"
  "comment": "Đồng ý cho nghỉ. Nhớ bàn giao công việc đầy đủ."
}
```

---

## 6. Lược đồ Cơ sở dữ liệu chuẩn hóa (PostgreSQL Schema DDL)

```sql
-- 1. Bảng cấu hình danh mục loại nghỉ phép
CREATE TABLE leave_types (
    id VARCHAR(32) PRIMARY KEY, -- 'ANNUAL_LEAVE', 'UNPAID_LEAVE', 'SICK_LEAVE', etc.
    name VARCHAR(128) NOT NULL,
    is_paid BOOLEAN NOT NULL DEFAULT TRUE,
    deduct_from_annual_quota BOOLEAN NOT NULL DEFAULT FALSE,
    max_days_per_year NUMERIC(4, 1) NULL,
    requires_attachment BOOLEAN NOT NULL DEFAULT FALSE
);

-- 2. Bảng hạn mức phép năm của từng nhân viên (Leave Quota Allocations)
CREATE TABLE leave_allocations (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    year INT NOT NULL,
    standard_days NUMERIC(4, 1) NOT NULL DEFAULT 12.0,
    seniority_days NUMERIC(4, 1) NOT NULL DEFAULT 0.0,
    carried_over_days NUMERIC(4, 1) NOT NULL DEFAULT 0.0,
    carried_over_expires_at DATE NOT NULL, -- Thường là ngày 31/03 năm kế tiếp
    used_days NUMERIC(4, 1) NOT NULL DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_leave_year UNIQUE (user_id, year)
);

CREATE INDEX idx_leave_allocations_user ON leave_allocations(user_id, year);

-- 3. Bảng đơn xin nghỉ phép (Leave Requests)
CREATE TABLE leave_requests (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    leave_type_id VARCHAR(32) NOT NULL REFERENCES leave_types(id),
    start_date DATE NOT NULL,
    start_period VARCHAR(10) NOT NULL DEFAULT 'ALL_DAY', -- 'ALL_DAY', 'MORNING', 'AFTERNOON'
    end_date DATE NOT NULL,
    end_period VARCHAR(10) NOT NULL DEFAULT 'ALL_DAY',
    total_days NUMERIC(4, 1) NOT NULL,
    reason TEXT NOT NULL,
    handover_user_id BIGINT NULL REFERENCES users(id),
    approver_id BIGINT NOT NULL REFERENCES users(id),
    attachment_urls JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'
    reviewer_comment TEXT NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leave_requests_user ON leave_requests(user_id, start_date);
CREATE INDEX idx_leave_requests_approver ON leave_requests(approver_id, status);

-- 4. Bảng nhật ký kiểm toán nghỉ phép (Audit Trail)
CREATE TABLE audit_leave_logs (
    id BIGSERIAL PRIMARY KEY,
    actor_id BIGINT NOT NULL REFERENCES users(id),
    leave_request_id BIGINT NOT NULL REFERENCES leave_requests(id) ON DELETE CASCADE,
    action_type VARCHAR(50) NOT NULL, -- 'SUBMIT', 'APPROVE', 'REJECT', 'CANCEL'
    details JSONB NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
