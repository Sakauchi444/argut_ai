import json
import boto3
from poe_api_wrapper import PoeApi

client = PoeApi("QBjYOY5ONFVv59P-B7HaOw%3D%3D")
# client = PoeApi(<poe_api_key>)
lambda_client = boto3.client('lambda')

def lambda_handler(event, context):
    ## input
    print(event)
    body = event["body"]
    body_dict = json.loads(body)

    # method of input
    conversationId = body_dict["conversationId"]
    chatCodeId = body_dict["chatCodeId"] # 最初のリクエストは"０"がくる．
    message = body_dict["message"]
    bot = body_dict["bot"]
    # bot = "a2"
    speaker = body_dict["speakerId"]
    section = body_dict["sectionId"]

    if chatCodeId == "0":
        # Create new chat thread
        for chunk in client.send_message(bot, message):
            print(chunk["response"], end="", flush=True)
            # pass
        print(chunk["text"])
        # chatCode = chunk["chatCode"]
        chatCode = chunk["chatId"]

    else:
        # Send message to an existing chat thread
        # Using chatCode
        for chunk in client.send_message(bot, message, chatCode={chatCodeId}):
            print(chunk["response"], end="", flush=True)
        print(f'chunk: {chunk}')
        chatCode = chatCodeId
        
    message = chunk["text"]
    
    # post_message_logを非同期で実行
    lambda_payload = {
        "section": section,
        "speaker": speaker,
        "conversationId": conversationId,
        "message": message
    }
    lambda_client.invoke(
        FunctionName='hackit-post-message-log',  # 新しいLambda関数の名前
        InvocationType='Event',  # 非同期実行
        Payload=json.dumps(lambda_payload)
    )

    # post_message_log(section,speaker,conversationId,message)

    # 応答を返す
    return {
        'statusCode': 200,
        'body': json.dumps({
            "conversationId": conversationId,
            "chatCode": chatCode,
            "message": message
        }, ensure_ascii=False)
    }