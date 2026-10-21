# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)
## Module: Quản lý Nhân sự & Danh bạ Cư dân VMO (VMO Citizen & Employee Directory)
### Phân hệ: Danh bạ Cư dân VMO, Bộ lọc Cơ cấu Tổ chức, Chi tiết Nhân sự & Lưu trữ Hồ sơ

| Thông tin | Chi tiết |
| :--- | :--- |
| **Mã tài liệu** | `SRS_MOD_EMPLOYEE_DIRECTORY_001` |
| **Tên phân hệ** | Danh bạ Cư dân VMO & Quản lý Nhân sự (Employee Directory) |
| **Dự án** | VMO ERP System |
| **Nền tảng** | iOS & Android (Mobile App) + Backend API Microservices |
| **Tệp thiết kế nguồn** | `ERP - App.fig` (Các màn hình: `Nhân viên - Cư dân VMO`, `Nhân viên - Bộ lọc`, `Người quản trị - Cư dân VMO`, `Action Lưu trữ`) |
| **Phiên bản SRS** | 1.0 (Chuẩn hóa 100% theo bản vẽ Figma) |
| **Ngày tạo** | 21/10/2026 |
| **Trạng thái** | Sẵn sàng triển khai (Ready for Dev/QA) |

---

## 1. Giới thiệu tổng quan phân hệ (Overview & Scope)

### 1.1 Mục đích tài liệu
Tài liệu này đặc tả chi tiết toàn bộ yêu cầu giao diện người dùng (UI/UX), yêu cầu chức năng (FR), quy tắc nghiệp vụ (BR), đặc tả hợp đồng API phía Backend, lược đồ cơ sở dữ liệu (PostgreSQL Schema DDL) và các yêu cầu phi chức năng (NFR) cho phân hệ **"Danh bạ Cư dân VMO" (Employee Directory)** trên ứng dụng di động VMO ERP. Phân hệ phục vụ toàn bộ 921+ nhân viên và cấp quản trị tra cứu thông tin nhân sự, kết nối nội bộ và quản trị lưu trữ hồ sơ.

### 1.2 Danh mục các chức năng chi tiết
1. **Chức năng 1 (`SCR_EMP_001`):** Màn hình Danh sách Cư dân VMO (`Nhân viên - Cư dân VMO`).
2. **Chức năng 2 (`SCR_EMP_002`):** Màn hình Bộ lọc Cơ cấu Tổ chức đa cấp (`Nhân viên - Bộ lọc`).
3. **Chức năng 3 (`SCR_EMP_003`):** Màn hình Chi tiết Thông tin Nhân viên (`Người quản trị - Cư dân VMO`).
4. **Chức năng 4 (`SCR_EMP_004`):** Quản trị Lưu trữ Hồ sơ Nhân sự (`Action Lưu trữ`).

---

## 2. Đặc tả chi tiết từng màn hình (Screen-by-Screen Specifications)

---

### MÀN HÌNH 1: DANH SÁCH CƯ DÂN VMO (`SCR_EMP_001`)

#### 2.1 Bố cục giao diện Mobile (Figma: `Nhân viên - Cư dân VMO`)
```
+-------------------------------------------------+
|  [Status Bar: Time, Wifi, Battery]              |
|  [≡]               Cư dân VMO            [🔔 2] |
|                                                 |
|  +-------------------------------------------+  |
|  | [🔍 Search                               ] |  |
|  +-------------------------------------------+  |
|  [ Nút mở Bộ lọc: Ⴘ ]                           |
|                                                 |
|  ALL                                 [ Action v ]|
|                                                 |
|  +-------------------------------------------+  |
|  | Nhân viên:          Ian Chesnut - 0123    |  |
|  | Bộ phận:            Trung Tâm PM Số 18    |  |
|  | Cấp bậc:            Nhân Viên             |  |
|  | Vị trí làm việc:    Tester                |  |
|  | Văn phòng làm việc: IDMC 5                |  |
|  | Giới tính:          Nam                   |  |
|  | Quê quán:           Việt Nam              |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  | Nhân viên:          Collins Jackson - 0125|  |
|  | Bộ phận:            Trung Tâm PM Số 18    |  |
|  | Cấp bậc:            Nhân Viên             |  |
|  | Vị trí làm việc:    Tester                |  |
|  | Văn phòng làm việc: IDMC 5                |  |
|  | Giới tính:          Nam                   |  |
|  | Quê quán:           Việt Nam              |  |
|  +-------------------------------------------+  |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 2.2 Đặc tả các thành phần giao diện & Tương tác
1. **Header:**
   * Icon menu Hamburger `[≡]`: Chạm vào mở thanh điều hướng Sidebar Drawer (Mục `Nhân viên` được highlight màu cam).
   * Tiêu đề trung tâm: **`Cư dân VMO`** (Font Bold, căn giữa).
   * Icon Chuông thông báo `[🔔 2]`: Hiển thị badge số thông báo chưa đọc, chạm vào chuyển sang Trung tâm thông báo.
2. **Thanh tìm kiếm (Search Bar):**
   * Placeholder: `Search`.
   * Hỗ trợ tìm kiếm realtime theo: Họ và tên nhân viên, Mã nhân viên (`0123`), Vị trí công việc (`Tester`), Email hoặc Số điện thoại.
3. **Nút Bộ lọc (Filter Button `[ Ⴘ ]`):**
   * Đặt cạnh thanh tìm kiếm. Chạm vào mở Màn hình Bộ lọc Cơ cấu Tổ chức (`SCR_EMP_002`).
4. **Sub-header `ALL [ Action v ]`:**
   * Hiển thị nhóm đang xem (Mặc định `ALL` hoặc tên phòng ban đang chọn trong bộ lọc).
   * Nút `Action [v]`: Cung cấp các thao tác danh sách:
     * Chế độ Cư dân thường: Xuất danh bạ sang Excel (`(*) Tải xuống xlsx`).
     * Chế độ Quản trị HR: Tạo mới, Nạp tập tin, Tải xuống xlsx.
5. **Thẻ nhân viên (Employee Card) - 2 Chế độ hiển thị:**
   * **Chế độ Nhân viên thông thường (7 trường):** Họ tên, Bộ phận, Cấp bậc, Vị trí làm việc, Văn phòng làm việc, Giới tính, Quê quán.
   * **Chế độ Người quản trị (9 trường chuyên sâu - Figma: Ảnh mới Screen 5):**
     * Nhân viên: `Ian Chesnut - 0123`
     * Bộ phận: `Trung Tâm PM Số 18`
     * Cấp bậc: `Nhân Viên`
     * Vị trí làm việc: `Tester`
     * Văn phòng làm việc: `IDMC 5`
     * Giới tính: `Nam`
     * Ngày sinh: `dd/mm/yyyy`
     * Quê quán: `Việt Nam`
     * TT hôn nhân: `Độc thân`
   * Chạm vào bất kỳ thẻ nhân viên nào: Điều hướng sang Màn hình Chi tiết Thông tin Nhân viên (`SCR_EMP_003`).

#### 2.3 Bố cục Action Bottom Sheet Tải xuống xlsx (Figma: Ảnh mới Screen 6)
Khi người dùng bấm vào nút `[ Action v ]` trên danh bạ Cư dân VMO:
```
+-------------------------------------------------+
|                 (Màn hình nền mờ)               |
|  +-------------------------------------------+  |
|  |                 [ Thanh gạt ]             |  |
|  |  Action                                   |  |
|  |                                           |  |
|  |  (*) Tải xuống xlsx                       |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```
* Khi chọn `(*) Tải xuống xlsx`, hệ thống tự động xuất tệp danh bạ `.xlsx` theo danh sách bộ lọc hiện tại và gửi đường dẫn tải về máy thiết bị.

---

### MÀN HÌNH 2: BỘ LỌC CƠ CẤU TỔ CHỨC ĐA CẤP (`SCR_EMP_002`)

#### 3.1 Bố cục giao diện Mobile (Figma: `Nhân viên - Bộ lọc`)
Màn hình mở toàn trang hiển thị cây cơ cấu phòng ban và số lượng nhân sự trực thuộc:

```
+-------------------------------------------------+
|  [Status Bar]                                   |
|  [<]                 Bộ lọc              [🔔 2] |
|                                                 |
|  (o) All                                    921 |
|                                                 |
|  ( ) BOD                                      8 |
|                                                 |
|  ( ) Coordinator Center                       4 |
|                                                 |
|  ( ) External Resources                      54 |
|                                                 |
|  ( ) Global                                  19 |
|      ( ) Design                               6 |
|      ( ) ERP                                  3 |
|      ( ) Fresher                              6 |
|      ( ) VMO Ambassador                       4 |
|                                                 |
|  ( ) Operation                                4 |
|                                                 |
|  ( ) Phòng BA                                20 |
|                                                 |
|  ( ) Phòng Hành Chính                        12 |
|                                                 |
|  ( ) Phòng Kinh Doanh                        21 |
|                                                 |
|  ( ) Phòng Nhân Sự                           20 |
|      ( ) C&B                                  3 |
|      ( ) Tuyển Dụng                          14 |
|      ( ) Đào Tạo                              3 |
|                                                 |
|  ( ) Phòng PMO                               12 |
|                                                 |
|  ( ) Phòng QA                                 7 |
|                                                 |
|  ( ) Phòng Truyền Thông                       6 |
|                                                 |
|  +---------------------+ +--------------------+ |
|  |       HỦY BỎ        | |      ÁP DỤNG       | |
|  +---------------------+ +--------------------+ |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 3.2 Từ điển Danh mục Cơ cấu Phòng ban chuẩn Figma

| Tên khối / Phòng ban | Mã phòng ban | Cấp bậc | Số lượng nhân sự (Figma) | Ghi chú nghiệp vụ |
| :--- | :--- | :---: | :---: | :--- |
| **All** | `ALL` | 0 | **921** | Toàn bộ nhân viên VMO Holdings. |
| **BOD** | `BOD` | 1 | **8** | Ban Tổng Giám đốc (Board of Directors). |
| **Coordinator Center** | `COORD_CTR` | 1 | **4** | Trung tâm Điều phối dự án. |
| **External Resources** | `EXT_RES` | 1 | **54** | Nhân sự cộng tác / Outsource ngoài. |
| **Global** | `GLOBAL` | 1 | **19** | Khối Toàn cầu & Phát triển thị trường ngoại: |
| - *Design* | `GLOBAL_DESIGN` | 2 | 6 | Team UI/UX Designer. |
| - *ERP* | `GLOBAL_ERP` | 2 | 3 | Đội ngũ triển khai ERP nội bộ. |
| - *Fresher* | `GLOBAL_FRESHER`| 2 | 6 | Lực lượng Fresher/Thực tập sinh. |
| - *VMO Ambassador* | `GLOBAL_AMB` | 2 | 4 | Đại sứ thương hiệu & văn hóa. |
| **Operation** | `OPERATION` | 1 | **4** | Khối Vận hành. |
| **Phòng BA** | `DEPT_BA` | 1 | **20** | Phân tích nghiệp vụ (Business Analyst). |
| **Phòng Hành Chính** | `DEPT_ADMIN` | 1 | **12** | Hành chính văn phòng & Lễ tân. |
| **Phòng Kinh Doanh** | `DEPT_SALES` | 1 | **21** | Sales & Business Development. |
| **Phòng Nhân Sự** | `DEPT_HR` | 1 | **20** | Khối Quản trị Nguồn nhân lực: |
| - *C&B* | `HR_CB` | 2 | 3 | Tiền lương, Chấm công & Đãi ngộ. |
| - *Tuyển Dụng* | `HR_RECRUIT` | 2 | 14 | Thu hút nhân tài (Talent Acquisition). |
| - *Đào Tạo* | `HR_TRAIN` | 2 | 3 | Đào tạo & Nâng cao năng lực. |
| **Phòng PMO** | `DEPT_PMO` | 1 | **12** | Ban Quản lý Dự án (Project Management Office). |
| **Phòng QA** | `DEPT_QA` | 1 | **7** | Đảm bảo chất lượng quy trình (Quality Assurance). |
| **Phòng Truyền Thông** | `DEPT_MARCOM`| 1 | **6** | Marketing & Truyền thông nội bộ. |

---

### MÀN HÌNH 3: CHI TIẾT THÔNG TIN NHÂN VIÊN (`SCR_EMP_003`)

#### 4.1 Bố cục giao diện Mobile (Figma: `Người quản trị - Cư dân VMO`)
```
+-------------------------------------------------+
|  [Status Bar]                                   |
|  [≡]               Cư dân VMO            [🔔 2] |
|                                                 |
|  +-------------------------------------------+  |
|  | [🔍 Search                               ] |  |
|  +-------------------------------------------+  |
|  [ Nút mở Bộ lọc: Ⴘ ]                           |
|                                                 |
|  Thông tin nhân viên                 [ Action v ]|
|                                                 |
|  +-------------------------------------------+  |
|  | Nhân viên:          Ian Chesnut - 0123    |  |
|  | Chức vụ:            Tester                |  |
|  | Văn phòng làm việc: IDMC 5                |  |
|  | Quê quán:           Việt Nam              |  |
|  | Bộ phận:            Trung Tâm PM Số 18    |  |
|  | Cấp bậc:            Nhân Viên             |  |
|  | Chức danh công việc: 01:30                |  |
|  | Giới tính:          Nam                   |  |
|  +-------------------------------------------+  |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 4.2 Đặc tả chi tiết các trường dữ liệu hồ sơ

| STT | Trường thông tin | Giá trị hiển thị mẫu Figma | Kiểu dữ liệu | Ý nghĩa nghiệp vụ |
| :---: | :--- | :--- | :---: | :--- |
| 1 | **Nhân viên** | `Ian Chesnut - 0123` | String | Họ tên đầy đủ kèm Mã nhân viên định danh. |
| 2 | **Chức vụ** | `Tester` | String | Chức danh chuyên môn (Developer, Tester, BA, PM...). |
| 3 | **Văn phòng làm việc** | `IDMC 5` | String | Trụ sở/Tòa nhà làm việc (IDMC 5 Duy Tân, CT11...). |
| 4 | **Quê quán** | `Việt Nam` | String | Quốc tịch / Quê quán theo sơ yếu lý lịch. |
| 5 | **Bộ phận** | `Trung Tâm PM Số 18` | String | Trung tâm sản xuất / Phòng ban trực thuộc. |
| 6 | **Cấp bậc** | `Nhân Viên` | String | Cấp bậc nhân sự (Thực tập sinh, Nhân viên, Trưởng nhóm, Quản lý). |
| 7 | **Chức danh công việc**| `01:30` | String | Mã cấp bậc lương / Khung năng lực nội bộ (Level Band). |
| 8 | **Giới tính** | `Nam` | String | Giới tính (Nam / Nữ / Khác). |

---

### MÀN HÌNH 4: QUẢN TRỊ LƯU TRỮ HỒ SƠ (`SCR_EMP_004`)

#### 5.1 Bố cục giao diện Action Bottom Sheet (Figma: Ảnh - Màn 5)
Khi Quản trị viên (`ADMIN` / `HR_MANAGER`) bấm vào nút `Action [v]` trên màn hình Chi tiết nhân viên:

```
+-------------------------------------------------+
|                                                 |
|                 (Màn hình nền mờ)               |
|                                                 |
|  +-------------------------------------------+  |
|  |                 [ Thanh gạt ]             |  |
|  |  Action                                   |  |
|  |                                           |  |
|  |  ( ) Lưu trữ                              |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```

#### 5.2 Popup Modal Xác nhận Lưu trữ (Archive Confirmation)
Khi chạm vào tùy chọn `( ) Lưu trữ`:
```
+-------------------------------------------------+
|                                                 |
|                   XÁC NHẬN!                     |
|                                                 |
|  Bạn có chắc chắn muốn lưu trữ hồ sơ nhân viên  |
|  [ Ian Chesnut - 0123 ] không?                  |
|                                                 |
|  Hồ sơ sẽ được chuyển vào danh bạ lưu trữ,      |
|  đồng thời vô hiệu hóa quyền truy cập hệ thống. |
|                                                 |
|  +---------------------+ +--------------------+ |
|  |       HỦY BỎ        | |      XÁC NHẬN      | |
|  +---------------------+ +--------------------+ |
+-------------------------------------------------+
```

#### 5.3 Quy tắc nghiệp vụ Lưu trữ hồ sơ (Business Rules)
* **BR-ARCHIVE-01 (Phân quyền):** Chỉ người dùng có vai trò `SYSTEM_ADMIN` hoặc `HR_MANAGER` mới hiển thị tùy chọn `Action -> Lưu trữ`. Nhân viên bình thường không thấy tùy chọn này.
* **BR-ARCHIVE-02 (Tác động nghiệp vụ khi Lưu trữ):**
  1. Cập nhật cờ trạng thái `is_active = FALSE` và `is_archived = TRUE` trong cơ sở dữ liệu.
  2. Thu hồi (Revoke) ngay lập tức toàn bộ phiên làm việc (Access Token / Refresh Token) của nhân viên trên tất cả thiết bị.
  3. Ẩn nhân viên khỏi danh sách tìm kiếm thông thường của người dùng cuối (trừ khi bật bộ lọc nâng cao *"Bao gồm nhân sự đã lưu trữ"*).
  4. Ghi nhận lịch sử kiểm toán vào bảng `audit_employee_archives` ghi rõ người thực hiện, thời điểm và lý do.

---

## 3. Quy tắc nghiệp vụ & Bảo mật danh bạ (Business Rules)

* **BR-DIR-01 (Quyền truy cập danh bạ công khai):** Toàn bộ nhân viên chính thức, thử việc đều có quyền truy cập danh bạ cư dân VMO để tra cứu danh bạ nội bộ, tìm kiếm đồng nghiệp theo tên hoặc dự án để phối hợp công việc.
* **BR-DIR-02 (Bảo vệ thông tin cá nhân nhạy cảm):**
  * Các thông tin công khai hiển thị trên danh bạ: Họ tên, Mã nhân viên, Chức vụ, Phòng ban, Email công việc, Văn phòng làm việc, Quê quán, Giới tính.
  * Các thông tin tuyệt đối bảo mật, **không trả về** qua API danh bạ: Mức lương, Thông tin tài khoản ngân hàng, Số CMND/CCCD, Đánh giá hiệu suất cá nhân (KPI/OKR), Mật khẩu tài khoản.
* **BR-DIR-03 (Bộ nhớ đệm đếm số lượng nhân sự):**
  * Số lượng nhân sự hiển thị trên từng nhánh của cây Bộ lọc cơ cấu tổ chức (ví dụ: `BOD (8)`, `Phòng BA (20)`) được lưu cache trên Redis (`emp:dept_headcount_tree`) với thời gian TTL là 60 phút. Cache tự động xóa và tính toán lại khi có nhân sự mới gia nhập (Onboard) hoặc nghỉ việc (Offboard/Archive).

---

## 4. Đặc tả Hợp đồng API phía Backend (Backend API Contracts)

### 4.1 API 1: Lấy danh sách Cư dân VMO
* **Method:** `GET`
* **Path:** `/api/v1/employees`
* **Header:** `Authorization: Bearer <access_token>`
* **Query Parameters:**
  * `search`: Từ khóa tìm kiếm (Tên, Mã NV, Vị trí).
  * `department_id`: Mã phòng ban chọn từ bộ lọc (VD: `DEPT_BA`, `GLOBAL_DESIGN`...).
  * `office_location`: Lọc theo văn phòng (VD: `IDMC 5`).
  * `page`: Trang hiện tại (Mặc định: 1).
  * `limit`: Số bản ghi mỗi trang (Mặc định: 20).

#### Response Thành công (`200 OK`)
```json
{
  "success": true,
  "code": 200,
  "data": {
    "total_records": 921,
    "page": 1,
    "limit": 20,
    "items": [
      {
        "id": 123,
        "employee_code": "0123",
        "full_name": "Ian Chesnut",
        "avatar_url": "https://cdn.erp.vmodev.com/avatars/0123.webp",
        "job_title": "Tester",
        "department_name": "Trung Tâm PM Số 18",
        "department_code": "PM18",
        "job_rank": "01:30",
        "level": "Nhân Viên",
        "office_location": "IDMC 5",
        "gender": "Nam",
        "hometown": "Việt Nam",
        "work_email": "ian.chesnut@vmodev.com"
      },
      {
        "id": 125,
        "employee_code": "0125",
        "full_name": "Collins Jackson",
        "avatar_url": "https://cdn.erp.vmodev.com/avatars/0125.webp",
        "job_title": "Tester",
        "department_name": "Trung Tâm PM Số 18",
        "department_code": "PM18",
        "job_rank": "01:30",
        "level": "Nhân Viên",
        "office_location": "IDMC 5",
        "gender": "Nam",
        "hometown": "Việt Nam",
        "work_email": "collins.jackson@vmodev.com"
      }
    ]
  }
}
```

---

### 4.2 API 2: Lấy Cây cơ cấu tổ chức & Số lượng nhân sự (Cây Bộ lọc)
* **Method:** `GET`
* **Path:** `/api/v1/departments/tree`
* **Header:** `Authorization: Bearer <access_token>`

#### Response Thành công (`200 OK`)
```json
{
  "success": true,
  "code": 200,
  "data": {
    "total_all": 921,
    "departments": [
      {
        "id": 1,
        "code": "BOD",
        "name": "BOD",
        "headcount": 8,
        "children": []
      },
      {
        "id": 2,
        "code": "COORD_CTR",
        "name": "Coordinator Center",
        "headcount": 4,
        "children": []
      },
      {
        "id": 3,
        "code": "EXT_RES",
        "name": "External Resources",
        "headcount": 54,
        "children": []
      },
      {
        "id": 4,
        "code": "GLOBAL",
        "name": "Global",
        "headcount": 19,
        "children": [
          { "id": 41, "code": "GLOBAL_DESIGN", "name": "Design", "headcount": 6 },
          { "id": 42, "code": "GLOBAL_ERP", "name": "ERP", "headcount": 3 },
          { "id": 43, "code": "GLOBAL_FRESHER", "name": "Fresher", "headcount": 6 },
          { "id": 44, "code": "GLOBAL_AMB", "name": "VMO Ambassador", "headcount": 4 }
        ]
      },
      {
        "id": 5,
        "code": "OPERATION",
        "name": "Operation",
        "headcount": 4,
        "children": []
      },
      {
        "id": 6,
        "code": "DEPT_BA",
        "name": "Phòng BA",
        "headcount": 20,
        "children": []
      },
      {
        "id": 7,
        "code": "DEPT_ADMIN",
        "name": "Phòng Hành Chính",
        "headcount": 12,
        "children": []
      },
      {
        "id": 8,
        "code": "DEPT_SALES",
        "name": "Phòng Kinh Doanh",
        "headcount": 21,
        "children": []
      },
      {
        "id": 9,
        "code": "DEPT_HR",
        "name": "Phòng Nhân Sự",
        "headcount": 20,
        "children": [
          { "id": 91, "code": "HR_CB", "name": "C&B", "headcount": 3 },
          { "id": 92, "code": "HR_RECRUIT", "name": "Tuyển Dụng", "headcount": 14 },
          { "id": 93, "code": "HR_TRAIN", "name": "Đào Tạo", "headcount": 3 }
        ]
      },
      {
        "id": 10,
        "code": "DEPT_PMO",
        "name": "Phòng PMO",
        "headcount": 12,
        "children": []
      },
      {
        "id": 11,
        "code": "DEPT_QA",
        "name": "Phòng QA",
        "headcount": 7,
        "children": []
      },
      {
        "id": 12,
        "code": "DEPT_MARCOM",
        "name": "Phòng Truyền Thông",
        "headcount": 6,
        "children": []
      }
    ]
  }
}
```

---

### 4.3 API 3: Xem chi tiết hồ sơ nhân viên
* **Method:** `GET`
* **Path:** `/api/v1/employees/{id}`
* **Header:** `Authorization: Bearer <access_token>`

#### Response Thành công (`200 OK`)
```json
{
  "success": true,
  "code": 200,
  "data": {
    "id": 123,
    "employee_code": "0123",
    "full_name": "Ian Chesnut",
    "job_title": "Tester",
    "department_name": "Trung Tâm PM Số 18",
    "level": "Nhân Viên",
    "job_rank": "01:30",
    "office_location": "IDMC 5",
    "gender": "Nam",
    "hometown": "Việt Nam",
    "avatar_url": "https://cdn.erp.vmodev.com/avatars/0123.webp",
    "is_active": true,
    "is_archived": false
  }
}
```

---

### 4.4 API 4: Lưu trữ hồ sơ nhân viên (Archive Profile)
* **Method:** `POST`
* **Path:** `/api/v1/employees/{id}/archive`
* **Header:** `Authorization: Bearer <access_token>`
* **Content-Type:** `application/json`

#### Request Body
```json
{
  "reason": "Nhân viên đã hoàn tất thủ tục bàn giao và nghỉ việc chính thức."
}
```

#### Response Thành công (`200 OK`)
```json
{
  "success": true,
  "code": 200,
  "message": "Lưu trữ hồ sơ nhân viên thành công. Toàn bộ phiên đăng nhập đã bị vô hiệu hóa."
}
```

---

## 5. Lược đồ Cơ sở dữ liệu chuẩn hóa (PostgreSQL Schema DDL)

```sql
-- 1. Bảng danh mục phòng ban & cây cơ cấu tổ chức (Departments)
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    parent_id INT NULL REFERENCES departments(id) ON DELETE CASCADE,
    code VARCHAR(64) UNIQUE NOT NULL, -- 'BOD', 'GLOBAL_DESIGN', 'DEPT_HR', etc.
    name VARCHAR(255) NOT NULL,
    headcount INT NOT NULL DEFAULT 0,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_departments_parent ON departments(parent_id);
CREATE INDEX idx_departments_code ON departments(code);

-- 2. Bảng thông tin nhân sự hồ sơ cư dân VMO (Employees Directory)
CREATE TABLE employees (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    employee_code VARCHAR(32) UNIQUE NOT NULL, -- '0123', '0125'
    full_name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(512) NULL,
    job_title VARCHAR(128) NOT NULL, -- 'Tester', 'Developer'
    department_id INT NOT NULL REFERENCES departments(id),
    department_name VARCHAR(255) NOT NULL, -- 'Trung Tâm PM Số 18'
    level VARCHAR(64) NOT NULL DEFAULT 'Nhân Viên',
    job_rank VARCHAR(32) NOT NULL DEFAULT '01:30',
    office_location VARCHAR(128) NOT NULL DEFAULT 'IDMC 5',
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('Nam', 'Nữ', 'Khác')),
    hometown VARCHAR(255) NOT NULL DEFAULT 'Việt Nam',
    work_email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    archived_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Full-text search index cho chức năng tìm kiếm nhanh
CREATE INDEX idx_employees_search ON employees USING GIN (to_tsvector('simple', full_name || ' ' || employee_code || ' ' || job_title || ' ' || work_email));
CREATE INDEX idx_employees_dept ON employees(department_id, is_active, is_archived);
CREATE INDEX idx_employees_office ON employees(office_location);

-- 3. Bảng nhật ký kiểm toán lưu trữ hồ sơ nhân viên (Employee Archives Audit)
CREATE TABLE audit_employee_archives (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    archived_by BIGINT NOT NULL REFERENCES users(id),
    action VARCHAR(50) NOT NULL DEFAULT 'ARCHIVE', -- 'ARCHIVE', 'UNARCHIVE'
    reason TEXT NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_archives_emp ON audit_employee_archives(employee_id, created_at DESC);
```

---

## 6. Yêu cầu phi chức năng (Non-Functional Requirements - NFR)

1. **Hiệu năng tìm kiếm (Search Performance):**
   * Thời gian phản hồi API tìm kiếm danh bạ với cơ sở dữ liệu 921+ nhân sự phải $\le 150$ ms.
   * Sử dụng chỉ mục **GIN Full-Text Search** trên PostgreSQL để người dùng gõ từ khóa không dấu hoặc có dấu đều trả về kết quả ngay lập tức.
2. **Bộ nhớ đệm & Đồng bộ dữ liệu (Caching & Sync):**
   * Danh mục cây cơ cấu tổ chức (`departments/tree`) được lưu cache trên Redis với key `vmo:dept:tree_headcount` TTL 60 phút.
   * Tự động đồng bộ hai chiều với hệ thống ERP lõi (Odoo `hr.employee` và `hr.department`) qua webhook sự kiện.
3. **Bảo mật & Phân quyền (Security & Access Control):**
   * Kiểm soát chặt chẽ quyền gọi API `POST /api/v1/employees/{id}/archive`: Bắt buộc kiểm tra quyền quản trị `ROLE_ADMIN` hoặc `ROLE_HR_MANAGER`. Chặn đứng với mã `403 Forbidden` nếu người dùng thường cố tình gửi request.
   * Mọi dữ liệu nhạy cảm liên quan đến hợp đồng, lương bổng đều không được phép đưa vào schema trả về của danh bạ Cư dân VMO.
