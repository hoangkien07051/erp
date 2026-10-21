# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)
## Phân hệ: Quản trị Thông tin Nhân sự Nâng cao (Advanced HR Profile Management)
### Cụm màn hình: Bộ lọc Quản trị, Danh bạ Nhân sự Quản trị, Hồ sơ Đa tầng 7 Accordion & Menu Thực hiện

| Thông tin | Chi tiết |
| :--- | :--- |
| **Mã tài liệu** | `SRS_MOD_HR_ADMIN_PROFILE_001` |
| **Tên phân hệ** | Quản trị Thông tin Nhân sự Nâng cao (Employee Admin Profile & Workforce Setting) |
| **Dự án** | VMO ERP System |
| **Nền tảng** | iOS & Android (Mobile App) + Backend API Microservices |
| **Tệp thiết kế nguồn** | `ERP - App.fig` (Các màn hình: `Người quản trị - Bộ lọc`, `Nhân viên - Cư dân VMO [Admin Mode]`, `Người quản trị - Nhân viên [10 biến thể Accordion & Action]`) |
| **Phiên bản SRS** | 2.0 (Chuẩn hóa 100% theo bản vẽ Figma) |
| **Ngày tạo** | 21/10/2026 |
| **Trạng thái** | Sẵn sàng triển khai (Ready for Dev/QA) |

---

## 1. Giới thiệu tổng quan phân hệ (Overview & Scope)

### 1.1 Mục đích tài liệu
Tài liệu này đặc tả chi tiết toàn bộ yêu cầu giao diện người dùng (UI/UX), yêu cầu chức năng (FR), quy tắc nghiệp vụ (BR), đặc tả hợp đồng API phía Backend, lược đồ cơ sở dữ liệu quan hệ (PostgreSQL Schema DDL) và các yêu cầu phi chức năng (NFR) cho phân hệ **"Quản trị Thông tin Nhân sự Nâng cao" (Advanced HR Profile)** trên ứng dụng di động VMO ERP. 

Phân hệ này dành riêng cho vai trò **Quản trị viên Hệ thống (`ADMIN`)** và **Chuyên viên Quản trị Nhân sự (`HR_MANAGER`)** để quản lý hồ sơ nhân viên chuyên sâu, thiết lập nhân lực, quản lý tài liệu pháp lý, cây cơ cấu tổ chức quản trị (81 đơn vị) và thực thi các nghiệp vụ nhân sự (In ấn, Nhân bản, Gửi email IT, Phân tích phép, Xuất nhập Excel).

### 1.2 Danh mục các màn hình chức năng chi tiết
1. **Chức năng 1 (`SCR_HR_001`):** Màn hình Bộ lọc Cơ cấu Tổ chức Quản trị 81 Đơn vị (`Người quản trị - Bộ lọc`).
2. **Chức năng 2 (`SCR_HR_002`):** Màn hình Danh bạ Quản trị & Menu Tác vụ Danh sách (`Tạo mới`, `Nạp tập tin`, `Tải xuống xlsx`).
3. **Chức năng 3 (`SCR_HR_003`):** Màn hình Tổng quan Hồ sơ Nhân sự Quản trị (Thông tin cơ bản & Sticky Action Bar `[Xóa]` - `[Sửa]`).
4. **Chức năng 4 (`SCR_HR_004`):** Khối Accordion 1: **Resumé** (Kinh nghiệm công tác & Kỹ năng chuyên môn).
5. **Chức năng 5 (`SCR_HR_005`):** Khối Accordion 2: **Thông tin liên hệ** (SĐT, Email cá nhân, Skype, Facebook, SĐT người thân).
6. **Chức năng 6 (`SCR_HR_006`):** Khối Accordion 3: **Thông tin công việc** (Email công việc, Trụ sở làm việc TTC11, Bậc chức danh, Trạng thái làm việc, Ngày nghỉ việc).
7. **Chức năng 7 (`SCR_HR_007`):** Khối Accordion 4: **Thông tin cá nhân chuyên sâu** (21 trường lý lịch, CMND/CCCD, Thuế, Ngân hàng, Bằng cấp học vấn).
8. **Chức năng 8 (`SCR_HR_008`):** Khối Accordion 5: **Thông tin hợp đồng** (Loại HĐ, Thời hạn, Ngày bắt đầu/kết thúc HĐ, Trạng thái hiệu lực).
9. **Chức năng 9 (`SCR_HR_009`):** Khối Accordion 6: **Hồ sơ nhân sự đã nộp** (Trạng thái nộp hồ sơ, Số ngày còn lại, Hạn nộp).
10. **Chức năng 10 (`SCR_HR_010`):** Khối Accordion 7: **Thiết lập nhân lực** (TK liên kết, Người duyệt phép, Cấu hình máy chấm công).
11. **Chức năng 11 (`SCR_HR_011`):** Action Sheet `Launch Plan` (Khởi chạy kế hoạch nhân sự).
12. **Chức năng 12 (`SCR_HR_012`):** Popup Menu `Thực hiện` (`In`, `Lưu trữ`, `Nhân bản`, `Gửi email IT`, `Phân tích nghỉ phép`).

---

## 2. Đặc tả chi tiết từng màn hình (Screen-by-Screen Specifications)

---

### MÀN HÌNH 1: BỘ LỌC CƠ CẤU TỔ CHỨC QUẢN TRỊ 81 ĐƠN VỊ (`SCR_HR_001`)

#### 2.1 Bố cục giao diện Mobile (Figma: `Người quản trị - Bộ lọc` - $375 \times 1717$)
```
+-------------------------------------------------+
|  [Status Bar: Time, Wifi, Battery]              |
|  [<]                 Bộ lọc              [🔔 2] |
|                                                 |
|  [x] All                                     81 |
|                                                 |
|  [ ] BOD                                     10 |
|                                                 |
|  [ ] BA                                       2 |
|                                                 |
|  [ ] Coordinator Center                       1 |
|                                                 |
|  [ ] PATIENT VIỆT NAM                         2 |
|                                                 |
|  [ ] Global                                   7 |
|                                                 |
|  [ ] Phòng Business Coordinator               1 |
|                                                 |
|  [ ] Phòng Hành Chính                         4 |
|                                                 |
|  [ ] Phòng Kinh Doanh                         1 |
|                                                 |
|  [ ] Phòng Nhân Sự                            5 |
|      [ ] Bộ Phận Đào Tạo                      2 |
|      [ ] Đào Tạo                              2 |
|                                                 |
|  [ ] Phòng PMO                                3 |
|                                                 |
|  [ ] Phòng QA                                 2 |
|                                                 |
|  [ ] Phòng Truyền Thông                       2 |
|                                                 |
|  [ ] Phòng Tài Chính Kế Toán                  2 |
|                                                 |
|  [ ] Pre-sale                                 2 |
|                                                 |
|  [ ] SWAT                                     1 |
|                                                 |
|  [ ] Sale Japan                               2 |
|                                                 |
|  [ ] Takumi                                   2 |
|                                                 |
|  [ ] Trung Tâm PM số 10                       2 |
|  [ ] Trung Tâm PM Số 11                       2 |
|  [ ] Trung Tâm PM Số 12                       2 |
|  [ ] Trung Tâm PM Số 18                       2 |
|  [ ] Trung Tâm PM Số 2                        2 |
|  [ ] Trung Tâm PM Số 3                        2 |
|  [ ] Trung Tâm PM Số 6                        1 |
|  [ ] Trung Tâm PM Số 9                        2 |
|                                                 |
|  [ ] VMO AI                                   1 |
|  [ ] VMO Ambassador                           1 |
|  [ ] Blockchain                               1 |
|  [ ] VMO Japan                                1 |
|  [ ] VMO US                                   2 |
|                                                 |
|  +---------------------+ +--------------------+ |
|  |       HỦY BỎ        | |      ÁP DỤNG       | |
|  +---------------------+ +--------------------+ |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 2.2 Từ điển Danh mục 81 Nhân sự Quản trị theo Đầu mối Đơn vị (Figma chuẩn)

| STT | Đơn vị / Phòng ban / Trung tâm sản xuất | Mã đơn vị | Headcount Figma | Ghi chú vai trò quản trị |
| :---: | :--- | :--- | :---: | :--- |
| 1 | **All** | `ALL_ADMIN` | **81** | Toàn bộ nhân sự quản lý & tài khoản định danh trong hệ thống. |
| 2 | **BOD** | `DEPT_BOD` | **10** | Ban Lãnh đạo cấp cao (Board of Directors). |
| 3 | **BA** | `DEPT_BA` | **2** | Quản lý khối Phân tích nghiệp vụ. |
| 4 | **Coordinator Center** | `COORD_CTR` | **1** | Điều phối viên trung tâm. |
| 5 | **PATIENT VIỆT NAM** | `UNIT_PATIENT` | **2** | Dự án đặc thù Y tế / Khách hàng đối tác. |
| 6 | **Global** | `DEPT_GLOBAL` | **7** | Khối Toàn cầu & Phát triển thị trường nước ngoài. |
| 7 | **Phòng Business Coordinator** | `DEPT_BC` | **1** | Điều phối kinh doanh. |
| 8 | **Phòng Hành Chính** | `DEPT_ADMIN` | **4** | Quản lý Hành chính & Lễ tân văn phòng. |
| 9 | **Phòng Kinh Doanh** | `DEPT_SALES` | **1** | Ban Lãnh đạo Khối Sales & BD. |
| 10 | **Phòng Nhân Sự** | `DEPT_HR` | **5** | Khối Quản trị Nguồn nhân lực & Chính sách. |
| 11 | - *Bộ Phận Đào Tạo* | `HR_TRAIN_DEPT`| **2** | Ban điều hành chương trình đào tạo. |
| 12 | - *Đào Tạo* | `HR_TRAIN_OPS` | **2** | Giảng viên & Chuyên viên đào tạo nội bộ. |
| 13 | **Phòng PMO** | `DEPT_PMO` | **3** | Văn phòng Quản lý Dự án VMO. |
| 14 | **Phòng QA** | `DEPT_QA` | **2** | Quản lý Đảm bảo Chất lượng. |
| 15 | **Phòng Truyền Thông** | `DEPT_MARCOM` | **2** | Truyền thông & Văn hóa doanh nghiệp. |
| 16 | **Phòng Tài Chính Kế Toán** | `DEPT_FIN` | **2** | Kế toán trưởng & Trưởng ban tài chính. |
| 17 | **Pre-sale** | `DEPT_PRESALE`| **2** | Đội ngũ Giải pháp & Đấu thầu. |
| 18 | **SWAT** | `UNIT_SWAT` | **1** | Đội đặc nhiệm công nghệ & Cứu trợ dự án. |
| 19 | **Sale Japan** | `SALES_JP` | **2** | Kinh doanh thị trường Nhật Bản. |
| 20 | **Takumi** | `UNIT_TAKUMI` | **2** | Trung tâm dự án chuyên biệt Nhật Bản. |
| 21 | **Trung Tâm PM số 10** | `PM10` | **2** | Giám đốc Trung tâm & DUL PM10. |
| 22 | **Trung Tâm PM Số 11** | `PM11` | **2** | Giám đốc Trung tâm & DUL PM11. |
| 23 | **Trung Tâm PM Số 12** | `PM12` | **2** | Giám đốc Trung tâm & DUL PM12. |
| 24 | **Trung Tâm PM Số 18** | `PM18` | **2** | Giám đốc Trung tâm & DUL PM18 (Trung tâm mẫu Figma). |
| 25 | **Trung Tâm PM Số 2** | `PM2` | **2** | Giám đốc Trung tâm & DUL PM2. |
| 26 | **Trung Tâm PM Số 3** | `PM3` | **2** | Giám đốc Trung tâm & DUL PM3. |
| 27 | **Trung Tâm PM Số 6** | `PM6` | **1** | Giám đốc Trung tâm PM6. |
| 28 | **Trung Tâm PM Số 9** | `PM9` | **2** | Giám đốc Trung tâm & DUL PM9. |
| 29 | **VMO AI** | `UNIT_AI` | **1** | Viện nghiên cứu & Ứng dụng Trí tuệ nhân tạo. |
| 30 | **VMO Ambassador** | `UNIT_AMB` | **1** | Trưởng ban Đại sứ thương hiệu VMO. |
| 31 | **Blockchain** | `UNIT_BLOCKCHAIN`| **1** | Bộ phận nghiên cứu công nghệ Chuỗi khối. |
| 32 | **VMO Japan** | `VMO_JP` | **1** | Đại diện Chi nhánh VMO Tokyo / Osaka. |
| 33 | **VMO US** | `VMO_US` | **2** | Đại diện Chi nhánh VMO Hoa Kỳ. |

---

### MÀN HÌNH 2: DANH BẠ QUẢN TRỊ & MENU TÁC VỤ EXCEL (`SCR_HR_002`)

#### 3.1 Bố cục giao diện Mobile (Figma: Screen 7 & 8)
Thẻ danh bạ ở chế độ Quản trị hiển thị đầy đủ trường **Thâm niên**, đồng thời nút `Action [v]` mở Action Sheet thao tác tệp dữ liệu:

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
|  ALL                                 [ Action v ]|
|                                                 |
|  +-------------------------------------------+  |
|  | Nhân viên:          Ian Chesnut - 0123    |  |
|  | Bộ phận:            Trung Tâm PM Số 18    |  |
|  | Cấp bậc:            Nhân Viên             |  |
|  | Chức danh công việc: Tester               |  |
|  | Văn phòng làm việc: IDMC 5                |  |
|  | Giới tính:          Nam                   |  |
|  | Thâm niên:          0 năm 0 tháng 0 ngày  |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  | Nhân viên:          Collins Jackson - 0125|  |
|  | Bộ phận:            Trung Tâm PM Số 18    |  |
|  | Cấp bậc:            Nhân Viên             |  |
|  | Chức danh công việc: Tester               |  |
|  | Văn phòng làm việc: IDMC 5                |  |
|  | Giới tính:          Nam                   |  |
|  | Thâm niên:          0 năm 0 tháng 0 ngày  |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  |                  [ Action ]               |  |
|  |  [+] Tạo mới                              |  |
|  |  [^] Nạp tập tin (Import Excel)           |  |
|  |  [v] Tải xuống xlsx (Export Excel)         |  |
|  +-------------------------------------------+  |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 3.2 Đặc tả nghiệp vụ Menu Action Quản trị
1. **`[+] Tạo mới`:** Điều hướng sang form thêm mới nhân viên (`SCR_HR_CREATE_NEW`).
2. **`[^] Nạp tập tin (Import Excel)`:** Mở bộ chọn tệp trên thiết bị (chỉ chấp nhận `.xlsx`, `.xls`, `.csv`). Hệ thống validate file mẫu và hiển thị kết quả import (Số bản ghi hợp lệ, số bản ghi lỗi trùng mã NV).
3. **`[v] Tải xuống xlsx (Export Excel)`:** Xuất danh sách toàn bộ nhân viên theo điều kiện lọc hiện tại thành tệp Excel và gửi thông báo hoàn tất qua Notification Center kèm đường dẫn tải về.

---

### MÀN HÌNH 3: TỔNG QUAN HỒ SƠ NHÂN SỰ QUẢN TRỊ (`SCR_HR_003`)

#### 4.1 Bố cục giao diện Mobile (Figma: Screen 9 - $375 \times 1071$)
Khi Quản trị viên bấm vào bất kỳ nhân viên nào từ danh bạ, hệ thống mở màn hình hồ sơ quản trị chi tiết. Thông tin cơ bản cố định ở đầu trang, tiếp theo là 7 khối Accordion:

```
+-------------------------------------------------+
|  [Status Bar]                                   |
|  [<]               Cư dân VMO            [🔔 2] |
|                                                 |
|  +-------------------------------------------+  |
|  | [🔍 Search                               ] |  |
|  +-------------------------------------------+  |
|  [ Nút mở Bộ lọc: Ⴘ ]                           |
|                                                 |
|  Thông tin                           [ Action v ]|
|                                      [ Thực hiện]|
|  +-------------------------------------------+  |
|  | Nhân viên:          Ian Chesnut - 0123    |  |
|  | Chức vụ:            Tester                |  |
|  | Văn phòng làm việc: 0 năm 8 tháng 8 ngày  |  |
|  | Bậc thâm niên:      0                     |  |
|  | Loại hợp đồng:      Thử việc              |  |
|  | Bộ phận:            Global                |  |
|  | Người quản lý:      DUL - 2611            |  |
|  | Vị trí làm việc:    Tester                |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  | > Resumé                                  |  |
|  +-------------------------------------------+  |
|  | > Thông tin liên hệ                       |  |
|  +-------------------------------------------+  |
|  | > Thông tin công việc                     |  |
|  +-------------------------------------------+  |
|  | > Thông tin cá nhân                       |  |
|  +-------------------------------------------+  |
|  | > Thông tin hợp đồng                      |  |
|  +-------------------------------------------+  |
|  | > Hồ sơ                                   |  |
|  +-------------------------------------------+  |
|  | > Thiết lập nhân lực                      |  |
|  +-------------------------------------------+  |
|                                                 |
|  +---------------------+ +--------------------+ |
|  |      [  XÓA  ]      | |     [  SỬA  ]      | |
|  +---------------------+ +--------------------+ |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 4.2 Chi tiết 8 trường Thông tin Cố định đầu trang
1. **Nhân viên:** `Ian Chesnut - 0123` (Họ tên đầy đủ kèm mã nhân viên định danh).
2. **Chức vụ:** `Tester` (Chức danh chuyên môn).
3. **Văn phòng làm việc (Thời gian thâm niên):** `0 năm 8 tháng 8 ngày` (Tính toán tự động theo công thức: `CURRENT_DATE - onboarding_date`).
4. **Bậc thâm niên:** `0` (Cấp bậc kinh nghiệm nội bộ).
5. **Loại hợp đồng:** `Thử việc` (Badge trạng thái hợp đồng lao động hiện tại).
6. **Bộ phận:** `Global` (Đơn vị cấp trung tâm/khối).
7. **Người quản lý:** `DUL - 2611` (Mã định danh và chức vụ của Line Manager trực tiếp phê duyệt).
8. **Vị trí làm việc:** `Tester`.

#### 4.3 Cụm Sticky Action Bar chân trang
* **Nút `[ XÓA ]` (Nút phụ - Viền đỏ/xám):** Mở popup cảnh báo xác nhận xóa hồ sơ nhân viên hoặc đưa vào danh sách đen (Blacklist).
* **Nút `[ SỬA ]` (Nút chính - Nền cam VMO):** Kích hoạt chế độ chỉnh sửa biểu mẫu (Edit Mode) cho phép sửa toàn bộ các trường dữ liệu trong các Accordion.

---

### MÀN HÌNH 4: KHỐI ACCORDION 1 - RESUMÉ (`SCR_HR_004`)
Khi người dùng chạm mở Accordion `> Resumé`:

```
+-------------------------------------------------+
|  [v] Resumé                                     |
|  +-------------------------------------------+  |
|  | KINH NGHIỆM                               |  |
|  | Thời gian:          06/08/2021 - Hiện tại |  |
|  | Công ty:            VMO                   |  |
|  | Vị trí làm việc:    Tester                |  |
|  |                                           |  |
|  | CÁC KĨ NĂNG                               |  |
|  | Kĩ năng:            Automation Test,      |  |
|  |                     API Testing, Postman  |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```

---

### MÀN HÌNH 5: KHỐI ACCORDION 2 - THÔNG TIN LIÊN HỆ (`SCR_HR_005`)
Khi người dùng chạm mở Accordion `> Thông tin liên hệ`:

```
+-------------------------------------------------+
|  [v] Thông tin liên hệ                          |
|  +-------------------------------------------+  |
|  | Điện thoại:         0123465789            |  |
|  | Email cá nhân:      example@gmail.com     |  |
|  | Skype ID:           example@skype.com     |  |
|  | Facebook:           https://facebook.com/ |  |
|  | SĐT người thân:     0987654321            |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```
* **Quy tắc nghiệp vụ:** `SĐT người thân` là thông tin liên hệ khẩn cấp (Emergency Contact). Khi bấm vào icon điện thoại, ứng dụng kích hoạt trực tiếp trình gọi điện thoại hệ điều hành di động (`tel:0987654321`).

---

### MÀN HÌNH 6: KHỐI ACCORDION 3 - THÔNG TIN CÔNG VIỆC (`SCR_HR_006`)
Khi người dùng chạm mở Accordion `> Thông tin công việc`:

```
+-------------------------------------------------+
|  [v] Thông tin công việc                        |
|  +-------------------------------------------+  |
|  | Email công việc:    example.work@gmail.com|  |
|  | Văn phòng làm việc: TTC11                 |  |
|  | Cấp bậc:            Tester                |  |
|  | Bậc chức danh:      abc                   |  |
|  | Trạng thái làm việc:Đang làm việc         |  |
|  | Ngày nghỉ việc:     00/00/0000            |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```
* **Quy tắc nghiệp vụ:** Khi `Trạng thái làm việc` chuyển thành *Đã nghỉ việc*, trường `Ngày nghỉ việc` bắt buộc phải có giá trị ngày tháng hợp lệ.

---

### MÀN HÌNH 7: KHỐI ACCORDION 4 - THÔNG TIN CÁ NHÂN CHUYÊN SÂU (`SCR_HR_007`)
Khi người dùng chạm mở Accordion `> Thông tin cá nhân` (21 trường nhập liệu chuẩn hóa):

```
+-------------------------------------------------+
|  [v] Thông tin cá nhân                          |
|  +-------------------------------------------+  |
|  | Giới tính:          Nam                   |  |
|  | Ngày sinh:          dd/mm/yyyy            |  |
|  | Quê quán:           Việt Nam              |  |
|  | Nơi sinh:           Việt Nam              |  |
|  | Hộ khẩu thường trú: Việt Nam              |  |
|  | Tạm trú:            Việt Nam              |  |
|  | TT Hôn nhân:        Độc thân              |  |
|  | ID (CMT/ CCCD):     0321321               |  |
|  | Ngày cấp:           dd/mm/yyyy            |  |
|  | Nơi cấp:            Việt Nam              |  |
|  | Số ID cũ:           (Trống)               |  |
|  | Mã số thuế:         (Trống)               |  |
|  | Tên ngân hàng:      (Trống)               |  |
|  | Số tài khoản:       (Trống)               |  |
|  | Chi nhánh:          (Trống)               |  |
|  | Trường đào tạo:     (Trống)               |  |
|  | Chuyên ngành:       (Trống)               |  |
|  | Trình độ:           (Trống)               |  |
|  | Năm tốt nghiệp:     (Trống)               |  |
|  | Chứng chỉ khác:     (Trống)               |  |
|  | Công ty cũ:         (Trống)               |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```

---

### MÀN HÌNH 8: KHỐI ACCORDION 5 - THÔNG TIN HỢP ĐỒNG (`SCR_HR_008`)
Khi người dùng chạm mở Accordion `> Thông tin hợp đồng`:

```
+-------------------------------------------------+
|  [v] Thông tin hợp đồng                         |
|  +-------------------------------------------+  |
|  | Loại hợp đồng:      Chính thức            |  |
|  | Tên nhân viên:      Ian Chesnut           |  |
|  | Vị trí làm việc:    (Trống)               |  |
|  | Thời hạn hợp đồng:  Vô thời hạn           |  |
|  | Bộ phận:            Global                |  |
|  | Ngày bắt đầu HĐ:    30/07/2021            |  |
|  | Ngày kết thúc:      30/07/2022            |  |
|  | Trạng thái:         [ Hiệu lực ]          |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```

---

### MÀN HÌNH 9: KHỐI ACCORDION 6 - HỒ SƠ ĐÃ NỘP (`SCR_HR_009`)
Khi người dùng chạm mở Accordion `> Hồ sơ`:

```
+-------------------------------------------------+
|  [v] Hồ sơ                                      |
|  +-------------------------------------------+  |
|  | Trạng thái:         Đã nộp                |  |
|  | Hồ sơ đã nộp:       (Trống)               |  |
|  | Ngày hết hạn nộp:   (Trống)               |  |
|  | Số ngày còn lại:    0                     |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```
* **Quy tắc nghiệp vụ:** Quản lý việc bàn giao hồ sơ nhân sự gốc (Sơ yếu lý lịch công chứng, Giấy khám sức khỏe, Bản sao bằng cấp, Sổ hộ khẩu). Nếu `Số ngày còn lại < 0` mà chưa nộp, hệ thống gửi thông báo nhắc nhở tự động qua push notification.

---

### MÀN HÌNH 10: KHỐI ACCORDION 7 - THIẾT LẬP NHÂN LỰC (`SCR_HR_010`)
Khi người dùng chạm mở Accordion `> Thiết lập nhân lực`:

```
+-------------------------------------------------+
|  [v] Thiết lập nhân lực                         |
|  +-------------------------------------------+  |
|  | Trạng thái:         [Đang làm việc]       |  |
|  | TK dùng liên kết:   Ian Chesnut - 0123    |  |
|  | Ngày bắt đầu HĐ:    30/07/2021            |  |
|  |                                           |  |
|  | [ NGƯỜI PHÊ DUYỆT NGÀY NGHỈ ]             |  |
|  | Người phê duyệt:    Admin - 0000          |  |
|  |                                           |  |
|  | [ CHẤM CÔNG ]                             |  |
|  | Số ngày giải trình: 4                     |  |
|  | Mã chấm công:       0000                  |  |
|  | Mã số thẻ:          (Trống)               |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```
* **Quy tắc nghiệp vụ:**
  * `Mã chấm công`: Mã ID nhân viên quét vân tay/khuôn mặt trên máy chấm công phần cứng Hikvision/ZKTeco.
  * `Số ngày giải trình`: Giới hạn tối đa số ngày được phép làm đơn giải trình vi phạm giờ công (Mặc định 4 ngày kể từ khi phát sinh lỗi vi phạm).

---

### MÀN HÌNH 11: ACTION SHEET `LAUNCH PLAN` (`SCR_HR_011`)
Khi bấm vào nút `Action [v]` trên màn hình Quản trị nhân viên:
```
+-------------------------------------------------+
|                 (Màn hình nền mờ)               |
|  +-------------------------------------------+  |
|  |                 [ Thanh gạt ]             |  |
|  |  Action                                   |  |
|  |                                           |  |
|  |  [🚀] Launch Plan                         |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```
* **Hành động `Launch Plan`:** Khởi chạy quy trình kế hoạch hội nhập Onboarding (tự động tạo danh sách việc cần làm Checklist cho nhân sự mới, thông báo Mentor hướng dẫn, thiết lập lộ trình thử việc 60 ngày).

---

### MÀN HÌNH 12: POPUP MENU `THỰC HIỆN` (`SCR_HR_012`)
Khi bấm vào nút `[ Thực hiện ]` trên thanh công cụ quản trị (Figma: Screen 18):
```
+-------------------------------------------------+
|                 (Màn hình nền mờ)               |
|  +-------------------------------------------+  |
|  |                 [ Thanh gạt ]             |  |
|  |  Thực hiện                                |  |
|  |                                           |  |
|  |  [🖨️] In                                  |  |
|  |  [📦] Lưu trữ                             |  |
|  |  [📄] Nhân bản                            |  |
|  |  [✉️] Gửi email it                        |  |
|  |  [📊] Phân tích nghỉ phép                 |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```

#### Bảng Đặc tả 5 Hành động Nghiệp vụ Chuyên sâu:
| Hành động | Icon | Mô tả nghiệp vụ | Tác động hệ thống Backend |
| :--- | :---: | :--- | :--- |
| **In** | `🖨️` | Xuất sơ yếu lý lịch nhân sự hoàn chỉnh. | Tạo và tải về tệp PDF chuẩn mẫu A4 đóng dấu VMO. |
| **Lưu trữ** | `📦` | Chuyển hồ sơ sang trạng thái Archive khi nghỉ việc. | Cập nhật `is_archived = TRUE`, thu hồi Token, hủy phiên làm việc. |
| **Nhân bản** | `📄` | Sao chép thông tin chức danh, cấu hình nhân lực sang nhân viên mới. | Mở form tạo mới với các trường bộ phận, cấp bậc, người quản lý được điền sẵn. |
| **Gửi email it** | `✉️` | Yêu cầu bộ phận IT cấp phát tài nguyên kỹ thuật. | Bắn webhook/email sang hệ thống IT Helpdesk cấp Email, Slack, Git, Laptop. |
| **Phân tích nghỉ phép**| `📊` | Tra cứu thống kê và dự báo nghỉ phép. | Điều hướng sang Dashboard biểu đồ phân tích phép năm, phép bù, phép ốm BHXH. |

---

## 3. Đặc tả Hợp đồng API phía Backend (Backend API Contracts)

### 3.1 API 1: Lấy danh sách Nhân sự theo Cây Bộ lọc Quản trị 81 Đơn vị
* **Method:** `GET`
* **Path:** `/api/v1/admin/employees`
* **Header:** `Authorization: Bearer <access_token>` (Yêu cầu Role `ROLE_ADMIN` hoặc `ROLE_HR_MANAGER`)
* **Query Parameters:**
  * `dept_code`: Mã đơn vị (VD: `DEPT_BOD`, `PM18`, `UNIT_SWAT`...).
  * `search`: Từ khóa tìm kiếm (Tên, Mã NV, Vị trí).
  * `page`: Số trang (Mặc định: 1).
  * `limit`: Số bản ghi mỗi trang (Mặc định: 20).

#### Response Thành công (`200 OK`)
```json
{
  "success": true,
  "code": 200,
  "data": {
    "total_records": 81,
    "page": 1,
    "limit": 20,
    "items": [
      {
        "id": 123,
        "employee_code": "0123",
        "full_name": "Ian Chesnut",
        "job_title": "Tester",
        "department_name": "Global",
        "department_code": "GLOBAL",
        "seniority_years": 0,
        "seniority_months": 8,
        "seniority_days": 8,
        "contract_type": "Thử việc",
        "manager_code": "DUL - 2611",
        "manager_name": "DUL PM Global",
        "avatar_url": "https://cdn.erp.vmodev.com/avatars/0123.webp"
      }
    ]
  }
}
```

---

### 3.2 API 2: Lấy Chi tiết Hồ sơ Nhân sự Quản trị Toàn diện (7 Accordions)
* **Method:** `GET`
* **Path:** `/api/v1/admin/employees/{id}/full-profile`
* **Header:** `Authorization: Bearer <access_token>`

#### Response Thành công (`200 OK`)
```json
{
  "success": true,
  "code": 200,
  "data": {
    "basic_info": {
      "employee_id": 123,
      "employee_code": "0123",
      "full_name": "Ian Chesnut",
      "job_title": "Tester",
      "tenure_text": "0 năm 8 tháng 8 ngày",
      "seniority_rank": 0,
      "contract_type": "Thử việc",
      "department": "Global",
      "direct_manager": "DUL - 2611",
      "working_position": "Tester"
    },
    "resume": {
      "experiences": [
        {
          "period": "06/08/2021 - Hiện tại",
          "company": "VMO",
          "role": "Tester"
        }
      ],
      "skills": ["Automation Test", "API Testing", "Postman", "Selenium"]
    },
    "contact_info": {
      "phone_number": "0123465789",
      "personal_email": "example@gmail.com",
      "skype_id": "example@skype.com",
      "facebook_url": "https://www.facebook.com/",
      "emergency_phone": "0987654321"
    },
    "work_info": {
      "work_email": "example.work@gmail.com",
      "office_location": "TTC11",
      "level": "Tester",
      "job_grade": "abc",
      "working_status": "Đang làm việc",
      "resignation_date": null
    },
    "personal_details": {
      "gender": "Nam",
      "dob": "1995-10-15",
      "hometown": "Việt Nam",
      "birth_place": "Việt Nam",
      "permanent_address": "Việt Nam",
      "temporary_address": "Việt Nam",
      "marital_status": "Độc thân",
      "national_id": "0321321",
      "national_id_date": "2018-05-20",
      "national_id_place": "Việt Nam",
      "old_national_id": null,
      "tax_code": null,
      "bank_name": null,
      "bank_account_number": null,
      "bank_branch": null,
      "education_school": null,
      "education_major": null,
      "education_degree": null,
      "graduation_year": null,
      "other_certificates": null,
      "previous_company": null
    },
    "contract_info": {
      "contract_type": "Chính thức",
      "employee_name": "Ian Chesnut",
      "contract_term": "Vô thời hạn",
      "department": "Global",
      "start_date": "2021-07-30",
      "end_date": "2022-07-30",
      "status": "Hiệu lực"
    },
    "document_submission": {
      "submission_status": "Đã nộp",
      "submitted_documents": [],
      "due_date": null,
      "days_remaining": 0
    },
    "workforce_setting": {
      "status": "Đang làm việc",
      "linked_account": "Ian Chesnut - 0123",
      "contract_start_date": "2021-07-30",
      "leave_approver": "Admin - 0000",
      "attendance_explanation_days": 4,
      "attendance_code": "0000",
      "card_number": null
    }
  }
}
```

---

### 3.3 API 3: Thực thi Hành động Tác vụ Quản trị (`Thực hiện`)
* **Method:** `POST`
* **Path:** `/api/v1/admin/employees/{id}/execute-action`
* **Header:** `Authorization: Bearer <access_token>`
* **Content-Type:** `application/json`

#### Request Body
```json
{
  "action": "SEND_IT_EMAIL", // "PRINT_PDF", "ARCHIVE", "DUPLICATE", "SEND_IT_EMAIL", "LEAVE_ANALYSIS"
  "parameters": {
    "it_request_items": ["LAPTOP_MACBOOK", "VMO_MAIL", "SLACK_INVITE", "KEY_CARD"],
    "notes": "Nhân sự mới gia nhập dự án Global PM18, cần máy cấu hình RAM 32GB."
  }
}
```

#### Response Thành công (`200 OK`)
```json
{
  "success": true,
  "code": 200,
  "message": "Đã gửi phiếu yêu cầu cấp phát tài nguyên đến Bộ phận IT thành công.",
  "data": {
    "ticket_id": "IT-TICKET-2026-9921",
    "executed_at": "2026-10-21T21:10:00Z"
  }
}
```

---

## 4. Lược đồ Cơ sở Dữ liệu chuẩn hóa (PostgreSQL Schema DDL)

```sql
-- 1. Bảng hồ sơ quản trị nhân sự mở rộng (HR Admin Profiles)
CREATE TABLE employee_admin_profiles (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT UNIQUE NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    seniority_rank INT NOT NULL DEFAULT 0,
    onboarding_date DATE NOT NULL DEFAULT CURRENT_DATE,
    contract_type VARCHAR(64) NOT NULL DEFAULT 'Thử việc',
    manager_id BIGINT NULL REFERENCES employees(id),
    working_status VARCHAR(64) NOT NULL DEFAULT 'Đang làm việc',
    resignation_date DATE NULL,
    office_location VARCHAR(128) NOT NULL DEFAULT 'TTC11',
    job_grade VARCHAR(64) NOT NULL DEFAULT 'abc',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_emp_admin_mgr ON employee_admin_profiles(manager_id);
CREATE INDEX idx_emp_admin_status ON employee_admin_profiles(working_status);

-- 2. Bảng thông tin liên hệ đa kênh (Contact Infos)
CREATE TABLE employee_contact_infos (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT UNIQUE NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    personal_email VARCHAR(255) NULL,
    skype_id VARCHAR(128) NULL,
    facebook_url VARCHAR(512) NULL,
    emergency_phone VARCHAR(20) NOT NULL,
    emergency_contact_name VARCHAR(255) NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng chi tiết lý lịch cá nhân 21 trường (Personal Details)
CREATE TABLE employee_personal_details (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT UNIQUE NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('Nam', 'Nữ', 'Khác')),
    date_of_birth DATE NULL,
    hometown VARCHAR(255) NOT NULL DEFAULT 'Việt Nam',
    birth_place VARCHAR(255) NOT NULL DEFAULT 'Việt Nam',
    permanent_address TEXT NOT NULL DEFAULT 'Việt Nam',
    temporary_address TEXT NOT NULL DEFAULT 'Việt Nam',
    marital_status VARCHAR(64) NOT NULL DEFAULT 'Độc thân',
    national_id VARCHAR(32) NOT NULL, -- CMT/CCCD
    national_id_date DATE NULL,
    national_id_place VARCHAR(255) NOT NULL DEFAULT 'Việt Nam',
    old_national_id VARCHAR(32) NULL,
    tax_code VARCHAR(32) NULL,
    bank_name VARCHAR(128) NULL,
    bank_account_number VARCHAR(64) NULL,
    bank_branch VARCHAR(255) NULL,
    education_school VARCHAR(255) NULL,
    education_major VARCHAR(255) NULL,
    education_degree VARCHAR(64) NULL,
    graduation_year INT NULL,
    other_certificates TEXT NULL,
    previous_company VARCHAR(255) NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_emp_personal_id ON employee_personal_details(national_id);
CREATE INDEX idx_emp_tax ON employee_personal_details(tax_code);

-- 4. Bảng thiết lập nhân lực & chấm công (Workforce Settings)
CREATE TABLE employee_workforce_settings (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT UNIQUE NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    attendance_code VARCHAR(32) NOT NULL DEFAULT '0000', -- Mã quét vân tay máy chấm công
    card_number VARCHAR(64) NULL, -- Mã thẻ từ RFID
    leave_approver_id BIGINT NOT NULL REFERENCES employees(id),
    attendance_explanation_days INT NOT NULL DEFAULT 4, -- Tối đa 4 ngày giải trình
    contract_start_date DATE NOT NULL,
    is_timekeeping_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workforce_att_code ON employee_workforce_settings(attendance_code);

-- 5. Bảng hồ sơ giấy tờ pháp lý nộp vào (Document Submissions)
CREATE TABLE employee_document_submissions (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT UNIQUE NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    submission_status VARCHAR(64) NOT NULL DEFAULT 'Đã nộp', -- 'Chưa nộp', 'Đã nộp', 'Bổ sung'
    submitted_documents JSONB NOT NULL DEFAULT '[]'::jsonb,
    due_date DATE NULL,
    days_remaining INT NOT NULL DEFAULT 0,
    verified_by BIGINT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Bảng nhật ký kinh nghiệm công tác & Kỹ năng (Resume Records)
CREATE TABLE employee_work_experiences (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    period VARCHAR(128) NOT NULL, -- '06/08/2021 - Hiện tại'
    company_name VARCHAR(255) NOT NULL DEFAULT 'VMO',
    job_role VARCHAR(128) NOT NULL, -- 'Tester'
    project_description TEXT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employee_skills (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    skill_name VARCHAR(128) NOT NULL,
    skill_level VARCHAR(64) NULL DEFAULT 'Intermediate',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_emp_exp ON employee_work_experiences(employee_id);
CREATE INDEX idx_emp_skills ON employee_skills(employee_id);
```

---

## 5. Quy tắc Nghiệp vụ & Bảo mật Chuyên sâu (Business Rules & Security)

* **BR-HR-01 (Tính toán thâm niên thời gian thực):**
  * Thâm niên nhân sự được tính toán tự động: `Thâm niên = CURRENT_DATE - onboarding_date`.
  * Định dạng chuỗi hiển thị: `{X} năm {Y} tháng {Z} ngày`. Nếu $X=0$, vẫn hiển thị đầy đủ để đảm bảo tính minh bạch theo thiết kế Figma.
* **BR-HR-02 (Cấu hình số ngày giải trình chấm công):**
  * Mặc định theo quy chế công ty là **4 ngày**. Nếu nhân viên vi phạm giờ công hoặc quên chấm công quá 4 ngày làm việc mà không tạo phiếu giải trình, hệ thống khóa quyền tạo giải trình cho ngày đó và ghi nhận vắng mặt không phép.
* **BR-HR-03 (Bảo mật thông tin nhân sự nhạy cảm - PII Protection):**
  * Toàn bộ 21 trường trong Accordion `Thông tin cá nhân` (CMND, STK ngân hàng, mã số thuế) chỉ được trả về khi người gọi API có quyền `ROLE_ADMIN` hoặc `ROLE_HR_MANAGER`. Tuyệt đối không trả về qua các API danh bạ công khai của nhân viên thường.
* **BR-HR-04 (Xử lý tác vụ In sơ yếu lý lịch PDF):**
  * Hệ thống sử dụng thư viện kết xuất PDF chuẩn vector độ phân giải cao (300 DPI). Tệp PDF được nhúng Watermark bảo mật mã nhân viên và ngày in để tránh rò rỉ dữ liệu doanh nghiệp ra ngoài.

---

## 6. Yêu cầu Phi Chức năng (Non-Functional Requirements - NFR)

1. **Tốc độ phản hồi giao diện Mobile (UI Fluidity):**
   * Các khối Accordion khi đóng/mở phải có hiệu ứng trượt mượt mà (Accordion Animation Transition $150 \sim 250$ ms).
   * Khi người dùng cuộn xem hồ sơ dài (chiều cao $1951$ px), thanh công cụ Sticky Action Bar (`[ XÓA ]` và `[ SỬA ]`) phải luôn ghim cố định ở đáy màn hình mà không che lấp Home Indicator của thiết bị.
2. **Hiệu năng API (API Latency & Caching):**
   * API lấy cây cơ cấu quản trị 81 đơn vị (`/api/v1/admin/employees`) phải có thời gian xử lý $\le 100$ ms.
   * Dữ liệu cây bộ lọc quản trị được lưu cache Redis với key `vmo:admin:dept_headcount_81` và được tự động làm mới khi có thay đổi nhân sự.
3. **Kiểm soát tính toàn vẹn dữ liệu (Audit Logging):**
   * Mọi thao tác chỉnh sửa bất kỳ trường nào trong 7 khối Accordion đều phải được ghi log kiểm toán chi tiết vào bảng `audit_profile_logs`, lưu vết chính xác giá trị cũ (`old_value`), giá trị mới (`new_value`), ID quản trị viên thực hiện và địa chỉ IP.
