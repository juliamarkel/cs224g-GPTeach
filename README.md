# cs224g-GPTeach
# cs224g-GPTeach
# Teacher Training Tool App

## Development

1. `npm install`
2. `npm start`
3. Go to <http://localhost:3000>

## Configuring GPTeach

GPTeach should be configured in `src/config/constants.js`.

Configuration files specifying students, scenarios, and learning goals should be placed in `src/config`, following the format used in the sample configs. The application will read from the filenames specified in `src/config/constants.js`.
Voice options: <https://platform.openai.com/docs/guides/text-to-speech>

---

## Collected Data

Usage data for each scenario is recorded in the following hierarchy (in Firebase):

```text
<top level collection name> (string specified in constants.js)
    <ID of usage> (document)
        messages (collection of objects)
        GPTeachConfiguration (field, object)
            GPTversion (number)
            file_learningGoals (string)
            file_scenario (string)
            file_students (string)
            prompt_responseInstructions (string)
            prompt_setScene (string)
        date (field, string)
        scenario (field, object)
        students (field, array of objects)
        learningGoals (field, array of strings)
        userData (field, object)
            userAgent (user agent string)
            browserLanguage (language code string)
            path (URL path)
```

---

## Downloading Data

_Note that the `data_download` folder contains the Firebase API key, which definitely shouldn't ever be made public._

1. Install dependencies:
  `firebase-admin`
2. `python main.py`

You can save the output to a file: `python main.py > output.txt`.
Runtime should be less than 30 seconds.
