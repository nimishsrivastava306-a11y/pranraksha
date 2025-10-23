#!/usr/bin/env python3
"""
Backend API Testing for Pranraksha Application
Tests all backend endpoints with comprehensive scenarios
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from environment
BACKEND_URL = "https://responsive-ui-boost.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name, success, details=""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        result = {
            "test": test_name,
            "status": status,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        if not success:
            self.failed_tests.append(result)
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        print()

    def test_user_registration(self):
        """Test User Registration API endpoints"""
        print("=" * 60)
        print("TESTING USER REGISTRATION API")
        print("=" * 60)
        
        # Test 1: Successful registration with valid data
        try:
            payload = {
                "username": "testuser123",
                "email": "test@example.com", 
                "password": "Test@1234",
                "full_name": "Test User"
            }
            
            response = requests.post(f"{BACKEND_URL}/register", json=payload, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and data["username"] == "testuser123":
                    self.log_test("Registration - Valid Data", True, f"User created with ID: {data['id']}")
                else:
                    self.log_test("Registration - Valid Data", False, f"Invalid response structure: {data}")
            else:
                self.log_test("Registration - Valid Data", False, f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("Registration - Valid Data", False, f"Exception: {str(e)}")

        # Test 2: Duplicate username rejection
        try:
            payload = {
                "username": "testuser123",  # Same username
                "email": "different@example.com",
                "password": "Test@1234"
            }
            
            response = requests.post(f"{BACKEND_URL}/register", json=payload, timeout=10)
            
            if response.status_code == 400:
                data = response.json()
                if "Username already registered" in data.get("detail", ""):
                    self.log_test("Registration - Duplicate Username", True, "Correctly rejected duplicate username")
                else:
                    self.log_test("Registration - Duplicate Username", False, f"Wrong error message: {data}")
            else:
                self.log_test("Registration - Duplicate Username", False, f"Expected 400, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Registration - Duplicate Username", False, f"Exception: {str(e)}")

        # Test 3: Duplicate email rejection
        try:
            payload = {
                "username": "differentuser",
                "email": "test@example.com",  # Same email
                "password": "Test@1234"
            }
            
            response = requests.post(f"{BACKEND_URL}/register", json=payload, timeout=10)
            
            if response.status_code == 400:
                data = response.json()
                if "Email already registered" in data.get("detail", ""):
                    self.log_test("Registration - Duplicate Email", True, "Correctly rejected duplicate email")
                else:
                    self.log_test("Registration - Duplicate Email", False, f"Wrong error message: {data}")
            else:
                self.log_test("Registration - Duplicate Email", False, f"Expected 400, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Registration - Duplicate Email", False, f"Exception: {str(e)}")

        # Test 4: Invalid email format
        try:
            payload = {
                "username": "newuser",
                "email": "invalid-email-format",  # Invalid email
                "password": "Test@1234"
            }
            
            response = requests.post(f"{BACKEND_URL}/register", json=payload, timeout=10)
            
            if response.status_code == 422:  # Pydantic validation error
                self.log_test("Registration - Invalid Email", True, "Correctly rejected invalid email format")
            else:
                self.log_test("Registration - Invalid Email", False, f"Expected 422, got {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Registration - Invalid Email", False, f"Exception: {str(e)}")

    def test_user_login(self):
        """Test User Login API endpoints"""
        print("=" * 60)
        print("TESTING USER LOGIN API")
        print("=" * 60)
        
        # Test 1: Successful login with registered credentials
        try:
            payload = {
                "username": "testuser123",
                "password": "Test@1234"
            }
            
            response = requests.post(f"{BACKEND_URL}/login", json=payload, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "user" in data and data["user"]["username"] == "testuser123":
                    self.log_test("Login - Valid Credentials", True, f"Login successful for user: {data['user']['username']}")
                else:
                    self.log_test("Login - Valid Credentials", False, f"Invalid response structure: {data}")
            else:
                self.log_test("Login - Valid Credentials", False, f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("Login - Valid Credentials", False, f"Exception: {str(e)}")

        # Test 2: Login with incorrect password
        try:
            payload = {
                "username": "testuser123",
                "password": "WrongPassword123"
            }
            
            response = requests.post(f"{BACKEND_URL}/login", json=payload, timeout=10)
            
            if response.status_code == 401:
                data = response.json()
                if "Invalid username or password" in data.get("detail", ""):
                    self.log_test("Login - Incorrect Password", True, "Correctly rejected incorrect password")
                else:
                    self.log_test("Login - Incorrect Password", False, f"Wrong error message: {data}")
            else:
                self.log_test("Login - Incorrect Password", False, f"Expected 401, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Login - Incorrect Password", False, f"Exception: {str(e)}")

        # Test 3: Login with non-existent username
        try:
            payload = {
                "username": "nonexistentuser",
                "password": "Test@1234"
            }
            
            response = requests.post(f"{BACKEND_URL}/login", json=payload, timeout=10)
            
            if response.status_code == 401:
                data = response.json()
                if "Invalid username or password" in data.get("detail", ""):
                    self.log_test("Login - Non-existent User", True, "Correctly rejected non-existent user")
                else:
                    self.log_test("Login - Non-existent User", False, f"Wrong error message: {data}")
            else:
                self.log_test("Login - Non-existent User", False, f"Expected 401, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Login - Non-existent User", False, f"Exception: {str(e)}")

    def test_document_password_verification(self):
        """Test Document Password Verification API"""
        print("=" * 60)
        print("TESTING DOCUMENT PASSWORD VERIFICATION API")
        print("=" * 60)
        
        # Test 1: Correct password
        try:
            payload = {
                "password": "aryan@66865"
            }
            
            response = requests.post(f"{BACKEND_URL}/verify-document-password", json=payload, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") is True and "Password verified" in data.get("message", ""):
                    self.log_test("Document Password - Correct", True, "Password verification successful")
                else:
                    self.log_test("Document Password - Correct", False, f"Invalid response: {data}")
            else:
                self.log_test("Document Password - Correct", False, f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("Document Password - Correct", False, f"Exception: {str(e)}")

        # Test 2: Incorrect password
        try:
            payload = {
                "password": "wrongpassword123"
            }
            
            response = requests.post(f"{BACKEND_URL}/verify-document-password", json=payload, timeout=10)
            
            if response.status_code == 401:
                data = response.json()
                if "Incorrect password" in data.get("detail", ""):
                    self.log_test("Document Password - Incorrect", True, "Correctly rejected incorrect password")
                else:
                    self.log_test("Document Password - Incorrect", False, f"Wrong error message: {data}")
            else:
                self.log_test("Document Password - Incorrect", False, f"Expected 401, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Document Password - Incorrect", False, f"Exception: {str(e)}")

    def verify_password_encryption(self):
        """Verify that passwords are properly encrypted using bcrypt"""
        print("=" * 60)
        print("VERIFYING PASSWORD ENCRYPTION")
        print("=" * 60)
        
        # Check backend code for bcrypt usage
        try:
            with open('/app/backend/server.py', 'r') as f:
                backend_code = f.read()
                
            # Check for bcrypt imports and usage
            bcrypt_checks = [
                'from passlib.context import CryptContext' in backend_code,
                'pwd_context = CryptContext(schemes=["bcrypt"]' in backend_code,
                'pwd_context.hash(' in backend_code,
                'pwd_context.verify(' in backend_code
            ]
            
            if all(bcrypt_checks):
                self.log_test("Password Encryption - Bcrypt Usage", True, "Backend properly uses bcrypt for password hashing")
            else:
                missing = []
                if not bcrypt_checks[0]: missing.append("CryptContext import")
                if not bcrypt_checks[1]: missing.append("bcrypt scheme setup")
                if not bcrypt_checks[2]: missing.append("password hashing")
                if not bcrypt_checks[3]: missing.append("password verification")
                
                self.log_test("Password Encryption - Bcrypt Usage", False, f"Missing bcrypt components: {', '.join(missing)}")
                
        except Exception as e:
            self.log_test("Password Encryption - Bcrypt Usage", False, f"Exception reading backend code: {str(e)}")

        # Check environment variable for document password hash
        try:
            with open('/app/backend/.env', 'r') as f:
                env_content = f.read()
                
            if 'DOCUMENT_PASSWORD_HASH="$2b$12$' in env_content:
                self.log_test("Document Password - Bcrypt Hash", True, "Document password is stored as bcrypt hash in environment")
            else:
                self.log_test("Document Password - Bcrypt Hash", False, "Document password hash not found or not bcrypt format")
                
        except Exception as e:
            self.log_test("Document Password - Bcrypt Hash", False, f"Exception reading .env file: {str(e)}")

    def test_api_connectivity(self):
        """Test basic API connectivity"""
        print("=" * 60)
        print("TESTING API CONNECTIVITY")
        print("=" * 60)
        
        try:
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "Welcome to Pranraksha API" in data.get("message", ""):
                    self.log_test("API Connectivity", True, f"Backend API is accessible at {BACKEND_URL}")
                else:
                    self.log_test("API Connectivity", False, f"Unexpected response: {data}")
            else:
                self.log_test("API Connectivity", False, f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("API Connectivity", False, f"Exception: {str(e)}")

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Pranraksha Backend API Tests")
        print(f"Backend URL: {BACKEND_URL}")
        print(f"Test started at: {datetime.now().isoformat()}")
        print()
        
        # Run all test suites
        self.test_api_connectivity()
        self.test_user_registration()
        self.test_user_login()
        self.test_document_password_verification()
        self.verify_password_encryption()
        
        # Print summary
        self.print_summary()

    def print_summary(self):
        """Print test summary"""
        print("=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = total_tests - len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        print()
        
        if self.failed_tests:
            print("FAILED TESTS:")
            print("-" * 40)
            for test in self.failed_tests:
                print(f"❌ {test['test']}")
                print(f"   {test['details']}")
                print()
        else:
            print("🎉 ALL TESTS PASSED!")
        
        print("=" * 80)

if __name__ == "__main__":
    tester = BackendTester()
    tester.run_all_tests()