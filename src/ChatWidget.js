import React, { useState } from "react";
import {
    MainContainer, ChatContainer, MessageList,
    Message, MessageInput, ConversationHeader
} from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import ListWidget from "./widgets/ListWidget";
import CsvWidget from "./widgets/CsvWidget";
import TextWidget from "./widgets/TextWidget";

export default function ChatWidget({ onClose }) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (text) => {
        // Add user message
        addMessage({ type: 'text', content: text, sender: 'user' });

        // Show typing indicator
        setIsTyping(true);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Dummy API response logic based on prompt content
            let response;
            const lowerText = text.toLowerCase();

            if (lowerText.includes("top 10 ranks") || lowerText.includes("get top 10")) {
                response = {
                    type: "list",
                    data: [
                        "1. Alice Johnson - 98.5%",
                        "2. Bob Smith - 97.2%",
                        "3. Charlie Brown - 96.8%",
                        "4. Diana Prince - 95.9%",
                        "5. Edward Norton - 94.7%",
                        "6. Fiona Green - 93.5%",
                        "7. George Wilson - 92.8%",
                        "8. Hannah Davis - 91.6%",
                        "9. Ian Thompson - 90.4%",
                        "10. Julia Roberts - 89.7%"
                    ]
                };
            } else if (lowerText.includes("slabreach report") || lowerText.includes("generate report")) {
                response = {
                    type: "csv",
                    data: [
                        ["Employee Name", "Department", "Violation Type", "Severity", "Date", "Status"],
                        ["John Doe", "Engineering", "Safety Protocol", "High", "2025-07-15", "Resolved"],
                        ["Jane Smith", "Manufacturing", "Equipment Misuse", "Medium", "2025-07-14", "Pending"],
                        ["Mike Johnson", "Quality Control", "Documentation", "Low", "2025-07-13", "Resolved"],
                        ["Sarah Wilson", "Engineering", "Safety Protocol", "High", "2025-07-12", "In Progress"],
                        ["Tom Brown", "Manufacturing", "Process Deviation", "Medium", "2025-07-11", "Resolved"]
                    ]
                };
            } else if (lowerText.includes("lifecycle analysis") || lowerText.includes("summary")) {
                response = {
                    type: "text",
                    data: `📊 Lifecycle Analysis Summary - ${new Date().toLocaleDateString()}

🔍 Key Metrics:
• Total Products Analyzed: 247
• Sustainability Score: 8.3/10
• Carbon Footprint Reduction: 12.5%
• Resource Efficiency: 89.2%

⚡ Performance Highlights:
• Energy consumption decreased by 15% compared to last month
• Waste reduction achieved: 18.7%
• Recycling rate improved to 94.3%

🎯 Recommendations:
1. Optimize transportation routes to reduce emissions
2. Implement renewable energy sources in 3 facilities
3. Enhance material recovery processes

📈 Trend Analysis:
The overall lifecycle performance shows positive improvement across all major indicators. Continued focus on sustainable practices is yielding measurable results.`
                };
            } else {
                // Default response for unrecognized prompts
                response = {
                    type: "text",
                    data: "I can help you with:\n• Getting top 10 ranks\n• Generating slabreach reports\n• Providing lifecycle analysis summaries\n\nPlease try one of these options or rephrase your request."
                };
            }

            addBotResponse(response);
        } catch (error) {
            addBotResponse({
                type: "text",
                data: "Sorry, I encountered an error processing your request. Please try again."
            });
        } finally {
            setIsTyping(false);
        }
    };

    const addMessage = (msg) => {
        setMessages(m => [...m, { ...msg, id: Date.now() + Math.random() }]);
    };

    const addBotResponse = ({ type, data }) => {
        addMessage({ type, content: data, sender: 'bot' });
    };

    const renderMessage = (msg) => {
        if (msg.sender === 'user') {
            return (
                <Message
                    key={msg.id}
                    model={{
                        message: msg.content,
                        direction: "outgoing",
                        sender: "You"
                    }}
                />
            );
        }

        // For bot messages, render the appropriate widget
        const { type, content } = msg;

        return (
            <Message
                key={msg.id}
                model={{
                    direction: "incoming",
                    sender: "Assistant"
                }}
            >
                <Message.CustomContent>
                    {type === "list" && <ListWidget items={content} title="Top 10 Rankings" />}
                    {type === "csv" && <CsvWidget rows={content} filename="slabreach_report" />}
                    {type === "text" && <TextWidget text={content} />}
                    {!["list", "csv", "text"].includes(type) && <TextWidget text={content} />}
                </Message.CustomContent>
            </Message>
        );
    };

    return (
        <div style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 380,
            height: "80vh", // Increased height to 80% of viewport height
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "white",
            zIndex: 1000
        }}>
            <MainContainer>
                <ChatContainer>
                    <ConversationHeader >
                        <ConversationHeader.Content
                            userName="AI Assistant"
                            info="Online"
                        >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <img
                                    src={require("./widgets/ai-generating.gif")}
                                    alt="AI Assistant"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                        marginRight: "12px",
                                        verticalAlign: "middle"
                                    }}
                                />
                                <span style={{
                                    fontWeight: "bold",
                                    fontSize: "1.2rem",
                                    color: "#333"
                                }}>
                                    OCLMC AI
                                </span>
                            </div>
                        </ConversationHeader.Content>
                        <ConversationHeader.Actions>
                            <button
                                onClick={onClose}
                                style={{
                                    background: "none",
                                    border: "none",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    padding: "4px 8px"
                                }}
                            >
                                ✖️
                            </button>
                        </ConversationHeader.Actions>
                    </ConversationHeader>
                    <MessageList typingIndicator={isTyping ? "Assistant is typing..." : null}>
                        {messages.map(renderMessage)}
                    </MessageList>
                    <MessageInput
                        placeholder="Ask me about rankings, reports, or analysis..."
                        onSend={handleSend}
                        disabled={isTyping}
                    />
                </ChatContainer>
            </MainContainer>
        </div >
    );
}
