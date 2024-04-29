from gingerit.gingerit import GingerIt
from flask import Flask, render_template, request, jsonify
from transformers import pipeline
import requests
import pickle
import torch
from parrot_module import paraphrase_phrase
from flask_cors import CORS  # Import CORS



app = Flask(__name__)
CORS(app)
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
# parrot = pickle.load(open('parrot.pkl', 'rb'))
# summarizer = pickle.load(open('summarizer.pkl', 'rb'))


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check_spelling', methods=['POST'])
def check_spelling():
    text = request.form.get('text')
    corrected_text = spell_check(text)

    # Return the corrected text as text response
    return corrected_text

@app.route('/paraphrase', methods = ['POST'])
def paraphrase():
    print('I am in paraphraser!')
    text = request.form.get('text')
    # paraphrased_text = parrot.augment(text)[0][0]
    paraphrased_text = paraphrase_phrase(text)
    print('Out of paraphraser!')
    return paraphrased_text

@app.route('/summarize', methods = ['POST'])
def summarize():
    print('I am in summarizer!')
    # Put summarization logic here
    text = request.form.get('text')
    print(text)
    summarized_text = summarizer(text, max_length=130, min_length=30, do_sample=False)[0]['summary_text']
    print('I am out of summarizer!')
    return summarized_text


def spell_check(text):
    # Implement your spell-checking logic here
    # This is just a placeholder implementation
    parser = GingerIt()
    out = parser.parse(text)
    print('I am in spell check!')
    return out['result']

if __name__ == '__main__':
    app.run()