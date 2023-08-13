# VisaBot using GPT3

This repository contains the necessary code for integrating GPT-3 API into a website. The repository is structured into three directories, as follows:

* `website`: This directory contains the frontend code for the website.
* `gpt3`: This directory contains the GPT-3 finetuning code.
* `api`: This directory contains the GCP API code.

## Requirements

To run this integration, you need to have the following:

* A GPT-3 API key.
* A Google Cloud Platform (GCP) account.
* A web server to host the website.

## Usage

To use the code in this repository, follow these steps:

1. Clone the repository into your local machine:

   <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span></span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">git clone https://github.com/username/repo-name.git
   </code></div></div></pre>
2. Configure the GPT-3 API key and GCP credentials:
3. Use the `gpt3` directory to fine-tune the GPT-3 model for your specific task.
4. Use the `api` directory to deploy the GCP API. You can modify the code in `api/main.py` to include your fine-tuned GPT-3 model.
5. Use the `website` directory as a template for your frontend code. 

## Contributing

If you find any issues with this integration, feel free to open an issue in this repository. Pull requests are also welcome.
