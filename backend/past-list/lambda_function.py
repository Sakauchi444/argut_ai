import json
import pymysql


def lambda_handler(event, context):
    
    # Configuration for your RDS database
    endpoint = ''
    username = ''
    password = ''
    database_name = ''
    
    # Connection setup for RDS
    connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)

    
    with connection.cursor() as cursor:
        
        query = """
            SELECT Conversations.id, Conversations.title, Model.name FROM Conversations
            INNER JOIN Positions ON Conversations.winner_id = Positions.id
            INNER JOIN Model ON Positions.model_id = Model.id
            WHERE Model.name!='none'
        """
        
        cursor.execute(query, )
        results = cursor.fetchall()
        
    connection.close()
    
    comments_list = [
        {
            'id': row[0],
            'title': row[1],
            'winner': row[2]
        }
        for row in results
    ]

    # 応答を返す
    return {
        'statusCode': 200,
        'body': json.dumps(comments_list, ensure_ascii=False)
    }