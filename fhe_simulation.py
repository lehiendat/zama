# File: fhe_simulation.py
import random

class FHESimulator:
    def __init__(self):
        self.public_key = self.generate_public_key()
        self.secret_key = self.generate_secret_key()

    def generate_public_key(self):
        return random.randint(1000, 9999)

    def generate_secret_key(self):
        return random.randint(1, 100)

    def encrypt(self, data, public_key):
        encrypted = []
        for value in data:
            noise = random.randint(1, 10)
            encrypted.append((value * public_key + noise) % 10000)
        return encrypted

    def decrypt(self, encrypted_data, secret_key, public_key):
        decrypted = []
        for value in encrypted_data:
            decrypted.append(((value - (value // public_key) * public_key) // secret_key) % 100)
        return decrypted

    def process_data(self, input_data):
        encrypted = self.encrypt(input_data, self.public_key)
        decrypted = self.decrypt(encrypted, self.secret_key, self.public_key)
        return {
            "original": input_data,
            "encrypted": encrypted,
            "decrypted": decrypted
        }

# Ví dụ sử dụng
if __name__ == "__main__":
    simulator = FHESimulator()
    sample_input = [5, 10, 15, 20]
    result = simulator.process_data(sample_input)

    print(f"Public Key: {simulator.public_key}")
    print(f"Secret Key: {simulator.secret_key}")
    print(f"Processing Result: {result}")
