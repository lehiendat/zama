// File: encryptedComputation.js
class EncryptedComputation {
  constructor() {
    this.encryptionKey = Math.floor(Math.random() * 1000) + 100;
    this.encryptedValues = new Map();
  }

  // Mã hóa một mảng số
  encryptArray(numbers) {
    return numbers.map(num => num * this.encryptionKey + Math.floor(Math.random() * 10));
  }

  // Lưu giá trị mã hóa
  storeEncryptedData(id, data) {
    this.encryptedValues.set(id, this.encryptArray(data));
  }

  // Thực hiện phép cộng trên dữ liệu mã hóa
  addEncryptedData(id1, id2) {
    const data1 = this.encryptedValues.get(id1);
    const data2 = this.encryptedValues.get(id2);
    if (!data1 || !data2 || data1.length !== data2.length) return null;

    const result = [];
    for (let i = 0; i < data1.length; i++) {
      result.push(data1[i] + data2[i]);
    }
    return result;
  }

  // Giải mã kết quả
  decryptResult(encryptedResult) {
    return encryptedResult.map(value => Math.floor(value / this.encryptionKey));
  }

  // Ví dụ sử dụng
  runExample() {
    const dataset1 = [1, 2, 3, 4];
    const dataset2 = [5, 6, 7, 8];

    this.storeEncryptedData("set1", dataset1);
    this.storeEncryptedData("set2", dataset2);

    const encryptedSum = this.addEncryptedData("set1", "set2");
    if (encryptedSum) {
      const decryptedSum = this.decryptResult(encryptedSum);
      console.log("Original Data 1:", dataset1);
      console.log("Original Data 2:", dataset2);
      console.log("Encrypted Sum:", encryptedSum);
      console.log("Decrypted Sum:", decryptedSum);
    } else {
      console.log("Error in computation.");
    }
  }
}

// Chạy ví dụ
const computation = new EncryptedComputation();
computation.runExample();
