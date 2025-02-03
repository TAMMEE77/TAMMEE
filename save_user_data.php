<?php
// กำหนดชนิดข้อมูลที่ PHP จะรับและส่งเป็น JSON
header('Content-Type: application/json');

// ไฟล์ JSON ที่จะเก็บข้อมูลผู้ใช้
$jsonFile = 'user_data.json';

// ตรวจสอบว่ามีคำขอแบบ POST หรือไม่
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // รับข้อมูล JSON จาก JavaScript
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if ($data) {
        // ตรวจสอบว่าไฟล์ JSON มีอยู่หรือไม่
        if (!file_exists($jsonFile)) {
            file_put_contents($jsonFile, '[]'); // สร้างไฟล์ใหม่หากไม่มี
        }

        // อ่านข้อมูลที่มีอยู่ในไฟล์ JSON
        $users = json_decode(file_get_contents($jsonFile), true);

        // ตรวจสอบว่าอีเมลซ้ำหรือไม่
        foreach ($users as $user) {
            if ($user['email'] === $data['email']) {
                echo json_encode(['success' => false, 'message' => 'อีเมลนี้ถูกใช้แล้ว']);
                exit;
            }
        }

        // สร้าง userid ที่ไม่ซ้ำกัน
        $lastUser = end($users);
        $data['userid'] = $lastUser ? $lastUser['userid'] + 1 : 1;

        // จัดเรียงข้อมูลใหม่ให้อยู่ตามลำดับที่ต้องการ
        $userData = [
            'userid' => $data['userid'],
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'birthday' => $data['birthday'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            'password' => password_hash($data['password'], PASSWORD_DEFAULT)
        ];

        // เพิ่มข้อมูลผู้ใช้ใหม่
        $users[] = $userData;

        // บันทึกข้อมูลกลับไปที่ไฟล์ JSON
        if (file_put_contents($jsonFile, json_encode($users, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT))) {
            echo json_encode(['success' => true, 'message' => 'สมัครสมาชิกสำเร็จ']);
        } else {
            echo json_encode(['success' => false, 'message' => 'เกิดข้อผิดพลาดในการบันทึกข้อมูล']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'ข้อมูลไม่ถูกต้อง']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'คำขอไม่ถูกต้อง']);
}
?>













