# ⚖️ Legal AI Contract Analyzer

Welcome to the **Legal AI Contract Analyzer**! This is a smart web application designed to help people easily understand complex legal contracts. Instead of reading pages of confusing legal jargon, you can simply upload your document, ask questions, and get simple answers along with a breakdown of potential risks. 

It even supports multiple languages, making legal documents accessible to more people!

## ✨ Features

* **📄 Upload & Read:** Easily upload your PDF contracts.
* **🤖 Ask Anything:** Ask specific questions about the contract (e.g., "What is the penalty for leaving early?").
* **📝 Auto-Summarize:** Get a quick, plain-language summary of the entire contract's risks and obligations with one click.
* **🌍 Multi-Language Support:** Get answers in English, Hindi, Telugu, or Tamil.
* **⚠️ Risk Detection:** Automatically extracts key clauses and scores them based on how risky they are.
* **📊 Visual Insights:** Displays easy-to-read charts showing the risk levels and importance of different contract clauses.
* **🔒 Privacy First:** Automatically deletes your document data from the database after 10 minutes.

---

## 💻 Tech Stack

This project is built using a modern JavaScript stack, integrating state-of-the-art AI and vector search technologies:

**Frontend (User Interface)**
* **React.js**: For building the interactive user interface.
* **React Markdown**: To render the AI's formatted text beautifully.
* **Chart.js & React-Chartjs-2**: For rendering the risk prediction and importance bar charts.
* **Lucide-React**: For clean, modern UI icons.

**Backend (Server & API)**
* **Node.js & Express.js**: For handling the server, API routing, and requests.
* **Multer**: For handling the PDF file uploads securely.
* **UUID**: To generate unique, temporary session IDs for privacy.

**AI & Data Processing**
* **Google Gemini AI (`@google/genai`)**: 
  * Uses `gemini-2.5-flash` for analyzing the contract and answering questions.
  * Uses `gemini-embedding-001` to convert text into searchable number vectors.
* **Pinecone Vector Database**: For storing the document embeddings and performing lightning-fast semantic searches.
* **PDF.js (`pdfjs-dist`)**: For accurately extracting raw text from the uploaded PDF files.

---

## 🛠️ How It Works (The Workflow)

Behind the scenes, the app works like a highly efficient legal assistant reading a book. Here is the step-by-step journey of your document:

### 1. Uploading the Document
When you upload a PDF contract, the system reads the text page by page. Because legal contracts are long, the system breaks the text down into smaller, bite-sized pieces (or "paragraphs") with slight overlaps so context isn't lost.

### 2. Making the Text "Searchable"
Computers understand numbers better than words. The app sends these small paragraphs to the **Gemini Embedding** model, which translates the text into a special mathematical format (vectors). These formatted pieces are then saved into the **Pinecone Vector Database** with a unique "Session ID" so your document doesn't get mixed up with anyone else's.

### 3. Asking a Question
When you ask a question like "Are there hidden fees?", the app translates your question into the same mathematical format. It then searches Pinecone to find the exact top 5 paragraphs from your contract that are most relevant to your question.

### 4. Getting the Answer
The app takes your question and those relevant paragraphs and hands them over to the "Brain" of the operation (**Gemini 2.5 Flash**). It tells the AI: *"Read these paragraphs, pretend you are a legal expert, and answer the user's question simply in their preferred language."* The AI sends back a simple answer, a list of important clauses, and a "risk score" for each clause.

### 5. Cleaning Up
To protect your privacy, the server starts a 10-minute countdown the moment you upload your document. Once 10 minutes pass, all your document's pieces are securely erased from the smart database.

---

## 🚀 How to Run the Project Locally

To run this project on your own computer, you will need to have **Node.js** installed.

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/legal-ai-analyzer.git](https://github.com/your-username/legal-ai-analyzer.git)
cd legal-ai-analyzer
