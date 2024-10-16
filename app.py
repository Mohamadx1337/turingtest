from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_results', methods=['POST'])
def save_results():
    data = request.get_json()
    score = data['score']
    total_questions = data['totalQuestions']
    
    # Spara resultaten i userresults.txt
    with open("userresults.txt", "a") as f:
        f.write(f"Score: {score}/{total_questions}\n")
    
    return jsonify({"status": "success", "score": score})

if __name__ == '__main__':
    app.run(debug=True)
