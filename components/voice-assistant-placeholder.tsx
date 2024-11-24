export function VoiceAssistantPlaceholder() {
    return (
      <div className="w-full min-h-[600px] bg-white rounded-lg shadow-lg flex items-center justify-center relative">
        <iframe 
          id="audio_iframe" 
          src="https://widget.synthflow.ai/widget/v2/1732277287108x207232769110917920/1732277287006x807907541096353700"
          allow="microphone"
          width="400"
          height="600"
          className="border-none bg-transparent"
          style={{
            position: 'relative',
            zIndex: 10,
            margin: '0 auto'
          }}
        />
      </div>
    )
  }
  
  