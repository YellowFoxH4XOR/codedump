from sqlalchemy import Column, Integer, String, Boolean, DateTime, ARRAY, ForeignKey
from sqlalchemy.sql import func

from app.db.session import Base


class PrePost(Base):
    __tablename__ = "preposts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    content = Column(String, nullable=False)
    is_published = Column(Boolean, default=False)
    tags = Column(ARRAY(String), default=[])
    category = Column(String, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    def __repr__(self):
        return f"<PrePost {self.title}>" 