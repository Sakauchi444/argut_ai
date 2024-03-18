import pymysql
import json

# Configuration for your RDS database
endpoint = 'database-1.cvccqeo2slwn.ap-northeast-1.rds.amazonaws.com'
username = 'admin'
password = 'qwer1234'
database_name = 'hackit'

# Connection setup for RDS
connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)

def lambda_handler(event, context):
    ## input
    body = event["body"]
    body_dict = json.loads(body)
    # method of input
    conversation_id = body_dict["conversationId"]
    
    try:
        with connection.cursor() as cursor:
            # query = """
            #     SELECT Comments.id, Sections.name, Positions.name, Speakers.name, content FROM Comments 
            #         JOIN Sections ON Comments.section_id = Sections.id 
            #         JOIN Positions ON Sections.position_id = Positions.id 
            #         JOIN Speakers ON Comments.speaker_id = Speakers.id
            #         WHERE Comments.conversation_id=%s
            #         ORDER BY Sections.id ASC;
            # """
            
            query = """
                SELECT Comments.id, Sections.name, Positions.name, Model.name, content FROM Comments 
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
            'content': row[4]
        }
        for row in results
    ]

    # 応答を返す
    return {
        'statusCode': 200,
        'body': json.dumps(comments_list, ensure_ascii=False)
    }
