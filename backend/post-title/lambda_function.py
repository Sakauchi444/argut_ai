import pymysql
import sys
import os
import json
import logging

def lambda_handler(event, context):
    # # データベース接続情報
    # host = "your_rds_endpoint"
    # user = "your_username"
    # password = "your_password"
    # database = "your_database_name"
    endpoint = 'database-1.cvccqeo2slwn.ap-northeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'qwer1234'
    database_name = 'hackit'

    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    # データベースに接続
    try:
        # connection = pymysql.connect(host=host, user=user, password=password, database=database, cursorclass=pymysql.cursors.DictCursor)
        connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)
    except pymysql.MySQLError as e:
        print("Could not connect to MySQL instance.")
        print(e)
        sys.exit()

    ## input
    body = event["body"] # {"Name":"Tanaka", "Age":"100"}こんな感じのがくる．
    # bodyがJSON文字列の場合、それを辞書に変換する
    if isinstance(body, str):
        body = json.loads(body)
    title = str(body["title"])
    position_a=str(body["positionA"])
    position_b=str(body["positionB"])
    
    try:
        with connection.cursor() as cursor:
            # Conversationsテーブルにtitleを挿入
            sql = "INSERT INTO Conversations (title,winner_id) VALUES (%s,6);" # winner_id:6(none)
            cursor.execute(sql, (title,))
            conversation_id = cursor.lastrowid  # 挿入したレコードのIDを取得
            
            sql = "INSERT INTO Positions (conversation_id,name) VALUES (%s,%s);"
            cursor.executemany(sql, [
                (conversation_id,position_a),
                (conversation_id,position_b)
            ])
            connection.commit()
    finally:
        connection.close()

    # 応答を返す
    return {
        'statusCode': 200,
        'body': json.dumps({
            "conversationId": conversation_id,
        }, ensure_ascii=False)
    }
