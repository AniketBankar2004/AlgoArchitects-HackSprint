from flask import Flask, request, jsonify
import fitz  
from sentence_transformers import SentenceTransformer, util
from docx import Document
import io
import re


model = SentenceTransformer('all-MiniLM-L6-v2')
app = Flask(__name__)

def extract_text(file: io.BytesIO, filename: str) -> str:
    text = ""

    if filename.endswith(".pdf"):
        file_bytes = file.read()
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text = " ".join(page.get_text() for page in doc)
        file.seek(0)

    elif filename.endswith((".docx", ".doc")):
        doc = Document(file)
        text = "\n".join(para.text for para in doc.paragraphs)
        file.seek(0)

    elif filename.endswith(".txt"):
        text = file.read().decode("utf-8")
        file.seek(0)

    return text

def clean_text(text):
    # Lowercase (optional, model is case-sensitive but performs well either way)
    text = text.strip()

    # Remove bullet points and labels
    text = re.sub(r"[-•|–\*]\s+", "", text)
    

    # Remove multiple spaces and newlines
    text = re.sub(r"\n+", " ", text)
    text = re.sub(r"\s+", " ", text)

    return text



def evaluate(description: str, resumes: dict, model) -> dict:
    description_vector = model.encode(description, convert_to_tensor=True)
    scoring = {}

    for name, resume in resumes.items():
        res_vector = model.encode(resume, convert_to_tensor=True)
        sim_score = util.pytorch_cos_sim(description_vector, res_vector)[0][0].item()
        scoring[name] = round(sim_score, 4)

    
    sorted_scores = dict(sorted(scoring.items(), key=lambda item: item[1]))

    return sorted_scores
@app.route('/scan', methods=['POST'])
def upload_files():

    name_job_description = request.form.get('job_description')
    if not name_job_description:
        return jsonify({"error": "Missing 'name_job_description' in form data"}), 400
    
    cleaned_description = clean_text(name_job_description)

    if 'files' not in request.files:
        return jsonify({"error": "No files part in the request"}), 400

    files = request.files.getlist('files')
    extracted = {}

    for f in files:
        filename = f.filename
        if filename:
            try:
                text = extract_text(f, filename)
                cleaned_text = clean_text(text)
                extracted[filename] = cleaned_text
            except Exception as e:
                extracted[filename] = f"Error extracting text: {str(e)}"

    score = evaluate(cleaned_description,extracted,model)

    return jsonify(score)

if __name__ == '__main__':
    app.run(debug=True)
