##Julia Markel
##CS 224G Apps with LLMs Inside
##Insight Report

In general from this class I learned several important lessons surrounding building a startup venture and creating a successful AI-powered application. In particular, I gained way more context surrounding the startup ecosystem. As a PhD student, I found the presentation and poster session to be particularly helpful for practicing interacting in “startup mode”. I found the difference between an academic and startup presentation to be significant - though motivation may feel similar, from the class I learned that the motivation is really more about telling a good story rather than backing up with evidence and prior literature. Next, I learned that the market graph/quadrant is not a helpful metric to show, and rather the market analysis grid which shows where and how your solution differs and is better than competitors is a better alternative. Finally, through talking with VCs and various entrepreneurs at the poster session, I learned a world more about the startup universe and what’s going on with the space, what it means to acquire funding, and what it means to begin a successful venture.


##Prompting technique insights
- Particularly for code generation, it is important to keep contexts succinct and minimal. Despite what one may think, providing extra context here can widen the scope too much, so keeping the instructions and context brief and concise can help achieve the desired outcome more than providing a lengthy, wordy, yet meandering prompt. I made this mistake initially when prompting, thinking that it would take longer to ingest the longer prompt and more “thinking” would happen in this time - it’s not the case. Instead, there are ways to lengthen the time the LLM takes to respond (which does contribute to more “thinking”).

- When seeking a desired format, rather than writing “the response must start with” it is better to say “format the response like below”. That is, it’s a better technique to show what the response should look like rather than with language trying to add constraints. Teaching by showing here is better than teaching by verbose, unclear instructions. This is also a place where I made mistakes with my prompt - I thought that mentioning multiple times what format I would like the response in would be helpful, but instead it’s best to simply add some rules as well as explicitly show an example of the desired output.

- Chain of Thought (CoT) prompting underscores LLMs' capacity for reasoning tasks, allowing them to address questions involving arithmetic and common sense. However, constraints such as limited access to real-world data and the inability to update knowledge can lead to issues like fact hallucination and error propagation.

- Retrieval-Augmented Generation (RAG), is a framework that enhances text generation by incorporating a retriever component. It combines the strengths of retrieval-based models, which retrieve relevant information from a large knowledge source, with generative models to produce more accurate and contextually relevant responses. RAG performs better in various NLP tasks, including question answering and text summarization, by leveraging both retrieval and generation capabilities.
I didn’t use this method, even though with generating simulated student questions it could have been useful to draw from a well-scoped and curated source of content-based curricula, because I wanted to make the app work with a broad range of domains without having to always draw from a pre-inputted data source.
