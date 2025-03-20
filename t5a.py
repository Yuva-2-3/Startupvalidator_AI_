from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import torch

# Load Pretrained T5 Model & Tokenizer
model_name = "t5-small"  # Can be changed to "t5-base" for better results
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

def validate_startup(idea, max_length=100):
    """
    Validates a startup idea using a Transformer model (T5).
    
    Args:
        idea (str): The startup idea to validate.
        max_length (int): Maximum length of the generated response.

    Returns:
        str: The AI-generated validation result.
    """
    # Improve prompt engineering for better output
    input_text = f"Analyze this startup idea and provide validation: {idea}. Is it feasible? What are the risks and benefits?"
    
    # Tokenization
    inputs = tokenizer(input_text, return_tensors="pt", padding=True, truncation=True)
    
    # Generate response using Transformer model
    outputs = model.generate(**inputs, max_length=max_length, num_return_sequences=1, temperature=0.7, top_p=0.9)
    
    # Decode and return the generated text
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# Example usage
startup_idea = "An AI-powered legal assistant that automates contract reviews for startups."
validation_result = validate_startup(startup_idea)
print("Startup Idea:", startup_idea)
print("Validation Result:", validation_result)
