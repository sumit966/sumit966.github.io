// ============================================================
// PROTOTYPES - Renders animated prototype for each project
// ============================================================

function renderPrototype(type) {
  switch (type) {
    case "dashboard-charts":
      return `
        <div class="prototype-box">
          <div class="prototype-label">📊 Live Dashboard</div>
          <div class="proto-dashboard">
            <div class="bar"></div><div class="bar"></div><div class="bar"></div>
            <div class="bar"></div><div class="bar"></div><div class="bar"></div>
          </div>
        </div>`;

    case "churn-funnel":
      return `
        <div class="prototype-box">
          <div class="prototype-label">🔻 Churn Funnel</div>
          <div class="proto-funnel">
            <div class="stage">All Customers 100%</div>
            <div class="stage">Active 78%</div>
            <div class="stage">At Risk 55%</div>
            <div class="stage">Churned 32%</div>
          </div>
        </div>`;

    case "chat-window":
      return `
        <div class="prototype-box">
          <div class="prototype-label">💬 AI Chat</div>
          <div class="proto-chat">
            <div class="msg user">Upload my PDF and answer questions</div>
            <div class="msg bot">PDF indexed ✓ Ask me anything</div>
            <div class="typing"><span></span><span></span><span></span></div>
          </div>
        </div>`;

    case "kanban-board":
      return `
        <div class="prototype-box">
          <div class="prototype-label">📋 Live Board</div>
          <div class="proto-kanban">
            <div class="column">
              <div class="col-title">To Do</div>
              <div class="card-anim"></div>
              <div class="card-anim"></div>
            </div>
            <div class="column">
              <div class="col-title">Doing</div>
              <div class="card-anim"></div>
            </div>
            <div class="column">
              <div class="col-title">Done</div>
              <div class="card-anim"></div>
              <div class="card-anim"></div>
            </div>
          </div>
        </div>`;

    case "redirect-flow":
      return `
        <div class="prototype-box">
          <div class="prototype-label">🔗 Terminal</div>
          <div class="proto-terminal">
            <div class="line">$ curl -X POST /shorten -d '{url: ...}'</div>
            <div class="line">> code: abc1234</div>
            <div class="line">$ curl /abc1234</div>
            <div class="line"><span class="arrow">→ 307 redirect</span> https://original-url.com</div>
          </div>
        </div>`;

    case "job-queue":
      return `
        <div class="prototype-box">
          <div class="prototype-label">⚙️ Job Pipeline</div>
          <div class="proto-queue">
            <div class="node"></div><div class="node"></div>
            <div class="node"></div><div class="node"></div>
          </div>
        </div>`;

    case "training-loss":
      return `
        <div class="prototype-box">
          <div class="prototype-label">📉 Training Loss</div>
          <div class="proto-loss">
            <svg viewBox="0 0 300 150" preserveAspectRatio="none">
              <path class="loss-line" d="M 10 20 Q 60 30, 100 60 T 180 90 T 250 110 L 290 115" />
            </svg>
          </div>
        </div>`;

    case "embedding-search":
      return `
        <div class="prototype-box">
          <div class="prototype-label">🔍 Vector Search</div>
          <div class="proto-embedding">
            <div class="dot center" style="top: 45%; left: 45%;"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>`;

    case "rag-pipeline":
      return `
        <div class="prototype-box">
          <div class="prototype-label">🧠 RAG Pipeline</div>
          <div class="proto-rag">
            <div class="stage-box">Docs</div>
            <div class="stage-box">Embed</div>
            <div class="stage-box">Search</div>
            <div class="stage-box">Answer</div>
          </div>
        </div>`;

    case "log-stream":
      return `
        <div class="prototype-box">
          <div class="prototype-label">🔍 Log Analyzer</div>
          <div class="proto-logs">
            <div class="log">[INFO] User login from 192.168.1.5</div>
            <div class="log">[INFO] API request /v1/data</div>
            <div class="log alert">[ALERT] Suspicious C&C activity</div>
          </div>
        </div>`;

    case "agent-flow":
      return `
        <div class="prototype-box">
          <div class="prototype-label">🤖 Multi-Agent Flow</div>
          <div class="proto-agents">
            <div class="agent">🧭</div>
            <div class="agent">🔎</div>
            <div class="agent">✍️</div>
            <div class="agent">✅</div>
          </div>
        </div>`;

    case "lora-layers":
      return `
        <div class="prototype-box">
          <div class="prototype-label">🎛️ LoRA Layers</div>
          <div class="proto-lora">
            <div class="layer frozen"></div>
            <div class="layer trainable"></div>
            <div class="layer frozen"></div>
            <div class="layer trainable"></div>
            <div class="layer frozen"></div>
            <div class="layer frozen"></div>
          </div>
        </div>`;

    case "bounding-box":
      return `
        <div class="prototype-box">
          <div class="prototype-label">📦 Object Detection</div>
          <div class="proto-bbox">
            <div class="box"></div>
          </div>
        </div>`;

    case "mri-scan":
      return `
        <div class="prototype-box">
          <div class="prototype-label">🧬 MRI Classifier</div>
          <div class="proto-mri">
            <div class="brain"><div class="tumor"></div></div>
          </div>
        </div>`;

    case "network-graph":
      return `
        <div class="prototype-box">
          <div class="prototype-label">🕸️ Botnet Graph</div>
          <div class="proto-network">
            <div class="node-dot cnc"></div>
            <div class="node-dot"></div>
            <div class="node-dot"></div>
            <div class="node-dot"></div>
            <div class="node-dot"></div>
            <div class="connection"></div>
            <div class="connection"></div>
          </div>
        </div>`;

    default:
      return `
        <div class="prototype-box">
          <div class="prototype-label">📦 Preview</div>
          <div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:2rem;color:var(--primary);">💻</div>
        </div>`;
  }
}

// Attach to window for role-page.js to use
window.renderPrototype = renderPrototype;

console.log("✅ Prototypes loaded (15 types)");
