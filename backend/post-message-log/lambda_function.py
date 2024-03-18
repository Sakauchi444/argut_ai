import json
import pymysql

def lambda_handler(event, context):
    endpoint = 'database-1.cvccqeo2slwn.ap-northeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'qwer1234'
    database_name = 'hackit'
    
    # イベントからパラメータを取得
    section = event['section']
    position = event['position']
    conversationId = event['conversationId']
    message = event['message']
    
    # データベースに接続
    try:
        connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)
    except pymysql.MySQLError as e:
        print("Could not connect to MySQL instance.")
        print(e)
        
    try:
        with connection.cursor() as cursor:
            # Commentsテーブルに必要情報を挿入
            sql = "INSERT INTO Comments (section_id,position_id,conversation_id,content) VALUES (%s,%s,%s,%s)"
            cursor.execute(sql, (section,position,conversationId,message,))
            connection.commit()
    except pymysql.MySQLError as e:
        print("Could not connect to MySQL instance.")
        print(e)
    finally:
        connection.close()
    
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Log entry created'})
    }
