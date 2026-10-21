# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)
## Phân hệ: Quản lý Hợp đồng Lao động & Cơ cấu Phòng ban (Labor Contracts & Department Settings)
### Cụm màn hình: Danh sách Hợp đồng, Chi tiết Lương & BHXH, In ấn Pháp lý (NDA/Thử việc), Cơ cấu Đơn vị C&B

| Thông tin | Chi tiết |
| :--- | :--- |
| **Mã tài liệu** | `SRS_MOD_CONTRACT_DEPT_001` |
| **Tên phân hệ** | Quản lý Hợp đồng Lao động & Cấu hình Cơ cấu Phòng ban (Labor Contracts & Departments) |
| **Dự án** | VMO ERP System |
| **Nền tảng** | iOS & Android (Mobile App) + Backend API Microservices |
| **Tệp thiết kế nguồn** | `ERP - App.fig` (Các màn hình: `Người quản trị - Hợp đồng` [11 biến thể tại $Y=15617$ và $Y=16987$]) |
| **Phiên bản SRS** | 2.0 (Chuẩn hóa 100% theo bản vẽ Figma) |
| **Ngày tạo** | 21/10/2026 |
| **Trạng thái** | Sẵn sàng triển khai (Ready for Dev/QA) |

---

## 1. Giới thiệu tổng quan phân hệ (Overview & Scope)

### 1.1 Mục đích tài liệu
Tài liệu này đặc tả chi tiết toàn bộ yêu cầu giao diện người dùng (UI/UX), yêu cầu chức năng (FR), quy tắc nghiệp vụ (BR), đặc tả hợp đồng API phía Backend, lược đồ cơ sở dữ liệu quan hệ (PostgreSQL Schema DDL) và các yêu cầu phi chức năng (NFR) cho phân hệ **"Quản lý Hợp đồng Lao động & Cấu hình Cơ cấu Phòng ban"** trên ứng dụng di động VMO ERP.

Phân hệ phục vụ trực tiếp cho **Quản trị viên Hệ thống (`ADMIN`)** và **Chuyên viên C&B (`HR_CB`)** nhằm:
1. Theo dõi vòng đời hợp đồng lao động của toàn bộ nhân viên (Thử việc, Chính thức, Xác định thời hạn, Không xác định thời hạn).
2. Quản lý mức lương chính thức, mức đóng Bảo hiểm Xã hội (BHXH), phụ lục hợp đồng, số ngày hiệu lực hợp đồng.
3. Thực thi in ấn hợp đồng điện tử chuẩn pháp lý: In hợp đồng thử việc, In hợp đồng bảo mật thông tin (NDA), và tự động tạo quỹ nghỉ phép năm theo quy định.
4. Quản lý danh mục cơ cấu tổ chức phòng ban chuyên sâu (Đơn vị phát triển sản xuất, Vendor, Bộ phận cấp trên, Phó QL chấm công, Phó QL Allocation).

### 1.2 Danh mục các màn hình chức năng chi tiết
1. **Chức năng 1 (`SCR_CON_001`):** Màn hình Danh sách Hợp đồng Lao động (`Người quản trị - Hợp đồng` - $375 \times 949$).
2. **Chức năng 2 (`SCR_CON_002`):** Menu Tác vụ Tệp Hợp đồng (`Tạo mới`, `Nạp tập tin`, `Tải xuống xlsx`).
3. **Chức năng 3 (`SCR_CON_003`):** Màn hình Chi tiết Hợp đồng Lao động & Các chỉ số Lương / BHXH ($375 \times 949$).
4. **Chức năng 4 (`SCR_CON_004`):** Khối Accordion mở rộng **Chi tiết hợp đồng & Ghi chú** ($375 \times 1102$).
5. **Chức năng 5 (`SCR_CON_005`):** Khối Accordion mở rộng **Đãi ngộ hàng năm & Thông tin lương** ($375 \times 1102$).
6. **Chức năng 6 (`SCR_CON_006`):** Popup Menu Tác vụ Hợp đồng tiêu chuẩn (`In`, `Lưu trữ`, `Nhân bản`, `Xóa`).
7. **Chức năng 7 (`SCR_CON_007`):** Popup Menu In ấn Pháp lý Chuyên sâu (`In HĐ thử việc`, `In HĐ bảo mật thông tin`, `Tạo nghỉ phép năm`).
8. **Chức năng 8 (`SCR_DEPT_001`):** Màn hình Danh sách Cơ cấu Phòng ban & Người Quản lý ($375 \times 812$).
9. **Chức năng 9 (`SCR_DEPT_002`):** Menu Tác vụ Phòng ban (`Tạo mới`, `Nạp tập tin`, `Tải xuống xlsx`).
10. **Chức năng 10 (`SCR_DEPT_003`):** Màn hình Chi tiết Cấu hình Phòng ban / Đơn vị C&B ($375 \times 876$).
11. **Chức năng 11 (`SCR_DEPT_004`):** Popup Menu Tác vụ Phòng ban (`Nhân bản`, `Xóa`).

---

## 2. Đặc tả chi tiết từng màn hình (Screen-by-Screen Specifications)

---

### MÀN HÌNH 1 & 2: DANH SÁCH HỢP ĐỒNG LAO ĐỘNG & MENU ACTION (`SCR_CON_001` & `SCR_CON_002`)

#### 2.1 Bố cục giao diện Mobile (Figma: Frame 1 & 2 - $375 \times 949$)
```
+-------------------------------------------------+
|  [Status Bar: Time, Wifi, Battery]              |
|  [≡]               Hợp đồng              [🔔 2] |
|                                                 |
|  +-------------------------------------------+  |
|  | [🔍 Search                               ] |  |
|  +-------------------------------------------+  |
|  [ Nút mở Bộ lọc: Ⴘ ]                           |
|                                                 |
|  ALL                    [ Action v ] [Thực hiệnv]|
|                                                 |
|  +-------------------------------------------+  |
|  | Loại hợp đồng:      Chính thức            |  |
|  | Nhân viên:          Collins Jackson - 0125|  |
|  | Vị trí làm việc:    Tester                |  |
|  | Bộ phận:            Trung Tâm PM Số 18    |  |
|  | Thời hạn hợp đồng:  5 tháng               |  |
|  | Ngày bắt đầu:       dd/mm/yyyy            |  |
|  | Ngày kết thúc:      dd/mm/yyyy            |  |
|  | Trạng thái:         [ Đang chạy ] (Xanh)  |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  | Loại hợp đồng:      Chính thức            |  |
|  | Nhân viên:          Ian Chesnut - 0123    |  |
|  | Vị trí làm việc:    Tester                |  |
|  | Bộ phận:            Trung Tâm PM Số 18    |  |
|  | Thời hạn hợp đồng:  5 tháng               |  |
|  | Ngày bắt đầu:       dd/mm/yyyy            |  |
|  | Ngày kết thúc:      dd/mm/yyyy            |  |
|  | Trạng thái:         [ Đã hết hạn ] (Vàng) |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  |                  [ Action ]               |  |
|  |  ( ) Tạo mới                              |  |
|  |  ( ) Nạp tập tin                          |  |
|  |  (*) Tải xuống xlsx                       |  |
|  +-------------------------------------------+  |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 2.2 Đặc tả các thành phần giao diện & Dữ liệu thẻ hợp đồng
1. **Header & Thanh tìm kiếm:**
   * Tiêu đề trung tâm: **`Hợp đồng`** (Font Bold, căn giữa theo thiết kế Figma).
   * Icon Hamburger `[≡]` mở Sidebar và Icon Chuông thông báo `[🔔]`.
   * Tìm kiếm nhanh theo: Mã hợp đồng, Họ tên nhân viên (`Collins Jackson`), Mã NV (`0125`), Bộ phận (`Trung Tâm PM Số 18`).
2. **Dữ liệu hiển thị trên thẻ Hợp đồng:**
   * `Loại hợp đồng`: Badge màu phân loại (Chính thức, Thử việc, Học việc, Cộng tác viên).
   * `Nhân viên`: Họ tên kèm mã nhân viên định danh.
   * `Vị trí làm việc`: Vị trí chức danh chuyên môn (`Tester`).
   * `Bộ phận`: Trung tâm / Phòng ban trực thuộc (`Trung Tâm PM Số 18`).
   * `Thời hạn hợp đồng`: Thời gian có hiệu lực (`5 tháng`, `1 năm`, `Không thời hạn`).
   * `Ngày bắt đầu` - `Ngày kết thúc`: Định dạng `dd/mm/yyyy`.
   * `Trạng thái`: 
     * `[ Đang chạy ]` (Nền xanh lá, chữ trắng): Hợp đồng đang trong thời gian hiệu lực.
     * `[ Đã hết hạn ]` (Nền vàng cam, chữ trắng): Hợp đồng đã quá hạn kết thúc cần ký phụ lục hoặc gia hạn.
3. **Menu Action Sheet:**
   * `( ) Tạo mới`: Điều hướng sang màn hình khởi tạo hợp đồng lao động mới.
   * `( ) Nạp tập tin`: Import hàng loạt hợp đồng từ file bảng tính Excel (`.xlsx`).
   * `(*) Tải xuống xlsx`: Xuất danh sách hợp đồng kèm điều kiện lọc ngày tháng ra Excel.

---

### MÀN HÌNH 3: CHI TIẾT HỢP ĐỒNG LAO ĐỘNG & CHỈ SỐ LƯƠNG/BHXH (`SCR_CON_003`)

#### 3.1 Bố cục giao diện Mobile (Figma: Frame 3 - $375 \times 949$)
Khi chạm vào một hợp đồng từ danh sách, hệ thống mở màn hình chi tiết hợp đồng:

```
+-------------------------------------------------+
|  [Status Bar]                                   |
|  [<]               Hợp đồng              [🔔 2] |
|                                                 |
|  +-------------------------------------------+  |
|  | [🔍 Search                               ] |  |
|  +-------------------------------------------+  |
|  [ Nút mở Bộ lọc: Ⴘ ]                           |
|                                                 |
|  Thông tin           [ Action v ] [Thực hiện v] |
|                                                 |
|  +-------------------------------------------+  |
|  | Nhân viên:          Collins Jackson - 0125|  |
|  | Bộ phận:            Trung Tâm PM Số 18    |  |
|  | Vị trí làm việc:    Tester                |  |
|  | Lương chính thức:   0,00                  |  |
|  | Mức đóng BHXH:      0                     |  |
|  | Phụ lục HĐ:         0                     |  |
|  | Loại hợp đồng:      Chính thức            |  |
|  | Thời hạn hợp đồng:  5 tháng               |  |
|  | Ngày bắt đầu:       dd/mm/yyyy            |  |
|  | Số ngày hiệu lực HĐ:212                   |  |
|  | Hình thức lương:    (Trống)               |  |
|  | Thời gian làm việc: Tiêu chuẩn 40 giờ/tuần|  |
|  | Trạng thái:         [ Đang chạy ]         |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  | > Chi tiết hợp đồng                       |  |
|  +-------------------------------------------+  |
|  | > Thông tin lương                         |  |
|  +-------------------------------------------+  |
|                                                 |
|  +---------------------+ +--------------------+ |
|  |      [  SỬA  ]      | |     [  TẠO  ]      | |
|  +---------------------+ +--------------------+ |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 3.2 Bảng Đặc tả Các trường Dữ liệu Hợp đồng Chi tiết
| STT | Trường thông tin | Giá trị hiển thị mẫu Figma | Kiểu dữ liệu | Ý nghĩa nghiệp vụ |
| :---: | :--- | :--- | :---: | :--- |
| 1 | **Nhân viên** | `Collins Jackson - 0125` | String | Nhân sự đứng tên ký kết hợp đồng. |
| 2 | **Bộ phận** | `Trung Tâm PM Số 18` | String | Đơn vị quản lý trực tiếp. |
| 3 | **Vị trí làm việc** | `Tester` | String | Vị trí công tác theo điều khoản hợp đồng. |
| 4 | **Lương chính thức** | `0,00` | Decimal (VND) | Mức lương cơ bản thỏa thuận ghi trên hợp đồng. |
| 5 | **Mức đóng BHXH** | `0` | Decimal (VND) | Mức lương làm căn cứ trích đóng BHXH, BHYT, BHTN. |
| 6 | **Phụ lục HĐ** | `0` | Integer | Số lượng văn bản phụ lục điều chỉnh đã ký kết. |
| 7 | **Loại hợp đồng** | `Chính thức` | String | Hình thức pháp lý của hợp đồng. |
| 8 | **Thời hạn hợp đồng** | `5 tháng` | String | Khoảng thời gian cam kết thực hiện hợp đồng. |
| 9 | **Ngày bắt đầu** | `dd/mm/yyyy` | Date | Ngày hợp đồng bắt đầu có hiệu lực pháp lý. |
| 10 | **Số ngày hiệu lực HĐ**| `212` | Integer (Days) | Số ngày tính từ ngày bắt đầu đến ngày kết thúc HĐ. |
| 11 | **Hình thức lương** | `(Trống)` | String | Lương Net, Lương Gross hoặc Lương khoán. |
| 12 | **Thời gian làm việc** | `Tiêu chuẩn 40 giờ / tuần`| String | Chế độ làm việc quy chuẩn (Thứ 2 đến Thứ 6). |
| 13 | **Trạng thái** | `Đang chạy` | Enum Badge | Trạng thái pháp lý của hợp đồng (Xanh: Đang chạy, Vàng: Đã hết hạn). |

* **Cụm nút Sticky Action Bar chân trang:**
  * Nút `[ SỬA ]`: Nền trắng viền cam, chữ cam VMO. Dùng để mở khóa form chỉnh sửa các điều khoản.
  * Nút `[ TẠO ]`: Nền cam VMO, chữ trắng. Dùng để lưu lại hợp đồng mới hoặc phát hành bản hợp đồng có hiệu lực.

---

### MÀN HÌNH 4 & 5: CÁC KHỐI ACCORDION MỞ RỘNG (`SCR_CON_004` & `SCR_CON_005`)

#### 4.1 Accordion: Chi tiết hợp đồng & Ghi chú (Figma: Frame 4)
Khi người dùng bấm vào accordion `Chi tiết hợp đồng`:
```
+-------------------------------------------------+
|  [v] Chi tiết hợp đồng                          |
|  +-------------------------------------------+  |
|  | Ghi chú                                   |  |
|  | +---------------------------------------+ |  |
|  | | Type your message here                | |  |
|  | |                                       | |  |
|  | +---------------------------------------+ |  |
|  +-------------------------------------------+  |
|  > Thông tin lương                              |
|                                                 |
|  +---------------------+ +--------------------+ |
|  |      [  SỬA  ]      | |     [  TẠO  ]      | |
|  +---------------------+ +--------------------+ |
+-------------------------------------------------+
```

#### 4.2 Accordion: Đãi ngộ hàng năm & Thông tin lương (Figma: Frame 5)
Khi người dùng bấm vào accordion `Thông tin lương`:
```
+-------------------------------------------------+
|  > Chi tiết hợp đồng                            |
|  [v] Thông tin lương                            |
|  +-------------------------------------------+  |
|  | Đãi ngộ hàng năm                          |  |
|  | +---------------------------------------+ |  |
|  | | Type your message here                | |  |
|  | |                                       | |  |
|  | +---------------------------------------+ |  |
|  +-------------------------------------------+  |
|                                                 |
|  +---------------------+ +--------------------+ |
|  |      [  SỬA  ]      | |     [  TẠO  ]      | |
|  +---------------------+ +--------------------+ |
+-------------------------------------------------+
```

---

### MÀN HÌNH 6 & 7: MENU TÁC VỤ & IN ẤN PHÁP LÝ HỢP ĐỒNG (`SCR_CON_006` & `SCR_CON_007`)

#### 5.1 Popup Menu `Thực hiện` Tiêu chuẩn (Figma: Frame 6)
Khi Quản trị viên bấm vào nút `[ Thực hiện v ]` trên màn hình:
```
+-------------------------------------------------+
|                 (Màn hình nền mờ)               |
|  +-------------------------------------------+  |
|  |                 [ Thanh gạt ]             |  |
|  |  Thực hiện                                |  |
|  |                                           |  |
|  |  (*) In                                   |  |
|  |  ( ) Lưu trữ                             |  |
|  |  ( ) Nhân bản                            |  |
|  |  ( ) Xóa                                 |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```

#### 5.2 Popup Menu In ấn Pháp lý Chuyên sâu (Figma: Frame 7)
Khi Quản trị viên chọn lệnh In hoặc xem menu hành động chuyên sâu:
```
+-------------------------------------------------+
|                 (Màn hình nền mờ)               |
|  +-------------------------------------------+  |
|  |                 [ Thanh gạt ]             |  |
|  |  Thực hiện                                |  |
|  |                                           |  |
|  |  (*) In HĐ thử việc                       |  |
|  |  ( ) In HĐ bảo mật thông tin              |  |
|  |  ( ) Tạo nghỉ phép năm                    |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```

#### 5.3 Quy tắc Nghiệp vụ 3 Lệnh Chuyên sâu:
1. **`In HĐ thử việc`:** Hệ thống tự động đổ dữ liệu từ hồ sơ vào mẫu Hợp đồng Thử việc chuẩn Bộ Lao động - Thương binh & Xã hội, kết xuất tệp PDF có mã vạch định danh hợp đồng.
2. **`In HĐ bảo mật thông tin (NDA)`:** Xuất bản cam kết bảo mật thông tin khách hàng, tài sản trí tuệ và bảo mật mã nguồn dự án VMO.
3. **`Tạo nghỉ phép năm`:** 
   * Căn cứ theo ngày bắt đầu hợp đồng chính thức, hệ thống tự động tính số tháng làm việc còn lại trong năm:
     $$\text{Quỹ phép được tạo} = \frac{12 - \text{Tháng bắt đầu HĐ} + 1}{12} \times 12 \text{ ngày}$$
   * Tự động cộng số ngày phép này vào Quỹ phép năm của nhân viên trên phân hệ [SRS_Quan_Ly_Nghi_Phep.md](file:///Users/hoangkien/project/erp/SRS_Quan_Ly_Nghi_Phep.md).

---

### MÀN HÌNH 8 & 9: DANH SÁCH CƠ CẤU PHÒNG BAN & ĐƠN VỊ (`SCR_DEPT_001` & `SCR_DEPT_002`)

#### 6.1 Bố cục giao diện Mobile (Figma: Frame 8 & 9 - $375 \times 812$)
#### 6.1 Bố cục giao diện Mobile (Figma: Frame 8 & 9 - $375 \times 812$)
Quản trị viên chuyển sang tab hoặc chế độ quản lý Cơ cấu Phòng ban:

```
+-------------------------------------------------+
|  [Status Bar: Time, Wifi, Battery]              |
|  [≡]                 Bộ phận             [🔔 2] |
|                                                 |
|  +-------------------------------------------+  |
|  | [🔍 Search                               ] |  |
|  +-------------------------------------------+  |
|  [ Nút mở Bộ lọc: Ⴘ ]                           |
|                                                 |
|  ALL                                 [ Action v ]|
|                                                 |
|  +-------------------------------------------+  |
|  | Tên hiển thị:       Tester                |  |
|  | Người quản lý:      Admin - 0000          |  |
|  | Bộ phận cấp trên:   Global                |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  | Tên hiển thị:       PMO                   |  |
|  | Người quản lý:      Admin - 0000          |  |
|  | Bộ phận cấp trên:   Bộ phận PMO           |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  | Tên hiển thị:       Tester                |  |
|  | Người quản lý:      Admin - 0000          |  |
|  | Bộ phận cấp trên:   Global                |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  | Tên hiển thị:       Sale Japan            |  |
|  | Người quản lý:      Admin - 0000          |  |
|  | Bộ phận cấp trên:   Phòng Sale            |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  |                  [ Action ]               |  |
|  |  ( ) Tạo mới                              |  |
|  |  ( ) Nạp tập tin                          |  |
|  |  (*) Tải xuống xlsx                       |  |
|  +-------------------------------------------+  |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

---

### MÀN HÌNH 10 & 11: CHI TIẾT CẤU HÌNH PHÒNG BAN C&B & MENU ACTION (`SCR_DEPT_003` & `SCR_DEPT_004`)

#### 7.1 Bố cục giao diện Mobile (Figma: Frame 10 & 11 - $375 \times 876$)
Khi bấm vào xem chi tiết một đơn vị/phòng ban (Ví dụ: `Bộ phận C&B`):

```
+-------------------------------------------------+
|  [Status Bar]                                   |
|  [≡]                 Bộ phận             [🔔 2] |
|                                                 |
|  +-------------------------------------------+  |
|  | [🔍 Search                               ] |  |
|  +-------------------------------------------+  |
|  [ Nút mở Bộ lọc: Ⴘ ]                           |
|                                                 |
|  Bộ phận C&B                         [ Thực hiện]|
|                                                 |
|  +-------------------------------------------+  |
|  | Tên bộ phận:        Bộ phận C&B           |  |
|  | Email:              (Trống)               |  |
|  | Đơn vị phát triển:  Có                    |  |
|  | Vendor:             Không                 |  |
|  | Tên rút gọn:        C&B                   |  |
|  | Mã bộ phận:         C&B                   |  |
|  | Bộ phận cấp trên:   Phòng Nhân Sự         |  |
|  | Người quản lý:      Admin - 0000          |  |
|  | Phó QL phụ trách công: (Trống)            |  |
|  | Phó QL Allocation:  (Trống)               |  |
|  | Văn phòng:          TYT8                  |  |
|  | Mô tả ngắn gọn:                           |  |
|  | +---------------------------------------+ |  |
|  | | Type your message here                | |  |
|  | +---------------------------------------+ |  |
|  +-------------------------------------------+  |
|                                                 |
|  +---------------------+ +--------------------+ |
|  |      [  SỬA  ]      | |     [  TẠO  ]      | |
|  +---------------------+ +--------------------+ |
|                                                 |
|  +-------------------------------------------+  |
|  |                 [ Thanh gạt ]             |  |
|  |  Thực hiện                                |  |
|  |                                           |  |
|  |  ( ) Nhân bản                             |  |
|  |  (*) Xóa                                  |  |
|  +-------------------------------------------+  |
|                [Home Indicator]                 |
+-------------------------------------------------+
```

#### 7.2 Chi tiết 11 Trường Dữ liệu Cấu hình Phòng ban:
1. **Tên bộ phận:** `Bộ phận C&B` (Tên đầy đủ của phòng ban/bộ phận).
2. **Tên rút gọn:** `C&B` (Tên viết tắt trên thẻ giao diện mobile).
3. **Mã bộ phận:** `C&B` (Mã code duy nhất dùng trong hệ thống ERP).
4. **Email:** Email dùng chung của phòng ban (Mailing List).
5. **Đơn vị phát triển:** `Có` / `Không` (Xác định phòng ban có thuộc khối sản xuất trực tiếp tạo ra doanh thu Billable hay không).
6. **Vendor:** `Có` / `Không` (Xác định đơn vị đối tác gia công ngoài hay nội bộ).
7. **Bộ phận cấp trên:** `Phòng Nhân Sự` (Mối quan hệ phân cấp cây cơ cấu tổ chức cha - con).
8. **Người quản lý:** `Admin - 0000` (Trưởng bộ phận phê duyệt chấm công, nghỉ phép).
9. **Phó QL phụ trách công:** Phó quản lý được ủy quyền duyệt giải trình chấm công.
10. **Phó QL Allocation:** Phó quản lý được ủy quyền duyệt phân bổ nhân sự vào các dự án.
11. **Văn phòng:** `TYT8` (Tòa nhà / Trụ sở làm việc của đơn vị).

---

## 3. Đặc tả Hợp đồng API phía Backend (Backend API Contracts)

### 3.1 API 1: Lấy danh sách Hợp đồng Lao động
* **Method:** `GET`
* **Path:** `/api/v1/admin/contracts`
* **Header:** `Authorization: Bearer <access_token>`
* **Query Parameters:** `search`, `contract_type`, `department_id`, `status`, `page`, `limit`

#### Response Thành công (`200 OK`)
```json
{
  "success": true,
  "code": 200,
  "data": {
    "total_records": 128,
    "page": 1,
    "limit": 20,
    "items": [
      {
        "id": 101,
        "contract_number": "HDLD-2021-0125",
        "employee_code": "0125",
        "employee_name": "Collins Jackson",
        "job_title": "Tester",
        "department_name": "Trung Tâm PM Số 18",
        "contract_type": "Chính thức",
        "duration_months": 5,
        "start_date": "2021-08-01",
        "end_date": "2022-01-01",
        "effective_days": 212,
        "official_salary": 18000000.0,
        "insurance_salary": 5000000.0,
        "appendix_count": 0,
        "status": "ACTIVE"
      }
    ]
  }
}
```

---

### 3.2 API 2: In ấn Hợp đồng Pháp lý (PDF Generation)
* **Method:** `POST`
* **Path:** `/api/v1/admin/contracts/{id}/print`
* **Header:** `Authorization: Bearer <access_token>`
* **Content-Type:** `application/json`

#### Request Body
```json
{
  "document_type": "PROBATION_CONTRACT", // "PROBATION_CONTRACT", "NDA_AGREEMENT"
  "include_digital_stamp": true
}
```

#### Response Thành công (`200 OK`)
```json
{
  "success": true,
  "code": 200,
  "data": {
    "document_url": "https://cdn.erp.vmodev.com/contracts/generated/HDLD_0125_PROBATION.pdf",
    "expires_at": "2026-10-22T21:15:00Z"
  }
}
```

---

### 3.3 API 3: Tự động Cấp Quỹ Nghỉ Phép Năm theo Hợp đồng
* **Method:** `POST`
* **Path:** `/api/v1/admin/contracts/{id}/generate-annual-leave`
* **Header:** `Authorization: Bearer <access_token>`

#### Response Thành công (`200 OK`)
```json
{
  "success": true,
  "code": 200,
  "message": "Đã tự động tính toán và cấp phát thành công 5.0 ngày phép năm cho nhân viên Collins Jackson theo thời hạn hợp đồng."
}
```

---

### 3.4 API 4: Cập nhật Cấu hình Phòng ban / Đơn vị
* **Method:** `PUT`
* **Path:** `/api/v1/admin/departments/{id}/config`
* **Header:** `Authorization: Bearer <access_token>`
* **Content-Type:** `application/json`

#### Request Body
```json
{
  "department_name": "Bộ phận C&B",
  "short_name": "C&B",
  "department_code": "C&B",
  "parent_department_id": 9,
  "manager_id": 1,
  "is_development_unit": true,
  "is_vendor": false,
  "deputy_manager_timekeeping_id": null,
  "deputy_manager_allocation_id": null,
  "office_location": "TYT8",
  "description": "Quản trị tiền lương, chế độ phúc lợi và chấm công nội bộ VMO Holdings."
}
```

---

## 4. Lược đồ Cơ sở Dữ liệu chuẩn hóa (PostgreSQL Schema DDL)

```sql
-- 1. Bảng quản lý Hợp đồng Lao động (Labor Contracts)
CREATE TABLE labor_contracts (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    contract_number VARCHAR(64) UNIQUE NOT NULL, -- 'HDLD-2021-0125'
    contract_type VARCHAR(64) NOT NULL DEFAULT 'Chính thức', -- 'Thử việc', 'Chính thức', 'Cộng tác viên'
    job_title VARCHAR(128) NOT NULL DEFAULT 'Tester',
    department_id INT NOT NULL REFERENCES departments(id),
    duration_months INT NOT NULL DEFAULT 5,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    effective_days INT GENERATED ALWAYS AS (
        CASE WHEN end_date IS NOT NULL THEN (end_date - start_date) ELSE 0 END
    ) STORED,
    official_salary NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    insurance_salary NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    appendix_count INT NOT NULL DEFAULT 0,
    salary_type VARCHAR(64) NULL, -- 'Net', 'Gross'
    working_hours_scheme VARCHAR(128) NOT NULL DEFAULT 'Tiêu chuẩn 40 giờ / tuần',
    notes TEXT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'EXPIRED', 'TERMINATED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contracts_emp ON labor_contracts(employee_id);
CREATE INDEX idx_contracts_dept ON labor_contracts(department_id);
CREATE INDEX idx_contracts_status ON labor_contracts(status);

-- 2. Bảng phúc lợi & đãi ngộ hàng năm theo hợp đồng (Contract Benefits)
CREATE TABLE contract_annual_benefits (
    id BIGSERIAL PRIMARY KEY,
    contract_id BIGINT UNIQUE NOT NULL REFERENCES labor_contracts(id) ON DELETE CASCADE,
    thirteenth_month_bonus VARCHAR(255) NOT NULL DEFAULT 'Theo kết quả kinh doanh',
    lunch_allowance BOOLEAN NOT NULL DEFAULT TRUE,
    healthcare_package VARCHAR(255) NOT NULL DEFAULT 'VMO Care Premium',
    health_check_frequency VARCHAR(64) NOT NULL DEFAULT '1 lần / năm',
    teambuilding_eligible BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng cấu hình chuyên sâu phòng ban / đơn vị (Department Detailed Settings)
CREATE TABLE department_detailed_settings (
    id SERIAL PRIMARY KEY,
    department_id INT UNIQUE NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    short_name VARCHAR(64) NOT NULL, -- 'C&B', 'PM18'
    shared_email VARCHAR(255) NULL,
    is_development_unit BOOLEAN NOT NULL DEFAULT FALSE, -- 'Đơn vị phát triển: Có/Không'
    is_vendor BOOLEAN NOT NULL DEFAULT FALSE, -- 'Vendor: Có/Không'
    parent_department_id INT NULL REFERENCES departments(id),
    manager_id BIGINT NOT NULL REFERENCES employees(id),
    deputy_manager_timekeeping_id BIGINT NULL REFERENCES employees(id),
    deputy_manager_allocation_id BIGINT NULL REFERENCES employees(id),
    office_location VARCHAR(128) NOT NULL DEFAULT 'TYT8',
    description TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_dept_settings_mgr ON department_detailed_settings(manager_id);
CREATE INDEX idx_dept_settings_parent ON department_detailed_settings(parent_department_id);

-- 4. Bảng nhật ký kiểm toán hợp đồng & in ấn (Contract Audit Logs)
CREATE TABLE audit_contract_logs (
    id BIGSERIAL PRIMARY KEY,
    contract_id BIGINT NOT NULL REFERENCES labor_contracts(id) ON DELETE CASCADE,
    action VARCHAR(64) NOT NULL, -- 'PRINT_PROBATION', 'PRINT_NDA', 'GENERATE_LEAVE', 'UPDATE'
    performed_by BIGINT NOT NULL REFERENCES users(id),
    ip_address VARCHAR(45) NOT NULL,
    metadata JSONB NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_contract ON audit_contract_logs(contract_id, created_at DESC);
```

---

## 5. Quy tắc Nghiệp vụ (Business Rules)

* **BR-CON-01 (Tính toán Số ngày hiệu lực HĐ):**
  * Giá trị `Số ngày hiệu lực HĐ` được tính tự động tại tầng cơ sở dữ liệu (PostgreSQL Generated Column): `effective_days = end_date - start_date`. Nếu hợp đồng vô thời hạn (`end_date = NULL`), giá trị hiển thị là *Vô thời hạn*.
* **BR-CON-02 (Quy định Phân quyền Truy cập Dữ liệu Lương & BHXH):**
  * Thông tin `Lương chính thức` và `Mức đóng BHXH` là dữ liệu tuyệt mật cấp 1 (Confidential Level 1).
  * Chỉ duy nhất người dùng có vai trò `ROLE_ADMIN` hoặc `ROLE_HR_CB` mới có thể xem hoặc chỉnh sửa. Nếu tài khoản khác (kể cả Line Manager thông thường) cố tình truy cập, API trả về `403 Forbidden`.
* **BR-CON-03 (Tạo Quỹ Nghỉ phép năm tự động):**
  * Khi bấm `Tạo nghỉ phép năm`, hệ thống thực hiện kiểm tra chéo xem nhân viên đã có quỹ phép năm trong năm tài chính hiện tại chưa. Nếu chưa có, hệ thống tính toán số tháng làm việc thực tế từ ngày bắt đầu hợp đồng đến hết ngày 31/12 để cấp hạn mức phép tương ứng, đồng thời ghi log kiểm toán vào `audit_contract_logs`.

---

## 6. Yêu cầu Phi Chức năng (Non-Functional Requirements - NFR)

1. **Bảo mật Tài liệu Pháp lý & PDF:**
   * Tệp PDF hợp đồng khi kết xuất phải được bảo vệ bằng chữ ký số nội bộ (Internal Digital Signature) của VMO Holdings. Đường dẫn tải tệp (`document_url`) được cấp qua AWS S3 Pre-signed URL với thời hạn sống tối đa 15 phút.
2. **Hiệu năng Tìm kiếm & Phân trang:**
   * Truy vấn danh sách hợp đồng kèm bộ lọc đa tiêu chí (Trạng thái, Loại hợp đồng, Phòng ban) với dữ liệu 1,000+ hợp đồng phải trả kết quả trong vòng $\le 120$ ms.
3. **Đồng bộ Dữ liệu với Hệ thống Chấm công & Phép:**
   * Khi trạng thái hợp đồng chuyển sang `TERMINATED` (Chấm dứt hợp đồng), hệ thống tự động khóa thẻ chấm công và đóng quyền xin nghỉ phép của nhân viên tương ứng.
