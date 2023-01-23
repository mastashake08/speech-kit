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
    this.synth = window.speechSynthesis || window.webkitspeechSynthesis
    this.recognition.continuous = continuous;
    this.recognition.interimResults = interimResults;
    this.utterance = {}
    this.pitch = pitch
    this.rate = rate

   }
   setListeners () {
     this.recognition.onsoundend = function(event) {
       const evt = new CustomEvent('onspeechkitsoundend', { detail: {
         event: event
       }});
       document.dispatchEvent(evt)
     }

     this.recognition.onspeechend = function(event) {
       const evt = new CustomEvent('onspeechkitspeechend', { detail: {
         event: event
       }});
       document.dispatchEvent(evt)
     }

     this.recognition.onstart = function() {
       const event = new Event('onspeechkitstart');
       document.dispatchEvent(event)
     }
     this.recognition.onresult = function(event) {
       if(event.results[0].isFinal) {
         this.resultList = event.results
         const evt = new CustomEvent('onspeechkitresult', { detail: {
             results: this.resultList
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

      this.synth.addEventListener('voiceschanged', () => {
        const v = this.getVoices()
        const event = new CustomEvent('onspeechkitvoiceschanged', { detail: {
            voices: v
            }
        })
        document.dispatchEvent(event)
      })
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
   * @param {SpeechSynthesisVoice} [voice] - Optional parameter to change the voice that speaks
  */

  speak (text, voice = null) {
    this.setSpeechText(text)
    if(voice != null) {
      this.setSpeechVoice(voice)
    }
    this.synth.speak(this.utterance)
  }

  shutup () {
    this.synth.cancel()
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
    const voices = this.synth.getVoices()
    return voices
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

  xmlTemplate (text) {
    const xmlString = `<?xml version="1.0"?><speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.w3.org/2001/10/synthesis
       http://www.w3.org/TR/speech-synthesis11/synthesis.xsd"
       xml:lang="${navigator.language}"><prosody rate="slow"> ${this.parseSentenceSSML(text)} </prosody></speak>`
       return xmlString
  }
  /**
   * Takes text and returns SSML encoded XML object
   * @params {string} - Text to convert
   * @returns {string} - XML DOM object in SSML format serialized to a string
  */

  createSSML (text) {
    const xmlString = this.xmlTemplate(text)
    const xmlDoc = this.parseSSML(xmlString)
    return new XMLSerializer().serializeToString(xmlDoc)

  }

  /**
   * Takes sentence and returns SSML paragraph object with sentences.
   * @params {string} xmlString - Text to convert
   * @returns {string} xmlString - XML DOM object in SSML format
  */

  parseSentenceSSML (text) {
    const segmenter = new Intl.Segmenter(navigator.language, { granularity: 'sentence' });
    const string1 = text;

    const iterator1 = segmenter.segment(string1)[Symbol.iterator]();
    let xmlString = "<p>";
    ([...segmenter.segment(text)]).forEach((seg, index) => {
      xmlString += `<s id="sentence-${index}"> ${seg.segment} </s>`
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
      const xmlDoc = parser.parseFromString(xmlString, "application/xml")
      const errorNode = xmlDoc.querySelector('parsererror');
      const errorNode2 = xmlDoc.querySelector('speak')
      const errorNode3 = xmlDoc.querySelector('break')



      if (errorNode) {
        // parsing failed
        const template = this.xmlTemplate(xmlString)
        const ssml = parser.parseFromString(template, "application/xml")
        return ssml

      } else if (errorNode3 !== null) {
        return xmlDoc
      } else if (errorNode2 === null){
        return this.createSSML(xmlString)
      }
        // parsing succeeded
        return xmlDoc
    } catch (e) {
      alert(e.message)
    }
  }

  addBreakSSML (xmlString, sntc, offset, time = 200) {
    const segmenter = new Intl.Segmenter(navigator.language, { granularity: 'sentence' });


    const xmlDoc = this.parseSSML(xmlString)
    const segments = segmenter.segment(xmlString)
    const segs = Array.from(segments, (seg, index) => {
      if(seg.segment == sntc) {
        const idx = `#sentence-${index}`

        const sentence = xmlDoc.querySelector(idx)
        let parser = new DOMParser();
        const newBreak = `<break time="${time}ms"/> ${sentence} `
        let newNode = parser.parseFromString(newBreak, "application/xml");

        let sp1 = document.createElement("break");
        sp1.setAttribute('time', `${encodeURIComponent(time+"ms")}`)

        // Get the reference element
        let sp2 = xmlDoc.querySelector(idx);
        // Get the parent element
        let parentDiv = sp2.parentNode;
        console.log(sp2.childNodes[0])
        // Insert the new element into before sp2
        sp2.insertBefore(sp1, sp2.childNodes[0].nextSibling);

      }
    })
    return new XMLSerializer().serializeToString(xmlDoc)
  }
}
