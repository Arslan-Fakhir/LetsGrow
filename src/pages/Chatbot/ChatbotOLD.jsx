import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, Sparkles, Brain, Lightbulb, BookOpen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Chatbot.css";

function Chatbot() {
  const { auth } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    setShowSuggestions(true);
    inputRef.current?.focus();

    if (auth.user) {
      loadConversations();
    }
  }, [auth.user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadConversations = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chatbot/conversations/${auth.user._id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch conversations');
      }

      const data = await response.json();
      console.log('Loaded conversations:', data);
    } catch (err) {
      console.error('Error loading conversations:', err);
    }
  };

  const handleSuggestionClick = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
    setShowSuggestions(false);
  };

  const simulateTyping = (text, callback) => {
    setIsTyping(true);
    let currentText = "";
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        callback(currentText);
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 30);
  };

  const sendMessage = async () => {
    if (input.trim() === "" || !auth.user) return;

    setShowSuggestions(false);
    const userMessage = {
      text: input,
      type: "outgoing",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chatbot/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          message: currentInput,
          userId: auth.user._id,
          conversationId: conversationId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to get response from chatbot");
      }

      const data = await response.json();
      
      if (!conversationId && data.conversationId) {
        setConversationId(data.conversationId);
      }

      const botMessage = {
        text: "",
        type: "incoming",
        timestamp: new Date(),
        metadata: data.metadata,
      };
      setMessages((prev) => [...prev, botMessage]);

      simulateTyping(data.reply || data.tReply || data.message, (currentText) => {
        setMessages((prev) =>
          prev.map((msg, index) => (index === prev.length - 1 ? { ...msg, text: currentText } : msg)),
        );
      });
    } catch (err) {
      console.error("Chatbot error:", err);
      setError(err.message || "Sorry, I couldn't process your request. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          text: err.message || "Sorry, I couldn't process your request. Please try again.",
          type: "incoming",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`chatbot-container ${auth.user?.theme || 'light'}`}>
      <div className="chatbot-header">
        <div className="d-flex align-items-center">
          <div className="avatar-container me-3">
            <MessageCircle size={24} className="text-white" />
          </div>
          <div>
            <h5 className="mb-0 text-white">AI Assistant</h5>
            <small className="text-white-50">
              {isTyping ? "Typing..." : auth.user ? `Welcome, ${auth.user.name}` : "Online"}
            </small>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="status-indicator"></div>
        </div>
      </div>

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
              {msg.metadata && (
                <div className="message-meta">
                  <small>Source: {msg.metadata.source}</small>
                  {msg.metadata.confidence && (
                    <small>Confidence: {Math.round(msg.metadata.confidence * 100)}%</small>
                  )}
                </div>
              )}
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

      <div className="input-section">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            className="message-input"
            placeholder={auth.user ? "Type your message..." : "Please login to chat"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading || !auth.user}
          />
          <button 
            className="send-button" 
            onClick={sendMessage} 
            disabled={isLoading || input.trim() === "" || !auth.user}
          >
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
  );
}

export default Chatbot;