from flask import Flask, jsonify, request
from transformers import AutoModelForCausalLM, AutoTokenizer

app = Flask(__name__)

checkpoint = "Salesforce/codegen-350M-mono"
model = AutoModelForCausalLM.from_pretrained(checkpoint, torchscript=True).eval()
tokenizer = AutoTokenizer.from_pretrained(checkpoint)


@app.route("/", methods=["POST", "GET"])
def predict():
    if request.method == "GET":
        return "Maverick loaded properly. Use POST methods to retrieve predictions."

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
    app.run(port=8705)
