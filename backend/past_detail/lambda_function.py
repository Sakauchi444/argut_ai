import pymysql
import json


def lambda_handler(event, context):
        
    # Configuration for your RDS database
    endpoint = ''
    username = ''
    password = ''
    database_name = ''
    
    # Connection setup for RDS
    connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)
    
    ## input
    body = event["body"]
    body_dict = json.loads(body)
    # method of input
    conversation_id = body_dict["conversationId"]
    
    try:
        with connection.cursor() as cursor:
            
            query = """
                SELECT Comments.id, Sections.name, Positions.name, Model.name, Conversations.title, content FROM Comments 
                INNER JOIN Conversations ON Comments.conversation_id = Conversations.id
                INNER JOIN Sections ON Comments.section_id = Sections.id 
                INNER JOIN Positions ON Comments.position_id = Positions.id 
                INNER JOIN Model ON Positions.model_id = Model.id 
                WHERE Comments.conversation_id=%s 
                ORDER BY Sections.id ASC;
            """
            
            cursor.execute(query, (conversation_id,))
            results = cursor.fetchall()
            connection.commit()
    finally:
        connection.close()
    
    comments_list = [
        {
            'id': row[0],
            'section_name': row[1],
            'position_name': row[2],
            'speaker_name': row[3],
            'title': row[4],
            'content': row[5]
        }
        for row in results
    ]

    # 応答を返す
    return {
        'statusCode': 200,
        'body': json.dumps(comments_list, ensure_ascii=False)
    }