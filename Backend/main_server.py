'''
pip install fastapi uvicorn
uvicorn main_server:app --reload

'''
# dependencies
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

# app instance
app = FastAPI()

# set up permmisions
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],  # List of allowed origins (can use "*" for all)
    allow_credentials=True,
    allow_methods=["*"],    # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],    # Allow all headers
)


'''# initial route
@app.get('/')
def Home():
    return 'backend connected'
'''

@app.get('/base')
def hulu_data():
    df = pd.read_csv('C:/Users/rockl/OneDrive/Documents/GitHub/SceneIT/MediaData/cleaned/hulu_titles_cleaned.csv')
    return df.to_csv()

    
