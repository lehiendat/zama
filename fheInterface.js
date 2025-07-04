// File: fheInterface.js
class FHEInterface {
  constructor() {
    this.dataStore = [];
    this.encryptionLevel = 7;
  }

  // Mã hóa dữ liệu với cấp độ
  encryptData(data) {
    return data.map(value => {
      let encrypted = value * this.encryptionLevel;
      for (let i = 0; i < 3; i++) {
        encrypted += Math.floor(Math.random() * 5);
      }
      return encrypted;
    });
  }

  // Thêm dữ liệu mới
  addData(id, values) {
    const encrypted = this.encryptData(values);
    this.dataStore.push({ id, original: values, encrypted });
    return encrypted;
  }

  // Tìm và giải mã
  findAndDecrypt(id) {
    const entry = this.dataStore.find(item => item.id === id);
    if (!entry) return null;

    const decrypted = entry.encrypted.map(value => Math.floor(value / this.encryptionLevel));
    return { ...entry, decrypted };
  }

  // Hiển thị tất cả dữ liệu
  displayAll() {
    return this.dataStore.map(item => {
      const decrypted = this.findAndDecrypt(item.id).decrypted;
      return { id: item.id, original: item.original, encrypted: item.encrypted, decrypted };
    });
  }
}

// Ví dụ sử dụng
const interface = new FHEInterface();
interface.addData("user1", [10, 20, 30]);
interface.addData("user2", [40, 50, 60]);

const user1Data = interface.findAndDecrypt("user1");
const allData = interface.displayAll();

console.log("User 1 Data:", user1Data);
console.log("All Data:", allData);
