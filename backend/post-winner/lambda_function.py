import json

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
    conversation_id = str(body["conversationId"])
    winner_id = str(body["speakerId"])
    
    try:
        with connection.cursor() as cursor:
            sql = """
                UPDATE Conversations
                    SET winner_id = %s
                    WHERE id = %s;
            """
            cursor.execute(sql, (conversation_id,winner_id))
            conversation_id = cursor.lastrowid  # 挿入したレコードのIDを取得
            connection.commit()
    finally:
        connection.close()

    # 応答を返す
    return {
        'statusCode': 200,
        'body': "Send OK"
    }