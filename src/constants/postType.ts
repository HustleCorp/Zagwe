import {Map} from 'immutable';

export enum Tags {
  home = '',
  topic1 = 'latest',
  topic2 = 'following',
  topic3 = 'culture',
  topic4 = 'politics',
  topic5 = 'getemegn',
  topic6 = 'business',
  topic7 = 'technology',
  topic8 = 'health',
  topic9 = 'poetry',
  topic10 = 'teret',
  topic11 = 'other',
}

export enum TagsMap {
  latest = 'topic2',
  culture = 'topic3',
  politics = 'topic4',
  getemegn = 'topic5',
  business = 'topic6',
  technology = 'topic7',
  health = 'topic8',
  poetry = 'topic9',
  teret = 'topic10',
  other = 'topic11',
}

export enum TagLabel {
  home = 'Top picks',
  topic1 = 'Latest',
  topic2 = 'Following',
  topic3 = 'Culture',
  topic4 = 'Politics',
  topic5 = 'getemegn',
  topic6 = 'Business',
  topic7 = 'Technology',
  topic8 = 'Health',
  topic9 = 'Poetry',
  topic10 = 'teret',
  topic11 = 'Others',
}

export enum TopicsFUll {
  topic1 = 'Latest',
  topic2 = 'Following',
  topic3 = 'Culture',
  topic4 = 'Politics & History',
  topic5 = 'ገጠመኝ',
  topic6 = 'Business',
  topic7 = 'Technology',
  topic8 = 'Health & Lifestyle',
  topic9 = 'Poetry',
  topic10 = 'ተረት ተረት',
  topic11 = 'Other',
}

export const TopicsMap: Map<string, any> = Map({
  Latest: 'topic1',
  Following: 'topic2',
  Culture: 'topic3',
  'Politics & History': 'topic4',
  ገጠመኝ: 'topic5',
  Business: 'topic6',
  Technology: 'topic7',
  'Health & Lifestyle': 'topic8',
  Poetry: 'topic9',
  'ተረት ተረት': 'topic10',
  Other: 'topic11',
});
