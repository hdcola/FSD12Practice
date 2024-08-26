from flask import Flask, render_template
from dotenv import load_dotenv
from config import Config
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
import models  # noqa: E402


@app.route('/')
async def hello():
    return render_template('index.html', vueapp="main.js")


@app.route('/enroll')
async def enroll():
    return render_template('enroll.html', vueapp="enroll.js")


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Enroll': models.Enroll}


if __name__ == '__main__':
    app.run()
