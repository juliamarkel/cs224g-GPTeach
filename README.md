# cs224g-GPTeach

## Running it yourself
1. git clone
2. fill in .env var (API key for openAI)
3. follow development instructions

## Development

1. `npm install`
2. `npm start`
3. Go to <http://localhost:3000>


### Notes on running GPTeach:
_there may be node versioning issues if this is the case, see below_
`nvm install 16.18.0`
`node use 16.18.0`



## Personalizing GPTeach 

GPTeach should be configured in `src/config/constants.js`.

Configuration files specifying students, scenarios, and learning goals should be placed in `src/config`, following the format used in the sample configs. The application will read from the filenames specified in `src/config/constants.js`.
Voice options: <https://platform.openai.com/docs/guides/text-to-speech>

