export default class SpeechKit {

  /**
   * Creates a new instance of SpeechKit.
   * @param {object} - JSON object representing options
   * continuous listening, interim results, start callback, results callback, error callback
   * and speech end callback
   * @returns {SpeechKit}
  */

  constructor ({continuous = false, interimResults = true, pitch = 1.0, rate = 1.0}) {
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    let language = window.navigator.userLanguage || window.navigator.language
    this.resultList = {}
    this.recognition = new SpeechRecognition()
    this.recognition.lang = language
    this.grammarList = new SpeechGrammarList()
    this.synth = window.speechSynthesis
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.utterance = {}
    this.pitch = pitch
    this.rate = rate

   }
   setListeners () {
     this.recognition.onstart = function() {
       const event = new Event('onspeechkitstart');
       document.dispatchEvent(event)
     }
     this.recognition.onresult = function(event) {
       console.log(event)
       if(event.results[0].isFinal) {
         this.resultList = event.results
         const evt = new CustomEvent('onspeechkitresult', { detail: {
             transcript: this.resultList[0][0].transcript
           }
         });
         document.dispatchEvent(evt)
       }
     }
     this.recognition.onerror = function(event) {
       const evt = new CustomEvent('onspeechkiterror', { event: event });
       document.dispatchEvent(evt)
     }
     this.recognition.onspeechend = function() {
       const event = new Event('onspeechkitend');
       document.dispatchEvent(event)
      }
   }
   /**
    * Start listening for speech recognition.
   */

  listen () {
    this.setListeners()
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
    console.log(text)
    this.setSpeechText(text)

    this.synth.speak(this.utterance)
  }

  /**
   * Get current SpeechRecognition resultsList.
   * @returns {SpeechRecognitionResultList} - List of Speech Recognition results
  */

  getResultList () {
    return this.resultList
  }

  /**
   * Return text
   * @returns {string} resultList as text string
  */

    getText () {
      let text = ''
      for(let i = 0; i < this.resultList.length; ++i) {
        text += this.resultList[i][0].transcript + '\n'
      }
      return text
    }

  /**
   * Return text file with results.
   * @returns {Blob} transcript
  */

  getTextAsFile () {
    const text = this.getText()
    let transcript = new Blob([text], { type: "text/plain"})
    return transcript

  }

  /**
   * Return text as JSON.
   * @returns {object} transcript
  */

  getTextAsJson () {
    const text = this.getText()
    let transcript = JSON.stringify(text)
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
   * Add grammar to the SpeechGrammarList from a Grammar String.
   * @params {string} grammar - String containing grammar
  */

  addGrammarFromString(grammar) {
    this.grammarList.addFromString(grammar)
  }

  /**
    * Return current SpeechGrammarList.
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
   @params {string} text - Text to be spoken
  */

  setSpeechText (text) {
    try {
      this.utterance = new SpeechSynthesisUtterance(new XMLSerializer().serializeToString(this.parseSSML(text)))

    } catch (e) {
      this.utterance = new SpeechSynthesisUtterance(text)
    }
     this.utterance.pitch = this.pitch
     this.utterance.rate = this.rate
  }

  /**
   * Set the SpeechSynthesisVoice object with the desired voice.
   * @params {SpeechSynthesisVoice} voice - Voice to be spoken
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

  /**
   * Share the text using the Web Share API or copy to Clipboard if not available
   * @returns {null}
  */

  async share () {
    const text = this.getText()
    try {
      if (!navigator.canShare) {
        const type = "text/plain";
        const blob = new Blob([text], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        await navigator.clipboard.write(data)
        alert ('Text copied to clipboard')
      } else {
        navigator.share({
          text: text
        })
      }
    } catch (e) {
      alert('There was an error sharing!')
    }
  }

  /**
   * Takes text and returns SSML encoded XML object
   * @params {string} - Text to convert
   * @returns {string} - XML DOM object in SSML format serialized to a string
  */

  createSSML (text) {
    const xmlString = `<?xml version="1.0"?><speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.w3.org/2001/10/synthesis
       http://www.w3.org/TR/speech-synthesis11/synthesis.xsd"
       xml:lang="${navigator.language}"><prosody rate="slow"> ${this.parseSentenceSSML(text)} </prosody></speak>`
    const xmlDoc = this.parseSSML(xmlString)
    return new XMLSerializer().serializeToString(xmlDoc)

  }

  /**
   * Takes sentence and returns SSML paragraph object with sentences.
   * @params {string} xmlString - Text to convert
   * @returns {string} xmlString - XML DOM object in SSML format
  */

  parseSentenceSSML (text) {
    const segmenterFr = new Intl.Segmenter(navigator.language, { granularity: 'sentence' });
    const string1 = text;

    const iterator1 = segmenterFr.segment(string1)[Symbol.iterator]();
    let xmlString = "<p>";
    ([...segmenterFr.segment(text)]).forEach(seg => {
      console.log(seg)
      xmlString += `<s> ${seg.segment} </s>`
    })
    xmlString += `</p>`
    return xmlString

  }

  /**
   * Takes text and returns SSML object
   * @params {string} xmlString - Text to convert
   * @returns {object | string} xmlDoc - XML DOM object in SSML format or XML object serialized to string
  */

  parseSSML (xmlString) {
    try {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlString, "text/xml")

      const errorNode = xmlDoc.querySelector('parsererror');

      if (errorNode) {
        // parsing failed
        return xmlString
      } else {
        // parsing succeeded
        return xmlDoc
      }
    } catch (e) {
      alert(e.message)
    }
  }
}
