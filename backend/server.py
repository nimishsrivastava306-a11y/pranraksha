from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from passlib.context import CryptContext


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    email: EmailStr
    full_name: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class UserLogin(BaseModel):
    username: str
    password: str

class PasswordVerify(BaseModel):
    password: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Welcome to Pranraksha API"}

@api_router.post("/register", response_model=User)
async def register(user_data: UserCreate):
    # Check if user already exists
    existing_user = await db.users.find_one({"username": user_data.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    existing_email = await db.users.find_one({"email": user_data.email})
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash the password
    hashed_password = pwd_context.hash(user_data.password)
    
    # Create user object
    user_obj = User(
        username=user_data.username,
        email=user_data.email,
        full_name=user_data.full_name
    )
    
    # Prepare document for MongoDB
    doc = user_obj.model_dump()
    doc['timestamp'] = doc['created_at'].isoformat()
    doc['hashed_password'] = hashed_password
    
    await db.users.insert_one(doc)
    return user_obj

@api_router.post("/login")
async def login(login_data: UserLogin):
    # Find user
    user = await db.users.find_one({"username": login_data.username})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Verify password
    if not pwd_context.verify(login_data.password, user['hashed_password']):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    return {
        "message": "Login successful",
        "user": {
            "id": user['id'],
            "username": user['username'],
            "email": user['email'],
            "full_name": user.get('full_name')
        }
    }

@api_router.post("/verify-document-password")
async def verify_document_password(data: PasswordVerify):
    # Get the hashed password from environment or use default
    # The password "aryan@66865" is hashed using bcrypt
    stored_password_hash = os.environ.get(
        'DOCUMENT_PASSWORD_HASH',
        '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5eidoK1QM3QK2'  # Hash of "aryan@66865"
    )
    
    # Verify the password using bcrypt
    if pwd_context.verify(data.password, stored_password_hash):
        return {"success": True, "message": "Password verified"}
    else:
        raise HTTPException(status_code=401, detail="Incorrect password")

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()