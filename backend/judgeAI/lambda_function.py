# python3 -m venv poe
# source poe/bin/activate
# pip3 install -U poe-api-wrapper

import json
from poe_api_wrapper import PoeApi
import pymysql



client = PoeApi("")
# client = PoeApi(<poe_api_key>)

# Configuration for your RDS database
endpoint = 'database-1.cvccqeo2slwn.ap-northeast-1.rds.amazonaws.com'
username = 'admin'
password = 'qwer1234'
database_name = 'hackit'

# Connection setup for RDS
connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)

# # データベースから取得した結果を文字列に変換する関数
# def convert_comments_to_string(results_comments):
#     # 各コメントを "Position Name: Comment Content" の形式で文字列に変換し、改行で連結する
#     return '\n'.join([f"{position}: {comment}" for position, comment in results_comments])


def lambda_handler(event, context):
    print('## ENVIRONMENT VARIABLES')
    ## input
    body = event["body"] # {"Name":"Tanaka", "Age":"100"}こんな感じのがくる．
    
    conversation_id = body['conversationId']
    
    # with connection.cursor() as cursor:
    #     query = """
    #         SELECT Positions.name, Comments.content FROM Comments
    #             JOIN Sections ON Comments.section_id = Sections.id
    #             JOIN Positions ON Sections.position_id = Positions.id
    #             WHERE Comments.conversation_id = %s
    #             ORDER BY Comments.section_id ASC;
    #     """
        
    #     cursor.execute(query, (conversation_id,))
    #     results_comments = cursor.fetchall()
        
    #     print(results_comments)
        
    #     query = "SELECT title FROM Conversations WHERE id=%s;"
    #     cursor.execute(query, (conversation_id,))
    #     result_title = cursor.fetchone()

    # # Make sure to close the connection if you're done with it or it's not being managed elsewhere
    # connection.close()
    
    # # CSVファイルに結果を書き込む
    # csv_file_path = './comments.csv'  # CSVファイルのパス
    # with open(csv_file_path, mode='w', newline='', encoding='utf-8') as file:
    #     writer = csv.writer(file)
    #     writer.writerow(['Position', 'Comment'])  # ヘッダーを書き込む
    #     for row in results_comments:
    #         writer.writerow(row)  # 各行のデータを書き込む

    # Kind of Bot Model
    bot = "a2"
    title = str(result['title'])
    # converted_string = convert_comments_to_string(results_comments)
    question_message = f"あなたはディベートの審査員です。今回のテーマは「{title}」です。双方の主張を見て、どちらがディベートの勝者であるか決定し、その理由を500字以内で述べて下さい。"
    file_urls = list(csv_file_path)
    for chunk in client.send_message(bot, question_message, file_path=file_urls):
        print(chunk["response"], end="", flush=True)
        
    # 応答を返す
    return {
        'statusCode': 200,
        'body': json.dumps({
            "conversationId": conversationId,
            # "message": chunk["text"]
        }, ensure_ascii=False)
    }
