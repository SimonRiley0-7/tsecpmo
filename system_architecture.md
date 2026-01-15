# Project AETHER System Architecture

You can view this diagram by pasting the code below into the [Mermaid Live Editor](https://mermaid.live/).

```mermaid
graph TD
    %% Styling
    classDef user fill:#f9f,stroke:#333,stroke-width:2px;
    classDef frontend fill:#d4e1f5,stroke:#333,stroke-width:2px;
    classDef server fill:#e1f5d4,stroke:#333,stroke-width:2px;
    classDef ai fill:#ffe6cc,stroke:#333,stroke-width:2px;
    classDef storage fill:#f2f2f2,stroke:#333,stroke-width:2px;

    %% Nodes
    User([👤 User]) -->|Uploads PDF / MD| Frontend[💻 Frontend (Pixel Court)]
    
    subgraph "Phase 1: Ingestion"
        Frontend -->|1. Check File Type| FileCheck{Is PDF?}
        FileCheck -- Yes --> Multimodal[🐍 Multimodal Server (Python)]
        Multimodal -->|2. Extract Text & Images| PyMuPDF[PyMuPDF / OCR]
        PyMuPDF -->|3. Vision Analysis| Llama[👁️ Llama-3.2 Vision]
        Llama -->|4. Return Markdown| Frontend
        FileCheck -- No --> Backend
        Frontend -->|5. Send Context| Backend[🚀 Backend (Node.js)]
    end

    subgraph "Phase 2: Analysis (The AETHER Engine)"
        Backend -->|6. Breakdown| FactorAgent[🤖 Factor Agent]
        FactorAgent -->|7. List of Claims| FactorQueue[(Factor Queue)]
        
        FactorQueue -->|Start Loop| SupportAgent[🛡️ Support Agent]
        SupportAgent -->|8. Argument| OpposeAgent[⚔️ Oppose Agent]
        OpposeAgent -->|9. Counter-Argument| DebateContext[(Debate Context)]
        
        SupportAgent & OpposeAgent -->|10. Text-to-Speech| TTS[🗣️ Kokoro TTS / Mock]
    end

    subgraph "Phase 3: Visualization & Verdict"
        Backend -->|11. Real-Time Socket Stream| Frontend
        Frontend -->|12. Animate Courtroom| UI[📺 Courtroom UI]
        
        DebateContext -->|13. Final Analysis| SynthesisAgent[⚖️ Synthesis Agent (Gemini)]
        SynthesisAgent -->|14. Final Verdict| Report[📄 Final Report PDF]
        
        Report -->|15. Download| User
    end

    %% Class Assignments
    class User user;
    class Frontend,UI frontend;
    class Backend,Multimodal,TTS server;
    class Llama,FactorAgent,SupportAgent,OpposeAgent,SynthesisAgent ai;
    class FactorQueue,DebateContext,FileCheck storage;
```
