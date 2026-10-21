// Figma Plugin Script: VMO ERP - Web Admin Screen Generator (10 Modules SRS)
// Author: VMO ERP Team

async function main() {
  // 1. Safe font loading with multi-tier fallbacks
  let fontRegular = { family: "Inter", style: "Regular" };
  let fontBold = { family: "Inter", style: "Bold" };

  try {
    await figma.loadFontAsync(fontRegular);
    await figma.loadFontAsync(fontBold);
  } catch (e1) {
    try {
      fontRegular = { family: "Roboto", style: "Regular" };
      fontBold = { family: "Roboto", style: "Bold" };
      await figma.loadFontAsync(fontRegular);
      await figma.loadFontAsync(fontBold);
    } catch (e2) {
      try {
        fontRegular = { family: "Arial", style: "Regular" };
        fontBold = { family: "Arial", style: "Bold" };
        await figma.loadFontAsync(fontRegular);
        await figma.loadFontAsync(fontBold);
      } catch (e3) {
        const available = await figma.listAvailableFontsAsync();
        if (available && available.length > 0) {
          fontRegular = available[0].fontName;
          fontBold = available[0].fontName;
          await figma.loadFontAsync(fontRegular);
        }
      }
    }
  }

  // 2. Create or reuse Web Admin page
  let page = figma.root.children.find(p => p.name.includes("Web Admin Portal"));
  if (!page) {
    page = figma.createPage();
    page.name = "🌐 Web Admin Portal (10 Modules SRS)";
  }
  figma.currentPage = page;

  // Colors
  const C = {
    orange: { r: 1.0, g: 0.478, b: 0.0 },         // #FF7A00
    orangeBg: { r: 1.0, g: 0.94, b: 0.88 },
    white: { r: 1.0, g: 1.0, b: 1.0 },
    bgLight: { r: 0.965, g: 0.973, b: 0.984 },   // #F6F8FB
    textMain: { r: 0.118, g: 0.161, b: 0.235 },   // #1E293B
    textSec: { r: 0.435, g: 0.494, b: 0.584 },    // #6F7E95
    border: { r: 0.898, g: 0.914, b: 0.937 },     // #E5E9EF
    greenBg: { r: 0.925, g: 0.976, b: 0.925 },
    greenText: { r: 0.208, g: 0.655, b: 0.278 },
    amberBg: { r: 1.0, g: 0.969, b: 0.886 },
    amberText: { r: 0.855, g: 0.541, b: 0.0 },
    redBg: { r: 1.0, g: 0.925, b: 0.925 },
    redText: { r: 0.898, g: 0.224, b: 0.208 },
    purpleBg: { r: 0.957, g: 0.925, b: 0.988 },
    purpleText: { r: 0.533, g: 0.282, b: 0.824 },
    blueBg: { r: 0.918, g: 0.953, b: 0.996 },
    blueText: { r: 0.125, g: 0.467, b: 0.882 }
  };

  // Helper primitives
  function colorFill(color, opacity = 1) {
    return [{ type: 'SOLID', color: color, opacity: opacity }];
  }

  function addRect(parent, name, x, y, w, h, bg, radius = 0, stroke = null, strokeW = 1) {
    const rect = figma.createRectangle();
    rect.name = name;
    rect.x = x;
    rect.y = y;
    rect.resize(Math.max(1, w), Math.max(1, h));
    if (bg) rect.fills = colorFill(bg);
    else rect.fills = [];
    if (radius > 0) rect.cornerRadius = radius;
    if (stroke) {
      rect.strokes = colorFill(stroke);
      rect.strokeWeight = strokeW;
    }
    parent.appendChild(rect);
    return rect;
  }

  function addText(parent, name, text, x, y, w, h, size, isBold, color, align = "LEFT") {
    const t = figma.createText();
    t.name = name;
    t.fontName = isBold ? fontBold : fontRegular;
    t.fontSize = size;
    t.characters = String(text != null ? text : "");
    t.fills = colorFill(color);
    if (w > 0 && h > 0) {
      t.textAutoResize = "NONE";
      t.resize(Math.max(1, w), Math.max(1, h));
      if (align === "CENTER") t.textAlignHorizontal = "CENTER";
      else if (align === "RIGHT") t.textAlignHorizontal = "RIGHT";
      else t.textAlignHorizontal = "LEFT";
      t.textAlignVertical = "CENTER";
    } else {
      t.textAutoResize = "WIDTH_AND_HEIGHT";
      if (align === "CENTER") t.textAlignHorizontal = "CENTER";
      else if (align === "RIGHT") t.textAlignHorizontal = "RIGHT";
      else t.textAlignHorizontal = "LEFT";
    }
    t.x = x;
    t.y = y;
    parent.appendChild(t);
    return t;
  }

  function addBadge(parent, text, x, y, type = "success") {
    let bg = C.greenBg;
    let fg = C.greenText;
    if (type === "warning") { bg = C.amberBg; fg = C.amberText; }
    else if (type === "danger") { bg = C.redBg; fg = C.redText; }
    else if (type === "purple") { bg = C.purpleBg; fg = C.purpleText; }
    else if (type === "blue") { bg = C.blueBg; fg = C.blueText; }
    else if (type === "primary") { bg = C.orangeBg; fg = C.orange; }

    const w = text.length * 7.5 + 20;
    addRect(parent, `Badge_${text}`, x, y, w, 24, bg, 12);
    addText(parent, "Badge_Txt", text, x, y, w, 24, 11, true, fg, "CENTER");
    return w;
  }

  function addButton(parent, text, x, y, w, h, isPrimary) {
    const bg = isPrimary ? C.orange : C.white;
    const fg = isPrimary ? C.white : C.textMain;
    const stroke = isPrimary ? null : C.border;
    addRect(parent, `Btn_${text}`, x, y, w, h, bg, 6, stroke, 1);
    addText(parent, "Btn_Txt", text, x, y, w, h, 13, true, fg, "CENTER");
  }

  function addTopbar(parent, activeTab) {
    addRect(parent, "Topbar_Bg", 0, 0, 1440, 64, C.white, 0, C.border, 1);
    addRect(parent, "Logo_Box", 24, 16, 32, 32, C.orange, 8);
    addText(parent, "Logo_V", "V", 24, 16, 32, 32, 18, true, C.white, "CENTER");
    addText(parent, "Brand_Txt", "VMO ERP", 68, 20, 100, 24, 16, true, C.textMain, "LEFT");

    const tabs = ["Tổng quan", "Nhân viên", "Chấm công", "Ngày nghỉ", "Dự án", "Thảo luận", "Hướng dẫn"];
    let tx = 180;
    tabs.forEach(tab => {
      const active = tab === activeTab;
      const tw = tab.length * 9 + 20;
      if (active) addRect(parent, `Tab_Bg_${tab}`, tx, 16, tw, 32, C.orangeBg, 16);
      addText(parent, `Tab_${tab}`, tab, tx, 16, tw, 32, 13, active, active ? C.orange : C.textSec, "CENTER");
      tx += tw + 10;
    });

    addRect(parent, "Search_Box", 1040, 16, 220, 32, C.bgLight, 16, C.border, 1);
    addText(parent, "Search_Ph", "🔍 Tìm kiếm (Ctrl+K)...", 1056, 22, 190, 20, 12, false, C.textSec);

    addRect(parent, "Bell_Circle", 1280, 16, 32, 32, C.bgLight, 16, C.border, 1);
    addText(parent, "Bell_Icon", "🔔", 1280, 22, 32, 20, 13, false, C.textMain, "CENTER");
    addRect(parent, "Bell_Dot", 1302, 14, 14, 14, C.redText, 7);
    addText(parent, "Bell_Num", "2", 1302, 14, 14, 14, 9, true, C.white, "CENTER");

    addRect(parent, "User_Avatar", 1334, 16, 32, 32, C.orange, 16);
    addText(parent, "User_Init", "AD", 1334, 16, 32, 32, 11, true, C.white, "CENTER");
    addText(parent, "User_Name", "Admin ▾", 1374, 22, 50, 20, 13, true, C.textMain);
  }

  function addBreadcrumb(parent, path) {
    addText(parent, "Breadcrumb", path, 32, 80, 700, 20, 12, false, C.textSec);
    addText(parent, "SysStatus", "21/10/2026 16:00 • Trực tuyến", 1120, 80, 288, 20, 12, false, C.textSec, "RIGHT");
  }

  console.log("Generating 10 screens...");

  // --------------------------------------------------------------------------
  // SCREEN 1: LOGIN (SCR_WEB_LOGIN_001)
  // --------------------------------------------------------------------------
  {
    const f = figma.createFrame();
    f.name = "01 - Đăng nhập Cổng Quản trị (SCR_WEB_LOGIN_001)";
    f.resize(1440, 1024);
    f.x = 0; f.y = 0;
    f.fills = colorFill(C.bgLight);
    page.appendChild(f);

    addRect(f, "Left_Banner", 0, 0, 720, 1024, C.orange);
    addText(f, "Hero_Title", "VMO ENTERPRISE ERP", 80, 280, 560, 40, 32, true, C.white);
    addText(f, "Hero_Sub", "HỆ THỐNG QUẢN TRỊ NGUỒN LỰC DOANH NGHIỆP", 80, 330, 560, 24, 16, true, C.orangeBg);
    addText(f, "Hero_Desc", "Cổng thông tin điều hành tập trung: Quản lý 921+ Nhân sự, Cơ cấu 81 Đơn vị, Chấm công Biometric IoT, Lịch làm thêm giờ OT và Quỹ phép năm.", 80, 370, 560, 70, 14, false, C.white);
    addBadge(f, "CHỨNG CHỈ ISO/IEC 27001", 80, 470, "purple");
    addBadge(f, "BẢO MẬT ARGON2ID & PHIÊN HTTPONLY", 270, 470, "blue");
    addText(f, "Footer_Ver", "VMO ERP Platform v2.0 Enterprise • 2026", 80, 940, 400, 20, 12, false, C.orangeBg);

    addRect(f, "Card_Login", 840, 160, 480, 700, C.white, 16, C.border, 1);
    addBadge(f, "CỔNG QUẢN TRỊ VIÊN", 880, 200, "primary");
    addText(f, "Login_Head", "Đăng nhập Quản trị", 880, 240, 400, 36, 26, true, C.textMain);
    addText(f, "Login_Sub", "Vui lòng sử dụng tài khoản doanh nghiệp có thẩm quyền quản trị.", 880, 280, 400, 20, 13, false, C.textSec);

    addText(f, "Lbl_Email", "Email doanh nghiệp hoặc Mã nhân viên [*]", 880, 330, 400, 18, 12, true, C.textMain);
    addRect(f, "Inp_Email", 880, 355, 400, 48, C.bgLight, 8, C.border, 1);
    addText(f, "Val_Email", "admin@vmo-group.com", 900, 368, 360, 20, 14, false, C.textMain);

    addText(f, "Lbl_Pwd", "Mật khẩu quản trị [*]", 880, 425, 400, 18, 12, true, C.textMain);
    addRect(f, "Inp_Pwd", 880, 450, 400, 48, C.bgLight, 8, C.border, 1);
    addText(f, "Val_Pwd", "••••••••••••••••", 900, 465, 320, 20, 14, false, C.textMain);
    addText(f, "Eye_Icon", "👁️", 1240, 465, 30, 20, 14, false, C.textSec, "CENTER");

    addButton(f, "ĐĂNG NHẬP VÀO HỆ THỐNG", 880, 550, 400, 50, true);
    addButton(f, "Đăng nhập bằng Google Workspace (@vmo-group.com)", 880, 620, 400, 48, false);

    addRect(f, "Captcha", 880, 710, 400, 48, C.bgLight, 6, C.border, 1);
    addText(f, "Cap_Txt", "🛡️ Cloudflare Turnstile • Kết nối bảo mật SSL/TLS 1.3", 895, 725, 370, 20, 11, false, C.textSec);
  }

  // --------------------------------------------------------------------------
  // SCREEN 2: DIRECTORY MASTER TABLE (SCR_WEB_HR_001)
  // --------------------------------------------------------------------------
  {
    const f = figma.createFrame();
    f.name = "02 - Danh bạ Nhân sự & Bộ lọc 81 Đơn vị (SCR_WEB_HR_001)";
    f.resize(1440, 1024);
    f.x = 1640; f.y = 0;
    f.fills = colorFill(C.bgLight);
    page.appendChild(f);

    addTopbar(f, "Nhân viên");
    addBreadcrumb(f, "Trang chủ > Quản trị Nhân sự > Danh bạ Cư dân VMO (81 Đơn vị)");

    // Quick Tabs
    const tabs = ["Tất cả (81)", "BOD (10)", "HR (5)", "Kinh doanh (1)", "QA (2)", "SWAT (1)", "PM 18 (2)", "Global (7)"];
    let tx = 32;
    tabs.forEach((t, i) => {
      const w = t.length * 8 + 18;
      const act = i === 0;
      addRect(f, `QTab_${i}`, tx, 115, w, 36, act ? C.orange : C.white, 8, act ? null : C.border, 1);
      addText(f, `QTabTxt_${i}`, t, tx, 115, w, 36, 12, act, act ? C.white : C.textSec, "CENTER");
      tx += w + 8;
    });

    addRect(f, "Search_HR", 32, 170, 360, 42, C.white, 8, C.border, 1);
    addText(f, "Search_HR_Ph", "🔍 Tìm theo Tên, Mã NV, Chức vụ...", 48, 182, 330, 20, 13, false, C.textSec);

    addRect(f, "OrgTree_Btn", 410, 170, 280, 42, C.white, 8, C.border, 1);
    addText(f, "OrgTree_Txt", "🏢 Cây đơn vị: Tất cả 81 đơn vị ▾", 426, 182, 250, 20, 13, false, C.textMain);

    addButton(f, "[+] Tạo mới nhân sự", 940, 170, 150, 42, true);
    addButton(f, "[^] Smart Import Excel", 1105, 170, 160, 42, false);
    addButton(f, "[v] Xuất XLSX", 1280, 170, 128, 42, false);

    // Table
    addRect(f, "Table_Card", 32, 230, 1376, 700, C.white, 12, C.border, 1);
    addRect(f, "Table_Head", 32, 230, 1376, 48, C.bgLight);

    const cols = [
      { name: "[ ]", x: 50 }, { name: "MÃ NV", x: 90 }, { name: "HỌ VÀ TÊN", x: 180 },
      { name: "BỘ PHẬN", x: 400 }, { name: "VỊ TRÍ / CHỨC DANH", x: 600 }, { name: "TRỤ SỞ", x: 780 },
      { name: "HỢP ĐỒNG", x: 900 }, { name: "THÂM NIÊN", x: 1030 }, { name: "TRẠNG THÁI", x: 1200 }, { name: "THAO TÁC", x: 1320 }
    ];
    cols.forEach(c => addText(f, `Col_${c.name}`, c.name, c.x, 244, 150, 20, 11, true, C.textSec));

    const rows = [
      { code: "0123", name: "Ian Chesnut", dept: "Trung Tâm PM Số 18", role: "Tester (Rank 2)", office: "IDMC 5", contract: "Thử việc", tenure: "0 năm 8 tháng 8 ngày", status: "Đang làm việc", st: "success" },
      { code: "0125", name: "Collins Jackson", dept: "Trung Tâm PM Số 18", role: "Tester (Rank 1)", office: "IDMC 5", contract: "Thử việc", tenure: "0 năm 8 tháng 8 ngày", status: "Đang làm việc", st: "success" },
      { code: "0006", name: "Nguyen Van B", dept: "PATIENT VIỆT NAM", role: "Giám đốc Trung tâm", office: "TTC11", contract: "Chính thức", tenure: "3 năm 2 tháng 12 ngày", status: "Đang làm việc", st: "success" },
      { code: "2611", name: "Nguyễn Văn Quản Lý", dept: "Global PM18", role: "DUL Quản lý", office: "TTC11", contract: "Chính thức", tenure: "4 năm 1 tháng 0 ngày", status: "Đang làm việc", st: "success" },
      { code: "4412", name: "Nguyen Van A", dept: "UI/UX Design", role: "Designer", office: "CT11", contract: "Chính thức", tenure: "1 năm 6 tháng 5 ngày", status: "Đang làm việc", st: "success" },
      { code: "0098", name: "Trần Thị Thu Trang", dept: "HR Dept", role: "C&B Specialist", office: "TTC11", contract: "Chính thức", tenure: "2 năm 0 tháng 15 ngày", status: "Nghỉ thai sản", st: "warning" }
    ];

    rows.forEach((r, i) => {
      const ry = 285 + i * 64;
      addRect(f, `Line_${i}`, 32, ry + 60, 1376, 1, C.border);
      addText(f, `Chk_${i}`, "[ ]", 50, ry + 20, 30, 20, 12, false, C.textSec);
      addBadge(f, r.code, 90, ry + 16, "blue");
      addText(f, `Name_${i}`, r.name, 180, ry + 20, 200, 20, 13, true, C.textMain);
      addText(f, `Dept_${i}`, r.dept, 400, ry + 20, 180, 20, 13, false, C.textMain);
      addText(f, `Role_${i}`, r.role, 600, ry + 20, 160, 20, 13, false, C.textMain);
      addText(f, `Off_${i}`, r.office, 780, ry + 20, 100, 20, 13, false, C.textSec);
      addText(f, `Cont_${i}`, r.contract, 900, ry + 20, 110, 20, 13, false, C.textMain);
      addText(f, `Ten_${i}`, r.tenure, 1030, ry + 20, 150, 20, 12, false, C.textSec);
      addBadge(f, r.status, 1200, ry + 16, r.st);
      addText(f, `Act_${i}`, "✏️  👁️  ⋮", 1320, ry + 20, 80, 20, 14, false, C.textSec);
    });

    addText(f, "Pag_Info", "Hiển thị 1 - 6 trong tổng số 81 nhân sự", 50, 890, 400, 20, 12, false, C.textSec);
    addButton(f, "< Trước", 1150, 880, 80, 32, false);
    addButton(f, "1", 1240, 880, 32, 32, true);
    addButton(f, "2", 1280, 880, 32, 32, false);
    addButton(f, "Sau >", 1320, 880, 75, 32, false);
  }

  // --------------------------------------------------------------------------
  // SCREEN 3: HỒ SƠ 360 & 7 TAB (SCR_WEB_HR_PROFILE_001)
  // --------------------------------------------------------------------------
  {
    const f = figma.createFrame();
    f.name = "03 - Hồ sơ Nhân sự 360° (SCR_WEB_HR_PROFILE_001)";
    f.resize(1440, 1024);
    f.x = 3280; f.y = 0;
    f.fills = colorFill(C.bgLight);
    page.appendChild(f);

    addTopbar(f, "Nhân viên");
    addBreadcrumb(f, "Trang chủ > Quản trị Nhân sự > Hồ sơ Chi tiết 360° > Ian Chesnut (0123)");

    addButton(f, "< Quay lại", 32, 115, 100, 36, false);
    addButton(f, "🗑️ Xóa/Lưu trữ", 920, 115, 120, 36, false);
    addButton(f, "✏️ Chỉnh sửa", 1050, 115, 110, 36, true);
    addButton(f, "🚀 Launch Plan", 1170, 115, 120, 36, false);
    addButton(f, "⚡ Thực hiện ▾", 1300, 115, 108, 36, false);

    // Left summary card
    addRect(f, "Summ_Card", 32, 170, 360, 810, C.white, 12, C.border, 1);
    addRect(f, "Ava_Lg", 132, 200, 160, 160, C.orange, 80);
    addText(f, "Ava_Txt", "IC", 132, 200, 160, 160, 48, true, C.white, "CENTER");

    addText(f, "P_Name", "Ian Chesnut", 52, 380, 320, 28, 20, true, C.textMain, "CENTER");
    addText(f, "P_Sub", "Tester • Mã NV: 0123", 52, 410, 320, 20, 13, false, C.textSec, "CENTER");
    addBadge(f, "ĐANG LÀM VIỆC", 100, 440, "success");
    addBadge(f, "HĐ: THỬ VIỆC", 230, 440, "warning");

    addRect(f, "S_Line", 52, 480, 320, 1, C.border);
    addText(f, "T1", "Thâm niên công tác: 0 năm 8 tháng 8 ngày", 52, 500, 320, 20, 13, true, C.orange);
    addText(f, "T2", "Bậc thâm niên: Cấp bậc 0", 52, 530, 320, 20, 12, false, C.textMain);
    addText(f, "T3", "Bộ phận: Global - Trung Tâm PM Số 18", 52, 560, 320, 20, 12, false, C.textMain);
    addText(f, "T4", "Quản lý trực tiếp: DUL - 2611", 52, 590, 320, 20, 12, false, C.textMain);

    addRect(f, "Comp_Card", 52, 630, 320, 110, C.bgLight, 8, C.border, 1);
    addText(f, "C_Title", "HỒ SƠ PHÁP LÝ: ĐÃ NỘP 5/7 (85%)", 68, 642, 280, 18, 11, true, C.textMain);
    addRect(f, "C_BarBg", 68, 668, 288, 10, C.border, 5);
    addRect(f, "C_BarFill", 68, 668, 245, 10, C.orange, 5);
    addText(f, "C_Count", "⏳ Hạn chót bổ sung: Còn 4 ngày", 68, 690, 288, 18, 11, false, C.redText);

    // Right Tabs card
    addRect(f, "Tab_Card_HR", 416, 170, 992, 810, C.white, 12, C.border, 1);
    const pTabs = ["1. Resumé", "2. Liên hệ", "3. Công việc", "4. Cá nhân (PII)", "5. Hợp đồng", "6. Hồ sơ nộp", "7. Thiết lập"];
    let ptx = 432;
    pTabs.forEach((pt, pi) => {
      const act = pi === 2;
      const tw = pt.length * 8 + 16;
      if (act) addRect(f, `PT_Bg_${pi}`, ptx, 186, tw, 36, C.orangeBg, 6);
      addText(f, `PT_Txt_${pi}`, pt, ptx, 186, tw, 36, 12, act, act ? C.orange : C.textSec, "CENTER");
      ptx += tw + 8;
    });

    addText(f, "J_Head", "THÔNG TIN CÔNG VIỆC & BỔ NHIỆM CHỨC DANH", 440, 250, 400, 20, 14, true, C.textMain);
    addRect(f, "J_Line", 440, 280, 940, 1, C.border);

    const jFields = [
      "Email công việc: ian.chesnut@vmo-group.com",
      "Trụ sở làm việc: TTC11 (Tòa nhà TTC, Duy Tân, Cầu Giấy, Hà Nội)",
      "Cấp bậc chuyên môn: Tester (Rank 2) - Mid-level QA Engineer",
      "Bậc chức danh: abc",
      "Trạng thái làm việc: Đang làm việc (Toàn thời gian)",
      "Quản lý trực tiếp: DUL - 2611 (Nguyễn Văn Quản Lý - PM18)",
      "Ngày gia nhập: 30/07/2021",
      "Ngày kết thúc thử việc: 30/09/2021",
      "Dự án phân bổ hiện tại: Global Patient Portal (Lead Tester - 100%)"
    ];

    jFields.forEach((jf, ji) => {
      addText(f, `JF_${ji}`, jf, 440, 305 + ji * 46, 900, 20, 13, false, C.textMain);
    });

    addRect(f, "Bio_Box", 440, 780, 940, 80, C.bgLight, 8, C.border, 1);
    addText(f, "Bio_Title", "ĐỒNG BỘ MÁY CHẤM CÔNG BIOMETRIC IOT CONSOLE", 460, 795, 600, 20, 12, true, C.textMain);
    addText(f, "Bio_Desc", "Mã vân tay: 0123 • Mã thẻ từ RFID: 0012938472 • Máy: TTC11 & IDMC5 • SLA Giải trình: 4 ngày", 460, 825, 800, 20, 12, false, C.textSec);
  }

  // --------------------------------------------------------------------------
  // SCREEN 4: CHẤM CÔNG SPREADSHEET (SCR_WEB_ATT_001)
  // --------------------------------------------------------------------------
  {
    const f = figma.createFrame();
    f.name = "04 - Quản lý Chấm công Spreadsheet (SCR_WEB_ATT_001)";
    f.resize(1440, 1024);
    f.x = 4920; f.y = 0;
    f.fills = colorFill(C.bgLight);
    page.appendChild(f);

    addTopbar(f, "Chấm công");
    addBreadcrumb(f, "Trang chủ > Quản lý Chấm công > Bảng Tổng hợp Chấm công Spreadsheet 31 Ngày");

    addRect(f, "Month_Box", 32, 115, 200, 42, C.white, 8, C.border, 1);
    addText(f, "Month_Txt", "📅 Tháng 10/2026 ▾", 48, 115, 160, 42, 13, true, C.textMain);

    addBadge(f, "MÁY CHẤM CÔNG IOT: 3/3 ONLINE", 250, 124, "success");
    addButton(f, "📥 Nạp Biometric IoT", 920, 115, 170, 42, false);
    addButton(f, "🔒 Khóa công tháng", 1100, 115, 150, 42, false);
    addButton(f, "📊 Xuất Bảng lương", 1260, 115, 148, 42, true);

    addRect(f, "Grid_Card", 32, 175, 1376, 760, C.white, 12, C.border, 1);
    addText(f, "Leg_Title", "KÝ HIỆU CHẤM CÔNG:", 48, 190, 150, 20, 11, true, C.textSec);
    addBadge(f, "1.0 Đủ công", 190, 188, "success");
    addBadge(f, "0.5 Nửa ngày", 290, 188, "warning");
    addBadge(f, "M836 Đi muộn", 400, 188, "danger");
    addBadge(f, "P Có phép", 510, 188, "purple");
    addBadge(f, "WFH Tại nhà", 610, 188, "blue");

    addRect(f, "Grid_Head", 32, 225, 1376, 40, C.bgLight);
    addText(f, "GH_Emp", "NHÂN VIÊN / ĐƠN VỊ", 48, 225, 220, 40, 11, true, C.textSec);

    let dx = 280;
    for (let d = 1; d <= 20; d++) {
      addText(f, `Day_${d}`, `${d}`, dx, 225, 36, 40, 11, true, C.textSec, "CENTER");
      dx += 42;
    }
    addText(f, "GH_Tot", "TỔNG CÔNG", 1140, 225, 90, 40, 11, true, C.textSec, "CENTER");
    addText(f, "GH_Late", "MUỘN (H)", 1240, 225, 80, 40, 11, true, C.textSec, "CENTER");
    addText(f, "GH_Sal", "LƯƠNG", 1330, 225, 60, 40, 11, true, C.textSec, "CENTER");

    const aRows = [
      { name: "Ian Chesnut (0123)", dept: "Global PM18", tot: "21.5", late: "0.2", sal: "22.0" },
      { name: "Collins Jackson (0125)", dept: "Global PM18", tot: "22.0", late: "0.0", sal: "22.0" },
      { name: "Nguyen Van B (0006)", dept: "PATIENT VN", tot: "20.0", late: "1.5", sal: "21.5" },
      { name: "Nguyễn Văn Quản Lý (2611)", dept: "DUL PM18", tot: "22.0", late: "0.0", sal: "22.0" },
      { name: "Nguyen Van A (4412)", dept: "UI/UX Design", tot: "19.5", late: "0.0", sal: "20.5" },
      { name: "Trần Thị Thu Trang (0098)", dept: "HR Dept", tot: "12.0", late: "0.0", sal: "12.0" }
    ];

    aRows.forEach((ar, ai) => {
      const ry = 275 + ai * 60;
      addRect(f, `ALine_${ai}`, 32, ry + 58, 1376, 1, C.border);
      addText(f, `AName_${ai}`, ar.name, 48, ry + 12, 220, 18, 13, true, C.textMain);
      addText(f, `ADept_${ai}`, ar.dept, 48, ry + 32, 220, 16, 11, false, C.textSec);

      let cx = 280;
      for (let d = 1; d <= 20; d++) {
        let code = "1.0";
        let bg = C.greenBg;
        let fg = C.greenText;
        if (d === 6 || d === 13) { code = "M"; bg = C.redBg; fg = C.redText; }
        else if (d === 10) { code = "P"; bg = C.purpleBg; fg = C.purpleText; }
        else if (d === 15) { code = "W"; bg = C.blueBg; fg = C.blueText; }

        addRect(f, `Cell_${ai}_${d}`, cx + 2, ry + 16, 36, 26, bg, 4);
        addText(f, `CT_${ai}_${d}`, code, cx + 2, ry + 16, 36, 26, 10, true, fg, "CENTER");
        cx += 42;
      }

      addText(f, `ATot_${ai}`, ar.tot, 1140, ry + 20, 90, 20, 13, true, C.textMain, "CENTER");
      addText(f, `ALate_${ai}`, ar.late, 1240, ry + 20, 80, 20, 13, false, ar.late !== "0.0" ? C.redText : C.textSec, "CENTER");
      addText(f, `ASal_${ai}`, ar.sal, 1330, ry + 20, 60, 20, 13, true, C.orange, "CENTER");
    });
  }

  // --------------------------------------------------------------------------
  // SCREEN 5: NGHỈ PHÉP & GANTT (SCR_WEB_LEAVE_001)
  // --------------------------------------------------------------------------
  {
    const f = figma.createFrame();
    f.name = "05 - Quản lý Nghỉ phép & Lịch Gantt (SCR_WEB_LEAVE_001)";
    f.resize(1440, 1024);
    f.x = 6560; f.y = 0;
    f.fills = colorFill(C.bgLight);
    page.appendChild(f);

    addTopbar(f, "Ngày nghỉ");
    addBreadcrumb(f, "Trang chủ > Quản lý Nghỉ phép > Lịch Đơn xin nghỉ & Sổ cái Quỹ phép");

    const kpis = [
      { t: "ĐƠN CHỜ DUYỆT", v: "14 đơn", c: C.redText },
      { t: "ĐÃ DUYỆT THÁNG NÀY", v: "88 đơn", c: C.greenText },
      { t: "VẮNG MẶT HÔM NAY", v: "6 người", c: C.orange },
      { t: "CẢNH BÁO XUNG ĐỘT", v: "2 dự án", c: C.purpleText }
    ];
    kpis.forEach((k, i) => {
      const kx = 32 + i * 350;
      addRect(f, `KPI_${i}`, kx, 115, 330, 90, C.white, 10, C.border, 1);
      addText(f, `KPIT_${i}`, k.t, kx + 16, 128, 240, 18, 11, true, C.textSec);
      addText(f, `KPIV_${i}`, k.v, kx + 16, 150, 240, 32, 22, true, k.c);
    });

    addRect(f, "Leave_Card", 32, 230, 1376, 720, C.white, 12, C.border, 1);
    addText(f, "L_Title", "DANH SÁCH ĐƠN NGHỈ PHÉP CẦN XỬ LÝ", 48, 250, 400, 24, 15, true, C.textMain);
    addButton(f, "⚡ Phê duyệt hàng loạt (1-Click)", 1130, 245, 260, 38, true);

    addRect(f, "L_Head", 32, 295, 1376, 40, C.bgLight);
    const lCols = [
      { n: "[ ]", x: 50 }, { n: "MÃ ĐƠN", x: 90 }, { n: "NHÂN VIÊN", x: 190 }, { n: "BỘ PHẬN", x: 390 },
      { n: "LOẠI NGHỈ", x: 570 }, { n: "THỜI GIAN", x: 730 }, { n: "SỐ NGÀY", x: 930 }, { n: "BÀN GIAO", x: 1020 },
      { n: "TRẠNG THÁI", x: 1190 }, { n: "HÀNH ĐỘNG", x: 1310 }
    ];
    lCols.forEach(c => addText(f, `LC_${c.n}`, c.n, c.x, 305, 100, 20, 11, true, C.textSec));

    const lRows = [
      { code: "NP-091", name: "Ian Chesnut (0123)", dept: "Global PM18", type: "Phép năm", date: "25/10 - 26/10", days: "2.0d", del: "Collins J.", st: "Chờ duyệt", stT: "warning" },
      { code: "NP-092", name: "Collins Jackson (0125)", dept: "Global PM18", type: "Phép năm", date: "25/10 - 25/10", days: "1.0d", del: "Ian Chesnut", st: "Xung đột !", stT: "danger" },
      { code: "NP-093", name: "Nguyen Van A (4412)", dept: "UI/UX Design", type: "Ốm BHXH", date: "22/10 - 23/10", days: "2.0d", del: "Trần B", st: "Chờ duyệt", stT: "warning" },
      { code: "NP-088", name: "Nguyen Van B (0006)", dept: "PATIENT VN", type: "Không lương", date: "18/10 - 18/10", days: "1.0d", del: "Lead Dev", st: "Đã duyệt", stT: "success" }
    ];

    lRows.forEach((r, i) => {
      const ry = 345 + i * 64;
      addRect(f, `LLine_${i}`, 32, ry + 60, 1376, 1, C.border);
      addBadge(f, r.code, 90, ry + 16, "blue");
      addText(f, `LName_${i}`, r.name, 190, ry + 20, 180, 20, 13, true, C.textMain);
      addText(f, `LDept_${i}`, r.dept, 390, ry + 20, 160, 20, 13, false, C.textMain);
      addText(f, `LType_${i}`, r.type, 570, ry + 20, 140, 20, 13, false, C.textMain);
      addText(f, `LDate_${i}`, r.date, 730, ry + 20, 180, 20, 12, false, C.textSec);
      addText(f, `LDays_${i}`, r.days, 930, ry + 20, 70, 20, 13, true, C.textMain);
      addText(f, `LDel_${i}`, r.del, 1020, ry + 20, 150, 20, 12, false, C.textSec);
      addBadge(f, r.status, 1190, ry + 16, r.stT);
      addText(f, `LAct_${i}`, "✓ Duyệt  ✗ Từ chối", 1310, ry + 20, 90, 20, 12, true, C.orange);
    });
  }

  // --------------------------------------------------------------------------
  // SCREEN 6: LÀM THÊM GIỜ OT (SCR_WEB_OT_001)
  // --------------------------------------------------------------------------
  {
    const f = figma.createFrame();
    f.name = "06 - Quản lý Làm thêm giờ OT (SCR_WEB_OT_001)";
    f.resize(1440, 1024);
    f.x = 0; f.y = 1224;
    f.fills = colorFill(C.bgLight);
    page.appendChild(f);

    addTopbar(f, "Dự án");
    addBreadcrumb(f, "Trang chủ > Quản lý OT > Bảng Phê duyệt & Đối soát Quẹt thẻ Sinh trắc học");

    addRect(f, "OT_Banner", 32, 115, 1376, 54, C.amberBg, 8, C.amberText, 1);
    addText(f, "OT_Warn", "⚠️ CẢNH BÁO PHÁP LÝ (BLLĐ 2019): Tối đa 40h/tháng & 200h/năm. Đã có 4 nhân viên đạt mức > 35h trong tháng 10/2026.", 50, 132, 1100, 20, 12, true, C.amberText);
    addButton(f, "Xem phân tích OT", 1230, 123, 160, 36, false);

    addRect(f, "OT_Card", 32, 190, 1376, 760, C.white, 12, C.border, 1);
    addText(f, "OT_Title", "DANH SÁCH PHIẾU ĐĂNG KÝ OVERTIME CẦN PHÊ DUYỆT", 48, 210, 500, 24, 15, true, C.textMain);
    addButton(f, "[+] Tạo phiếu OT khẩn cấp", 1170, 205, 220, 38, true);

    addRect(f, "OT_Head", 32, 255, 1376, 40, C.bgLight);
    const otCols = [
      { n: "MÃ PHIẾU", x: 50 }, { n: "DỰ ÁN", x: 160 }, { n: "NHÂN SỰ", x: 360 }, { n: "LOẠI OT / HỆ SỐ", x: 600 },
      { n: "GIỜ ĐĂNG KÝ", x: 760 }, { n: "GIỜ THỰC TẾ (IOT)", x: 900 }, { n: "CÔNG ĐỐI SOÁT", x: 1050 }, { n: "TIẾN TRÌNH DUYỆT", x: 1180 }
    ];
    otCols.forEach(c => addText(f, `OTC_${c.n}`, c.n, c.x, 265, 150, 20, 11, true, C.textSec));

    const otRows = [
      { code: "OT-1021-01", proj: "Global Patient Portal", emps: "Ian Chesnut (0123), Collins J.", type: "Ngày thường (150%)", reg: "18:00 - 22:00 (4.0h)", act: "18:02 - 21:30 (3.5h)", fin: "3.5h (Hợp lệ)", flow: "[✓ PM] [✓ DUL] [● PMO]" },
      { code: "OT-1021-02", proj: "Takumi Japan Core", emps: "Nguyen Van B (0006) + 4 Devs", type: "Cuối tuần (200%)", reg: "08:30 - 17:30 (8.0h)", act: "08:25 - 17:40 (8.0h)", fin: "8.0h (Đủ công)", flow: "[✓ PM] [✓ DUL] [✓ PMO] [✓ CHRO]" },
      { code: "OT-1021-03", proj: "VMO AI Platform", emps: "AI Researcher (0145)", type: "Ca đêm (+30%)", reg: "22:00 - 02:00 (4.0h)", act: "22:00 - 02:15 (4.0h)", fin: "4.0h (Hợp lệ)", flow: "[✓ PM] [● DUL]" }
    ];

    otRows.forEach((r, i) => {
      const ry = 310 + i * 80;
      addRect(f, `OTLine_${i}`, 32, ry + 78, 1376, 1, C.border);
      addBadge(f, r.code, 50, ry + 24, "blue");
      addText(f, `OTP_${i}`, r.proj, 160, ry + 28, 180, 20, 13, true, C.textMain);
      addText(f, `OTE_${i}`, r.emps, 360, ry + 28, 220, 20, 12, false, C.textMain);
      addBadge(f, r.type, 600, ry + 24, "purple");
      addText(f, `OTR_${i}`, r.reg, 760, ry + 28, 120, 20, 12, false, C.textSec);
      addText(f, `OTA_${i}`, r.act, 900, ry + 28, 130, 20, 12, true, C.textMain);
      addBadge(f, r.fin, 1050, ry + 24, "success");
      addText(f, `OTF_${i}`, r.flow, 1180, ry + 28, 180, 20, 12, true, C.orange);
    });
  }

  // --------------------------------------------------------------------------
  // SCREEN 7: HỢP ĐỒNG & 81 ĐƠN VỊ (SCR_WEB_CONTRACT_001)
  // --------------------------------------------------------------------------
  {
    const f = figma.createFrame();
    f.name = "07 - Quản lý Hợp đồng & Sơ đồ 81 Đơn vị (SCR_WEB_CONTRACT_001)";
    f.resize(1440, 1024);
    f.x = 1640; f.y = 1224;
    f.fills = colorFill(C.bgLight);
    page.appendChild(f);

    addTopbar(f, "Nhân viên");
    addBreadcrumb(f, "Trang chủ > Quản trị Nhân sự > Quản lý Hợp đồng & Sơ đồ Cây 81 Đơn vị");

    addRect(f, "Exp_Alert", 32, 115, 1376, 50, C.redBg, 8, C.redText, 1);
    addText(f, "Exp_Txt", "🚨 CẢNH BÁO HẾT HẠN HỢP ĐỒNG: Có 8 nhân sự sắp hết hạn Hợp đồng lao động trong 30 ngày tới. Yêu cầu phòng HR đánh giá tái ký.", 50, 130, 1100, 20, 12, true, C.redText);
    addButton(f, "Lọc danh sách hết hạn", 1210, 122, 180, 36, true);

    addRect(f, "Contr_Card", 32, 185, 840, 760, C.white, 12, C.border, 1);
    addText(f, "Contr_Title", "DANH SÁCH HỢP ĐỒNG LAO ĐỘNG MASTER", 48, 205, 400, 20, 14, true, C.textMain);

    const cRows = [
      { code: "HĐLĐ-2021-0812", name: "Ian Chesnut (0123)", type: "Chính thức 12 thg", end: "30/07/2022", st: "Hiệu lực", stT: "success" },
      { code: "HĐTV-2021-0420", name: "Collins Jackson (0125)", type: "Thử việc 2 thg", end: "30/09/2021", st: "Hết hạn < 10d", stT: "danger" },
      { code: "HĐLĐ-2020-0015", name: "Nguyen Van B (0006)", type: "Vô thời hạn", end: "Vô thời hạn", st: "Hiệu lực", stT: "success" }
    ];

    cRows.forEach((cr, i) => {
      const ry = 250 + i * 64;
      addRect(f, `CRLine_${i}`, 48, ry + 58, 808, 1, C.border);
      addBadge(f, cr.code, 48, ry + 16, "blue");
      addText(f, `CRName_${i}`, cr.name, 190, ry + 20, 200, 20, 13, true, C.textMain);
      addText(f, `CRType_${i}`, cr.type, 400, ry + 20, 150, 20, 12, false, C.textSec);
      addText(f, `CREnd_${i}`, cr.end, 560, ry + 20, 120, 20, 12, false, C.textMain);
      addBadge(f, cr.st, 700, ry + 16, cr.stT);
    });

    addRect(f, "Org_Card", 896, 185, 512, 760, C.white, 12, C.border, 1);
    addText(f, "Org_Title", "SƠ ĐỒ TỔ CHỨC 81 ĐƠN VỊ & C&B", 916, 205, 400, 20, 14, true, C.textMain);

    const treeNodes = [
      "▼ BAN LÃNH ĐẠO (BOD - 10 Headcount)",
      "  ▼ KHỐI SẢN XUẤT (GLOBAL - 7 Headcount)",
      "    ► Trung Tâm PM Số 18 (Lead: DUL 2611)",
      "    ► Trung Tâm PM Số 10",
      "    ► Trung Tâm PM Số 11",
      "  ▼ KHỐI VĂN PHÒNG & CHÍNH SÁCH",
      "    ► Phòng Nhân Sự (5 Headcount)",
      "    ► Phòng Tài Chính Kế Toán (2 Headcount)",
      "    ► Phòng PMO (3 Headcount)"
    ];

    treeNodes.forEach((tn, i) => {
      const ty = 250 + i * 48;
      addRect(f, `TBg_${i}`, 916, ty, 472, 40, i === 0 ? C.orangeBg : C.bgLight, 6, C.border, 1);
      addText(f, `TTxt_${i}`, tn, 936, ty + 10, 440, 20, 12, i < 2, i === 0 ? C.orange : C.textMain);
    });
  }

  // --------------------------------------------------------------------------
  // SCREEN 8: ĐẶT LẠI MẬT KHẨU 2FA (SCR_WEB_FORGOT_PWD_001)
  // --------------------------------------------------------------------------
  {
    const f = figma.createFrame();
    f.name = "08 - Quản trị 2FA & Đặt lại Mật khẩu (SCR_WEB_FORGOT_PWD_001)";
    f.resize(1440, 1024);
    f.x = 3280; f.y = 1224;
    f.fills = colorFill(C.bgLight);
    page.appendChild(f);

    addTopbar(f, "Hướng dẫn");
    addBreadcrumb(f, "Trang chủ > Quản trị An ninh > Quản trị 2FA Helpdesk & Đặt lại mật khẩu");

    addRect(f, "Reset_Card", 32, 140, 660, 800, C.white, 12, C.border, 1);
    addBadge(f, "QUY TRÌNH KHÔI PHỤC TỰ PHỤC VỤ (SELF-SERVICE)", 52, 165, "primary");
    addText(f, "R_Title", "Đặt lại Mật khẩu Đa kênh & 2FA", 52, 205, 500, 28, 20, true, C.textMain);

    addText(f, "R_Lbl1", "Nhập Email Doanh nghiệp hoặc Số điện thoại xác thực:", 52, 250, 400, 20, 12, true, C.textMain);
    addRect(f, "R_Inp1", 52, 275, 620, 46, C.bgLight, 8, C.border, 1);
    addText(f, "R_Val1", "ian.chesnut@vmo-group.com", 72, 288, 500, 20, 13, false, C.textMain);

    addText(f, "R_Lbl2", "Nhập mã xác thực 6 số (Gửi qua SMS/Authenticator):", 52, 345, 400, 20, 12, true, C.textMain);
    const otps = ["8", "4", "9", "3", "0", "2"];
    otps.forEach((o, i) => {
      const ox = 52 + i * 70;
      addRect(f, `OTP_${i}`, ox, 375, 58, 60, C.bgLight, 8, C.orange, 2);
      addText(f, `OTPT_${i}`, o, ox, 388, 58, 30, 24, true, C.textMain, "CENTER");
    });

    addText(f, "R_Lbl3", "Tạo Mật khẩu mới chuẩn Enterprise:", 52, 465, 400, 20, 12, true, C.textMain);
    addRect(f, "R_Inp3", 52, 490, 620, 46, C.bgLight, 8, C.border, 1);
    addText(f, "R_Val3", "•••••••••••••••• (NewStrongPassword@2026)", 72, 503, 500, 20, 13, false, C.textMain);

    addRect(f, "Meter_Bg", 52, 550, 620, 8, C.border, 4);
    addRect(f, "Meter_Fill", 52, 550, 620, 8, C.greenText, 4);
    addText(f, "Meter_Txt", "ĐỘ MẠNH: RẤT MẠNH (4/4 Điểm zxcvbn)", 52, 568, 400, 16, 11, true, C.greenText);

    addButton(f, "XÁC NHẬN CẬP NHẬT MẬT KHẨU MỚI", 52, 610, 620, 50, true);

    addRect(f, "HD_Card", 720, 140, 688, 800, C.white, 12, C.border, 1);
    addBadge(f, "HELPDESK 2FA & SECURITY GOVERNANCE", 740, 165, "purple");
    addText(f, "HD_Title", "Trung tâm Mở khóa & Cấp lại 2FA", 740, 205, 500, 28, 20, true, C.textMain);
    addText(f, "HD_Desc", "Dành cho IT Admin mở khóa tài khoản nhân viên bị khóa do nhập sai mật khẩu quá 5 lần hoặc mất thiết bị Authenticator.", 740, 245, 640, 40, 13, false, C.textSec);

    const lUsers = [
      { name: "Nguyễn Văn C (0088)", r: "Khóa Brute-force (5 lần sai)", t: "10 phút trước" },
      { name: "Lê Thị D (0142)", r: "Yêu cầu Reset TOTP 2FA (Đổi máy)", t: "1 giờ trước" }
    ];
    lUsers.forEach((lu, i) => {
      const ly = 300 + i * 90;
      addRect(f, `LU_${i}`, 740, ly, 648, 76, C.bgLight, 8, C.border, 1);
      addText(f, `LUN_${i}`, lu.name, 760, ly + 16, 300, 20, 13, true, C.textMain);
      addText(f, `LUR_${i}`, `Lý do: ${lu.r} • ${lu.t}`, 760, ly + 40, 350, 18, 12, false, C.redText);
      addButton(f, "Mở khóa & Gửi mã", 1210, ly + 20, 160, 36, false);
    });
  }

  // --------------------------------------------------------------------------
  // SCREEN 9: SHELL & STUDIO PHÁT THÔNG BÁO (SCR_WEB_SHELL_001)
  // --------------------------------------------------------------------------
  {
    const f = figma.createFrame();
    f.name = "09 - Shell & Studio Phát thông báo (SCR_WEB_SHELL_001)";
    f.resize(1440, 1024);
    f.x = 4920; f.y = 1224;
    f.fills = colorFill(C.bgLight);
    page.appendChild(f);

    addTopbar(f, "Thảo luận");
    addBreadcrumb(f, "Trang chủ > Quản trị Truyền thông > Enterprise Broadcast Studio");

    addRect(f, "Studio_Card", 32, 120, 840, 830, C.white, 12, C.border, 1);
    addBadge(f, "ENTERPRISE BROADCAST STUDIO", 52, 145, "primary");
    addText(f, "S_Title", "Soạn thảo & Phát Thông báo Doanh nghiệp", 52, 185, 500, 28, 20, true, C.textMain);

    addText(f, "S_Lbl1", "Mức độ ưu tiên thông báo:", 52, 230, 300, 20, 12, true, C.textMain);
    addBadge(f, "🔴 KHẨN CẤP", 52, 255, "danger");
    addBadge(f, "🟡 HÀNH CHÍNH & VĂN HÓA", 200, 255, "warning");
    addBadge(f, "🔵 TIN DỰ ÁN", 420, 255, "blue");

    addText(f, "S_Lbl2", "Phạm vi gửi (Targeting):", 52, 305, 300, 20, 12, true, C.textMain);
    addRect(f, "S_Inp2", 52, 330, 800, 42, C.bgLight, 8, C.border, 1);
    addText(f, "S_Val2", "Toàn bộ 81 Đơn vị (921 nhân sự VMO Group) ▾", 72, 342, 600, 20, 13, false, C.textMain);

    addText(f, "S_Lbl3", "Tiêu đề thông báo:", 52, 395, 300, 20, 12, true, C.textMain);
    addRect(f, "S_Inp3", 52, 420, 800, 42, C.bgLight, 8, C.border, 1);
    addText(f, "S_Val3", "[THÔNG BÁO KHẨN] Chốt công tháng 10/2026 & Quy định nghỉ Lễ", 72, 432, 700, 20, 13, true, C.textMain);

    addText(f, "S_Lbl4", "Nội dung thông báo (WYSIWYG Markdown):", 52, 485, 400, 20, 12, true, C.textMain);
    addRect(f, "S_Inp4", 52, 510, 800, 240, C.bgLight, 8, C.border, 1);
    addText(f, "S_B1", "Kính gửi toàn thể Cán bộ Nhân viên VMO Group,", 72, 525, 750, 20, 13, false, C.textMain);
    addText(f, "S_B2", "Phòng Quản trị Nhân sự xin thông báo lịch khóa bảng chấm công tháng 10/2026 vào 18:00 ngày 25/10/2026.", 72, 555, 750, 20, 13, false, C.textMain);

    addText(f, "S_Lbl5", "Kênh phát sóng đa nền tảng:", 52, 770, 300, 20, 12, true, C.textMain);
    addBadge(f, "[X] Mobile Push Notification", 52, 795, "primary");
    addBadge(f, "[X] Web Admin Real-time Popover", 260, 795, "primary");
    addBadge(f, "[X] Email Doanh nghiệp", 490, 795, "primary");
    addButton(f, "🚀 PHÁT THÔNG BÁO NGAY LẬP TỨC", 52, 850, 800, 48, true);

    addRect(f, "Pop_Card", 900, 120, 508, 830, C.white, 12, C.border, 1);
    addText(f, "Pop_Head", "WEBSOCKET STOMP REAL-TIME POPOVER", 920, 145, 400, 20, 13, true, C.textMain);
    addBadge(f, "TẤT CẢ (12)", 920, 185, "primary");
    addBadge(f, "CẦN XỬ LÝ (2)", 1030, 185, "danger");
    addBadge(f, "HỆ THỐNG", 1160, 185, "blue");

    const notifs = [
      { t: "Yêu cầu duyệt đơn Nghỉ phép", d: "Ian Chesnut (0123) xin nghỉ 2.0 ngày phép năm.", tm: "5 phút trước", a: true },
      { t: "Cảnh báo hạn mức OT", d: "Dự án Global Patient có 2 nhân viên vượt 38h OT.", tm: "20 phút trước", a: false },
      { t: "Thông báo Hành chính", d: "Khử khuẩn văn phòng TTC11 vào cuối tuần.", tm: "2 giờ trước", a: false }
    ];
    notifs.forEach((n, i) => {
      const ny = 230 + i * 110;
      addRect(f, `NB_${i}`, 920, ny, 468, 96, C.bgLight, 8, C.border, 1);
      addText(f, `NT_${i}`, n.t, 936, ny + 14, 300, 20, 13, true, C.textMain);
      addText(f, `ND_${i}`, n.d, 936, ny + 38, 430, 20, 12, false, C.textSec);
      addText(f, `NTM_${i}`, n.tm, 936, ny + 64, 150, 16, 11, false, C.textSec);
      if (n.a) addButton(f, "Duyệt nhanh", 1280, ny + 54, 95, 28, true);
    });
  }

  // --------------------------------------------------------------------------
  // SCREEN 10: HỒ SƠ CÁ NHÂN & CÀI ĐẶT (SCR_WEB_PROFILE_SETTINGS_001)
  // --------------------------------------------------------------------------
  {
    const f = figma.createFrame();
    f.name = "10 - Hồ sơ Cá nhân & Avatar Studio (SCR_WEB_PROFILE_SETTINGS_001)";
    f.resize(1440, 1024);
    f.x = 6560; f.y = 1224;
    f.fills = colorFill(C.bgLight);
    page.appendChild(f);

    addTopbar(f, "Hồ sơ");
    addBreadcrumb(f, "Trang chủ > Cài đặt tài khoản > Hồ sơ Cá nhân & Đổi mật khẩu");

    addRect(f, "Nav_Set", 32, 120, 260, 830, C.white, 12, C.border, 1);
    addText(f, "Nav_Set_Head", "CÀI ĐẶT TÀI KHOẢN", 52, 145, 200, 20, 12, true, C.textSec);

    const sNavs = ["👤 Hồ sơ cá nhân", "🔒 Đổi mật khẩu", "💻 Phiên đăng nhập (3)", "🛡️ Xác thực 2 bước 2FA", "🔔 Tùy chọn thông báo", "🎨 Giao diện"];
    sNavs.forEach((sn, i) => {
      const sy = 180 + i * 50;
      if (i === 0) addRect(f, `SN_Act_${i}`, 44, sy, 236, 40, C.orangeBg, 8);
      addText(f, `SNT_${i}`, sn, 60, sy + 10, 210, 20, 13, i === 0, i === 0 ? C.orange : C.textMain);
    });

    addRect(f, "Prof_Card", 316, 120, 1092, 830, C.white, 12, C.border, 1);
    addText(f, "Ava_Sec_T", "ẢNH ĐẠI DIỆN & NHẬN DIỆN CÁ NHÂN", 348, 145, 400, 20, 14, true, C.textMain);
    addRect(f, "Ava_Box", 348, 185, 120, 120, C.orange, 60);
    addText(f, "Ava_Lett", "VA", 348, 185, 120, 120, 36, true, C.white, "CENTER");

    addText(f, "Ava_Note", "Kéo thả ảnh hoặc tải tệp lên từ máy tính (PNG, JPG, WEBP, tối đa 5MB). Ảnh được crop tỉ lệ vuông 1:1 chuẩn nhận diện công ty.", 490, 195, 600, 40, 13, false, C.textSec);
    addButton(f, "📤 Tải ảnh mới (Avatar Studio)", 490, 245, 220, 38, true);
    addButton(f, "🗑️ Xóa ảnh", 725, 245, 110, 38, false);

    addRect(f, "PLine1", 348, 330, 1028, 1, C.border);
    addText(f, "P_Sec1", "THÔNG TIN CÁ NHÂN (CHO PHÉP CHỈNH SỬA)", 348, 355, 400, 20, 14, true, C.textMain);

    addText(f, "PN_L", "Họ và tên hiển thị [*]", 348, 395, 300, 18, 12, true, C.textMain);
    addRect(f, "PN_I", 348, 420, 480, 44, C.bgLight, 8, C.border, 1);
    addText(f, "PN_V", "Nguyen Van A", 368, 432, 440, 20, 13, false, C.textMain);

    addText(f, "PP_L", "Số điện thoại di động cá nhân (Nhận 2FA OTP) [*]", 868, 395, 400, 18, 12, true, C.textMain);
    addRect(f, "PP_I", 868, 420, 480, 44, C.bgLight, 8, C.border, 1);
    addText(f, "PP_V", "0123456789", 888, 432, 440, 20, 13, false, C.textMain);

    addText(f, "PA_L", "Địa chỉ tạm trú hiện tại", 348, 480, 300, 18, 12, true, C.textMain);
    addRect(f, "PA_I", 348, 505, 1000, 44, C.bgLight, 8, C.border, 1);
    addText(f, "PA_V", "Số 88 Tôn Thất Thuyết, Phường Mỹ Đình 2, Quận Nam Từ Liêm, Hà Nội", 368, 517, 900, 20, 13, false, C.textMain);

    addRect(f, "PLine2", 348, 575, 1028, 1, C.border);
    addText(f, "P_Sec2", "THÔNG TIN TỔ CHỨC DO PHÒNG NHÂN SỰ QUẢN LÝ (CHỈ ĐỌC 🔒)", 348, 595, 600, 20, 14, true, C.textMain);

    const hrFields = [
      "Mã nhân viên: VMO-4412 🔒", "Vị trí: Designer (UI/UX) 🔒",
      "Cấp bậc: Nhân viên 🔒", "Email công ty: nguyenvanabc@vmodev.com 🔒",
      "Điện thoại bàn: 0123456789 🔒", "Quản lý trực tiếp: Example - 4412 🔒",
      "Người hướng dẫn: Example - 4412 🔒", "Địa điểm làm việc: CT11 (Tòa TTC Duy Tân) 🔒"
    ];
    hrFields.forEach((hf, i) => {
      const cx = 348 + (i % 2) * 520;
      const cy = 635 + Math.floor(i / 2) * 45;
      addText(f, `HRF_${i}`, hf, cx, cy, 500, 20, 12, false, C.textMain);
    });

    addRect(f, "PLine3", 348, 830, 1028, 1, C.border);
    addButton(f, "Hủy bỏ", 1140, 850, 100, 42, false);
    addButton(f, "Lưu thay đổi hồ sơ", 1255, 850, 150, 42, true);
  }

  // Zoom into view
  figma.viewport.scrollAndZoomIntoView(page.children);
  figma.closePlugin("✅ Đã tạo thành công 10 Màn hình Web Admin ($1440x1024) vào Page '🌐 Web Admin Portal (10 Modules SRS)'!");
}

main();
