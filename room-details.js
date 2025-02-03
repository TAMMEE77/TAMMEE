// ฟังก์ชันดึง Query Params
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1); // ตัดเครื่องหมาย ?
    queryString.split("&").forEach((param) => {
        const [key, value] = param.split("=");
        params[key] = decodeURIComponent(value);
    });
    return params;
}

// ดึง roomId จาก URL
const params = getQueryParams();
const roomId = parseInt(params.roomId, 10); // ดึง roomId และแปลงเป็นตัวเลข

// ดึงข้อมูลจาก JSON
async function fetchRoomData() {
    try {
        const response = await fetch("room_data.json"); // ชื่อไฟล์ JSON
        if (!response.ok) {
            throw new Error("ไม่สามารถดึงข้อมูลได้");
        }

        const roomData = await response.json();

        // ค้นหาข้อมูลห้องที่ตรงกับ roomId
        const room = roomData.find(room => room.id === roomId);

        if (room) {
            // แสดงข้อมูลห้อง
            document.getElementById("room-name").textContent = room.name;
            document.getElementById("room-price").textContent = room.price;
            document.getElementById("room-status").textContent = room.status;
            document.getElementById("room-image").src = room.image;

            // เพิ่มคำอธิบายเกี่ยวกับห้อง
            document.getElementById("room-description").textContent = room.description;
        } else {
            document.body.innerHTML = "<h1>ไม่พบข้อมูลห้องพัก</h1>";
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        document.body.innerHTML = "<h1>เกิดข้อผิดพลาดในการดึงข้อมูล</h1>";
    }
}

// เรียกใช้งานฟังก์ชัน
fetchRoomData();


