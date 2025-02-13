const BASE_URL = "https://6799f84d747b09cdcccd2e68.mockapi.io";

// ฟังก์ชันเมื่อโหลดหน้า
window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id'); // รับ id จาก URL

  if (productId) {
    // ถ้ามี id ให้โหลดข้อมูลสินค้าจาก API เพื่อแสดงในฟอร์ม
    try {
      const response = await axios.get(`${BASE_URL}/Product/${productId}`);
      const product = response.data;

      // แสดงข้อมูลในฟอร์ม
      document.getElementById("product_id").value = product.id;
      document.getElementById("pro_name").value = product.name;
      document.getElementById("pro_des").value = product.des;
      document.getElementById("pro_price").value = product.price;
    } catch (error) {
      console.log("Error loading product:", error);
      alert('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    }
  }
};

// ฟังก์ชันบันทึกข้อมูล (สำหรับการเพิ่ม/แก้ไข)
const saveProduct = async () => {
  const id = document.getElementById("product_id").value;
  const name = document.getElementById("pro_name").value;
  const des = document.getElementById("pro_des").value;
  const price = document.getElementById("pro_price").value;

  const productData = {
    name,
    des,
    price,
    image_url: 'path_to_image'  // ใช้ URL ของรูปภาพที่ผู้ใช้เลือก
  };

  try {
    if (id) {
      // ถ้ามี id ให้แก้ไขข้อมูล
      await axios.put(`${BASE_URL}/Product/${id}`, productData);
    } else {
      // ถ้าไม่มี id ให้สร้างข้อมูลใหม่
      await axios.post(`${BASE_URL}/Product`, productData);
    }
    alert('บันทึกข้อมูลสำเร็จ!');
    window.location.href = "on.html";  // กลับไปหน้าหลักหลังจากบันทึก
  } catch (error) {
    console.log("Error saving product:", error);
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
  }
};
