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
<dt><a href="#getText">getText()</a> ⇒ <code>string</code></dt>
<dd><p>Return text</p>
</dd>
<dt><a href="#getTextAsFile">getTextAsFile()</a> ⇒ <code>Blob</code></dt>
<dd><p>Return text file with results.</p>
</dd>
<dt><a href="#getTextAsJson">getTextAsJson()</a> ⇒ <code>object</code></dt>
<dd><p>Return text as JSON.</p>
</dd>
<dt><a href="#addGrammarFromUri">addGrammarFromUri()</a></dt>
<dd><p>Add grammar to the SpeechGrammarList from a URI.</p>
</dd>
<dt><a href="#addGrammarFromString">addGrammarFromString()</a></dt>
<dd><p>Add grammar to the SpeechGrammarList from a Grammar String.</p>
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
<dt><a href="#share">share()</a> ⇒ <code>null</code></dt>
<dd><p>Share the text using the Web Share API or copy to Clipboard if not available</p>
</dd>
<dt><a href="#createSSML">createSSML()</a> ⇒ <code>object</code></dt>
<dd><p>Takes text and returns SSML encoded XML object</p>
</dd>
</dl>

<a name="listen"></a>

## listen()
Start listening for speech recognition.

**Kind**: global function  
<a name="stopListen"></a>

## stopListen()
Stop listening for speech recognition.

**Kind**: global function  
<a name="speak"></a>

## speak(text)
Use Speech Synthesis to speak text.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Text to be spoken |

<a name="getResultList"></a>

## getResultList() ⇒ <code>SpeechRecognitionResultList</code>
Get current SpeechRecognition resultsList.

**Kind**: global function  
**Returns**: <code>SpeechRecognitionResultList</code> - - List of Speech Recognition results  
<a name="getText"></a>

## getText() ⇒ <code>string</code>
Return text

**Kind**: global function  
**Returns**: <code>string</code> - resultList as text string  
<a name="getTextAsFile"></a>

## getTextAsFile() ⇒ <code>Blob</code>
Return text file with results.

**Kind**: global function  
**Returns**: <code>Blob</code> - transcript  
<a name="getTextAsJson"></a>

## getTextAsJson() ⇒ <code>object</code>
Return text as JSON.

**Kind**: global function  
**Returns**: <code>object</code> - transcript  
<a name="addGrammarFromUri"></a>

## addGrammarFromUri()
Add grammar to the SpeechGrammarList from a URI.

**Kind**: global function  
**Params**: <code>string</code> uri - URI that contains grammar  
<a name="addGrammarFromString"></a>

## addGrammarFromString()
Add grammar to the SpeechGrammarList from a Grammar String.

**Kind**: global function  
**Params**: <code>string</code> grammar - String containing grammar  
<a name="getGrammarList"></a>

## getGrammarList() ⇒ <code>SpeechGrammarList</code>
Return current SpeechGrammarList.

**Kind**: global function  
**Returns**: <code>SpeechGrammarList</code> - current SpeechGrammarList object  
<a name="getRecognition"></a>

## getRecognition() ⇒ <code>SpeechRecognition</code>
Return the urrent SpeechRecognition object.

**Kind**: global function  
**Returns**: <code>SpeechRecognition</code> - current SpeechRecognition object  
<a name="getSynth"></a>

## getSynth() ⇒ <code>SpeechSynthesis</code>
Return the current Speech Synthesis object.

**Kind**: global function  
**Returns**: <code>SpeechSynthesis</code> - current instance of Speech Synthesis object  
<a name="getVoices"></a>

## getVoices() ⇒ <code>Array.&lt;SpeechSynthesisVoice&gt;</code>
Return the current voices available to the user.

**Kind**: global function  
**Returns**: <code>Array.&lt;SpeechSynthesisVoice&gt;</code> - Array of available Speech Synthesis Voices  
<a name="setSpeechText"></a>

## setSpeechText()
Set the SpeechSynthesisUtterance object with the text that is meant to be spoken.

**Kind**: global function  
**Params**: <code>string</code> text - Text to be spoken  
<a name="setSpeechVoice"></a>

## setSpeechVoice()
Set the SpeechSynthesisVoice object with the desired voice.

**Kind**: global function  
**Params**: <code>SpeechSynthesisVoice</code> voice - Voice to be spoken  
<a name="getCurrentVoice"></a>

## getCurrentVoice() ⇒ <code>SpeechSynthesisVoice</code>
Return the current voice being used in the utterance.

**Kind**: global function  
**Returns**: <code>SpeechSynthesisVoice</code> - current voice  
<a name="share"></a>

## share() ⇒ <code>null</code>
Share the text using the Web Share API or copy to Clipboard if not available

**Kind**: global function  
<a name="createSSML"></a>

## createSSML() ⇒ <code>object</code>
Takes text and returns SSML encoded XML object

**Kind**: global function  
**Returns**: <code>object</code> - - XML DOM object in SSML format  
**Params**: <code>string</code> - Text to convert  
