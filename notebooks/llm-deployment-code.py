# COMPLETE RAG SYSTEM
!pip install -q transformers torch sentence-transformers faiss-cpu flask flask-ngrok pyngrok

import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from flask import Flask, request, jsonify
from flask_ngrok import run_with_ngrok
import time

print("🚀 Starting clean RAG system...")

# Minimal knowledge base (3 docs for testing)
docs = [
    {"title": "Seller Registration", "content": "Seller accounts require business verification and take 2-3 days."},
    {"title": "Return Policy", "content": "30-day return window for most items in original condition."},
    {"title": "Payment Methods", "content": "We accept credit cards, PayPal, and digital wallets."}
]

# Load model
model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16)

# Setup RAG
embedder = SentenceTransformer('all-MiniLM-L6-v2')
doc_embeddings = embedder.encode([d["content"] for d in docs])
index = faiss.IndexFlatIP(doc_embeddings.shape[1])
faiss.normalize_L2(doc_embeddings)
index.add(doc_embeddings)

# Flask app
app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "docs": len(docs)})

@app.route('/chat', methods=['POST'])
def chat():
    question = request.json.get('question', '')
    query_embedding = embedder.encode([question])
    faiss.normalize_L2(query_embedding)
    scores, indices = index.search(query_embedding, 2)
    
    context = "\n".join([docs[i]["content"] for i in indices[0] if i < len(docs)])
    prompt = f"Context: {context}\nQuestion: {question}\nAnswer:"
    
    inputs = tokenizer(prompt, return_tensors="pt")
    with torch.no_grad():
        outputs = model.generate(inputs.input_ids, max_new_tokens=100)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    return jsonify({
        "question": question,
        "response": response,
        "sources": [docs[i]["title"] for i in indices[0] if i < len(docs)]
    })

# Ngrok setup
print("Enter ngrok token:")
ngrok_token = input().strip()
if ngrok_token:
    from pyngrok import ngrok
    ngrok.set_auth_token(ngrok_token)

public_url = ngrok.connect(5000).public_url
print(f"✅ API URL: {public_url}")

run_with_ngrok(app)
app.run()
