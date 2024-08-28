from flask import Flask, render_template
from dotenv import load_dotenv
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify, request, url_for, redirect
import forms
from flask_wtf.csrf import CSRFProtect

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
csrf = CSRFProtect(app)

db = SQLAlchemy(app)
import models  # noqa: E402


@app.route('/')
async def hello():
    return render_template('index.html', vueapp="main.js")


@app.route('/enroll', methods=['GET', 'POST'])
async def enroll():
    form = forms.EnrollForm()
    return render_template('enroll.html', vueapp="enroll.js", form=form)


@app.route('/api/enroll', methods=['POST'])
async def create():
    json_data = request.get_json()
    form = forms.EnrollForm(data=json_data)
    if form.validate_on_submit():
        enroll = models.Enroll(name=form.name.data, email=form.email.data)
        db.session.add(enroll)
        db.session.commit()
        print(enroll)
        return redirect(url_for('/enrolls'))
    return jsonify({'status': 'error', 'errors': form.errors}), 400


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
