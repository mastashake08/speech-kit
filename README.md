# Speech Kit
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/mastashake08/speech-kit/graphs/commit-activity)
[![Website jyroneparker.com](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://jyroneparker.com/)
[![Patreon](https://badgen.net/badge/icon/patreon?icon=patreon&label)](https://https://patron.com/mastashake08)
[![Twitter](https://badgen.net/badge/icon/twitter?icon=twitter&label)](https://twitter.com/jyroneparker)
[![CodeLife Discord online members](https://badgen.net/discord/online-members/j3ATUEW)](https://discord.gg/j3ATUEW)

Simplifying the Speech Synthesis and Speech Recognition engines for Javascript. Listen for commands and perform callback actions, make the browser speak and transcribe your speech!

# Features
- Speak Commands
- Listen for voice commands
- Add your own grammar
- Transcribe words and output as file.

```
npm install @mastashake08/speech-kit
```

### Import
```
import SpeechKit from '@mastashake08/speech-kit'
```

### Instantiate A New Instance
```
new SpeechKit(options)
```
## Events
<dl>
<dt>speechkitstart</dt>
<dd>Emits when speech recognition starts
</dd>
<dt>speechkitend</dt>
<dd>Emits when speech recognition ends
</dd>
<dt>speechkitresult</dt>
<dd>Emits when speech recognition result comes in
</dd>
<dt>speechkiterror</dt>
<dd>Emits when speech recognition error occurs
</dd>
</dl>

## Functions

<dl>
<dt><a href="#listen">listen()</a></dt>
<dd><p>Start listening for speech recognition.</p>
</dd>
<dt><a href="#stopListen">stopListen()</a></dt>
<dd><p>Stop listening for speech recognition.</p>
</dd>
<dt><a href="#speak">speak(text)</a></dt>
<dd><p>Use Speech Synthesis to speak text.</p>
</dd>
<dt><a href="#getResultList">getResultList()</a> ⇒ <code>SpeechRecognitionResultList</code></dt>
<dd><p>Get current SpeechRecognition resultsList.</p>
</dd>
<dt><a href="#getText">getText()</a> ⇒ <code>Blob</code></dt>
<dd><p>Return text file with results.</p>
</dd>
<dt><a href="#addGrammarFromUri">addGrammarFromUri()</a></dt>
<dd><p>Add grammar to the SpeechGrammarList from a URI.</p>
</dd>
<dt><a href="#addGrammarFromString">addGrammarFromString()</a></dt>
<dd><p>Add grammar to the SpeechGrammarList from a URI.</p>
</dd>
<dt><a href="#getGrammarList">getGrammarList()</a> ⇒ <code>SpeechGrammarList</code></dt>
<dd><p>Return current SpeechGrammarList.</p>
</dd>
<dt><a href="#getRecognition">getRecognition()</a> ⇒ <code>SpeechRecognition</code></dt>
<dd><p>Return the urrent SpeechRecognition object.</p>
</dd>
<dt><a href="#getSynth">getSynth()</a> ⇒ <code>SpeechSynthesis</code></dt>
<dd><p>Return the current Speech Synthesis object.</p>
</dd>
<dt><a href="#getVoices">getVoices()</a> ⇒ <code>Array.&lt;SpeechSynthesisVoice&gt;</code></dt>
<dd><p>Return the current voices available to the user.</p>
</dd>
<dt><a href="#setSpeechText">setSpeechText()</a></dt>
<dd><p>Set the SpeechSynthesisUtterance object with the text that is meant to be spoken.</p>
</dd>
<dt><a href="#setSpeechVoice">setSpeechVoice()</a></dt>
<dd><p>Set the SpeechSynthesisVoice object with the desired voice.</p>
</dd>
<dt><a href="#getCurrentVoice">getCurrentVoice()</a> ⇒ <code>SpeechSynthesisVoice</code></dt>
<dd><p>Return the current voice being used in the utterance.</p>
</dd>
</dl>

<a name="listen"></a>

## listen()
Start listening for speech recognition.

**Kind**: public function  
<a name="stopListen"></a>

## stopListen()
Stop listening for speech recognition.

**Kind**: public function  
<a name="speak"></a>

## speak(text)
Use Speech Synthesis to speak text.

**Kind**: public function  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Text to be spoken |

<a name="getResultList"></a>

## getResultList() ⇒ <code>SpeechRecognitionResultList</code>
Get current SpeechRecognition resultsList.

**Kind**: public function  
**Returns**: <code>SpeechRecognitionResultList</code> - - List of Speech Recognition results  
<a name="getText"></a>

## getText() ⇒ <code>Blob</code>
Return text file with results.

**Kind**: public function  
**Returns**: <code>Blob</code> - transcript  
<a name="addGrammarFromUri"></a>

## addGrammarFromUri()
Add grammar to the SpeechGrammarList from a URI.

**Kind**: public function  
**Params**: <code>string</code> uri - URI that contains grammar  
<a name="addGrammarFromString"></a>

## addGrammarFromString()
Add grammar to the SpeechGrammarList from a URI.

**Kind**: public function  
**Params**: <code>string</code> grammar - String containing grammar  
<a name="getGrammarList"></a>

## getGrammarList() ⇒ <code>SpeechGrammarList</code>
Return current SpeechGrammarList.

**Kind**: public function  
**Returns**: <code>SpeechGrammarList</code> - current SpeechGrammarList object  
<a name="getRecognition"></a>

## getRecognition() ⇒ <code>SpeechRecognition</code>
Return the urrent SpeechRecognition object.

**Kind**: public function  
**Returns**: <code>SpeechRecognition</code> - current SpeechRecognition object  
<a name="getSynth"></a>

## getSynth() ⇒ <code>SpeechSynthesis</code>
Return the current Speech Synthesis object.

**Kind**: public function  
**Returns**: <code>SpeechSynthesis</code> - current instance of Speech Synthesis object  
<a name="getVoices"></a>

## getVoices() ⇒ <code>Array.&lt;SpeechSynthesisVoice&gt;</code>
Return the current voices available to the user.

**Kind**: public function  
**Returns**: <code>Array.&lt;SpeechSynthesisVoice&gt;</code> - Array of available Speech Synthesis Voices  
<a name="setSpeechText"></a>

## setSpeechText()
Set the SpeechSynthesisUtterance object with the text that is meant to be spoken.

**Kind**: public function  
<a name="setSpeechVoice"></a>

## setSpeechVoice()
Set the SpeechSynthesisVoice object with the desired voice.

**Kind**: public function  
**Params**: <code>SpeechSynthesisVoice</code> voice  
<a name="getCurrentVoice"></a>

## getCurrentVoice() ⇒ <code>SpeechSynthesisVoice</code>
Return the current voice being used in the utterance.

**Kind**: public function  
**Returns**: <code>SpeechSynthesisVoice</code> - current voice

# Contributing
If you want to add functionality or fix a bug please provide a PR!

# Sponsorships
This project is free for public use and will always be in perpetuity. That being said a brotha got bills to pay and ish! If you would like to sponsor this and all of my open source projects, then please consider becoming a patron on [Patreon](https://patreon.com/mastashake08) or a one time donation via [Cash App](https://cash.me/$mastashake08)
