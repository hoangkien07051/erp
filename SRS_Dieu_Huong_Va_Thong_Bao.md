# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)
## Module: Điều hướng & Trung tâm Thông báo (Navigation & Notification System)
### Phân hệ: Drawer Menu phân quyền, Thông báo đẩy (Push Notifications) & Bộ lọc

| Thông tin | Chi tiết |
| :--- | :--- |
| **Mã tài liệu** | `SRS_MOD_NAV_NOTI_001` |
| **Tên phân hệ** | Điều hướng & Trung tâm Thông báo (Navigation & Notifications) |
| **Dự án** | VMO ERP System |
| **Nền tảng** | iOS & Android (Mobile App) + Backend Notification Service |
| **Tệp thiết kế nguồn** | `ERP - App.fig` (Frame: `Sidebar/ Purple01`, `Sidebar/ Purple02`, `Sidebar/ Purple03`, `Thông báo`, `Lock screen Push Notification`, `Bộ lọc`) |
| **Phiên bản SRS** | 1.0 |
| **Ngày tạo** | 21/10/2026 |
| **Trạng thái** | Sẵn sàng triển khai (Ready for Dev/QA) |

---

## 1. Giới thiệu tổng quan phân hệ (Overview & Scope)

### 1.1 Mục đích tài liệu
Tài liệu này đặc tả chi tiết kiến trúc điều hướng ứng dụng (Navigation Drawer), cơ chế kiểm soát menu theo vai trò người dùng (Role-Based Access Control - RBAC), hệ thống thông báo đẩy thời gian thực (Push Notifications) và các bộ lọc tìm kiếm trên ứng dụng di động VMO ERP.

### 1.2 Danh mục các chức năng chi tiết
1. **Chức năng 1 (`SCR_NAV_001`):** Thanh điều hướng Menu trượt (Sidebar Navigation Drawer phân quyền theo vai trò).
2. **Chức năng 2 (`SCR_NOTI_001`):** Trung tâm Thông báo trong ứng dụng (In-app Notification Center).
3. **Chức năng 3 (`SCR_NOTI_002`):** Hệ thống Thông báo đẩy ngoài màn hình khóa (Push Notifications qua FCM / APNs).
4. **Chức năng 4 (`SCR_FILTER_001`):** Khung Bộ lọc nâng cao (Reusable Bottom Sheet Filter).

---

## 2. CHỨC NĂNG 1: THANH ĐIỀU HƯỚNG DRAWER MENU PHÂN QUYỀN (`SCR_NAV_001`)

### 2.1 Bố cục giao diện Mobile (Figma: `Sidebar/ Purple01`, `Purple02`, `Purple03`)

#### 2.1.1 Drawer Sidebar dành cho Nhân viên (Figma: Ảnh 1 - Màn 1)
```
+-------------------------------------------------+
|  +----------------------------------+           |
|  | (A)  Nguyen Van A                |           |
|  |      nguyenvanabc@vmodev.com     |           |
|  +----------------------------------+           |
|                                                 |
|  Hướng dẫn                                      |
|                                                 |
|  Thảo luận                                      |
|                                                 |
|  Nhân viên                                      |
|                                                 |
|  Dự án                                          |
|                                                 |
|  Ngày nghỉ                                      |
|                                                 |
|  +----------------------------------+           |
|  |  Chấm công (Active)              |           |
|  +----------------------------------+           |
|                                                 |
|  [Đăng xuất]                                    |
+-------------------------------------------------+
```

#### 2.1.2 Drawer Sidebar dành cho Quản trị viên / Admin (Figma: Ảnh chụp màn 3)
```
+-------------------------------------------------+
|  +----------------------------------+           |
|  | (A)  Admin             [⚙️ Setting]|           |
|  |      Admin@gmail.com             |           |
|  +----------------------------------+           |
|                                                 |
|  Hướng dẫn                                      |
|                                                 |
|  Thảo luận                                      |
|                                                 |
|  +----------------------------------+           |
|  |  Nhân viên (Active - Cam)        |           |
|  +----------------------------------+           |
|                                                 |
|  Dự án                                          |
|                                                 |
|  Ngày nghỉ                                      |
|                                                 |
|  Chấm công                                      |
|                                                 |
|  [Đăng xuất]                                    |
+-------------------------------------------------+
```
> Khi người dùng bấm chọn mục **"Nhân viên"**, menu được highlight nền cam và hệ thống điều hướng trực tiếp sang phân hệ **Danh bạ Cư dân VMO** (Xem chi tiết tại [SRS_Danh_Ba_Nhan_Vien_Cu_Dan_VMO.md](file:///Users/hoangkien/project/erp/SRS_Danh_Ba_Nhan_Vien_Cu_Dan_VMO.md)).

### 2.2 Quy tắc phân quyền hiển thị Menu (RBAC Policy)
* **Nhân viên thông thường (`EMPLOYEE`):** Hiển thị danh mục tiêu chuẩn và màn hình Dashboard Chấm công với 7 thẻ chức năng cơ bản.
* **Quản trị viên / Quản lý (`LEAD`, `PM`, `ADMIN`):** Hiển thị icon Cài đặt `[⚙️]` trên header Sidebar và mở khóa toàn bộ Dashboard Chấm công với **18 thẻ chức năng** phê duyệt đa cấp (ĐUL, PMO, CHRO).

---

## 3. CHỨC NĂNG 2 & 3: TRUNG TÂM THÔNG BÁO & THÔNG BÁO ĐẨY (`SCR_NOTI_001` & `SCR_NOTI_002`)

### 3.1 Bố cục Trung tâm thông báo (Figma: Ảnh 2 - Màn 6: `Thông báo`)
```
+-------------------------------------------------+
|  [Status Bar]                                   |
|  [≡]                Thông báo            [🔔 2] |
|                                                 |
|  Giải trình chấm công                           |
|  Bạn có 1 bản ghi chấm công ngày 20/12/2021     |
|  cần giải trình, Mã vi phạm: Quên chấm công     |
|  Thứ 2 09:00                                    |
|  ---------------------------------------------  |
|  Giải trình chấm công                           |
|  Bạn có 1 bản ghi chấm công ngày 20/12/2021     |
|  cần giải trình, Mã vi phạm: Muộn 8h36          |
|  Thứ 3 09:00                                    |
|  ---------------------------------------------  |
|  Giải trình chấm công                           |
|  Bạn có 1 bản ghi chấm công ngày 20/12/2021     |
|  cần giải trình, Mã vi phạm: M836              |
|  Thứ 4 09:00                                    |
|  ---------------------------------------------  |
|  Giải trình chấm công                           |
|  Bạn có 1 bản ghi chấm công ngày 20/12/2021     |
|  cần giải trình, Mã vi phạm: M836              |
|  Thứ 5 09:00                                    |
|  ---------------------------------------------  |
|  Giải trình chấm công                           |
|  Bạn có 1 bản ghi chấm công ngày 20/12/2021     |
|  cần giải trình, Mã vi phạm: M836              |
|  Thứ 6 09:00                                    |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

### 3.2 Bố cục Màn hình khóa có Push Notification iOS (Figma: Ảnh 1 - Màn 11)
```
+-------------------------------------------------+
|                      10:00                      |
|             Saturday, 21 September              |
|                                                 |
|  +-------------------------------------------+  |
|  | [VMO Logo] VMO ERP • 10m trước            |  |
|  | Giải trình chấm công - 13/09/2021          |  |
|  | Bạn có 1 bản ghi chấm công ngày 20/12/2021 |  |
|  | cần giải trình, Mã vi phạm: Quên chấm công |  |
|  +-------------------------------------------+  |
|                                                 |
|               Swipe up to open                  |
+-------------------------------------------------+
```

### 3.3 Ma trận Sự kiện & Thông báo (Notification Event Matrix)

| Mã sự kiện | Tiêu đề thông báo | Nội dung mẫu | Kênh gửi | Hành vi khi chạm vào thông báo (Deep Link) |
| :--- | :--- | :--- | :---: | :--- |
| `ATT_VIOLATION_M836` | Cảnh báo vi phạm chấm công | *"Bạn có 1 bản ghi chấm công ngày DD/MM cần giải trình (M836)."* | Push + In-app | Mở thẳng form `SCR_ATT_002` (Giải trình chấm công). |
| `LEAVE_STATUS_CHANGED` | Cập nhật đơn nghỉ phép | *"Đơn nghỉ phép ngày DD/MM của bạn đã được phê duyệt."* | Push + In-app | Mở chi tiết đơn xin nghỉ phép `SCR_LEAVE_001`. |
| `OT_APPROVED` | Cập nhật đơn làm thêm giờ | *"Đơn làm thêm giờ ngày DD/MM của bạn đã được duyệt."* | Push + In-app | Mở chi tiết đơn OT `SCR_OT_001`. |
| `MANAGER_PENDING_APPROVAL`| Có đơn mới cần duyệt | *"{Tên NV} đã gửi 1 đơn {Loại đơn} cần bạn phê duyệt."* | Push + In-app | Mở màn hình Phê duyệt quản lý tương ứng. |
| `COMPANY_ANNOUNCEMENT` | Thông báo từ công ty | *"{Tiêu đề thông báo chung từ phòng Hành chính}"* | In-app | Mở bài viết thông báo nội bộ. |

---

## 4. CHỨC NĂNG 4: BỘ LỌC CHUYÊN SÂU NÂNG CAO (`SCR_FILTER_001`)

### 4.1 Bộ lọc Ma trận Thời gian (Figma: Ảnh 1 - Màn 6 & Ảnh 5 - Màn 12)
Màn hình Bottom Sheet mở từ đáy phục vụ chọn mốc thời gian lọc dữ liệu:
```
+-------------------------------------------------+
|  [Status Bar]                                   |
|  [<]                 Bộ lọc                     |
|                                                 |
|  [X] Chọn khoảng thời gian                      |
|                                                 |
|  [X] Tháng                                      |
|  [X] Tháng 1      [ ] Tháng 7                   |
|  [ ] Tháng 2      [ ] Tháng 8                   |
|  [ ] Tháng 3      [ ] Tháng 9                   |
|  [ ] Tháng 4      [ ] Tháng 10                  |
|  [ ] Tháng 5      [ ] Tháng 11                  |
|  [ ] Tháng 6      [ ] Tháng 12                  |
|                                                 |
|  [ ] Quý                                        |
|  [ ] Quý 1        [ ] Quý 3                     |
|  [ ] Quý 2        [ ] Quý 4                     |
|                                                 |
|  [X] Năm: [ 2021                             ]  |
|                                                 |
|  +---------------------+ +--------------------+ |
|  |       HỦY BỎ        | |      ÁP DỤNG       | |
|  +---------------------+ +--------------------+ |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

### 4.2 Bộ lọc Tiêu chí chi tiết (Figma: Ảnh 1 - Màn 5)
```
+-------------------------------------------------+
|  [Status Bar]                                   |
|  [<]                 Bộ lọc                     |
|                                                 |
|  Chọn ứng viên/vị trí                           |
|  [ Tất cả                                   [v] ]|
|                                                 |
|  Từ ngày                   Đến ngày             |
|  [ dd/mm/yyyy        📅 ]  [ dd/mm/yyyy      📅 ]|
|                                                 |
|  Chi nhánh phòng                                |
|  [ Trung tâm PM Số 18                       [v] ]|
|                                                 |
|  Quản lý trực tiếp                              |
|  [ Nguyễn Quốc Anh                          [v] ]|
|                                                 |
|  Mã nhân viên                                   |
|  [ VMO1409                                    ] |
|                                                 |
|  Trạng thái giải trình                          |
|  [ Chờ phê duyệt                            [v] ]|
|                                                 |
|  +---------------------+ +--------------------+ |
|  |       HỦY BỎ        | |      ÁP DỤNG       | |
|  +---------------------+ +--------------------+ |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

---

## 5. Đặc tả Hợp đồng API phía Backend (Backend API Contracts)

### 5.1 API 1: Lấy danh sách thông báo của người dùng
* **Method:** `GET` | **Path:** `/api/v1/notifications?tab=ALL&page=1&limit=20`
* **Response 200 OK:**
```json
{
  "success": true,
  "code": 200,
  "data": {
    "unread_count": 3,
    "notifications": [
      {
        "id": 10540,
        "type": "ATT_VIOLATION_M836",
        "title": "Cảnh báo vi phạm chấm công",
        "message": "Bạn có 1 bản ghi chấm công ngày 20/12/2021 cần giải trình (Mã: M836).",
        "is_read": false,
        "deep_link": "vmoerp://attendance/explanation?record_id=88412",
        "created_at": "2021-12-20T09:20:00Z"
      }
    ]
  }
}
```

### 5.2 API 2: Đánh dấu thông báo đã đọc
* **Method:** `PATCH` | **Path:** `/api/v1/notifications/{id}/read`
* **Method:** `PATCH` | **Path:** `/api/v1/notifications/mark-all-read`

### 5.3 API 3: Cập nhật FCM Token của thiết bị phục vụ Push Notification
* **Method:** `PUT` | **Path:** `/api/v1/devices/fcm-token`
* **Request Body:**
```json
{
  "device_id": "9B1D6F2C-8E1A-4C7B-B4D8-7264A0184A29",
  "fcm_token": "eK8Z_1x9Q:APA91bF8v4..."
}
```

---

## 6. Lược đồ Cơ sở dữ liệu chuẩn hóa (PostgreSQL Schema DDL)

```sql
-- 1. Bảng lưu trữ thông báo người dùng (Notifications)
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'ATT_VIOLATION_M836', 'LEAVE_STATUS_CHANGED', 'OT_APPROVED', etc.
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    deep_link VARCHAR(512) NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read, created_at DESC);

-- 2. Bảng cấu hình tùy chọn thông báo (Notification Settings)
CREATE TABLE user_notification_settings (
    user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    notify_attendance_reminders BOOLEAN NOT NULL DEFAULT TRUE,
    notify_approval_updates BOOLEAN NOT NULL DEFAULT TRUE,
    notify_company_announcements BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
