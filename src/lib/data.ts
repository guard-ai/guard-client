import { EventI, FriendI } from '@/components/map';

export const events: EventI[] = [
    {
        id: 1,
        title: 'FIRE',
        category: 'CONFIRMED_THREAT',
        time: new Date(),
        description:
            'Fire reported on 10th and 8th street, several residents trapped inside. Fire Department and EMS on site, additional backup requested',
        location: ''
    },
    {
        id: 2,
        title: 'ACTIVE STABBING',
        category: 'CONFIRMED_INFO',
        time: new Date(new Date().getTime() - 1000 * 60 * 5),
        description:
            'Stabbing reported at Publix. All units requesting backup, rolling RA to site. Suspect was reported leaving the area.',
        location: ''
    },
    {
        id: 3,
        title: 'AGGRAVATED ROBBERY',
        category: 'NONE',
        time: new Date(new Date().getTime() - 1000 * 60 * 32),
        description:
            'Active units needed at Marta station on 5th and 6th. Active robbery reported near Marta bus station, rolling RA to the location. All units be advised.',
        location: ''
    },
    {
        id: 4,
        title: 'SUPER DUPER LONG NAME BLAH BLAH BLAH BLAH',
        category: 'NONE',
        time: new Date(new Date().getTime() - 1000 * 60 * 32),
        description:
            'Active units needed at Marta station on 5th and 6th. Active robbery reported near Marta bus station, rolling RA to the location. All units be advised.',
        location: ''
    },
    {
        id: 5,
        title: 'SUPER DUPER LONG NAME BLAH BLAH BLAH BLAH',
        category: 'NONE',
        time: new Date(new Date().getTime() - 1000 * 60 * 32),
        description:
            'Active units needed at Marta station on 5th and 6th. Active robbery reported near Marta bus station, rolling RA to the location. All units be advised.',
        location: ''
    }
];

export const friends: FriendI[] = [
    {
        id: 1,
        friendName: 'Albert Terc',
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
