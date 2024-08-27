from flask import Flask, render_template
from dotenv import load_dotenv
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify, request, url_for, redirect
import forms

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


@app.route('/create', methods=['POST'])
async def create():
    form = forms.EnrollForm(request.form)
    if form.validate_on_submit():
        enroll = models.Enroll(name=form.name.data, email=form.email.data)
        db.session.add(enroll)
        db.session.commit()
        return redirect(url_for('/api/enrolls'))
    return jsonify({'status': 'error', 'errors': form.errors})


@app.route('/enrolls', methods=['GET'])
def get_enrolls():
    enrolls = models.Enroll.query.all()
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify(enrolls)
    return render_template('enrolls.html', vueapp="enrolls.js")


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Enroll': models.Enroll}


if __name__ == '__main__':
    app.run()
