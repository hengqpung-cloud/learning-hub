const fs = require('fs');
const path = require('path');

// 1. Tentukan lokasi folder "content" tempat Anda menyimpan file .md
const contentDir = path.join(__dirname, 'content');
// 2. Tentukan nama file hasil (output)
const outputFile = path.join(__dirname, 'nav.json');

function generateNavigation(dirPath) {
    const navStructure = [];
    
    // Mengecek apakah folder content benar-benar ada
    if (!fs.existsSync(dirPath)) {
        console.error(`❌ Error: Folder tidak ditemukan di ${dirPath}`);
        console.log(`Pastikan Anda sudah membuat folder "content" di dalam project ini.`);
        return navStructure;
    }

    // Membaca semua isi di dalam folder content (folder-folder seperti basic-service, dll)
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
        const itemPath = path.join(dirPath, item);
        const stat = fs.statSync(itemPath);

        // Jika itu adalah folder (direktori)
        if (stat.isDirectory()) {
            navStructure.push({
                category: formatName(item),
                folderName: item,
                items: getMarkdownFiles(itemPath, item)
            });
        }
    });

    return navStructure;
}

// Fungsi untuk membaca file .md di dalam sub-folder
function getMarkdownFiles(dirPath, parentFolder) {
    const files = fs.readdirSync(dirPath);
    const mdFiles = [];

    files.forEach(file => {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
            const ext = path.extname(file);
            const baseName = path.basename(file, ext);
            mdFiles.push({
                title: formatName(baseName),
                fileName: file,
                topicId: baseName,
                path: `/content/${parentFolder}/${file}`
            });
        }
    });

    return mdFiles;
}

// Fungsi bantuan untuk mengubah teks "basic-service" menjadi "Basic Service" agar rapi
function formatName(str) {
    return str.split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
}

// ==========================================
// MENJALANKAN SCRIPT
// ==========================================
console.log('⏳ Sedang membaca folder content...');
const navigationData = generateNavigation(contentDir);

if (navigationData.length > 0) {
    // Menyimpan hasil bacaan ke dalam file nav.json
    fs.writeFileSync(outputFile, JSON.stringify(navigationData, null, 2));
    console.log('✅ Berhasil!');
    console.log('📂 File nav.json telah sukses dibuat di folder project Anda.');
    console.log('✨ Anda sekarang bisa menggunakan nav.json ini di aplikasi web Anda sebagai daftar menu.');
}
