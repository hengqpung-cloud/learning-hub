// =========================================================================
// SCRIPT SEED DATA AWAL DARI LOKAL KE SUPABASE DATABASE (RUN ONCE)
// =========================================================================

async function seedInitialCmsData() {
    console.log("🌱 Memulai seed data awal ke Supabase...");
    const client = initSupabase();
    if (!client) {
        console.error("Supabase client belum siap.");
        return;
    }

    // 1. Seed Stores
    const defaultStores = [
        "Informa Kupang",
        "Informa Living World",
        "Informa Mall Artha Gading",
        "Informa Central Park",
        "Informa Kota Kasablanka",
        "Informa Tunjungan Plaza",
        "Informa Head Office",
        "Lainnya"
    ];
    for (const storeName of defaultStores) {
        await client.from('stores').upsert({ store_name: storeName }, { onConflict: 'store_name' });
    }
    console.log("✅ Seed Cabang Toko Selesai.");

    // 2. Seed Categories
    const defaultCategories = [
        { id: "basic-service", category_name: "Basic Service", description: "Standar Layanan Dasar Toko Retail Informa", display_order: 1 },
        { id: "selling-skills", category_name: "Selling Skills", description: "Teknik Penjualan & Handling Keberatan Customer", display_order: 2 },
        { id: "product-knowledge", category_name: "Product Knowledge", description: "Pengetahuan Produk Furnitur & Garansi Informa", display_order: 3 },
        { id: "service-excellence", category_name: "Service Excellence", description: "Pelayanan Prima & Penanganan Komplain Customer", display_order: 4 },
        { id: "dining-department", category_name: "Dining Department", description: "Pengetahuan Produk & Merchandising Area Dining", display_order: 5 },
        { id: "glossary", category_name: "Istilah Retail & SOP", description: "Kamus Jargon, Tipe DISC, dan SOP Operasional Toko", display_order: 6 }
    ];
    for (const cat of defaultCategories) {
        await client.from('categories').upsert(cat, { onConflict: 'id' });
    }
    console.log("✅ Seed Kategori Selesai.");

    // 3. Seed Sample Videos
    const defaultVideos = [
        { title: "Simulasi Standar Greeting & Pelayanan Informa", category: "Basic Service", youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "04:15", description: "Panduan simulasi menyapa customer dengan senyum, salam, dan 5A." },
        { title: "Teknik Overcoming Objection & Closing Sale", category: "Selling Skills", youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "06:30", description: "Cara merespon keberatan harga dan mendorong kepastian belanja customer." }
    ];
    for (const vid of defaultVideos) {
        await client.from('videos').upsert(vid);
    }
    console.log("✅ Seed Video Selesai.");

    console.log("🎉 SELURUH SEED DATA AWAL BERHASIL MASUK KE SUPABASE CLOUD!");
}
