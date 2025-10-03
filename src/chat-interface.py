#!/usr/bin/env python3
"""
Shoplite Chat Interface - RAG System Client
Connects to deployed Shoplite RAG API for customer service
"""

import requests
import json
import sys
import time
from datetime import datetime

class ShopLiteChatClient:
    def __init__(self, base_url):
        self.base_url = base_url.rstrip('/')
        self.conversation_log = []
        
    def test_connection(self):
        """Test if the RAG API is accessible"""
        try:
            print("🔌 Testing connection to Shoplite RAG API...")
            response = requests.get(f"{self.base_url}/health", timeout=10)
            
            if response.status_code == 200:
                health_data = response.json()
                print(f"✅ Connected successfully!")
                print(f"   Status: {health_data.get('status', 'unknown')}")
                print(f"   Knowledge Base: {health_data.get('knowledge_base_size', 0)} documents")
                print(f"   Model: Loaded and ready")
                return True
            else:
                print(f"❌ API returned status: {response.status_code}")
                return False
                
        except requests.exceptions.ConnectionError:
            print("❌ Cannot connect to the API. Please check:")
            print("   - Is the Colab notebook running?")
            print("   - Is the ngrok URL correct?")
            print("   - Did you enter the ngrok token?")
            return False
        except Exception as e:
            print(f"❌ Connection error: {e}")
            return False
    
    def send_question(self, question):
        """Send question to RAG API and get response"""
        try:
            print(f"🔍 [Retrieving context...]")
            
            payload = {"question": question}
            start_time = time.time()
            
            response = requests.post(
                f"{self.base_url}/chat",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            end_time = time.time()
            
            if response.status_code == 200:
                return response.json(), end_time - start_time
            else:
                print(f"❌ API Error {response.status_code}: {response.text}")
                return None, 0
                
        except requests.exceptions.Timeout:
            print("❌ Request timed out. The server might be processing...")
            return None, 0
        except Exception as e:
            print(f"❌ Error: {e}")
            return None, 0
    
    def format_response(self, result, processing_time):
        """Format and display the API response beautifully"""
        if not result:
            return
        
        print(f"🤖 [LLM Response generated in {processing_time:.2f}s]")
        print("=" * 60)
        
        # Extract data with error checking
        response_text = result.get('response', 'No response received')
        retrieved_docs = result.get('retrieved_documents', [])
        prompt_type = result.get('prompt_type_used', 'unknown')
        
        # Display the main response
        print("💬 ANSWER:")
        print(response_text)
        print()
        
        # Display sources with relevance scores
        if retrieved_docs:
            print("📚 RETRIEVED SOURCES:")
            for doc in retrieved_docs:
                title = doc.get('title', 'Unknown Document')
                score = doc.get('similarity_score', 0)
                print(f"   📄 {title} (relevance: {score:.3f})")
        else:
            print("📚 SOURCES: No relevant documents found")
        
        print(f"🔧 Prompt Type: {prompt_type}")
        print("=" * 60)
    
    def log_conversation(self, question, result, processing_time):
        """Log the conversation for evaluation"""
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "question": question,
            "processing_time": processing_time,
            "response": result.get('response', ''),
            "retrieved_documents": result.get('retrieved_documents', []),
            "prompt_type_used": result.get('prompt_type_used', 'unknown')
        }
        self.conversation_log.append(log_entry)
    
    def save_conversation_log(self):
        """Save conversation log to file for evaluation"""
        if not self.conversation_log:
            return
            
        filename = f"shoplite_evaluation_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        try:
            with open(filename, 'w') as f:
                json.dump(self.conversation_log, f, indent=2, ensure_ascii=False)
            print(f"💾 Evaluation log saved to: {filename}")
            return filename
        except Exception as e:
            print(f"❌ Could not save log: {e}")
            return None
    
    def run_chat(self):
        """Main chat loop"""
        print("\n" + "="*60)
        print("🛍️  SHOPLITE CUSTOMER SERVICE CHAT")
        print("="*60)
        print("Commands:")
        print("  - Type your question to get help")
        print("  - 'exit' or 'quit' - End conversation")
        print("  - 'save' - Save conversation log")
        print("  - 'health' - Check API status")
        print("="*60)
        
        # Test connection first
        if not self.test_connection():
            print("\n🚫 Cannot connect to API. Please check:")
            print("   1. Your Colab notebook is running")
            print("   2. Ngrok tunnel is active")
            print("   3. URL is correct")
            return
        
        print("\n💡 Ready! Ask about Shoplite features, policies, or help.")
        
        while True:
            try:
                question = input("\n🎯 Your question: ").strip()
                
                if question.lower() in ['exit', 'quit', 'bye']:
                    filename = self.save_conversation_log()
                    print(f"\n👋 Thank you for using Shoplite Chat!")
                    if filename:
                        print(f"   Evaluation log: {filename}")
                    break
                
                elif question.lower() == 'save':
                    filename = self.save_conversation_log()
                    if filename:
                        print(f"✅ Conversation saved to {filename}")
                    continue
                
                elif question.lower() == 'health':
                    self.test_connection()
                    continue
                
                elif not question:
                    continue
                
                # Process the question
                result, processing_time = self.send_question(question)
                
                if result:
                    self.format_response(result, processing_time)
                    self.log_conversation(question, result, processing_time)
                
            except KeyboardInterrupt:
                print("\n\n⏹️  Conversation interrupted.")
                self.save_conversation_log()
                break
            except Exception as e:
                print(f"❌ Unexpected error: {e}")

def main():
    DEFAULT_URL = "https://matilda-nonallelic-malaysia.ngrok-free.dev"
    
    # Get URL from command line or use default
    if len(sys.argv) > 1:
        api_url = sys.argv[1]
    else:
        api_url = DEFAULT_URL
    
    # Validate URL format
    if not api_url.startswith(('http://', 'https://')):
        api_url = 'https://' + api_url
    
    print(f"🌐 Connecting to: {api_url}")
    
    # Create and run chat client
    chat_client = ShopLiteChatClient(api_url)
    chat_client.run_chat()

if __name__ == "__main__":
    main()
