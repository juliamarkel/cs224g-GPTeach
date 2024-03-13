# cs224g-GPTeach

## Running it yourself
1. git clone
2. fill in .env vars (API keys for firebase and openAI)
3. follow development instructions

## Development

1. `npm install`
2. `npm start`
3. Go to <http://localhost:3000>

## Configuring GPTeach

GPTeach should be configured in `src/config/constants.js`.

Configuration files specifying students, scenarios, and learning goals should be placed in `src/config`, following the format used in the sample configs. The application will read from the filenames specified in `src/config/constants.js`.
Voice options: <https://platform.openai.com/docs/guides/text-to-speech>

