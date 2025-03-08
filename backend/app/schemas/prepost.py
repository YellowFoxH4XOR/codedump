from datetime import datetime
from typing import Optional, Dict, Any, List, Literal
from pydantic import BaseModel, Field


class PrePostBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    content: str = Field(..., min_length=1)
    is_published: bool = Field(default=False)
    tags: list[str] = Field(default_factory=list)
    category: Optional[str] = Field(None, max_length=100)


class PrePostCreate(PrePostBase):
    pass


class PrePostUpdate(PrePostBase):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    content: Optional[str] = Field(None, min_length=1)
    is_published: Optional[bool] = None
    tags: Optional[list[str]] = None
    category: Optional[str] = Field(None, max_length=100)


class PrePostInDBBase(PrePostBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    author_id: int

    class Config:
        from_attributes = True


class PrePost(PrePostInDBBase):
    pass


class CommandResult(BaseModel):
    ip: str
    output: Dict[str, Any]  # Command output
    error: Optional[str] = None  # Error message if any


class ExecuteCommandsResponse(BaseModel):
    results: List[CommandResult]
    username: str
    password: Literal["******"] = Field(default="******")  # Masked password using Literal 