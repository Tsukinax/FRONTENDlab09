const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// ตั้งค่าให้ Server อ่านข้อมูลจาก Form ได้
app.use(bodyParser.urlencoded({ extended: true }));

// 1. Route หน้าแรก (GET /): ส่งไฟล์ index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 2. Route รับข้อมูล (POST /): บันทึกชื่อลงไฟล์
app.post('/', (req, res) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;

    // เช็คว่ากรอกครบไหม (ตามโจทย์ข้อ 4 ย่อย)
    if (!firstName || !lastName) {
        return res.send('You must enter both your first name and last name!');
    }

    // จัดรูปแบบข้อมูล: "ชื่อ,นามสกุล" และขึ้นบรรทัดใหม่
    const data = `${firstName},${lastName}\n`;

    // บันทึกต่อท้ายไฟล์ (appendFile)
    fs.appendFile('guest.txt', data, (err) => {
        if (err) return res.status(500).send("Error saving data");
        
        // ถ้าบันทึกสำเร็จ ให้ส่งไฟล์ thankyou.html กลับไป
        res.sendFile(__dirname + '/thankyou.html');
    });
});

// 3. Route ดูรายชื่อ (GET /guestbook)
app.get('/guestbook', (req, res) => {
    // อ่านไฟล์ guest.txt
    fs.readFile('guest.txt', 'utf8', (err, data) => {
        if (err) return res.status(500).send("Error reading file");

        // แยกข้อมูลเป็นบรรทัด (Array)
        // .filter(Boolean) เพื่อกำจัดบรรทัดว่าง (Empty lines) ทิ้ง
        const guests = data.split('\n').filter(line => line.trim() !== '');

        // เริ่มสร้าง HTML ตอบกลับ (ใช้ res.write เพื่อเขียนทีละส่วน)
        res.setHeader("Content-Type", "text/html");
        res.write(`<h1>The number of guests is ${guests.length}.</h1>`);

        // วนลูปสร้างรายการแขกแต่ละคน
        guests.forEach((guest, index) => {
            const nameParts = guest.split(','); // แยกชื่อกับนามสกุลด้วยลูกน้ำ
            if (nameParts.length === 2) {
                res.write(`<p><b>No: ${index + 1}</b><br>`);
                res.write(`Fist name: ${nameParts[0]}<br>`);
                res.write(`Last name: ${nameParts[1]}</p>`);
            }
        });

        // จบการส่งข้อมูล
        res.end();
    });
});

// รัน Server ที่ Port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});