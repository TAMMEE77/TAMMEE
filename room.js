async function fetchRoomData() {
    try {
        const response = await fetch('room_data.json'); // URL ของไฟล์ JSON
        const rooms = await response.json();
        displayRooms(rooms);

        // เพิ่ม Event Listener สำหรับการกรอง
        document.getElementById('filter-button').addEventListener('click', function () {
            filterRooms(rooms);
        });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
        document.getElementById('no-results-message').style.display = 'block';
    }
}

function displayRooms(rooms) {
    const roomContainer = document.getElementById('room-container');
    roomContainer.innerHTML = ''; // ล้างข้อมูลเก่า

    if (rooms.length === 0) {
        document.getElementById('no-results-message').style.display = 'block';
        return;
    }

    document.getElementById('no-results-message').style.display = 'none';

    rooms.forEach(room => {
        const roomBlock = document.createElement('div');
        roomBlock.classList.add('room-block');
        roomBlock.setAttribute('data-id', room.id);
        roomBlock.setAttribute('data-name', room.name);
        roomBlock.setAttribute('data-price', room.price);
        roomBlock.setAttribute('data-status', room.status);

        roomBlock.innerHTML = `
            <img src="${room.image}" alt="${room.name}" class="room-image">
            <h3>${room.name}</h3>
            <p>ราคา: ${room.price} บาท/เดือน</p>
            <p class="status">สถานะ: <span class="status-text" data-status="${room.status}">${room.status}</span></p>
            <a href="room-details.html?roomId=${room.id}" class="details-button">ดูรายละเอียด</a>
        `;

        roomContainer.appendChild(roomBlock);
    });
}

function filterRooms(rooms) {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    const priceRange = document.getElementById('price-filter').value;
    const statusFilter = document.getElementById('status-filter').value;

    const filteredRooms = rooms.filter(room => {
        const matchesSearch = !searchTerm || room.name.toLowerCase().includes(searchTerm);

        let matchesPrice = true;
        if (priceRange !== 'all') {
            const [minPrice, maxPrice] = priceRange.includes('+')
                ? [parseInt(priceRange.split('+')[0], 10), Infinity]
                : priceRange.split('-').map(Number);
            matchesPrice = room.price >= minPrice && room.price <= maxPrice;
        }

        const matchesStatus = statusFilter === 'all' || room.status === statusFilter;

        return matchesSearch && matchesPrice && matchesStatus;
    });

    displayRooms(filteredRooms);
}

// เรียกใช้ฟังก์ชันเมื่อโหลดหน้า
fetchRoomData();










