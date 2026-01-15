# Project AETHER - Component Architecture

This diagram illustrates the high-level software components, microservices, and external API integrations of the system.

```mermaid
graph TB
    %% Styles
    classDef client fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef server fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    classDef ai fill:#fff3e0,stroke:#ef6c00,stroke-width:2px;
    classDef external fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;

    subgraph "Client Layer"
        Browser[User Browser]:::client
        Frontend[React SPA (Vite)]:::client
        Browser --> Frontend
    end

    subgraph "Server Layer"
        Orchestrator[Node.js Orchestrator<br/>(Express + Socket.IO)]:::server
        MultimodalSvc[Multimodal Service<br/>(Python FastAPI)]:::server
        
        %% Communication
        Frontend <-->|Socket.IO (Real-time Events)| Orchestrator
        Frontend -->|HTTP POST (PDF Analysis)| MultimodalSvc
    end

    subgraph "Agentic Logic Layer"
        FactorAgent[🤖 Factor Extraction Agent]:::ai
        SupportAgent[🛡️ Support Agent]:::ai
        OpposeAgent[⚔️ Oppose Agent]:::ai
        SynthesisAgent[⚖️ Synthesis Agent]:::ai

        Orchestrator --- FactorAgent
        Orchestrator --- SupportAgent
        Orchestrator --- OpposeAgent
        Orchestrator --- SynthesisAgent
    end

    subgraph "External Model Providers"
        OpenRouter[OpenRouter API<br/>(Logical Reasoning)]:::external
        Groq[Groq API<br/>(Llama-3.2 Vision)]:::external
        Gemini[Google Gemini API<br/>(Verdict Context)]:::external
        TTS[Kokoro TTS Engine<br/>(Audio Synthesis)]:::external
    end

    %% Dependencies
    MultimodalSvc -->|Vision Request| Groq
    FactorAgent & SupportAgent & OpposeAgent -->|LLM Inference| OpenRouter
    SynthesisAgent -->|Deep Analysis| Gemini
    Frontend -->|Fetch Audio| TTS

    %% Data Flow Notes
    linkStyle default stroke-width:2px,fill:none,stroke:#333;
```
