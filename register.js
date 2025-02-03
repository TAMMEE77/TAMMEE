document.querySelector('.registerbtn').addEventListener('click', async function (e) {
    e.preventDefault(); // ป้องกันการส่งฟอร์ม

    let isValid = true;

    // ล้างข้อความแจ้งเตือนเก่า
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    // ชื่อ
    const firstname = document.getElementById('firstname').value.trim();
    if (!/^[\u0E00-\u0E7Fa-zA-Z]+$/.test(firstname)) {
        document.getElementById('firstname-error').textContent = 'ชื่อห้ามมีตัวเลขหรือสัญลักษณ์';
        isValid = false;
    } else if (firstname.length > 50) {
        document.getElementById('firstname-error').textContent = 'ชื่อห้ามเกิน 50 ตัวอักษร';
        isValid = false;
    }

    // นามสกุล
    const lastname = document.getElementById('lastname').value.trim();
    if (!/^[\u0E00-\u0E7Fa-zA-Z]+$/.test(lastname)) {
        document.getElementById('lastname-error').textContent = 'นามสกุลห้ามมีตัวเลขหรือสัญลักษณ์';
        isValid = false;
    } else if (lastname.length > 50) {
        document.getElementById('lastname-error').textContent = 'นามสกุลห้ามเกิน 50 ตัวอักษร';
        isValid = false;
    }

    // วันเกิด
    const birthday = document.getElementById('birthday').value;
    if (birthday) {
        const birthDate = new Date(birthday);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 15 || (age === 15 && today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()))) {
            document.getElementById('birthday-error').textContent = 'ต้องมีอายุอย่างน้อย 15 ปี';
            isValid = false;
        }
    } else {
        document.getElementById('birthday-error').textContent = 'กรุณากรอกวันเกิด';
        isValid = false;
    }

    // เบอร์โทรศัพท์
    const phone = document.getElementById('phone').value.trim();
    if (!/^\d{10}$/.test(phone)) {
        document.getElementById('phone-error').textContent = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)';
        isValid = false;
    }

    // อีเมล
    const email = document.getElementById('email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email-error').textContent = 'กรุณากรอกอีเมลให้ถูกต้อง';
        isValid = false;
    }

    // รหัสผ่าน
    const password = document.getElementById('psw').value;
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
        document.getElementById('password-error').textContent = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, ตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่ และตัวเลข';
        isValid = false;
    }

    // ยืนยันรหัสผ่าน
    const repeatPassword = document.getElementById('psw-repeat').value;
    if (repeatPassword !== password) {
        document.getElementById('repeat-password-error').textContent = 'รหัสผ่านไม่ตรงกัน';
        isValid = false;
    }

    // ถ้าผ่านเงื่อนไขทั้งหมด
    if (isValid) {
        const userData = {
            firstname,
            lastname,
            birthday,
            phone,
            email,
            password
        };

        try {
            const response = await fetch('save_user_data.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    alert('สมัครสมาชิกสำเร็จ');

                    // ซ่อนปุ่ม "สมัคร" และแสดงปุ่ม "ต่อไป"
                    document.querySelector('.registerbtn').style.display = 'none';
                    document.querySelector('.nextbtn').style.display = 'block';
                } else {
                    alert(result.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
                }
            } else {
                console.error('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
                alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาด:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    }
});


