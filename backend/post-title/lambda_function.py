import pymysql
import sys
import os
import json
import logging

def lambda_handler(event, context):
    # データベース接続情報
    endpoint = ''
    username = ''
    password = ''
    database_name = ''

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
    a_name=str(body["a_position_name"])
    a_model_id=str(body["a_model_id"])
    b_name=str(body["b_position_name"])
    b_model_id=str(body["b_model_id"])
    
    try:
        with connection.cursor() as cursor:
            sql_insert = "INSERT INTO Positions (model_id,name) VALUES (%s,%s);"
            
            # 挿入された各行のIDを格納するリスト
            inserted_ids = []
            
            # データを挿入し、各IDを取得
            cursor.execute(sql_insert, (a_model_id,a_name))
            last_id = cursor.lastrowid
            inserted_ids.append(last_id)
            
            cursor.execute(sql_insert, (b_model_id,b_name))
            last_id = cursor.lastrowid
            inserted_ids.append(last_id)
            
            logging.info(inserted_ids)
            
            # Conversationsテーブルにtitleを挿入
            sql = "INSERT INTO Conversations (title,position_a,position_b) VALUES (%s,%s,%s);"
            cursor.execute(sql, (title,inserted_ids[0],inserted_ids[1]))
            conversation_id = cursor.lastrowid  # 挿入したレコードのIDを取得
            
            connection.commit()
    finally:
        connection.close()

    # 応答を返す
    return {
        'statusCode': 200,
        'body': json.dumps({
            "conversationId": conversation_id,
            "positionA": inserted_ids[0],
            "positionB": inserted_ids[1]
        }, ensure_ascii=False)
    }
