// File: dataProcessor.js
class DataProcessor {
  constructor(data) {
    this.data = data;
    this.processedData = [];
  }

  // Hàm mã hóa dữ liệu đơn giản (giả lập)
  encryptData(plainText, key) {
    let encrypted = '';
    for (let i = 0; i < plainText.length; i++) {
      encrypted += String.fromCharCode(plainText.charCodeAt(i) + key);
    }
    return encrypted;
  }

  // Hàm xử lý và lưu dữ liệu
  process() {
    this.data.forEach((item, index) => {
      const encryptedItem = this.encryptData(item, 5);
      this.processedData.push({
        original: item,
        encrypted: encryptedItem,
        timestamp: new Date().toISOString(),
        id: index
      });
    });
    return this.processedData;
  }

  // Hàm giải mã dữ liệu
  decryptData(encryptedText, key) {
    let decrypted = '';
    for (let i = 0; i < encryptedText.length; i++) {
      decrypted += String.fromCharCode(encryptedText.charCodeAt(i) - key);
    }
    return decrypted;
  }

  // Xuất kết quả
  getResults() {
    return this.processedData.map(item => ({
      ...item,
      decrypted: this.decryptData(item.encrypted, 5)
    }));
  }
}

// Ví dụ sử dụng
const sampleData = ["Hello", "World", "FHEVM"];
const processor = new DataProcessor(sampleData);
processor.process();
const results = processor.getResults();

console.log("Processed Data:", results);
