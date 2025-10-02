#!/usr/bin/env python3
"""
Shoplite Chat Interface
Connects to your deployed RAG API
"""

import requests
import json
import sys
from datetime import datetime

def chat_with_shoplite(api_url):
    """
    Chat interface for Shoplite RAG system
    """
    print("🤖 Shoplite Customer Service Assistant")
    print("=" * 50)
    print(f"Connected to: {api_url}")
    print("Type 'quit' or 'exit' to end conversation")
    print("=" * 50)
    
    conversation_log = []
    
    while True:
        try:
            # Get user input
            question = input("\n> ").strip()
            
            # Check for exit commands
            if question.lower() in ['quit', 'exit', 'bye', 'goodbye']:
                print("👋 Thank you for using Shoplite Assistant!")
                break
            
            if not question:
                continue
                
            print("[🔍 Retrieving context...]")
            
            # Prepare request
            payload = {"question": question}
            headers = {"Content-Type": "application/json"}
            
            # Send request to RAG API
            print("[🤖 Calling LLM...]")
            response = requests.post(
                f"{api_url}/chat",
                json=payload,
                headers=headers,
                timeout=60
            )
            
            # Process response
            if response.status_code == 200:
                result = response.json()
                
                # Display answer
                answer = result.get('answer', 'No answer provided')
                sources = result.get('sources', [])
                
                print(f"\n💬 Answer: {answer}")
                if sources:
                    print(f"📚 Sources: {', '.join(sources)}")
                
                # Log conversation
                conversation_log.append({
                    "timestamp": datetime.now().isoformat(),
                    "question": question,
                    "answer": answer,
                    "sources": sources
                })
                
            else:
                print(f"❌ API Error ({response.status_code}): {response.text}")
                
        except KeyboardInterrupt:
            print("\n\n👋 Conversation interrupted. Goodbye!")
            break
        except requests.exceptions.Timeout:
            print("❌ Request timed out. Please try again.")
        except requests.exceptions.ConnectionError:
            print("❌ Connection error. Check if your API is running.")
        except Exception as e:
            print(f"❌ Error: {e}")
    
    # Save conversation log
    if conversation_log:
        log_filename = f"shoplite_conversation_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        try:
            with open(log_filename, 'w') as f:
                json.dump(conversation_log, f, indent=2)
            print(f"\n📝 Conversation saved to {log_filename}")
        except Exception as e:
            print(f"❌ Could not save conversation log: {e}")

if __name__ == "__main__":
    API_URL = "https://matilda-nonallelic-malaysia.ngrok-free.dev/" 
    
    if len(sys.argv) > 1:
        API_URL = sys.argv[1]
    
    print("Shoplite Chat Interface")
    print("Make sure to update the API_URL in the code with your ngrok URL")
    print("Or pass it as a command line argument:")
    print("  python chat-interface.py https://your-ngrok-url.ngrok.io")
    
    chat_with_shoplite(API_URL)
