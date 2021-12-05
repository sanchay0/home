import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const LoomVideo = list({
    fields: {
        sharedUrl: text({ isRequired: true, isUnique: true }),
        embedUrl: text({ isRequired: true, isUnique: true }),
        title: text({ isUnique: false }),
        sender: relationship({ ref: 'User.sentLooms', many: false }),
        receiver: relationship({ ref: 'User.receivedLooms', many: false })
    }
})