#this is a utility function to convert ORM objects to dictionaries prior to sending them to the frontend
def to_dict(orm_objects):
    return [
        {
            key: value 
            for key, value in obj.__dict__.items() 
            if not key.startswith('_')  # Skip internal SQLAlchemy attributes
        }
        for obj in orm_objects
    ]