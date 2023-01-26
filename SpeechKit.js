export default class SpeechKit extends EventTarget {

  /**
   * Creates a new instance of SpeechKit.
   * @param {object} - JSON object representing options
   * continuous listening, interim results, start callback, results callback, error callback
   * and speech end callback
   * @returns {SpeechKit}
  */

  constructor ({continuous = false, interimResults = true, pitch = 1.0, rate = 1.0}) {
    super()
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    let SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.webkitspeechSynthesisUtterance
    let language = window.navigator.userLanguage || window.navigator.language
    this.resultList = {}
    this.recognition = new SpeechRecognition()
    this.recognition.lang = language
    this.grammarList = new SpeechGrammarList()
    this.synth = window.speechSynthesis || window.webkitspeechSynthesis
    this.recognition.continuous = continuous
    this.recognition.interimResults = interimResults
    this.utterance = new SpeechSynthesisUtterance()
    this.pitch = pitch
    this.rate = rate
    this.SSMLTagIndicies = new Map()
   }

   setListeners () {
     const that = this
     try {
       this.recognition.addEventListener('soundend ', function(event) {
         const evt = new CustomEvent('speechkitsoundend', { detail: {
           event: event
         }})
         that.dispatchEvent(evt)
       })

       this.recognition.addEventListener('speechend', function(event) {
         const evt = new CustomEvent('speechkitspeechend', { detail: {
           event: event
         }})
         that.dispatchEvent(evt)
       })

       this.recognition.addEventListener('start', function() {
         const event = new Event('speechkitstart')
         that.dispatchEvent(event)
       })

       this.recognition.addEventListener('result', function(event) {
         if(event.results[0].isFinal) {
           this.resultList = event.results
           const evt = new CustomEvent('speechkitresult', { detail: { results: this.resultList }})
           that.dispatchEvent(evt)
         }
       })


       this.recognition.addEventLisenter('error', function(event) {
         const evt = new CustomEvent('speechkiterror', {
           detail: {
             event: event
            }
          })
         that.dispatchEvent(evt)
       })

       this.recognition.addEventLisenter('speechend', function() {
         const event = new Event('speechkitend')
         that.dispatchEvent(event)
        })

       if(that.synth.onvoiceschanged !== undefined) {
          // Chrome gets the voices asynchronously so this is needed
        that.synth.addEventListener('voiceschanged', function () {
            const v = this.getVoices()
            const event = new CustomEvent('speechkitvoiceschanged', {
              detail: {
                voices: v
                }
            })
            that.dispatchEvent(event)
          })
        }

        this.utterance.addEventLisenter('start', function (event) {
          const evt = new CustomEvent('speechkitutterancestart', {
            bubbles: true,
            detail: {
              event:event
            }
          })
          that.dispatchEvent(evt)
       })

        this.utterance.addEventListener('end', function () {
          const evt = new CustomEvent('speechkitutteranceend', {
              detail: {
                event:event
              }
            })
            that.dispatchEvent(evt)
         })

        this.utterance.addEventListener('pause', function (event) {
         const evt = new CustomEvent('speechkitutterancepaused', {
           detail: {
             event:event
           }
         })
         that.dispatchEvent(evt)
        })

        this.utterance.addEventListener('start', function (event) {
          const evt = new CustomEvent('speechkitutterancestarted', {
            bubbles: true,
            detail: {
              event:event
              }
            })
            that.dispatchEvent(evt)
          })

        this.utterance.addEventListener('resume', function (event) {
          const evt = new CustomEvent('speechkitutteranceresumed', {
            detail: {
              event:event
            }
          })
          that.dispatchEvent(evt)
        })

        this.utterance.addEventListener('mark', function(event) {
          const evt = new CustomEvent('speechkitutterancemarked', {
            detail: {
              event:event
            }
          })
          that.dispatchEvent(evt)
        })

        this.utterance.addEventListener('boundary', function (event) {
          const evt = new CustomEvent('speechkitutteranceboundary', {
            detail: {
              event:event
            }
          })
            that.dispatchEvent(evt)
          })
        } catch (e){
          const evt = new CustomEvent('speechkitlistenererror', {
            detail: {
              error: e
            }
          })
          that.dispatchEvent(evt)
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

  pauseSynth () {
    this.synth.pause()
  }

  stopSynth () {
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
        this.utterance.text = text
    } catch (e) {
      alert(e.message)
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
        const type = "text/plain"
        const blob = new Blob([text], { type })
        const data = [new ClipboardItem({ [type]: blob })]
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
    const parser = new DOMParser()
    const xmlString = `<?xml version="1.0"?><speak
       xml:lang="${navigator.language}"> ${this.parseSentenceSSML(text)} </speak>`
       return xmlString
  }
  /**
   * Takes text and returns SSML encoded XML object
   * @params {string} - Text to convert
   * @returns {string} - XML DOM object in SSML format serialized to a string
  */

  createSSML (text) {
    const parser = new DOMParser()
    try {
      const parsed = this.parseSSML(text)
      console.log('XML STRING::::', parsed)
      return new XMLSerializer().serializeToString(parsed)
    } catch (e) {
      console.log(e.message)
      return new XMLSerializer().serializeToString(text)
    }
  }

  /**
   * Takes sentence and returns SSML paragraph object with sentences.
   * @params {string} xmlString - Text to convert
   * @returns {string} xmlString - XML DOM object in SSML format
  */

  parseSentenceSSML (text) {
    let xmlString = ""
    const segmenter = new Intl.Segmenter(navigator.language, { granularity: 'sentence' })
    const iterator1 = segmenter.segment(text)[Symbol.iterator]()
    ([...segmenter.segment(text)]).forEach((seg, index) => {
        xmlString += `\n <s id="sentence-${index}"> ${seg.segment} </s>`
    })
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
      const errorNode = xmlDoc.querySelector('parsererror')
      const errorNode2 = xmlDoc.querySelector('speak')
      const errorNode3 = xmlDoc.querySelector('break')
      if (errorNode) {
        console.log('1')
        const template = this.xmlTemplate(xmlString)
        console.log('Template:::', template)
        const ssml = parser.parseFromString(template, "application/xml")
        console.log('SSML:::', ssml)
        return ssml
      } else if (errorNode3) {
        console.log('3')
        return xmlDoc
      } else if (!errorNode2){
        console.log('2')
        return this.createSSML(xmlString)
      } else {
        return xmlString
      }
    } catch (e) {
      console.log(e)
    }
  }

  addBreakSSML (xmlString, sntc, offset, time = 200) {
    const segmenter = new Intl.Segmenter(navigator.language, { granularity: 'sentence' })
    const xmlDoc = this.parseSSML(xmlString)
    const segments = segmenter.segment(xmlString)
    const segs = Array.from(segments, (seg, index) => {
      if(seg.segment == sntc) {
        this.addSSMLElement(index, {
          elName: 'break',
          attributes: [{
            name: 'time',
            value: '500ms'
          }]
        })
        const idx = `#sentence-${index}`
        let sp1 = document.createElement("break")
        sp1.setAttribute('time', `${encodeURIComponent(time+"ms")}`)
        let sp2 = xmlDoc.querySelector(idx)
        sp2.insertBefore(sp1, sp2.childNodes[0].nextSibling)
      }
    })
    return new XMLSerializer().serializeToString(xmlDoc)
  }

  addEmphasisSSML (xmlString, sntc, offset, time = 200) {
    const segmenter = new Intl.Segmenter(navigator.language, { granularity: 'sentence' })
    const xmlDoc = this.parseSSML(xmlString)
    const segments = segmenter.segment(xmlString)
    const segs = Array.from(segments, (seg, index) => {
      if(seg.segment == sntc) {
        const idx = `#sentence-${index}`
        let sp1 = document.createElement("emphasis")
        sp1.setAttribute('level', 'strong')
        const txt = document.createTextNode(seg.segment)
        sp1.appendChild(txt)
        let sp2 = xmlDoc.querySelector(idx)
        try {
          sp2.removeChild(sp2.textNode)
          sp2.addChild(sp1)
        } catch {
          sp2.replaceChild(sp1, sp2.firstChild)
        }
        this.addSSMLElement(index, {
          elName: 'emphasis',
          attributes: [{
            name: 'level',
            value: 'moderate'
            }]
          })
        return xmlDoc
      }
    })
    return new XMLSerializer().serializeToString(xmlDoc)
  }

  addSSMLElement (index, options) {
    try {
      console.log(index)
      if(this.SSMLTagIndicies.has(index)){
        console.log('GET', this.SSMLTagIndicies.entries())
        const entries = this.SSMLTagIndicies.get(index)
        console.log(entries)
        this.SSMLTagIndicies.set(index, [entries].push(options))
        console.log(entries)
      } else {
        this.SSMLTagIndicies.set(index, [options])
        console.log('GET Else', options)

      }
    } catch(e) {
      console.log(e)
    }

  }
}
