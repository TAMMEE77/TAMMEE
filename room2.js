document.getElementById('filter-button').addEventListener('click', function () {
    // รับค่าจากช่องค้นหาและ dropdown
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    const priceRange = document.getElementById('price-filter').value;
    const roomBlocks = document.querySelectorAll('.room-block'); // เลือกทุกบล็อกห้อง
    let hasResults = false; // ตัวแปรตรวจสอบว่ามีห้องตรงเงื่อนไขหรือไม่

    // วนลูปผ่านแต่ละห้อง
    roomBlocks.forEach(block => {
        const roomName = block.getAttribute('data-name').toLowerCase(); // ชื่อห้อง
        const roomPrice = parseInt(block.getAttribute('data-price')); // ราคาห้อง

        // ตรวจสอบคำค้นหา
        const matchesSearch = roomName.includes(searchTerm); // คำค้นหาในชื่อห้อง
        let matchesPrice = true; // เริ่มต้นด้วย true

        // ตรวจสอบช่วงราคา
        if (priceRange !== 'all') {
            const [minPrice, maxPrice] = priceRange.includes('+') 
                ? [parseInt(priceRange.split('+')[0]), Infinity] 
                : priceRange.split('-').map(Number);

            matchesPrice = roomPrice >= minPrice && roomPrice <= maxPrice;
        }

        // แสดงหรือซ่อนห้องตามเงื่อนไข
        if ((searchTerm === '' || matchesSearch) && matchesPrice) {
            block.style.display = 'block'; // แสดงห้อง
            hasResults = true; // พบห้องที่ตรงเงื่อนไข
        } else {
            block.style.display = 'none'; // ซ่อนห้อง
        }
    });

    // แสดงข้อความแจ้งเตือนหากไม่พบข้อมูล
    const noResultsMessage = document.getElementById('no-results-message');
    if (!hasResults) {
        noResultsMessage.style.display = 'block'; // แสดงข้อความ
    } else {
        noResultsMessage.style.display = 'none'; // ซ่อนข้อความ
    }
});


