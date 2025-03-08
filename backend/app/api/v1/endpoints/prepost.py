"""
This module is intentionally left empty for the PrePost namespace.
You can add API endpoints here as needed in the future.
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from netmiko import ConnectHandler
from app.db.session import get_db
from app.schemas.prepost import PrePostCreate, ExecuteCommandsResponse  # Assuming you have a schema for results
import asyncio
import os
from dotenv import load_dotenv
from app.utils.dependencies import get_current_user

router = APIRouter()

@router.post("/execute-commands/", response_model=ExecuteCommandsResponse, status_code=status.HTTP_201_CREATED)
async def execute_commands(
    ip_list: List[str],
    commands: List[str],
    current_user: User = Depends(get_current_user),  # Protecting the endpoint
    db: Session = Depends(get_db),
):
    """
    Execute commands on a list of devices and save the results in the database.
    """
    results = []

    async def run_commands(ip):
        try:
            device = {
                'device_type': 'cisco_ios',  # Change as needed
                'host': ip,
                'username': current_user.username,
                'password': current_user.hashed_password,
            }
            connection = ConnectHandler(**device)
            output = {}
            for command in commands:
                output[command] = connection.send_command(command)
            connection.disconnect()
            return {"ip": ip, "output": output}
        except Exception as e:
            return {"ip": ip, "error": str(e)}

    tasks = [run_commands(ip) for ip in ip_list]
    results = await asyncio.gather(*tasks)

    response = ExecuteCommandsResponse(results=results, username=current_user.username)

    # Save results to the database (you may need to create a new model/schema for this)
    for result in results:
        # Assuming you have a function to save results
        # await save_results_to_db(db, result)
        pass  # Implement your saving logic here

    return response 