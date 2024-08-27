import app
from dataclasses import dataclass
from datetime import datetime


@dataclass
class Enroll(app.db.Model):

    id: int
    name: str
    email: str
    message: str
    created_at: datetime

    id = app.db.Column(app.db.Integer, primary_key=True)
    name = app.db.Column(app.db.String(100), nullable=False)
    email = app.db.Column(app.db.String(100), nullable=False)
    message = app.db.Column(app.db.String(100), nullable=True)
    created_at = app.db.Column(
        app.db.DateTime, server_default=app.db.func.now())

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def __repr__(self):
        return f'<Enroll {self.id} - {self.name} {self.email} {self.message} {self.created_at}>'
