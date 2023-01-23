rm README.md
rm docs/FUNCTIONS.md
jsdoc2md SpeechKit.js >> docs/FUNCTIONS.md
cat docs/README.md docs/FUNCTIONS.md docs/CONTRIBUTE.md >> README.md
