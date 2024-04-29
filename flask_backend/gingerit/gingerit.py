# -*- coding: utf-8 -*-
import requests
import cloudscraper

URL = "https://services.gingersoftware.com/Ginger/correct/jsonSecured/GingerTheTextFull"  # noqa
API_KEY = "6ae0c3a0-afdc-4532-a810-82ded0054236"


class GingerIt(object):
    def __init__(self):
        self.url = URL
        self.api_key = API_KEY
        self.api_version = "2.0"
        self.lang = "US"

    def parse(self, text, verify=True):
        session = cloudscraper.create_scraper()
        try:
            request = session.get(
                self.url,
                params={
                    "lang": self.lang,
                    "apiKey": self.api_key,
                    "clientVersion": self.api_version,
                    "text": text,
                },
                verify=verify,
            )
            request.raise_for_status()  # Raises an HTTPError for bad responses
            data = request.json()
            return self._process_data(text, data)
        except requests.exceptions.HTTPError as err:
            print(f"HTTP error occurred: {err}")  # Handle HTTP errors
        except requests.exceptions.RequestException as err:
            print(f"Error during requests to Ginger API: {err}")  # Handle other possible errors
        except ValueError as err:
            print(f"Invalid JSON error: {err}")
        return text  # Return original text if an error occurs

    @staticmethod
    def _change_char(original_text, from_position, to_position, change_with):
        return "{}{}{}".format(
            original_text[:from_position], change_with, original_text[to_position + 1 :]
        )

    def _process_data(self, text, data):
        result = text
        corrections = []

        for suggestion in reversed(data["Corrections"]):
            start = suggestion["From"]
            end = suggestion["To"]

            if suggestion["Suggestions"]:
                suggest = suggestion["Suggestions"][0]
                result = self._change_char(result, start, end, suggest["Text"])

                corrections.append(
                    {
                        "start": start,
                        "text": text[start : end + 1],
                        "correct": suggest.get("Text", None),
                        "definition": suggest.get("Definition", None),
                    }
                )

        return {"text": text, "result": result, "corrections": corrections}
