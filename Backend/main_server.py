'''
pip install fastapi uvicorn
uvicorn main_server:app --reload

'''
# dependencies
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


# app instance
app = FastAPI()

# set up permmisions
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # List of allowed origins (can use "*" for all)
    allow_credentials=True,
    allow_methods=["*"],    # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],    # Allow all headers
)


# initial route
@app.get('/')
def Home():
    return 'backend connected'