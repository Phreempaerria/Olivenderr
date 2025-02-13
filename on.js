const BASE_URL = "https://6799f84d747b09cdcccd2e68.mockapi.io";

// เมื่อโหลดหน้าให้ทำการดึงข้อมูล
window.onload = async () => {
  await loadData();
};

// ฟังก์ชันสำหรับดึงและแสดงข้อมูล
const loadData = async (searchTerm = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/Product`);
    let products = response.data;

    if (searchTerm) {
      products = products.filter(
        (product) =>
          String(product.name)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          String(product.price)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // สร้าง HTML สำหรับการแสดงข้อมูลในตาราง
    let productHTMLData = `
      <table class="table table-zebra w-full text-sm">
       <thead>
      <tr class="text-center">
      <th class="px-4 py-4" style="color: #fff; font-size: 16px;">คำอธิบาย</th>
      <th class="px-4 py-2" style="color: #fff; font-size: 16px;">ราคา (เกลเลียน)</th>
        </thead>
        <tbody>`;

    // สร้างข้อมูลตาราง
    for (let i = 0; i < products.length; i++) {
      productHTMLData += `<tr class="text-center">
        <td class="px-4 py-2">${products[i].des}</td>
        <td class="px-4 py-2">${products[i].price}</td>
        <td class="px-4 py-2">
          <button class="btn btn-sm btn-primary" onclick="editProduct(${products[i].id})">Edit</button>
          <button class="btn btn-sm btn-error delete" data-id="${products[i].id}">Delete</button>
        </td>
      </tr>`;
    }

    productHTMLData += `</tbody></table>`;

    // แสดงข้อมูลใน DOM
    let productsDOM = document.getElementById("products");
    productsDOM.innerHTML = productHTMLData;

    // เพิ่มฟังก์ชันการลบ
    let deleteDOMs = document.getElementsByClassName("delete");
    for (let i = 0; i < deleteDOMs.length; i++) {
      deleteDOMs[i].addEventListener("click", async (event) => {
        let id = event.target.dataset.id;
        try {
          await axios.delete(`${BASE_URL}/Product/${id}`);
          loadData(); // โหลดข้อมูลใหม่หลังจากลบ
        } catch (error) {
          console.log("Error:", error);
        }
      });
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

// ฟังก์ชันสำหรับการค้นหา
const handleSearch = async () => {
  const searchInput = document.getElementById("search").value;
  await loadData(searchInput);
};

// ฟังก์ชันสำหรับการแก้ไขข้อมูล
const editProduct = (id) => {
  // นำไปยังหน้ารายการสินค้าและส่ง id ไป
  window.location.href = `add.html?id=${id}`;  // เปลี่ยน add.html เป็นหน้าแก้ไขที่คุณใช้
};
