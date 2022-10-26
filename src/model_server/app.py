import os

from flask import Flask, jsonify, request
from transformers import AutoModelForCausalLM, AutoTokenizer

app = Flask(__name__)

ckpt = "YurtsAI/yurts-python-code-gen-30-sparse"
model = AutoModelForCausalLM.from_pretrained(ckpt, torchscript=True)
model = model.eval()
tokenizer = AutoTokenizer.from_pretrained(ckpt)


@app.route("/", methods=["POST", "GET"])
def predict():
    if request.method == "GET":
        return (
            "Maverick loaded properly. "
            "Use POST methods to retrieve predictions."
        )

    text = request.json["text"]
    num_tokens = request.json.get("numTokens", 64)
    input_ids = tokenizer(text, return_tensors="pt").input_ids

    generated_ids = model.generate(
        input_ids,
        max_length=len(input_ids[0]) + num_tokens,
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
    port = int(os.environ.get("PORT", 9401))
    app.run(debug=False, host="0.0.0.0", port=port)
