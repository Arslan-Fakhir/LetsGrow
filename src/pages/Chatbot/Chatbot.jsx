import { useState, useEffect, useRef, useContext } from "react"
import { MessageCircle, Send, Sparkles, Brain, Lightbulb, BookOpen, Moon, Sun } from "lucide-react"
import { ThemeContext } from "../../context/ThemeContext"
import "./Chatbot.css"

function Chatbot() {
  const themeContext = useContext(ThemeContext)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Enhanced suggestions with more attractive gradients
  const suggestions = [
    {
      title: "About Let's Grow",
      prompt: "What is Let's Grow and how can it help me?",
      icon: <Sparkles size={20} />,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    },
    {
      title: "Business Ideas",
      prompt: "Suggest innovative business ideas for 2024",
      icon: <Lightbulb size={20} />,
      gradient: "linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #ff8a80 100%)",
    },
    {
      title: "Science Concepts",
      prompt: "Explain complex science concepts simply",
      icon: <Brain size={20} />,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)",
    },
    {
      title: "Learning Topics",
      prompt: "What should I learn about photosynthesis?",
      icon: <BookOpen size={20} />,
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 50%, #667eea 100%)",
    },
  ]

  // Check localStorage on component mount
  useEffect(() => {
    if (typeof window === "undefined") return

    // Always show suggestions when page loads or refreshes
    setShowSuggestions(true)
    
    // Focus input on mount
    inputRef.current?.focus()

    // Clear any previous interaction flags
    localStorage.removeItem("chatbotHasInteracted")
    localStorage.removeItem("chatbotLastInteraction")
  }, [])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSuggestionClick = (prompt) => {
    setInput(prompt)
    inputRef.current?.focus()
    setShowSuggestions(false)
  }

  const simulateTyping = (text, callback) => {
    setIsTyping(true)
    let currentText = ""
    let index = 0

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        currentText += text[index]
        callback(currentText)
        index++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
      }
    }, 30)
  }

  const sendMessage = async () => {
    if (input.trim() === "") return

    // Hide suggestions when user sends a message
    setShowSuggestions(false)

    // Add user message to chat
    const userMessage = {
      text: input,
      type: "outgoing",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

      // Mock response based on input
      let mockResponse =
        "I understand your question about '" +
        currentInput +
        "'. This is a demo response. In a real implementation, this would connect to your chatbot API."

      if (currentInput.toLowerCase().includes("let's grow") || currentInput.toLowerCase().includes("lets grow")) {
        mockResponse = 
        "Let's Grow is an innovative platform that bridges the gap between entrepreneurs and investors, creating a vibrant ecosystem for business growth. Here's what makes it special:\n\n" +
        "🌟 For Entrepreneurs:\n" +
        "- Pitch your startup ideas to a network of potential investors\n" +
        "- Request skilled manpower support to build your dream team\n" +
        "- Access job opportunities while developing your venture\n" +
        "- Get visibility for your innovative concepts\n\n" +
        "💼 For Investors:\n" +
        "- Discover vetted startup opportunities across industries\n" +
        "- Directly connect with promising entrepreneurs\n" +
        "- Diversify your investment portfolio with early-stage ventures\n" +
        "- Participate in shaping the next generation of businesses\n\n" +
        "Let's Grow creates a win-win environment where innovative ideas meet funding and expertise, accelerating business success while generating employment opportunities. It's more than a platform - it's a growth community!"
      } else if (currentInput.toLowerCase().includes("business")) {
        mockResponse =
          "Here are some innovative business ideas for 2024: 1) AI-powered personal assistants for small businesses, 2) Sustainable packaging solutions, 3) Remote work collaboration tools, 4) Health and wellness apps with personalized recommendations, 5) Educational technology platforms for skill development."
      } else if (currentInput.toLowerCase().includes("science")) {
        mockResponse =
          "Science is the systematic study of the natural world through observation, experimentation, and analysis. It helps us understand how things work, from the smallest particles to the largest galaxies, and enables us to make predictions and solve problems."
      } else if (currentInput.toLowerCase().includes("photosynthesis")) {
        mockResponse =
          "Photosynthesis is the process by which plants convert sunlight, carbon dioxide, and water into glucose and oxygen. It's essential for life on Earth as it produces the oxygen we breathe and forms the base of most food chains. The process occurs mainly in the chloroplasts of plant cells."
      }

      // Add bot response with typing effect
      const botMessage = {
        text: "",
        type: "incoming",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])

      simulateTyping(mockResponse, (currentText) => {
        setMessages((prev) =>
          prev.map((msg, index) => (index === prev.length - 1 ? { ...msg, text: currentText } : msg)),
        )
      })
    } catch (err) {
      console.error("Chatbot error:", err)
      const errorMessage = "Sorry, I couldn't process your request. Please try again."
      setError(errorMessage)

      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          text: errorMessage,
          type: "incoming",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!themeContext) {
    return <div>Loading...</div>
  }

  const { theme, toggleTheme } = themeContext

  return (
    <>
    <div className={`chatbot-container ${theme}`}>
      {/* Header */}
      <div className="chatbot-header">
        <div className="d-flex align-items-center">
          <div className="avatar-container me-3">
            <MessageCircle size={24} className="text-white" />
          </div>
          <div>
            <h5 className="mb-0 text-white">AI Assistant</h5>
            <small className="text-white-50">{isTyping ? "Typing..." : "Online"}</small>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <div className="status-indicator"></div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="messages-container">
        {showSuggestions && messages.length === 0 && (
          <div className="cb-welcome-section">
            <div className="welcome-avatar">
              <Sparkles size={32} className="text-primary" />
            </div>
            <h3 className="cb-welcome-title">How can I assist you today?</h3>
            <p className="welcome-subtitle">Choose a suggestion below or ask me anything</p>

            <div className="suggestions-grid">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-card"
                  onClick={() => handleSuggestionClick(suggestion.prompt)}
                  style={{ background: suggestion.gradient }}
                >
                  <div className="suggestion-icon">{suggestion.icon}</div>
                  <div className="suggestion-title">{suggestion.title}</div>
                </div>
              ))}
            </div>

            <div className="welcome-footer">
              <i className="bi bi-lightbulb me-2"></i>
              Ask me anything - I'm here to help!
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.type === "outgoing" ? "outgoing" : "incoming"}`}>
            {msg.type === "incoming" && (
              <div className="message-avatar">
                <MessageCircle size={16} />
              </div>
            )}
            <div className={`message-bubble ${msg.type}`}>
              <div className="message-text">{msg.text}</div>
              <div className="message-time">{formatTime(msg.timestamp)}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message-wrapper incoming">
            <div className="message-avatar">
              <MessageCircle size={16} />
            </div>
            <div className="message-bubble incoming">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="input-section">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            className="message-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <button className="send-button" onClick={sendMessage} disabled={isLoading || input.trim() === ""}>
            {isLoading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Chatbot