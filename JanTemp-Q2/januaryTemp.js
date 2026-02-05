// Include the nodejs File system into your program

const fs = require('fs');
let january = "48,42,68\n";
january += "48,42,69\n";
january += "49,42,69\n";
january += "49,42,61\n";
january += "49,42,65\n";
january += "49,42,62\n";
january += "49,42,62\n";


fs.writeFile('sfjanaverages.txt', january, (err) => {
    if (err) throw err;
    console.log('Save file successfully');
    readTheFile();
});
function readTheFile() {
    console.log('Start to read file');
    fs.readFile('sfjanaverages.txt', 'utf8', (err, data) => {
        if (err) throw err;
        const lines = data.split('\n');

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim(); 

            if (line.length > 0) {
                const parts = line.split(',');

                console.log(`Day${i + 1}`);
                console.log(`Mean:${parts[0]}`);
                console.log(`Low:${parts[1]}`);
                console.log(`High:${parts[2]}`);
                console.log(''); 
            }
        }
    });
}

