// 1. เรียกใช้งาน module ที่จำเป็น
const express = require('express');
const fs = require('fs'); 
const app = express();

app.get('/', (req, res) => {
  
    fs.readFile('counter.txt', 'utf8', (err, data) => {
        if (err) return res.send("Error reading counter file");

        let currentCount = parseInt(data) || 0;

        let newCount = currentCount + 1;

        fs.writeFile('counter.txt', newCount.toString(), (err) => {
            if (err) return res.send("Error updating counter");

    
            let message = "";
            if (newCount === 1) {
                message = `<h1>There has been ${newCount} hit to this page</h1>`;
            } else {
                message = `<h1>There have been ${newCount} hits to this page</h1>`;
            }
            
      
            res.send(message);
        });
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});