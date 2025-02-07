"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X } from "lucide-react";

export function ChatBot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { text: "Hej! Hur kan jag hjälpa dig idag?", sender: "bot" }
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, sender: "user" }]);
      setInput("");
      // Här skulle du normalt skicka meddelandet till en faktisk chattbot-tjänst
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Tack för ditt meddelande. En av våra representanter kommer att svara så snart som möjligt.",
            sender: "bot"
          }
        ]);
      }, 1000);
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col">
          <div className="p-4 bg-blue-500 text-white flex justify-between items-center rounded-t-lg">
            <h3 className="font-bold">Kundsupport</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-grow p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-100 ml-auto"
                    : "bg-gray-100"
                }`}
              >
                {message.text}
              </div>
            ))}
          </ScrollArea>
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Skriv ett meddelande..."
              />
              <Button type="submit">Skicka</Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
