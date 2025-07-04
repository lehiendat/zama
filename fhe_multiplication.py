# File: fhe_multiplication.py
import random

class FHEMultiplication:
    def __init__(self):
        self.public_key = random.randint(1000, 9999)
        self.secret_key = random.randint(1, 50)
        self.encrypted_data = {}

    def encrypt(self, data):
        encrypted = []
        for value in data:
            noise = random.randint(1, 20)
            encrypted.append((value * self.public_key * self.secret_key + noise) % 10000)
        return encrypted

    def store_encrypted(self, id, data):
        self.encrypted_data[id] = self.encrypt(data)

    def multiply_encrypted(self, id1, id2):
        if id1 not in self.encrypted_data or id2 not in self.encrypted_data:
            return None
        data1 = self.encrypted_data[id1]
        data2 = self.encrypted_data[id2]
        if len(data1) != len(data2):
            return None

        result = []
        for i in range(len(data1)):
            result.append((data1[i] * data2[i]) % 10000)
        return result

    def decrypt(self, encrypted_result):
        decrypted = []
        for value in encrypted_result:
            temp = value // (self.public_key * self.secret_key)
            decrypted.append(temp % 100)
        return decrypted

    def run_example(self):
        data1 = [2, 4, 6, 8]
        data2 = [3, 5, 7, 9]

        self.store_encrypted("data1", data1)
        self.store_encrypted("data2", data2)

        encrypted_product = self.multiply_encrypted("data1", "data2")
        if encrypted_product:
            decrypted_product = self.decrypt(encrypted_product)
            print(f"Public Key: {self.public_key}")
            print(f"Secret Key: {self.secret_key}")
            print(f"Original Data 1: {data1}")
            print(f"Original Data 2: {data2}")
            print(f"Encrypted Product: {encrypted_product}")
            print(f"Decrypted Product: {decrypted_product}")
        else:
            print("Error in multiplication.")

# Chạy ví dụ
if __name__ == "__main__":
    simulator = FHEMultiplication()
    simulator.run_example()
