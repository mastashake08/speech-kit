export default class SpeechKit {

  /**
   * Creates a new instance of SpeechKit.
   * @param {object} - JSON object representing options
   * continuous listening, interim results, start callback, results callback, error callback
   * and speech end callback
   * @returns {SpeechKit}
  */

  constructor ({continuous = false, interimResults = true}) {
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    let language = window.navigator.userLanguage || window.navigator.language
    this.resultList = []
    this.recognition = new SpeechRecognition()
    this.recognition.lang = language
    this.grammarList = new SpeechGrammarList()
    this.synth = window.speechSynthesis
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.utterance = {}
    this.recognition.onstart = function() {
      const event = new CustomEvent('speechkitstart', { event: event });
      this.dispatch(event)
    }
    this.recognition.onresult = function(event) {
      const evt = new CustomEvent('speechkitresult', { event: event });
      if(event.results[0].isFinal) {
        ctx.resultList.push(event.results)
      }
      this.dispatch(evt)
    }
    this.recognition.onerror = function(event) {
      const evt = new CustomEvent('speechkiterror', { event: event });
      this.dispatch(evt)
    }
    this.recognition.onspeechend = function() {
      const event = new Event('speechkitend');
      this.dispatch(event)
     }
   }

   /**
    * Start listening for speech recognition.
   */

  listen () {
    this.recognition.start()
  }

  /**
   * Stop listening for speech recognition.
  */

  stopListen () {
    this.recognition.stop()
  }

  /**
   * Use Speech Synthesis to speak text.
   * @param {string} text - Text to be spoken
  */

  speak (text) {
    this.setSpeechText (text)
    this.synth.speak(this.utterance)
  }

  /**
   * Use Speech Synthesis to speak text.
   * @returns {object}
  */

  getReturnList () {
    return this.resultList
  }

  /**
   * Return text file with results.
   * @returns {Blob} transcript
  */

  getText () {
    let text = ''
    for(let i = 0; i < this.resultList.length; ++i) {
      text += this.resultList[i][0].transcript + '\n'
    }
    let transcript = new Blob([text], { type: "text/plain"})
    return transcript

  }

  /**
   * Add grammar to the SpeechGrammarList from a URI.
   * @params {string} uri - URI that contains grammar
  */

  addGrammarFromUri (uri) {
    this.grammarList.addFromURI(uri)
  }

  /**
   * Add grammar to the SpeechGrammarList from a URI.
   * @params {string} grammar - String containing grammar
  */

  addGrammarFromString(grammar) {
    this.grammarList.addFromString(grammar)
  }

  /**
    * Return the urrent SpeechGrammarList object.
    * @returns {SpeechGrammarList} current SpeechGrammarList object
  */

  getGrammarList () {
    return this.grammarList
  }

  /**
    * Return the urrent SpeechRecognition object.
    * @returns {SpeechRecognition} current SpeechRecognition object
  */

  getRecognition () {
    return this.recognition
  }

  /**
    * Return the current Speech Synthesis object.
    * @returns {SpeechSynthesis} current instance of Speech Synthesis object
  */

  getSynth () {
    return this.synth
  }

  /**
    * Return the current voices available to the user.
    * @returns {SpeechSynthesisVoice[]} Array of available Speech Synthesis Voices
  */

  getVoices () {
    return this.synth.getVoices()
  }

  /**
   * Set the SpeechSynthesisUtterance object with the text that is meant to be spoken.
  */

  setSpeechText (text) {
    this.utterance = new SpeechSynthesisUtterance(text)
  }

  /**
   * Set the SpeechSynthesisVoice object with the desired voice.
   * @params {SpeechSynthesisVoice} voice
  */

  setSpeechVoice (voice) {
    this.utterance.voice = voice
  }

  /**
   * Return the current voice being used in the utterance.
   * @returns {SpeechSynthesisVoice} current voice
  */

  getCurrentVoice () {
    return this.utterance.voice
  }
}
