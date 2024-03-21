import json
import pymysql

def lambda_handler(event, context):
    # # データベース接続情報
    endpoint = ''
    username = ''
    password = ''
    database_name = ''

    # データベースに接続
    try:
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
    conversation_id = str(body["conversationId"])
    winner_id = str(body["speakerId"])
    
    try:
        with connection.cursor() as cursor:
            sql = """
                UPDATE Conversations
                    SET winner_id = %s
                    WHERE id = %s;
            """
            cursor.execute(sql, (winner_id,conversation_id))
            conversation_id = cursor.lastrowid  # 挿入したレコードのIDを取得
            connection.commit()
    finally:
        connection.close()

    # 応答を返す
    return {
        'statusCode': 200,
        'body': json.dumps({"message": "ok"})
    }