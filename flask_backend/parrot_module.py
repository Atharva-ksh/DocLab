from parrot import Parrot

# Initialize the Parrot model once when the module is loaded
parrot = Parrot(model_tag="prithivida/parrot_paraphraser_on_T5")

def paraphrase_phrase(phrase, use_gpu=False):
    """
    Uses the preloaded Parrot model to generate paraphrases for a given phrase.
    
    :param phrase: String containing the text to paraphrase.
    :param use_gpu: Boolean flag to indicate whether to use GPU for paraphrasing.
    :return: List of paraphrased versions of the input phrase.
    """
    # Calling the augment method from Parrot to get paraphrases
    paraphrases = parrot.augment(input_phrase=phrase, use_gpu=use_gpu)
    print("Paraphrases: ",paraphrases)
    # Extracting only the text from the paraphrases output
    paraphrased_texts = [para[0] for para in paraphrases]
    return paraphrased_texts[0]