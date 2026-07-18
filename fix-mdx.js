const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');

function fixFiles(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        if (stat.isDirectory()) {
            fixFiles(itemPath);
        } else if (itemPath.endsWith('.mdx') || itemPath.endsWith('.md')) {
            let content = fs.readFileSync(itemPath, 'utf-8');
            let originalContent = content;

            // 1. Perbaiki <Checklist items={[ "...", "..." ]} />
            // Menjadi list checklist markdown standard
            const checklistRegex = /<Checklist\s+items=\{\[\s*([\s\S]*?)\s*\]\}\s*\/>/g;
            content = content.replace(checklistRegex, (match, itemsString) => {
                // Ekstrak string di dalam tanda kutip
                const stringMatches = [...itemsString.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/g)];
                let list = "";
                for (const strMatch of stringMatches) {
                    list += `- [ ] ${strMatch[1]}\n`;
                }
                return list;
            });

            // 2. Perbaiki deretan angka list yang tergabung (misal " 2. ")
            // Pastikan ada newline sebelum angka jika itu di tengah kalimat
            // Kita batasi hanya mencari spasi + angka + titik + spasi
            const numberListRegex = / (\d+\.\s+)/g;
            content = content.replace(numberListRegex, '\n$1');

            // 3. Perbaiki deretan task list " - [ ] " atau " - [x] " di tengah kalimat
            const taskListRegex = / -\s*\[\s*[xX ]?\s*\] /g;
            content = content.replace(taskListRegex, (match) => '\n' + match.trimStart() + ' ');

            // Tweak tambahan untuk awal kalimat jika tergabung
            // Contoh: "kebutuhan - [x] Menyapa" -> "kebutuhan\n- [x] Menyapa"
            const taskListRegex2 = /([^\n])(\s*-\s*\[\s*[xX ]?\s*\]\s+)/g;
            content = content.replace(taskListRegex2, '$1\n$2');
            
            // Perbaiki angka yang gabung setelah teks
            // Contoh "SOLVE, yaitu mengidentifikasi kebutuhan customer.1. Lakukan"
            const numberListRegex3 = /([^\n])(\s*\d+\.\s+)/g;
            content = content.replace(numberListRegex3, '$1\n$2');

            if (content !== originalContent) {
                fs.writeFileSync(itemPath, content, 'utf-8');
                console.log(`✅ Diperbaiki: ${itemPath}`);
            }
        }
    }
}

console.log("Memulai perbaikan file .mdx...");
fixFiles(contentDir);
console.log("Selesai!");
