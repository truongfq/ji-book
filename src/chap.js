load('config.js');

function execute(url) {
    let response = fetch(url, {
        headers: {
            "referer": BASE_URL,
        }
    });
    if (response.ok) {
        let doc = response.html();

        // Loại bỏ các phần không phải nội dung chương
        doc.select("header, footer, nav, script, style, .comment, .comments, #comments, .banner, .list-chapter, .rating, .review, .box-report").remove();

        // Thử lần lượt các vùng chứa nội dung thường gặp
        let candidates = [
            "#chapter-content",
            ".chapter-content",
            "#chapter-c",
            ".chapter-c",
            "#article",
            ".content-chap",
            ".chap-content",
            ".reading-content",
            "#content-chapter",
            ".box-chap"
        ];

        for (let i = 0; i < candidates.length; i++) {
            let el = doc.select(candidates[i]);
            if (el && el.size() > 0 && el.text().trim().length > 100) {
                return Response.success(el.html());
            }
        }

        return Response.error("Không xác định được vùng nội dung chương. Cần xem mã nguồn trang để sửa chính xác.");
    }
    return Response.error("Không thể tải nội dung chương. Vui lòng thử lại sau.");
}
