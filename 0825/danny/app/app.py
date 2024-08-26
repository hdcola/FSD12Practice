from flask import Flask, render_template
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)


@app.route('/')
async def hello():
    return render_template('index.html', vueapp="main.js")


@app.route('/enroll')
async def enroll():
    return render_template('enroll.html', vueapp="enroll.js")

if __name__ == '__main__':
    app.run()
