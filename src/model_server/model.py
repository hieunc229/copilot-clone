from flask import Flask, jsonify, request

app = Flask(__name__)

import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

checkpoint = "Salesforce/codegen-350M-mono"
model = AutoModelForCausalLM.from_pretrained(checkpoint, torchscript=True).eval()

tokenizer = AutoTokenizer.from_pretrained(checkpoint)
text = "def hello_world():"
input_ids = tokenizer(text, return_tensors="pt").input_ids

traced_model_generate = torch.jit.trace(model.generate, (input_ids, 128))
tokenizer = AutoTokenizer.from_pretrained(checkpoint)


@app.route("/", methods=["POST", "GET"])
def predict():
    if request.method == "GET":
        import sys

        if getattr(sys, "frozen", False) and hasattr(sys, "_MEIPASS"):
            return "running in a PyInstaller bundle"
        else:
            return "running in a normal Python process"

        # return "Maverick loaded properly. Use POST methods to retrieve predictions."

    text = request.json["text"]
    input_ids = tokenizer(text, return_tensors="pt").input_ids

    generated_ids = model.generate(
        input_ids,
        max_length=len(input_ids[0]) + 64,
    )

    return jsonify(
        {
            "text": [
                tokenizer.decode(generated_id, skip_special_tokens=True)
                for generated_id in generated_ids
            ]
        }
    )


if __name__ == "__main__":
    app.run(port=5000, debug=True)
