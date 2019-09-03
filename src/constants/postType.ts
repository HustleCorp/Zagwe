import { Map } from 'immutable'

export enum Tags {
    home = '',
    topic1 = 'following',
    topic2 = 'culture',
    topic3 = 'politics',
    topic4 = 'getemegn',
    topic5 = 'business',
    topic6 = 'technology',
    topic7 = 'poetry',
    topic8 = 'teret',
    topic9 = 'other'

}

export enum TagsMap {
    culture = 'topic2',
    politics = 'topic3',
    getemegn = 'topic4',
    business = 'topic5',
    technology = 'topic6',
    poetry= 'topic7',
    teret = 'topic8',
    other = 'topic9',
}

export enum TagLabel {
    home   = 'Top picks',
    topic1 = 'Following',
    topic2 = 'Culture',
    topic3 = 'Politics',
    topic4 = 'getemegn',
    topic5 = 'Business',
    topic6 = 'Technology',
    topic7 = 'Poetry',
    topic8 = 'teret',
    topic9 = 'Others'

}

export enum TopicsFUll {
    topic1 = 'Following',
    topic2 = 'Culture',
    topic3 = 'Politics & History',
    topic4 = 'ገጠመኝ',
    topic5 = 'Business',
    topic6 = 'Technology',
    topic7 = 'Poetry',
    topic8 = 'ተረት ተረት',
    topic9 = 'Other'
}

export const TopicsMap: Map<string, any> = Map({
    
     'Following': 'topic1',
     'Culture': 'topic2',
     'Politics & History': 'topic3',
     'ገጠመኝ': 'topic4',
     'Business': 'topic5',
     'Technology': 'topic6',
     'Poetry': 'topic7',
     'ተረት ተረት': 'topic8',
     'Other': 'topic9'

})
