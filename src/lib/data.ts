import { EventI, FriendI } from '@/components/map';

export const events: EventI[] = [
    {
        id: 1,
        title: 'FIRE',
        category: 'CONFIRMED_THREAT',
        time: new Date(),
        description:
            'Fire reported on 10th and 8th street, several residents trapped inside. Fire Department and EMS on site, additional backup requested',
        location: '33.7885914,-84.3290459'
    },
    {
        id: 2,
        title: 'ACTIVE STABBING',
        category: 'CONFIRMED_THREAT',
        time: new Date(new Date().getTime() - 1000 * 60 * 5),
        description:
            'Stabbing reported at Publix. All units requesting backup, rolling RA to site. Suspect was reported leaving the area.',
        location: '33.8117734,-84.3182469'
    },
    {
        id: 3,
        title: 'AGGRAVATED ROBBERY',
        category: 'NONE',
        time: new Date(new Date().getTime() - 1000 * 60 * 32),
        description:
            'Active units needed at Marta station on 5th and 6th. Active robbery reported near Marta bus station, rolling RA to the location. All units be advised.',
        location: '33.81060614120694, -84.28847331504221'
    },
    {
        id: 4,
        title: 'SUPER DUPER LONG NAME BLAH BLAH BLAH BLAH',
        category: 'NONE',
        time: new Date(new Date().getTime() - 1000 * 60 * 34),
        description:
            'Active units needed at Marta station on 5th and 6th. Active robbery reported near Marta bus station, rolling RA to the location. All units be advised.',
        location: '33.779358949487296, -84.29700458208222'
    },
    {
        id: 5,
        title: 'SUPER DUPER LONG NAME BLAH BLAH BLAH BLAH',
        category: 'NONE',
        time: new Date(new Date().getTime() - 1000 * 60 * 36),
        description:
            'Active units needed at Marta station on 5th and 6th. Active robbery reported near Marta bus station, rolling RA to the location. All units be advised.',
        location: '33.78643242539856, -84.32317634128586'
    }
];

export const friends: FriendI[] = [
    {
        id: 1,
        friendName: 'Charles Jones',
        recentEvent: events[0]
    },
    {
        id: 2,
        friendName: 'John Smith',
        recentEvent: events[1]
    },
    {
        id: 3,
        friendName: 'Jane Smith',
        recentEvent: events[2]
    }
];
