import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  User, 
  Bot, 
  Search, 
  BookOpen, 
  Calendar, 
  HelpCircle, 
  Sparkles,
  Paperclip,
  Image as ImageIcon,
  Mic,
  MoreVertical,
  PlusCircle,
  Hash
} from 'lucide-react';

const responses = {
  "default": "I'm not sure how to answer that specifically, but I can help with library hours, course registration, or scholarship info! Try asking about 'Enrollment' or 'Library'.",
  "hello": "Hello! I'm your Student Academic Assistant. How can I help you excel today? 🎓",
  "enrollment": "Enrollment for the Spring semester is open until June 15th! You can find the portal under your Student Dashboard -> Academic -> Enrollment. 📚",
  "registration": "Enrollment for the Spring semester is open until June 15th! You can find the portal under your Student Dashboard -> Academic -> Enrollment. 📚",
  "library": "The Central Library is open from 8:00 AM to 11:00 PM on weekdays and 10:00 AM to 8:00 PM on weekends. 📖",
  "scholarships": "Global Merit and Financial Aid applications are due July 1st. You can apply via the 'Scholarships' tab in your student portal. 💰",
  "internship": "The Career Center has 50+ new internship listings this week for Computer Science and Business majors. Check them out in the portal! 💼",
  "help": "You can ask me about library hours, enrollment dates, scholarships, or career opportunities! Just type your question or select a quick action from the sidebar."
};

const QuickAction = ({ icon: Icon, text, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex items-center gap-3 w-full p-4 mb-2 text-left rounded-xl transition-all"
    style={{ color: 'var(--text-muted)' }}
  >
    <Icon size={20} />
    <span className="text-sm font-medium">{text}</span>
  </motion.button>
);

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your AI Campus Guide. Ask me anything about enrollment, library, or scholarships! 👋", sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = { 
      id: Date.now(), 
      text: input, 
      sender: 'user', 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.toLowerCase();
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      let botResponseText = responses.default;
      Object.keys(responses).forEach(key => {
        if (currentInput.includes(key)) {
          botResponseText = responses[key];
        }
      });

      const botMessage = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="app-container" style={{ 
      display: 'flex', 
      width: '95vw', 
      height: '90vh', 
      maxWidth: '1200px',
      gap: '1.5rem',
      padding: '0.5rem'
    }}>
      
      {/* Sidebar - Desktop */}
      <aside className="glass" style={{ 
        width: '280px', 
        padding: '1.5rem',
        display: 'flex', 
        flexDirection: 'column',
        display: window.innerWidth < 768 ? 'none' : 'flex'
      }}>
        <div className="gradient-text heading" style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles size={28} style={{ color: 'var(--primary)' }} />
          <span>CampusAI</span>
        </div>
        
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '1rem', paddingLeft: '0.5rem' }}>Core Modules</p>
          <QuickAction icon={BookOpen} text="Library Status" onClick={() => { setInput("When is the library open?"); handleSend(); }} />
          <QuickAction icon={Calendar} text="Enrollment Info" onClick={() => { setInput("Spring registration dates?"); handleSend(); }} />
          <QuickAction icon={Search} text="Scholarships" onClick={() => { setInput("Available scholarships?"); handleSend(); }} />
          <QuickAction icon={PlusCircle} text="Internships" onClick={() => { setInput("Recent internships?"); handleSend(); }} />
        </div>

        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
              <User size={20} style={{ margin: 'auto' }} />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Student User</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Computer Science, Yr 3</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="glass" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Chat Header */}
        <header style={{ 
          padding: '1.25rem 2rem', 
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '14px', 
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot size={24} color="white" />
            </div>
            <div>
              <h2 className="heading" style={{ fontSize: '1.1rem' }}>Campus Assistant</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Always online to help</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ background: 'transparent', padding: '0.5rem', borderRadius: '10px' }} className="hover:bg-glass">
              <Search size={20} color="var(--text-muted)" />
            </button>
            <button style={{ background: 'transparent', padding: '0.5rem', borderRadius: '10px' }}>
              <MoreVertical size={20} color="var(--text-muted)" />
            </button>
          </div>
        </header>

        {/* Message List */}
        <div 
          ref={scrollRef}
          style={{ 
            flex: 1, 
            padding: '2rem', 
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%'
                }}
              >
                <div style={{ 
                  padding: '1rem 1.25rem', 
                  borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  background: msg.sender === 'user' ? 'var(--primary)' : 'var(--glass)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border)',
                  color: 'white',
                  boxShadow: msg.sender === 'user' ? '0 4px 15px rgba(59, 130, 246, 0.3)' : 'none'
                }}>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{msg.text}</p>
                </div>
                <span style={{ 
                  fontSize: '0.65rem', 
                  color: 'var(--text-muted)', 
                  marginTop: '0.4rem',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ alignSelf: 'flex-start', padding: '1rem', background: 'var(--glass)', borderRadius: '20px', display: 'flex', gap: '4px' }}
              >
                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'white' }}></motion.span>
                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'white' }}></motion.span>
                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'white' }}></motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Bar */}
        <footer style={{ 
          padding: '1.5rem 2rem',
          background: 'rgba(15, 23, 42, 0.4)',
          borderTop: '1px solid var(--border)'
        }}>
          <form 
            onSubmit={handleSend}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              background: 'rgba(255,255,255,0.05)',
              padding: '0.6rem 0.6rem 0.6rem 1.25rem',
              borderRadius: '16px',
              border: '1px solid var(--border)'
            }}
          >
            <Paperclip size={20} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              style={{ 
                flex: 1, 
                background: 'transparent', 
                border: 'none', 
                color: 'white', 
                fontSize: '0.95rem',
                padding: '0.5rem 0'
              }}
            />
            <div style={{ display: 'flex', gap: '0.4rem', borderLeft: '1px solid var(--border)', paddingLeft: '0.75rem' }}>
              <button type="button" style={{ background: 'transparent', padding: '0.5rem', color: 'var(--text-muted)' }}>
                <Mic size={20} />
              </button>
              <button 
                type="submit"
                disabled={!input.trim()}
                style={{ 
                  background: input.trim() ? 'var(--primary)' : 'rgba(255,255,255,0.05)', 
                  padding: '0.6rem', 
                  borderRadius: '12px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </form>
          <div style={{ textAlign: 'center', marginTop: '0.8rem' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              CampusAI can make mistakes. Verify important academic deadlines.
            </p>
          </div>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .app-container {
          animation: fadeIn 0.8s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .app-container { width: 100vw; height: 100vh; gap: 0; padding: 0; }
          .glass { border-radius: 0; border: none; }
        }
      `}} />
    </div>
  );
}

export default App;
