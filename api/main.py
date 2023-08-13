import openai
import json
import functions_framework
from google.cloud import storage


def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)

    blob.download_to_filename(destination_file_name)

    print("Blob {} downloaded to {}.".format(source_blob_name, destination_file_name))

def upload_blob(bucket_name, source_file_name, destination_blob_name):
  """Uploads a file to the bucket."""
  storage_client = storage.Client()
  bucket = storage_client.get_bucket(bucket_name)
  blob = bucket.blob(destination_blob_name)

  blob.upload_from_filename(source_file_name)

  print('File {} uploaded to {}.'.format(
      source_file_name,
      destination_blob_name))

@functions_framework.http
def handler(request):
    global model
    # CORS HEADER
    if request.method == "OPTIONS":
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }

        return ("", 204, headers)

    # REAL FUNCTION - START
    openai.organization = "org-key"
    openai.api_key = 'api-key'
    request_json = request.get_json()
    print(request_json)
    user_prompt=request_json['message']+'\n\n###\n\n'
    download_blob("Ragavbucket", "visabot/store.txt", "/tmp/store.txt")
    fh=open('/tmp/store.txt','a')
    fh.write('prompt: '+request_json['message']+'\n')
    response=openai.Completion.create(
    model='davinci:ft-personal:final-model-2023-03-24-12-37-03',
    prompt=user_prompt,
    temperature=0.2,
    frequency_penalty=0.1,
    stop='###',
    max_tokens=256)
    content=json.dumps(response)
    th=json.loads(content)
    choice=th['choices'][0]
    result={
      'message':choice['text']
    }
    fh.write('completion: '+choice['text']+'\n')
    fh.close()
    upload_blob('Ragavbucket','/tmp/store.txt','visabot/store.txt')
    #REAL FUNCTION - END
    # Set CORS headers for the main request
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST",
    }

    return (result, 200, headers)