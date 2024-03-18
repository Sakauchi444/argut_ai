import json
import pymysql


def lambda_handler(event, context):
    
    # Configuration for your RDS database
    endpoint = 'database-1.cvccqeo2slwn.ap-northeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'qwer1234'
    database_name = 'hackit'
    
    # Connection setup for RDS
    connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)

    
    with connection.cursor() as cursor:
        # query = """
        #     SELECT Conversations.id, Conversations.title, Speakers.name FROM Conversations 
        #     JOIN Speakers ON Conversations.winner_id = Speakers.id
        #     WHERE Speakers.name!='none'
        # """
        
        query = """
            SELECT Conversations.id, Conversations.title, Model.name FROM Conversations
            INNER JOIN Positions ON Conversations.winner_id = Positions.id
            INNER JOIN Model ON Positions.model_id = Model.id
            WHERE Model.name!='none'
        """
        
        # query = """
        #     SELECT 1;
        # """
        
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
    
    
    # TODO implement
    # 応答を返す
    return {
        'statusCode': 200,
        'body': json.dumps(comments_list, ensure_ascii=False)
    }
