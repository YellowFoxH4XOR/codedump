from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.crud import item as item_crud
from app.schemas.item import Item, ItemCreate, ItemUpdate
from app.db.session import get_db

router = APIRouter()


@router.get("/", response_model=List[Item])
def read_items(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
):
    """
    Retrieve items.
    """
    items = item_crud.get_items(db, skip=skip, limit=limit)
    return items


@router.post("/", response_model=Item, status_code=status.HTTP_201_CREATED)
def create_item(
    *,
    db: Session = Depends(get_db),
    item_in: ItemCreate,
):
    """
    Create new item.
    """
    item = item_crud.create_item(db, item=item_in)
    return item


@router.get("/{item_id}", response_model=Item)
def read_item(
    *,
    db: Session = Depends(get_db),
    item_id: int,
):
    """
    Get item by ID.
    """
    item = item_crud.get_item(db, item_id=item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found",
        )
    return item


@router.put("/{item_id}", response_model=Item)
def update_item(
    *,
    db: Session = Depends(get_db),
    item_id: int,
    item_in: ItemUpdate,
):
    """
    Update an item.
    """
    item = item_crud.get_item(db, item_id=item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found",
        )
    item = item_crud.update_item(db, item_id=item_id, item=item_in)
    return item


@router.delete("/{item_id}", response_model=bool)
def delete_item(
    *,
    db: Session = Depends(get_db),
    item_id: int,
):
    """
    Delete an item.
    """
    item = item_crud.get_item(db, item_id=item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found",
        )
    return item_crud.delete_item(db, item_id=item_id) 