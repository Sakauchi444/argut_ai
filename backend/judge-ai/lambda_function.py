import json
from poe_api_wrapper import PoeApi

client = PoeApi("")

def lambda_handler(event, context):
    
    ## input
    body = event["body"]
    body_dict = json.loads(body)

    # method of input
    chatCodeId = body_dict["chatCodeId"] # 最初のリクエストは"０"がくる．
    message = body_dict["message"]
    bot = "a2_100k"
    # bot = "claude_3_opus_200k"
    
    if chatCodeId == "0":
        # Create new chat thread
        for chunk in client.send_message(bot, message):
            print(chunk["response"], end="", flush=True)
            # pass
        print(chunk["text"])
        chatCode = chunk["chatCode"]
        # chatCode = chunk["chatId"]

    else:
        # Send message to an existing chat thread
        # Using chatCode
        for chunk in client.send_message(bot, message, chatCode={chatCodeId}):
            print(chunk["response"], end="", flush=True)
        # print(f'chunk: {chunk}')
        chatCode = chatCodeId
        
    message = chunk["text"]
    
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps({
            "comment": message,
            "chatCodeId": chatCode
        }, ensure_ascii=False)
    }
