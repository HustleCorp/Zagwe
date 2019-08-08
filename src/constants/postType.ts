import { Map } from 'immutable'

export enum Tags {
    home = '',
    topic1 = 'following',
    topic2 = 'getemegn',
    topic3 = 'politics',
    topic4 = 'business',
    topic5 = 'technology',
    topic6 = 'poetry',
    topic7 = 'teret',
    topic8 = 'random'

}

export enum TagLabel {
    home   = 'Top picks',
    topic1 = 'Following',
    topic2 = 'getemegn',
    topic3 = 'Politics',
    topic4 = 'Business',
    topic5 = 'Technology',
    topic6 = 'Poetry',
    topic7 = 'teret',
    topic8 = 'Random'

}

export enum TopicsFUll {
    topic1 = 'Following',
    topic2 = 'ገጠመኝ',
    topic3 = 'Politics & History',
    topic4 = 'Business',
    topic5 = 'Technology',
    topic6 = 'Poetry',
    topic7 = 'ተረት ተረት',
    topic8 = 'Random'
}

export const TopicsMap: Map<string, any> = Map({
    
     'Following': 'topic1',
     'ገጠመኝ': 'topic2',
     'Politics & History': 'topic3',
     'Business': 'topic4',
     'Technology': 'topic5',
     'Poetry': 'topic6',
     'ተረት ተረት': 'topic7',
     'Random': 'topic8'

})

export const postTypes: Map<string, string> =
     Map({
         'Politics & History': 'politics',
         'Science & Technology': 'tech',
         'ቡጨቃ': 'ቡጨቃ',
         'Religion': 'religion'
      })
